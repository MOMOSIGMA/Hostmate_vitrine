import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

const LANDING_RED = '#eb5b62'

const translations = {
  en: {
    badge: "HostMate Private Beta",
    heroTitle: "Automate the operational excellence of your Airbnb.",
    heroSubtitle: "Save 5 hours of management per week, boost your income and guarantee 5 stars for every stay thanks to artificial intelligence.",
    pillar1Title: "High-Precision Autonomous Messaging",
    pillar1Desc: "Check-in, follow-up, and check-out: AI generates and sends perfect, personalized messages translated instantly into your guest's language. Zero manual entry, 24/7 responsiveness.",
    pillar2Title: "Digital Concierge & QR Code",
    pillar2Desc: "Generate an intelligent welcome booklet in one second. Your guests access a dynamic site via QR Code where an AI assistant answers their questions in real time.",
    pillar3Title: "Problem Solver & Reputation Management",
    pillar3Desc: "Defuse disputes before they happen. Our AI analyzes complex situations and drafts strategic responses to handle difficult guests and protect your overall rating.",
    formTitle: "Reserve your spot and join the waitlist",
    formSubtitle: "Be among the first to test the revolution in short-term rental management.",
    labelName: "Your Name / Alias",
    labelEmail: "Your Professional Email Address",
    labelCount: "Number of properties managed",
    opt1: "1 property (Independent)",
    opt2: "2 to 5 properties (Active Manager)",
    opt3: "5+ properties (Concierge / Pro)",
    btnJoin: "JOIN THE PRIVATE BETA",
    btnLoading: "Processing...",
    msgSuccess: "Registration successful! Welcome to the waitlist.",
    msgError: "An error occurred. Please try again later.",
    msgEmailExists: "This email address is already registered.",
    msgFieldRequired: "Please provide your name and email."
  },
  fr: {
    badge: "HostMate Beta Privée",
    heroTitle: "Automatisez l'excellence opérationnelle de vos Airbnb.",
    heroSubtitle: "Gagnez 5 heures de gestion par semaine, boostez vos revenus et garantissez les 5 étoiles à chaque séjour grâce à l'intelligence artificielle.",
    pillar1Title: "Messagerie Autonome de Haute Précision",
    pillar1Desc: "Check-in, suivi de séjour et check-out : l'IA génère et envoie des messages parfaits, personnalisés et traduits instantanément dans la langue de votre client.",
    pillar2Title: "Conciergerie Digitale & QR Code",
    pillar2Desc: "Générez un livret d’accueil intelligent en une seconde. Vos voyageurs accèdent à un site dynamique via QR Code où un assistant IA répond à leurs questions.",
    pillar3Title: "Problem Solver & Gestion de Réputation",
    pillar3Desc: "Désamorcez les litiges avant qu’ils ne surviennent. Notre IA analyse les situations complexes et rédige les réponses stratégiques pour protéger votre note.",
    formTitle: "Réservez votre place et rejoignez la liste d'attente",
    formSubtitle: "Soyez parmi les premiers à tester la révolution de la gestion locative courte durée.",
    labelName: "Votre Prénom / Pseudo",
    labelEmail: "Votre Adresse Email Professionnelle",
    labelCount: "Taille du parc immobilier",
    opt1: "1 logement (Indépendant)",
    opt2: "2 à 5 logements (Gestionnaire actif)",
    opt3: "+ de 5 logements (Conciergerie / Pro)",
    btnJoin: "REJOINDRE LA BETA PRIVÉE",
    btnLoading: "Envoi en cours...",
    msgSuccess: "Inscription réussie ! Bienvenue dans la liste d'attente.",
    msgError: "Une erreur est survenue. Merci de réessayer plus tard.",
    msgEmailExists: "Cette adresse email est déjà inscrite.",
    msgFieldRequired: "Merci de renseigner votre prénom et votre email."
  }
}

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    if (browserLang === 'fr') setLang('fr')
  }, [])

  const t = translations[lang]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [propertyCount, setPropertyCount] = useState(t.opt1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    if (!name.trim() || !email.trim()) {
      setStatus('error')
      setMessage(t.msgFieldRequired)
      return
    }

    const { error } = await supabase.from('waitlist').insert([
      {
        pseudo: name.trim(),
        email: email.trim().toLowerCase(),
        property_count: propertyCount,
      },
    ])

    if (error) {
      setStatus('error')
      if (error.code === '23505') setMessage(t.msgEmailExists)
      else setMessage(t.msgError)
      return
    }

    setStatus('success')
    setMessage(t.msgSuccess)
    setName('')
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-100">
      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-20">
        
        {/* LOGO SECTION */}
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center gap-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white shadow-2xl shadow-red-100 border border-slate-50">
            <img src="/icon.png" alt="HostMate Logo" className="h-16 w-16 object-contain" />
          </div>
          
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#eb5b62] mb-4">
              {t.badge}
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-500">
              {t.heroSubtitle}
            </p>
          </div>
        </header>

        {/* PILLARS SECTION */}
        <section className="mt-24 grid gap-10 lg:grid-cols-3">
          {[
            { img: '/messaging.png', title: t.pillar1Title, desc: t.pillar1Desc },
            { img: '/booklet.png', title: t.pillar2Title, desc: t.pillar2Desc },
            { img: '/problem-solver.png', title: t.pillar3Title, desc: t.pillar3Desc },
          ].map((pillar) => (
            <article key={pillar.title} className="group rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-red-50 hover:-translate-y-2">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-slate-50 group-hover:bg-red-50 transition-colors duration-500">
                <img src={pillar.img} alt={pillar.title} className="h-10 w-10 object-contain" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{pillar.title}</h2>
              <p className="mt-5 text-slate-500 leading-relaxed text-sm sm:text-base font-medium">{pillar.desc}</p>
            </article>
          ))}
        </section>

        {/* WAITLIST FORM SECTION */}
        <section className="mt-32 rounded-[3.5rem] bg-slate-900 p-8 sm:p-16 text-white shadow-3xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-[#eb5b62] opacity-20 blur-[100px]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-12 text-center sm:text-left">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">{t.formTitle}</h2>
              <p className="mt-6 text-slate-400 text-lg">{t.formSubtitle}</p>
            </div>

            <form className="grid gap-8 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.labelName}</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Jean-Pierre"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-5 text-white outline-none focus:border-[#eb5b62] focus:ring-1 focus:ring-[#eb5b62] transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.labelEmail}</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@hostmate.ai"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-5 text-white outline-none focus:border-[#eb5b62] focus:ring-1 focus:ring-[#eb5b62] transition-all"
                />
              </div>

              <div className="sm:col-span-2 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.labelCount}</label>
                <select
                  value={propertyCount} onChange={(e) => setPropertyCount(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-5 text-white outline-none focus:border-[#eb5b62] appearance-none cursor-pointer"
                >
                  <option value={t.opt1}>{t.opt1}</option>
                  <option value={t.opt2}>{t.opt2}</option>
                  <option value={t.opt3}>{t.opt3}</option>
                </select>
              </div>

              <button
                type="submit" disabled={status === 'loading'}
                className="sm:col-span-2 w-full rounded-2xl bg-[#eb5b62] px-8 py-6 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-[#d44f58] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? t.btnLoading : t.btnJoin}
              </button>

              {message && (
                <div className={`sm:col-span-2 p-6 rounded-2xl text-center font-bold text-sm ${status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </section>

        <footer className="mt-20 text-center text-slate-400 text-xs font-medium tracking-wide">
          © {new Date().getFullYear()} HostMate AI — All rights reserved.
        </footer>
      </main>
    </div>
  )
}