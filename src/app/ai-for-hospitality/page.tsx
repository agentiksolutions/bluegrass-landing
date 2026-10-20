import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import { StorePanel } from "@/components/v2/panels";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "AI for Hospitality Businesses",
  description:
    "AI and automation for hospitality businesses: vendor invoices, meeting notes, team communication, and one set of numbers across every location.",
  path: "/ai-for-hospitality",
});

const weeklyReality = [
  "Invoices from many vendors arrive in one inbox, and someone sorts them by location.",
  "By Thursday, nobody agrees on what the weekly manager meeting decided.",
  "Every location reports differently, so one person compares them by hand.",
  "Policy answers live in a binder or in the head of whoever has been there longest.",
];

const builds = [
  {
    title: "Vendor invoice triage",
    body: "Sorts mail by vendor and location and flags what needs a person. Nothing gets paid automatically.",
  },
  {
    title: "Meeting notes and action items",
    body: "A summary with action items attached to names. Open items carry into next week.",
  },
  {
    title: "A weekly internal update",
    body: "The same brief every week, built from inputs you already produce.",
  },
  {
    title: "One screen for every location",
    body: "Sales and labor side by side, with no spreadsheet to rebuild.",
  },
  {
    title: "Your procedures, searchable",
    body: "Ask your SOPs and training documents questions in plain English.",
  },
];

const limits = [
  "They do not pay bills, approve invoices, or send anything to a vendor.",
  "Someone reads each meeting summary before it goes out.",
  "Search returns what your documents say. A stale SOP gives a stale answer.",
];

export default function HospitalityPage() {
  return (
    <>
      <PageHero
        title="AI for hospitality businesses"
        intro="We built our first tools for a Five Guys franchisee in Central Kentucky."
        visual={<StorePanel />}
      />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            A typical week
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {weeklyReality.map((w) => (
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
            What we build for hospitality
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {builds.map((b) => (
              <li key={b.title} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-7 md:py-8">
                <h3 className="font-display text-[22px] md:text-[26px] font-light leading-tight text-ink">{b.title}</h3>
                <p className="text-[18px] leading-relaxed text-body">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              What these tools will not do
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {limits.map((l) => (
                <li key={l} className="py-5 text-[18px] leading-relaxed text-body">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
              Where a hospitality engagement starts
            </h2>
            <p className="mt-8 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              With a talk about where the hours go, then{" "}
              <Link
                href="/ai-assessment"
                className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
              >
                an assessment
              </Link>{" "}
              if the scope justifies one.
            </p>
            <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              Multi-location operations usually start with the numbers.
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/work/restaurant-franchisee",
            label: "The franchisee's three stores",
            blurb: "The specifics of what we built for that operation.",
          },
          {
            href: "/services/ai-integration",
            label: "AI integration",
            blurb: "How the build side works once the scope is agreed.",
          },
          {
            href: "/multi-location-dashboards",
            label: "Multi-location dashboards",
            blurb: "One set of numbers across three sites or thirty.",
          },
          {
            href: "/ai-tools-we-build",
            label: "The tools we build most often",
            blurb: "The full list, with the limits on each one.",
          },
          {
            href: "/ai-consulting-lexington-ky",
            label: "Working with us in Lexington",
            blurb: "Where we are and which counties we cover in person.",
          },
        ]}
      />

      <CTABand
        headline="Tell us where the week goes."
      />
    </>
  );
}
