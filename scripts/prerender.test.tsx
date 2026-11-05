// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import path from 'node:path';
import os from 'node:os';
import type * as Fs from 'node:fs/promises';
import { notFound, pages, type PageInfo } from '../src/routes';
import { deferred } from '../tests/deferred';

const fs = vi.hoisted(() => ({ readFile: vi.fn(), writeFile: vi.fn(), mkdir: vi.fn() }));
vi.mock('node:fs/promises', () => fs);

const template = '<!doctype html><html><head><title>WisdomMedium</title><script type="module" src="/assets/site.js"></script></head><body><div id="root"></div></body></html>';
const dist = path.resolve('dist');
let temporary: string | undefined;

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.doUnmock('../src/routes');
  vi.doUnmock('react-dom/server');
  fs.readFile.mockResolvedValue(template);
  fs.mkdir.mockResolvedValue(undefined);
  fs.writeFile.mockResolvedValue(undefined);
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(async () => {
  vi.restoreAllMocks();
  vi.doUnmock('../src/routes');
  vi.doUnmock('react-dom/server');
  if (temporary) {
    const realFs = await vi.importActual<typeof Fs>('node:fs/promises');
    await realFs.rm(temporary, { recursive: true, force: true });
    temporary = undefined;
  }
});

function outputFor(page: PageInfo, directory = dist) {
  return page.page === 'notFound' ? path.join(directory, '404.html') : path.join(directory, page.path, 'index.html');
}

describe('prerender output', () => {
  it('renders every public route and the 404 with distinct body and metadata', async () => {
    await import('./prerender');
    expect(fs.readFile).toHaveBeenCalledExactlyOnceWith(path.join(dist, 'index.html'), 'utf8');
    expect(fs.writeFile).toHaveBeenCalledTimes(pages.length + 1);
    const headings = ['Thoughtful apps for', 'Meet ', 'Your words.', 'Terms of ', 'How can we', 'Get in', 'Privacy ', 'That page isn’t'];
    for (const [index, page] of [...pages, notFound].entries()) {
      const [destination, html] = fs.writeFile.mock.calls[index] as [string, string];
      expect(destination).toBe(outputFor(page));
      expect(fs.mkdir).toHaveBeenNthCalledWith(index + 1, path.dirname(destination), { recursive: true });
      expect(fs.mkdir.mock.invocationCallOrder[index]).toBeLessThan(fs.writeFile.mock.invocationCallOrder[index]);
      expect(html).toContain(`<title>${page.title}</title>`);
      expect(html).toContain(`<meta name="description" content="${page.description}" />`);
      expect(html).toContain(`<meta property="og:title" content="${page.title}" />`);
      expect(html).toContain(`<meta property="og:description" content="${page.description}" />`);
      expect(html).toContain('<meta property="og:site_name" content="WisdomMedium" />');
      expect(html).toContain('<meta property="og:type" content="website" />');
      expect(html).toContain('<meta name="twitter:card" content="summary" />');
      expect(html).toContain('<main id="main" tabindex="-1">');
      expect(html).toContain(headings[index]);
      expect(html).not.toContain('<div id="root"></div>');
      expect(html).toContain('<script type="module" src="/assets/site.js"></script>');
      if (page.page === 'notFound') {
        expect(html).toContain('<meta name="robots" content="noindex" />');
        expect(html).not.toContain('rel="canonical"');
        expect(html).not.toContain('property="og:url"');
      } else {
        expect(html).toContain(`<link rel="canonical" href="https://wisdommedium.com${page.path}" />`);
        expect(html).toContain(`<meta property="og:url" content="https://wisdommedium.com${page.path}" />`);
        expect(html).not.toContain('name="robots"');
      }
    }
    expect(console.log).toHaveBeenCalledTimes(pages.length + 1);
  });

  it('escapes attribute-sensitive description and URL characters without interpreting markup', async () => {
    vi.doMock('../src/routes', async () => ({
      ...await vi.importActual('../src/routes'),
      pages: [{ ...pages[0], description: 'A & "B" <C> 🪨' }],
      canonicalUrl: () => 'https://example.com/?a=1&b="<x>"'
    }));
    await import('./prerender');
    const html = fs.writeFile.mock.calls[0][1] as string;
    expect(html).toContain('content="A &amp; &quot;B&quot; &lt;C&gt; 🪨"');
    expect(html).toContain('href="https://example.com/?a=1&amp;b=&quot;&lt;x&gt;&quot;"');
    expect(html).not.toContain('<C>');
  });

  it('awaits persistence before starting the next page', async () => {
    const enteredWrite = deferred<void>();
    const finishWrite = deferred<void>();
    fs.writeFile.mockImplementationOnce(() => { enteredWrite.resolve(); return finishWrite.promise; });
    const rendering = import('./prerender');
    try {
      await enteredWrite.promise;
      expect(fs.mkdir).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(console.log).not.toHaveBeenCalled();
    } finally {
      finishWrite.resolve();
      await rendering;
    }
    expect(fs.writeFile).toHaveBeenCalledTimes(pages.length + 1);
  });
});

