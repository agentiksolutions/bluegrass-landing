import Link from "next/link";
import Button from "./button";
import CTABand from "./cta-band";
import JsonLd from "./json-ld";
import PageHero from "./v2/page-hero";

interface RelatedPost {
  href: string;
  title: string;
  category: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  /** Real work or a panel drawn in code (Phil, 2026-10-07: no generated scenes). */
  visual?: React.ReactNode;
  shot?: { src: string; alt: string; width: number; height: number };
  deliverables: string[];
  whoItsFor: string[];
  showroomLink?: { href: string; label: string };
  relatedPosts?: RelatedPost[];
  serviceJsonLd?: Record<string, unknown>;
}

export default function ServicePageTemplate({
  title,
  subtitle,
  visual,
  shot,
  deliverables,
  whoItsFor,
  showroomLink,
  relatedPosts,
  serviceJsonLd,
}: ServicePageProps) {
  return (
    <>
      {serviceJsonLd && <JsonLd data={serviceJsonLd} />}

      <PageHero title={title} intro={subtitle} visual={visual} shot={shot} />

      <section className="px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-page grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <h2 className="font-display text-[36px] font-light leading-none tracking-[-0.03em] text-ink md:text-[56px]">What you get</h2>
          <ul className="grid grid-cols-1 gap-x-12 border-t border-line md:grid-cols-2">
            {deliverables.map((d) => (
              <li key={d} className="border-b border-line py-5 text-[18px] leading-relaxed text-body">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-page grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <h2 className="font-display text-[32px] font-light leading-[1.05] tracking-[-0.03em] text-ink md:text-[48px]">Who this is for</h2>
          <ul className="divide-y divide-line border-y border-line">
            {whoItsFor.map((w) => (
              <li key={w} className="py-6 font-display text-[20px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[26px]">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(showroomLink || (relatedPosts && relatedPosts.length > 0)) && (
        <section className="px-4 py-20 md:px-10 md:py-28">
          <div className="mx-auto flex max-w-page flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h2 className="font-display text-[24px] font-light text-ink md:text-[30px]">Related reading</h2>
                <ul className="mt-6 space-y-4">
                  {relatedPosts.map((post) => (
                    <li key={post.href}>
                      <Link
                        href={post.href}
                        className="font-display text-[18px] text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue md:text-[20px]"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showroomLink && (
              <div className="shrink-0">
                <Button href={showroomLink.href}>{showroomLink.label}</Button>
              </div>
            )}
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
