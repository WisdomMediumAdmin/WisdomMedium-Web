import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { App } from './App';

afterEach(cleanup);

it('connects the iPhone catalog card and product to the same legal and support sections', () => {
  for (const path of ['/', '/apps/mochigoals/']) {
    render(<App path={path} />);
    const heading = screen.getByRole('heading', { name: 'MochiGoals' });
    const listing = within(heading.closest(path === '/' ? 'article' : 'section')!);
    const status = listing.getByText('Coming soon on the App Store for iPhone');
    expect(status.closest('button,a')).toBeNull();
    expect(listing.getByRole('img', { name: 'MochiGoals app icon' }).getAttribute('src')).toBe('/images/apps/mochigoals-512.webp');
    const nav = listing.getByRole('navigation', { name: 'MochiGoals information' });
    expect([...nav.querySelectorAll('a')].map(link => link.getAttribute('href')))
      .toEqual(['/privacy/#mochigoals', '/terms/#mochigoals', '/support/#mochigoals']);
    cleanup();
  }
});

it('distinguishes local records from voluntary support mail on the binary’s privacy URL', () => {
  render(<App path="/privacy/" />);
  const policy = document.getElementById('mochigoals')!;
  expect(policy.textContent).toContain('up to 30 internal session snapshots');
  expect(policy.textContent).toContain('does not request notification permission or schedule new reminders');
  expect(policy.textContent).toContain('no fixed automatic deletion period');
  expect(policy.textContent).not.toContain('Data Not Collected');
});
