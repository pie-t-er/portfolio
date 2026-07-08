/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0d0f0e',
          surface: '#161a18',
          'surface-2': '#1e2420',
        },
        ink: {
          DEFAULT: '#f0ece3',
          muted: '#a09890',
        },
        border: {
          subtle: '#2a3030',
        },
        forest: {
          DEFAULT: '#2d6a4f',
          light: '#74c69d',
        },
        brown: {
          DEFAULT: '#7c4a2d',
          light: '#c9956a',
        },
        purple: {
          DEFAULT: '#4a2d6e',
          light: '#a78bcc',
        },
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#6aa3d4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
