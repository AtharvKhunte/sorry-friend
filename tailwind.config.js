/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        friendly: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        pastelPink: "#ffd6e0",
        pastelBlue: "#a2d2ff",
        pastelPurple: "#cdb4db",
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(to bottom right, #fbc2eb, #a6c1ee)',
      },
    },
  },
  plugins: [],
};
