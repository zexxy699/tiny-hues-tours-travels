const { randomUUID } = require('node:crypto');
const { hasAdminSession } = require('../lib/auth');
const { readBody } = require('../lib/site-data');

const MAX_FILE_BYTES = 3 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasAdminSession(req)) return res.status(401).json({ error: 'Please sign in before uploading photos.' });

  const body = readBody(req);
  const type = String(body.type || '').toLowerCase();
  const data = String(body.data || '');
  const name = String(body.name || 'photo').replace(/[^a-zA-Z0-9._-]/g, '-').slice(-80);
  if (!ALLOWED_TYPES.has(type) || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
    return res.status(400).json({ error: 'Choose a JPEG, PNG, WebP, or AVIF image.' });
  }
  const buffer = Buffer.from(data, 'base64');
  if (!buffer.length || buffer.length > MAX_FILE_BYTES) return res.status(413).json({ error: 'Each image must be 3 MB or smaller.' });

  try {
    const { put } = await import('@vercel/blob');
    const file = await put(`tiny-hues/images/${randomUUID()}-${name}`, buffer, {
      access: 'private',
      addRandomSuffix: false,
      contentType: type,
      cacheControlMaxAge: 31536000
    });
    return res.status(201).json({ url: `/api/media?path=${encodeURIComponent(file.pathname)}` });
  } catch (error) {
    console.error('Image upload failed', error);
    return res.status(500).json({ error: 'Photo upload failed. Please try again.' });
  }
};
