# SEO / Search Indexing Engineering Standard — 2026 Final

> Purpose: coding + content + deployment standard for Google-first websites.
> Applies to modern SSR/SSG/hybrid frameworks, including Next.js.

## 0. The rule above every other rule

**No meta tag, schema, sitemap, backlink package, “AI SEO trick”, or code snippet guarantees Google #1.**

The engineering objective is:

```text
Discoverable
→ Crawlable
→ Renderable
→ Indexable
→ Correct canonical/locale
→ Relevant to query intent
→ Helpful and trustworthy
→ Fast and usable
→ Externally credible
→ Continuously measured and improved
```

A site can be technically perfect and still rank poorly if its content and authority are weaker than competing results.

---

# 1. Priority model

Use these priorities when work conflicts.

## P0 — Eligibility / correctness

- HTTP 200 for real public pages
- no accidental robots/noindex block
- stable URLs
- correct canonical
- correct redirects/status codes
- crawlable HTML links
- meaningful rendered content
- no soft 404
- no fake structured data
- HTTPS

## P1 — Relevance / usefulness / trust

- satisfy the search intent
- original first-hand information
- descriptive title and heading
- accurate entity/product facts
- clear authorship/business identity where relevant
- internal linking
- multimedia/evidence
- strong mobile UX

## P2 — Search appearance / efficiency

- meta descriptions
- structured data for eligible features
- Open Graph/Twitter cards
- sitemaps
- performance tuning
- image/video SEO
- log analysis

## P3 — Growth

- original research/assets
- PR and real citations
- quality editorial links
- brand demand
- recurring content refreshes
- conversion and UX optimization

---

# 2. MUST NOT — common SEO myths and obsolete rules

Do **not** create engineering standards requiring any of these:

- exact keyword density such as `1–2%`
- “LSI keyword” quotas
- title must be exactly `50–60 characters`
- meta description must be exactly `150–160 characters`
- article must have `1000+` words
- exactly one H1 because “Google requires it”
- `meta keywords`
- `rel="next"` / `rel="prev"` for Google indexing
- `crawl-delay` for Googlebot
- `priority` / `changefreq` as Google ranking boosters
- Lighthouse SEO score 100 as a ranking guarantee
- mass disavow of links by default
- mass FAQ schema on normal commercial sites expecting FAQ rich results
- `llms.txt` as a Google ranking signal
- thousands of near-duplicate AI pages
- fake reviews, ratings, awards, certifications, authors, offices, or statistics

---

# 3. URL architecture

## MUST

Every important page must have its own stable HTTP URL.

Good:

```text
/products/heco-cleaner
/guides/free-disk-space-windows-11
/docs/driver-rollback
```

Avoid relying on fragment routes for independent content:

```text
/#products
/#faq
```

Fragments can be useful for in-page navigation, but do not put them in XML sitemaps as separate pages.

## SHOULD

- lowercase paths
- hyphen-separated words
- human-readable slugs
- no session IDs
- no tracking parameters in canonical links
- no unnecessary filter/sort URL explosion
- consistent trailing slash convention

---

# 4. HTTP behavior

Use correct status codes:

```text
200  real page
301/308 permanent move
302/307 temporary move
404  not found
410  intentionally gone (optional)
5xx  real server failure
```

Never return a “Not found” page with HTTP 200.

Do not redirect every deleted URL to the homepage.

When an equivalent replacement exists, redirect directly to it with no chain.

---

# 5. Rendering strategy

For public pages that need search visibility:

Preferred:

1. SSG for stable content
2. SSR for dynamic content
3. hybrid/ISR where appropriate
4. client-only rendering only when technically justified

## MUST

The main information must be available without a user click.

Important route content should not depend on:

- opening a modal
- scrolling to trigger a data request
- login
- client-side API that frequently fails
- blocked JavaScript/CSS

A framework can use Client Components while still server-pre-rendering content; verify the actual HTML/rendered output rather than judging only by file directives.

---

# 6. HTML and semantic structure

Use native semantic HTML wherever possible:

```html
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>
<h1>…<h6>
<ul>
<ol>
<table>
<figure>
<figcaption>
<time>
<a href="…">
```

