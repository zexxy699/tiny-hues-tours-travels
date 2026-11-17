/*
 * Shared HTML renderers for the public site.
 * Loaded in the browser as window.TinyHuesRender and required by the
 * server-side page renderer (api/home.js), so both produce identical markup.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TinyHuesRender = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  const OLD_HERO_TITLE = 'Go where the quiet lives.';

  function escapeHtml(value = '') {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  // Safe value for url('…') inside a style attribute.
  function cssUrl(url = '') {
    return escapeHtml(String(url || '').replace(/['"()\\\s<>]/g, char => '%' + char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')));
  }

  function slugify(value = '') {
    return String(value).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  }
  function journeySlug(item) { return (item && (item.slug || slugify(item.title))) || (item && item.id) || ''; }
  function journeyPath(item) { return `/journeys/${encodeURIComponent(journeySlug(item))}`; }
  function findJourney(packages, slugOrId) {
    const key = String(slugOrId || '').toLowerCase();
    return (packages || []).find(item => journeySlug(item) === key) || (packages || []).find(item => String(item.id).toLowerCase() === key) || null;
  }
  function photosOf(item) { return Array.isArray(item.images) && item.images.length ? item.images : (item.image ? [item.image] : []); }
  function shortTitle(item) { return String(item.title || '').split(' · ')[0]; }

  function initials(name = '') {
    return String(name).trim().split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }

  // "Go where the *quiet* lives." → Go where the<br><em>quiet</em> lives.
  // Without asterisks the last word is emphasised (older saved headlines).
  function heroTitleHtml(title = '') {
    let text = String(title || '').trim();
    if (text === OLD_HERO_TITLE) text = 'Go where the *quiet* lives.';
    const match = text.match(/^(.*?)\*([^*]+)\*(.*)$/);
    if (match) {
      const before = match[1].trim();
      return `${before ? `${escapeHtml(before)}<br>` : ''}<em>${escapeHtml(match[2])}</em>${escapeHtml(match[3])}`;
    }
    const words = text.split(' ');
    const last = words.pop() || '';
    return words.length ? `${escapeHtml(words.join(' '))}<br><em>${escapeHtml(last)}</em>` : `<em>${escapeHtml(last)}</em>`;
  }
  function heroTitleText(title = '') { return String(title || '').replace(/\*/g, ''); }

  // Line icons drawn on a 24px grid; `.ia` strokes pick up the accent colour.
  const INCLUDE_TYPES = [
    { key: 'sightseeing', label: 'Sightseeing', svg: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8.5 7l1.4-2.5h4.2L15.5 7"/><circle cx="12" cy="13.5" r="3.5"/><circle class="ia" cx="12" cy="13.5" r="1"/><path class="ia" d="M17.5 10.2h.01"/>' },
    { key: 'meals', label: 'Meals', svg: '<path d="M3.5 4v4a1.75 1.75 0 0 0 3.5 0V4M5.25 4v16"/><circle cx="13.5" cy="12" r="5.2"/><circle class="ia" cx="13.5" cy="12" r="2.4"/><path d="M20.5 20V4c1.3.9 1.9 3.2 1.9 6.5h-1.9"/>' },
    { key: 'hotels', label: 'Hotels', svg: '<path d="M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16M3 21h18M10 21v-4h4v4"/><path class="ia" d="M8.5 8h1M14.5 8h1M8.5 12h1M14.5 12h1"/>' },
    { key: 'transfer', label: 'Transfers', svg: '<path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11"/><rect x="3" y="11" width="18" height="6" rx="2"/><path d="M5.5 17v2.5M18.5 17v2.5"/><path class="ia" d="M7 14h1.5M15.5 14H17"/>' },
    { key: 'houseboat', label: 'Houseboat', svg: '<path d="M2.5 14h19l-2.2 3.5a2 2 0 0 1-1.7 1H6.4a2 2 0 0 1-1.7-1Z"/><path d="M6 14v-4h12v4M5 10l7-4 7 4"/><path class="ia" d="M3 21.5c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M9.5 12h1M13.5 12h1"/>' },
    { key: 'guide', label: 'Local guide', svg: '<circle cx="12" cy="12" r="9"/><path class="ia" d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>' }
  ];
  const INCLUDE_BY_KEY = Object.fromEntries(INCLUDE_TYPES.map(type => [type.key, type]));

  function includeIcon(key) {
    const type = INCLUDE_BY_KEY[key];
    return type ? `<svg class="include-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${type.svg}</svg>` : '';
  }
  function includesOf(item) { return (Array.isArray(item.includes) ? item.includes : []).filter(key => INCLUDE_BY_KEY[key]); }
  function inclusionsOf(item) { return (Array.isArray(item.inclusions) ? item.inclusions : []).map(line => String(line).trim()).filter(Boolean); }

  function cardIncludesHtml(item) {
    const keys = includesOf(item);
    if (!keys.length) return '';
    const labels = keys.map(key => INCLUDE_BY_KEY[key].label).join(', ');
    return `<ul class="card-includes" aria-label="Includes ${escapeHtml(labels)}">${keys.map(key => `<li title="${escapeHtml(INCLUDE_BY_KEY[key].label)}">${includeIcon(key)}</li>`).join('')}</ul>`;
  }

  function includesSectionHtml(item) {
    const keys = includesOf(item);
    const lines = inclusionsOf(item);
    if (!keys.length && !lines.length) return '';
    const strip = keys.length ? `<div class="include-block"><span class="include-heading">What's included</span><ul class="include-strip">${keys.map(key => `<li>${includeIcon(key)}<span>${escapeHtml(INCLUDE_BY_KEY[key].label)}</span></li>`).join('')}</ul></div>` : '';
    const list = lines.length ? `<div class="include-block"><span class="include-heading">Package inclusions</span><ul class="inclusion-list">${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul></div>` : '';
    return `<div class="journey-includes">${strip}${list}</div>`;
  }

  function packageCardHtml(item) {
    const cover = photosOf(item)[0] || '';
    return `<article class="package-card" data-package-id="${escapeHtml(item.id)}"><div class="package-card-image">${cover ? `<img class="package-card-photo" src="${escapeHtml(cover)}" alt="${escapeHtml(`${shortTitle(item)}, ${item.location || 'Kashmir'}`)}" loading="lazy" decoding="async" width="600" height="400">` : ''}<span class="package-tag">${escapeHtml(item.tag)}</span><span class="package-card-arrow" aria-hidden="true"><span class="icon icon-arrow"></span></span></div><div class="package-info"><span class="location">${escapeHtml(item.location)}</span><h3><a class="package-link" href="${journeyPath(item)}" data-package-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</a></h3>${cardIncludesHtml(item)}<div class="package-bottom"><span class="package-duration">${escapeHtml(item.duration)}</span><strong class="package-price">From ${escapeHtml(item.price)}</strong></div></div></article>`;
  }

  function filterPackages(packages, filter = 'all', query = '') {
    const q = String(query || '').toLowerCase().trim();
    return (packages || []).filter(item => item.status === 'live'
      && (filter === 'all' || item.category === filter)
      && `${item.title} ${item.location} ${item.category}`.toLowerCase().includes(q));
  }

  // Featured live journeys first, for the "not found" page.
  function suggestedJourneys(packages, count = 3) {
    const live = (packages || []).filter(item => item.status === 'live');
    return live.filter(item => item.featured).concat(live.filter(item => !item.featured)).slice(0, count);
  }

  function destinationsHtml(packages) {
    const list = (packages || []).filter(item => item.status === 'live' && item.showInDestinations);
    return list.map((item, index) => `<a class="destination-card ${index === 0 ? 'destination-card-tall' : ''}" href="${journeyPath(item)}" data-destination-package="${escapeHtml(item.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(photosOf(item)[0] || '')}" alt="${escapeHtml(shortTitle(item))}, Kashmir" width="600" height="800"><span class="destination-number">${String(index + 1).padStart(2, '0')}</span><div><span>${escapeHtml(item.tag || 'Kashmir escape')}</span><h3>${escapeHtml(shortTitle(item))}</h3><b>Explore <span class="icon icon-arrow" aria-hidden="true"></span></b></div></a>`).join('');
  }

  function leadersHtml(settings) {
    const leaders = [
      { name: settings.leaderOneName, title: settings.leaderOneTitle, bio: settings.leaderOneBio },
      { name: settings.leaderTwoName, title: settings.leaderTwoTitle, bio: settings.leaderTwoBio }
    ].filter(leader => leader.name);
    return leaders.map(leader => `<article class="leader-card"><div class="leader-avatar" aria-hidden="true">${escapeHtml(initials(leader.name))}</div><div><span class="leader-kicker">EXECUTIVE LEADERSHIP</span><h3>${escapeHtml(leader.name)}</h3><strong>${escapeHtml(leader.title)}</strong><p>${escapeHtml(leader.bio)}</p></div></article>`).join('');
  }

  function testimonialHtml(item) {
    if (!item) return '';
    const rating = Math.max(1, Math.min(5, Number(item.rating) || 5));
    return `<blockquote class="testimonial-quote">“${escapeHtml(item.quote)}”</blockquote><div class="testimonial-side"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.location)}</span><span class="testimonial-rating" aria-label="${rating} out of 5 stars">${'★'.repeat(rating)}</span></div>`;
  }

  function whatsappTripLink(item, settings) {
    const base = settings.whatsapp || 'https://wa.me/916006473963';
    const message = `Hi Tiny Hues, I would like to make this my trip:\n\n${item.title}\n${item.location}\n${item.duration}\nStarting price: ${item.price}\n\nPlease share availability and next steps.`;
    return `${base}${base.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
  }

  // Inner markup of the journey dialog (.package-modal).
  function journeyDialogHtml(item, settings, photoIndex = 0) {
    const photos = photosOf(item);
    const current = photos[photoIndex] || photos[0] || '';
    const thumbs = photos.length > 1 ? `<div class="modal-gallery-thumbs">${photos.map((url, index) => `<button type="button" data-gallery-image="${index}" class="gallery-thumb ${index === photoIndex ? 'active' : ''}" aria-label="Show photo ${index + 1}" aria-pressed="${index === photoIndex}" style="background-image:url('${cssUrl(url)}')"></button>`).join('')}</div>` : '';
    const credit = item.photoCredit ? `<small class="modal-photo-credit">Photo: ${item.photoCreditUrl ? `<a href="${escapeHtml(item.photoCreditUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.photoCredit)}</a>` : escapeHtml(item.photoCredit)}</small>` : '';
    return `<a class="modal-close" href="/#packages" data-close-modal aria-label="Close journey details">×</a>`
      + `<div class="modal-gallery">${current ? `<img class="modal-image" id="modalImage" src="${escapeHtml(current)}" alt="${escapeHtml(`${shortTitle(item)}, ${item.location || 'Kashmir'}`)}" width="800" height="600">` : '<div class="modal-image"></div>'}${thumbs}${credit}</div>`
      + `<div class="modal-body"><span class="kicker">${escapeHtml(item.tag || 'Featured journey')}</span><h2 id="modalTitle">${escapeHtml(item.title)}</h2>`
      + `<div class="modal-meta">${escapeHtml(item.location)} · ${escapeHtml(item.duration)} · from ${escapeHtml(item.price)}</div>`
      + `<p>${escapeHtml(item.description)}</p>${includesSectionHtml(item)}`
      + `<a class="button button-dark package-whatsapp" href="${escapeHtml(whatsappTripLink(item, settings))}" target="_blank" rel="noopener noreferrer">Make this my trip <span class="icon icon-arrow" aria-hidden="true"></span></a>`
      + `<small class="modal-note">Opens WhatsApp with this journey's details ready to send.</small></div>`;
  }

  return {
    escapeHtml, cssUrl, slugify, journeySlug, journeyPath, findJourney, photosOf, shortTitle, initials,
    heroTitleHtml, heroTitleText, INCLUDE_TYPES, includeIcon, includesOf, inclusionsOf, cardIncludesHtml,
    includesSectionHtml, packageCardHtml, filterPackages, suggestedJourneys, destinationsHtml, leadersHtml, testimonialHtml,
    whatsappTripLink, journeyDialogHtml
  };
}));
