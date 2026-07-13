import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const translations = {
  en: {
    badge: "HostMate Private Beta",
    heroTitle: "Automate your Airbnb operations.",
    heroSubtitle: "Save 5h/week and guarantee 5 stars thanks to AI.",
    pillar1Title: "Autonomous Messaging",
    pillar1Desc: "AI sends perfect, translated messages. Zero manual entry, 24/7 responsiveness.",
    pillar2Title: "Digital Concierge",
    pillar2Desc: "Smart welcome booklet via QR Code. AI answers guest questions in real time.",
    pillar3Title: "Problem Solver",
    pillar3Desc: "Defuse disputes and handle reviews strategically to protect your rating.",
    formTitle: "Join the Waitlist",
    formSubtitle: "Sign up in 30 seconds → get the PDF used by top-rated Airbnb hosts to hit 5 stars consistently. Free. Instant.",
    labelName: "Name",
    labelEmail: "Email",
    labelCount: "Properties",
    labelDevice: "Your phone",
    opt1: "1 property",
    opt2: "2 to 5 properties",
    opt3: "5+ properties",
    btnJoin: "RESERVE MY SPOT",
    btnLoading: "Sending...",
    thanksTitle: "You're on the list! 🎉",
    thanksMsg: "Check your inbox. A confirmation email is on its way. Welcome to the HostMate family!",
    deviceRequired: "Please select your device type.",
    selected: "✓ Selected",
    errorMsg: "Error. Please try again.",
    alreadyRegisteredMsg: "This email is already on the list — check your inbox, your confirmation is already there!",
    reviewsTitle: "What hosts say",
    reviewsSubtitle: "Real feedback from Airbnb professionals.",
    reviewsBtnOpen: "✍️ Leave a review",
    reviewFormTitle: "Share your experience",
    reviewFormSubtitle: "Help other hosts make a decision",
    labelReview: "Your review",
    labelRating: "Rating",
    btnSubmitReview: "SUBMIT REVIEW",
    btnLoadingReview: "Submitting...",
    btnCancel: "Cancel",
    reviewErrorMsg: "Failed to submit. Please try again.",
    reviewSuccessMsg: "Thank you! Your review has been published.",
    reviewsEmpty: "No reviews yet — be the first!",
    starLabel: "star",
    starsLabel: "stars",
  },
  fr: {
    badge: "HostMate Beta Privée",
    heroTitle: "Automatisez la gestion de vos Airbnb.",
    heroSubtitle: "Gagnez 5h/semaine et garantissez les 5 étoiles grâce à l'IA.",
    pillar1Title: "Messages Autonomes",
    pillar1Desc: "L'IA envoie des messages parfaits et traduits. Zéro saisie, réactivité 24/7.",
    pillar2Title: "Conciergerie Digitale",
    pillar2Desc: "Livret d'accueil QR Code. L'assistant IA répond aux voyageurs à votre place.",
    pillar3Title: "Problem Solver",
    pillar3Desc: "Désamorcez les litiges et gérez les avis difficiles pour protéger votre note.",
    formTitle: "Rejoindre la liste",
    formSubtitle: "Inscrivez-vous en 30 secondes → recevez le PDF qui a aidé des centaines d'hôtes à passer à 5 étoiles. Gratuit. Immédiat.",
    labelName: "Prénom",
    labelEmail: "Email",
    labelCount: "Logements",
    labelDevice: "Votre téléphone",
    opt1: "1 logement",
    opt2: "2 à 5 logements",
    opt3: "Plus de 5",
    btnJoin: "RÉSERVER MA PLACE",
    btnLoading: "Envoi...",
    thanksTitle: "C'est validé ! 🎉",
    thanksMsg: "Merci pour votre confiance. Un email de confirmation arrive dans votre boîte. À très vite !",
    deviceRequired: "Veuillez sélectionner votre type d'appareil.",
    selected: "✓ Sélectionné",
    errorMsg: "Erreur. Veuillez réessayer.",
    alreadyRegisteredMsg: "Cet email est déjà inscrit — regardez votre boîte mail, votre confirmation y est déjà !",
    reviewsTitle: "Ce que disent les hôtes",
    reviewsSubtitle: "Retours authentiques d'hôtes Airbnb.",
    reviewsBtnOpen: "✍️ Laisser un avis",
    reviewFormTitle: "Partagez votre expérience",
    reviewFormSubtitle: "Aidez d'autres hôtes à se décider",
    labelReview: "Votre avis",
    labelRating: "Note",
    btnSubmitReview: "PUBLIER MON AVIS",
    btnLoadingReview: "Publication...",
    btnCancel: "Annuler",
    reviewErrorMsg: "Erreur lors de la publication. Réessayez.",
    reviewSuccessMsg: "Merci ! Votre avis a été publié.",
    reviewsEmpty: "Pas encore d'avis — soyez le premier !",
    starLabel: "étoile",
    starsLabel: "étoiles",
  }
}

