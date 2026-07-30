import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, Layers, Brain, Languages, RefreshCw, User, Zap } from 'lucide-react'

// ─── Le diagramme signature de la page ─────────────────────────────────────
// 6 étapes en une seule rangée, TOUJOURS (jamais d'empilement sur mobile —
// icônes et connecteurs juste plus petits) : représente le vrai pipeline —
// rassembler le contexte (logement, voyageur, météo), analyser, rédiger
// dans la langue du voyageur, produire le miroir dans la langue de l'hôte.
// Un point corail glisse le long de chaque connecteur au moment où le flux
// le traverse (façon "électricité dans un fil"). Boucle en continu tant que
// la section est visible à l'écran, s'arrête proprement en sortant du
// viewport. Un seul accent corail, tout le reste anthracite/gris.

type Lang = 'fr' | 'en' | 'es' | 'it'
type Stage = 0 | 1 | 2 | 3 | 4 | 5

const GUEST_MSG_EN =
  "Hi Alex, welcome! Quick heads-up before you arrive: heavy rain is forecast for tomorrow afternoon, so you might want to grab an umbrella 🌧️. The loft is at 12 Rue des Rosiers, Le Marais — here's the map 📍. The door code is 4821B, and the wifi is 'Marais_Loft' (password: bonjour75). Please don't hesitate to reach out if you need anything at all — hope you have a wonderful stay!"
const GUEST_MSG_FR =
  "Bonjour Alex, bienvenue ! Petite info utile avant votre arrivée : de fortes pluies sont prévues demain après-midi, pensez à prendre un parapluie 🌧️. Le loft se trouve au 12 rue des Rosiers, Le Marais — voici le plan d'accès 📍. Le code de la porte est 4821B, et le wifi est « Marais_Loft » (mot de passe : bonjour75). N'hésitez surtout pas si vous avez besoin de quoi que ce soit — je vous souhaite un très beau séjour !"

// La langue du voyageur et celle de l'hôte sont toujours différentes dans
// la démo, quel que soit l'affichage du site — sinon le miroir ne
// démontrerait rien. Site en FR → voyageur EN / miroir FR. Site en EN →
// voyageur FR / miroir EN.
type StageText = Record<Lang, string>

// Le message montre a l'ecran est TOUJOURS dans une langue differente de
// l'interface : c'est la demonstration meme du produit — l'hote ecrit dans sa
// langue, le voyageur recoit dans la sienne. On affiche donc l'anglais aux
// francophones et le francais aux autres, puis le miroir dans l'autre sens.
function buildStages(lang: Lang) {
  const guestMsg = lang === 'fr' ? GUEST_MSG_EN : GUEST_MSG_FR
  const mirrorMsg = lang === 'fr' ? GUEST_MSG_FR : GUEST_MSG_EN

  const S: Record<Stage, StageText & { label: StageText }> = {
    0: {
      fr: 'arrivée demain 15h, Loft Le Marais',
      en: 'arrival tomorrow 3pm, Le Marais Loft',
      es: 'llegada mañana 15h, Loft Le Marais',
      it: 'arrivo domani 15h, Loft Le Marais',
      label: {
        fr: "L'hôte note l'essentiel",
        en: 'Host jots the essentials',
        es: 'El anfitrión anota lo esencial',
        it: "L'host annota l'essenziale",
      },
    },
    1: {
      fr: 'Rassemble le contexte : logement, profil du voyageur, météo locale…',
      en: 'Gathers context: the property, the guest profile, local weather…',
      es: 'Reúne el contexto: alojamiento, perfil del huésped, tiempo local…',
      it: "Raccoglie il contesto: alloggio, profilo dell'ospite, meteo locale…",
      label: {
        fr: 'Hosty prépare le contexte',
        en: 'Hosty gathers the context',
        es: 'Hosty prepara el contexto',
        it: 'Hosty prepara il contesto',
      },
    },
    2: {
      fr: 'Analyse la situation et le ton à adopter…',
      en: 'Analyzes the situation and the tone to use…',
      es: 'Analiza la situación y el tono adecuado…',
      it: 'Analizza la situazione e il tono da adottare…',
      label: {
        fr: 'Hosty analyse',
        en: 'Hosty reasons',
        es: 'Hosty analiza',
        it: 'Hosty analizza',
      },
    },
    3: {
      fr: guestMsg, en: guestMsg, es: guestMsg, it: guestMsg,
      label: {
        fr: 'Message rédigé, dans sa langue',
        en: "Written, in the guest's language",
        es: 'Mensaje redactado, en su idioma',
        it: 'Messaggio scritto, nella sua lingua',
      },
    },
    4: {
      fr: mirrorMsg, en: mirrorMsg, es: mirrorMsg, it: mirrorMsg,
      label: {
        fr: 'Miroir — pour vérifier ce qui a été envoyé',
        en: 'Mirror — so you can check what was sent',
        es: 'Espejo — para comprobar lo que se ha enviado',
        it: 'Specchio — per verificare cosa è stato inviato',
      },
    },
    5: {
      fr: '✓ Envoyé automatiquement, sans intervention de votre part.',
      en: '✓ Sent automatically, with no action needed from you.',
      es: '✓ Enviado automáticamente, sin que tengas que hacer nada.',
      it: '✓ Inviato automaticamente, senza alcun intervento da parte tua.',
      label: {
        fr: 'Livré', en: 'Delivered', es: 'Entregado', it: 'Consegnato',
      },
    },
  }
  return S
}

