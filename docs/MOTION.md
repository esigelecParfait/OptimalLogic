# Système de mouvement premium

## Principe

Le mouvement explique une hiérarchie, signale un changement d'état ou
accompagne une progression. Une animation décorative ne doit jamais ralentir
l'accès au contenu ni détourner l'utilisateur de son objectif.

La source de vérité d'un projet client est son `motion-spec.yaml`, complété par
un `page-motion-map.yaml`. La skill `$optimallogic-motion-design` produit et
valide ces fichiers avant l'intégration.

## Composants publics

Les composants sont exportés depuis `src/components/motion/` :

- `MotionReveal` anime un groupe autonome avec les presets `fade`, `rise`,
  `scale` ou `clip` ;
- `MotionGroup` observe une liste ou un groupe une seule fois ;
- `MotionItem` applique un décalage borné de 0 à 5 à l'intérieur du groupe.

Le HTML rendu côté serveur est visible. Après hydratation, un élément sous la
ligne de flottaison peut être préparé puis révélé avec
`IntersectionObserver`. Sans JavaScript ou API compatible, le contenu reste
immédiatement disponible.

## Budgets

| Interaction             | Durée cible | Propriété principale      |
| ----------------------- | ----------: | ------------------------- |
| Focus, survol, pression |   80–240 ms | couleur, ombre, transform |
| Apparition de section   |  320–520 ms | opacity + transform       |
| Entrée éditoriale forte |  520–700 ms | opacity + transform/clip  |
| Décalage entre éléments |    50–80 ms | délai borné               |

Préférer `transform` et `opacity`. Éviter d'animer les dimensions, la position
de mise en page, les filtres coûteux et de nombreuses surfaces simultanément.

## Accessibilité

- `prefers-reduced-motion: reduce` supprime transitions, transformations et
  masques ;
- aucun contenu essentiel n'est masqué par défaut ;
- les états clavier et la lecture sémantique ne dépendent pas de l'animation ;
- les effets liés au survol sont neutralisés sur pointeur grossier ;
- les contenus animés restent lisibles à 320 px et à fort zoom.

## Vérification

Exécuter `npm run check`, puis vérifier le showroom avec la réduction des
mouvements activée et désactivée. Un projet client doit aussi suivre la
checklist produite avec son contrat de mouvement.
