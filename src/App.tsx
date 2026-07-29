import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

// La page de liste d'attente a ete retiree le 29/07/2026 : le produit passe en
// production, les nouveaux venus s'inscrivent directement et beneficient de 7
// jours d'essai. L'URL /waitlist ayant deja ete partagee, elle est redirigee
// vers l'accueil par netlify.toml plutot que de renvoyer une 404.
//
// ATTENTION : les inscrits de la liste d'attente restent en base Supabase
// (table `waitlist`). Ce sont eux qu'on doit gratifier du statut beta-testeur —
// ne pas supprimer cette table.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
