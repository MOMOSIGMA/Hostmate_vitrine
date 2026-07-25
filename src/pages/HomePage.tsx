import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import MessageFlow from '../components/MessageFlow'
import DemoVideo from '../components/DemoVideo'
import DotGrid from '../components/DotGrid'
import GridLines from '../components/GridLines'
import MoreFeatures from '../components/MoreFeatures'
import Pricing from '../components/Pricing'
import QRCard from '../components/QRCard'

// ─── Contenu ────────────────────────────────────────────────────────────────
// Style volontairement sobre (voir brief) : pas de traduction "littérale"
// mot à mot entre langues, un texte pensé pour chacune.

const translations = {
  en: {
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navCta: 'Join the beta',
    heroTitle: 'Other tools manage your bookings. HostMate helps you become a better host, every day.',
    heroSubtitle:
      'Property score, perfect guest messages sent at the right time, a smart welcome guide, and dispute handling — HostMate shows you what to improve, while you stay fully in control.',
    heroCta: 'Join the private beta',
    heroNote: 'Free during the beta · No credit card',
    demoEyebrow: 'See for yourself',
    demoTitle: 'One new guest. One perfect message. A few clicks.',
    flowEyebrow: 'See it happen',
    flowTitle: 'One line from you. A perfect message for them.',
    featuresEyebrow: 'What HostMate does',
    moreEyebrow: 'And there\'s more',
    moreTitle: 'The full toolkit, without the overwhelm.',
    reportCaption: 'The AI report, in your pocket — trends, insights, and what to fix.',
    pricingEyebrow: 'Pricing',
    pricingTitle: 'Simple pricing, no surprises.',
    f1Title: 'Perfect messages, sent at the right time',
    f1Body:
      "Check-in, mid-stay follow-up, check-out: Hosty writes and sends a personalized email automatically, instantly translated into your guest's language. No copy-pasting, no forgotten reminders, running around the clock.",
    f2Title: 'A welcome guide that answers for you',
    f2Body:
      'Generate a digital welcome guide in seconds. Guests open it via QR code and ask Hosty, your AI concierge, directly — wifi password, house rules, local recommendations, any time of day.',
    f3Title: 'Defuse conflicts before they escalate',
    f3Body:
      'An unhappy guest, a tricky complaint? The AI reads the situation and drafts a firm but professional reply, in the guest\'s own language — protecting your rating without ruining your evening.',
    ctaTitle: 'Ready to get your evenings back?',
    ctaSubtitle: 'Join the private beta — takes 30 seconds.',
    ctaButton: 'Join the private beta',
    footerTagline: 'The AI that helps hosts get better, every day.',
    footerRights: 'All rights reserved.',
  },
  fr: {
    navFeatures: 'Fonctionnalités',
    navPricing: 'Tarifs',
    navReviews: 'Avis',
    navCta: 'Rejoindre la beta',
    heroTitle: "Les autres outils gèrent vos réservations. HostMate vous aide à devenir un meilleur hôte, chaque jour.",
    heroSubtitle:
      "Score de votre logement, messages parfaits envoyés au bon moment, livret d'accueil intelligent et gestion des litiges — HostMate vous montre ce qu'il faut améliorer, pendant que vous gardez le contrôle.",
    heroCta: 'Rejoindre la beta privée',
    heroNote: 'Gratuit pendant la beta · Sans carte bancaire',
    demoEyebrow: 'Voyez par vous-même',
    demoTitle: 'Un voyageur ajouté. Un message parfait généré. En quelques clics.',
    flowEyebrow: 'En direct',
    flowTitle: 'Une ligne de votre part. Un message parfait pour eux.',
    featuresEyebrow: 'Ce que fait HostMate',
    moreEyebrow: 'Et ce n\'est pas tout',
    moreTitle: 'Toute la boîte à outils, sans surcharge.',
    reportCaption: 'Le rapport IA, dans votre poche — tendances, insights, et quoi corriger.',
    pricingEyebrow: 'Tarifs',
    pricingTitle: 'Des tarifs simples, sans surprise.',
    f1Title: 'Des messages parfaits, envoyés au bon moment',
    f1Body:
      "Check-in, suivi de séjour, check-out : Hosty rédige et envoie automatiquement un email personnalisé, traduit instantanément dans la langue de vos voyageurs. Zéro copier-coller, zéro oubli, actif à toute heure.",
    f2Title: "Un livret d'accueil qui répond à leur place",
    f2Body:
      "Générez un livret d'accueil numérique en quelques secondes. Vos voyageurs y accèdent par QR code et posent leurs questions directement à Hosty, votre concierge IA — wifi, règles de la maison, bonnes adresses du quartier, à toute heure.",
    f3Title: "Désamorcez les conflits avant qu'ils n'éclatent",
    f3Body:
      "Un voyageur mécontent, une réclamation délicate ? L'IA analyse la situation et rédige une réponse ferme mais professionnelle, dans la langue du voyageur — pour protéger votre note sans y passer la soirée.",
    ctaTitle: 'Prêt à récupérer vos soirées ?',
    ctaSubtitle: 'Rejoignez la beta privée — 30 secondes suffisent.',
    ctaButton: 'Rejoindre la beta privée',
    footerTagline: "L'IA qui aide les hôtes à devenir meilleurs, chaque jour.",
    footerRights: 'Tous droits réservés.',
  },
}

