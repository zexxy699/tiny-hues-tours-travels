let adminData = null;
let currentPage = 'dashboard';
let bookingFilter = 'all';
let editingPackageId = null;
let editingTestimonialId = null;
let saveQueue = Promise.resolve();

const clone = value => JSON.parse(JSON.stringify(value));
const e = (value = '') => String(value).replace(/[&<>\'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));

async function api(url, options = {}) {
  const response = await fetch(url, { credentials: 'same-origin', ...options, headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) } });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'The request could not be completed.');
  return result;
}

async function loadAdminData() {
  const { content } = await api('/api/content');
  adminData = content;
  if (!Array.isArray(adminData.bookings)) adminData.bookings = [];
  if (!Array.isArray(adminData.packages)) adminData.packages = [];
  if (!Array.isArray(adminData.testimonials)) adminData.testimonials = [];
}

function saveAdminData() {
  const snapshot = JSON.stringify(adminData);
  saveQueue = saveQueue.catch(() => {}).then(() => api('/api/content', { method: 'POST', body: JSON.stringify({ content: JSON.parse(snapshot) }) }));
  return saveQueue;
}

function statusBadge(status) {
  const labels = { live:'Live', draft:'Draft', new:'New', 'in-progress':'In progress', booked:'Booked', closed:'Closed' };
  const cls = status === 'in-progress' ? 'progress' : status;
  return `<span class="status-badge status-${e(cls)}">${e(labels[status] || status)}</span>`;
}

function toast(message) {
  const el = document.getElementById('adminToast');
  document.getElementById('toastText').textContent = message;
  el.hidden = false;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
}

async function persist(message) {
  try { await saveAdminData(); toast(message); return true; }
  catch (error) { toast(`Save failed: ${error.message}`); return false; }
}

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.admin-nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === page));
  document.querySelectorAll('.admin-page-section').forEach(section => section.classList.toggle('active', section.dataset.section === page));
  const title = { dashboard:'Overview', packages:'Journeys', bookings:'Enquiries', testimonials:'Testimonials', settings:'Site settings' }[page];
  document.getElementById('pageTitle').textContent = title;
  document.querySelector('.admin-sidebar')?.classList.remove('open');
  if (page === 'dashboard') renderDashboard();
  if (page === 'packages') renderPackagesTable();
  if (page === 'bookings') renderBookingsTable();
  if (page === 'testimonials') renderTestimonials();
  if (page === 'settings') populateSettings();
}

function renderMetrics() {
  const live = adminData.packages.filter(item => item.status === 'live').length;
  const newBookings = adminData.bookings.filter(item => item.status === 'new').length;
  document.getElementById('metricsGrid').innerHTML = `<div class="metric-card"><span class="metric-label">Live journeys</span><strong>${live}</strong><small>${adminData.packages.length} total in collection</small><span class="metric-icon blue metric-symbol metric-symbol-journeys" aria-hidden="true"></span></div><div class="metric-card"><span class="metric-label">New enquiries</span><strong>${newBookings}</strong><small>${adminData.bookings.length} conversations in inbox</small><span class="metric-icon mint metric-symbol metric-symbol-enquiries" aria-hidden="true"></span></div><div class="metric-card"><span class="metric-label">Guest rating</span><strong>4.9</strong><small>Based on recent feedback</small><span class="metric-icon sand metric-symbol metric-symbol-rating" aria-hidden="true"></span></div><div class="metric-card"><span class="metric-label">Published content</span><strong>Live</strong><small>Shared with every visitor</small><span class="metric-icon lilac metric-symbol metric-symbol-visits" aria-hidden="true"></span></div>`;
}

