const { hasAdminSession, isSameOriginRequest } = require('../lib/auth');
const { readSiteData, updateSiteData, readBody } = require('../lib/site-data');

module.exports = async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET') {
    try {
      const content = await readSiteData();
      const publicContent = {
        settings: content.settings,
        packages: (content.packages || []).filter(item => item.status === 'live'),
        testimonials: content.testimonials || []
      };
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.setHeader('Vercel-CDN-Cache-Control', 'max-age=30, stale-while-revalidate=30');
      return res.status(200).json({ content: publicContent });
    } catch (error) {
      console.error('Public site content load failed', error);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(503).json({ error: 'Site content is temporarily unavailable.' });
    }
  }

  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasAdminSession(req)) return res.status(401).json({ error: 'Please sign in to save site content.' });
  if (!isSameOriginRequest(req)) return res.status(403).json({ error: 'This save request did not come from the Tiny Hues admin site.' });

  const body = readBody(req);
  const next = body.content;
  if (!next || typeof next !== 'object' || !next.settings || !Array.isArray(next.packages) || !Array.isArray(next.testimonials)) {
    return res.status(400).json({ error: 'The site content is incomplete.' });
  }
  if (JSON.stringify(next).length > 1_500_000 || next.packages.length > 100 || next.testimonials.length > 100) {
    return res.status(413).json({ error: 'The content is too large to save.' });
  }
  const pixelId = String(next.settings.metaPixelId || '').trim();
  if (pixelId && !/^\d{8,20}$/.test(pixelId)) return res.status(400).json({ error: 'Meta Pixel ID must contain 8–20 digits.' });
  next.settings.metaPixelId = pixelId;

  try {
    // Enquiries are only changed through /api/inquiry, so publishing content can
    // never drop a new enquiry or bring back a deleted one.
    const content = await updateSiteData(current => ({ ...next, bookings: current.bookings || [], contentRevision: current.contentRevision }));
    return res.status(200).json({ ok: true, updatedAt: content.updatedAt });
  } catch (error) {
    console.error('Site content save failed', error);
    return res.status(500).json({ error: 'Could not publish these changes. Please try again.' });
  }
};
