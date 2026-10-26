import {parseFragment} from 'parse5';
import {toMarkdown} from 'mdast-util-to-markdown';
import {gfmToMarkdown} from 'mdast-util-gfm';
import {assert} from './lib.mjs';
import {publicImageUrl} from './source.mjs';

const text = value => ({type: 'text', value});
const paragraph = children => ({type: 'paragraph', children});
const node = (type, children) => ({type, children});
const plain = value => (value.children || []).map(x => x.value ?? plain(x)).join('');

export function prepareArticle(article, config) {
  const images = [], warnings = [];
  const brand = value => config.branding.substitutions.reduce((s, rule) => s.split(rule.from).join(rule.to), String(value));
  function image(raw, alt = '') {
    assert(raw, 'Image missing URL in ' + article.id);
    const slot = article.id + ':image:' + images.length;
    const url = publicImageUrl(raw, config);
    images.push({slot, url});
    return {type: 'image', url: slot, alt: brand(alt), title: null};
  }
  function inlineText(value) {
    const result = [];
    let offset = 0;
    for (const match of value.matchAll(/\{\{icon:([^}]+)\}\}/g)) {
      result.push(text(brand(value.slice(offset, match.index))), image(match[1].trim(), 'App icon'));
      offset = match.index + match[0].length;
    }
    result.push(text(brand(value.slice(offset))));
    return result;
  }
  function link(url, children) {
    const parsed = new URL(url || '', config.source.siteUrl);
    assert(['https:', 'http:', 'mailto:', 'tel:', 'callto:'].includes(parsed.protocol), 'Unsupported link protocol');
    return {type: 'link', url: url?.startsWith('#') ? url : parsed.href, children};
  }
  function inline(children = []) {
    return children.flatMap(child => {
      if (child.type === 'link') return [link(child.url, inline(child.children))];
      assert(child.type === 'text', 'Unsupported inline block: ' + child.type);
      if (child.code) return [{type: 'inlineCode', value: brand(child.text || '')}];
      let nodes = inlineText(child.text || '');
      if (child.strikethrough) nodes = [node('delete', nodes)];
      if (child.underline) {
        warnings.push('Underline converted to emphasis');
        nodes = [node('emphasis', nodes)];
      }
      if (child.italic) nodes = [node('emphasis', nodes)];
      if (child.bold) nodes = [node('strong', nodes)];
      return nodes;
    });
  }
  function block(item) {
    switch (item.type) {
      case 'paragraph': return paragraph(inline(item.children));
      case 'heading':
        assert(Number.isInteger(item.level) && item.level >= 1 && item.level <= 6, 'Invalid heading level');
        return {type: 'heading', depth: item.level, children: inline(item.children)};
      case 'quote': return node('blockquote', [paragraph(inline(item.children))]);
      case 'code': return {type: 'code', lang: item.language || null, value: (item.children || []).map(x => x.text || '').join('')};
      case 'image':
        assert(item.image?.provider_metadata?.source !== 'partner-upload', 'Partner upload encountered in public article');
        return paragraph([image(item.image?.url, item.image?.alternativeText || item.image?.caption || '')]);
      case 'list':
        return {
          type: 'list', ordered: item.format === 'ordered', spread: false,
          children: (item.children || []).map(child => {
            if (child.type === 'list') return node('listItem', [block(child)]);
            assert(child.type === 'list-item', 'Unsupported list child');
            const contents = [], pending = [];
            const flush = () => { if (pending.length) contents.push(paragraph(inline(pending.splice(0)))); };
            for (const entry of child.children || []) {
              if (['text', 'link'].includes(entry.type)) pending.push(entry);
              else { flush(); contents.push(block(entry)); }
            }
            flush();
            return {...node('listItem', contents), spread: false};
          }),
        };
      default: throw new Error('Unsupported rich-text block: ' + item.type + ' in ' + article.id);
    }
  }

  const phrasingTypes = new Set(['text', 'image', 'link', 'emphasis', 'strong', 'delete', 'inlineCode', 'break']);
  function flow(nodes) {
    const result = [], pending = [];
    const flush = () => {
      if (pending.some(x => x.type !== 'text' || x.value.trim())) result.push(paragraph(pending.splice(0)));
      else pending.length = 0;
    };
    for (const item of nodes) {
      if (phrasingTypes.has(item.type)) pending.push(item);
      else { flush(); result.push(item); }
    }
    flush();
    return result;
  }
  function html(element) {
    if (element.nodeName === '#text') return inlineText(element.value);
    if (element.nodeName === '#comment') return [];
    const tag = element.tagName;
    const attrs = Object.fromEntries((element.attrs || []).map(x => [x.name, x.value]));
    const children = () => (element.childNodes || []).flatMap(html);
    if (['script', 'style', 'form', 'input', 'button', 'object', 'embed', 'iframe', 'svg'].includes(tag)) {
      throw new Error('Unsupported active/embedded HTML <' + tag + '> in ' + article.id);
    }
    if (!tag || ['div', 'section', 'article', 'main', 'figure', 'figcaption'].includes(tag)) return children();
    if (tag === 'p') return [paragraph(children())];
    if (/^h[1-6]$/.test(tag)) {
      // Preserve explicit legacy fragment IDs without introducing raw HTML.
      const heading = {type: 'heading', depth: Number(tag[1]), children: children()};
      if (attrs.id && /^[a-zA-Z][\w-]*$/.test(attrs.id)) heading.children.push(text(' {#' + attrs.id + '}'));
      return [heading];
    }
    if (tag === 'img') {
      assert(attrs['data-source'] !== 'partner-upload', 'Partner image encountered');
      return [image(attrs.src, attrs.alt)];
    }
    if (tag === 'a') return attrs.href ? [link(attrs.href, children())] : children();
    if (['strong', 'b', 'em', 'i', 's', 'del', 'u'].includes(tag)) {
      if (tag === 'u') warnings.push('Underline converted to emphasis');
      return [node(({b: 'strong', i: 'emphasis', em: 'emphasis', s: 'delete', del: 'delete', u: 'emphasis'})[tag] || tag, children())];
    }
    if (tag === 'code') return [{type: 'inlineCode', value: plain(node('', children()))}];
    if (tag === 'pre') {
      const raw = element.childNodes?.find(x => x.tagName === 'code') || element;
      const content = (el) => el.nodeName === '#text' ? el.value : (el.childNodes || []).map(content).join('');
      return [{type: 'code', value: content(raw)}];
    }
    if (tag === 'blockquote') return [node('blockquote', flow(children()))];
    if (tag === 'br') return [{type: 'break'}];
    if (tag === 'hr') return [{type: 'thematicBreak'}];
    if (tag === 'ul' || tag === 'ol') return [{
      type: 'list', ordered: tag === 'ol', start: Number(attrs.start) || 1, spread: false,
      children: children().filter(x => x.type === 'listItem'),
    }];
    if (tag === 'li') return [{...node('listItem', flow(children())), spread: false}];
    if (tag === 'table') return [node('table', children().filter(x => x.type === 'tableRow'))];
    if (['thead', 'tbody', 'tfoot'].includes(tag)) return children();
    if (tag === 'tr') return [node('tableRow', children().filter(x => x.type === 'tableCell'))];
    if (tag === 'th' || tag === 'td') {
      assert(!attrs.colspan && !attrs.rowspan, 'Merged table cells need manual conversion');
      return [node('tableCell', children().flatMap(x => x.type === 'paragraph' ? x.children : [x]))];
    }
    if (['span', 'small', 'mark'].includes(tag)) return children();
    throw new Error('Unsupported HTML <' + tag + '> in ' + article.id);
  }
  const tree = node('root', article.body ? article.body.map(block) : flow(html(parseFragment(article.bodyHtml))));
  if (article.featureNotice) tree.children.unshift(node('blockquote', [paragraph([text('Availability of this feature depends on your service configuration. Contact support for details.')])]));
  for (const [label, items] of [['Related articles', article.related], ['Other platforms', article.crossPlatform]]) {
    if (!items.length) continue;
    tree.children.push({type: 'heading', depth: 2, children: [text(label)]}, {
      type: 'list', ordered: false, spread: false,
      children: items.map(item => node('listItem', [paragraph([link('/article.html?slug=' + encodeURIComponent(item.slug), [text(brand(item.title))])])])),
    });
  }
  return {tree, images, warnings: [...new Set(warnings)], title: brand(article.title), description: brand(article.description)};
}