Heading structure should describe document hierarchy. A single primary H1 is a useful team convention, but not a magical ranking rule.

Never use headings only to make text visually large.

---

# 7. Internal linking

## MUST

Important destinations need real crawlable links:

```html
<a href="/products/heco-cleaner">Heco Cleaner</a>
```

Do not make primary navigation only:

```html
<div onclick="navigate(...)" />
```

## SHOULD

- no orphan important pages
- descriptive anchors
- breadcrumbs where useful
- related pages linked contextually
- canonical URLs used consistently in internal links
- important content reachable from logical hubs/categories

---

# 8. Titles

Each indexable page should have a unique, descriptive title.

Good principles:

- accurately describe the page
- use natural wording users recognize
- differentiate similar pages
- include brand where useful
- avoid repetition and stuffing

Do not enforce an exact character limit. Search display truncates by available width and Google may generate a different title link.

---

# 9. Meta descriptions

Write a useful unique description for important pages.

A good description:

- summarizes the page
- communicates a concrete benefit/fact
- matches visible content
- reads naturally

Do not treat a fixed character count as a ranking rule. Google may use page content instead of the supplied description.

---

# 10. Meta keywords

Do not spend time generating:

```html
<meta name="keywords" ...>
```

Google Search ignores it for indexing/ranking.

Keyword/query research belongs in the content strategy, not in a hidden tag.

---

# 11. Canonicalization

Every important canonical page should normally self-canonicalize.

Example:

```html
<link rel="canonical" href="https://example.com/en/products/heco-cleaner">
```

Canonical signals must agree:

- redirect behavior
- canonical tag
- sitemap URL
- internal links
- hreflang cluster

Do not canonicalize unrelated content to a stronger page.

Do not use fragment URLs as canonical targets.

---

# 12. robots.txt

Use `robots.txt` to manage crawling, not security.

Simple example:

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /internal-search/
Sitemap: https://example.com/sitemap.xml
```

## Do not

- use `crawl-delay` expecting Googlebot to honor it
- block a URL in robots and expect Google to read its `noindex` meta
- put secrets behind robots rules
- block required CSS/JS accidentally

Private content must use authentication/authorization.

---

# 13. noindex

For an accessible HTML page that should not appear in Search:

```html
<meta name="robots" content="noindex,follow">
```

Google must be able to crawl the page to see the directive.

For non-HTML resources, use `X-Robots-Tag` where appropriate.

---

# 14. XML sitemap

A sitemap is a discovery/canonicalization support mechanism, not a ranking booster.

## Include only

- 200 URLs
- intended canonical pages
- indexable pages
- stable production URLs

## Exclude

- fragments
- 404/410
- redirect URLs
- `noindex`
- staging URLs
- session/tracking URLs
- arbitrary sort/filter duplicates

Use accurate meaningful `lastmod` where you can maintain it.

Do not update `lastmod` daily if page content did not materially change.

---

# 15. Multilingual SEO / hreflang

When a page has language variants, each variant should have its own URL.

For every cluster:

- include every supported variant
- include the current page itself
- make annotations reciprocal
- use fully-qualified URLs
- use valid language/region codes
- add `x-default` when there is a clear fallback
- keep canonical self-referential within each genuine translation

Example:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
<link rel="alternate" hreflang="vi" href="https://example.com/vi/page">
<link rel="alternate" hreflang="ja" href="https://example.com/ja/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/en/page">
```

Do not create ten localized URLs if eight contain mostly untranslated boilerplate.

---

# 16. Structured data

Use JSON-LD when appropriate.

## MUST

Structured data must match visible, factual page content.

Never fabricate:

- reviewCount
- ratingValue
- prices
- stock status
- authors
- awards
- certifications
- business details

Do not inject product schema site-wide. Place it on the matching product page.

Do not declare a search action, store listing, office, or support channel that does not exist.

Validate syntax with Rich Results Test, but remember: passing validation does not guarantee a rich result.

---

# 17. SoftwareApplication schema

For software pages, mark up real data such as:

- name
- URL
- operating system
- application category
- current version
- offer/price
- publisher

For Google's SoftwareApplication rich result, a real rating/review is required alongside other required fields.

If no real ratings exist, **do not invent them** merely to become eligible.

