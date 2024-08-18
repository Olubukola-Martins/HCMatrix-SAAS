/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        caramel: "var(--caramel)",
        card: "var(--card)",
        faded: "var(--faded)",
        mainBg: "var(--background)",
        neutral: "var(--neutral)",
      },
      colors: {
        caramel: "var(--caramel)",
        card: "var(--card)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
      }, 
    },
  },
  plugins: [],
};
