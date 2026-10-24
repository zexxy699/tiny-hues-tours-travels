const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 20;
const ADMIN_KEY = process.env.TINY_HUES_ADMIN_KEY || 'tinyhues';

// This is intentionally lightweight for the hosted demo. Vercel functions can
// restart or scale horizontally, so production should use Vercel Firewall plus
// a durable store such as Upstash or Vercel Postgres.
const limiter = globalThis.__tinyHuesInquiryLimiterV2 || new Map();
const inquiries = globalThis.__tinyHuesInquiriesV2 || [];
globalThis.__tinyHuesInquiryLimiterV2 = limiter;
globalThis.__tinyHuesInquiriesV2 = inquiries;

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim();
}

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body !== 'string') return req.body;
  try { return JSON.parse(req.body); } catch { return {}; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET') {
    if (req.headers['x-admin-key'] !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
    return res.status(200).json({ items: inquiries.slice(0, 100) });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = clientKey(req);
  const now = Date.now();
  const previous = limiter.get(key);
  const record = !previous || now - previous.startedAt >= WINDOW_MS ? { startedAt: now, count: 0 } : previous;
  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((record.startedAt + WINDOW_MS - now) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many enquiries. Please try again later.', retryAfter });
  }

  const body = readBody(req);
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const destination = String(body.destination || '').trim();
  const travellers = String(body.travellers || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !destination || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid name, email and destination.' });
  }
  if (name.length > 100 || email.length > 160 || destination.length > 120 || message.length > 2000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  // Honeypot-friendly response for automated submissions.
  if (body.website) return res.status(200).json({ ok: true });

  record.count += 1;
  limiter.set(key, record);

  const inquiry = {
    id: `remote-${now}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    destination,
    travellers: travellers || 'Not specified',
    message,
    date: new Date(now).toISOString(),
    status: 'new',
    initials: name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
  };
  inquiries.unshift(inquiry);
  if (inquiries.length > 100) inquiries.length = 100;

  return res.status(200).json({ ok: true, message: 'Enquiry received', inquiry });
};
