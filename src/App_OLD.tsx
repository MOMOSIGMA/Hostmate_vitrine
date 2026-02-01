const features = [
  {
    title: '🔑 Mission Check-in',
    description: 'Générée 24h avant arrivée: code WiFi, accès, règles maison, infos logement. IA crée le message parfait automatiquement.',
    icon: '🔑',
  },
  {
    title: '💬 Mission Follow-up',
    description: 'Pendant le séjour: "Tout va bien ? Questions ?" Message IA personnalisé qui augmente satisfaction.',
    icon: '💬',
  },
  {
    title: '⭐ Mission Check-out',
    description: 'À la fin: demande d\'avis, consignes de départ. IA génère le message parfait pour garder 5 étoiles.',
    icon: '⭐',
  },
  {
    title: '🕐 Rappels Intelligents',
    description: 'Notifications 24h / 12h / 6h / 4h / 2h avant arrivée. Vous ne ratez jamais un guest.',
    icon: '🕐',
  },
  {
    title: '💬 Chat IA Direct',
    description: 'Discutez avec l\'IA en direct. Text-to-speech, speech-to-text, historique sauvegardé. 8 langues natives.',
    icon: '💬',
  },
  {
    title: '🌍 8 Langues',
    description: 'FR • EN • ES • IT • DE • PT • ZH • AR. L\'IA répond automatiquement dans la langue du guest.',
    icon: '🌍',
  },
]

const stats = [
  { label: 'Temps de réponse', value: '-80%' },
  { label: 'Satisfaction voyageurs', value: '+24%' },
  { label: 'Tâches automatisées', value: '120+/mois' },
  { label: 'Villes couvertes', value: '45+' },
]

const testimonials = [
  {
    name: 'Claire M.',
    role: 'Gestionnaire multi‑biens',
    quote: '"Les check-ins automatisés m\'ont libéré des heures. Hostmate répond avant que je ne voie le message."',
  },
  {
    name: 'Yann D.',
    role: 'Conciergerie urbaine',
    quote: '"La satisfaction voyageurs a grimpé de 2 points. L\'IA comprend les problèmes mieux que je ne l\'aurais fait."',
  },
  {
    name: 'Salma R.',
    role: 'Hôte premium',
    quote: '"Je peux enfin me reposer le soir. Tout fonctionne sans moi, mais avec mon contrôle."',
  },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    description: 'Parfait pour tester',
    features: ['1 propriété', '20 messages IA/mois', '2 créations/mois', 'Rappels 24h', 'Support email'],
    cta: 'Commencer',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$6.99 / mois',
    description: 'Automatisation fluide',
    features: [
      '3 propriétés',
      'Messages IA illimités',
      'Rappels 24h/12h',
      'Tableau de bord avancé',
      'Support standard',
    ],
    cta: 'Essai gratuit 7j',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$19.99 / mois',
    description: 'Contrôle total',
    features: ['Propriétés illimitées', 'Messages IA illimités', 'Rappels 24h/12h/6h/4h/2h', 'Tableau de bord premium', 'Support prioritaire'],
    cta: 'Passer Pro',
    highlighted: false,
  },
]

const faqs = [
  {
    q: 'HostMate sync avec Airbnb automatiquement ?',
    a: 'Non, HostMate n\'a pas de connexion Airbnb native. Vous créez vos logements dans l\'app. Parfait pour gérer plusieurs plateformes (Airbnb, Booking, Vrbo) avec un seul assistant IA.',
  },
  {
    q: 'Je peux personnaliser les messages IA ?',
    a: 'Oui. L\'IA apprend votre tone, vos règles maison, vos préférences. Plus vous l\'utilisez, plus elle s\'adapte.',
  },
  {
    q: 'Quelles langues l\'IA maîtrise-t-elle ?',
    a: 'Français, anglais, espagnol, italien, allemand, portugais, chinois, arabe. L\'IA répond automatiquement dans la langue du message reçu.',
  },
  {
    q: 'Mes données sont en sécurité ?',
    a: 'Oui. Backend sécurisé, clé IA jamais exposée, RLS database, chiffrement HTTPS, RGPD compliant. Vos données ne sont qu\'à vous.',
  },
  {
    q: 'Puis-je inviter une équipe ?',
    a: 'Actuellement, un compte = un utilisateur. Idéal pour hôtes solo. Pas de multi-user par propriété pour le moment.',
  },
  {
    q: 'C\'est mobile seulement ?',
    a: 'Oui, HostMate est une app mobile Flutter (iOS/Android). Parfait pour gérer en déplacement. Web à venir.',
  },
]

