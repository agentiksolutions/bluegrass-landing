import Image from "next/image";
import { FadeUp, Reveal } from "./reveal";
import KentuckyLine from "./kentucky-line";
import { Drift } from "./scroll-sections";

type Shot = { src: string; alt: string; width: number; height: number };

/**
 * The night opening band for every inner page: headline words rise on load, the intro and the
 * visual follow. The visual is real work (a screenshot) or a panel drawn in code; with neither,
 * Kentucky draws itself in a single line with the star at Lexington.
 */
export default function PageHero({
  title,
  intro,
  label,
  shot,
  visual,
  actions,
  compact = false,
}: {
  title: string;
  intro?: React.ReactNode;
  label?: string;
  shot?: Shot;
  visual?: React.ReactNode;
  actions?: React.ReactNode;
  /** A shorter band for text pages (privacy, the blog list). */
  compact?: boolean;
}) {
  const art = visual ?? (shot ? null : <KentuckyLine />);
  return (
    <section data-nav="dark" data-nomotion className="night relative overflow-hidden bg-night text-night-text">
      <div
        className={`mx-auto grid max-w-page-pad grid-cols-1 items-center gap-12 px-4 pb-16 pt-32 md:px-10 lg:gap-16 ${
          compact ? "lg:pb-20 lg:pt-40" : "lg:min-h-[88svh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pb-24 lg:pt-36"
        }`}
      >
        <div>
          {label && <p className="mb-5 font-display text-[15px] font-semibold text-night-blue">{label}</p>}
          <Reveal
            as="h1"
            onLoad
            delay={0.15}
            text={title}
            className={`font-display font-light leading-[1.0] tracking-[-0.035em] ${
              compact ? "max-w-[18ch] text-[44px] md:text-[72px]" : "max-w-[14ch] text-[42px] sm:text-[56px] lg:text-[72px]"
            }`}
          />
          {intro && (
            <FadeUp onLoad delay={0.55} className="mt-7 max-w-[40ch] text-[19px] leading-snug text-night-body md:text-[21px]">
              {intro}
            </FadeUp>
          )}
          {actions && (
            <FadeUp onLoad delay={0.7} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              {actions}
            </FadeUp>
          )}
        </div>
        {!compact && (shot || art) && (
          <Drift amount={-90} className="min-w-0">
          <FadeUp onLoad delay={0.45}>
            {shot ? (
              <div className="overflow-hidden rounded-[6px] border border-night-line bg-white">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              art
            )}
          </FadeUp>
          </Drift>
        )}
      </div>
    </section>
  );
}
