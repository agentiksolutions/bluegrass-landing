"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "@/components/button";
import KentuckyFlow from "./kentucky-flow";
import { FadeUp, Reveal } from "./reveal";
import { gsap, ScrollTrigger, motionOff } from "@/lib/gsap";
import type { Ky3D } from "@/lib/ky-3d";
import { BOOKING_URL } from "@/lib/site";

const DESKTOP_3D = "(min-width: 1024px)";

/** Desktops with WebGL get the 3D slab; phones, tablets and reduced motion keep the 2D light. */
function can3D() {
  if (motionOff() || !window.matchMedia(DESKTOP_3D).matches) return false;
  if ((navigator.hardwareConcurrency || 4) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const kyRef = useRef<Ky3D | null>(null);
  const [mode, setMode] = useState<"2d" | "3d">("2d");

  // Load three.js only when this device will use it.
  useEffect(() => {
    if (!can3D()) return;
    let cancelled = false;
    let timer = 0;
    let wait = 0;
    const start = () => import("@/lib/ky-3d").then(({ mountKentucky3D }) => {
      if (cancelled || !stageRef.current) return;
      // If this machine cannot keep the scene smooth, go back to the 2D light for good.
      kyRef.current = mountKentucky3D(stageRef.current, () => {
        window.clearTimeout(timer);
        setMode("2d");
        window.setTimeout(() => {
          kyRef.current?.dispose();
          kyRef.current = null;
        }, 50);
      });
      // Keep the 2D light until the 3D canvas has faded in over it.
      timer = window.setTimeout(() => setMode("3d"), 1300);
    });
    // three.js loads only once the page has finished loading and the main thread has gone quiet,
    // so it never competes with the first paint; the 2D light holds the hero until then.
    const later = () => {
      wait = window.setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(() => void start(), { timeout: 2000 });
        else void start();
      }, 400);
    };
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", later);
      window.clearTimeout(wait);
      window.clearTimeout(timer);
      kyRef.current?.dispose();
      kyRef.current = null;
    };
  }, []);

  // In 3D the hero holds for one screen: the words fade down first, then the camera flies to
  // Lexington; the pointer tilts the view.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || mode !== "3d") return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            pin: true,
            scrub: 0.6,
            // The camera waits until the words have gone, so the slab never passes behind them.
            onUpdate: (s) => kyRef.current?.setProgress(Math.max(0, (s.progress - 0.22) / 0.78)),
          },
        })
        .to(el.querySelector("[data-hero-words]"), { yPercent: 18, autoAlpha: 0, ease: "power1.in", duration: 0.12 }, 0)
        .to({}, { duration: 0.88 }, 0.12)
        .to({}, { duration: 0.05 });
    }, el);
    // This pin is created after the 3D scene loads, later than the pins below it, so every
    // trigger on the page is re-sorted and re-measured with the hero's extra screen counted.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const onMove = (e: PointerEvent) => kyRef.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [mode]);

  return (
    <section ref={ref} data-nav="dark" data-nomotion className="night relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-night-text">
      <div ref={stageRef} className="absolute inset-0" aria-hidden="true">
        {mode === "2d" && <KentuckyFlow />}
      </div>
      <div className="pointer-events-none relative mx-auto flex h-full max-w-page-pad flex-col justify-end px-4 pb-14 md:px-10 md:pb-20">
        <div data-hero-words>
          <div data-quiet className="w-fit max-w-full">
            <Reveal
              as="h1"
              onLoad
              delay={0.1}
              text={"AI help for Central\nKentucky businesses."}
              className="font-display text-[46px] font-medium leading-[0.98] tracking-[-0.04em] sm:text-[68px] lg:text-[104px]"
            />
          </div>
          {/* The line paints with the first frame (it is the largest text, so it sets LCP); only the
              button fades in. */}
          <div className="pointer-events-auto mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="min-h-[2.5em] max-w-[30ch] text-[19px] leading-snug text-night-body md:text-[22px]">
              We train your team, build your tools and keep them running.
            </p>
            <FadeUp onLoad delay={0.6}>
              <Button href={BOOKING_URL}>Book a free call</Button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
