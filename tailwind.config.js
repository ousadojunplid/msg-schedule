/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './pages/**/*.{html,js}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "1": "#000706",
        "2": "#00272d",
        "3": "#134647",
        "4": "#0c7e7e",
        "5": "#EBF1F2",
        "6": "#fdfdfd",
        "7": "rgba(3, 105, 161, 1)",
        "8": "#EFFFFF",
        "primary": "#003496",
        "secundary": "#03276C"
      },
      colors: {
        "primary": "#003496",
        "secundary": "#03276C"
      },
      borderColor: {
        "primary": "#003496",
        "secundary": "#03276C"
      }
    },
  },
  plugins: [],
}

