import Link from "next/link";

interface RelatedLink {
  href: string;
  label: string;
  blurb: string;
}

/**
 * Ruled list of links at the foot of the guide pages. Keeps every one of them
 * pointing at two or more existing pages without a second CTA block.
 */
export default function RelatedLinks({
  heading = "Keep reading",
  links,
}: {
  heading?: string;
  links: RelatedLink[];
}) {
  return (
    <section className="px-4 md:px-10 pb-24 md:pb-32">
      <div className="max-w-[1360px] mx-auto border-t border-line pt-14 md:pt-20 grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
        <h2 className="font-display text-[28px] md:text-[36px] leading-[1.05] font-light tracking-tight text-ink">
          {heading}
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-2 md:gap-10 py-6 md:py-7"
              >
                <span className="font-display text-[20px] md:text-[24px] font-light leading-snug text-ink transition-colors group-hover:text-blue">
                  {l.label}
                </span>
                <span className="text-[17px] md:text-[18px] leading-relaxed text-body">{l.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
