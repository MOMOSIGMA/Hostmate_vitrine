import { useState } from 'react'
import { supabase } from '../lib/supabase'

// ─── « Plus de 5 logements ? Parlons-en. » ──────────────────────────────────
//
// POURQUOI CE BLOC EXISTE, ET POURQUOI IL N'EST PAS UNE TROISIÈME CARTE :
//
// Aujourd'hui, une conciergerie qui bute sur le 6e logement s'en va sans un
// mot. On ne sait même pas qu'elle est passée. C'est ça, la perte — pas le
// chiffre d'affaires manqué, l'information manquée.
//
// La tentation serait d'afficher une carte « Plan sur mesure — sur devis » à
// côté des deux autres. On s'en garde, pour deux raisons :
//
//   1. Cela promettrait un produit qui n'existe pas. Une conciergerie de 40
//      logements a besoin de comptes multiples pour son équipe, de rôles,
//      d'attribution par logement — rien de tout cela n'est construit. Une
//      société qui postule et qu'on ne peut pas servir n'est pas seulement un
//      prospect perdu : le milieu est petit et il se parle.
//   2. Trois cartes diluent la décision de l'hôte individuel, qui est la
//      cible réelle. Deux options, ça se tranche ; trois, ça se reporte.
//
// Une ligne discrète sous les cartes capte le prospect sans rien promettre —
// et le champ « combien de logements » dit gratuitement si la demande existe
// AVANT de construire quoi que ce soit. C'est la seule chose qu'on ignore.

const CONTENT = {
  fr: {
    hook: 'Plus de 5 logements ?',
    invite: 'Parlons-en.',
    intro: "Conciergerie ou hôte multi-logements : écrivez-nous, on étudie chaque situation au cas par cas.",
    email: 'Votre email',
    count: 'Combien de logements ?',
    message: 'Ce que vous gérez, en deux mots (optionnel)',
    submit: 'Envoyer',
    sending: 'Envoi…',
    done: "C'est noté. On vous écrit rapidement, à cette adresse.",
    error: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement.",
    invalidEmail: 'Cette adresse email semble incomplète.',
    invalidCount: 'Indiquez un nombre de logements.',
  },
  en: {
    hook: 'More than 5 properties?',
    invite: "Let's talk.",
    intro: 'Property manager or multi-property host: get in touch, we look at each situation individually.',
    email: 'Your email',
    count: 'How many properties?',
    message: 'What you manage, in a few words (optional)',
    submit: 'Send',
    sending: 'Sending…',
    done: "Got it. We'll write to you shortly, at this address.",
    error: "That didn't go through. Try again, or email us directly.",
    invalidEmail: 'That email address looks incomplete.',
    invalidCount: 'Please enter a number of properties.',
  },
  es: {
    hook: '¿Más de 5 alojamientos?',
    invite: 'Hablemos.',
    intro: 'Empresa de gestión o anfitrión con varios alojamientos: escríbenos, estudiamos cada situación caso por caso.',
    email: 'Tu email',
    count: '¿Cuántos alojamientos?',
    message: 'Qué gestionas, en pocas palabras (opcional)',
    submit: 'Enviar',
    sending: 'Enviando…',
    done: 'Anotado. Te escribimos pronto, a esta dirección.',
    error: 'El envío no se completó. Inténtalo de nuevo o escríbenos directamente.',
    invalidEmail: 'Esta dirección de email parece incompleta.',
    invalidCount: 'Indica un número de alojamientos.',
  },
  it: {
    hook: 'Più di 5 alloggi?',
    invite: 'Parliamone.',
    intro: 'Società di gestione o host con più alloggi: scrivici, valutiamo ogni situazione caso per caso.',
    email: 'La tua email',
    count: 'Quanti alloggi?',
    message: 'Cosa gestisci, in poche parole (facoltativo)',
    submit: 'Invia',
    sending: 'Invio…',
    done: 'Annotato. Ti scriviamo a breve, a questo indirizzo.',
    error: "L'invio non è riuscito. Riprova, oppure scrivici direttamente.",
    invalidEmail: 'Questo indirizzo email sembra incompleto.',
    invalidCount: 'Indica un numero di alloggi.',
  },
}

