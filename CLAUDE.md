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
- Lead capture via Supabase + Formspree contact form

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
/insights                  Blog listing (MDX)
/insights/[slug]           Individual blog posts
/contact                   Contact form (Formspree)
/api/generate              POST — Anthropic API proxy (rate limited 10/hr/IP)
/api/lead                  POST — Supabase lead capture
```

## Design System (BAG Brand Tokens)
- Graphite: #1C1C1E (dark sections, footer)
- Emerald: #0D7C66 (primary accent, CTAs)
- Sage: #2A9D8F (secondary accent)
- Warm White: #FAF8F5 (main background)
- Cream: #F0EBE3 (alternating sections)
- Gold: #D4A017 (alert/warning callouts)
- Fonts: Playfair Display (headings) + DM Sans (body) via next/font/google

## Key Directories
```
src/app/              App Router pages
src/components/       Shared components (nav, footer, button, card, etc.)
src/lib/              Utilities (fonts, metadata, rate-limit, supabase, mdx)
content/insights/     MDX blog articles
public/videos/        Hero + architecture videos (35MB total)
public/showroom/      Sly's Nubian static HTML demo
```

## Showroom Directory (Prospect Demos)
- Static demos live in `public/showroom/{slug}/`
- First instance: `public/showroom/slys-nubian/`
- Next.js public/ files take priority over app routes — no conflict
- Showroom pages have zero BAG branding and are excluded from robots.txt

## Environment Variables
```
ANTHROPIC_API_KEY          Required for /api/generate (showroom rooms 1 & 2)
NEXT_PUBLIC_GA_ID          G-YKB8RMQ7LS (hardcoded in layout.tsx)
SUPABASE_URL               Optional — for /api/lead
SUPABASE_ANON_KEY          Optional — for /api/lead
```

## SEO Infrastructure
- Dynamic `sitemap.ts` — auto-includes all routes + blog posts
- Dynamic `robots.ts` — blocks /api/ and showroom demos
- Per-page metadata exports on all routes
- GA4 via next/script afterInteractive
- @tailwindcss/typography for blog prose styling

## Dependencies
- next, react, react-dom, recharts, @supabase/supabase-js
- gray-matter, next-mdx-remote, remark-gfm
- tailwindcss, postcss, autoprefixer, @tailwindcss/typography

## Formspree
- **Endpoint:** `https://formspree.io/f/xvoeydwg`
- **Contact email:** phil@bluegrassadvisorygroup.com

## Prototype Files
- `Prototype Files/` contains 6 original React prototypes (reference only, not used in build)

## Rules
- No pricing on the website
- No case studies or testimonials
- No Tailwind blue, no Inter/Roboto fonts
- Keep the warm white editorial aesthetic
- Deploy via GitHub push → Vercel auto-deploy
