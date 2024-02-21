/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'yellow': '#FFE100',
        'black-2': '#141414', // secondary black
        'custom-gray': '#4F4F4F',
      },
    },
  },
  plugins: [],
}

