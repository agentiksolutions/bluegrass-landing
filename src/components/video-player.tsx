"use client";

import { useState, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  label?: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, label, poster, className = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-graphite aspect-video cursor-pointer group ${className}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald/90 flex items-center justify-center transition-transform group-hover:scale-110">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="ml-1">
              <path d="M0 0L20 12L0 24V0Z" fill="#FAF8F5" />
            </svg>
          </div>
        </div>
      )}

      {label && (
        <div className="absolute bottom-4 left-4 text-[11px] text-stone tracking-wider uppercase font-semibold">
          {label}
        </div>
      )}
    </div>
  );
}
