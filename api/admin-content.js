const { hasAdminSession } = require('../lib/auth');
const { readSiteData } = require('../lib/site-data');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Vary', 'Cookie');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasAdminSession(req)) return res.status(401).json({ error: 'Please sign in to view the admin workspace.' });
  try {
    const content = await readSiteData();
    return res.status(200).json({ content, admin: true });
  } catch (error) {
    console.error('Admin site content load failed', error);
    return res.status(503).json({ error: 'The admin workspace is temporarily unavailable.' });
  }
};
