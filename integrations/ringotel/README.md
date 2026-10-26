# Nemerald app documentation imports

The importer proposes public Ringotel app articles in Docusaurus 3.10.2 using
the site's existing theme. The footer links to **Nemerald Apps Help** at
`/docs/apps`. Imported articles live under `docs/apps/ringotel`, grouped by
platform and category; other documentation can use independent folders and
sidebars.

## Enable the daily workflow

1. Confirm permission to reuse Ringotel's article text and screenshots.
   Anonymous access is not a reuse license. Set `reusePermissionConfirmed`
   to `true` in `config.json` only after confirmation.
2. Review the configuration. The text substitution is `Ringotel` → `Nemerald`;
   substitutions are literal and case-sensitive. They affect visible text,
   titles and alt text, not source URLs or code blocks.
3. Merge the implementation and configuration to `main`. In repository
   Settings → Actions → General, allow GitHub Actions to create pull requests.
   The workflow uses the repository's `GITHUB_TOKEN`; no Ringotel credentials
   or PAT are required.
4. Run **Propose app documentation updates** from Actions for the first import.
   It also runs daily at **11:00 PM PST (07:00 UTC the following day)**.
   This uses fixed PST (UTC-8), so it runs at midnight PDT during daylight saving
   time. Scheduling is subject to GitHub's normal
   delays and inactivity policies.
5. Review and manually merge the import PR. The existing `deploy.yml` publishes
   on pushes to `main`. The importer never merges PRs or runs deployment.

Imports ship disabled, with an empty upstream state. No Ringotel articles or
screenshots are bundled in this implementation.

