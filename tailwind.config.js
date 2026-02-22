/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'loader-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'loader-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.92)' },
        },
        'loader-fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'loader-spin': 'loader-spin 0.8s linear infinite',
        'loader-pulse': 'loader-pulse 2s ease-in-out infinite',
        'loader-fade-out': 'loader-fade-out 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}