/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  purge: [ './src/**/*.html', './src/**/*.vue', './src/**/*.jsx', ],
  theme: {
    extend: {
      colors: {
        'gray': '#E0E1DD',
        'blue': {
          'light': '#778DA9',
          'DEFAULT': '#415A77',
          'dark': '#1B263B',
          'darkest': '#0D1B2A',
          'variant': '#334c7d'
        }
      },
    },
  },
  plugins: [],
}