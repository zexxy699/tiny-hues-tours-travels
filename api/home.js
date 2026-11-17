// Serves the homepage and each journey address (/journeys/name) with search-engine
// tags filled in. The visible page is the unchanged outputs/index.html.
const fs = require('node:fs');
const path = require('node:path');
const seo = require('../lib/seo');
const { readSiteData, defaultContent } = require('../lib/site-data');

let template;
function loadTemplate() { return (template ||= fs.readFileSync(path.join(__dirname, '..', 'outputs', 'index.html'), 'utf8')); }
function loadNotFound() { return fs.readFileSync(path.join(__dirname, '..', '404.html'), 'utf8'); }

function publicContent(content) {
  return { settings: content.settings || {}, packages: (content.packages || []).filter(item => item.status === 'live'), testimonials: content.testimonials || [] };
}

function notFoundPage(content) {
  const picks = content.packages.filter(item => item.featured).concat(content.packages.filter(item => !item.featured)).slice(0, 4);
  const links = picks.map(item => `<li><a class="nf-link" href="${seo.escapeHtml(`/journeys/${encodeURIComponent(seo.journeySlug(item))}`)}"><span class="nf-link-title">${seo.escapeHtml(item.title)}</span><span class="nf-link-meta">${seo.escapeHtml(item.duration)}</span></a></li>`).join('');
  return loadNotFound().replace('<!--journeys-->', links);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  let html;
  let status = 200;
  try {
    let content;
    try { content = publicContent(await readSiteData()); } catch (error) { console.error('Content read failed, using defaults', error); content = publicContent(defaultContent()); }
    const key = String(req.query?.journey || '').slice(0, 120);
    const journey = key ? seo.findJourney(content.packages, key) : null;
    if (key && !journey) {
      status = 404;
      try { html = notFoundPage(content); } catch { html = seo.applyHead(loadTemplate(), content, null); }
    } else {
      html = seo.applyHead(loadTemplate(), content, journey);
    }
  } catch (error) {
    // Never let the SEO layer take the site down: fall back to the plain page.
    console.error('Page render failed, serving plain page', error);
    html = loadTemplate().replace(/<head>/i, '<head>\n  <base href="/" />');
  }
  res.setHeader('Cache-Control', status === 200 ? 'public, max-age=0, must-revalidate' : 'no-store');
  if (status === 200) res.setHeader('Vercel-CDN-Cache-Control', 'max-age=60, stale-while-revalidate=600');
  res.status(status);
  return req.method === 'HEAD' ? res.end() : res.end(html);
};
