import { Hanken_Grotesk, Newsreader } from "next/font/google";

// Locked brand (2026-09-23). Loaded here so the contact page carries the new
// type before the site-wide redesign lands; the redesign moves these into src/lib/fonts.ts.
export const hanken = Hanken_Grotesk({ subsets: ["latin"], display: "swap" });

export const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  // next/font has no fallback metrics for Newsreader.
  adjustFontFallback: false,
});
