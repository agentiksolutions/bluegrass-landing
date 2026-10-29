import type { Metadata } from "next";
import CTABand from "@/components/cta-band";
import PageHero from "@/components/v2/page-hero";
import { SystemsMap } from "@/components/v2/panels";
import { FadeUp } from "@/components/v2/reveal";
import { PathSteps } from "@/components/v2/scroll-sections";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "How It Starts",
  description:
    "How work with Bluegrass Advisory Group starts: a free intro call, a Roadmap, a Business AI Setup, then a monthly plan. Lexington, Kentucky.",
  path: "/how-it-starts",
});

// Moved off the home page (Phil, 2026-10-29). Steps are the catalog's small-business path.
const steps = [
  { title: "Free intro call" },
  { title: "Roadmap" },
  { title: "Business AI Setup" },
  { title: "A monthly plan" },
];

export default function HowItStartsPage() {
  return (
    <>
      <PageHero title="How it starts" compact />
      <section className="bg-white px-4 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-page grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <FadeUp>
            <SystemsMap />
          </FadeUp>
          <PathSteps steps={steps} />
        </div>
      </section>
      <CTABand headline="Start with a free 30-minute call." subtext="" />
    </>
  );
}
