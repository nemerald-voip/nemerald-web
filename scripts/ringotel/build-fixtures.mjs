import {mkdtemp, cp, symlink, readFile, writeFile, rm, readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {configAt, assert, json} from './lib.mjs';
import {runImport} from './importer.mjs';
import {sample, png, textBlock} from './fixtures.mjs';

// Build real converter output through this site's actual Docusaurus configuration.
// Nothing in the working tree is changed and no network requests are made.
const source = process.cwd();
const root = await mkdtemp(path.join(tmpdir(), 'nemerald-ringotel-build-'));
try {
  for (const name of ['src', 'static', 'docs', 'blog', 'integrations', 'docusaurus.config.ts', 'sidebars.ts', 'package.json', 'tsconfig.json']) {
    await cp(path.join(source, name), path.join(root, name), {recursive: true});
  }
  await symlink(path.join(source, 'node_modules'), path.join(root, 'node_modules'));
  const config = await configAt(root);
  config.reusePermissionConfirmed = true;
  config.excludedArticleIds = [];
  config.rejectedVersions = {};
  config.branding.images = {};
  await writeFile(path.join(root, config.paths.state), json({schemaVersion: 1, articles: {}}));
  await rm(path.join(root, config.paths.conflicts), {recursive: true, force: true});
  const a = sample('fixture-smoke-a');
  const b = sample('fixture-smoke-b', {
    platform: {slug: 'android-app', name: 'Android'}, body: null,
    bodyHtml: '<h2 id="legacy">HTML example</h2><p><strong>Ringotel</strong> &amp; {literal} <code>x &lt; 2</code></p><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table><ol><li>One<ul><li>Nested</li></ul></li></ol>',
  });
  a.related = [{slug: b.slug, title: b.title}];
  a.body.push(
    textBlock("import Missing from 'never-execute-source';"),
    textBlock('export const value = {literal};'),
    textBlock('App {{icon:/uploads/icon_0123456789.png}} icon'),
    {type: 'code', language: 'js', children: [{type: 'text', text: 'const value = {x: 1};'}]},
  );
  const report = await runImport({root, config, articles: [a, b],
    fetcher: async () => new Response(png, {headers: {'content-type': 'image/png'}})});
  assert(report.new.length === 2, 'Expected synthetic articles');
  const build = spawnSync(process.execPath, [path.join(source, 'node_modules/@docusaurus/core/bin/docusaurus.mjs'), 'build'],
    {cwd: root, encoding: 'utf8', maxBuffer: 5000000});
  process.stdout.write(build.stdout || '');
  process.stderr.write(build.stderr || '');
  assert(build.status === 0, 'Generated documentation build failed');
  const files = await readdir(path.join(root, 'build'), {recursive: true});
  for (const [id, expected] of [[a.id, 'never-execute-source'], [b.id, '<table>']]) {
    const htmlFile = files.find(file => file.includes(id + '--' + id) && file.endsWith('.html'));
    assert(htmlFile, 'Generated page missing: ' + id);
    const html = await readFile(path.join(root, 'build', htmlFile), 'utf8');
    assert(html.includes(expected) && html.includes('apps-docs-menu'), 'Generated article content/navigation missing');
    if (id === b.id) assert(html.includes('id="legacy"'), 'Legacy heading anchor was lost');
  }
  console.log('Generated documents built successfully; source code-like text stayed inert.');
} finally {
  await rm(root, {recursive: true, force: true});
}
