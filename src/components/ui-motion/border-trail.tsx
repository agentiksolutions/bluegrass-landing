// Source: https://21st.dev/@ibelick/components/border-trail (Motion Primitives by Julien
// Thibeaut, MIT). Installed through the 21st.dev registry with shadcn on 2026-09-26.
// Changes for this site: imports motion/react rather than framer-motion; the placeholder
// zinc color and dark-mode classes are gone so the caller sets the color; a `run` prop
// starts and stops the trace (the site runs it on hover); reduced-motion guard (no trace).
"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export function BorderTrail({
  className,
  size = 60,
  run = true,
  transition = { repeat: Infinity, duration: 5, ease: "linear" },
}: {
  className?: string;
  size?: number;
  run?: boolean;
  transition?: Transition;
}) {
  const still = useReducedMotion();
  if (still || !run) return null;

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)` }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={transition}
      />
    </div>
  );
}
