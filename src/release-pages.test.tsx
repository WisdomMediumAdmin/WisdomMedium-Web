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
    expect(screen.getByText(/not a registered LLC or corporation/)).toBeTruthy();
  });

  it('preserves existing app privacy sections', () => {
    render(<App path="/privacy/" />);
    expect(screen.getByRole('heading', { name: 'WM Pebbles' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'SoapyMoney (iPhone, iPad and macOS)' })).toBeTruthy();
  });

  it('distinguishes PotatoBeans cloud and deletion exceptions', () => {
    render(<App path="/apps/potatobeans/privacy/" />);
    expect(screen.getByText(/even when general library sync is off/)).toBeTruthy();
    expect(screen.getByText(/Focus history moves through explicit file import and export/)).toBeTruthy();
    expect(screen.getByText(/Watch companion has its own account\/device-library selection/)).toBeTruthy();
    expect(screen.getByText(/without age-based pruning/)).toBeTruthy();
    expect(screen.getByText(/until you quit and reopen/)).toBeTruthy();
  });

  it('explains My Stories backup, metadata and deletion limitations', () => {
    render(<App path="/apps/my-stories/privacy/" />);
    expect(screen.getByText(/not portable to a replacement device/)).toBeTruthy();
    expect(screen.getByText(/There is no automatic expiration of Deleted Journals/)).toBeTruthy();
    expect(screen.getByText(/does not deliberately strip that metadata/)).toBeTruthy();
    expect(screen.getByText(/no app account, automatic CloudKit synchronization/)).toBeTruthy();
    expect(screen.getByText(/Interrupted or unsafe cleanup is retried/)).toBeTruthy();
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
