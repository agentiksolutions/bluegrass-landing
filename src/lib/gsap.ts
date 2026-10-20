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

export { gsap, ScrollTrigger };
