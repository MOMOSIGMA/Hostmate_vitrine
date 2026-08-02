import { Component, type ReactNode } from 'react'

// =============================================================================
// Filet de sécurité contre les plantages provoqués par la traduction
// automatique du navigateur.
//
// LE PROBLÈME, CONSTATÉ EN PRODUCTION LE 02/08/2026 :
//
//   Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node':
//   The node to be removed is not a child of this node.
//
// Chrome et Edge, quand ils traduisent une page, remplacent les nœuds texte
// par des éléments <font>. React garde une référence vers les nœuds qu'il a
// créés ; au premier re-rendu il tente d'en retirer un qui n'est plus là où il
// l'avait laissé, et l'arbre entier s'effondre. Page blanche.
//
// LA VRAIE CORRECTION EST AILLEURS — dans App.tsx, où la racine sert désormais
// la langue du visiteur au lieu de l'anglais pour tout le monde. Un
// francophone n'a plus de raison de traduire un site qui existe en français.
//
// Ce composant ne traite donc que le cas résiduel : un visiteur dont la langue
// n'est pas parmi les quatre, qui traduit. Il ne répare rien — il évite
// seulement qu'un plantage de rendu laisse un écran vide.
//
// POURQUOI UN REMONTAGE ET PAS UN MESSAGE D'ERREUR : l'arbre React est
// corrompu, pas la donnée. Le reconstruire de zéro suffit presque toujours, et
// le visiteur ne voit qu'un clignotement au lieu d'une page morte.
//
// UN SEUL ESSAI. Si le remontage échoue à son tour, c'est que le traducteur
// réécrit plus vite que nous ne rendons : réessayer indéfiniment ferait
// clignoter la page sans fin. On sert alors une page lisible, avec le seul
// conseil qui marche vraiment.
// =============================================================================

type Props = { children: ReactNode }
type State = { attempt: number; failed: boolean }

export default class TranslationSafeBoundary extends Component<Props, State> {
  state: State = { attempt: 0, failed: false }

  static getDerivedStateFromError(): Partial<State> | null {
    return null // la décision se prend dans componentDidCatch, qui a l'état
  }

  componentDidCatch() {
    this.setState((s) =>
      s.attempt === 0 ? { attempt: 1, failed: false } : { ...s, failed: true },
    )
  }

  render() {
    if (this.state.failed) {
      return (
        <div
          translate="no"
          className="notranslate min-h-screen flex items-center justify-center p-8 text-center"
        >
          <div style={{ maxWidth: 420 }}>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
              HostMate&nbsp;AI
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#636E72' }}>
              This page does not display correctly with automatic translation
              turned on. Turn it off and reload — the site already exists in
              English, French, Spanish and Italian.
            </p>
            <p style={{ marginTop: 20 }}>
              <a href="/" style={{ color: '#FF5A5F', fontWeight: 600 }}>
                Reload
              </a>
            </p>
          </div>
        </div>
      )
    }

    // La clé force un remontage complet : c'est ce qui reconstruit l'arbre.
    return <div key={this.state.attempt}>{this.props.children}</div>
  }
}
