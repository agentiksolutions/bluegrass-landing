import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import PageHero from "@/components/v2/page-hero";
import Link from "next/link";
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
  "The numbers live in five systems and never in one place.",
  "A manager spends most of a day each week on a report.",
  "The team tried a chatbot once and never used it again.",
  "Manual work that should have been automated years ago.",
  "Only the owner can answer half the questions.",
];

export default function LexingtonPage() {
  return (
    <>
      <JsonLd data={localServiceJsonLd} />

      <PageHero
        title="AI consulting in Lexington"
        intro="We are based here, so we can watch the work in your building."
      />

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">Where we work</h2>
          <div>
            <p className="text-[18px] md:text-[19px] leading-relaxed text-body max-w-[62ch]">
              We work on site across Central Kentucky.
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-7">
              {counties.map((c) => (
                <li key={c} className="font-display text-[20px] md:text-[24px] font-light text-ink">
                  {c} County
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[62ch]">
              Elsewhere in Kentucky, we work over screen share.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">
            What Lexington businesses bring us
          </h2>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {whatWeHear.map((w) => (
                <li key={w} className="py-6 font-display text-[19px] md:text-[23px] font-light leading-snug text-ink">
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[62ch]">
              None of those start as AI problems, so we start with{" "}
              <Link href="/ai-assessment" className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                an assessment
              </Link>
              . Some get solved by changing a process and buying nothing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05] font-light tracking-tight text-ink">How it starts</h2>
          <ol className="divide-y divide-line border-y border-line">
            <li className="py-8 md:py-9 text-[18px] md:text-[19px] leading-relaxed text-body">
                A 30-minute call about your business, your tools and who has to
                agree. Nothing gets sold.
            </li>
            <li className="py-8 md:py-9 text-[18px] md:text-[19px] leading-relaxed text-body">
                An email with our recommendation. Sometimes it is that you do not
                need us yet.
            </li>
            <li className="py-8 md:py-9 text-[18px] md:text-[19px] leading-relaxed text-body">
                If it fits, a fixed price for the next phase before you commit.
            </li>
          </ol>
        </div>
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
      />
    </>
  );
}
