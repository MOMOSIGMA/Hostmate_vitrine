// =============================================================================
// relire-articles.mjs — le relecteur : ce qui ne doit pas partir en ligne
//
// ─── POURQUOI CE SCRIPT EXISTE (16/08/2026) ─────────────────────────────────
// Trois articles générés, trois relectures à la main, les mêmes défauts à
// chaque fois :
//
//   · des chiffres avancés comme des faits — « +35 % de réservations »,
//     « de 40 % à 65 % en deux mois » — qu'aucune source ne soutient ;
//   · une contradiction entre deux articles du même blog : l'un déconseille
//     de réclamer un avis, l'autre en donne le modèle ;
//   · des formules creuses que la consigne interdit pourtant nommément ;
//   · des fautes de langue qui font douter du sérieux du reste.
//
// Relire à la main marche tant qu'il y a trois articles. À vingt, on saute
// des passages ; à cinquante, on ne relit plus. Et c'est précisément à ce
// moment-là qu'une contradiction devient invisible : elle est entre DEUX
// articles qu'on ne lit jamais ensemble.
//
// ─── DEUX NIVEAUX, ET POURQUOI ─────────────────────────────────────────────
//   MÉCANIQUE (par défaut)  gratuit, instantané, sans appel réseau. Attrape ce
//                           qui est certain : un chiffre non sourcé, un
//                           [À VÉRIFIER] laissé dans un article publié, une
//                           formule bannie, un lien mort.
//
//   RELECTURE IA (--ia)     payante. Attrape ce qu'aucune expression régulière
//                           ne verra jamais : deux articles qui se
//                           contredisent, un conseil risqué, un raisonnement
//                           qui ne tient pas.
//
// Le niveau mécanique tourne à chaque build. Le second se lance à la demande,
// avant une session de publication.
//
// USAGE :
//   npm run blog:relire          contrôles mécaniques
//   npm run blog:relire -- --ia  + relecture croisée par l'IA
// =============================================================================

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(RACINE, 'contenu', 'blog');
const API = process.env.BLOG_API || 'https://back-hosmate.onrender.com';

const AVEC_IA = process.argv.includes('--ia');

// ─── CE QU'ON REFUSE, ET POURQUOI ───────────────────────────────────────────
// Chaque règle vient d'un défaut réellement constaté, pas d'une précaution
// théorique. Une règle qui n'a jamais rien attrapé finit par être ignorée.
const REGLES = [
  {
    nom: 'chiffre avancé comme un fait',
    // Les pourcentages et montants sont le piège principal : ils donnent une
    // autorité que rien ne soutient, et le lecteur les cite ensuite.
    motif: /(?<!\[À VÉRIFIER\][^\n]{0,200})\b\d+([.,]\d+)?\s*(%|€|euros?)\b/g,
    gravite: 'bloquant',
    explication:
      "Un chiffre sans source engage le blog. Écrire ce qui est vrai sans le\n"
      + "     chiffrer, ou le marquer [À VÉRIFIER] avec l'endroit où le confirmer.",
  },
  {
    nom: 'promesse de résultat',
    motif: /\b(passe(nt|rez)?|augmente(nt|rez)?|gagne(nt|rez)?|double(nt|rez)?)\b[^.\n]{0,60}\b\d+/gi,
    gravite: 'bloquant',
    explication:
      "Une promesse chiffrée de résultat ne peut pas être tenue, et se\n"
      + "     retourne contre nous dès qu'un lecteur la cite.",
  },
  {
    nom: 'marqueur [À VÉRIFIER] non levé',
    motif: /\[À VÉRIFIER\]/g,
    gravite: 'bloquant-si-publie',
    explication:
      "L'IA signale ici qu'elle ne sait pas. Confirmer à une source officielle,\n"
      + "     remplacer le passage, puis publier.",
  },
  {
    nom: 'formule creuse',
    motif: /\b(c'est une opportunité|transformer[^.\n]{0,40}en (atout|opportunité|chance)|une chance rare|prenez du recul|restez professionnel|soyez à l'écoute)\b/gi,
    gravite: 'avertissement',
    explication:
      "Formule que la consigne interdit : elle ne dit rien et le lecteur la\n"
      + "     reconnaît immédiatement comme du remplissage.",
  },
  {
    nom: 'conseil à risque',
    // Solliciter un avis est encadré par les plateformes, et le premier
    // article du blog le déconseille explicitement.
    motif: /\b(laisser un avis|demande[rz]?[^.\n]{0,20}avis|cinq étoiles|5 étoiles)\b/gi,
    gravite: 'avertissement',
    explication:
      "Solliciter un avis est encadré par les plateformes, et un autre article\n"
      + "     du blog le déconseille. Vérifier la cohérence avant de publier.\n"
      + "     (Une expression régulière voit le mot, pas le sens : une phrase qui\n"
      + "     DÉCONSEILLE de réclamer un avis est signalée elle aussi. C'est\n"
      + "     assumé — c'est à la relecture IA de trancher, pas à un motif.)",
  },
];

function lireArticles() {
  if (!existsSync(SOURCE)) return [];
  return readdirSync(SOURCE)
    .filter((f) => {
      const base = f.replace(/\.md$/i, '');
      return f.endsWith('.md') && base !== base.toUpperCase();
    })
    .map((f) => {
      const brut = readFileSync(join(SOURCE, f), 'utf8');
      const m = brut.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      const meta = {};
      if (m) {
        for (const l of m[1].split(/\r?\n/)) {
          const i = l.indexOf(':');
          if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim();
        }
      }
      return { fichier: f, meta, corps: m ? m[2] : brut, brut };
    });
}

