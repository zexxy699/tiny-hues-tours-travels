// Swap @vercel/blob for an in-memory store before any project module loads it.
const blobPath = require.resolve('@vercel/blob');
const realBlob = require('@vercel/blob');
const mockPath = require.resolve('./blob-mock');
delete require.cache[blobPath];
const mock = require(mockPath);
require.cache[blobPath] = { id: blobPath, filename: blobPath, loaded: true, exports: mock };
void realBlob;

process.env.TINY_HUES_ADMIN_ID = 'admin';
process.env.TINY_HUES_ADMIN_PASSWORD = 'pass';
process.env.TINY_HUES_SESSION_SECRET = 'test-secret';

function call(handler, { method = 'GET', query = {}, body, headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const res = {
      statusCode: 200, headers: {}, body: '',
      setHeader(key, value) { this.headers[key.toLowerCase()] = value; },
      status(code) { this.statusCode = code; return this; },
      json(value) { this.body = JSON.stringify(value); resolve(this); return this; },
      write(chunk) { this.body += chunk; },
      end(chunk) { if (chunk) this.body += chunk; resolve(this); return this; }
    };
    Promise.resolve(handler({ method, query, body, headers: { 'x-forwarded-for': '10.0.0.1', ...headers }, socket: {} }, res)).catch(reject);
  });
}

async function adminCookie() {
  const res = await call(require('../api/admin-auth'), { method: 'POST', body: { id: 'admin', password: 'pass' } });
  return res.headers['set-cookie'].split(';')[0];
}

module.exports = { mock, call, adminCookie };
