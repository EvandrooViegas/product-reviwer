/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary": "#939DFF",
        "gray": "#CBCBCB",
        "glass": "rgba(217, 217, 217, 0.12);"

      },
      borderRadius: {
        "df": "35px"
      },
      fontFamily: {
        "df": ['Poppins', 'Helvetica']
      }
    },
  },
  plugins: [],
}

