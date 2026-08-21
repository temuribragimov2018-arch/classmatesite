/**
 * Простой статический сервер для Railway
 * Без внешних зависимостей — только Node.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.txt':  'text/plain'
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain',
    'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-cache'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  // Безопасный путь
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.normalize(path.join(ROOT, urlPath));

  // Защита от path traversal
  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, 'Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // fallback на index.html
      const index = path.join(ROOT, 'index.html');
      fs.readFile(index, (e, data) => {
        if (e) return send(res, 500, 'Server error');
        send(res, 200, data, MIME['.html']);
      });
      return;
    }

    fs.readFile(filePath, (e, data) => {
      if (e) return send(res, 500, 'Server error');
      const ext = path.extname(filePath).toLowerCase();
      send(res, 200, data, MIME[ext] || 'application/octet-stream');
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`ClassMate site listening on 0.0.0.0:${PORT}`);
});
