/** @type {import('tailwindcss').Config} */
// Design tokens for the site. Tweak the `accent` palette to re-brand.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,yaml}'],
  theme: {
    extend: {
      colors: {
        // Brand accent (coral) — links, active nav, buttons, highlights.
        accent: {
          50: '#fff3f0',
          100: '#ffe4dd',
          200: '#ffc7ba',
          300: '#ffa38e',
          400: '#ff8365',
          500: '#ff6b4a',
          600: '#ed4f2b',
          700: '#c73d1f',
          800: '#a3341e',
          900: '#852e1d',
        },
        // Primary (navy) — headings and the nav brand.
        primary: {
          50: '#f4f6f9',
          100: '#e6eaf1',
          200: '#c8d0e0',
          300: '#9aa8c4',
          400: '#5e7099',
          500: '#374a75',
          600: '#2a3a5c',
          700: '#232d4b',
          800: '#1a2138',
          900: '#111627',
        },
        // Menu bar surface — warm gold.
        bar: '#f8c46c',
        // Intro section surface — soft warm cream.
        cream: '#fffbf2',
        // Neutral grayscale for text / surfaces.
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae1',
          300: '#b0b9c6',
          400: '#8592a4',
          500: '#647087',
          600: '#4e586c',
          700: '#404859',
          800: '#373d4b',
          900: '#1f242e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { prose: '70ch' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
