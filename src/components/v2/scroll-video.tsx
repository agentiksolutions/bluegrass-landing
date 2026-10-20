"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, motionOff } from "@/lib/gsap";

/**
 * A pre-rendered 3D flight over the firm's Kentucky mark (Blender, Cycles), scrubbed by scroll:
 * the section holds still while scrolling moves the camera from a low view of the state up and
 * over to the star at Lexington. Every frame of the video is a keyframe, so seeking is instant.
 * Phones get the 720p file. Reduced motion shows the last frame as a still.
 */
export default function ScrollVideo({
  src,
  srcSmall,
  poster,
  still,
  lines,
}: {
  src: string;
  srcSmall: string;
  poster: string;
  still: string;
  lines: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video || motionOff()) return;
    // Fetch the video only when the section is about a screen away, so it never competes with
    // the first screen for bandwidth.
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        video.src = window.innerWidth < 821 ? srcSmall : src;
        video.load();
        near.disconnect();
      },
      { rootMargin: "120% 0px" },
    );
    near.observe(el);

    let target = 0;
    let raf = 0;
    const seek = () => {
      raf = 0;
      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        const t = target * (video.duration - 0.04);
        if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
      }
    };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2.4,
          pin: true,
          scrub: 0.5,
          onUpdate: (s) => {
            target = s.progress;
            if (!raf) raf = requestAnimationFrame(seek);
          },
        },
      });
      el.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i, all) => {
        const at = (i / all.length) * 0.9;
        tl.fromTo(line, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, at);
        if (i < all.length - 1) tl.to(line, { autoAlpha: 0, y: -40, duration: 0.1, ease: "power2.in" }, at + 0.22);
      });
      tl.to({}, { duration: 0.1 });
    }, el);
    return () => {
      near.disconnect();
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [src, srcSmall]);

  return (
    <section ref={ref} data-nav="dark" data-nomotion className="night relative h-[100svh] overflow-hidden bg-night text-night-text">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={still} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 hidden h-full w-full object-cover [.motion-off_&]:block" />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster={poster}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover [.motion-off_&]:hidden"
      />
      {/* A legibility scrim under the words, not decoration: the lit network runs under them. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night via-night/70 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-page items-end px-4 pb-16 md:px-10 md:pb-24">
        {/* With motion the lines take turns in one spot; without it only the last line shows. */}
        <div className="relative w-full font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] md:text-[72px] [.js:not(.motion-off)_&]:h-[2.4em]">
          {lines.map((l, i) => (
            <p
              key={i}
              data-line
              className={`max-w-[18ch] [.js:not(.motion-off)_&]:absolute [.js:not(.motion-off)_&]:bottom-0 [.js:not(.motion-off)_&]:left-0 ${
                i === lines.length - 1 ? "" : "hidden [.js:not(.motion-off)_&]:block"
              }`}
            >
              {l}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
