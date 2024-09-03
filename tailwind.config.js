/** @type {import('tailwindcss').Config} */
export default {
 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "corporate", "luxury", "winter","dark","black"],
 
    extend: {
      fontFamily: {
        roboto: "'Roboto', serif"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

