// Route @vercel/blob (both require() and import()) to an in-memory stand-in.
const path = require('node:path');
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
const mockPath = path.join(__dirname, 'blob-mock.js');
const mock = require(mockPath);
const blobPath = require.resolve('@vercel/blob');
require.cache[blobPath] = { id: blobPath, filename: blobPath, loaded: true, exports: mock };
register('data:text/javascript,' + encodeURIComponent(`export async function resolve(s, c, n) { if (s === '@vercel/blob') return { url: ${JSON.stringify(pathToFileURL(mockPath).href)}, shortCircuit: true }; return n(s, c); }`));

process.env.TINY_HUES_ADMIN_ID = 'admin';
process.env.TINY_HUES_ADMIN_PASSWORD = 'pass';
process.env.TINY_HUES_SESSION_SECRET = 'test-secret';

const SAME_ORIGIN = { origin: 'https://www.tinyhuestour.com', host: 'www.tinyhuestour.com', 'x-forwarded-proto': 'https' };

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

async function adminHeaders() {
  const res = await call(require('../api/admin-auth'), { method: 'POST', body: { id: 'admin', password: 'pass' }, headers: SAME_ORIGIN });
  const cookie = String(res.headers['set-cookie'] || '').split(';')[0];
  if (!cookie) throw new Error(`login failed: ${res.statusCode} ${res.body}`);
  return { cookie, ...SAME_ORIGIN };
}

module.exports = { mock, call, adminHeaders, SAME_ORIGIN };
