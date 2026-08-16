// =============================================================================
// rediger-article.mjs — demande un article au serveur, en une commande
//
// ─── POURQUOI CE FICHIER EXISTE ─────────────────────────────────────────────
// La route existe déjà (POST /api/blog/rediger), mais l'appeler demandait de
// composer un curl avec ADMIN_SECRET dedans — donc d'aller chercher le secret,
// le coller dans un terminal, et le laisser dans l'historique du shell.
//
// Un outil qu'on n'utilise pas parce qu'il demande trois manipulations n'est
// pas un outil. Ce script lit le secret dans le .env qui est déjà là, et ne
// l'affiche jamais.
//
// ─── POURQUOI IL VIT ICI, ET PLUS DANS LE BACKEND ───────────────────────────
// Il y etait, et `blog:recuperer` etait ici : deux commandes du meme circuit,
// dans deux depots. Lancee depuis le mauvais dossier, la premiere repondait
// « Missing script » sans dire ou la chercher.
//
// Elle n'a aucune dependance au backend — juste ADMIN_SECRET et une URL. Sa
// place est donc a cote des articles qu'elle produit.
//
// USAGE :
//   npm run blog:rediger "Comment répondre à un avis négatif"
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = process.env.BLOG_API || 'https://back-hosmate.onrender.com';

function lireSecret() {
  if (process.env.ADMIN_SECRET) return process.env.ADMIN_SECRET;
  const env = join(RACINE, '.env');
  if (!existsSync(env)) return null;
  for (const ligne of readFileSync(env, 'utf8').split(/\r?\n/)) {
    const m = ligne.match(/^\s*ADMIN_SECRET\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  return null;
}

const sujet = process.argv.slice(2).join(' ').trim();
if (!sujet) {
  console.error('Usage : npm run blog:rediger "le sujet de l\'article"');
  console.error('');
  console.error('Exemples :');
  console.error('  npm run blog:rediger "Comment répondre à un avis négatif"');
  console.error('  npm run blog:rediger "Préparer son logement avant la haute saison"');
  process.exit(1);
}

const secret = lireSecret();
if (!secret) {
  // Message auto-suffisant : cette valeur vit sur Render, pas dans le dépôt.
  // Sans ces trois lignes, on part chercher dans le code une variable qui n'y
  // est pas, et par définition ne peut pas y être.
  console.error('❌ ADMIN_SECRET introuvable.');
  console.error('');
  console.error('   Cette valeur est un secret : elle vit dans les variables');
  console.error('   d\'environnement de Render, pas dans le dépôt.');
  console.error('');
  console.error('   1. Tableau de bord Render → le service backend →');
  console.error('      Environment → copier la valeur de ADMIN_SECRET');
  console.error('   2. L\'ajouter au fichier .env de Backend_hostmate :');
  console.error('      ADMIN_SECRET=la_valeur');
  console.error('');
  console.error('   Le .env est ignoré par git — le secret ne partira pas.');
  console.error('   Si ADMIN_SECRET n\'existe pas encore sur Render, en créer');
  console.error('   un : une longue chaîne aléatoire, connue de vous seul.');
  process.exit(1);
}

// ─── UN SUJET RACOLEUR PRODUIT UN ARTICLE RACOLEUR ────────────────────────
// La consigne interdit à l'IA d'inventer un chiffre et de tomber dans le
// creux — mais elle ne peut rien contre un sujet qui LUI DEMANDE de le faire.
// « +35 % de réservations avec ces 7 secrets » ne laisse aucune issue : soit
// elle invente le chiffre, soit elle le couvre de [À VÉRIFIER], soit elle
// écrit un article que le lecteur reconnaîtra comme du remplissage.
//
// On avertit sans bloquer : c'est un jugement éditorial, pas une règle. Une
// génération dure deux minutes et coûte de l'argent ; autant hésiter avant.
const PIEGES = [
  [/[+-]?\s*\d+\s*%/, 'un pourcentage — l\'IA ne peut ni le vérifier ni le prouver'],
  [/\b\d+\s*(secrets?|astuces?|conseils?|techniques?|étapes?|erreurs?)\b/i,
   'une liste numérotée (« 7 secrets ») — signal de contenu creux'],
  [/\b(secret|astuce miracle|révolutionnaire|incroyable|garanti)\b/i,
   'un mot publicitaire'],
  [/\bSEO\b/i, '« SEO » — jargon de spécialiste ; un hôte cherche plutôt à comprendre pourquoi personne ne réserve'],
];

const trouves = PIEGES.filter(([motif]) => motif.test(sujet));
if (trouves.length) {
  console.log('');
  console.log('⚠️  Ce sujet contient :');
  for (const [, quoi] of trouves) console.log(`      · ${quoi}`);
  console.log('');
  console.log('   La consigne interdit à l\'IA d\'inventer et de faire creux,');
  console.log('   mais elle ne peut rien contre un sujet qui le lui demande.');
  console.log('');
  console.log('   Un sujet efficace décrit une SITUATION, pas une promesse :');
  console.log('     « Pourquoi votre annonce n\'apparaît pas dans les');
  console.log('       premiers résultats »');
  console.log('     « Ce qui fait vraiment remonter une annonce, et ce qui');
  console.log('       ne change rien »');
  console.log('');
  console.log('   Rédaction lancée quand même — Ctrl+C pour annuler.');
  console.log('');
}

console.log(`Sujet : « ${sujet} »`);
console.log('Rédaction en cours… (jusqu\'à deux minutes)');

// Long, et volontairement : l'écriture d'un article de 1500 mots prend son
// temps, et Render peut en plus devoir se réveiller. Abandonner trop tôt
// laisserait une génération payée mais jamais récupérée.
let reponse;
try {
  reponse = await fetch(`${API}/api/blog/rediger?secret=${encodeURIComponent(secret)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sujet }),
    signal: AbortSignal.timeout(180000),
  });
} catch (e) {
  console.error(`❌ Serveur injoignable (${e.message}).`);
  console.error('   Si le service dort, réessayer dans une minute.');
  process.exit(1);
}

const corps = await reponse.json().catch(() => ({}));

if (!reponse.ok) {
  console.error(`❌ HTTP ${reponse.status} — ${corps.error || 'erreur inconnue'}`);
  process.exit(1);
}

console.log('');
console.log(`✅ « ${corps.titre} »`);
console.log('');
console.log('Le texte vient de partir sur Telegram, avec deux liens :');
console.log('   ✅ Valider   — l\'article rejoint la file de récupération');
console.log('   🗑️ Rejeter   — il est abandonné');
console.log('');
console.log('Après validation, côté Hostmate_vitrine :');
console.log('   npm run blog:recuperer');
console.log('');
console.log('Le fichier arrivera en « statut: brouillon ». Le relire, puis');
console.log('passer à « statut: publie » pour le mettre en ligne.');
