import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WaitlistPage from './pages/WaitlistPage'

// Coquille de routage du site vitrine. Pour l'instant "/" et "/waitlist"
// pointent tous les deux vers la page de capture d'email (comportement
// identique à avant, zéro changement visuel) — quand la vraie page
// d'accueil du SaaS sera prête, elle prendra la route "/" et "/waitlist"
// restera l'URL stable de la page de capture, déjà partagée/référencée.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitlistPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
      </Routes>
    </BrowserRouter>
  )
}
