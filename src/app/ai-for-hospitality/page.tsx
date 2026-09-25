import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Card from "@/components/card";
import CTABand from "@/components/cta-band";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "AI for Hospitality Businesses",
  description:
    "AI and automation for hospitality businesses: vendor invoices, meeting notes, team communication, and one set of numbers across every location.",
  path: "/ai-for-hospitality",
});

const weeklyReality = [
  "Invoices from twenty-odd vendors land in one inbox and someone has to sort them by location before anything can be coded.",
  "The weekly manager meeting happens, decisions get made, and by Thursday nobody agrees on what was decided.",
  "Every location reports its numbers a different way, so comparing them is a manual job that lands on one person.",
  "The answer to a policy question lives in a binder, a shared drive, or the head of whoever has been there longest.",
  "The people who could fix any of this are on the floor all day, which is where they should be.",
];

const builds = [
  {
    title: "Vendor invoice triage",
    body: "Mail comes in, gets classified by vendor and location, and only the items that need a human decision surface. Nothing gets paid automatically. The pile stops being a pile.",
  },
  {
    title: "Meeting notes that write themselves",
    body: "A recurring meeting gets transcribed and turned into a summary with action items attached to names. Last week's items carry forward on their own, so accountability survives past the meeting.",
  },
  {
    title: "A weekly internal update",
    body: "The same brief every week, built from the inputs you already produce, formatted the same way every time. It goes out whether or not anybody remembered to write it.",
  },
  {
    title: "One screen for every location",
    body: "Sales, labor, and whatever else you actually manage to, side by side across locations, updated without anyone rebuilding a spreadsheet.",
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
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Hospitality</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          AI for hospitality businesses.
        </h1>
        <p className="text-lg leading-relaxed text-[#666] max-w-[620px] mb-4">
          This is the industry we came out of. Phil spent more than a decade in
          hospitality operations, managing hundreds of employees across multiple
          locations, and the first tools we ever built were built to fix that job.
        </p>
        <p className="text-[15px] leading-relaxed text-[#666] max-w-[620px] mb-16">
          You can read what we built for our own operations in our{" "}
          <Link href="/insights" className="text-emerald hover:underline">
            insights
          </Link>
          .
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <h2 className="font-display text-2xl font-bold mb-8">
          The week most operations are actually having.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyReality.map((w) => (
            <div
              key={w}
              className="flex items-start gap-3 p-5 bg-white rounded-lg border border-[#e8e5e0]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald mt-1.5 shrink-0" />
              <span className="text-[15px] leading-relaxed text-[#555]">{w}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">
            What we build for hospitality.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {builds.map((b) => (
              <Card key={b.title} className="!p-8 h-full">
                <h3 className="font-display text-lg font-bold mb-3">
                  {b.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#666]">
                  {b.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px]">
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">
              What these tools will not do.
            </h2>
            <div className="space-y-4">
              {limits.map((l) => (
                <p key={l} className="text-[15px] leading-relaxed text-[#666]">
                  &bull; {l}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">
              Where a hospitality engagement starts.
            </h2>
            <p className="text-[15px] leading-relaxed text-[#666] mb-4">
              With a conversation about where the hours go, then{" "}
              <Link
                href="/ai-assessment"
                className="text-emerald hover:underline"
              >
                an assessment
              </Link>{" "}
              if the scope justifies one. Single-location operations often skip
              straight to building one thing and living with it for a month.
            </p>
            <p className="text-[15px] leading-relaxed text-[#666]">
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
            blurb: "The full list, with the honest limits on each one.",
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
        subtext="Thirty minutes about how your locations actually run. If the answer is a process fix rather than software, we will say that."
      />
    </>
  );
}
