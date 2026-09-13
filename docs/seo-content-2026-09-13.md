# SEO content build, bluegrassadvisorygroup.com

Date: 2026-09-12, shipped 23:45 ET
Scope: the ten content gaps listed in `docs/seo-report-2026-09-11.md`. All ten are built,
committed, pushed, and serving 200 from the live domain.

## What shipped

Eight static pages and two articles. Every page routes its metadata through `pageMeta()` in
`src/lib/metadata.ts`, so each one carries its own canonical, its own social card text, the site
Open Graph image, and `summary_large_image`.

| Path | Title | Source of the copy |
|---|---|---|
| `/ai-consulting-lexington-ky` | AI Consulting in Lexington, KY | Existing site copy, Tier 0 client-facing section of the engagement catalog, county geography |
| `/ai-assessment` | What an AI Assessment Involves | Engagement catalog, Tier 0 and Tier 2 client-facing sections only |
| `/ai-for-hospitality` | AI for Hospitality Businesses | Capabilities playbook "what a client gets" paragraphs, existing About copy |
| `/ai-for-small-business-kentucky` | AI for Kentucky Small Business | Tier 1 client-facing built-thing menu, Tier 0 walk-away path |
| `/ai-consulting-cost` | What Drives AI Consulting Cost | Scope drivers, stated generically. No figure of any kind |
| `/faq` | Frequently Asked Questions | Ten questions, each answer traced to the catalog, the CORTEX case study, or live site copy |
| `/multi-location-dashboards` | Multi-Location Dashboards | `services/dashboards` deliverables and audience |
| `/ai-tools-we-build` | AI Tools We Build Most Often | Capabilities playbook, including the honest limitation on each |
| `/insights/choosing-an-ai-consultant` | How to Choose an AI Consultant | Case study section 7, engagement catalog, live site copy |
| `/insights/automating-our-own-back-office` | What We Automated in Our Own Back Office First | Capabilities playbook sections 1 to 5, sanitized |

New shared component: `src/components/related-links.tsx`. Eight call sites, so it earns its place.

## Verification

`npx next build` passed. 36 static pages generated, no type or lint errors.

Every new page was then parsed out of `.next/server/app`. Uniqueness was checked against all 28
built HTML pages, not just against the new ones.

| Path | One H1 | Unique title | Unique description | Self-canonical | og:image | twitter:card | Title chars | Desc chars |
|---|---|---|---|---|---|---|---|---|
| /ai-consulting-lexington-ky | PASS | PASS | PASS | PASS | PASS | PASS | 57 | 149 |
| /ai-assessment | PASS | PASS | PASS | PASS | PASS | PASS | 57 | 150 |
| /ai-for-hospitality | PASS | PASS | PASS | PASS | PASS | PASS | 56 | 143 |
| /ai-for-small-business-kentucky | PASS | PASS | PASS | PASS | PASS | PASS | 57 | 153 |
| /ai-consulting-cost | PASS | PASS | PASS | PASS | PASS | PASS | 57 | 149 |
| /faq | PASS | PASS | PASS | PASS | PASS | PASS | 53 | 147 |
| /multi-location-dashboards | PASS | PASS | PASS | PASS | PASS | PASS | 52 | 153 |
| /ai-tools-we-build | PASS | PASS | PASS | PASS | PASS | PASS | 55 | 149 |
| /insights/choosing-an-ai-consultant | PASS | PASS | PASS | PASS | PASS | PASS | 101 | 146 |
| /insights/automating-our-own-back-office | PASS | PASS | PASS | PASS | PASS | PASS | 103 | 145 |

Title lengths include the ` | Bluegrass Advisory Group` suffix the layout template appends. The
eight static pages sit inside the 60-character display limit. The two article titles run past it
and will be truncated in a search result, which matches the three existing posts. Shortening them
would mean retitling published-style headlines for 20 characters of display, and that call is
Phil's.

The verification script is at
`C:\Users\PHILIP~1\AppData\Local\Temp\claude\E--Cortex\972e6456-4374-4508-948a-93fb2aa31a2d\scratchpad\verify_pages.py`.
It exits non-zero on any failure.

### Sitemap

Served from a local production build on port 3211, then re-checked live.

```
GET /sitemap.xml   status=200   27 <loc> entries
```