function renderDashboard() {
  renderMetrics();
  document.getElementById('navPackageCount').textContent = adminData.packages.length;
  document.getElementById('navBookingCount').textContent = adminData.bookings.filter(item => item.status === 'new').length;
  document.getElementById('recentBookings').innerHTML = `<div class="recent-list">${adminData.bookings.slice(0, 3).map(item => `<div class="recent-row"><div class="guest-cell"><span class="guest-avatar">${e(item.initials || '')}</span><span><strong>${e(item.name)}</strong><small>${e(item.email)}</small></span></div><span class="trip-cell">${e(item.destination)}</span><span class="row-date">${e(item.date)}</span></div>`).join('')}</div>`;
  document.getElementById('dashboardPackages').innerHTML = adminData.packages.filter(item => item.status === 'live').slice(0, 3).map(item => `<div class="mini-package"><div class="mini-package-image" style="background-image:url('${e(item.image)}')"></div><div class="mini-package-copy"><span>${e(item.duration)}</span><h3>${e(item.title)}</h3><span>${e(item.price)}</span></div></div>`).join('');
}

function renderPackagesTable() {
  const query = (document.getElementById('adminPackageSearch')?.value || '').toLowerCase();
  const list = adminData.packages.filter(item => `${item.title} ${item.location}`.toLowerCase().includes(query));
  document.getElementById('packageTableCount').textContent = `${list.length} journey${list.length === 1 ? '' : 's'}`;
  document.getElementById('packagesTable').innerHTML = list.map(item => `<tr><td><div class="table-journey"><span class="table-thumb" style="background-image:url('${e(item.image)}')"></span><span><strong>${e(item.title)}</strong><small>${e(item.tag || '')}</small></span></div></td><td>${e(item.location)}</td><td>${e(item.duration)}</td><td>${e(item.price)}</td><td>${statusBadge(item.status)}</td><td><div class="table-actions"><button class="table-action" data-edit-package="${e(item.id)}" title="Edit journey" aria-label="Edit ${e(item.title)}">✎</button><button class="table-action" data-delete-package="${e(item.id)}" title="Delete journey" aria-label="Delete ${e(item.title)}">×</button></div></td></tr>`).join('');
}

function renderBookingsTable() {
  const query = (document.getElementById('adminBookingSearch')?.value || '').toLowerCase();
  const list = adminData.bookings.filter(item => (bookingFilter === 'all' || item.status === bookingFilter) && `${item.name} ${item.email} ${item.destination}`.toLowerCase().includes(query));
  document.getElementById('bookingsTable').innerHTML = list.map(item => `<tr><td><div class="table-journey"><span class="guest-avatar">${e(item.initials || '')}</span><span><strong>${e(item.name)}</strong><small>${e(item.email)}</small></span></div></td><td>${e(item.destination)}</td><td>${e(item.travellers)}</td><td>${e(item.date)}</td><td><select class="status-select" data-booking-status="${e(item.id)}" aria-label="Update enquiry status"><option value="new" ${item.status === 'new' ? 'selected' : ''}>New</option><option value="in-progress" ${item.status === 'in-progress' ? 'selected' : ''}>In progress</option><option value="booked" ${item.status === 'booked' ? 'selected' : ''}>Booked</option><option value="closed" ${item.status === 'closed' ? 'selected' : ''}>Closed</option></select></td><td><button class="table-action" data-delete-booking="${e(item.id)}" title="Delete enquiry" aria-label="Delete enquiry from ${e(item.name)}">×</button></td></tr>`).join('');
}

function renderTestimonials() {
  document.getElementById('testimonialsList').innerHTML = adminData.testimonials.map(item => `<article class="testimonial-admin-card"><span class="stars">${'★'.repeat(item.rating || 5)}</span><blockquote>“${e(item.quote)}”</blockquote><footer><span><strong>${e(item.name)}</strong><small>${e(item.location)}</small></span><span class="testimonial-card-actions"><button class="table-action" data-edit-testimonial="${e(item.id)}" aria-label="Edit testimonial">✎</button><button class="table-action" data-delete-testimonial="${e(item.id)}" aria-label="Delete testimonial">×</button></span></footer></article>`).join('');
}

function populateSettings() {
  const form = document.getElementById('settingsForm');
  Object.entries(adminData.settings).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
}

