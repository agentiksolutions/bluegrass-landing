// Source: https://21st.dev/@ibelick/components/text-scramble (Motion Primitives by Julien
// Thibeaut, MIT). Installed through the 21st.dev registry with shadcn on 2026-09-26.
// Changes for this site: decodes once when the heading scrolls into view instead of on mount;
// the finished text is server-rendered and holds the line box, with the decoding layer laid
// over it, so the heading never changes width and search engines read the real words; spaces
// and punctuation stay put; capital letters only as noise, settling in the heading's own font;
// requestAnimationFrame with an eased left-to-right settle; reduced-motion guard (no decode);
// imports motion/react rather than framer-motion.
"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function TextScramble({
  children,
  as: Tag = "p",
  className,
  duration = 0.9,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const still = useReducedMotion();
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || still) return;
    const text = children;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const settled = Math.floor((1 - Math.pow(1 - t, 3)) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < settled || !/[A-Za-z0-9]/.test(ch) ? ch : NOISE[(Math.random() * NOISE.length) | 0];
      }
      setShown(out);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setShown(null);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, still, children, duration]);

  return (
    <Tag ref={ref} className={cn("relative", className)}>
      <span className={shown === null ? undefined : "opacity-0"}>{children}</span>
      {shown !== null && (
        <span aria-hidden="true" className="absolute inset-0">
          {shown}
        </span>
      )}
    </Tag>
  );
}
