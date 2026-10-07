import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "A free intro call, a Roadmap and a Business AI Setup for your team, then a monthly plan. Training, websites and dashboards too. Lexington, Kentucky.",
  path: "/services",
});

// Every line below is sourced from Discovery-Kit/BAG-Engagement-Catalog.md, "The Big Picture"
// and the Business AI Setup and Roadmap sections (2026-10-06). No prices, no durations.
const path = [
  {
    name: "Free intro call",
    body: "A 30-minute call about your business. After it you get an email with a recommendation, and sometimes the recommendation is that you do not need us yet.",
  },
  {
    name: "Intake form",
    body: "A questionnaire about your business, your tools and your people. We read it before we meet.",
  },
  {
    name: "Roadmap",
    body: "You and the people who do the work show us how it gets done today, in one recorded screen share. You get a one-page map of your systems, a written plan for what to set up first, and a live call to walk through it.",
  },
  {
    name: "Business AI Setup",
    body: "We set up Claude for your business and train your people to use it: the app, connections to your email, calendar and files, a work folder and day-one skills. The assistant can read your email, calendar and files. It cannot send or delete anything. Three packages: Essentials, Professional and Custom.",
  },
  {
    name: "A monthly plan",
    body: "Updates keeps your setup current. Support adds changes every month. Office Hours gives you time with Phil every month.",
  },
];

const larger = [
  {
    name: "Discovery & Strategic Roadmap",
    body: "An assessment of where you are, ranked recommendations and a sequenced roadmap. For businesses with several companies, or custom work.",
  },
  {
    name: "Implementation",
    body: "We build what the roadmap recommends.",
  },
  {
    name: "Embedded Retainer",
    body: "We become your ongoing AI operations team.",
  },
];

const also = [
  { name: "Team training", body: "Classes for your people, at your office or by screen share.", href: "/academy" },
  { name: "Workspace Tune-Up", body: "We check your Claude setup against current guidance and apply the fixes you approve.", href: "/contact" },
  { name: "Websites", body: "A site that says plainly what you do. You own it and the hosting account.", href: "/services/web-design" },
  { name: "Dashboards", body: "Your numbers from the systems you already use, on one screen.", href: "/services/dashboards" },
];

const guides = [
  { href: "/ai-assessment", label: "What an AI assessment involves" },
  { href: "/ai-consulting-cost", label: "What drives the cost" },
  { href: "/ai-tools-we-build", label: "The tools we build most often" },
  { href: "/multi-location-dashboards", label: "Dashboards for more than one location" },
  { href: "/ai-for-hospitality", label: "AI for hospitality businesses" },
  { href: "/ai-for-small-business-kentucky", label: "AI for Kentucky small business" },
  { href: "/ai-consulting-lexington-ky", label: "AI consulting in Lexington" },
  { href: "/faq", label: "Questions we get asked" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(560px,calc(100svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.98] font-extralight tracking-[-0.03em] text-ink max-w-[11ch]">
              What we do for your business
            </h1>
            <p className="mt-7 text-[19px] md:text-[22px] leading-snug text-body max-w-[36ch]">
              Most businesses start with a free call and a Roadmap, then a Business AI Setup for
              their team.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/scenes/working-session.webp"
              alt="Two people at a long table in a brick-walled office at dusk, going over a diagram on a laptop and a printed map"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[36px] md:text-[56px] leading-none font-light tracking-tight text-ink">
            How it works
          </h2>
          <ol className="divide-y divide-line border-y border-line">
            {path.map((p) => (
              <li key={p.name} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-8 md:py-10">
                <h3 className="font-display text-[24px] md:text-[30px] font-light leading-tight text-ink">{p.name}</h3>
                <p className="text-[18px] md:text-[19px] leading-relaxed text-body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[44px] leading-[1.05] font-light tracking-tight text-ink">
              For larger businesses
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-body max-w-[34ch]">
              Several companies or entities, or custom work.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {larger.map((l) => (
              <li key={l.name} className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-3 md:gap-10 py-7 md:py-8">
                <h3 className="font-display text-[22px] md:text-[26px] font-light leading-tight text-ink">{l.name}</h3>
                <p className="text-[18px] leading-relaxed text-body">{l.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto">
          <h2 className="font-display text-[32px] md:text-[44px] leading-tight font-light tracking-tight text-ink">
            Also
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {also.map((a) => (
              <Link key={a.name} href={a.href} className="group block border-t border-line py-7">
                <h3 className="font-display text-[22px] md:text-[24px] font-light tracking-tight text-ink transition-colors group-hover:text-blue">
                  {a.name}
                </h3>
                <p className="mt-2 text-[18px] leading-relaxed text-body">{a.body}</p>
              </Link>
            ))}
          </div>
          <nav aria-label="Guides" className="mt-16 border-t border-line pt-10">
            <h2 className="font-display text-[18px] font-semibold text-ink">Guides</h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 font-display text-[16px]">
              {guides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <CTABand headline="Not sure which one fits?" />
    </>
  );
}
