

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
    role: 'Gestionnaire multi-biens',
    quote: 'Les check-ins automatisés m\'ont libéré des heures. Hostmate répond avant que je ne voie le message.',
  },
  {
    name: 'Yann D.',
    role: 'Conciergerie urbaine',
    quote: 'La satisfaction voyageurs a grimpé de 2 points. L\'IA comprend les problèmes mieux que je ne l\'aurais fait.',
  },
  {
    name: 'Salma R.',
    role: 'Hôte premium',
    quote: 'Je peux enfin me reposer le soir. Tout fonctionne sans moi, mais avec mon contrôle.',
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
    price: '$6.99',
    period: '/ mois',
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
    price: '$19.99',
    period: '/ mois',
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
    a: 'Oui, HostMate est une app mobile Flutter (Android). Parfait pour gérer en déplacement. iOS & web à venir.',
  },
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* HEADER - MODERN */}
      <header className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold text-lg shadow-lg">
              H
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              HostMate AI
            </span>
          </div>
          
          <div className="hidden items-center gap-12 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-red-600 transition-colors font-medium">
              Missions
            </a>
            <a href="#pricing" className="hover:text-red-600 transition-colors font-medium">
              Tarifs
            </a>
            <a href="#faq" className="hover:text-red-600 transition-colors font-medium">
              FAQ
            </a>
          </div>
          
          <a
            href="#pricing"
            className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200"
          >
            Essai gratuit
          </a>
        </nav>
      </header>

      {/* HERO - MODERN */}
      <section className="relative overflow-hidden px-6 py-32 md:py-40">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-red-100 blur-3xl opacity-40" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-100 blur-3xl opacity-40" />
          <div className="absolute -bottom-40 left-1/2 h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-30" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 text-xs font-semibold text-red-700 backdrop-blur">
            ✨ Assistant IA pour hôtes modernes
          </div>
          
          <h1 className="mb-8 text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-red-600 to-orange-500 bg-clip-text text-transparent">
              L'IA qui<br />orchestre chaque séjour
            </span>
          </h1>
          
          <p className="mb-10 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            3 missions IA automatiques • Rappels intelligents • Chat 24/7 • 8 langues • Tableau de bord puissant
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 group"
            >
              Essai gratuit → 
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
            >
              Voir les missions
            </a>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/70 backdrop-blur border border-slate-200 p-6 hover:border-red-300 transition-all hover:shadow-lg">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - MODERN CARDS */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-20 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest">
            🎯 Les 3 Missions
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Chaque étape du séjour, couverte
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Check-in → Follow-up → Check-out. L'IA génère le message parfait à chaque moment critique.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.slice(0, 3).map((feature) => (
            <div 
              key={feature.title} 
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 hover:border-red-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-3xl group-hover:bg-red-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECONDARY FEATURES */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.slice(3).map((feature: any) => (
            <div key={feature.title} className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS - MODERN */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest">
            ⭐ Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Adopté par des hôtes qui gagnent du temps
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white border border-slate-200 p-8 hover:shadow-lg hover:border-red-300 transition-all duration-300">
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_: any, i: number) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="mb-6 text-lg text-slate-700 italic leading-relaxed">"{t.quote}"</p>
              <div className="border-t border-slate-200 pt-6">
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING - MODERN */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            💰 Transparent
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Un plan pour chaque hôte
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Essai gratuit sans carte bancaire. Upgrade quand vous êtes prêt.
          </p>
        </div>

        {/* FOUNDER BANNER */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 p-8 text-white shadow-xl">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <span className="text-4xl">🎁</span>
            <div className="text-center">
              <p className="font-bold text-lg">OFFRE FONDATEURS LIMITÉE</p>
              <p className="text-sm opacity-90">Accès PRO à $6.99/mois à vie • 100 places • 1 an</p>
            </div>
            <span className="text-4xl">⏰</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricing.map((plan: any) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 border-2 border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-2xl shadow-red-500/20'
                  : 'border border-slate-200 bg-white hover:border-red-300 hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold">
                  Le plus populaire
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-slate-600">{plan.period}</span>}
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 text-lg text-red-500">✓</span>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/30'
                      : 'border-2 border-red-500 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* INFO BANNER */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-8 text-center">
          <h3 className="font-bold text-blue-900 mb-2">📱 Application Native Android</h3>
          <p className="text-blue-800">HostMate AI est une app Flutter native. Gestion complète depuis votre téléphone. iOS & web à venir.</p>
        </div>
      </section>

      {/* FAQ - MODERN */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest">
            ❓ Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Tout ce que vous devez savoir
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-red-300 hover:shadow-md cursor-pointer transition-all duration-200"
            >
              <summary className="flex items-center justify-between font-semibold text-slate-900 hover:text-red-600">
                {faq.q}
                <span className="ml-4 text-red-500 group-open:rotate-180 transition-transform duration-200">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL - MODERN */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 p-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative">
            <h2 className="mb-6 text-4xl md:text-5xl font-bold leading-tight">
              Prêt à transformer votre gestion d'hôtel ?
            </h2>
            <p className="mb-10 max-w-2xl mx-auto text-lg text-slate-200">
              Rejoignez les hôtes qui gagnent du temps avec l'IA. Installation en 5 minutes, résultats en 1 semaine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-xl hover:shadow-2xl transition-all duration-200"
              >
                Essai gratuit
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              >
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - MODERN */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <p className="text-slate-600">© 2026 HostMate AI. L'IA qui orchestre chaque séjour.</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
