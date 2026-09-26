// Source: https://21st.dev/@ibelick/components/scroll-progress (Motion Primitives by Julien
// Thibeaut, MIT). Installed through the 21st.dev registry with shadcn on 2026-09-26.
// Changes for this site: imports motion/react rather than framer-motion; no container option
// (it tracks the page); reduced-motion guard (the bar follows the scroll with no spring).
"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export function ScrollProgress({ className }: { className?: string }) {
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sprung = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className={cn("inset-x-0 top-0 h-1 origin-left", className)}
      style={{ scaleX: still ? scrollYProgress : sprung }}
    />
  );
}
