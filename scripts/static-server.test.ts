// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import path from 'node:path';
import os from 'node:os';
import type * as Fs from 'node:fs/promises';
import { deferred } from '../tests/deferred';

type Response = { writeHead: ReturnType<typeof vi.fn>; end: ReturnType<typeof vi.fn> };
type Handler = (request: { url?: string }, response: Response) => Promise<void>;
const http = vi.hoisted(() => ({ createServer: vi.fn(), listen: vi.fn() }));
const fs = vi.hoisted(() => ({ stat: vi.fn(), readFile: vi.fn() }));
vi.mock('node:http', () => ({ default: { createServer: http.createServer } }));
vi.mock('node:fs/promises', () => fs);

let handle: Handler;
let temporary: string | undefined;
const root = path.resolve('dist');
const missing = new Error('ENOENT');

function response(): Response {
  const result = { writeHead: vi.fn(), end: vi.fn() };
  result.writeHead.mockReturnValue(result);
  result.end.mockReturnValue(result);
  return result;
}

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.stubEnv('PORT', undefined);
  http.createServer.mockImplementation((handler: Handler) => { handle = handler; return { listen: http.listen }; });
  http.listen.mockImplementation((_port, _host, callback: () => void) => { callback(); });
  fs.stat.mockResolvedValue({ isDirectory: () => false });
  fs.readFile.mockResolvedValue(Buffer.from('file bytes'));
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  if (temporary) {
    const realFs = await vi.importActual<typeof Fs>('node:fs/promises');
    await realFs.rm(temporary, { recursive: true, force: true });
    temporary = undefined;
  }
});

async function request(url?: string) {
  const res = response();
  await handle({ url }, res);
  return res;
}

describe('server startup', () => {
  it.each([[undefined, 4174], ['', 4174], ['0', 0], ['8081', 8081]] as const)('uses PORT=%j and binds only to loopback', async (value, expected) => {
    vi.stubEnv('PORT', value);
    await import('./static-server.mjs');
    expect(http.createServer).toHaveBeenCalledTimes(1);
    expect(http.listen).toHaveBeenCalledExactlyOnceWith(expected, '127.0.0.1', expect.any(Function));
    expect(console.log).toHaveBeenCalledExactlyOnceWith(`Static files: http://127.0.0.1:${expected}`);
  });

  it('propagates a listener setup error', async () => {
    http.listen.mockImplementation(() => { throw new Error('Invalid port'); });
    await expect(import('./static-server.mjs')).rejects.toThrow('Invalid port');
    expect(console.log).not.toHaveBeenCalled();
  });
});

