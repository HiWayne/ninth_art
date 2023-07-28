/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "star-show": {
          "0%": {
            opacity: 0,
            transform: "scale(0)",
          },
          "80%": {
            opacity: 1,
            transform: "scale(1.3)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "inactive-star-show": {
          "0%": {
            opacity: 0,
            transform: "scale(0)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "opacity-show": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
