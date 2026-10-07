import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABand from "@/components/cta-band";
import HeroNetwork from "@/components/hero-network";
import JsonLd from "@/components/json-ld";
import { BlurWords, FadeIn, ScrollThread } from "@/components/motion";
import { getAllPosts } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";
import { AssistantPanel, SupportThread, SystemsMap } from "@/components/work-panels";
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
// hero, what we help with, who you work with, services, the Roadmap, results, who we work
// with, blog, closing call.
// Pictures (Phil, 2026-10-07: generated scenes "are weird"): only real things. Phil's own
// photo, a screenshot of the live Academy and of the PFSA site, and panels drawn in code that
// show the kind of software BAG builds, each marked "Sample data".
// No proof figures or client logos: only one figure had a source and only one client has given
// permission. Proof is plain outcomes (memory feedback-proof-lines-plain-outcomes).

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
  visual: "academy" | "assistant" | "support";
}[] = [
  {
    title: "Education",
    line: "Classes and workshops for owners and their teams.",
    names: "AI Academy · Team training sessions",
    href: "/academy",
    visual: "academy",
  },
  {
    title: "Build",
    line: "We pair you with the AI tools that fit your business, set them up and train your people.",
    names: "Roadmap · Business AI Setup · Implementation",
    href: "/services",
    visual: "assistant",
  },
  {
    title: "Support",
    line: "We keep it running and pick up when you call.",
    names: "Monthly plans · Office Hours · Embedded Retainer · Workspace Tune-Up",
    href: "/services",
    visual: "support",
  },
];

// Sourced: Engagement Catalog, "The path for small businesses".
const path = ["Free intro call", "Roadmap", "Business AI Setup", "A monthly plan"];

// Each line comes from that market's own page on this site.
const markets = [
  {
    label: "Restaurants and hospitality",
    href: "/ai-for-hospitality",
    line: "Store managers open one portal for their numbers, checklists and the weekly newsletter.",
  },
  {
    label: "Multi-location operators",
    href: "/multi-location-dashboards",
    line: "Every location's numbers on one screen, counted the same way.",
  },
  {
    label: "Nonprofits",
    href: "/work/pfsa",
    line: "A board portal for donations, receipts and meeting minutes.",
  },
  {
    label: "Kentucky small businesses",
    href: "/ai-for-small-business-kentucky",
    line: "Pick the one job that eats the most hours and set AI on that first.",
  },
];

