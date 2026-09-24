import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import RelatedLinks from "@/components/related-links";

export const metadata: Metadata = pageMeta({
  title: "AI Consulting in Lexington, KY",
  description:
    "AI consulting for Lexington and Central Kentucky businesses. We learn how your company runs, then build the tools that give your team its hours back.",
  path: "/ai-consulting-lexington-ky",
});

// The ProfessionalService identity lives on the home page as #organization.
// This page adds the local service node and points at it, instead of declaring
// a second, conflicting version of the same business.
const localServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://bluegrassadvisorygroup.com/ai-consulting-lexington-ky#service",
  name: "AI Consulting in Lexington, Kentucky",
  serviceType: "AI Consulting",
  description:
    "AI integration, automation, dashboards, and operations consulting for businesses in Lexington and Central Kentucky.",
  url: "https://bluegrassadvisorygroup.com/ai-consulting-lexington-ky",
  provider: { "@id": "https://bluegrassadvisorygroup.com/#organization" },
  areaServed: [
    {
      "@type": "City",
      name: "Lexington",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lexington",
        addressRegion: "KY",
        addressCountry: "US",
      },
    },
    { "@type": "AdministrativeArea", name: "Fayette County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Jessamine County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Woodford County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Scott County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Clark County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Bourbon County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Madison County, Kentucky" },
    { "@type": "AdministrativeArea", name: "Franklin County, Kentucky" },
  ],
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: "+1-859-314-3051",
    serviceUrl: "https://bluegrassadvisorygroup.com/contact",
  },
};

const counties = [
  "Fayette",
  "Jessamine",
  "Woodford",
  "Scott",
  "Clark",
  "Bourbon",
  "Madison",
  "Franklin",
];

const whatWeHear = [
  "The numbers live in five systems and nobody sees them in one place.",
  "A manager spends most of a day every week building a report somebody skims.",
  "Someone tried a chatbot last year and the team never used it twice.",
  "There is a pile of manual work that should have been automated years ago.",
  "The owner is the only person who can answer half the questions.",
];

export default function LexingtonPage() {
  return (
    <>
      <JsonLd data={localServiceJsonLd} />

      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Lexington, Kentucky</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          AI consulting in Lexington.
        </h1>
        <p className="text-lg leading-relaxed text-charcoal max-w-[600px] mb-6">
          We are based here. Most of the businesses we work with sit inside an
          hour of downtown, so we can be in your building watching how the work
          actually moves before anyone talks about building something.
        </p>
        <p className="text-[15px] leading-relaxed text-charcoal max-w-[600px] mb-16">
          The starting point is a 30-minute call. Book one from the{" "}
          <Link href="/contact" className="text-emerald hover:underline">
            contact page
          </Link>{" "}
          or call (859) 314-3051.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <h2 className="font-display text-2xl font-bold mb-6">Where we work.</h2>
        <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px] mb-8">
          Central Kentucky, in person. Lexington and the counties around it are
          close enough for a half day on site, and that is usually how an
          engagement starts.
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {counties.map((c) => (
            <span
              key={c}
              className="text-[13px] font-semibold text-emerald bg-emerald/[0.07] px-3 py-1.5 rounded-[3px]"
            >
              {c} County
            </span>
          ))}
        </div>
        <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px]">
          We work with businesses elsewhere in Kentucky over screen share. The
          work is the same. You lose the part where we walk your floor, which
          matters more in some businesses than others.
        </p>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">
            What Lexington businesses bring us.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatWeHear.map((w) => (
              <div
                key={w}
                className="flex items-start gap-3 p-5 bg-white rounded-lg border border-line"
              >
                <span className="w-2 h-2 rounded-full bg-emerald mt-1.5 shrink-0" />
                <span className="text-[15px] leading-relaxed text-charcoal">
                  {w}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[15px] leading-relaxed text-charcoal max-w-[620px] mt-8">
            None of those are AI problems on their face. That is why we start
            with{" "}
            <Link href="/ai-assessment" className="text-emerald hover:underline">
              an assessment
            </Link>{" "}
            rather than a build. Some of them get solved by fixing a process and
            buying nothing.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <h2 className="font-display text-2xl font-bold mb-8">How it starts.</h2>
        <ol className="space-y-6 max-w-[640px]">
          <li className="flex gap-5">
            <span className="font-display text-2xl font-bold text-[#e8e5e0] leading-none pt-0.5">
              01
            </span>
            <p className="text-[15px] leading-relaxed text-charcoal">
              A 30-minute call. We ask which parts of the business are in play,
              what tools you run day to day, and who else has to agree before
              anything happens. Nothing gets sold on that call.
            </p>
          </li>
          <li className="flex gap-5">
            <span className="font-display text-2xl font-bold text-[#e8e5e0] leading-none pt-0.5">
              02
            </span>
            <p className="text-[15px] leading-relaxed text-charcoal">
              Within a day you get an email with a recommendation and the reason
              behind it. Sometimes the recommendation is that you do not need us
              yet, with a couple of free things to go read instead.
            </p>
          </li>
          <li className="flex gap-5">
            <span className="font-display text-2xl font-bold text-[#e8e5e0] leading-none pt-0.5">
              03
            </span>
            <p className="text-[15px] leading-relaxed text-charcoal">
              If it is a fit, you get a fixed price for the next phase before you
              commit to it. Every phase after that works the same way.
            </p>
          </li>
        </ol>
      </section>

      <RelatedLinks
        links={[
          {
            href: "/services",
            label: "What we build",
            blurb:
              "Web design, AI integration, dashboards, and operations consulting.",
          },
          {
            href: "/ai-assessment",
            label: "What an AI assessment involves",
            blurb:
              "The interview, the review, the roadmap, and the readout call.",
          },
          {
            href: "/ai-for-small-business-kentucky",
            label: "AI for Kentucky small business",
            blurb:
              "Where the first dollar goes when you are starting from zero.",
          },
          {
            href: "/about",
            label: "About Phil Fifield",
            blurb:
              "What he runs today, and the systems he built to run it.",
          },
        ]}
      />

      <CTABand
        headline="Let us take a look."
        subtext="30 minutes on the phone or a coffee in Lexington. Tell us how the business runs today and we will tell you whether AI is worth your money yet."
      />
    </>
  );
}
