// =============================================================================
// generer-blog.mjs — transforme les articles Markdown en VRAIES pages HTML
//
// ─── POURQUOI CE SCRIPT EXISTE (13/08/2026) ─────────────────────────────────
// La vitrine est une application React rendue côté navigateur. Mesuré avant
// d'écrire une ligne : le HTML que Netlify sert contient **zéro caractère de
// texte** une fois les scripts retirés. Tout est fabriqué par le navigateur.
//
// Pour une page d'accueil, c'est un inconvénient. Pour un blog dont l'objet
// entier est d'être trouvé, c'est rédhibitoire : Google sait exécuter du
// JavaScript mais le fait dans une file d'attente séparée, souvent des jours
// plus tard ; Bing, DuckDuckGo et les moteurs IA ne le font pas ou mal ; et
// les aperçus de partage (WhatsApp, LinkedIn) ne lisent QUE le HTML statique.
//
// C'est aussi pourquoi les articles ne vivent PAS dans Supabase. Les charger
// depuis une base serait doublement pénalisant — invisible au robot, et lent
// au visiteur. Ils sont des fichiers Markdown versionnés, ce qui donne en
// prime l'historique et le retour arrière.
//
// Chaque article devient un fichier autonome, lisible sans une ligne de JS.
//
// ─── CE QUE CE SCRIPT NE FAIT PAS ───────────────────────────────────────────
// Il ne touche pas à l'application React. Le blog vit à côté, dans /blog/, et
// une erreur ici ne peut pas casser la vitrine.
//
// USAGE : node scripts/generer-blog.mjs   (appelé par `npm run build`)
// =============================================================================

import {
  LANGUES, LANGUE_PRINCIPALE, alternates, urlDe, segmentsDist,
  mots, liensLegaux, locale,
} from './langues.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const SOURCE = join(RACINE, 'contenu', 'blog');
const DIST = join(RACINE, 'dist');
const SITE = 'https://hostmateai.app';

// Couleurs et polices reprises de tailwind.config.js. Recopiées ici parce que
// ces pages ne passent PAS par Tailwind : elles doivent être lisibles sans
// aucun fichier externe, y compris si le CSS de l'application ne charge pas.
const CORAIL = '#EC5B63';
const ENCRE = '#1C1C2E';
const GRIS = '#6B7280';

// ─── FRONTMATTER ────────────────────────────────────────────────────────────
// Volontairement minimal, et sans dépendance : quatre champs obligatoires, pas
// de YAML imbriqué. Un format qu'on peut relire d'un coup d'œil dans une revue
// est un format qu'on relit vraiment.
function lireArticle(chemin) {
  const brut = readFileSync(chemin, 'utf8');
  const m = brut.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`${chemin} : en-tête --- ... --- manquant`);

  const meta = {};
  for (const ligne of m[1].split(/\r?\n/)) {
    const sep = ligne.indexOf(':');
    if (sep === -1) continue;
    meta[ligne.slice(0, sep).trim()] = ligne.slice(sep + 1).trim();
  }

  for (const requis of ['titre', 'description', 'date', 'slug', 'statut']) {
    if (!meta[requis]) throw new Error(`${chemin} : champ « ${requis} » manquant`);
  }

  // ─── RIEN NE PART SANS DÉCISION EXPLICITE ─────────────────────────────────
  // `statut` est OBLIGATOIRE et n'a pas de valeur par défaut. Un article laissé
  // en cours d'écriture, une ébauche produite par une IA, un texte dont les
  // sources ne sont pas vérifiées : aucun ne doit pouvoir se retrouver en ligne
  // parce que personne n'a pensé à l'en empêcher.
  //
  // C'est la différence entre publier ce qu'on a décidé de publier et publier
  // ce qui traîne dans le dossier. Sur un blog qui parlera un jour de démarches
  // et d'obligations, la nuance vaut cher.
  if (!['brouillon', 'publie'].includes(meta.statut)) {
    throw new Error(
      `${chemin} : statut « ${meta.statut} » inconnu. ` +
      'Attendu : « brouillon » ou « publie ».');
  }
  // La description devient la meta description ET l'aperçu Google. Au-delà de
  // ~160 caractères elle est tronquée en plein milieu d'une phrase, ce qui
  // fait perdre des clics — mieux vaut refuser de construire que publier ça.
  if (meta.description.length > 160) {
    throw new Error(
      `${chemin} : description de ${meta.description.length} caractères. ` +
      'Google tronque au-delà de 160 — raccourcir.');
  }
  return { meta, corps: m[2] };
}

