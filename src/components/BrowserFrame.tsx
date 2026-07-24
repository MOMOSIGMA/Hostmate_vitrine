import type { ReactNode } from 'react'

// ─── Fenêtre navigateur stylisée — pas une capture externe ─────────────────
// Même logique que PhoneFrame : recréer le "chrome" (barre de fenêtre,
// pastilles, barre d'adresse) en HTML/CSS plutôt que de coller une vidéo
// brute — ça fait immédiatement "élément d'interface du site" plutôt que
// "lecteur multimédia posé dessus". Barre d'adresse simplifiée sur mobile
// (moins de place, moins de détail nécessaire).
export default function BrowserFrame({ children, url = 'hosmateai.com/app' }: { children: ReactNode; url?: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-hostmate-ink/10 bg-white shadow-[0_30px_70px_-24px_rgba(28,28,46,0.3)]">
      {/* Barre de fenêtre */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-hostmate-ink/[0.03] border-b border-hostmate-ink/10">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-hostmate-ink/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-hostmate-ink/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-hostmate-ink/15" />
        </div>
        <div className="hidden sm:flex flex-1 justify-center">
          <span className="text-[11px] text-hostmate-textGrey bg-white border border-hostmate-ink/10 rounded-full px-4 py-1 max-w-[220px] truncate">
            {url}
          </span>
        </div>
      </div>
      {children}
    </div>
  )
}
