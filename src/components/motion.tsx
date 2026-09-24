"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { MARK } from "@/lib/mark-geometry";

// Every export here checks useReducedMotion. When it is on, the element renders in its
// final state with no transform and no timer: no parallax, no marquee, no stagger.
// ponytail: one file. Splitting five small wrappers across five files buys nothing.

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade and rise once, when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that rises in a word at a time. */
export function RisingWords({
  text,
  className = "",
  delay = 0.15,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const still = useReducedMotion();
  if (still) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        // The clipping span is what makes the word rise out of nothing.
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Full-bleed band whose picture drifts against the scroll and wipes open on entry. */
export function ParallaxBand({
  children,
  className = "",
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
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
    </motion.div>
  );
}

/** A strip of pictures sliding by. Hovering stops it. */
export function Marquee({
  children,
  seconds = 46,
}: {
  children: React.ReactNode;
  seconds?: number;
}) {
  const still = useReducedMotion();
  if (still) {
    return <div className="flex gap-4 overflow-x-auto">{children}</div>;
  }
  return (
    <div className="group relative overflow-hidden">
      <motion.div
        className="flex w-max gap-4 group-hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: seconds, ease: "linear", repeat: Infinity }}
        whileHover={{ transition: { duration: 0 } }}
      >
        {children}
        {/* The same run again, so the wrap at -50% is invisible. */}
        <div aria-hidden="true" className="flex gap-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/** Button that leans toward the pointer. */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const still = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });

  if (still) return <>{children}</>;

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const b = ref.current?.getBoundingClientRect();
        if (!b) return;
        x.set(Math.max(-14, Math.min(14, e.clientX - (b.left + b.width / 2))) * 0.6);
        y.set(Math.max(-10, Math.min(10, e.clientY - (b.top + b.height / 2))) * 0.6);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** The Kentucky mark, drawing its own network when it comes into view. */
export function MarkDraw({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  const show = still ? undefined : "draw";

  return (
    <motion.svg
      viewBox={MARK.viewBox}
      className={className}
      role="img"
      aria-label="The Bluegrass Advisory Group mark: Kentucky in blue with a network of white nodes and a star on Lexington"
      initial={still ? undefined : "rest"}
      whileInView={show}
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      <motion.path
        d={MARK.state}
        fill="#0033A0"
        variants={{ rest: { opacity: 0, scale: 0.96 }, draw: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ transformOrigin: "50% 50%" }}
      />
      <g stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" fill="none">
        {MARK.lines.map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            variants={{ rest: { pathLength: 0 }, draw: { pathLength: 1 } }}
            transition={{ duration: 0.5, delay: 0.5 + (i % 24) * 0.025, ease: "easeOut" }}
          />
        ))}
      </g>
      <g fill="#FFFFFF">
        {MARK.circles.map(([cx, cy, r], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            variants={{ rest: { scale: 0 }, draw: { scale: 1 } }}
            transition={{ duration: 0.4, delay: 0.55 + (i % 24) * 0.025, ease: "backOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </g>
      {MARK.star && (
        <motion.path
          d={MARK.star}
          fill="#FFFFFF"
          variants={{ rest: { scale: 0, opacity: 0 }, draw: { scale: [0, 1.35, 1], opacity: 1 } }}
          transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
          style={{ transformOrigin: "62% 38%" }}
        />
      )}
    </motion.svg>
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