export function renderArticle(prepared, article, route, imageUrls, routes, config) {
  const tree = structuredClone(prepared.tree);
  function walk(item) {
    if (item.type === 'image') {
      assert(imageUrls[item.url], 'Unresolved image: ' + item.url);
      item.url = imageUrls[item.url];
    }
    if (item.type === 'link' && !item.url.startsWith('#')) {
      const url = new URL(item.url, config.source.siteUrl);
      if (config.source.articleHosts.includes(url.hostname)) {
        const slug = url.searchParams.get('slug') || decodeURIComponent(url.pathname.replace(/^\/|\/$/g, ''));
        if (routes.has(slug)) item.url = routes.get(slug) + url.hash;
      }
    }
    item.children?.forEach(walk);
  }
  walk(tree);
  const front = {
    title: prepared.title, slug: route.replace(/^\/docs/, ''), mdx: {format: 'md'},
    ...(prepared.description ? {description: prepared.description} : {}),
    tags: [...new Set([article.platform.name, article.category.name, ...article.tags])]
      .map(s => config.branding.substitutions.reduce((value, rule) => value.split(rule.from).join(rule.to), s)),
  };
  return '---\n' + Object.entries(front).map(([key, value]) => key + ': ' + JSON.stringify(value)).join('\n') +
    '\n---\n\n' + toMarkdown(tree, {extensions: [gfmToMarkdown()], bullet: '-', fences: true});
}