function App() {
  return (
    <div className="min-h-screen bg-hostmate-background text-hostmate-textDark">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-hostmate-textGrey/10 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-bold text-hostmate-textDark">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-hostmate-primary to-hostmate-checkIn text-white font-bold text-sm">
              H
            </span>
            Hostmate AI
          </div>
          <div className="hidden items-center gap-8 text-sm text-hostmate-textGrey md:flex">
            <a href="#features" className="hover:text-hostmate-primary transition-colors font-medium">
              Fonctionnalités
            </a>
            <a href="#pricing" className="hover:text-hostmate-primary transition-colors font-medium">
              Tarifs
            </a>
            <a href="#faq" className="hover:text-hostmate-primary transition-colors font-medium">
              FAQ
            </a>
          </div>
          <a
            href="#pricing"
            className="rounded-full bg-hostmate-primary px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            Démarrer
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[600px] w-[800px] rounded-full bg-hostmate-primary/10 blur-[150px]" />
          <div className="absolute right-0 top-1/2 h-[500px] w-[600px] rounded-full bg-hostmate-checkIn/10 blur-[150px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hostmate-primary/20 bg-hostmate-primary/5 px-4 py-2 text-xs text-hostmate-primary font-semibold">
            ✨ Assistant IA pour hôtes Airbnb & Booking
          </p>
          <h1 className="text-6xl font-bold leading-tight md:text-7xl text-hostmate-textDark mb-6">
            L'IA qui
            <span className="block bg-gradient-to-r from-hostmate-primary via-hostmate-satisfaction to-hostmate-checkIn bg-clip-text text-transparent">
              orchestre chaque séjour
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-hostmate-textGrey mb-10">
            3 missions IA • Rappels 24h/12h/6h/4h/2h • Chat 24/7 • 8 langues • Tableau de bord intelligent
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#pricing"
              className="rounded-full bg-hostmate-primary px-8 py-4 text-base font-bold text-white hover:bg-red-600 transition-all hover:scale-105 shadow-lg"
            >
              Essai gratuit
            </a>
            <a
              href="#features"
              className="rounded-full border-2 border-hostmate-primary px-8 py-4 text-base font-bold text-hostmate-primary hover:bg-hostmate-primary hover:text-white transition-all"
            >
              Voir les 3 missions
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-2xl font-bold text-hostmate-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-hostmate-textGrey font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-hostmate-primary font-bold">3 MISSIONS IA AUTOMATIQUES</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl text-hostmate-textDark">
            Les 3 moments clés d'un séjour
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-hostmate-textGrey">
            Check-in → Follow-up → Check-out. L'IA génère le message parfait à chaque fois.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border-2 border-hostmate-textGrey/20 bg-white p-8 hover:border-hostmate-primary hover:shadow-xl transition-all">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-3xl bg-hostmate-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-hostmate-textDark">{feature.title}</h3>
              <p className="mt-3 text-sm text-hostmate-textGrey leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-hostmate-primary font-bold">Témoignages</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl text-hostmate-textDark">
            Adopté par des hôtes qui gagnent du temps
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl bg-white p-8 shadow-md hover:shadow-lg transition-shadow border border-hostmate-textGrey/20">
              <p className="mb-6 text-base text-hostmate-textDark italic leading-relaxed">{t.quote}</p>
              <div className="border-t border-hostmate-textGrey/20 pt-6">
                <p className="font-bold text-hostmate-textDark">{t.name}</p>
                <p className="text-sm text-hostmate-textGrey">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-hostmate-primary font-bold">Tarification transparente</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl text-hostmate-textDark">
            Un plan pour chaque hôte
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-hostmate-textGrey">
            Essai gratuit, sans carte bancaire requise. Upgrade quand vous êtes prêt.
          </p>
        </div>

        <div className="mb-8 rounded-3xl bg-amber-50 border-2 border-amber-400 p-6 text-center">
          <p className="text-sm font-bold text-amber-900">🎁 OFFRE FONDATEURS LIMITÉE</p>
          <p className="mt-2 text-amber-800">Accès PRO à $6.99/mois à vie (100 places, 1 an). <span className="font-bold">Places limitées!</span></p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border-2 p-8 transition-all ${
                plan.highlighted
                  ? 'border-hostmate-primary bg-hostmate-primary/5 shadow-2xl scale-105'
                  : 'border-hostmate-textGrey/20 bg-white shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block rounded-full bg-hostmate-primary px-3 py-1 text-xs font-bold text-white">
                  Recommandé
                </div>
              )}
              <h3 className="text-2xl font-bold text-hostmate-textDark">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-hostmate-primary">{plan.price}</p>
              <p className="mt-2 text-sm text-hostmate-textGrey">{plan.description}</p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-hostmate-textDark">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-hostmate-checkIn/20 text-xs font-bold text-hostmate-checkIn">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-hostmate-primary text-white hover:bg-red-600'
                    : 'border-2 border-hostmate-primary text-hostmate-primary hover:bg-hostmate-primary hover:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-blue-50 border-2 border-blue-200 p-8">
          <h3 className="text-lg font-bold text-blue-900">📱 Mobile App (iOS + Android)</h3>
          <p className="mt-2 text-sm text-blue-800">HostMate AI est une application native Flutter. Gérez vos hôtes depuis votre poche. Web et desktop à venir.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-hostmate-primary font-bold">Questions</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl text-hostmate-textDark">
            Questions fréquentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-hostmate-textGrey/20 bg-white p-6 transition-all hover:shadow-md cursor-pointer"
            >
              <summary className="flex items-center justify-between font-bold text-hostmate-textDark">
                {faq.q}
                <span className="ml-4 text-hostmate-primary text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-sm text-hostmate-textGrey leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-hostmate-primary via-hostmate-satisfaction to-hostmate-checkIn p-12 text-white shadow-xl md:p-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold md:text-5xl mb-6">
              Lancez votre conciergerie IA dès aujourd'hui
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/90 mb-10">
              Installation en 5 minutes. Résultats en 1 semaine. Gratuit pour commencer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-hostmate-primary hover:bg-hostmate-background transition-colors"
              >
                Voir les offres
              </a>
              <a
                href="#features"
                className="rounded-full border-2 border-white px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
              >
                Découvrir
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hostmate-textGrey/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-hostmate-textGrey">
          <p>© 2026 Hostmate AI. L'assistante IA pour orchestrer chaque séjour.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
