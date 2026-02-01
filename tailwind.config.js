/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hostmate: {
          primary: "#FF5A5F",
          aiBlue: "#2196F3",
          checkIn: "#00BFA5",
          satisfaction: "#7C4DFF",
          checkOut: "#FF9100",
          background: "#F5F7FA",
          textDark: "#2D3436",
          textGrey: "#636E72",
        },
      },
    },
  },
  plugins: [],
}

