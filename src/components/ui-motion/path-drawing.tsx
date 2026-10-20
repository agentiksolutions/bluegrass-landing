// Source: https://motion.dev/examples/react-path-drawing
// Author: Matt Perry (Motion). Free example, published 2024-12-17.
// Terms: motion.dev offers its free examples for copying into your own site.
// No open source licence is named. The motion package itself is MIT.
// Changes for this library: the demo's fixed circles, lines and rectangles are
// replaced with a paths prop (any SVG path data, such as a state outline or
// network lines) plus optional node dots; drawing starts when the SVG scrolls
// into view; reduced-motion guard (the drawing shows complete). The draw
// variants are the original's.
"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

const pop: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: { delay: i * 0.5, type: "spring", bounce: 0.4 },
    }),
}

export interface DrawPath {
    d: string
    stroke?: string
}

export interface DrawNode {
    cx: number
    cy: number
    r?: number
    fill?: string
}

export interface PathDrawingProps {
    viewBox: string
    paths: DrawPath[]
    nodes?: DrawNode[]
    strokeWidth?: number
    /** Seconds between one path starting and the next. */
    stagger?: number
    className?: string
    title?: string
}

export default function PathDrawing({
    viewBox,
    paths,
    nodes = [],
    strokeWidth = 4,
    stagger = 0.5,
    className,
    title,
}: PathDrawingProps) {
    const reduceMotion = useReducedMotion()
    // The original variants space items 0.5s apart; scale the index to honour `stagger`.
    const step = stagger / 0.5

    return (
        <motion.svg
            viewBox={viewBox}
            className={className}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
        >
            {title ? <title>{title}</title> : null}
            {paths.map((p, i) => (
                <motion.path
                    key={i}
                    d={p.d}
                    stroke={p.stroke ?? "currentColor"}
                    variants={draw}
                    custom={i * step}
                    style={shape(strokeWidth)}
                />
            ))}
            {nodes.map((n, i) => (
                <motion.circle
                    key={`node-${i}`}
                    cx={n.cx}
                    cy={n.cy}
                    r={n.r ?? strokeWidth * 1.5}
                    fill={n.fill ?? "currentColor"}
                    variants={pop}
                    custom={(paths.length + i * 0.25) * step}
                />
            ))}
        </motion.svg>
    )
}

/**
 * ==============   Styles   ================
 */

const shape = (strokeWidth: number): React.CSSProperties => ({
    strokeWidth,
    strokeLinecap: "round",
    fill: "transparent",
})
