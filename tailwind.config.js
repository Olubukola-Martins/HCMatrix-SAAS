/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        caramel: "var(--caramel)",
        tiger: "var(--tiger)",
        card: "var(--card)",
      },
      colors: {
        caramel: "var(--caramel)",
        tiger: "var(--tiger)",
        card: "var(--card)",
        accent:"var(--accent)"
      },
    },
  },
  plugins: [],
};
