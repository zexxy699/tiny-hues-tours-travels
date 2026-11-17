const { hasAdminSession } = require('../lib/auth');
const { readSiteData, updateSiteData, readBody, publicContent } = require('../lib/site-data');

const EDITABLE_KEYS = ['settings', 'packages', 'testimonials'];

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Vary', 'Cookie');

  if (req.method === 'GET') {
    try {
      const content = await readSiteData();
      if (hasAdminSession(req)) return res.status(200).json({ content, admin: true });
      return res.status(200).json({ content: publicContent(content) });
    } catch (error) {
      console.error('Site content load failed', error);
      return res.status(503).json({ error: 'Site content is temporarily unavailable.' });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasAdminSession(req)) return res.status(401).json({ error: 'Please sign in to save site content.' });

  const body = readBody(req);
  const next = body.content;
  if (!next || typeof next !== 'object' || !next.settings || typeof next.settings !== 'object' || !Array.isArray(next.packages) || !Array.isArray(next.testimonials)) {
    return res.status(400).json({ error: 'The site content is incomplete.' });
  }
  if (JSON.stringify(next).length > 1_500_000 || next.packages.length > 100 || next.testimonials.length > 100) {
    return res.status(413).json({ error: 'The content is too large to save.' });
  }

  try {
    // Enquiries are managed only through /api/inquiry, so a content save can
    // never drop a new enquiry or bring back a deleted one.
    const saved = await updateSiteData(current => {
      for (const key of EDITABLE_KEYS) current[key] = next[key];
      return current;
    });
    return res.status(200).json({ ok: true, updatedAt: saved.updatedAt });
  } catch (error) {
    console.error('Site content save failed', error);
    return res.status(500).json({ error: 'Could not publish these changes. Please try again.' });
  }
};
