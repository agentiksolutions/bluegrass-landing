import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import { KenBurns, Magnetic, MarkDraw, Marquee, ParallaxBand, Reveal, RisingWords } from "@/components/motion";
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

const pillars = [
  {
    title: "Education",
    line: "Classes and workshops for owners and teams.",
    href: "/academy",
    img: "/images/brand/pillar-education.webp",
    alt: "A small workshop in a plain meeting room, people seated facing a presenter",
  },
  {
    title: "Build",
    line: "AI tools, automations and dashboards made for your business.",
    href: "/services/ai-integration",
    img: "/images/brand/pillar-build.webp",
    alt: "Two people looking at a large wall monitor showing a dashboard",
  },
  {
    title: "Support",
    line: "We keep it running and pick up when you call.",
    href: "/services/operations",
    img: "/images/brand/pillar-support.webp",
    alt: "A person at a desk wearing a headset, seen from behind",
  },
];

// The strip that slides between sections. Illustrative only: nobody in these is a client.
const strip = [
  { src: "/images/brand/strip-table.webp", alt: "Two people at a table with a laptop and a printed sheet" },
  { src: "/images/brand/strip-hands.webp", alt: "Hands annotating a printed chart beside a notebook" },
  { src: "/images/brand/ky-hills.webp", alt: "Rolling Central Kentucky hills at golden hour" },
  { src: "/images/brand/strip-room.webp", alt: "A small meeting room after a session" },
  { src: "/images/brand/work-franchisee.webp", alt: "A Kentucky main street at first light" },
  { src: "/images/brand/pillar-education.webp", alt: "A workshop in progress" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* Hero: Kentucky at dawn, edge to edge.
          ponytail: hero.mp4 + hero-poster.webp are one swappable pair. A Seedance clip
          drops in by replacing the two files. motion-reduce:hidden leaves the poster. */}
      <section className="relative h-[90svh] min-h-[540px] mt-16 lg:mt-[72px] overflow-hidden bg-ink">
        <KenBurns>
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
        </KenBurns>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 px-4 md:px-10 pb-12 md:pb-16">
          <div className="max-w-[1360px] mx-auto">
            <h1 className="font-display text-[40px] sm:text-[62px] lg:text-[88px] leading-[0.96] font-bold tracking-tight text-white max-w-[15ch]">
              <RisingWords text="Your AI partner in Central Kentucky." />
            </h1>
            <Reveal delay={0.55} y={16}>
              <p className="mt-6 text-[19px] md:text-[23px] leading-snug text-white/85 max-w-[42ch]">
                We teach your team, build your tools, and support them after.
              </p>
              <Magnetic>
                <Button href={BOOKING_URL} className="mt-8">
                  Book a call
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three pillars. Alternating full rows, the picture sliding in from its own side. */}
      <section className="py-20 md:py-28">
        {pillars.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            // The picture keeps the wide column on both sides of the alternation.
            className={`group grid grid-cols-1 items-center ${
              i % 2
                ? "lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]"
                : "lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]"
            } ${i > 0 ? "mt-16 md:mt-24" : ""}`}
          >
            <ParallaxBand
              className={`h-[44svh] min-h-[280px] lg:h-[58vh] ${i % 2 ? "lg:order-2" : ""}`}
              distance={42}
            >
              <Image
                src={p.img}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </ParallaxBand>
            <Reveal className={`px-4 md:px-10 py-10 lg:py-0 ${i % 2 ? "lg:order-1" : ""}`} delay={0.1}>
              <h2 className="font-display text-[40px] md:text-[64px] leading-none font-bold tracking-tight text-ink group-hover:text-blue">
                {p.title}
              </h2>
              <p className="mt-5 text-[19px] md:text-[22px] leading-snug text-body max-w-[34ch]">
                {p.line}
              </p>
            </Reveal>
          </Link>
        ))}
      </section>

      {/* The strip. Pictures only. */}
      <Marquee>
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

      {/* Quiet. The mark draws itself. */}
      <section className="bg-band px-4 md:px-10 py-20 md:py-32 flex justify-center">
        <MarkDraw className="w-[min(82%,720px)] h-auto" />
      </section>

      {/* His own words, over the limestone country. */}
      <ParallaxBand className="min-h-[70svh] flex items-end bg-ink" distance={70}>
        <Image
          src="/images/brand/ky-limestone.webp"
          alt="A dry-stacked limestone wall along a Kentucky lane at blue hour"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </ParallaxBand>
      <div className="relative -mt-[70svh] min-h-[70svh] flex items-end pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <blockquote className="relative w-full max-w-[1360px] mx-auto px-4 md:px-10 py-16 md:py-24">
          <Reveal>
            <p className="font-display text-[32px] md:text-[62px] leading-[1.02] font-bold tracking-tight text-white max-w-[17ch]">
              &ldquo;We gave the store managers their time back.&rdquo;
            </p>
            <cite className="block mt-6 not-italic font-display text-[15px] text-white/70">
              Phil Fifield
            </cite>
          </Reveal>
        </blockquote>
      </div>

      {/* Work. Two photographs, edge to edge. */}
      <section className="pt-20 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Link href="/work/pfsa" className="group block">
            <ParallaxBand className="h-[46svh] min-h-[300px] lg:h-[52vh] bg-ink" distance={34}>
              <Image
                src={photos.pfsaSite.src}
                alt={photos.pfsaSite.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </ParallaxBand>
            <p className="px-4 md:px-10 py-6 font-display text-[22px] md:text-[28px] leading-tight font-bold text-ink group-hover:text-blue">
              The PFSA, a Lexington nonprofit
            </p>
          </Link>
          <Link href="/work/restaurant-franchisee" className="group block">
            <ParallaxBand className="h-[46svh] min-h-[300px] lg:h-[52vh] bg-ink" distance={34}>
              <Image
                src="/images/brand/work-franchisee.webp"
                alt="A Kentucky main street at first light"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </ParallaxBand>
            <p className="px-4 md:px-10 py-6 font-display text-[22px] md:text-[28px] leading-tight font-bold text-ink group-hover:text-blue">
              A Five Guys franchisee in Central Kentucky
            </p>
          </Link>
        </div>
      </section>

      {/* Who is behind it. Small, and late. */}
      <section className="bg-band px-4 md:px-10 py-20 md:py-28">
        <Reveal className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center gap-8 md:gap-14">
          <Image
            src={photos.phil.src}
            alt={photos.phil.alt}
            width={photos.phil.width}
            height={photos.phil.height}
            sizes="(min-width: 640px) 300px, 60vw"
            className="w-[58%] max-w-[300px] sm:w-[300px] shrink-0 h-auto rounded"
          />
          <p className="text-[20px] md:text-[26px] leading-snug text-body max-w-[26ch]">
            Phil Fifield, Lexington, Kentucky.
          </p>
        </Reveal>
      </section>

      <CTABand headline="Book a 30-minute call." subtext="" />
    </>
  );
}