describe('static request handling', () => {
  beforeEach(async () => { await import('./static-server.mjs'); });

  it.each([
    ['index.html', 'text/html; charset=utf-8'],
    ['styles.css', 'text/css; charset=utf-8'],
    ['app.js', 'text/javascript; charset=utf-8'],
    ['favicon.svg', 'image/svg+xml'],
    ['sitemap.xml', 'application/xml'],
    ['robots.txt', 'text/plain; charset=utf-8'],
    ['image.bin', 'application/octet-stream'],
    ['LICENSE', 'application/octet-stream'],
    ['UPPER.CSS', 'application/octet-stream']
  ])('serves %s with the expected MIME type and unmodified bytes', async (name, type) => {
    const bytes = Buffer.from([0, 127, 128, 255]);
    fs.readFile.mockResolvedValue(bytes);
    const res = await request(`/${name}?version=2`);
    expect(fs.stat).toHaveBeenCalledExactlyOnceWith(path.join(root, name));
    expect(fs.readFile).toHaveBeenCalledExactlyOnceWith(path.join(root, name));
    expect(res.writeHead).toHaveBeenCalledExactlyOnceWith(200, { 'Content-Type': type });
    expect(res.end).toHaveBeenCalledExactlyOnceWith(bytes);
  });

  it.each([undefined, '', '/', '/support/'])('serves the directory index for %j', async url => {
    fs.stat.mockResolvedValue({ isDirectory: () => true });
    const res = await request(url);
    expect(fs.readFile).toHaveBeenCalledExactlyOnceWith(path.join(root, url === '/support/' ? 'support/index.html' : 'index.html'));
    expect(res.writeHead).toHaveBeenCalledExactlyOnceWith(200, { 'Content-Type': 'text/html; charset=utf-8' });
  });

  it.each([
    ['/support', '/support/'],
    ['/support?from=a%20b&x=1', '/support/?from=a%20b&x=1'],
    ['/some%20folder?next=%2Fprivacy%2F', '/some%20folder/?next=%2Fprivacy%2F']
  ])('redirects directory %s while preserving the encoded query', async (url, location) => {
    fs.stat.mockResolvedValue({ isDirectory: () => true });
    const res = await request(url);
    expect(res.writeHead).toHaveBeenCalledExactlyOnceWith(308, { Location: location });
    expect(res.end).toHaveBeenCalledExactlyOnceWith();
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  it('decodes spaces and Unicode once before resolving a file', async () => {
    await request('/notes/caf%C3%A9%20%2520.txt');
    expect(fs.readFile).toHaveBeenCalledExactlyOnceWith(path.join(root, 'notes/café %20.txt'));
  });

  it.each(['/..%2fsecret.txt', '/%2e%2e%2fsecret.txt', '/..%2fdist-sibling%2fsecret.txt'])('rejects encoded traversal %s without filesystem access', async url => {
    const res = await request(url);
    expect(res.writeHead).toHaveBeenCalledExactlyOnceWith(403);
    expect(res.end).toHaveBeenCalledExactlyOnceWith();
    expect(fs.stat).not.toHaveBeenCalled();
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  it('keeps URL-normalized plain dot segments within the document root', async () => {
    await request('/../robots.txt');
    expect(fs.stat).toHaveBeenCalledExactlyOnceWith(path.join(root, 'robots.txt'));
  });

  it.each(['missing', 'unreadable', 'missing-index'] as const)('returns the custom 404 for a %s resource', async mode => {
    const body = Buffer.from('<h1>Not found</h1>');
    if (mode === 'missing') fs.stat.mockRejectedValueOnce(missing);
    else {
      fs.stat.mockResolvedValue({ isDirectory: () => mode === 'missing-index' });
      fs.readFile.mockRejectedValueOnce(missing);
    }
    fs.readFile.mockResolvedValue(body);
    const res = await request('/missing/');
    expect(fs.readFile).toHaveBeenLastCalledWith(path.join(root, '404.html'));
    expect(res.writeHead).toHaveBeenCalledExactlyOnceWith(404, { 'Content-Type': 'text/html; charset=utf-8' });
    expect(res.end).toHaveBeenCalledExactlyOnceWith(body);
  });

  it('serves an explicitly requested 404.html as an ordinary successful file', async () => {
    const res = await request('/404.html');
    expect(res.writeHead).toHaveBeenCalledExactlyOnceWith(200, { 'Content-Type': 'text/html; charset=utf-8' });
  });

  it.each(['/%', '/%E0%A4%A', 'http://['])('currently rejects malformed URL %j before sending a response', async url => {
    const res = response();
    await expect(handle({ url }, res)).rejects.toBeInstanceOf(Error);
    expect(res.writeHead).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
    expect(fs.stat).not.toHaveBeenCalled();
  });

  it('currently rejects if the fallback page also cannot be read', async () => {
    fs.stat.mockRejectedValue(missing);
    fs.readFile.mockRejectedValue(new Error('404 missing'));
    const res = response();
    await expect(handle({ url: '/missing' }, res)).rejects.toThrow('404 missing');
    expect(res.writeHead).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
  });

  it('keeps overlapping responses isolated when file reads complete out of order', async () => {
    const first = deferred<Buffer>();
    const second = deferred<Buffer>();
    const bothReadsStarted = deferred<void>();
    fs.readFile.mockImplementation((file: string) => {
      if (fs.readFile.mock.calls.length === 2) bothReadsStarted.resolve();
      return file.endsWith('first.txt') ? first.promise : second.promise;
    });
    const firstRes = response();
    const secondRes = response();
    const firstRequest = handle({ url: '/first.txt' }, firstRes);
    const secondRequest = handle({ url: '/second.txt' }, secondRes);
    try {
      await bothReadsStarted.promise;
      expect(firstRes.end).not.toHaveBeenCalled();
      expect(secondRes.end).not.toHaveBeenCalled();
      second.resolve(Buffer.from('second'));
      await secondRequest;
      expect(secondRes.end).toHaveBeenCalledExactlyOnceWith(Buffer.from('second'));
      expect(firstRes.end).not.toHaveBeenCalled();
    } finally {
      first.resolve(Buffer.from('first'));
      second.resolve(Buffer.from('second'));
      await Promise.all([firstRequest, secondRequest]);
    }
    expect(firstRes.end).toHaveBeenCalledExactlyOnceWith(Buffer.from('first'));
  });
});

describe('static filesystem integration', () => {
  it('reads real index/assets and the fallback from an isolated document root', async () => {
    const realFs = await vi.importActual<typeof Fs>('node:fs/promises');
    temporary = await realFs.mkdtemp(path.join(os.tmpdir(), 'wisdommedium-static-'));
    const directory = path.join(temporary, 'dist');
    await realFs.mkdir(path.join(directory, 'support'), { recursive: true });
    await realFs.writeFile(path.join(directory, 'index.html'), '<h1>Home</h1>');
    await realFs.writeFile(path.join(directory, 'support/index.html'), '<h1>Support</h1>');
    await realFs.writeFile(path.join(directory, '404.html'), '<h1>Missing</h1>');
    await realFs.writeFile(path.join(directory, 'app.js'), 'export const ready = true;');
    fs.stat.mockImplementation(realFs.stat);
    fs.readFile.mockImplementation(realFs.readFile);
    vi.spyOn(process, 'cwd').mockReturnValue(temporary);
    await import('./static-server.mjs');
    for (const [url, status, body] of [
      ['/', 200, '<h1>Home</h1>'],
      ['/support/', 200, '<h1>Support</h1>'],
      ['/app.js', 200, 'export const ready = true;'],
      ['/absent/', 404, '<h1>Missing</h1>']
    ] as const) {
      const res = await request(url);
      expect(res.writeHead.mock.calls[0][0]).toBe(status);
      expect(res.end).toHaveBeenCalledExactlyOnceWith(Buffer.from(body));
    }
    const redirect = await request('/support?q=1');
    expect(redirect.writeHead).toHaveBeenCalledExactlyOnceWith(308, { Location: '/support/?q=1' });
  });
});
