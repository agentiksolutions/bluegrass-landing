import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import CTABand from "@/components/cta-band";
import AutoplayVideos from "@/components/autoplay-videos";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Bluegrass Advisory Group — AI and operations consulting built from 13 years of real hospitality and business operations experience. Lexington, Kentucky.",
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Phil Fifield",
  jobTitle: "Founder & CEO",
  worksFor: {
    "@type": "Organization",
    name: "Bluegrass Advisory Group",
    url: "https://bluegrassadvisorygroup.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lexington",
    addressRegion: "KY",
    addressCountry: "US",
  },
};

const stats = [
  { num: "10+", label: "years in hospitality" },
  { num: "Multiple", label: "locations managed" },
  { num: "Hundreds", label: "of employees" },
  { num: "KY", label: "based, KY focused" },
];

const differentiators = [
  "We still manage real operations — this isn't academic",
  "We build what we use ourselves, every day",
  "No recurring SaaS fees or vendor lock-in",
  "Kentucky-based, working with Kentucky businesses",
  "We tell you if something isn't worth doing",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
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
              Built from experience, not theory.
            </h2>
            <p className="text-[16px] leading-relaxed text-[#555] mb-5">
              Phil spent over a decade in the hospitality industry — managing
              hundreds of employees across multiple locations. He didn&apos;t read
              about running businesses in a textbook. He&apos;s been in the weeds
              every day for over a decade.
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
              We build tools that make businesses run better — because we use them
              ourselves.
            </p>
            <p className="text-[16px] leading-relaxed text-[#555] mt-5">
              Read about how we{" "}
              <Link href="/insights/automated-35-workflows" className="text-emerald hover:underline">
                automated 35 workflows
              </Link>{" "}
              before taking on a single client, or see how we{" "}
              <Link href="/insights/cut-12-hours-admin" className="text-emerald hover:underline">
                cut 12 hours of weekly admin
              </Link>{" "}
              across three locations.
            </p>
          </div>

          <div className="relative rounded-[12px] overflow-hidden bg-graphite aspect-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/horse-track.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-graphite text-warm-white py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0 text-center md:text-left">
                <div className="font-display text-3xl md:text-[44px] font-bold text-emerald mb-2 leading-none">
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
              The practitioner difference.
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

      <AutoplayVideos />

      <CTABand
        headline="Let's figure out if we can help."
        subtext="No sales pitch. No pressure. Just a conversation about your business and whether AI makes sense for where you are right now."
        video="/videos/kling-architecture.mp4"
      />
    </>
  );
}
