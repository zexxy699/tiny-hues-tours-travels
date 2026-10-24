const STORAGE_KEY = 'tinyHuesDemoData';

const defaultData = {
  settings: {
    brandName: 'Tiny Hues Tours & Travels',
    tagline: 'Curated Kashmir journeys',
    phone: '+91 89291 75340',
    email: 'infotinyhuestourandtravels316@gmail.com',
    whatsapp: 'https://wa.me/918929175340',
    instagram: 'https://www.instagram.com/explore/search/keyword/?q=Tiny%20Hues%20Tours%20and%20Travels',
    facebook: 'https://www.facebook.com/public/Tiny-Hues-Tours-and-Travels',
    address: 'Srinagar, Jammu & Kashmir',
    hours: 'Mon–Sat · 9:30 AM–6:30 PM',
    heroEyebrow: 'Kashmir, thoughtfully arranged',
    heroTitle: 'Go where the quiet lives.',
    heroSubtitle: 'Journeys through Kashmir made personal — from the first cup of kahwa to the last mountain view.',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=90'
  },
  packages: [
    { id: 'p1', title: 'Kashmir, in full colour', location: 'Srinagar · Gulmarg · Pahalgam', duration: '5 nights · 6 days', price: '₹18,999', category: 'valley', tag: 'Signature', description: 'A gentle first taste of Kashmir: floating breakfasts, meadows in bloom and unhurried days between Srinagar, Gulmarg and Pahalgam.', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p2', title: 'The high road', location: 'Srinagar · Kargil · Leh', duration: '10 nights · 11 days', price: '₹42,500', category: 'mountains', tag: 'Adventure', description: 'Take the long way over the Himalayas with dramatic passes, quiet monasteries and the unforgettable blue of Pangong Lake.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p3', title: 'A softer kind of north', location: 'Srinagar · Sonamarg · Doodhpathri', duration: '4 nights · 5 days', price: '₹15,500', category: 'valley', tag: 'Slow escape', description: 'For travellers who want less road and more room to breathe, with meadows, forest walks and long evenings by the lake.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p4', title: 'The soulful circuit', location: 'Jammu · Katra · Srinagar', duration: '9 nights · 10 days', price: '₹27,800', category: 'spiritual', tag: 'Meaningful', description: 'A considered journey from Vaishno Devi to the valley, balancing sacred places, local food and quiet moments of reflection.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85', featured: false, status: 'live' },
    { id: 'p5', title: 'Winter, warmly', location: 'Srinagar · Gulmarg', duration: '4 nights · 5 days', price: '₹22,900', category: 'mountains', tag: 'Seasonal', description: 'Snow underfoot, kahwa in hand. A cosy winter stay with a day on the slopes and the valley at its quietest.', image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=900&q=85', featured: false, status: 'draft' },
    { id: 'p6', title: 'Build your own Kashmir', location: 'Anywhere in the valley', duration: 'Made around you', price: 'Custom', category: 'all', tag: 'Bespoke', description: 'Tell us how you like to travel and we will shape the route, stays and small surprises around you.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', featured: false, status: 'live' }
  ],
  bookings: [
    { id: 'b1', name: 'Aarav Mehta', email: 'aarav.m@example.com', destination: 'Kashmir valley', travellers: '2 people', date: 'Today, 10:42', status: 'new', initials: 'AM' },
    { id: 'b2', name: 'Nida & Sameer', email: 'nida.s@example.com', destination: 'Gulmarg & Sonamarg', travellers: '2 people', date: 'Yesterday', status: 'in-progress', initials: 'NS' },
    { id: 'b3', name: 'Rohan Kapoor', email: 'rohan.k@example.com', destination: 'Leh & Ladakh', travellers: '3–5 people', date: '22 Oct 2026', status: 'booked', initials: 'RK' }
  ],
  testimonials: [
    { id: 't1', quote: 'The trip felt like it had been made just for us. No rushing, no guesswork — just beautiful days and kind people.', name: 'Mithun Das', location: 'Kolkata · Kashmir valley', rating: 5 },
    { id: 't2', quote: 'Tiny Hues found the balance we were looking for: a little adventure, a lot of warmth and enough time to simply look around.', name: 'Mohammed Nabi', location: 'Delhi · Gulmarg & Pahalgam', rating: 5 },
    { id: 't3', quote: 'Every detail was handled before we even had to ask. We came back with a softer pace and a camera roll full of magic.', name: 'Ananya Rao', location: 'Bengaluru · A soulful circuit', rating: 5 }
  ]
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function getData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored) return clone(defaultData);
    return { ...clone(defaultData), ...stored, settings: { ...clone(defaultData.settings), ...(stored.settings || {}) } };
  } catch { return clone(defaultData); }
}
function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }

