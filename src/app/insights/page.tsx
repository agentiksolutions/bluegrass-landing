import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = pageMeta({
  title: "Insights",
  description:
    "Articles on AI and running a business, written from the systems we run in our own operations in Kentucky.",
  path: "/insights",
});

export default function InsightsPage() {
  const [first, ...rest] = getAllPosts();

  return (
    <>
      <section className="mt-16 lg:mt-[72px] px-4 md:px-10 pt-16 md:pt-24 pb-14">
        <div className="max-w-[1360px] mx-auto">
          <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[88px] leading-[0.95] font-extralight tracking-[-0.03em] text-ink">
            Insights
          </h1>
          <p className="mt-6 text-[19px] md:text-[22px] leading-snug text-body max-w-[44ch]">
            What we learn running AI in our own businesses, written for owners.
          </p>
        </div>
      </section>

      {first && (
        <section className="px-4 md:px-10 pb-16 md:pb-24">
          <Link
            href={`/insights/${first.slug}`}
            className="group max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-14 items-center"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded">
              <Image
                src={first.cover}
                alt={first.coverAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <p className="font-display text-[15px] text-muted">
                {first.category} · {first.readTime}
              </p>
              <h2 className="mt-4 font-display text-[30px] md:text-[42px] leading-[1.08] font-light tracking-tight text-ink transition-colors group-hover:text-blue">
                {first.title}
              </h2>
              <p className="mt-5 text-[18px] leading-relaxed text-body">{first.description}</p>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="px-4 md:px-10 pb-24 md:pb-32">
          <ul className="max-w-[1360px] mx-auto border-t border-line">
            {rest.map((post) => (
              <li key={post.slug} className="border-b border-line">
                <Link
                  href={`/insights/${post.slug}`}
                  className="group grid grid-cols-[minmax(0,2fr)_minmax(0,5fr)] md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] gap-5 md:gap-10 py-8 items-center"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt}
                      fill
                      sizes="(min-width: 768px) 25vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div>
                    <p className="font-display text-[14px] text-muted">
                      {post.category} · {post.readTime}
                    </p>
                    <h2 className="mt-2 font-display text-[20px] md:text-[28px] leading-snug font-light text-ink transition-colors group-hover:text-blue">
                      {post.title}
                    </h2>
                    <p className="mt-2 hidden md:block text-[17px] leading-relaxed text-body max-w-[70ch]">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!first && <p className="px-4 md:px-10 pb-24 text-muted">Articles coming soon.</p>}
    </>
  );
}
