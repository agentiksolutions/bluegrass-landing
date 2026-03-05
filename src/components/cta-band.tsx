import Button from "./button";

interface CTABandProps {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonHref?: string;
  dark?: boolean;
  video?: string;
}

export default function CTABand({
  headline = "Let's figure it out together.",
  subtext = "30 minutes. No sales pitch. Tell us about your business, ask us anything about AI. If we can help, we'll say so. If we can't, we'll say that too.",
  buttonText = "Schedule a Call",
  buttonHref = "/contact",
  dark = false,
  video,
}: CTABandProps) {
  if (dark) {
    return (
      <section className="bg-graphite py-14 px-6 md:px-12">
        <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-warm-white mb-2">
              {headline}
            </h3>
            <p className="text-sm text-stone leading-relaxed max-w-md">{subtext}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button href={buttonHref}>{buttonText}</Button>
            <Button
              href="mailto:phil@bluegrassadvisorygroup.com"
              variant="secondary"
              className="!text-stone !border-[#444] hover:!border-stone hover:!text-warm-white"
            >
              Email Us
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (video) {
    return (
      <section className="relative py-28 px-6 md:px-12 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-graphite/65" />
        <div className="relative z-10 max-w-[560px] mx-auto text-center">
          <h2 className="font-display text-[clamp(30px,4vw,42px)] font-bold tracking-tight mb-4 text-warm-white">
            {headline}
          </h2>
          <p className="text-base leading-relaxed text-warm-white/70 mb-9">
            {subtext}
          </p>
          <Button href={buttonHref}>{buttonText}</Button>
          <p className="mt-3.5 text-[13px] text-warm-white/40">
            or email{" "}
            <a
              href="mailto:phil@bluegrassadvisorygroup.com"
              className="text-sage hover:underline"
            >
              phil@bluegrassadvisorygroup.com
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-w-[560px] mx-auto text-center">
        <h2 className="font-display text-[38px] font-bold tracking-tight mb-4">
          {headline}
        </h2>
        <p className="text-base leading-relaxed text-stone mb-9">{subtext}</p>
        <Button href={buttonHref} variant="dark">
          {buttonText}
        </Button>
        <p className="mt-3.5 text-[13px] text-[#bbb]">
          or email{" "}
          <a
            href="mailto:phil@bluegrassadvisorygroup.com"
            className="text-emerald hover:underline"
          >
            phil@bluegrassadvisorygroup.com
          </a>
        </p>
      </div>
    </section>
  );
}