function showAdminModal(type, id = null) {
  const content = document.getElementById('adminModalContent');
  if (type === 'package') {
    const item = adminData.packages.find(entry => entry.id === id) || { title:'', tag:'New journey', location:'', duration:'', price:'₹19,999', category:'valley', description:'', image:'', images:[], photoCredit:'', photoCreditUrl:'', status:'draft', featured:false, showInDestinations:true };
    editingPackageId = id;
    const imageList = Array.isArray(item.images) && item.images.length ? item.images : (item.image ? [item.image] : []);
    content.innerHTML = `<span class="kicker">JOURNEY EDITOR</span><h2>${id ? 'Edit journey' : 'Add a journey'}</h2><form class="admin-form" id="packageForm"><label>Journey name<input name="title" required value="${e(item.title)}"></label><label>Short label<input name="tag" value="${e(item.tag || '')}"></label><label class="span-2">Locations & route<input name="location" required value="${e(item.location)}"></label><label>Duration<input name="duration" required value="${e(item.duration)}"></label><label>Starting price<input name="price" required value="${e(item.price)}"></label><label>Collection<select name="category"><option value="valley" ${item.category === 'valley' ? 'selected' : ''}>Valley escapes</option><option value="mountains" ${item.category === 'mountains' ? 'selected' : ''}>High mountains</option><option value="spiritual" ${item.category === 'spiritual' ? 'selected' : ''}>Soulful trails</option><option value="all" ${item.category === 'all' ? 'selected' : ''}>Bespoke</option></select></label><label>Status<select name="status"><option value="live" ${item.status === 'live' ? 'selected' : ''}>Live on website</option><option value="draft" ${item.status === 'draft' ? 'selected' : ''}>Save as draft</option></select></label><label class="span-2">Description<textarea name="description" rows="4">${e(item.description)}</textarea></label><label class="span-2">Photos <small class="field-hint">Paste image URLs, one per line. The first one is the cover photo.</small><textarea name="images" rows="3" placeholder="https://…">${e(imageList.join('\n'))}</textarea></label><label class="span-2">Upload photos<input name="photoFiles" type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple><small class="field-hint">JPEG, PNG, WebP or AVIF · up to 3 MB each</small></label><label>Photo credit<input name="photoCredit" value="${e(item.photoCredit || '')}" placeholder="Photographer · license"></label><label>Photo credit source URL<input name="photoCreditUrl" type="url" value="${e(item.photoCreditUrl || '')}" placeholder="https://…"></label><label class="check-row"><input name="featured" type="checkbox" ${item.featured ? 'checked' : ''}> Feature this journey</label><label class="check-row"><input name="showInDestinations" type="checkbox" ${item.showInDestinations ? 'checked' : ''}> Show in Places section</label><div class="admin-form-actions"><button type="button" class="button button-ghost" data-close-admin-modal>Cancel</button><button type="submit" class="button button-dark" id="savePackageButton">Save journey <span>✓</span></button></div></form>`;
    document.getElementById('packageForm').addEventListener('submit', savePackage);
  } else {
    const item = adminData.testimonials.find(entry => entry.id === id) || { quote:'', name:'', location:'', rating:5 };
    editingTestimonialId = id;
    content.innerHTML = `<span class="kicker">TESTIMONIAL EDITOR</span><h2>${id ? 'Edit testimonial' : 'Add a testimonial'}</h2><form class="admin-form" id="testimonialForm"><label class="span-2">Guest quote<textarea name="quote" rows="4" required>${e(item.quote)}</textarea></label><label>Guest name<input name="name" required value="${e(item.name)}"></label><label>Location & journey<input name="location" value="${e(item.location)}"></label><label>Rating<select name="rating"><option value="5" ${item.rating === 5 ? 'selected' : ''}>5 stars</option><option value="4" ${item.rating === 4 ? 'selected' : ''}>4 stars</option><option value="3" ${item.rating === 3 ? 'selected' : ''}>3 stars</option></select></label><div class="admin-form-actions"><button type="button" class="button button-ghost" data-close-admin-modal>Cancel</button><button type="submit" class="button button-dark">Save testimonial <span>✓</span></button></div></form>`;
    document.getElementById('testimonialForm').addEventListener('submit', saveTestimonial);
  }
  document.getElementById('adminModal').hidden = false;
}

function closeAdminModal() { document.getElementById('adminModal').hidden = true; }

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.readAsDataURL(file);
  });
}

