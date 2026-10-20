import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import CTABand from "@/components/cta-band";
import PageHero from "@/components/v2/page-hero";

export const metadata: Metadata = pageMeta({
  title: "Showroom",
  description:
    "Try AI tools for your business without signing up. Interactive demos for dashboards, websites, and AI readiness reports. Lexington, KY.",
  path: "/showroom",
});

const rooms = [
  {
    id: "report",
    title: "AI Readiness Report",
    desc: "Enter your business details and get a short report on where AI fits your business, specific to your industry and size.",
    href: "/showroom/report",
  },
  {
    id: "website",
    title: "Website Generator",
    desc: "See a live preview of what a professional website could look like for your business. Pick a style, describe what you do, and watch it build.",
    href: "/showroom/website",
  },
  {
    id: "dashboard",
    title: "Dashboard Demo",
    desc: "Explore a sample dashboard for your industry, with charts, KPIs and alerts laid out the way we would build them.",
    href: "/showroom/dashboard",
  },
  {
    id: "examples",
    title: "Built Examples",
    desc: "Real sites and tools we've designed: working builds you can click through and interact with.",
    href: "/showroom/examples",
  },
];

export default function ShowroomPage() {
  return (
    <>
      <PageHero compact title="See it before you buy it" intro="Interactive tools that show what AI can do for your business. Nothing to sign up for." />

      <section className="px-4 pt-12 md:px-10 pb-24 md:pt-20 md:pb-32">
        <ul className="max-w-[1360px] mx-auto divide-y divide-line border-y border-line">
          {rooms.map((room) => (
            <li key={room.id}>
              <Link
                href={room.href}
                className="group grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_auto] gap-3 md:gap-10 py-8 md:py-10 md:items-baseline"
              >
                <h2 className="font-display text-[26px] md:text-[34px] font-light leading-tight tracking-tight text-ink transition-colors group-hover:text-blue">
                  {room.title}
                </h2>
                <p className="text-[18px] leading-relaxed text-body max-w-[56ch]">{room.desc}</p>
                <span className="font-display text-[15px] text-blue underline underline-offset-4 decoration-blue/40 group-hover:decoration-blue whitespace-nowrap">
                  Try it now &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom CTA */}
      <CTABand
        headline="Seen enough?"
        subtext="Book 30 minutes. Tell us about your business and we'll tell you what we would build first."
      />
    </>
  );
}
