import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

const translations = {
  en: {
    badge: "HostMate Private Beta",
    heroTitle: "Automate your Airbnb operations.",
    heroSubtitle: "Save 5h/week, boost your income and guarantee 5 stars thanks to AI.",
    pillar1Title: "Autonomous Messaging",
    pillar1Desc: "AI sends perfect, translated messages. Zero manual entry, 24/7 responsiveness.",
    pillar2Title: "Digital Concierge",
    pillar2Desc: "Smart welcome booklet via QR Code. AI answers guest questions in real time.",
    pillar3Title: "Problem Solver",
    pillar3Desc: "Defuse disputes and handle difficult reviews strategically to protect your rating.",
    formTitle: "Join the Waitlist",
    formSubtitle: "Be among the first to test the revolution.",
    labelName: "Name",
    labelEmail: "Email",
    labelCount: "Properties",
    opt1: "1 property",
    opt2: "2 to 5 properties",
    opt3: "5+ properties",
    btnJoin: "RESERVE MY SPOT",
    btnLoading: "Sending...",
    msgSuccess: "Welcome to the waitlist!",
    msgError: "An error occurred.",
    msgEmailExists: "Already registered.",
    msgFieldRequired: "Name and email required."
  },
  fr: {
    badge: "HostMate Beta Privée",
    heroTitle: "Automatisez la gestion de vos Airbnb.",
    heroSubtitle: "Gagnez 5h/semaine et garantissez les 5 étoiles grâce à l'IA.",
    pillar1Title: "Messages Autonomes",
    pillar1Desc: "L'IA envoie des messages parfaits et traduits. Zéro saisie, réactivité 24/7.",
    pillar2Title: "Conciergerie Digitale",
    pillar2Desc: "Livret d’accueil QR Code. L'assistant IA répond aux voyageurs à votre place.",
    pillar3Title: "Problem Solver",
    pillar3Desc: "Désamorcez les litiges et gérez les avis difficiles pour protéger votre note.",
    formTitle: "Rejoindre la liste",
    formSubtitle: "Soyez les premiers à tester la révolution.",
    labelName: "Prénom",
    labelEmail: "Email",
    labelCount: "Logements",
    opt1: "1 logement",
    opt2: "2 à 5 logements",
    opt3: "Plus de 5",
    btnJoin: "RÉSERVER MA PLACE",
    btnLoading: "Envoi...",
    msgSuccess: "Bienvenue dans la liste !",
    msgError: "Une erreur est survenue.",
    msgEmailExists: "Déjà inscrit.",
    msgFieldRequired: "Prénom et email requis."
  }
}

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  useEffect(() => {
    if (navigator.language.split('-')[0] === 'fr') setLang('fr')
  }, [])

  const t = translations[lang]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [propertyCount, setPropertyCount] = useState(t.opt1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setStatus('error'); setMessage(t.msgFieldRequired); return
    }
    setStatus('loading')
    const { error } = await supabase.from('waitlist').insert([{ pseudo: name, email: email.toLowerCase(), property_count: propertyCount }])
    if (error) {
      setStatus('error'); setMessage(error.code === '23505' ? t.msgEmailExists : t.msgError)
    } else {
      setStatus('success'); setMessage(t.msgSuccess); setName(''); setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100">
      {/* SECTION HERO + FORMULAIRE (SANS SCROLL) */}
      <section className="relative px-6 py-12 lg:py-24 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          
          {/* GAUCHE : TEXTE */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
               <img src="/icon.png" alt="Logo" className="h-20 w-20 shadow-xl rounded-2xl bg-white p-2 border border-slate-100" />
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#eb5b62] text-xs font-black uppercase tracking-widest">
              {t.badge}
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* DROITE : FORMULAIRE (IMMEDIATEMENT VISIBLE) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative">
              <div className="absolute -top-4 -right-4 h-16 w-16 bg-[#eb5b62] rounded-full flex items-center justify-center text-white font-bold text-xl rotate-12 shadow-lg">
                Beta
              </div>
              <h2 className="text-2xl font-bold mb-2">{t.formTitle}</h2>
              <p className="text-slate-500 text-sm mb-8">{t.formSubtitle}</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={t.labelName}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-[#eb5b62] transition-all"
                />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.labelEmail}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-[#eb5b62] transition-all"
                />
                <select
                  value={propertyCount} onChange={(e) => setPropertyCount(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none appearance-none cursor-pointer"
                >
                  <option value={t.opt1}>{t.opt1}</option>
                  <option value={t.opt2}>{t.opt2}</option>
                  <option value={t.opt3}>{t.opt3}</option>
                </select>
                <button
                  type="submit" disabled={status === 'loading'}
                  className="w-full rounded-xl bg-[#eb5b62] py-5 text-white font-black tracking-widest hover:bg-[#d44f58] transition-all shadow-lg shadow-red-200 disabled:opacity-50"
                >
                  {status === 'loading' ? t.btnLoading : t.btnJoin}
                </button>
                {message && (
                  <p className={`text-center text-sm font-bold mt-4 ${status === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CARTES (PILLIERS) AVEC CONTRASTE */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { img: '/messaging.png', title: t.pillar1Title, desc: t.pillar1Desc },
              { img: '/booklet.png', title: t.pillar2Title, desc: t.pillar2Desc },
              { img: '/problem-solver.png', title: t.pillar3Title, desc: t.pillar3Desc },
            ].map((pillar) => (
              <article key={pillar.title} className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100 hover:border-[#eb5b6250] hover:bg-white hover:shadow-2xl transition-all duration-300">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <img src={pillar.img} alt={pillar.title} className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
        © {new Date().getFullYear()} HostMate AI — Built for professionals
      </footer>
    </div>
  )
}