"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// The motion template's ease (templates/website-motion): cubic-bezier(0.17, 0.84, 0.44, 1).
export const EASE = "expo.out";
export const REVEAL_S = 1.1;

/** True when the visitor asked for less motion (layout.tsx sets .motion-off before paint). */
export function motionOff() {
  return typeof document === "undefined" || document.documentElement.classList.contains("motion-off");
}

/** Pinned and horizontal sections run only on wide screens; phones and small tablets stack. */
export const WIDE = "(min-width: 821px)";

/**
 * Runs a scroll animation's setup once the main thread is idle instead of during hydration
 * (Phil, 2026-10-20, speed: building every trigger in one commit was a 460 ms task on a phone).
 * Each setup becomes its own short task, in the order the components mounted, so pins still
 * stack top to bottom. Returns the effect cleanup.
 */
export function whenIdle(setup: () => void | (() => void)): () => void {
  let cleanup: void | (() => void);
  let ran = false;
  const run = () => {
    ran = true;
    cleanup = setup();
  };
  const ric = typeof window.requestIdleCallback === "function";
  const id = ric ? window.requestIdleCallback(run, { timeout: 1500 }) : window.setTimeout(run, 30);
  return () => {
    if (!ran) {
      if (ric) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    } else cleanup?.();
  };
}

export { gsap, ScrollTrigger };
