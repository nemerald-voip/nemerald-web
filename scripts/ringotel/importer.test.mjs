import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, rm, mkdir, writeFile, readdir, symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {runImport, mergeText, resolveConflict} from './importer.mjs';
import {configAt, hash, json, readJson, repoPath} from './lib.mjs';
import {prepareArticle, renderArticle} from './convert.mjs';
import {fetchInventory, fetchStableInventory, normalizeArticle, requestBytes} from './source.mjs';
import {importHistory, pullRequestBody} from './pr.mjs';
import {png, sample, strapiRow, textBlock} from './fixtures.mjs';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const baseConfig = await configAt(repository);
async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'nemerald-ringotel-test-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const config = structuredClone(baseConfig);
  config.reusePermissionConfirmed = true;
  await mkdir(path.join(root, 'integrations/ringotel'), {recursive: true});
  await writeFile(path.join(root, config.paths.state), json({schemaVersion: 1, articles: {}}));
  return {root, config, fetcher: async () => new Response(png, {headers: {'content-type': 'image/png'}})};
}
const getState = f => readJson(path.join(f.root, f.config.paths.state));
const localDoc = async (f, id = 'sample-a') => path.join(f.root, (await getState(f)).articles[id].docPath);

test('imports, rewrites article/images, applies branding and is idempotent', async t => {
  const f = await fixture(t), a = sample(), b = sample('sample-b');
  a.body.push({type: 'paragraph', children: [{type: 'link', url: 'https://kb.ringotel.net/sample-b/#steps', children: [{type: 'text', text: 'Next article'}]}]});
  a.related = [{slug: b.slug, title: b.title}];
  const report = await runImport({...f, articles: [a, b]});
  assert.equal(report.new.length, 2);
  const state = await getState(f), markdown = await readFile(await localDoc(f), 'utf8');
  assert.match(markdown, /Nemerald sample-a/);
  assert.match(markdown, /mdx: \{"format":"md"\}/);
  assert.ok(markdown.includes(state.articles['sample-b'].route + '#steps'));
  assert.ok(markdown.includes('/img/ringotel/original/'));
  assert.equal((await runImport({...f, articles: [a, b]})).changes.length, 0);
  assert.equal((await getState(f)).articles['sample-a'].fingerprint, state.articles['sample-a'].fingerprint);
});

test('non-overlapping upstream changes preserve custom wording', async t => {
  const f = await fixture(t), a = sample();
  await runImport({...f, articles: [a]});
  const file = await localDoc(f);
  await writeFile(file, (await readFile(file, 'utf8')).replace('Your local preferences go here.', 'Company-specific instructions.'));
  const updated = structuredClone(a);
  updated.body[5] = textBlock('Third step changed upstream.');
  const report = await runImport({...f, articles: [updated]});
  assert.equal(report.conflicts.length, 0);
  const merged = await readFile(file, 'utf8');
  assert.match(merged, /Company-specific instructions/);
  assert.match(merged, /Third step changed upstream/);
  assert.equal((await runImport({...f, articles: [updated]})).changes.length, 0);
});

test('overlapping edits leave local file and baseline untouched until resolution', async t => {
  const f = await fixture(t), a = sample();
  await runImport({...f, articles: [a]});
  const old = await getState(f), file = await localDoc(f);
  const custom = (await readFile(file, 'utf8')).replace('First step.', 'Customized first step.');
  await writeFile(file, custom);
  a.body[3] = textBlock('Upstream first step.');
  const report = await runImport({...f, articles: [a]});
  assert.equal(report.conflicts.length, 1);
  assert.equal(await readFile(file, 'utf8'), custom);
  assert.equal((await getState(f)).articles[a.id].fingerprint, old.articles[a.id].fingerprint);
  const conflict = await readJson(path.join(f.root, report.conflicts[0].file));
  assert.match(conflict.merge, /<<<<<<< CUSTOMIZED/);
  await assert.rejects(runImport({...f, articles: [a]}), /Resolve the existing text conflicts/);
  await resolveConflict(f.root, f.config, a.id, 'keep-local');
  assert.equal((await runImport({...f, articles: [a]})).changes.length, 0);
  assert.equal(await readFile(file, 'utf8'), custom);
  a.body[5] = textBlock('Third step updated again.');
  assert.equal((await runImport({...f, articles: [a]})).conflicts.length, 0);
  assert.match(await readFile(file, 'utf8'), /Customized first step/);
});

