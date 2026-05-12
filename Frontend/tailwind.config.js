/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        'kp-bg':      '#EDF2EF',
        'kp-surface': '#E2EAE5',
        'kp-border':  '#C8D6CC',
        'kp-text':    '#080f0f',
        'kp-muted':   '#5C6B63',
        'kp-accent':  '#0862F3',
      },
    },
  },
  plugins: [],
}
