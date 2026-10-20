import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import { SystemsMap } from "@/components/v2/panels";
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
    body: "Thirty minutes, no charge. You leave with a recommendation, and sometimes it is to do nothing yet.",
  },
  {
    title: "The intake form",
    body: "A free online questionnaire about your business, tools and people.",
  },
  {
    title: "The session",
    body: "Your team shows us the work in one recorded screen share, or at your office.",
  },
  {
    title: "The systems map",
    body: "One page showing your tools, who uses each one, and how information moves.",
  },
  {
    title: "The written plan",
    body: "The first three workflows, which Business AI Setup package fits, what stays off limits, and the first 30 days.",
  },
  {
    title: "The readout call",
    body: "We walk you through the map and the plan.",
  },
];

const discoverySteps = [
  {
    title: "Intake",
    body: "A questionnaire and whatever documents you already have.",
  },
  {
    title: "The interview",
    body: "Live sessions with the owner and the people who run each piece.",
  },
  {
    title: "The review",
    body: "We map what you run against what the work requires.",
  },
  {
    title: "The roadmap",
    body: "Where you stand, what is worth money, and what order to do it in. A PDF plus the plain-text source, yours to keep.",
  },
  {
    title: "The readout",
    body: "A recorded walkthrough, then a live call to make decisions.",
  },
];

const outcomes = [
  {
    label: "Custom build",
    body: "New systems, specified so any competent firm could build them.",
  },
  {
    label: "Tools-based optimization",
    body: "Your tools are fine. Automation connects what you already pay for.",
  },
  {
    label: "Process first",
    body: "Fix documentation, training and who-does-what before buying software.",
  },
  {
    label: "Embedded support",
    body: "The work is ongoing, so an Embedded Retainer fits.",
  },
  {
    label: "Walk away",
    body: "You can take it from here. We say so and stop.",
  },
];

const notIncluded = [
  "Building the recommendations. That has its own fixed price.",
  "Custom workflows, agents, or integrations.",
  "Negotiating with your vendors.",
];

export default function AIAssessmentPage() {
  return (
    <>
      <PageHero
        title="What an AI assessment involves"
        intro="Our Roadmap shows where AI fits and which setup to buy."
        visual={<SystemsMap />}
      />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              The Roadmap
            </h2>
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
              bought within 30 days of the readout call.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              It is optional.
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
              For several companies, or custom work over $10,000, Discovery
              &amp; Strategic Roadmap replaces the Roadmap.
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
              Both are agreed before you sign. What moves the price is on{" "}
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
      />
    </>
  );
}
