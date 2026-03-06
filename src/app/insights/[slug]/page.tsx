import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/mdx";
import SectionLabel from "@/components/section-label";
import CTABand from "@/components/cta-band";
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
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/insights/${params.slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
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
      <article className="pt-[148px] pb-16 px-6 md:px-12 max-w-[720px] mx-auto">
        <Link
          href="/insights"
          className="text-[13px] text-stone hover:text-emerald transition-colors mb-8 inline-block"
        >
          &larr; Back to Insights
        </Link>

        <SectionLabel>{post.meta.category}</SectionLabel>
        <h1 className="font-display text-[clamp(32px,4.5vw,46px)] leading-[1.15] font-bold tracking-tight mb-4">
          {post.meta.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-stone mb-12">
          <span>{post.meta.date}</span>
          <span>&middot;</span>
          <span>{post.meta.readTime}</span>
        </div>

        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-emerald prose-a:no-underline hover:prose-a:underline prose-strong:text-graphite">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>

      <CTABand
        headline="Want to talk about this?"
        subtext="If anything in this article resonated, let's have a conversation. 30 minutes, no pitch."
      />
    </>
  );
}
