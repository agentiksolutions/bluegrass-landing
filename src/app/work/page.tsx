import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import CTABand from "@/components/cta-band";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Case studies from Bluegrass Advisory Group: a Five Guys franchisee in Central Kentucky and The PFSA, a Lexington nonprofit.",
  path: "/work",
});

const cases = [
  {
    href: "/work/restaurant-franchisee",
    photo: photos.storeA,
    title: "A Five Guys franchisee in Central Kentucky",
  },
  {
    href: "/work/pfsa",
    photo: photos.pfsaSite,
    title: "The PFSA, a Lexington nonprofit",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="pt-28 lg:pt-32 pb-16 px-4 md:px-10 min-h-[100svh]">
        <div className="max-w-[1160px] mx-auto">
          <h1 className="font-display text-[36px] lg:text-[48px] leading-tight font-bold tracking-tight text-ink">
            Work
          </h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((c) => (
              <Link key={c.href} href={c.href} className="group block">
                <div className="aspect-[4/3] relative bg-band rounded overflow-hidden">
                  <Image
                    src={c.photo.src}
                    alt={c.photo.alt}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-contain"
                  />
                </div>
                <h2 className="mt-4 font-display text-[22px] font-bold text-ink group-hover:text-blue">
                  {c.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