test('detects changed bytes at the same URL while preserving branded replacement', async t => {
  const f = await fixture(t), a = sample();
  const branded = '/img/ringotel/branded/call.png';
  await mkdir(path.join(f.root, f.config.paths.brandedImages), {recursive: true});
  await writeFile(path.join(f.root, 'static' + branded), png);
  f.config.branding.images[a.id + ':image:0'] = branded;
  await runImport({...f, articles: [a]});
  const state = await getState(f), file = await localDoc(f), before = await readFile(file, 'utf8');
  const changed = Buffer.concat([png, Buffer.from('new screenshot bytes')]);
  const report = await runImport({...f, articles: [a], fetcher: async () => new Response(changed, {headers: {'content-type': 'image/png'}})});
  assert.equal(report.images.length, 1);
  assert.equal(report.images[0].replacement, branded);
  assert.equal(await readFile(file, 'utf8'), before);
  assert.deepEqual(await readFile(path.join(f.root, 'static' + branded)), png);
  assert.deepEqual(await readFile(path.join(f.root, state.articles[a.id].images[0].original)), png);
  assert.notEqual(report.images[0].original, state.articles[a.id].images[0].original);
});

test('changed source URL retains URL-mapped branded replacement and flags review', async t => {
  const f = await fixture(t), a = sample();
  const url = f.config.source.publicAssetBase + 'sample.png';
  const branded = '/img/ringotel/branded/custom.png';
  await mkdir(path.join(f.root, f.config.paths.brandedImages), {recursive: true});
  await writeFile(path.join(f.root, 'static' + branded), png);
  f.config.branding.images[url] = branded;
  await runImport({...f, articles: [a]});
  a.body[6].image.url = '/uploads/new_sample_0123456789.png';
  const result = await runImport({...f, articles: [a]});
  assert.equal(result.images[0].replacement, branded);
  assert.ok(result.warnings.some(x => x.includes('retained branded image')));
  assert.equal((await runImport({...f, articles: [a]})).changes.length, 0);
  a.body[6].image.url = '/uploads/third_sample_0123456789.png';
  assert.equal((await runImport({...f, articles: [a]})).images[0].replacement, branded);
});

test('removed upstream image is listed for branding review and its file stays', async t => {
  const f = await fixture(t), a = sample();
  await runImport({...f, articles: [a]});
  const old = (await getState(f)).articles[a.id].images[0];
  a.body.pop();
  const report = await runImport({...f, articles: [a]});
  assert.equal(report.images[0].removed, true);
  assert.deepEqual(await readFile(path.join(f.root, old.original)), png);
});

test('editing an original cannot be silently lost when upstream changes its URL', async t => {
  const f = await fixture(t), a = sample();
  await runImport({...f, articles: [a]});
  const state = await getState(f);
  await writeFile(path.join(f.root, state.articles[a.id].images[0].original), 'manually branded bytes');
  a.body[6].image.url = '/uploads/different_0123456789.png';
  await assert.rejects(runImport({...f, articles: [a]}), /tracked original image was edited/);
  assert.deepEqual(await getState(f), state);
});