describe('prerender failures and current limitations', () => {
  it('rejects a template with a missing root marker before writing', async () => {
    fs.readFile.mockResolvedValue(template.replace('<div id="root"></div>', ''));
    await expect(import('./prerender')).rejects.toThrow('Could not render /');
    expect(fs.mkdir).not.toHaveBeenCalled();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('currently accepts a missing title marker because metadata contains the raw title', async () => {
    fs.readFile.mockResolvedValue(template.replace('<title>WisdomMedium</title>', ''));
    await import('./prerender');
    const html = fs.writeFile.mock.calls[0][1] as string;
    expect(html).not.toContain('<title>');
    expect(html).toContain(`<meta property="og:title" content="${pages[0].title}" />`);
  });

  it('currently accepts a missing head marker, leaving metadata absent', async () => {
    fs.readFile.mockResolvedValue(template.replace('</head>', ''));
    await import('./prerender');
    expect(fs.writeFile.mock.calls[0][1]).not.toContain('rel="canonical"');
    expect(fs.writeFile.mock.calls[0][1]).toContain('<main id="main" tabindex="-1">');
  });

  it('currently rejects a title requiring HTML escaping because validation searches raw text', async () => {
    vi.doMock('../src/routes', async () => ({ ...await vi.importActual('../src/routes'), pages: [{ ...pages[0], title: 'Research & Development' }] }));
    await expect(import('./prerender')).rejects.toThrow('Could not render /');
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it.each(['read', 'mkdir', 'write', 'render'] as const)('propagates %s errors and stops without reporting success', async stage => {
    const failure = new Error(`${stage} failed`);
    if (stage === 'read') fs.readFile.mockRejectedValueOnce(failure);
    if (stage === 'mkdir') fs.mkdir.mockRejectedValueOnce(failure);
    if (stage === 'write') fs.writeFile.mockRejectedValueOnce(failure);
    if (stage === 'render') vi.doMock('react-dom/server', () => ({ renderToString: () => { throw failure; } }));
    await expect(import('./prerender')).rejects.toThrow(failure);
    expect(fs.writeFile).toHaveBeenCalledTimes(stage === 'write' ? 1 : 0);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('stops on a later failed write, leaving earlier successful pages intact', async () => {
    fs.writeFile.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('Disk full'));
    await expect(import('./prerender')).rejects.toThrow('Disk full');
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect(fs.writeFile.mock.calls.map(call => call[0])).toEqual([outputFor(pages[0]), outputFor(pages[1])]);
    expect(console.log).toHaveBeenCalledExactlyOnceWith('Rendered /');
  });
});

describe('prerender filesystem integration', () => {
  it('persists all routes into an isolated directory using the real repository template', async () => {
    const realFs = await vi.importActual<typeof Fs>('node:fs/promises');
    const realTemplate = await realFs.readFile(path.resolve('index.html'), 'utf8');
    temporary = await realFs.mkdtemp(path.join(os.tmpdir(), 'wisdommedium-prerender-'));
    const directory = path.join(temporary, 'dist');
    await realFs.mkdir(directory);
    await realFs.writeFile(path.join(directory, 'index.html'), realTemplate);
    vi.spyOn(process, 'cwd').mockReturnValue(temporary);
    fs.readFile.mockImplementation(realFs.readFile);
    fs.mkdir.mockImplementation(realFs.mkdir);
    fs.writeFile.mockImplementation(realFs.writeFile);
    await import('./prerender');
    for (const page of [...pages, notFound]) {
      const html = await realFs.readFile(outputFor(page, directory), 'utf8');
      expect(html).toContain(`<title>${page.title}</title>`);
      expect(html).toContain('<main id="main" tabindex="-1">');
      expect(html.match(/<title>/g)).toHaveLength(1);
    }
    expect(await realFs.readdir(directory)).toEqual(expect.arrayContaining(['index.html', '404.html', 'apps', 'support', 'privacy', 'contact']));
  });
});
