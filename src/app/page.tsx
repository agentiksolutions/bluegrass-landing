import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import DataToDashboard from "@/components/v2/data-to-dashboard";
import HomeHero from "@/components/v2/home-hero";
import ScrollVideo from "@/components/v2/scroll-video";
import ClientLogos from "@/components/v2/client-logos";
import { AssistantPanel, SupportThread, SystemsMap } from "@/components/v2/panels";
import { FadeUp, Reveal } from "@/components/v2/reveal";
import {
  ClipExpand,
  HorizontalTrack,
  HoverList,
  PathSteps,
  PhotoReveal,
  PinnedStatements,
  TrackCard,
} from "@/components/v2/scroll-sections";
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
// "right tier if" lines and brand decision item 36 for the problems; the catalog's small-business
// path for the steps; each market line from that market's own page on this site.
// Pictures are real things only: Phil's headshot, the live Academy, the manager portal in demo
// mode, the PFSA site, and panels drawn in code marked "Sample data".
const problems = [
  "Your team uses AI, and there are no written rules for it.",
  "You know AI could help, and you don't know where to start.",
  "Your reports come from two systems that count the week differently.",
  "You have AI questions and nobody to ask.",
];

const steps = [
  { title: "Free intro call" },
  { title: "Roadmap" },
  { title: "Business AI Setup" },
  { title: "A monthly plan" },
];

const markets = [
  {
    label: "Restaurants and hospitality",
    href: "/ai-for-hospitality",
    image: "/images/work/tiles/portal-store.webp",
    imageAlt: "",
  },
  {
    label: "Multi-location operators",
    href: "/multi-location-dashboards",
    image: "/images/work/tiles/systems-map.webp",
    imageAlt: "",
  },
  {
    label: "Nonprofits",
    href: "/work/pfsa",
    image: "/images/work/tiles/pfsa.webp",
    imageAlt: "",
  },
  {
    label: "Kentucky small businesses",
    href: "/ai-for-small-business-kentucky",
    image: "/images/work/tiles/assistant.webp",
    imageAlt: "",
  },
];

export default function HomePage() {

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* 1. Hero: the Kentucky mark in 3D on desktops, moving light in 2D elsewhere. */}
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
                He runs operations for a restaurant franchisee in Central Kentucky and is president of The PFSA, a
                Lexington nonprofit. He built the AI systems both run on.
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

      {/* The firm's mark in 3D, rendered in Blender and scrubbed by scroll. */}
      <ScrollVideo
        src="/videos/ky-flight-scrub.mp4"
        srcSmall="/videos/ky-flight-portrait.mp4"
        posterSmall="/videos/ky-flight-portrait-first.jpg"
        poster="/videos/ky-flight-first.jpg"
        still="/videos/ky-flight-poster.jpg"
        lines={["Based in Lexington.", "Starting with how your work gets done."]}
      />

      {/* 4. How we help: a night chapter that holds while the three services pass sideways. */}
      <HorizontalTrack
        id="how-we-help"
        intro={
          <>
            <Reveal text="How we help" className="font-display text-[48px] font-light leading-none tracking-[-0.03em] md:text-[72px]" />
          </>
        }
      >
        <TrackCard
          title="Education"
          line="Classes and workshops for owners and their teams."
          href="/academy"
        >
          <div className="overflow-hidden rounded-[6px] border border-night-line bg-white">
            <Image
              src="/images/work/academy-4k.webp"
              alt="The BAG Academy course page: AI Foundations, a practical course on using AI at work, with the lesson list down the side"
              width={3840}
              height={2160}
              sizes="(min-width: 821px) 560px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </TrackCard>
        <TrackCard
          title="Build"
          line="The AI tools that fit your business, set up and taught to your people."
          href="/services"
        >
          <AssistantPanel />
        </TrackCard>
        <TrackCard
          title="Support"
          line="We keep it running and pick up when you call."
          href="/services"
        >
          <SupportThread />
        </TrackCard>
      </HorizontalTrack>

      {/* 5. Start from the work: the Roadmap's systems map and the path after it. */}
      <section className="bg-white px-4 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-page">
          <Reveal
            text="Start with the work, then add AI"
            className="max-w-[18ch] font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] text-ink md:text-[64px]"
          />
          <div className="mt-14 grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <FadeUp>
              <SystemsMap />
              <p className="mt-4 font-display text-[14px] text-muted">
                A Roadmap systems map.
              </p>
            </FadeUp>
            <PathSteps steps={steps} />
          </div>
        </div>
      </section>

      {/* 6. Recent work: the portal opens to full width, then the two projects. */}
      <section className="bg-white pb-24 md:pb-36">
        <div className="mx-auto max-w-page px-4 md:px-10">
          <Reveal text="Recent work" className="mb-12 font-display text-[40px] font-light leading-none tracking-[-0.03em] text-ink md:mb-16 md:text-[64px]" />
        </div>
        <ClipExpand
          src={photos.portal.src}
          alt={photos.portal.alt}
          width={photos.portal.width}
          height={photos.portal.height}
          caption="The manager portal, shown in demo mode."
        />
        <div className="mx-auto mt-16 grid max-w-page grid-cols-1 gap-16 px-4 md:mt-24 md:px-10 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <Link href="/work/restaurant-franchisee" className="group block border-t border-line pt-8">
              <p className="font-display text-[28px] font-medium leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-blue md:text-[36px]">
                A restaurant franchisee in Central Kentucky
              </p>
              <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-body">
                Three stores run on one manager portal.
              </p>
            </Link>
          </FadeUp>
          <FadeUp delay={0.12}>
            <Link href="/work/pfsa" className="group block border-t border-line pt-8">
              <p className="font-display text-[28px] font-medium leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-blue md:text-[36px]">
                The PFSA, a Lexington nonprofit
              </p>
              <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-body">
                Donations, receipts and minutes moved out of Quicken into one portal.
              </p>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Who we have worked with (staging only; see the permission note in the component). */}
      <ClientLogos />

      {/* 7. Industries: a preview follows the pointer on hover. */}
      <section className="bg-band px-4 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-page grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <Reveal text="Industries" className="max-w-[10ch] font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] text-ink md:text-[56px]" />
          <HoverList items={markets} />
        </div>
      </section>


      <CTABand
        headline="You don't need every answer first."
        subtext="Book a 30-minute call. Bring the spreadsheet, the report or the question."
      />
    </>
  );
}
