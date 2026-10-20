# Website V2 iteration log

Branch `site-v2`, started 2026-10-20. Each round: rebuild, screenshot every page at 390, 768 and
1440 one viewport at a time (full-page captures hide GSAP reveals and distort pins), check
sideways overflow at every step, sweep the rendered HTML for dashes and slop tells, and count words.
Scroll smoothness is unmeasured: a headless browser cannot measure it.

Tools (session scratchpad, not in the repo): `shoot.py` (step screenshots and overflow check),
`check_copy.py` (rendered HTML: dashes, ` - `, `, not `, banned words, h1 length, first-screen
and home word counts), `sheet.py` (contact sheets).

## Direction

- White page and limestone bands, as locked on 2026-09-23. Night chapters in ink #161B22 carry the
  drama: the hero, the services track, every inner page's opening band, the closing band and the
  footer. This answers "too dark" from the 10/7 review without losing the dark look Phil liked.
- Hero: Kentucky drawn by moving light, live on the device (sharp at any size, so the 4K rule holds),
  inside the real state outline with the 120 county lines underneath. The light starts at
  Lexington and spreads to the borders; scrolling pulls it back toward the star; a pointer stirs it.
- Motion: Lenis smooth scroll driven by the GSAP ticker; ScrollTrigger for pins and scrubs. One idea
  per section on the home page: masked word reveal, pinned statements, sideways night track,
  photo rising out of its frame, a path drawing down its steps, a screenshot opening to full width,
  a hover preview that follows the pointer, and the official mark building itself.
- Pictures: real screens (Academy, manager portal in demo mode, PFSA site), Phil's headshot, and
  panels drawn in code marked "Sample data". No generated people scenes anywhere.

## Round 0 (first complete home build)

| Defect | Fix |
|---|---|
| Every masked headline stayed hidden | GSAP read the CSS offset as `y` and stacked `yPercent` on it; the reveal now sets `y: 0` explicitly |
| Hover preview showed with no pointer movement | Previews now follow real mouse movement only |
| Blog cover and hover tile showed the portal's "FG" mark and its confidentiality footer | New crops from the clean demo-mode store screen, renamed so the image cache cannot serve the old file |
| Hero headline wrapped to three lines over the state | Headline width freed; state moved up and in on desktop |
| Systems map arrowheads showed before their lines | Arrowheads are added once each line has drawn |

## Round 1 (all pages, three widths)

Overflow: none at any width or scroll step. Console errors: none (the 404 page logs its own 404).

| Defect | Fix |
|---|---|
| Home page copy at 547 words against the 300 limit | Offer names, step lines, market lines and case lines cut to the essentials; the blog row moved off the home page (the Blog stays in the menu). Now under 300 |
| First screens over 30 words on About, Services, Operations, Cost, Tools, Showroom | Intros shortened |
| Closing mark never finished building on phones (scroll ended first) | The build now completes when the mark's bottom reaches 80% of the screen |
| Blog posts were set in pale grey on white (a leftover dark-theme prose setting) | Post page rebuilt: night title band, cover rising out of it, ink headings and body color |
| About headings had loose line spacing on two-line titles | Leading set |
| Showroom tools (report, website, dashboard) keep their own in-tool header | Left as is: they are working demos and need the API key, which staging does not have |

## Round 2 (24 pages, three widths, 72 runs)

Overflow: none. Page errors: none. Home copy: 296 words.

| Defect | Fix |
|---|---|
| Hero headline crossed the western end of the state on wide screens | State moved up and scaled to 62% of the height |
| "Who we work with" read as a thin list with empty space to its right | Labels set large, with an arrow that slides in on hover; the pointer preview stays |
| Article call to action was a filled box with an old-style button | Ruled block with the shared button |
| No transition between pages | A night curtain with the Lexington star covers the old page, the router swaps, the curtain lifts. First version never ran: Next's Link handled the click first. It now listens in the capture phase; a check confirms it covers mid-navigation and lifts after |
| "See how we help" stopped 84 px short of the pinned track, so the pin started late | Night sections are scrolled to with no header offset |
| FAQ was ten open answers in a column | Accordion, one open at a time, after the 21st.dev "Accordion" by ddoemonn (pattern only; rebuilt with a CSS grid-row transition, answers stay in the HTML) |
| Sections after short night openings started flush against them (Blog, Showroom, Examples, FAQ) | Top padding added |

