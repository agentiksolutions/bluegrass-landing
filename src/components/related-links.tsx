import Link from "next/link";

interface RelatedLink {
  href: string;
  label: string;
  blurb: string;
}

/**
 * Text link grid used at the foot of the guide pages. Keeps every one of them
 * pointing at two or more existing pages without a second CTA block.
 */
export default function RelatedLinks({
  heading = "Keep reading.",
  links,
}: {
  heading?: string;
  links: RelatedLink[];
}) {
  return (
    <section className="px-6 md:px-12 pb-24 max-w-content mx-auto">
      <h2 className="font-display text-2xl font-bold mb-8">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="group">
            <div className="p-6 bg-white rounded-lg border border-line h-full transition-all group-hover:border-emerald group-hover:-translate-y-0.5">
              <h3 className="font-display text-lg font-bold leading-snug text-graphite group-hover:text-emerald transition-colors">
                {l.label}
              </h3>
              <p className="text-sm leading-relaxed text-stone mt-2">{l.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
