import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { apps } from './site';

afterEach(cleanup);

describe('page shell', () => {
  it.each([
    ['/', 'Thoughtful apps for everyday life.'],
    ['/apps/wm-pebbles/', 'Meet WM Pebbles.'],
    ['/support/', 'How can we help?'],
    ['/contact/', 'Get in touch.'],
    ['/privacy/', 'Privacy Policy'],
    ['/terms/', 'Terms of Use'],
    ['/apps/my-stories/', 'Your words.Your stories.'],
    ['/404.html', 'That page isn’t here.']
  ])('renders the correct heading and accessible shell for %s', (path, heading) => {
    render(<App path={path} />);
    const main = screen.getByRole('main');
    expect(main.id).toBe('main');
    expect(within(main).getAllByRole('heading', { level: 1 }).map(node => node.textContent)).toEqual([heading]);
    expect(screen.getByRole('link', { name: 'Skip to content' }).getAttribute('href')).toBe('#main');
    const footer = within(screen.getByRole('contentinfo'));
    expect(footer.getByText('© 2026 WisdomMedium')).toBeTruthy();
    const nav = within(footer.getByRole('navigation', { name: 'Footer navigation' }));
    for (const [name, href] of [['Support', '/support/'], ['Contact', '/contact/'], ['Privacy', '/privacy/']]) {
      expect(nav.getByRole('link', { name }).getAttribute('href')).toBe(href);
    }
  });

  it('updates content when the supplied pathname changes', () => {
    const { rerender } = render(<App path="/support" />);
    expect(screen.getByRole('button', { name: 'Copy email address' })).toBeTruthy();
    rerender(<App path="/contact" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Get in touch.');
    rerender(<App path="/unknown" />);
    expect(screen.getByRole('link', { name: 'Go home' }).getAttribute('href')).toBe('/');
  });
});

describe('page content contracts', () => {
  it('connects home actions to real sections and each app to its product page', () => {
    render(<App path="/" />);
    const explore = screen.getByRole('link', { name: 'Explore our apps' });
    expect(explore.getAttribute('href')).toBe('/#apps');
    expect(explore.classList.contains('button-primary')).toBe(true);
    const support = screen.getByRole('link', { name: 'Get support' });
    expect(support.getAttribute('href')).toBe('/support/');
    expect(support.classList.contains('button-secondary')).toBe(true);
    expect(document.getElementById('apps')).not.toBeNull();
    expect(document.getElementById('about')).not.toBeNull();
    expect(screen.getByText('A growing collection of thoughtful apps to help life feel more organized.')).toBeTruthy();
    expect(screen.getAllByRole('article')).toHaveLength(apps.length);
    for (const app of apps) {
      expect(screen.getByRole('heading', { name: app.name, level: 3 })).toBeTruthy();
      expect(screen.getByText(app.summary)).toBeTruthy();
      expect(screen.getAllByText(`For ${app.platform}`).length).toBeGreaterThan(0);
      expect(screen.getByRole('link', { name: `Explore ${app.name}` }).getAttribute('href')).toBe(`/apps/${app.slug}/`);
    }
    expect(screen.getByRole('link', { name: 'Get in touch' }).getAttribute('href')).toBe('/contact/');
  });

  it('describes product features and links to support and privacy', () => {
    render(<App path="/apps/wm-pebbles/" />);
    expect(screen.getByText(apps[0].description)).toBeTruthy();
    for (const name of ['Tasks as pebbles', 'Notes nearby', 'Room to journal']) {
      expect(screen.getByRole('heading', { name, level: 3 })).toBeTruthy();
    }
    expect(screen.getByRole('link', { name: 'WM Pebbles support' }).getAttribute('href')).toBe('/support/');
    expect(screen.getByRole('link', { name: 'WM Pebbles privacy policy' }).getAttribute('href')).toBe('/privacy/');
  });

  it('provides bug/feature subjects and useful issue reporting guidance', () => {
    render(<App path="/support/" />);
    for (const [name, subject] of [['Report a bug', 'WisdomMedium%20Bug%20Report'], ['Suggest a feature', 'WisdomMedium%20Feature%20Suggestion']]) {
      expect(screen.getByRole('link', { name }).getAttribute('href')).toBe(`mailto:support@wisdommedium.com?subject=${subject}`);
    }
    expect(screen.getAllByRole('listitem').map(node => node.textContent)).toEqual(['The app name and version', 'Your device model and iOS, iPadOS, macOS or Android version', 'What you expected and what happened instead']);
    expect(screen.getByText(/Do not send passwords, payment information, or private notes/)).toBeTruthy();
  });

  it('keeps contact actions in one labeled section', () => {
    render(<App path="/contact/" />);
    expect(within(screen.getByRole('region', { name: 'Email WisdomMedium' })).getAllByRole('link')).toHaveLength(2);
  });

  it('publishes the privacy date, data practices, and contact destinations', () => {
    render(<App path="/privacy/" />);
    expect(screen.getByText('November 5, 2026').getAttribute('datetime')).toBe('2026-11-05');
    const policy = within(screen.getByRole('article'));
    expect(policy.getAllByRole('heading', { level: 2 }).map(node => node.textContent)).toEqual(['Website privacy', 'Support communications', 'Your choices and privacy requests', 'My Stories for iPhone', 'WM Pebbles', 'Photos and Files', 'Data Retention and Deletion', 'Third-Party Services', 'SoapyMoney (iPhone, iPad and macOS)', 'Changes to This Privacy Policy', 'Contact']);
    expect(policy.getByText(/stored locally on the user's device/)).toBeTruthy();
    expect(policy.getByText(/does not collect, transmit, sell, rent, or share/)).toBeTruthy();
    expect(within(document.getElementById('wm-pebbles')!).getAllByRole('listitem').map(node => node.textContent)).toEqual(['user accounts', 'advertising', 'tracking', 'analytics services', 'third-party advertising SDKs', 'server-side storage of user content']);
    expect(policy.getAllByRole('link', { name: 'support@wisdommedium.com' })[0].getAttribute('href')).toBe('mailto:support@wisdommedium.com');
    expect(policy.getByRole('link', { name: 'https://wisdommedium.com' }).getAttribute('href')).toBe('https://wisdommedium.com');
  });
});
