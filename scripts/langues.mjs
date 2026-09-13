// =============================================================================
// FICHIER : scripts/langues.mjs
// RÔLE    : ce que le blog et les guides doivent savoir des quatre langues.
//
// ─── POURQUOI CE FICHIER EXISTE (13/09/2026) ────────────────────────────────
// L'application est vendue en quatre langues — l'accueil existe en /, /fr, /es
// et /it, avec ses balises hreflang. Le CONTENU DE RÉFÉRENCEMENT, lui, n'existe
// qu'en français : trois articles et un guide, sans préfixe de langue.
//
// Autrement dit, on vend à des hôtes italiens et espagnols, et rien de ce qui
// les ferait venir de Google n'est écrit dans leur langue.
//
// ─── LE CHOIX DES CHEMINS, ET POURQUOI IL EST BANCAL EXPRÈS ─────────────────
// Le français reste à /blog/… et /guides/…, SANS préfixe. C'est incohérent
// avec l'accueil, où / est l'anglais et /fr le français — et c'est assumé :
// les trois articles français sont déjà indexés à ces adresses. Les déplacer
// pour faire joli échangerait un référencement acquis contre une symétrie que
// personne ne regarde.
//
// Les trois autres langues prennent donc un préfixe : /en/blog/…, /es/blog/…,
// /it/blog/…
//
// ─── UNE RÈGLE QUI NE SE DISCUTE PAS ────────────────────────────────────────
// Une balise hreflang ne doit désigner QUE des pages qui existent. Google
// exige la réciprocité : annoncer une version italienne absente est pire que
// de ne rien annoncer du tout. Les alternates sont donc calculées à partir des
// fichiers réellement présents, jamais supposées.
// =============================================================================

export const LANGUES = ['fr', 'en', 'es', 'it'];

/** La langue du contenu déjà publié, celle qui garde les URL sans préfixe. */
export const LANGUE_PRINCIPALE = 'fr';

export const SITE = 'https://hostmateai.app';

/** Préfixe d'URL d'une langue. Vide pour le français — voir l'en-tête. */
export function prefixe(langue) {
  return langue === LANGUE_PRINCIPALE ? '' : `/${langue}`;
}

/** URL publique complète d'un article ou d'un guide. */
export function urlDe(langue, type, slug) {
  return `${SITE}${prefixe(langue)}/${type}/${slug ? `${slug}/` : ''}`;
}

/** Chemin de sortie dans dist/, aligné sur l'URL. */
export function segmentsDist(langue, type, slug) {
  const base = langue === LANGUE_PRINCIPALE ? [type] : [langue, type];
  return slug ? [...base, slug] : base;
}

/**
 * Balises <link rel="alternate"> pour un contenu donné.
 *
 * @param {string[]} langsExistantes Les langues dans lesquelles CE contenu
 *   existe réellement. Une seule → on ne rend rien : une page sans traduction
 *   n'a pas d'alternate, et s'en déclarer une à soi-même n'apporte rien.
 */
export function alternates(langsExistantes, type, slug) {
  if (!langsExistantes || langsExistantes.length < 2) return '';

  const ordonnees = LANGUES.filter((l) => langsExistantes.includes(l));
  const lignes = ordonnees.map(
    (l) => `  <link rel="alternate" hreflang="${l}" href="${urlDe(l, type, slug)}" />`,
  );

  // x-default : ce que Google sert quand aucune langue ne correspond. On y met
  // l'anglais s'il existe, sinon la version principale — jamais une langue
  // choisie au hasard.
  const defaut = ordonnees.includes('en') ? 'en' : ordonnees[0];
  lignes.push(
    `  <link rel="alternate" hreflang="x-default" href="${urlDe(defaut, type, slug)}" />`,
  );

  return `\n${lignes.join('\n')}`;
}

/**
 * Les quelques mots d'interface des pages générées.
 *
 * Volontairement peu nombreux : ces gabarits sont faits pour disparaître
 * derrière le texte. Tout ce qui est ici a été écrit, pas passé à la machine —
 * ce sont les seules chaînes que personne ne relira jamais article par article.
 */
