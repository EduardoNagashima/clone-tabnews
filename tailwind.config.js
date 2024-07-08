module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
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
