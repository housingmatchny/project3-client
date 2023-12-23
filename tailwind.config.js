/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'yellow': '#FFC93D',
        'pink': '#EE6A7C',
        'white': '#FCFCFC'
      },
      fontFamily: {
        "primary": ['Inter','sans-serif']
      }
    },
  },
  plugins: [require('flowbite/plugin'), require('daisyui')]
}

