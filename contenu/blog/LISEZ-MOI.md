# Écrire un article

Un fichier `.md` par article, dans ce dossier. Le nom du fichier n'a pas
d'importance — c'est le `slug` qui fait l'URL.

```markdown
---
titre: Le titre, tel qu'il apparaîtra dans l'onglet et sur Google
description: Une phrase qui donne envie de cliquer. 160 caractères MAXIMUM.
date: 2026-08-13
slug: url-de-la-page
statut: brouillon
---

Le corps de l'article, en Markdown ordinaire.
```

Puis `npm run build`. Chaque article devient `dist/blog/<slug>/index.html`,
la page d'index est refaite, et le sitemap est complété.

## Rien ne part sans décision explicite

`statut` vaut **`brouillon`** ou **`publie`**. Il n'a pas de valeur par défaut,
et le build échoue s'il manque.

Un brouillon est annoncé à chaque build — pour qu'un article prêt à 90 % ne
soit pas oublié pendant des semaines — mais il n'est **jamais** généré, jamais
mis dans le sitemap, jamais atteignable.

C'est la différence entre publier ce qu'on a décidé de publier et publier ce
qui traîne dans le dossier. Sur un blog qui parlera de démarches et
d'obligations, la nuance vaut cher : une ébauche produite par une IA et jamais
relue ne doit pas pouvoir se retrouver en ligne parce que personne n'a pensé à
l'en empêcher.

## Les cinq champs sont obligatoires

Le build **échoue** si l'un manque, ou si la description dépasse 160
caractères. C'est volontaire : Google tronque au-delà, en plein milieu d'une
phrase, et un aperçu coupé fait perdre des clics. Mieux vaut refuser de
construire que publier ça.

Ne mettez pas de `#` de niveau 1 dans le corps : le `<h1>` est fabriqué à
partir du `titre`. Une page n'a qu'un seul titre de niveau 1, et il doit être
celui de l'onglet.

## Ce qui est ajouté automatiquement

- l'appel à l'action en fin d'article ;
- `canonical`, Open Graph, Twitter Card ;
- les données structurées JSON-LD de type `Article` — ce qui permet
  d'apparaître avec une date dans les résultats, et ce que lisent les moteurs
  IA pour citer une source ;
- l'entrée dans `sitemap.xml`.

## Pourquoi des fichiers, et pas une base de données

La vitrine est une application React rendue par le navigateur : le HTML livré
contient **zéro caractère de texte** une fois les scripts retirés (mesuré le
13/08/2026). Charger les articles depuis Supabase les rendrait invisibles pour
les moteurs — exactement l'inverse du but d'un blog.

Ces pages, elles, sont lisibles sans une ligne de JavaScript. En prime, les
fichiers versionnés donnent l'historique et le retour arrière gratuitement.

## Sur le contenu réglementaire

⚠️ **Ne publiez pas d'article sur les obligations légales, la fiscalité ou les
démarches administratives sans avoir vérifié chaque affirmation à une source
officielle et datée.**

C'est le domaine où les articles attirent le plus de monde, et celui où une
erreur coûte le plus cher : ces pages s'adressent à des hôtes qui confient déjà
leurs voyageurs au produit. Une procédure inexacte ou un document manquant dans
une liste, et c'est la crédibilité de l'ensemble qui part.

La réglementation française sur les meublés de tourisme a beaucoup changé
depuis 2024. Un texte rédigé de mémoire — par une IA comme par un humain — sera
plausible et faux, ce qui est le pire des deux mondes.

## Marché visé

**La France, en français**, le temps de valider le format. Une langue n'est pas
un marché : « les documents à fournir » n'a pas la même réponse en France, en
Belgique et au Sénégal, tous francophones. Un article qui essaie de couvrir les
trois ne classe nulle part, parce qu'il ne répond précisément à personne.

Le lien vers le blog n'apparaît d'ailleurs que sur la version française du
site, pour cette raison.
