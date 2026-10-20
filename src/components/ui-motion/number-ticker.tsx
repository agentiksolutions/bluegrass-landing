// Source: https://magicui.design/r/number-ticker.json (Magic UI public shadcn registry)
// Author: Dillion Verma, Magic UI. Listed at https://21st.dev/@dillionverma/components/number-ticker
// License: MIT, Copyright (c) Magic UI. Full text: licenses/magic-ui.txt in this library.
// Changes for this library: the server HTML carries the final value (no-JS visitors and crawlers
// never see 0); reduced-motion guard (stays on the final value); tabular-nums, tracking-wider,
// text-black and dark: removed so the brand type and color apply; an invisible copy of the final
// value reserves the width, so the text after it does not move while the count runs.
"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  delay?: number
}

export function NumberTicker({ value, startValue = 0, delay = 0, className, ...props }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const still = useReducedMotion()
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  // Drop to the start value once hydrated, so the count runs when the figure scrolls in.
  useEffect(() => {
    if (still) return
    motionValue.jump(startValue)
    springValue.jump(startValue)
    if (ref.current) ref.current.textContent = String(startValue)
  }, [still, motionValue, springValue, startValue])

  useEffect(() => {
    if (still || !isInView) return
    const timer = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [still, isInView, motionValue, value, delay])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(latest))
      }),
    [springValue]
  )

  return (
    <span className={cn("inline-grid", className)} {...props}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={ref} className="col-start-1 row-start-1 text-right">
        {value}
      </span>
    </span>
  )
}
