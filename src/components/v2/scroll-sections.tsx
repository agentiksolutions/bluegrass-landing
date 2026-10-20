"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, EASE, WIDE, motionOff } from "@/lib/gsap";
import { MARK } from "@/lib/mark-geometry";

// Scroll-driven sections for V2. Each motion idea appears once on a page (Phil, 2026-09-26: no
// animation repeated section after section). Pins and sideways tracks run only above 820 px;
// phones and small tablets get the same content stacked. Everything is visible with reduced motion.

function useGsap(build: (el: HTMLElement, mm: gsap.MatchMedia) => void, deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => build(el, mm), el);
    return () => {
      mm.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/**
 * The statements light up one at a time while the section holds still. Each line starts pale,
 * turns ink, and the hairline under it draws across.
 */
export function PinnedStatements({ heading, items }: { heading: string; items: string[] }) {
  const ref = useGsap((el, mm) => {
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    mm.add(WIDE, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + window.innerHeight * 1.6, pin: true, scrub: 0.6 },
      });
      rows.forEach((r, i) => {
        tl.fromTo(r.querySelector("[data-text]"), { color: "#8B919A" }, { color: "#161B22", duration: 1, ease: "none" }, i)
          .fromTo(r.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, i);
      });
    });
    mm.add("(max-width: 820px)", () => {
      rows.forEach((r) =>
        gsap.from(r, { autoAlpha: 0, y: 20, duration: 0.9, ease: EASE, scrollTrigger: { trigger: r, start: "top 88%", once: true } }),
      );
    });
  });

  return (
    <section ref={ref} data-nomotion className="relative bg-white">
      <div className="mx-auto grid min-h-[100svh] max-w-page grid-cols-1 content-center gap-10 px-4 py-24 md:px-10 min-[821px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] min-[821px]:gap-16">
        <h2 className="font-display text-[15px] font-semibold text-blue">{heading}</h2>
        <ul>
          {items.map((t) => (
            <li key={t} data-row className="relative py-6 md:py-8">
              <p data-text className="font-display text-[26px] font-medium leading-[1.12] tracking-[-0.02em] text-ink sm:text-[34px] lg:text-[46px]">
                {t}
              </p>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
              <span data-rule aria-hidden="true" className="rule-draw absolute inset-x-0 bottom-0 h-px bg-ink" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * A night chapter that holds still while its cards slide sideways. On narrow screens the cards
 * stack. The intro text stays on the left as the cards pass.
 */
export function HorizontalTrack({
  id,
  intro,
  children,
}: {
  id?: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useGsap((el, mm) => {
    mm.add(WIDE, () => {
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const bar = el.querySelector<HTMLElement>("[data-progress]")!;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .to(track, { x: () => -distance(), ease: "none" }, 0)
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    });
  });

  return (
    <section ref={ref} id={id} data-nav="dark" className="night relative overflow-hidden bg-night text-night-text scroll-mt-0">
      <div className="flex min-h-[100svh] flex-col justify-center py-24 min-[821px]:py-0">
        <div
          data-track
          className="flex flex-col gap-16 px-4 md:px-10 min-[821px]:w-max min-[821px]:flex-row min-[821px]:items-center min-[821px]:gap-[6vw] min-[821px]:pl-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] min-[821px]:pr-[8vw]"
        >
          <div className="min-[821px]:w-[min(30vw,420px)] min-[821px]:shrink-0">{intro}</div>
          {children}
        </div>
        <div className="mx-4 mt-16 hidden h-px bg-night-line md:mx-10 min-[821px]:block">
          <div data-progress className="h-px origin-left bg-night-blue" />
        </div>
      </div>
    </section>
  );
}

/** One card inside the track: a visual and its words. */
export function TrackCard({
  title,
  line,
  names,
  href,
  children,
}: {
  title: string;
  line: string;
  names?: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <article className="min-[821px]:w-[min(70vw,1000px)] min-[821px]:shrink-0">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
        <div>{children}</div>
        <div>
          <h3 className="font-display text-[44px] font-light leading-none tracking-[-0.03em] md:text-[64px]">{title}</h3>
          <p className="mt-5 max-w-[30ch] text-[19px] leading-snug text-night-body md:text-[21px]">{line}</p>
          {names && <p className="mt-4 max-w-[34ch] font-display text-[14px] leading-relaxed text-night-body">{names}</p>}
          <Link href={href} className="mt-6 inline-block font-display text-[15px] font-semibold text-night-blue underline decoration-night-blue/40 underline-offset-4 hover:decoration-night-blue">
            More on {title.toLowerCase()}
          </Link>
        </div>
      </div>
    </article>
  );
}

/** The path a client takes: a line draws down the steps as you scroll and each step lights up. */
export function PathSteps({ steps }: { steps: { title: string; line: string }[] }) {
  const ref = useGsap((el) => {
    const dots = el.querySelectorAll<HTMLElement>("[data-dot]");
    const words = el.querySelectorAll<HTMLElement>("[data-step]");
    gsap.fromTo(
      el.querySelector("[data-line]"),
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.4 } },
    );
    dots.forEach((d, i) => {
      gsap
        .timeline({ scrollTrigger: { trigger: words[i], start: "top 66%", toggleActions: "play none none reverse" } })
        .to(d, { backgroundColor: "#0033A0", borderColor: "#0033A0", scale: 1.15, duration: 0.35 })
        .fromTo(words[i], { opacity: 0.75 }, { opacity: 1, duration: 0.35 }, 0);
    });
  });

  return (
    <div ref={ref} data-nomotion className="relative">
      <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-line" />
      <span data-line aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-blue" />
      <ol className="space-y-9">
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-10">
            <span data-dot aria-hidden="true" className="absolute left-0 top-[9px] h-[15px] w-[15px] rounded-full border border-line bg-white" />
            <div data-step>
              <p className="font-display text-[22px] font-medium leading-tight tracking-[-0.01em] text-ink md:text-[26px]">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </p>
              <p className="mt-1.5 max-w-[40ch] text-[17px] leading-snug text-body">{s.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A screenshot that opens from a framed window to the full width of the page as it scrolls in. */
export function ClipExpand({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) {
  const ref = useGsap((el) => {
    const frame = el.querySelector("[data-frame]");
    const img = el.querySelector("img");
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "center 55%", scrub: 0.5 } })
      .fromTo(frame, { clipPath: "inset(12% 16% 12% 16% round 10px)" }, { clipPath: "inset(0% 0% 0% 0% round 6px)", ease: "none" }, 0)
      .fromTo(img, { scale: 1.18 }, { scale: 1, ease: "none" }, 0);
  });

  return (
    <figure ref={ref} className="mx-auto max-w-page px-4 md:px-10">
      <div data-frame className="overflow-hidden rounded-[6px] border border-line bg-band">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1360px) 1280px, 100vw" className="h-auto w-full will-change-transform" />
      </div>
      <figcaption className="mt-4 font-display text-[14px] text-muted">{caption}</figcaption>
    </figure>
  );
}

/** A photo that rises out of its frame while the image inside settles. */
export function PhotoReveal({
  src,
  alt,
  width,
  height,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes: string;
}) {
  const ref = useGsap((el) => {
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: 0.6 } })
      .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
      .fromTo(el.querySelector("img"), { scale: 1.25, yPercent: 6 }, { scale: 1, yPercent: 0, ease: "none" }, 0);
  });
  return (
    <div ref={ref} className={`overflow-hidden rounded-[6px] ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full will-change-transform" />
    </div>
  );
}

/**
 * A list of links. On a mouse, a preview of each one follows the pointer while you hover it;
 * on touch, the previews are left out and the list reads on its own.
 */
export function HoverList({ items }: { items: { label: string; href: string; line?: string; image: string; imageAlt: string }[] }) {
  const ref = useGsap((el, mm) => {
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const box = el.querySelector<HTMLElement>("[data-preview]")!;
      const imgs = box.querySelectorAll<HTMLElement>("[data-img]");
      const xTo = gsap.quickTo(box, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(box, "y", { duration: 0.55, ease: "power3" });
      const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-item]"));
      let shown = -1;
      const show = (i: number) => {
        if (i === shown) return;
        shown = i;
        if (i < 0) {
          gsap.to(box, { autoAlpha: 0, scale: 0.92, duration: 0.3 });
          return;
        }
        imgs.forEach((im, k) => gsap.to(im, { autoAlpha: k === i ? 1 : 0, duration: 0.25 }));
        gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" });
      };
      // Only a real mouse movement shows a preview; content scrolling under a still pointer
      // does not.
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left + 28);
        yTo(e.clientY - r.top - 120);
        const row = (e.target as HTMLElement).closest<HTMLElement>("[data-item]");
        show(row ? rows.indexOf(row) : -1);
      };
      const leave = () => show(-1);
      gsap.set(box, { autoAlpha: 0, scale: 0.92 });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
  });

  return (
    <div ref={ref} data-nomotion className="relative">
      <ul className="border-t border-line">
        {items.map((m) => (
          <li key={m.href} data-item className="border-b border-line">
            <Link href={m.href} className="group flex items-center justify-between gap-6 py-7 md:py-9">
              <span className="font-display text-[28px] font-light leading-tight tracking-[-0.025em] text-ink transition-[transform,color] duration-300 ease-out group-hover:translate-x-2 group-hover:text-blue md:text-[48px]">
                {m.label}
              </span>
              {m.line && <span className="hidden max-w-[36ch] text-[18px] leading-relaxed text-body md:block">{m.line}</span>}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 shrink-0 -translate-x-2 text-blue opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      <div
        data-preview
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 z-10 hidden aspect-[16/9] w-[340px] overflow-hidden rounded-[6px] border border-line bg-band [@media(hover:hover)]:block"
      >
        {items.map((m) => (
          <div key={m.href} data-img className="absolute inset-0 opacity-0">
            <Image src={m.image} alt="" fill sizes="340px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The official mark builds itself as the closing section scrolls in: the state outline traces,
 * the node lines draw, the nodes appear, and the Lexington star lands last. Geometry comes from
 * public/brand/mark.svg (src/lib/mark-geometry.ts), so this is the real logo, not a drawing of it.
 */
export function MarkBuild({ className = "" }: { className?: string }) {
  const ref = useGsap((el) => {
    const outline = el.querySelector<SVGPathElement>("[data-outline]")!;
    const len = outline.getTotalLength();
    gsap.set(outline, { strokeDasharray: len, strokeDashoffset: len });
    const lines = el.querySelectorAll<SVGLineElement>("[data-l]");
    lines.forEach((l) => {
      const d = Math.hypot(+l.getAttribute("x2")! - +l.getAttribute("x1")!, +l.getAttribute("y2")! - +l.getAttribute("y1")!);
      gsap.set(l, { strokeDasharray: d, strokeDashoffset: d });
    });
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 80%", scrub: 0.7 } })
      .to(outline, { strokeDashoffset: 0, duration: 1, ease: "none" })
      .fromTo(el.querySelector("[data-fill]"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.8)
      .to(lines, { strokeDashoffset: 0, duration: 0.8, stagger: 0.004, ease: "none" }, 0.9)
      .from(el.querySelectorAll("[data-c]"), { scale: 0, transformOrigin: "center", duration: 0.3, stagger: 0.008 }, 1.2)
      .from(el.querySelector("[data-star]"), { scale: 0, rotate: -90, transformOrigin: "647px 183px", duration: 0.5, ease: "back.out(2)" }, 1.7);
  });

  return (
    <div ref={ref} className={className}>
      <svg viewBox={MARK.viewBox} className="h-auto w-full" role="img" aria-label="The Bluegrass Advisory Group mark: Kentucky with a network of nodes and a star at Lexington">
        <path data-fill d={MARK.state} fill="#0033A0" />
        <path data-outline d={MARK.state} fill="none" stroke="#9DB2E8" strokeWidth="2" />
        <g stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="2.2">
          {MARK.lines.map((l, i) => (
            <line key={i} data-l x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
          ))}
        </g>
        <g fill="#FFFFFF">
          {MARK.circles.map((c, i) => (
            <circle key={i} data-c cx={c[0]} cy={c[1]} r={c[2]} />
          ))}
        </g>
        <path data-star d={MARK.star} fill="#FFFFFF" />
      </svg>
    </div>
  );
}
