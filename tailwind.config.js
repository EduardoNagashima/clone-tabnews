module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100vw)", opacity: 0 },
          "50%": { transform: "translateX(0vw)", opacity: 1 },
          "100%": { transform: "translateX(100vw)", opacity: 0 },
        },
      },
      animation: {
        slide: "slide 4s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      colors: {},
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
    },
    screen: {
      md: "756px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
