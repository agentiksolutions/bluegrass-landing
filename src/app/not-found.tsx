import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/button";
import KentuckyLine from "@/components/v2/kentucky-line";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page has moved or no longer exists. Head back to the home page, the showroom, or the contact form.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section data-nav="dark" className="night flex min-h-[100svh] items-center bg-night px-4 pb-20 pt-32 text-night-text md:px-10">
      <div className="mx-auto grid w-full max-w-page grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <h1 className="max-w-[16ch] font-display text-[48px] font-light leading-[0.98] tracking-[-0.035em] sm:text-[68px] lg:text-[84px]">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-6 max-w-[44ch] text-[19px] leading-snug text-night-body md:text-[22px]">
            The link may be old or the page may have moved. Here are a few good places to pick back up.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/services" variant="outline-dark">
              Services
            </Button>
            <Button href="/contact" variant="outline-dark">
              Contact
            </Button>
          </div>
          <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-night-line pt-8 font-display text-[20px] font-light">
            {[
              { href: "/work", label: "Work" },
              { href: "/about", label: "About" },
              { href: "/insights", label: "Blog" },
              { href: "/showroom", label: "Showroom" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline decoration-night-blue/50 underline-offset-4 hover:decoration-night-blue">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <KentuckyLine className="mx-auto max-w-[560px]" />
      </div>
    </section>
  );
}