function Node({
  icon, active, accent, connector, connectorActive,
}: { icon: React.ReactNode; active: boolean; accent?: boolean; connector?: boolean; connectorActive?: boolean }) {
  return (
    <div className="relative flex items-center shrink-0">
      <motion.div
        animate={{
          scale: active ? 1.1 : 1,
          boxShadow: active
            ? accent
              ? '0 0 0 4px rgba(232,83,74,0.12), 0 10px 22px -8px rgba(232,83,74,0.35)'
              : '0 0 0 4px rgba(28,28,46,0.06), 0 10px 20px -8px rgba(28,28,46,0.2)'
            : '0 0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`relative z-10 w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center border shrink-0 ${
          accent
            ? 'bg-hostmate-primary border-hostmate-primary text-white'
            : 'bg-white border-hostmate-ink/10 text-hostmate-ink'
        }`}
      >
        {icon}
      </motion.div>

      {connector && (
        <div className="relative w-3 sm:w-8 h-0 shrink-0">
          <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-hostmate-ink/15" />
          {connectorActive && (
            <motion.div
              key="dot"
              className="absolute top-0 w-1.5 h-1.5 rounded-full bg-hostmate-primary shadow-[0_0_6px_rgba(232,83,74,0.8)] -translate-y-1/2"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.6, ease: 'linear' }}
            />
          )}
        </div>
      )}
    </div>
  )
}

const STAGE_DURATION_MS = 2800
const FINAL_PAUSE_MS = 2200

const L: Record<string, string>[] = [
  { fr: 'Vous', en: 'You', es: 'Tu', it: 'Tu' },
  { fr: 'Contexte', en: 'Context', es: 'Contexto', it: 'Contesto' },
  { fr: 'Analyse', en: 'Reasoning', es: 'Analisis', it: 'Analisi' },
  { fr: 'Message', en: 'Message', es: 'Mensaje', it: 'Messaggio' },
  { fr: 'Miroir', en: 'Mirror', es: 'Espejo', it: 'Specchio' },
  { fr: 'Voyageur', en: 'Guest', es: 'Huesped', it: 'Ospite' },
  { fr: 'Tout ceci peut tourner automatiquement', en: 'All of this can run automatically', es: 'Todo esto puede funcionar automaticamente', it: 'Tutto questo puo funzionare automaticamente' },
  { fr: 'Envoyé par email', en: 'Sent by email', es: 'Enviado por email', it: 'Inviato via email' },
  { fr: 'Copie miroir', en: 'Mirror copy', es: 'Copia espejo', it: 'Copia specchio' },
  { fr: 'Automatique', en: 'Automatic', es: 'Automatico', it: 'Automatico' },
]

export default function MessageFlow({ lang }: { lang: 'fr' | 'en' | 'es' | 'it' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })
  const [stage, setStage] = useState<Stage>(0)
  const STAGES = buildStages(lang)

  // Boucle continue tant que la section reste visible ; s'arrête net dès
  // qu'on scrolle hors de vue, repart de zéro au prochain passage.
  useEffect(() => {
    if (!inView) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const runCycle = (s: Stage) => {
      if (cancelled) return
      const delay = s === 5 ? FINAL_PAUSE_MS : STAGE_DURATION_MS
      timer = setTimeout(() => {
        if (cancelled) return
        const next = ((s + 1) % 6) as Stage
        setStage(next)
        runCycle(next)
      }, delay)
    }

    setStage(0)
    runCycle(0)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [inView, lang])

  const nodes = [
    { icon: <Home size={15} />, title: L[0][lang], accent: false },
    { icon: <Layers size={15} />, title: L[1][lang], accent: true },
    { icon: <Brain size={15} />, title: L[2][lang], accent: true },
    { icon: <Languages size={15} />, title: L[3][lang], accent: true },
    { icon: <RefreshCw size={15} />, title: L[4][lang], accent: true },
    { icon: <User size={15} />, title: L[5][lang], accent: false },
  ]

  return (
    <div ref={ref} className="relative max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-hostmate-primary bg-hostmate-primary/[0.08] rounded-full px-3 py-1">
          <Zap size={12} /> {L[6][lang]}
        </span>
      </div>

      {/* ── Nœuds + connecteurs — toujours en une seule rangée ── */}
      <div className="flex items-center justify-center px-1 overflow-hidden">
        {nodes.map((n, i) => (
          <Node
            key={i}
            icon={n.icon}
            active={stage === i}
            accent={n.accent}
            connector={i < nodes.length - 1}
            connectorActive={stage === i + 1}
          />
        ))}
      </div>
      {/* Libellés, alignés sous chaque nœud */}
      <div className="flex items-start justify-center px-1 mt-2">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center">
            <span
              className={`w-8 sm:w-11 text-center text-[8px] sm:text-[10px] font-medium leading-tight ${
                stage === i ? 'text-hostmate-ink font-semibold' : 'text-hostmate-textGrey'
              }`}
            >
              {n.title}
            </span>
            {i < nodes.length - 1 && <span className="w-3 sm:w-8 shrink-0" />}
          </div>
        ))}
      </div>

      {/* ── Carte message qui change selon l'étape ── */}
      <div className="mt-10 min-h-[92px] flex flex-col items-center justify-center px-4">
        {stage >= 3 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-hostmate-textGrey flex items-center gap-1.5"
          >
            {stage === 3 && `✉️ ${L[7][lang]}`}
            {stage === 4 && `🪞 ${L[8][lang]}`}
            {stage === 5 && `⚡ ${L[9][lang]}`}
          </motion.span>
        )}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`w-full max-w-lg rounded-2xl border px-5 py-4 text-sm leading-relaxed ${
            stage === 1 || stage === 2
              ? 'border-hostmate-primary/25 bg-hostmate-primary/[0.04] text-hostmate-primary italic'
              : stage === 5
              ? 'border-hostmate-ink/10 bg-hostmate-ink/[0.03] text-hostmate-ink text-center font-medium'
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
