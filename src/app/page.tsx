import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import DataToDashboard from "@/components/v2/data-to-dashboard";
import HomeHero from "@/components/v2/home-hero";
import { AssistantPanel, SupportThread } from "@/components/v2/panels";
import { FadeUp, Reveal } from "@/components/v2/reveal";
import { PhotoReveal, PinnedStatements } from "@/components/v2/scroll-sections";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://bluegrassadvisorygroup.com/#organization",
  name: "Bluegrass Advisory Group",
  legalName: "Bluegrass Advisory Group, LLC",
  description:
    "The AI partner for Central Kentucky businesses: classes and workshops, AI tools and dashboards built for your business, and support after they are running.",
  url: "https://bluegrassadvisorygroup.com",
  email: "phil@bluegrassadvisorygroup.com",
  telephone: "+1-859-314-3051",
  founder: { "@type": "Person", name: "Phil Fifield" },
  foundingDate: "2026-02-17",
  foundingLocation: "Lexington, Kentucky",
  address: { "@type": "PostalAddress", addressLocality: "Lexington", addressRegion: "KY", addressCountry: "US" },
  areaServed: "Central Kentucky",
  priceRange: "$$$",
  serviceType: ["AI Training", "AI Consulting", "Business Operations", "Dashboard Development"],
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
    title: "Your AI Partner in Central Kentucky",
    description:
      "Bluegrass Advisory Group teaches your team, builds your AI tools and dashboards, and supports them after. Lexington, Kentucky.",
    path: "/",
  }),
  title: { absolute: "Bluegrass Advisory Group: Your AI Partner in Central Kentucky" },
};

// Copy comes from the reviewed staging home page (homepage-21st). Sources: Engagement Catalog
// "right tier if" lines and brand decision item 36 for the problems.
// Pictures are real things only: Phil's headshot, the live Academy, and panels drawn in code
// marked "Sample data". How it starts has its own page; Recent work, client logos and Industries
// are off the home page for now (Phil, 2026-10-29).
const problems = [
  "No AI rules for your team.",
  "Not sure where to start.",
  "Reports that don't agree.",
];

export default function HomePage() {

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* 1. Hero: the logo's blue Kentucky with its white star. */}
      <HomeHero />

      {/* 2. What we help with: each line lights up while the section holds. */}
      <PinnedStatements heading="What we help with" items={problems} />

      {/* The signature sequence: scattered inputs become a working dashboard as you scroll. */}
      <DataToDashboard />

      {/* 3. Who you work with. */}
      <section className="bg-band px-4 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <PhotoReveal
            src={photos.headshot.src}
            alt={photos.headshot.alt}
            width={photos.headshot.width}
            height={photos.headshot.height}
            sizes="(min-width: 768px) 38vw, 100vw"
            className="mx-auto w-full max-w-[460px]"
          />
          <div>
            <Reveal
              text="You work with Phil Fifield"
              className="max-w-[14ch] font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] text-ink md:text-[64px]"
            />
            <FadeUp>
              <p className="mt-8 max-w-[42ch] text-[19px] leading-relaxed text-body md:text-[22px]">
                He built the AI systems two Kentucky organizations run on.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block font-display text-[16px] font-semibold text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue"
              >
                More about Phil
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. How we help: quick links, each with its picture (Phil, 2026-10-29). */}
      <section data-nav="dark" className="night bg-night px-4 py-24 text-night-text md:px-10 md:py-36">
        <div className="mx-auto max-w-page">
          <Reveal text="How we help" className="font-display text-[48px] font-light leading-none tracking-[-0.03em] md:text-[72px]" />
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "Education",
                line: "Classes for your team.",
                href: "/academy",
                art: (
                  <div className="overflow-hidden rounded-[6px] border border-night-line bg-white">
                    <Image
                      src="/images/work/academy-4k.webp"
                      alt="The BAG Academy course page: AI Foundations, a practical course on using AI at work, with the lesson list down the side"
                      width={3840}
                      height={2160}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                ),
              },
              { title: "Build", line: "Tools built for your business.", href: "/services", art: <AssistantPanel /> },
              { title: "Support", line: "We keep it running.", href: "/services", art: <SupportThread /> },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.08}>
                {/* Title first so the three line up; the pictures differ in height. */}
                <Link href={c.href} className="group block">
                  <p className="font-display text-[28px] font-medium leading-tight tracking-[-0.02em] transition-colors group-hover:text-night-blue">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[17px] text-night-body">{c.line}</p>
                  <div className="mt-6 transition-transform duration-700 ease-out group-hover:-translate-y-1">{c.art}</div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <Link
            href="/how-it-starts"
            className="mt-16 inline-block font-display text-[17px] font-semibold text-night-blue underline decoration-night-blue/40 underline-offset-4 hover:decoration-night-blue"
          >
            How it starts
          </Link>
        </div>
      </section>

      <CTABand
        art={false}
        headline="Start with a free 30-minute call."
        subtext=""
      />
    </>
  );
}
