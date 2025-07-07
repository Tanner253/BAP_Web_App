/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#ffde00',
        'brand-purple': '#2c0a4a',
        'brand-pink': '#ec4899',
        'brand-orange': '#F39C12',
        'brand-orange-dark': '#E67E22',
        'dark-bg': '#1a1a1a',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 