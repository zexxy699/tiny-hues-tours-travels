// Search-engine tags and structured data. Only the page <head> is affected;
// the visible page is served exactly as designed.
const SITE_URL = (process.env.SITE_URL || 'https://www.tinyhuestour.com').replace(/\/+$/, '');
const HOME_TITLE = 'Kashmir Tour Packages | Tiny Hues Tours & Travels, Srinagar';
const HOME_DESCRIPTION = 'Plan a personal Kashmir journey with Tiny Hues Tours & Travels, Srinagar: houseboat stays, Pahalgam and Gulmarg trips, private transfers and custom tours.';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&w=1200&q=80';
const DAYS = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

function escapeHtml(value = '') { return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function slugify(value = '') { return String(value).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80); }
function journeySlug(item) { return item.slug || slugify(item.title || item.id) || item.id; }
function journeyUrl(item) { return `${SITE_URL}/journeys/${encodeURIComponent(journeySlug(item))}`; }
function findJourney(packages, key) {
  const k = String(key || '').toLowerCase();
  return packages.find(item => journeySlug(item) === k) || packages.find(item => String(item.id).toLowerCase() === k) || null;
}
function absoluteUrl(url) { return !url ? '' : /^https?:\/\//i.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`; }
function priceNumber(price) { const digits = String(price || '').replace(/[^\d.]/g, ''); return digits ? Number(digits) : null; }
function isRealProfile(url) { return /^https:\/\//i.test(url || '') && !/explore\/search|facebook\.com\/public\//i.test(url); }
function truncate(text, max = 160) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}
function openingHours(hours) {
  const m = String(hours || '').match(/(mon|tue|wed|thu|fri|sat|sun)\w*\s*[–-]\s*(mon|tue|wed|thu|fri|sat|sun)\w*.*?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!m) return null;
  const keys = Object.keys(DAYS); const a = keys.indexOf(m[1].toLowerCase()); const b = keys.indexOf(m[2].toLowerCase());
  if (a < 0 || b < a) return null;
  const t = (h, min, ap) => `${String((Number(h) % 12) + (ap.toLowerCase() === 'pm' ? 12 : 0)).padStart(2, '0')}:${min || '00'}`;
  return { '@type': 'OpeningHoursSpecification', dayOfWeek: keys.slice(a, b + 1).map(k => DAYS[k]), opens: t(m[3], m[4], m[5]), closes: t(m[6], m[7], m[8]) };
}
function stays(item) { return Array.isArray(item.itinerary) ? item.itinerary.filter(stop => stop && stop.stay && Number(stop.nights) > 0) : []; }
function journeyDescription(item) {
  const route = stays(item).map(stop => `${stop.nights} night${Number(stop.nights) === 1 ? '' : 's'} in ${stop.stay}`).join(', ');
  const price = priceNumber(item.price) ? ` From ${item.price}.` : '';
  return truncate(`${item.title}: ${item.duration} Kashmir tour${route ? ` with ${route}` : ''}.${price} Plan it on WhatsApp with Tiny Hues, Srinagar.`);
}

function pageMeta(content, journey) {
  if (journey) {
    return { title: `${journey.title} (${journey.duration}) – Kashmir Tour Package | Tiny Hues`, description: journeyDescription(journey), canonical: journeyUrl(journey), image: absoluteUrl(journey.image) || DEFAULT_IMAGE, imageAlt: `${journey.title} – Kashmir`, type: 'article' };
  }
  const hero = (content.settings && (content.settings.heroImage || (content.settings.heroImages || [])[0])) || DEFAULT_IMAGE;
  return { title: HOME_TITLE, description: HOME_DESCRIPTION, canonical: `${SITE_URL}/`, image: absoluteUrl(hero), imageAlt: 'A calm Kashmir lake and mountain landscape', type: 'website' };
}

function tripSchema(item, orgId) {
  const url = journeyUrl(item);
  const price = priceNumber(item.price);
  const places = stays(item).map(stop => stop.stay);
  return {
    '@type': 'TouristTrip', '@id': `${url}#trip`, name: item.title, description: journeyDescription(item), url,
    image: (Array.isArray(item.images) && item.images.length ? item.images : [item.image]).filter(Boolean).map(absoluteUrl),
    itinerary: places.length ? { '@type': 'ItemList', itemListElement: places.map((name, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name } })) } : undefined,
    provider: { '@id': orgId },
    offers: price ? { '@type': 'Offer', price, priceCurrency: 'INR', url, availability: 'https://schema.org/InStock' } : undefined
  };
}