/** Numéro de ligne d'une position, pour pointer l'endroit exact. */
function ligneDe(texte, position) {
  return texte.slice(0, position).split('\n').length;
}

function controlesMecaniques(articles) {
  let bloquants = 0;
  let avertissements = 0;

  for (const a of articles) {
    const publie = a.meta.statut === 'publie';
    const trouvailles = [];

    for (const regle of REGLES) {
      // Un [À VÉRIFIER] dans un BROUILLON est normal : c'est son rôle. Il ne
      // devient un problème qu'au moment de publier.
      if (regle.gravite === 'bloquant-si-publie' && !publie) continue;

      const motif = new RegExp(regle.motif.source, regle.motif.flags);
      let m;
      while ((m = motif.exec(a.brut)) !== null) {
        trouvailles.push({
          regle,
          ligne: ligneDe(a.brut, m.index),
          extrait: a.brut.slice(Math.max(0, m.index - 45), m.index + 55)
            .replace(/\s+/g, ' ').trim(),
        });
        if (m.index === motif.lastIndex) motif.lastIndex += 1;
      }
    }

    // Dédoublonnage : plusieurs branches d'une même alternance peuvent matcher
    // au même endroit. Signaler deux fois la même ligne fait passer un rapport
    // utile pour du bruit — et un rapport bruyant cesse d'être lu.
    const vues = new Set();
    const uniques = trouvailles.filter((t) => {
      const cle = `${t.regle.nom}:${t.ligne}`;
      if (vues.has(cle)) return false;
      vues.add(cle);
      return true;
    });
    trouvailles.length = 0;
    trouvailles.push(...uniques);

    if (trouvailles.length === 0) continue;

    console.log(`\n${a.fichier}  [${a.meta.statut || 'statut absent'}]`);
    for (const t of trouvailles) {
      const grave = t.regle.gravite !== 'avertissement';
      const marque = grave ? '❌' : '⚠️ ';
      if (grave) bloquants += 1; else avertissements += 1;
      console.log(`  ${marque} ligne ${t.ligne} — ${t.regle.nom}`);
      console.log(`     …${t.extrait}…`);
      console.log(`     ${t.regle.explication}`);
    }
  }

  return { bloquants, avertissements };
}

// ─── RELECTURE CROISÉE ──────────────────────────────────────────────────────
// Le seul défaut qu'aucune expression régulière ne trouvera : deux articles
// qui se contredisent. Il faut les lire ENSEMBLE, ce que personne ne fait
// spontanément — on relit l'article qu'on vient d'écrire, jamais les autres.
async function relectureIA(articles) {
  const secret = process.env.ADMIN_SECRET || (() => {
    const env = join(RACINE, '.env');
    if (!existsSync(env)) return null;
    for (const l of readFileSync(env, 'utf8').split(/\r?\n/)) {
      const m = l.match(/^\s*ADMIN_SECRET\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
    return null;
  })();

  if (!secret) {
    console.error('\n❌ ADMIN_SECRET introuvable — relecture IA impossible.');
    return;
  }

  console.log(`\n── Relecture croisée de ${articles.length} article(s) ──`);
  console.log('   (une minute environ)');

  const corpus = articles.map((a) =>
    `### FICHIER : ${a.fichier} (${a.meta.statut})\nTITRE : ${a.meta.titre}\n\n${a.corps}`
  ).join('\n\n──────────\n\n');

  let reponse;
  try {
    reponse = await fetch(`${API}/api/blog/relire?secret=${encodeURIComponent(secret)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ corpus }),
      signal: AbortSignal.timeout(180000),
    });
  } catch (e) {
    console.error(`❌ Serveur injoignable (${e.message}).`);
    return;
  }

  if (!reponse.ok) {
    const c = await reponse.json().catch(() => ({}));
    console.error(`❌ HTTP ${reponse.status} — ${c.error || 'erreur'}`);
    return;
  }

  const { remarques } = await reponse.json();
  if (!remarques || remarques.length === 0) {
    console.log('\n✅ Aucune contradiction ni incohérence relevée.');
    return;
  }

  for (const r of remarques) {
    const marque = r.gravite === 'bloquant' ? '❌' : '⚠️ ';
    console.log(`\n${marque} ${r.type} — ${(r.fichiers || []).join(' + ')}`);
    console.log(`   ${r.constat}`);
    if (r.action) console.log(`   → ${r.action}`);
  }
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
const articles = lireArticles();
if (articles.length === 0) {
  console.log('Aucun article à relire.');
  process.exit(0);
}

console.log(`── Relecture de ${articles.length} article(s) ──`);
const { bloquants, avertissements } = controlesMecaniques(articles);

if (bloquants === 0 && avertissements === 0) {
  console.log('\n✅ Contrôles mécaniques : rien à signaler.');
} else {
  console.log(`\n${bloquants} bloquant(s), ${avertissements} avertissement(s).`);
}

if (AVEC_IA) await relectureIA(articles);
else console.log('\n(--ia pour ajouter la relecture croisée : contradictions entre articles)');

// Sortie non nulle si un article PUBLIÉ pose un problème bloquant : c'est ce
// qui permettra d'accrocher ce script au build le jour où on le voudra.
process.exit(bloquants > 0 ? 1 : 0);
