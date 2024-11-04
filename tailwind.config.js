/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    extend: {
      colors: {
        morning: '#FDA758',
        sunset: '#F65B4E',
        twilight: '#29319F',
        fog: '#FFDEF',
        eclipse: '#573353',
        hero: '#FFF2E9',
        success: '#07bc0c',
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
