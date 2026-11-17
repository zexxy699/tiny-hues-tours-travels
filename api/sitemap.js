const seo = require('../lib/seo');
const { readSiteData, defaultContent } = require('../lib/site-data');

const xml = value => String(value).replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

module.exports = async function handler(req, res) {
  let content;
  try { content = await readSiteData(); } catch { content = defaultContent(); }
  const lastmod = String(content.updatedAt || new Date().toISOString()).slice(0, 10);
  const urls = [`${seo.SITE_URL}/`].concat((content.packages || []).filter(item => item.status === 'live').map(seo.journeyUrl));
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600, stale-while-revalidate=86400');
  res.status(200);
  return res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(loc => `  <url><loc>${xml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`);
};
