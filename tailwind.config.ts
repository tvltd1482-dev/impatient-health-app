import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#F5F7FC",
        abyss: {
          0: "#060920",
          1: "#0B1230",
          2: "#0E1A44",
          surface: "#0E1538",
          surface2: "#121C46",
        },
        logo: {
          navy: "#0A2A6C",
          deep: "#123E9C",
          royal: "#1A55D1",
        },
        navy: "#0A1230",
        deep: "#1E40AF",
        royal: "#2D5FE0",
        bright: "#5A8FF5",
        soft: "#7AB8FF",
        glow: "#A8D4FF",
        tint: "#DEE9FB",
        ink: {
          bright: "#F3F6FF",
          primary: "#D7DDF2",
          secondary: "#99A2C6",
          tertiary: "#69708F",
        },
        filament: {
          cool: "#FFF1CE",
          mid: "#F5B642",
          warm: "#E9B452",
        },
        reg: {
          discovery: "#F4B23C",
          win: "#7BCBA1",
          caution: "#E9B452",
          flare: "#F07F77",
          calm: "#7AB8FF",
        },
      },
      fontFamily: {
        ui: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        card: "18px",
        btn: "16px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
