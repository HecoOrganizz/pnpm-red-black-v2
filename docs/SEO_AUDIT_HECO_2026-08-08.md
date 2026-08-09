# Heco SEO Audit & Production Readiness — 2026-08-08

> Scope: Next.js 16 + next-intl multilingual marketing/product site at `heco.app`.
> Goal: maximize crawlability, indexability, relevance, trust, and search competitiveness. No implementation can guarantee Google position #1.

## Executive verdict

The original project had a visually strong marketing foundation and real crawlable product links, but it was **not production-ready for SEO**. The largest risks were not “missing keywords”; they were URL discovery, multilingual signaling, structured-data correctness, and trust claims.

### Original readiness estimate

- Crawl/index foundation: **5/10**
- Multilingual SEO: **4/10**
- Structured data: **3/10**
- Metadata/social assets: **5/10**
- Content/trust readiness: **4/10** until claims are verified
- Internal linking: **7/10**
- Developer SEO safety: **5/10**

### After this patch

The codebase now has a substantially safer technical foundation. The remaining ranking work is mostly **content quality, evidence, authority, field performance, Search Console feedback, and real links/mentions**.

---

# P0 — Issues fixed in this patch

## 1. Sitemap used fragments as indexable pages

Original sitemap contained:

- `https://heco.app/#products`
- `https://heco.app/#features`
- `https://heco.app/#faq`

URL fragments are not independent HTML documents and should not be treated as canonical search landing pages.

### Fixed

Replaced static `public/sitemap.xml` with `src/app/sitemap.ts`.

The generated sitemap now includes:

- 10 locale homepages
- 10 × 6 localized product pages
- **70 canonical URLs total**
- language alternates for every URL
- `x-default` pointing to English fallback

Do not add `changefreq` or `priority` just to “boost Google”. Keep `lastModified` truthful and update it only when a page changes meaningfully.

---

## 2. Root `/` was not the canonical homepage actually served

The project uses `localePrefix: "always"`; therefore `/` resolves/redirects into a localized URL such as `/en`.

### Fixed

The sitemap and canonicals use locale URLs (`/en`, `/vi`, etc.) instead of treating bare `/` as a canonical content page.

---

## 3. `html lang` was wrong for 8 of 10 languages

Original code mapped only:

- `vi` → `vi`
- everything else → `en`

Therefore French, German, Italian, Russian, Chinese, Lao, Japanese, and Korean pages had `lang="en"`.

### Fixed

`<html lang={locale}>` now reflects the active locale.

Note: Google primarily determines language from visible content, but correct `lang` remains important for browsers, accessibility, assistive technology, and general correctness.

---

## 4. `hreflang` set had no `x-default`

### Fixed

Every localized homepage and product page now emits:

- self alternate
- all 10 language variants
- `x-default` fallback → English version

The sitemap carries the same alternate clusters.

---

## 5. `robots.txt` had misleading and redundant directives

Problems in the old file:

- `Crawl-delay: 1` is not supported by Google.
- Separate `Googlebot` group could make wildcard disallow behavior confusing/inconsistent.
- `Allow: /public/` was meaningless for Next.js public assets because files in `public` are served from `/`.

### Fixed

Replaced it with `src/app/robots.ts` and a single clear rule set:

- allow public site
- disallow `/api/`
- disallow `/search`
- declare sitemap

Keep robots rules simple. `robots.txt` is crawl control, not security and not a reliable noindex mechanism.

---

## 6. Global JSON-LD incorrectly described products on every page

The old locale layout injected three `SoftwareApplication` objects on every page, including pages that were not those product pages.

### Fixed

Removed global product schemas.

Product structured data is now page-specific and exists only on each product route.

---

## 7. `SearchAction` pointed to a route that does not exist

The old `WebSite` schema declared:

`https://heco.app/search?q={search_term_string}`

But the site has no functional search page and robots also blocked `/search`.

### Fixed

Removed `SearchAction` entirely.

Do not add schema for features the site does not actually provide.

---

## 8. `ratingCount` contained download counts

Example source data:

- rating: `4.8`
- downloads: `12.4M`

The old structured data used `downloads` as `AggregateRating.ratingCount`.

That is semantically incorrect: a download is not a rating/review.

### Fixed

Removed `AggregateRating` from structured data until a real review dataset exists.

### If real reviews exist later

Store at least:

```ts
{
  ratingValue: 4.8,
  ratingCount: 12450 // integer count of actual ratings, NOT downloads
}
```

Ensure the same rating evidence is visible to users and can be substantiated.

---

## 9. Review microdata was embedded in static testimonial cards

The original review cards marked every testimonial as Schema.org `Review`/`Rating`.

### Fixed

