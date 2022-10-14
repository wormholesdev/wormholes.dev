const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          50: '#f5fbff',
          100: '#d6ecff',
          200: '#a4cdfe',
          300: '#7dabf8',
          400: '#6c8eef',
          500: '#556cd6',
          600: '#3d4eac',
          700: '#2f3d89',
          800: '#212d63',
          900: '#131f41',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              paddingTop: 0,
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: 0,
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
