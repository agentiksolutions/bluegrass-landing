import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
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

      {/* Hero: Kentucky at dawn, edge to edge, with the headline over it.
          ponytail: one <video> file. A Seedance clip can replace hero.mp4 and hero-poster.webp
          without touching this markup. motion-reduce:hidden leaves the poster showing. */}
      <section className="relative h-[88svh] min-h-[520px] mt-16 lg:mt-[72px] overflow-hidden bg-ink">
        <Image
          src="/images/brand/hero-poster.webp"
          alt="Dawn mist over a Kentucky horse farm, a plank fence running away toward the ridge"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/brand/hero-poster.webp"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 px-4 md:px-10 pb-12 md:pb-16">
          <div className="max-w-[1360px] mx-auto">
            <h1 className="font-display text-[38px] sm:text-[58px] lg:text-[84px] leading-[0.98] font-bold tracking-tight text-white max-w-[16ch] [text-wrap:balance]">
              I build AI systems for Kentucky businesses.
            </h1>
            <Button href={BOOKING_URL} className="mt-8">
              Book a call
            </Button>
          </div>
        </div>
      </section>

      {/* Quiet. The mark, and nothing else. */}
      <section className="bg-band px-4 md:px-10 py-20 md:py-32 flex justify-center">
        <Image
          src="/brand/mark.svg"
          alt="The Bluegrass Advisory Group mark: Kentucky in blue with a network of white nodes and a star on Lexington"
          width={982}
          height={441}
          sizes="(min-width: 1024px) 720px, 82vw"
          className="w-[min(82%,720px)] h-auto"
        />
      </section>

      {/* His own words, over the limestone country. */}
      <section className="relative min-h-[70svh] flex items-end overflow-hidden bg-ink">
        <Image
          src="/images/brand/ky-limestone.webp"
          alt="A dry-stacked limestone wall along a Kentucky lane at blue hour"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        <blockquote className="relative w-full max-w-[1360px] mx-auto px-4 md:px-10 py-16 md:py-24">
          <p className="font-display text-[32px] md:text-[62px] leading-[1.02] font-bold tracking-tight text-white max-w-[17ch]">
            &ldquo;We gave the store managers their time back.&rdquo;
          </p>
          <cite className="block mt-6 not-italic font-display text-[15px] text-white/70">
            Phil Fifield, Lexington, Kentucky
          </cite>
        </blockquote>
      </section>

      {/* Quiet. Four things, four pages. */}
      <section className="px-4 md:px-10 py-20 md:py-32">
        <div className="max-w-[1360px] mx-auto">
          <p className="font-display text-[13px] uppercase tracking-[0.18em] text-muted">
            What I build
          </p>
          <ul className="mt-8 border-t border-line">
            {services.map((s) => (
              <li key={s.href} className="border-b border-line">
                <Link
                  href={s.href}
                  className="group flex items-baseline justify-between gap-6 py-6 md:py-9"
                >
                  <span className="font-display text-[32px] md:text-[56px] leading-none font-bold tracking-tight text-ink group-hover:text-blue">
                    {s.label}
                  </span>
                  <span aria-hidden="true" className="font-display text-[24px] text-line group-hover:text-blue">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A breath of open country. */}
      <Image
        src="/images/brand/ky-hills.webp"
        alt="Rolling Central Kentucky hills at golden hour"
        width={1600}
        height={900}
        sizes="100vw"
        className="w-full h-[42svh] min-h-[260px] lg:h-[min(62vh,560px)] object-cover"
      />

      {/* Work. Two photographs, edge to edge, no boxes. */}
      <section className="pt-20 md:pt-32">
        <p className="max-w-[1360px] mx-auto px-4 md:px-10 font-display text-[13px] uppercase tracking-[0.18em] text-muted">
          Work
        </p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2">
          <Link href="/work/pfsa" className="group block">
            <div className="relative h-[46svh] min-h-[300px] lg:h-[52vh] overflow-hidden bg-ink">
              <Image
                src={photos.pfsaSite.src}
                alt={photos.pfsaSite.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="px-4 md:px-10 py-6 font-display text-[22px] md:text-[28px] leading-tight font-bold text-ink group-hover:text-blue">
              The PFSA, a Lexington nonprofit
            </p>
          </Link>
          <Link href="/work/restaurant-franchisee" className="group block">
            <div className="relative h-[46svh] min-h-[300px] lg:h-[52vh] overflow-hidden bg-ink">
              <Image
                src="/images/brand/work-franchisee.webp"
                alt="A Kentucky main street at first light"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="px-4 md:px-10 py-6 font-display text-[22px] md:text-[28px] leading-tight font-bold text-ink group-hover:text-blue">
              A Five Guys franchisee in Central Kentucky
            </p>
          </Link>
        </div>
      </section>

      {/* Who is behind it. Small, and late. */}
      <section className="bg-band px-4 md:px-10 py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center gap-8 md:gap-14">
          <Image
            src={photos.phil.src}
            alt={photos.phil.alt}
            width={photos.phil.width}
            height={photos.phil.height}
            sizes="(min-width: 640px) 300px, 60vw"
            className="w-[60%] max-w-[300px] sm:w-[300px] shrink-0 h-auto rounded"
          />
          <p className="text-[19px] md:text-[23px] leading-relaxed text-body max-w-[48ch]">
            I run operations for a Five Guys franchisee in Central Kentucky and I am president of
            The PFSA, a Lexington nonprofit.
          </p>
        </div>
      </section>

      <CTABand subtext="Thirty minutes, and I tell you whether I can help." />
    </>
  );
}
