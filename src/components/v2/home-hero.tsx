import Button from "@/components/button";
import { FadeUp, Reveal } from "./reveal";
import { MARK } from "@/lib/mark-geometry";
import { BOOKING_URL } from "@/lib/site";

// The logo's Kentucky up front: one solid blue state with its white star (Phil, 2026-10-29).
// The 3D slab and the moving 2D light are in git history (commits 1bb02de and cf79354).
export default function HomeHero() {
  return (
    <section data-nav="dark" className="night relative overflow-hidden bg-night px-4 pb-14 pt-28 text-night-text md:px-10 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-page-pad">
        <FadeUp onLoad className="ml-auto w-full max-w-[880px]">
          <svg viewBox={MARK.viewBox} className="h-auto w-full" role="img" aria-label="Kentucky, with a star at Lexington">
            <path d={MARK.state} fill="#0033A0" />
            <path d={MARK.star} fill="#FFFFFF" />
          </svg>
        </FadeUp>
        <div className="mt-10 md:mt-14">
          <div data-quiet className="w-fit max-w-full">
            <Reveal
              as="h1"
              onLoad
              delay={0.1}
              text={"Your AI partner in\nCentral Kentucky."}
              className="font-display text-[44px] font-medium leading-[0.98] tracking-[-0.04em] sm:text-[68px] lg:text-[104px]"
            />
          </div>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[30ch] text-[19px] leading-snug text-night-body md:text-[22px]">
              We train your team, build your tools and keep them running.
            </p>
            <FadeUp onLoad delay={0.6}>
              <Button href={BOOKING_URL}>Book a free call</Button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
