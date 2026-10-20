import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import RelatedLinks from "@/components/related-links";
import PageHero from "@/components/v2/page-hero";
import FaqList from "@/components/v2/faq-list";

export const metadata: Metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Straight answers on how we work: what the first call covers, what it costs, who owns what we build, and what happens to your team when AI shows up.",
  path: "/faq",
});

// One array feeds both the page and the structured data, so the answer a
// crawler reads is the answer a person reads.
const faqs: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "What does Bluegrass Advisory Group do?",
    a: "We find the work eating your team's hours and build tools that take it off them. That means websites, AI in your daily work, dashboards and operations consulting.",
    link: { href: "/services", label: "See the four services" },
  },
  {
    q: "What happens on the first call?",
    a: "Thirty minutes, no charge, and nothing gets sold. Afterward you get an email with our recommendation.",
  },
  {
    q: "What does it cost?",
    a: "The work comes in phases, and each phase gets a firm price before you commit.",
    link: { href: "/ai-consulting-cost", label: "What drives the cost" },
  },
  {
    q: "Do I need to understand AI before we talk?",
    a: "No. The first conversation is about how your business runs.",
  },
  {
    q: "Is this going to replace my employees?",
    a: "No. It takes the repetitive parts of a job so your people spend their time on what needs judgment.",
  },
  {
    q: "Who owns what you build?",
    a: "You do. The accounts are in your name, there is no license to keep paying, and everything goes with you if you leave.",
  },
  {
    q: "Do you only work with businesses in Lexington?",
    a: "We work in person across Central Kentucky and by screen share elsewhere in Kentucky.",
    link: { href: "/ai-consulting-lexington-ky", label: "Counties we cover in person" },
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://bluegrassadvisorygroup.com/faq#faq",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <PageHero compact title="Questions we get asked" intro="The questions we hear most on intro calls." />

      <section className="px-4 pt-16 md:px-10 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div className="lg:col-start-2">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="If your question is not here."
        links={[
          {
            href: "/contact",
            label: "Ask it directly",
            blurb: "The form goes to Phil. So does the phone number.",
          },
          {
            href: "/about",
            label: "About the practice",
            blurb: "Who you would be working with.",
          },
          {
            href: "/showroom",
            label: "The showroom",
            blurb: "Four tools you can try before you talk to anyone.",
          },
          {
            href: "/insights",
            label: "Insights",
            blurb: "Longer writing on AI, automation, and operations.",
          },
        ]}
      />

      <CTABand />
    </>
  );
}
