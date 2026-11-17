# Tiny Hues Tours & Travels website

Live at **https://tinyhuestour.com** (Vercel). Admin: **/adminapage**.

## How it fits together

| Path | What it does |
| --- | --- |
| `outputs/index.html` | Page template for the public site (placeholders like `{{phone}}` are filled on the server). |
| `outputs/render.js` | Shared HTML renderers used by both the server and the browser, so both produce the same markup. |
| `outputs/app.js` | Browser behaviour: filters, search, journey dialog, shareable journey URLs, enquiry form. |
| `outputs/admin.html`, `outputs/admin.js` | Admin panel. |
| `api/home.js` | Server-renders `/` and `/journeys/:slug` with live content, SEO tags and structured data. |
| `api/sitemap.js` | `/sitemap.xml`, listing the homepage and every live journey. |
| `api/content.js` | Read/publish site content (journeys, testimonials, settings). |
| `api/inquiry.js` | New enquiries (public) plus inbox, status change and delete (admin). |
| `api/admin-auth.js`, `api/upload.js`, `api/media.js` | Sign-in, photo upload, photo delivery. |
| `lib/site-data.js` | Blob storage access, with safe concurrent writes and data migrations. |
| `lib/seo.js` | Titles, descriptions, Open Graph tags, TravelAgency/TouristTrip JSON-LD. |
| `data/site-content.json` | Starting content: the single source of default data. |

All content is stored in one private Vercel Blob file (`tiny-hues/site-content.json`). Every write is a
conditional update (`ifMatch` on the file's ETag) that retries on conflict, so simultaneous enquiries or
admin saves never overwrite each other. Enquiries are only changed through `/api/inquiry`, so publishing
content can't bring back a deleted enquiry.

## Journeys

Each journey has its own web address, e.g. `/journeys/gurez-beyond-the-pass`. Clicking a journey on the
homepage opens the same details in a dialog and updates the address bar, so the link can be shared.
A journey keeps its address even if its name is edited later.

In **Admin → Journeys → edit**, you can set:
- **What's included**: icon tiles for Sightseeing, Meals, Hotels, Transfers, Houseboat and Local guide.
- **Package inclusions**: a bullet list, one line per item.

The inclusions for the original journeys were pre-filled with typical text; check them against what each
package actually includes.

## SEO

- The server renders real HTML for every page, including journeys, prices and contact details, so it
  doesn't rely on JavaScript running.
- Each page has its own title, description, canonical URL, Open Graph and Twitter tags. The share image is
  `outputs/assets/og-image.jpg`.
- JSON-LD structured data: `TravelAgency` (contact, hours, area served, social profiles), `WebSite`, an
  `ItemList` of journeys, and on journey pages a `TouristTrip` with an INR `Offer` plus breadcrumbs.
- `robots.txt` and a dynamic `sitemap.xml`. The admin page is marked `noindex`.
- The canonical domain is `https://tinyhuestour.com`. To use another domain, set the `SITE_URL`
  environment variable in Vercel.

**After deploying:**
1. In Vercel → Domains, make sure `www.tinyhuestour.com` redirects to `tinyhuestour.com` (or the other way
   round, matching `SITE_URL`).
2. Add the site to [Google Search Console](https://search.google.com/search-console), verify the
   domain, and submit `https://tinyhuestour.com/sitemap.xml`.
3. Create or claim a Google Business Profile for the Srinagar office; for local searches this matters as
   much as the website.

## Admin access

Set these Vercel environment variables: `TINY_HUES_ADMIN_ID`, `TINY_HUES_ADMIN_PASSWORD`,
`TINY_HUES_SESSION_SECRET`. Sessions are signed server-side and stored in an HttpOnly cookie.

## Spam protection

Enquiries are dropped when the hidden honeypot field is filled or the form is submitted in under
2.5 seconds. There is also a per-server limit of 20 enquiries per hour per IP address. That limit lives in
memory, so for a hard limit, add a rate-limit rule for `/api/inquiry` in **Vercel → Firewall**.

## Development

```bash
npm install
npm test
```

The tests use an in-memory stand-in for Vercel Blob (`tests/blob-mock.js`). They cover concurrent
enquiries, delete persistence, data migrations, server-rendered SEO output and the sitemap.
