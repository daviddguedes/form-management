module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
