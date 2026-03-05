"use client";

import { useEffect } from "react";

export default function AutoplayVideos() {
  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => {
      v.play().catch(() => {});
    });
  }, []);

  return null;
}
