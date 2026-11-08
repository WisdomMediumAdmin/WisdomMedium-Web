import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { pages, pageForPath } from './routes';

afterEach(cleanup);

describe('release legal and support destinations', () => {
  it.each(['potatobeans', 'my-stories'])('publishes dedicated privacy, terms and support for %s', slug => {
    const name = slug === 'potatobeans' ? 'PotatoBeans' : 'My Stories';
    for (const [part, title] of [['privacy', 'Privacy Policy'], ['terms', 'Terms of Use'], ['support', 'Support']]) {
      const path = `/apps/${slug}/${part}/`;
      expect(pageForPath(path).page).not.toBe('notFound');
      render(<App path={path} />);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(`${name} ${title}`);
      expect(screen.getAllByRole('link', { name: 'support@wisdommedium.com' }).length).toBeGreaterThan(0);
      cleanup();
    }
  });

  it.each(['/privacy/', '/terms/'])('covers both apps at the exact existing native-app destination %s', path => {
    render(<App path={path} />);
    for (const id of ['potatobeans', 'my-stories']) expect(document.getElementById(id)).not.toBeNull();
    expect(screen.getByText('November 7, 2026').getAttribute('datetime')).toBe('2026-11-07');
    expect(screen.getByText(/Kazi Ahmed Siam operates PotatoBeans and My Stories/)).toBeTruthy();
  });

  it('keeps the shared policy short and preserves the legacy destination', () => {
    render(<App path="/privacy/" />);
    expect(screen.queryByText(/SoapyMoney/)).toBeNull();
    expect(document.getElementById('wm-pebbles')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'WM Pebbles legacy privacy and support' }).getAttribute('href')).toBe('/apps/wm-pebbles/#privacy');
    expect(document.querySelector('main')!.textContent!.split(/\s+/).length).toBeLessThan(450);
    cleanup();
    render(<App path="/apps/wm-pebbles/" />);
    expect(screen.getByText(/is being retired/)).toBeTruthy();
    expect(document.getElementById('privacy')).not.toBeNull();
    expect(document.getElementById('support')).not.toBeNull();
    expect(screen.queryByText('Coming soon')).toBeNull();
  });

  it('discloses actual MVP cloud, completion records and retained data', () => {
    render(<App path="/apps/potatobeans/privacy/" />);
    expect(screen.getByText(/Completing a task saves a completion record/)).toBeTruthy();
    expect(screen.getByText(/iCloud sync starts off/)).toBeTruthy();
    expect(screen.getByText(/Hiding those features does not delete their data/)).toBeTruthy();
    expect(screen.getByText(/Earlier versions, conflict copies and deletion records/)).toBeTruthy();
    expect(screen.getByText(/quit and reopen/)).toBeTruthy();
    expect(document.querySelector('main')!.textContent!.split(/\s+/).length).toBeLessThan(600);
  });

  it('explains My Stories backup, metadata and deletion limitations plainly', () => {
    render(<App path="/apps/my-stories/privacy/" />);
    expect(screen.getByText(/restoring a backup on a replacement device may leave protected entries unreadable/)).toBeTruthy();
    expect(screen.getByText(/there is no automatic expiration/)).toBeTruthy();
    expect(screen.getByText(/embedded details such as location/)).toBeTruthy();
    expect(screen.getByText(/no app account, automatic journal sync/)).toBeTruthy();
    expect(screen.getByText(/retry option in Settings/)).toBeTruthy();
    expect(document.querySelector('main')!.textContent!.split(/\s+/).length).toBeLessThan(650);
    expect(document.querySelector('main')!.textContent).not.toMatch(/AES-GCM|SwiftData|Keychain|256-bit/);
  });

  it('removes obsolete release claims from public pages and metadata', () => {
    for (const page of pages) {
      const doc = new DOMParser().parseFromString(renderToString(<App path={page.path} />), 'text/html');
      const copy = doc.body.textContent! + page.description;
      expect(copy).not.toMatch(/SoapyMoney|Android|Google Play|not a registered LLC or corporation/);
      if (page.page === 'home') {
        expect(copy).not.toMatch(/Kazi Ahmed Siam/);
        expect(doc.getElementById('about')?.textContent).toContain('independent app development brand');
      }
      if (page.page === 'home') expect(copy).not.toMatch(/WM Pebbles/);
      if (page.path.includes('potatobeans')) {
        expect(copy).not.toMatch(/Focus|Calendar|widgets|Watch companion|keep notes|protected writing/);
      }
      if (!page.legacy) expect(page.description).not.toMatch(/WM Pebbles|notes|streaks|Focus|Calendar/);
    }
  });

  it('renders every route with one main heading and resolves all internal links and fragments in static HTML', () => {
    const documents = new Map(pages.map(page => [page.path, new DOMParser().parseFromString(renderToString(<App path={page.path} />), 'text/html')]));
    for (const [path, doc] of documents) {
      expect(doc.querySelectorAll('main h1').length, path).toBe(1);
      for (const link of doc.querySelectorAll('a[href]')) {
        const href = link.getAttribute('href')!;
        const url = new URL(href, `https://wisdommedium.com${path}`);
        if (url.origin !== 'https://wisdommedium.com') continue;
        const target = documents.get(url.pathname);
        expect(target, `${path} → ${href}`).toBeDefined();
        if (url.hash) expect(target!.getElementById(url.hash.slice(1)), `${path} → ${href}`).not.toBeNull();
      }
    }
  });
});
