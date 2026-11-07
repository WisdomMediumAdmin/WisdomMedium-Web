import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const client = vi.hoisted(() => ({ render: vi.fn(), createRoot: vi.fn(), hydrateRoot: vi.fn() }));
vi.mock('react-dom/client', () => ({ createRoot: client.createRoot, hydrateRoot: client.hydrateRoot }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  client.createRoot.mockReturnValue({ render: client.render });
});
afterEach(() => { document.body.replaceChildren(); window.history.replaceState(null, '', '/'); });

describe('browser entry point', () => {
  it('fails clearly before touching React when the root is missing', async () => {
    document.body.replaceChildren();
    await expect(import('./main')).rejects.toThrow('Missing root element');
    expect(client.createRoot).not.toHaveBeenCalled();
    expect(client.hydrateRoot).not.toHaveBeenCalled();
  });

  it('mounts an empty root using only the location pathname', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    window.history.replaceState(null, '', '/contact/?from=home#email');
    await import('./main');
    expect(client.createRoot).toHaveBeenCalledExactlyOnceWith(document.getElementById('root'));
    expect(client.render).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ props: { path: '/contact/' } }));
    expect(client.hydrateRoot).not.toHaveBeenCalled();
  });

  it.each(['<main>Prerendered page</main>', ' ', '<!--server marker-->'])('hydrates an existing root containing %j', async content => {
    document.body.innerHTML = `<div id="root">${content}</div>`;
    window.history.replaceState(null, '', '/support/');
    const root = document.getElementById('root');
    await import('./main');
    expect(client.hydrateRoot).toHaveBeenCalledExactlyOnceWith(root, expect.objectContaining({ props: { path: '/support/' } }));
    expect(client.createRoot).not.toHaveBeenCalled();
    expect(client.render).not.toHaveBeenCalled();
    expect(root?.innerHTML).toBe(content);
  });
});
