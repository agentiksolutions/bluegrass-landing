# V2 reference teardowns (2026-10-20)

These were read from page source (HTML, CSS and JS bundles), not from rendered pages. We borrow techniques only, never another site's copy, images or logos.

## Hydra OS: hydraos.ai (CI Web Group)

- **Which site:** the top search result for "Hydra OS website", and the only candidate with a scroll-animated marketing site. The other candidates were the same company's page at ciwebgroup.com/hydra-os, a GitHub repo and an unrelated app. **Phil should confirm this is the one he meant.**
- **Section order:**
  1. A boot-sequence intro.
  2. The hero and a client marquee.
  3. Why it exists.
  4. Old way versus new way.
  5. Four promises.
  6. A twelve-problem list with a sticky left rail.
- **Scroll:** Lenis smooth scroll with GSAP ScrollTrigger. Animations play once when triggered; nothing is scrubbed to scroll.
- **Easing and triggers:**
  - The default ease is `power3.out` at 0.6 s.
  - Reveals start at `top 85%`.
  - Headline words rise 20 px each over 0.5 s, staggered 0.03 s.
  - Blocks open with a clip-path from `inset(100% 0 0 0)` to `inset(0)` over 0.8 s at `power3.inOut`.
  - Cards stagger 0.08 to 0.1 s.
- **Other effects:** magnetic buttons, and a 2D canvas that draws a "brain and nodes" diagram.
- **Borrowed:**
  - The word-split rise and the clip-path panel reveal. We use the word rise on every headline (`reveal.tsx`).
  - The node-network motif, which the BAG mark already owns.

## Framer showcase (framer.com/gallery)

Framer's scroll effects ship in hashed bundles, so only entrance animations and structure can be read.

- **PetraLabs** (petralabs.com):
  - **Section order:** hero with a scroll cue, then four products, then stat tiles, then a quote, then reports.
  - **Motion:** entrance fades of 0.25 to 1 s on a gentle in-out curve, a ticker marquee, and many layers promoted with `will-change`.
- **Contra Labs report** (contralabs.com):
  - **Structure:** one chapter per topic, and each chapter is a chart.
  - **Motion:** 0.8 s tween entrances.
- **Borrowed:** charts as the content, and one idea per chapter.

## dci.build (Dempsey Construction), confirmed

This is the motion source for Phil's approved template (`bluegrass-advisory-group/templates/website-motion`).

- **Smooth scroll:** Lenis with a duration near 0.95 s, an exponential ease-out, `smoothWheel` on and `syncTouch` off. It runs from the GSAP ticker with `lagSmoothing(0)`.
- **Pins:** scrubbed with `scrub: 1` and `ease: "none"`.
- **Text:** split-text reveals staggered 0.03 to 0.04 s.
- **Canvas or WebGL:** one section is driven by scroll progress and runs only while that section is active.
- **Mobile:** `gsap.matchMedia` gives phones a separate path.
- **Borrowed:**
  - The Lenis and GSAP ticker setup (`smooth-scroll.tsx`).
  - Pinned chapters scrubbed to scroll, with `ease: "none"`.
  - Unpinning below 821 px.
  - Rendering only while a section is on screen (the 3D hero and the 2D canvas both pause off screen).

## APAX Software (apaxsoftware.com), read for the words

- **Section order:**
  1. A plain headline.
  2. One paragraph naming real pains.
  3. Two buttons.
  4. Three proof numbers.
  5. Eight one-line complaints in the client's voice.
  6. Three services, two sentences each.
  7. Industries.
  8. The blog.
  9. A closing invitation.
- **Borrowed:**
  - Problem lines in the client's own words (our pinned "What we help with" lines).
  - Industries as a short list.
  - A plain closing invitation.
- **Skipped:**
  - The eyebrow tag (banned).
  - Proof numbers we cannot source.

## Kinetics (kinetics.colorion.co) and Refero (styles.refero.design)

- **Kinetics:** spring curves such as `(0.34, 1.56, 0.64, 1)` and the expo-out `(0.16, 1, 0.3, 1)`. They suit hover and toggle states, not scroll. The client logo row uses a soft overshoot on entry.
- **Refero:** a library of design-system write-ups. It is useful for palette and type decisions, which the BAG brand lock already settles.