type Lang = keyof typeof translations
type TFields = (typeof translations)['en']

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: TFields }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-hostmate-ink/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-semibold text-lg tracking-tight text-hostmate-ink">
          HostMate<span className="text-hostmate-primary">.</span>
        </span>

        <nav className="hidden md:flex items-center gap-8 text-sm text-hostmate-textGrey">
          <a href="#features" className="hover:text-hostmate-ink transition-colors">{t.navFeatures}</a>
          <a href="#pricing" className="hover:text-hostmate-ink transition-colors">{t.navPricing}</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="text-xs font-medium text-hostmate-textGrey hover:text-hostmate-ink transition-colors uppercase tracking-wide"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <Link to="/waitlist" className="btn-primary text-sm py-2.5 px-5">{t.navCta}</Link>
        </div>

        <button className="md:hidden text-hostmate-ink" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hostmate-ink/5 bg-white px-6 py-4 flex flex-col gap-4 text-sm">
          <a href="#features" onClick={() => setOpen(false)} className="text-hostmate-textGrey">{t.navFeatures}</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="text-hostmate-textGrey">{t.navPricing}</a>
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="text-left text-hostmate-textGrey uppercase tracking-wide text-xs"
          >
            {lang === 'en' ? 'Français' : 'English'}
          </button>
          <Link to="/waitlist" className="btn-primary text-center text-sm">{t.navCta}</Link>
        </div>
      )}
    </header>
  )
}

