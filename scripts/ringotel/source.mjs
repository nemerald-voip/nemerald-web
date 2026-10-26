import {assert, hash, safeId} from './lib.mjs';

// No tokens, cookies, partner discovery, admin endpoints, or draft queries.
export async function requestBytes(url, {hosts, maxBytes, fetcher = fetch}) {
  const parsed = new URL(url);
  assert(parsed.protocol === 'https:' && !parsed.username && !parsed.password &&
    !parsed.port && hosts.includes(parsed.hostname), 'Unapproved source URL: ' + url);
  const response = await fetcher(url, {
    redirect: 'error', signal: AbortSignal.timeout(30000),
    headers: {accept: '*/*', 'user-agent': 'NemeraldDocsImporter/1.0'},
  });
  assert(response.ok, 'Source fetch failed (' + response.status + '): ' + url);
  assert(Number(response.headers.get('content-length') || 0) <= maxBytes, 'Response exceeds size limit');
  const chunks = [];
  let length = 0;
  for await (const chunk of response.body) {
    length += chunk.length;
    assert(length <= maxBytes, 'Response exceeds size limit');
    chunks.push(chunk);
  }
  return {bytes: Buffer.concat(chunks), type: (response.headers.get('content-type') || '').split(';')[0]};
}

export function articleQuery(config, page) {
  const url = new URL('/api/articles', config.source.apiUrl);
  const params = {
    status: 'published',
    'filters[publishedAt][$notNull]': 'true',
    'filters[visible_to_partners][documentId][$null]': 'true',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(config.source.pageSize),
    'pagination[withCount]': 'true',
    'sort[0]': 'documentId:asc',
    'populate[category][fields][0]': 'name',
    'populate[category][fields][1]': 'slug',
    'populate[platform_section][fields][0]': 'name',
    'populate[platform_section][fields][1]': 'slug',
    'populate[tags][fields][0]': 'name',
    'populate[tags][fields][1]': 'slug',
    'populate[visible_to_partners][fields][0]': 'documentId',
    'populate[cross_platform_links][populate][linked_article][fields][0]': 'slug',
    'populate[cross_platform_links][populate][linked_article][fields][1]': 'title',
    'populate[related_to][fields][0]': 'slug',
    'populate[related_to][fields][1]': 'title',
  };
  config.source.allowedAudiences.forEach((value, i) => { params['filters[audience][$in][' + i + ']'] = value; });
  config.source.allowedPlatforms.forEach((value, i) => { params['filters[platform_section][slug][$in][' + i + ']'] = value; });
  url.search = new URLSearchParams(params).toString();
  return url.href;
}

export function normalizeArticle(row, config) {
  assert(row && !row.attributes, 'Expected the verified Strapi 5 article schema');
  assert(row.publishedAt && Number.isFinite(Date.parse(row.publishedAt)), 'Unpublished article returned');
  assert(Array.isArray(row.visible_to_partners) && row.visible_to_partners.length === 0, 'Missing visibility data or restricted article returned');
  assert(config.source.allowedAudiences.includes(row.audience), 'Unexpected audience');
  assert(config.source.allowedPlatforms.includes(row.platform_section?.slug), 'Unexpected platform');
  assert(typeof row.title === 'string' && row.title.trim(), 'Missing article title');
  assert((Array.isArray(row.body) && row.body.length) || (typeof row.body_html === 'string' && row.body_html.trim()), 'Empty article body');
  const relation = (item) => ({slug: safeId(item.slug), title: item.title || item.name || item.slug});
  const block = (item) => {
    const result = {...item};
    if (item.children) result.children = item.children.map(block);
    if (item.image) {
      // Upload timestamps, thumbnail sizes and CMS IDs do not change the page.
      result.image = {
        url: item.image.url, alternativeText: item.image.alternativeText || '',
        caption: item.image.caption || '',
        provider_metadata: {source: item.image.provider_metadata?.source || null},
      };
    }
    return result;
  };
  return {
    id: safeId(row.documentId), slug: safeId(row.slug), title: row.title,
    // Public articles prefer Blocks, as does Ringotel's current renderer.
    body: Array.isArray(row.body) && row.body.length ? row.body.map(block) : null,
    bodyHtml: Array.isArray(row.body) && row.body.length ? null : row.body_html,
    description: row.seo_description || '',
    platform: {slug: row.platform_section.slug, name: row.platform_section.name || row.platform_section.slug},
    category: row.category ? {slug: safeId(row.category.slug), name: row.category.name || row.category.slug} : {slug: 'general', name: 'General'},
    tags: (row.tags || []).map(x => x.name || x.slug).filter(Boolean).sort(),
    related: (row.related_to || []).map(relation).sort((a, b) => a.slug.localeCompare(b.slug)),
    crossPlatform: (row.cross_platform_links || []).map(x => x.linked_article).filter(Boolean).map(relation).sort((a, b) => a.slug.localeCompare(b.slug)),
    featureNotice: Boolean(row.feature_flag),
  };
}

