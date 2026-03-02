import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Card from "@/components/card";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Built Examples",
  description:
    "Real sites and tools we've designed. Not mockups — fully functional builds you can click through and interact with.",
};

const examples = [
  {
    title: "The PFSA",
    description:
      "A modern website for the Public Foundation of Stewardship Advancement. Built to showcase the organization's mission, board, and community impact — fully functional, mobile-responsive, zero templates.",
    features: [
      "Mission and impact showcase",
      "Board directory",
      "Donation integration",
      "Event calendar",
    ],
    tag: "Nonprofit Website",
    href: "https://thepfsa.org",
    external: true,
  },
];

export default function ExamplesPage() {
  return (
    <>
      <div className="max-w-content mx-auto px-6 md:px-12 pt-[148px]">
        <SectionLabel>Room 04</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          Built examples.
        </h1>
        <p className="text-[17px] leading-relaxed text-stone max-w-[520px] mb-16">
          Real sites and tools we&apos;ve designed. Not mockups — fully
          functional builds you can click through and interact with.
        </p>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 gap-6">
          {examples.map((ex) => (
            <Card key={ex.title} className="!p-10">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-display text-2xl font-bold">{ex.title}</h2>
                <span className="text-[10px] font-bold tracking-[1.5px] text-emerald uppercase bg-emerald/[0.07] px-2.5 py-1 rounded-[3px]">
                  {ex.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-stone mb-6 max-w-[560px]">
                {ex.description}
              </p>
              <ul className="mb-8 space-y-2">
                {ex.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#666]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={ex.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-graphite text-warm-white px-7 py-3.5 rounded text-sm font-semibold hover:bg-emerald transition-colors"
              >
                View Live Demo &rarr;
              </a>
            </Card>
          ))}
        </div>

        <p className="text-center text-[13px] text-stone mt-12">
          More examples coming soon. Each one is a real build, not a template.
        </p>
      </div>

      <CTABand
        dark
        headline="Want something like this?"
        subtext="Tell us about your business. We'll show you what we'd build."
      />
    </>
  );
}
