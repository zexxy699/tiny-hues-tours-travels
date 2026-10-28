const { issueSession, clearSession, hasAdminSession, checkCredentials, clientKey } = require('../lib/auth');
const { readBody } = require('../lib/site-data');

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = globalThis.__tinyHuesLoginAttempts || new Map();
globalThis.__tinyHuesLoginAttempts = attempts;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Vary', 'Cookie');

  if (req.method === 'GET') {
    return res.status(hasAdminSession(req) ? 200 : 401).json({ authenticated: hasAdminSession(req) });
  }
  if (req.method === 'DELETE') {
    clearSession(res);
    return res.status(200).json({ authenticated: false });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const now = Date.now();
  const key = clientKey(req);
  const record = attempts.get(key);
  if (record && now - record.startedAt < WINDOW_MS && record.count >= MAX_ATTEMPTS) {
    res.setHeader('Retry-After', String(Math.ceil((record.startedAt + WINDOW_MS - now) / 1000)));
    return res.status(429).json({ error: 'Too many sign-in attempts. Please try again later.' });
  }

  const body = readBody(req);
  const id = String(body.id || '').slice(0, 128);
  const password = String(body.password || '').slice(0, 256);
  if (!checkCredentials(id, password)) {
    const next = !record || now - record.startedAt >= WINDOW_MS ? { startedAt: now, count: 1 } : { ...record, count: record.count + 1 };
    attempts.set(key, next);
    return res.status(401).json({ error: 'The admin ID or password is incorrect.' });
  }

  attempts.delete(key);
  issueSession(res);
  return res.status(200).json({ authenticated: true });
};
