import {assert} from './lib.mjs';

export const branchPrefix = 'automation/ringotel-';
const marker = /<!-- ringotel-import:v1 ([A-Za-z0-9+/=]+) -->/;

export function importHistory(pulls) {
  const rejected = {}, open = [];
  for (const pr of pulls) {
    if (!pr.head?.ref?.startsWith(branchPrefix)) continue;
    if (pr.state === 'open') { open.push(pr.number); continue; }
    if (pr.merged_at) continue;
    const match = pr.body?.match(marker);
    // Fail closed: a removed marker must not erase the rejection history.
    assert(match, 'Closed import PR #' + pr.number + ' has no rejection manifest; restore its marker');
    const records = JSON.parse(Buffer.from(match[1], 'base64').toString('utf8'));
    assert(Array.isArray(records), 'Invalid PR manifest');
    for (const {key, version} of records) {
      assert(/^(article|removed):[a-zA-Z0-9_-]+$/.test(key) && /^[a-f0-9]{64}$/.test(version), 'Invalid rejection record');
      rejected[key] = [...new Set([...(rejected[key] || []), version])];
    }
  }
  return {open, rejected};
}

const escape = value => String(value).replace(/[\\\u0060*_[\]<>]/g, '\\$&').replace(/[\r\n]/g, ' ');
export function pullRequestBody(report) {
  const imageGroups = new Map();
  for (const entry of report.images) {
    const key = entry.url + '\n' + (entry.replacement || '') + '\n' + Boolean(entry.removed);
    const group = imageGroups.get(key) || {...entry, uses: 0};
    group.uses++;
    imageGroups.set(key, group);
  }
  const sections = [
    'Imports published Ringotel app documentation into Nemerald Apps Help. Review wording and screenshots before merging.',
    'New: ' + report.new.length + ' · Updated: ' + report.updated.length + ' · Images: ' + report.images.length +
      ' · Text conflicts: ' + report.conflicts.length + ' · Missing upstream: ' + report.removals.length,
    '### New articles\n\n' + (report.new.map(x => '- ' + escape(x.title) + ' — \u0060' + x.id + '\u0060').join('\n') || 'None.'),
    '### Updated articles\n\n' + (report.updated.map(x => '- ' + escape(x.title) + ' — \u0060' + x.id + '\u0060').join('\n') || 'None.'),
    '### Images needing branding review\n\n' + ([...imageGroups.values()].map(x =>
      '- ' + escape(new URL(x.url).pathname.split('/').pop()) + ' (' + x.uses + ' reference(s))' +
      ' — ' + (x.replacement ? 'branded replacement preserved: \u0060' + x.replacement + '\u0060' : 'review original screenshot') +
      (x.removed ? ' (removed upstream; local image file retained)' : x.previousOriginal ? ' (changed)' : ' (new)')).join('\n') || 'None.'),
    '### Text conflicts\n\n' + (report.conflicts.map(x => '- ' + escape(x.title) + ': \u0060' + x.file + '\u0060').join('\n') || 'None.'),
    '### Missing upstream articles\n\n' + (report.removals.map(x => '- \u0060' + x.file + '\u0060 retained for review.').join('\n') || 'None.'),
    '### Articles held back because images could not be fetched\n\n' + ((report.blocked || []).map(x =>
      '- ' + escape(x.title) + ' (\u0060' + x.id + '\u0060): ' + escape(x.reason) +
      '. Any existing article and baseline are unchanged.').join('\n') || 'None.'),
    '### Review notes\n\n' + (report.warnings.map(x => '- ' + escape(x)).join('\n') || 'No conversion warnings.'),
    '- [ ] Review article wording and screenshot branding.\n- [ ] Resolve any text conflicts with \u0060npm run ringotel:resolve -- ID resolved\u0060 (or \u0060keep-local\u0060 / \u0060accept-upstream\u0060).\n- [ ] Run \u0060npm run ringotel:check && npm run build\u0060 after edits.\n- [ ] Review any upstream removals; no local articles were deleted.',
    'The existing Docusaurus build passed before this PR was opened. The full inventory, image paths, source URLs, and hashes are in \u0060integrations/ringotel/review.json\u0060. Original images are immutable; branded replacements belong in \u0060static/img/ringotel/branded/\u0060.',
    'This branch stays unchanged by subsequent imports while the PR is open. Closing without merging rejects these exact upstream versions. New upstream versions can be proposed later. Merge manually after review; only the existing main-branch deployment publishes the site.',
    '<!-- ringotel-import:v1 ' + Buffer.from(JSON.stringify(report.changes)).toString('base64') + ' -->',
  ];
  const body = sections.join('\n\n') + '\n';
  assert(body.length <= 65000, 'Import summary exceeds GitHub PR body limit; narrow the initial batch using excludedArticleIds');
  return body;
}

export async function githubRequest(endpoint, token, options = {}) {
  const response = await fetch('https://api.github.com' + endpoint, {
    ...options, redirect: 'error', signal: AbortSignal.timeout(30000),
    headers: {
      authorization: 'Bearer ' + token, accept: 'application/vnd.github+json',
      'content-type': 'application/json', 'x-github-api-version': '2022-11-28',
      ...options.headers,
    },
  });
  assert(response.ok, 'GitHub API request failed: ' + response.status + ' ' + endpoint);
  return response.json();
}

export async function listPulls(repository, token) {
  assert(/^[\w.-]+\/[\w.-]+$/.test(repository), 'Invalid GitHub repository');
  const pulls = [];
  for (let page = 1; ; page++) {
    const batch = await githubRequest('/repos/' + repository + '/pulls?state=all&per_page=100&page=' + page, token);
    pulls.push(...batch);
    if (batch.length < 100) return pulls;
  }
}
