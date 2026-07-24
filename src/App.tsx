import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WaitlistPage from './pages/WaitlistPage'

// "/" est maintenant la vraie page d'accueil (HomePage) ; "/waitlist" reste
// l'URL stable et déjà partagée de la page de capture d'email, inchangée.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
      </Routes>
    </BrowserRouter>
  )
}
