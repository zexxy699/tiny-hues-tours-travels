const CONTENT_PATH = 'tiny-hues/site-content.json';
let sdkPromise;

function blobSdk() {
  sdkPromise ||= import('@vercel/blob');
  return sdkPromise;
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function defaultContent() { return clone(require('../data/site-content.json')); }

async function readSiteData() {
  const { get } = await blobSdk();
  const file = await get(CONTENT_PATH, { access: 'private' });
  if (!file) return defaultContent();
  const chunks = [];
  for await (const chunk of file.stream) chunks.push(Buffer.from(chunk));
  const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  const defaults = defaultContent();
  return { ...defaults, ...parsed, settings: { ...defaults.settings, ...(parsed.settings || {}) } };
}

async function saveSiteData(content) {
  const { put } = await blobSdk();
  return put(CONTENT_PATH, JSON.stringify(content), {
    access: 'private', addRandomSuffix: false, allowOverwrite: true,
    contentType: 'application/json; charset=utf-8'
  });
}
function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body !== 'string') return req.body;
  try { return JSON.parse(req.body); } catch { return {}; }
}

module.exports = { CONTENT_PATH, defaultContent, readSiteData, saveSiteData, readBody };
