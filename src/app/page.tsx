import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import { KenBurns, ParallaxBand } from "@/components/motion";
import { AnimatedGroup } from "@/components/ui-motion/animated-group";
import { BlurFade } from "@/components/ui-motion/blur-fade";
import { Marquee } from "@/components/ui-motion/marquee";
import PathDrawing from "@/components/ui-motion/path-drawing";
import RollingTextButton from "@/components/ui-motion/rolling-text-button";
import VerticalCutReveal from "@/components/ui-motion/vertical-cut-reveal";
import { MARK } from "@/lib/mark-geometry";
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
const figures = [
  { value: "15+", label: "Years running businesses" },
  { value: "[to count]", label: "AI systems in daily use" },
  { value: "[to calculate]", label: "Hours saved each week" },
];

// Client logos go in only with each client's written permission.
const logoSlots = [
  "[The PFSA logo: Phil to approve]",
  "[Client logo: with permission]",
  "[Client logo: with permission]",
  "[Client logo: with permission]",
];

// Sourced: Engagement Catalog "right tier if" lines, and brand decision item 36.
const problems = [
  "Your team uses AI, and there are no written rules for it.",
  "You know AI could help, and you don't know where to start.",
  "Your reports come from two systems that count the week differently.",
  "You have AI questions and nobody to ask.",
];

