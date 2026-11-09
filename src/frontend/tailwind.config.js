/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A76F",
          dark: "#006c46",
          light: "#5adda0",
          fixed: "#79fabb",
          container: "#00A76F",
          "on-container": "#00321f",
          surface: "#e8f7f0",
        },
        surface: {
          DEFAULT: "#f7f9ff",
          bright: "#f7f9ff",
          dim: "#d1dbea",
          container: "#e4effe",
          "container-low": "#eef4ff",
          "container-lowest": "#ffffff",
          "container-high": "#dfe9f8",
          "container-highest": "#d9e3f2",
        },
        "on-surface": {
          DEFAULT: "#121c27",
          variant: "#3d4a41",
        },
        outline: {
          DEFAULT: "#6d7a71",
          variant: "#bccabf",
        },
        secondary: {
          DEFAULT: "#006b5c",
          container: "#97f4de",
          "on-container": "#007261",
        },
        tertiary: {
          DEFAULT: "#855400",
          container: "#cc8200",
          "fixed-dim": "#ffb95e",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
          "on-container": "#93000a",
        },
      },
      fontFamily: {
        sans: ['"Public Sans"', 'sans-serif'],
      },
      fontSize: {
        "display": ["40px", { lineHeight: "52px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "42px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "title": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "700" }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
