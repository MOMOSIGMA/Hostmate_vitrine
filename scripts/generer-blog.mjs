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
function gabarit({ titre, description, url, contenu, dateISO, dateLisible, estArticle }) {
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
    inLanguage: 'fr-FR',
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
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${echapper(titre)}</title>
<meta name="description" content="${echapper(description)}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" href="/icon.png">

<meta property="og:type" content="${estArticle ? 'article' : 'website'}">
<meta property="og:title" content="${echapper(titre)}">
<meta property="og:description" content="${echapper(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="fr_FR">
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
    <a href="/">Accueil</a> ·
    <a href="/blog/">Blog</a> ·
    <a href="/conditions">Conditions</a> ·
    <a href="/confidentialite">Confidentialité</a>
  </div>
</footer>
</body>
</html>
`;
}

// L'invitation à essayer, en fin d'article. Un blog qui ne propose rien est un
// blog qui informe des gens qui iront acheter ailleurs.
function appelAction() {
  return `
<div class="appel" style="margin-bottom:1rem">
  <p><strong>Le guide gratuit :</strong> les six messages d'un séjour écrits en
  entier, vingt règles reformulées et une checklist à imprimer.</p>
  <a class="bouton" href="/guides/messages-voyageur/">Ouvrir le guide</a>
</div>

<div class="appel">
  <p><strong>Vous gérez une location courte durée ?</strong> HostMate rédige vos
  messages voyageurs, votre livret d'accueil et vos réponses aux litiges — dans
  la langue de votre voyageur. Essai gratuit de 7 jours.</p>
  <a class="bouton" href="https://app.hostmateai.app">Essayer HostMate</a>
</div>`;
}

function dateFrancaise(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

// ─── GÉNÉRATION ─────────────────────────────────────────────────────────────
function main() {
  if (!existsSync(SOURCE)) {
    console.log('ℹ️  contenu/blog/ absent — aucun article à générer.');
    return;
  }

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
  const fichiers = readdirSync(SOURCE)
    .filter((f) => f.endsWith('.md') && !estDocumentation(f));
  if (fichiers.length === 0) {
    console.log('ℹ️  Aucun article dans contenu/blog/.');
    return;
  }

  const tous = fichiers.map((f) => {
    const { meta, corps } = lireArticle(join(SOURCE, f));
    return { ...meta, corps, fichier: f };
  });

  const brouillons = tous.filter((a) => a.statut === 'brouillon');
  const articles = tous
    .filter((a) => a.statut === 'publie')
    .sort((a, b) => b.date.localeCompare(a.date)); // le plus récent en premier

  // Les brouillons sont ANNONCÉS, pas générés. Les taire ferait oublier un
  // article prêt à 90 % pendant des semaines — c'est la façon la plus banale
  // de ne jamais publier.
  for (const b of brouillons) {
    console.log(`  ⏸️  brouillon en attente : ${b.titre}  (${b.fichier})`);
  }

  if (articles.length === 0) {
    console.log('ℹ️  Aucun article publié — que des brouillons.');
    return;
  }

  const slugs = new Set();
  for (const a of articles) {
    if (slugs.has(a.slug)) throw new Error(`Slug en double : ${a.slug}`);
    slugs.add(a.slug);
  }

  for (const a of articles) {
    const url = `${SITE}/blog/${a.slug}/`;
    const html = gabarit({
      titre: a.titre,
      description: a.description,
      url,
      dateISO: a.date,
      dateLisible: dateFrancaise(a.date),
      estArticle: true,
      // Le <h1> vient du frontmatter, pas du Markdown : un seul titre de
      // niveau 1 par page, et il est forcément celui de l'onglet.
      contenu: `<h1>${echapper(a.titre)}</h1>\n${marked.parse(a.corps)}\n${appelAction()}`,
    });
    const dossier = join(DIST, 'blog', a.slug);
    mkdirSync(dossier, { recursive: true });
    writeFileSync(join(dossier, 'index.html'), html, 'utf8');
    console.log(`  ✅ /blog/${a.slug}/`);
  }

  // ── Page d'index ──────────────────────────────────────────────────────────
  const liste = articles.map((a) => `
    <li>
      <h2><a href="/blog/${a.slug}/">${echapper(a.titre)}</a></h2>
      <time datetime="${a.date}">${dateFrancaise(a.date)}</time>
      <p>${echapper(a.description)}</p>
    </li>`).join('');

  writeFileSync(join(DIST, 'blog', 'index.html'), gabarit({
    titre: 'Le blog HostMate — louer en courte durée, sans y passer ses journées',
    description: 'Procédures, obligations et bonnes pratiques pour les hôtes de '
      + 'location courte durée en France. Des réponses concrètes, vérifiées.',
    url: `${SITE}/blog/`,
    estArticle: false,
    contenu: `<h1>Le blog HostMate</h1>
      <p style="color:var(--gris);font-size:1.05rem">Des réponses concrètes aux
      questions que se posent les hôtes en France — démarches, obligations,
      relation voyageur.</p>
      <ul class="liste-articles">${liste}</ul>`,
  }), 'utf8');
  console.log('  ✅ /blog/');

  // ── Sitemap ───────────────────────────────────────────────────────────────
  // On PROLONGE le sitemap existant au lieu de le réécrire : il contient les
  // quatre versions linguistiques de l'accueil et leurs balises hreflang,
  // écrites à la main. Les régénérer ici les ferait diverger en silence.
  const cheminSitemap = join(DIST, 'sitemap.xml');
  if (existsSync(cheminSitemap)) {
    const entrees = [
      { loc: `${SITE}/blog/`, freq: 'weekly' },
      ...articles.map((a) => ({ loc: `${SITE}/blog/${a.slug}/`, freq: 'monthly', date: a.date })),
    ].map(({ loc, freq, date }) => `
  <url>
    <loc>${loc}</loc>${date ? `\n    <lastmod>${date}</lastmod>` : ''}
    <changefreq>${freq}</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

    const xml = readFileSync(cheminSitemap, 'utf8');
    if (!xml.includes('/blog/')) {
      writeFileSync(cheminSitemap, xml.replace('</urlset>', `${entrees}\n</urlset>`), 'utf8');
      console.log(`  ✅ sitemap.xml enrichi de ${articles.length + 1} URL`);
    }
  } else {
    console.warn('  ⚠️  dist/sitemap.xml introuvable — articles non déclarés.');
  }

  console.log(
    `\n${articles.length} article(s) publié(s) en HTML statique` +
    `${brouillons.length ? `, ${brouillons.length} brouillon(s) en attente` : ''}.`);
}

main();
