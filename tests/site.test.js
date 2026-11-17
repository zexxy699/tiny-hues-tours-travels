const test = require('node:test');
const assert = require('node:assert/strict');
const { mock, call, adminCookie } = require('./helpers');
const R = require('../outputs/render.js');
const seo = require('../lib/seo');
const { normalizeContent, updateSiteData, readSiteData, CONTENT_PATH } = require('../lib/site-data');
const inquiry = require('../api/inquiry');
const content = require('../api/content');
const home = require('../api/home');
const sitemap = require('../api/sitemap');

const enquiry = (n, extra = {}) => ({ name: `Guest ${n}`, email: `g${n}@example.com`, destination: 'Gurez Valley', travellers: '2 people', message: 'Hi', ...extra });
test.beforeEach(() => mock.store.clear());

test('renderer helpers', () => {
  assert.equal(R.slugify('Gurez · Beyond the Pass'), 'gurez-beyond-the-pass');
  assert.equal(R.slugify('Gulmarg & Sonamarg'), 'gulmarg-and-sonamarg');
  assert.equal(R.heroTitleHtml('Go where the *quiet* lives.'), 'Go where the<br><em>quiet</em> lives.');
  assert.equal(R.heroTitleHtml('Go where the quiet lives.'), 'Go where the<br><em>quiet</em> lives.');
  assert.equal(R.heroTitleHtml('See <b>it</b>'), 'See<br><em>&lt;b&gt;it&lt;/b&gt;</em>');
  assert.equal(R.initials('Umaiq Aijaz'), 'UA');
  assert.equal(R.cssUrl("x') ;background:red"), 'x%27%29%20;background:red');
  const html = R.journeyDialogHtml({ id: 'a', title: 'T', includes: ['meals', 'bogus'], inclusions: ['Stay <b>'] }, {});
  assert.match(html, /Meals/);
  assert.doesNotMatch(html, /bogus|<b>/);
});

test('migrations fill inclusions and real social links without overwriting edits', () => {
  const out = normalizeContent({
    settings: { instagram: 'https://www.instagram.com/explore/search/keyword/?q=Tiny%20Hues%20Tours%20and%20Travels', facebook: '', heroTitle: 'Go where the quiet lives.' },
    packages: [{ id: 'gurez', title: 'Gurez' }, { id: 'p2', title: 'Edited', includes: [] }, { id: 'custom', title: 'New' }]
  });
  assert.equal(out.settings.instagram, 'https://www.instagram.com/tinyhuestourandtravels');
  assert.equal(out.settings.facebook, '', 'a deliberately cleared link stays cleared');
  assert.equal(out.settings.heroTitle, 'Go where the *quiet* lives.');
  assert.ok(out.packages[0].includes.includes('hotels'));
  assert.ok(out.packages[0].inclusions.length > 0);
  assert.deepEqual(out.packages[1].includes, []);
  assert.deepEqual(out.packages[2].includes, []);
});

for (const existing of [false, true]) {
  test(`concurrent enquiries are all kept (${existing ? 'existing file' : 'first write'})`, async () => {
    if (existing) await updateSiteData(data => data);
    mock.delay = 8;
    try {
      const results = await Promise.all(Array.from({ length: 5 }, (_, n) => call(inquiry, { method: 'POST', body: enquiry(n), headers: { 'x-forwarded-for': `10.1.0.${n}` } })));
      results.forEach(res => assert.equal(res.statusCode, 200, res.body));
    } finally { mock.delay = 0; }
    const data = await readSiteData();
    assert.equal(data.bookings.length, 5);
  });
}

test('deleted enquiries stay deleted, even after an admin content save', async () => {
  const cookie = await adminCookie();
  await call(inquiry, { method: 'POST', body: enquiry(1) });
  await call(inquiry, { method: 'POST', body: enquiry(2), headers: { 'x-forwarded-for': '10.0.0.2' } });
  const before = JSON.parse((await call(content, { headers: { cookie } })).body).content;
  const target = before.bookings[0].id;
  assert.equal((await call(inquiry, { method: 'DELETE', query: { id: target }, headers: { cookie } })).statusCode, 200);
  // A stale admin tab still holding the deleted enquiry saves content.
  assert.equal((await call(content, { method: 'POST', body: { content: before }, headers: { cookie } })).statusCode, 200);
  const after = await readSiteData();
  assert.equal(after.bookings.length, 1);
  assert.ok(!after.bookings.some(item => item.id === target));
  const patched = await call(inquiry, { method: 'PATCH', body: { id: after.bookings[0].id, status: 'booked' }, headers: { cookie } });
  assert.equal(patched.statusCode, 200);
  assert.equal((await readSiteData()).bookings[0].status, 'booked');
  assert.equal((await call(inquiry, { method: 'DELETE', query: { id: target } })).statusCode, 401);
});

