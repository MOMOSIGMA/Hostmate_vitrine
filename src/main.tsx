import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TranslationSafeBoundary from './components/TranslationSafeBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Voir TranslationSafeBoundary : la traduction automatique du navigateur
        corrompt l'arbre React et provoquait une page blanche en production.
        La correction de fond est dans App.tsx — la racine sert désormais la
        langue du visiteur au lieu de l'anglais pour tout le monde. Ceci n'est
        que le filet pour les langues qu'on ne parle pas. */}
    <TranslationSafeBoundary>
      <App />
    </TranslationSafeBoundary>
  </StrictMode>,
)
