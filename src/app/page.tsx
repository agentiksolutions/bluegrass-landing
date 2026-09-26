import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABand from "@/components/cta-band";
import HeroNetwork from "@/components/hero-network";
import JsonLd from "@/components/json-ld";
import { BlurWords, FadeIn, ParallaxBand, ScrollThread } from "@/components/motion";
import { getAllPosts } from "@/lib/mdx";
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
    "The AI partner for Central Kentucky businesses: classes and workshops, AI tools and dashboards built for your business, and support after they are running.",
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
  // The home page carries the brand name first, so it skips the title template.
  title: {
    absolute: "Bluegrass Advisory Group: Your AI Partner in Central Kentucky",
  },
};


// Page order follows apaxsoftware.com (docs/website/apax-content-teardown-2026-09-25.md):
// hero, proof figures, client logos, what we help with, services, AI, results, who we work
// with, blog, closing call. Every bracketed [ ... ] line is a placeholder for Phil to fill.
// Pictures are free Unsplash stock (credits in public/images/brand/CREDITS.md). Nobody in them
// is a client.

// Proof figures. Only the first is sourced (Phil, 2026-09-24: "over 15 years").
// The other two stay as placeholders until they are calculated from real data.
const figures: { value: string; label: string }[] = [
  { value: "15+", label: "Years running businesses" },
  { value: "[to count]", label: "AI systems in daily use" },
  { value: "[to calculate]", label: "Hours saved each week" },
];

// Client logos go in only with each client's written permission.
// PFSA logo: the official file from pfsa-donor-tracker/public/pfsa-logo.png, cropped.
const logoSlots: { label: string; src?: string }[] = [
  { label: "The Public Foundation for Stewardship Advancement", src: "/images/logos/pfsa-logo.webp" },
  { label: "[Client logo: with permission]" },
  { label: "[Client logo: with permission]" },
  { label: "[Client logo: with permission]" },
];

// Sourced: Engagement Catalog "right tier if" lines, and brand decision item 36.
const problems = [
  "Your team uses AI, and there are no written rules for it.",
  "You know AI could help, and you don't know where to start.",
  "Your reports come from two systems that count the week differently.",
  "You have AI questions and nobody to ask.",
];

const services: {
  title: string;
  line: string;
  names: string;
  href: string;
  img: string;
  alt: string;
}[] = [
  {
    title: "Education",
    line: "Classes and workshops for owners and their teams.",
    names: "AI Academy · Team sessions",
    href: "/academy",
    img: "/images/stock/education-class.webp",
    alt: "A presenter in an AI shirt facing a room of people, seen from behind",
  },
  {
    title: "Build",
    line: "AI tools, automations and dashboards made for your business.",
    names: "Discovery & Strategic Roadmap · Quickstart · Implementation",
    href: "/services/ai-integration",
    img: "/images/stock/build-laptop.webp",
    alt: "Hands on a laptop showing code, with notes on the table beside it",
  },
  {
    title: "Support",
    line: "We keep it running and pick up when you call.",
    names: "Embedded Retainer · AI Office Hours · Workspace Tune-Up",
    href: "/services/operations",
    img: "/images/stock/support-laptop.webp",
    alt: "A person typing on a laptop at a small table",
  },
];

// Sourced: Engagement Catalog, AI Opportunity Session, Discovery and AI Governance Policy.
const aiSteps = ["A written roadmap you keep", "Rules for how your team uses AI"];

const markets = [
  { label: "Restaurants and hospitality", href: "/ai-for-hospitality" },
  { label: "Multi-location operators", href: "/multi-location-dashboards" },
  { label: "Nonprofits", href: "/work/pfsa" },
  { label: "Kentucky small businesses", href: "/ai-for-small-business-kentucky" },
];

