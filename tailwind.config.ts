import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "var(--font-cairo)", "var(--font-inter)", "Tahoma", "Arial", "sans-serif"],
        display: ["var(--font-display)", "var(--font-cairo)", "var(--font-inter)", "Tahoma", "Arial", "sans-serif"],
      },

      colors: {
        /* Primary: Blue */
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },

        /* Neutral: Slate */
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        /* Semantic colors */
        success: {
          DEFAULT: "#10b981",
          light: "#d1fae5",
          dark: "#047857",
        },

        warning: {
          DEFAULT: "#f59e0b",
          light: "#fef3c7",
          dark: "#a16207",
        },

        danger: {
          DEFAULT: "#f43f5e",
          light: "#ffe4e6",
          dark: "#be123c",
        },

        info: {
          DEFAULT: "#0ea5e9",
          light: "#e0f2fe",
          dark: "#0369a1",
        },
      },

      borderRadius: {
        card: "var(--radius-lg)",
        control: "var(--radius-md)",
      },

      boxShadow: {
        card: "var(--shadow-md)",
        glow: "var(--shadow-glow)",
      },

      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },

      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out both",
      },
    },
  },

  plugins: [],
};

export default config;
