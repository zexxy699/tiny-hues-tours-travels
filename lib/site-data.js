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
  const file = await get(CONTENT_PATH, { access: 'private', useCache: false });
  if (!file) return defaultContent();
  const chunks = [];
  for await (const chunk of file.stream) chunks.push(Buffer.from(chunk));
  const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  const defaults = defaultContent();
  const content = { ...defaults, ...parsed, settings: { ...defaults.settings, ...(parsed.settings || {}) } };
  content.contentRevision = parsed.contentRevision;
  if (Number(parsed.contentRevision || 0) < 4) {
    content.settings.whatsapp = 'https://wa.me/916006473963';
    content.settings.officeMapUrl = 'https://maps.app.goo.gl/c5jALxWHa2rcDN8h6';
    content.settings.officeMapEmbed = 'https://www.openstreetmap.org/export/embed.html?bbox=74.482,34.266,74.510,34.278&layer=mapnik&marker=34.2719076,74.4960449';
    content.settings.salesManagerOneTitle = 'Reservation Manager';
    const updates = {
      p1: {
        location: 'Srinagar · Dal Lake houseboat · Pahalgam',
        description: 'Six nights with four in Srinagar, one on a Dal Lake houseboat and the final night in Pahalgam.',
        pickupPoint: 'Srinagar Airport',
        itinerary: [
          { nights: 4, stay: 'Srinagar', details: 'Stay in Srinagar and explore the lakefront, gardens and old city at an easy pace.' },
          { nights: 1, stay: 'Dal Lake houseboat', details: 'Spend one night aboard a houseboat on Dal Lake.' },
          { nights: 1, stay: 'Pahalgam', details: 'Finish in Pahalgam; choose your preferred departure point for the trip.' }
        ]
      },
      p3: {
        location: 'Srinagar · Dal Lake houseboat · Pahalgam',
        description: 'Four nights: two in Srinagar, one on a Dal Lake houseboat and the final night in Pahalgam.',
        pickupPoint: 'Srinagar Airport',
        itinerary: [
          { nights: 2, stay: 'Srinagar', details: 'Stay in Srinagar and explore the lakefront, gardens and old city.' },
          { nights: 1, stay: 'Dal Lake houseboat', details: 'Spend one night aboard a houseboat on Dal Lake.' },
          { nights: 1, stay: 'Pahalgam', details: 'Finish in Pahalgam; choose your preferred departure point for the trip.' }
        ]
      },
      p5: {
        location: 'Srinagar · Dal Lake houseboat · Pahalgam',
        description: 'Five nights: three in Srinagar, one on a Dal Lake houseboat and the final night in Pahalgam.',
        pickupPoint: 'Srinagar Airport',
        itinerary: [
          { nights: 3, stay: 'Srinagar', details: 'Stay in Srinagar and explore the lakefront, gardens and old city.' },
          { nights: 1, stay: 'Dal Lake houseboat', details: 'Spend one night aboard a houseboat on Dal Lake.' },
          { nights: 1, stay: 'Pahalgam', details: 'Finish in Pahalgam; choose your preferred departure point for the trip.' }
        ]
      }
    };
    for (const item of content.packages || []) {
      if (updates[item.id]) Object.assign(item, updates[item.id]);
    }
    content.contentRevision = 4;
    content.updatedAt = new Date().toISOString();
    await saveSiteData(content);
  }
  if (Number(content.contentRevision || 0) < 5) {
    // Revision 5: "What's included" icons + inclusion list for the starting journeys,
    // and the official Facebook page.
    const seed = new Map((defaults.packages || []).map(item => [item.id, item]));
    for (const item of content.packages || []) {
      const source = seed.get(item.id);
      if (!source) continue;
      if (item.includes === undefined && source.includes) item.includes = clone(source.includes);
      if (item.inclusions === undefined && source.inclusions) item.inclusions = clone(source.inclusions);
    }
    if (!content.settings.facebook) content.settings.facebook = defaults.settings.facebook;
    content.contentRevision = 5;
    content.updatedAt = new Date().toISOString();
    await saveSiteData(content);
  }
  if (Number(content.contentRevision || 0) < 6) {
    // Revision 6: calls go to +91 6005577032, WhatsApp goes to +91 6006473963.
    content.settings.phone = '+91 6005577032';
    content.settings.operationsPhone = '+91 6005577032';
    content.settings.whatsapp = 'https://wa.me/916006473963';
    content.contentRevision = 6;
    content.updatedAt = new Date().toISOString();
    await saveSiteData(content);
  }
  return content;
}

// Read-modify-write that cannot lose a change made at the same moment
// (e.g. two enquiries, or an enquiry arriving while the admin saves):
// the write only succeeds if the file is unchanged since it was read.
async function updateSiteData(mutate) {
  const { get, put, BlobPreconditionFailedError } = await blobSdk();
  for (let attempt = 1; ; attempt += 1) {
    await readSiteData(); // applies any pending one-time content updates first
    const file = await get(CONTENT_PATH, { access: 'private', useCache: false });
    let current;
    if (file && file.stream) {
      const chunks = [];
      for await (const chunk of file.stream) chunks.push(Buffer.from(chunk));
      const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const defaults = defaultContent();
      current = { ...defaults, ...parsed, settings: { ...defaults.settings, ...(parsed.settings || {}) } };
    } else current = defaultContent();
    const next = (await mutate(current)) || current;
    next.updatedAt = new Date().toISOString();
    const etag = file && file.blob && file.blob.etag;
    try {
      await put(CONTENT_PATH, JSON.stringify(next), {
        access: 'private', addRandomSuffix: false, contentType: 'application/json; charset=utf-8',
        ...(etag ? { ifMatch: etag } : { allowOverwrite: false })
      });
      return next;
    } catch (error) {
      const conflict = (BlobPreconditionFailedError && error instanceof BlobPreconditionFailedError) || (!etag && /exist/i.test(String(error && error.message)));
      if (!conflict || attempt >= 6) throw error;
      await new Promise(resolve => setTimeout(resolve, 40 * attempt + Math.random() * 60));
    }
  }
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

module.exports = { CONTENT_PATH, defaultContent, readSiteData, saveSiteData, updateSiteData, readBody };
