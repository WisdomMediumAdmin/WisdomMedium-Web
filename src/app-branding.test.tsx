import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from './App';

afterEach(cleanup);

const branding = [
  ['PotatoBeans', 'potatobeans'],
  ['My Stories', 'my-stories']
];

describe('official app branding', () => {
  it('gives each home card its own accessible official icon', () => {
    const { container } = render(<App path="/" />);
    for (const [name, slug] of branding) {
      const icon = screen.getByRole('img', { name: `${name} app icon` });
      expect(icon.getAttribute('src')).toBe(`/images/apps/${slug}-512.webp`);
      expect(icon.getAttribute('srcset')).toContain(`/images/apps/${slug}-768.webp 768w`);
      expect(icon.getAttribute('loading')).toBe('lazy');
      expect(icon.getAttribute('width')).toBe(icon.getAttribute('height'));
      expect(icon.closest('article')?.textContent).toContain(name);
    }
    expect(container.querySelector('.app-art-lines')).toBeNull();
    expect(screen.queryByText('make room for')).toBeNull();
  });

  it.each(branding)('uses the same %s branding on its product page', (name, slug) => {
    render(<App path={`/apps/${slug}/`} />);
    const icon = screen.getByRole('img', { name: `${name} app icon` });
    expect(icon.getAttribute('src')).toBe(`/images/apps/${slug}-512.webp`);
    expect(icon.getAttribute('loading')).toBe('eager');
    expect(icon.getAttribute('fetchpriority')).toBe('high');
    for (const destination of ['privacy', 'terms', 'support']) {
      expect(document.querySelector(`a[href="/apps/${slug}/${destination}/"]`)).not.toBeNull();
    }
  });
});
