import type { Metadata } from "next";
import Link from "next/link";
import HeroWorkMap from "@/components/hero-work-map";
import { BOOKING_URL } from "@/lib/site";

// Preview only: hero option B for Phil to compare with the live-network hero on the home page.
// Not linked from anywhere, not in the sitemap, and kept out of search.
export const metadata: Metadata = {
  title: "Hero preview",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return (
    <>
      <section className="relative mt-16 lg:mt-[72px] bg-ink px-4 md:px-10 py-16 md:py-20 lg:min-h-[84svh] lg:flex lg:items-center">
        <div className="max-w-[1360px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-12 lg:gap-14 items-center">
          <div>
            <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[72px] leading-[0.97] font-extralight tracking-[-0.03em] text-ink max-w-[12ch]">
              Your AI partner in Central Kentucky.
            </h1>
            <p className="mt-7 text-[19px] md:text-[23px] leading-snug text-body max-w-[30ch]">
              We teach your team, build your AI tools, and support them after.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={BOOKING_URL}
                className="inline-flex items-center rounded bg-blue px-6 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-blue-dark"
              >
                Book a call
              </a>
              <Link href="/#how-we-help" className="font-display text-[15px] font-semibold text-ink underline underline-offset-4 decoration-blue/50 hover:decoration-blue">
                See how we help
              </Link>
            </div>
          </div>
          <HeroWorkMap />
        </div>
      </section>
      <p className="px-4 md:px-10 py-10 max-w-[1360px] mx-auto font-display text-[15px] text-muted">
        Hero option B, for comparison with the current home page.{" "}
        <Link href="/" className="text-blue underline underline-offset-4">Back to the home page</Link>
      </p>
    </>
  );
}
