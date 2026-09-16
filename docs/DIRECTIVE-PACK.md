# Pack de directives d'une refonte

## Objectif

Le pack sépare les décisions métier, éditoriales, visuelles, techniques et
animées avant que Codex ne modifie un site client. Il reste dans le dépôt client
et ne contient jamais de contenu de marque dans ce modèle générique.

## Fichiers attendus

| Fichier                  | Source               | Rôle                                                    |
| ------------------------ | -------------------- | ------------------------------------------------------- |
| `site-spec.yaml`         | intake + rebuild     | Source de vérité du périmètre et des exigences          |
| `page-inventory.yaml`    | rebuild              | Routes conservées, fusionnées, ajoutées ou de référence |
| `content-map.yaml`       | rebuild              | Messages, preuves, CTA et validation par page           |
| `conversion-map.yaml`    | rebuild              | Entrées, traitements, responsables et sorties           |
| `source-ledger.yaml`     | rebuild              | Provenance et droits des faits et médias                |
| `open-decisions.yaml`    | rebuild              | Questions bloquantes et décisions différées             |
| `art-direction.md`       | direction artistique | Concept visuel retenu et anti-patterns                  |
| `brand-tokens.json`      | direction artistique | Valeurs de marque mappées aux tokens                    |
| `page-composition.yaml`  | direction artistique | Ordre et intention des sections par route               |
| `asset-manifest.yaml`    | visual assets        | Médias, droits, états et emplacements                   |
| `image-briefs.md`        | visual assets        | Prompts et contraintes des visuels à produire           |
| `motion-spec.yaml`       | motion design        | Primitives, budgets et variantes réduites               |
| `page-motion-map.yaml`   | motion design        | Animation autorisée pour chaque section                 |
| `component-map.yaml`     | frontend builder     | Réutilisation, extension ou création                    |
| `implementation-plan.md` | frontend builder     | Ordre de réalisation et critères d'acceptation          |

## Séquence imposée

1. `$optimallogic-site-rebuild` fige les routes fonctionnelles et les parcours.
2. La direction artistique et `$optimallogic-visual-assets` définissent le
   système visuel sans créer de fausse preuve.
3. `$optimallogic-motion-design` rattache chaque animation à une intention.
4. `$optimallogic-frontend-builder` implémente depuis ces contrats.
5. Les contrôles QA vérifient code, contenu, responsive, accessibilité et
   performances avant toute autorisation de mise en production.

Une décision commerciale différée, comme une future révision des tarifs, doit
être explicitement marquée. Les données restent configurables afin qu'elle ne
bloque pas la refonte visuelle.
