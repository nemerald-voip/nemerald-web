import {appendFile, readFile} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {configAt, assert, hash, json, readJson, readOptional, repoPath, safeId, writeRepo} from './lib.mjs';
import {runImport, resolveConflict, conflictFiles} from './importer.mjs';
import {fetchStableInventory} from './source.mjs';
import {importHistory, pullRequestBody, listPulls, githubRequest, branchPrefix} from './pr.mjs';

const root = process.cwd();
const [command = 'import', ...args] = process.argv.slice(2);
const config = await configAt(root);
const output = async (key, value) => {
  console.log(key + '=' + value);
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, key + '=' + value + '\n');
};
const git = (...gitArgs) => {
  const result = spawnSync('git', gitArgs, {cwd: root, encoding: 'utf8', maxBuffer: 10000000});
  assert(result.status === 0, 'Git failed: ' + result.stderr);
  return result.stdout.trim();
};

try {
  if (command === 'probe') {
    const articles = await fetchStableInventory(config);
    console.log(json({publicArticles: articles.length, platforms: [...new Set(articles.map(x => x.platform.slug))]}));
  } else if (command === 'history') {
    if (!config.reusePermissionConfirmed) {
      console.log('Imports disabled until documentation reuse permission is confirmed.');
      await output('proceed', 'false');
    } else {
      const history = importHistory(await listPulls(process.env.GITHUB_REPOSITORY, process.env.GH_TOKEN));
      await writeRepo(root, '.ringotel-run/history.json', json(history));
      if (history.open.length) console.log('Preserving open import PR(s): ' + history.open.join(', '));
      await output('proceed', String(history.open.length === 0));
    }
  } else if (command === 'import') {
    let history = {open: [], rejected: {}};
    if (process.env.GITHUB_ACTIONS) {
      history = await readJson(path.join(root, '.ringotel-run/history.json'));
      assert(!history.open.length, 'An import PR is already open');
    }
    const report = await runImport({root, config, rejected: history.rejected});
    await writeRepo(root, '.ringotel-run/report.json', json(report));
    await writeRepo(root, '.ringotel-run/pr-body.md', pullRequestBody(report));
    for (const item of report.blocked) console.log('Held back ' + item.id + ': ' + item.reason);
    if (process.env.GITHUB_STEP_SUMMARY) {
      await appendFile(process.env.GITHUB_STEP_SUMMARY, 'App documentation import: ' + report.new.length + ' new, ' +
        report.updated.length + ' updated, ' + report.conflicts.length + ' conflicts, ' + report.blocked.length +
        ' held back for unavailable images. See the import report artifact for details.\n');
    }
    await output('changed', String(report.changes.length > 0));
    await output('conflicts', String(report.conflicts.length));
  } else if (command === 'resolve') {
    await resolveConflict(root, config, safeId(args[0]), args[1]);
    console.log('Conflict resolved. Review the article and run ringotel:check and build.');
  } else if (command === 'check') {
    assert((await conflictFiles(root, config)).length === 0, 'Unresolved text conflicts; run ringotel:resolve for each conflict');
    const state = await readJson(await repoPath(root, config.paths.state));
    for (const [id, entry] of Object.entries(state.articles)) {
      const baseline = await readJson(await repoPath(root, config.paths.snapshots + '/' + safeId(id) + '.json'));
      assert(typeof baseline.generated === 'string', 'Missing upstream Markdown baseline');
      const local = await readOptional(await repoPath(root, entry.docPath));
      assert(local === null || !/^(<<<<<<<|=======|>>>>>>>)/m.test(local), 'Merge markers in ' + entry.docPath);
      for (const asset of entry.images) {
        assert(hash(await readFile(await repoPath(root, asset.original))) === asset.hash, 'Original image was modified: ' + asset.original);
        if (asset.replacement) await readFile(await repoPath(root, 'static' + asset.replacement));
      }
    }
    console.log('Import review state is consistent; no unresolved text conflicts.');
  } else if (command === 'publish-pr') {
    const report = await readJson(path.join(root, '.ringotel-run/report.json'));
    if (!report.changes.length) process.exit(0);
    const repository = process.env.GITHUB_REPOSITORY, token = process.env.GH_TOKEN;
    const history = importHistory(await listPulls(repository, token));
    assert(!history.open.length, 'Another import PR was opened; leaving it untouched');
    assert(!report.changes.some(x => (history.rejected[x.key] || []).includes(x.version)), 'Review history changed during import; retry next run');
    const branch = branchPrefix + process.env.GITHUB_RUN_ID + '-' + process.env.GITHUB_RUN_ATTEMPT;
    assert(/^automation\/ringotel-\d+-\d+$/.test(branch), 'Expected GitHub Actions run identity');
    const body = pullRequestBody(report);
    git('switch', '-c', branch);
    git('config', 'user.name', 'github-actions[bot]');
    git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');
    // Explicit allowlist: never commit build outputs or temporary reports.
    const paths = [config.paths.docs, 'integrations/ringotel'];
    if (report.images.length) paths.push(config.paths.originalImages);
    git('add', '--', ...paths);
    assert(git('diff', '--cached', '--name-only'), 'Report has changes but no files changed');
    git('commit', '-m', 'docs: propose Ringotel app documentation updates');
    git('push', 'origin', 'HEAD:refs/heads/' + branch);
    const pr = await githubRequest('/repos/' + repository + '/pulls', token, {
      method: 'POST', body: JSON.stringify({
        title: 'docs: review Nemerald app guide updates', head: branch,
        base: process.env.RINGOTEL_BASE_BRANCH || 'main', body, draft: report.conflicts.length > 0,
      }),
    });
    console.log(pr.html_url);
  } else throw new Error('Unknown command: ' + command);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
