# Bluegrass Advisory Group — Landing Page

## What This Project Is
Multi-page marketing website for Bluegrass Advisory Group (BAG) — Phil Fifield's operations-first consulting practice.

Also read E:/Cortex/philip-brain/PHIL-OPERATOR-PROFILE.md for operating rules and communication style.

## Tech Stack & Location
- **Stack:** Pure HTML + CSS + JS (no build tools, no framework, no package.json)
- **Local path:** E:\Cortex\bluegrass-advisory-group\bluegrass-landing\
- **Live URL:** https://bluegrassadvisorygroup.com
- **GitHub:** https://github.com/agentiksolutions/bluegrass-landing.git
- **Deploys via:** GitHub push → Vercel auto-deploy (static hosting, cleanUrls enabled)

## Current State (Mar 2026)
- **5-page multi-page site** with persistent navigation
- Warm White (#FAF8F5) background, editorial consulting aesthetic
- Fonts: Playfair Display (headings) + DM Sans (body) + JetBrains Mono (accents)
- Responsive with hamburger menu on mobile
- Scroll-triggered fade-in animations via Intersection Observer
- **SEO infrastructure:** sitemap.xml, robots.txt, structured data JSON-LD, canonical URLs, Open Graph tags
- **GA4:** Placeholder in all pages (G-XXXXXXXXXX — needs real measurement ID)
- **Pricing visible on services page** (Discovery $500-1K, Roadmap+Build $2.5K, Dashboard $3-5K)

## Site Structure
1. **index.html (Home)** — Hero with video, 3 service cards, credibility stats, audience cards, CTA
2. **services.html** — 3 pricing tiers with transparent pricing, CTAs
3. **about.html** — Phil's story, the gap BAG fills, three-layer moat, differentiators
4. **insights.html** — Featured article (autonomous operating system case study), 3 upcoming placeholder cards
5. **contact.html** — Formspree contact form + email fallback + Lexington KY location

## Design System (BAG Brand Tokens)
- Graphite: #1C1C1E (dark sections, footer)
- Emerald: #0D7C66 (primary accent, CTAs)
- Sage: #2A9D8F (secondary accent)
- Warm White: #FAF8F5 (main background)
- Cream: #F0EBE3 (alternating sections)
- Charcoal: #3A3A3C (body text)
- Stone: #8E8E93 (muted text)
- Gold: #B8860B (reserved for premium callouts)

## SEO Files
- `sitemap.xml` — All 5 pages listed
- `robots.txt` — Allow all, sitemap reference
- `vercel.json` — cleanUrls enabled for /services instead of /services.html
- JSON-LD structured data on homepage (ProfessionalService schema)
- Open Graph + Twitter Card meta on all pages
- Canonical URLs on all pages
- GA4 placeholder on all pages (needs real measurement ID)

## Key Files
- `styles.css` — Shared CSS for all pages (unchanged from previous design)
- `vercel.json` — Vercel config with cleanUrls
- `sitemap.xml` — XML sitemap for search engines
- `robots.txt` — Crawler directives

## Formspree
- **Endpoint:** `https://formspree.io/f/xvoeydwg`
- **Contact email:** phil@bluegrassadvisorygroup.com

## Google Setup Guides
All saved to `E:\Cortex\aigency\BAG\setup\`:
- `google-analytics-setup.md` — GA4 property creation + measurement ID
- `google-search-console-setup.md` — Verification + sitemap submission
- `google-business-profile-setup.md` — Business listing creation + verification

## TODO (manual steps for Phil)
- [ ] Create GA4 property and replace G-XXXXXXXXXX in all HTML files
- [ ] Verify Google Search Console ownership and submit sitemap
- [ ] Create Google Business Profile listing
- [ ] Create og-image.png (1200x630px) with BAG branding for social sharing

## Rules
- Pricing IS on the website (transparent pricing is a feature)
- No case studies or testimonials (yet)
- No Tailwind blue, no Inter/Roboto fonts
- Keep the warm white editorial aesthetic
- Deploy via GitHub push → Vercel auto-deploy
