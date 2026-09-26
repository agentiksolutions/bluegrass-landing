"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// What is left after round 5: the two pieces the ui-motion library does not cover.
// ParallaxBand stays because the library's version renders its own <img>, which would drop
// next/image on a page built out of photographs. KenBurns has no library equivalent.
// Both check useReducedMotion and render at rest when it is on.

const EASE = [0.16, 1, 0.3, 1] as const;

/** Full-bleed band whose picture drifts against the scroll and wipes open on entry. */
export function ParallaxBand({
  children,
  className = "",
  distance = 60,
  frame,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  /** Drawn on the band's own edge, outside the drifting picture. */
  frame?: React.ReactNode;
}) {
  const still = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={still ? false : { clipPath: "inset(14% 0% 14% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {/* Oversized so the drift never exposes an edge. */}
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={still ? undefined : { y }}>
        {children}
      </motion.div>
      {frame}
    </motion.div>
  );
}

/** Hero: a very slow push on the still behind the video, and on the video itself. */
export function KenBurns({ children }: { children: React.ReactNode }) {
  const still = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0"
      initial={still ? false : { scale: 1.12 }}
      animate={{ scale: 1 }}
      transition={{ duration: 18, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

/** A blue light that runs along a divider rule once, left to right, when it scrolls into view. */
export function TraceRule({ delay = 0 }: { delay?: number }) {
  const still = useReducedMotion();
  if (still) return null;
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left bg-blue"
      initial={{ scaleX: 0, opacity: 1 }}
      whileInView={{ scaleX: 1, opacity: [1, 1, 0] }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        scaleX: { duration: 1.1, ease: EASE, delay },
        opacity: { duration: 2.2, times: [0, 0.6, 1], ease: "easeOut", delay },
      }}
    />
  );
}
