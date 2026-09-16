# Contrat du système de mouvement

## `motion-spec.yaml`

Racine : `motion_version`, `status`, `principles`, `tokens`, `presets`, `budgets`, `reduced_motion`.

Un preset contient :

- `id`, `category`, `purpose`, `properties` ;
- `duration_token`, `easing_token`, `delay_token` ;
- `trigger`, `once`, `mobile`, `reduced` ;
- `implementation_notes`.

Catégories : `entrance`, `transition`, `interaction`, `feedback`, `ambient`, `demonstration`.

## `page-motion-map.yaml`

Racine : `map_version`, `status`, `motion_spec_revision`, `pages`.

Chaque section contient : `section_id`, `preset_id`, `sequence`, `priority`, `mobile_override`, `reduced_override`, `fallback`.

## Budgets par défaut

- une seule animation ambiante continue visible à la fois ;
- deux moments de mouvement fort maximum par page marketing ;
- six éléments maximum dans une séquence échelonnée ;
- délai cumulé maximal d’une séquence : 480 ms ;
- aucune entrée essentielle plus longue que 700 ms ;
- aucune animation de mise en page déclenchée par scroll ;
- aucune animation ne doit provoquer un décalage de mise en page.

## Réduction du mouvement

Le mode réduit conserve feedbacks instantanés, focus et changements d’état. Il remplace les déplacements par une apparition immédiate ou un fondu inférieur à 100 ms et désactive les boucles.
