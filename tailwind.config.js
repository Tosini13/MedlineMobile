/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        "primary-accent": "#F5F7FF",
        "primary-accent-2": "#DFE1E7",
        secondary: "#041A41",
        "secondary-accent": "#7E89A0",
        tint: "#036DFF",
      },
    },
  },
  plugins: [],
};
