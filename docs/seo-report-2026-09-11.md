# SEO pass, bluegrassadvisorygroup.com

Date: 2026-09-11
Scope: technical and on-page SEO for the Next.js marketing site. No copy rewrites beyond
titles, meta descriptions, and structured data.

## What was wrong

The site already had a sitemap, a robots file, per-page titles, canonicals on most pages, and a
generated Open Graph card. Four defects sat underneath that and only showed up in the built HTML.

1. **Every page shared the home page's social card text.** Next.js replaces the whole `openGraph`
   object when a page sets one and inherits it whole when a page does not. Twelve pages inherited
   it, so a shared link to the dashboards page previewed as "Bluegrass Advisory Group: AI
   Integration & Business Operations" with the home page's description and `og:url`.
2. **Blog posts had no Open Graph image and no large Twitter card.** They were the only pages
   setting their own `openGraph`, which dropped the inherited image, `og:url`, `og:site_name` and
   `og:locale`, and left the Twitter tags pointing at the home page.
3. **The contact page had no metadata at all.** It is a client component, so it inherited the root
   title, the root description, and the root canonical. Its canonical told Google that
   `/contact` is a duplicate of the home page.
4. **Three showroom pages had zero H1.** The demos are step wizards whose visible heading changes
   per step, so the crawled HTML had only H2s.

## What changed

| File | Change |
|---|---|
| `src/lib/metadata.ts` | Added a `pageMeta()` helper that returns title, description, canonical, and complete `openGraph` and `twitter` objects. Removed the root-level canonical that was leaking to pages without one. Retitled the site default and trimmed the root description to 156 characters. |
| `src/app/page.tsx` | Added a metadata export with its own canonical. Organization schema is now `["Organization","ProfessionalService"]` with `legalName`, `founder`, `foundingDate` and an `@id`. Added a `WebSite` node that references the organization. |
| `src/app/contact/layout.tsx` | New. Carries the contact page's metadata, because `contact/page.tsx` is a client component and cannot export it. |
| `src/app/about/page.tsx`, `insights/page.tsx`, `services/*` (5), `showroom/*` (5) | Metadata routed through `pageMeta()`. Descriptions rewritten where they carried an em dash or a stock three-item cadence. |
| `src/app/insights/[slug]/page.tsx` | `generateMetadata` routed through `pageMeta()` with `article` and `publishedTime`, which restores the image and the large card. |
| `src/app/showroom/{report,website,dashboard}/page.tsx` | Each shim now renders a screen-reader H1 above the demo. No visual change. |
| `src/app/opengraph-image.tsx` | Alt text rewritten without an em dash. |
| `src/app/not-found.tsx` | Added a description. It stays `noindex`. |

Files deliberately untouched: `src/app/contact/page.tsx` and `src/app/api/intake/route.ts`.

## Verification

`npx next build` passed. Every built page was then parsed out of `.next/server/app`:

| Check | Result across 18 built pages |
|---|---|
| Unique `<title>` | 18 of 18 |
| Unique meta description | 18 of 18 |
| Correct self-canonical | 17 of 17 indexable pages. The 404 has none by design |
| `og:image` present | 18 of 18 |
| `twitter:card = summary_large_image` | 18 of 18 |
| Exactly one H1 | 18 of 18 |
| Images with alt text | 2 of 2. There are no bare `<img>` tags |

Served from a local production build:

```
GET /opengraph-image   status=200 type=image/png bytes=36869
GET /robots.txt        User-Agent: * / Allow: / / Disallow: /api/ / Sitemap: https://bluegrassadvisorygroup.com/sitemap.xml
GET /sitemap.xml       17 <loc> entries, 14 static pages + 3 posts
```

Live evidence after the push is at the foot of this file.

## Steps only Phil can do

Both need a Google login, so neither was attempted.

**1. Google Search Console, verify the domain and submit the sitemap.**

1. Go to `search.google.com/search-console` and sign in as `phil@bluegrassadvisorygroup.com`.
2. Add property, choose **Domain** (not URL prefix), enter `bluegrassadvisorygroup.com`.
3. Google shows a TXT record that starts `google-site-verification=`. Copy it.
4. In Cloudflare, open the `bluegrassadvisorygroup.com` zone, then DNS, then Add record.
   Type `TXT`, Name `@`, Content the string from step 3, TTL Auto. Save.
5. Back in Search Console, click Verify. If it fails, wait five minutes and retry. DNS
   propagation is the usual reason.
