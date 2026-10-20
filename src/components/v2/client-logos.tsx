"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, EASE, motionOff } from "@/lib/gsap";

// STAGING ONLY. Pending permission before live: Five Guys trademark use (no endorsement implied),
// Tyler Barton/BRG, Greer, Activate, StoneCreek, Proliferation, United Property Holdings. Phil asked for this section on
// 2026-10-20; it overrides the "no client names" rule on the site-v2 staging branch only.
//
// Who is listed, and why (verified 2026-10-20 against the BAG CRM, signed contracts and paid
// invoices): Greer Companies, Activate, StoneCreek Management, Proliferation Marketing and United
// Property Holdings are paying clients. Five Guys is the franchise Phil runs operations for, where
// the manager portal was built; The PFSA is the nonprofit whose systems he built as president.
// Logos come from each company's own site (PFSA: its own site's source files), shown in one
// limestone monochrome treatment. StoneCreek and United Property Holdings publish no logo, so
// their names are set in type rather than drawn.
const CLIENTS: { name: string; logo?: string; h?: string }[] = [
  { name: "Five Guys", logo: "/images/clients/five-guys.svg", h: "h-16 md:h-20" },
  { name: "Greer Companies", logo: "/images/clients/greer-companies.png", h: "h-12 md:h-14" },
  { name: "Activate", logo: "/images/clients/activate.svg", h: "h-4 md:h-5" },
  { name: "The PFSA", logo: "/images/clients/pfsa.png", h: "h-20 md:h-24" },
  { name: "Proliferation Marketing", logo: "/images/clients/proliferation-script.png", h: "h-10 md:h-12" },
  { name: "StoneCreek Management" },
  { name: "United Property Holdings" },
];

export default function ClientLogos() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-logo]"),
        { autoAlpha: 0, yPercent: 60, rotationX: -50 },
        {
          autoAlpha: 1,
          yPercent: 0,
          rotationX: 0,
          duration: 1.1,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} data-nav="dark" data-nomotion className="night bg-night px-4 py-24 text-night-text md:px-10 md:py-32">
      <div className="mx-auto max-w-page">
        <h2 className="font-display text-[34px] font-light leading-none tracking-[-0.03em] md:text-[56px]">Who we&apos;ve worked with</h2>
        <ul data-imagery className="mt-14 flex flex-wrap justify-center gap-y-12 [perspective:800px]">
          {CLIENTS.map((c) => (
            <li key={c.name} data-logo className="flex h-28 w-1/2 items-center justify-center border-t border-night-line px-4 pt-6 sm:w-1/3 lg:w-1/4">
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logo} alt={c.name} className={`${c.h} w-auto max-w-full object-contain opacity-85 transition-opacity duration-300 hover:opacity-100`} />
              ) : (
                <span className="text-center font-display text-[19px] font-medium leading-tight tracking-[-0.01em] text-night-text opacity-85 md:text-[22px]">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p data-smallprint className="mt-12 max-w-[70ch] font-display text-[13px] leading-relaxed text-night-body">
          Logos belong to their owners and imply no endorsement of Bluegrass Advisory Group. Five Guys: Phil runs
          operations for a Five Guys franchisee in Central Kentucky.
        </p>
      </div>
    </section>
  );
}
