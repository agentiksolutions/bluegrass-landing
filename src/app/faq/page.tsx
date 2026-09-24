import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import SectionLabel from "@/components/section-label";
import CTABand from "@/components/cta-band";
import JsonLd from "@/components/json-ld";
import RelatedLinks from "@/components/related-links";

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
    q: "What does Bluegrass Advisory Group actually do?",
    a: "We learn how your business runs, find the work that is eating hours, and build the tools that take it off your team. In practice that comes out as four things: websites, AI integrated into the work you already do, dashboards that pull your numbers into one place, and operations consulting when the process is the real problem.",
    link: { href: "/services", label: "See the four services" },
  },
  {
    q: "Do you only work with businesses in Lexington?",
    a: "We are based in Lexington and most engagements are in Central Kentucky, close enough to spend a half day in your building. We work with businesses elsewhere in Kentucky over screen share, and the work is the same apart from the site visit.",
    link: { href: "/ai-consulting-lexington-ky", label: "Counties we cover in person" },
  },
  {
    q: "What happens on the first call?",
    a: "Thirty minutes, no charge. We ask which parts of the business are in play, how many tools your team touches in a day, and who else has to agree before anything happens. Nothing gets sold on the call. Within a day you get an email with a recommendation and the reasoning behind it.",
  },
  {
    q: "What does it cost?",
    a: "There is no price list on this site, because a number quoted before anyone understands the scope has to be padded to be safe. The work breaks into phases and each phase gets a firm price before you commit to it. Six things account for most of the difference between one quote and another.",
    link: { href: "/ai-consulting-cost", label: "What drives the cost" },
  },
  {
    q: "Do I need to understand AI before we talk?",
    a: "No. Most of the people we work with have tried a chatbot once and stopped there. The first conversation is about how your business runs. Models and tools come later. Explaining the technology is our job, and if we cannot explain it in plain language then we do not understand it well enough to build it for you.",
  },
  {
    q: "Is this going to replace my employees?",
    a: "No, and we would tell you if we thought otherwise. The work we build takes the repetitive parts of a job away from the people doing it so they spend their time on the parts that need judgment. Every system we build assumes a person approves anything consequential before it goes out.",
  },
  {
    q: "Who owns what you build?",
    a: "You do. The documentation is plain text you can read and edit, the accounts are in your name, and there is no license to keep paying us for. If you decide to bring the work in house or hand it to another firm, everything goes with you. We are also not tied to a single AI vendor, and we will say so when a different model fits your case better.",
  },
  {
    q: "What happens if something breaks after you hand it over?",
    a: "Anything we build is designed to say when it has failed rather than quietly stopping, because the expensive version of a broken automation is the one nobody notices for three months. Where you want ongoing coverage, that is an arrangement we set up deliberately rather than something you drift into.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A questionnaire filled in, whatever documents you already have, and a couple of hours of interview time. On system access we ask your administrator to issue us a named read-only account rather than asking you to send a password, so access is yours to revoke the day the work ends.",
  },
  {
    q: "How long does it take?",
    a: "An assessment runs about a week when the scope is one department or one decision, and four to six weeks when it covers several entities with different people running each one. A first working build is usually a couple of weeks from signing. Anything longer than that gets broken into phases so you see something running early.",
    link: { href: "/ai-assessment", label: "The assessment, step by step" },
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

      <section className="pt-[148px] pb-8 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>Questions</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-4">
          Questions we get asked.
        </h1>
        <p className="text-lg leading-relaxed text-charcoal max-w-[620px] mb-16">
          These are the ten that come up on almost every intro call, answered the
          way we answer them on the phone.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-20 max-w-content mx-auto">
        <div className="flex flex-col">
          {faqs.map((f) => (
            <div key={f.q} className="py-8 border-t border-line">
              <h2 className="font-display text-xl font-bold mb-3 max-w-[680px]">
                {f.q}
              </h2>
              <p className="text-[15px] leading-relaxed text-charcoal max-w-[680px]">
                {f.a}
              </p>
              {f.link && (
                <Link
                  href={f.link.href}
                  className="inline-block mt-4 text-[13px] font-semibold text-emerald hover:underline"
                >
                  {f.link.label} &rarr;
                </Link>
              )}
            </div>
          ))}
          <div className="border-t border-line" />
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
            blurb: "Who you would actually be working with, and where we came from.",
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
