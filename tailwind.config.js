import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],

  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
      },
    },
    fontSize: {
      xs: "0.65rem",
      sm: "13px",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        navPop: "navPop 300ms ease-out",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        navPop: {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },

      colors: {
        primary: "#3565E0",
        secondary: "#000000",
        gray: "#212121",
      },
    },
  },
  plugins: [forms],
};