test('bots are ignored: honeypot and instant submissions', async () => {
  await call(inquiry, { method: 'POST', body: enquiry(1, { website: 'spam' }) });
  await call(inquiry, { method: 'POST', body: enquiry(2, { startedAt: Date.now() }) });
  assert.equal(mock.store.has(CONTENT_PATH), false);
  const ok = await call(inquiry, { method: 'POST', body: enquiry(3, { startedAt: Date.now() - 10_000 }) });
  assert.equal(ok.statusCode, 200);
  assert.equal((await readSiteData()).bookings.length, 1);
});

test('homepage is server-rendered with SEO tags and structured data', async () => {
  const res = await call(home, { query: {} });
  assert.equal(res.statusCode, 200);
  assert.doesNotMatch(res.body, /\{\{/);
  assert.match(res.body, /<link rel="canonical" href="https:\/\/tinyhuestour.com\/">/);
  assert.match(res.body, /property="og:image" content="https:\/\/tinyhuestour.com\/assets\/og-image.jpg"/);
  assert.match(res.body, /class="package-card"/);
  assert.match(res.body, /href="\/journeys\/gurez-beyond-the-pass"/);
  assert.match(res.body, /https:\/\/www.instagram.com\/tinyhuestourandtravels/);
  const ld = JSON.parse(res.body.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  const agency = ld['@graph'].find(node => node['@type'] === 'TravelAgency');
  assert.equal(agency.telephone, '+91 6006473963');
  assert.deepEqual(agency.openingHoursSpecification.dayOfWeek.length, 6);
  assert.equal(agency.openingHoursSpecification.opens, '09:30');
  assert.equal(agency.openingHoursSpecification.closes, '18:30');
  assert.ok(ld['@graph'].some(node => node['@type'] === 'ItemList' && node.itemListElement.length >= 10));
  // Draft journeys never leak into the public page data.
  assert.doesNotMatch(res.body, /Winter, warmly/);
});

test('journey pages have their own title, canonical and TouristTrip data', async () => {
  const res = await call(home, { query: { journey: 'gurez-beyond-the-pass' } });
  assert.equal(res.statusCode, 200);
  assert.match(res.body, /<title>Gurez · Beyond the Pass/);
  assert.match(res.body, /rel="canonical" href="https:\/\/tinyhuestour.com\/journeys\/gurez-beyond-the-pass"/);
  assert.match(res.body, /class="include-strip"/);
  assert.match(res.body, /id="packageModal" data-package-id="gurez" >/);
  const ld = JSON.parse(res.body.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  const trip = ld['@graph'].find(node => node['@type'] === 'TouristTrip');
  assert.equal(trip.offers.price, 19999);
  assert.equal(trip.offers.priceCurrency, 'INR');
  const missing = await call(home, { query: { journey: 'no-such-trip' } });
  assert.equal(missing.statusCode, 404);
  assert.match(missing.body, /noindex/);
});

test('journey URLs stay stable after a rename', async () => {
  const cookie = await adminCookie();
  const data = await readSiteData();
  data.packages = data.packages.map(item => item.id === 'gurez' ? { ...item, title: 'Gurez renamed', slug: 'gurez-beyond-the-pass' } : item);
  await call(content, { method: 'POST', body: { content: data }, headers: { cookie } });
  assert.equal((await call(home, { query: { journey: 'gurez-beyond-the-pass' } })).statusCode, 200);
});

test('sitemap lists the homepage and every live journey', async () => {
  const res = await call(sitemap, {});
  const urls = res.body.match(/<loc>[^<]+<\/loc>/g);
  assert.ok(urls.includes('<loc>https://tinyhuestour.com/</loc>'));
  assert.ok(urls.includes('<loc>https://tinyhuestour.com/journeys/sonamarg-meadow-of-gold</loc>'));
  assert.ok(!res.body.includes('winter-warmly'));
});

test('public content API hides drafts and enquiries', async () => {
  await call(inquiry, { method: 'POST', body: enquiry(9) });
  const body = JSON.parse((await call(content, {})).body).content;
  assert.equal(body.bookings, undefined);
  assert.ok(body.packages.every(item => item.status === 'live'));
});

test('seo helpers', () => {
  assert.equal(seo.openingHours('By appointment'), null);
  assert.equal(seo.priceNumber('₹42,500'), 42500);
  assert.equal(seo.priceNumber('Custom'), null);
  assert.equal(seo.isRealProfile('https://www.facebook.com/public/Tiny-Hues-Tours-and-Travels'), false);
});
