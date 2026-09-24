# Imagery

Every picture on this site is a **placeholder**. Replace each one with a photograph taken for
this firm, or with a photograph of the client's own place of business with their permission.

## Generated with Grok, 2026-09-24

Made with `image_gen` on Phil's own xAI subscription from a written brief: Central Kentucky and a
consulting practice at work, cinematic film still, golden hour or blue hour, shallow depth of
field, graded toward UK blue and limestone, no text, faces out of frame or turned away, no robots
or glowing technology, nothing that reads as the University of Kentucky.

**Nobody in these pictures is a client, a team member, or a person who has given a testimonial.
They are illustrative, and no caption on the site says otherwise.**

| File | Where it is used | Shows |
|---|---|---|
| `pillar-education.webp` | Education pillar, and the strip | A workshop in a plain meeting room |
| `pillar-build.webp` | Build pillar | Two people at a wall monitor |
| `pillar-support.webp` | Support pillar | A person at a desk with a headset, from behind |
| `strip-table.webp` | The sliding strip | Two people at a table with a laptop |
| `strip-hands.webp` | The sliding strip | Hands annotating a printed chart |
| `strip-room.webp` | The sliding strip | A meeting room after a session |
| `ky-limestone.webp` | Behind Phil's quote | A limestone wall along a lane at blue hour |
| `ky-hills.webp` | The sliding strip | Rolling Kentucky hills at golden hour |
| `work-franchisee.webp` | The franchisee case-study card | A small-town main street at first light |
| `_option-counter.webp` | Not used. Card alternative B | A counter at dawn, clipboard and coffee |
| `_option-hands.webp` | Not used. Card alternative C | Hands over a notebook and laptop |
| `_spare-lexington.webp` | Not used | A Lexington street at dawn |
| `_spare-dawn-fence.webp` | Not used | Dawn mist over a plank fence |

Blog covers, in `public/images/insights/`, same brief and same rules:

| File | Post |
|---|---|
| `ai-trust-gap.webp` | The AI Trust Gap |
| `choosing-an-ai-consultant.webp` | How to Choose an AI Consultant |
| `automating-our-own-back-office.webp` | What We Automated in Our Own Back Office First |

Every post is **required** to name a `cover` in its frontmatter. A post without one fails
`npm run build` with a message naming the file (`src/lib/mdx.ts`, `requireCover`).

## Hero video

`public/videos/hero.mp4` and `hero.webm`, poster `hero-poster.webp` from its own first frame.
Aerial over misty bluegrass and plank fencing at dawn. It is the generated clip that was live
until the 2026-09-23 redesign removed it, restored from `origin/main` and re-encoded to 1600 px
(1.0 MB MP4, 0.35 MB WebM).

Grok could not make a new one: **its video tools are disabled while the account runs in zero data
retention (privacy) mode.** Turning that off, or supplying a storage bucket, would unlock them.
The video and its poster are one swappable pair, so a Seedance or Higgsfield clip can replace
them without touching any code.

## Photographs of real people

`public/photos/phil-fifield.jpg` is Phil, and he approved it on 2026-09-24 as an exception to the
no-AI-imagery rule. The three photographs of the restaurant client are not on the home page; they
are on `/work` and `/work/restaurant-franchisee`.