export const MOTS = {
  fr: {
    sommaire: 'Sommaire',
    blog: 'Blog', accueil: 'Accueil', guide: 'Guide', nousEcrire: 'Nous écrire',
    conditions: 'Conditions', confidentialite: 'Confidentialité',
    aLireEnsuite: 'À lire ensuite',
    question: 'Une question, une remarque sur ce guide ?',
    vraiePersonne: "c'est une vraie personne qui lit",
    telechargerPdf: 'Télécharger le PDF',
    aidePdf: "Choisissez « Enregistrer au format PDF » dans la fenêtre qui s'ouvre.",
    essayer: 'Essayer gratuitement 7 jours',
    parHostmate: 'Par HostMate AI',
    indexTitre: 'Le blog HostMate — louer en courte durée, sans y passer ses journées',
    indexDescription: 'Procédures, obligations et bonnes pratiques pour les hôtes de location courte durée en France. Des réponses concrètes, vérifiées.',
    indexH1: 'Le blog HostMate',
    cpaGuideTitre: "Le guide gratuit :", cpaGuideTexte: "les six messages d'un séjour écrits en entier, vingt règles reformulées et une checklist à imprimer.", cpaGuideBouton: "Ouvrir le guide",
    cpaAppTitre: "Vous gérez une location courte durée ?", cpaAppTexte: "HostMate rédige vos messages voyageurs, votre livret d'accueil et vos réponses aux litiges — dans la langue de votre voyageur. Essai gratuit de 7 jours.", cpaAppBouton: "Essayer HostMate",
    indexIntro: 'Des réponses concrètes aux questions que se posent les hôtes — démarches, obligations, relation voyageur.',
  },
  en: {
    sommaire: 'Contents',
    blog: 'Blog', accueil: 'Home', guide: 'Guide', nousEcrire: 'Contact us',
    conditions: 'Terms', confidentialite: 'Privacy',
    aLireEnsuite: 'Read next',
    question: 'A question, a remark about this guide?',
    vraiePersonne: 'a real person reads it',
    telechargerPdf: 'Download the PDF',
    aidePdf: 'Choose "Save as PDF" in the window that opens.',
    essayer: 'Start your 7-day free trial',
    parHostmate: 'By HostMate AI',
    indexTitre: 'The HostMate blog — short-term renting without losing your days',
    indexDescription: 'Procedures, obligations and practical habits for short-term rental hosts. Concrete answers, checked.',
    indexH1: 'The HostMate blog',
    cpaGuideTitre: "The free guide:", cpaGuideTexte: "the six messages of a stay written out in full, twenty house rules rephrased, and a checklist to print.", cpaGuideBouton: "Open the guide",
    cpaAppTitre: "Renting out short-term?", cpaAppTexte: "HostMate writes your guest messages, your welcome guide and your replies to disputes — in your guest's language. 7-day free trial.", cpaAppBouton: "Try HostMate",
    indexIntro: 'Concrete answers to what hosts actually ask — paperwork, obligations, guest relations.',
  },
  es: {
    sommaire: 'Índice',
    blog: 'Blog', accueil: 'Inicio', guide: 'Guía', nousEcrire: 'Escríbenos',
    conditions: 'Condiciones', confidentialite: 'Privacidad',
    aLireEnsuite: 'Sigue leyendo',
    question: '¿Una duda, un comentario sobre esta guía?',
    vraiePersonne: 'lo lee una persona de verdad',
    telechargerPdf: 'Descargar el PDF',
    aidePdf: 'Elige "Guardar como PDF" en la ventana que se abre.',
    essayer: 'Prueba gratis 7 días',
    parHostmate: 'Por HostMate AI',
    indexTitre: 'El blog de HostMate — alquilar a corto plazo sin perder los días',
    indexDescription: 'Trámites, obligaciones y buenas prácticas para anfitriones de alquiler de corta duración. Respuestas concretas y verificadas.',
    indexH1: 'El blog de HostMate',
    cpaGuideTitre: "La guía gratuita:", cpaGuideTexte: "los seis mensajes de una estancia escritos enteros, veinte normas reformuladas y una lista para imprimir.", cpaGuideBouton: "Abrir la guía",
    cpaAppTitre: "¿Alquilas a corto plazo?", cpaAppTexte: "HostMate redacta tus mensajes, tu manual de bienvenida y tus respuestas a conflictos — en el idioma de tu huésped. Prueba gratis de 7 días.", cpaAppBouton: "Probar HostMate",
    indexIntro: 'Respuestas concretas a lo que preguntan los anfitriones: trámites, obligaciones, relación con el huésped.',
  },
  it: {
    sommaire: 'Indice',
    blog: 'Blog', accueil: 'Home', guide: 'Guida', nousEcrire: 'Scrivici',
    conditions: 'Condizioni', confidentialite: 'Privacy',
    aLireEnsuite: 'Da leggere dopo',
    question: 'Una domanda, un commento su questa guida?',
    vraiePersonne: 'lo legge una persona vera',
    telechargerPdf: 'Scarica il PDF',
    aidePdf: 'Scegli "Salva come PDF" nella finestra che si apre.',
    essayer: 'Prova gratis 7 giorni',
    parHostmate: 'Di HostMate AI',
    indexTitre: 'Il blog di HostMate — affittare a breve termine senza perderci le giornate',
    indexDescription: 'Procedure, obblighi e buone pratiche per gli host di affitti brevi. Risposte concrete e verificate.',
    indexH1: 'Il blog di HostMate',
    cpaGuideTitre: "La guida gratuita:", cpaGuideTexte: "i sei messaggi di un soggiorno scritti per intero, venti regole riformulate e una lista da stampare.", cpaGuideBouton: "Apri la guida",
    cpaAppTitre: "Affitti a breve termine?", cpaAppTexte: "HostMate scrive i tuoi messaggi, il tuo manuale di benvenuto e le tue risposte ai conflitti — nella lingua del tuo ospite. Prova gratis di 7 giorni.", cpaAppBouton: "Prova HostMate",
    indexIntro: "Risposte concrete a ciò che gli host chiedono davvero: pratiche, obblighi, rapporto con l'ospite.",
  },
};

/** Locale complète, pour og:locale et inLanguage. */
export function locale(langue) {
  return { fr: 'fr_FR', en: 'en_US', es: 'es_ES', it: 'it_IT' }[langue] || 'en_US';
}

export function mots(langue) {
  return MOTS[langue] || MOTS.en;
}

/** Lien vers les mentions légales, qui ont leurs propres chemins par langue. */
export function liensLegaux(langue) {
  switch (langue) {
    case 'fr': return { conditions: '/conditions', confidentialite: '/confidentialite' };
    case 'es': return { conditions: '/es/condiciones', confidentialite: '/es/privacidad' };
    case 'it': return { conditions: '/it/condizioni', confidentialite: '/it/privacy' };
    default: return { conditions: '/terms', confidentialite: '/privacy' };
  }
}
