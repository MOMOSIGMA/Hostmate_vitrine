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
//
// ── UNE URL PAR LANGUE ──────────────────────────────────────────────────────
// Sans URL distincte, Google n'indexe qu'UNE version du site : impossible de
// ressortir sur une recherche espagnole ou italienne, quel que soit le
// contenu. La langue etait choisie en JavaScript depuis navigator.language,
// donc totalement invisible pour un moteur de recherche.
//
// La racine sert l'anglais (marche le plus large) et porte le x-default ;
// /fr, /es et /it servent leur langue. Les balises hreflang de index.html
// relient les quatre versions entre elles.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage lang="en" />} />
        <Route path="/fr" element={<HomePage lang="fr" />} />
        <Route path="/es" element={<HomePage lang="es" />} />
        <Route path="/it" element={<HomePage lang="it" />} />
        {/* Toute autre URL retombe sur l'accueil plutot qu'une page vide. */}
        <Route path="*" element={<HomePage lang="en" />} />
      </Routes>
    </BrowserRouter>
  )
}
