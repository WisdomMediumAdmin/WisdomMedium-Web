import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from './App';
import { apps, emailHref } from './site';

afterEach(cleanup);

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
    expect(screen.getByRole('link', { name: /Email support/i }).getAttribute('href')).toBe(emailHref('support@wisdommedium.com', 'WisdomMedium App Support'));
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
  });

  it('shows the helpful not-found page for unknown paths', () => {
    render(<App path="/missing-page/" />);
    expect(screen.getByRole('heading', { name: /That page isn.t here/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Visit support/i }).getAttribute('href')).toBe('/support/');
  });
});
