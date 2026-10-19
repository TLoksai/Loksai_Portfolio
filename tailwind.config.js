module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "#080412", // Your primary background color
        // Lighter secondary greys so body text passes WCAG AA (4.5:1) on the dark #060a0a background
        gray: { 500: "#8d96a5", 600: "#7d8797", 700: "#747e8e" },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