export async function fetchInventory(config, fetcher = fetch) {
  const records = [];
  const ids = new Set(), slugs = new Set();
  let total, pageCount;
  for (let page = 1; pageCount === undefined || page <= pageCount; page++) {
    const {bytes, type} = await requestBytes(articleQuery(config, page), {
      hosts: [new URL(config.source.apiUrl).hostname], maxBytes: 16000000, fetcher,
    });
    assert(type === 'application/json', 'API returned non-JSON content');
    const response = JSON.parse(bytes.toString('utf8'));
    const meta = response.meta?.pagination;
    assert(Array.isArray(response.data) && meta, 'Missing article pagination');
    assert(Number.isSafeInteger(meta.total) && meta.total > 0 && meta.total <= config.source.maxArticles, 'Empty or implausible article inventory; refusing removal inference');
    assert(meta.page === page && meta.pageSize === config.source.pageSize &&
      meta.pageCount === Math.ceil(meta.total / meta.pageSize), 'Invalid pagination');
    if (total === undefined) { total = meta.total; pageCount = meta.pageCount; }
    assert(meta.total === total && meta.pageCount === pageCount, 'Inventory changed while paging');
    assert(response.data.length === Math.min(meta.pageSize, total - records.length), 'Incomplete article page');
    for (const row of response.data) {
      const article = normalizeArticle(row, config);
      assert(!ids.has(article.id) && !slugs.has(article.slug), 'Duplicate article ID or slug across pages');
      ids.add(article.id); slugs.add(article.slug); records.push(article);
    }
  }
  assert(records.length === total, 'Incomplete article inventory');
  // Populated relations can point outside the public inventory. Do not retain
  // names or links for draft, partner-only, admin or otherwise excluded records.
  return records.map(article => ({
    ...article,
    related: article.related.filter(item => slugs.has(item.slug)),
    crossPlatform: article.crossPlatform.filter(item => slugs.has(item.slug)),
  })).sort((a, b) => a.id.localeCompare(b.id));
}

export async function fetchStableInventory(config, fetcher = fetch) {
  const first = await fetchInventory(config, fetcher);
  const second = await fetchInventory(config, fetcher);
  assert(hash(first) === hash(second), 'Upstream changed during fetch; retry on the next run');
  return second;
}

export function publicImageUrl(raw, config) {
  const url = new URL(raw, config.source.apiUrl);
  if (url.origin === new URL(config.source.apiUrl).origin && url.pathname.startsWith('/uploads/')) {
    const filename = url.pathname.slice('/uploads/'.length).replace(/_[a-f0-9]{10}(\.\w+)$/, '$1');
    return new URL(filename, config.source.publicAssetBase).href;
  }
  return url.href;
}

export function imageExtension(bytes, type) {
  const mime = {'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp'};
  const ext = mime[type];
  assert(ext, 'Unsupported image MIME type: ' + type);
  const valid = (ext === 'png' && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) ||
    (ext === 'jpg' && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) ||
    (ext === 'gif' && /^GIF8[79]a$/.test(bytes.subarray(0, 6).toString())) ||
    (ext === 'webp' && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP');
  assert(valid, 'Image bytes do not match MIME type');
  return ext;
}
