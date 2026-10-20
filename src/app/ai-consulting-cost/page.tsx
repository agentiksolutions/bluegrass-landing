import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import { PlanPanel } from "@/components/v2/panels";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "What Drives AI Consulting Cost",
  description:
    "What makes an AI consulting engagement cost more or less: scope, systems, approvals, the state of your data, and where the finished thing has to run.",
  path: "/ai-consulting-cost",
});

const drivers = [
  {
    title: "How much of the business is in scope",
    body: "One decision costs less than a department, which costs less than a whole company. This is the biggest driver, and you control it.",
  },
  {
    title: "How many systems have to be understood",
    body: "Three tools is a smaller job than a dozen that do not talk to each other.",
  },
  {
    title: "How many people have to agree",
    body: "One owner who decides in the room moves fast. Partners or a board mean more interviews and review rounds.",
  },
  {
    title: "The state of the data",
    body: "Clean data is cheap. Duplicate records and spreadsheets that disagree mean a migration first.",
  },
  {
    title: "Where it has to run",
    body: "A tool on your laptop costs less than one that runs at three in the morning on its own hardware or hosting.",
  },
  {
    title: "How much your team needs written down",
    body: "A solo owner needs a page. A company with managers and turnover needs procedures and training.",
  },
];

export default function CostPage() {
  return (
    <>
      <PageHero
        title="What drives the cost"
        intro="Six things explain why two similar requests get different prices."
        visual={<PlanPanel />}
      />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <p className="text-[18px] md:text-[19px] leading-relaxed text-body max-w-[36ch]">
            We do not publish a price list. A quote before we know the scope
            would have to be padded.
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {drivers.map((d) => (
              <li key={d.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 md:py-10">
                <h2 className="font-display text-[24px] md:text-[30px] font-light leading-tight text-ink">{d.title}</h2>
                <p className="text-[18px] md:text-[19px] leading-relaxed text-body">{d.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            How the number gets set
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Each phase gets a fixed price before you commit to it.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              A build is priced once{" "}
              <Link href="/ai-assessment" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                the assessment
              </Link>{" "}
              shows what to build.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            How to make it cost less
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Bring one problem instead of ten.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Put your documents and exports in one folder.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Have the person who approves the work in the room.
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/ai-assessment",
            label: "What an AI assessment involves",
            blurb: "The full sequence, and the five ways it can end.",
          },
          {
            href: "/faq",
            label: "Questions we get asked",
            blurb: "Ownership, timelines, and what happens if it breaks.",
          },
          {
            href: "/services",
            label: "What we build",
            blurb: "The four things a phase is usually made of.",
          },
          {
            href: "/ai-for-small-business-kentucky",
            label: "AI for Kentucky small business",
            blurb: "Where to start when the budget is small and the scope is one job.",
          },
        ]}
      />

      <CTABand
        headline="Start with the scope."
      />
    </>
  );
}
