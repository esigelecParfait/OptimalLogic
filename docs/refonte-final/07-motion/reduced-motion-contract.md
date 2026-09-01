# Contrat de mouvement réduit

Statut : `ready_for_review`

La règle s’applique avec `@media (prefers-reduced-motion: reduce)` et ne dépend pas de JavaScript pour rendre le contenu visible.

| Preset normal | Comportement réduit |
|---|---|
| `signal-converge` | Diagramme complet, tous les chemins visibles |
| `context-assemble` | Panneaux déjà organisés dans leur position finale |
| `threshold-cross` | Signal et destination visibles de part et d’autre du seuil |
| `human-handoff` | Contexte et décision humaine visibles simultanément |
| `reveal-copy`, `reveal-structure` | État final immédiat, sans translation |
| `button-feedback` | Couleur ou bordure instantanée, sans déplacement |
| `segmented-control` | Indicateur remplacé immédiatement |
| `accordion` | Ouverture immédiate avec annonce ARIA conservée |
| `form-state`, `booking-selection` | Mise à jour immédiate, focus inchangé |
| `assistant-stream` | Flux réel, sans curseur ni animation de frappe |

Garanties : scroll natif, aucun shimmer, aucune boucle, aucun zoom, aucun tracé progressif, aucun délai de lecture ou d’action. Les tests Playwright couvriront l’accueil, les services, les tarifs, le contact et la réservation avec `reducedMotion: "reduce"`. Un test sans JavaScript vérifiera que chaque diagramme informatif et chaque CTA restent disponibles.
