const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

// Best-effort per-instance protection for the static demo. For production scale,
// replace this map with Vercel Firewall or an Upstash-backed limiter.
const limiter = globalThis.__tinyHuesInquiryLimiter || new Map();
globalThis.__tinyHuesInquiryLimiter = limiter;

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim();
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = clientKey(req);
  const now = Date.now();
  const previous = limiter.get(key);
  const record = !previous || now - previous.startedAt >= WINDOW_MS ? { startedAt: now, count: 0 } : previous;
  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((record.startedAt + WINDOW_MS - now) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many enquiries. Please try again later.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const destination = String(body.destination || '').trim();
  if (!name || !email || !destination || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Please provide a valid name, email and destination.' });
  if (name.length > 100 || email.length > 160 || destination.length > 120 || String(body.message || '').length > 2000) return res.status(400).json({ error: 'One or more fields are too long.' });

  // Honeypot-friendly response for automated submissions.
  if (body.website) return res.status(200).json({ ok: true });
  record.count += 1;
  limiter.set(key, record);
  return res.status(200).json({ ok: true, message: 'Enquiry received' });
};
