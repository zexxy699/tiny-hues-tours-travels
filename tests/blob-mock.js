// In-memory stand-in for @vercel/blob (get/put/del with etag + ifMatch).
const { Readable } = require('node:stream');
const real = require('@vercel/blob');
const store = new Map();
let n = 0;
async function get(pathname, opts = {}) {
  const item = store.get(pathname);
  if (!item) return null;
  return { statusCode: 200, stream: Readable.from([item.body]), blob: { pathname, contentType: item.contentType, etag: item.etag } };
}
async function put(pathname, body, opts = {}) {
  // Simulated network latency first; the check-and-write below is atomic, as in real storage.
  if (module.exports.delay) await new Promise(r => setTimeout(r, Math.random() * module.exports.delay));
  const existing = store.get(pathname);
  if (opts.ifMatch !== undefined && (!existing || existing.etag !== opts.ifMatch)) throw new real.BlobPreconditionFailedError();
  if (existing && !opts.allowOverwrite && opts.ifMatch === undefined) throw new real.BlobError('This blob already exists');
  const etag = `"e${++n}"`;
  store.set(pathname, { body: Buffer.isBuffer(body) ? body : Buffer.from(String(body)), contentType: opts.contentType, etag });
  return { pathname, url: `blob://${pathname}`, etag };
}
async function del(pathname) { store.delete(pathname); }
module.exports = { get, put, del, store, BlobPreconditionFailedError: real.BlobPreconditionFailedError, BlobError: real.BlobError, delay: 0 };
