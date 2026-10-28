const KASHMIR_HERO_IMAGE = 'https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&w=2000&q=90';
const KASHMIR_CARD_IMAGE = 'https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&w=900&q=85';
const HERO_IMAGE_VERSION = 'kashmir-cover-v4';
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
    instagram: 'https://www.instagram.com/explore/search/keyword/?q=Tiny%20Hues%20Tours%20and%20Travels',
    facebook: 'https://www.facebook.com/public/Tiny-Hues-Tours-and-Travels',
    address: 'Srinagar, Jammu & Kashmir',
    hours: 'Mon–Sat · 9:30 AM–6:30 PM',
    heroEyebrow: 'Kashmir, thoughtfully arranged',
    heroTitle: 'Go where the quiet lives.',
    heroSubtitle: 'Journeys through Kashmir made personal — from the first cup of kahwa to the last mountain view.',
    heroImage: KASHMIR_HERO_IMAGE,
    heroImageVersion: HERO_IMAGE_VERSION,
    leaderOneName: 'Aqib Ajaz',
    leaderOneTitle: 'Chief Executive Officer',
    leaderOneBio: 'Spearheading the strategic vision and luxury partnerships at Tiny Hues. Aqib ensures every guest experiences the authentic warmth and majestic charm of Kashmir with ultra-premium comfort.',
    leaderTwoName: 'Umaiq Aijaz',
    leaderTwoTitle: 'Managing Director',
    leaderTwoBio: "Directing corporate growth, client relations, and bespoke itinerary standards. Umaiq ensures that Tiny Hues maintains its status as Kashmir's premier trusted travel brand.",
    contactVersion: 'contacts-v2'
  },
  packages: [
    { id: 'p1', title: 'Kashmir, in full colour', location: 'Srinagar · Gulmarg · Pahalgam', duration: '5 nights · 6 days', price: '₹18,999', category: 'valley', tag: 'Signature', description: 'A gentle first taste of Kashmir: floating breakfasts, meadows in bloom and unhurried days between Srinagar, Gulmarg and Pahalgam.', image: KASHMIR_CARD_IMAGE, featured: true, status: 'live' },
    { id: 'p2', title: 'The high road', location: 'Srinagar · Kargil · Leh', duration: '10 nights · 11 days', price: '₹42,500', category: 'mountains', tag: 'Adventure', description: 'Take the long way over the Himalayas with dramatic passes, quiet monasteries and the unforgettable blue of Pangong Lake.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p3', title: 'A softer kind of north', location: 'Srinagar · Sonamarg · Doodhpathri', duration: '4 nights · 5 days', price: '₹15,500', category: 'valley', tag: 'Slow escape', description: 'For travellers who want less road and more room to breathe, with meadows, forest walks and long evenings by the lake.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', featured: true, status: 'live' },
    { id: 'p4', title: 'The soulful circuit', location: 'Jammu · Katra · Srinagar', duration: '9 nights · 10 days', price: '₹27,800', category: 'spiritual', tag: 'Meaningful', description: 'A considered journey from Vaishno Devi to the valley, balancing sacred places, local food and quiet moments of reflection.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85', featured: false, status: 'live' },
    { id: 'p5', title: 'Winter, warmly', location: 'Srinagar · Gulmarg', duration: '4 nights · 5 days', price: '₹22,900', category: 'mountains', tag: 'Seasonal', description: 'Snow underfoot, kahwa in hand. A cosy winter stay with a day on the slopes and the valley at its quietest.', image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=900&q=85', featured: false, status: 'draft' },
    { id: 'p6', title: 'Build your own Kashmir', location: 'Anywhere in the valley', duration: 'Made around you', price: 'Custom', category: 'all', tag: 'Bespoke', description: 'Tell us how you like to travel and we will shape the route, stays and small surprises around you.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85'], featured: false, status: 'live' },
    { id:'sonamarg', title:'Sonamarg · Meadow of Gold', location:'Sonamarg · Thajiwas · Sindh River', duration:'2 nights · 3 days', price:'₹19,999', category:'mountains', tag:'Alpine escape', description:'Follow the Sindh River into wide mountain meadows, with time for the Thajiwas landscape, local stops and a slow evening beneath the peaks.', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Sonamarg%2C%20jammu%20and%20kashmir.jpg?width=1200', images:['https://commons.wikimedia.org/wiki/Special:FilePath/Sonamarg%2C%20jammu%20and%20kashmir.jpg?width=1200'], photoCredit:'Rayeesmaqboolkashmir · CC BY-SA 4.0', photoCreditUrl:'https://commons.wikimedia.org/wiki/File:Sonamarg,_jammu_and_kashmir.jpg', featured:true, status:'live', showInDestinations:true },
    { id:'gurez', title:'Gurez · Beyond the Pass', location:'Dawar · Habba Khatoon · Kishanganga', duration:'3 nights · 4 days', price:'₹19,999', category:'mountains', tag:'Off the map', description:'A quieter northern journey through Gurez\'s riverside villages, open valley views and the striking profile of Habba Khatoon peak.', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Gurez%20Valley%2003.jpg?width=1200', images:['https://commons.wikimedia.org/wiki/Special:FilePath/Gurez%20Valley%2003.jpg?width=1200'], photoCredit:'Journo Mohsin · CC BY-SA 4.0', photoCreditUrl:'https://commons.wikimedia.org/wiki/File:Gurez_Valley_03.jpg', featured:true, status:'live', showInDestinations:true },
    { id:'daksum', title:'Daksum · Under the Pines', location:'Daksum · Bringi River · Anantnag', duration:'2 nights · 3 days', price:'₹19,999', category:'valley', tag:'Forest retreat', description:'A forest-side escape shaped around the Bringi stream, wooded walks and an easy pace in the cool green hills of Daksum.', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Stream%20at%20Daksum%20(14387677438).jpg?width=1200', images:['https://commons.wikimedia.org/wiki/Special:FilePath/Stream%20at%20Daksum%20(14387677438).jpg?width=1200'], photoCredit:'Mike Prince · CC BY 2.0', photoCreditUrl:'https://commons.wikimedia.org/wiki/File:Stream_at_Daksum_(14387677438).jpg', featured:false, status:'live', showInDestinations:true },
    { id:'doodhpathri', title:'Doodhpathri · Meadow Days', location:'Doodhpathri · Shaliganga · Budgam', duration:'2 nights · 3 days', price:'₹19,999', category:'valley', tag:'Meadow escape', description:'Spend unhurried time among open grasslands, winding meadow roads and pine-covered slopes in the Budgam highlands.', image:'https://upload.wikimedia.org/wikipedia/commons/f/f2/Doodhpathri_-_A_dirt_road_goes_through_the_many_meadows_southwest_Jammu_Kashmir_India.jpg', images:['https://upload.wikimedia.org/wikipedia/commons/f/f2/Doodhpathri_-_A_dirt_road_goes_through_the_many_meadows_southwest_Jammu_Kashmir_India.jpg'], photoCredit:'Ankur P · CC BY-SA 2.0', photoCreditUrl:'https://commons.wikimedia.org/wiki/File:Doodhpathri_-_A_dirt_road_goes_through_the_many_meadows_southwest_Jammu_Kashmir_India.jpg', featured:true, status:'live', showInDestinations:true },
    { id:'peer-ki-gali', title:'Peer Ki Gali · The High Pass', location:'Peer Ki Gali · Mughal Road · Pir Panjal', duration:'2 nights · 3 days', price:'₹19,999', category:'mountains', tag:'Mountain pass', description:'Take the historic Mughal Road into the Pir Panjal highlands, with time for sweeping pass views and the mountain air at its own pace.', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg/1200px-Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg', images:['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg/1200px-Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg'], photoCredit:'Naveenkar · Public domain', photoCreditUrl:'https://commons.wikimedia.org/wiki/File:Peer_Ki_Gali_Mughal_Road_Poonch_Srinagar.jpg', featured:false, status:'live', showInDestinations:true },
    { id:'bangus-valley', title:'Bangus Valley · Wide Open', location:'Bangus Valley · Kupwara', duration:'3 nights · 4 days', price:'₹19,999', category:'mountains', tag:'Open valley', description:'A slower journey through Kupwara\'s broad alpine valley, with long meadow views, forest edges and room to let the landscape set the pace.', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20view%20of%20bangus%20the%20paradise.jpg?width=1200', images:['https://commons.wikimedia.org/wiki/Special:FilePath/Full%20view%20of%20bangus%20the%20paradise.jpg?width=1200'], photoCredit:'Idrees Lone 05 · CC BY-SA 4.0', photoCreditUrl:'https://commons.wikimedia.org/wiki/File:Full_view_of_bangus_the_paradise.jpg', featured:true, status:'live', showInDestinations:true }
  ],
  bookings: [],
  testimonials: [
    { id: 't1', quote: 'The trip felt like it had been made just for us. No rushing, no guesswork — just beautiful days and kind people.', name: 'Mithun Das', location: 'Kolkata · Kashmir valley', rating: 5 },
    { id: 't2', quote: 'Tiny Hues found the balance we were looking for: a little adventure, a lot of warmth and enough time to simply look around.', name: 'Mohammed Nabi', location: 'Delhi · Gulmarg & Pahalgam', rating: 5 },
    { id: 't3', quote: 'Every detail was handled before we even had to ask. We came back with a softer pace and a camera roll full of magic.', name: 'Ananya Rao', location: 'Bengaluru · A soulful circuit', rating: 5 }
  ]
};

function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }

let data = JSON.parse(JSON.stringify(defaultData));
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
  const deskPhone = document.getElementById('footerDeskPhone');
  if (deskPhone) { deskPhone.textContent = s.operationsPhone; deskPhone.href = `tel:${s.operationsPhone.replace(/\s/g, '')}`; }
  const directPhone = document.getElementById('directPhone');
  if (directPhone) { directPhone.textContent = s.phone; directPhone.href = `tel:${s.phone.replace(/\s/g, '')}`; }
  const email = document.getElementById('footerEmail');
  if (email) { email.textContent = s.email; email.href = `mailto:${s.email}`; }
  const whatsapp = document.getElementById('directWhatsapp');
  if (whatsapp) whatsapp.href = s.whatsapp;
  const floatingWhatsapp = document.getElementById('floatingWhatsapp');
  if (floatingWhatsapp) floatingWhatsapp.href = s.whatsapp;
  const instagram = document.getElementById('footerInstagram');
  if (instagram && s.instagram) instagram.href = s.instagram;
  const facebook = document.getElementById('footerFacebook');
  if (facebook && s.facebook) facebook.href = s.facebook;
}

function renderLeadership() {
  const target = document.getElementById('leadershipGrid');
  if (!target) return;
  const leaders = [
    { initials: 'AA', name: data.settings.leaderOneName, title: data.settings.leaderOneTitle, bio: data.settings.leaderOneBio },
    { initials: 'UA', name: data.settings.leaderTwoName, title: data.settings.leaderTwoTitle, bio: data.settings.leaderTwoBio }
  ];
  target.innerHTML = leaders.map(leader => `<article class="leader-card"><div class="leader-avatar">${escapeHtml(leader.initials)}</div><div><span class="leader-kicker">EXECUTIVE LEADERSHIP</span><h3>${escapeHtml(leader.name)}</h3><strong>${escapeHtml(leader.title)}</strong><p>${escapeHtml(leader.bio)}</p></div></article>`).join('');
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
  grid.innerHTML = visible.map(item => `<article class="package-card" data-package-id="${escapeHtml(item.id)}" tabindex="0"><div class="package-card-image" style="background-image:url('${escapeHtml(item.image)}')"><span class="package-tag">${escapeHtml(item.tag)}</span><button class="package-card-arrow" data-package-id="${escapeHtml(item.id)}" aria-label="View ${escapeHtml(item.title)}"><span class="icon icon-arrow" aria-hidden="true"></span></button></div><div class="package-info"><span class="location">${escapeHtml(item.location)}</span><h3>${escapeHtml(item.title)}</h3><div class="package-bottom"><span class="package-duration">${escapeHtml(item.duration)}</span><strong class="package-price">From ${escapeHtml(item.price)}</strong></div></div></article>`).join('');
  const empty = document.getElementById('emptyPackages');
  if (empty) empty.hidden = visible.length > 0;
}

function renderDestinations() {
  const grid = document.getElementById('destinationGrid');
  if (!grid) return;
  const destinations = data.packages.filter(item => item.status === 'live' && item.showInDestinations);
  grid.innerHTML = destinations.map((item, index) => `<a class="destination-card ${index === 0 ? 'destination-card-tall' : ''}" href="#packages" data-destination-package="${escapeHtml(item.id)}"><img loading="lazy" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} in Kashmir"><span class="destination-number">${String(index + 1).padStart(2, '0')}</span><div><span>${escapeHtml(item.tag || 'Kashmir escape')}</span><h3>${escapeHtml(item.title.split(' · ')[0])}</h3><b>Explore <span class="icon icon-arrow" aria-hidden="true"></span></b></div></a>`).join('');
}

function openPackageModal(id) {
  const item = data.packages.find(packageItem => packageItem.id === id);
  if (!item) return;
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
  const credit = document.getElementById('modalPhotoCredit');
  if (item.photoCredit) {
    credit.innerHTML = item.photoCreditUrl ? `Photo: <a href="${escapeHtml(item.photoCreditUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.photoCredit)}</a>` : `Photo: ${escapeHtml(item.photoCredit)}`;
    credit.hidden = false;
  } else { credit.textContent = ''; credit.hidden = true; }
  document.getElementById('modalCategory').textContent = item.tag;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalMeta').textContent = `${item.location} · ${item.duration} · from ${item.price}`;
  document.getElementById('modalDescription').textContent = item.description;
  const whatsapp = document.getElementById('packageWhatsapp');
  if (whatsapp) {
    const message = `Hi Tiny Hues, I would like to make this my trip:\n\n${item.title}\n${item.location}\n${item.duration}\nStarting price: ${item.price}\n\nPlease share availability and next steps.`;
    whatsapp.href = `${data.settings.whatsapp}${data.settings.whatsapp.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
  }
  modal.hidden = false;
  document.body.classList.add('modal-open');
}
function closeModal() { document.getElementById('packageModal').hidden = true; document.body.classList.remove('modal-open'); }

function initCookieConsent() {
  const banner = document.getElementById('cookieConsent');
  if (!banner || localStorage.getItem(COOKIE_CONSENT_KEY)) return;
  banner.hidden = false;
  document.getElementById('cookieAccept')?.addEventListener('click', () => { localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted'); banner.hidden = true; });
  document.getElementById('cookieDismiss')?.addEventListener('click', () => { localStorage.setItem(COOKIE_CONSENT_KEY, 'dismissed'); banner.hidden = true; });
}

function renderTestimonial() {
  const target = document.getElementById('testimonialContent');
  if (!target || !data.testimonials.length) return;
  const item = data.testimonials[testimonialIndex % data.testimonials.length];
  target.innerHTML = `<div class="testimonial-quote">“${escapeHtml(item.quote)}”</div><div class="testimonial-side"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.location)}</span><span class="testimonial-rating">${'★'.repeat(item.rating || 5)}</span></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSiteSettings(); renderPackages(); renderDestinations(); renderTestimonial(); renderLeadership(); initCookieConsent();
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
  document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
  document.getElementById('packageModal')?.addEventListener('click', event => { if (event.target.id === 'packageModal') closeModal(); });
  document.getElementById('prevTestimonial')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex - 1 + data.testimonials.length) % data.testimonials.length; renderTestimonial(); });
  document.getElementById('nextTestimonial')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex + 1) % data.testimonials.length; renderTestimonial(); });
  document.querySelector('.menu-toggle')?.addEventListener('click', event => { const nav = document.querySelector('.main-nav'); const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav')?.classList.remove('open')));
  document.getElementById('inquiryForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const inquiryForm = event.currentTarget;
    const form = new FormData(inquiryForm);
    const guestName = form.get('name');
    const formSuccess = document.getElementById('formSuccess');
    const rateCheck = canSubmitInquiry();
    if (!rateCheck.allowed) { formSuccess.hidden = false; formSuccess.textContent = rateCheck.message; formSuccess.classList.add('form-error'); return; }
    const payload = { name: guestName, email: form.get('email'), destination: form.get('destination'), travellers: form.get('travellers'), message: form.get('message'), website: form.get('website') };
    const submitButton = inquiryForm.querySelector('button[type="submit"]');
    submitButton.disabled = true; submitButton.innerHTML = 'Sending enquiry <span>…</span>';
    sendInquiry(payload).then(() => {
      inquiryForm.reset(); formSuccess.textContent = 'Thanks — your enquiry is on its way. Our travel designer will be in touch shortly.'; formSuccess.classList.remove('form-error'); formSuccess.hidden = false;
    }).catch(error => { formSuccess.textContent = error.message; formSuccess.classList.add('form-error'); formSuccess.hidden = false; }).finally(() => { submitButton.disabled = false; submitButton.innerHTML = 'Start a conversation <span class="icon icon-arrow" aria-hidden="true"></span>'; });
  });
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  fetch('/api/content', { cache:'no-store' }).then(response => response.ok ? response.json() : null).then(result => {
    if (!result?.content) return;
    data = { ...data, ...result.content, settings:{ ...data.settings, ...(result.content.settings || {}) } };
    renderSiteSettings(); renderPackages(); renderDestinations(); renderTestimonial(); renderLeadership();
  }).catch(() => {});
});
