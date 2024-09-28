/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: 'Lato, sans-serif',
        poppins: 'Poppins, sans-serif',

      },
      colors: {
        primary: "#171717",
        secondary: "#F9BD24",
        highlight: '#446AEF',
        muted: "#D8D8D8"

      },
      boxShadow: {
        'box': '8px 8px rgb(43, 34, 79)'
      }
    },
  },
  plugins: [],
}

