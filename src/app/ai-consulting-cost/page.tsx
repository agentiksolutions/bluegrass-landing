import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
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
    num: "01",
    title: "How much of the business is in scope",
    body: "One decision costs less than one department, which costs less than a whole company, which costs less than several companies under one owner. This is the single biggest driver, and it is the one you control. Narrowing the question is the cheapest thing you can do.",
  },
  {
    num: "02",
    title: "How many systems have to be understood",
    body: "A business running three tools is a different job from one running a dozen that were bought at different times and do not speak to each other. Every integration point has to be mapped before anything can be built on top of it.",
  },
  {
    num: "03",
    title: "How many people have to agree",
    body: "One owner who can decide in the room moves fast. Partners, a board, or department heads who each own a piece of the process means more interviews, more review rounds, and a longer path to a decision.",
  },
  {
    num: "04",
    title: "The state of the data",
    body: "Clean systems with consistent naming are cheap to work with. Years of exports, duplicated records, and two spreadsheets that disagree are a migration, and a migration is real work before any AI touches it.",
  },
  {
    num: "05",
    title: "Where it has to run",
    body: "Something that runs on your laptop while you work costs less than something that has to run at three in the morning whether or not anyone is logged in. Always-on needs hardware or hosting, and that carries its own setup.",
  },
  {
    num: "06",
    title: "How much your team needs written down",
    body: "A solo owner needs a page. A company with managers and turnover needs procedures, training, and a way for the next person to pick it up. Documentation scales with headcount, and it is usually the part people underestimate.",
  },
];

export default function CostPage() {
  return (
    <>
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Cost</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          What drives the cost.
        </h1>
        <p className="text-lg leading-relaxed text-[#666] max-w-[620px] mb-4">
          Two businesses can ask for the same thing and get numbers that are
          nowhere near each other. Six things account for almost all of that gap,
          and you can work out roughly where you sit before you ever talk to us.
        </p>
        <p className="text-[15px] leading-relaxed text-[#666] max-w-[620px] mb-16">
          We do not publish a price list. A number quoted before anyone
          understands the scope has to be padded to be safe, and you would be
          paying for the padding.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <div className="flex flex-col">
          {drivers.map((d) => (
            <div
              key={d.num}
              className="grid grid-cols-[44px_1fr] gap-6 py-7 border-t border-[#e8e5e0]"
            >
              <span className="font-display text-[13px] font-bold text-emerald pt-1">
                {d.num}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold mb-2">
                  {d.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-[#666] max-w-[620px]">
                  {d.body}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-[#e8e5e0]" />
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">
            How the number gets set.
          </h2>
          <p className="text-[15px] leading-relaxed text-[#666] mb-4">
            You get fixed numbers. The work breaks into phases and each phase
            gets a firm price before you commit to it, so you are deciding on one
            piece at a time with the previous piece already in your hands.
          </p>
          <p className="text-[15px] leading-relaxed text-[#666] mb-4">
            An assessment is priced on scope at the start and does not move. A
            build is priced once we know what is being built, which is usually
            what the assessment is for. If a phase turns out to be smaller than
            it looked, the price comes down.
          </p>
          <p className="text-[15px] leading-relaxed text-[#666]">
            The sequence itself is on{" "}
            <Link href="/ai-assessment" className="text-emerald hover:underline">
              the assessment page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="max-w-[680px]">
          <h2 className="font-display text-2xl font-bold mb-6">
            How to make it cost less.
          </h2>
          <p className="text-[15px] leading-relaxed text-[#666] mb-4">
            Bring one problem instead of ten. The fastest engagements start with
            a single job that eats hours every week, get that running, and
            expand from something that already works.
          </p>
          <p className="text-[15px] leading-relaxed text-[#666] mb-4">
            Tidy what you already have. An hour spent putting your documents and
            exports in one folder saves more than an hour of ours.
          </p>
          <p className="text-[15px] leading-relaxed text-[#666]">
            Decide who decides. The engagements that drift are the ones where
            the person who has to approve the work was never in the room.
          </p>
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
        headline="Get a real number."
        subtext="Book 30 minutes. Tell us the scope and we will tell you what it takes, or tell you it is not worth doing yet."
      />
    </>
  );
}
