module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--twitter-color)",
        secondary: "var(--twitter-background)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
