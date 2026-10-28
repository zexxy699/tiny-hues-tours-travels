const { createHmac, timingSafeEqual } = require('node:crypto');

const COOKIE_NAME = '__Host-tinyhues_session';
const SESSION_SECONDS = 8 * 60 * 60;

function secret() { return process.env.TINY_HUES_SESSION_SECRET || ''; }
function signature(value) { return createHmac('sha256', secret()).update(value).digest('base64url'); }
function safeEqual(left, right) {
  const a = Buffer.from(String(left || ''));
  const b = Buffer.from(String(right || ''));
  return a.length === b.length && timingSafeEqual(a, b);
}
function requestCookie(req) {
  const cookies = String(req.headers.cookie || '').split(';');
  const entry = cookies.map(value => value.trim()).find(value => value.startsWith(`${COOKIE_NAME}=`));
  return entry ? decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)) : '';
}
function issueSession(res) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = `admin.${expiresAt}`;
  const value = `${payload}.${signature(payload)}`;
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict`);
}
function clearSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);
}
function hasAdminSession(req) {
  if (!secret()) return false;
  const value = requestCookie(req);
  const parts = value.split('.');
  if (parts.length !== 3 || parts[0] !== 'admin') return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expiry = Number(parts[1]);
  return Number.isFinite(expiry) && expiry > Math.floor(Date.now() / 1000) && safeEqual(signature(payload), parts[2]);
}
function checkCredentials(id, password) {
  const expectedId = process.env.TINY_HUES_ADMIN_ID || '';
  const expectedPassword = process.env.TINY_HUES_ADMIN_PASSWORD || '';
  return Boolean(expectedId && expectedPassword && secret() && safeEqual(id, expectedId) && safeEqual(password, expectedPassword));
}
function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim();
}

module.exports = { issueSession, clearSession, hasAdminSession, checkCredentials, clientKey };
