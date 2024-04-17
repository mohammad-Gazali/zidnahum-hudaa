/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'surface': 'var(--md-sys-color-surface)',
      'surface-container': 'var(--md-sys-color-surface-container)',
      'overlay': 'var(--app-overlay-color)',
    },
    extend: {},
  },
  plugins: [],
}

