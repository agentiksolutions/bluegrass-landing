import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pt-[148px] pb-32 px-6 md:px-12 max-w-content mx-auto text-center">
      <div className="text-[13px] font-semibold tracking-[2px] text-emerald uppercase mb-4">
        404
      </div>
      <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-5">
        We couldn&apos;t find that page.
      </h1>
      <p className="text-[17px] leading-relaxed text-stone max-w-[460px] mx-auto mb-10">
        The link may be old or the page may have moved. Here are a few good
        places to pick back up.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-14">
        <Button href="/">Back to Home</Button>
        <Button href="/showroom" variant="secondary">
          Explore the Showroom
        </Button>
        <Button href="/contact" variant="secondary">
          Get in Touch
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-stone">
        <Link href="/services" className="hover:text-emerald transition-colors">
          Services
        </Link>
        <Link href="/about" className="hover:text-emerald transition-colors">
          About
        </Link>
        <Link href="/insights" className="hover:text-emerald transition-colors">
          Insights
        </Link>
      </div>
    </section>
  );
}
