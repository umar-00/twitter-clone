module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--twitter-color)",
        secondary: "var(--twitter-background)",
        neutral: "var(--lighter-gray)",
        lightgrayfont: "var(--lightgrayfont)",
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
      minWidth: {
        "75px": "75px",
        "385px": "385px",
      },
      screens: {
        tablet: "950px",
        // => @media (min-width: 950px) { ... }
        mobile: "500px",
        // => @media (min-width: 500px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
