import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f5fa",
          100: "#d0e1f5",
          200: "#a1c4eb",
          300: "#72a6e0",
          400: "#4389d6",
          500: "#246cb8",
          600: "#12436a", // основной цвет
          700: "#0f375a",
          800: "#0c2b49",
          900: "#091f37",
        },
        accent: {
          50: "#fcf9f4",
          100: "#f8f1e3",
          200: "#f1e3c7",
          300: "#e9d5ab",
          400: "#e2c78f",
          500: "#dbb973",
          600: "#b07c34", // акцентный цвет
          700: "#986b2d",
          800: "#805926",
          900: "#67481f",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/spb-bg.jpg')",
      },
    },
  },
  plugins: [],
};
export default config; 