function ServiceVisual({ visual }: { visual: (typeof services)[number]["visual"] }) {
  if (visual === "assistant") return <AssistantPanel />;
  if (visual === "support") return <SupportThread />;
  return (
    <Image
      src="/images/work/academy-4k.webp"
      alt="The BAG Academy course page: AI Foundations, a practical course on using AI at work, with the lesson list down the side"
      fill
      sizes="(min-width: 1024px) 760px, 100vw"
      className="object-cover"
    />
  );
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  // Motion on this page (Phil, 2026-09-26: "It has to flow"), each idea used once:
  // the hero network, the only thing that keeps moving; the hero words out of a blur; one thread
  // down the left edge that fills as you scroll; the support reply fading in; the systems map
  // drawing its lines. Everything else stays still.
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* 1. Hero. The network is drawn live on the device, so it is sharp at any resolution. */}
      <section className="relative h-[100svh] md:h-[84svh] min-h-[560px] md:max-h-[860px] mt-16 lg:mt-[72px] overflow-hidden bg-ink">
        <HeroNetwork />
        <div className="relative h-full px-4 md:px-10 pt-14 md:pt-0 md:flex md:items-center">
          <div className="max-w-[1360px] w-full mx-auto">
            <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[84px] leading-[0.97] font-extralight tracking-[-0.03em] text-ink max-w-[12ch]">
              <BlurWords text="Your AI partner in Central Kentucky." />
            </h1>
            <FadeIn delay={1.3}>
              <p className="mt-7 text-[19px] md:text-[23px] leading-snug text-body max-w-[30ch]">
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

        {/* 2. What we help with. */}
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

        {/* 3. Who you work with. Phil is the one real person BAG can show, so he comes early. */}
        <section className="px-4 md:px-10 py-24 md:py-32">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-center">
            <Image
              src={photos.phil.src}
              alt={photos.phil.alt}
              width={photos.phil.width}
              height={photos.phil.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="w-full max-w-[520px] h-auto rounded"
            />
            <div>
              <h2 className="font-display text-[36px] md:text-[56px] leading-[1.02] font-light tracking-tight text-ink max-w-[16ch]">
                You work with Phil Fifield
              </h2>
              <p className="mt-7 text-[19px] md:text-[22px] leading-snug text-body max-w-[44ch]">
                He has run businesses for over 15 years. Today he runs operations for a restaurant
                franchisee in Central Kentucky and is president of a Lexington nonprofit. He built
                the AI systems both of them run on, and he runs them himself.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block font-display text-[16px] text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
              >
                More about Phil
              </Link>
            </div>
          </div>
        </section>

        {/* 4. How we help. Each row shows the real thing: the live Academy, a Business AI Setup
            workspace and a job board. */}
        <section id="how-we-help" className="bg-band py-24 md:py-36 scroll-mt-20">
          <h2 className="px-4 md:px-10 max-w-[1360px] mx-auto mb-14 md:mb-20 font-display text-[40px] md:text-[64px] leading-none font-light tracking-tight text-ink">
            How we help
          </h2>
          <div className="px-4 md:px-10 max-w-[1360px] mx-auto space-y-20 md:space-y-28">
            {services.map((s, i) => (
              <Link
                key={s.title}
                href={s.href}
                className={`group grid grid-cols-1 gap-8 lg:gap-16 items-center ${
                  i % 2 ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
                }`}
              >
                {/* Every visual sits in the same 16:9 frame so the three rows line up. */}
                <div
                  className={`relative overflow-hidden rounded-lg border border-line ${
                    s.visual === "academy" ? "aspect-[16/9] bg-white" : "min-h-[380px] sm:min-h-0 sm:aspect-[16/9] bg-ink"
                  } ${i % 2 ? "lg:order-2" : ""}`}
                >
                  <ServiceVisual visual={s.visual} />
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>
                  <h3 className="font-display text-[44px] md:text-[64px] leading-none font-extralight tracking-tight text-ink transition-colors group-hover:text-blue">
                    {s.title}
                  </h3>
                  <p className="mt-6 text-[19px] md:text-[22px] leading-snug text-body max-w-[34ch]">{s.line}</p>
                  <p className="mt-4 font-display text-[15px] text-muted max-w-[40ch]">{s.names}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Start from the work: the Roadmap's real deliverable, and the path after it. */}
        <section className="px-4 md:px-10 py-24 md:py-36">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SystemsMap />
            <div>
              <h2 className="font-display text-[40px] md:text-[60px] leading-[1.02] font-light tracking-tight text-ink max-w-[16ch]">
                Start with the work, then add AI
              </h2>
              <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[44ch]">
                The Roadmap starts with how your work gets done today. You show us in one screen
                share, and you get a one-page map of your systems and a written plan for what to
                set up first.
              </p>
              <ol className="mt-9 border-t border-line">
                {path.map((p) => (
                  <li key={p} className="border-b border-line py-4 font-display text-[18px] md:text-[20px] font-light text-ink">
                    {p}
                  </li>
                ))}
              </ol>
              <Link
                href="/services"
                className="mt-8 inline-block font-display text-[16px] text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
              >
                How it works
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Recent work: the result for each in plain words, with the real screens. */}
        <section className="bg-band px-4 md:px-10 py-24 md:py-32">
          <div className="max-w-[1360px] mx-auto">
            <h2 className="mb-12 md:mb-16 font-display text-[40px] md:text-[64px] leading-none font-light tracking-tight text-ink">
              Recent work
            </h2>
            <div className="space-y-20 md:space-y-28">
              <Link
                href="/work/restaurant-franchisee"
                className="group grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-16 items-center"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-white">
                  <Image
                    src="/images/work/manager-portal.webp"
                    alt="The manager portal's store home screen in demo mode: secret shopper progress, period health score, sales, labor and hiring for a demo store"
                    fill
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-[28px] md:text-[40px] leading-[1.05] font-light text-ink transition-colors group-hover:text-blue">
                    A restaurant franchisee in Central Kentucky
                  </p>
                  <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[44ch]">
                    The managers used to run three stores off scattered files and calls to Phil. Now
                    they open one portal for their numbers, checklists and the weekly newsletter.
                  </p>
                  <p className="mt-4 font-display text-[14px] text-muted">The portal, shown in demo mode</p>
                </div>
              </Link>
              <Link
                href="/work/pfsa"
                className="group grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16 items-center"
              >
                <div className="lg:order-2 relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-white">
                  <Image
                    src={photos.pfsaSite.src}
                    alt={photos.pfsaSite.alt}
                    fill
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="lg:order-1">
                  <p className="font-display text-[28px] md:text-[40px] leading-[1.05] font-light text-ink transition-colors group-hover:text-blue">
                    The PFSA, a Lexington nonprofit
                  </p>
                  <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-body max-w-[44ch]">
                    The board stopped tracking donations in Quicken. Donations, receipts and meeting
                    minutes now live in one portal.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Who we work with. */}
        <section className="px-4 md:px-10 py-24 md:py-32">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
            <h2 className="font-display text-[36px] md:text-[56px] leading-none font-light tracking-tight text-ink">
              Who we work with
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {markets.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="group grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-2 md:gap-10 py-7 md:py-8"
                  >
                    <span className="font-display text-[22px] md:text-[28px] font-light leading-tight text-ink transition-colors group-hover:text-blue">
                      {m.label}
                    </span>
                    <span className="text-[18px] leading-relaxed text-body">{m.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. From the blog. */}
        {posts.length > 0 && (
          <section className="border-t border-line px-4 md:px-10 py-24 md:py-32">
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
      </div>

      <CTABand
        headline="You don't need every answer first."
        subtext="Book a 30-minute call. Bring the spreadsheet, the report or the question."
      />
    </>
  );
}
