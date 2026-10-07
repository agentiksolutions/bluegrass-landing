import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Phil Fifield runs operations for a Five Guys franchisee in Central Kentucky, is president of The PFSA, a Lexington nonprofit, and built the AI systems he runs them with.",
  path: "/about",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Phil Fifield",
  jobTitle: "Founder & Principal",
  worksFor: {
    "@type": "Organization",
    name: "Bluegrass Advisory Group",
    url: "https://bluegrassadvisorygroup.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lexington",
    addressRegion: "KY",
    addressCountry: "US",
  },
};


export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />

      {/* First screen: the photograph carries it. */}
      <section className="pt-16 lg:pt-[72px] bg-band">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="relative w-full h-[max(360px,calc(52svh))] lg:h-[calc(100svh-72px)] lg:w-[min(calc(100svh-72px),62vw)] lg:min-h-[480px] lg:min-w-[480px]">
            <Image
              src={photos.phil.src}
              alt={photos.phil.alt}
              fill
              priority
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover object-[40%_top]"
            />
          </div>
          <div className="px-4 md:px-10 py-8 lg:py-12 flex flex-col justify-center">
            <h1 className="font-display text-[44px] lg:text-[72px] leading-[0.98] font-extralight tracking-[-0.03em] text-ink">
              Phil Fifield
            </h1>
            <p className="mt-3 font-display text-[18px] text-muted">
              Founder &amp; Principal, Bluegrass Advisory Group
            </p>
            <p className="mt-6 text-[20px] leading-relaxed text-body max-w-[34ch]">
              I run operations for a Five Guys franchisee in Central Kentucky and build AI systems for
              Kentucky businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          <div className="text-[19px] leading-relaxed text-body space-y-5 max-w-[62ch]">
            <p>
              I run operations for a Five Guys franchisee in Central Kentucky, and I built the AI
              systems its three stores run on. The store managers open one portal for their numbers,
              their checklists and the weekly newsletter. They do not need to know anything about AI
              to use it.
            </p>
            <p>
              I am also president of The PFSA, a nonprofit in Lexington. Its board has a portal for
              donations, receipts and meeting minutes.
            </p>
            <p>
              I started Bluegrass Advisory Group in 2026 to build the same kind of systems for other
              Kentucky businesses.
            </p>
            <p>
              See the <Link href="/work" className="text-blue underline underline-offset-2">work</Link>, or
              read <Link href="/services" className="text-blue underline underline-offset-2">what I build</Link>.
            </p>
          </div>
          <figure>
            <Image
              src={photos.team.src}
              alt={photos.team.alt}
              width={photos.team.width}
              height={photos.team.height}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="w-full h-auto rounded"
            />
            <figcaption className="mt-3 font-display text-[15px] text-muted">
              Me, seated, with part of the store team at a Five Guys hiring fair in Central Kentucky.
            </figcaption>
          </figure>
        </div>
      </section>

      <CTABand headline="Tell me about your business." />
    </>
  );
}
