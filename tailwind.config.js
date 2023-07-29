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
          "70%": {
            opacity: 1,
            transform: "scale(1.5)",
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
        rebound: {
          "0%": {
            opacity: 0,
            transform: "scale(0)",
          },
          "70%": {
            opacity: 1,
            transform: "scale(1.2)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        enlarge: {
          "0%": {
            opacity: 0,
            transform: "scale(0)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "star-rotate": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
