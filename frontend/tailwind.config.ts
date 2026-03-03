import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Cabinet Grotesk'", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["72px", { lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.02em" }],
        "display-sm": ["56px", { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" }],
        "h1": ["48px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.01em" }],
        "h2": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3": ["24px", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.75", fontWeight: "400" }],
        "body": ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        dashboard: "hsl(var(--dashboard-bg))",
        widget: "hsl(var(--widget-bg))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        "card": "var(--card-shadow)",
        "card-hover": "var(--card-shadow-hover)",
        "card-lg": "var(--card-shadow-lg)",
        "elevation-1": "var(--shadow-elevation-1)",
        "elevation-2": "var(--shadow-elevation-2)",
        "elevation-3": "var(--shadow-elevation-3)",
        "glow": "0 0 24px hsla(210, 88%, 40%, 0.25)",
        "glow-lg": "0 0 48px hsla(210, 88%, 40%, 0.2)",
        "glow-xl": "0 0 64px hsla(210, 88%, 40%, 0.3)",
        "inner-soft": "inset 0 2px 6px hsla(0, 0%, 0%, 0.06)",
        "glass": "0 8px 32px hsla(0, 0%, 0%, 0.06), inset 0 1px 0 hsla(0, 0%, 100%, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-fast": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsla(210, 88%, 40%, 0.35)" },
          "50%": { boxShadow: "0 0 24px 10px hsla(210, 88%, 40%, 0.08)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "zoom-in": {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "flip-in": {
          from: { opacity: "0", transform: "rotateX(-90deg)" },
          to: { opacity: "1", transform: "rotateX(0deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "counter-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-fast": "fade-in-fast 0.3s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out",
        "slide-in-up": "slide-in-up 0.7s ease-out forwards",
        "slide-in-left": "slide-in-left 0.7s ease-out forwards",
        "slide-in-right": "slide-in-right 0.7s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 4s ease-in-out infinite",
        "bounce-in": "bounce-in 0.8s ease-out",
        "zoom-in": "zoom-in 0.5s ease-out forwards",
        "flip-in": "flip-in 0.6s ease-out forwards",
        "spin-slow": "spin-slow 8s linear infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "counter-up": "counter-up 0.6s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
