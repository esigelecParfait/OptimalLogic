# Contrat d’assemblage frontend

## Carte de composants

`component-map.yaml` contient :

- `map_version`, `status`, `template_revision`, `directive_pack_revision` ;
- `pages[]` avec `page_id`, `path`, `layout`, `sections[]` ;
- `gaps[]` pour les composants ou données manquants.

Chaque section contient :

- `section_id` identique à `page-composition.yaml` ;
- `block_family` et `variant` ;
- `decision`: `reuse`, `extend` ou `create` ;
- `content_source`, `media_id`, `motion_preset` ;
- `mobile_behavior`, `accessibility`, `acceptance` ;
- `justification` obligatoire pour `extend` et `create`.

## Frontières

- Une primitive ne connaît aucune page, offre ou marque.
- Un bloc porte une composition réutilisable et reçoit un contenu typé.
- Une page choisit l’ordre des blocs et fournit les données de marque.
- Une fonctionnalité métier vit dans `features/` avec contrat, tests et documentation.
- Le mouvement est consommé par identifiant de preset ; il n’est pas redéfini page par page.

## Critères premium

- une silhouette de page identifiable ;
- une hiérarchie message → preuve → action ;
- variations de rythme sans rupture de grille ;
- pas plus d’un accent dominant par section ;
- mobile recomposé, pas seulement empilé ;
- interactions utiles au clavier et au toucher ;
- aucune preuve fictive dans le showroom ou le site.
