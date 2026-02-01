import { useState } from 'react'
import { translations, type Language } from './i18n'

function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key] as string ?? key
}

// Full data with enhanced icons
const stats = [
  { label: 'Response Time', value: '-80%', icon: '⚡' },
  { label: 'Guest Satisfaction', value: '+24%', icon: '📈' },
  { label: 'Automated Tasks', value: '120+/mo', icon: '🤖' },
  { label: 'Cities Covered', value: '45+', icon: '🌐' },
]

const testimonials = [
  {
    name: 'Claire M.',
    role: 'Multi-property Manager',
    quote: 'Check-ins have freed up hours of my time. HostMate responds before I even see the message.',
  },
  {
    name: 'Yann D.',
    role: 'Urban Concierge',
    quote: 'Guest satisfaction jumped 2 points. The AI understands issues better than I would.',
  },
  {
    name: 'Salma R.',
    role: 'Premium Host',
    quote: 'I can finally relax in the evening. Everything runs without me, but with my control.',
  },
]

const faqs = [
  {
    q: 'Does HostMate sync with Airbnb automatically?',
    a: 'No, HostMate has no native Airbnb connection. You create properties in the app. Perfect for managing multiple platforms (Airbnb, Booking, Vrbo) with one AI assistant.',
  },
  {
    q: 'Can I customize the AI messages?',
    a: 'Yes. The AI learns your tone, house rules, and preferences. The more you use it, the more it adapts.',
  },
  {
    q: 'What languages does the AI support?',
    a: 'French, English, Spanish, Italian, German, Portuguese, Chinese, Arabic. AI automatically responds in the guest\'s language.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Secure backend, AI key never exposed, database RLS, HTTPS encryption, GDPR compliant. Your data is yours alone.',
  },
  {
    q: 'Can I invite a team?',
    a: 'Currently, one account = one user. Perfect for solo hosts. No multi-user per property for now.',
  },
  {
    q: 'Is it mobile only?',
    a: 'Yes, HostMate is a Flutter mobile app (Android). Perfect for managing on the go. iOS & web coming soon.',
  },
]

