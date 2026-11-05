import { describe, expect, it } from 'vitest';
import { canonicalUrl, notFound, pageForPath, pages } from './routes';

describe('pageForPath', () => {
  it.each(pages)('resolves $path to its configured page', page => {
    expect(pageForPath(page.path)).toBe(page);
  });

  it.each(pages.filter(page => page.path !== '/'))('accepts $path without its final slash', page => {
    expect(pageForPath(page.path.slice(0, -1))).toBe(page);
  });

  it.each(['/missing', '/404.html', '/SUPPORT/', '/support//', '//', 'support', '/apps/', '/apps/wm-pebbles/extra', '/support/?q=1', '/support/#email', '/%73upport/', '/support/../contact/'])('does not silently normalize unsupported input %j', path => {
    expect(pageForPath(path)).toBe(notFound);
  });

  it('treats an empty pathname as the homepage', () => {
    expect(pageForPath('')).toBe(pages[0]);
  });
});

describe('page metadata', () => {
  it('has unique route identities and useful titles and descriptions', () => {
    expect(pages.map(page => page.page)).toEqual(['home', 'pebbles', 'support', 'contact', 'privacy']);
    expect(new Set(pages.map(page => page.path)).size).toBe(pages.length);
    for (const page of [...pages, notFound]) {
      expect(page.title).toContain('WisdomMedium');
      expect(page.description.trim().length).toBeGreaterThan(20);
    }
    expect(notFound.page).toBe('notFound');
    expect(notFound.path).toBe('/404.html');
  });

  it.each([...pages, notFound])('constructs the canonical URL for $path', page => {
    expect(canonicalUrl(page)).toBe(`https://wisdommedium.com${page.path}`);
  });
});