Interaction checks (`interact.py`): 11 of 11 pass. Curtain covers and lifts, scroll resets to the
top on a new page, anchor link lands on the track, FAQ opens, phone menu opens and closes after
navigating, and with reduced motion every headline word is visible on arrival.

## Round 3 (28 pages including the three showroom tools and all posts, three widths, 84 runs)

Overflow: none. Page errors: none. Lighthouse (local production build, mobile emulation):
performance 87 to 88, accessibility 96 to 100, best practices 100, SEO 100. Largest paint about
3.4 s on emulated mobile, layout shift 0.04 or lower.

| Defect | Fix |
|---|---|
| Lighthouse contrast: path steps waiting their turn sat at 35% opacity (1.9:1) | Waiting steps sit at 75%; statements not yet lit use #8B919A (above 3:1 at their 46 px size) |
| Hero headline waited 0.25 s before rising, which pushed the largest paint later | Delay cut to 0.1 s |
| Hero trails read short and bristly | Longer trails, slower drift |
| Showroom tools opened on a bare white screen with an off-brand two-color wordmark and a second title | Night opening band with the tool's name; the in-tool wordmark and repeated title removed; the full firm name where the tools still sign their output |
| Contact page was the one page without a night opening | Night band behind the heading; the form card and Phil's photo rise out of it onto white |
| Built Examples had no picture of the example | The PFSA site screenshot opens the page |

## Round 4 (home at full resolution, frame by frame)

| Defect | Fix |
|---|---|
| Hero light still ran bright behind "Your AI partner" on wide screens | The canvas reads the headline's box and draws light inside it at 10% strength, with a 36 px band at 28%, so the words sit on a quiet patch while the state keeps moving around them |
| Systems map could still be drawing its lines a full second after it was on screen | Drawing starts at 30% visibility and runs in about 1.5 s instead of 3 |
| Service cards in the night track left wide empty margins at 1440 | Cards widened to 70% of the screen (1000 px cap) |
| A local review run showed missing script chunks | Not a site defect: the push hook rebuilt `.next` under the running preview server. The review script now restarts the server after every build |

## Round 5 (final sweep: 29 pages at three widths, reduced motion, interactions)

87 normal runs and 8 reduced-motion runs: no sideways overflow, no page errors, every page 200.
Rendered HTML: no em or en dashes, no spaced hyphens, no ", not " tails, no banned words. Home copy
296 words. Interaction checks 11 of 11.

| Defect | Fix |
|---|---|
| With reduced motion on a wide screen, the services track stayed one long row with no pin, so Build and Support sat off screen where nothing could scroll to them (the overflow check could not see it: the page clips sideways overflow) | The row layout now applies only on wide screens with motion on (a `track:` Tailwind variant); otherwise the cards stack. Checked in both modes |

Open, not defects: smoothness is unmeasured (headless). The showroom report and website tools
need the Anthropic key, which the preview does not have, so they stop at their error message.
The contact form has no Supabase or Airtable keys on the preview, so it errors by design.

## Close-out checks

- Links: all 34 internal hrefs in the built pages return 200; cal.com, thepfsa.org and the LinkedIn
  page answer 200. `/terms` and `/hero-preview` are gone (404) and nothing links to them.
- Images: every image on 29 pages loaded (no `naturalWidth` of 0 after scrolling each page through).
- `/academy`, `/prompt-studio`, `/sitemap.xml`, `/robots.txt`: 200.
- The closing mark's geometry matches the official 2026-09-27 lockup (same 45 nodes and 94 lines,
  scaled by 0.4923).
- Home copy: "a restaurant franchisee" again on the home page, as V1 had it. The brand-identity rule
  keeps the restaurant client at arm's length on the front door; Five Guys is named on the work
  and about pages.
- The Academy and Prompt Studio are static pages carried over unchanged. Their teaching samples
  contain markdown bullets (" - "), sample prompts with ", not" and a mention of n8n as a public
  automation tool. Left as is: outside this redesign.

## Round 6 (2026-10-20, new direction: scroll as the centrepiece, real 3D, client logos)

