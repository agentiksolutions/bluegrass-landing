import Button from "./button";
import { FadeUp, Reveal } from "./v2/reveal";
import { MARK } from "@/lib/mark-geometry";
import { BOOKING_URL, EMAIL, PHONE, PHONE_HREF } from "@/lib/site";

interface CTABandProps {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonHref?: string;
}

// One closing chapter for every page: night, the logo's Kentucky as one solid blue shape with its
// white star (Phil, 2026-10-20: "just a solid blue state like our logo"), a plain offer
// and the booking link. The footer continues the same night background below it.
export default function CTABand({
  headline = "Tell me what takes up your week.",
  subtext = "Book a free 30-minute call.",
  buttonText = "Book a call",
  buttonHref = BOOKING_URL,
}: CTABandProps) {
  return (
    <section data-nav="dark" className="night bg-night px-4 pb-20 pt-24 text-night-text md:px-10 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <Reveal
            text={headline}
            className="max-w-[16ch] font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] md:text-[64px]"
          />
          {subtext && <p className="mt-6 max-w-[44ch] text-[19px] leading-relaxed text-night-body">{subtext}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 font-display text-[15px]">
            <Button href={buttonHref}>{buttonText}</Button>
            <div className="space-y-1 text-night-body">
              <p>
                Or call{" "}
                <a href={PHONE_HREF} className="text-night-text underline decoration-night-blue/60 underline-offset-4 hover:decoration-night-blue">
                  {PHONE}
                </a>
              </p>
              <p>
                <a href={`mailto:${EMAIL}`} className="text-night-text underline decoration-night-blue/60 underline-offset-4 hover:decoration-night-blue">
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
        <FadeUp className="mx-auto w-full max-w-[560px]">
          <svg viewBox={MARK.viewBox} className="h-auto w-full" role="img" aria-label="Kentucky, with a star at Lexington">
            <path d={MARK.state} fill="#0033A0" />
            <path d={MARK.star} fill="#FFFFFF" />
          </svg>
        </FadeUp>
      </div>
    </section>
  );
}
