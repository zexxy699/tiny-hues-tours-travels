const { hasAdminSession } = require('../lib/auth');
const { readSiteData, saveSiteData, readBody } = require('../lib/site-data');

function mergeBookings(current, incoming) {
  const newer = Array.isArray(current) ? current : [];
  const edited = Array.isArray(incoming) ? incoming : [];
  const editedById = new Map(edited.map(item => [item.id, item]));
  const merged = newer.map(item => editedById.has(item.id) ? { ...item, ...editedById.get(item.id) } : item);
  const known = new Set(newer.map(item => item.id));
  return [...merged, ...edited.filter(item => item.id && !known.has(item.id))].slice(0, 500);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Vary', 'Cookie');

  if (req.method === 'GET') {
    const content = await readSiteData();
    if (hasAdminSession(req)) return res.status(200).json({ content, admin: true });
    const publicContent = {
      settings: content.settings,
      packages: (content.packages || []).filter(item => item.status === 'live'),
      testimonials: content.testimonials || []
    };
    return res.status(200).json({ content: publicContent });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasAdminSession(req)) return res.status(401).json({ error: 'Please sign in to save site content.' });

  const body = readBody(req);
  const next = body.content;
  if (!next || typeof next !== 'object' || !next.settings || !Array.isArray(next.packages) || !Array.isArray(next.testimonials)) {
    return res.status(400).json({ error: 'The site content is incomplete.' });
  }
  if (JSON.stringify(next).length > 1_500_000 || next.packages.length > 100 || next.testimonials.length > 100) {
    return res.status(413).json({ error: 'The content is too large to save.' });
  }

  try {
    const current = await readSiteData();
    const content = {
      ...next,
      bookings: mergeBookings(current.bookings, next.bookings),
      updatedAt: new Date().toISOString()
    };
    await saveSiteData(content);
    return res.status(200).json({ ok: true, updatedAt: content.updatedAt });
  } catch (error) {
    console.error('Site content save failed', error);
    return res.status(500).json({ error: 'Could not publish these changes. Please try again.' });
  }
};