New since round 5:
- **3D hero** (`src/lib/ky-3d.ts`, `home-hero.tsx`): three.js r170, loaded only on desktops with WebGL 2 and motion on. The firm's Kentucky mark is extruded into a slab. Live flowing light on its top face is drawn to a canvas texture. The node network carries travelling pulses, the star glows at Lexington, and bloom post-processing lights it all. The hero pins for one screen while scroll flies the camera from a wide three-quarter view down to the star and the words lift away. The pointer tilts the view. Phones, tablets and reduced motion keep the 2D canvas. Tone mapping darkened the clear colour to (6, 10, 16), so the background input was set to land on the page ink (22, 27, 34), measured.
- **Signature sequence** (`data-to-dashboard.tsx`): messy inputs become a working dashboard. See `docs/v2-references.md` for how it is built.
- **Blender flight** (`scroll-video.tsx`, `public/videos/ky-flight-*`, script in `scripts/render/ky_flight.py`): rendered with Cycles on the Mac mini's M4 at 1920x1080, 150 frames, 7.7 s a frame. It is encoded on the Mac with every frame a keyframe, 5.2 MB, plus a 3.0 MB 720p file for phones. The section pins for 2.4 screens while scroll moves the camera, and three plain lines take turns over a legibility scrim.
- **Who we've worked with** (`client-logos.tsx`): STAGING ONLY. **Pending permission before live: Five Guys trademark use (no endorsement implied), Tyler Barton/BRG, Greer, Activate, StoneCreek, Proliferation, United Property Holdings.** The list was verified against the BAG CRM: Greer Companies, Activate, StoneCreek Management, Proliferation Marketing and United Property Holdings have signed contracts and paid invoices. Five Guys (Phil runs operations for a franchisee) and The PFSA (Phil is president) were added at Phil's request. Logos come from each company's own website (PFSA's from its own site code) and were converted on the Mac to one limestone monochrome treatment. StoneCreek and United Property Holdings publish no logo, so their names are set in type. Greer's own site serves only a 158 px PNG, so ask Greer for a vector. A line under the logos says they imply no endorsement.
- **References:** `docs/v2-references.md`. Hydra OS is taken to be hydraos.ai, which needs Phil's confirmation.
- **Higgsfield: no free models, needs Phil's call on a pass.** Unlimited Kling 3.0 and Nano Banana are paywalled, and Grok Imagine costs credits. The balance is still 0.81. Every visual here is three.js, Blender on the Mac, real screenshots or panels drawn in code.
- The home page's markets heading is now "Industries", so it does not read twice next to "Who we've worked with".

| Defect | Fix |
|---|---|
| The first 3D frame rendered on black with the state cut off at the top | Scene background compensated for tone mapping; wide shot reframed so the state sits up and right of the headline with its east end in frame |
| 3D light overexposed as the camera dived (bloom and emissive ramped too hard) | Bloom 0.6 to 0.75, emissive ramp cut to +0.25, star light ramp cut to +2 |
| The words over the Blender flight sat on bright network lines | A legibility scrim fills the bottom 55% of that section |
| Client logos at uneven sizes and an uneven last row | Per-logo heights balanced by eye; rows centred |
| Proliferation's script logo showed a faint box edge | Re-converted with a threshold so the old white background goes fully clear |

## Round 7 (home, all widths)

| Defect | Fix |
|---|---|
| A blank white screen between the pinned statements and the dashboard | The 3D hero's pin is created after three.js loads, later than the pins below it, so every trigger was measured one screen short. The hero now re-sorts and refreshes all triggers once its pin exists |
| The scattered inputs never appeared: the chip layer faded with the panels | The word-count marker `data-panel` doubled as the panel-animation selector. The marker is now `data-imagery`, and chips are shown outside the timeline so a refresh cannot hide them |
| Dashboard figures and the weekly report showed their final values before the build | They start at zero and blank and count or type in. The server HTML keeps the finished values for crawlers and reduced motion |
| Home copy at 351 words after the new sections | Step lines, one video line, the hero caption and the long logo note trimmed. 299 words |

## Round 8 (performance)

| Defect | Fix |
|---|---|
| Phones downloaded the 3 MB flight video with the first screen (3.8 MB page weight) | The video loads only when its section is about a screen away; the reduced-motion still is lazy. Home page weight on first load: 687 KB |
| First-screen headlines and intros waited for the page script before rising (late on slow phones) | First-screen words and blocks now rise with pure CSS animations from the first paint (`data-reveal-load`, `data-fade-load`); scroll reveals keep GSAP |
| Hero paragraph reflowed when the reading font arrived | A reserved minimum height |
| The data-to-dashboard sequence added to the dashboards service page and the multi-location guide | Reused as is |

