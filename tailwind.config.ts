import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#1C1C1E",
        emerald: "#0D7C66",
        sage: "#2A9D8F",
        "warm-white": "#FAF8F5",
        cream: "#F0EBE3",
        charcoal: "#333333",
        stone: "#888888",
        gold: "#D4A017",
        // Locked brand (2026-09-23), used by the contact page until the site redesign lands.
        ink: "#161B22",
        body: "#3B4350",
        muted: "#5A6370",
        line: "#D9D8D1",
        band: "#F2F1EC",
        blue: "#0033A0",
        "blue-dark": "#002677",
        tint: "#E6EBF6",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "960px",
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
