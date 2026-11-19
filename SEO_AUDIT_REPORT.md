# SEO audit

Checked against a production build on 18 November 2026 (`next build`, then `next start`). Search volumes are unverified. Lighthouse was not run; Chrome was used for mobile screenshots and the HTTP crawl instead.

## Confirmed and fixed in this build

- Canonicals, the sitemap, robots and JSON-LD now use `https://www.grow2gether.in` unless `NEXT_PUBLIC_SITE_URL` overrides it.
- The 11 services and the Delhi page are real routes. Old `/services/websites`, `/services/shops`, `/services/apps` and `/services/automations` return **308** to the new URL in one hop.
- Crawl of every sitemap URL: **200**, one `h1`, a unique title, a unique description, a `www` canonical, and JSON-LD that parses. 31 URLs.
- An unknown URL returns **404**, keeps the site header and footer, and links to four services plus contact.
- Case studies exist for all 10 projects. Copy is the existing project text, including who did the work.
- Two blog articles exist, are marked draft, are `noindex`, and are not in the sitemap.
- Project screenshots used by the site are WebP. The original jpg and png files are still in `public/projects`.
- GA4 is wired and loads only when `NEXT_PUBLIC_GA_ID` is set and the cookie choice is `accepted`. With no ID, the homepage HTML does not include gtag.

## Confirmed, and still yours to do

- The bare domain `grow2gether.in` does not redirect inside this app. Set **www** as the primary domain in Vercel so the apex 301s to www. Until that is done, the host redirect is not live.
- Search Console and Bing are not verified from here. Submit `https://www.grow2gether.in/sitemap.xml` after the domain is primary.
- Terms and both articles are written for your review. Articles stay out of the sitemap until `published` is set to `true` in `src/data/articles.ts`.
- There is no GA4 measurement ID in the environment, so events will not be recorded until you add `NEXT_PUBLIC_GA_ID`.
- No project outcome numbers were added. The case studies do not invent results.

## Suspected, not measured

- Field Core Web Vitals. The production crawl did not include Lighthouse or CrUX.
- Whether the footer services list feels tight on short laptop screens. On a 390px screenshot the 404 page reaches the footer without overlap. A short desktop viewport was not measured.
- Rankings. Nothing here is a rank or traffic claim.

## Monthly checklist

1. Search Console: coverage, and the sitemap still fetching.
2. Confirm apex still redirects to www.
3. Look at the five events: `booking_open`, `booking_submit`, `whatsapp_click`, `email_click`, `cta_click`. They must not contain form contents.
4. If a draft article is approved, set `published: true` and rebuild so it enters the sitemap.
5. If a real project result is available, add that sentence to the matching case study. Do not add a number you cannot source.