---

# 18. Reviews and ratings

A download count is not a rating count.

Bad:

```json
{
  "ratingValue": 4.8,
  "ratingCount": "12.4M"
}
```

when `12.4M` actually means downloads.

If reviews are displayed:

- identify the source
- store real review records
- count real ratings
- expose the evidence visibly
- moderate fraud/spam
- avoid self-created testimonial markup presented as independent aggregate ratings

---

# 19. FAQ content

FAQ sections can be excellent normal content when they answer real user questions.

Do not add FAQPage schema merely expecting expanded FAQ SERP results for an ordinary commercial site; Google generally limits those rich results to authoritative government/health sites.

---

# 20. Images

For meaningful images:

```html
<img
  src="/image.webp"
  alt="Specific useful description"
  width="1200"
  height="800"
>
```

## SHOULD

- use AVIF/WebP when practical
- give intrinsic dimensions
- optimize compression
- lazy-load below-fold images
- do not lazy-load the LCP hero image blindly
- make important images crawlable
- use descriptive filenames where natural
- use empty `alt=""` for purely decorative imagery

---

# 21. Core Web Vitals

Measure real-user field data, not only lab scores.

Current good thresholds to target at the 75th percentile:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Do not assume a perfect CWV/Lighthouse score automatically produces top rankings. Page experience is part of a broader ranking system.

---

# 22. JavaScript budget

For SEO-critical templates:

- minimize client JavaScript
- code-split non-critical features
- defer third-party tags
- avoid hydration failures
- keep APIs reliable
- render meaningful loading/error states
- avoid client-only metadata

Set a team regression budget for JS and LCP changes in pull requests.

---

# 23. Mobile

The mobile experience must contain the same essential information as desktop:

- primary text
- internal links
- headings
- structured data
- alt text
- metadata equivalents

Avoid intrusive interstitials that prevent immediate access to content.

---

# 24. Content quality

Before publishing, ask:

- Does this page answer a real user need?
- Does it contain original information or experience?
- Is it materially better than a rewritten summary of other results?
- Are claims provable?
- Is the author/company/source clear where trust matters?
- Is it accurate and updated?
- Can the visitor complete the task they searched for?

Google does not have a preferred minimum word count. Use the amount needed to satisfy the intent fully.

---

# 25. AI-generated content

AI may help with research, drafts, translation, QA, and structure.

Before publishing, verify:

- facts
- citations/source quality
- product facts
- dates
- originality
- usefulness
- copyright
- translation quality
- hallucinations

Never mass-produce low-value pages simply to capture query variants.

---

# 26. E-E-A-T / trust

Do not treat E-E-A-T as a hidden meta score.

Demonstrate trust through reality:

- accurate About/Contact pages
- valid business identity
- clear policies
- authors with relevant experience when useful
- first-hand screenshots/data
- reliable sources
- transparent updates/corrections
- security/privacy documentation
- verifiable awards/certifications only

---

# 27. Product/software sites: trust checklist

Before publishing statements such as:

- “25 million users”
- “ISO 27001”
- “audited by …”
- “Editor’s Choice”
- “99.9% uptime”
- “Microsoft verified”

keep evidence and link to it where appropriate.

Unverifiable trust claims are worse than omitting the badge.

---

# 28. Useful software content moat

Software sites should publish information that only the maker can reliably provide:

- release notes
- version history
- hashes/signatures
- exact requirements
- screenshots
- privacy behavior
- data collection details
- known issues
- troubleshooting
- benchmarks with methodology
- security advisory process
- uninstall/recovery instructions
- compatibility matrices

This creates unique value beyond generic marketing copy.

---

# 29. Internal topic architecture

Organize supporting content into real topic clusters.

Example:

```text
Product page
├─ Setup guide
├─ Troubleshooting
├─ Comparison/decision guide
├─ Safety/privacy explanation
├─ Changelog
└─ FAQ/support docs
```

Link them naturally in both directions.

---

# 30. Backlinks / promotion

Pursue links and mentions because the material is useful, newsworthy, or worth citing.

Good sources can include:

- technical publications
- real software directories
- independent reviews
- communities
- partners
- research citations
- documentation references

Avoid:

