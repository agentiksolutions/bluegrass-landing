"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, motionOff } from "@/lib/gsap";

let lenis: Lenis | null = null;

/** Scroll to an element or the top, through Lenis when it runs. */
export function scrollToTarget(target: HTMLElement | number) {
  // Night chapters run edge to edge under the header; everything else clears it.
  const offset = typeof target !== "number" && target.dataset.nav === "dark" ? 0 : -84;
  if (lenis) lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : offset });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

/** Freeze page scrolling while a full-screen menu is open. */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/**
 * One Lenis instance for the whole site, driven by the GSAP ticker so ScrollTrigger pins stay in
 * step with the smoothed scroll. Off under reduced motion. Touch scrolling stays native.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (motionOff()) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

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
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page: start at the top and re-measure every pin once the new layout settles.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
