/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#8c75bd",
        },
        danger: {
          500: "red",
        },
        node: {
          background: "#E8E4F0",
          border: "#c0bacd",
          white: "#fff",
          black: "#000",
          gray: "#666",
        },
        toolbar: {
          dark: "#1C2536",
          shadow: "rgba(47, 47, 47, 0.5)",
        },
        canvas: {
          background: "#aaa",
        },
      },
    },
  },
  plugins: [],
};
