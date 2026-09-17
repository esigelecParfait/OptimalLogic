# Systèmes visuels

Le showroom `/showroom/visual-systems` expose 30 compositions code-native : six diagrammes, six flux, six interfaces illustratives, six graphiques narratifs et six transformations avant/après.

## Règles d’utilisation

- Choisir une composition parce qu’elle explique un contenu, jamais pour remplir un espace.
- Alimenter les libellés depuis un contenu validé dans les sites clients.
- Ne jamais présenter une interface illustrative comme une fonctionnalité déjà disponible.
- Ne jamais transformer les repères fictifs du showroom en résultats commerciaux.
- Conserver le `figcaption` ou fournir un équivalent accessible contextualisé.
- Limiter une page à un petit nombre de systèmes forts afin de préserver la hiérarchie.

## Familles

- `diagram` : relations, architecture et hiérarchie.
- `flow` : étapes, embranchements, convergence et transmission.
- `interface` : aperçu conceptuel d’un espace public ou privé.
- `chart` : récit de données validées, sans bibliothèque graphique obligatoire.
- `transformation` : comparaison qualitative de deux états.

Les animations ne portent jamais seules une information. `data-animated="false"` conserve l’état final complet et `prefers-reduced-motion` désactive automatiquement les transitions.

## Contrôles

Exécuter `npm run check:visual-systems`, puis les suites Playwright fonctionnelles et responsive. Le showroom doit fonctionner avec chacun des huit thèmes sans dépendance supplémentaire.
