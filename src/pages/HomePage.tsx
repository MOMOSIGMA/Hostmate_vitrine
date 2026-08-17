import { useEffect, useState } from 'react'
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
    navCta: 'Start free trial',
    heroTitle: 'Protect the rating you worked for.',
    heroSubtitle:
      'A bad review rarely comes from the apartment — it comes from what was never said. HostMate handles the messages, the welcome guide and the tricky complaints, in your guest\'s language.',
    heroCta: 'Start your 7-day free trial',
    heroNote: '7 days free · No credit card',
    demoEyebrow: 'See for yourself',
    demoTitle: 'Add a guest in seconds. HostMate takes it from there.',
    flowEyebrow: 'See it happen',
    flowTitle: 'It knows your property, your guest, even the weather.',
    featuresEyebrow: 'What HostMate does',
    moreEyebrow: 'And there\'s more',
    moreTitle: 'The full toolkit, without the overwhelm.',
    beyondEyebrow:
      'More than messages',
    beyondTitle:
      'What happens before they arrive, and after they leave.',
    b1Title:
      'Your property tells you what it is missing',
    b1Body:
      'HostMate reads your listing the way a demanding guest would: an address with no GPS, amenities left unchecked, a half-filled guide. Every gap is scored — so you know where to start, and what it is worth.',
    b2Title:
      'Your cleaning team notified without you',
    b2Body:
      'At every departure, an email goes out on its own — to your cleaner, your plumber, whoever you choose. You write it once; it goes out for every stay, including the ones you forget.',
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
    ctaSubtitle: 'Start your 7-day free trial — takes 30 seconds.',
    ctaButton: 'Start your 7-day free trial',
    footerTagline: 'Less managing. More hosting.',
    footerRights: 'All rights reserved.',
  },
  fr: {
    navFeatures: 'Fonctionnalités',
    navPricing: 'Tarifs',
    navReviews: 'Avis',
    navCta: 'Essai gratuit',
    heroTitle: "Protégez la note que vous avez mis des mois à bâtir.",
    heroSubtitle:
      "Un mauvais avis parle rarement du logement — il parle de ce qui n'a pas été dit. HostMate s'occupe des messages, du livret d'accueil et des litiges délicats, dans la langue de votre voyageur.",
    heroCta: "Démarrer l'essai gratuit de 7 jours",
    heroNote: '7 jours gratuits · Sans carte bancaire',
    demoEyebrow: 'Voyez par vous-même',
    demoTitle: 'Ajoutez un voyageur en quelques secondes. HostMate fait le reste.',
    flowEyebrow: 'En direct',
    flowTitle: 'Il connaît votre logement, votre voyageur, et même la météo.',
    featuresEyebrow: 'Ce que fait HostMate',
    moreEyebrow: 'Et ce n\'est pas tout',
    moreTitle: 'Toute la boîte à outils, sans surcharge.',
    beyondEyebrow:
      'Pas seulement des messages',
    beyondTitle:
      'Ce qui se passe avant l\'arrivée, et après le départ.',
    b1Title:
      'Votre fiche vous dit ce qui lui manque',
    b1Body:
      'HostMate relit votre logement comme le ferait un voyageur exigeant : une adresse sans coordonnées GPS, des équipements jamais cochés, un livret à moitié rempli. Chaque manque est chiffré — vous savez par quoi commencer, et ce que ça vous rapporte.',
    b2Title:
      'Votre équipe de ménage prévenue sans vous',
    b2Body:
      'À chaque départ, un email part tout seul vers votre femme de ménage, votre plombier, qui vous voulez. Vous l\'écrivez une fois ; il part à chaque séjour, y compris ceux que vous oubliez.',
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
    ctaSubtitle: 'Démarrez votre essai gratuit de 7 jours — 30 secondes suffisent.',
    ctaButton: "Démarrer l'essai gratuit de 7 jours",
    footerTagline: "Moins de gestion. Plus d'hospitalité.",
    footerRights: 'Tous droits réservés.',
  },
  es: {
    navFeatures: 'Funciones',
    navPricing: 'Precios',
    navReviews: 'Opiniones',
    navCta: 'Prueba gratuita',
    heroTitle: 'Protege la valoración que tanto te ha costado.',
    heroSubtitle:
      'Una mala reseña rara vez habla del alojamiento — habla de lo que no se dijo. HostMate se encarga de los mensajes, la guía de bienvenida y las quejas delicadas, en el idioma de tu huésped.',
    heroCta: 'Empezar la prueba gratuita de 7 días',
    heroNote: '7 días gratis · Sin tarjeta bancaria',
    demoEyebrow: 'Compruébalo tú mismo',
    demoTitle: 'Añade un huésped en segundos. HostMate hace el resto.',
    flowEyebrow: 'En directo',
    flowTitle: 'Conoce tu alojamiento, tu huésped, incluso el tiempo.',
    featuresEyebrow: 'Lo que hace HostMate',
    moreEyebrow: 'Y eso no es todo',
    moreTitle: 'Todas las herramientas, sin sobrecarga.',
    beyondEyebrow:
      'No solo mensajes',
    beyondTitle:
      'Lo que pasa antes de que lleguen, y después de que se van.',
    b1Title:
      'Tu alojamiento te dice lo que le falta',
    b1Body:
      'HostMate revisa tu alojamiento como lo haría un huésped exigente: una dirección sin GPS, equipamientos sin marcar, una guía a medio llenar. Cada carencia lleva su puntuación — sabes por dónde empezar y lo que te aporta.',
    b2Title:
      'Tu equipo de limpieza avisado sin ti',
    b2Body:
      'En cada salida, un email sale solo hacia tu limpiadora, tu fontanero, quien tú elijas. Lo escribes una vez; sale en cada estancia, incluidas las que se te olvidan.',
    reportCaption: 'El informe de IA, en tu bolsillo — tendencias, análisis y qué corregir.',
    pricingEyebrow: 'Precios',
    pricingTitle: 'Precios claros, sin sorpresas.',
    f1Title: 'Mensajes perfectos, enviados en el momento justo',
    f1Body:
      'Check-in, seguimiento de la estancia, check-out: Hosty redacta y envía automáticamente un email personalizado, traducido al instante al idioma de tus huéspedes. Sin copiar y pegar, sin olvidos, a cualquier hora.',
    f2Title: 'Un manual de bienvenida que responde por ti',
    f2Body:
      'Genera un manual de bienvenida digital en segundos. Tus huéspedes acceden con un código QR y preguntan directamente a Hosty, tu conserje con IA — wifi, normas de la casa, buenos sitios del barrio, a cualquier hora.',
    f3Title: 'Desactiva los conflictos antes de que estallen',
    f3Body:
      'Un huésped descontento, una reclamación delicada? La IA analiza la situación y redacta una respuesta firme pero profesional, en el idioma del huésped — para proteger tu valoración sin arruinarte la noche.',
    ctaTitle: 'Listo para recuperar tus noches?',
    ctaSubtitle: 'Empieza tu prueba gratuita de 7 días — bastan 30 segundos.',
    ctaButton: 'Empezar la prueba gratuita de 7 días',
    footerTagline: 'Menos gestión. Más hospitalidad.',
    footerRights: 'Todos los derechos reservados.',
  },
  it: {
    navFeatures: 'Funzionalità',
    navPricing: 'Prezzi',
    navReviews: 'Recensioni',
    navCta: 'Prova gratuita',
    heroTitle: 'Proteggi la valutazione che ti sei guadagnato.',
    heroSubtitle:
      'Una recensione negativa parla di rado dell\'alloggio — parla di ciò che non è stato detto. HostMate si occupa dei messaggi, della guida di benvenuto e dei reclami delicati, nella lingua del tuo ospite.',
    heroCta: 'Inizia la prova gratuita di 7 giorni',
    heroNote: '7 giorni gratis · Senza carta di credito',
    demoEyebrow: 'Guarda con i tuoi occhi',
    demoTitle: 'Aggiungi un ospite in pochi secondi. HostMate fa il resto.',
    flowEyebrow: 'In diretta',
    flowTitle: 'Conosce il tuo alloggio, il tuo ospite, perfino il meteo.',
    featuresEyebrow: 'Cosa fa HostMate',
    moreEyebrow: 'E non è tutto',
    moreTitle: 'Tutti gli strumenti, senza sovraccarico.',
    beyondEyebrow:
      'Non solo messaggi',
    beyondTitle:
      'Quello che succede prima dell\'arrivo, e dopo la partenza.',
    b1Title:
      'Il tuo alloggio ti dice cosa gli manca',
    b1Body:
      'HostMate rilegge il tuo alloggio come farebbe un ospite esigente: un indirizzo senza GPS, dotazioni mai spuntate, un libretto riempito a metà. Ogni mancanza ha il suo punteggio — sai da dove cominciare, e quanto ti rende.',
    b2Title:
      'La tua squadra di pulizie avvisata senza di te',
    b2Body:
      'A ogni partenza, un\'email parte da sola verso la tua addetta alle pulizie, il tuo idraulico, chi vuoi tu. La scrivi una volta; parte a ogni soggiorno, compresi quelli che dimentichi.',
    reportCaption: 'Il report AI, in tasca — tendenze, analisi e cosa correggere.',
    pricingEyebrow: 'Prezzi',
    pricingTitle: 'Prezzi chiari, senza sorprese.',
    f1Title: 'Messaggi perfetti, inviati al momento giusto',
    f1Body:
      'Check-in, follow-up del soggiorno, check-out: Hosty scrive e invia automaticamente un email personalizzata, tradotta all istante nella lingua dei tuoi ospiti. Niente copia-incolla, niente dimenticanze, attivo a qualsiasi ora.',
    f2Title: 'Una guida di benvenuto che risponde al posto tuo',
    f2Body:
      'Genera una guida di benvenuto digitale in pochi secondi. I tuoi ospiti vi accedono con un QR code e fanno le loro domande direttamente a Hosty, il tuo concierge AI — wifi, regole della casa, indirizzi del quartiere, a qualsiasi ora.',
    f3Title: 'Disinnesca i conflitti prima che esplodano',
    f3Body:
      'Un ospite scontento, un reclamo delicato? L AI analizza la situazione e scrive una risposta ferma ma professionale, nella lingua dell ospite — per proteggere la tua valutazione senza rovinarti la serata.',
    ctaTitle: 'Pronto a riprenderti le tue serate?',
    ctaSubtitle: 'Inizia la prova gratuita di 7 giorni — bastano 30 secondi.',
    ctaButton: 'Inizia la prova gratuita di 7 giorni',
    footerTagline: 'Meno gestione. Più ospitalità.',
    footerRights: 'Tutti i diritti riservati.',
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
        {/* translate="no" : un navigateur qui traduit la page traduisait aussi
            la marque. Un nom de marque ne se traduit pas — il s'ecrit pareil
            dans toutes les langues. Signale le 01/08/2026 sur Edge.
            Le « AI » remplace le point : le produit s'appelle HostMate AI
            partout ailleurs (titre, emails, domaine), le logo l'omettait. */}
        <span
          translate="no"
          className="notranslate font-display font-semibold text-lg tracking-tight text-hostmate-ink"
        >
          HostMate<span className="text-hostmate-primary"> AI</span>
        </span>

        <nav className="hidden md:flex items-center gap-8 text-sm text-hostmate-textGrey">
          <a href="#features" className="hover:text-hostmate-ink transition-colors">{t.navFeatures}</a>
          <a href="#pricing" className="hover:text-hostmate-ink transition-colors">{t.navPricing}</a>
          {/* Le blog est en HTML statique, hors de React : un <a>, pas un <Link>.

              Il n'était accessible que par le pied de page, tout en bas — donc
              introuvable sans scroller le site entier. Un blog qu'on ne trouve
              pas ne se lit pas, et ne ramène personne. */}
          <a href="/blog/" className="hover:text-hostmate-ink transition-colors">Blog</a>
          {/* Le guide n'était atteignable qu'en FIN d'article : il fallait donc
              déjà lire un article pour le découvrir. Un guide gratuit est un
              argument d'entrée, pas une récompense de fin de parcours. */}
          <a href="/guides/messages-voyageur/" className="text-hostmate-primary font-medium hover:opacity-80 transition-opacity">Guide gratuit</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="text-xs font-medium text-hostmate-textGrey hover:text-hostmate-ink transition-colors uppercase tracking-wide"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <a href="https://app.hostmateai.app" className="btn-primary text-sm py-2.5 px-5">{t.navCta}</a>
        </div>

        <button className="md:hidden text-hostmate-ink" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hostmate-ink/5 bg-white px-6 py-4 flex flex-col gap-4 text-sm">
          <a href="#features" onClick={() => setOpen(false)} className="text-hostmate-textGrey">{t.navFeatures}</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="text-hostmate-textGrey">{t.navPricing}</a>
          {/* TROISIÈME correction de ce lien en deux jours (16/08/2026) :
              d'abord seulement dans le pied de page, puis conditionné à la
              version française, et ici tout simplement absent du menu mobile
              — donc introuvable pour la majorité des visiteurs.

              À chaque fois j'ai ajouté le lien à UN endroit en croyant l'avoir
              ajouté au site. Une navigation vit à trois endroits dans ce
              fichier : la barre desktop (~ligne 232), ce menu mobile, et le
              pied de page. Toucher l'un sans les autres donne un lien qui
              existe et qu'on ne trouve pas. */}
          <a href="/blog/" onClick={() => setOpen(false)} className="text-hostmate-textGrey">Blog</a>
          <a href="/guides/messages-voyageur/" onClick={() => setOpen(false)} className="text-hostmate-primary font-medium">Guide gratuit</a>
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="text-left text-hostmate-textGrey uppercase tracking-wide text-xs"
          >
            {lang === 'en' ? 'Français' : 'English'}
          </button>
          <a href="https://app.hostmateai.app" className="btn-primary text-center text-sm">{t.navCta}</a>
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
// Titre et description PAR LANGUE. Sans eux, les quatre URL renverraient le
// meme titre anglais : Google verrait quatre pages quasi identiques et n'en
// indexerait qu'une. Ce sont aussi les deux lignes que voit un internaute dans
// les resultats de recherche — elles decident du clic.
const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'HostMate AI — Become a better Airbnb host, every day',
    description:
      'Property score, perfectly timed guest messages, smart welcome guide and dispute handling. HostMate shows you what to improve while you stay in control. 7-day free trial.',
  },
  fr: {
    title: 'HostMate AI — Devenez un meilleur hôte Airbnb, chaque jour',
    description:
      "Score de votre logement, messages envoyés au bon moment, livret d'accueil intelligent et gestion des litiges. HostMate vous montre quoi améliorer. Essai gratuit de 7 jours.",
  },
  es: {
    title: 'HostMate AI — Sé mejor anfitrión de Airbnb, cada día',
    description:
      'Puntuación de tu alojamiento, mensajes enviados en el momento justo, manual de bienvenida inteligente y gestión de conflictos. Prueba gratuita de 7 días.',
  },
  it: {
    title: 'HostMate AI — Diventa un host Airbnb migliore, ogni giorno',
    description:
      'Punteggio del tuo alloggio, messaggi inviati al momento giusto, guida di benvenuto intelligente e gestione dei conflitti. Prova gratuita di 7 giorni.',
  },
}

