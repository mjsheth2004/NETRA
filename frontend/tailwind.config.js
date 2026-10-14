/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          panel: 'hsl(var(--background-panel))',
          card: 'hsl(var(--background-card))',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          hover: 'hsl(var(--brand-hover))',
        },
        accent: {
          gold: 'hsl(var(--accent-gold))',
          red: 'hsl(var(--accent-red))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
        },
        status: {
          critical: 'hsl(var(--status-critical))',
          high: 'hsl(var(--status-high))',
          medium: 'hsl(var(--status-medium))',
          low: 'hsl(var(--status-low))',
          benign: 'hsl(var(--status-benign))',
        },
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
