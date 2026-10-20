import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import { FadeUp, Reveal } from "@/components/v2/reveal";
import { Drift } from "@/components/v2/scroll-sections";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Phil Fifield runs operations for a Five Guys franchisee in Central Kentucky, is president of The PFSA, and founded Bluegrass Advisory Group to help Kentucky businesses get ahead with AI.",
  path: "/about",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Phil Fifield",
  jobTitle: "Founder & Principal",
  worksFor: { "@type": "Organization", name: "Bluegrass Advisory Group", url: "https://bluegrassadvisorygroup.com" },
  address: { "@type": "PostalAddress", addressLocality: "Lexington", addressRegion: "KY", addressCountry: "US" },
};

// What Phil runs today, in the present tense (brand rule). No origin line and no unsourced
// ranking; the years figure is left out until Phil settles "15" or "over 15".
const today = [
  { role: "Operations", where: "A Five Guys franchisee in Central Kentucky" },
  { role: "President", where: "The PFSA, a Lexington nonprofit" },
  { role: "Founder", where: "Bluegrass Advisory Group" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />

      <section data-nav="dark" data-nomotion className="night bg-night text-night-text">
        <div className="mx-auto grid max-w-page grid-cols-1 items-end gap-12 px-4 pb-16 pt-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:px-10 md:pb-24 md:pt-36 lg:gap-20">
          <Drift amount={-70} className="mx-auto w-full max-w-[440px] md:mx-0">
          <FadeUp onLoad delay={0.1}>
            <Image
              src={photos.headshot.src}
              alt={photos.headshot.alt}
              width={photos.headshot.width}
              height={photos.headshot.height}
              priority
              sizes="(min-width: 768px) 440px, 100vw"
              className="h-auto w-full rounded-[6px]"
            />
          </FadeUp>
          </Drift>
          <div className="pb-2">
            <Reveal
              as="h1"
              onLoad
              delay={0.2}
              text="Phil Fifield"
              className="font-display text-[56px] font-light leading-[0.95] tracking-[-0.04em] md:text-[96px]"
            />
            <FadeUp onLoad delay={0.5}>
              <p className="mt-4 font-display text-[17px] text-night-blue">Founder and Principal, Bluegrass Advisory Group</p>
              <p className="mt-7 max-w-[36ch] text-[20px] leading-relaxed text-night-body md:text-[22px]">
                I run operations for a restaurant franchisee and I&apos;m president of a Lexington nonprofit. I built the AI
                systems both run on.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-page grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-24">
          {/* Written from Phil's own notes, 2026-10-07. */}
          <div className="max-w-[62ch] text-[19px] leading-relaxed text-body">
            <h2 className="font-display text-[32px] font-light leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">What I run today</h2>
            <div className="mt-6 space-y-5">
              <p>
                I run operations for a Five Guys franchisee in Central Kentucky. I built the manager portal its three stores
                run on so my managers could spend less time in the back office and more time with guests.
              </p>
              <p>
                I took complicated processes and made them simpler. Then I put them in one dashboard that&apos;s easy to
                read, with the workflows built in: their numbers, their checklists and the weekly newsletter. We still use
                it today, and the managers don&apos;t need to know anything about AI to use it.
              </p>
              <p>
                Improving how a business runs is the part of the work I&apos;m proudest of. When the company needed
                something done, I took it on and did it as well as I could.
              </p>
            </div>

            <h2 className="mt-16 font-display text-[32px] font-light leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">
              Why I started Bluegrass Advisory Group
            </h2>
            <div className="mt-6 space-y-5">
              <p>
                I started Bluegrass Advisory Group to help small and mid-sized businesses get ahead with AI. I teach what
                I&apos;ve learned from coaching managers, and I consult from what has worked when I improved operations in
                real businesses.
              </p>
              <p>
                I&apos;m an operator first. I&apos;m not giving advice from a distance. I keep things realistic, and I like
                to get to work.
              </p>
            </div>

            <h2 className="mt-16 font-display text-[32px] font-light leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">What I care about</h2>
            <div className="mt-6 space-y-5">
              <p>
                I try to do the next right thing. I&apos;m obsessed with results and with doing the job right, and I want my
                customers and clients to know I&apos;m there for them. When something has my name on it, I put everything
                into it.
              </p>
              <p>
                Outside of work, I spend my time with my family and friends. Community matters a lot to me. I&apos;m
                president of The PFSA, a nonprofit in Lexington, and its board runs on a portal I built.
              </p>
              <p>
                See the{" "}
                <Link href="/work" className="text-blue underline underline-offset-2">
                  work
                </Link>
                , or read{" "}
                <Link href="/services" className="text-blue underline underline-offset-2">
                  what we do
                </Link>
                .
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <h2 className="font-display text-[15px] font-semibold text-blue">Today</h2>
            <ul className="mt-4 border-t border-line">
              {today.map((t) => (
                <li key={t.role} className="border-b border-line py-5">
                  <p className="font-display text-[22px] font-medium tracking-[-0.01em] text-ink">{t.role}</p>
                  <p className="mt-1 text-[17px] text-body">{t.where}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 overflow-hidden rounded-[6px] border border-line">
              <Image
                src={photos.portal.src}
                alt={photos.portal.alt}
                width={photos.portal.width}
                height={photos.portal.height}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-3 font-display text-[14px] text-muted">The manager portal, shown in demo mode.</p>
          </aside>
        </div>
      </section>

      <CTABand headline="Tell me about your business." />
    </>
  );
}
