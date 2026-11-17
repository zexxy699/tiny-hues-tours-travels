// Server-renders the public homepage and each journey page (/journeys/:slug)
// so search engines and link previews see real content without running JS.
const fs = require('node:fs');
const path = require('node:path');
const R = require('../outputs/render.js');
const seo = require('../lib/seo');
const { readSiteDataOrDefaults, publicContent } = require('../lib/site-data');

let template;
function loadTemplate() {
  template ||= fs.readFileSync(path.join(__dirname, '..', 'outputs', 'index.html'), 'utf8');
  return template;
}

function fill(html, vars) {
  return html.replace(/\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g, (_, raw, escaped) => raw ? String(vars[raw] ?? '') : R.escapeHtml(vars[escaped] ?? ''));
}

function telHref(phone) { return `tel:${String(phone || '').replace(/[^\d+]/g, '')}`; }

function renderPage(content, journeyKey) {
  const data = publicContent(content);
  const s = data.settings;
  const journey = journeyKey ? R.findJourney(data.packages, journeyKey) : null;
  const notFound = Boolean(journeyKey && !journey);
  const meta = seo.pageMeta(data, journey, { notFound });
  const packages = R.filterPackages(data.packages, 'all', '');
  const html = fill(loadTemplate(), {
    head: seo.headHtml(meta, seo.structuredData(data, journey)),
    heroImage: R.cssUrl(s.heroImage),
    heroImagePreload: s.heroImage ? `<link rel="preload" as="image" href="${R.escapeHtml(s.heroImage)}" fetchpriority="high">` : '',
    heroEyebrow: s.heroEyebrow,
    heroTitle: R.heroTitleHtml(s.heroTitle),
    heroSubtitle: s.heroSubtitle,
    destinations: R.destinationsHtml(data.packages),
    packages: packages.map(R.packageCardHtml).join(''),
    emptyHidden: packages.length ? 'hidden' : '',
    leaders: R.leadersHtml(s),
    testimonial: R.testimonialHtml(data.testimonials[0]),
    phone: s.phone,
    phoneHref: telHref(s.phone),
    deskPhone: s.operationsPhone,
    deskPhoneHref: telHref(s.operationsPhone),
    email: s.email,
    emailHref: `mailto:${s.email}`,
    whatsapp: s.whatsapp,
    instagram: s.instagram,
    instagramHidden: s.instagram ? '' : 'hidden',
    facebook: s.facebook,
    facebookHidden: s.facebook ? '' : 'hidden',
    year: new Date().getFullYear(),
    bodyClass: journey ? 'modal-open' : '',
    modalHidden: journey ? '' : 'hidden',
    modalJourney: journey ? journey.id : '',
    modalContent: journey ? R.journeyDialogHtml(journey, s) : '',
    siteData: seo.jsonForScript(data)
  });
  return { html, status: notFound ? 404 : 200 };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).end();
  const content = await readSiteDataOrDefaults();
  const journeyKey = String(req.query?.journey || '').slice(0, 120);
  const { html, status } = renderPage(content, journeyKey);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Served from Vercel's CDN; the page also refreshes its content in the browser after load.
  res.setHeader('Cache-Control', status === 200 ? 'public, max-age=0, s-maxage=60, stale-while-revalidate=600' : 'public, max-age=0, s-maxage=30');
  res.status(status);
  return req.method === 'HEAD' ? res.end() : res.end(html);
};

module.exports.renderPage = renderPage;
