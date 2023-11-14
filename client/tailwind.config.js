/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19FF4A', // green
        secondary: {
          light: '#E4E5EA', // light gray
          default: '#e5e7eb',
          dark: '#D2D2D4', // dark gray
        },
      },
    },

},
  plugins: [],
}