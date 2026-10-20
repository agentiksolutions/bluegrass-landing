"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, motionOff } from "@/lib/gsap";

// Native scrolling (Phil, 2026-10-20: "this website is super slow"). Lenis smoothing was removed:
// it ran every scroll frame on the main thread and made the wheel feel late. Anchor links glide
// with the browser's own smooth scroll, buttons still lean toward the mouse, and every pin is
// re-measured on each new page.

/** Scroll to an element or the top. */
export function scrollToTarget(target: HTMLElement | number) {
  const behavior: ScrollBehavior = motionOff() ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }
  // Night chapters run edge to edge under the header; everything else clears it.
  const offset = target.dataset.nav === "dark" ? 0 : -84;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior });
}

/** Freeze page scrolling while a full-screen menu is open. */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (motionOff()) return;

    // Same-page anchor links glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el);
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onClick);

    // Buttons lean a few pixels toward a mouse pointer and spring back when it leaves.
    let pulled: HTMLElement | null = null;
    const release = () => {
      if (pulled) gsap.to(pulled, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      pulled = null;
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      if (el !== pulled) release();
      if (!el) return;
      pulled = el;
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3, ease: "power3.out" });
    };
    document.addEventListener("pointermove", onPointer);

    return () => {
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // New page: start at the top and re-measure every pin once the new layout settles. The first
  // load skips this: ScrollTrigger re-measures on the window load event by itself, and every
  // refresh lays out the whole page again.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