The arithmetic: 14 static pages before this work, plus 8 new static pages, is 22. Plus 3 existing
posts and 2 new posts is 27. It was 17 before. All ten new paths appear in the built file.

### Structured data

The Lexington page emits a `Service` node with its own `@id` and
`provider: {"@id": "https://bluegrassadvisorygroup.com/#organization"}`, which is the same way the
home page's `WebSite` node already references the organization. Verified in the live HTML.

This is a deliberate deviation from the brief, which asked for the location page to reuse the
organization `@id` itself. Emitting a second `ProfessionalService` under
`.../#organization` with different properties would give the graph two conflicting definitions of
one node. The `ProfessionalService` identity stays on the home page where it already lives, and
the location page points at it. The graph is connected either way.

It is also a service-area business with no address a customer visits, so the node carries
`areaServed` for Lexington and the seven surrounding counties and no street address, no opening
hours, and no geo radius.

The FAQ page emits `FAQPage` with 10 `Question` nodes, confirmed in the live HTML. The array that
renders the visible answers is the same array that builds the schema, so the two cannot drift
apart.

### Copy sweep

Run in Python over `src/app/**/*.tsx`, `src/components/**/*.tsx` and `content/**/*.mdx`, because
`grep -P` exits 2 on this box in a non-UTF8 locale and prints nothing, which reads exactly like a
clean pass.

Zero em dashes, en dashes, or emoji in any new file. Six tells were caught and fixed before
commit: two "X, not Y" tails, two instances of the "it keeps" construction, one "settles", and
"operator" in a meta description. One British spelling (`licence`) was caught and fixed.

The sweep also flags existing em dashes in `src/app/page.tsx` and `src/app/services/page.tsx`
service descriptions, plus the three existing MDX article titles. Those are pre-existing copy the
9/11 pass deliberately left alone, and they are still outstanding.

## Live status

Fetched from the production domain after the Vercel deploy landed, 2026-09-12 23:45 ET. The first
two polls returned 404, which was the deploy still building.

| URL | Status | Canonical correct |
|---|---|---|
| https://bluegrassadvisorygroup.com/ai-consulting-lexington-ky | 200 | yes |
| https://bluegrassadvisorygroup.com/ai-assessment | 200 | yes |
| https://bluegrassadvisorygroup.com/ai-for-hospitality | 200 | yes |
| https://bluegrassadvisorygroup.com/ai-for-small-business-kentucky | 200 | yes |
| https://bluegrassadvisorygroup.com/ai-consulting-cost | 200 | yes |
| https://bluegrassadvisorygroup.com/faq | 200 | yes |
| https://bluegrassadvisorygroup.com/multi-location-dashboards | 200 | yes |
| https://bluegrassadvisorygroup.com/ai-tools-we-build | 200 | yes |
| https://bluegrassadvisorygroup.com/insights/choosing-an-ai-consultant | 200 | yes |
| https://bluegrassadvisorygroup.com/insights/automating-our-own-back-office | 200 | yes |
| https://bluegrassadvisorygroup.com/sitemap.xml | 200 | 27 entries |

Re-fetched at 23:48 ET after the final push, against the deploy that is live now:
`/ai-consulting-lexington-ky` returns 200 and `/faq` still serves its own canonical. The inbound
links were checked in live HTML at the same time: `/services` renders all eight guide hrefs, the
home page renders the footer FAQ link and the Lexington link.

## Internal linking

Each new page links to at least two existing pages in its body copy and in a closing link block.
Inbound links were kept small and in-idiom:

- `src/app/services/page.tsx` gained one section listing all eight new static pages.
- `src/components/footer.tsx` gained an FAQ link in the Company column, which puts it on every page.
- `src/app/page.tsx` links the word Lexington in the about strip to the location page.
- The two articles are linked from `/insights` automatically through `getAllPosts()`. The home
  page's featured-post array is hardcoded and still shows the original three.

## FAQ rich results: the 9/11 report's claim is dead, not just stale

The 9/11 report said an FAQ page "earns expanded search results." That is no longer true for
anyone. FAQ rich results stopped appearing in Google Search on 7 May 2026, and Google is removing
the FAQ search appearance, the rich result report, and Rich Results Test support in June 2026,
with Search Console API support gone in August 2026. The August 2023 restriction had already
limited them to government and health sites; the 2026 change ended it for those too.

