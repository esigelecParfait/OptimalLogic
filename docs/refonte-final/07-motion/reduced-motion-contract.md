# Contrat de mouvement réduit

Statut : `ready_for_review`

La règle s'applique avec `@media (prefers-reduced-motion: reduce)` et ne dépend pas de JavaScript pour rendre le contenu visible.

| Preset normal | Comportement réduit |
|---|---|
| `reveal-copy`, `panel-reveal`, `section-shift` | État final immédiat, sans translation |
| `list-stagger` | Tous les éléments présents immédiatement |
| `signal-converge`, `flow-progress` | Diagramme complet statique |
| `button-feedback` | Couleur ou bordure instantanée, sans déplacement |
| `segmented-control` | Indicateur remplacé immédiatement |
| `accordion` | Ouverture immédiate avec annonce ARIA conservée |
| `form-state`, `booking-selection` | Mise à jour immédiate, focus inchangé |
| `assistant-stream` | Flux normal, sans curseur ni animation de frappe |

Garanties : scroll natif, aucun shimmer, aucune boucle, aucun zoom média, aucun délai de lecture ou d'action. Les tests Playwright couvriront l'accueil, les tarifs, le contact et la réservation avec `reducedMotion: "reduce"`.
