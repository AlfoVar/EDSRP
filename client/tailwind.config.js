/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg-white': '#F0F0F0',
        'custom-bg-grey': '#E6E6E4',
        'custom-bg-bluegrey': '#6C8A9B',
      },
    },
  },
  plugins: [],
}

