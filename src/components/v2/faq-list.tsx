"use client";

import { useState } from "react";
import Link from "next/link";

type Faq = { q: string; a: string; link?: { href: string; label: string } };

/**
 * Questions that open in place. The pattern follows the 21st.dev "Accordion" by ddoemonn
 * (https://21st.dev/@ddoemonn/components/accordion: one panel open at a time, content height
 * measured automatically, keyboard reachable), rebuilt with a CSS grid-row transition instead of a
 * spring library. Answers stay in the HTML when closed, so crawlers and find-in-page still see them.
 */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-line" data-nomotion>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <h2>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left md:py-8"
              >
                <span
                  className={`max-w-[40ch] font-display text-[21px] font-medium leading-snug tracking-[-0.01em] transition-colors md:text-[25px] ${
                    isOpen ? "text-blue" : "text-ink group-hover:text-blue"
                  }`}
                >
                  {f.q}
                </span>
                <span aria-hidden="true" className="relative mt-2 h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-ink" />
                  <span
                    className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-300 ease-out ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h2>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className={`pb-8 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                  <p className="max-w-[64ch] text-[18px] leading-relaxed text-body">{f.a}</p>
                  {f.link && (
                    <Link
                      href={f.link.href}
                      tabIndex={isOpen ? 0 : -1}
                      className="mt-5 inline-block font-display text-[15px] font-semibold text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue"
                    >
                      {f.link.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
