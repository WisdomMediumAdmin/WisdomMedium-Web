import { describe, expect, it } from 'vitest';
import { appPath, apps, emailHref, site } from './site';
import { pageForPath } from './routes';

describe('public site configuration', () => {
  it('defines one public origin and support inbox', () => {
    expect(site).toEqual({ name: 'WisdomMedium', tagline: 'Thoughtful apps for everyday life.', domain: 'https://wisdommedium.com', email: 'support@wisdommedium.com' });
  });

  it('keeps app slugs unique and their product/privacy destinations routable', () => {
    expect(apps.length).toBeGreaterThan(0);
    expect(new Set(apps.map(app => app.slug)).size).toBe(apps.length);
    for (const app of apps) {
      expect(app.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(app.name.trim()).not.toBe('');
      expect(app.summary.trim()).not.toBe('');
      expect(app.description.trim()).not.toBe('');
      expect(pageForPath(appPath(app)).page).not.toBe('notFound');
      expect(pageForPath(app.privacyPolicyPath).page).toBe('privacy');
    }
  });

  it.each(['wm-pebbles', 'another-app'])('builds a root-relative product URL for %s', slug => {
    expect(appPath({ ...apps[0], slug })).toBe(`/apps/${slug}/`);
  });
});

describe('emailHref', () => {
  it.each([
    [undefined, 'mailto:team+help@example.com'],
    ['', 'mailto:team+help@example.com'],
    ['Support', 'mailto:team+help@example.com?subject=Support'],
    ['Bug & idea? #1/2', 'mailto:team+help@example.com?subject=Bug%20%26%20idea%3F%20%231%2F2'],
    ['café 🪨', 'mailto:team+help@example.com?subject=caf%C3%A9%20%F0%9F%AA%A8'],
    [' ', 'mailto:team+help@example.com?subject=%20'],
    ['line\r\nnext', 'mailto:team+help@example.com?subject=line%0D%0Anext']
  ])('encodes subject %j without changing the address', (subject, expected) => {
    expect(emailHref('team+help@example.com', subject)).toBe(expected);
  });

  it('propagates URI encoding errors for malformed Unicode', () => {
    expect(() => emailHref(site.email, '\uD800')).toThrow(URIError);
  });
});
