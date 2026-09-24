import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import NetworkBand from "@/components/network-band";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { BOOKING_URL } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://bluegrassadvisorygroup.com/#organization",
  name: "Bluegrass Advisory Group",
  legalName: "Bluegrass Advisory Group, LLC",
  description:
    "AI systems and operations consulting for Kentucky businesses. Based in Lexington, Kentucky.",
  url: "https://bluegrassadvisorygroup.com",
  email: "phil@bluegrassadvisorygroup.com",
  telephone: "+1-859-314-3051",
  founder: {
    "@type": "Person",
    name: "Phil Fifield",
  },
  foundingDate: "2026-02-17",
  foundingLocation: "Lexington, Kentucky",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lexington",
    addressRegion: "KY",
    addressCountry: "US",
  },
  areaServed: "Central Kentucky",
  priceRange: "$$$",
  serviceType: ["AI Consulting", "Business Operations", "Web Design", "Dashboard Development"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bluegrass Advisory Group",
  url: "https://bluegrassadvisorygroup.com",
  publisher: { "@id": "https://bluegrassadvisorygroup.com/#organization" },
  inLanguage: "en-US",
};

export const metadata: Metadata = {
  ...pageMeta({
    title: "AI Systems for Kentucky Businesses",
    description:
      "Phil Fifield builds AI systems for Kentucky businesses. He runs operations for a Five Guys franchisee in Central Kentucky and is president of The PFSA, a Lexington nonprofit.",
    path: "/",
  }),
  // The home page carries the brand name first, so it skips the title template.
  title: {
    absolute: "Bluegrass Advisory Group: AI Systems for Kentucky Businesses",
  },
};

const services = [
  { label: "Websites", href: "/services/web-design" },
  { label: "AI tools", href: "/services/ai-integration" },
  { label: "Dashboards", href: "/services/dashboards" },
  { label: "Operations", href: "/services/operations" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* First screen: the mark and the photograph carry it, the words sit in one strip below. */}
      <section className="pt-16 lg:pt-[72px]">
        <div className="grid grid-cols-1 grid-rows-[minmax(0,3fr)_minmax(0,2fr)] h-[68svh] min-h-[440px] lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:grid-rows-1 lg:h-[max(440px,calc(100svh-72px-13rem))]">
          <div className="bg-band flex items-center justify-center px-8 py-6 lg:py-10 order-2 lg:order-1">
            <Image
              src="/brand/mark-nodes.png"
              alt="The Bluegrass Advisory Group mark: Kentucky in blue with a network of white nodes and a star on Lexington"
              width={887}
              height={399}
              priority
              sizes="(min-width: 1024px) 560px, 86vw"
              className="w-[min(88%,560px)] h-auto"
            />
          </div>
          <div className="relative min-w-0 order-1 lg:order-2">
            <Image
              src={photos.phil.src}
              alt={photos.phil.alt}
              fill
              priority
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="bg-band border-t border-line px-4 md:px-10 py-6 lg:py-7">
          <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <h1 className="font-display text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.06] font-bold tracking-tight text-ink [overflow-wrap:anywhere]">
              I build AI systems for Kentucky businesses.
            </h1>
            <Button href={BOOKING_URL} className="self-start shrink-0">
              Book a call
            </Button>
          </div>
        </div>
      </section>

      {/* Phil's own words, on the blue. */}
      <section className="relative bg-blue overflow-hidden">
        <NetworkBand className="absolute inset-0 w-full h-full" />
        <blockquote className="relative max-w-[1160px] mx-auto px-4 md:px-10 py-20 md:py-28">
          <p className="font-display text-[34px] md:text-[56px] leading-[1.06] font-bold tracking-tight text-white max-w-[15ch]">
            &ldquo;We gave the store managers their time back.&rdquo;
          </p>
          <cite className="block mt-6 not-italic font-display text-[15px] text-white/75">
            Phil Fifield, Lexington, Kentucky
          </cite>
        </blockquote>
      </section>

      {/* What I build. Four words, four pages. */}
      <section className="px-4 md:px-10 py-16 md:py-24">
        <div className="max-w-[1160px] mx-auto">
          <p className="font-display text-[14px] uppercase tracking-[0.14em] text-muted">
            What I build
          </p>
          <ul className="mt-6 border-t border-line">
            {services.map((s) => (
              <li key={s.href} className="border-b border-line">
                <Link
                  href={s.href}
                  className="group flex items-baseline justify-between gap-6 py-5 md:py-7"
                >
                  <span className="font-display text-[28px] md:text-[42px] leading-none font-bold tracking-tight text-ink group-hover:text-blue">
                    {s.label}
                  </span>
                  <span aria-hidden="true" className="font-display text-[22px] text-line group-hover:text-blue">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work. The photographs of the restaurant client live on the case study itself. */}
      <section className="bg-band px-4 md:px-10 py-16 md:py-24">
        <div className="max-w-[1160px] mx-auto">
          <Link href="/work" className="font-display text-[14px] uppercase tracking-[0.14em] text-muted hover:text-blue">
            Work
          </Link>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Link href="/work/pfsa" className="group block bg-white rounded overflow-hidden">
              <Image
                src={photos.pfsaSite.src}
                alt={photos.pfsaSite.alt}
                width={photos.pfsaSite.width}
                height={photos.pfsaSite.height}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="w-full h-auto border-b border-line"
              />
              <p className="p-6 font-display text-[22px] md:text-[26px] leading-tight font-bold text-ink group-hover:text-blue">
                The PFSA, a Lexington nonprofit
              </p>
            </Link>
            <Link
              href="/work/restaurant-franchisee"
              className="group relative flex items-end bg-blue rounded overflow-hidden min-h-[260px] p-6"
            >
              <NetworkBand className="absolute inset-0 w-full h-full" />
              <p className="relative font-display text-[22px] md:text-[26px] leading-tight font-bold text-white group-hover:text-white/80">
                A Five Guys franchisee in Central Kentucky
              </p>
            </Link>
          </div>
        </div>
      </section>

      <CTABand subtext="Thirty minutes, and I tell you whether I can help." />
    </>
  );
}
