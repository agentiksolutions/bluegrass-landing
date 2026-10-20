# APAX Software: what their site says and how it says it

Written 2026-09-25. Source: apaxsoftware.com, fetched the same day as raw HTML. Every quoted
headline below was checked against that HTML. Word counts are the text inside `<main>` with tags,
scripts, navigation and footer removed.

APAX is a Lexington custom software and AI firm, in business since 2007. This teardown is about
content and structure first. Visuals are covered at the end, briefly.

## Pages read

| Page | Words in main |
|---|---|
| Home `/` | 815 |
| AI Readiness & Adoption `/services/ai-readiness/` | 748 |
| About `/about/` | 910 |
| Case study, FindHelpNowKY `/results/findhelpnow/` | 598 |

## The home page, section by section

| # | Section headline (verbatim) | What it says | What it is doing |
|---|---|---|---|
| 1 | "Software that works the way you do." | Subhead lists three familiar messes: "The spreadsheet that became a system. The workflow nobody owns. The website your team outgrew." Then one sentence on what APAX builds and the result for the customer. Two buttons: "Let's Talk About Your Project" and "See How We Help". Three numbers: "300+ Clients Served", "91K+ Development Hours", "18+ Years in Business". | Headline about the customer, not the firm. The subhead names problems the reader recognises before it names the firm. Proof arrives on the first screen. |
| 2 | "Built for teams with real stakes." | "Our clients come to us when the work matters, the system needs to hold up, and the path forward is not obvious." Then eight client logos (University of Kentucky, Keeneland, UK HealthCare and others). | Trust by association, straight after the hero. Logos carry it; the copy is one sentence. |
| 3 | "What we help you fix" | "Technology should make the business easier to run. Too often, it does the opposite. If any of these sound familiar, we should talk." Eight lines, each starting "Your...": "Your team is relying on spreadsheets, duplicate entry, and manual workarounds." "Your systems do not talk to each other." "Your team wants to use AI, but needs a practical use case and a safe plan." | A checklist the reader self-diagnoses against. Written in the customer's words, second person, present tense. No jargon. |
| 4 | "How APAX helps" | Five services (Custom Software; AI Strategy and Implementation; Digital Platforms and Websites; System Modernization; Integrations and Data Workflows). Each gets a two-sentence description and "Learn more". Example: "AI is only valuable when it solves a real problem. We help teams identify practical use cases, assess data and workflow readiness, and build AI-supported tools that fit into daily work." | Each service description opens with a belief or a problem, then says what they do. Plain verbs: design, build, connect, replace. |
| 5 | "AI that fits the work, not the hype." | "Most companies do not need an AI strategy that lives in a slide deck. They need to know where AI can save time, improve decisions, reduce manual work, or create a better experience..." Then six things they do: "Identify AI use cases tied to real business pain", "Review workflows, data, and systems for readiness", "Create safer processes for using AI across teams", "Pilot ideas before making a large investment". | AI gets its own section. It is framed as practical and low-risk, aimed at a buyer who is curious and nervous. |
| 6 | "Results that speak for themselves" | Three case studies. The lead one lives on a single number: "From 72 hours to 6 minutes to find addiction treatment", plus usage figures. Two named client quotes with person and organisation. | Outcome numbers and named people. Each case is one line of result, one line of context. |
| 7 | "Deep experience in your market" | "We understand the problems unique to your industry because we have solved them before." Six industry links. | Lets a visitor find their own industry in one click. |
| 8 | "From the APAX blog" | Three recent posts with category, date and a long excerpt. One is written by a staff developer in the first person. | Shows the firm is active and has people with opinions. |
| 9 | "Have a project, platform, or system you need to figure out?" | "You do not need every answer before the first conversation. Bring the messy process, the outdated system, the stalled project, the half-formed idea... We will help you sort through what is worth building, what is worth fixing, and what should happen next." Two buttons. | Lowers the bar to the first call. Lists messes again, the same device as the hero. |

## Patterns worth copying

1. **The reader is the subject.** Most sentences start with "Your" or "You". The firm name shows
   up in one heading ("How APAX helps") and a few body lines.
2. **Problems before services.** They name the mess (spreadsheets, systems that do not talk, a
   stalled project) before they say what they sell. Section 3 is a self-diagnosis checklist.
3. **Each service is two sentences.** First a belief or a problem, then what they do about it.
   No feature lists on the home page; the lists live on the service pages.
4. **Proof early and often.** Numbers on the first screen, logos second, results with one hard
   number each, named quotes. The AI page has no stats and leans on a guarantee instead.
5. **Low-pressure calls to action.** Every button is some form of "Let's talk". The closing
   section says you do not need every answer first.
6. **Repetition of one device.** The list of familiar messes opens the page and closes it.
7. **Headlines are short and plain.** Most are five to seven words.

## Inner pages

- **AI Readiness & Adoption.** Order: promise, three buyer worries ("You know AI is important",
  "Your team is stretched thin", "The cost feels uncertain"), a three-step process (Assess, Build,
  Grow), pricing model, FAQ, related services, closing call. Key line: "The question isn't whether
  to adopt it. It's how to adopt it in a way that generates real, measurable value for your
  business." The worries section is the strongest part: it answers objections before a call.
- **About.** Origin story (founded 2007 by University of Kentucky engineering students), four
  values ("Be Good", "Be Excellent", "Be a Friend", "Be You"), named leadership with titles, a
  partnership approach, a five-step process (Align, Discover, Build, Launch, Serve), a guarantee
  section, then hiring.
- **Case study.** Overview (the problem), methods used, process, final product (the result),
  other projects, closing call. About 600 words. One number carries the story (72 hours to 6
  minutes), and one named client quote backs it.

## What we should not copy

These are either banned by our brand rules or are offers we do not have:

- The italic accent word in the hero headline.
- Category tags above case studies and blog cards.
- A grid of identical service cards.
- "AI that fits the work, not the hype." The "X, not Y" shape is on our banned list. We keep the
  section and give it a plain headline.
- A websites service. Standalone websites are not something we list.
- A money-back guarantee. Our catalog has none, so it would be invented.
- Their numbers. Ours stay as marked placeholders until they are calculated from real data.

## Visuals, briefly

White page, one brand color, photography of real client work and staff, logos in a strip. Icons
beside each problem and service line. Case studies use screenshots of the finished product. The
motion is light: fades on scroll.

## How our draft maps to it

`src/app/page.tsx` on branch `homepage-apax-model` follows the same nine-part order: hero with
three proof figures, client logos, "what we help with" checklist, three services (Education,
Build, Support), an AI section, results, who we work with, the blog, and a closing call. Copy is
held to about 300 words, so each section carries fewer lines than APAX's.
