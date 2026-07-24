import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Brain, Languages, User } from 'lucide-react'

// ─── Le diagramme signature de la page ─────────────────────────────────────
// Se déclenche UNIQUEMENT au survol (pas automatiquement au scroll) — repos
// sur l'étape 0, l'animation complète ne joue qu'une fois la souris dessus,
// se réinitialise en quittant. Exemple volontairement choisi pour ne rien
// laisser croire que l'app suit des données externes qu'elle ne suit pas
// réellement (ex: statut d'un vol) — ici uniquement du texte fourni par
// l'hôte lui-même, transformé et traduit. Un seul accent corail (Hosty +
// le point qui glisse), tout le reste reste anthracite/gris.

type Stage = 0 | 1 | 2 | 3

const STAGES: Record<Stage, { fr: string; en: string; label: { fr: string; en: string } }> = {
  0: {
    fr: 'wifi en panne, voyageur stressé',
    en: 'wifi is down, guest is stressed',
    label: { fr: "L'hôte note l'essentiel", en: 'Host jots the essentials' },
  },
  1: {
    fr: 'Comprend le contexte : problème technique, ton rassurant nécessaire…',
    en: 'Understands the context: technical issue, needs a reassuring tone…',
    label: { fr: 'Hosty analyse la situation', en: 'Hosty reads the situation' },
  },
  2: {
    fr: 'Traduit et adapte au ton personnel de l’hôte…',
    en: 'Translates and adapts to the host’s own tone…',
    label: { fr: 'Traduction + personnalisation', en: 'Translation + personalization' },
  },
  3: {
    fr: "Hi Alex — so sorry about the wifi! I've just restarted the router, it should be back within 5 minutes. Let me know if it's still down after that 🙏",
    en: "Hi Alex — so sorry about the wifi! I've just restarted the router, it should be back within 5 minutes. Let me know if it's still down after that 🙏",
    label: { fr: 'Le voyageur reçoit, dans sa langue', en: 'The guest receives it, in their language' },
  },
}

// Position (en % de la largeur de la rangée) de chaque nœud, pour faire
// glisser le point corail exactement d'un centre de carte au suivant.
const NODE_LEFT_PCT = [8, 36.6, 63.4, 92]

// Durée de chaque étape pendant la lecture au survol — assez lente pour
// suivre le texte le plus long (l'étape finale) sans avoir à re-hover.
const STAGE_DURATION_MS = 2600

function Node({
  icon, title, active, accent,
}: { icon: React.ReactNode; title: string; active: boolean; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 relative z-10">
      <motion.div
        animate={{
          scale: active ? 1.08 : 1,
          boxShadow: active
            ? accent
              ? '0 0 0 6px rgba(232,83,74,0.12), 0 20px 40px -12px rgba(232,83,74,0.35)'
              : '0 0 0 6px rgba(28,28,46,0.06), 0 16px 32px -12px rgba(28,28,46,0.2)'
            : '0 0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl flex items-center justify-center border ${
          accent
            ? 'bg-hostmate-primary border-hostmate-primary text-white'
            : 'bg-white border-hostmate-ink/10 text-hostmate-ink'
        }`}
      >
        {icon}
      </motion.div>
      <span className="text-[11px] sm:text-xs font-medium text-hostmate-textGrey text-center max-w-[6rem] leading-tight">
        {title}
      </span>
    </div>
  )
}

export default function MessageFlow({ lang }: { lang: 'fr' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState<Stage>(0)
  const [hovering, setHovering] = useState(false)

  // Lecture complète 0 → 1 → 2 → 3 UNE FOIS par survol, puis reste sur 3
  // tant que la souris est dessus. Se réinitialise à la sortie, prêt pour
  // le prochain survol.
  useEffect(() => {
    if (!hovering) {
      setStage(0)
      return
    }
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    ;([1, 2, 3] as Stage[]).forEach((s, i) => {
      timers.push(setTimeout(() => {
        if (!cancelled) setStage(s)
      }, STAGE_DURATION_MS * (i + 1)))
    })
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [hovering])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => setHovering(true)}
      className="relative max-w-3xl mx-auto cursor-pointer sm:cursor-default"
    >
      {!hovering && (
        <p className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-hostmate-textGrey whitespace-nowrap">
          {lang === 'fr' ? 'Survolez pour voir la transformation ↓' : 'Hover to see it happen ↓'}
        </p>
      )}

      {/* ── Ligne de connexion ── */}
      <div className="absolute top-7 sm:top-9 left-[8%] right-[8%] h-px bg-hostmate-ink/10" />
      <motion.div
        className="absolute top-7 sm:top-9 left-[8%] h-px bg-hostmate-primary/40 origin-left"
        animate={{ scaleX: hovering ? 1 : 0 }}
        transition={{ duration: STAGE_DURATION_MS * 3 / 1000, ease: 'easeInOut' }}
        style={{ width: '84%' }}
      />
      {/* ── Point corail qui glisse d'un nœud au suivant ── */}
      <motion.div
        className="absolute top-7 sm:top-9 w-2.5 h-2.5 rounded-full bg-hostmate-primary shadow-[0_0_10px_rgba(232,83,74,0.7)] -translate-x-1/2 -translate-y-1/2"
        animate={{ left: `${NODE_LEFT_PCT[stage]}%` }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── 4 nœuds ── */}
      <div className="flex items-start justify-between px-1 sm:px-4">
        <Node icon={<Home size={22} />} title={lang === 'fr' ? 'Vous' : 'You'} active={stage === 0} />
        <Node icon={<Brain size={22} />} title={lang === 'fr' ? 'Analyse' : 'Understands'} active={stage === 1} accent />
        <Node icon={<Languages size={22} />} title={lang === 'fr' ? 'Traduction' : 'Translates'} active={stage === 2} accent />
        <Node icon={<User size={22} />} title={lang === 'fr' ? 'Le voyageur' : 'The guest'} active={stage === 3} />
      </div>

      {/* ── Carte message qui change selon l'étape ── */}
      <div className="mt-10 sm:mt-12 min-h-[92px] flex flex-col items-center justify-center px-4">
        {stage === 3 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-hostmate-textGrey flex items-center gap-1.5"
          >
            ✉️ {lang === 'fr' ? 'Envoyé par email' : 'Sent by email'}
          </motion.span>
        )}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`w-full max-w-md rounded-2xl border px-5 py-4 text-sm leading-relaxed ${
            stage === 1 || stage === 2
              ? 'border-hostmate-primary/25 bg-hostmate-primary/[0.04] text-hostmate-primary italic'
              : 'border-hostmate-ink/10 bg-white text-hostmate-ink shadow-[0_12px_30px_-16px_rgba(28,28,46,0.25)]'
          }`}
        >
          {STAGES[stage][lang]}
        </motion.div>
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-hostmate-ink">
        {STAGES[stage].label[lang]}
      </p>
    </div>
  )
}
