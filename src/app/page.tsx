import Link from "next/link";
import SectionLabel from "@/components/section-label";
import Button from "@/components/button";
import Card from "@/components/card";
import CTABand from "@/components/cta-band";
import VideoPlayer from "@/components/video-player";

const services = [
  {
    num: "01",
    title: "Web Design & Development",
    brief:
      "Professional sites built for your business. Not templates — real design, real hosting, fully yours.",
    href: "/services/web-design",
  },
  {
    num: "02",
    title: "AI Integration",
    brief:
      "Research, reporting, document creation, customer tools — built around your actual workflow.",
    href: "/services/ai-integration",
  },
  {
    num: "03",
    title: "Dashboards & Data",
    brief:
      "One screen instead of five apps. Real-time numbers that help you make decisions, not just reports you ignore.",
    href: "/services/dashboards",
  },
  {
    num: "04",
    title: "Operations Consulting",
    brief:
      "We look at how your business runs and fix what's costing you. Processes, tools, communication, all of it.",
    href: "/services/operations",
  },
];

const showroomRooms = [
  {
    num: "01",
    title: "AI Opportunity Report",
    desc: "Enter your business info. Get a custom report on where AI can save you time and money.",
    tag: "Interactive",
    href: "/showroom/report",
  },
  {
    num: "02",
    title: "Website Generator",
    desc: "See a live preview of what your business website could look like. Built in seconds.",
    tag: "Live Preview",
    href: "/showroom/website",
  },
  {
    num: "03",
    title: "Dashboard Demo",
    desc: "Explore a sample dashboard for your industry. See your numbers the way they should look.",
    tag: "Interactive",
    href: "/showroom/dashboard",
  },
  {
    num: "04",
    title: "Built Examples",
    desc: "Real sites and tools we've designed. Click through them, interact with them.",
    tag: "Portfolio",
    href: "/showroom/examples",
  },
];

const blogPosts = [
  {
    title: "What AI Actually Does for a Small Business in 2026",
    category: "AI Basics",
    read: "4 min read",
    slug: "ai-for-small-business",
  },
  {
    title: "Why Your Business Needs a Dashboard, Not Another Spreadsheet",
    category: "Operations",
    read: "3 min read",
    slug: "dashboard-not-spreadsheet",
  },
  {
    title: "The Real Cost of an Outdated Website",
    category: "Web",
    read: "5 min read",
    slug: "cost-of-outdated-website",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="pt-[150px] pb-16 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Lexington, Kentucky</SectionLabel>
        <h1 className="font-display text-[clamp(38px,5.5vw,62px)] leading-[1.1] font-bold tracking-tight mb-7">
          We help businesses
          <br />
          figure out AI.
        </h1>
        <p className="text-lg leading-relaxed text-[#666] max-w-[520px] mb-11">
          Most companies know they should be doing something with AI but don&apos;t
          know where to start. We learn your business, find what&apos;s worth
          building, and build it.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button href="/showroom">Try the Showroom</Button>
          <Button href="/services" variant="secondary">
            What We Do
          </Button>
        </div>
      </section>

      {/* Thin accent line */}
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="h-px bg-gradient-to-r from-emerald/25 to-transparent" />
      </div>

      {/* ════════ SHOWROOM ════════ */}
      <section className="section-padding max-w-content mx-auto">
        <div className="mb-14">
          <SectionLabel>Showroom</SectionLabel>
          <h2 className="font-display text-[clamp(30px,4vw,42px)] font-bold tracking-tight mb-3">
            Don&apos;t take our word for it. Try it.
          </h2>
          <p className="text-base text-stone max-w-[480px]">
            No signup. No sales pitch. Just tools you can use right now to see
            what AI can do for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {showroomRooms.map((room) => (
            <Link key={room.num} href={room.href} className="group block">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-display text-4xl font-bold text-[#e8e5e0] group-hover:text-emerald transition-colors leading-none">
                    {room.num}
                  </span>
                  <span className="text-[10px] font-bold tracking-[1.5px] text-emerald uppercase bg-emerald/[0.07] px-2.5 py-1 rounded-[3px]">
                    {room.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-emerald transition-colors">
                  {room.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone">{room.desc}</p>
                <div className="mt-5 text-[13px] font-semibold text-emerald opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section className="bg-graphite py-24 px-6 md:px-12 text-warm-white">
        <div className="max-w-content mx-auto">
          <div className="flex justify-between items-end mb-14">
            <div>
              <SectionLabel light>Services</SectionLabel>
              <h2 className="font-display text-[clamp(30px,4vw,42px)] font-bold tracking-tight">
                What we build.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-[13px] text-sage font-semibold hover:text-warm-white transition-colors"
            >
              All services &rarr;
            </Link>
          </div>

          <div className="flex flex-col">
            {services.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="group grid grid-cols-[50px_1fr] md:grid-cols-[50px_1fr_1.2fr_40px] items-center gap-7 py-7 border-t border-[#333] cursor-pointer"
              >
                <span className="font-display text-[13px] text-[#555]">
                  {s.num}
                </span>
                <h3 className="font-display text-xl font-semibold group-hover:text-sage transition-colors">
                  {s.title}
                </h3>
                <p className="hidden md:block text-[13px] leading-relaxed text-[#777] opacity-0 group-hover:opacity-100 transition-opacity">
                  {s.brief}
                </p>
                <span className="hidden md:block text-lg text-sage text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </Link>
            ))}
            <div className="border-t border-[#333]" />
          </div>
        </div>
      </section>

      {/* ════════ ABOUT STRIP ════════ */}
      <section className="section-padding max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px] items-center">
          <VideoPlayer
            src="/videos/kling-hero-bluegrass.mp4"
            label="Kentucky — Where We Work"
          />

          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-[34px] font-bold tracking-tight mb-5">
              Built by an operator.
            </h2>
            <p className="text-[15px] leading-relaxed text-[#666] mb-4">
              Phil Fifield spent 13 years in restaurant operations — from crew to
              Director of Operations. He built AI tools to run his own business
              better. Those same tools work for yours.
            </p>
            <p className="text-[15px] leading-relaxed text-[#666] mb-7">
              Based in Lexington, working with Kentucky businesses who want to
              modernize without getting sold a bunch of software they don&apos;t need.
            </p>
            <Link
              href="/about"
              className="text-sm text-emerald font-semibold hover:underline"
            >
              More about us &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ INSIGHTS ════════ */}
      <section className="bg-cream py-24 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <SectionLabel>Insights</SectionLabel>
              <h2 className="font-display text-[clamp(30px,4vw,42px)] font-bold tracking-tight">
                From the blog.
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-[13px] text-emerald font-semibold hover:underline"
            >
              All articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group">
                <article className="bg-warm-white rounded-md p-8 border border-transparent group-hover:border-emerald group-hover:-translate-y-0.5 transition-all duration-[250ms]">
                  <span className="text-[10px] font-bold tracking-[1.5px] text-emerald uppercase">
                    {post.category}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-snug my-3 text-graphite">
                    {post.title}
                  </h3>
                  <span className="text-xs text-[#bbb]">{post.read}</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <CTABand />
    </>
  );
}
