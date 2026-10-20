import type { Config } from "tailwindcss";

// V2 (2026-10-20). The locked brand (Brand/BRAND-DECISIONS-2026-09-23.md): white page, limestone
// bands, UK blue #0033A0 as the one accent on light. Dark "night" chapters use ink #161B22 with
// limestone text and the dark-background blue #9DB2E8 (brand decision 17). The legacy names
// (graphite, emerald, sage, warm-white, cream, charcoal, stone) still point at the locked palette
// so any page that was not rewritten stays on brand.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        ink: "#161B22",
        body: "#3B4350",
        muted: "#5A6370",
        line: "#D9D8D1",
        band: "#F2F1EC",
        blue: "#0033A0",
        "blue-dark": "#002677",
        tint: "#E6EBF6",
        // Night chapters.
        night: "#161B22",
        "night-2": "#1D232C",
        "night-line": "#2C333E",
        "night-text": "#F2F1EC",
        "night-body": "#B9BDC4",
        "night-blue": "#9DB2E8",
        // Legacy aliases.
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
        page: "1360px",
      },
      transitionTimingFunction: {
        // The motion template's ease (templates/website-motion, measured on dci.build).
        out: "cubic-bezier(0.17, 0.84, 0.44, 1)",
      },
      // No colored edge strips (Phil, 2026-09-24). The typography plugin draws a bar down the
      // side of every blog quote; plugin CSS outranks @layer base, so it is turned off here.
      typography: {
        DEFAULT: {
          css: {
            blockquote: { borderInlineStartWidth: "0", paddingInlineStart: "0" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