function echapper(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── LE GABARIT ─────────────────────────────────────────────────────────────
// Tout est en ligne : styles compris. Une page qui dépend d'un fichier externe
// peut s'afficher nue si ce fichier tarde — et c'est justement sur mobile en
// 3G, là où se trouvent beaucoup de lecteurs, que ça arrive.
function gabarit({
  titre, description, url, contenu, dateISO, dateLisible, estArticle,
  // Ajoutes le 13/09/2026 : tout ce qui dependait du francais en dur.
  langue = LANGUE_PRINCIPALE, langsExistantes = [], slug = '',
}) {
  const m = mots(langue);
  const legaux = liensLegaux(langue);
  const loc = locale(langue);
  const balisesAlternates = alternates(langsExistantes, 'blog', slug);
  // JSON-LD : dit explicitement à Google qu'il s'agit d'un article, avec son
  // auteur et sa date. C'est ce qui permet d'apparaître avec une date dans les
  // résultats, et ce que lisent les moteurs IA pour citer une source.
  const donneesStructurees = estArticle ? `
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titre,
    description,
    datePublished: dateISO,
    dateModified: dateISO,
    inLanguage: loc.replace('_', '-'),
    author: { '@type': 'Organization', name: 'HostMate AI', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'HostMate AI',
      logo: { '@type': 'ImageObject', url: `${SITE}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }, null, 2)}
  </script>` : '';

  return `<!doctype html>
<html lang="${langue}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${echapper(titre)}</title>
<meta name="description" content="${echapper(description)}">
<link rel="canonical" href="${url}">${balisesAlternates}
<link rel="icon" type="image/png" href="/icon.png">

