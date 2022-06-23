/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        caramel: "var(--caramel)",
        card: "var(--card)",
      },
      colors: {
        caramel: "var(--caramel)",
        card: "var(--card)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
