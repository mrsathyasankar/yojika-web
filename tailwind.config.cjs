/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#C5372A',
          light: '#F0A096',
          container: '#FFDAD3',
          deep: '#9A2A1E',
        },
        amber: { DEFAULT: '#9A6A1C', soft: '#F4E7CC' },
        ok: '#1B7F47',
        warn: '#B45309',
        err: '#BA1A1A',
        info: '#1F5FA8',
        canvas: '#F7F7F4',
        surface: '#FFFFFF',
        ink: {
          900: '#15201B',
          700: '#37433D',
          500: '#6A746E',
          400: '#8C958F',
        },
        night: { canvas: '#101310', surface: '#171A16', line: '#2A2F28' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(21,32,27,0.04), 0 8px 24px -12px rgba(21,32,27,0.12)',
        lift: '0 2px 4px rgba(21,32,27,0.05), 0 18px 40px -18px rgba(21,32,27,0.22)',
        soft: '0 1px 0 rgba(21,32,27,0.04)',
      },
      borderRadius: {
        btn: '6px',
        card: '12px',
        panel: '16px',
      },
    },
  },
  plugins: [],
};