type State = 'idle' | 'sending' | 'done' | 'error'

export default function LargeHostLead({ lang }: { lang: 'fr' | 'en' | 'es' | 'it' }) {
  const c = CONTENT[lang]
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<State>('idle')
  const [email, setEmail] = useState('')
  const [count, setCount] = useState('')
  const [message, setMessage] = useState('')
  const [hint, setHint] = useState('')
  // Piège à robots : un champ invisible qu'aucun humain ne remplit. Les
  // formulaires publics sont moissonnés en quelques jours ; sans ce garde, la
  // table se remplit de spam et les vrais prospects s'y noient.
  const [trap, setTrap] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    const cleanEmail = email.trim()
    // Volontairement permissif : refuser une adresse valide mais inhabituelle
    // coûte un prospect, alors que la vraie validation vit en base.
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
      setHint(c.invalidEmail)
      return
    }
    const n = parseInt(count, 10)
    if (!Number.isFinite(n) || n < 1) {
      setHint(c.invalidCount)
      return
    }
    setHint('')

    // Robot détecté : on affiche le succès sans rien écrire. Lui signaler
    // qu'il a été repéré ne ferait que l'aider à contourner le piège.
    if (trap.trim() !== '') {
      setState('done')
      return
    }

    setState('sending')
    const { error } = await supabase.from('large_host_leads').insert([{
      email: cleanEmail,
      apartments_count: n,
      message: message.trim() || null,
      language: lang,
      source: 'vitrine_pricing',
    }])

    // 23505 = cette adresse a déjà été enregistrée. Ce n'est pas un échec :
    // afficher une erreur à quelqu'un qui a déjà laissé ses coordonnées
    // n'aurait aucun sens de son point de vue.
    if (error && error.code !== '23505') {
      console.error('[LargeHostLead]', error.message)
      setState('error')
      return
    }
    setState('done')
  }

  if (state === 'done') {
    return (
      <p className="mt-8 text-center text-sm text-hostmate-textGrey">
        {c.done}
      </p>
    )
  }

  if (!open) {
    return (
      <p className="mt-8 text-center text-sm text-hostmate-textGrey">
        {c.hook}{' '}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-hostmate-primary underline underline-offset-4 hover:no-underline"
        >
          {c.invite}
        </button>
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="mt-8 mx-auto max-w-md text-left">
      <p className="text-sm text-hostmate-textGrey mb-4">{c.intro}</p>

      {/* Invisible pour l'œil ET pour les lecteurs d'écran, atteignable par un
          robot qui remplit tous les champs du DOM. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      <div className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.email}
          autoComplete="email"
          className="w-full rounded-xl border border-hostmate-ink/15 px-4 py-2.5 text-sm bg-white text-hostmate-ink placeholder:text-hostmate-textGrey/60 focus:outline-none focus:border-hostmate-primary"
        />
        <input
          type="number"
          required
          min={1}
          max={10000}
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder={c.count}
          className="w-full rounded-xl border border-hostmate-ink/15 px-4 py-2.5 text-sm bg-white text-hostmate-ink placeholder:text-hostmate-textGrey/60 focus:outline-none focus:border-hostmate-primary"
        />
        <textarea
          rows={3}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={c.message}
          className="w-full rounded-xl border border-hostmate-ink/15 px-4 py-2.5 text-sm bg-white text-hostmate-ink placeholder:text-hostmate-textGrey/60 focus:outline-none focus:border-hostmate-primary resize-none"
        />
      </div>

      {hint && <p className="mt-2 text-xs text-hostmate-primary">{hint}</p>}
      {state === 'error' && (
        <p className="mt-2 text-xs text-hostmate-primary">{c.error}</p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-primary mt-4 w-full text-center text-sm disabled:opacity-60"
      >
        {state === 'sending' ? c.sending : c.submit}
      </button>
    </form>
  )
}
