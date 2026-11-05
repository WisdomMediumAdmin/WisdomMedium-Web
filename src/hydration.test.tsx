import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { App } from './App';
import { notFound, pages } from './routes';

let root: Root | undefined;
afterEach(async () => {
  if (root) await act(async () => { root?.unmount(); });
  root = undefined;
  document.body.replaceChildren();
  vi.unstubAllGlobals();
});

describe('server markup and browser hydration integration', () => {
  it.each([...pages, notFound])('hydrates $path without replacing content or recovery errors', async page => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<App path={page.path} />);
    document.body.append(container);
    const originalMain = within(container).getByRole('main');
    const originalHeading = within(container).getByRole('heading', { level: 1 });
    const onRecoverableError = vi.fn();
    await act(async () => { root = hydrateRoot(container, <App path={page.path} />, { onRecoverableError }); });
    expect(within(container).getByRole('main')).toBe(originalMain);
    expect(within(container).getByRole('heading', { level: 1 })).toBe(originalHeading);
    expect(onRecoverableError).not.toHaveBeenCalled();
    if (page.page === 'support') {
      const writeText = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal('navigator', { clipboard: { writeText } });
      await act(async () => { fireEvent.click(within(container).getByRole('button', { name: 'Copy email address' })); });
      expect(writeText).toHaveBeenCalledExactlyOnceWith('support@wisdommedium.com');
      expect(within(container).getByRole('status').textContent).toBe('Email address copied.');
    }
  });
});
