import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import LargeHostLead from './LargeHostLead'

// Chiffres vérifiés dans le code réel (23/07) — pas inventés :
// src/services/quotaService.js (Backend_hostmate) pour les plafonds,
// lib/services/subscription_service.dart + lib/l10n/app_fr.arb (hosmate_ai)
// pour le prix et les libellés officiels déjà utilisés dans l'app.
// Prix "fondateur" (9,99$) réservé aux early adopters — reprend le pattern
// déjà en place dans l'écran d'abonnement de l'app (strikePrice).
//
// ─── RÉVISION DU 02/08 ──────────────────────────────────────────────────────
// 1. Plus aucun « illimité » qui ne corresponde à rien. Les livrets d'accueil
//    étaient annoncés illimités alors qu'il y en a un par logement, donc cinq
//    au maximum. Seuls les rappels le sont réellement — aucun plafond n'existe
//    côté serveur — et eux seuls gardent le mot.
// 2. La carte gratuite montre désormais ce qu'elle NE donne PAS. Une liste qui
//    n'énumère que des limites, toutes cochées d'un vert rassurant, ne dit pas
//    à l'hôte ce qu'il rate.
// 3. Trois fonctionnalités PRO n'apparaissaient nulle part alors qu'elles sont
//    réservées depuis des mois : le pilote automatique, la création de
//    logement par IA et les alertes d'arrivée tardives.

const CONTENT = {
  fr: {
    free: {
      name: 'Free', price: '0$', period: '/mois',
      features: ['1 logement', '5 messages IA / mois', '1 Problem Solver / mois', 'Rappels 24h uniquement'],
      missing: [
        "Livret d'accueil en ligne", 'Pilote automatique des messages',
        'Création de logement par IA', 'Email automatique arrivée / départ',
        'Rapport IA complet',
      ],
      cta: 'Commencer gratuitement',
    },
    pro: {
      name: 'Pro', price: '9,99$', period: '/mois', struck: '14,99$',
      badge: 'Prix fondateur',
      features: [
        "Jusqu'à 5 logements", '400 messages IA / mois', 'Problem Solver (60 / mois)',
        "Un livret d'accueil par logement, en 10 langues",
        'Pilote automatique des messages', 'Création de logement par IA',
        'Email automatique arrivée / départ', 'Rapport IA complet',
        'Traduction miroir', "Alertes d'arrivée jusqu'à 2h avant",
        'Rappels illimités (24h/12h/6h/4h/2h)', 'Support prioritaire',
      ],
      cta: "Démarrer l'essai gratuit",
    },
  },
  en: {
    free: {
      name: 'Free', price: '$0', period: '/mo',
      features: ['1 property', '5 AI messages / month', '1 Problem Solver / month', '24h reminders only'],
      missing: [
        'Online welcome book', 'Message autopilot', 'AI property creation',
        'Automatic email at arrival / departure', 'Full AI report',
      ],
      cta: 'Start for free',
    },
    pro: {
      name: 'Pro', price: '$9.99', period: '/mo', struck: '$14.99',
      badge: 'Founder price',
      features: [
        'Up to 5 properties', '400 AI messages / month', 'Problem Solver (60 / month)',
        'One welcome book per property, in 10 languages',
        'Message autopilot', 'AI property creation',
        'Automatic email at arrival / departure', 'Full AI report',
        'Mirror translation', 'Arrival alerts as late as 2h before',
        'Unlimited reminders (24h/12h/6h/4h/2h)', 'Priority support',
      ],
      cta: 'Start free trial',
    },
  },
  es: {
    free: {
      name: 'Free', price: '0$', period: '/mes',
      features: ['1 alojamiento', '5 mensajes IA / mes', '1 Problem Solver / mes', 'Recordatorios 24h únicamente'],
      missing: [
        'Guía de bienvenida en línea', 'Piloto automático de mensajes',
        'Creación de alojamiento por IA', 'Email automático de llegada / salida',
        'Informe de IA completo',
      ],
      cta: 'Empezar gratis',
    },
    pro: {
      name: 'Pro', price: '9,99$', period: '/mes', struck: '14,99$',
      badge: 'Precio fundador',
      features: [
        'Hasta 5 alojamientos', '400 mensajes IA / mes', 'Problem Solver (60 / mes)',
        'Una guía de bienvenida por alojamiento, en 10 idiomas',
        'Piloto automático de mensajes', 'Creación de alojamiento por IA',
        'Email automático de llegada / salida', 'Informe de IA completo',
        'Traducción espejo', 'Alertas de llegada hasta 2h antes',
        'Recordatorios ilimitados (24h/12h/6h/4h/2h)', 'Soporte prioritario',
      ],
      cta: 'Empezar la prueba gratuita',
    },
  },
  it: {
    free: {
      name: 'Free', price: '0$', period: '/mese',
      features: ['1 alloggio', '5 messaggi AI / mese', '1 Problem Solver / mese', 'Promemoria solo a 24h'],
      missing: [
        'Libretto di benvenuto online', 'Pilota automatico dei messaggi',
        'Creazione di alloggio tramite IA', 'Email automatica di arrivo / partenza',
        'Report AI completo',
      ],
      cta: 'Inizia gratis',
    },
    pro: {
      name: 'Pro', price: '9,99$', period: '/mese', struck: '14,99$',
      badge: 'Prezzo fondatore',
      features: [
        'Fino a 5 alloggi', '400 messaggi AI / mese', 'Problem Solver (60 / mese)',
        'Un libretto di benvenuto per alloggio, in 10 lingue',
        'Pilota automatico dei messaggi', 'Creazione di alloggio tramite IA',
        'Email automatica di arrivo / partenza', 'Report AI completo',
        'Traduzione speculare', 'Avvisi di arrivo fino a 2h prima',
        'Promemoria illimitati (24h/12h/6h/4h/2h)', 'Supporto prioritario',
      ],
      cta: 'Inizia la prova gratuita',
    },
  },
}

export default function Pricing({ lang }: { lang: 'fr' | 'en' | 'es' | 'it' }) {
  const c = CONTENT[lang]
  return (
    <div className="max-w-2xl mx-auto">
    <div className="grid sm:grid-cols-2 gap-6">
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
          {/* Ce que le plan gratuit ne donne PAS. Sans ces lignes, la carte
              n'énumérait que des limites cochées en vert : l'hôte n'avait
              aucun moyen de voir ce à quoi il renonçait. */}
          {c.free.missing.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-hostmate-textGrey/50">
              <X size={16} className="text-hostmate-ink/25 mt-0.5 shrink-0" />
              <span className="line-through decoration-hostmate-ink/20">{f}</span>
            </li>
          ))}
        </ul>
        <a href="https://app.hostmateai.app" className="btn-secondary block text-center text-sm">{c.free.cta}</a>
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
        <a href="https://app.hostmateai.app" className="btn-primary block text-center text-sm">{c.pro.cta}</a>
      </motion.div>
    </div>

      {/* Sous les cartes, pas à côté : capter la conciergerie sans lui
          promettre un plan qui n'existe pas. Voir LargeHostLead.tsx. */}
      <LargeHostLead lang={lang} />
    </div>
  )
}
