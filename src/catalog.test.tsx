import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { App, ReleaseAction } from './App';
import { apps, type AppInfo } from './site';

const originalApps = [...apps];
afterEach(() => {
  cleanup();
  apps.splice(0, apps.length, ...originalApps);
});

describe('catalog changes', () => {
  it('renders every catalog entry and finds Pebbles by slug rather than position', () => {
    const other: AppInfo = { ...apps[0], slug: 'another-app', name: 'Another App', summary: 'A different tool.', description: 'Not the Pebbles description.', platform: 'Web' };
    apps.unshift(other);
    const { rerender } = render(<App path="/" />);
    expect(screen.getAllByRole('article')).toHaveLength(originalApps.length + 1);
    expect(screen.getByRole('heading', { name: 'Another App' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Explore Another App' }).getAttribute('href')).toBe('/apps/another-app/');
    rerender(<App path="/apps/wm-pebbles/" />);
    expect(screen.getByText(originalApps[0].description)).toBeTruthy();
    expect(screen.queryByText(other.description)).toBeNull();
  });

  it('keeps home navigation available when the catalog is empty', () => {
    apps.splice(0);
    render(<App path="/" />);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByRole('link', { name: 'Explore our apps' }).getAttribute('href')).toBe('/#apps');
    expect(screen.getByRole('heading', { name: 'Little tools for fuller days.' })).toBeTruthy();
  });

  it.each(['/', '/apps/wm-pebbles/'])('exposes the configured release URL on %s after launch', path => {
    apps[0] = { ...apps[0], release: { status: 'available', appStoreUrl: 'https://apps.apple.com/app/id123456789' } };
    render(<App path={path} />);
    expect(screen.getByRole('link', { name: 'View on the App Store' }).getAttribute('href')).toBe('https://apps.apple.com/app/id123456789');
    expect(screen.queryAllByText('Coming soon')).toHaveLength(path === '/' ? originalApps.length - 1 : 0);
  });

  it('removes a store action if a release returns to coming-soon', () => {
    const { rerender } = render(<ReleaseAction app={{ ...apps[0], release: { status: 'available', appStoreUrl: 'https://apps.apple.com/app/id123456789' } }} />);
    expect(screen.getByRole('link', { name: 'View on the App Store' })).toBeTruthy();
    rerender(<ReleaseAction app={{ ...apps[0], release: { status: 'coming-soon' } }} />);
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByText('Coming soon')).toBeTruthy();
  });

  it('currently fails rendering a product whose required catalog record is absent', () => {
    apps.splice(0);
    expect(() => renderToString(<App path="/apps/wm-pebbles/" />)).toThrow(TypeError);
  });
});
