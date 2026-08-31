# Rapport d’implémentation du mouvement

Révision : `2026-08-30.1`

| Page            | Section              | Preset                                 | Consommateur réel                            | Repli réduit                      |
| --------------- | -------------------- | -------------------------------------- | -------------------------------------------- | --------------------------------- |
| `/`             | hero                 | `reveal-copy`                          | `MotionReveal` + `HeroSplit`                 | contenu immédiatement visible     |
| `/`             | flux de demandes     | `flow-progress`                        | `DemandFlow` avec `motion/react`             | SVG complet, sans tracé animé     |
| `/`             | services et méthode  | `reveal-group`                         | `MotionReveal`                               | groupes visibles sans translation |
| `/`             | manifeste et CTA     | `reveal-copy`                          | `MotionReveal`                               | contenu immédiatement visible     |
| `/services`     | hero et contexte     | `reveal-copy`                          | `MotionReveal` + blocs hero                  | contenu immédiatement visible     |
| `/services`     | contextes            | `reveal-group`                         | `MotionReveal` + `NarrativeMosaic`           | cartes visibles sans translation  |
| `/services`     | pipeline             | `flow-progress`                        | `MotionReveal` + `WorkflowPipeline`          | pipeline complet et statique      |
| `/services`     | FAQ et CTA           | `reveal-copy`                          | `MotionReveal`                               | contenu immédiatement visible     |
| `/contact`      | introduction         | `reveal-copy`                          | `MotionReveal` + média généré                | contenu immédiatement visible     |
| `/contact`      | formulaire et succès | `surface-lift`, `feedback-success`     | `MotionReveal` autour des états réels        | aucun déplacement                 |
| `/tarifs`       | hero et cinq offres  | `reveal-copy`, `reveal-group`          | `MotionReveal`, `MotionGroup`, `MotionItem`  | cartes immédiatement visibles     |
| `/tarifs`       | démarrage            | `flow-progress`                        | groupe ordonné des quatre étapes             | étapes immédiatement visibles     |
| `/prise-de-rdv` | hero et réservation  | `reveal-copy`, `surface-lift`          | `MotionReveal` sur les surfaces interactives | surfaces immédiatement visibles   |
| `/prise-de-rdv` | confirmation         | `feedback-success`                     | état rendu après confirmation Cal            | message immédiatement visible     |
| `/aide`         | conversation         | mouvement fonctionnel du chat existant | défilement seulement si autorisé et utile    | défilement instantané             |

## Limites volontaires

- `route-transition` reste documenté mais n’est pas activé : aucune transition globale
  n’est nécessaire au parcours public ;
- aucune animation continue, parallaxe, smooth-scroll ou curseur personnalisé n’est active
  dans le shell marketing V2.

Le showroom sert uniquement à vérifier les primitives ; il ne constitue pas une preuve
d’implémentation sur les routes publiques.
