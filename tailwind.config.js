/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F0F8FF',
          200: '#d8eafa',
          300: '#93c0e7',
          400: '#4796da',
          500: '#2a7fc9',
          600: '#156fbd',
          700: '#0c4c83',
          800: '#063257',
          900: '#021e34'
        },
        surface: {
          DEFAULT: '#8484A3',
          light: '#DEEDF3',
          dark: '#26263E'
        },
      }
    },
  },
  plugins: [],
}

