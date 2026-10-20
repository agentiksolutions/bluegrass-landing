"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, WIDE, motionOff } from "@/lib/gsap";

/**
 * A pre-rendered 3D flight over the firm's Kentucky mark (Blender, Cycles), scrubbed by scroll:
 * the section holds still while scrolling moves the camera from a low view of the state up and
 * Phones get a portrait render that plays on a loop instead. Reduced motion shows the last frame as a still.
 * Phones get the 720p file. Reduced motion shows the last frame as a still.
 */
export default function ScrollVideo({
  src,
  srcSmall,
  posterSmall,
  poster,
  still,
  lines,
}: {
  src: string;
  srcSmall: string;
  /** First frame of the phone file. */
  posterSmall: string;
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
        const small = window.innerWidth < 821;
        video.src = small ? srcSmall : src;
        if (small) video.poster = posterSmall;
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
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Wide screens: the section holds while scroll moves the camera.
      mm.add(WIDE, () => {
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
      });
      // Phones: no pin and no scrubbing (iOS often shows no frame of a paused video). The flight
      // plays muted on a loop while on screen, which phones allow.
      mm.add("(max-width: 820px)", () => {
        video.loop = true;
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()), { threshold: 0.25 });
        io.observe(el);
        return () => {
          io.disconnect();
          video.pause();
        };
      });
    }, el);
    return () => {
      near.disconnect();
      cancelAnimationFrame(raf);
      mm.revert();
      ctx.revert();
    };
  }, [src, srcSmall, posterSmall]);

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
      <div className="relative mx-auto flex h-full max-w-page-pad items-end px-4 pb-16 md:px-10 md:pb-24">
        {/* Wide screens with motion: the lines take turns in one spot. Otherwise only the last shows. */}
        <div className="relative w-full font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] md:text-[72px] track:h-[2.4em]">
          {lines.map((l, i) => (
            <p
              key={i}
              data-line
              className={`max-w-[18ch] track:absolute track:bottom-0 track:left-0 ${
                i === lines.length - 1 ? "" : "hidden track:block"
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
