/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        3: "70px 1fr 100px",
      },
      width: {
        500: "500px",
      },
    },
  },
  plugins: [],
};
