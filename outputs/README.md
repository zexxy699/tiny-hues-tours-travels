# Tiny Hues demo website

Open `index.html` for the public website.

The hosted admin route is `/adminapage` (rewritten to `admin.html` by `vercel.json`).

Admin access is configured with the Vercel environment variables `TINY_HUES_ADMIN_ID`, `TINY_HUES_ADMIN_PASSWORD`, and `TINY_HUES_SESSION_SECRET`. The admin session is signed server-side and stored in an HttpOnly cookie; credentials are not shipped in the browser bundle.

The admin route is `/adminapage`.

Journeys, photos, site settings, testimonials, and enquiries are stored in the connected private Vercel Blob store and shared across visitors and devices. Uploaded photos are served through a narrow public image endpoint. Journey cards support multiple image URLs or direct JPEG, PNG, WebP, and AVIF uploads; the first photo is the cover. Photos can be up to 3 MB each.

The enquiry endpoint validates submissions and applies a server-side per-instance limit of 20 submissions per hour. The earlier browser-only limit has been removed so old local browser counters cannot block new enquiries.

Social links are editable in Admin → Site settings. The default Instagram and Facebook buttons open branded public search pages because no verified official social profile URLs were discoverable online; replace them with the company’s exact handles when available.

The public site includes a floating WhatsApp shortcut, cookie consent, executive leadership content, tap-to-open journey cards, and WhatsApp trip handoff links with the selected journey details. Primary helpline and WhatsApp: `+91 6006473963`; secondary desk: `+91 6005577032`. Both details and leadership bios are editable in Admin → Site settings.

The six added Kashmir destination photographs include linked author/license credit in each journey detail view. Credits are stored with each journey so they can be updated when a photo is replaced.
