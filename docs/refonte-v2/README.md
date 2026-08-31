# OptimalLogic V2 — dossier directeur

Révision : `2026-08-30.2`
Statut : `ready` pour la conception et la construction, jamais `approved` sans
validation humaine.

Ce dossier conserve les parcours fonctionnels utiles du site actuel, renforce le
positionnement autour de la gestion des demandes par l'IA et les outils OptimalLogic,
et fixe le catalogue public à cinq codes existants. Les noms et montants viennent de
Supabase ; aucun prix de secours n'est codé dans l'interface.

## Ordre de lecture

1. `site-spec.yaml`, `page-inventory.yaml`, `content-map.yaml` et
   `conversion-map.yaml` ;
2. `art-direction.md`, `brand-tokens.json` et `page-composition.yaml` ;
3. `asset-manifest.yaml`, `image-briefs.md` et les concepts dans `assets/` ;
4. `motion-spec.yaml`, `page-motion-map.yaml` et `motion-qa-checklist.md` ;
5. `component-map.yaml`, `implementation-plan.md` et
   `frontend-build-report.md` ;
6. `open-decisions.yaml` avant toute validation finale.

## Concepts visuels fournis

- `assets/hero-signal-house-v1.webp` — flux de demandes pour le hero ;
- `assets/context-system-v1.webp` — trois contextes de services reliés ;
- `assets/contact-signal-v1.webp` — signal de contact et qualification.

Les PNG sont conservés comme sources de travail. Les WebP sont les versions optimisées
et consommées sur `/`, `/services` et `/contact`. Une validation visuelle humaine reste
nécessaire.

## Validation exécutée

- contrat `site-spec` : valide, statut `ready` ;
- dossier de reconstruction : valide ;
- manifeste d'actifs : valide ;
- système de mouvement : valide ;
- carte de composants : valide.

Le dépôt modèle correspondant est disponible sur la branche
`feat/premium-frontend-system-v2` du dépôt privé
`esigelecParfait/optimallogic-site-template`.

## Séparation des phases

- le dépôt modèle V2 fournit l'atelier réutilisable ;
- les skills indiquent à Codex et Claude comment travailler ;
- ce dossier directeur décrit le cas OptimalLogic ;
- le code dans `app/`, `components/`, `lib/` et `features/` est l'exécution de ces
  contrats sur le véritable site.

Une installation du système seule n'est jamais une refonte terminée. La refonte n'est
livrable qu'après exécution route par route et validation du Quality Gate.
