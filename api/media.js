const { get } = require('@vercel/blob');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end();
  const pathname = String(req.query?.path || '');
  if (!pathname.startsWith('tiny-hues/images/') || pathname.includes('..')) return res.status(404).end();

  try {
    const file = await get(pathname, { access: 'private' });
    if (!file) return res.status(404).end();
    res.setHeader('Content-Type', file.blob.contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.method === 'HEAD') return res.status(200).end();
    for await (const chunk of file.stream) res.write(Buffer.from(chunk));
    return res.end();
  } catch (error) {
    console.error('Image delivery failed', error);
    return res.status(502).end();
  }
};