let data = getData();
if (!localStorage.getItem(STORAGE_KEY)) saveData(data);
let activeFilter = 'all';
let testimonialIndex = 0;

function renderSiteSettings() {
  const s = data.settings;
  document.title = `${s.brandName.split(' Tours')[0]} | ${s.tagline}`;
  const hero = document.querySelector('.hero-image');
  if (hero && s.heroImage) hero.style.backgroundImage = `url('${s.heroImage}')`;
  const title = document.querySelector('#heroTitle');
  if (title) {
    const words = s.heroTitle.split(' ');
    const emphasis = words.pop() || '';
    title.innerHTML = `${escapeHtml(words.join(' '))}<br><em>${escapeHtml(emphasis)}</em>`;
  }
  ['heroEyebrow','heroSubtitle'].forEach(key => { const node = document.getElementById(key); if (node) node.textContent = s[key]; });
  const phone = document.getElementById('footerPhone');
  if (phone) { phone.textContent = s.phone; phone.href = `tel:${s.phone.replace(/\s/g, '')}`; }
  const email = document.getElementById('footerEmail');
  if (email) { email.textContent = s.email; email.href = `mailto:${s.email}`; }
  const whatsapp = document.getElementById('directWhatsapp');
  if (whatsapp) whatsapp.href = s.whatsapp;
  const instagram = document.getElementById('footerInstagram');
  if (instagram && s.instagram) instagram.href = s.instagram;
  const facebook = document.getElementById('footerFacebook');
  if (facebook && s.facebook) facebook.href = s.facebook;
}

const inquiryRateLimit = { key: 'tinyHuesInquiryRateV2', max: 10, windowMs: 60 * 60 * 1000, cooldownMs: 5 * 1000 };
function getInquiryRateState() {
  try { return JSON.parse(localStorage.getItem(inquiryRateLimit.key)) || { count: 0, windowStart: Date.now(), lastSubmitted: 0 }; } catch { return { count: 0, windowStart: Date.now(), lastSubmitted: 0 }; }
}
function canSubmitInquiry() {
  const now = Date.now();
  const state = getInquiryRateState();
  if (now - state.windowStart >= inquiryRateLimit.windowMs) return { allowed: true, state: { count: 0, windowStart: now, lastSubmitted: 0 } };
  if (now - state.lastSubmitted < inquiryRateLimit.cooldownMs) return { allowed: false, message: 'Please wait a few seconds before sending another enquiry.' };
  if (state.count >= inquiryRateLimit.max) return { allowed: false, message: 'You have reached the demo enquiry limit. Please try again later.' };
  return { allowed: true, state };
}
function recordInquiryAttempt(state) { state.count += 1; state.lastSubmitted = Date.now(); localStorage.setItem(inquiryRateLimit.key, JSON.stringify(state)); }
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
  grid.innerHTML = visible.map(item => `<article class="package-card"><div class="package-card-image" style="background-image:url('${escapeHtml(item.image)}')"><span class="package-tag">${escapeHtml(item.tag)}</span><button class="package-card-arrow" data-package-id="${escapeHtml(item.id)}" aria-label="View ${escapeHtml(item.title)}">↗</button></div><div class="package-info"><span class="location">${escapeHtml(item.location)}</span><h3>${escapeHtml(item.title)}</h3><div class="package-bottom"><span class="package-duration">${escapeHtml(item.duration)}</span><strong class="package-price">From ${escapeHtml(item.price)}</strong></div></div></article>`).join('');
  const empty = document.getElementById('emptyPackages');
  if (empty) empty.hidden = visible.length > 0;
}

