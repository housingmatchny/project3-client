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
      },
      button: {
        "mainBtn":[
          'focus:outline-none', 'text-white', 'bg-purple-700', 'hover:bg-purple-800', 'focus:ring-4', 'focus:ring-purple-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'mb-2', 'dark:bg-purple-600', 'dark:hover:bg-purple-700', 'dark:focus:ring-purple-900'
        ].join(' ')
      }
    },
  },
  plugins: [require('flowbite/plugin'), require('daisyui')]
}

