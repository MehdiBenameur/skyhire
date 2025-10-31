/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',     // Bleu aviation
        secondary: '#0ea5e9',   // Bleu clair
        accent: '#f59e0b',      // Orange
      }
    },
  },
  plugins: [],
}