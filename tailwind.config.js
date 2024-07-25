/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-login": "url(/assets/bg-login.png)",
      },
      colors: {
        primary: "#0663EC",
        secondary: "#01CDFF",
        dark: "#0F0F35",
        soft: "#CCE6FF",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