function App() {
  const [lang, setLang] = useState<Language>('en')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const t = (key: string) => getTranslation(lang, key)

  const languages: Array<{ code: Language; name: string; flag: string }> = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ]

  const currentLang = languages.find(l => l.code === lang)

  const features = [
    {
      title: t('feature.checkin'),
      description: t('feature.checkin.desc'),
      icon: '🔑',
    },
    {
      title: t('feature.followup'),
      description: t('feature.followup.desc'),
      icon: '💬',
    },
    {
      title: t('feature.checkout'),
      description: t('feature.checkout.desc'),
      icon: '⭐',
    },
    {
      title: t('feature.reminders'),
      description: t('feature.reminders.desc'),
      icon: '🕐',
    },
    {
      title: t('feature.chat'),
      description: t('feature.chat.desc'),
      icon: '🎧',
    },
    {
      title: t('feature.languages'),
      description: t('feature.languages.desc'),
      icon: '🌍',
    },
  ]

  const pricing = [
    {
      name: t('plan.free'),
      price: '$0',
      description: t('plan.free.desc'),
      features: [
        t('feature.prop1'),
        t('feature.msg20'),
        t('feature.create2'),
        t('feature.remindertime'),
        t('feature.support'),
      ],
      cta: t('cta.free'),
      highlighted: false,
    },
    {
      name: t('plan.starter'),
      price: '$6.99',
      period: '/ mo',
      description: t('plan.starter.desc'),
      features: [
        t('feature.prop3'),
        t('feature.msgunlimited'),
        t('feature.remindertime2'),
        t('feature.dashboard'),
        t('feature.support2'),
      ],
      cta: t('cta.trial'),
      highlighted: true,
    },
    {
      name: t('plan.pro'),
      price: '$19.99',
      period: '/ mo',
      description: t('plan.pro.desc'),
      features: [
        t('feature.propunlimited'),
        t('feature.msgunlimited'),
        t('feature.remindertime5'),
        t('feature.dashboardpremium'),
        t('feature.support3'),
      ],
      cta: t('cta.pro'),
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3 flex-1 md:flex-none">
            <img src="/icon.png" alt="HostMate" className="h-9 md:h-10 w-9 md:w-10 rounded-lg md:rounded-xl shadow-lg" />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent truncate">
              HostMate AI
            </span>
          </div>

          <div className="hidden items-center gap-8 md:gap-12 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-red-600 transition-colors font-medium">
              {t('header.missions')}
            </a>
            <a href="#pricing" className="hover:text-red-600 transition-colors font-medium">
              {t('header.pricing')}
            </a>
            <a href="#faq" className="hover:text-red-600 transition-colors font-medium">
              {t('header.faq')}
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Language Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 hover:border-red-300 transition-all text-lg"
                title="Change language"
              >
                {currentLang?.flag}
                <span className="text-xs text-slate-600">▼</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setShowLangMenu(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 ${
                        lang === l.code ? 'bg-red-50 text-red-600 font-semibold' : 'text-slate-700'
                      } ${l.code !== languages[languages.length - 1].code ? 'border-b border-slate-100' : ''}`}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span className="text-sm">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Language Dropdown */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 px-2 py-1.5 rounded text-lg hover:bg-slate-100 transition-all"
                title="Change language"
              >
                {currentLang?.flag}
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setShowLangMenu(false)
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-sm ${
                        lang === l.code ? 'bg-red-50 text-red-600 font-semibold' : 'text-slate-700'
                      } ${l.code !== languages[languages.length - 1].code ? 'border-b border-slate-100' : ''}`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#pricing"
              className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 whitespace-nowrap"
            >
              {t('header.cta')}
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-32 md:py-40">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-red-100 blur-3xl opacity-40" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-100 blur-3xl opacity-40" />
          <div className="absolute -bottom-40 left-1/2 h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-30" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 text-xs font-semibold text-red-700 backdrop-blur">
            {t('hero.badge')}
          </div>

          <h1 className="mb-8 text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-red-600 to-orange-500 bg-clip-text text-transparent">
              {t('hero.title1')}
              <br />
              {t('hero.title2')}
            </span>
          </h1>

          <p className="mb-10 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200"
            >
              {t('hero.cta1')}
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
            >
              {t('hero.cta2')}
            </a>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/70 backdrop-blur border border-slate-200 p-6 hover:border-red-300 transition-all hover:shadow-lg">
                <p className="text-xl mb-1">{stat.icon}</p>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - 6 cards */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-20 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest">
            {t('features.badge')}
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('features.title')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group relative rounded-2xl border border-slate-200 bg-white p-8 hover:border-red-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
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
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest">
            ⭐ {t('testimonials.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('testimonials.title')}
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((tst) => (
            <div key={tst.name} className="rounded-2xl bg-white border border-slate-200 p-8 hover:shadow-lg hover:border-red-300 transition-all duration-300">
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_: any, i: number) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="mb-6 text-lg text-slate-700 italic leading-relaxed">"{tst.quote}"</p>
              <div className="border-t border-slate-200 pt-6">
                <p className="font-bold text-slate-900">{tst.name}</p>
                <p className="text-sm text-slate-500">{tst.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* APP SHOWCASE */}
      <section className="mx-auto max-w-7xl px-6 py-24 bg-gradient-to-b from-slate-50 to-transparent">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            {t('showcase.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('showcase.title')}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('showcase.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {/* Screen 1: Home */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300">
            <img src="/Home.jpeg" alt="Home Screen" className="w-full h-full object-cover aspect-[9/16]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 w-full text-white">
                <h3 className="font-bold text-sm mb-1">{t('showcase.screen1')}</h3>
                <p className="text-xs text-gray-300">{t('showcase.screen1.desc')}</p>
              </div>
            </div>
          </div>

          {/* Screen 2: Properties */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300">
            <img src="/My_Properties.jpeg" alt="My Properties Screen" className="w-full h-full object-cover aspect-[9/16]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 w-full text-white">
                <h3 className="font-bold text-sm mb-1">{t('showcase.screen2')}</h3>
                <p className="text-xs text-gray-300">{t('showcase.screen2.desc')}</p>
              </div>
            </div>
          </div>

          {/* Screen 3: Planning */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300">
            <img src="/Planning.jpeg" alt="Planning Screen" className="w-full h-full object-cover aspect-[9/16]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 w-full text-white">
                <h3 className="font-bold text-sm mb-1">{t('showcase.screen3')}</h3>
                <p className="text-xs text-gray-300">{t('showcase.screen3.desc')}</p>
              </div>
            </div>
          </div>

          {/* Screen 4: AI Messages */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300">
            <img src="/Mission.jpeg" alt="AI Messages Screen" className="w-full h-full object-cover aspect-[9/16]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 w-full text-white">
                <h3 className="font-bold text-sm mb-1">{t('showcase.screen4')}</h3>
                <p className="text-xs text-gray-300">{t('showcase.screen4.desc')}</p>
              </div>
            </div>
          </div>

          {/* Screen 5: Profile */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300">
            <img src="/Profile.jpeg" alt="Profile Screen" className="w-full h-full object-cover aspect-[9/16]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 w-full text-white">
                <h3 className="font-bold text-sm mb-1">{t('showcase.screen5')}</h3>
                <p className="text-xs text-gray-300">{t('showcase.screen5.desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-6">
            {t('showcase.footer')}
          </p>
        </div>
      </section>
      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            {t('pricing.badge')}
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('pricing.title')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* FOUNDER BANNER */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 p-8 text-white shadow-xl">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <span className="text-4xl">🎁</span>
            <div className="text-center">
              <p className="font-bold text-lg">{t('pricing.founder')}</p>
              <p className="text-sm opacity-90">{t('pricing.founder.desc')}</p>
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
                  {t('plan.popular')}
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
                  {plan.features.map((feature: string, idx: number) => (
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
          <h3 className="font-bold text-blue-900 mb-2">📱 {t('mobile.title')}</h3>
          <p className="text-blue-800">{t('mobile.desc')}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest">
            {t('faq.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('faq.title')}
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

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 p-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

          <div className="relative">
            <h2 className="mb-6 text-4xl md:text-5xl font-bold leading-tight">
              {t('cta.title')}
            </h2>
            <p className="mb-10 max-w-2xl mx-auto text-lg text-slate-200">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-xl hover:shadow-2xl transition-all duration-200"
              >
                {t('cta.see')}
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              >
                {t('cta.learn')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <p className="text-slate-600">{t('footer.copy')}</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">
              Terms
            </a>
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
