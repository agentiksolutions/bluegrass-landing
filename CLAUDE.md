# Bluegrass Advisory Group — Marketing Website

## What This Project Is
Full marketing website for Bluegrass Advisory Group (BAG) — Phil Fifield's operations-first consulting practice. Includes AI-powered showroom tools, blog system, and lead capture.

Also read E:/Cortex/philip-brain/PHIL-OPERATOR-PROFILE.md for operating rules and communication style.

## Tech Stack & Location
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Local path:** E:\Cortex\bluegrass-advisory-group\bluegrass-landing\
- **Dev port:** 3200 (`npm run dev`)
- **Live URL:** https://bluegrassadvisorygroup.com
- **GitHub:** https://github.com/agentiksolutions/bluegrass-landing.git
- **Deploys via:** GitHub push → Vercel auto-deploy (Next.js framework)

## Current State (Mar 2026)
- **16+ routes** — full Next.js App Router site
- Rebuilt from static HTML to Next.js on 3/2/2026
- AI-powered showroom with 4 interactive rooms
- MDX blog system with 3 seed articles
- Lead capture via /contact form posting to /api/intake (Discovery-Kit intake pipeline)

## Site Structure (16 routes)
```
/                          Homepage
/services                  Services overview (4 cards)
/services/web-design       Individual service page
/services/ai-integration   Individual service page
/services/dashboards       Individual service page
/services/operations       Individual service page
/showroom                  Showroom landing (4 rooms)
/showroom/report           Room 1: AI Opportunity Report (Anthropic API)
/showroom/website          Room 2: Website Generator (Anthropic API)
/showroom/dashboard        Room 3: Dashboard Demo (recharts, client-side)
/showroom/examples         Room 4: Built Examples
/about                     About Phil / BAG
/work                      Case studies: /work/restaurant-franchisee, /work/pfsa
/privacy, /terms           Draft legal pages (noindex, "Draft" notice)
/academy                   Static Academy + Prompt Studio in public/ (rewrites in next.config.mjs)
/insights                  Blog listing (MDX)
/insights/[slug]           Individual blog posts
/contact                   Contact form (posts to /api/intake)
/api/generate              POST — Anthropic API proxy (rate limited 10/hr/IP)
/api/intake                POST — Discovery-Kit intake pipeline (live)
/api/lead                  POST — Supabase lead capture (unused; no caller in src)
```

## Design System (locked 2026-09-23, Brand/BRAND-DECISIONS-2026-09-23.md)
- UK blue #0033A0 (buttons, links, logo), blue-dark #002677 (hover), tint #E6EBF6 (one panel per page)
- Limestone #F2F1EC (header, bands, footer), white #FFFFFF (page), ink #161B22, body #3B4350, muted #5A6370, line #D9D8D1
- Fonts: Hanken Grotesk (headlines, UI) + Newsreader (reading text) via next/font/google (`src/lib/fonts.ts`)
- The legacy Tailwind names (emerald, sage, graphite, cream, warm-white, stone, charcoal) are aliases to the new
  values in `tailwind.config.ts`, so untouched pages follow the new palette
- Logo: one component, `src/components/logo.tsx`, file `public/brand/logo.svg`
- Photos: `src/lib/photos.ts`. Show them whole and centered; never cut through people or crop tight on Phil
- Words: first screen 30 or fewer on every page, headline 7 or fewer, home 300 or fewer

## Key Directories
```
src/app/              App Router pages
src/components/       Shared components (nav, footer, button, card, etc.)
src/lib/              Utilities (fonts, metadata, rate-limit, supabase, mdx)
content/insights/     MDX blog articles
public/photos/        Real photos (staging approval only, see STAGING-NOTES.md). The generated videos were removed 2026-09-23
content/legal/        Draft Terms and Privacy Notice rendered at /terms and /privacy (not attorney reviewed)
public/showroom/      Legacy static HTML demos (slys-nubian still exists)
```

## Showroom Directory (Prospect Demos)
- Static demos live in `public/showroom/{slug}/`
- Legacy: `public/showroom/slys-nubian/` still exists on disk but is no longer linked from the site
- Built Examples page now features The PFSA (thepfsa.org) as the primary example
- Next.js public/ files take priority over app routes — no conflict

## Environment Variables
```
ANTHROPIC_API_KEY          Required for /api/generate (showroom rooms 1 & 2)
NEXT_PUBLIC_GA_ID          G-YKB8RMQ7LS (hardcoded in layout.tsx)
SUPABASE_URL               Optional — for /api/lead
SUPABASE_ANON_KEY          Optional — for /api/lead
```

## SEO Infrastructure
- Dynamic `sitemap.ts` — auto-includes all routes + blog posts (17 URLs)
- Dynamic `robots.ts` — allows all, blocks /api/, points at the sitemap. Cloudflare prepends
  its own managed block ahead of it live, which disallows ClaudeBot/GPTBot/CCBot and friends.
  Googlebot is not affected. See `docs/seo-report-2026-09-11.md`
- **Every page's metadata comes from `pageMeta()` in `src/lib/metadata.ts`.** Do not hand-roll a
  page-level `openGraph` or `twitter` object: Next replaces the parent's wholesale, which silently
  drops the OG image and the summary_large_image card. `pageMeta()` returns the complete set
- Root metadata deliberately has NO canonical. A page without one is silent rather than wrong
- `/contact` is a client component, so its metadata lives in `src/app/contact/layout.tsx`
- Home page carries Organization + ProfessionalService and WebSite JSON-LD
- The three showroom demos carry an `sr-only` H1 in their `page.tsx` shim
- GA4 via next/script afterInteractive
- @tailwindcss/typography for blog prose styling

## Dependencies
- next, react, react-dom, recharts, @supabase/supabase-js
- gray-matter, next-mdx-remote, remark-gfm
- tailwindcss, postcss, autoprefixer, @tailwindcss/typography

## Formspree (UNUSED — DA-119, 2026-07-12: no references in src; /contact posts to /api/intake instead)
- **Endpoint:** `https://formspree.io/f/xvoeydwg`
- **Contact email:** phil@bluegrassadvisorygroup.com

## Prototype Files
- `Prototype Files/` contains 6 original React prototypes (reference only, not used in build)

## Commands
- `npm run dev` — local dev on port 3200 (`next dev --port 3200`)
- `npm run build` — production build (`next build`)
- `npm start` — serve the production build (`next start`)
- Deploy: `git push` to main → Vercel auto-deploy

## Rules
- No pricing on the website
- Case studies allowed (Phil, 2026-09-23): PFSA by name; the restaurant client only as "a Five Guys franchisee in Central Kentucky" until its owner agrees to be named. Quotes on the site are Phil's own words; no client testimonials without written permission
- No Tailwind blue, no Inter/Roboto fonts
- Keep the limestone and white editorial look (the warm white palette was retired 2026-09-23)
- Deploy via GitHub push → Vercel auto-deploy
- "Operator" is allowed for Phil (Phil, 2026-09-23)
- "Five Guys" only as "a Five Guys franchisee in Central Kentucky" (Phil, 2026-09-23). Never imply Five Guys endorses the firm; never name Barton Restaurant Group
- Use "hospitality industry" not "restaurant operations"
