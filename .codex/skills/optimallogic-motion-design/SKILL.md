---
name: optimallogic-motion-design
description: Concevoir, cartographier, implémenter ou auditer le système d’animations premium d’un frontend OptimalLogic. Utiliser cette skill séparément de la direction artistique lorsque les pages et leur composition sont connues, afin de produire des presets cohérents, accessibles et performants plutôt que des effets improvisés composant par composant.
---

# OptimalLogic Motion Design

Faire du mouvement un langage fonctionnel : guider, expliquer, confirmer ou renforcer la hiérarchie.

## Conditions d’entrée

Lire `site-spec.yaml`, `brand-tokens.json`, `page-composition.yaml` et, pendant l’implémentation, `component-map.yaml`. Lire [references/motion-contract.md](references/motion-contract.md) avant de définir les presets. Partir des modèles dans `assets/`.

Une composition peut avoir un système de mouvement `proposed`; elle ne devient `approved` qu’après validation humaine.

## Principes obligatoires

1. Chaque animation indique un objectif : orientation, hiérarchie, continuité, feedback ou démonstration.
2. Le contenu essentiel reste lisible et utilisable sans animation et sans JavaScript.
3. Préférer `transform` et `opacity`; éviter d’animer les propriétés qui recalculent la mise en page.
4. Ne pas appliquer de parallaxe, curseur personnalisé, effet magnétique ou suivi du pointeur sur écran tactile ou pointeur grossier.
5. Fournir un comportement `prefers-reduced-motion` qui supprime déplacements, boucles, zooms et parallaxes sans masquer de contenu.
6. Ne pas déclencher toutes les sections de la même façon. Réserver le mouvement fort à un ou deux moments structurants par page.
7. Les mouvements décoratifs continus sont désactivés hors écran et ne doivent pas concurrencer le CTA.
8. Ne pas créer une dépendance cliente au niveau de toute la page pour animer quelques éléments.

## Workflow

### 1. Définir la grammaire

Créer `motion-spec.yaml` depuis le modèle. Définir les tokens, niveaux d’intensité, presets, budgets et règles de réduction. Les presets sont sémantiques : `reveal-copy`, `reveal-proof`, `flow-progress`, `surface-lift`, `feedback-success`, etc.

### 2. Cartographier les pages

Créer `page-motion-map.yaml`. Pour chaque section, indiquer : preset, déclencheur, séquence, priorité, comportement mobile, comportement réduit et état de repli.

### 3. Implémenter

- placer les petits Client Components au plus près de l’interaction ;
- éviter de cacher le premier écran en attente d’hydratation ;
- utiliser IntersectionObserver pour les entrées au défilement ;
- arrêter les observateurs après une animation `once` ;
- limiter les animations simultanées et les écouteurs de scroll ;
- centraliser tokens et presets au lieu de coder des durées locales.

### 4. Vérifier

Créer `motion-qa-checklist.md` et tester au minimum : clavier, tactile, mouvement réduit, retour arrière, changement de route, contenu sans JavaScript, stabilité de mise en page et fluidité sur mobile.

Exécuter :

```bash
python3 scripts/validate_motion_spec.py <motion-spec.yaml> <page-motion-map.yaml>
```

## Sorties

- `motion-spec.yaml` ;
- `page-motion-map.yaml` ;
- `motion-qa-checklist.md` ;
- presets et primitives d’animation documentés lorsqu’une implémentation est demandée.