async function uploadPhoto(file) {
  const result = await api('/api/upload', { method:'POST', body:JSON.stringify({ name:file.name, type:file.type, data:await readFileAsBase64(file) }) });
  return result.url;
}

async function savePackage(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const button = document.getElementById('savePackageButton');
  const previous = clone(adminData);
  button.disabled = true;
  const urls = String(form.get('images') || '').split('\n').map(url => url.trim()).filter(url => /^https:\/\//i.test(url) || url.startsWith('/api/media?path='));
  try {
    const files = Array.from(formElement.elements.photoFiles.files || []);
    for (let index = 0; index < files.length; index += 1) {
      button.innerHTML = `Uploading photo ${index + 1} of ${files.length} <span>…</span>`;
      urls.push(await uploadPhoto(files[index]));
    }
    const item = {
      id:editingPackageId || `p-${crypto.randomUUID()}`,
      title:String(form.get('title')).trim(), tag:String(form.get('tag')).trim(), location:String(form.get('location')).trim(), duration:String(form.get('duration')).trim(), price:String(form.get('price')).trim(), category:String(form.get('category')), description:String(form.get('description')).trim(), image:urls[0] || '', images:urls, photoCredit:String(form.get('photoCredit')).trim(), photoCreditUrl:String(form.get('photoCreditUrl')).trim(), status:String(form.get('status')), featured:form.get('featured') === 'on', showInDestinations:form.get('showInDestinations') === 'on'
    };
    if (!item.title || !item.location || !item.duration || !item.price) throw new Error('Add a journey name, location, duration and price.');
    if (editingPackageId) adminData.packages = adminData.packages.map(existing => existing.id === editingPackageId ? item : existing);
    else adminData.packages.push(item);
    if (!await persist(editingPackageId ? 'Journey published' : 'Journey added and published')) { adminData = previous; return; }
    closeAdminModal(); renderPackagesTable(); renderDashboard();
  } catch (error) { toast(error.message); }
  finally { button.disabled = false; button.innerHTML = 'Save journey <span>✓</span>'; }
}

async function saveTestimonial(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const previous = clone(adminData);
  const item = { id:editingTestimonialId || `t-${crypto.randomUUID()}`, quote:String(form.get('quote')).trim(), name:String(form.get('name')).trim(), location:String(form.get('location')).trim(), rating:Number(form.get('rating')) };
  if (editingTestimonialId) adminData.testimonials = adminData.testimonials.map(existing => existing.id === editingTestimonialId ? item : existing);
  else adminData.testimonials.push(item);
  if (!await persist(editingTestimonialId ? 'Testimonial updated' : 'Testimonial published')) { adminData = previous; return; }
  closeAdminModal(); renderTestimonials(); renderDashboard();
}

async function openAdmin() {
  try {
    await loadAdminData();
    document.getElementById('loginScreen').hidden = true;
    document.getElementById('adminApp').hidden = false;
    document.querySelector('.admin-user span:nth-child(2)').textContent = 'Shared live workspace';
    navigate('dashboard');
    document.getElementById('settingsSaved').textContent = '● Published live';
  } catch (error) {
    document.getElementById('loginScreen').hidden = false;
    document.getElementById('adminApp').hidden = true;
    const loginError = document.getElementById('loginError');
    loginError.textContent = error.message;
    loginError.hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  try { await api('/api/admin-auth'); await openAdmin(); } catch { /* Show the sign-in form. */ }

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    loginError.hidden = true;
    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    try {
      await api('/api/admin-auth', { method:'POST', body:JSON.stringify({ id:document.getElementById('adminUsername').value, password:document.getElementById('adminPassword').value }) });
      await openAdmin();
      document.getElementById('adminPassword').value = '';
    } catch (error) {
      loginError.textContent = error.message;
      loginError.hidden = false;
    } finally { submit.disabled = false; }
  });

  document.querySelectorAll('.admin-nav-item').forEach(item => item.addEventListener('click', () => navigate(item.dataset.page)));
  document.querySelectorAll('[data-page-jump]').forEach(item => item.addEventListener('click', () => navigate(item.dataset.pageJump)));
  document.getElementById('sidebarToggle').addEventListener('click', () => document.querySelector('.admin-sidebar').classList.toggle('open'));
  document.getElementById('logoutButton').addEventListener('click', async () => { try { await api('/api/admin-auth', { method:'DELETE' }); } finally { location.reload(); } });

  document.addEventListener('click', async event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'new-package') showAdminModal('package');
    if (action === 'new-testimonial') showAdminModal('testimonial');
    if (action === 'site-settings') navigate('settings');
    const editPackage = event.target.closest('[data-edit-package]')?.dataset.editPackage;
    if (editPackage) showAdminModal('package', editPackage);
    const deletePackage = event.target.closest('[data-delete-package]')?.dataset.deletePackage;
    if (deletePackage && confirm('Delete this journey from the live website?')) {
      const previous = clone(adminData); adminData.packages = adminData.packages.filter(item => item.id !== deletePackage);
      if (!await persist('Journey removed from the website')) adminData = previous;
      renderPackagesTable(); renderDashboard();
    }
    const editTestimonial = event.target.closest('[data-edit-testimonial]')?.dataset.editTestimonial;
    if (editTestimonial) showAdminModal('testimonial', editTestimonial);
    const deleteTestimonial = event.target.closest('[data-delete-testimonial]')?.dataset.deleteTestimonial;
    if (deleteTestimonial && confirm('Remove this testimonial from the website?')) {
      const previous = clone(adminData); adminData.testimonials = adminData.testimonials.filter(item => item.id !== deleteTestimonial);
      if (!await persist('Testimonial removed')) adminData = previous;
      renderTestimonials(); renderDashboard();
    }
    const deleteBooking = event.target.closest('[data-delete-booking]')?.dataset.deleteBooking;
    if (deleteBooking && confirm('Delete this enquiry?')) {
      const previous = clone(adminData); adminData.bookings = adminData.bookings.filter(item => item.id !== deleteBooking);
      if (!await persist('Enquiry deleted')) adminData = previous;
      renderBookingsTable(); renderDashboard();
    }
    if (event.target.closest('[data-close-admin-modal]')) closeAdminModal();
  });

  document.getElementById('adminPackageSearch').addEventListener('input', renderPackagesTable);
  document.getElementById('adminBookingSearch').addEventListener('input', renderBookingsTable);
  document.querySelectorAll('.admin-booking-filter').forEach(item => item.addEventListener('click', () => {
    document.querySelectorAll('.admin-booking-filter').forEach(button => button.classList.remove('active'));
    item.classList.add('active'); bookingFilter = item.dataset.bookingFilter; renderBookingsTable();
  }));
  document.getElementById('bookingsTable').addEventListener('change', async event => {
    const id = event.target.dataset.bookingStatus;
    const item = adminData?.bookings.find(booking => booking.id === id);
    if (!item) return;
    const previous = item.status; item.status = event.target.value;
    if (!await persist('Enquiry status updated')) item.status = previous;
    renderBookingsTable(); renderDashboard();
  });

  document.getElementById('settingsForm').addEventListener('submit', async event => {
    event.preventDefault();
    const previous = clone(adminData);
    const form = new FormData(event.currentTarget);
    Object.keys(adminData.settings).forEach(key => { if (form.has(key)) adminData.settings[key] = form.get(key); });
    adminData.settings.heroImageVersion = 'custom';
    if (!await persist('Site settings published')) { adminData = previous; populateSettings(); return; }
    document.getElementById('settingsSaved').textContent = '● Published live';
  });

  document.getElementById('resetDemo').addEventListener('click', async () => {
    if (!confirm('Reset all website content and journeys to the original demo data?')) return;
    const previous = clone(adminData);
    try {
      const response = await fetch('/data/site-content.json', { cache:'no-store' });
      if (!response.ok) throw new Error('Could not load the starting content.');
      adminData = await response.json();
      if (!await persist('Demo content reset and published')) adminData = previous;
      populateSettings(); navigate('dashboard');
    } catch (error) { adminData = previous; toast(error.message); }
  });

  document.getElementById('adminModal').addEventListener('click', event => { if (event.target.id === 'adminModal') closeAdminModal(); });
});
