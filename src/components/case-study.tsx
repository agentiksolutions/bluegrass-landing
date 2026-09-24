import Image from "next/image";
import CTABand from "./cta-band";

type Photo = { src: string; width: number; height: number; alt: string };

// Shared frame for the case study pages: label, headline, intro, one picture, then sections.
export function CaseStudyHero({
  label,
  title,
  intro,
  photo,
}: {
  label: string;
  title: string;
  intro: React.ReactNode;
  photo: Photo;
}) {
  return (
    <section className="pt-16 lg:pt-[72px] bg-band min-h-[100svh] flex items-center">
      <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-0 lg:gap-12 lg:items-center lg:px-10 lg:py-12">
        <div className="order-2 lg:order-1 px-4 md:px-10 lg:px-0 py-8 lg:py-0">
          <p className="font-display text-[16px] font-semibold text-blue">{label}</p>
          <h1 className="mt-2 font-display text-[36px] lg:text-[48px] leading-[1.05] font-bold tracking-tight text-ink">
            {title}
          </h1>
          <div className="mt-5 text-[19px] leading-relaxed text-body">{intro}</div>
        </div>
        <div className="order-1 lg:order-2 min-w-0">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="w-full h-auto lg:rounded"
          />
        </div>
      </div>
    </section>
  );
}

export function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-4 md:px-10 py-10 md:py-12">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 lg:gap-16 border-t border-line pt-8">
        <h2 className="font-display text-[26px] font-bold tracking-tight text-ink">{title}</h2>
        <div className="text-[19px] leading-relaxed text-body space-y-4 max-w-[64ch]">{children}</div>
      </div>
    </section>
  );
}

export function CaseQuote({ quote, cite = "Phil Fifield" }: { quote: string; cite?: string }) {
  return (
    <blockquote className="border-t border-ink/20 pt-4">
      <p className="font-display text-[21px] leading-snug font-medium text-ink">&ldquo;{quote}&rdquo;</p>
      <cite className="block mt-2 not-italic font-display text-[14px] text-muted">{cite}</cite>
    </blockquote>
  );
}

export function CaseClose({ note }: { note?: string }) {
  return (
    <>
      {note && (
        <p className="px-4 md:px-10 pb-10 max-w-[1160px] mx-auto font-display text-[14px] text-muted">{note}</p>
      )}
      <CTABand headline="Want something like this for your business?" />
    </>
  );
}
