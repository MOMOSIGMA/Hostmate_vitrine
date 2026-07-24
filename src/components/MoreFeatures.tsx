import { motion } from 'framer-motion'
import {
  Languages, Bell, Palette, Share2, BarChart3, CloudSun, MessageCircle,
} from 'lucide-react'

// ─── Grille dense des différenciateurs secondaires ─────────────────────────
// Les 3 fonctionnalités phares (messages, livret, conflits) ont déjà leur
// bloc alterné dédié plus haut sur la page — celles-ci sont réelles et
// vendeuses mais n'ont pas besoin d'un bloc entier chacune : une grille
// compacte type Stripe/Guesty communique beaucoup de valeur sans faire
// scroller pendant 3 écrans. Icônes lucide-react uniquement (déjà utilisées
// ailleurs sur le site), pas de couleur ajoutée hors corail au survol.

const ITEMS = [
  {
    icon: Languages,
    fr: { title: 'Livret en 10 langues', body: "Traduit automatiquement pour chaque voyageur — sans effort de votre part." },
    en: { title: 'Guide in 10 languages', body: 'Automatically translated for every guest — zero effort on your side.' },
  },
  {
    icon: Bell,
    fr: { title: 'Rappels aux prestataires', body: 'Ménage, maintenance : vos prestataires sont prévenus au bon moment.' },
    en: { title: 'Reminders for your providers', body: 'Cleaning, maintenance: your providers get notified at the right time.' },
  },
  {
    icon: Palette,
    fr: { title: 'Un ton qui vous ressemble', body: "Chaleureux, direct, formel — l'IA écrit dans VOTRE style, pas un style générique." },
    en: { title: 'A tone that sounds like you', body: 'Warm, direct, formal — the AI writes in YOUR style, not a generic one.' },
  },
  {
    icon: Share2,
    fr: { title: 'Un livret qui donne envie de vous recommander', body: 'Une expérience si soignée que les voyageurs ont envie de la partager.' },
    en: { title: 'A guide guests want to share', body: 'A guest experience polished enough that guests want to recommend you.' },
  },
  {
    icon: BarChart3,
    fr: { title: 'Rapport IA sur votre activité', body: 'Des insights concrets sur vos performances et la concurrence locale.' },
    en: { title: 'AI report on your activity', body: 'Concrete insights on your performance and local competition.' },
  },
  {
    icon: CloudSun,
    fr: { title: 'Contexte météo intégré', body: "Un message qui prévient d'un orage ou d'une canicule, au bon moment." },
    en: { title: 'Built-in weather awareness', body: 'A message that warns about a storm or heatwave, right on time.' },
  },
  {
    icon: MessageCircle,
    fr: { title: 'Hosty, votre copilote au quotidien', body: 'Posez vos questions dans le dashboard — Hosty connaît votre activité.' },
    en: { title: 'Hosty, your everyday co-pilot', body: 'Ask questions right from the dashboard — Hosty knows your activity.' },
  },
]

export default function MoreFeatures({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {ITEMS.map((item, i) => {
        const Icon = item.icon
        const c = item[lang]
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-hostmate-ink/10 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_40px_-20px_rgba(28,28,46,0.25)] hover:border-hostmate-primary/20"
          >
            <div className="w-10 h-10 rounded-xl bg-hostmate-primary/10 text-hostmate-primary flex items-center justify-center mb-4">
              <Icon size={19} />
            </div>
            <h3 className="font-display font-semibold text-hostmate-ink text-base mb-2">{c.title}</h3>
            <p className="text-sm text-hostmate-textGrey leading-relaxed">{c.body}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
