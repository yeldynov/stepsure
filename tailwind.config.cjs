/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        background: "#FFC96F",
        brand: "#FF5500",
        softBrand: "#ED9455",
        dark: "#1E1E1E",

        vibrantPurple: "#A800BE",
        freshGreen: "#00A896",
        sereneTeal: "#008C8C",
        accentRed: "#FF3333",
        playfullYellow: "#FEDC00",

        gray: "#333333",
        calmGray: "#9B9B9B",
        lightWhite: "#FAFAFC",
        grayWhite: "#F3F4F8",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        bhavuka: ["Bhavuka-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
