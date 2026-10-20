import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/mdx";
import CTABand from "@/components/cta-band";
import { FadeUp, Reveal } from "@/components/v2/reveal";
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
      {/* Every post carries a picture (Phil, 2026-09-24). The title opens on a night band and the
          cover rises out of it whole, so its type is never cropped. */}
      <section data-nav="dark" data-nomotion className="night bg-night px-4 pb-40 pt-32 text-night-text md:px-10 md:pb-56 md:pt-40">
        <div className="mx-auto max-w-[1040px]">
          <Link href="/insights" className="mb-10 inline-block font-display text-[14px] text-night-body transition-colors hover:text-night-text">
            &larr; All posts
          </Link>
          <p className="font-display text-[15px] text-night-blue">
            {post.meta.category} · {post.meta.date} · {post.meta.readTime}
          </p>
          <Reveal
            as="h1"
            onLoad
            delay={0.1}
            stagger={0.03}
            text={post.meta.title}
            className="mt-5 max-w-[22ch] font-display text-[36px] font-light leading-[1.05] tracking-[-0.03em] md:text-[60px]"
          />
        </div>
      </section>
      <article className="mx-auto max-w-[1040px] px-4 pb-16 md:px-10">
        <FadeUp onLoad delay={0.3} className="-mt-28 md:-mt-40">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-[6px] border border-line bg-band">
            <Image src={post.meta.cover} alt={post.meta.coverAlt} fill priority sizes="(min-width: 1040px) 960px, 100vw" className="object-cover" />
          </figure>
        </FadeUp>

        <div className="prose prose-lg mx-auto mt-16 max-w-[68ch] lg:prose-xl prose-headings:font-display prose-headings:font-medium prose-headings:tracking-[-0.015em] prose-headings:text-ink prose-p:text-body prose-li:text-body prose-a:text-blue prose-strong:text-ink">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        <div className="mx-auto max-w-[68ch]">
          <InlineArticleCTA />
        </div>
      </article>

      <CTABand
        headline="Want to talk about this?"
        subtext="Book a 30-minute call and bring your questions."
      />
    </>
  );
}