function openPackageModal(id) {
  const item = data.packages.find(packageItem => packageItem.id === id);
  if (!item) return;
  document.getElementById('modalImage').style.backgroundImage = `url('${item.image}')`;
  document.getElementById('modalCategory').textContent = item.tag;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalMeta').textContent = `${item.location} · ${item.duration} · from ${item.price}`;
  document.getElementById('modalDescription').textContent = item.description;
  document.getElementById('packageModal').hidden = false;
  document.body.classList.add('modal-open');
}
function closeModal() { document.getElementById('packageModal').hidden = true; document.body.classList.remove('modal-open'); }

function renderTestimonial() {
  const target = document.getElementById('testimonialContent');
  if (!target || !data.testimonials.length) return;
  const item = data.testimonials[testimonialIndex % data.testimonials.length];
  target.innerHTML = `<div class="testimonial-quote">“${escapeHtml(item.quote)}”</div><div class="testimonial-side"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.location)}</span><span class="testimonial-rating">${'★'.repeat(item.rating || 5)}</span></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSiteSettings(); renderPackages(); renderTestimonial();
  document.querySelectorAll('.filter-tab').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.filter-tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); activeFilter = button.dataset.filter; renderPackages(); }));
  document.getElementById('packageSearch')?.addEventListener('input', renderPackages);
  document.getElementById('packageGrid')?.addEventListener('click', event => { const button = event.target.closest('[data-package-id]'); if (button) openPackageModal(button.dataset.packageId); });
  document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
  document.getElementById('packageModal')?.addEventListener('click', event => { if (event.target.id === 'packageModal') closeModal(); });
  document.getElementById('prevTestimonial')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex - 1 + data.testimonials.length) % data.testimonials.length; renderTestimonial(); });
  document.getElementById('nextTestimonial')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex + 1) % data.testimonials.length; renderTestimonial(); });
  document.querySelector('.menu-toggle')?.addEventListener('click', event => { const nav = document.querySelector('.main-nav'); const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav')?.classList.remove('open')));
  document.getElementById('inquiryForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const guestName = form.get('name');
    const formSuccess = document.getElementById('formSuccess');
    const rateCheck = canSubmitInquiry();
    if (!rateCheck.allowed) { formSuccess.hidden = false; formSuccess.textContent = rateCheck.message; formSuccess.classList.add('form-error'); return; }
    const payload = { name: guestName, email: form.get('email'), destination: form.get('destination'), travellers: form.get('travellers'), message: form.get('message') };
    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    submitButton.disabled = true; submitButton.innerHTML = 'Sending enquiry <span>…</span>';
    sendInquiry(payload).then(result => {
      recordInquiryAttempt(rateCheck.state);
      const remoteInquiry = result.inquiry || {};
      data.bookings.unshift({ id: remoteInquiry.id || `b${Date.now()}`, name: guestName, email: payload.email, destination: payload.destination, travellers: payload.travellers, message: payload.message, date: 'Just now', status: 'new', initials: guestName.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() });
      saveData(data); event.currentTarget.reset(); formSuccess.textContent = 'Thanks — your enquiry is on its way. Our travel designer will be in touch shortly.'; formSuccess.classList.remove('form-error'); formSuccess.hidden = false;
    }).catch(error => { formSuccess.textContent = error.message; formSuccess.classList.add('form-error'); formSuccess.hidden = false; }).finally(() => { submitButton.disabled = false; submitButton.innerHTML = 'Start a conversation <span>↗</span>'; });
  });
  document.getElementById('footerYear').textContent = new Date().getFullYear();
});
