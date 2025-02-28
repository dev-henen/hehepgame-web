/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'background': 'rgb(22, 21, 24)',
        'background-secondary': 'rgb(19, 18, 20)',
        'background-tertiary': 'rgb(23, 22, 24)',
        'overlay': '#101010',
        'primary': 'rgb(128, 243, 75)',
        'primary-hover': 'rgb(97, 199, 50)',
        'primary-dark': 'rgb(88, 170, 49)',
        'secondary': 'rgb(187, 127, 48)',
        'text': '#f3f3f3',
        'text-muted': '#808080',
        'text-dark': '#606060',
        'scrollbar-track': '#412653',
        'scrollbar-thumb': '#3F567F',
        'scrollbar-border': '#D174D2',
        'scrollbar-hover': '#E0563F',
        'tag-red': 'rgb(231, 39, 71)',
        'tag-yellow': 'rgb(231, 170, 39)',
        'tag-green': 'rgb(39, 231, 55)',
        'error': '#E0563F',
      },
      fontFamily: {
        'base': ['Arial', 'Helvetica', 'sans-serif', 'EMOJIS'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, rgb(128, 243, 75), rgb(187, 127, 48))',
      },
      keyframes: {
        requestIndicator: {
          '0%, 50%': { backgroundColor: 'rgb(128, 243, 75)' },
          '100%': { backgroundColor: 'rgb(191, 255, 161)' }
        }
      },
      animation: {
        'request-indicator': 'requestIndicator 0.75s linear infinite',
        'request-indicator-delay-1': 'requestIndicator 0.75s linear 0.25s infinite',
        'request-indicator-delay-2': 'requestIndicator 0.75s linear 0.5s infinite',
      }
    },
  },
  plugins: [],
}