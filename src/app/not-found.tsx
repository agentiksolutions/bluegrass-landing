import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page has moved or no longer exists. Head back to the home page, the showroom, or the contact form.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mt-16 lg:mt-[72px] px-4 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-[1360px] mx-auto">
        <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[88px] leading-[0.95] font-extralight tracking-[-0.03em] text-ink max-w-[16ch]">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-6 text-[19px] md:text-[22px] leading-snug text-body max-w-[44ch]">
          The link may be old or the page may have moved. Here are a few good
          places to pick back up.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/showroom" variant="secondary">
            Explore the Showroom
          </Button>
          <Button href="/contact" variant="secondary">
            Get in Touch
          </Button>
        </div>

        <ul className="mt-16 border-t border-line pt-8 flex flex-wrap gap-x-10 gap-y-3">
          <li>
            <Link href="/services" className="font-display text-[20px] md:text-[24px] font-light text-blue underline underline-offset-4 decoration-blue/30 hover:decoration-blue">
              Services
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-display text-[20px] md:text-[24px] font-light text-blue underline underline-offset-4 decoration-blue/30 hover:decoration-blue">
              About
            </Link>
          </li>
          <li>
            <Link href="/insights" className="font-display text-[20px] md:text-[24px] font-light text-blue underline underline-offset-4 decoration-blue/30 hover:decoration-blue">
              Insights
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
