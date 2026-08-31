# Rapport d’implémentation du mouvement

Révision : `2026-08-30.1`

| Page        | Section             | Preset          | Consommateur réel                                          | Repli réduit                      |
| ----------- | ------------------- | --------------- | ---------------------------------------------------------- | --------------------------------- |
| `/`         | hero                | `reveal-copy`   | `MotionReveal` + `HeroSplit`                               | contenu immédiatement visible     |
| `/`         | flux de demandes    | `flow-progress` | `DemandFlow` avec `motion/react`                           | SVG complet, sans tracé animé     |
| `/`         | services et méthode | `reveal-group`  | `MotionReveal`                                             | groupes visibles sans translation |
| `/`         | manifeste et CTA    | `reveal-copy`   | `MotionReveal`                                             | contenu immédiatement visible     |
| `/services` | hero et contexte    | `reveal-copy`   | `MotionReveal` + blocs hero                                | contenu immédiatement visible     |
| `/services` | contextes           | `reveal-group`  | `MotionReveal` + `NarrativeMosaic`                         | cartes visibles sans translation  |
| `/services` | pipeline            | `flow-progress` | `MotionReveal` + `WorkflowPipeline`                        | pipeline complet et statique      |
| `/services` | FAQ et CTA          | `reveal-copy`   | `MotionReveal`                                             | contenu immédiatement visible     |
| `/contact`  | introduction        | `reveal-copy`   | enveloppe existante identifiée par `data-motion-preset-id` | contenu visible                   |

## Écarts connus

- `/tarifs`, `/prise-de-rdv` et `/aide` ne consomment pas encore le contrat V2 ;
- `feedback-success`, `surface-lift` et `route-transition` restent documentés mais ne sont
  pas déclarés comme implémentés dans le nouveau périmètre marketing ;
- aucune animation continue, parallaxe, smooth-scroll ou curseur personnalisé n’est active
  dans le shell marketing V2.

Le showroom sert uniquement à vérifier les primitives ; il ne constitue pas une preuve
d’implémentation sur les routes publiques.
