"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, motionOff, whenIdle } from "@/lib/gsap";
import { OUTLINE, STAR } from "@/lib/kentucky-web";
import { COUNTY_ARCS } from "@/lib/ky-counties";
import { MARK } from "@/lib/mark-geometry";

const OUTLINE_D = "M" + OUTLINE.map((p) => p.join(" ")).join("L") + "Z";
const COUNTIES_D = COUNTY_ARCS.map((a) => "M" + a.join(" ")).join("");

/** Kentucky traced in one line, the county lines fading in after it, the star landing last. */
export default function KentuckyLine({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    return whenIdle(() => {
      const ctx = gsap.context(() => {
        const outline = el.querySelector<SVGPathElement>("[data-outline]")!;
        const len = outline.getTotalLength();
        gsap
          .timeline({ delay: 0.4 })
          .fromTo(outline, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" })
          .fromTo(el.querySelector("[data-counties]"), { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=0.8")
          .fromTo(
            el.querySelector("[data-star]"),
            { scale: 0, rotate: -72 },
            { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)", transformOrigin: `${STAR[0]}px ${STAR[1]}px` },
            "-=0.6",
          );
      }, el);
      return () => ctx.revert();
    });
  }, []);

  return (
    <svg ref={ref} viewBox={MARK.viewBox} className={`h-auto w-full ${className}`} aria-hidden="true">
      <path data-counties d={COUNTIES_D} fill="none" stroke="#F2F1EC" strokeOpacity="0.14" strokeWidth="1" />
      <path data-outline d={OUTLINE_D} fill="none" stroke="#9DB2E8" strokeWidth="1.6" strokeLinejoin="round" />
      <path data-star d={MARK.star} fill="#FFFFFF" />
    </svg>
  );
}
