import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Websites, AI tools, dashboards and operations consulting for Kentucky businesses. Each project gets a firm price before it starts. Based in Lexington, KY.",
  path: "/services",
});

const services = [
  {
    title: "Websites",
    desc: "A site that says plainly what you do and how to reach you. You own it and the hosting account.",
    href: "/services/web-design",
  },
  {
    title: "AI tools",
    desc: "Tools for the tasks your team repeats every week, like reports and documents. Your people use them without learning AI.",
    href: "/services/ai-integration",
  },
  {
    title: "Dashboards",
    desc: "Your numbers from the systems you already use, on one screen, so a manager can act today.",
    href: "/services/dashboards",
  },
  {
    title: "Operations consulting",
    desc: "I write down how the work runs and get your people into one system before anything is automated.",
    href: "/services/operations",
  },
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
      <section className="pt-16 lg:pt-[72px] bg-band">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:h-[max(520px,calc(100svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-8 lg:py-12 flex flex-col justify-center">
            <h1 className="font-display text-[36px] lg:text-[50px] leading-[1.05] font-bold tracking-tight text-ink">
              What I build for your business
            </h1>
            <p className="mt-5 text-[19px] leading-relaxed text-body max-w-[36ch]">
              The same kinds of systems I built for a Five Guys franchisee in Central Kentucky.
            </p>
          </div>
          {/* Desktop: one store, whole building in frame. Phone: both stores, uncropped. */}
          <div className="order-1 lg:order-2 relative min-w-0 hidden lg:block">
            <Image
              src={photos.storeA.src}
              alt={photos.storeA.alt}
              fill
              priority
              sizes="60vw"
              className="object-cover object-center"
            />
          </div>
          <div className="order-1 lg:hidden">
            <Image
              src={photos.storeA.src}
              alt={photos.storeA.alt}
              width={photos.storeA.width}
              height={photos.storeA.height}
              priority
              sizes="100vw"
              className="w-full h-auto"
            />
            <Image
              src={photos.storeB.src}
              alt={photos.storeB.alt}
              width={photos.storeB.width}
              height={photos.storeB.height}
              priority
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="group block border-t border-line py-7">
              <h2 className="font-display text-[24px] font-bold tracking-tight text-ink group-hover:text-blue">
                {s.title}
              </h2>
              <p className="mt-2 text-[18px] leading-relaxed text-body">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 pb-16 md:pb-20">
        <div className="max-w-[1160px] mx-auto bg-tint rounded p-7 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-[26px] font-bold tracking-tight text-ink">How a project runs</h2>
            <p className="mt-3 text-[18px] leading-relaxed text-body">
              You get a firm price before anything starts. I ask your administrator for a read-only
              account. A person approves anything that goes out, and you own what I build.
            </p>
          </div>
          <nav aria-label="Guides" className="font-display text-[16px] flex flex-col gap-3 lg:pt-2">
            {guides.map((g) => (
              <Link key={g.href} href={g.href} className="text-blue underline underline-offset-2">
                {g.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <CTABand headline="Not sure which one fits?" />
    </>
  );
}
