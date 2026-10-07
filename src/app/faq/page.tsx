import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
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
    q: "What does Bluegrass Advisory Group do?",
    a: "We learn how your business runs, find the work that is eating hours, and build the tools that take it off your team. In practice that comes out as four things: websites, AI integrated into the work you already do, dashboards that pull your numbers into one place, and operations consulting when the process is the real problem.",
    link: { href: "/services", label: "See the four services" },
  },
  {
    q: "Do you only work with businesses in Lexington?",
    a: "We are based in Lexington and work in person across Central Kentucky. We work with businesses elsewhere in Kentucky over screen share, and the work is the same apart from the site visit.",
    link: { href: "/ai-consulting-lexington-ky", label: "Counties we cover in person" },
  },
  {
    q: "What happens on the first call?",
    a: "Thirty minutes, no charge. We ask which parts of the business are in play, how many tools your team touches in a day, and who else has to agree before anything happens. Nothing gets sold on the call. After the call you get an email with a recommendation and the reasoning behind it.",
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
    a: "Anything we build is designed to say when it has failed rather than quietly stopping, because the expensive version of a broken automation is the one nobody notices for months. Where you want ongoing coverage, that is an arrangement we set up deliberately rather than something you drift into.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A questionnaire filled in, whatever documents you already have, and some interview time. On system access we ask your administrator to issue us a named read-only account rather than asking you to send a password, so access is yours to revoke the day the work ends.",
  },
  {
    q: "How long does it take?",
    a: "Timing is agreed with you for each project, and it depends on how much of the business is in scope. Larger work gets broken into phases so you see something running early.",
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

      <section className="mt-16 lg:mt-[72px] px-4 md:px-10 pt-16 md:pt-24 pb-14">
        <div className="max-w-[1360px] mx-auto">
          <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[88px] leading-[0.95] font-extralight tracking-[-0.03em] text-ink">
            Questions we get asked
          </h1>
          <p className="mt-6 text-[19px] md:text-[22px] leading-snug text-body max-w-[44ch]">
            Ten questions from intro calls, answered the way we answer them on
            the phone.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-20">
          <div className="lg:col-start-2 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-8 md:py-10">
                <h2 className="font-display text-[22px] md:text-[26px] font-light leading-snug text-ink max-w-[40ch]">
                  {f.q}
                </h2>
                <p className="mt-4 text-[18px] leading-relaxed text-body max-w-[64ch]">
                  {f.a}
                </p>
                {f.link && (
                  <Link
                    href={f.link.href}
                    className="inline-block mt-5 font-display text-[15px] text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
                  >
                    {f.link.label} &rarr;
                  </Link>
                )}
              </div>
            ))}
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
