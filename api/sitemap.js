const R = require('../outputs/render.js');
const { SITE_URL } = require('../lib/seo');
const { readSiteDataOrDefaults } = require('../lib/site-data');

function xmlEscape(value) { return String(value).replace(/[<>&'"]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char])); }

module.exports = async function handler(req, res) {
  const content = await readSiteDataOrDefaults();
  const lastmod = (content.updatedAt || new Date().toISOString()).slice(0, 10);
  const urls = [{ loc: `${SITE_URL}/`, priority: '1.0' }].concat(
    content.packages.filter(item => item.status === 'live').map(item => ({ loc: `${SITE_URL}${R.journeyPath(item)}`, priority: '0.8' }))
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${xmlEscape(url.loc)}</loc><lastmod>${lastmod}</lastmod><priority>${url.priority}</priority></url>`).join('\n')}\n</urlset>\n`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200);
  return res.end(xml);
};
