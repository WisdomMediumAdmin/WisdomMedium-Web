import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from './App';
import { pageForPath } from './routes';
afterEach(cleanup);
it('renders all four published routes with one heading and no fictional listing', () => {
  for (const suffix of ['', 'privacy/', 'terms/', 'support/']) {
    const path = `/apps/cuckooalarm/${suffix}`;
    render(<App path={path} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText(/Effective and last updated:/)).toBeTruthy();
    expect(screen.queryByText(/Review draft|approval.*pending|unpublished/i)).toBeNull();
    expect(pageForPath(path).draft).not.toBe(true);
    expect(document.querySelector('a[href*="apps.apple.com"]')).toBeNull();
    expect(document.querySelector('a[href="/apps/cuckooalarm/privacy/"]')).toBeTruthy();
    cleanup();
  }
});
it('discloses off-state cache retention and Apple location sharing', () => {
  render(<App path="/apps/cuckooalarm/privacy/" />);
  expect(screen.getByText(/does not immediately erase an unexpired cache/)).toBeTruthy();
  expect(screen.getByText(/sends that area to Apple/)).toBeTruthy();
  expect(screen.getByText(/does not automatically attach/)).toBeTruthy();
});
it('bounds alarm and Progressive claims', () => {
  render(<App path="/apps/cuckooalarm/terms/" />);
  expect(screen.getByText(/Progressive volume is unavailable/)).toBeTruthy();
  expect(screen.getByText(/Silent mode, Focus/)).toBeTruthy();
});
