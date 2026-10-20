import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Button from "@/components/button";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = pageMeta({
  title: "Built Examples",
  description:
    "Real sites and tools we have designed. Fully functional builds you can click through and interact with.",
  path: "/showroom/examples",
});

const examples = [
  {
    title: "The PFSA",
    description:
      "The public website for The Public Foundation for Stewardship Advancement, covering its mission, board and community work. It works on phones and desktops.",
    features: [
      "Mission and community work",
      "Board directory",
      "Donation integration",
      "Event calendar",
    ],
    href: "https://thepfsa.org",
    external: true,
  },
];

export default function ExamplesPage() {
  return (
    <>
      <section className="mt-16 lg:mt-[72px] px-4 md:px-10 pt-16 md:pt-24 pb-14">
        <div className="max-w-[1360px] mx-auto">
          <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[88px] leading-[0.95] font-extralight tracking-[-0.03em] text-ink">
            Built examples
          </h1>
          <p className="mt-6 text-[19px] md:text-[22px] leading-snug text-body max-w-[44ch]">
            Real sites and tools we&apos;ve designed: working builds you can click
            through and interact with.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1360px] mx-auto">
          <ul className="divide-y divide-line border-y border-line">
            {examples.map((ex) => (
              <li
                key={ex.title}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-6 lg:gap-20 py-10 md:py-12"
              >
                <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
                  {ex.title}
                </h2>
                <div>
                  <p className="text-[18px] md:text-[19px] leading-relaxed text-body max-w-[60ch]">
                    {ex.description}
                  </p>
                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {ex.features.map((f) => (
                      <li key={f} className="py-4 font-display text-[18px] md:text-[20px] font-light text-ink">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Button href={ex.href} external={ex.external}>
                      View Live Demo &rarr;
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-display text-[15px] text-muted">
            Each example here is a real build.
          </p>
        </div>
      </section>

      <CTABand
        headline="Want something like this?"
        subtext="Tell us about your business. We'll show you what we'd build."
      />
    </>
  );
}
