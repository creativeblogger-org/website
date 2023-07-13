/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/Pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        coco: ["Coco"],
        gears: ["Gears"],
        garamond: ["Garamond"],
        pangolin: ["Pangolin"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography", "@tailwindcss/forms")],
};
