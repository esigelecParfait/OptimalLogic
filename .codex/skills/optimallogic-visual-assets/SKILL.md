---
name: optimallogic-visual-assets
description: Transformer la direction artistique et la composition des pages OptimalLogic en manifeste de médias, briefs de génération et registre de droits. Utiliser cette skill pour planifier, générer, sélectionner ou auditer les images de la refonte sans ajouter de fausse preuve ni placer des médias propres à OptimalLogic dans le dépôt modèle.
---

# OptimalLogic Visual Assets

Créer uniquement les médias qui servent le positionnement, la compréhension ou la conversion.

## Conditions d’entrée

Lire `site-spec.yaml`, `art-direction.md`, `brand-tokens.json` et `page-composition.yaml`. Lire [references/asset-contract.md](references/asset-contract.md) avant de produire un manifeste.

Ne pas générer de média tant que la page, son rôle, son ratio, son cadrage et son comportement responsive ne sont pas définis.

## Règles

1. Préférer un actif fourni et autorisé à un actif généré.
2. Utiliser une photographie réelle ou une source vérifiable lorsqu’une personne, un lieu, un produit ou une réalisation réelle doit être représenté.
3. Utiliser la génération uniquement pour les illustrations de marque, compositions abstraites, scènes génériques ou interfaces fictives clairement identifiées.
4. Ne jamais fabriquer un client, un témoignage, un résultat, un avis, un tableau de bord réel ou une capture supposée prouver une performance.
5. Garder les actifs OptimalLogic dans le dépôt du site ou son stockage média, jamais dans `optimallogic-site-template`.
6. Prévoir une alternative sans image et un texte alternatif utile pour chaque média informatif.
7. Définir dimensions, ratio, formats, qualité et chargement pour éviter le CLS et respecter le budget de transfert.

## Workflow

### 1. Inventorier

Créer `asset-manifest.yaml` depuis `assets/asset-manifest-template.yaml`. Attribuer un identifiant stable à chaque média et relier celui-ci à une page et une section.

### 2. Choisir la source

Pour chaque média, choisir `provided`, `licensed`, `web_factual`, `generated`, `product_capture` ou `none`. Consigner la justification et les droits attendus.

### 3. Rédiger les briefs

Créer `image-briefs.md` uniquement pour les médias `generated`. Décrire sujet, composition, lumière, palette, texture, cadrage, zones négatives, exclusions et livrables. Ne pas demander de texte lisible dans une image générée.

### 4. Générer ou collecter

Lorsque l’utilisateur l’autorise, utiliser l’outil adapté à la source choisie. Une interface produit doit être construite en code ou capturée depuis une vraie interface autorisée, pas imitée par une image générée.

### 5. Contrôler et enregistrer

Créer `asset-register.yaml` avec le fichier final, la source, l’état des droits, les dimensions, le poids, l’alt, la date et les pages consommatrices.

Exécuter :

```bash
python3 scripts/validate_asset_manifest.py <asset-manifest.yaml>
```

## Sorties

- `asset-manifest.yaml` ;
- `image-briefs.md` ;
- `asset-register.yaml` ;
- fichiers médias optimisés lorsqu’ils sont autorisés et nécessaires.
