/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Charte HostMate : 90% blanc/anthracite, corail = SEUL accent.
        // L'ancienne palette (bleu/violet/turquoise/orange) contredisait la
        // charte etablie pour le reste du produit — retiree.
        hostmate: {
          // Echantillonnee dans le logo (hosmate_ai/assets/icon/icon.png)
          // le 09/08/2026. La vitrine affichait #E8534A, l'application
          // #FF5A5F, le logo #EC5B63 : trois corails pour une marque.
          primary: "#EC5B63",
          ink: "#1C1C2E",
          background: "#FFFFFF",
          textDark: "#1C1C2E",
          textGrey: "#6B7280",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

