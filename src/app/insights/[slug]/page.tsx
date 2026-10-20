import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/mdx";
import CTABand from "@/components/cta-band";
import InlineArticleCTA from "@/components/inline-article-cta";
import JsonLd from "@/components/json-ld";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.meta.title,
    description: post.meta.description,
    path: `/insights/${params.slug}`,
    article: { publishedTime: post.meta.date },
    image: { url: post.meta.cover, alt: post.meta.coverAlt },
  });
}

export default function InsightPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    image: [`https://bluegrassadvisorygroup.com${post.meta.cover}`],
    author: {
      "@type": "Person",
      name: "Phil Fifield",
    },
    publisher: {
      "@type": "Organization",
      name: "Bluegrass Advisory Group",
      url: "https://bluegrassadvisorygroup.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bluegrassadvisorygroup.com/insights/${params.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {/* Every post carries a picture (Phil, 2026-09-24). Wider column (Phil, 2026-10-07: "needs
          to be wider"); the cover sits whole above the title so its type is never cropped. */}
      <article className="mt-16 lg:mt-[72px] pt-10 md:pt-14 pb-16 px-4 md:px-10 max-w-[1040px] mx-auto">
        <Link
          href="/insights"
          className="font-display text-[14px] text-muted hover:text-blue transition-colors mb-8 inline-block"
        >
          &larr; Back to Insights
        </Link>
        <figure className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line">
          <Image
            src={post.meta.cover}
            alt={post.meta.coverAlt}
            fill
            priority
            sizes="(min-width: 1040px) 960px, 100vw"
            className="object-cover"
          />
        </figure>

        <p className="mt-10 font-display text-[15px] text-muted">
          {post.meta.category} · {post.meta.date} · {post.meta.readTime}
        </p>
        <h1 className="mt-4 mb-12 font-display text-[36px] md:text-[56px] leading-[1.05] font-extralight tracking-[-0.02em] text-ink">
          {post.meta.title}
        </h1>

        <div className="prose prose-stone prose-invert prose-lg lg:prose-xl max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-emerald prose-a:no-underline hover:prose-a:underline prose-strong:text-graphite">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <InlineArticleCTA />
      </article>

      <CTABand
        headline="Want to talk about this?"
        subtext="Book a 30-minute call and bring your questions."
      />
    </>
  );
}
