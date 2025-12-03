/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
theme: {
  extend: {
    colors: {
      pastelPink: '#FFC6FF',
      pastelBlue: '#C6EEFF',
      pastelCream: '#FFFAC6',
      pastelMint: '#C6FFC6',
      pastelPeach: '#FFE6C6',
    },
    fontFamily: {
      anime: ['"M PLUS Rounded 1c"', 'sans-serif'],
    },
  },
},

  plugins: [],
}
