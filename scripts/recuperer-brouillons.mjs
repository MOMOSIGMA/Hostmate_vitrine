// =============================================================================
// recuperer-brouillons.mjs — rapatrie les articles validés sur Telegram
//
// ─── OÙ CE SCRIPT SE PLACE DANS LE CIRCUIT ──────────────────────────────────
//   1. L'IA rédige                → POST /api/blog/rediger  (backend)
//   2. Telegram alerte, avec le début du texte et deux liens
//   3. Un clic valide ou rejette  → GET  /api/blog/valider/:id
//   4. CE SCRIPT écrit les fichiers Markdown          ← vous êtes ici
//   5. Vous relisez, passez `statut` à `publie`, poussez
//
// ─── LES FICHIERS ARRIVENT EN BROUILLON, ET C'EST VOULU ─────────────────────
// Valider sur Telegram ne publie PAS. Le fichier écrit ici porte
// `statut: brouillon` : il faut encore l'ouvrir, le relire en entier et
// changer ce champ à la main.
//
// Ça peut sembler redondant. Ça ne l'est pas : sur Telegram on lit 700
// caractères sur un téléphone, souvent entre deux choses. C'est assez pour
// juger un angle, pas pour vérifier un chiffre ni repérer une phrase qui
// engage. La validation dit « ce sujet et ce ton me vont » ; la relecture dit
// « chaque affirmation est vraie ».
//
// ─── POURQUOI PASSER PAR LE BACKEND ET PAS DIRECTEMENT PAR SUPABASE ─────────
// Parce que la clé de service Supabase n'a rien à faire sur un poste de
// développement. Le backend l'a déjà ; ce script ne connaît que ADMIN_SECRET,
// dont le pire usage possible est de lire ou marquer des brouillons de blog.
//
// USAGE : npm run blog:recuperer
//   ADMIN_SECRET dans l'environnement, ou dans un fichier .env à la racine
//   (ignoré par git — voir .gitignore).
// =============================================================================

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const DEST = join(RACINE, 'contenu', 'blog');
const API = process.env.BLOG_API || 'https://back-hosmate.onrender.com';

function lireSecret() {
  if (process.env.ADMIN_SECRET) return process.env.ADMIN_SECRET;
  const env = join(RACINE, '.env');
  if (existsSync(env)) {
    for (const ligne of readFileSync(env, 'utf8').split(/\r?\n/)) {
      const m = ligne.match(/^\s*ADMIN_SECRET\s*=\s*(.+)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  return null;
}

// Le corps peut contenir n'importe quoi ; l'en-tête, non. Une valeur qui
// déborderait sur plusieurs lignes casserait le parseur du générateur — qui
// lit ligne par ligne, volontairement, pour rester relisible.
function surUneLigne(valeur) {
  return String(valeur).replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
}

async function main() {
  const secret = lireSecret();
  if (!secret) {
    console.error('❌ ADMIN_SECRET introuvable.');
    console.error('   → poser ADMIN_SECRET dans l\'environnement, ou dans un');
    console.error('     fichier .env à la racine de Hostmate_vitrine.');
    process.exit(1);
  }

  const url = `${API}/api/blog/a-recuperer?secret=${encodeURIComponent(secret)}`;
  let reponse;
  try {
    reponse = await fetch(url, { signal: AbortSignal.timeout(60000) });
  } catch (e) {
    // Render endort le service : le premier appel après une période calme peut
    // dépasser une minute. Ce n'est pas une panne, c'est un réveil.
    console.error(`❌ Serveur injoignable (${e.message}).`);
    console.error('   Si le service dort, relancer dans une minute.');
    process.exit(1);
  }

  if (reponse.status === 401) {
    console.error('❌ ADMIN_SECRET refusé par le serveur.');
    process.exit(1);
  }
  if (!reponse.ok) {
    console.error(`❌ HTTP ${reponse.status}`);
    process.exit(1);
  }

  const { articles } = await reponse.json();
  if (!articles || articles.length === 0) {
    console.log('Aucun article validé en attente.');
    return;
  }

  mkdirSync(DEST, { recursive: true });
  const ecrits = [];

  for (const a of articles) {
    const chemin = join(DEST, `${a.slug}.md`);

    // On n'écrase JAMAIS un fichier existant : il a pu être relu, corrigé,
    // peut-être déjà publié. Le réécrire depuis la base annulerait ce travail
    // en silence — et personne ne relit deux fois le même article.
    if (existsSync(chemin)) {
      console.log(`  ⏭️  ${a.slug}.md existe déjà — laissé intact.`);
      ecrits.push(a.id);   // marqué quand même : il est bien arrivé
      continue;
    }

    const date = new Date(a.cree_le).toISOString().slice(0, 10);
    const contenu =
      '---\n' +
      `titre: ${surUneLigne(a.titre)}\n` +
      `description: ${surUneLigne(a.description)}\n` +
      `date: ${date}\n` +
      `slug: ${a.slug}\n` +
      'statut: brouillon\n' +
      '---\n\n' +
      `${String(a.corps).trim()}\n`;

    writeFileSync(chemin, contenu, 'utf8');
    ecrits.push(a.id);
    console.log(`  ✅ ${a.slug}.md`);

    if (contenu.includes('[À VÉRIFIER]')) {
      const combien = (contenu.match(/\[À VÉRIFIER\]/g) || []).length;
      console.log(`     ⚠️  ${combien} passage(s) à confirmer avant publication.`);
    }
  }

  // Marquer APRÈS écriture, jamais avant : si le disque échoue à mi-chemin,
  // les articles restent « valide » et la prochaine exécution les reprendra.
  const marquage = await fetch(
    `${API}/api/blog/recuperes?secret=${encodeURIComponent(secret)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: ecrits }),
      signal: AbortSignal.timeout(30000),
    });

  if (!marquage.ok) {
    console.warn(`⚠️  Fichiers écrits, mais marquage impossible (HTTP ${marquage.status}).`);
    console.warn('   Sans conséquence : les fichiers existants ne seront pas réécrits.');
  }

  console.log(`\n${ecrits.length} article(s) récupéré(s), en BROUILLON.`);
  console.log('Relire chaque fichier, puis passer « statut: brouillon » à');
  console.log('« statut: publie » pour le mettre en ligne au prochain build.');
}

main();
