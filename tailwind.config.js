const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Medical Blue (Sky)
        blue: colors.sky,
        // Clinical Green (Teal)
        emerald: colors.teal,
        purple: colors.indigo,
        // Neutral clean gray instead of slate
        slate: colors.gray
      }
    },
  },
  plugins: [],
}
