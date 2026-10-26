# Repository instructions

## Replacing images in imported app articles

Apply this procedure when a user asks to replace, brand, or update an image in
an imported Ringotel/Nemerald app article, including requests by article title,
article ID, screenshot name, image URL, or image slot. Read
[the import guide](integrations/ringotel/README.md#branded-screenshots) and the
current [configuration](integrations/ringotel/config.json) before editing.
Use the configured paths and existing mappings as the source of truth.

### Locate the exact article and image

1. Check the working tree and branch before making changes. Preserve existing
   user edits. If the user identifies an open import PR, work on that PR's
   branch; do not reset or regenerate its contents.
2. Search the current Markdown under `docs/apps/ringotel/` for the title,
   slug, image filename or supplied identifier. Resolve the document ID using
   `integrations/ringotel/state.json`: `articles[documentId].docPath` gives
   the tracked article path. Stored upstream snapshots also contain
   `source.title` and `source.slug` for lookup.
3. Match the actual image link in the article to its tracked entry in
   `articles[documentId].images[]`. Each entry includes `slot`, `url`,
   `original`, `replacement` and `replacementKey`. Read the current config
   too: manual mappings may be newer than state. The latest `review.json`
   can help identify changed images, but is a historical proposal report.
4. Use the exact tracked slot, such as `documentId:image:2`. Indices are
   zero-based and include inline icons. Do not infer the slot by counting only
   large screenshots or by the current visual order in customized Markdown.
   Inspect the images when needed to distinguish similar screenshots.
   A numeric CMS media ID, filename, source URL and slot are different
   identifiers; do not substitute one for another without verifying the match.
5. If the article has a pending file in `integrations/ringotel/conflicts/`,
   inspect its proposed `entry.images` as well as the accepted state. Do not
   silently resolve unrelated text conflicts or erase the conflict record.
6. Resolve identifiers from repository evidence before asking the user. If
   the target remains ambiguous, request only the missing distinction. If the
   article has not been imported, explain that there is no tracked image to
   replace yet; do not invent an article ID, slot or baseline.

### Prepare the branded asset

1. Use the replacement the user supplied or the existing asset they identified.
   Inspect a local image before editing it. If image creation or editing is
   requested, follow the available image tool/skill instructions. If neither
   a replacement nor instructions to create one are available, request the
   missing asset or description.
2. Save the result under the configured `paths.brandedImages`, normally
   `static/img/ringotel/branded/`. Prefer a descriptive name scoped to the
   article and image, for example
   `static/img/ringotel/branded/ARTICLE_ID/call-screen.png`. Match the file's
   extension to its actual format.
3. Before overwriting an existing branded file, search current articles and
   config mappings for other uses. For a request limited to one article/image,
   create a separate file when replacing the shared file would change other
   pages. Reuse a path when all affected uses are within the requested scope.
4. Never overwrite, rename, delete or re-encode tracked originals under
   `paths.originalImages`. Their hashes are checked by the importer. Original
   images and previous versions remain available for comparison.

### Update the mapping and article together

1. For a request targeting one image in one article, add or update that image's
   exact slot key in `branding.images`. This takes precedence over a shared
   source-URL mapping. Use a canonical source-URL key only when the user wants
   the replacement to apply across all uses of that source image.
2. Mapping values are public paths beginning with `/img/`, without `static/`.
   Preserve every unrelated mapping, the configured name substitutions,
   reuse-permission setting, exclusions, schedule and source settings.
3. Update the corresponding image occurrence in the actual article to the
   same public path. Use accurate alt text. Preserve the article's wording,
   front matter, route and other image occurrences unless the request includes
   changing them. Do not globally replace a shared URL for a one-image request.
4. A branding change normally touches the branded asset, the article and
   `config.json`. Keep these changes together for review. Do not manually edit
   `state.json`, files under `upstream/`, or `review.json` to record branding.
   The next accepted import records the mapping in its state and baseline.
   Do not run a full live import just to register a replacement.
5. If the user later supplies a new version of an already mapped branded file
   at the same path, only the asset needs updating, subject to the shared-use
   check above. The importer never writes to the branded folder.

Example only; replace `ARTICLE_ID:image:2` with the verified slot. Add this
entry inside the existing `branding.images` object:

```json
{
  "ARTICLE_ID:image:2": "/img/ringotel/branded/ARTICLE_ID/call-screen.png"
}
```

The matching Markdown is:

```markdown
![Nemerald calling screen](/img/ringotel/branded/ARTICLE_ID/call-screen.png)
```

### Validate and hand off

1. Verify the JSON parses, the new mapping points to an existing local file,
   and the intended article occurrence uses that same path. Inspect the final
   image. Confirm that other articles sharing an old asset were not changed.
2. Run `npm run ringotel:check` and `npm run build`. The review check validates
   accepted state; it does not replace checking a newly added mapping yourself.
   If existing text conflicts block the check, report them accurately and
   preserve them unless resolving them is part of the user's request.
3. Review the diff to ensure originals, upstream snapshots and unrelated user
   edits were preserved. Follow the session's commit/PR instructions. Never
   merge or publish imported changes automatically.
4. Report the article, exact image slot, branded file/public path, mapping scope
   and validation result. Explain any ambiguity or remaining conflict.
   Upstream image changes should produce a branding-review notice while the
   mapped replacement remains in place.
