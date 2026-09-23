import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const port = Number(process.env.PORT || 4174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

http.createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  const decoded = decodeURIComponent(pathname);
  const filePath = path.resolve(root, `.${decoded}`);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) { res.writeHead(403).end(); return; }
  try {
    const info = await stat(filePath);
    if (info.isDirectory() && !pathname.endsWith('/')) { res.writeHead(308, { Location: `${pathname}/${new URL(req.url || '/', 'http://localhost').search}` }).end(); return; }
    const target = info.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    const content = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' }).end(content);
  } catch {
    const content = await readFile(path.join(root, '404.html'));
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(content);
  }
}).listen(port, '127.0.0.1', () => console.log(`Static files: http://127.0.0.1:${port}`));
