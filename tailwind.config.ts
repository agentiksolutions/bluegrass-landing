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
      // Dark preview (Phil, 2026-09-26: "make the whole site dark and futuristic"). This overrides
      // the white-page lock on this branch only. The palette names above stay as they were so
      // every page follows without edits; each utility family maps them onto the dark tokens:
      //   page #070B14 · raised #0C1322 · raised-2 #111A2E · hairline #1E2A44
      //   text #E6EAF2 (16.3:1 on page) · body #B6BFD1 (10.7:1) · muted #8A94AA (6.5:1)
      //   lit blue #81A7F8 (8.3:1), the UK blue hue at 74% lightness, for links, lines and focus
      // UK blue #0033A0 stays the button fill (white text 10.6:1).
      textColor: {
        ink: "#E6EAF2",
        graphite: "#E6EAF2",
        "warm-white": "#E6EAF2",
        black: "#E6EAF2",
        body: "#B6BFD1",
        charcoal: "#B6BFD1",
        muted: "#8A94AA",
        stone: "#8A94AA",
        blue: "#81A7F8",
        emerald: "#81A7F8",
        "blue-dark": "#B1C9FB",
        sage: "#B1C9FB",
      },
      backgroundColor: {
        white: "#0C1322",
        "warm-white": "#070B14",
        band: "#0C1322",
        cream: "#0C1322",
        tint: "#111A2E",
        "gold-tint": "#111A2E",
        ink: "#03050A",
        graphite: "#03050A",
        black: "#03050A",
        stone: "#1E2A44",
        "blue-dark": "#1B4EBB",
        sage: "#1B4EBB",
      },
      borderColor: {
        line: "#1E2A44",
        stone: "#1E2A44",
        ink: "#2E3B5C",
        graphite: "#2E3B5C",
        blue: "#81A7F8",
        emerald: "#81A7F8",
      },
      divideColor: { line: "#1E2A44" },
      ringColor: { blue: "#81A7F8", emerald: "#81A7F8" },
      outlineColor: { ink: "#E6EAF2", blue: "#81A7F8" },
      textDecorationColor: { blue: "#81A7F8", emerald: "#81A7F8" },
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
