const { hasAdminSession } = require('../lib/auth');
const { readSiteData, saveSiteData, readBody } = require('../lib/site-data');

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 20;
const limiter = globalThis.__tinyHuesInquiryLimiterV3 || new Map();
globalThis.__tinyHuesInquiryLimiterV3 = limiter;

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim();
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET') {
    if (!hasAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const content = await readSiteData();
      return res.status(200).json({ items: content.bookings || [] });
    } catch (error) {
      console.error('Enquiry load failed', error);
      return res.status(503).json({ error: 'The enquiry inbox is temporarily unavailable.' });
    }
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = readBody(req);
  if (body.website) return res.status(200).json({ ok: true });

  const now = Date.now();
  const key = clientKey(req);
  const previous = limiter.get(key);
  const record = !previous || now - previous.startedAt >= WINDOW_MS ? { startedAt: now, count: 0 } : previous;
  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((record.startedAt + WINDOW_MS - now) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many enquiries. Please try again later.', retryAfter });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const destination = String(body.destination || '').trim();
  const travellers = String(body.travellers || '').trim();
  const message = String(body.message || '').trim();
  if (!name || !email || !destination || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid name, email and destination.' });
  }
  if (name.length > 100 || email.length > 160 || destination.length > 120 || travellers.length > 40 || message.length > 2000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  const inquiry = {
    id: `remote-${now}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    destination,
    travellers: travellers || 'Not specified',
    message,
    date: new Date(now).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
    status: 'new',
    initials: name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
  };

  try {
    const content = await readSiteData();
    content.bookings = [inquiry, ...(content.bookings || [])].slice(0, 500);
    await saveSiteData(content);
    record.count += 1;
    limiter.set(key, record);
    return res.status(200).json({ ok: true, message: 'Enquiry received', inquiry });
  } catch (error) {
    console.error('Enquiry save failed', error);
    return res.status(503).json({ error: 'We could not save your enquiry right now. Please try again shortly.' });
  }
};