test('closed proposal rejects exact article versions even when another new article appears', async t => {
  const f = await fixture(t), a = sample();
  const result = await runImport({...f, articles: [a]});
  const history = importHistory([{number: 1, state: 'closed', merged_at: null, head: {ref: 'automation/ringotel-1-1'}, body: pullRequestBody(result)}]);
  const fresh = await fixture(t);
  const b = sample('sample-b');
  b.related = [{slug: a.slug, title: a.title}];
  const retry = await runImport({...fresh, articles: [a, b], rejected: history.rejected});
  assert.deepEqual(retry.new.map(x => x.id), ['sample-b']);
  const markdown = await readFile(await localDoc(fresh, b.id), 'utf8');
  assert.match(markdown, /https:\/\/kb\.ringotel\.com\/article\.html/);
  assert.equal(importHistory([{number: 2, state: 'open', head: {ref: 'automation/ringotel-2-1'}}]).open[0], 2);
  assert.equal(Object.keys(importHistory([{number: 1, state: 'closed', merged_at: 'date', head: {ref: 'automation/ringotel-1-1'}, body: pullRequestBody(result)}]).rejected).length, 0);
  a.body[0] = textBlock('New upstream version.');
  assert.equal((await runImport({...fresh, articles: [a, b], rejected: history.rejected})).new.length, 1);
});

test('removals are flagged once and never delete customized pages', async t => {
  const f = await fixture(t), a = sample(), b = sample('sample-b');
  await runImport({...f, articles: [a, b]});
  const file = await localDoc(f);
  const result = await runImport({...f, articles: [b]});
  assert.equal(result.removals.length, 1);
  assert.ok(await readFile(file, 'utf8'));
  assert.equal((await runImport({...f, articles: [b]})).changes.length, 0);
  await assert.rejects(runImport({...f, articles: []}), /Empty inventory/);
  assert.equal((await runImport({...f, articles: [a, b]})).updated.length, 1);
});

test('failed image fetch holds back its article without changing its baseline', async t => {
  const f = await fixture(t), before = await getState(f);
  const report = await runImport({...f, articles: [sample()], fetcher: async () => new Response('no', {status: 403})});
  assert.equal(report.changes.length, 0);
  assert.equal(report.blocked.length, 1);
  assert.deepEqual(await getState(f), before);
  assert.deepEqual(await readdir(path.join(f.root, 'integrations/ringotel')), ['state.json']);
  assert.equal((await runImport({...f, articles: [sample()]})).new.length, 1);
  const accepted = await getState(f);
  const missing = await runImport({...f, articles: [sample()], fetcher: async () => new Response('no', {status: 500})});
  assert.equal(missing.removals.length, 0);
  assert.deepEqual(await getState(f), accepted);
});

test('image failure in one article does not prevent unrelated complete articles', async t => {
  const f = await fixture(t);
  const a = sample(), b = sample('sample-b', {body: [textBlock('No image here.')]});
  b.related = [{slug: a.slug, title: a.title}];
  const report = await runImport({...f, articles: [a, b], fetcher: async () => new Response('no', {status: 403})});
  assert.deepEqual(report.new.map(x => x.id), [b.id]);
  assert.equal(report.blocked[0].id, a.id);
  const markdown = await readFile(await localDoc(f, b.id), 'utf8');
  assert.match(markdown, /https:\/\/kb\.ringotel\.com\/article\.html/);
});

test('missing local document is a conflict, not silently recreated', async t => {
  const f = await fixture(t), a = sample();
  await runImport({...f, articles: [a]});
  await rm(await localDoc(f));
  a.body[0] = textBlock('New upstream text.');
  assert.equal((await runImport({...f, articles: [a]})).conflicts.length, 1);
  await resolveConflict(f.root, f.config, a.id, 'keep-local');
  assert.equal((await runImport({...f, articles: [a]})).changes.length, 0);
});

test('HTML and blocks preserve safe formatting; active content fails closed', () => {
  const a = sample('html', {body: null, bodyHtml: '<h2 id="legacy">Heading</h2><p><strong>Bold</strong> &amp; {literal} <code>x &lt; 2</code></p><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table><ol><li>One<ul><li>Nested</li></ul></li></ol>'});
  const prepared = prepareArticle(a, baseConfig);
  const markdown = renderArticle(prepared, a, '/docs/apps/html', {}, new Map(), baseConfig);
  assert.match(markdown, /\*\*Bold\*\*/);
  assert.match(markdown, /\| A \| B \|/);
  assert.match(markdown, /legacy/);
  assert.match(markdown, /Nested/);
  assert.throws(() => prepareArticle({...a, bodyHtml: '<script>alert(1)</script>'}, baseConfig), /Unsupported/);
  assert.throws(() => prepareArticle({...a, bodyHtml: '<a href="javascript:alert(1)">bad</a>'}, baseConfig), /protocol/);
  assert.throws(() => prepareArticle(sample('unknown', {body: [{type: 'unrecognized'}]}), baseConfig), /Unsupported/);
});