function structuredData(content, journey) {
  const s = content.settings || {};
  const orgId = `${SITE_URL}/#organization`;
  const live = (content.packages || []).filter(item => item.status === 'live');
  const sameAs = [s.instagram, s.facebook].filter(isRealProfile);
  const hours = openingHours(s.hours);
  const graph = [{
    '@type': 'TravelAgency', '@id': orgId, name: s.brandName || 'Tiny Hues Tours & Travels', alternateName: 'Tiny Hues', url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/tiny-hues-logo.png`, image: pageMeta(content, null).image, description: HOME_DESCRIPTION,
    telephone: s.phone, email: s.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Srinagar', addressRegion: 'Jammu and Kashmir', addressCountry: 'IN' },
    areaServed: ['Kashmir', 'Jammu', 'Ladakh'].map(name => ({ '@type': 'Place', name })),
    hasMap: s.officeMapUrl || undefined,
    openingHoursSpecification: hours || undefined,
    sameAs: sameAs.length ? sameAs : undefined
  }, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'Tiny Hues Tours & Travels', inLanguage: 'en-IN', publisher: { '@id': orgId } }];
  if (journey) {
    graph.push(tripSchema(journey, orgId), { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: journey.title, item: journeyUrl(journey) }
    ] });
  } else if (live.length) {
    graph.push({ '@type': 'ItemList', name: 'Kashmir tour packages', itemListElement: live.map((item, i) => ({ '@type': 'ListItem', position: i + 1, url: journeyUrl(item), name: item.title })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function jsonForScript(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

function headTags(meta, data) {
  const e = escapeHtml;
  return [
    '<base href="/" />',
    `<title>${e(meta.title)}</title>`,
    `<meta name="description" content="${e(meta.description)}" />`,
    `<link rel="canonical" href="${e(meta.canonical)}" />`,
    '<meta property="og:site_name" content="Tiny Hues Tours &amp; Travels" />',
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:type" content="${e(meta.type)}" />`,
    `<meta property="og:title" content="${e(meta.title)}" />`,
    `<meta property="og:description" content="${e(meta.description)}" />`,
    `<meta property="og:url" content="${e(meta.canonical)}" />`,
    `<meta property="og:image" content="${e(meta.image)}" />`,
    `<meta property="og:image:alt" content="${e(meta.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${e(meta.title)}" />`,
    `<meta name="twitter:description" content="${e(meta.description)}" />`,
    `<meta name="twitter:image" content="${e(meta.image)}" />`,
    `<script type="application/ld+json">${jsonForScript(data)}</script>`
  ].join('\n  ');
}

// Replace the page's own title/description/share tags with the generated ones.
function applyHead(html, content, journey) {
  const meta = pageMeta(content, journey);
  const cleaned = html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+(name="description"|property="og:[^"]*"|name="twitter:[^"]*")[^>]*>/gi, '');
  return cleaned.replace(/(<meta\s+name="viewport"[^>]*>)/i, `$1\n  ${headTags(meta, structuredData(content, journey))}`);
}

module.exports = { SITE_URL, slugify, journeySlug, journeyUrl, findJourney, priceNumber, openingHours, pageMeta, structuredData, applyHead, jsonForScript, escapeHtml };
