import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { getAllPosts } from "@/lib/mdx";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://bluegrassadvisorygroup.com/#organization",
  name: "Bluegrass Advisory Group",
  legalName: "Bluegrass Advisory Group, LLC",
  description:
    "AI systems and operations consulting for Kentucky businesses. Based in Lexington, Kentucky.",
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
  serviceType: ["AI Consulting", "Business Operations", "Web Design", "Dashboard Development"],
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
    title: "AI Systems for Kentucky Businesses",
    description:
      "Phil Fifield builds AI systems for Kentucky businesses. He runs operations for a Five Guys franchisee in Central Kentucky and built the systems its managers use. Lexington, KY.",
    path: "/",
  }),
  // The home page carries the brand name first, so it skips the title template.
  title: {
    absolute: "Bluegrass Advisory Group: AI Systems for Kentucky Businesses",
  },
};

const services = [
  { label: "Websites", href: "/services/web-design" },
  { label: "AI tools", href: "/services/ai-integration" },
  { label: "Dashboards", href: "/services/dashboards" },
  { label: "Operations consulting", href: "/services/operations" },
];

export default function HomePage() {
  const latest = getAllPosts()[0];

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* Hero: photographs fill the first screen, the words sit in one limestone strip under them. */}
      <section className="pt-16 lg:pt-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,44fr)_minmax(0,100fr)] h-[max(420px,calc(100svh-4rem-7.5rem))] lg:h-[max(460px,calc(100svh-72px-8.5rem))]">
          <div className="relative min-w-0">
            <Image
              src={photos.team.src}
              alt={photos.team.alt}
              fill
              priority
              sizes="(min-width: 1024px) 31vw, 100vw"
              // ponytail: the box is narrower than the 3:4 photo, so only the sides crop.
              // 12% keeps all four people in frame and centred; the sign on the right is what goes.
              className="object-cover object-[12%_50%]"
            />
          </div>
          <div className="relative min-w-0 hidden lg:block">
            <Image
              src={photos.phil.src}
              alt={photos.phil.alt}
              fill
              priority
              sizes="70vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="bg-band px-4 md:px-10 py-5 lg:py-6">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-3 lg:gap-12 lg:items-center">
            <h1 className="font-display text-[29px] sm:text-[36px] lg:text-[42px] leading-[1.08] font-bold tracking-tight text-ink [overflow-wrap:anywhere]">
              I build AI systems for Kentucky businesses.
            </h1>
            <p className="text-[18px] leading-snug text-body">
              I run operations for a Five Guys franchisee in Central Kentucky and built the AI systems
              we use there.
            </p>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto">
          <h2 className="font-display text-[28px] font-bold tracking-tight text-ink">Work</h2>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-5">
            <Link href="/work/restaurant-franchisee" className="group block">
              <Image
                src={photos.storeA.src}
                alt={photos.storeA.alt}
                width={photos.storeA.width}
                height={photos.storeA.height}
                sizes="(min-width: 1024px) 660px, 100vw"
                className="w-full h-auto rounded"
              />
              <p className="mt-3 font-display text-[16px] text-ink">
                <span className="font-semibold group-hover:text-blue group-hover:underline underline-offset-2">
                  A Five Guys franchisee in Central Kentucky.
                </span>{" "}
                Three stores, one manager portal I built.
              </p>
            </Link>
            <div className="grid grid-cols-1 gap-5 content-start">
              <Link
                href="/work/pfsa"
                className="group block bg-band rounded p-5 md:p-7 hover:outline hover:outline-1 hover:outline-blue"
              >
                <Image
                  src={photos.pfsaSite.src}
                  alt={photos.pfsaSite.alt}
                  width={photos.pfsaSite.width}
                  height={photos.pfsaSite.height}
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="w-full h-auto rounded-sm border border-line mb-5"
                />
                <p className="font-display text-[20px] font-bold text-ink group-hover:text-blue">
                  The PFSA, a Lexington nonprofit
                </p>
                <p className="mt-2 text-[17px] leading-relaxed text-body">
                  A board portal, a public website and an online assistance application, all live
                  within one week in February 2026. I am its president.
                </p>
              </Link>
              <blockquote className="border border-line rounded p-7">
                <p className="font-display text-[21px] leading-snug font-medium text-ink">
                  &ldquo;I use AI to build this, but the people who use it don&apos;t use AI. They
                  benefit from AI.&rdquo;
                </p>
                <cite className="block mt-3 not-italic font-display text-[14px] text-muted">
                  Phil Fifield
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* What changes for the owner */}
      <section className="px-4 md:px-10 pb-16 md:pb-20">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-16 border-t border-line pt-12">
          <h2 className="font-display text-[28px] md:text-[34px] leading-tight font-bold tracking-tight text-ink">
            Your people get the benefit without learning AI.
          </h2>
          <div className="text-[18px] leading-relaxed text-body space-y-4">
            <p>
              If you run more than one location, your managers ask you the same questions every week.
              I build one place where they find the answer: this week&apos;s numbers, the checklists,
              who to call when the ice machine stops working. They use it, and I keep it running.
            </p>
            <p>
              Every project gets a firm price before it starts. I ask for read-only access to your
              systems, and a person approves anything that goes out.
            </p>
            <nav aria-label="Services" className="pt-2 flex flex-wrap gap-x-6 gap-y-2 font-display text-[16px]">
              {services.map((s) => (
                <Link key={s.href} href={s.href} className="text-blue underline underline-offset-2 whitespace-nowrap">
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Phil's own words */}
      <section className="bg-tint px-4 md:px-10 py-16 md:py-20">
        <blockquote className="max-w-[860px] mx-auto">
          <p className="font-display text-[30px] md:text-[42px] leading-[1.12] font-bold tracking-tight text-ink">
            &ldquo;We gave the store managers their time back.&rdquo;
          </p>
          <p className="mt-5 text-[18px] leading-relaxed text-body">
            &ldquo;A lot of the paperwork runs on its own now, and the numbers reach them in a form
            they can read quickly, so they spend their time with guests and their people and make
            decisions with more confidence.&rdquo;
          </p>
          <cite className="block mt-4 not-italic font-display text-[14px] text-muted">
            Phil Fifield, on the franchisee&apos;s stores
          </cite>
        </blockquote>
      </section>

      {latest && (
        <section className="px-4 md:px-10 py-10">
          <p className="max-w-[1160px] mx-auto font-display text-[16px] text-ink">
            From the blog:{" "}
            <Link href={`/insights/${latest.slug}`} className="text-blue underline underline-offset-2">
              {latest.title}
            </Link>
          </p>
        </section>
      )}

      <CTABand />
    </>
  );
}
