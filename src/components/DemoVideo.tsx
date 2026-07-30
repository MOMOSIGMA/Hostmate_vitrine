import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import BrowserFrame from './BrowserFrame'

// ─── Démo produit — se comporte comme un élément vivant de la page ────────
// Pas de barre de lecteur, pas de gros bouton play : la vidéo démarre
// silencieusement et en boucle dès qu'elle entre dans le viewport, exactement
// comme le diagramme animé plus bas — elle doit se lire comme "une partie
// du site qui bouge", pas "un lecteur vidéo posé dessus". Le son reste
// disponible via une icône discrète (coin de la fenêtre), pas imposé.
// Le bouton "ralentir" reste — il répond à un vrai problème (le rythme de
// la vidéo est rapide), indépendant du style du lecteur.

const L: Record<string, string>[] = [
  { fr: 'Activer le son', en: 'Unmute', es: 'Activar el sonido', it: 'Attiva audio' },
  { fr: 'Couper le son', en: 'Mute', es: 'Silenciar', it: 'Disattiva audio' },
]

const SPEED_ON: Record<string, string> = {
  fr: '🐢 Vitesse ralentie (0.6×)',
  en: '🐢 Slowed down (0.6×)',
  es: '🐢 Velocidad reducida (0.6×)',
  it: '🐢 Velocità ridotta (0.6×)',
}

const SPEED_OFF: Record<string, string> = {
  fr: 'Ça va trop vite ? Ralentir',
  en: 'Going too fast? Slow it down',
  es: '¿Demasiado rápido? Ralentizar',
  it: 'Troppo veloce? Rallenta',
}

export default function DemoVideo({ lang }: { lang: 'fr' | 'en' | 'es' | 'it' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.5 })
  const [muted, setMuted] = useState(true)
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView])

  const toggleSlow = () => {
    const v = videoRef.current
    if (!v) return
    const next = !slow
    setSlow(next)
    v.playbackRate = next ? 0.6 : 1
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto">
      <BrowserFrame url="hosmateai.com/app · demo">
        <div className="relative flex justify-center bg-hostmate-ink/[0.02]">
          <video
            ref={videoRef}
            src="/video_demo_addguest.mp4"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="block w-auto h-auto max-w-full max-h-[60vh]"
          />
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? (L[0][lang]) : (L[1][lang])}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-hostmate-ink/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-hostmate-ink/80 transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </BrowserFrame>

      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={toggleSlow}
          className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
            slow
              ? 'bg-hostmate-primary text-white border-hostmate-primary'
              : 'border-hostmate-ink/15 text-hostmate-textGrey hover:text-hostmate-ink'
          }`}
        >
          {slow ? SPEED_ON[lang] : SPEED_OFF[lang]}
        </button>
      </div>
    </div>
  )
}
