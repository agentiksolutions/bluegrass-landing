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
