import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { canonicalUrl, notFound, pages, type PageInfo } from '../src/routes';
import { site } from '../src/site';

const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function metadata(page: PageInfo) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = escapeHtml(canonicalUrl(page));
  return [
    `<meta name="description" content="${description}" />`,
    page.page === 'notFound' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    page.page === 'notFound' ? '' : `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`
  ].filter(Boolean).join('\n    ');
}

for (const page of [...pages, notFound]) {
  const body = renderToString(<App path={page.path} />);
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace('</head>', `    ${metadata(page)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (!html.includes(body) || !html.includes(page.title)) throw new Error(`Could not render ${page.path}`);
  const output = page.page === 'notFound' ? path.join(dist, '404.html') : path.join(dist, page.path, 'index.html');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
  console.log(`Rendered ${page.path}`);
}
