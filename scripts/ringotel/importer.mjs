import {mkdtemp, readFile, writeFile, rm, readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {assert, hash, json, readJson, readOptional, repoPath, writeRepo} from './lib.mjs';
import {fetchStableInventory, requestBytes, imageExtension} from './source.mjs';
import {prepareArticle, renderArticle} from './convert.mjs';

export async function mergeText(base, local, incoming) {
  if (local === null) return {conflict: true, text: 'Local article was deleted. Choose whether to keep it deleted or restore the incoming version.'};
  if (local === base || local === incoming) return {conflict: false, text: incoming};
  if (incoming === base) return {conflict: false, text: local};
  const directory = await mkdtemp(path.join(tmpdir(), 'ringotel-merge-'));
  try {
    for (const [name, value] of Object.entries({base, local, incoming})) await writeFile(path.join(directory, name), value);
    const result = spawnSync('git', ['merge-file', '--diff3', '-p', '-L', 'CUSTOMIZED', '-L', 'PREVIOUS UPSTREAM',
      '-L', 'NEW UPSTREAM', ...['local', 'base', 'incoming'].map(name => path.join(directory, name))], {encoding: 'utf8', maxBuffer: 16000000});
    assert(!result.error && result.status !== null && result.status >= 0 && result.status <= 127, 'git merge-file failed: ' + (result.stderr || result.error));
    return {conflict: result.status !== 0, text: result.stdout};
  } finally { await rm(directory, {recursive: true, force: true}); }
}

export async function conflictFiles(root, config) {
  try { return (await readdir(await repoPath(root, config.paths.conflicts))).filter(x => x.endsWith('.json')); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
}

export async function runImport({root, config, articles, fetcher = fetch, rejected = {}}) {
  assert(config.reusePermissionConfirmed === true, 'Live imports are disabled. Confirm reuse permission in integrations/ringotel/config.json first.');
  assert((await conflictFiles(root, config)).length === 0, 'Resolve the existing text conflicts before running another import');
  const previous = await readJson(await repoPath(root, config.paths.state));
  assert(previous.schemaVersion === 1, 'Unsupported state version');
  const checkedOriginals = new Set();
  for (const entry of Object.values(previous.articles)) {
    for (const asset of entry.images) {
      if (checkedOriginals.has(asset.original)) continue;
      assert(hash(await readFile(await repoPath(root, asset.original))) === asset.hash,
        'A tracked original image was edited. Move the replacement into brandedImages and restore the original: ' + asset.original);
      checkedOriginals.add(asset.original);
    }
  }
  const state = structuredClone(previous), staged = new Map(), assetCache = new Map();
  const report = {new: [], updated: [], images: [], removals: [], conflicts: [], blocked: [], warnings: [], changes: []};
  const sourceScope = hash({
    api: config.source.apiUrl, audiences: config.source.allowedAudiences, platforms: config.source.allowedPlatforms,
  });
  assert(!previous.sourceScope || previous.sourceScope === sourceScope, 'Source scope changed; review the tracked inventory before changing state.sourceScope');
  const inventory = articles ?? await fetchStableInventory(config, fetcher);
  assert(inventory.length, 'Empty inventory; refusing removal inference');
  const active = inventory.filter(article => !config.excludedArticleIds.includes(article.id));
  const candidates = [];
  let totalImageBytes = 0;
  for (const article of active) {
    const prepared = prepareArticle(article, config), imageUrls = {}, assets = [];
    const old = previous.articles[article.id];
    let blocked = false;
    for (const reference of prepared.images) {
      if (!assetCache.has(reference.url)) {
        let downloaded, ext;
        try {
          downloaded = await requestBytes(reference.url, {
            hosts: config.source.imageHosts, maxBytes: config.source.maxImageBytes, fetcher,
          });
          ext = imageExtension(downloaded.bytes, downloaded.type);
        } catch (error) {
          assetCache.set(reference.url, {error: error.message});
        }
        if (downloaded && ext) {
          totalImageBytes += downloaded.bytes.length;
          const digest = hash(downloaded.bytes);
          // Never replace an original: customized pages may still use it.
          const original = config.paths.originalImages + '/' + hash(reference.url).slice(0, 20) + '/' + digest + '.' + ext;
          assetCache.set(reference.url, {original, hash: digest, bytes: downloaded.bytes});
        }
        assert(totalImageBytes <= 300000000, 'Image inventory exceeds 300 MB per run');
      }
      const downloaded = assetCache.get(reference.url);
      if (downloaded.error) {
        report.blocked.push({id: article.id, title: prepared.title, url: reference.url, reason: downloaded.error});
        blocked = true;
        break;
      }
      const oldAsset = old?.images?.find(x => x.slot === reference.slot);
      let replacementKey = config.branding.images[reference.slot] ? reference.slot :
        config.branding.images[reference.url] ? reference.url : null;
      let replacement = replacementKey ? config.branding.images[replacementKey] : null;
      // Preserve the mapped replacement if the upstream URL in this slot changed.
      const oldReplacementKey = oldAsset?.replacementKey || oldAsset?.url;
      if (!replacement && oldAsset?.replacement &&
          config.branding.images[oldReplacementKey] === oldAsset.replacement) {
        replacementKey = oldReplacementKey;
        replacement = oldAsset.replacement;
        if (oldAsset.url !== reference.url) {
          report.warnings.push('Image URL changed at ' + reference.slot + '; retained branded image. Review its mapping.');
        }
      }
      if (replacement) {
        assert(replacement.startsWith('/' + config.paths.brandedImages.replace(/^static\//, '') + '/'), 'Replacement must live in brandedImages: ' + replacement);
        await readFile(await repoPath(root, 'static' + replacement));
      }
      imageUrls[reference.slot] = replacement || '/' + downloaded.original.replace(/^static\//, '');
      assets.push({...reference, original: downloaded.original, hash: downloaded.hash, replacement, replacementKey});
    }
    if (blocked) continue;
    const fingerprint = hash({renderer: 1, article, assets, substitutions: config.branding.substitutions});
    const key = 'article:' + article.id;
    const isRejected = (rejected[key] || []).includes(fingerprint) || (config.rejectedVersions[key] || []).includes(fingerprint);
    if (isRejected) continue;
    const docPath = old?.docPath || config.paths.docs + '/' + article.platform.slug + '/' + article.category.slug + '/' + article.slug + '--' + article.id + '.md';
    const route = old?.route || '/docs/apps/' + article.slug + '--' + article.id;
    candidates.push({article, prepared, assets, imageUrls, fingerprint, key, old, docPath, route});
  }

  // Only point at pages that actually exist or are included in this proposal.
  const routes = new Map();
  for (const entry of Object.values(previous.articles)) {
    if (await readOptional(await repoPath(root, entry.docPath)) !== null) {
      for (const slug of entry.aliases || [entry.slug]) routes.set(slug, entry.route);
    }
  }
  for (const candidate of candidates) {
    if (!candidate.old || await readOptional(await repoPath(root, candidate.docPath)) !== null) routes.set(candidate.article.slug, candidate.route);
  }
  for (const candidate of candidates) {
    const {article, prepared, assets, imageUrls, fingerprint, key, old, docPath, route} = candidate;
    const generated = renderArticle(prepared, article, route, imageUrls, routes, config);
    const snapshotPath = config.paths.snapshots + '/' + article.id + '.json';
    const baseline = old ? await readJson(await repoPath(root, snapshotPath)) : null;
    if (old && old.fingerprint === fingerprint && baseline.generated === generated && !old.removed) continue;
    const current = await readOptional(await repoPath(root, docPath));
    assert(old || current === null, 'Refusing to overwrite an untracked article: ' + docPath);
    const merged = old ? await mergeText(baseline.generated, current, generated) : {text: generated, conflict: false};
    const entry = {
      docPath, route, slug: article.slug, aliases: [...new Set([...(old?.aliases || []), old?.slug, article.slug].filter(Boolean))],
      fingerprint, images: assets, removed: false,
    };
    const snapshot = {source: article, generated};
    for (const asset of assets) {
      const bytes = assetCache.get(asset.url).bytes;
      const existing = await repoPath(root, asset.original);
      try { assert(hash(await readFile(existing)) === asset.hash, 'An original image was edited; put replacements in brandedImages'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; staged.set(asset.original, bytes); }
      const oldAsset = old?.images?.find(x => x.slot === asset.slot);
      if (!oldAsset || oldAsset.hash !== asset.hash || oldAsset.url !== asset.url || oldAsset.replacement !== asset.replacement) {
        report.images.push({articleId: article.id, ...asset, previousOriginal: oldAsset?.original || null});
      }
    }
    for (const oldAsset of old?.images || []) {
      if (!assets.some(asset => asset.slot === oldAsset.slot)) {
        report.images.push({articleId: article.id, ...oldAsset, previousOriginal: oldAsset.original, removed: true});
      }
    }
    if (merged.conflict) {
      const conflictPath = config.paths.conflicts + '/' + article.id + '.json';
      staged.set(conflictPath, json({articleId: article.id, docPath, snapshotPath, entry, snapshot,
        base: baseline.generated, local: current, incoming: generated, merge: merged.text}));
      report.conflicts.push({id: article.id, title: prepared.title, file: conflictPath});
      // Leave both the customized file and accepted upstream baseline untouched.
    } else {
      staged.set(docPath, merged.text);
      staged.set(snapshotPath, json(snapshot));
      state.articles[article.id] = entry;
    }
    if (!old) {
      for (const [directory, label] of [
        [path.dirname(path.dirname(docPath)), article.platform.name],
        [path.dirname(docPath), article.category.name],
      ]) {
        const categoryPath = directory + '/_category_.json';
        if (await readOptional(await repoPath(root, categoryPath)) === null && !staged.has(categoryPath)) {
          staged.set(categoryPath, json({label, link: {type: 'generated-index'}}));
        }
      }
    }
    const detail = {id: article.id, title: prepared.title, file: docPath,
      source: config.source.siteUrl + '/article.html?slug=' + encodeURIComponent(article.slug)};
    report[old ? 'updated' : 'new'].push(detail);
    report.warnings.push(...prepared.warnings.map(warning => article.id + ': ' + warning));
    report.changes.push({key, version: fingerprint});
  }

  const seen = new Set(inventory.map(article => article.id));
  for (const [id, old] of Object.entries(previous.articles)) {
    if (seen.has(id) || old.removed || config.excludedArticleIds.includes(id)) continue;
    const key = 'removed:' + id, version = old.fingerprint;
    if ((rejected[key] || []).includes(version) || (config.rejectedVersions[key] || []).includes(version)) continue;
    report.removals.push({id, file: old.docPath, slug: old.slug});
    report.changes.push({key, version});
    state.articles[id].removed = true;
    // A disappearance is only a review signal; the article and assets stay in place.
  }
  report.warnings = [...new Set(report.warnings)];
  if (report.changes.length) {
    state.sourceScope = sourceScope;
    staged.set(config.paths.state, json(state));
    staged.set('integrations/ringotel/review.json', json(report));
  }
  // Fetching, conversion, merge analysis and all path checks finish before any writes.
  for (const relative of staged.keys()) await repoPath(root, relative);
  for (const [relative, contents] of staged) await writeRepo(root, relative, contents);
  return report;
}

export async function resolveConflict(root, config, id, choice) {
  assert(['keep-local', 'accept-upstream', 'resolved'].includes(choice), 'Choose keep-local, accept-upstream or resolved');
  const file = await repoPath(root, config.paths.conflicts + '/' + id + '.json');
  const conflict = await readJson(file);
  assert(conflict.articleId === id, 'Conflict ID mismatch');
  if (choice === 'accept-upstream') await writeRepo(root, conflict.docPath, conflict.incoming);
  if (choice === 'resolved') {
    const local = await readOptional(await repoPath(root, conflict.docPath));
    assert(local !== null && !/^(<<<<<<<|=======|>>>>>>>)/m.test(local), 'Resolve the article text first');
  }
  const state = await readJson(await repoPath(root, config.paths.state));
  state.articles[id] = conflict.entry;
  await writeRepo(root, conflict.snapshotPath, json(conflict.snapshot));
  await writeRepo(root, config.paths.state, json(state));
  await rm(file);
}
