/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        atom: {
          blue: '#0E61AE',
          'blue-dark': '#00274F',
          'blue-light': '#1E73BE',
          yellow: '#FBD232',
          'yellow-hover': '#e5be1e',
          dark: '#090D16',
          card: '#111827',
          gray: '#F8FAFC',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
