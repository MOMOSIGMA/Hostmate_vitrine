import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

// Chiffres vérifiés dans le code réel (23/07) — pas inventés :
// src/services/quotaService.js (Backend_hostmate) pour les plafonds,
// lib/services/subscription_service.dart + lib/l10n/app_fr.arb (hosmate_ai)
// pour le prix et les libellés officiels déjà utilisés dans l'app.
// Prix "fondateur" (9,99$) réservé aux early adopters — reprend le pattern
// déjà en place dans l'écran d'abonnement de l'app (strikePrice).

const CONTENT = {
  fr: {
    free: {
      name: 'Free', price: '0$', period: '/mois',
      features: ['1 logement', '5 messages IA / mois', '1 Problem Solver / mois', 'Rappels 24h uniquement'],
      cta: 'Commencer gratuitement',
    },
    pro: {
      name: 'Pro', price: '9,99$', period: '/mois', struck: '14,99$',
      badge: 'Prix fondateur',
      features: [
        "Jusqu'à 5 logements", '400 messages IA / mois', 'Problem Solver (60 / mois)',
        "Livrets d'accueil illimités, en 10 langues",
        'Email automatique arrivée / départ', 'Rapport IA complet',
        'Rappels illimités (24h/12h/6h/4h/2h)',
      ],
      cta: 'Rejoindre la beta privée',
    },
  },
  en: {
    free: {
      name: 'Free', price: '$0', period: '/mo',
      features: ['1 property', '5 AI messages / month', '1 Problem Solver / month', '24h reminders only'],
      cta: 'Start for free',
    },
    pro: {
      name: 'Pro', price: '$9.99', period: '/mo', struck: '$14.99',
      badge: 'Founder price',
      features: [
        'Up to 5 properties', '400 AI messages / month', 'Problem Solver (60 / month)',
        'Unlimited welcome guides, in 10 languages',
        'Automatic email at arrival / departure', 'Full AI report',
        'Unlimited reminders (24h/12h/6h/4h/2h)',
      ],
      cta: 'Join the private beta',
    },
  },
}

export default function Pricing({ lang }: { lang: 'fr' | 'en' }) {
  const c = CONTENT[lang]
  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-hostmate-ink/10 bg-white p-7"
      >
        <p className="font-display font-semibold text-hostmate-ink text-lg">{c.free.name}</p>
        <p className="mt-2 mb-6">
          <span className="font-display text-3xl font-semibold text-hostmate-ink">{c.free.price}</span>
          <span className="text-hostmate-textGrey text-sm">{c.free.period}</span>
        </p>
        <ul className="space-y-3 mb-7">
          {c.free.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-hostmate-textGrey">
              <Check size={16} className="text-hostmate-ink/40 mt-0.5 shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <Link to="/waitlist" className="btn-secondary block text-center text-sm">{c.free.cta}</Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative rounded-2xl border-2 border-hostmate-primary bg-white p-7"
      >
        <span className="absolute -top-3 left-7 bg-hostmate-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {c.pro.badge}
        </span>
        <p className="font-display font-semibold text-hostmate-ink text-lg">{c.pro.name}</p>
        <p className="mt-2 mb-6">
          <span className="font-display text-3xl font-semibold text-hostmate-ink">{c.pro.price}</span>
          <span className="text-hostmate-textGrey text-sm">{c.pro.period}</span>
          <span className="ml-2 text-sm text-hostmate-textGrey line-through">{c.pro.struck}</span>
        </p>
        <ul className="space-y-3 mb-7">
          {c.pro.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-hostmate-ink">
              <Check size={16} className="text-hostmate-primary mt-0.5 shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <Link to="/waitlist" className="btn-primary block text-center text-sm">{c.pro.cta}</Link>
      </motion.div>
    </div>
  )
}
