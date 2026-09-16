---
name: optimallogic-frontend-builder
description: Associer un dossier directeur OptimalLogic validé à la bibliothèque du dépôt modèle, créer les pages Next.js et documenter chaque choix sans inventer de contenu. Utiliser cette skill pour construire ou refondre le frontend OptimalLogic après le cadrage, la direction artistique et le motion design.
---

# OptimalLogic Frontend Builder

Assembler un frontend premium traçable à partir de contrats approuvés ou prêts.

## Conditions d’entrée

Lire intégralement :

- `site-spec.yaml` ;
- `page-inventory.yaml` ;
- `content-map.yaml` ;
- `brand-tokens.json` ;
- `page-composition.yaml` ;
- `motion-spec.yaml` et `page-motion-map.yaml` lorsqu’ils existent ;
- `asset-manifest.yaml` lorsqu’un média est requis.

Refuser l’implémentation si `site-spec.status` vaut `needs_input`, si une route fonctionnelle manque dans l’inventaire ou si un média essentiel n’a aucun état de repli.

Lire [references/frontend-contract.md](references/frontend-contract.md) avant l’association des composants. Partir du modèle `assets/component-map-template.yaml`.

## Règles de construction

1. Inspecter la bibliothèque réelle avant de proposer un nouveau composant.
2. Réutiliser d’abord une variante existante, étendre ensuite une famille existante, créer une nouvelle famille seulement si le rôle sémantique diffère.
3. Garder le dépôt modèle générique : aucune offre, image, marque ou règle métier OptimalLogic dans les primitives et blocs.
4. Préserver le backend, les routes serveur, Supabase, RLS, l’authentification et les intégrations non concernées.
5. Garder les pages et layouts comme Server Components ; limiter les Client Components aux interactions et animations réellement nécessaires.
6. Les offres et prix viennent de données typées et remplaçables, jamais de la structure visuelle.
7. Une page doit rester compréhensible sans animation, sans image décorative et sans JavaScript non essentiel.
8. Chaque page reçoit un titre, un H1, un CTA et un comportement mobile conformes au dossier directeur.

## Workflow

### 1. Produire la carte de composants

Créer `component-map.yaml`. Pour chaque section :

- identifier la page et la section source ;
- sélectionner le bloc, sa variante et ses primitives ;
- préciser les données, le média et le preset de mouvement ;
- indiquer `reuse`, `extend` ou `create` ;
- justifier toute création.

### 2. Préparer l’implémentation

Créer `implementation-plan.md` avec lots indépendants, dépendances, fichiers concernés, critères d’acceptation et commandes de contrôle. Prévoir la migration route par route sans supprimer l’ancienne expérience avant équivalence.

### 3. Implémenter

- modifier les tokens à leur source ;
- conserver les props sérialisables aux frontières client ;
- dimensionner les médias pour éviter le CLS ;
- utiliser HTML sémantique, focus visible et ordre de tabulation naturel ;
- documenter les variantes ajoutées dans le showroom et la bibliothèque de blocs.

### 4. Vérifier

Exécuter les commandes existantes du dépôt, au minimum formatage, lint, TypeScript, tests et build. Ajouter les tests des nouveaux comportements, pas des tests de formulation.

### 5. Rendre compte

Créer `frontend-build-report.md` avec : révision, routes traitées, composants réutilisés ou créés, écarts au plan, tests exécutés, limites et prochaine validation humaine.

Exécuter :

```bash
python3 scripts/validate_component_map.py <component-map.yaml>
```

## Sorties

- `component-map.yaml` ;
- `implementation-plan.md` ;
- code et documentation ;
- tests associés ;
- `frontend-build-report.md`.
