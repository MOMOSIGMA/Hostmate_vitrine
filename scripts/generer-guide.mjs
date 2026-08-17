// =============================================================================
// generer-guide.mjs — les guides téléchargeables, en HTML prêt à imprimer
//
// ─── POURQUOI PAS UN VRAI FICHIER PDF ───────────────────────────────────────
// Le guide existant, produit par un générateur PDF, n'avait AUCUN accent dans
// sa version française : « eprouvees », « regles », « verite ». Dix pages
// lisibles mais qui font amateur auprès de lecteurs français — et personne ne
// s'en était aperçu avant impression.
//
// Passer par du HTML supprime la classe entière du problème : la page utilise
// les polices du système, l'encodage est celui du web, et « éprouvées » s'écrit
// « éprouvées ». On l'ouvre dans Chrome, Ctrl+P, « Enregistrer au format PDF ».
//
// Trois avantages qui comptent autant :
//   · le contenu est du Markdown versionné, relisible et modifiable ;
//   · la même source sert de page web consultable en ligne ;
//   · aucune dépendance à un outil de génération qui peut changer sous nos
//     pieds — ce qui est exactement ce qui est arrivé aux accents.
//
// ─── CE QUE CE GUIDE DOIT ÊTRE ──────────────────────────────────────────────
// « Personne n'achète de l'information » : elle est gratuite partout et une IA
// la produit en deux minutes. Ce qui a de la valeur, c'est ce qu'on peut
// UTILISER SANS RÉFLÉCHIR — le texte exact, prêt, qu'il n'y a plus qu'à
// adapter.
//
// D'où la mise en page : les modèles à copier sont dans des encadrés visibles,
// les tableaux de reformulation tiennent sur une page, et la checklist
// s'imprime seule pour aller sur un frigo.
//
// USAGE : node scripts/generer-guide.mjs   (appelé par `npm run build`)
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(RACINE, 'contenu', 'guides');
const DIST = join(RACINE, 'dist');
const SITE = 'https://hostmateai.app';

const CORAIL = '#EC5B63';
const ENCRE = '#1C1C2E';
const GRIS = '#6B7280';

function echapper(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function lireGuide(chemin) {
  const brut = readFileSync(chemin, 'utf8');
  const m = brut.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`${chemin} : en-tête --- ... --- manquant`);
  const meta = {};
  for (const l of m[1].split(/\r?\n/)) {
    const i = l.indexOf(':');
    if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }
  for (const requis of ['titre', 'sous_titre', 'description', 'slug']) {
    if (!meta[requis]) throw new Error(`${chemin} : champ « ${requis} » manquant`);
  }
  return { meta, corps: m[2] };
}

