import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { App } from '../App';
import { pages, notFound } from '../routes';
import { site } from '../site';

const documents = new Map([...pages, notFound].map(page => [page.path,
  new DOMParser().parseFromString(renderToString(<App path={page.path} />), 'text/html')]));

describe('legal and portfolio navigation', () => {
  it.each([...pages, notFound])('has valid internal links, unique anchors and one main heading on $path', page => {
    const document = documents.get(page.path)!;
    const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(document.querySelectorAll('main h1')).toHaveLength(1);
    for (const link of document.querySelectorAll('a[href]')) {
      const target = new URL(link.getAttribute('href')!, site.domain + page.path);
      if (target.origin !== site.domain) continue;
      const destination = documents.get(target.pathname);
      expect(destination, `${page.path} → ${target.href}`).toBeDefined();
      if (target.hash) expect(destination!.getElementById(decodeURIComponent(target.hash.slice(1))), target.href).not.toBeNull();
    }
    expect(document.querySelector('footer a[href="/terms/"]')).not.toBeNull();
  });

  it('keeps My Stories identifiable and cautious before release', () => {
    const card = [...documents.get('/')!.querySelectorAll('.app-card')].find(node => node.textContent!.includes('My Stories'))!;
    expect(card.textContent).toContain('Coming soon');
    expect(card.querySelector('a[href*="apps.apple.com"]')).toBeNull();
    for (const href of ['/support/#my-stories', '/privacy/#my-stories', '/terms/#my-stories']) {
      expect(card.querySelector(`a[href="${href}"]`)).not.toBeNull();
    }
    expect(card.querySelector('img')?.getAttribute('src')).toBe('/images/my-stories-icon.png');
  });

  it('keeps release limitations and app-specific policy boundaries visible', () => {
    const privacy = documents.get('/privacy/')!;
    for (const id of ['website', 'support-information', 'privacy-requests', 'my-stories', 'wm-pebbles', 'soapymoney']) {
      expect(privacy.getElementById(id)).not.toBeNull();
    }
    const stories = privacy.getElementById('my-stories')!.textContent!;
    for (const limitation of ['excluded from Apple system backups', 'keys are bound to the original device',
      'retain attachment payloads in its local database', 'undo history', 'no automatic expiry', 'cannot remotely']) {
      expect(stories.toLowerCase()).toContain(limitation.toLowerCase());
    }
    const terms = documents.get('/terms/')!;
    expect(terms.getElementById('my-stories-license')!.nextElementSibling!.textContent).toContain('not a custom App Store EULA');
    for (const path of ['/privacy/', '/terms/']) {
      expect(documents.get(path)!.querySelector('[data-legal-draft="true"]')).not.toBeNull();
      expect(documents.get(path)!.querySelector('time')!.dateTime).toBe('2026-11-05');
    }
  });
});
