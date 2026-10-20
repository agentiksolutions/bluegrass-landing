"use client";

import { createElement, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, REVEAL_S, motionOff } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

/**
 * A headline whose words rise out of their own masks. The words are plain text in the server
 * HTML, so crawlers, screen readers and visitors without JavaScript read it as written.
 * A "\n" in the text forces a line break.
 */
export function Reveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  onLoad = false,
  stagger = 0.06,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  /** Play when the page loads (the first screen) instead of when it scrolls into view. */
  onLoad?: boolean;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    // First-screen headlines rise with a CSS animation from the first paint (see globals.css), so
    // they never wait for the page script to load.
    if (!el || motionOff() || onLoad) return;
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".rv-w > span");
      gsap.fromTo(
        words,
        { y: 0, yPercent: 110 },
        {
          y: 0,
          yPercent: 0,
          duration: REVEAL_S,
          ease: EASE,
          stagger,
          delay,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, onLoad, stagger]);

  const lines = text.split("\n");
  let n = 0;
  return createElement(
    as,
    onLoad
      ? { ref, className, "data-reveal-load": "", style: { "--d": `${delay}s`, "--s": `${stagger}s` } as React.CSSProperties }
      : { ref, className, "data-reveal": "" },
    lines.map((line, li) => (
      <span key={li} className="block">
        {line.split(" ").map((w, i, arr) => (
          <span key={i}>
            <span className="rv-w">
              <span style={onLoad ? ({ "--i": n++ } as React.CSSProperties) : undefined}>{w}</span>
            </span>
            {i < arr.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    )),
  );
}

/** A block that rises and fades in once when it scrolls into view. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  as = "div",
  onLoad = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  /** First screen: a CSS fade from the first paint instead of waiting for the script. */
  onLoad?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionOff() || onLoad) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: REVEAL_S, ease: EASE, delay, scrollTrigger: { trigger: el, start: "top 90%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, onLoad]);

  return createElement(
    as,
    onLoad ? { ref, className, "data-fade-load": "", style: { "--d": `${delay}s` } as React.CSSProperties } : { ref, className, "data-fade": "" },
    children,
  );
}

/** Re-measure pins once fonts and images have settled. */
export function useRefreshOnLoad() {
  useLayoutEffect(() => {
    const done = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") return;
    window.addEventListener("load", done, { once: true });
    return () => window.removeEventListener("load", done);
  }, []);
}
