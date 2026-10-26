import {createHash} from 'node:crypto';
import {readFile, writeFile, mkdir, lstat} from 'node:fs/promises';
import path from 'node:path';

export const json = (value) => JSON.stringify(value, null, 2) + '\n';
export function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])]));
  }
  return value;
}
export const hash = (value) => createHash('sha256')
  .update(Buffer.isBuffer(value) || typeof value === 'string' ? value : JSON.stringify(canonical(value))).digest('hex');
export const assert = (condition, message) => { if (!condition) throw new Error(message); };
export const safeId = (id) => {
  assert(typeof id === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(id), 'Invalid source ID or slug');
  return id;
};
export async function readOptional(file) {
  try { return await readFile(file, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
export async function readJson(file) { return JSON.parse(await readFile(file, 'utf8')); }

// Both configuration and tracked state may supply paths. Never follow symlinks.
export async function repoPath(root, relative) {
  assert(typeof relative === 'string' && relative && !path.isAbsolute(relative), 'Expected a repository-relative path');
  const resolved = path.resolve(root, relative);
  assert(resolved.startsWith(path.resolve(root) + path.sep), 'Path escapes repository: ' + relative);
  let part = path.resolve(root);
  for (const segment of path.relative(root, resolved).split(path.sep)) {
    part = path.join(part, segment);
    try { assert(!(await lstat(part)).isSymbolicLink(), 'Symlink in importer path: ' + relative); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return resolved;
}
export async function writeRepo(root, relative, content) {
  const file = await repoPath(root, relative);
  await mkdir(path.dirname(file), {recursive: true});
  await writeFile(file, content);
}
export async function configAt(root) {
  const config = await readJson(path.join(root, 'integrations/ringotel/config.json'));
  assert(config.schemaVersion === 1, 'Unsupported configuration version');
  for (const relative of Object.values(config.paths)) await repoPath(root, relative);
  assert(config.paths.docs.startsWith('docs/apps/'), 'Imported docs must stay under docs/apps/');
  assert(config.paths.originalImages.startsWith('static/img/'), 'Original images must be under static/img/');
  assert(config.paths.brandedImages.startsWith('static/img/'), 'Branded images must be under static/img/');
  assert(!config.paths.originalImages.startsWith(config.paths.brandedImages) &&
    !config.paths.brandedImages.startsWith(config.paths.originalImages), 'Separate original and branded image directories');
  for (const {from, to} of config.branding.substitutions) {
    assert(typeof from === 'string' && from.length && typeof to === 'string', 'Invalid brand substitution');
  }
  return config;
}
