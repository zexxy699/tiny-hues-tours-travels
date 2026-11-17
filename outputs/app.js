const R = window.TinyHuesRender;
const COOKIE_CONSENT_KEY = 'tinyHuesCookieConsent';
const HOME_TITLE = 'Kashmir Tour Packages | Tiny Hues Tours & Travels, Srinagar';

// The server embeds the published content in the page, so there is a single
// source of truth (data/site-content.json + the admin's saved content).
function readEmbeddedData() {
  try {
    const parsed = JSON.parse(document.getElementById('siteData')?.textContent || '{}');
    return { settings: parsed.settings || {}, packages: parsed.packages || [], testimonials: parsed.testimonials || [], updatedAt: parsed.updatedAt || null };
  } catch { return { settings: {}, packages: [], testimonials: [], updatedAt: null }; }
}

let data = readEmbeddedData();
let activeFilter = 'all';
let testimonialIndex = 0;
let lastFocus = null;

const byId = id => document.getElementById(id);
const telHref = phone => `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } }
};

function renderSiteSettings() {
  const s = data.settings;
  const hero = document.querySelector('.hero-image');
  if (hero && s.heroImage) hero.style.backgroundImage = `url('${R.cssUrl(s.heroImage).replace(/&amp;/g, '&')}')`;
  const title = byId('heroTitle');
  if (title && s.heroTitle) title.innerHTML = R.heroTitleHtml(s.heroTitle);
  ['heroEyebrow', 'heroSubtitle'].forEach(key => { const node = byId(key); if (node && s[key]) node.textContent = s[key]; });
  [['footerPhone', s.phone], ['directPhone', s.phone], ['footerDeskPhone', s.operationsPhone]].forEach(([id, phone]) => {
    const link = byId(id);
    if (link && phone) { link.textContent = phone; link.href = telHref(phone); }
  });
  const email = byId('footerEmail');
  if (email && s.email) { email.textContent = s.email; email.href = `mailto:${s.email}`; }
  ['directWhatsapp', 'floatingWhatsapp'].forEach(id => { const link = byId(id); if (link && s.whatsapp) link.href = s.whatsapp; });
  [['footerInstagram', s.instagram], ['footerFacebook', s.facebook]].forEach(([id, url]) => {
    const link = byId(id);
    if (!link) return;
    link.hidden = !url;
    if (url) link.href = url;
  });
}

function renderPackages() {
  const grid = byId('packageGrid');
  if (!grid) return;
  const visible = R.filterPackages(data.packages, activeFilter, byId('packageSearch')?.value || '');
  grid.innerHTML = visible.map(R.packageCardHtml).join('');
  const empty = byId('emptyPackages');
  if (empty) empty.hidden = visible.length > 0;
}
function renderDestinations() { const grid = byId('destinationGrid'); if (grid) grid.innerHTML = R.destinationsHtml(data.packages); }
function renderLeadership() { const grid = byId('leadershipGrid'); if (grid) grid.innerHTML = R.leadersHtml(data.settings); }
function renderTestimonial() {
  const target = byId('testimonialContent');
  if (!target || !data.testimonials.length) return;
  target.innerHTML = R.testimonialHtml(data.testimonials[testimonialIndex % data.testimonials.length]);
}
function renderAll() { renderSiteSettings(); renderPackages(); renderDestinations(); renderTestimonial(); renderLeadership(); }

/* ---------- Journey dialog + shareable /journeys/:slug URLs ---------- */
function findPackage(id) { return data.packages.find(item => item.id === id); }

function showJourney(item, { push = true } = {}) {
  const modal = byId('packageModal');
  const dialog = byId('packageDialog');
  if (!item || !modal || !dialog) return;
  if (modal.hidden) lastFocus = document.activeElement;
  modal.dataset.packageId = item.id;
  dialog.innerHTML = R.journeyDialogHtml(item, data.settings);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  document.title = `${item.title} (${item.duration}) – Kashmir Tour Package | Tiny Hues`;
  const path = R.journeyPath(item);
  if (push && location.pathname !== path) history.pushState({ journey: item.id }, '', path);
  dialog.focus({ preventScroll: true });
}

function hideJourney({ push = true } = {}) {
  const modal = byId('packageModal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.dataset.packageId = '';
  document.body.classList.remove('modal-open');
  document.title = HOME_TITLE;
  if (push && location.pathname.startsWith('/journeys/')) {
    if (history.state && history.state.journey) history.back();
    else history.pushState({}, '', '/#packages');
  }
  initCookieConsent();
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  else byId('packages')?.scrollIntoView();
}

function syncJourneyWithUrl() {
  const match = location.pathname.match(/^\/journeys\/([^/]+)/);
  const item = match ? R.findJourney(data.packages, decodeURIComponent(match[1])) : null;
  if (item) showJourney(item, { push: false });
  else hideJourney({ push: false });
}

function trapFocus(event) {
  const modal = byId('packageModal');
  if (!modal || modal.hidden) return;
  if (event.key === 'Escape') { event.preventDefault(); hideJourney(); return; }
  if (event.key !== 'Tab') return;
  const focusable = [...modal.querySelectorAll('a[href], button:not([disabled])')].filter(node => node.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

/* ---------- Cookie banner ---------- */
let cookieConsentReady = false;
function initCookieConsent() {
  const banner = byId('cookieConsent');
  // Wait until no journey dialog is covering the page, so the banner can be reached.
  if (cookieConsentReady || !banner || storage.get(COOKIE_CONSENT_KEY) || !byId('packageModal')?.hidden) return;
  cookieConsentReady = true;
  document.body.classList.add('cookie-banner-open');
  banner.hidden = false;
  const closeBanner = choice => { storage.set(COOKIE_CONSENT_KEY, choice); banner.hidden = true; document.body.classList.remove('cookie-banner-open'); };
  byId('cookieAccept')?.addEventListener('click', () => closeBanner('accepted'));
  byId('cookieDismiss')?.addEventListener('click', () => closeBanner('dismissed'));
}

/* ---------- Enquiry form ---------- */
async function sendInquiry(payload) {
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

function initInquiryForm() {
  const inquiryForm = byId('inquiryForm');
  if (!inquiryForm) return;
  const stamp = () => { if (inquiryForm.elements.startedAt) inquiryForm.elements.startedAt.value = String(Date.now()); };
  stamp();
  inquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(inquiryForm);
    const formSuccess = byId('formSuccess');
    const payload = Object.fromEntries(['name', 'email', 'destination', 'travellers', 'message', 'website', 'startedAt'].map(key => [key, form.get(key)]));
    const submitButton = inquiryForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending enquiry <span>…</span>';
    sendInquiry(payload).then(() => {
      inquiryForm.reset(); stamp();
      formSuccess.textContent = 'Thanks — your enquiry is on its way. Our travel designer will be in touch shortly.';
      formSuccess.classList.remove('form-error'); formSuccess.hidden = false;
    }).catch(error => {
      formSuccess.textContent = error.message; formSuccess.classList.add('form-error'); formSuccess.hidden = false;
    }).finally(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Start a conversation <span class="icon icon-arrow" aria-hidden="true"></span>';
    });
  });
}

/* ---------- Wiring ---------- */
document.addEventListener('DOMContentLoaded', () => {
  if (!R) return;
  initCookieConsent();
  initInquiryForm();
  const year = byId('footerYear');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.filter-tab').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    activeFilter = button.dataset.filter;
    renderPackages();
  }));
  byId('packageSearch')?.addEventListener('input', renderPackages);

  // Journey links are real URLs (good for SEO and sharing); open them in the dialog.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = event.target.closest('[data-destination-package], .package-card');
    if (trigger) {
      const item = findPackage(trigger.dataset.destinationPackage || trigger.dataset.packageId);
      if (item) { event.preventDefault(); showJourney(item); }
      return;
    }
    if (event.target.closest('[data-close-modal]')) { event.preventDefault(); hideJourney(); return; }
    if (event.target.id === 'packageModal') { hideJourney(); return; }
    const thumb = event.target.closest('[data-gallery-image]');
    if (thumb) {
      const item = findPackage(byId('packageModal').dataset.packageId);
      const photos = item ? R.photosOf(item) : [];
      const index = Number(thumb.dataset.galleryImage);
      const image = byId('modalImage');
      if (photos[index] && image) image.src = photos[index];
      document.querySelectorAll('[data-gallery-image]').forEach(node => { node.classList.toggle('active', node === thumb); node.setAttribute('aria-pressed', String(node === thumb)); });
    }
  });
  document.addEventListener('keydown', trapFocus);
  window.addEventListener('popstate', syncJourneyWithUrl);
  if (!byId('packageModal')?.hidden) {
    // Opened directly on /journeys/:slug — closing should land on the homepage.
    lastFocus = null;
    byId('packageDialog')?.focus({ preventScroll: true });
  }

  byId('prevTestimonial')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex - 1 + data.testimonials.length) % data.testimonials.length; renderTestimonial(); });
  byId('nextTestimonial')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex + 1) % data.testimonials.length; renderTestimonial(); });
  document.querySelector('.menu-toggle')?.addEventListener('click', event => { const open = document.querySelector('.main-nav').classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav')?.classList.remove('open')));

  // Pick up anything published since this page was cached.
  fetch('/api/content', { cache: 'no-store' }).then(response => response.ok ? response.json() : null).then(result => {
    if (!result?.content || result.content.updatedAt === data.updatedAt) return;
    data = { ...data, ...result.content, settings: { ...data.settings, ...(result.content.settings || {}) } };
    renderAll();
    const openId = byId('packageModal')?.hidden ? null : byId('packageModal').dataset.packageId;
    if (openId && findPackage(openId)) byId('packageDialog').innerHTML = R.journeyDialogHtml(findPackage(openId), data.settings);
  }).catch(() => {});
});
