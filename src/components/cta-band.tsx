import Button from "./button";
import { BOOKING_URL, EMAIL, PHONE, PHONE_HREF } from "@/lib/site";

interface CTABandProps {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonHref?: string;
}

// One closing band for every page: limestone, a plain offer, the booking link.
export default function CTABand({
  headline = "Tell me what takes up your week.",
  subtext = "Book a 30-minute call. We talk through your business, and I tell you whether I can help.",
  buttonText = "Book a call",
  buttonHref = BOOKING_URL,
}: CTABandProps) {
  return (
    <section className="bg-band px-4 md:px-10 py-16 md:py-20">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-[560px]">
          <h2 className="font-display text-[30px] md:text-[36px] leading-tight font-bold tracking-tight text-ink">
            {headline}
          </h2>
          <p className="mt-3 text-[18px] leading-relaxed text-body">{subtext}</p>
        </div>
        <div className="font-display text-[15px] text-ink">
          <Button href={buttonHref}>{buttonText}</Button>
          <p className="mt-4">
            Or call{" "}
            <a href={PHONE_HREF} className="text-blue underline underline-offset-2">
              {PHONE}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${EMAIL}`} className="text-blue underline underline-offset-2">
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
