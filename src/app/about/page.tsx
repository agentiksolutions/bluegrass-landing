import type { Metadata } from "next";
import SectionLabel from "@/components/section-label";
import VideoPlayer from "@/components/video-player";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Phil Fifield — 13 years in restaurant operations, now building AI tools for businesses that need to modernize. Based in Lexington, Kentucky.",
};

const stats = [
  { num: "13", label: "years in operations" },
  { num: "3", label: "locations managed" },
  { num: "85", label: "employees" },
  { num: "KY", label: "based, KY focused" },
];

const differentiators = [
  "We still run businesses — this isn't academic",
  "We build what we use ourselves, every day",
  "No recurring SaaS fees or vendor lock-in",
  "Kentucky-based, working with Kentucky businesses",
  "We tell you if something isn't worth doing",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-graphite text-warm-white pt-[148px] pb-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <SectionLabel light>About</SectionLabel>
          <h1 className="font-display text-[clamp(40px,5.5vw,58px)] leading-[1.1] font-bold tracking-tight mb-4">
            Phil Fifield
          </h1>
          <p className="text-lg text-[#aaa]">Founder & CEO</p>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px] items-start">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">
              Built by an operator, not a consultant.
            </h2>
            <p className="text-[16px] leading-relaxed text-[#555] mb-5">
              Phil spent 13 years in restaurant operations — from crew member to
              Director of Operations managing 3 Five Guys locations and 85
              employees. He didn&apos;t read about running businesses in a textbook.
              He&apos;s been in the weeds every day for over a decade.
            </p>
            <p className="text-[16px] leading-relaxed text-[#555] mb-5">
              Bluegrass Advisory Group exists because the tools he built for his
              own operation solve the same problems every growing business faces.
              We don&apos;t sell theory. We sell what works — because we use it
              ourselves, every day.
            </p>
            <p className="text-[16px] leading-relaxed text-[#555]">
              Today, Phil runs an autonomous operating system that manages
              workflows across multiple businesses — the same approach we bring to
              every client. We&apos;re not a software company selling licenses.
              We&apos;re operators who build tools that make businesses run better.
            </p>
          </div>

          <VideoPlayer
            src="/videos/kling-hero-bluegrass.mp4"
            label="Kentucky — Where We Work"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-graphite text-warm-white py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl font-bold text-emerald mb-2">
                  {s.num}
                </div>
                <div className="text-sm text-stone tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 px-6 md:px-12 max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px] items-start">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">
              The operator difference.
            </h2>
            <p className="text-[16px] leading-relaxed text-[#555]">
              We&apos;re not consultants who parachute in with a slide deck and
              leave. We build real things, implement them, and make sure they work.
              If it doesn&apos;t save you time or money, we don&apos;t build it.
            </p>
          </div>

          <div className="space-y-4">
            {differentiators.map((d) => (
              <div key={d} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald" />
                </span>
                <span className="text-[15px] text-[#555]">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture video */}
      <section className="py-12 px-6 md:px-12 max-w-content mx-auto">
        <VideoPlayer
          src="/videos/kling-architecture.mp4"
          label="Architecture — How We Think"
        />
      </section>

      <CTABand
        headline="Let's figure out if we can help."
        subtext="No sales pitch. No pressure. Just a conversation about your business and whether AI makes sense for where you are right now."
      />
    </>
  );
}