<meta property="og:type" content="${estArticle ? 'article' : 'website'}">
<meta property="og:title" content="${echapper(titre)}">
<meta property="og:description" content="${echapper(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${loc}">
<meta property="og:site_name" content="HostMate AI">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${echapper(titre)}">
<meta name="twitter:description" content="${echapper(description)}">
${donneesStructurees}
<style>
  :root { --corail: ${CORAIL}; --encre: ${ENCRE}; --gris: ${GRIS}; }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #fff; color: var(--encre);
    font: 17px/1.7 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .enveloppe { max-width: 44rem; margin: 0 auto; padding: 2rem 1.25rem 5rem; }
  header.site { border-bottom: 1px solid #eee; }
  header.site .enveloppe { padding: 1.1rem 1.25rem; display: flex; align-items: center; gap: .6rem; }
  header.site a { color: var(--encre); text-decoration: none; font-weight: 650; }
  header.site img { width: 26px; height: 26px; border-radius: 6px; }
  h1 { font-size: clamp(1.9rem, 5vw, 2.6rem); line-height: 1.15; letter-spacing: -.02em; margin: .4rem 0 .6rem; }
  h2 { font-size: 1.45rem; line-height: 1.25; letter-spacing: -.01em; margin: 2.6rem 0 .7rem; }
  h3 { font-size: 1.15rem; margin: 2rem 0 .5rem; }
  p, li { color: #2b2b3d; }
  a { color: var(--corail); }
  time { color: var(--gris); font-size: .9rem; }
  blockquote {
    margin: 1.6rem 0; padding: .2rem 0 .2rem 1.1rem;
    border-left: 3px solid var(--corail); color: #444;
  }
  code {
    background: #f6f6f8; padding: .12em .35em; border-radius: 4px;
    font-size: .92em; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  pre { background: #f6f6f8; padding: 1rem; border-radius: 10px; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: .95rem; }
  th, td { text-align: left; padding: .6rem .5rem; border-bottom: 1px solid #eee; vertical-align: top; }
  th { color: var(--gris); font-weight: 600; }
  hr { border: 0; border-top: 1px solid #eee; margin: 2.5rem 0; }
  .liste-articles { list-style: none; padding: 0; }
  .liste-articles li { padding: 1.4rem 0; border-bottom: 1px solid #eee; }
  .liste-articles h2 { margin: 0 0 .3rem; font-size: 1.25rem; }
  .liste-articles a { color: var(--encre); text-decoration: none; }
  .liste-articles a:hover { color: var(--corail); }
  .appel {
    margin: 3rem 0 0; padding: 1.6rem; border: 1px solid #eee;
    border-radius: 14px; background: #fcfcfd;
  }
  .appel p { margin: 0 0 1rem; }
  .bouton {
    display: inline-block; background: var(--corail); color: #fff;
    padding: .8rem 1.4rem; border-radius: 10px; text-decoration: none; font-weight: 600;
  }
  footer.site { border-top: 1px solid #eee; color: var(--gris); font-size: .9rem; }
  footer.site .enveloppe { padding: 1.6rem 1.25rem; }
  footer.site a { color: var(--gris); }
</style>
</head>
<body>
<header class="site">
  <div class="enveloppe">
    <img src="/icon.png" alt="">
    <a href="/">HostMate AI</a>
    <span style="color:var(--gris)">·</span>
    <a href="/blog/" style="font-weight:500;color:var(--gris)">Blog</a>
  </div>
</header>

<main class="enveloppe">
${dateLisible ? `<time datetime="${dateISO}">${dateLisible}</time>` : ''}
${contenu}
</main>

<footer class="site">
  <div class="enveloppe">
    HostMate AI — Less managing. More hosting. ·
    <a href="${langue === LANGUE_PRINCIPALE ? '/' : `/${langue}`}">${m.accueil}</a> ·
    <a href="${langue === LANGUE_PRINCIPALE ? '/blog/' : `/${langue}/blog/`}">${m.blog}</a> ·
    <a href="${langue === LANGUE_PRINCIPALE ? '/guides/messages-voyageur/' : `/${langue}/guides/messages-voyageur/`}">${m.guide}</a> ·
    <!-- Le formulaire de contact manquait ici comme il manquait au guide : un
         lecteur qui a une question n'avait aucun endroit ou la poser, et une
         question sans destinataire se transforme en onglet ferme. -->
    <a href="/contact/">${m.nousEcrire}</a> ·
    <a href="${legaux.conditions}">${m.conditions}</a> ·
    <a href="${legaux.confidentialite}">${m.confidentialite}</a>
  </div>
</footer>
</body>
</html>
`;
}

// L'invitation à essayer, en fin d'article. Un blog qui ne propose rien est un
// blog qui informe des gens qui iront acheter ailleurs.
function appelAction(langue = LANGUE_PRINCIPALE) {
  const m = mots(langue);
  const lienGuide = langue === LANGUE_PRINCIPALE
    ? '/guides/messages-voyageur/'
    : `/${langue}/guides/messages-voyageur/`;
  return `
<div class="appel" style="margin-bottom:1rem">
  <p><strong>${echapper(m.cpaGuideTitre)}</strong> ${echapper(m.cpaGuideTexte)}</p>
  <a class="bouton" href="${lienGuide}">${echapper(m.cpaGuideBouton)}</a>
</div>

<div class="appel">
  <p><strong>${echapper(m.cpaAppTitre)}</strong> ${echapper(m.cpaAppTexte)}</p>
  <a class="bouton" href="https://app.hostmateai.app">${echapper(m.cpaAppBouton)}</a>
</div>`;
}

function dateLocalisee(iso, langue = LANGUE_PRINCIPALE) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString(
    locale(langue).replace('_', '-'),
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
  );
}

// ─── GÉNÉRATION ─────────────────────────────────────────────────────────────
/**
 * Rend un slug sur lequel une URL et un nom de fichier peuvent reposer.
 *
 * Meme regle que `slugifier` cote backend (Backend_hostmate/src/routes/blog.js),
 * a une difference pres : on retire les tirets de bord APRES la troncature.
 * Dans l'ordre inverse — celui du backend — couper a 70 caracteres peut
 * retomber en plein milieu d'un mot et laisser un tiret pendant, ce qu'on
 * observe sur deux slugs deja publies (« ...et-ce-que-vous- »).
 */
function nettoyerSlug(texte) {
  return String(texte || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 70)
    .replace(/^-+|-+$/g, '');
}

// ─── LECTURE PAR LANGUE ─────────────────────────────────────────────────────
// Le français vit à plat dans contenu/blog/ — c'est l'existant, et le déplacer
// casserait les trois articles déjà indexés. Les autres langues vivent dans un
// sous-dossier : contenu/blog/en/, /es/, /it/.
//
// Le filtre `.md` écarte naturellement ces sous-dossiers de la lecture du
// français : un dossier ne finit pas par « .md ».
function lireLangue(langue) {
  const dossier = langue === LANGUE_PRINCIPALE ? SOURCE : join(SOURCE, langue);
  if (!existsSync(dossier)) return [];

  // Les fichiers dont le NOM est en majuscules sont de la documentation pour
  // nous (LISEZ-MOI.md), pas des articles : ils n'ont pas d'en-tête et
  // feraient échouer le build.
  //
  // La comparaison porte sur le nom SANS l'extension : `.md` reste minuscule
  // même en majuscules, donc comparer le fichier entier ne filtrait rien.
  const estDocumentation = (f) => {
    const base = f.replace(/\.md$/i, '');
    return base === base.toUpperCase();
  };

  return readdirSync(dossier)
    .filter((f) => f.endsWith('.md') && !estDocumentation(f))
    .map((f) => {
      const { meta, corps } = lireArticle(join(dossier, f));
      return { ...meta, corps, fichier: `${langue}/${f}`, langue };
    });
}

// Nettoie et vérifie les slugs d'une langue — voir nettoyerSlug.
function verifierSlugs(articles) {
  const slugs = new Set();
  for (const a of articles) {
    // ── LE SLUG DU FICHIER N'EST PAS DIGNE DE CONFIANCE (13/09/2026) ────────
    // Il etait repris tel quel depuis l'en-tete du .md, ecrit a la main. Un
    // article est parti en ligne avec ceci dans son URL :
    //
    //   /blog/pourquoi-votre-annonce-Airbnb-ou-Booking![alt text](image.png)-...
    //
    // Un bout de markdown d'image colle par megarde pendant l'ecriture. Le
    // resultat n'est meme pas une URL valide : `curl` la refuse. Indexation
    // perdue, lien mort au partage, et le tout sans qu'aucune etape ne
    // proteste — le generateur ecrivait simplement le fichier a ce nom.
    //
    // Le backend, lui, a toujours eu une fonction de nettoyage correcte
    // (blog.js, `slugifier`) : le slug en base etait propre. C'est ici, entre
    // le fichier et la page, que la verification manquait.
    const propre = nettoyerSlug(a.slug || a.titre);
    if (!propre) {
      throw new Error(`Slug vide ou impossible a nettoyer : ${a.fichier}`);
    }
    if (propre !== a.slug) {
      // On corrige ET on le dit : corriger en silence laisserait le fichier
      // fautif en l'etat, et la meme URL repartirait a la prochaine edition.
      console.warn(`  ⚠️  Slug corrige dans ${a.fichier}`);
      console.warn(`      ecrit  : ${a.slug}`);
      console.warn(`      utilise: ${propre}`);
      console.warn("      → corrigez l'en-tete du .md, et ajoutez une");
      console.warn("        redirection 301 si l'ancienne URL a ete partagee.");
      a.slug = propre;
    }
    if (slugs.has(a.slug)) throw new Error(`Slug en double : ${a.slug}`);
    slugs.add(a.slug);
  }
}

function main() {
  if (!existsSync(SOURCE)) {
    console.log('ℹ️  contenu/blog/ absent — aucun article à générer.');
    return;
  }

  // ── UNE TRADUCTION QUI N'EXISTE PAS NE S'ANNONCE PAS ───────────────────────
  // On lit d'abord TOUTES les langues, puis on note, pour chaque slug, dans
  // lesquelles il existe réellement. C'est de cette liste que sortent les
  // balises hreflang. Google exige la réciprocité : désigner une version
  // italienne absente est pire que de n'en désigner aucune.
  const parLangue = {};
  for (const l of LANGUES) {
    const tous = lireLangue(l);
    const publies = tous
      .filter((a) => a.statut === 'publie')
      .sort((a, b) => b.date.localeCompare(a.date)); // le plus récent en premier
    verifierSlugs(publies);
    parLangue[l] = { publies, brouillons: tous.filter((a) => a.statut === 'brouillon') };
  }

  // Les brouillons sont ANNONCÉS, pas générés. Les taire ferait oublier un
  // article prêt à 90 % pendant des semaines — c'est la façon la plus banale
  // de ne jamais publier.
  for (const l of LANGUES) {
    for (const b of parLangue[l].brouillons) {
      console.log(`  ⏸️  brouillon en attente : ${b.titre}  (${b.fichier})`);
    }
  }

  const langsParSlug = new Map();
  for (const l of LANGUES) {
    for (const a of parLangue[l].publies) {
      if (!langsParSlug.has(a.slug)) langsParSlug.set(a.slug, []);
      langsParSlug.get(a.slug).push(l);
    }
  }

  if (!LANGUES.some((l) => parLangue[l].publies.length)) {
    console.log('ℹ️  Aucun article publié — que des brouillons.');
    return;
  }

  const urlsSitemap = [];
  let total = 0;

  for (const langue of LANGUES) {
    const articles = parLangue[langue].publies;
    if (articles.length === 0) continue;
    const m = mots(langue);

    for (const a of articles) {
      const url = urlDe(langue, 'blog', a.slug);
      const html = gabarit({
        titre: a.titre,
        description: a.description,
        url,
        dateISO: a.date,
        dateLisible: dateLocalisee(a.date, langue),
        estArticle: true,
        langue,
        slug: a.slug,
        langsExistantes: langsParSlug.get(a.slug) || [langue],
        // Le <h1> vient du frontmatter, pas du Markdown : un seul titre de
        // niveau 1 par page, et il est forcément celui de l'onglet.
        contenu: `<h1>${echapper(a.titre)}</h1>\n${marked.parse(a.corps)}\n${appelAction(langue)}`,
      });
      const dossier = join(DIST, ...segmentsDist(langue, 'blog', a.slug));
      mkdirSync(dossier, { recursive: true });
      writeFileSync(join(dossier, 'index.html'), html, 'utf8');
      console.log(`  ✅ ${url.replace(SITE, '')}`);
      urlsSitemap.push({ loc: url, freq: 'monthly', date: a.date });
      total += 1;
    }

    // ── Page d'index de la langue ──────────────────────────────────────────
    const liste = articles.map((a) => `
    <li>
      <h2><a href="${urlDe(langue, 'blog', a.slug).replace(SITE, '')}">${echapper(a.titre)}</a></h2>
      <time datetime="${a.date}">${dateLocalisee(a.date, langue)}</time>
      <p>${echapper(a.description)}</p>
    </li>`).join('');

    const urlIndex = urlDe(langue, 'blog', '');
    const dossierIndex = join(DIST, ...segmentsDist(langue, 'blog'));
    mkdirSync(dossierIndex, { recursive: true });
    writeFileSync(join(dossierIndex, 'index.html'), gabarit({
      titre: m.indexTitre,
      description: m.indexDescription,
      url: urlIndex,
      estArticle: false,
      langue,
      slug: '',
      // L'index existe dans chaque langue qui a au moins un article.
      langsExistantes: LANGUES.filter((l) => parLangue[l].publies.length),
      contenu: `<h1>${echapper(m.indexH1)}</h1>
      <p style="color:var(--gris);font-size:1.05rem">${echapper(m.indexIntro)}</p>
      <ul class="liste-articles">${liste}</ul>`,
    }), 'utf8');
    console.log(`  ✅ ${urlIndex.replace(SITE, '')}`);
    urlsSitemap.push({ loc: urlIndex, freq: 'weekly' });
  }

  // ── Sitemap ───────────────────────────────────────────────────────────────
  // On PROLONGE le sitemap existant au lieu de le réécrire : il contient les
  // quatre versions linguistiques de l'accueil et leurs balises hreflang,
  // écrites à la main. Les régénérer ici les ferait diverger en silence.
  const cheminSitemap = join(DIST, 'sitemap.xml');
  if (existsSync(cheminSitemap)) {
    const entrees = urlsSitemap.map(({ loc, freq, date }) => `
  <url>
    <loc>${loc}</loc>${date ? `\n    <lastmod>${date}</lastmod>` : ''}
    <changefreq>${freq}</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

    const xml = readFileSync(cheminSitemap, 'utf8');
    if (!xml.includes('/blog/')) {
      writeFileSync(cheminSitemap, xml.replace('</urlset>', `${entrees}\n</urlset>`), 'utf8');
      console.log(`  ✅ sitemap.xml enrichi de ${urlsSitemap.length} URL`);
    }
  } else {
    console.warn('  ⚠️  dist/sitemap.xml introuvable — articles non déclarés.');
  }

  const brouillons = LANGUES.reduce((n, l) => n + parLangue[l].brouillons.length, 0);
  console.log(
    `\n${total} article(s) publié(s) en HTML statique` +
    `${brouillons ? `, ${brouillons} brouillon(s) en attente` : ''}.`);
}

main();
