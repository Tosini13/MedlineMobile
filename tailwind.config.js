/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        "primary-accent": "#DFE1E7",
        secondary: "#041A41",
        "secondary-accent": "#7E89A0",
        tertiary: "#036DFF",
      },
    },
  },
  plugins: [],
};
