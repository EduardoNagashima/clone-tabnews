module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        textGradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
      colors: {
        customRed: {
          DEFAULT: "rgb(196, 12, 12)",
          gradient:
            "linear-gradient(45deg, rgba(196, 12, 12, 1) 0%, rgba(255, 101, 0, 1) 100%)",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
