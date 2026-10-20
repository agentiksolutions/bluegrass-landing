"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, EASE, ScrollTrigger, motionOff, whenIdle } from "@/lib/gsap";

/**
 * Gives the long-form pages the same entrance as the home page without rewriting each one:
 * section headings rise into place and the rows of ruled lists follow in a short stagger, once,
 * as each scrolls in. Anything already on screen, or already animated by its own component
 * (data-reveal, data-fade), is left alone.
 */
export default function PageMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (motionOff() || pathname === "/") return; // the home page has its own motion
    return whenIdle(() => {
      const main = document.getElementById("main");
      if (!main) return;
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.95;
      const owned = (el: Element) => el.closest("[data-reveal],[data-fade],[data-nomotion]");

      const ctx = gsap.context(() => {
        main.querySelectorAll("section h2").forEach((h) => {
          if (owned(h) || !below(h)) return;
          gsap.from(h, { autoAlpha: 0, y: 26, duration: 1, ease: EASE, scrollTrigger: { trigger: h, start: "top 90%", once: true } });
        });
        main.querySelectorAll("section ul, section ol").forEach((list) => {
          if (owned(list) || !below(list) || list.children.length < 2) return;
          gsap.from(list.children, {
            autoAlpha: 0,
            y: 18,
            duration: 0.8,
            stagger: 0.07,
            ease: EASE,
            scrollTrigger: { trigger: list, start: "top 88%", once: true },
          });
        });
      }, main);
      const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => {
        window.clearTimeout(id);
        ctx.revert();
      };
    });
  }, [pathname]);

  return null;
}
