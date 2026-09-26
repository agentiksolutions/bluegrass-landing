"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// A muted looping clip laid over a still that is already on the page. The still stays as the
// fallback: the clip fades in only once it is actually playing, it plays only while on screen,
// and with reduced motion it is never rendered.
export default function LoopVideo({
  name,
  poster,
  eager = false,
  className = "",
}: {
  /** File stem in /public/videos; expects <name>.webm and <name>.mp4. */
  name: string;
  poster: string;
  /** Hero clips start loading at once; the rest wait until they are near the viewport. */
  eager?: boolean;
  className?: string;
}) {
  const still = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  if (still) return null;

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      aria-hidden="true"
      poster={poster}
      preload={eager ? "auto" : "none"}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
        playing ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
