# Staging notes, branch `redesign`

Written 2026-09-23. This branch is the website redesign Phil approved that night. It deploys only to
the private Vercel preview. Nothing here is on bluegrassadvisorygroup.com until Phil merges it.

## Photos

Before these go live: Tyler's OK on store photos (franchise brand); written OK from the three team members in hiring-fair-team.jpg.

- The store photos are saved as `public/photos/store-a.jpg` and `store-b.jpg` so the file names do
  not name the towns. The front of `store-b.jpg` still shows its street number (2467) on the
  building. Decide whether that is acceptable before it goes live.
- `public/photos/pfsa-website.jpg` is a screenshot of the public PFSA home page (www.thepfsa.org),
  taken 2026-09-23. It shows no people and no donor data.
- All photos were resized and saved without their original metadata. Checked after saving: every
  file in `public/photos/` has an empty EXIF block, so no GPS data ships.
- The hiring-fair photo uses `object-position: 12% 50%` in the home hero, not center. The hero box
  is narrower than the photo, so only the sides crop. At center the woman on the left loses her
  shoulder on a phone; at 12% all four people stay whole and the group sits in the middle of the
  frame. The sign on the right is what gets cut.

## Logo

The header, footer and browser-tab icon use the interim F3 lockup (star-only mark) from
`Brand/logo-2026-09-23/final/`. The final star-and-nodes mark is still being drawn. To swap it,
replace `public/brand/logo.svg` and `src/app/icon.svg`, and update `RATIO` in
`src/components/logo.tsx` if the shape changes.

## Privacy Notice and Terms of Service (drafts)

Both pages show a "Draft" notice and are set to noindex. They come from
`Legal/templates-draft/tos_web.md` (v0.2, not attorney reviewed). What was changed to render them:

- Filled: company name, email, version "Draft 0.2", effective date "not in effect".
- `{{bag_address}}` was rendered as "Lexington, Kentucky". A street address is still to be chosen.
- `{{acceptable_use}}` was dropped. `{{prospect_retention}}` uses the draft's own suggestion,
  24 months after last contact.
- Privacy section 4: "subcontractors who help us prepare for or deliver an engagement" now reads
  "people who work with us on an engagement, under confidentiality terms", because the site does
  not mention subcontractors. The attorney should confirm this still discloses enough.
- The privacy intro now names the company before it says "BAG".
- The draft asks for an unchecked checkbox on the contact form and a stored `tos_version` and
  `accepted_at`. That is not built. The form shows the line "By submitting, you agree to our
  Terms and Privacy Notice" instead.

Open questions kept out of the rendered pages:

1. Google Analytics: the site code cannot show whether Google signals or advertising features are
   turned on in the Analytics account. If they are, the "no advertising pixels" line in Privacy
   section 1 and the "no targeted advertising" statement in section 4 need to change.
2. AI tools (Privacy section 3): confirm this matches the current intake flow before publishing.
3. Sharing list (Privacy section 4): the form notification goes to the
   phil@bluegrassadvisorygroup.com mailbox. Should the list name that email provider too?

## Content removed or changed on this branch only

- Removed the posts "How We Cut 12 Hours of Weekly Admin Work Across Three Locations" and "I
  Automated 35 Workflows Before Selling a Single AI Service". No source supports their numbers.
  Every link to them now points at the case studies. They are still on the live site until Phil
  decides.
- Removed the generated video and images (`public/videos/`), the floating call button and the
  old eyebrow labels.
- Em dashes were taken out of every page Next.js renders. "Honest", the "decade in hospitality"
  lines and "hundreds of employees" were removed from the guide pages.

## For Phil to decide

- On the live site, the post "What We Automated in Our Own Back Office First" says no document publishes because an
  automation was confident, and that the practice has never had to walk something back. The case
  study facts sheet records the weekly newsletter publishing automatically at 05:00 and three
  numbers retracted on 2026-09-15. It also says "more than twenty vendors", which has no source.
  On this branch the "never had to walk something back" sentence was cut and "more than twenty
  vendors" became "many vendors". The rest of the post, including the 05:00 publishing question,
  is for Phil.
- The dashboard demo in the showroom labels its sample restaurant stores "Hamburg", "Richmond Rd"
  and "Nicholasville". Next to the franchisee case study, those names point toward the real
  stores. Consider neutral names.
- The Academy and Prompt Studio came back from `academy-restore` without restyling. They carry
  272 and 537 em dashes, and the Academy's sample prompts use "crew" and "subcontractors".
- About (194 words) and Services (162 words) came in under the word targets of about 280 and 210.
  The first-screen and photo targets are met.

## Scorecard (Jev, same scripts and rubric as the live-site baseline)

Home, Services, About and FAQ text from the local build, scored twice and averaged: 8.23 overall
against 8.28 for the live site. The audit counts a gap under 0.24 as a tie. Audience (+0.54),
Credibility (+0.48) and Referral (+0.25) went up. Focus & Consistency fell 1.15, most likely
because the pages now name all of Phil's roles (the franchisee and The PFSA) as he asked.
Client-Centered Messaging is 5.54, still the weakest category and below the audit's bar of 7.
The redesign text was captured with Playwright rather than the browser agent, so read the
comparison as a direction.
