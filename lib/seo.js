const R = require('../outputs/render.js');

const SITE_URL = (process.env.SITE_URL || 'https://www.tinyhuestour.com').replace(/\/+$/, '');
const DEFAULT_OG_IMAGE = '/assets/og-image.jpg';
const HOME_TITLE = 'Kashmir Tour Packages | Tiny Hues Tours & Travels, Srinagar';
const HOME_DESCRIPTION = 'Private Kashmir tour packages from a local Srinagar team: Gulmarg, Pahalgam, Sonamarg, Gurez and more, with handpicked hotels, houseboats and transfers.';
const DAYS = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

function absoluteUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}
function priceNumber(price) {
  const digits = String(price || '').replace(/[^\d.]/g, '');
  return digits ? Number(digits) : null;
}
function isRealProfile(url) {
  return /^https:\/\//i.test(url || '') && !/explore\/search|facebook\.com\/public\//i.test(url);
}
function truncate(text, max = 160) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

// "Mon–Sat · 9:30 AM–6:30 PM" → schema.org opening hours (omitted if the text has another shape).
function openingHours(hours) {
  const match = String(hours || '').match(/(mon|tue|wed|thu|fri|sat|sun)\w*\s*[–-]\s*(mon|tue|wed|thu|fri|sat|sun)\w*.*?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!match) return null;
  const keys = Object.keys(DAYS);
  const start = keys.indexOf(match[1].toLowerCase());
  const end = keys.indexOf(match[2].toLowerCase());
  if (start < 0 || end < start) return null;
  const time = (h, m, ap) => `${String((Number(h) % 12) + (ap.toLowerCase() === 'pm' ? 12 : 0)).padStart(2, '0')}:${m || '00'}`;
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: keys.slice(start, end + 1).map(key => DAYS[key]),
    opens: time(match[3], match[4], match[5]),
    closes: time(match[6], match[7], match[8])
  };
}

function pageMeta(content, journey, { notFound = false } = {}) {
  if (journey) {
    const cover = R.photosOf(journey)[0];
    return {
      title: `${journey.title} (${journey.duration}) – Kashmir Tour Package | Tiny Hues`,
      description: truncate(`${journey.description} ${journey.duration} from ${journey.price}. Route: ${journey.location}.`),
      canonical: absoluteUrl(R.journeyPath(journey)),
      image: absoluteUrl(cover || DEFAULT_OG_IMAGE),
      imageAlt: `${R.shortTitle(journey)}, ${journey.location}`,
      type: 'article',
      robots: 'index, follow, max-image-preview:large'
    };
  }
  return {
    title: notFound ? 'Journey not found | Tiny Hues Tours & Travels' : HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    imageAlt: 'Tiny Hues Tours & Travels – curated Kashmir journeys',
    type: 'website',
    robots: notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large'
  };
}

function tripSchema(item, orgId) {
  const url = absoluteUrl(R.journeyPath(item));
  const price = priceNumber(item.price);
  const places = String(item.location || '').split('·').map(name => name.trim()).filter(Boolean);
  return {
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: item.title,
    description: item.description,
    url,
    image: R.photosOf(item).map(absoluteUrl),
    touristType: item.tag || undefined,
    itinerary: places.length ? { '@type': 'ItemList', itemListElement: places.map((name, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Place', name } })) } : undefined,
    provider: { '@id': orgId },
    offers: price ? { '@type': 'Offer', price, priceCurrency: 'INR', url, availability: 'https://schema.org/InStock', description: `${item.duration}, starting price per package` } : undefined
  };
}

function structuredData(content, journey) {
  const s = content.settings;
  const orgId = `${SITE_URL}/#organization`;
  const live = (content.packages || []).filter(item => item.status === 'live');
  const prices = live.map(item => priceNumber(item.price)).filter(Boolean);
  const sameAs = [s.instagram, s.facebook].filter(isRealProfile);
  const hours = openingHours(s.hours);
  const organization = {
    '@type': 'TravelAgency',
    '@id': orgId,
    name: s.brandName || 'Tiny Hues Tours & Travels',
    alternateName: 'Tiny Hues',
    url: `${SITE_URL}/`,
    logo: absoluteUrl('/assets/tiny-hues-logo.png'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: HOME_DESCRIPTION,
    telephone: s.phone,
    email: s.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Srinagar', addressRegion: 'Jammu and Kashmir', addressCountry: 'IN' },
    areaServed: ['Kashmir', 'Jammu', 'Ladakh'].map(name => ({ '@type': 'Place', name })),
    priceRange: prices.length ? `₹${Math.min(...prices).toLocaleString('en-IN')} – ₹${Math.max(...prices).toLocaleString('en-IN')}` : undefined,
    openingHoursSpecification: hours || undefined,
    contactPoint: [{ '@type': 'ContactPoint', telephone: s.phone, contactType: 'customer service', areaServed: 'IN', availableLanguage: ['English', 'Hindi'] }],
    sameAs: sameAs.length ? sameAs : undefined,
    employee: [[s.leaderOneName, s.leaderOneTitle], [s.leaderTwoName, s.leaderTwoTitle]].filter(([name]) => name).map(([name, jobTitle]) => ({ '@type': 'Person', name, jobTitle }))
  };
  const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'Tiny Hues Tours & Travels', inLanguage: 'en-IN', publisher: { '@id': orgId } };
  const graph = [organization, website];
  if (journey) {
    graph.push(tripSchema(journey, orgId), {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Journeys', item: `${SITE_URL}/#packages` },
        { '@type': 'ListItem', position: 3, name: journey.title, item: absoluteUrl(R.journeyPath(journey)) }
      ]
    });
  } else {
    graph.push({
      '@type': 'ItemList',
      name: 'Kashmir tour packages',
      itemListElement: live.map((item, index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(R.journeyPath(item)), name: item.title }))
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function jsonForScript(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

function headHtml(meta, data) {
  const e = R.escapeHtml;
  return [
    `<title>${e(meta.title)}</title>`,
    `<meta name="description" content="${e(meta.description)}">`,
    `<meta name="robots" content="${e(meta.robots)}">`,
    `<link rel="canonical" href="${e(meta.canonical)}">`,
    '<meta property="og:site_name" content="Tiny Hues Tours &amp; Travels">',
    '<meta property="og:locale" content="en_IN">',
    `<meta property="og:type" content="${e(meta.type)}">`,
    `<meta property="og:title" content="${e(meta.title)}">`,
    `<meta property="og:description" content="${e(meta.description)}">`,
    `<meta property="og:url" content="${e(meta.canonical)}">`,
    `<meta property="og:image" content="${e(meta.image)}">`,
    `<meta property="og:image:alt" content="${e(meta.imageAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${e(meta.title)}">`,
    `<meta name="twitter:description" content="${e(meta.description)}">`,
    `<meta name="twitter:image" content="${e(meta.image)}">`,
    `<script type="application/ld+json">${jsonForScript(data)}</script>`
  ].join('\n  ');
}

module.exports = { SITE_URL, absoluteUrl, priceNumber, isRealProfile, openingHours, pageMeta, structuredData, headHtml, jsonForScript };
