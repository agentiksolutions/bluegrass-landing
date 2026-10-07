import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
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
    body: "One decision costs less than one department, which costs less than a whole company, which costs less than several companies under one owner. This is the single biggest driver, and it is the one you control. Narrowing the question is the cheapest thing you can do.",
  },
  {
    title: "How many systems have to be understood",
    body: "A business running three tools is a different job from one running a dozen that were bought at different times and do not speak to each other. Every integration point has to be mapped before anything can be built on top of it.",
  },
  {
    title: "How many people have to agree",
    body: "One owner who can decide in the room moves fast. Partners, a board, or department heads who each own a piece of the process means more interviews, more review rounds, and a longer path to a decision.",
  },
  {
    title: "The state of the data",
    body: "Clean systems with consistent naming are cheap to work with. Years of exports, duplicated records, and two spreadsheets that disagree are a migration, and a migration is real work before any AI touches it.",
  },
  {
    title: "Where it has to run",
    body: "Something that runs on your laptop while you work costs less than something that has to run at three in the morning whether or not anyone is logged in. Always-on needs hardware or hosting, and that carries its own setup.",
  },
  {
    title: "How much your team needs written down",
    body: "A solo owner needs a page. A company with managers and turnover needs procedures, training, and a way for the next person to pick it up. Documentation scales with headcount, and it is usually the part people underestimate.",
  },
];

export default function CostPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              What drives the cost
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              Two businesses can ask for the same thing and get numbers that are
              nowhere near each other. Six things account for almost all of that gap,
              and you can work out roughly where you sit before you ever talk to us.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/owner-reviewing-plan.webp"
              alt="A business owner at a kitchen table at night reading a printed plan beside a laptop"
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
          <p className="text-[18px] md:text-[19px] leading-relaxed text-body max-w-[36ch]">
            We do not publish a price list. A number quoted before anyone
            understands the scope has to be padded to be safe, and you would be
            paying for the padding.
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
              You get fixed numbers. The work breaks into phases and each phase
              gets a firm price before you commit to it, so you are deciding on one
              piece at a time with the previous piece already in your hands.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              An assessment is priced on scope at the start and does not move. A
              build is priced once we know what is being built, which is usually
              what the assessment is for. If a phase turns out to be smaller than
              it looked, the price comes down.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              The sequence itself is on{" "}
              <Link href="/ai-assessment" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                the assessment page
              </Link>
              .
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
              Bring one problem instead of ten. The fastest engagements start with
              a single job that eats hours every week, get that running, and
              expand from something that already works.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Tidy what you already have. An hour spent putting your documents and
              exports in one folder saves more than an hour of ours.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              Decide who decides. The engagements that drift are the ones where
              the person who has to approve the work was never in the room.
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
        subtext="Book 30 minutes. Tell us the scope and we will tell you what it takes, or that it is too early."
      />
    </>
  );
}
