/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'thermal-copper': '#B87333',
        'burnt-orange': '#CC5500',
        'electric-cyan': '#00F0FF',
        'midnight-navy': '#010A1F',
        'vantablack': '#000000',
      },
      fontFamily: {
        'brutalist': ['"Space Grotesk"', 'sans-serif'], // Assuming Space Grotesk for brutalist look
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
