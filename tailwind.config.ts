import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./theme.config.tsx",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sf-pro': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'khand': ['Khand', 'sans-serif'],
        'alef': ['Alef', 'sans-serif'],
        'pt-sans': ['var(--font-pt-sans-caption)'],
        'audio-wide': ['var(--font-audio-wide)'],
        'gudea': ['var(--font-gudea)'],
      },
      fontSize: {
        'nav': ['16px', {
          lineHeight: '1.5',
          fontWeight: '500',
          letterSpacing: '0.02em'
        }],
        'nav-lg': ['17px', {
          lineHeight: '1.5',
          fontWeight: '500',
          letterSpacing: '0.02em'
        }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(20, 20, 40, 0.9))',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'shimmer': 'shimmer 3.5s linear infinite',
        'conic-spin': 'conic-spin 8s linear infinite',
        'breathing-glow': 'breathing-glow 3.2s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'aurora': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '33%':      { transform: 'translate3d(4%,-3%,0) scale(1.08)', opacity: '0.75' },
          '66%':      { transform: 'translate3d(-3%,4%,0) scale(0.95)', opacity: '0.5' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'conic-spin': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'breathing-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217,70,239,0.0), 0 0 30px 0 rgba(217,70,239,0.35)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(217,70,239,0.18), 0 0 60px 6px rgba(217,70,239,0.55)' },
        },
        'pulse-dot': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.6)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(74,222,128,0.0)' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;