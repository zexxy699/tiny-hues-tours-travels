# Tiny Hues demo website

Open `index.html` for the public website.

The hosted admin route is `/adminapage` (rewritten to `admin.html` by `vercel.json`).

Demo access:

- Username: `admin`
- Password: `tinyhues`

The admin experience is intentionally lightweight for this demo. Changes to journeys, testimonials and site settings are saved in the browser with `localStorage` and appear immediately on the public site in the same browser profile. Enquiries are accepted by the hosted API and the admin inbox syncs the live demo queue when the function instance is available.

The enquiry form uses a client-side limit of 10 submissions per hour plus a Vercel `/api/inquiry` endpoint with a 20-per-hour per-instance limit and input validation. For a production launch, connect the endpoint to Vercel Firewall and a durable store such as Upstash or Vercel Postgres.

Social links are editable in Admin → Site settings. The default Instagram and Facebook buttons open branded public search pages because no verified official social profile URLs were discoverable online; replace them with the company’s exact handles when available.
