const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { mock, call, adminHeaders, SAME_ORIGIN } = require('./helpers');
const { readSiteData, updateSiteData, CONTENT_PATH } = require('../lib/site-data');
const inquiry = require('../api/inquiry');
const content = require('../api/content');
const adminContent = require('../api/admin-content');
const home = require('../api/home');
const sitemap = require('../api/sitemap');

const template = fs.readFileSync(path.join(__dirname, '..', 'outputs', 'index.html'), 'utf8');
const bodyOf = html => html.slice(html.indexOf('<body'));
const enquiry = (n, extra = {}) => ({ name: `Guest ${n}`, email: `g${n}@example.com`, destination: 'Gurez Valley', travellers: '2 people', message: 'Hi', ...extra });
test.beforeEach(() => mock.store.clear());

test('existing saved content gets the inclusions and Facebook link once (revision 5)', async () => {
  await mock.put(CONTENT_PATH, JSON.stringify({ contentRevision: 4, settings: { facebook: '' }, packages: [{ id: 'p1', title: 'Kashmir, in full colour', status: 'live' }, { id: 'p3', title: 'x', status: 'live', includes: [] }], testimonials: [] }), { allowOverwrite: true });
  const data = await readSiteData();
  assert.equal(data.contentRevision, 5);
  assert.ok(data.packages[0].includes.includes('houseboat'));
  assert.ok(data.packages[0].inclusions.length > 0);
  assert.deepEqual(data.packages[1].includes, [], 'an admin choice of "nothing included" is kept');
  assert.match(data.settings.facebook, /facebook\.com\/share/);
});

for (const existing of [false, true]) {
  test(`simultaneous enquiries are all kept (${existing ? 'existing file' : 'first write'})`, async () => {
    if (existing) await updateSiteData(data => data);
    mock.delay = 8;
    try {
      const results = await Promise.all(Array.from({ length: 5 }, (_, n) => call(inquiry, { method: 'POST', body: enquiry(n), headers: { 'x-forwarded-for': `10.1.0.${n}` } })));
      results.forEach(res => assert.equal(res.statusCode, 200, res.body));
    } finally { mock.delay = 0; }
    assert.equal((await readSiteData()).bookings.length, 5);
  });
}

test('deleted enquiries stay deleted, even after an admin content save', async () => {
  const headers = await adminHeaders();
  await call(inquiry, { method: 'POST', body: enquiry(1) });
  await call(inquiry, { method: 'POST', body: enquiry(2), headers: { 'x-forwarded-for': '10.0.0.2' } });
  const before = JSON.parse((await call(adminContent, { headers })).body).content;
  const target = before.bookings[0].id;
  assert.equal((await call(inquiry, { method: 'DELETE', query: { id: target }, headers })).statusCode, 200);
  // A stale admin tab still holding the deleted enquiry publishes content.
  assert.equal((await call(content, { method: 'POST', body: { content: before }, headers })).statusCode, 200);
  const after = await readSiteData();
  assert.equal(after.bookings.length, 1);
  assert.ok(!after.bookings.some(item => item.id === target));
  assert.equal((await call(inquiry, { method: 'PATCH', body: { id: after.bookings[0].id, status: 'booked' }, headers })).statusCode, 200);
  assert.equal((await readSiteData()).bookings[0].status, 'booked');
});

test('enquiry changes need an admin session from the admin site', async () => {
  const headers = await adminHeaders();
  await call(inquiry, { method: 'POST', body: enquiry(1) });
  const id = (await readSiteData()).bookings[0].id;
  assert.equal((await call(inquiry, { method: 'DELETE', query: { id } })).statusCode, 401);
  assert.equal((await call(inquiry, { method: 'DELETE', query: { id }, headers: { cookie: headers.cookie, origin: 'https://evil.example', host: 'www.tinyhuestour.com' } })).statusCode, 403);
  assert.equal((await readSiteData()).bookings.length, 1);
});

test('bots are ignored: honeypot and instant submissions', async () => {
  await call(inquiry, { method: 'POST', body: enquiry(1, { website: 'spam' }) });
  await call(inquiry, { method: 'POST', body: enquiry(2, { startedAt: Date.now() }) });
  assert.equal((await readSiteData()).bookings?.length || 0, 0);
  assert.equal((await call(inquiry, { method: 'POST', body: enquiry(3, { startedAt: Date.now() - 10_000 }) })).statusCode, 200);
  assert.equal((await readSiteData()).bookings.length, 1);
});

test('homepage: visible page is unchanged, only the head gets SEO tags', async () => {
  const res = await call(home, { query: {} });
  assert.equal(res.statusCode, 200);
  assert.equal(bodyOf(res.body), bodyOf(template), 'page body must be byte-for-byte the live design');
  assert.match(res.body, /<title>Kashmir Tour Packages \| Tiny Hues/);
  assert.match(res.body, /<link rel="canonical" href="https:\/\/www.tinyhuestour.com\/" \/>/);
  assert.match(res.body, /<base href="\/" \/>/);
  assert.doesNotMatch(res.body, /tinyhuestravels\.com/);
  assert.equal((res.body.match(/<title>/g) || []).length, 1);
  assert.equal((res.body.match(/name="description"/g) || []).length, 1);
  const ld = JSON.parse(res.body.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  const agency = ld['@graph'].find(node => node['@type'] === 'TravelAgency');
  assert.ok(agency.telephone);
  assert.ok(ld['@graph'].some(node => node['@type'] === 'ItemList'));
});

test('journey address: own title and canonical, same visible page', async () => {
  const data = await readSiteData();
  const live = data.packages.find(item => item.status === 'live');
  const slug = live.title.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const res = await call(home, { query: { journey: slug } });
  assert.equal(res.statusCode, 200);
  assert.equal(bodyOf(res.body), bodyOf(template));
  assert.match(res.body, new RegExp(`rel="canonical" href="https://www.tinyhuestour.com/journeys/${slug}"`));
  assert.ok(JSON.parse(res.body.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1])['@graph'].some(node => node['@type'] === 'TouristTrip'));
});

test('unknown journey address shows the 404 page with live journeys', async () => {
  const res = await call(home, { query: { journey: 'no-such-trip' } });
  assert.equal(res.statusCode, 404);
  assert.match(res.body, /This page could not be found/);
  assert.ok((res.body.match(/class="nf-link"/g) || []).length >= 1);
});

test('sitemap lists the homepage and live journeys on www', async () => {
  const res = await call(sitemap, {});
  assert.match(res.body, /<loc>https:\/\/www.tinyhuestour.com\/<\/loc>/);
  assert.match(res.body, /<loc>https:\/\/www.tinyhuestour.com\/journeys\/[a-z0-9-]+<\/loc>/);
});
