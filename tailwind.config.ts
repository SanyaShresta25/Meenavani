import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ocean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        azure: {
          50: "#f0f7ff",
          100: "#e0f1ff",
          200: "#c7e3ff",
          300: "#a4cfff",
          400: "#79b4ff",
          500: "#4d8bfa",
          600: "#3b6ef0",
          700: "#2f59db",
          800: "#2a4ab2",
          900: "#28418c",
          950: "#1c2a5e",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wave: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-25%) translateY(10px)" },
          "100%": { transform: "translateX(-50%) translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wave: "wave 8s linear infinite",
      },
      backgroundImage: {
        "wave-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.24.19 1.64.39 1.85.39.41 0 1.12-.19 1.43-.57.3-.37.63-.58.88-.58.52 0 1.04.19 1.17.38.13.2.24.38.54.38.3 0 .35-.18.98-.37 1.36-.39 1.9-.58 2.42-.58.5 0 1.9.19 2.5.58.5.38 1.3.38 1.9.19.5-.19 1.1-.28 1.7-.28.4 0 1 .19 1.4.57.4.39 1 .39 1.4 0 .4-.39 1-.58 1.4-.58.5 0 1.1.19 1.7.57.5.39 1 .39 1.5 0 .5-.38 1.1-.57 1.5-.57.5 0 1.5.19 2.4.57.9.39 1.4.39 1.9 0 .5-.38 1-.57 1.5-.57.4 0 1 .19 1.4.57.4.39 1 .39 1.4 0 .4-.38 1-.57 1.4-.57.5 0 1.1.19 1.7.57.5.38 1 .38 1.5 0 .5-.38 1.1-.57 1.5-.57.5 0 1.4.19 2.4.57.9.39 1.4.39 1.9 0 .5-.38 1-.58 1.5-.58.4 0 1 .2 1.4.58.4.38 1 .38 1.4 0 .4-.38 1-.58 1.4-.58.5 0 1.1.2 1.5.58.5.38 1 .38 1.5 0 .5-.38 1.1-.58 1.5-.58.5 0 1.4.2 2.4.58.9.38 1.4.38 1.9 0 .5-.38 1-.58 1.5-.58.4 0 .9.2 1.4.58.4.38.9.38 1.3 0 .4-.38.9-.58 1.3-.58.5 0 1 .2 1.5.58.5.38 1 .38 1.5 0 .5-.38 1-.58 1.5-.58.4 0 .9.2 1.3.58.4.38.9.38 1.3 0 .4-.38.9-.58 1.3-.58.5 0 1 .2 1.5.58.5.38 1 .38 1.5 0' stroke='%230ea5e9' stroke-width='2' fill='none' fill-rule='evenodd' stroke-dasharray='10 5' stroke-linecap='round'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
