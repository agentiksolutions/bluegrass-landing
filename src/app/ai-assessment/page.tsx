import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "What an AI Assessment Involves",
  description:
    "Inside the Bluegrass Advisory Group Roadmap: the intake form, one recorded screen-share session, a one-page systems map, a written plan and a readout call. Discovery for larger businesses.",
  path: "/ai-assessment",
});

// Roadmap steps, deliverables and price come from Discovery-Kit/BAG-Engagement-Catalog.md,
// "Roadmap" and "Tier 0" (2026-10-07). The Discovery section comes from "Tier 2".
const roadmapSteps = [
  {
    title: "The intro call",
    body: "Thirty minutes, no charge. We ask which parts of the business are in scope, how many tools your team touches in a day, and who else has to sign off. By the end of it you have a recommendation, and one of the things we recommend is doing nothing yet.",
  },
  {
    title: "The intake form",
    body: "A questionnaire you fill in online about your business, your tools and your people. It is free, and we read it before we meet.",
  },
  {
    title: "The session",
    body: "You and the people who do the work show us how it gets done today, in one recorded screen-share session. If you prefer, we do it at your office instead.",
  },
  {
    title: "The systems map",
    body: "A one-page drawing of the tools you use today, who uses each one, and how information moves between them. We build it from your intake form and the session.",
  },
  {
    title: "The written plan",
    body: "The three workflows to start with, which Business AI Setup package fits and why, what stays off limits for the assistant, and what happens in the first 30 days.",
  },
  {
    title: "The readout call",
    body: "We walk you through the map and the plan and answer your questions.",
  },
];

const discoverySteps = [
  {
    title: "Intake",
    body: "Once Discovery is signed we send a questionnaire and a short list of things to send over. Whatever documents you already have are enough. Nobody needs to build a data room for us.",
  },
  {
    title: "The interview",
    body: "A live conversation about how the business runs. For a single department it is one session. For a multi-entity business it is several sessions with the owner and the people who run each piece.",
  },
  {
    title: "The review",
    body: "We read everything you sent and map what you currently run against what the work requires. This is the quiet part, and it is where most of the hours go.",
  },
  {
    title: "The roadmap",
    body: "You get a written document: where the business stands today, which opportunities are worth money, what order to do them in, and what a build would involve where a build is the answer. It arrives as a PDF plus the plain-text source, so it is yours to edit and yours to keep.",
  },
  {
    title: "The walkthrough",
    body: "Before the live call, we send a recorded walkthrough of the document. Watch it when it suits you, so the call is about your questions instead of our narration.",
  },
  {
    title: "The readout",
    body: "A live call to go through the recommendations and make decisions. After it, you can email follow-up questions during a window we agree on before you sign.",
  },
];

const outcomes = [
  {
    label: "Custom build",
    body: "Your situation needs systems that do not exist yet. The roadmap specifies them so any competent firm could build them, including one that is not us.",
  },
  {
    label: "Tools-based optimization",
    body: "Your stack is fine. The gap is that nothing talks to anything, and the answer is automation around what you already pay for.",
  },
  {
    label: "Process first",
    body: "Documentation, training, and who-does-what are the problem. Buying software would bury it.",
  },
  {
    label: "Embedded support",
    body: "The work is ongoing rather than a project, and an Embedded Retainer is the right shape.",
  },
  {
    label: "Walk away",
    body: "You got what you needed from Discovery and you can take it from here. We say so and the engagement ends there.",
  },
];

const notIncluded = [
  "Building the recommendations. That is a separate engagement with its own fixed price.",
  "Custom workflows, agents, or integrations.",
  "Ongoing revisions after the follow-up window closes.",
  "Negotiating with your vendors on your behalf.",
];

export default function AIAssessmentPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              What an AI assessment involves
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              For most businesses the assessment is the Roadmap. It tells you
              where AI fits in your business and which setup to buy.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/assessment-walkthrough.webp"
              alt="One person pointing at a spreadsheet on a laptop while explaining their work to another who takes notes"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              The Roadmap
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[36ch]">
              Here is the whole sequence, start to finish.
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {roadmapSteps.map((s) => (
              <li key={s.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 md:py-10">
                <h3 className="font-display text-[24px] md:text-[30px] font-light leading-tight text-ink">{s.title}</h3>
                <p className="text-[18px] md:text-[19px] leading-relaxed text-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            Price
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              The Roadmap is $2,500. All of it counts toward a Business AI Setup
              package (Essentials, Professional or Custom) bought within 30 days
              of the readout call.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              The Roadmap is optional. You can buy a Business AI Setup without it.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Discovery, for larger businesses
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[36ch]">
              Discovery &amp; Strategic Roadmap takes the place of the Roadmap
              for businesses with several companies or entities, or custom work
              over $10,000. You get an assessment of where you are, ranked
              recommendations and a sequenced roadmap.
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {discoverySteps.map((s) => (
              <li key={s.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 md:py-10">
                <h3 className="font-display text-[24px] md:text-[30px] font-light leading-tight text-ink">{s.title}</h3>
                <p className="text-[18px] md:text-[19px] leading-relaxed text-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Five ways Discovery can end
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[40ch]">
              Every Discovery lands on one of these. The fifth one matters most:
              a roadmap that always recommends buying more from the firm that
              wrote it is a sales document.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {outcomes.map((o) => (
              <li key={o.label} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-7 md:py-8">
                <h3 className="font-display text-[22px] md:text-[26px] font-light leading-tight text-ink">{o.label}</h3>
                <p className="text-[18px] leading-relaxed text-body">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Discovery timing and price
            </h2>
            <p className="mt-8 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              Timing is agreed with you for each project before you sign.
            </p>
            <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              The price of Discovery is fixed before you sign, and it is set by
              how much of the business is in scope. What moves it is covered on{" "}
              <Link
                href="/ai-consulting-cost"
                className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
              >
                the cost page
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              What Discovery does not include
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {notIncluded.map((n) => (
                <li key={n} className="py-5 text-[18px] leading-relaxed text-body">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/services/operations",
            label: "Operations consulting",
            blurb:
              "What happens after the roadmap says the process is the problem.",
          },
          {
            href: "/ai-tools-we-build",
            label: "The tools we build most often",
            blurb: "What usually comes out the other side of an assessment.",
          },
          {
            href: "/showroom/report",
            label: "Try the readiness report",
            blurb:
              "A free, automated version of the first question an assessment asks.",
          },
          {
            href: "/faq",
            label: "Questions we get asked",
            blurb: "Ownership, timelines, what we need from you, and what it costs.",
          },
        ]}
      />

      <CTABand
        headline="Start with the call."
        subtext="Thirty minutes, at no charge. You leave with a recommendation, even if it is that an assessment would be a waste of your money right now."
      />
    </>
  );
}
