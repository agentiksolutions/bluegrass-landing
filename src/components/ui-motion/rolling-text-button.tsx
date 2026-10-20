// Source: https://motion.dev/examples/react-rolling-text-button
// Author: Matt Perry (Motion). Free example, published 2026-07-29.
// Terms: motion.dev offers its free examples for copying into your own site.
// No open source licence is named. The motion package itself is MIT.
// Changes for this library: the label is a prop; an href renders a link instead
// of a button; the full-page demo stage and the motion.dev design-system classes
// are removed, so styling comes from className. The hover and focus queue and the
// reduced-motion guard are the original's.
"use client"

import { motion, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"

const outgoingVariants = {
  rest: { transform: "translateY(0%)" },
  active: { transform: "translateY(100%)" },
}

const incomingVariants = {
  rest: { transform: "translateY(-100%)" },
  active: { transform: "translateY(0%)" },
}

const transition = {
  duration: 0.3,
  ease: [0.338, 0.015, 0.395, 0.959] as const,
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export interface RollingTextButtonProps {
  children: string
  href?: string
  onClick?: () => void
  className?: string
}

export default function RollingTextButton({
  children: label,
  href,
  onClick,
  className = "inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 font-medium text-white",
}: RollingTextButtonProps) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(false)
  const activeRef = useRef(false)
  const animating = useRef(false)
  const pendingRequest = useRef<boolean | null>(null)
  const hovered = useRef(false)
  const focused = useRef(false)

  const updateActive = (next: boolean) => {
    activeRef.current = next
    setActive(next)
  }

  const requestActive = (next: boolean) => {
    if (reduceMotion) return

    if (next === activeRef.current) {
      pendingRequest.current = null
      return
    }

    if (animating.current) {
      pendingRequest.current = next
      return
    }

    animating.current = true
    updateActive(next)
  }

  const completeAnimation = () => {
    if (!animating.current) return
    animating.current = false

    if (
      pendingRequest.current !== null &&
      pendingRequest.current !== activeRef.current
    ) {
      const next = pendingRequest.current
      pendingRequest.current = null
      animating.current = true
      updateActive(next)
    } else {
      pendingRequest.current = null
    }
  }

  const Tag = href ? motion.a : motion.button

  return (
    <>
      <Tag
        {...(href ? { href } : { type: "button" as const })}
        onClick={onClick}
        className={className}
        aria-label={label}
        onHoverStart={() => {
          hovered.current = true
          requestActive(true)
        }}
        onHoverEnd={() => {
          hovered.current = false
          requestActive(focused.current)
        }}
        onFocus={() => {
          focused.current = true
          requestActive(true)
        }}
        onBlur={() => {
          focused.current = false
          requestActive(hovered.current)
        }}
      >
        <span className="label-window" aria-hidden="true">
          <motion.span
            className="label-copy"
            variants={outgoingVariants}
            initial="rest"
            animate={active ? "active" : "rest"}
            onAnimationComplete={completeAnimation}
            transition={transition}
          >
            {label}
          </motion.span>
          <motion.span
            className="label-copy label-copy--incoming"
            variants={incomingVariants}
            initial="rest"
            animate={active ? "active" : "rest"}
            transition={transition}
          >
            {label}
          </motion.span>
        </span>
        <span aria-hidden="true">
          <ChevronRightIcon />
        </span>
      </Tag>
      <Stylesheet />
    </>
  )
}

function Stylesheet() {
  return (
    <style>{`
      .label-window {
        position: relative;
        display: block;
        width: max-content;
        overflow: hidden;
      }

      .label-copy {
        display: block;
        white-space: nowrap;
      }

      .label-copy--incoming {
        position: absolute;
        inset: 0;
      }
    `}</style>
  )
}
