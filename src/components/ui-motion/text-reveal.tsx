// Source: https://magicui.design/r/text-reveal.json (Magic UI public shadcn registry)
// Author: Dillion Verma, Magic UI. Listed at https://21st.dev/@dillionverma/components/text-reveal
// License: MIT, Copyright (c) Magic UI. Full text: licenses/magic-ui.txt in this library.
// Changes for this library: no pinned 200vh block; the words light up one by one as the text
// crosses the viewport, so the page keeps its height and nothing shifts. Renders the element
// passed in `as` (default p) with the caller's classes. One readable copy for screen readers,
// the animated layer is aria-hidden. Reduced-motion guard (plain text at full strength).
// text-black and dark: removed so the brand color applies.
"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

export function TextReveal({
  children,
  className,
  as: Tag = "p",
}: {
  children: string
  className?: string
  as?: "p" | "h2" | "span"
}) {
  const ref = useRef<HTMLElement | null>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] })

  const words = children.split(" ")
  return (
    <Tag ref={ref as never} className={cn("relative", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word key={i} still={!!still} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        ))}
      </span>
    </Tag>
  )
}

function Word({ children, still, progress, range }: { children: ReactNode; still: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  )
}