Lighthouse, mobile emulation, local production build: home performance 78 with accessibility, best practices and SEO all 100. The largest paint there is the cookie banner's paragraph, which appears after hydration (main's legal component, left as is). Services: 89. Layout shift: home 0.085, under the 0.1 line.

## Round 9 (depth)

- The dashboard now arrives tilted back in depth (28 degrees, 86% scale) and settles flat as the inputs land. The inputs' landing spots are measured with the board and panels flat, so they still hit their slots.
- Every inner page's opening visual drifts upward slower than the page as you scroll (`Drift`), so the headline and the picture separate in depth.
- The sequence takes a heading per page, so the dashboards pages do not repeat the home page's line.

## Round 10 (case studies)

- The franchisee case has a tip-pool panel (sample data: hours, shares, and a check that the shares add up to the pool). The portal has a tip calculator. The caption claims no frequency.
- The PFSA case has a board-portal panel (sample data: a donation with its receipt, an application sent to a vote, a recorded vote, drafted minutes). It matches the case study's own account of the first assistance case.
- Both sit in a night band between the case sections and build in when half on screen.

- Round 11: the pointer now stirs the 3D light. A ray from the camera through the pointer meets the slab's top face, and the current swirls around that point while the pointer has moved in the last 1.5 s.

**Scope note for rounds 6 to 11:** these were partial checks (the home page at all widths, then the single pages each change touched). The last full sweep before round 12 was round 5.

## Round 12 (robustness, then a full sweep)

| Defect | Fix |
|---|---|
| The 3D hero's per-frame cost was never measured on a real laptop. SwiftShader renders on the CPU, so the headless shots prove nothing about frame rate | The light texture is now 1225x550, uploaded every other frame, with the pixel ratio capped at 1.25. A frame-time governor runs on the visitor's machine: after 90 frames averaging over 22 ms it drops bloom and goes to pixel ratio 1; if the next 90 are still slow, the hero hands back to the 2D canvas. Disposing frees the WebGL context (`forceContextLoss`), so repeated home visits through the page curtain do not pile up contexts. Headless review runs will often show the 2D fallback for this reason |
| Phones pinned the flight video and scrubbed it, but iOS often shows no frame of a paused video | Below 821 px there is no pin and no scrub; the 720p flight plays muted on a loop while on screen and pauses off screen. The lines show as one static line. **Unverified on a real iPhone** |
| United Property Holdings was named on the logo strip but missing from the permission note | Added to the code comment and to this log's round 6 note |
| Without the Five Guys clause, "Who we've worked with" next to the Five Guys logo read as work for Five Guys itself | Small print restored: "Five Guys: Phil runs operations for a Five Guys franchisee in Central Kentucky." It is small print, so it is left out of the home word count, like imagery. **Flag for Phil:** whether the Five Guys logo belongs in this strip at all |

Round 12 full sweep:
- All 29 pages at 390, 768 and 1440: 87 runs, no sideways overflow, no page errors.
- Reduced motion at 390 and 1440: 58 runs, clean. Interaction checks: 11 of 11.
- Links: all 39 internal links return 200; the external links answer 200.
- Images: every one loads, on all 29 pages.
- Rendered copy: no dashes and no slop tells. Home copy 286 words, small print excluded.

- Round 13: the service cards in the night track swing in from an angle and out of depth as they slide into view (GSAP `containerAnimation` on the horizontal track). The 3D star ignores tone mapping so it stays pure white when bloom is off, and the dive ends a little higher so the star's surroundings read.

- Round 14: the About headshot drifts in depth like the other inner-page openings.

- Round 15: phones get a portrait Blender render of the flight (1080x1920, all-intra, 4.5 MB, `scripts/render/ky_flight_portrait.py`) with its own first-frame poster, playing muted on a loop. The 720p landscape file is removed.

- Round 16: buttons lean toward a mouse pointer (up to about 13 px) and spring back when it leaves. Mouse only, never touch, and off under reduced motion because it lives with Lenis. Checked: hover moved the hero button to translate(12.7, 6.4); leaving returned it to 0, 0.

Close-out checks (05:35 ET): all 33 preview paths return 200 on deployment 918c85b. Production is still main c8ec4c7. origin/main is c8ec4c7; homepage-21st is 4f54af4, with 0 changed files. Higgsfield CLI: 0.81 credits, unchanged all night, nothing generated. Mac: the render folder is gone and 20 GB is free.