test('blocks are preferred over stale HTML; unpublished or restricted records fail', () => {
  const row = strapiRow();
  assert.equal(normalizeArticle(row, baseConfig).bodyHtml, null);
  for (const change of [{publishedAt: null}, {visible_to_partners: [{}]}, {visible_to_partners: undefined}, {audience: 'admin'}]) {
    assert.throws(() => normalizeArticle({...row, ...change}, baseConfig));
  }
});

function inventoryFetcher(pages, transform = x => x) {
  return async url => {
    const page = Number(new URL(url).searchParams.get('pagination[page]'));
    const response = {data: pages[page - 1], meta: {pagination: {page, pageSize: 1, total: pages.length, pageCount: pages.length}}};
    return new Response(JSON.stringify(transform(response)), {headers: {'content-type': 'application/json'}});
  };
}

test('validates all pagination and detects truncated, duplicate and unstable results', async () => {
  const config = structuredClone(baseConfig);
  config.source.pageSize = 1;
  const pages = [[strapiRow('a')], [strapiRow('b')]];
  assert.equal((await fetchStableInventory(config, inventoryFetcher(pages))).length, 2);
  await assert.rejects(fetchInventory(config, inventoryFetcher([pages[0], []])), /Incomplete/);
  await assert.rejects(fetchInventory(config, inventoryFetcher([pages[0], pages[0]])), /Duplicate/);
  await assert.rejects(fetchInventory(config, inventoryFetcher(pages, x => ({...x, meta: {pagination: {...x.meta.pagination, total: x.meta.pagination.page === 2 ? 3 : 2}}}))), /pagination|changed/);
  await assert.rejects(fetchInventory(config, async () => new Response(JSON.stringify({data: [], meta: {pagination: {page: 1, pageSize: 1, total: 0, pageCount: 0}}}), {headers: {'content-type': 'application/json'}})), /Empty/);
  let request = 0;
  await assert.rejects(fetchStableInventory(config, inventoryFetcher(pages, response => {
    request++;
    if (request > 2) response.data[0].title = 'Changed during scan';
    return response;
  })), /changed during fetch/);
});

test('populated relations cannot expose articles outside the verified public inventory', async () => {
  const config = structuredClone(baseConfig);
  config.source.pageSize = 1;
  const row = strapiRow('a', {
    related_to: [{slug: 'private', title: 'Restricted article'}, {slug: 'b', title: 'Public article'}],
    cross_platform_links: [{linked_article: {slug: 'draft', title: 'Unpublished article'}}],
  });
  const records = await fetchInventory(config, inventoryFetcher([[row], [strapiRow('b')]]));
  assert.deepEqual(records[0].related, [{slug: 'b', title: 'Public article'}]);
  assert.deepEqual(records[0].crossPlatform, []);
});

test('limits network destinations and local write paths', async t => {
  const f = await fixture(t);
  await assert.rejects(requestBytes('https://127.0.0.1/x', {hosts: baseConfig.source.imageHosts, maxBytes: 100}), /Unapproved/);
  await assert.rejects(repoPath(f.root, '../outside'), /escapes/);
  await symlink(tmpdir(), path.join(f.root, 'escape'));
  await assert.rejects(repoPath(f.root, 'escape/file'), /Symlink/);
  f.config.reusePermissionConfirmed = false;
  await assert.rejects(runImport({...f, articles: [sample()]}), /permission/);
});

test('merge handles unchanged upstream and unsafe review history', async () => {
  assert.deepEqual(await mergeText('base\n', 'custom\n', 'base\n'), {text: 'custom\n', conflict: false});
  assert.throws(() => importHistory([{number: 1, state: 'closed', head: {ref: 'automation/ringotel-1-1'}, body: ''}]), /manifest/);
  assert.equal(hash('same'), hash('same'));
});
