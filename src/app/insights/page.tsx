import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui-motion/blur-fade";
import SectionLabel from "@/components/section-label";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = pageMeta({
  title: "Insights",
  description:
    "Practical articles on AI integration, business automation, and operations consulting. Written by practitioners running real systems in Kentucky.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-[148px] pb-24 px-6 md:px-12 max-w-content mx-auto">
      <SectionLabel>Insights</SectionLabel>
      <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
        From the blog.
      </h1>
      <p className="text-[17px] leading-relaxed text-stone max-w-[520px] mb-16">
        Practical takes on AI, operations, and building a business that doesn&apos;t
        depend on you being in the building.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <BlurFade key={post.slug} inView delay={i * 0.08} direction="up" offset={12}>
           <Link href={`/insights/${post.slug}`} className="group block h-full">
            <article className="bg-white rounded-lg overflow-hidden border border-line h-full transition-all duration-[250ms] group-hover:border-emerald group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  width={1280}
                  height={720}
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-8">
              <span className="text-[10px] font-bold tracking-[1.5px] text-emerald uppercase">
                {post.category}
              </span>
              <h2 className="font-display text-lg font-bold leading-snug my-3 text-graphite">
                {post.title}
              </h2>
              <p className="text-sm text-stone leading-relaxed mb-4">
                {post.description}
              </p>
              <span className="text-xs text-stone">{post.readTime}</span>
              </div>
            </article>
           </Link>
          </BlurFade>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-stone text-center py-20">
          Articles coming soon.
        </p>
      )}
    </section>
  );
}
