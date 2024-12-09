/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors : {
        primaryColor : '#18676C',
        secondaryColor : '#000',
        customGreenColor : '#4A9D93',
        errorValidation : '#dc3545',
      }
    },
  },
  plugins: [],
}