// ─── LA MISE EN PAGE ────────────────────────────────────────────────────────
// Pensée pour DEUX usages simultanés : lue à l'écran, et imprimée en PDF.
// Les règles `@media print` ne changent pas le fond — elles retirent ce qui
// n'a pas de sens sur papier (le bandeau d'aide) et contrôlent les coupures.
function gabarit({ meta, contenu, sommaire }) {
  const url = `${SITE}/guides/${meta.slug}/`;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${echapper(meta.titre)} — HostMate</title>
<meta name="description" content="${echapper(meta.description)}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" href="/icon.png">
<meta property="og:type" content="article">
<meta property="og:title" content="${echapper(meta.titre)}">
<meta property="og:description" content="${echapper(meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="fr_FR">
<style>
  :root { --corail: ${CORAIL}; --encre: ${ENCRE}; --gris: ${GRIS}; }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #f4f4f6; color: var(--encre);
    font: 15.5px/1.62 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Le bandeau explique comment obtenir le PDF. Il disparaît à l'impression :
     imprimer un mode d'emploi de l'impression n'aurait aucun sens. */
  .bandeau {
    background: var(--encre); color: #fff; padding: .9rem 1.25rem;
    text-align: center; font-size: .9rem; position: sticky; top: 0; z-index: 5;
  }
  .bandeau kbd {
    background: rgba(255,255,255,.14); border-radius: 5px;
    padding: .1em .45em; font-family: inherit; font-size: .95em;
  }

  .feuille {
    max-width: 210mm; margin: 1.5rem auto; background: #fff;
    padding: 18mm 16mm; box-shadow: 0 1px 24px rgba(0,0,0,.09);
  }

  h1 { font-size: 2.1rem; line-height: 1.12; letter-spacing: -.02em; margin: 0 0 .5rem; }
  h2 {
    font-size: 1.32rem; line-height: 1.25; margin: 2.4rem 0 .8rem;
    padding-top: .9rem; border-top: 2px solid var(--corail);
  }
  h3 { font-size: 1.05rem; margin: 1.7rem 0 .4rem; }
  p, li { color: #2b2b3d; }
  a { color: var(--corail); }

  /* LES MODÈLES À COPIER — l'élément central du guide. Ils doivent se
     repérer d'un coup d'œil en feuilletant, d'où le fond et la barre. */
  blockquote {
    margin: 1.1rem 0; padding: 1rem 1.2rem;
    background: #fbfbfc; border-left: 3px solid var(--corail);
    border-radius: 0 8px 8px 0; color: #33334a;
  }
  blockquote p { margin: .4rem 0; }
  blockquote p:first-child { margin-top: 0; }
  blockquote p:last-child { margin-bottom: 0; }

  table { width: 100%; border-collapse: collapse; margin: 1.2rem 0; font-size: .93rem; }
  th, td { text-align: left; padding: .6rem .55rem; border-bottom: 1px solid #ececed; vertical-align: top; }
  th { color: var(--gris); font-weight: 600; font-size: .82rem; text-transform: uppercase; letter-spacing: .03em; }
  tbody tr:nth-child(odd) { background: #fbfbfc; }

  code {
    background: #f2f2f5; padding: .1em .34em; border-radius: 4px; font-size: .93em;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  hr { border: 0; border-top: 1px solid #ececed; margin: 2.2rem 0; }

  .couverture {
    background: var(--corail); color: #fff; margin: -18mm -16mm 2rem;
    padding: 26mm 16mm 20mm; text-align: center;
  }
  .couverture h1 { color: #fff; }
  .couverture .sous-titre { font-size: 1.05rem; opacity: .93; margin: .6rem auto 0; max-width: 30rem; }
  .couverture .marque { margin-top: 2.2rem; font-size: .85rem; opacity: .8; }

  .sommaire { background: #fbfbfc; border: 1px solid #ececed; border-radius: 10px; padding: 1.2rem 1.4rem; }
  .sommaire h2 { border: 0; margin: 0 0 .6rem; padding: 0; font-size: 1rem; color: var(--gris); text-transform: uppercase; letter-spacing: .04em; }
  .sommaire ol { margin: 0; padding-left: 1.2rem; }
  .sommaire li { margin: .3rem 0; }
  .sommaire a { color: var(--encre); text-decoration: none; }

  /* LES CASES À COCHER — celles du navigateur s'impriment mal : trop petites,
     parfois pâles au point de disparaître, et le rendu change d'un
     navigateur à l'autre. Or cette checklist a vocation à finir sur un frigo,
     cochée au stylo. On dessine donc un vrai carré, dont on maîtrise la
     taille et l'épaisseur du trait. */
  ul:has(input[type="checkbox"]) { list-style: none; padding-left: .2rem; }
  li:has(input[type="checkbox"]) { margin: .55rem 0; }
  input[type="checkbox"] {
    appearance: none; -webkit-appearance: none;
    width: 1.05em; height: 1.05em; margin: 0 .55em 0 0;
    border: 1.6px solid var(--encre); border-radius: 3px;
    vertical-align: -.15em; flex: none;
  }

  .fin {
    margin-top: 2.5rem; padding: 1.6rem; background: var(--encre);
    color: #fff; border-radius: 12px; text-align: center;
  }
  .fin p { color: rgba(255,255,255,.88); }
  .fin a {
    display: inline-block; margin-top: .8rem; background: var(--corail);
    color: #fff; padding: .75rem 1.5rem; border-radius: 9px;
    text-decoration: none; font-weight: 600;
  }

  @media print {
    @page { size: A4; margin: 16mm 14mm; }
    body {
      background: #fff; font-size: 10.6pt;
      /* Sans ceci, Chrome retire les fonds colorés à l'impression « pour
         économiser l'encre » : la couverture corail sortirait blanche, et les
         encadrés de modèles se confondraient avec le texte courant. */
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .bandeau { display: none; }
    .feuille { max-width: none; margin: 0; padding: 0; box-shadow: none; }
    .couverture { margin: 0 0 1.5rem; padding: 22mm 12mm 18mm; break-after: page; }
    .sommaire { break-after: page; }

    /* Un titre en bas de page avec son texte sur la suivante est la faute
       d'impression la plus visible : break-after avoid la supprime. */
    h2 { break-before: page; break-after: avoid; }
    h3 { break-after: avoid; }
    blockquote, table { break-inside: avoid; }
    p, li { orphans: 3; widows: 3; }
    a { color: var(--encre); text-decoration: none; }
    .fin { break-before: page; }
  }
</style>
</head>
<body>
<div class="bandeau">
  Pour obtenir le PDF : <kbd>Ctrl</kbd>+<kbd>P</kbd> puis « Enregistrer au format PDF »
</div>

<div class="feuille">
  <div class="couverture">
    <h1>${echapper(meta.titre)}</h1>
    <p class="sous-titre">${echapper(meta.sous_titre)}</p>
    <p class="marque">HostMate — hostmateai.app</p>
  </div>

  ${sommaire}
  ${contenu}

  <div class="fin">
    <p><strong>Ces messages, écrits pour vous et au bon moment.</strong></p>
    <p>HostMate prépare chacun d'eux dans la langue de votre voyageur, à l'heure
    où il doit partir. Vous validez d'un geste — vous gardez la main, vous perdez
    l'obligation d'y penser.</p>
    <a href="https://app.hostmateai.app">Essayer gratuitement 7 jours</a>
  </div>
</div>
</body>
</html>
`;
}

function main() {
  if (!existsSync(SOURCE)) {
    console.log('ℹ️  contenu/guides/ absent — aucun guide à générer.');
    return;
  }

  const fichiers = readdirSync(SOURCE).filter((f) => {
    const base = f.replace(/\.md$/i, '');
    return f.endsWith('.md') && base !== base.toUpperCase();
  });

  if (fichiers.length === 0) {
    console.log('ℹ️  Aucun guide dans contenu/guides/.');
    return;
  }

  for (const f of fichiers) {
    const { meta, corps } = lireGuide(join(SOURCE, f));

    // Sommaire construit à partir des titres réels : impossible qu'il
    // diverge du contenu, contrairement à une liste écrite à la main.
    const titres = [...corps.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
    const ancre = (t) => t.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const sommaire = titres.length > 2 ? `<nav class="sommaire">
      <h2>Sommaire</h2>
      <ol>${titres.map((t) => `<li><a href="#${ancre(t)}">${echapper(t)}</a></li>`).join('')}</ol>
    </nav>` : '';

    // ─── LES ANCRES, POSÉES SUR CE QUE MARKED A PRODUIT ───────────────────
    // La version précédente cherchait le titre tel qu'écrit dans le Markdown.
    // Or marked échappe les apostrophes en &#39; : « Les six messages d'un
    // séjour » ne correspondait à rien, et quatre sections sur onze restaient
    // sans ancre — un sommaire dont la moitié des liens ne mènent nulle part.
    //
    // On numérote donc les <h2> dans l'ordre où marked les rend, sans jamais
    // comparer de texte. Ce que contient le Markdown n'a plus à ressembler à
    // ce que produit le convertisseur.
    let rang = 0;
    const html = marked.parse(corps).replace(/<h2>/g, () => {
      const id = ancre(titres[rang] || `section-${rang}`);
      rang += 1;
      return `<h2 id="${id}">`;
    });

    const dossier = join(DIST, 'guides', meta.slug);
    mkdirSync(dossier, { recursive: true });
    writeFileSync(join(dossier, 'index.html'),
      gabarit({ meta, contenu: html, sommaire }), 'utf8');

    const mots = corps.split(/\s+/).length;
    console.log(`  ✅ /guides/${meta.slug}/  (${titres.length} sections, ~${mots} mots)`);
  }

  // Le guide est une page publique et indexable — l'omettre du sitemap
  // reviendrait à compter sur le hasard pour qu'on la trouve.
  const cheminSitemap = join(DIST, 'sitemap.xml');
  if (existsSync(cheminSitemap)) {
    const xml = readFileSync(cheminSitemap, 'utf8');
    if (!xml.includes('/guides/')) {
      const entrees = fichiers.map((f) => {
        const { meta } = lireGuide(join(SOURCE, f));
        return `
  <url>
    <loc>${SITE}/guides/${meta.slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }).join('');
      writeFileSync(cheminSitemap, xml.replace('</urlset>', `${entrees}\n</urlset>`), 'utf8');
      console.log(`  ✅ sitemap.xml enrichi de ${fichiers.length} guide(s)`);
    }
  }

  console.log(`\n${fichiers.length} guide(s) prêt(s) à imprimer.`);
}

main();
