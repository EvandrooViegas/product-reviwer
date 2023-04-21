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
        "glass": "rgba(217, 217, 217, 0.12);",
        "primary": "#6366f1"

      },
      borderRadius: {
        "DEFAULT": "35px"
      },
      fontFamily: {
        "df": ['Poppins', 'Helvetica']
      }
    },
  },
  plugins: [],
}