const PATH_BY_LANG: Record<Lang, string> = {
  en: '/',
  fr: '/fr',
  es: '/es',
  it: '/it',
}

// Chemins des pages legales, par langue — voir App.tsx pour les routes et
// LegalPage.tsx pour le contenu (genere depuis les traductions de l'app).
const LEGAL: Record<'fr' | 'en' | 'es' | 'it',
  { privacy: string; terms: string; privacyLabel: string; termsLabel: string }> = {
  fr: { privacy: '/confidentialite', terms: '/conditions',
        privacyLabel: 'Confidentialité', termsLabel: "Conditions d'utilisation" },
  en: { privacy: '/privacy', terms: '/terms',
        privacyLabel: 'Privacy', termsLabel: 'Terms of Service' },
  es: { privacy: '/es/privacidad', terms: '/es/condiciones',
        privacyLabel: 'Privacidad', termsLabel: 'Condiciones' },
  it: { privacy: '/it/privacy', terms: '/it/condizioni',
        privacyLabel: 'Privacy', termsLabel: 'Condizioni' },
}

export default function HomePage({ lang: initialLang }: { lang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  // La langue vient de l'URL, plus de navigator.language : c'est ce qui rend
  // chaque version indexable. Le selecteur de langue met l'URL a jour sans
  // recharger la page, pour que le lien reste partageable.
  useEffect(() => setLang(initialLang), [initialLang])

  useEffect(() => {
    const meta = META[lang]
    document.title = meta.title
    document.documentElement.lang = lang

    const set = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', meta.description)
    set('meta[property="og:title"]', 'content', meta.title)
    set('meta[property="og:description"]', 'content', meta.description)
    set('link[rel="canonical"]', 'href', `https://hostmateai.app${PATH_BY_LANG[lang]}`)
    set('meta[property="og:url"]', 'content', `https://hostmateai.app${PATH_BY_LANG[lang]}`)

    // L'URL suit la langue choisie, sans rechargement : le visiteur peut
    // partager le lien de la version qu'il lit.
    const target = PATH_BY_LANG[lang]
    if (window.location.pathname !== target) {
      window.history.replaceState(null, '', target)
    }

    // On retient la langue lue. Sans ça, la redirection de la racine (voir
    // App.tsx) renverrait le visiteur vers la langue de son navigateur à
    // chaque retour — y compris juste après qu'il en ait choisi une autre.
    try {
      localStorage.setItem('hm_lang_choice', lang)
    } catch {
      // Stockage refusé : sans mémoire, la langue du navigateur reprend la
      // main au prochain passage. Dégradation acceptable, jamais un plantage.
    }
  }, [lang])

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
          style={{ background: 'radial-gradient(closest-side, #EC5B63, transparent)' }}
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
              <a href="https://app.hostmateai.app" className="btn-primary text-base">{t.heroCta}</a>
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

      {/* ── PAS SEULEMENT DES MESSAGES ──────────────────────────────────
          Les trois piliers ci-dessus parlent tous de communication avec le
          voyageur. Un visiteur en deduisait que HostMate est un outil de
          messagerie. Ces deux fonctions-la n'ont rien a voir : elles se
          passent avant l'arrivee et apres le depart, la ou personne ne
          regarde. ── */}
      <section className="relative px-6" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <Reveal className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hostmate-primary mb-3">
            {t.beyondEyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-hostmate-ink max-w-2xl mx-auto">
            {t.beyondTitle}
          </h2>
        </Reveal>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-10">
          <Reveal>
            <img
              src="/logement_scoore.png"
              alt=""
              className="w-full rounded-2xl border border-hostmate-ink/10 shadow-[0_20px_50px_-20px_rgba(28,28,46,0.3)]"
            />
            <h3 className="font-display text-lg font-semibold text-hostmate-ink mt-6 mb-2">
              {t.b1Title}
            </h3>
            <p className="text-sm leading-relaxed text-hostmate-textGrey">{t.b1Body}</p>
          </Reveal>

          <Reveal delay={120}>
            <img
              src="/rappel_pro.png"
              alt=""
              className="w-full rounded-2xl border border-hostmate-ink/10 shadow-[0_20px_50px_-20px_rgba(28,28,46,0.3)]"
            />
            <h3 className="font-display text-lg font-semibold text-hostmate-ink mt-6 mb-2">
              {t.b2Title}
            </h3>
            <p className="text-sm leading-relaxed text-hostmate-textGrey">{t.b2Body}</p>
          </Reveal>
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
          style={{ background: 'radial-gradient(closest-side, #EC5B63, transparent)' }}
        />
        <Reveal className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {t.ctaTitle}
          </h2>
          <p className="mt-4 text-white/60">{t.ctaSubtitle}</p>
          <a href="https://app.hostmateai.app" className="btn-primary inline-block mt-8 text-base">{t.ctaButton}</a>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-hostmate-ink/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span
              translate="no"
              className="notranslate font-display font-semibold text-hostmate-ink"
            >
              HostMate<span className="text-hostmate-primary"> AI</span>
            </span>
            {/* LA SIGNATURE DE MARQUE — une seule, invariable, collée au nom.
                C'est cette position précise qui la porte, et c'est elle qu'on
                mémorise. Identique à l'écran de démarrage de l'application, au
                manifeste web et au titre de la page (13/08/2026).

                À ne pas confondre avec les ACCROCHES, qui sont multiples et
                contextuelles : « Protégez la note que vous avez mis des mois à
                bâtir » dans le hero, « Prêts à retrouver vos soirées ? » sur
                l'appel final. Celles-là peuvent et doivent varier — deux
                SIGNATURES, en revanche, s'affaiblissent mutuellement.

                Elle disait « Devenez un meilleur hôte, chaque jour », reste de
                l'ancien titre « Become a better Airbnb host, every day »
                retiré la veille pour cause de marque tierce. */}
            <p className="text-xs text-hostmate-textGrey mt-1">{t.footerTagline}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-hostmate-textGrey">
            <a href="#features" className="hover:text-hostmate-ink transition-colors">{t.navFeatures}</a>
            {/* Sans lien entrant depuis le site, les articles sont orphelins :
                Google ne les découvre qu'au sitemap, avec bien moins de poids,
                et aucun visiteur ne tombe dessus par hasard.

                Ce lien était conditionné à `lang === 'fr'`, le blog n'existant
                qu'en français. Retiré le 16/08/2026 : la condition rendait le
                lien imprévisible — présent ou absent selon la page — au point
                qu'on a cru le déploiement raté. Un lien vers un blog français
                depuis la version espagnole est un inconvénient mineur ; un
                lien qu'on ne sait pas retrouver en est un vrai. */}
            <a href="/blog/" className="hover:text-hostmate-ink transition-colors">Blog</a>
            <a href="/guides/messages-voyageur/" className="hover:text-hostmate-ink transition-colors">Guide gratuit</a>
            <a href="/contact/" className="hover:text-hostmate-ink transition-colors">Contact</a>
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
          {/* Liens legaux : exiges par Google Play, et attendus par tout
              visiteur qui cherche a savoir ce qu'on fait de ses donnees. */}
          <div className="flex items-center gap-4 text-xs text-hostmate-textGrey">
            <a href={LEGAL[lang].privacy} className="hover:text-hostmate-ink transition-colors">
              {LEGAL[lang].privacyLabel}
            </a>
            <span className="text-hostmate-ink/20">·</span>
            <a href={LEGAL[lang].terms} className="hover:text-hostmate-ink transition-colors">
              {LEGAL[lang].termsLabel}
            </a>
          </div>
          <p className="text-xs text-hostmate-textGrey">© {new Date().getFullYear()} HostMate AI. {t.footerRights}</p>
        </div>
      </footer>
    </div>
  )
}
