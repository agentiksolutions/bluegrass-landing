import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Card from "@/components/card";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "No signup. No sales pitch. Interactive tools that show you what AI can do for your business.",
};

const rooms = [
  {
    id: "report",
    num: "01",
    title: "AI Opportunity Report",
    desc: "Enter your business info. Get a custom report on where AI can actually save you time and money. Specific to your industry, your size, your problems.",
    tag: "Interactive",
    time: "2 min",
    href: "/showroom/report",
  },
  {
    id: "website",
    num: "02",
    title: "Website Generator",
    desc: "See a live preview of what a professional website could look like for your business. Pick a style, describe what you do, and watch it build.",
    tag: "Live Preview",
    time: "1 min",
    href: "/showroom/website",
  },
  {
    id: "dashboard",
    num: "03",
    title: "Dashboard Demo",
    desc: "Explore an interactive dashboard for your industry. Real charts, real KPIs, real alerts. This is what your numbers look like when they're organized.",
    tag: "Interactive",
    time: "Browse",
    href: "/showroom/dashboard",
  },
  {
    id: "examples",
    num: "04",
    title: "Built Examples",
    desc: "Real sites and tools we've designed. Not mockups — fully functional builds you can click through and interact with.",
    tag: "Portfolio",
    time: "Browse",
    href: "/showroom/examples",
  },
];

export default function ShowroomPage() {
  return (
    <>
      {/* Hero */}
      <div className="max-w-content mx-auto px-6 md:px-12 pt-[148px]">
        <SectionLabel>Showroom</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          See it before you buy it.
        </h1>
        <p className="text-[17px] leading-relaxed text-stone max-w-[520px]">
          No signup. No sales pitch. Interactive tools that show you what AI can
          do for your business. Try as many as you want.
        </p>
      </div>

      {/* Room Grid */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 pb-24 grid grid-cols-1 md:grid-cols-2 gap-5">
        {rooms.map((room) => (
          <Link key={room.id} href={room.href} className="group block">
            <Card className="!p-10">
              <div className="flex justify-between items-start mb-5">
                <span className="font-display text-4xl font-bold text-[#e8e5e0] group-hover:text-emerald transition-colors leading-none">
                  {room.num}
                </span>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold tracking-[1.5px] text-emerald uppercase bg-emerald/[0.07] px-2.5 py-1 rounded-[3px]">
                    {room.tag}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-[#999] uppercase bg-[#f5f4f2] px-2.5 py-1 rounded-[3px]">
                    {room.time}
                  </span>
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold mb-2.5 group-hover:text-emerald transition-colors">
                {room.title}
              </h2>
              <p className="text-sm leading-relaxed text-stone mb-6">
                {room.desc}
              </p>
              <span className="text-[13px] font-semibold text-emerald opacity-0 group-hover:opacity-100 transition-opacity">
                Try it now &rarr;
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <CTABand
        dark
        headline="Seen enough?"
        subtext="30 minutes. No pitch. Tell us about your business and we'll tell you what's worth building."
      />
    </>
  );
}
