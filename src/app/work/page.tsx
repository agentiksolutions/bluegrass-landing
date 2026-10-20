import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import CTABand from "@/components/cta-band";
import PageHero from "@/components/v2/page-hero";
import { FadeUp } from "@/components/v2/reveal";
import { StorePanel } from "@/components/v2/panels";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Case studies from Bluegrass Advisory Group: a Five Guys franchisee in Central Kentucky and The PFSA, a Lexington nonprofit.",
  path: "/work",
});

// The store photos wait for the franchise owner's OK (photos.ts). The franchisee case shows its store
// screen redrawn in code with sample figures; the PFSA case shows its real public site.
const cases = [
  {
    href: "/work/restaurant-franchisee",
    photo: null,
    title: "A Five Guys franchisee in Central Kentucky",
    line: "Three stores' numbers, checklists and newsletter in one manager portal.",
    caption: "The store screen, redrawn with sample data",
  },
  {
    href: "/work/pfsa",
    photo: photos.pfsaSite,
    title: "The PFSA, a Lexington nonprofit",
    line: "A board portal, a public website and an online application.",
    caption: "thepfsa.org",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero compact title="Work" intro="Two businesses and the systems we built for them." />
      <section className="px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-page space-y-24 md:space-y-32">
          {cases.map((c, i) => (
            <FadeUp key={c.href}>
              <Link
                href={c.href}
                className={`group grid grid-cols-1 items-center gap-8 lg:gap-16 ${
                  i % 2 ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
                }`}
              >
                <div className={`overflow-hidden rounded-[6px] border border-line bg-band ${i % 2 ? "lg:order-2" : ""}`}>
                  {c.photo ? (
                    <Image
                      src={c.photo.src}
                      alt={c.photo.alt}
                      width={c.photo.width}
                      height={c.photo.height}
                      sizes="(min-width: 1024px) 760px, 100vw"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="bg-night p-4 sm:p-8">
                      <StorePanel />
                    </div>
                  )}
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>
                  <h2 className="font-display text-[32px] font-light leading-[1.05] tracking-[-0.03em] text-ink transition-colors group-hover:text-blue md:text-[48px]">
                    {c.title}
                  </h2>
                  <p className="mt-5 max-w-[40ch] text-[18px] leading-relaxed text-body md:text-[19px]">{c.line}</p>
                  <p className="mt-4 font-display text-[14px] text-muted">{c.caption}</p>
                  <span className="mt-6 inline-block font-display text-[15px] font-semibold text-blue underline decoration-blue/40 underline-offset-4 group-hover:decoration-blue">
                    Read the case study
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
