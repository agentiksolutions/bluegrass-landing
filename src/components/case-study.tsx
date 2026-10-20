import CTABand from "./cta-band";
import PageHero from "./v2/page-hero";

type Photo = { src: string; width: number; height: number; alt: string };

// Shared frame for the case study pages: a night opening with the real screen, then ruled sections.
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
  return <PageHero label={label} title={title} intro={intro} shot={photo} />;
}

export function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-5 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <h2 className="font-display text-[30px] font-light tracking-[-0.02em] text-ink md:text-[40px]">{title}</h2>
        <div className="max-w-[64ch] space-y-4 text-[19px] leading-relaxed text-body">{children}</div>
      </div>
    </section>
  );
}

export function CaseQuote({ quote, cite = "Phil Fifield" }: { quote: string; cite?: string }) {
  return (
    <blockquote className="border-t border-line pt-5">
      <p className="font-display text-[24px] font-light leading-snug tracking-[-0.01em] text-ink md:text-[30px]">&ldquo;{quote}&rdquo;</p>
      <cite className="mt-3 block font-display text-[14px] not-italic text-muted">{cite}</cite>
    </blockquote>
  );
}

export function CaseClose({ note }: { note?: string }) {
  return (
    <>
      {note && <p className="mx-auto max-w-page px-4 pb-10 font-display text-[14px] text-muted md:px-10">{note}</p>}
      <div className="pb-16" />
      <CTABand headline="Want something like this for your business?" />
    </>
  );
}
