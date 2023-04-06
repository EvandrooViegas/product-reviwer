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
        "gray": "#CBCBCB"
      },
      borderRadius: {
        "df": "35px"
      }
    },
  },
  plugins: [],
}

