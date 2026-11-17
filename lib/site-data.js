const CONTENT_PATH = 'tiny-hues/site-content.json';
const MAX_WRITE_ATTEMPTS = 6;

// Old placeholder links that pointed at search pages instead of real profiles.
const SOCIAL_MIGRATIONS = {
  instagram: {
    from: ['https://www.instagram.com/explore/search/keyword/?q=Tiny%20Hues%20Tours%20and%20Travels'],
    to: 'https://www.instagram.com/tinyhuestourandtravels'
  },
  facebook: {
    from: ['https://www.facebook.com/public/Tiny-Hues-Tours-and-Travels'],
    to: 'https://www.facebook.com/share/1Dn21CtFJ4'
  }
};

function blobSdk() { return require('@vercel/blob'); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function defaultContent() { return clone(require('../data/site-content.json')); }

// Fill in fields that older saved content does not have yet, without
// overwriting anything an admin has deliberately changed.
function normalizeContent(parsed) {
  const defaults = defaultContent();
  const content = { ...defaults, ...(parsed || {}), settings: { ...defaults.settings, ...((parsed && parsed.settings) || {}) } };
  const settings = content.settings;
  for (const [key, rule] of Object.entries(SOCIAL_MIGRATIONS)) {
    if (rule.from.includes(settings[key])) settings[key] = rule.to;
  }
  if (settings.heroTitle === 'Go where the quiet lives.') settings.heroTitle = defaults.settings.heroTitle;
  const seedById = new Map(defaults.packages.map(item => [item.id, item]));
  content.packages = (Array.isArray(content.packages) ? content.packages : []).map(item => {
    const seed = seedById.get(item.id);
    const next = { ...item };
    if (next.includes === undefined) next.includes = seed ? clone(seed.includes || []) : [];
    if (next.inclusions === undefined) next.inclusions = seed ? clone(seed.inclusions || []) : [];
    return next;
  });
  if (!Array.isArray(content.testimonials)) content.testimonials = [];
  if (!Array.isArray(content.bookings)) content.bookings = [];
  return content;
}

async function readRaw() {
  const { get } = blobSdk();
  // useCache:false reads straight from storage, so a save is visible immediately.
  const file = await get(CONTENT_PATH, { access: 'private', useCache: false });
  if (!file || !file.stream) return { content: null, etag: null };
  const chunks = [];
  for await (const chunk of file.stream) chunks.push(Buffer.from(chunk));
  return { content: JSON.parse(Buffer.concat(chunks).toString('utf8')), etag: file.blob && file.blob.etag };
}

async function readSiteData() {
  const { content } = await readRaw();
  return normalizeContent(content);
}

// Public pages fall back to the starting content if storage is unreachable.
async function readSiteDataOrDefaults() {
  try { return await readSiteData(); }
  catch (error) {
    console.error('Site content read failed, using defaults', error);
    return normalizeContent(null);
  }
}

function putOptions(etag) {
  const base = { access: 'private', addRandomSuffix: false, contentType: 'application/json; charset=utf-8', cacheControlMaxAge: 60 };
  // ifMatch makes the write fail if someone else saved in between; we then retry.
  return etag ? { ...base, ifMatch: etag } : { ...base, allowOverwrite: false };
}

function isConflict(error, creating) {
  const sdk = blobSdk();
  if (sdk.BlobPreconditionFailedError && error instanceof sdk.BlobPreconditionFailedError) return true;
  return creating && /exist/i.test(String(error && error.message));
}

/**
 * Read-modify-write that never loses a concurrent change: `mutate` receives the
 * latest content and returns the next version (or mutates in place).
 */
async function updateSiteData(mutate) {
  const { put } = blobSdk();
  for (let attempt = 1; ; attempt += 1) {
    const { content, etag } = await readRaw();
    const current = normalizeContent(content);
    const next = (await mutate(current)) || current;
    next.updatedAt = new Date().toISOString();
    try {
      await put(CONTENT_PATH, JSON.stringify(next), putOptions(etag));
      return next;
    } catch (error) {
      if (attempt >= MAX_WRITE_ATTEMPTS || !isConflict(error, !etag)) throw error;
      await new Promise(resolve => setTimeout(resolve, 40 * attempt + Math.random() * 60));
    }
  }
}

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body !== 'string') return req.body;
  try { return JSON.parse(req.body); } catch { return {}; }
}

function publicContent(content) {
  return {
    settings: content.settings,
    packages: (content.packages || []).filter(item => item.status === 'live'),
    testimonials: content.testimonials || [],
    updatedAt: content.updatedAt || null
  };
}

module.exports = { CONTENT_PATH, defaultContent, normalizeContent, readSiteData, readSiteDataOrDefaults, updateSiteData, readBody, publicContent };
