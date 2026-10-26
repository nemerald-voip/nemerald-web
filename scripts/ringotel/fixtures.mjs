// Entirely synthetic articles and screenshots; no licensed source content.
export const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aF9kAAAAASUVORK5CYII=', 'base64');
export const textBlock = text => ({type: 'paragraph', children: [{type: 'text', text}]});
export function sample(id = 'sample-a', changes = {}) {
  return {
    id, slug: id, title: 'Ringotel ' + id, description: '',
    platform: {slug: 'desktop-app', name: 'Desktop'}, category: {slug: 'calls', name: 'Calls'},
    tags: ['Calling'], related: [], crossPlatform: [], featureNotice: false,
    bodyHtml: null,
    body: [
      textBlock('Open Ringotel.'),
      textBlock('Your local preferences go here.'),
      {type: 'heading', level: 2, children: [{type: 'text', text: 'Steps'}]},
      textBlock('First step.'),
      textBlock('Second step.'),
      textBlock('Third step.'),
      {type: 'image', image: {url: '/uploads/sample_0123456789.png', alternativeText: 'Ringotel screen'}},
    ],
    ...changes,
  };
}
export function strapiRow(id = 'sample-a', changes = {}) {
  const article = sample(id);
  return {
    documentId: id, title: article.title, slug: article.slug,
    publishedAt: '2026-01-01T00:00:00.000Z', visible_to_partners: [],
    audience: 'all', body: article.body, body_html: '<p>Outdated HTML fallback.</p>',
    platform_section: article.platform, category: article.category, tags: [],
    related_to: [], cross_platform_links: [], ...changes,
  };
}