// ─── Feature (alternée) ─────────────────────────────────────────────────────
// image = null tant qu'aucune vraie capture d'écran n'existe pour cette
// fonctionnalité (voir HomePage) — mieux vaut du texte seul, centré, que la
// grande icône générique dégradé violet/turquoise qui était là avant : elle
// contredisait directement le brief ("pas d'illustration générique").
function Feature({
  title, body, image, reverse, wide,
}: { title: string; body: string; image: string | null; reverse?: boolean; wide?: boolean }) {
  if (!image) {
    return (
      <Reveal className="max-w-lg mx-auto text-center">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink leading-snug mb-5">
          {title}
        </h3>
        <p className="text-hostmate-textGrey text-base leading-relaxed">
          {body}
        </p>
      </Reveal>
    )
  }
  // Format large (image paysage, ex: mockup de mise en situation) — texte
  // centré au-dessus, image pleine largeur en dessous, plutôt que la grille
  // 2 colonnes pensée pour des captures au format téléphone.
  if (wide) {
    return (
      <Reveal className="max-w-3xl mx-auto text-center">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink leading-snug mb-5">
          {title}
        </h3>
        <p className="text-hostmate-textGrey text-base leading-relaxed max-w-md mx-auto mb-10">
          {body}
        </p>
        <TiltCard className="max-w-lg mx-auto rounded-2xl">
          <img
            src={image}
            alt=""
            className="w-full rounded-2xl"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at center, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at center, black 65%, transparent 100%)',
            }}
          />
        </TiltCard>
      </Reveal>
    )
  }
  return (
    <Reveal className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div className={reverse ? 'md:order-2' : ''}>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink leading-snug mb-5">
          {title}
        </h3>
        <p className="text-hostmate-textGrey text-base leading-relaxed max-w-md">
          {body}
        </p>
      </div>
      <div className={reverse ? 'md:order-1' : ''}>
        <TiltCard className="max-w-sm mx-auto rounded-2xl">
          <img
            src={image}
            alt=""
            className="w-full rounded-2xl border border-hostmate-ink/10 shadow-[0_20px_60px_-20px_rgba(28,28,46,0.25)]"
          />
        </TiltCard>
      </div>
    </Reveal>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    if (browserLang === 'fr') setLang('fr')
  }, [])

  const t = translations[lang]

  return (
    <div className="font-sans">
      <Nav lang={lang} setLang={setLang} t={t} />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        {/* Texture + lueur : donne du caractère au fond au lieu du blanc nu.
            Grille technique (lignes) + points + lueur corail très diffuse
            derrière le téléphone — pas de nouvelle couleur ajoutée. */}
        <GridLines className="h-[42rem]" />
        <DotGrid className="h-[42rem]" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-40 -translate-x-1/2 w-[50rem] h-[30rem] opacity-[0.08]"
          style={{ background: 'radial-gradient(closest-side, #E8534A, transparent)' }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h1
              className="font-display font-semibold text-hostmate-ink leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.25rem)' }}
            >
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg text-hostmate-textGrey leading-relaxed max-w-xl mx-auto">
              {t.heroSubtitle}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link to="/waitlist" className="btn-primary text-base">{t.heroCta}</Link>
              <span className="text-xs text-hostmate-textGrey">{t.heroNote}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="relative mt-14 flex justify-center">
          <img
            src="/Home.jpeg"
            alt="HostMate AI dashboard"
            className="w-full max-w-[300px] h-auto"
          />
        </Reveal>
      </section>

      {/* ── Vraie démo vidéo — la preuve, avant la reconstitution ── */}
      <section className="relative px-6" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hostmate-primary mb-3">
            {t.demoEyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink max-w-xl mx-auto">
            {t.demoTitle}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <DemoVideo lang={lang} />
        </Reveal>
      </section>

      {/* ── Diagramme signature : comment un message circule ── */}
      <section className="relative px-6" style={{ paddingTop: 64, paddingBottom: 88 }}>
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hostmate-primary mb-3">
            {t.flowEyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink max-w-xl mx-auto">
            {t.flowTitle}
          </h2>
        </Reveal>
        <MessageFlow lang={lang} />
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative px-6" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <DotGrid className="h-[36rem]" />
        <div className="relative max-w-5xl mx-auto">
          <Reveal className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hostmate-primary">
              {t.featuresEyebrow}
            </p>
          </Reveal>

          <div className="flex flex-col" style={{ gap: 88 }}>
            <Feature title={t.f1Title} body={t.f1Body} image="/Mission.jpeg" />

            {/* Livret d'accueil — composé en code (cadre téléphone + carte QR
                codée), pas une photo composite externe : les deux pièces
                restent de vrais éléments d'interface, cohérents avec le
                reste de la page. */}
            <Reveal className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="md:order-2">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink leading-snug mb-5">
                  {t.f2Title}
                </h3>
                <p className="text-hostmate-textGrey text-base leading-relaxed max-w-md">
                  {t.f2Body}
                </p>
              </div>
              <div className="md:order-1 flex flex-col sm:flex-row items-center sm:items-end justify-center gap-6">
                <img
                  src="/Livret.png"
                  alt="Livret d'accueil HostMate AI"
                  className="w-full max-w-[240px] h-auto rounded-lg"
                />
                <QRCard lang={lang} />
              </div>
            </Reveal>

            <Feature title={t.f3Title} body={t.f3Body} image="/resolution_probleme.png" />
          </div>
        </div>
      </section>

      {/* ── Le reste des fonctionnalités : grille dense, pas de bloc géant
          par feature — la valeur complète sans faire scroller pendant
          3 écrans (voir brief). ── */}
      <section className="relative px-6 bg-hostmate-ink/[0.02]" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <Reveal className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hostmate-primary mb-3">
            {t.moreEyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink">
            {t.moreTitle}
          </h2>
        </Reveal>
        <MoreFeatures lang={lang} />

        <Reveal delay={150} className="mt-14 flex flex-wrap items-start justify-center gap-6">
          <TiltCard className="w-40 sm:w-48 rounded-2xl">
            <img
              src="/rapport_ia.png"
              alt="Rapport IA — aperçu"
              className="w-full rounded-2xl border border-hostmate-ink/10 shadow-[0_20px_50px_-20px_rgba(28,28,46,0.3)]"
            />
          </TiltCard>
          <TiltCard className="w-40 sm:w-48 rounded-2xl mt-8">
            <img
              src="/rapport_ia2.png"
              alt="Rapport IA — aperçu 2"
              className="w-full rounded-2xl border border-hostmate-ink/10 shadow-[0_20px_50px_-20px_rgba(28,28,46,0.3)]"
            />
          </TiltCard>
        </Reveal>
        <p className="mt-6 text-center text-sm text-hostmate-textGrey max-w-sm mx-auto">
          {t.reportCaption}
        </p>
      </section>

      {/* ── Tarifs ── */}
      <section id="pricing" className="px-6" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <Reveal className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hostmate-primary mb-3">
            {t.pricingEyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink">
            {t.pricingTitle}
          </h2>
        </Reveal>
        <Pricing lang={lang} />
      </section>

      {/* ── CTA — section inversée (fond anthracite), casse le blanc ── */}
      <section className="relative px-6 overflow-hidden bg-hostmate-ink" style={{ paddingTop: 96, paddingBottom: 104 }}>
        <GridLines dark className="h-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[50rem] h-[26rem] opacity-[0.18]"
          style={{ background: 'radial-gradient(closest-side, #E8534A, transparent)' }}
        />
        <Reveal className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {t.ctaTitle}
          </h2>
          <p className="mt-4 text-white/60">{t.ctaSubtitle}</p>
          <Link to="/waitlist" className="btn-primary inline-block mt-8 text-base">{t.ctaButton}</Link>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-hostmate-ink/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display font-semibold text-hostmate-ink">
              HostMate<span className="text-hostmate-primary">.</span>
            </span>
            <p className="text-xs text-hostmate-textGrey mt-1">{t.footerTagline}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-hostmate-textGrey">
            <a href="#features" className="hover:text-hostmate-ink transition-colors">{t.navFeatures}</a>
            <a href="mailto:support@hosmateai.com" className="hover:text-hostmate-ink transition-colors">Contact</a>
            <a
              href="https://www.linkedin.com/company/129604206"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hostmate-ink transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-xs text-hostmate-textGrey">© {new Date().getFullYear()} HostMate AI. {t.footerRights}</p>
        </div>
      </footer>
    </div>
  )
}
