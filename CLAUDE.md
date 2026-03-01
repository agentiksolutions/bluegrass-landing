# Bluegrass Advisory Group — Landing Page

## What This Project Is
Multi-page marketing website for Bluegrass Advisory Group (BAG) — Phil Fifield's operations-first consulting practice.

Also read E:/Cortex/philip-brain/PHIL-OPERATOR-PROFILE.md for operating rules and communication style.

## Tech Stack & Location
- **Stack:** Pure HTML + CSS + JS (no build tools, no framework, no package.json)
- **Local path:** E:\Cortex\bluegrass-advisory-group\bluegrass-landing\
- **Live URL:** https://bluegrassadvisorygroup.com
- **GitHub:** https://github.com/agentiksolutions/bluegrass-landing.git
- **Deploys via:** GitHub push → Vercel auto-deploy (static hosting)

## Current State (Mar 2026)
- **4-page multi-page site** with persistent navigation
- Warm White (#FAF8F5) background, editorial consulting aesthetic
- Fonts: Playfair Display (headings) + DM Sans (body) + JetBrains Mono (accents on index)
- Responsive with hamburger menu on mobile
- Scroll-triggered fade-in animations via Intersection Observer
- **SEO layer added 3/1:** canonical URLs, OG tags, GA4 placeholder, JSON-LD, sitemap.xml, robots.txt

## Site Structure
1. **index.html (Home)** — Hero, value proposition (3 cards), how we work (3 steps), CTA band
2. **services.html** — 3 flagship packages (Operational Quick-Start, Digital Presence, AI Readiness Assessment) + Additional Solutions section
3. **about.html** — Phil's story, methodology (4 principles), CTA
4. **contact.html** — Formspree contact form + email fallback

## Design System (BAG Brand Tokens)
- Graphite: #1C1C1E (dark sections, footer)
- Emerald: #0D7C66 (primary accent, CTAs)
- Sage: #2A9D8F (secondary accent)
- Warm White: #FAF8F5 (main background)
- Cream: #F0EBE3 (alternating sections)
- Charcoal: #3A3A3C (body text)
- Stone: #8E8E93 (muted text)
- Gold: #B8860B (reserved for premium callouts)

## Key Files
- `styles.css` — Shared CSS for all pages
- `index.html` — Home page
- `services.html` — Services page (NO PRICES listed)
- `about.html` — About page
- `contact.html` — Contact form page
- `sitemap.xml` — XML sitemap for search engines (4 pages)
- `robots.txt` — Crawler directives with sitemap reference
- `vercel.json` — cleanUrls enabled for pretty URL routing

## SEO Infrastructure
- **Canonical URLs** on all 4 pages
- **Open Graph + Twitter Card** meta tags on all 4 pages
- **GA4 live** (G-YKB8RMQ7LS) on all 4 pages
- **JSON-LD** structured data (ProfessionalService schema) on homepage only
- **sitemap.xml** listing all 4 pages
- **robots.txt** allowing all crawlers

## Google Setup Guides
All at `E:\Cortex\aigency\BAG\setup\`:
- `google-analytics-setup.md` — GA4 property creation
- `google-search-console-setup.md` — Verification + sitemap submission
- `google-business-profile-setup.md` — Business listing creation

## TODO (manual steps for Phil)
- [x] Create GA4 property — measurement ID G-YKB8RMQ7LS set in all 4 pages (commit eb96a68)
- [ ] Verify Google Search Console ownership + submit sitemap
- [ ] Create Google Business Profile listing
- [ ] Create og-image.png (1200x630px) for social sharing

## Formspree
- **Endpoint:** `https://formspree.io/f/xvoeydwg`
- **Contact email:** phil@bluegrassadvisorygroup.com

## Rules
- No pricing on the website
- No case studies or testimonials
- No Tailwind blue, no Inter/Roboto fonts
- Keep the warm white editorial aesthetic
- Deploy via GitHub push → Vercel auto-deploy
