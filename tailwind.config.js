module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        0: 0,
      },
      boxShadow: {
        none: "none",
      },
      minWidth: {
        xl: "36rem",
      },
      maxWidth: {
        15: "15rem",
        12: "12rem",
      },
      textColor: {
        main: "#2c3e50",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
