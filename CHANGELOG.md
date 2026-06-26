# Changelog

## 1.1.1 - 2026-06-26
- Added full i18n wiring for Persian, English and French, including localized mock responses and language metadata on mock data.
- Added Accept-Language, X-Language and language payload/query propagation to API requests.
- Improved homepage inspiration links, removed end-user mock implementation copy and replaced emoji icons with mono Material icons.
- Fixed dashboard RTL layout anchoring and sidebar icon coloring.
- Added online payment mock flow, reserve date/time form, deposit/refund calculation copy and static shipment tracking page.

## 1.1.0 - 2026-06-26
- Updated Barna Mezon branding with the provided logo and four-color theme system.
- Reworked mock-first frontend homepage, SEO metadata, sitemap/robots, ethnic sections, services, partners, reservation story, community story, and editorial references.
- Replaced weak SVG placeholders with local embedded visual assets for mock mode and media manager.
- Added/normalized sample data for Iranian ethnic clothing, Barna travel/reporting narrative, wardrobe redesign, comments, requests, users, reservations and dashboard modules.
- Kept backend as REST/MySQL/Express scaffold for later API completion and refreshed seed/image references.


## 1.0.0 - 2026-06-21
### Added
- Full Next.js 14 TypeScript frontend
- Site: home, ethnic groups, clothing catalog, reservation, community, about
- Dashboard: clothing, orders, reservations, comments, media, pages, tags, users, settings, theme
- RTL (Persian) + LTR (English) language support
- TanStack Query v5 for all API calls
- Material UI dashboard with dark sidebar
- Tailwind CSS site with gold/wine color theme