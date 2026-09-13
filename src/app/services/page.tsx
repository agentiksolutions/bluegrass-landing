import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Card from "@/components/card";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "AI integration, web design, dashboards, and operations consulting for Kentucky businesses ready to modernize. Based in Lexington, KY.",
  path: "/services",
});

const services = [
  {
    num: "01",
    title: "Web Design & Development",
    desc: "Professional sites built for your business. Not templates. Real design, real hosting, fully yours.",
    icon: "◈",
    href: "/services/web-design",
  },
  {
    num: "02",
    title: "AI Integration",
    desc: "Research, reporting, document creation, and customer tools. Built around your actual workflow.",
    icon: "◉",
    href: "/services/ai-integration",
  },
  {
    num: "03",
    title: "Dashboards & Data",
    desc: "One screen instead of five apps. Real-time numbers that help you make decisions, not just reports you ignore.",
    icon: "◧",
    href: "/services/dashboards",
  },
  {
    num: "04",
    title: "Operations Consulting",
    desc: "We look at how your business runs and fix what's costing you. Processes, tools, communication, all of it.",
    icon: "◫",
    href: "/services/operations",
  },
];

const guides = [
  { href: "/ai-assessment", label: "What an AI assessment involves" },
  { href: "/ai-consulting-cost", label: "What drives the cost of AI consulting" },
  { href: "/ai-tools-we-build", label: "The tools we build most often" },
  { href: "/multi-location-dashboards", label: "Dashboards for multi-location businesses" },
  { href: "/ai-for-hospitality", label: "AI for hospitality businesses" },
  { href: "/ai-for-small-business-kentucky", label: "AI for Kentucky small business" },
  { href: "/ai-consulting-lexington-ky", label: "AI consulting in Lexington, Kentucky" },
  { href: "/faq", label: "Questions we get asked" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>What We Actually Do</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          We meet you where you are.
        </h1>
        <p className="text-lg leading-relaxed text-[#666] max-w-[600px] mb-16">
          Most businesses we talk to aren&apos;t sure what AI can do for them.
          That&apos;s fine. That&apos;s exactly where we start. We learn your
          business first, then figure out where AI actually helps.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <Link key={s.num} href={s.href} className="group">
              <Card className="!p-9 h-full">
                <div className="text-3xl text-emerald mb-4">{s.icon}</div>
                <h2 className="font-display text-xl font-bold mb-3 group-hover:text-emerald transition-colors">
                  {s.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-[#666]">
                  {s.desc}
                </p>
                <div className="mt-5 text-[13px] font-semibold text-emerald opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-3">
            More on how we work.
          </h2>
          <p className="text-[15px] leading-relaxed text-[#666] max-w-[560px] mb-10">
            Longer answers to the questions that come up before anyone signs
            anything.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {guides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex items-baseline justify-between gap-4 border-b border-[#e0dbd4] pb-3"
              >
                <span className="text-[15px] text-[#555] group-hover:text-emerald transition-colors">
                  {g.label}
                </span>
                <span className="text-emerald opacity-0 group-hover:opacity-100 transition-opacity text-sm shrink-0">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        dark
        headline="Not sure which service fits?"
        subtext="30 minutes. No pitch. Tell us about your business and we'll point you in the right direction."
      />
    </>
  );
}
