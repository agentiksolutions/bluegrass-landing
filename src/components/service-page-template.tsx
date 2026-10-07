import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import CTABand from "./cta-band";
import JsonLd from "./json-ld";

interface RelatedPost {
  href: string;
  title: string;
  category: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  deliverables: string[];
  whoItsFor: string[];
  showroomLink?: { href: string; label: string };
  relatedPosts?: RelatedPost[];
  serviceJsonLd?: Record<string, unknown>;
}

// Same shape as /services: a scene beside the headline, then plain ruled lists.
export default function ServicePageTemplate({
  title,
  subtitle,
  image,
  deliverables,
  whoItsFor,
  showroomLink,
  relatedPosts,
  serviceJsonLd,
}: ServicePageProps) {
  return (
    <>
      {serviceJsonLd && <JsonLd data={serviceJsonLd} />}

      <section className="relative mt-16 lg:mt-[72px] bg-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:min-h-[max(520px,calc(90svh-72px))]">
          <div className="order-2 lg:order-1 px-4 md:px-10 py-12 lg:py-16 flex flex-col justify-center">
            <h1 className="font-display text-[40px] sm:text-[54px] lg:text-[66px] leading-[1.0] font-extralight tracking-[-0.03em] text-ink max-w-[13ch]">
              {title}
            </h1>
            <p className="mt-7 text-[19px] md:text-[21px] leading-snug text-body max-w-[38ch]">{subtitle}</p>
          </div>
          <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[420px]">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[36px] md:text-[52px] leading-none font-light tracking-tight text-ink">
            What you get
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-line">
            {deliverables.map((d) => (
              <li key={d} className="border-b border-line py-5 text-[18px] leading-relaxed text-body">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <h2 className="font-display text-[32px] md:text-[44px] leading-[1.05] font-light tracking-tight text-ink">
            Who this is for
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {whoItsFor.map((w) => (
              <li key={w} className="py-6 font-display text-[19px] md:text-[23px] font-light leading-snug text-ink">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(showroomLink || (relatedPosts && relatedPosts.length > 0)) && (
        <section className="px-4 md:px-10 py-20 md:py-28">
          <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            {relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h2 className="font-display text-[22px] md:text-[26px] font-light text-ink">Related reading</h2>
                <ul className="mt-6 space-y-4">
                  {relatedPosts.map((post) => (
                    <li key={post.href}>
                      <Link
                        href={post.href}
                        className="font-display text-[18px] md:text-[20px] text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
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
