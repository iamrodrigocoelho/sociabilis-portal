/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff4f00',
        canvas: {
          DEFAULT: '#fffefb',
          soft: '#f8f4f0',
        },
        ink: {
          DEFAULT: '#201515',
          soft: '#2f2a26',
          mid: '#36342e',
        },
        body: {
          DEFAULT: '#605d52',
          mid: '#939084',
        },
        mute: '#c5c0b1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
