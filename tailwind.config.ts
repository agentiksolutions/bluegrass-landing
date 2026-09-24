import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      // Direction 03d, UK blue (2026-09-23). The legacy names (graphite, emerald,
      // sage, warm-white, cream, charcoal, stone) now point at the new palette so
      // pages that were not rewritten pick up the redesign without edits.
      colors: {
        ink: "#161B22",
        body: "#3B4350",
        muted: "#5A6370",
        line: "#D9D8D1",
        band: "#F2F1EC",
        blue: "#0033A0",
        "blue-dark": "#002677",
        tint: "#E6EBF6",
        graphite: "#161B22",
        emerald: "#0033A0",
        sage: "#002677",
        "warm-white": "#FFFFFF",
        cream: "#F2F1EC",
        charcoal: "#3B4350",
        stone: "#5A6370",
        gold: "#D4A017",
        "gold-tint": "#FBF3DC",
      },
      fontFamily: {
        display: ["var(--font-display)", '"Helvetica Neue"', "Arial", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "960px",
      },
      // No colored edge strips (Phil, 2026-09-24). The typography plugin runs a 4px bar down
      // the side of every blog quote; the italic and the whitespace carry it instead.
      // A rule in globals.css cannot do this: plugin component CSS outranks @layer base.
      typography: {
        DEFAULT: {
          css: {
            blockquote: { borderInlineStartWidth: "0", paddingInlineStart: "0" },
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