type DeviceType = 'ios' | 'android' | null

interface Review {
  id: string
  pseudo: string
  rating: number
  review: string
  created_at: string
}

export default function WaitlistPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  useEffect(() => {
    if (navigator.language.split('-')[0] === 'fr') setLang('fr')
  }, [])

  const t = translations[lang]

  // ─── WAITLIST ─────────────────────────────────────────────────────────────────
  const [name, setName]                   = useState('')
  const [email, setEmail]                 = useState('')
  const [propertyCount, setPropertyCount] = useState(t.opt1)
  const [device, setDevice]               = useState<DeviceType>(null)
  const [deviceError, setDeviceError]     = useState(false)
  const [status, setStatus]               = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')
  // Honeypot anti-spam : champ invisible pour un humain, que les bots
  // remplissent souvent automatiquement. S'il est rempli, on rejette
  // silencieusement sans le dire au bot (pas d'appel Supabase du tout).
  const [website, setWebsite]             = useState('')

  // ─── REVIEWS ─────────────────────────────────────────────────────────────────
  const [reviews, setReviews]             = useState<Review[]>([])
  const [showModal, setShowModal]         = useState(false)
  const [reviewName, setReviewName]       = useState('')
  const [reviewRating, setReviewRating]   = useState(5)
  const [reviewText, setReviewText]       = useState('')
  const [reviewStatus, setReviewStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, pseudo, rating, review, created_at')
        .order('created_at', { ascending: false })
      if (!error && data) setReviews(data as Review[])
    } catch (err) {
      console.error('Erreur chargement avis:', err)
    }
  }

  useEffect(() => { loadReviews() }, [])

  // Fermer avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Bloquer scroll quand modal ouverte
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!reviewName.trim() || !reviewText.trim()) return
    setReviewStatus('loading')
    const { error } = await supabase.from('reviews').insert([{
      pseudo: reviewName, rating: reviewRating, review: reviewText, language: lang,
    }])
    if (error) {
      setReviewStatus('error')
    } else {
      setReviewStatus('success')
      setReviewName('')
      setReviewText('')
      setReviewRating(5)
      setTimeout(() => {
        loadReviews()
        setReviewStatus('idle')
        setShowModal(false)
      }, 1500)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !email.trim()) return
    if (!device) { setDeviceError(true); return }
    if (website.trim()) { setStatus('success'); return } // honeypot rempli → faux succès, aucun insert
    setDeviceError(false)
    setStatus('loading')
    const userBrowserLang = navigator.language || 'en'
    const { error } = await supabase.from('waitlist').insert([{
      pseudo: name, email: email.toLowerCase(),
      property_count: propertyCount, language: userBrowserLang, device_type: device,
    }])
    if (error) {
      // Code Postgres 23505 = violation de contrainte UNIQUE (email déjà inscrit)
      setStatus(error.code === '23505' ? 'duplicate' : 'error')
    } else {
      setStatus('success')
    }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-red-100">

      {/* ── HERO ─────────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-12 lg:py-24 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 items-center">

          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <img src="/icon.png" alt="Logo" className="h-20 w-20 shadow-2xl rounded-3xl bg-white p-2 border border-slate-200" />
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-[#eb5b62] text-xs font-black uppercase tracking-widest">
              {t.badge}
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] text-slate-900">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {t.heroSubtitle}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 p-8 sm:p-12 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden text-white border border-slate-800">
              {status === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="text-7xl mb-6">🚀</div>
                  <h2 className="text-3xl font-black mb-4 text-white">{t.thanksTitle}</h2>
                  <p className="text-slate-400 leading-relaxed font-medium">{t.thanksMsg}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black mb-2">{t.formTitle}</h2>
                  <p className="text-sm mb-8 font-semibold leading-relaxed">
                    <span className="text-[#eb5b62]">📥</span>{' '}
                    <span className="text-slate-300">{t.formSubtitle}</span>
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot — invisible pour un humain (hors écran, jamais display:none
                        qui est parfois ignoré par les bots), jamais rempli par un vrai visiteur. */}
                    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off"
                        value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="wl-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{t.labelName}</label>
                      <input id="wl-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jean-Pierre"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-5 text-white outline-none focus:border-[#eb5b62] focus:ring-1 focus:ring-[#eb5b62] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="wl-email" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{t.labelEmail}</label>
                      <input id="wl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="contact@hostmate.ai"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-5 text-white outline-none focus:border-[#eb5b62] focus:ring-1 focus:ring-[#eb5b62] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="wl-count" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{t.labelCount}</label>
                      <select id="wl-count" value={propertyCount} onChange={(e) => setPropertyCount(e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-5 text-white outline-none cursor-pointer appearance-none">
                        <option value={t.opt1}>{t.opt1}</option>
                        <option value={t.opt2}>{t.opt2}</option>
                        <option value={t.opt3}>{t.opt3}</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{t.labelDevice}</span>
                      <div className="grid grid-cols-2 gap-3" role="group" aria-label={t.labelDevice}>
                        <button type="button" aria-pressed={device === 'ios'} onClick={() => { setDevice('ios'); setDeviceError(false) }}
                          className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 py-5 px-4 font-bold text-sm tracking-wide transition-all duration-200 active:scale-95 ${device === 'ios' ? 'border-[#eb5b62] bg-[#eb5b62]/10 text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500'}`}>
                          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          iPhone / iPad
                          {device === 'ios' && <span className="text-[10px] font-black text-[#eb5b62] uppercase tracking-widest">{t.selected}</span>}
                        </button>
                        <button type="button" aria-pressed={device === 'android'} onClick={() => { setDevice('android'); setDeviceError(false) }}
                          className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 py-5 px-4 font-bold text-sm tracking-wide transition-all duration-200 active:scale-95 ${device === 'android' ? 'border-[#eb5b62] bg-[#eb5b62]/10 text-white' : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500'}`}>
                          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                            <path d="M17.523 15.341a.82.82 0 01-.82-.82.82.82 0 01.82-.82.82.82 0 01.82.82.82.82 0 01-.82.82m-11.046 0a.82.82 0 01-.82-.82.82.82 0 01.82-.82.82.82 0 01.82.82.82.82 0 01-.82.82M17.8 10.352l1.633-2.828a.34.34 0 00-.124-.464.34.34 0 00-.464.124l-1.655 2.866A10.08 10.08 0 0012 9.136a10.08 10.08 0 00-5.19 1.014L5.155 7.284a.34.34 0 00-.464-.124.34.34 0 00-.124.464l1.633 2.828C3.757 11.57 2.096 13.898 2 16.6h20c-.096-2.702-1.757-5.03-4.2-6.248"/>
                          </svg>
                          Android
                          {device === 'android' && <span className="text-[10px] font-black text-[#eb5b62] uppercase tracking-widest">{t.selected}</span>}
                        </button>
                      </div>
                      {deviceError && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{t.deviceRequired}</p>}
                    </div>
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full rounded-2xl bg-[#eb5b62] py-6 text-white font-black tracking-widest uppercase text-sm hover:bg-[#d44f58] transition-all shadow-xl shadow-[#eb5b6220] active:scale-95 disabled:opacity-50">
                      {status === 'loading' ? t.btnLoading : t.btnJoin}
                    </button>
                    {status === 'error' && (
                      <p className="text-center text-xs font-bold text-red-400 mt-4 italic">{t.errorMsg}</p>
                    )}
                    {status === 'duplicate' && (
                      <p className="text-center text-xs font-bold text-amber-400 mt-4 italic">{t.alreadyRegisteredMsg}</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLIERS ─────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-32 border-t border-slate-200 shadow-inner">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { img: '/messaging.png',      title: t.pillar1Title, desc: t.pillar1Desc },
              { img: '/booklet.png',         title: t.pillar2Title, desc: t.pillar2Desc },
              { img: '/problem-solver.png',  title: t.pillar3Title, desc: t.pillar3Desc },
            ].map((pillar) => (
              <article key={pillar.title} className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 hover:shadow-2xl hover:bg-white transition-all duration-500 group">
                <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white shadow-md group-hover:bg-red-50 transition-colors">
                  <img src={pillar.img} alt={pillar.title} className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black mb-6 text-slate-900 leading-tight">{pillar.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION AVIS ─────────────────────────────────────────────────────────── */}
      <section id="avis" className="bg-slate-900 py-24 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6">

          {/* EN-TÊTE section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
                {t.reviewsTitle}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-slate-400 font-medium">{t.reviewsSubtitle}</p>
                {avgRating && (
                  <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                    <span className="text-[#eb5b62] text-sm">★</span>
                    <span className="text-white text-sm font-black">{avgRating}</span>
                    <span className="text-slate-500 text-xs">({reviews.length})</span>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setShowModal(true)}
              className="self-start sm:self-auto flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-[#eb5b62] text-[#eb5b62] font-bold text-sm hover:bg-[#eb5b62] hover:text-white transition-all duration-200 active:scale-95 whitespace-nowrap">
              {t.reviewsBtnOpen}
            </button>
          </div>

          {/* GRILLE AVIS — masonry columns */}
          {reviews.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {reviews.map((review) => (
                <article key={review.id}
                  className="break-inside-avoid bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-[#eb5b62]/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#eb5b62]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#eb5b62] font-black text-sm">
                          {review.pseudo.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-white text-sm leading-none">{review.pseudo}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {new Date(review.created_at).toLocaleDateString(
                            lang === 'fr' ? 'fr-FR' : 'en-US',
                            { month: 'short', year: 'numeric' }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5" aria-label={`${review.rating}/5`}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} aria-hidden="true" className={`text-sm ${i < review.rating ? 'text-[#eb5b62]' : 'text-slate-700'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{review.review}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-3xl">
              <div className="text-5xl mb-4">⭐</div>
              <p className="text-slate-400 font-medium mb-6">{t.reviewsEmpty}</p>
              <button onClick={() => setShowModal(true)}
                className="px-6 py-3 rounded-xl bg-[#eb5b62] text-white font-bold text-sm hover:bg-[#d44f58] transition-all active:scale-95">
                {t.reviewsBtnOpen}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────────── */}
      <footer className="py-16 text-center text-slate-400 text-xs font-black tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} HostMate AI — Built for professionals
      </footer>

      {/* ── MODAL AVIS ───────────────────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-[2rem] p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">{t.reviewFormTitle}</h3>
                <p className="text-sm text-slate-400 mt-1">{t.reviewFormSubtitle}</p>
              </div>
              <button onClick={() => setShowModal(false)} aria-label={t.btnCancel}
                className="text-slate-500 hover:text-white transition-colors text-2xl leading-none ml-4 flex-shrink-0">
                ✕
              </button>
            </div>

            {reviewStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🎉</div>
                <p className="text-green-400 font-bold">{t.reviewSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-5">

                {/* NOM */}
                <div className="space-y-2">
                  <label htmlFor="rv-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.labelName}</label>
                  <input id="rv-name" type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} required
                    placeholder="Marie D."
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-[#eb5b62] focus:ring-1 focus:ring-[#eb5b62] transition-all text-sm" />
                </div>

                {/* ÉTOILES */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.labelRating}</span>
                  <div className="flex gap-2" role="radiogroup" aria-label={t.labelRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setReviewRating(star)}
                        role="radio" aria-checked={star === reviewRating}
                        aria-label={`${star} ${star > 1 ? t.starsLabel : t.starLabel}`}
                        className={`text-3xl transition-all hover:scale-110 ${star <= reviewRating ? 'text-[#eb5b62]' : 'text-slate-600'}`}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* COMMENTAIRE */}
                <div className="space-y-2">
                  <label htmlFor="rv-text" className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.labelReview}</label>
                  <textarea id="rv-text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required
                    placeholder={lang === 'fr' ? 'Décrivez votre expérience...' : 'Describe your experience...'}
                    rows={4}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-[#eb5b62] focus:ring-1 focus:ring-[#eb5b62] transition-all text-sm resize-none" />
                </div>

                {/* BOUTONS */}
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border border-slate-700 py-3 text-slate-400 font-bold text-sm hover:border-slate-500 hover:text-white transition-all">
                    {t.btnCancel}
                  </button>
                  <button type="submit" disabled={reviewStatus === 'loading'}
                    className="flex-1 rounded-xl bg-[#eb5b62] py-3 text-white font-black tracking-widest uppercase text-sm hover:bg-[#d44f58] transition-all active:scale-95 disabled:opacity-50">
                    {reviewStatus === 'loading' ? t.btnLoadingReview : t.btnSubmitReview}
                  </button>
                </div>

                {reviewStatus === 'error' && (
                  <p className="text-center text-xs font-bold text-red-400">{t.reviewErrorMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