The page ships with `FAQPage` markup anyway. Other parsers still read it, it costs nothing, and
the page earns its place on the reader's terms rather than on a rich result. No claim about
expanded search results appears anywhere on the site.

Sources: [Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/),
[Schema App](https://www.schemaapp.com/schema-app-news/changes-to-faq-and-how-to-rich-results-on-google/).

## What was deliberately not published

**Everything the engagement catalog marks `[INTERNAL]`.** The catalog states that those sections
are BAG operating logic and are never shown to clients. That covers the 9-phase Discovery process,
the 7-step Phase 4 analysis framework, the 5-component framework, the three Discovery shapes and
their price bands, the 16-category rubric, the named maturity arc, and the anchor-constraint
sentence. The assessment page is built only from the client-facing blocks, which is why it
describes what a client sees happening rather than how the analysis is run.

**Anything a price could be derived from.** No figures, no hour counts, no comparison ranges, no
payment splits, on any page.

**Internal system detail**, per `external-confidentiality.md`. No system names, no stack, no
counts of files, workflows, or agents beyond the "35 workflows" figure already published on the
live site.

**Client names.** No client is named on any new page. PFSA was available and was not needed.

## Questions rather than claims

Three things I could not fully source, and how each was handled.

1. **"We have never had to walk something back."** On `/ai-tools-we-build` and in the back-office
   article. The capabilities playbook says no automated email has ever gone to a prospect without
   explicit approval and records zero incidents from runaway automation. That supports the claim
   as of July 2026. Phil should confirm it still holds before it sits on a public page indefinitely.
2. **The county list on the Lexington page.** Fayette plus seven adjacent counties, chosen as
   verifiable geography around Lexington. Nothing in the source documents defines a service-area
   boundary. If Phil would not drive to Franklin or Madison County, tell me and I will trim it.
3. **"Accounts are in your name."** On the FAQ ownership answer. Sourced from the Standard
   Deployment ownership matrix and the case study line about one credential to rotate at the end.
   It reads as a promise about every engagement, and the source describes the standard rather than
   a universal guarantee. Worth Phil's eye.

One rule tension worth naming rather than burying: `bluegrass-landing/CLAUDE.md` says "No case
studies or testimonials," and the 9/11 report asked for a second case-style article. A post in the
Case Study category is already live and is about BAG's own operation rather than a client's. The
new article follows that precedent exactly, about our own systems, no client named. If Phil reads
the rule more strictly than that, the fix is to recategorize the post.

## Only Phil can do these

The first two carry over from the 9/11 report and are still open. They gate whether any of this
gets found.

1. **Google Search Console.** Verify the domain, submit `sitemap.xml`, then use URL Inspection to
   request indexing on `/ai-consulting-lexington-ky` and `/faq` specifically. The full steps are in
   `docs/seo-report-2026-09-11.md`.
2. **Google Business Profile for Lexington.** A location page and a Business Profile reinforce each
   other. The location page is now live and the profile is not, so half the signal is missing.
3. **The Cloudflare AI crawler decision.** ClaudeBot, GPTBot, CCBot and several others are still
   disallowed by the zone's managed robots rules. The FAQ page and the cost page are exactly the
   kind of content an AI assistant would cite when someone asks it what AI consulting costs in
   Kentucky, and those assistants currently cannot read the site. Nothing was changed. The decision
   is a business call that lives in the Cloudflare dashboard.
4. **The LinkedIn and Business Profile URLs**, once they exist, so they can be added to the
   organization schema as `sameAs`.

## Commits

```
31103c7  add location and audience pages for Lexington, hospitality, and Kentucky small business
4fa9203  add assessment, cost, FAQ, tools, and multi-location dashboard pages
b356e2e  add two insights articles on choosing a consultant and automating our own work
1aade3b  link the new pages from services, the footer, the home page, and the sitemap
```

Pushed to `origin/main` at `2eb30b1..1aade3b`.

## Still open from the 9/11 report

Two items from that report were not in this scope and remain undone. The three existing MDX
article titles and descriptions still carry em dashes, which show in the browser tab and the
social card. And the blog cadence is the thing that would help more than any single new page: the
three original posts are from January and February 2026, and the two added tonight are the first
since.
