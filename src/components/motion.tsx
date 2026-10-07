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

/** Hero headline: each word comes up out of a blur, once, as the page opens. */
export function BlurWords({ text, delay = 0.35 }: { text: string; delay?: number }) {
  const still = useReducedMotion();
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={still ? false : { opacity: 0, filter: "blur(14px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: delay + i * 0.09 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </>
  );
}

/** Content that fades in once after the hero headline. */
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * One hairline that runs down the left edge of the page below the hero and fills with blue
 * as the visitor scrolls, tying each section to the next. Reduced motion shows it filled.
 */
export function ScrollThread() {
  const still = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end end"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-5 top-0 bottom-0 hidden w-px bg-line md:block"
    >
      <motion.div className="h-full w-full origin-top bg-[#81A7F8]" style={{ scaleY: still ? 1 : scaleY }} />
    </div>
  );
}
