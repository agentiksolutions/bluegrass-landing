"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, motionOff } from "@/lib/gsap";
import { MARK } from "@/lib/mark-geometry";

// Pages that are static files outside the app router load normally.
const STATIC = ["/academy", "/prompt-studio"];

/**
 * A night curtain between pages: it rises over the old page with the Lexington star, the router
 * swaps the page underneath, and the curtain lifts off the new one. Links with a modifier key,
 * a target, a download, a hash on the same page, or another origin are left alone.
 */
export default function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page: anchors and reloads stay native
      if (STATIC.some((p) => url.pathname === p || url.pathname.startsWith(p + "/"))) return;
      e.preventDefault();
      pending.current = true;
      gsap.killTweensOf(el);
      gsap
        .timeline()
        .set(el, { display: "grid", clipPath: "inset(100% 0% 0% 0%)" })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" })
        .fromTo(el.querySelector("svg"), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, "-=0.25")
        .call(() => router.push(url.pathname + url.search + url.hash));
      // If the new page never arrives, lift the curtain anyway.
      window.setTimeout(() => pending.current && lift(), 4000);
    };
    const lift = () => {
      pending.current = false;
      gsap
        .timeline()
        .to(el.querySelector("svg"), { autoAlpha: 0, duration: 0.2 })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "power3.inOut" })
        .set(el, { display: "none" });
    };
    (el as HTMLDivElement & { lift?: () => void }).lift = lift;
    // Capture phase: runs before Next's Link handler, which then sees defaultPrevented and stands down.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const el = ref.current as (HTMLDivElement & { lift?: () => void }) | null;
    if (el && pending.current) window.setTimeout(() => el.lift?.(), 80);
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden place-items-center bg-night">
      <svg viewBox="600 135 95 95" className="h-12 w-12">
        <path d={MARK.star} fill="#FFFFFF" />
      </svg>
    </div>
  );
}
