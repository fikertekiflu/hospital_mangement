/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this covers your files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: using Inter font
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // If you need enhanced form styling
  ],
}