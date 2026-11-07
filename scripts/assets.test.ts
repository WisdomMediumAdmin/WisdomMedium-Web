// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { canonicalUrl, pages } from '../src/routes';

describe('public asset contracts', () => {
  it('lists every indexable route exactly once in the sitemap', async () => {
    const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    expect(urls.sort()).toEqual(pages.map(canonicalUrl).sort());
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it('permits crawling and advertises the production sitemap', async () => {
    const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');
    expect(robots).toMatch(/^User-agent: \*$/m);
    expect(robots).toMatch(/^Allow: \/$/m);
    expect(robots).toMatch(/^Sitemap: https:\/\/wisdommedium.com\/sitemap.xml$/m);
    expect(robots).not.toMatch(/^Disallow:\s*\/$/m);
  });

  it('keeps the template mount point, module entry, language, and favicon available', async () => {
    const template = await readFile(new URL('../index.html', import.meta.url), 'utf8');
    expect(template).toContain('<html lang="en">');
    expect(template.match(/<div id="root"><\/div>/g)).toHaveLength(1);
    expect(template).toContain('<script type="module" src="/src/main.tsx"></script>');
    expect(template).toContain('name="viewport" content="width=device-width, initial-scale=1.0"');
    expect(template).toContain('href="/favicon.svg"');
    const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
    expect(favicon).toContain('<svg');
    expect(favicon).toContain('viewBox="0 0 64 64"');
  });
});
