import { Hanken_Grotesk, Newsreader } from "next/font/google";

// Headlines and UI.
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Reading text.
export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  style: ["normal", "italic"],
  // next/font has no fallback metrics for Newsreader; Georgia is set in tailwind.config.ts.
  adjustFontFallback: false,
});
