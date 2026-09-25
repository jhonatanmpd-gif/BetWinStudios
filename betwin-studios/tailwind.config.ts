import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#070A0F",
          surface: "#0C1118",
          raised: "#121821",
          line: "#202631",
        },
        gold: {
          DEFAULT: "#FDE047",
          soft: "#FEF08A",
          dim: "#A16207",
        },
        win: "#2FD9A8",
        lose: "#E8574D",
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#94A3B8",
          faint: "#64748B",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
