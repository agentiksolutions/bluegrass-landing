import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import DataToDashboard from "@/components/v2/data-to-dashboard";
import { LocationsPanel } from "@/components/v2/panels";
import Link from "next/link";
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
  "Each site reports differently, so comparing them is manual work.",
  "The weekly report is built by hand and is two days old when you read it.",
  "One person owns reporting, and the numbers stop when they take a week off.",
  "A simple question about last month takes three systems to answer.",
];

const whatYouSee = [
  "Every location side by side, on the metrics you manage to.",
  "Comparisons to last week, last period, and last year.",
  "Alerts when a number crosses a line you set.",
  "Access by role: a manager sees their site, the owner sees everything.",
  "A phone layout for checking from the parking lot.",
];

export default function MultiLocationDashboardsPage() {
  return (
    <>
      <PageHero
        title="Every location on one screen"
        intro="At three or more locations, reports arrive late and in different shapes."
        visual={<LocationsPanel />}
      />
      <DataToDashboard title="Three locations, counted the same way." />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            What breaks at three locations
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {whatBreaks.map((w) => (
              <li key={w} className="py-6 font-display text-[19px] md:text-[23px] font-light leading-snug text-ink">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            What you see
          </h2>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {whatYouSee.map((w) => (
                <li key={w} className="py-5 text-[18px] leading-relaxed text-body">
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/showroom/dashboard">Try the dashboard demo</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            Definitions come first
          </h2>
          <div className="max-w-[62ch] space-y-5">
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              The slow part is getting two systems to agree on a number, like
              whether a void counts or which day the week starts.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              We write down what each metric counts and which system wins. That
              document is why people trust the dashboard, and{" "}
              <Link href="/ai-assessment" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                an assessment
              </Link>{" "}
              usually puts it first.
            </p>
          </div>
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
      />
    </>
  );
}
