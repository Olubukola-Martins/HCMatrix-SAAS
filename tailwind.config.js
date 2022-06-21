/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        carmel: "var(--caramel)",
        tiger: "var(--tiger)",
        card: "var(--card)",
      },
      colors: {
        carmel: "var(--caramel)",
        tiger: "var(--tiger)",
        card: "var(--card)",
      },
    },
  },
  plugins: [],
};
