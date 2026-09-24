import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Button from "@/components/button";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "Multi-Location Dashboards",
  description:
    "Dashboards for owners running three or more sites: every location on one screen, updated automatically, with the numbers defined the same way everywhere.",
  path: "/multi-location-dashboards",
});

const whatBreaks = [
  "Each site reports a slightly different way, so comparing them is a manual job before it is an insight.",
  "The weekly report is built by hand, which means it is already two days old when you read it.",
  "One person becomes the reporting bottleneck, and the numbers stop when they take a week off.",
  "A problem at one location shows up in the numbers long after the manager already knew about it.",
  "Nobody can answer a simple question about last month without opening three systems.",
];

const whatYouSee = [
  "Every location side by side, on the metrics you actually manage to.",
  "Comparisons against last week, last period, and the same stretch last year.",
  "Alerts when a number crosses a line you set, so you are not hunting for it.",
  "Access by role, so a manager sees their site and the owner sees everything.",
  "A phone layout, because most of these get checked in a parking lot.",
];

export default function MultiLocationDashboardsPage() {
  return (
    <>
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Dashboards</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          Every location on one screen.
        </h1>
        <p className="text-lg leading-relaxed text-charcoal max-w-[620px] mb-4">
          At one site you can walk the floor and know how the week is going. At
          three or more you are reading about it later, in reports that arrive on
          different days in different shapes.
        </p>
        <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px] mb-16">
          This is the version of{" "}
          <Link
            href="/services/dashboards"
            className="text-emerald hover:underline"
          >
            our dashboard work
          </Link>{" "}
          built for owners with more than one address.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <h2 className="font-display text-2xl font-bold mb-8">
          What breaks at three locations.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatBreaks.map((w) => (
            <div
              key={w}
              className="flex items-start gap-3 p-5 bg-white rounded-lg border border-line"
            >
              <span className="w-2 h-2 rounded-full bg-emerald mt-1.5 shrink-0" />
              <span className="text-[15px] leading-relaxed text-charcoal">{w}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">
            What you end up looking at.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatYouSee.map((w) => (
              <p key={w} className="text-[15px] leading-relaxed text-charcoal">
                &bull; {w}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/showroom/dashboard">Try the dashboard demo</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="max-w-[680px]">
          <h2 className="font-display text-2xl font-bold mb-6">
            The hard part is not the screen.
          </h2>
          <p className="text-[15px] leading-relaxed text-charcoal mb-4">
            Building a dashboard is the easy half. The half that takes the time
            is getting two systems to agree on what a number means, because one
            counts a void and the other does not, or one runs a week
            Monday to Sunday and the other Sunday to Saturday.
          </p>
          <p className="text-[15px] leading-relaxed text-charcoal mb-4">
            So the first pass is always definitions. We write down what each
            metric counts, where it comes from, and which system wins when two of
            them disagree. That document is worth more than the dashboard, and it
            is the reason the dashboard gets trusted.
          </p>
          <p className="text-[15px] leading-relaxed text-charcoal">
            If your locations report in different shapes today, that work comes
            first, and it is usually the recommendation that comes out of{" "}
            <Link href="/ai-assessment" className="text-emerald hover:underline">
              an assessment
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/services/dashboards",
            label: "Dashboards and data",
            blurb: "The service page, including single-location work.",
          },
          {
            href: "/ai-for-hospitality",
            label: "AI for hospitality businesses",
            blurb: "The industry where most of these get built.",
          },
          {
            href: "/work/restaurant-franchisee",
            label: "Case study: three stores, one manager portal",
            blurb: "One place for store results, checklists and training status.",
          },
          {
            href: "/ai-consulting-cost",
            label: "What drives the cost",
            blurb: "Why the state of your data moves the number more than anything.",
          },
        ]}
      />

      <CTABand
        headline="Bring your three reports."
        subtext="Send us the reports your locations produce today and we will tell you what it takes to get them onto one screen that agrees with itself."
      />
    </>
  );
}