The testimonial UI remains, but review microdata was removed.

Only restore review/aggregate-rating markup when the testimonials and counts come from a real, auditable review system and satisfy Google structured-data policies.

---

## 10. FAQ structured data had little Google search value for this site

Google no longer regularly shows FAQ rich results for ordinary commercial/software websites.

### Fixed

FAQ content remains visible and useful to users, but `FAQPage` JSON-LD was removed from product pages.

The FAQ itself can still rank as normal page content.

---

## 11. Missing metadata assets

Metadata referenced files that did not exist:

- `/favicon.ico`
- `/icon-192.png`
- `/icon-512.png`
- `/apple-icon.png`
- `/og-image.png`

### Fixed

Generated all of them from the existing Heco visual identity.

This prevents broken favicon/social preview requests.

---

## 12. Root layout architecture was unsafe

The original `src/app/layout.tsx` returned only `children`, while `src/app/[locale]/layout.tsx` emitted `<html>` and `<body>`.

For this internationalized structure, the locale layout should be the root layout.

### Fixed

Removed `src/app/layout.tsx`, allowing `[locale]/layout.tsx` to be the root layout and correctly own `<html>` + `<body>`.

---

## 13. JSON-LD serialization hardened

JSON-LD is now serialized with `<` escaped to `\u003c` before use in `dangerouslySetInnerHTML`.

---

## 14. Meta keywords removed

Google ignores `meta keywords` for web ranking/indexing.

### Fixed

Removed `keywords` from Next.js metadata.

Use query research to shape actual page content, title, headings, anchor text, information architecture, and supporting pages — not a hidden keyword meta tag.

---

## 15. TypeScript build errors were being hidden

Original Next config:

```ts
typescript: {
  ignoreBuildErrors: true,
}
```

This can let broken metadata/routing code reach production.

### Fixed

Removed `ignoreBuildErrors` and restored normal build safety.

---

## 16. Placeholder footer links were crawlable-looking links

Several About/Blog/Legal links were `href="#"`.

### Fixed

Until real pages exist, placeholder entries render as non-link text rather than fake navigation links.

Create real About, Contact, Privacy, Terms, Security, Changelog, and documentation pages before converting them back into links.

---

# P0 — Must verify before production

These statements appear in site copy. **Do not publish them unless you have evidence.**

- “25M+ users/downloads”
- product download figures such as `12.4M`, `8.9M`, etc.
- ratings such as `4.8/5`
- “180+ countries”
- “99.9% uptime” / SLA
- “5 million official drivers”
- “Microsoft Store Verified Publisher”
- “Microsoft Authenticode signed”
- “Softpedia 100% Clean”
- “CNET Editor’s Choice”
- “Chip.vn Top 10 Utility”
- “Tinhte Best Software 2025”
- “GDPR compliant”
- “ISO 27001:2022”
- “Ernst & Young audit 2025”
- company legal name/address
- support availability/response-time claims
- social profile URLs

For every claim, keep a proof record: certificate, external award URL, audit document, analytics export, store listing, review database, or legal/compliance evidence.

If proof does not exist, rewrite the copy to a factual statement you can demonstrate.

---

# P1 — What will matter more for ranking than extra meta tags

## 1. Build query-to-page mapping

Do not try to rank the homepage for everything.

Create one primary search intent per important landing page. Example page families:

- product landing pages
- comparison pages
- troubleshooting guides
- Windows maintenance guides
- privacy/security explainers
- driver troubleshooting documentation
- backup/recovery guides
- uninstall/problem-removal guides

Choose actual topics using Search Console, Keyword Planner, SERP analysis, support tickets, and product telemetry — not guessed keyword density.

---

## 2. Give every product page original evidence

A strong product page should contain information competitors cannot simply copy:

- real screenshots
- supported Windows versions
- changelog/version history
- signed installer hash
- file size
- release date
- exact feature limitations
- benchmark methodology and results, if claiming performance improvements
- known issues
- privacy/data handling details
- uninstall instructions
- support policy
- source/research links when appropriate

This is more valuable than making the page artificially long.

---

## 3. Create trust pages

Before serious commercial SEO, create real pages for:

- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/security`
- `/changelog`
- `/support` or `/docs`

Localize them if the corresponding language version is genuinely maintained.

Do not create thin translated shells purely to increase indexed URL count.

---

## 4. Build topic clusters and internal linking

Example architecture:

```text
/en
├─ /products/heco-cleaner
│  ├─ relevant cleanup guides
│  ├─ Windows storage troubleshooting
│  └─ safe cleanup documentation
├─ /products/heco-driver
│  ├─ driver troubleshooting guides
│  ├─ rollback documentation
│  └─ OEM-driver explainers
└─ ...
```

Every important page should be discoverable through normal HTML links and should link to relevant supporting content.

---

## 5. Earn external authority naturally

Technical SEO only makes pages eligible and understandable. Competitive rankings commonly require independent validation and discovery:

- useful original tools/data
- real product reviews
- reputable software directories
- relevant editorial coverage
- technical write-ups
- partnerships
- citations from documentation/community resources

Do not buy bulk backlinks, use PBNs, exchange links at scale, or manufacture reviews.

---

# P1 — Multilingual requirements

For each locale:

1. Keep a stable unique URL.
2. Translate the full primary content, not only navigation boilerplate.
3. Use self canonical for each genuine translation.
4. Include reciprocal `hreflang` cluster.
5. Include `x-default` fallback.
6. Do not auto-force locale based solely on IP.
7. Let users switch language with crawlable navigation.
8. Localize title, description, headings, FAQs, CTA copy, and important images where necessary.
9. Remove a locale from indexing if it is incomplete or machine-translated without review and provides little value.

---

# P1 — Product structured data policy

Current patch deliberately favors **truth over rich-result eligibility**.

Google's SoftwareApplication rich result requires a rating/review signal in addition to other required properties. If Heco does not yet have a real review dataset, do not invent one just to pass the Rich Results Test.

When the data is real, add:

- `name`
- `offers.price`
- `aggregateRating` OR `review`
- supported recommended properties such as OS/category

Then validate with Rich Results Test and URL Inspection.

---

# P1 — Performance / Core Web Vitals

Do not optimize for a Lighthouse vanity score alone.

Measure field data after deployment:

- LCP
- INP
- CLS
- server latency/availability
- real-device mobile behavior

Priority optimizations:

- keep hero/LCP asset small and preload only if justified
- avoid unnecessary client JavaScript
- avoid large third-party tags
- reserve image dimensions
- use Next image/font optimization correctly
- cache immutable assets/CDN responses
- keep APIs/server stable

---

# P1 — Search Console launch procedure

Immediately after production deployment:

1. Verify Domain property in Google Search Console.
2. Submit `https://heco.app/sitemap.xml`.
3. Inspect `/en` and `/vi`.
4. Inspect at least one product URL for every page template.
5. Verify Google-selected canonical.
6. Verify rendered main content.
7. Check hreflang output in HTML/sitemap.
8. Check robots and indexability.
9. Run Rich Results Test on product pages.
10. Monitor Page Indexing, Manual Actions, Security Issues, Core Web Vitals, and Performance reports.
11. Compare query impressions/CTR by landing page.
12. Improve pages using actual query data rather than guessing.

---

# P2 — CI/CD SEO regression gates

Recommended automated checks:

- no public page accidentally has `noindex`
- no canonical points to localhost/staging
- no canonical chain/redirect target
- sitemap URLs return 200
- sitemap contains only indexable canonical URLs
- robots production file exists and sitemap URL is valid
- titles/descriptions are route-aware
- no duplicate locale canonicals
- `hreflang` cluster contains self + reciprocal variants
- no `href="#"` in production navigation
- no missing favicon/OG assets
- structured data parses as JSON
- JSON-LD contains no fabricated review counts
- no new 4xx/5xx links from crawlable navigation
- production build cannot ignore TypeScript errors

---

# Definition of “SEO-ready” for Heco

A release is SEO-ready only when all of these are true:

- [ ] all important public routes return 200
- [ ] correct locale content is server-rendered/pre-rendered
- [ ] canonical points to the current localized URL
- [ ] hreflang cluster is complete
- [ ] sitemap contains every intended canonical page and no fragment URLs
- [ ] robots does not block important content/assets
- [ ] important navigation uses real links
- [ ] metadata/social assets exist
- [ ] structured data describes only the current visible page
- [ ] review/rating schema is backed by real data
- [ ] business/compliance/award claims have evidence
- [ ] mobile UX is complete
- [ ] CWV field data is acceptable
- [ ] Search Console has no critical indexing/manual-action/security problems
- [ ] every target query has a page that satisfies its intent better than competing results

---

# Official references used for this audit

Primary sources to re-check when SEO behavior changes:

- Google Search Essentials
- Google SEO Starter Guide
- Google Crawling & Indexing documentation
- Google supported meta tags documentation
- Google international / hreflang documentation
- Google structured data policies and SoftwareApplication documentation
- Google Core Web Vitals / page experience documentation
- Next.js 16 metadata file conventions (`robots.ts`, `sitemap.ts`)
- Next.js 16 root layout documentation
- Next.js 16 JSON-LD guide

Review these rules at least every 6 months and after major Google/Next.js changes.