## What V2 does with all this

**The data-to-dashboard sequence (`data-to-dashboard.tsx`)** is one pinned section on one scrubbed timeline, about 3.2 screens long:

1. About two dozen scattered inputs float in depth: spreadsheet cells, receipts, point-of-sale rows, emails and time punches.
2. They fly to their panel slots.
3. The panels draw, and the numbers count up.
4. The dashboard then works: an alert fires, the weekly report types itself, and the schedule fills in.

Phones play the same build once when it arrives on screen. Reduced motion shows the finished dashboard.

**The 3D hero (`ky-3d.ts`):**
- The BAG mark is extruded into a slab, with live flowing light on its top face.
- The node network carries travelling pulses.
- Bloom makes the light glow.
- Scrolling drives a camera flight to the star at Lexington.
- It loads only on desktops with WebGL 2. Everything else keeps the 2D canvas.

**The pre-rendered flight (`scroll-video.tsx`):**
- A Blender Cycles render made on the Mac mini, 150 frames.
- Every frame is a keyframe, so scrubbing it with scroll seeks instantly.

## Cookie consent (2026-10-20, for Phil's "more professional" request)

Researched by plain fetches of page source, cookie policies and design-system docs. A script-rendered banner whose layout could not be seen is marked second-hand.

- **GOV.UK Design System (verified, design-system.service.gov.uk/components/cookie-banner):**
  - **Layout:** a block at the top of the page, never fixed, so it cannot cover focused content.
  - **Wording:** heading "Cookies on [service]". One line names essential cookies, one asks for analytics.
  - **Buttons:** "Accept analytics cookies" and "Reject analytics cookies" at equal weight, plus a "View cookies" link.
  - **After a choice:** a confirmation ("You've accepted analytics cookies. You can change your cookie settings at any time.") with a "Hide cookie message" button.
  - **Preferences:** on a separate cookies page, with a Yes/No per category.
  - **Reopen:** the footer link.
- **Stripe (verified in source):**
  - **Wording:** "We use cookies to improve your experience and for marketing. Read our cookie policy or manage cookies."
  - **Buttons:** "Accept all" and "Reject all".
  - **Preferences:** a full cookie-settings page with Advertising, Functional and Essential (required).
  - **Reopen:** a "Cookie settings" link in the footer.
- **Vercel (verified: footer and categories only):**
  - **Reopen:** a footer button, "Cookie Preferences".
  - **Categories:** Strictly Necessary, Functionality, and Performance and Analytics.
  - **Banner:** layout not captured.
- **Linear and Apple UK (verified: footer and policy only):**
  - **Banner:** none in the served HTML.
  - **Linear:** points to browser settings.
  - **Apple:** a "Use of Cookies" footer link.
- **Locomotive (award-winning studio, verified from its consent config):**
  - **Layout:** a small card in the bottom-right corner.
  - **Buttons:** "Accept All" and "Accept Necessary", plus a "Let me choose" link.
  - **Preferences:** a modal with Strictly necessary (required) and Performance (a switch), and "Save Preferences".
  - **Reopen:** a "Cookie preferences" footer link.
- **Active Theory, makemepulse, Obys (Awwwards Sites of the Day):** no banner in the served HTML. Dogstudio, Resn and Basic/Dept were not checked.

What the BAG card takes from them:
- **Layout (2026-10-28, Phil asked again for the large-company look):** a compact card in the bottom-left corner on desktop, under the header on phones. No scroll lock on the card.
- **Buttons:** "Accept all" (filled) and "Reject all" (outlined) side by side at the same size (GOV.UK, Stripe), plus a "Manage preferences" link.
- **Preferences:** a centered window over a dimmed page, with Necessary (always on) and Analytics (a switch), then "Cancel" and "Save preferences".
- **After a choice:** a short "Your cookie settings were saved." message, announced to screen readers (GOV.UK).
- **Reopen:** "Cookie settings" in the footer and on /privacy (Stripe's wording).