const services = [
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

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* 1. Hero. */}
      <section className="relative h-[88svh] min-h-[540px] mt-16 lg:mt-[72px] overflow-hidden bg-ink">
        <KenBurns>
          <Image
            src="/images/stock/hero-team-screen.webp"
            alt="Four people leaning in around a computer screen in an office"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </KenBurns>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/15" />
        <div className="absolute inset-x-0 bottom-0 px-4 md:px-10 pb-12 md:pb-16">
          <div className="max-w-[1360px] mx-auto">
            <h1 className="font-display text-[40px] sm:text-[62px] lg:text-[88px] leading-[0.96] font-bold tracking-tight text-white max-w-[15ch]">
              <VerticalCutReveal splitBy="words" staggerDuration={0.055} staggerFrom="first">
                Your AI partner in Central Kentucky.
              </VerticalCutReveal>
            </h1>
            <BlurFade delay={0.5} direction="up" offset={10}>
              <p className="mt-6 text-[19px] md:text-[23px] leading-snug text-white/85 max-w-[42ch]">
                We teach your team, build your AI tools, and support them after.
              </p>
            </BlurFade>
            <BlurFade delay={0.68} direction="up" offset={10} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <RollingTextButton
                href={BOOKING_URL}
                className="inline-flex items-center gap-2 rounded bg-blue px-6 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a call
              </RollingTextButton>
              <a
                href="#how-we-help"
                className="font-display text-[15px] font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
              >
                See how we help
              </a>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* 2. Proof figures. */}
      <section className="px-4 md:px-10 py-14 md:py-20 border-b border-line">
        <AnimatedGroup
          preset="blur-slide"
          inView
          className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10"
        >
          {figures.map((f) => (
            <div key={f.label}>
              <p className="font-display text-[44px] md:text-[64px] leading-none font-bold tracking-tight text-blue">
                {f.value}
              </p>
              <p className="mt-3 font-display text-[16px] md:text-[18px] text-muted">{f.label}</p>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* 3. Clients. Logos only with permission; placeholders until then. */}
      <section className="py-16 md:py-24">
        <BlurFade inView direction="up" offset={12} className="px-4 md:px-10 max-w-[1360px] mx-auto">
          <h2 className="font-display text-[30px] md:text-[44px] leading-tight font-bold tracking-tight text-ink max-w-[22ch]">
            Built with Central Kentucky businesses.
          </h2>
          <p className="mt-4 text-[19px] md:text-[21px] leading-snug text-body max-w-[52ch]">
            A Lexington nonprofit and a three-store restaurant franchisee run on our systems.
          </p>
        </BlurFade>
        <Marquee pauseOnHover repeat={3} className="mt-10 [--duration:36s] [--gap:1rem]">
          {logoSlots.map((l, i) => (
            <div
              key={i}
              className="flex h-[96px] w-[260px] items-center justify-center rounded border border-dashed border-line px-4 text-center font-display text-[14px] text-muted"
            >
              {l}
            </div>
          ))}
        </Marquee>
      </section>

      {/* 4. What we help with. */}
      <section className="bg-band px-4 md:px-10 py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20">
          <BlurFade inView direction="up" offset={12}>
            <h2 className="font-display text-[36px] md:text-[56px] leading-none font-bold tracking-tight text-ink">
              What we help with
            </h2>
          </BlurFade>
          <AnimatedGroup as="ul" preset="blur-slide" inView className="divide-y divide-line border-y border-line">
            {problems.map((p) => (
              <li key={p} className="py-5 md:py-6 font-display text-[20px] md:text-[26px] leading-snug text-ink">
                {p}
              </li>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* 5. How we help. Alternating full rows, the picture drifting against the scroll. */}
      <section id="how-we-help" className="py-20 md:py-28 scroll-mt-20">
        <BlurFade inView direction="up" offset={12} className="px-4 md:px-10 max-w-[1360px] mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-[36px] md:text-[56px] leading-none font-bold tracking-tight text-ink">
            How we help
          </h2>
        </BlurFade>
        {services.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            className={`group grid grid-cols-1 items-center ${
              i % 2
                ? "lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]"
                : "lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]"
            } ${i > 0 ? "mt-16 md:mt-24" : ""}`}
          >
            <ParallaxBand
              className={`h-[44svh] min-h-[280px] lg:h-[56vh] ${i % 2 ? "lg:order-2" : ""}`}
              distance={42}
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </ParallaxBand>
            <BlurFade
              inView
              direction={i % 2 ? "right" : "left"}
              offset={24}
              className={`px-4 md:px-10 py-10 lg:py-0 ${i % 2 ? "lg:order-1" : ""}`}
            >
              <h3 className="font-display text-[40px] md:text-[64px] leading-none font-bold tracking-tight text-ink group-hover:text-blue">
                {s.title}
              </h3>
              <p className="mt-5 text-[19px] md:text-[22px] leading-snug text-body max-w-[34ch]">{s.line}</p>
              <p className="mt-4 font-display text-[15px] text-muted max-w-[40ch]">{s.names}</p>
            </BlurFade>
          </Link>
        ))}
      </section>

      {/* Photographs only, sliding. */}
      <Marquee pauseOnHover repeat={2} className="[--duration:58s] [--gap:1rem] py-0">
        {strip.map((s) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={520}
            height={293}
            sizes="380px"
            className="h-[180px] md:h-[240px] w-auto rounded object-cover"
          />
        ))}
      </Marquee>

      {/* 6. AI, start from the work. */}
      <section className="px-4 md:px-10 py-20 md:py-28">
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
          <BlurFade inView direction="up" offset={14}>
            <h2 className="font-display text-[36px] md:text-[52px] leading-[1.02] font-bold tracking-tight text-ink max-w-[16ch]">
              Start with the work, then add AI.
            </h2>
            <p className="mt-6 text-[19px] md:text-[21px] leading-snug text-body max-w-[44ch]">
              An AI Opportunity Session picks 3 to 7 places AI can take on part of your work, with
              payback worked out from your own numbers.
            </p>
            <AnimatedGroup as="ul" preset="blur-slide" inView className="mt-8 space-y-3">
              {aiSteps.map((a) => (
                <li key={a} className="flex items-baseline gap-3 font-display text-[18px] md:text-[20px] text-ink">
                  <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 translate-y-[-2px] rounded-full bg-blue" />
                  {a}
                </li>
              ))}
            </AnimatedGroup>
          </BlurFade>
        </div>
      </section>

      {/* The mark draws itself. */}
      <section className="bg-band px-4 md:px-10 py-20 md:py-28 flex justify-center">
        <div className="relative w-[min(78%,640px)]">
          {/* PathDrawing strokes its paths and cannot fill one, so the solid state and the
              star sit behind it in a plain SVG on the same viewBox. */}
          <BlurFade inView offset={0} duration={0.7} className="absolute inset-0">
            <svg viewBox={MARK.viewBox} className="w-full h-auto" aria-hidden="true">
              <path d={MARK.state} fill="#0033A0" />
              <path d={MARK.star} fill="#FFFFFF" />
            </svg>
          </BlurFade>
          <PathDrawing
            viewBox={MARK.viewBox}
            title="The Bluegrass Advisory Group mark: Kentucky in blue with a network of white nodes and a star on Lexington"
            paths={MARK.lines.map(([x1, y1, x2, y2]) => ({ d: `M${x1},${y1} L${x2},${y2}`, stroke: "#FFFFFF" }))}
            nodes={MARK.circles.map(([cx, cy, r]) => ({ cx, cy, r, fill: "#FFFFFF" }))}
            strokeWidth={3.6}
            stagger={0.012}
            className="relative w-full h-auto"
          />
        </div>
      </section>

      {/* 7. Results. */}
      <section className="pt-20 md:pt-28">
        <BlurFade inView direction="up" offset={12} className="px-4 md:px-10 max-w-[1360px] mx-auto mb-10 md:mb-14">
          <h2 className="font-display text-[36px] md:text-[56px] leading-none font-bold tracking-tight text-ink">
            Recent work
          </h2>
        </BlurFade>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Link href="/work/pfsa" className="group block">
            <ParallaxBand className="h-[44svh] min-h-[300px] lg:h-[50vh] bg-ink" distance={34}>
              <Image
                src={photos.pfsaSite.src}
                alt={photos.pfsaSite.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </ParallaxBand>
            <div className="px-4 md:px-10 py-6">
              <p className="font-display text-[22px] md:text-[28px] leading-tight font-bold text-ink group-hover:text-blue">
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
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </ParallaxBand>
            <div className="px-4 md:px-10 py-6">
              <p className="font-display text-[22px] md:text-[28px] leading-tight font-bold text-ink group-hover:text-blue">
                A restaurant franchisee in Central Kentucky
              </p>
              <p className="mt-2 text-[18px] leading-snug text-body max-w-[46ch]">
                Three stores run on one manager portal. [to calculate: result in numbers]
              </p>
            </div>
          </Link>
        </div>
        <BlurFade inView direction="up" offset={14} className="px-4 md:px-10 max-w-[1360px] mx-auto py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <blockquote>
            <p className="font-display text-[26px] md:text-[36px] leading-[1.1] font-bold tracking-tight text-ink">
              &ldquo;No one is literate on AI, but they all use the portal.&rdquo;
            </p>
            <cite className="block mt-4 not-italic font-display text-[15px] text-muted">Phil Fifield</cite>
          </blockquote>
          <blockquote className="rounded border border-dashed border-line p-6 font-display text-[17px] text-muted">
            [Client quote and name: with written permission]
          </blockquote>
        </BlurFade>
      </section>

      {/* 8. Who we work with. */}
      <section className="bg-band px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto">
          <h2 className="font-display text-[28px] md:text-[40px] leading-tight font-bold tracking-tight text-ink">
            Who we work with
          </h2>
          <AnimatedGroup as="ul" preset="blur-slide" inView className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {markets.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="font-display text-[20px] md:text-[24px] text-blue underline underline-offset-4 decoration-blue/30 hover:decoration-blue"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* 9. From the blog. */}
      {posts.length > 0 && (
        <section className="px-4 md:px-10 py-20 md:py-28">
          <div className="max-w-[1360px] mx-auto">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-[28px] md:text-[40px] leading-tight font-bold tracking-tight text-ink">
                From the blog
              </h2>
              <Link href="/insights" className="font-display text-[15px] text-blue underline underline-offset-4">
                All posts
              </Link>
            </div>
            <AnimatedGroup preset="blur-slide" inView className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              {posts.map((p) => (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-band">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 font-display text-[19px] md:text-[21px] leading-snug font-semibold text-ink group-hover:text-blue">
                    {p.title}
                  </p>
                </Link>
              ))}
            </AnimatedGroup>
          </div>
        </section>
      )}

      {/* 10. Closing call. */}
      <section className="border-t border-line px-4 md:px-10 py-16 md:py-20">
        <BlurFade inView direction="up" offset={12} className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center gap-8 md:gap-14">
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
        </BlurFade>
      </section>

      <CTABand
        headline="You don't need every answer first."
        subtext="Book a 30-minute call. Bring the spreadsheet, the report or the question."
      />
    </>
  );
}
