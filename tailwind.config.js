/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9FAFC",
        secondary: "#061C49",
        theme: "#0E182D",
      },
    },
  },
  plugins: [],
};
