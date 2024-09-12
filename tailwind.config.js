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
        // purples: '#6147DB',
        purples: '#1E7DBF',
        oranges: '#F86767',
        greens: '#12BC95',
        teals: '#47C9D7',
        darks: '#0C091C',
        darks2: '#2B224F'
      },
      boxShadow: {
        'box': '8px 8px rgb(43, 34, 79)'
      }
    },
  },
  plugins: [],
}

