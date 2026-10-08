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
    "Phil Fifield has spent over 15 years in restaurants, most of them running operations. He runs operations for a Five Guys franchisee in Central Kentucky and founded Bluegrass Advisory Group.",
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
              I&apos;ve spent over 15 years in restaurants, most of them running operations. Now I help
              Kentucky businesses get ahead with AI.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          {/* Written from Phil's own notes, 2026-10-07. */}
          <div className="text-[19px] leading-relaxed text-body max-w-[62ch]">
            <h2 className="font-display text-[28px] md:text-[36px] font-light tracking-tight text-ink">How I got here</h2>
            <div className="mt-5 space-y-5">
              <p>
                I started as a crew member and worked my way up to manager. I got there by working hard.
                I&apos;ve now spent over 15 years in restaurants, most of them running operations.
              </p>
              <p>
                Improving how a business runs is the part of the work I&apos;m proudest of. When the
                company needed something done, I took it on and did it as well as I could. Along the way,
                we became the top-ranked restaurant group in the nation among our peers.
              </p>
              <p>
                Today I run operations for a Five Guys franchisee in Central Kentucky. I built the
                manager portal its three stores run on so my managers could spend less time in the back
                office and more time with guests.
              </p>
              <p>
                I took complicated processes and made them simpler. Then I put them in one dashboard
                that&apos;s easy to read, with the workflows built in: their numbers, their checklists and
                the weekly newsletter. We still use it today, and the managers don&apos;t need to know
                anything about AI to use it.
              </p>
            </div>

            <h2 className="mt-14 font-display text-[28px] md:text-[36px] font-light tracking-tight text-ink">
              Why I started Bluegrass Advisory Group
            </h2>
            <div className="mt-5 space-y-5">
              <p>
                I started Bluegrass Advisory Group to help small and mid-sized businesses get ahead with
                AI. I teach what I&apos;ve learned from coaching managers, and I consult from what has
                worked when I improved operations in real businesses.
              </p>
              <p>
                I&apos;m an operator first. I&apos;m not giving advice from a distance. I keep things
                realistic, and I like to get to work.
              </p>
            </div>

            <h2 className="mt-14 font-display text-[28px] md:text-[36px] font-light tracking-tight text-ink">
              What I care about
            </h2>
            <div className="mt-5 space-y-5">
              <p>
                I try to do the next right thing. I&apos;m obsessed with results and with doing the job
                right, and I want my customers and clients to know I&apos;m there for them. When something
                has my name on it, I put everything into it.
              </p>
              <p>
                Outside of work, I spend my time with my family and friends. Community matters a lot to
                me. I&apos;m president of The PFSA, a nonprofit in Lexington, and its board runs on a
                portal I built.
              </p>
              <p>
                See the <Link href="/work" className="text-blue underline underline-offset-2">work</Link>, or
                read <Link href="/services" className="text-blue underline underline-offset-2">what we do</Link>.
              </p>
            </div>
          </div>
          <figure className="lg:sticky lg:top-28">
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
