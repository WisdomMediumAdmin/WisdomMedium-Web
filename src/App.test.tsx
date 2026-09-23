import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App, ReleaseAction } from './App';
import { appPath, apps, emailHref, type AppInfo } from './site';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('site navigation and content', () => {
  it('shows working primary navigation on the home page', () => {
    render(<App path="/" />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav.querySelector('a[href="/#apps"]')).not.toBeNull();
    expect(nav.querySelector('a[href="/#about"]')).not.toBeNull();
    expect(nav.querySelector('a[href="/support/"]')).not.toBeNull();
    expect(nav.querySelector('a[href="/contact/"]')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'WisdomMedium home' }).getAttribute('href')).toBe('/');
  });

  it('keeps support details readable and links to a real email draft', () => {
    render(<App path="/support/" />);
    expect(screen.getByRole('heading', { name: /How can we help/i })).toBeTruthy();
    expect(screen.getByText('support@wisdommedium.com')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Email support/i }).getAttribute('href')).toBe(emailHref('support@wisdommedium.com', 'WM Pebbles Support'));
  });

  it('shows one contact section and one public inbox', () => {
    render(<App path="/contact/" />);
    expect(screen.getByRole('heading', { name: /Get in touch/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'support@wisdommedium.com' }).getAttribute('href')).toBe(emailHref('support@wisdommedium.com', 'WisdomMedium Inquiry'));
    expect(screen.getByRole('link', { name: /Email us/i }).getAttribute('href')).toBe(emailHref('support@wisdommedium.com', 'WisdomMedium Inquiry'));
  });

  it('uses only the support address on every public page', () => {
    for (const path of ['/', '/apps/wm-pebbles/', '/support/', '/contact/', '/privacy/', '/404.html']) {
      render(<App path={path} />);
      for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]')) {
        expect(link.getAttribute('href')?.startsWith('mailto:support@wisdommedium.com')).toBe(true);
      }
      cleanup();
    }
  });

  it('shows coming soon until release and never adds a placeholder store link', () => {
    render(<App path="/apps/wm-pebbles/" />);
    expect(screen.getByText('Coming soon')).toBeTruthy();
    expect(screen.queryByRole('link', { name: /App Store/i })).toBeNull();
    expect(apps[0].release.status).toBe('coming-soon');
    expect(appPath(apps[0])).toBe('/apps/wm-pebbles/');
    const futureApp: AppInfo = { ...apps[0], release: { status: 'available', appStoreUrl: 'https://apps.apple.com/example' } };
    cleanup();
    render(<ReleaseAction app={futureApp} />);
    expect(screen.getByRole('link', { name: /View on the App Store/i }).getAttribute('href')).toBe('https://apps.apple.com/example');
  });

  it('shows the helpful not-found page for unknown paths', () => {
    render(<App path="/missing-page/" />);
    expect(screen.getByRole('heading', { name: /That page isn.t here/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Visit support/i }).getAttribute('href')).toBe('/support/');
  });
});

describe('copy email address', () => {
  it('confirms success only after the clipboard write resolves', async () => {
    let resolveCopy!: () => void;
    const writeText = vi.fn(() => new Promise<void>(resolve => { resolveCopy = resolve; }));
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<App path="/support/" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
    expect(writeText).toHaveBeenCalledWith('support@wisdommedium.com');
    expect(screen.queryByText('Email address copied.')).toBeNull();
    resolveCopy();
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Email address copied.'));
  });

  it('offers a selectable fallback when clipboard access is unavailable', () => {
    vi.stubGlobal('navigator', {});
    render(<App path="/support/" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
    expect(screen.getByRole('status').textContent).toContain('Select the address above');
    expect(screen.getByText('support@wisdommedium.com')).toBeTruthy();
  });
});