const strip = [
  { src: "/images/stock/strip-team.webp", alt: "A team gathered around a laptop in an office" },
  { src: "/images/stock/strip-workshop.webp", alt: "People at a long table working through a workshop" },
  { src: "/images/stock/strip-colleagues.webp", alt: "Three colleagues at a table with a laptop" },
  { src: "/images/stock/strip-meeting.webp", alt: "A small meeting around a table with a monitor" },
  { src: "/images/stock/education-class.webp", alt: "A class in progress" },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  // Motion on this page, four ideas and no more (Phil, 2026-09-26: "It has to flow"):
  // 1. the hero network, the only thing that keeps moving; 2. the hero words coming out of a
  // blur, once; 3. one thread down the left edge that fills as you scroll; 4. each picture
  // opening once and drifting with the scroll. Everything else stays still.
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* 1. Hero. The network is drawn live on the device, so it is sharp at any resolution. */}
      <section className="relative h-[100svh] min-h-[600px] mt-16 lg:mt-[72px] overflow-hidden bg-ink">
        <HeroNetwork />
        <div className="relative px-4 md:px-10 pt-14 md:pt-20">
          <div className="max-w-[1360px] mx-auto">
            <h1 className="font-display text-[44px] sm:text-[68px] lg:text-[104px] leading-[0.95] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              <BlurWords text="Your AI partner in Central Kentucky." />
            </h1>
            <FadeIn delay={1.3}>
              <p className="mt-7 text-[19px] md:text-[23px] leading-snug text-body max-w-[40ch]">
                We teach your team, build your AI tools, and support them after.
              </p>
            </FadeIn>
            <FadeIn delay={1.6} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={BOOKING_URL}
                className="inline-flex items-center rounded bg-blue px-6 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                Book a call
              </a>
              <a
                href="#how-we-help"
                className="font-display text-[15px] font-semibold text-ink underline underline-offset-4 decoration-blue/50 hover:decoration-blue"
              >
                See how we help
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="relative">
        <ScrollThread />

        {/* 2. Proof figures. */}
        <section className="px-4 md:px-10 py-20 md:py-28 border-b border-line">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
            {figures.map((f) => (
              <div key={f.label}>
                <p className="font-display text-[48px] md:text-[72px] leading-none font-extralight tracking-tight text-blue">
                  {f.value}
                </p>
                <p className="mt-4 font-display text-[16px] md:text-[18px] text-muted">{f.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Clients. Logos only with permission; placeholders until then. */}
        <section className="px-4 md:px-10 py-24 md:py-36">
          <div className="max-w-[1360px] mx-auto">
            <h2 className="font-display text-[34px] md:text-[56px] leading-[1.02] font-light tracking-tight text-ink max-w-[20ch]">
              Built with Central Kentucky businesses.
            </h2>
            <p className="mt-6 text-[19px] md:text-[21px] leading-snug text-body max-w-[52ch]">
              A Lexington nonprofit and a three-store restaurant franchisee run on our systems.
            </p>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {logoSlots.map((l, i) => (
                <div
                  key={i}
                  className={`flex h-[96px] items-center justify-center rounded border px-4 text-center font-display text-[14px] text-muted ${
                    l.src ? "border-transparent bg-[#E6EAF2]" : "border-dashed border-line"
                  }`}
                >
                  {l.src ? (
                    // The PFSA file is dark type on white, so it keeps a light tile.
                    <Image src={l.src} alt={l.label} width={863} height={719} className="h-[80px] w-auto" />
                  ) : (
                    l.label
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. What we help with. */}
        <section className="bg-band px-4 md:px-10 py-24 md:py-36">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20">
            <h2 className="font-display text-[40px] md:text-[64px] leading-none font-light tracking-tight text-ink">
              What we help with
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {problems.map((p) => (
                <li key={p} className="py-6 md:py-7 font-display text-[20px] md:text-[26px] font-light leading-snug text-ink">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. How we help. Alternating full rows, the picture drifting against the scroll. */}
        <section id="how-we-help" className="py-24 md:py-36 scroll-mt-20">
          <h2 className="px-4 md:px-10 max-w-[1360px] mx-auto mb-14 md:mb-20 font-display text-[40px] md:text-[64px] leading-none font-light tracking-tight text-ink">
            How we help
          </h2>
          {services.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group grid grid-cols-1 items-center ${
                i % 2
                  ? "lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]"
                  : "lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]"
              } ${i > 0 ? "mt-20 md:mt-32" : ""}`}
            >
              <ParallaxBand className={`h-[44svh] min-h-[280px] lg:h-[56vh] ${i % 2 ? "lg:order-2" : ""}`} distance={42}>
                <Image src={s.img} alt={s.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </ParallaxBand>
              <div className={`px-4 md:px-10 py-10 lg:py-0 ${i % 2 ? "lg:order-1" : ""}`}>
                <h3 className="font-display text-[44px] md:text-[72px] leading-none font-extralight tracking-tight text-ink transition-colors group-hover:text-blue">
                  {s.title}
                </h3>
                <p className="mt-6 text-[19px] md:text-[22px] leading-snug text-body max-w-[34ch]">{s.line}</p>
                <p className="mt-4 font-display text-[15px] text-muted max-w-[40ch]">{s.names}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Photographs only. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 px-4 md:px-10">
          {strip.slice(0, 4).map((s) => (
            <div key={s.src} className="relative aspect-[16/10] overflow-hidden rounded">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* 6. AI, start from the work. */}
        <section className="px-4 md:px-10 py-24 md:py-36">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ParallaxBand className="h-[44svh] min-h-[280px] lg:h-[60vh] rounded" distance={36}>
              <Image
                src="/images/stock/ai-team-laptop.webp"
                alt="Four coworkers around a laptop at a wooden table, one pointing at the screen"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </ParallaxBand>
            <div>
              <h2 className="font-display text-[40px] md:text-[60px] leading-[1.02] font-light tracking-tight text-ink max-w-[16ch]">
                Start with the work, then add AI.
              </h2>
              <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[44ch]">
                An AI Opportunity Session picks 3 to 7 places AI can take on part of your work, with
                payback worked out from your own numbers.
              </p>
              <ul className="mt-9 space-y-3">
                {aiSteps.map((a) => (
                  <li key={a} className="flex items-baseline gap-3 font-display text-[18px] md:text-[20px] text-ink">
                    <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 translate-y-[-2px] rounded-full bg-[#81A7F8]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Results. */}
        <section className="pt-8 md:pt-12">
          <h2 className="px-4 md:px-10 max-w-[1360px] mx-auto mb-12 md:mb-16 font-display text-[40px] md:text-[64px] leading-none font-light tracking-tight text-ink">
            Recent work
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <Link href="/work/pfsa" className="group block">
              <ParallaxBand className="h-[44svh] min-h-[300px] lg:h-[50vh] bg-ink" distance={34}>
                <Image
                  src={photos.pfsaSite.src}
                  alt={photos.pfsaSite.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </ParallaxBand>
              <div className="px-4 md:px-10 py-7">
                <p className="font-display text-[22px] md:text-[28px] leading-tight font-light text-ink transition-colors group-hover:text-blue">
                  The PFSA, a Lexington nonprofit
                </p>
                <p className="mt-2 text-[18px] leading-snug text-body max-w-[46ch]">
                  A board portal, a public website and an online assistance application, live in one week.
                </p>
              </div>
            </Link>
            <Link href="/work/restaurant-franchisee" className="group block">
              <ParallaxBand className="h-[44svh] min-h-[300px] lg:h-[50vh] bg-ink" distance={34}>
                <Image
                  src="/images/stock/case-dashboard.webp"
                  alt="A computer screen showing a chart of weekly figures"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </ParallaxBand>
              <div className="px-4 md:px-10 py-7">
                <p className="font-display text-[22px] md:text-[28px] leading-tight font-light text-ink transition-colors group-hover:text-blue">
                  A restaurant franchisee in Central Kentucky
                </p>
                <p className="mt-2 text-[18px] leading-snug text-body max-w-[46ch]">
                  Three stores run on one manager portal. [to calculate: result in numbers]
                </p>
              </div>
            </Link>
          </div>
          <div className="px-4 md:px-10 max-w-[1360px] mx-auto py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10">
            <blockquote>
              <p className="font-display text-[28px] md:text-[40px] leading-[1.1] font-light tracking-tight text-ink">
                {"“No one is literate on AI, but they all use the portal.”"}
              </p>
              <cite className="block mt-5 not-italic font-display text-[15px] text-muted">Phil Fifield</cite>
            </blockquote>
            <blockquote className="rounded border border-dashed border-line p-6 font-display text-[17px] text-muted">
              [Client quote and name: with written permission]
            </blockquote>
          </div>
        </section>

        {/* 8. Who we work with. */}
        <section className="bg-band px-4 md:px-10 py-20 md:py-28">
          <div className="max-w-[1360px] mx-auto">
            <h2 className="font-display text-[30px] md:text-[44px] leading-tight font-light tracking-tight text-ink">
              Who we work with
            </h2>
            <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {markets.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="font-display text-[20px] md:text-[24px] font-light text-blue underline underline-offset-4 decoration-blue/30 hover:decoration-blue"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9. From the blog. */}
        {posts.length > 0 && (
          <section className="px-4 md:px-10 py-24 md:py-32">
            <div className="max-w-[1360px] mx-auto">
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-[30px] md:text-[44px] leading-tight font-light tracking-tight text-ink">
                  From the blog
                </h2>
                <Link href="/insights" className="font-display text-[15px] text-blue underline underline-offset-4">
                  All posts
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {posts.map((p) => (
                  <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded bg-band">
                      <Image src={p.cover} alt={p.coverAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    </div>
                    <p className="mt-5 font-display text-[19px] md:text-[21px] leading-snug text-ink transition-colors group-hover:text-blue">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 10. Closing call. */}
        <section className="border-t border-line px-4 md:px-10 py-20 md:py-24">
          <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center gap-8 md:gap-14">
            <Image
              src={photos.phil.src}
              alt={photos.phil.alt}
              width={photos.phil.width}
              height={photos.phil.height}
              sizes="(min-width: 640px) 200px, 50vw"
              className="w-[50%] max-w-[200px] sm:w-[200px] shrink-0 h-auto rounded"
            />
            <p className="text-[19px] md:text-[22px] leading-snug text-body max-w-[48ch]">
              You work with Phil Fifield. He runs operations for a restaurant franchisee in Central
              Kentucky and built the AI systems it runs on.
            </p>
          </div>
        </section>
      </div>

      <CTABand
        headline="You don't need every answer first."
        subtext="Book a 30-minute call. Bring the spreadsheet, the report or the question."
      />
    </>
  );
}
