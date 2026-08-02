import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
// ── LA RACINE SUIT LA LANGUE DU VISITEUR ────────────────────────────────────
// PROBLÈME RÉSOLU LE 02/08/2026 — et il causait une PAGE BLANCHE.
//
// La racine servait l'anglais à tout le monde. Un visiteur francophone
// arrivait donc sur une page anglaise, son navigateur lui proposait de
// traduire, il acceptait — et le site plantait :
//
//   Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node'
//
// C'est l'incompatibilité connue entre React et les traducteurs de
// navigateur : Chrome et Edge remplacent les nœuds texte par des <font>,
// React ne retrouve plus ceux qu'il a créés, et l'arbre s'effondre. Page
// blanche.
//
// La vraie cause n'était pas React : c'était de servir la mauvaise langue à
// quelqu'un dont on parle la sienne. Le site existe en quatre langues — un
// francophone ne devrait jamais avoir de raison de le faire traduire.
//
// POURQUOI UNE REDIRECTION ET PAS UN BANDEAU : le visiteur qui voit une page
// dans une langue qu'il ne lit pas ne cherche pas un sélecteur, il traduit ou
// il part. Le bandeau arrive trop tard.
//
// ⚠️ CE QUI PROTÈGE LE RÉFÉRENCEMENT :
//   • On ne redirige QUE la racine. /fr, /es, /it restent servies telles
//     quelles, donc indexables dans leur langue.
//   • Un choix explicite de l'hôte est mémorisé et prime sur le navigateur —
//     personne n'est renvoyé de force vers une langue qu'il vient de quitter.
//   • replace: true — la redirection ne pollue pas l'historique, le bouton
//     Retour ramène au site précédent et non dans une boucle.
const LANG_ROUTES: Record<string, string> = { fr: '/fr', es: '/es', it: '/it' }
const LANG_CHOICE_KEY = 'hm_lang_choice'

function RootRedirect() {
  const target = (() => {
    try {
      // Un choix explicite prime toujours sur la langue du navigateur.
      const chosen = localStorage.getItem(LANG_CHOICE_KEY)
      if (chosen && LANG_ROUTES[chosen]) return LANG_ROUTES[chosen]
      if (chosen === 'en') return null
    } catch {
      // Stockage indisponible (navigation privée stricte) : on se rabat sur
      // la langue du navigateur, ce qui reste mieux que l'anglais par défaut.
    }
    const browser = (navigator.language || '').slice(0, 2).toLowerCase()
    return LANG_ROUTES[browser] ?? null
  })()

  if (target) return <Navigate to={target} replace />
  return <HomePage lang="en" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/fr" element={<HomePage lang="fr" />} />
        <Route path="/es" element={<HomePage lang="es" />} />
        <Route path="/it" element={<HomePage lang="it" />} />
        {/* Toute autre URL retombe sur l'accueil plutot qu'une page vide. */}
        <Route path="*" element={<HomePage lang="en" />} />
      </Routes>
    </BrowserRouter>
  )
}