- bulk paid links
- PBNs
- automated link blasts
- scaled reciprocal exchanges
- comment/forum spam

Do not routinely disavow links merely because a third-party SEO tool calls them “toxic”.

---

# 31. Search Console

After launch:

- verify the domain property
- submit sitemap
- inspect representative URLs
- check Google-selected canonical
- check rendered page
- monitor page indexing
- monitor performance queries/pages
- monitor Core Web Vitals
- monitor manual actions/security issues

Use Search Console query data to decide what to improve next.

---

# 32. Logs and observability

For medium/large sites, analyze server/CDN logs to see:

- Googlebot request patterns
- 404/5xx trends
- crawl waste
- slow routes
- unexpected parameter URLs
- redirects/chains

Verify Googlebot before treating arbitrary user agents as real Google crawlers.

---

# 33. CI/CD SEO tests

Production checks should fail when:

- homepage has noindex
- sitemap URL is not 200
- sitemap contains redirects/404s
- canonical points to staging/localhost
- localized pages share the wrong canonical
- important links are JavaScript-only
- required social/favicons are missing
- structured data is invalid JSON
- review schema uses fake data
- route metadata disappears
- public pages return 5xx

Never hide TypeScript/build errors just to ship.

---

# 34. What “Top 1 strategy” actually means

There is no universal Top-1 switch. For each target query:

1. understand intent and SERP format
2. select/create the best matching landing page
3. provide more useful/original evidence than competitors
4. make the page technically unambiguous
5. link it from relevant internal hubs
6. earn independent mentions/links
7. measure impressions, CTR, engagement/conversions, and query variants
8. update the page from real data
9. repeat over months, not once

For a new brand, ranking #1 for branded queries is usually a different problem from ranking #1 for highly competitive non-brand software queries.

---

# 35. Heco / Next.js 16 implementation baseline

Recommended project files:

```text
src/app/
├─ robots.ts
├─ sitemap.ts
└─ [locale]/
   ├─ layout.tsx        # locale root layout with html/body
   ├─ page.tsx
   └─ products/
      └─ [slug]/page.tsx

public/
├─ favicon.ico
├─ icon.svg
├─ icon-192.png
├─ icon-512.png
├─ apple-icon.png
├─ og-image.png
└─ manifest.webmanifest
```

For `localePrefix: "always"`, canonical homepage URLs should be locale-prefixed, e.g. `/en` and `/vi`.

Generate sitemap from the same route/product data used by the app to prevent drift.

---

# 36. Release checklist

## Technical

- [ ] production HTTPS
- [ ] canonical host chosen
- [ ] 200/3xx/404 behavior correct
- [ ] no soft 404s
- [ ] no redirect chains
- [ ] robots correct
- [ ] sitemap generated from real routes
- [ ] sitemap contains no fragments
- [ ] no accidental noindex
- [ ] CSS/JS required to render content is crawlable
- [ ] root layout valid
- [ ] metadata assets exist

## Page metadata

- [ ] unique useful title
- [ ] useful meta description
- [ ] self canonical
- [ ] Open Graph correct
- [ ] locale alternates correct
- [ ] x-default where appropriate

## Content

- [ ] intent clear
- [ ] primary answer/product facts above the fold
- [ ] original evidence
- [ ] claims verified
- [ ] no copied/scaled low-value copy
- [ ] contextual internal links
- [ ] image alt text appropriate

## Structured data

- [ ] only relevant page-specific entities
- [ ] factual visible data
- [ ] no fake rating/review
- [ ] no nonexistent SearchAction/features
- [ ] passes parser/Rich Results validation when applicable

## Operations

- [ ] Search Console verified
- [ ] sitemap submitted
- [ ] representative URL Inspection done
- [ ] field CWV monitored
- [ ] 404/5xx monitoring active
- [ ] security/manual action monitoring active

---

# 37. Sources of truth

When rules conflict, prefer current primary documentation from:

- Google Search Central / Search Essentials
- Google Crawling & Indexing docs
- Google structured data documentation
- Google international/hreflang documentation
- Google Core Web Vitals/page experience documentation
- official Next.js docs for framework behavior

Review this standard after major Google Search changes or framework upgrades, and at least twice per year.
