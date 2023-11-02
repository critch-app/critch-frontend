/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'active-green': '#04E013',
      'secondry-gray': '#9095A4',
      'primary-grey': '#B6B9C3',
      'soft-purble': '#8472FC',
      'hard-purble': '#A555B2',
      'soft-white': '#F0F0FB',
      'hard-white': '#F6F6FD'
    },

    extend: {
      fontFamily: {
        primary: ['Roboto']
      }
    }
  },
  plugins: []
}