6. Once verified, open Sitemaps in the left menu, enter `sitemap.xml`, click Submit.
7. Open URL Inspection, paste `https://bluegrassadvisorygroup.com/`, and click Request Indexing.
   Repeat for `/services` and `/contact`. The rest will be found through the sitemap.

**2. Google Business Profile for Lexington.**

1. Go to `business.google.com` and sign in as `phil@bluegrassadvisorygroup.com`.
2. Search for "Bluegrass Advisory Group" first. If a listing already exists, claim it rather than
   creating a second one. Duplicates are hard to merge later.
3. Business name `Bluegrass Advisory Group`. Category `Business management consultant`. A good
   second category is `Website designer`.
4. This is a service-area business. Answer no to "do you have a location customers can visit",
   then set the service area to Lexington and the surrounding counties. The mailing address stays
   hidden.
5. Phone `(859) 314-3051`. Website `https://bluegrassadvisorygroup.com`.
6. Verification is usually a postcard to the address on file, sometimes a phone call. It takes
   about a week.
7. After verification, add hours, a short description, and three or four photos. A profile with
   photos outranks one without.

**3. Two things to send me once you have them.** The LinkedIn company page URL and the Google
Business Profile URL. Both go into the site's structured data as `sameAs`, which is how Google
ties the three profiles to one business. They were left out rather than guessed.

## Ten content gaps worth building

Ranked by how likely each is to bring in a Kentucky business that would actually hire BAG. These
are a plan, not built.

1. **AI consulting in Lexington, Kentucky.** A dedicated location page at `/lexington` or
   `/ai-consulting-lexington-ky`. The whole site mentions Lexington and no page targets it. This
   is the single highest-value missing page for local search.
2. **What an AI assessment actually involves.** A page walking through the discovery, assessment
   and roadmap sequence. People search for the process before they search for a firm, and the
   engagement catalog already describes it.
3. **AI for hospitality businesses.** An industry page. It is the deepest experience on the bench
   and there is no page a hospitality owner can land on.
4. **AI for small businesses in Kentucky.** A second industry page aimed at the owner-operator
   who has heard about AI and has no idea where the first dollar goes.
5. **How much does AI consulting cost.** Cost is one of the highest-volume queries in this space.
   The site rule is no pricing, so this page answers what drives cost rather than listing a
   number. Useful and consistent with the rule.
6. **Frequently asked questions.** Ten real questions from intro calls, marked up with FAQ
   structured data. It earns expanded search results and it shortens the sales cycle.
7. **Multi-location operations dashboards.** A page for the owner running three or more sites who
   cannot see the whole business at once. Sits under the dashboards service.
8. **AI tools we build most often.** Reporting, document generation, research, customer
   communication. Concrete examples answer the question every prospect asks first.
9. **A blog post on choosing an AI consultant.** High-intent comparison query, and it lets BAG
   define the criteria a buyer should use.
10. **A second case-style article on operations automation.** There is one already and it is the
    strongest page on the site for links. A second one, on a different problem, compounds that.

Two more items that are not pages. The blog is three posts from January and February 2026, so a
monthly cadence would help more than any single new page. And the three MDX article titles and
descriptions still carry em dashes, which now appear in the browser tab and the social card. That
is a copy pass on `content/insights/*.mdx`, held back here because it changes published article
titles.

## Optional next steps, in order of value

1. Per-post Open Graph images at `src/app/insights/[slug]/opengraph-image.tsx`, so a shared
   article previews with its own headline instead of the site card.
2. Breadcrumb structured data on the service pages, which produces the path display under the
   search result.
3. An `apple-icon` alongside the existing `icon.svg`.
4. Once a LinkedIn or Business Profile URL exists, add `sameAs` to the organization schema.

## Live verification

Run after the deploy landed.

```
$ curl -sI https://bluegrassadvisorygroup.com/sitemap.xml
HTTP/2 200
content-type: application/xml

$ curl -s https://bluegrassadvisorygroup.com/robots.txt
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://bluegrassadvisorygroup.com/sitemap.xml

$ curl -s https://bluegrassadvisorygroup.com/services/dashboards | grep og:title
<meta property="og:title" content="Dashboards &amp; Data | Bluegrass Advisory Group"/>

$ curl -s https://bluegrassadvisorygroup.com/contact | grep canonical
<link rel="canonical" href="https://bluegrassadvisorygroup.com/contact"/>

$ curl -s https://bluegrassadvisorygroup.com/ | grep -o ProfessionalService
ProfessionalService
```
