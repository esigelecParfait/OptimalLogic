# Migration depuis la référence saine

Statut : `ready_for_review`

1. Obtenir l'approbation explicite de `docs/refonte-final/`.
2. Repartir de `main@af4dc00` ou restaurer sélectivement son périmètre applicatif dans la branche de travail.
3. Réappliquer les livrables approuvés et construire uniquement les actifs code-native déclarés dans `06-assets/asset-manifest.yaml`.
4. Construire par lots : fondations, pages publiques, données/offres, parcours interactifs, SEO, QA.
5. Comparer chaque lot à `protected-scope.yaml` et arrêter en cas de modification métier imprévue.

Ne pas reprendre automatiquement `docs/refonte-v2`, les quatre rasters historiques de `06-assets/generated/`, les anciens médias, previews, comparateur, showroom, composants génériques inutilisés ou catalogue contenant `commerce_premium`. Chaque lot doit être un commit autonome et récupérable ; aucune migration destructive n'est autorisée.