Make **Validate website / validate** a required status check on `main` if you
want GitHub to enforce conflict resolution and successful builds before merging.
PR workflows created by `GITHUB_TOKEN` may require approving their runs in GitHub.
The import workflow always builds the proposed site itself before opening a PR.
See [GitHub's workflow triggering rules](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).

## What a run does

- Checks all open and closed import PRs, including paginated history.
- Defers if any `automation/ringotel-*` PR is open, including drafts.
- Reads only anonymous, published, public app articles from the verified
  Strapi 5 endpoint. Partner visibility, audience and platform are checked
  both in the request filters and in every returned record.
- Fetches the complete inventory twice with stable ordering. Both scans must
  agree. Missing pagination, duplicates, an empty inventory, schema changes,
  unsupported article content and changing results abort before
  repository writes. There is no authenticated fallback.
- Prefers rich-text Blocks for public articles, matching Ringotel's renderer;
  falls back to HTML. Handles headings, lists, nested lists, links, quotations,
  code, tables in HTML, inline icons, images, related articles and platform links.
  Underline becomes emphasis with a review warning. Unsupported embedded or
  active content stops the import rather than being silently discarded.
- Downloads PNG, JPEG, GIF and WebP images, verifies their signatures, hashes
  the bytes and uses content-addressed filenames. If an image is unavailable
  or unsupported, its article is held back for review and retried next run.
  The existing article and baseline remain untouched; other complete articles
  can proceed. The job summary/report lists blocked articles even when no PR
  is needed. Requests have timeouts, byte limits, approved hosts and no
  redirects. All images are fetched each run so changed bytes at the same URL
  are detected.
- Rewrites links to local articles included in the import or already present.
  Excluded/unimported articles retain source links; unknown external links stay
  external. Article paths stay stable across upstream title/category changes.
- Runs a three-way merge using the accepted upstream Markdown, newly generated
  upstream Markdown, and the customized local document.
- Builds with `npm run build`, then creates a PR only when there are changes.
  A PR with text conflicts is a draft.

The source-scoped configuration is recorded in state. Changing the API,
audience or platform scope after importing fails until you deliberately review
and reset `state.sourceScope`; changing scope must not masquerade as removals.
The importer does not automatically prune old images or deleted local pages.

## Preserve wording and resolve conflicts

Edit the article in `docs/apps/ringotel/...` directly on the import PR branch.
Do not edit its `integrations/ringotel/upstream/ID.json` baseline.
Each baseline holds the normalized source and the exact generated Markdown
from the last accepted import, before your manual edits.

Non-overlapping upstream changes merge automatically. For overlapping changes,
the customized article and its accepted baseline remain untouched. A file in
`integrations/ringotel/conflicts/ID.json` contains:

- `base`: the previous upstream Markdown
- `local`: your customized text (or null for a manually deleted article)
- `incoming`: the proposed upstream Markdown
- `merge`: Git's three-way diff with conflict markers, kept outside Docusaurus

Edit the actual article to the result you want, then run:

```sh
npm run ringotel:resolve -- ARTICLE_ID resolved
npm run ringotel:check
npm run build
```

Alternatively choose `keep-local` to reject this update while keeping your
version, or `accept-upstream` to replace the article with the incoming version.
Resolution advances the upstream baseline and removes the conflict record.
The next import can then compare new upstream changes against your decision.
Commit the article, state, baseline and conflict-file removal together.

A deliberately deleted local article is not recreated silently. Updates become
conflicts and `keep-local` preserves the deletion.

## Branded screenshots

AI assistants must follow the image-replacement procedure in
[the repository instructions](../../AGENTS.md#replacing-images-in-imported-app-articles).
You can request, for example: "Replace the calling screenshot in ARTICLE_TITLE
with this Nemerald image." The assistant should resolve the tracked image slot,
save the asset, update its mapping and Markdown link, and validate the result.

Originals are immutable under `static/img/ringotel/original/`. Never edit them:
old originals may still be referenced by customized pages.

Put branded replacements under `static/img/ringotel/branded/` and configure
`branding.images` in `config.json`. The PR's `review.json` lists image slots,
canonical source URLs, hashes, old/new original paths, and replacements.

### Example: replace a calling screenshot

Suppose you want an imported article to use your Nemerald calling screenshot.
The ID and original-image hashes below are illustrative; use the actual image
`slot` from `integrations/ringotel/review.json` or `state.json`.

1. Save your branded image in the repository at:

   ```text
   static/img/ringotel/branded/call-screen.png
   ```

2. In the article's Markdown file, replace the original image link:

   ```markdown
   ![Calling screen](/img/ringotel/original/URL_HASH/IMAGE_HASH.png)
   ```

   with:

   ```markdown
   ![Nemerald calling screen](/img/ringotel/branded/call-screen.png)
   ```

3. Add the exact image slot to `branding.images` in `config.json`, preserving
   your other configuration and existing mappings. For example, the branding
   section would look like this:

```json
{
  "branding": {
    "substitutions": [{"from": "Ringotel", "to": "Nemerald"}],
    "images": {
      "example-article-id:image:0": "/img/ringotel/branded/call-screen.png"
    }
  }
}
```

The file's repository path starts with `static/`, while the Markdown link and
configuration value both start with `/img/`. Commit the image, article and
configuration together. Future syncs use the branded file and flag changes
to the upstream screenshot for review. You can later replace `call-screen.png`
at the same path without changing the link or mapping again.

### Mapping the same source image across articles

To use one branded replacement wherever a source image appears, use its
canonical `url` from the import report as the key inside `branding.images`:

```json
{
  "https://knowledge-base-web.s3.amazonaws.com/kb.ringotel.com/assets/example.png": "/img/ringotel/branded/shared-screen.png"
}
```

A slot mapping applies to one image occurrence in one article; its position
starts at zero and includes inline icons. A canonical URL mapping applies to
all uses of the same upstream image. Slot mappings take precedence.

When adding a replacement during review, also change the image link in the
current article to `/img/ringotel/branded/...` before merging. The mapping
protects subsequent imports. The importer never writes to the branded folder.

If Ringotel changes the bytes or URL of a mapped screenshot, the PR flags it
and keeps the replacement. When a URL changes in the same slot, an existing
URL-based replacement is retained and the mapping is flagged for review.
Because upstream can insert or reorder images, always check slot-based
replacements against the new original; matching is not visual recognition.

All changed image references appear in `review.json`; the PR summary groups
repeated uses of the same image. Original files are available in the PR diff.

## Rejections, pending changes and removals

- An open import PR freezes subsequent runs. Your branch edits are never
  rebased, force-pushed, or overwritten by the automation.
- Closing an import PR without merging rejects its exact upstream article/image
  versions. The machine-readable HTML comment in the PR body is its durable
  rejection manifest. Keep it when editing the PR description.
- A changed upstream version can be proposed later. Rejections apply per
  article, so an unrelated new article does not re-propose old rejected changes.
- For permanent exclusions, add document IDs to `excludedArticleIds`.
- For explicit permanent version decisions, add fingerprints from the report
  to `rejectedVersions`, for example
  `{"article:ARTICLE_ID": ["SHA256_VERSION"]}`. Removals use `removed:ARTICLE_ID`.
- To reject part of an otherwise accepted PR, restore that article to your
  desired version but retain the new baseline/state. That difference becomes
  a preserved customization. Use `keep-local` for a conflicting article.
- A missing upstream article is flagged for review and marked acknowledged
  when the PR is merged; the local article and images are retained. Closing
  the removal proposal rejects that exact removal. Reappearance clears the
  acknowledgement. Failed/incomplete fetches never infer removals.

The automation reads history from GitHub on every workflow run, avoiding
expiring caches or artifacts as the source of rejection/pending state.
For very large imports the PR body has GitHub's size limit; the importer fails
before opening a PR if the complete summary cannot fit.

## Commands and validation

### GitHub returns 403 when opening the pull request

If fetching and building succeed but PR creation returns 403, inspect the
GitHub error message. The workflow already requests `contents: write` and
`pull-requests: write`. GitHub also controls whether Actions can create PRs
through a separate repository setting.

Open [the repository's Actions settings](https://github.com/nemerald-voip/nemerald-web/settings/actions).
Under **Workflow permissions**, enable **Allow GitHub Actions to create and
approve pull requests** and save. If that option is locked, an organization
or enterprise administrator must allow it. The importer itself only creates
review PRs; it contains no approval or merge step.
See [GitHub's setting documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests).

A PR creation failure can leave the successfully built import on an
`automation/ringotel-*` branch. Preserve that branch and its report when
recovering a PR, including the rejection manifest produced by
`pullRequestBody(report)`. After correcting the setting, run the workflow again
if there is no recovered open import PR; otherwise the workflow correctly defers
until review is complete.

### Local commands

```sh
npm ci
npm run ringotel:test       # synthetic fixtures; no network
npm run ringotel:smoke      # real Docusaurus build with synthetic imported docs
npm run ringotel:probe      # reads public inventory twice; no repository writes
npm run ringotel:import     # requires reusePermissionConfirmed
npm run ringotel:check      # rejects unresolved conflicts and modified originals
npm run build
```

For normal imports use the manual workflow, which includes GitHub review history.
The local import command is for deliberate local work and does not consult
remote PR history. It does not push, open a PR or deploy.

`.ringotel-run/` contains ignored transient reports. `review.json` is a tracked
summary of the latest proposal; its conflict list is historical. The remaining
files in `conflicts/` determine whether review is resolved.

Tests cover pagination failures, unstable scans, public-only access, safe paths,
conversion, idempotence, local edits, conflict resolution, rejected versions,
missing articles, changed screenshot bytes and branded image preservation.
Production builds validate the actual generated Markdown using `mdx: {format: md}`
so imported text is not executable MDX.

## Source verification

Rechecked October 26, 2026 using:

- [Public knowledge base](https://kb.ringotel.com/)
- [Frontend configuration](https://kb.ringotel.com/config.js)
- [Article renderer](https://kb.ringotel.com/article.js)
- [Public visibility filters](https://kb.ringotel.com/app.js)
- [Public image URL mapping](https://kb.ringotel.com/partner.js)

The public API was accessible anonymously. Two complete scans agreed on 91
published articles across desktop, Android and iOS. All 91 converted in memory;
414 image references used 317 unique public S3 URLs. 316 images downloaded and
passed format checks; `desktop_sms_sendas.png` returned HTTP 403. Its article
will be held back until the image becomes available, without trying credentials
or alternate access paths. Category relationships were absent,
so the importer supplies a General category. The robots URLs returned the site's
HTML fallback, not a robots policy. This establishes technical access only:
documentation reuse rights remain unverified.

The importer never copies frontend application code or consumes credentials
from the public frontend configuration. The source URLs, allowed hosts,
substitutions, exclusions and asset mappings are explicit in `config.json`.
