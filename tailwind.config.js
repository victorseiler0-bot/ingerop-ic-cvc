/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ingerop: {
          blue: '#003A7A',
          lightblue: '#0066CC',
          green: '#00A86B',
          orange: '#E8650A',
          gray: '#F4F6F9',
        },
      },
    },
  },
  plugins: [],
}
