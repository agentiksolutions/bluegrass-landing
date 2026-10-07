# Imagery

## Generated scenes, 2026-10-06

Made on Higgsfield under BAG's own account. Stills: Soul Cinema (`soul_cinematic`), 2K, 16:9.
Loops: Seedance 2.5, 5 seconds at 720p, no audio, each starting and ending on its own still so it
repeats without a jump. Brief: real kinds of places where small businesses work (a workshop room,
a small office, a restaurant back office, a main street), at night or dusk, warm practical light
mixed with cool screen light, faces turned away from the camera, no robots, holograms or glowing
orbs, no readable text, no logos, nothing that reads as the University of Kentucky.

**Nobody in these pictures is a client, a team member, or a person giving a testimonial. They
are illustrative, and no caption on the site says otherwise.** The presenter in the workshop
scene faces the screen on purpose, so no visitor takes him for Phil.

| File | Where it is used | Shows |
|---|---|---|
| `scenes/workshop.webp` | Not used since 2026-10-07 (its loop was removed) | An evening workshop in a brick-walled room, a presenter drawing on a lit flowchart |
| `scenes/builder.webp` | Not used since 2026-10-07 (its loop was removed) | A builder working late at two monitors of charts |
| `scenes/back-office.webp` | Hospitality page | A restaurant manager checking a tablet in the back office after close |
| `scenes/desk-paperwork.webp` | Not used since 2026-10-07 | A desk at night with a printed schedule and receipts beside a laptop |
| `scenes/nonprofit-board.webp` | Not used since 2026-10-07 | Volunteers around a folding table at a board meeting in a fellowship hall |
| `scenes/working-session.webp` | Services, top of page | Two people at a long table going over a laptop diagram and a printed map |
| `scenes/shop-website.webp` | Websites page | A shop owner after closing, checking a website on a laptop |
| `scenes/inbox-sorting.webp` | AI integration page | An office manager pointing at an inbox sorted into groups |
| `scenes/back-office-dashboard.webp` | Dashboards page | A restaurant manager looking up at a back-office dashboard |
| `scenes/process-map.webp` | Operations page | A hand-drawn process map on a whiteboard at night |
| `scenes/assessment-walkthrough.webp` | AI assessment page | One person pointing at a spreadsheet while another takes notes |
| `scenes/owner-reviewing-plan.webp` | AI consulting cost page | An owner at a kitchen table at night reading a printed plan |
| `scenes/lexington-downtown.webp` | Lexington page | Historic brick storefronts at blue hour, one upstairs window lit |
| `scenes/small-business-counter.webp` | Kentucky small business page | An owner at the counter after closing with a laptop and order slips |
| `scenes/multi-location-truck.webp` | Multi-location dashboards page | A manager in a truck at dusk checking a tablet of locations |
| `scenes/back-office.webp` (reused) | Hospitality page | Same still as the home Support row |
| `scenes/inbox-sorting.webp` (reused) | AI tools page | Same still as the AI integration page |

Blog covers in `public/images/insights/`, same model and brief:

| File | Post | Shows |
|---|---|---|
| `ai-trust-gap-night.webp` | The AI Trust Gap | A shop owner behind the counter after close, arms crossed, looking at a laptop |
| `choosing-an-ai-consultant-night.webp` | How to Choose an AI Consultant | Two people at a coffee shop table at dusk, one passing over a notebook of questions |
| `automating-our-own-back-office-night.webp` | What We Automated in Our Own Back Office First | A restaurant back office at night, a printer pushing out a report beside a laptop |

Every post is **required** to name a `cover` in its frontmatter. A post without one fails
`npm run build` with a message naming the file (`src/lib/mdx.ts`, `requireCover`).

## The home page shows only real things, 2026-10-07

Phil, 2026-10-07: the generated scenes "are weird". Every scene was the same shot (a person
from behind in a dark room), and the sameness read as AI. The home page now uses only Phil's
own photo, a screenshot of the live Academy (`images/work/academy.webp`, taken from this site's
/academy page), the PFSA site screenshot, and panels drawn in code. The Education and Build
loops (`videos/workshop.mp4`, `videos/builder.mp4`) were removed; they are in git history. The
inner pages still carry scenes until Phil reviews this direction.

## Code-drawn panels, 2026-10-07

Panels drawn in code (`src/components/work-panels.tsx`), not pictures: a Business AI Setup
assistant (Build row), a status board of scheduled jobs (Support row), a one-page systems map
(the Roadmap section) and a manager portal store screen (the franchisee card). Both are sample data and say "Sample data" on the panel. Phil on
the clip and the storefront they replaced: they "look weird". The back-office loop
(`videos/back-office.mp4`) and `scenes/store-blue-hour.webp` were removed; both are in git history.

## Retired 2026-10-06

The Unsplash stock photographs (`images/stock/`, home page draft of 2026-09-25), the Grok
Kentucky set of 2026-09-24 (`pillar-*`, `strip-*`, `ky-*`, `work-franchisee`, the `_option-*`
and `_spare-*` alternates) and the aerial hero video were removed from this branch. Phil on the
stock set: they "looked like shit". The Grok set was graded for the white site and clashed with
the dark one. All of them remain in git history.

## Photographs of real people and places

`public/photos/phil-fifield.jpg` is Phil, and he approved it on 2026-09-24. The store and team
photographs of the restaurant client are on `/work`, `/work/restaurant-franchisee`, `/services`
and `/about`, and need the owner's OK and the team members' written OK before they go live
(`src/lib/photos.ts`). `public/photos/pfsa-website.jpg` is a screenshot of the public PFSA site.
