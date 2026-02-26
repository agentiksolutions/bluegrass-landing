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

## Current State (Feb 2026)
- **4-page multi-page site** with persistent navigation
- Warm White (#FAF8F5) background, editorial consulting aesthetic
- Fonts: Playfair Display (headings) + DM Sans (body)
- Responsive with hamburger menu on mobile
- Scroll-triggered fade-in animations via Intersection Observer

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

## Formspree
- **Endpoint:** `https://formspree.io/f/xvoeydwg`
- **Contact email:** phil@bluegrassadvisorygroup.com

## Rules
- No pricing on the website
- No case studies or testimonials
- No Tailwind blue, no Inter/Roboto fonts
- Keep the warm white editorial aesthetic
- Deploy via GitHub push → Vercel auto-deploy
