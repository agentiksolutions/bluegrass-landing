import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
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
  "Invoices from many vendors arrive in one inbox and someone has to sort them by location before anything can be coded.",
  "The weekly manager meeting happens, decisions get made, and by Thursday nobody agrees on what was decided.",
  "Every location reports its numbers a different way, so comparing them is a manual job that lands on one person.",
  "The answer to a policy question lives in a binder, a shared drive, or the head of whoever has been there longest.",
  "The people who could change any of this are on the floor all day, which is where they should be.",
];

const builds = [
  {
    title: "Vendor invoice triage",
    body: "Mail comes in, gets classified by vendor and location, and only the items that need a human decision surface. Nothing gets paid automatically.",
  },
  {
    title: "Meeting notes and action items",
    body: "A recurring meeting gets transcribed and turned into a summary with action items attached to names. Last week's open items carry into this week's summary.",
  },
  {
    title: "A weekly internal update",
    body: "The same brief every week, built from the inputs you already produce, formatted the same way every time. It goes out whether or not anybody remembered to write it.",
  },
  {
    title: "One screen for every location",
    body: "Sales, labor, and whatever else you manage to, side by side across locations, updated without anyone rebuilding a spreadsheet.",
  },
  {
    title: "Your procedures, searchable",
    body: "Every SOP, vendor agreement, and training document in one place you can ask questions of in plain English. New managers stop interrupting the one person who knows.",
  },
];

const limits = [
  "These tools triage. They do not pay bills, approve invoices, or send anything to a vendor.",
  "A summary of a meeting is only as good as the audio, and someone reads it before it goes out.",
  "A searchable document library returns what your documents say. If the SOP is four years stale, so is the answer.",
];

export default function HospitalityPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              AI for hospitality businesses
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">
              Phil runs operations for a Five Guys franchisee in Central Kentucky,
              and the first tools we built were built for that job.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/back-office.webp"
              alt="A restaurant manager checking a tablet in the back office after close"
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
            The week most operations are having
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
              With a conversation about where the hours go, then{" "}
              <Link
                href="/ai-assessment"
                className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
              >
                an assessment
              </Link>{" "}
              if the scope justifies one. Single-location operations often skip
              straight to building one thing and living with it before adding a second.
            </p>
            <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[52ch]">
              Multi-location operations usually start with the numbers, because
              until every location reports the same way, nothing downstream can
              be trusted.
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
        subtext="Thirty minutes about how your locations run. If the answer is a process change rather than software, we will say that."
      />
    </>
  );
}
