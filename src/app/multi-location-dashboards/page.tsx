import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
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
  "Each site reports a slightly different way, so comparing them is a manual job before it is an insight.",
  "The weekly report is built by hand, which means it is already two days old when you read it.",
  "One person becomes the reporting bottleneck, and the numbers stop when they take a week off.",
  "A problem at one location shows up in the numbers long after the manager already knew about it.",
  "Nobody can answer a simple question about last month without opening three systems.",
];

const whatYouSee = [
  "Every location side by side, on the metrics you manage to.",
  "Comparisons against last week, last period, and the same stretch last year.",
  "Alerts when a number crosses a line you set, so you are not hunting for it.",
  "Access by role, so a manager sees their site and the owner sees everything.",
  "A phone layout, for checking the numbers from the parking lot.",
];

export default function MultiLocationDashboardsPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              Every location on one screen
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              At three or more locations you read about the week later, in reports
              that arrive on different days in different shapes.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/multi-location-truck.webp"
              alt="An operations manager in a truck at dusk checking a tablet that shows several locations"
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
            What you end up looking at
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
              Building a dashboard is the easy half. The half that takes the time
              is getting two systems to agree on what a number means, because one
              counts a void and the other does not, or one runs a week
              Monday to Sunday and the other Sunday to Saturday.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              So the first pass is always definitions. We write down what each
              metric counts, where it comes from, and which system wins when two of
              them disagree. That document is the reason people trust the
              dashboard.
            </p>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body">
              If your locations report in different shapes today, that work comes
              first, and it is usually the recommendation that comes out of{" "}
              <Link href="/ai-assessment" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                an assessment
              </Link>
              .
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
        subtext="Send us the reports your locations produce today and we will tell you what it takes to get them onto one screen with one set of definitions."
      />
    </>
  );
}
