const KASHMIR_HERO_IMAGE = 'https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&w=1800&q=80';
const KASHMIR_HERO_IMAGES = [
  KASHMIR_HERO_IMAGE,
  'https://images.unsplash.com/photo-1730898749795-be8eb5a48ea7?auto=format&fit=crop&crop=entropy&w=1800&q=80',
  'https://images.unsplash.com/photo-1721195807634-82e30d4196c4?auto=format&fit=crop&crop=entropy&w=1800&q=80',
  'https://images.unsplash.com/photo-1671034195878-468498953cf1?auto=format&fit=crop&crop=entropy&w=1800&q=80',
  'https://images.unsplash.com/photo-1771098524443-a8384b118ca5?auto=format&fit=crop&crop=entropy&w=1800&q=80'
];
const KASHMIR_CARD_IMAGE = 'https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&w=900&q=85';
const HERO_IMAGE_VERSION = 'kashmir-cover-v4';
const HERO_SLIDE_INTERVAL = 29000;
const CURRENT_WHATSAPP = 'https://wa.me/916006473963';
const COOKIE_CONSENT_KEY = 'tinyHuesCookieConsent';

const defaultData = {
  settings: {
    brandName: 'Tiny Hues Tours & Travels',
    tagline: 'Curated Kashmir journeys',
    phone: '+91 6006473963',
    operationsPhone: '+91 6005577032',
    email: 'infotinyhuestourandtravels316@gmail.com',
    whatsapp: CURRENT_WHATSAPP,
    whatsappQr: '',
    instagram: 'https://instagram.com/tinyhuestourandtravels',
    reviewsUrl: 'https://www.google.com/maps/place/Tinyhuestourandtravels/@34.2719076,74.49347,17z/data=!3m1!4b1!4m6!3m5!1s0x38e109729b9c84e3:0x4d36b86023975e7c!8m2!3d34.2719076!4d74.4960449!16s%2Fg%2F11lymyttj5',
    reviewRating: '4.8',
    reviewCount: '24',
    facebook: '',
    address: 'Srinagar, Jammu & Kashmir',
    officeMapUrl: 'https://maps.app.goo.gl/c5jALxWHa2rcDN8h6',
    officeMapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=74.482,34.266,74.510,34.278&layer=mapnik&marker=34.2719076,74.4960449',
    hours: 'Mon–Sat · 9:30 AM–6:30 PM',
    heroEyebrow: 'Kashmir, thoughtfully arranged',
    heroTitle: 'Go where the quiet lives.',
    heroSubtitle: 'Journeys through Kashmir made personal — from the first cup of kahwa to the last mountain view.',
    heroImage: KASHMIR_HERO_IMAGE,
    heroImages: KASHMIR_HERO_IMAGES,
    heroImageVersion: HERO_IMAGE_VERSION,
    leaderOneName: 'Aqib Ajaz',
    leaderOneTitle: 'Chief Executive Officer',
    leaderOneBio: 'Spearheading the strategic vision and luxury partnerships at Tiny Hues. Aqib ensures every guest experiences the authentic warmth and majestic charm of Kashmir with ultra-premium comfort.',
    leaderTwoName: 'Umaiq Aijaz',
    leaderTwoTitle: 'Managing Director',
    leaderTwoBio: "Directing corporate growth, client relations, and bespoke itinerary standards. Umaiq ensures that Tiny Hues maintains its status as Kashmir's premier trusted travel brand.",
    salesManagerOneName: 'Musaib Hassan',
    salesManagerOneTitle: 'Reservation Manager',
    salesManagerTwoName: 'Rubina Akhtar',
    salesManagerThreeName: 'Snober Nabi',
    contactVersion: 'contacts-v2',
    metaPixelId: ''
  },
  packages: [
    { id: 'p1', title: 'Kashmir, in full colour', location: 'Srinagar · Gulmarg · Pahalgam', duration: '6 nights · 7 days', price: '₹15,999', category: 'valley', tag: 'Signature', description: 'A gentle first taste of Kashmir: floating breakfasts, meadows in bloom and unhurried days between Srinagar, Gulmarg and Pahalgam.', image: KASHMIR_CARD_IMAGE, featured: true, status: 'live' },
    { id: 'p2', title: 'The high road', location: 'Srinagar · Kargil · Leh', duration: '10 nights · 11 days', price: 'Get a quote', category: 'mountains', tag: 'Adventure', description: 'Take the long way over the Himalayas with dramatic passes, quiet monasteries and the unforgettable blue of Pangong Lake.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p3', title: 'A softer kind of north', location: 'Srinagar · Sonamarg · Doodhpathri', duration: '4 nights · 5 days', price: '₹12,500', category: 'valley', tag: 'Slow escape', description: 'For travellers who want less road and more room to breathe, with meadows, forest walks and long evenings by the lake.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p4', title: 'The soulful circuit', location: 'Jammu · Katra · Srinagar', duration: '9 nights · 10 days', price: 'Get a quote', category: 'spiritual', tag: 'Meaningful', description: 'A considered journey from Vaishno Devi to the valley, balancing sacred places, local food and quiet moments of reflection.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85', featured: false, status: 'live' },
    { id: 'p5', title: 'Winter, warmly', location: 'Srinagar · Gulmarg', duration: '5 nights · 6 days', price: '₹14,500', category: 'mountains', tag: 'Seasonal', description: 'Four nights in Srinagar and one in Gulmarg, with winter activities planned around conditions.', image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=900&q=85', featured: false, status: 'live' },
    { id: 'p6', title: 'Build your own Kashmir', location: 'Anywhere in the valley', duration: 'Made around you', price: 'Get a quote', category: 'all', tag: 'Bespoke', description: 'Tell us how you like to travel and we will shape the route, stays and small surprises around you.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85'], featured: false, status: 'live' },
    { id:'sonamarg', title:'Sonamarg · Meadow of Gold', location:'Sonamarg · Thajiwas · Sindh River', duration:'2 nights · 3 days', price:'Get a quote', category:'mountains', tag:'Alpine escape', description:'Follow the Sindh River into wide mountain meadows, with time for the Thajiwas landscape, local stops and a slow evening beneath the peaks.', image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85', images:['https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85'], featured:true, status:'live', showInDestinations:true },
    { id:'gurez', title:'Gurez · Beyond the Pass', location:'Dawar · Habba Khatoon · Kishanganga', duration:'3 nights · 4 days', price:'Get a quote', category:'mountains', tag:'Off the map', description:'A quieter northern journey through Gurez\'s riverside villages, open valley views and the striking profile of Habba Khatoon peak.', image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85', images:['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85'], featured:true, status:'live', showInDestinations:true },
    { id:'daksum', title:'Daksum · Under the Pines', location:'Daksum · Bringi River · Anantnag', duration:'2 nights · 3 days', price:'Get a quote', category:'valley', tag:'Forest retreat', description:'A forest-side escape shaped around the Bringi stream, wooded walks and an easy pace in the cool green hills of Daksum.', image:'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85', images:['https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85'], featured:false, status:'live', showInDestinations:true },
    { id:'doodhpathri', title:'Doodhpathri · Meadow Days', location:'Doodhpathri · Shaliganga · Budgam', duration:'2 nights · 3 days', price:'Get a quote', category:'valley', tag:'Meadow escape', description:'Spend unhurried time among open grasslands, winding meadow roads and pine-covered slopes in the Budgam highlands.', image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85', images:['https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85'], featured:true, status:'live', showInDestinations:true },
    { id:'peer-ki-gali', title:'Peer Ki Gali · The High Pass', location:'Peer Ki Gali · Mughal Road · Pir Panjal', duration:'2 nights · 3 days', price:'Get a quote', category:'mountains', tag:'Mountain pass', description:'Take the historic Mughal Road into the Pir Panjal highlands, with time for sweeping pass views and the mountain air at its own pace.', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg/1200px-Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg', images:['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg/1200px-Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg'], featured:false, status:'live', showInDestinations:true },
    { id:'bangus-valley', title:'Bangus Valley · Wide Open', location:'Bangus Valley · Kupwara', duration:'3 nights · 4 days', price:'Get a quote', category:'mountains', tag:'Open valley', description:'A slower journey through Kupwara\'s broad alpine valley, with long meadow views, forest edges and room to let the landscape set the pace.', image:'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=85', images:['https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=85'], featured:true, status:'live', showInDestinations:true }
  ],
  bookings: [],
  testimonials: [
    { id: 'g-review-1', quote: 'Our honeymoon in Kashmir was magical. Romantic stays, scenic views, and special care at every place. Thank you for making it so special ❤️', name: 'Taimor Aslam', location: 'Google review · 9 months ago', rating: 5, source: 'Google' },
    { id: 'g-review-2', quote: 'This travel agency made our dream of visiting Kashmir come true. Professional staff, polite drivers, and beautiful locations. Truly unforgettable 🫶❣️', name: 'Salman Aslam', location: 'Google review · 9 months ago', rating: 5, source: 'Google' },
    { id: 'g-review-3', quote: 'Best tour in Kashmir best car service and best driver khurshid bhai', name: 'Shahebaz Tamboli', location: 'Google review · 9 months ago', rating: 5, source: 'Google' },
    { id: 'g-review-4', quote: 'One of the best tour planners in kashmir. The staff is absolutely good and helpful even in their off times they don’t hesitate to help.', name: 'Farzan Meer', location: 'Google review · a year ago', rating: 5, source: 'Google' }
  ]
};

const starterNightPlans = {
  p1:{pickupPoint:'Srinagar Airport',itinerary:[{nights:4,stay:'Srinagar',details:'Stay in Srinagar and explore the lakefront, gardens and old city at an easy pace.'},{nights:1,stay:'Dal Lake houseboat',details:'Spend one night aboard a houseboat on Dal Lake.'},{nights:1,stay:'Pahalgam',details:'Finish in Pahalgam; choose your preferred departure point for the trip.'}]},
  p2:{location:'Srinagar · Kargil · Leh · Nubra Valley · Pangong',pickupPoint:'Srinagar Airport',dropoffPoint:'Leh Airport',itinerary:[{nights:1,stay:'Srinagar',details:'Arrival and preparation for the high-altitude road journey.'},{nights:1,stay:'Kargil',details:'Drive via Sonamarg and Drass; overnight in Kargil.'},{nights:3,stay:'Leh',details:'Allow time to acclimatise, then visit Leh town and nearby monasteries.'},{nights:2,stay:'Nubra Valley',details:'Cross Khardung La when open; visit villages and monasteries around Nubra.'},{nights:1,stay:'Pangong',details:'Overnight by Pangong Lake if road and permit conditions allow.'},{nights:2,stay:'Leh',details:'Return to Leh with a buffer day before departure.'}]},
  p3:{pickupPoint:'Srinagar Airport',itinerary:[{nights:2,stay:'Srinagar',details:'Stay in Srinagar and explore the lakefront, gardens and old city.'},{nights:1,stay:'Dal Lake houseboat',details:'Spend one night aboard a houseboat on Dal Lake.'},{nights:1,stay:'Pahalgam',details:'Finish in Pahalgam; choose your preferred departure point for the trip.'}]},
  p4:{location:'Jammu · Katra · Srinagar · Gulmarg · Pahalgam',pickupPoint:'Jammu Airport or railway station',dropoffPoint:'Srinagar Airport',itinerary:[{nights:1,stay:'Jammu',details:'Arrive in Jammu and transfer to Katra.'},{nights:2,stay:'Katra',details:'Vaishno Devi visit; allow time for the yatra and rest.'},{nights:2,stay:'Srinagar',details:'Travel to Srinagar; lakefront and city visits.'},{nights:1,stay:'Gulmarg',details:'Meadow visit and optional Gondola, subject to tickets and weather.'},{nights:3,stay:'Pahalgam',details:'Pahalgam valley visits; local routes depend on season and road conditions.'}]},
  p5:{pickupPoint:'Srinagar Airport',itinerary:[{nights:3,stay:'Srinagar',details:'Stay in Srinagar and explore the lakefront, gardens and old city.'},{nights:1,stay:'Dal Lake houseboat',details:'Spend one night aboard a houseboat on Dal Lake.'},{nights:1,stay:'Pahalgam',details:'Finish in Pahalgam; choose your preferred departure point for the trip.'}]},
  sonamarg:{pickupPoint:'Srinagar Airport',dropoffPoint:'Srinagar Airport',itinerary:[{nights:2,stay:'Sonamarg',details:'Explore the meadow, Sindh River and Thajiwas area; access depends on season and local conditions.'}]},
  gurez:{pickupPoint:'Srinagar Airport',dropoffPoint:'Srinagar Airport',itinerary:[{nights:1,stay:'Srinagar',details:'Arrive and prepare for the road journey north.'},{nights:2,stay:'Dawar, Gurez',details:'Explore Dawar, the Kishanganga river and Habba Khatoon viewpoints; check local road and permit conditions.'}]},
  daksum:{pickupPoint:'Srinagar Airport',dropoffPoint:'Srinagar Airport',itinerary:[{nights:2,stay:'Daksum',details:'Use Daksum as a base for the Bringi River, forest walks and nearby Anantnag stops.'}]},
  doodhpathri:{pickupPoint:'Srinagar Airport',dropoffPoint:'Srinagar Airport',itinerary:[{nights:1,stay:'Srinagar',details:'Arrive and transfer toward Budgam.'},{nights:1,stay:'Doodhpathri area',details:'Meadow visit and local walks; overnight stay location to be confirmed for travel dates.'}]},
  'peer-ki-gali':{pickupPoint:'Srinagar Airport',dropoffPoint:'Srinagar Airport',itinerary:[{nights:2,stay:'Shopian',details:'Use Shopian as a base; visit Peer Ki Gali via Mughal Road when the road is open.'}]},
  'bangus-valley':{location:'Srinagar · Kupwara · Bangus Valley',pickupPoint:'Srinagar Airport',dropoffPoint:'Srinagar Airport',itinerary:[{nights:1,stay:'Srinagar',details:'Arrival and preparation for the journey to Kupwara.'},{nights:2,stay:'Kupwara',details:'Day visits toward Bangus Valley, subject to local access, permits and weather.'}]}
};
defaultData.packages = defaultData.packages.filter(item => ['p1', 'p3', 'p5'].includes(item.id));
defaultData.packages.forEach(item => { if (starterNightPlans[item.id]) Object.assign(item, starterNightPlans[item.id]); });
defaultData.settings.whatsapp = CURRENT_WHATSAPP;
defaultData.settings.officeMapUrl = 'https://maps.app.goo.gl/c5jALxWHa2rcDN8h6';
defaultData.settings.officeMapEmbed = 'https://www.openstreetmap.org/export/embed.html?bbox=74.482,34.266,74.510,34.278&layer=mapnik&marker=34.2719076,74.4960449';
defaultData.settings.salesManagerOneTitle = 'Reservation Manager';
Object.assign(defaultData.packages.find(item => item.id === 'p1'), {
  location: 'Srinagar · Dal Lake houseboat · Pahalgam',
  itinerary: [
    { nights: 4, stay: 'Srinagar', details: 'Stay in Srinagar and explore the lakefront, gardens and old city at an easy pace.' },
    { nights: 1, stay: 'Dal Lake houseboat', details: 'Spend one night aboard a houseboat on Dal Lake.' },
    { nights: 1, stay: 'Pahalgam', details: 'Finish in Pahalgam; the preferred departure point can be chosen for your trip.' }
  ],
  description: 'Six nights with four in Srinagar, one on a Dal Lake houseboat and the final night in Pahalgam.'
});
Object.assign(defaultData.packages.find(item => item.id === 'p3'), {
  location: 'Srinagar · Dal Lake houseboat · Pahalgam',
  itinerary: [
    { nights: 2, stay: 'Srinagar', details: 'Stay in Srinagar and explore the lakefront, gardens and old city.' },
    { nights: 1, stay: 'Dal Lake houseboat', details: 'Spend one night aboard a houseboat on Dal Lake.' },
    { nights: 1, stay: 'Pahalgam', details: 'Finish in Pahalgam; choose your preferred departure point for the trip.' }
  ],
  description: 'Four nights: two in Srinagar, one on a Dal Lake houseboat and the final night in Pahalgam.'
});
Object.assign(defaultData.packages.find(item => item.id === 'p5'), {
  location: 'Srinagar · Dal Lake houseboat · Pahalgam',
  itinerary: [
    { nights: 3, stay: 'Srinagar', details: 'Stay in Srinagar and explore the lakefront, gardens and old city.' },
    { nights: 1, stay: 'Dal Lake houseboat', details: 'Spend one night aboard a houseboat on Dal Lake.' },
    { nights: 1, stay: 'Pahalgam', details: 'Finish in Pahalgam; choose your preferred departure point for the trip.' }
  ],
  description: 'Five nights: three in Srinagar, one on a Dal Lake houseboat and the final night in Pahalgam.'
});

function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }

/* ---------- What's included (icons + inclusion list) ---------- */
// Line icons on a 24px grid; `.ia` strokes use the accent colour.
const INCLUDE_TYPES = [
  { key: 'sightseeing', label: 'Sightseeing', svg: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8.5 7l1.4-2.5h4.2L15.5 7"/><circle cx="12" cy="13.5" r="3.5"/><circle class="ia" cx="12" cy="13.5" r="1"/><path class="ia" d="M17.5 10.2h.01"/>' },
  { key: 'meals', label: 'Meals', svg: '<path d="M3.5 4v4a1.75 1.75 0 0 0 3.5 0V4M5.25 4v16"/><circle cx="13.5" cy="12" r="5.2"/><circle class="ia" cx="13.5" cy="12" r="2.4"/><path d="M20.5 20V4c1.3.9 1.9 3.2 1.9 6.5h-1.9"/>' },
  { key: 'hotels', label: 'Hotels', svg: '<path d="M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16M3 21h18M10 21v-4h4v4"/><path class="ia" d="M8.5 8h1M14.5 8h1M8.5 12h1M14.5 12h1"/>' },
  { key: 'transfer', label: 'Transfers', svg: '<path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11"/><rect x="3" y="11" width="18" height="6" rx="2"/><path d="M5.5 17v2.5M18.5 17v2.5"/><path class="ia" d="M7 14h1.5M15.5 14H17"/>' },
  { key: 'houseboat', label: 'Houseboat', svg: '<path d="M2.5 14h19l-2.2 3.5a2 2 0 0 1-1.7 1H6.4a2 2 0 0 1-1.7-1Z"/><path d="M6 14v-4h12v4M5 10l7-4 7 4"/><path class="ia" d="M3 21.5c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M9.5 12h1M13.5 12h1"/>' },
  { key: 'guide', label: 'Local guide', svg: '<circle cx="12" cy="12" r="9"/><path class="ia" d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>' }
];
const INCLUDE_BY_KEY = Object.fromEntries(INCLUDE_TYPES.map(type => [type.key, type]));
const DEFAULT_INCLUDES = {
  includes: ['sightseeing', 'meals', 'hotels', 'transfer', 'houseboat'],
  inclusions: ['Sightseeing in a private car', 'Stay in deluxe hotels', 'One night on a Dal Lake houseboat', 'Daily breakfast and dinner', 'Pickup from Srinagar Airport']
};
function includeIcon(key) { const type = INCLUDE_BY_KEY[key]; return type ? `<svg class="include-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${type.svg}</svg>` : ''; }
function includesOf(item) { return (Array.isArray(item?.includes) ? item.includes : []).filter(key => INCLUDE_BY_KEY[key]); }
function inclusionsOf(item) { return (Array.isArray(item?.inclusions) ? item.inclusions : []).map(line => String(line).trim()).filter(Boolean); }
function cardIncludesHtml(item) {
  const keys = includesOf(item);
  if (!keys.length) return '';
  return `<ul class="card-includes" aria-label="Includes ${escapeHtml(keys.map(key => INCLUDE_BY_KEY[key].label).join(', '))}">${keys.map(key => `<li title="${escapeHtml(INCLUDE_BY_KEY[key].label)}">${includeIcon(key)}</li>`).join('')}</ul>`;
}
function includesPanelHtml(item) {
  const keys = includesOf(item);
  const lines = inclusionsOf(item);
  if (!keys.length && !lines.length) return '';
  return `${keys.length ? `<h3>What's included</h3><ul class="include-strip">${keys.map(key => `<li>${includeIcon(key)}<span>${escapeHtml(INCLUDE_BY_KEY[key].label)}</span></li>`).join('')}</ul>` : ''}${lines.length ? `<h3>Package inclusions</h3><ul class="inclusion-list">${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''}`;
}

/* ---------- Shareable journey addresses (/journeys/name) ---------- */
const HOME_TITLE = document.title;
function journeySlug(item) {
  return item.slug || String(item.title || item.id).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || item.id;
}
function journeyFromPath() {
  const match = location.pathname.match(/^\/journeys\/([^/]+)/);
  if (!match) return null;
  const key = decodeURIComponent(match[1]).toLowerCase();
  return data.packages.find(item => item.status !== 'draft' && (journeySlug(item) === key || String(item.id).toLowerCase() === key)) || null;
}

let data = JSON.parse(JSON.stringify(defaultData));
data.packages.forEach(item => { if (['p1', 'p3', 'p5'].includes(item.id) && item.includes === undefined) Object.assign(item, JSON.parse(JSON.stringify(DEFAULT_INCLUDES))); });
let activeFilter = 'all';
let testimonialIndex = 0;
let heroSlideTimer = null;
let testimonialTimer = null;
let heroSlidesSignature = '';
let heroSlideIndex = 0;
let heroVisibleLayer = 0;
let metaPixelLoadedId = '';
let optionalCookieConsentForSession = false;

function safeHeroImageUrl(value = '') {
  const href = safeWebUrl(value);
  if (href) return href;
  if (!String(value).startsWith('/api/media?path=')) return '';
  try {
    const path = new URL(value, window.location.origin).searchParams.get('path') || '';
    return path.startsWith('tiny-hues/images/') && !path.includes('..') ? value : '';
  } catch { return ''; }
}

function optimizedHeroImageUrl(value = '') {
  const href = safeHeroImageUrl(value);
  if (!href || href.startsWith('/api/media?')) return href;
  try {
    const url = new URL(href);
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('w', '1800');
      url.searchParams.set('q', '80');
      url.searchParams.set('auto', 'format');
    }
    return url.href;
  } catch { return href; }
}

function renderHeroCarousel() {
  const layers = [...document.querySelectorAll('.hero-image')];
  if (!layers.length) return;
  const configured = Array.isArray(data.settings.heroImages) ? data.settings.heroImages : [];
  const slides = [...new Set((configured.length ? configured : [data.settings.heroImage || KASHMIR_HERO_IMAGES[0]])
    .map(optimizedHeroImageUrl).filter(Boolean))].slice(0, 5);
  if (!slides.length) return;
  const signature = JSON.stringify(slides);
  if (signature === heroSlidesSignature && layers.some(layer => layer.style.backgroundImage)) return;
  if (heroSlideTimer) clearInterval(heroSlideTimer);
  heroSlidesSignature = signature;
  heroSlideIndex = 0;
  heroVisibleLayer = 0;
  const number = document.getElementById('heroSlideNumber');
  const progress = document.getElementById('heroProgressFill');
  const showSlide = (index) => {
    heroSlideIndex = index % slides.length;
    const nextLayer = (heroVisibleLayer + 1) % layers.length;
    layers[nextLayer].style.backgroundImage = `url(${JSON.stringify(slides[heroSlideIndex])})`;
    layers[nextLayer].classList.add('is-visible');
    layers[heroVisibleLayer].classList.remove('is-visible');
    heroVisibleLayer = nextLayer;
    if (number) number.textContent = `${String(heroSlideIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (progress) {
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        progress.style.transition = `width ${HERO_SLIDE_INTERVAL}ms linear`;
        progress.style.width = '100%';
      }));
    }
    const preload = new Image();
    preload.src = slides[(heroSlideIndex + 1) % slides.length];
  };
  layers.forEach(layer => { layer.classList.remove('is-visible'); layer.style.backgroundImage = ''; });
  layers[0].classList.add('is-visible');
  layers[0].style.backgroundImage = `url(${JSON.stringify(slides[0])})`;
  heroVisibleLayer = 0;
  if (number) number.textContent = `01 / ${String(slides.length).padStart(2, '0')}`;
  if (slides.length > 1) heroSlideTimer = setInterval(() => showSlide(heroSlideIndex + 1), HERO_SLIDE_INTERVAL);
}

function renderSiteSettings() {
  const s = data.settings;
  document.title = `${s.brandName.split(' Tours')[0]} | ${s.tagline}`;
  renderHeroCarousel();
  const title = document.querySelector('#heroTitle');
  if (title) {
    const words = s.heroTitle.split(' ');
    const emphasis = words.pop() || '';
    title.innerHTML = `${escapeHtml(words.join(' '))}<br><em>${escapeHtml(emphasis)}</em>`;
  }
  ['heroEyebrow','heroSubtitle'].forEach(key => { const node = document.getElementById(key); if (node) node.textContent = s[key]; });
  const phone = document.getElementById('footerPhone');
  if (phone) { phone.textContent = s.phone; phone.href = `tel:${s.phone.replace(/\s/g, '')}`; }
  const deskPhone = document.getElementById('footerDeskPhone');
  if (deskPhone) { deskPhone.textContent = s.operationsPhone; deskPhone.href = `tel:${s.operationsPhone.replace(/\s/g, '')}`; }
  const directPhone = document.getElementById('directPhone');
  const callNumber = s.operationsPhone || s.phone;
  if (directPhone) { directPhone.textContent = callNumber; directPhone.href = `tel:${callNumber.replace(/\s/g, '')}`; }
  const email = document.getElementById('footerEmail');
  if (email) { email.textContent = s.email; email.href = `mailto:${s.email}`; }
  const whatsapp = document.getElementById('directWhatsapp');
  if (whatsapp) whatsapp.href = s.whatsapp;
  const floatingWhatsapp = document.getElementById('floatingWhatsapp');
  if (floatingWhatsapp) floatingWhatsapp.href = s.whatsapp;
  const floatingCall = document.getElementById('floatingCall');
  if (floatingCall) {
    const dial = String(s.operationsPhone || '').replace(/[^\d+]/g, '');
    floatingCall.href = `tel:${dial}`;
    floatingCall.setAttribute('aria-label', `Call Tiny Hues on ${s.operationsPhone}`);
  }
  const floatingLocation = document.getElementById('floatingLocation');
  if (floatingLocation) {
    const mapUrl = safeWebUrl(s.officeMapUrl);
    floatingLocation.href = mapUrl || '#';
    floatingLocation.hidden = !mapUrl;
  }
  const qrChat = document.getElementById('qrWhatsappLink');
  if (qrChat) qrChat.href = s.whatsapp;
  const qrNumber = document.getElementById('qrWhatsappNumber');
  if (qrNumber) {
    const digits = String(s.whatsapp || CURRENT_WHATSAPP).replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    qrNumber.textContent = digits.length === 10 ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : s.whatsapp;
  }
  const qrImage = document.getElementById('whatsappQrImage');
  if (qrImage) {
    const customQr = safeWebUrl(s.whatsappQr) || (typeof s.whatsappQr === 'string' && /^\/(?!\/)/.test(s.whatsappQr) ? s.whatsappQr : '');
    const generatedQr = new URL('https://api.qrserver.com/v1/create-qr-code/');
    generatedQr.searchParams.set('size', '320x320');
    generatedQr.searchParams.set('color', '174C7A');
    generatedQr.searchParams.set('bgcolor', 'FFFFFF');
    generatedQr.searchParams.set('qzone', '2');
    generatedQr.searchParams.set('data', s.whatsapp || CURRENT_WHATSAPP);
    qrImage.referrerPolicy = 'no-referrer';
    qrImage.src = customQr || generatedQr.href;
  }
  const instagramUrl = safeInstagramUrl(s.instagram);
  const instagram = document.getElementById('footerInstagram');
  if (instagram) {
    instagram.hidden = !instagramUrl;
    instagram.href = instagramUrl || '#';
  }
  const followInstagram = document.getElementById('followInstagram');
  if (followInstagram) {
    followInstagram.href = instagramUrl || '#';
    followInstagram.setAttribute('aria-disabled', String(!instagramUrl));
    followInstagram.tabIndex = instagramUrl ? 0 : -1;
    followInstagram.classList.toggle('is-disabled', !instagramUrl);
    followInstagram.innerHTML = instagramUrl ? 'Follow on Instagram <span class="icon icon-arrow" aria-hidden="true"></span>' : 'Instagram profile coming soon <span class="icon icon-arrow" aria-hidden="true"></span>';
  }
  const instagramHandle = document.getElementById('instagramHandle');
  if (instagramHandle) instagramHandle.textContent = instagramUrl ? `@${new URL(instagramUrl).pathname.split('/').filter(Boolean)[0]}` : 'Tiny Hues Tours & Travels';
  renderOfficeLocation();
  const reviewsLink = document.getElementById('googleReviewsLink');
  if (reviewsLink) {
    const reviewsUrl = safeWebUrl(s.reviewsUrl);
    reviewsLink.hidden = !reviewsUrl;
    if (reviewsUrl) reviewsLink.href = reviewsUrl;
  }
  const facebook = document.getElementById('footerFacebook');
  const facebookUrl = safeWebUrl(s.facebook);
  if (facebook) {
    facebook.hidden = !facebookUrl || facebookUrl.includes('/public/');
    facebook.href = facebook.hidden ? '#' : facebookUrl;
  }
  syncMetaPixel();
}

function safeWebUrl(value = '') {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch { return ''; }
}

function safeInstagramUrl(value = '') {
  const href = safeWebUrl(value);
  if (!href) return '';
  const url = new URL(href);
  if (!/(^|\.)instagram\.com$/i.test(url.hostname)) return '';
  const segments = url.pathname.split('/').filter(Boolean);
  if (!segments.length || ['explore', 'accounts', 'reel', 'reels', 'stories', 'p'].includes(segments[0].toLowerCase())) return '';
  return href;
}

function hasOptionalCookieConsent() {
  try { return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted' || optionalCookieConsentForSession; }
  catch { return optionalCookieConsentForSession; }
}

function syncMetaPixel() {
  const pixelId = String(data.settings.metaPixelId || '').trim();
  if (!hasOptionalCookieConsent()) {
    if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
    return;
  }
  if (!/^\d{8,20}$/.test(pixelId)) return;
  if (metaPixelLoadedId) {
    if (metaPixelLoadedId === pixelId) window.fbq?.('consent', 'grant');
    else window.fbq?.('consent', 'revoke');
    return;
  }
  if (typeof window.fbq === 'function') return;
  const fbq = function() {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
    else fbq.queue.push(arguments);
  };
  fbq.queue = [];
  fbq.loaded = false;
  fbq.version = '2.0';
  window.fbq = window._fbq = fbq;
  fbq('consent', 'grant');
  fbq('set', 'autoConfig', false, pixelId);
  fbq('init', pixelId);
  fbq('track', 'PageView');
  metaPixelLoadedId = pixelId;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
}

function trackMetaEvent(name, params = {}) {
  if (!hasOptionalCookieConsent() || !metaPixelLoadedId || typeof window.fbq !== 'function') return;
  window.fbq('track', name, params);
}

function renderLeadership() {
  const target = document.getElementById('leadershipGrid');
  if (!target) return;
  const leaders = [
    { initials: 'AA', name: data.settings.leaderOneName, title: data.settings.leaderOneTitle, bio: data.settings.leaderOneBio, group: 'EXECUTIVE LEADERSHIP' },
    { initials: 'UA', name: data.settings.leaderTwoName, title: data.settings.leaderTwoTitle, bio: data.settings.leaderTwoBio, group: 'EXECUTIVE LEADERSHIP' },
    ...[
      { name: data.settings.salesManagerOneName, title: data.settings.salesManagerOneTitle || 'Reservation Manager', group: 'RESERVATIONS' },
      { name: data.settings.salesManagerTwoName, title: 'Sales Manager', group: 'SALES TEAM' },
      { name: data.settings.salesManagerThreeName, title: 'Sales Manager', group: 'SALES TEAM' }
    ].filter(person => person.name).map(person => ({ initials: person.name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(), ...person, bio: '' }))
  ];
  target.innerHTML = leaders.filter(leader => leader.name).map(leader => `<article class="leader-card"><div class="leader-avatar">${escapeHtml(leader.initials)}</div><div><span class="leader-kicker">${escapeHtml(leader.group)}</span><h3>${escapeHtml(leader.name)}</h3><strong>${escapeHtml(leader.title)}</strong>${leader.bio ? `<p>${escapeHtml(leader.bio)}</p>` : ''}</div></article>`).join('');
}

function renderOfficeLocation() {
  const settings = data.settings || {};
  const frame = document.getElementById('officeMapFrame');
  const link = document.getElementById('officeMapLink');
  const address = document.getElementById('officeAddress');
  const frameUrl = safeWebUrl(settings.officeMapEmbed);
  const mapUrl = safeWebUrl(settings.officeMapUrl);
  if (frame && frameUrl) frame.src = frameUrl;
  if (link) {
    link.href = mapUrl || '#';
    link.hidden = !mapUrl;
  }
  if (address) address.textContent = settings.address || 'Srinagar, Jammu & Kashmir';
}

function canSubmitInquiry() { return { allowed: true }; }
async function sendInquiry(payload) {
  if (window.location.protocol === 'file:') return { ok: true, localOnly: true };
  const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 429) {
      const retryAfter = Number(result.retryAfter || response.headers.get('Retry-After') || 0);
      const waitText = retryAfter >= 60 ? `about ${Math.ceil(retryAfter / 60)} minutes` : `${retryAfter || 1} seconds`;
      throw new Error(`We have received many enquiries from this connection. Please try again in ${waitText}.`);
    }
    throw new Error(result.error || 'We could not send your enquiry.');
  }
  return result;
}

function renderPackages() {
  const grid = document.getElementById('packageGrid');
  if (!grid) return;
  const query = (document.getElementById('packageSearch')?.value || '').toLowerCase().trim();
  const visible = data.packages.filter(item => item.status !== 'draft' && (activeFilter === 'all' || item.category === activeFilter) && `${item.title} ${item.location} ${item.category}`.toLowerCase().includes(query));
  grid.innerHTML = visible.map(item => {
    const stays = Array.isArray(item.itinerary) ? item.itinerary.filter(stop => stop.stay && Number(stop.nights) > 0) : [];
    const route = stays.map(stop => `${Number(stop.nights)}N ${stop.stay}`).join(' · ');
    const isQuote = /^(get a quote|custom)$/i.test(String(item.price || '').trim());
    return `<article class="package-card" data-package-id="${escapeHtml(item.id)}" tabindex="0"><div class="package-card-image" style="background-image:url('${escapeHtml(item.image)}')"><span class="package-tag">${escapeHtml(item.tag)}</span><button class="package-card-arrow" data-package-id="${escapeHtml(item.id)}" aria-label="View ${escapeHtml(item.title)}"><span class="icon icon-arrow" aria-hidden="true"></span></button></div><div class="package-info"><h3>${escapeHtml(item.title)}</h3>${route ? `<div class="package-route" aria-label="Suggested overnight stays"><span>SUGGESTED STAYS</span><strong>${escapeHtml(route)}</strong></div>` : ''}${cardIncludesHtml(item)}<div class="package-bottom"><span class="package-duration">${escapeHtml(item.duration)}</span><strong class="package-price">${isQuote ? 'Get a quote' : `From ${escapeHtml(item.price)}`}</strong></div></div></article>`;
  }).join('');
  const empty = document.getElementById('emptyPackages');
  if (empty) empty.hidden = visible.length > 0;
}

function renderDestinations() {
  const grid = document.getElementById('destinationGrid');
  if (!grid) return;
  const destinations = data.packages.filter(item => item.status === 'live' && item.showInDestinations);
  grid.innerHTML = destinations.map((item, index) => `<a class="destination-card ${index === 0 ? 'destination-card-tall' : ''}" href="#packages" data-destination-package="${escapeHtml(item.id)}"><img loading="lazy" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} in Kashmir"><span class="destination-number">${String(index + 1).padStart(2, '0')}</span><div><span>${escapeHtml(item.tag || 'Kashmir escape')}</span><h3>${escapeHtml(item.title.split(' · ')[0])}</h3><b>Explore <span class="icon icon-arrow" aria-hidden="true"></span></b></div></a>`).join('');
}

function renderPlannerOptions() {
  const destination = document.getElementById('planDestination');
  const duration = document.getElementById('planDuration');
  if (!destination || !duration) return;
  const selectedDestination = destination.value;
  const selectedDuration = duration.value;
  const destinationOptions = [
    'Kashmir valley', 'Gulmarg & Sonamarg', 'Leh & Ladakh', 'Vaishno Devi & Jammu',
    ...data.packages.filter(item => item.status !== 'draft' && item.showInDestinations).map(item => item.title.split(' · ')[0]),
    "I'm not sure yet"
  ];
  const durationOptions = ['6 nights · 7 days', ...data.packages.filter(item => item.status !== 'draft' && /\d+\s*nights?/i.test(item.duration)).map(item => item.duration), "I'm not sure yet"];
  const unique = values => [...new Map(values.map(value => [String(value).trim().toLowerCase(), String(value).trim()])).values()];
  destination.innerHTML = unique(destinationOptions).map(value => `<option>${escapeHtml(value)}</option>`).join('');
  duration.innerHTML = unique(durationOptions).map(value => `<option>${escapeHtml(value)}</option>`).join('');
  if ([...destination.options].some(option => option.value === selectedDestination)) destination.value = selectedDestination;
  if ([...duration.options].some(option => option.value === selectedDuration)) duration.value = selectedDuration;
}

function renderInstagramGallery() {
  const target = document.getElementById('instagramGallery');
  if (!target) return;
  const photos = data.packages.filter(item => item.status !== 'draft' && item.showInDestinations && item.image).slice(0, 3);
  target.innerHTML = photos.map((item, index) => `<div class="instagram-photo instagram-photo-${index + 1}"><img loading="lazy" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} in Kashmir"></div>`).join('');
}

function initTripPlanner() {
  const form = document.getElementById('planTripForm');
  if (!form) return;
  const countInput = document.getElementById('planTravellers');
  const countOutput = document.getElementById('planTravellerCount');
  const status = document.getElementById('planTripStatus');
  const dateInput = document.getElementById('planTravelDate');
  if (dateInput) dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const setCount = value => {
    const count = Math.max(1, Math.min(20, Number(value) || 1));
    countInput.value = String(count);
    countOutput.textContent = `${count} ${count === 1 ? 'person' : 'people'}`;
  };
  document.getElementById('travellerDecrease')?.addEventListener('click', () => setCount(Number(countInput.value) - 1));
  document.getElementById('travellerIncrease')?.addEventListener('click', () => setCount(Number(countInput.value) + 1));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const tripDate = fields.get('travelDate') || 'Flexible dates';
    const message = [
      'Hi Tiny Hues, I would like to plan my trip:',
      '',
      `Name: ${String(fields.get('name')).trim()}`,
      `Travel date: ${tripDate}`,
      `Destination: ${fields.get('destination')}`,
      `Trip length: ${fields.get('duration')}`,
      `Travellers: ${fields.get('travellers')}`
    ].join('\n');
    let whatsappUrl;
    try {
      const url = new URL(data.settings.whatsapp || CURRENT_WHATSAPP);
      url.searchParams.set('text', message);
      whatsappUrl = url.href;
    } catch {
      whatsappUrl = `${CURRENT_WHATSAPP}?text=${encodeURIComponent(message)}`;
    }
    status.hidden = false;
    status.textContent = 'WhatsApp is opening with your trip details. Review them there, then tap Send.';
    trackMetaEvent('Contact', { content_name: 'WhatsApp trip planner' });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

function openPackageModal(id, fromHistory = false) {
  const item = data.packages.find(packageItem => packageItem.id === id);
  if (!item) return;
  trackMetaEvent('ViewContent', { content_name: item.title, content_category: item.category, content_ids: [item.id], content_type: 'product' });
  const modal = document.getElementById('packageModal');
  modal.dataset.packageId = item.id;
  const photos = Array.isArray(item.images) && item.images.length ? item.images : [item.image];
  const setPhoto = index => {
    document.getElementById('modalImage').style.backgroundImage = `url('${photos[index]}')`;
    document.querySelectorAll('[data-gallery-image]').forEach(button => button.classList.toggle('active', Number(button.dataset.galleryImage) === index));
  };
  setPhoto(0);
  const thumbs = document.getElementById('modalGalleryThumbs');
  thumbs.innerHTML = photos.length > 1 ? photos.map((url, index) => `<button type="button" data-gallery-image="${index}" class="gallery-thumb ${index === 0 ? 'active' : ''}" aria-label="Show photo ${index + 1}" style="background-image:url('${escapeHtml(url)}')"></button>`).join('') : '';
  document.getElementById('modalCategory').textContent = item.tag;
  document.getElementById('modalTitle').textContent = item.title;
  const isQuote = /^(get a quote|custom)$/i.test(String(item.price || '').trim());
  document.getElementById('modalMeta').textContent = `${item.duration} · ${isQuote ? 'Get a quote' : `From ${item.price}`}`;
  const itinerary = Array.isArray(item.itinerary) ? item.itinerary.filter(stop => stop.stay && Number(stop.nights) > 0) : [];
  const itineraryPanel = document.getElementById('modalItinerary');
  if (itineraryPanel) {
    if (itinerary.length) {
      let firstNight = 1;
      itineraryPanel.innerHTML = `<h3>Suggested night-by-night plan</h3><ol>${itinerary.map(stop => {
        const nights = Number(stop.nights);
        const lastNight = firstNight + nights - 1;
        const label = nights === 1 ? `Night ${firstNight}` : `Nights ${firstNight}–${lastNight}`;
        firstNight = lastNight + 1;
        return `<li><strong>${escapeHtml(label)} · ${escapeHtml(stop.stay)}</strong>${stop.details ? `<span>${escapeHtml(stop.details)}</span>` : ''}</li>`;
      }).join('')}</ol><div class="modal-transfer-points"><span><small>PICKUP</small><strong>${escapeHtml(item.pickupPoint || 'Confirm with our team')}</strong></span><label class="modal-dropoff"><small>WHERE WOULD YOU LIKE TO FINISH?</small><input id="modalDropoff" type="text" autocomplete="address-level2" placeholder="Choose a drop-off location" aria-label="Preferred drop-off location"></label></div>`;
      itineraryPanel.hidden = false;
    } else {
      itineraryPanel.innerHTML = '<h3>Route and overnight stays</h3><p>This is a flexible journey. Choose the places and stay length with our team.</p>';
      itineraryPanel.hidden = false;
    }
  }
  const includesPanel = document.getElementById('modalIncludes');
  if (includesPanel) { includesPanel.innerHTML = includesPanelHtml(item); includesPanel.hidden = !includesPanel.innerHTML; }
  updatePackageWhatsapp(item);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  document.title = `${item.title} – Kashmir Tour Package | Tiny Hues`;
  const path = `/journeys/${encodeURIComponent(journeySlug(item))}`;
  if (!fromHistory && location.pathname !== path) history.pushState({ journey: item.id }, '', path);
}
function updatePackageWhatsapp(item) {
  const whatsapp = document.getElementById('packageWhatsapp');
  if (!whatsapp || !item) return;
  const itinerary = Array.isArray(item.itinerary) ? item.itinerary.filter(stop => stop.stay && Number(stop.nights) > 0) : [];
  const stayLines = itinerary.map(stop => `${stop.nights} night${Number(stop.nights) === 1 ? '' : 's'} in ${stop.stay}${stop.details ? ` — ${stop.details}` : ''}`);
  const isQuote = /^(get a quote|custom)$/i.test(String(item.price || '').trim());
  const preferredDropoff = document.getElementById('modalDropoff')?.value.trim();
  const dropoffLine = preferredDropoff ? `Preferred drop-off: ${preferredDropoff}` : 'Drop-off: Flexible — please suggest the best point for my trip';
  const quoteLine = isQuote ? 'Price: Please share a quote' : `Starting price: ${item.price}`;
  const message = [`Hi Tiny Hues, I would like to make this my trip:`, '', item.title, item.duration, ...stayLines, `Pickup: ${item.pickupPoint || 'to be confirmed'}`, dropoffLine, quoteLine, '', 'Please share availability and next steps.'].join('\n');
  try { const url = new URL(data.settings.whatsapp || CURRENT_WHATSAPP); url.searchParams.set('text', message); whatsapp.href = url.href; }
  catch { whatsapp.href = `${CURRENT_WHATSAPP}?text=${encodeURIComponent(message)}`; }
}
function closeModal(fromHistory = false) {
  document.getElementById('packageModal').hidden = true;
  document.body.classList.remove('modal-open');
  document.title = HOME_TITLE;
  if (fromHistory !== true && location.pathname.startsWith('/journeys/')) {
    if (history.state && history.state.journey) history.back();
    else history.pushState({}, '', '/#packages');
  }
}

function initCookieConsent() {
  const banner = document.getElementById('cookieConsent');
  if (!banner) return;
  const openBanner = () => {
    document.body.classList.add('cookie-banner-open');
    banner.hidden = false;
    document.getElementById('cookieAccept')?.focus();
  };
  let choice = '';
  try { choice = localStorage.getItem(COOKIE_CONSENT_KEY) || ''; } catch {}
  if (!choice) openBanner();
  const closeBanner = (choice) => {
    optionalCookieConsentForSession = choice === 'accepted';
    try { localStorage.setItem(COOKIE_CONSENT_KEY, choice); } catch {}
    banner.hidden = true;
    document.body.classList.remove('cookie-banner-open');
    syncMetaPixel();
  };
  document.getElementById('cookieAccept')?.addEventListener('click', () => closeBanner('accepted'));
  document.getElementById('cookieDismiss')?.addEventListener('click', () => closeBanner('dismissed'));
  document.getElementById('cookieSettings')?.addEventListener('click', openBanner);
}

function renderTestimonial() {
  const target = document.getElementById('testimonialContent');
  const section = document.getElementById('reviews');
  if (!target) return;
  const hasStories = Array.isArray(data.testimonials) && data.testimonials.length > 0;
  const hasReviewLink = Boolean(safeWebUrl(data.settings.reviewsUrl));
  const summary = document.getElementById('googleReviewSummary');
  if (summary) summary.textContent = hasReviewLink ? `${data.settings.reviewRating || 'Google'} / 5 · ${data.settings.reviewCount || ''} Google reviews` : 'Guest experiences from Tiny Hues journeys.';
  const reviewLink = document.getElementById('googleReviewsLink');
  if (reviewLink && hasReviewLink) {
    const arrow = reviewLink.querySelector('.icon-arrow');
    reviewLink.replaceChildren(document.createTextNode(`Read all ${data.settings.reviewCount || ''} Google reviews `), ...(arrow ? [arrow] : []));
  }
  target.hidden = !hasStories;
  if (section) section.hidden = !hasStories && !hasReviewLink;
  const arrows = section?.querySelector('.testimonial-arrows');
  if (arrows) arrows.hidden = !hasStories;
  if (!hasStories) return;
  const item = data.testimonials[testimonialIndex % data.testimonials.length];
  target.innerHTML = `<div class="testimonial-quote">“${escapeHtml(item.quote)}”</div><div class="testimonial-side"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.location || 'Google review')}</span><span class="testimonial-rating">${'★'.repeat(item.rating || 5)}</span><small class="testimonial-source">${escapeHtml(item.source || 'Guest story')}</small></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSiteSettings(); renderPackages(); renderDestinations(); renderPlannerOptions(); renderInstagramGallery(); renderTestimonial(); renderLeadership(); initCookieConsent(); initTripPlanner();
  const backToTop = document.getElementById('backToTop');
  const updateBackToTop = () => { if (backToTop) backToTop.hidden = window.scrollY < 320; };
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelectorAll('a[href="#top"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  document.querySelectorAll('.filter-tab').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.filter-tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); activeFilter = button.dataset.filter; renderPackages(); }));
  document.getElementById('packageSearch')?.addEventListener('input', renderPackages);
  document.getElementById('packageGrid')?.addEventListener('click', event => { const card = event.target.closest('[data-package-id]'); if (card) openPackageModal(card.dataset.packageId); });
  document.getElementById('destinationGrid')?.addEventListener('click', event => { const card = event.target.closest('[data-destination-package]'); if (card) { event.preventDefault(); openPackageModal(card.dataset.destinationPackage); } });
  document.getElementById('modalGalleryThumbs')?.addEventListener('click', event => {
    const button = event.target.closest('[data-gallery-image]');
    const item = data.packages.find(packageItem => packageItem.id === document.getElementById('packageModal').dataset.packageId);
    const photos = item?.images?.length ? item.images : [item?.image];
    if (button && photos[Number(button.dataset.galleryImage)]) {
      document.getElementById('modalImage').style.backgroundImage = `url('${photos[Number(button.dataset.galleryImage)]}')`;
      document.querySelectorAll('[data-gallery-image]').forEach(thumb => thumb.classList.toggle('active', thumb === button));
    }
  });
  document.getElementById('packageGrid')?.addEventListener('keydown', event => { const card = event.target.closest('.package-card'); if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openPackageModal(card.dataset.packageId); } });
  document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => closeModal()));
  window.addEventListener('popstate', () => { const item = journeyFromPath(); if (item) openPackageModal(item.id, true); else if (!document.getElementById('packageModal').hidden) closeModal(true); });
  const startJourney = journeyFromPath();
  if (startJourney) openPackageModal(startJourney.id, true);
  const inquiryStartedAt = document.querySelector('#inquiryForm [name="startedAt"]');
  if (inquiryStartedAt) inquiryStartedAt.value = String(Date.now());
  document.getElementById('packageModal')?.addEventListener('click', event => { if (event.target.id === 'packageModal') closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !document.getElementById('packageModal').hidden) closeModal(); });
  document.getElementById('packageModal')?.addEventListener('input', event => {
    if (event.target.id !== 'modalDropoff') return;
    const item = data.packages.find(packageItem => packageItem.id === event.currentTarget.dataset.packageId);
    updatePackageWhatsapp(item);
  });
  document.getElementById('prevTestimonial')?.addEventListener('click', () => { if (!data.testimonials.length) return; testimonialIndex = (testimonialIndex - 1 + data.testimonials.length) % data.testimonials.length; renderTestimonial(); startTestimonialRotation(); });
  document.getElementById('nextTestimonial')?.addEventListener('click', () => { if (!data.testimonials.length) return; testimonialIndex = (testimonialIndex + 1) % data.testimonials.length; renderTestimonial(); startTestimonialRotation(); });
  const reviewSection = document.getElementById('reviews');
  reviewSection?.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
  reviewSection?.addEventListener('mouseleave', startTestimonialRotation);
  reviewSection?.addEventListener('focusin', () => clearInterval(testimonialTimer));
  reviewSection?.addEventListener('focusout', event => { if (!reviewSection.contains(event.relatedTarget)) startTestimonialRotation(); });
  const menuButton = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const siteHeader = document.querySelector('.site-header');
  const setMobileMenuOpen = open => {
    mainNav?.classList.toggle('open', open);
    menuButton?.classList.toggle('is-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuButton?.addEventListener('click', () => setMobileMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  mainNav?.addEventListener('click', event => { if (event.target.closest('a')) setMobileMenuOpen(false); });
  document.querySelector('.brand')?.addEventListener('click', () => setMobileMenuOpen(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMobileMenuOpen(false); });
  document.addEventListener('click', event => {
    if (menuButton?.getAttribute('aria-expanded') === 'true' && siteHeader && !siteHeader.contains(event.target)) setMobileMenuOpen(false);
    const contactLink = event.target.closest('a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"], a[href^="tel:"]');
    if (contactLink) trackMetaEvent('Contact', { content_name: contactLink.href.startsWith('tel:') ? 'Phone call' : 'WhatsApp inquiry' });
  });
  document.getElementById('inquiryForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const inquiryForm = event.currentTarget;
    const form = new FormData(inquiryForm);
    const guestName = form.get('name');
    const formSuccess = document.getElementById('formSuccess');
    const rateCheck = canSubmitInquiry();
    if (!rateCheck.allowed) { formSuccess.hidden = false; formSuccess.textContent = rateCheck.message; formSuccess.classList.add('form-error'); return; }
    const payload = { name: guestName, email: form.get('email'), destination: form.get('destination'), travellers: form.get('travellers'), message: form.get('message'), website: form.get('website'), startedAt: form.get('startedAt') };
    const submitButton = inquiryForm.querySelector('button[type="submit"]');
    submitButton.disabled = true; submitButton.innerHTML = 'Sending enquiry <span>…</span>';
    sendInquiry(payload).then(() => {
      trackMetaEvent('Lead', { content_name: 'Custom trip enquiry' });
      inquiryForm.reset(); if (inquiryForm.elements.startedAt) inquiryForm.elements.startedAt.value = String(Date.now()); formSuccess.textContent = 'Thanks — your enquiry is on its way. Our travel designer will be in touch shortly.'; formSuccess.classList.remove('form-error'); formSuccess.hidden = false;
    }).catch(error => { formSuccess.textContent = error.message; formSuccess.classList.add('form-error'); formSuccess.hidden = false; }).finally(() => { submitButton.disabled = false; submitButton.innerHTML = 'Start a conversation <svg class="button-arrow-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M9 5h10v10" /></svg>'; });
  });
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  fetch('/api/content').then(response => response.ok ? response.json() : null).then(result => {
    if (!result?.content) return;
    const nextData = { ...data, ...result.content, settings:{ ...data.settings, ...(result.content.settings || {}) } };
    const visibleContent = value => JSON.stringify({
      settings: value.settings,
      packages: value.packages.map(item => ({
        id: item.id, title: item.title, location: item.location, duration: item.duration,
        price: item.price, category: item.category, tag: item.tag, description: item.description,
        image: item.image, featured: item.featured, status: item.status,
        showInDestinations: Boolean(item.showInDestinations), itinerary: item.itinerary,
        includes: item.includes, inclusions: item.inclusions
      })),
      testimonials: value.testimonials
    });
    const needsRender = visibleContent(data) !== visibleContent(nextData);
    data = nextData;
    if (!needsRender) return;
    renderSiteSettings(); renderPackages(); renderDestinations(); renderPlannerOptions(); renderInstagramGallery(); renderTestimonial(); renderLeadership();
    startTestimonialRotation();
    const openId = document.getElementById('packageModal')?.hidden ? null : document.getElementById('packageModal').dataset.packageId;
    const pathJourney = journeyFromPath();
    if (openId && data.packages.some(item => item.id === openId)) openPackageModal(openId, true);
    else if (pathJourney) openPackageModal(pathJourney.id, true);
  }).catch(() => {});
});

function startTestimonialRotation() {
  clearInterval(testimonialTimer);
  if (data.testimonials.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    testimonialTimer = setInterval(() => { testimonialIndex = (testimonialIndex + 1) % data.testimonials.length; renderTestimonial(); }, 6500);
  }
}
