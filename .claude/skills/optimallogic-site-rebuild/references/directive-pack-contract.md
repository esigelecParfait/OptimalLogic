# Contrat du dossier directeur OptimalLogic

## Statuts

- `needs_input` : une décision bloquante manque ;
- `ready` : le dossier peut alimenter la conception et le code ;
- `approved` : l’utilisateur a explicitement validé cette version exacte.

## `page-inventory.yaml`

Racine : `inventory_version`, `status`, `source_revision`, `routes`.

Chaque route contient : `id`, `path`, `surface`, `access`, `decision`, `purpose`, `primary_cta`, `data`, `integrations`, `acceptance`, `notes`.

Valeurs :

- `surface` : `marketing`, `conversion`, `legal`, `auth`, `client`, `admin`, `client_delivery`, `reference` ;
- `access` : `public`, `anonymous_only`, `authenticated`, `admin` ;
- `decision` : `preserve`, `redesign`, `internal`, `reference_only`.

## `content-map.yaml`

Racine : `content_version`, `status`, `positioning`, `pages`, `claims_policy`.

Le positionnement distingue `existing_core` et `added_demand_management`. Chaque bloc de page contient `message`, `source_ids`, `state`, `proof_requirement` et `notes`. Valeurs de `state` : `keep`, `rewrite`, `new`, `pending_offer_revision`.

## `conversion-map.yaml`

Racine : `conversion_version`, `status`, `primary_goal`, `channels`, `journeys`.

Canaux attendus : appel, devis, formulaire, rendez-vous, message et aide. Un parcours indique un déclencheur, des étapes observables, des données, un résultat, un propriétaire et un comportement d’échec.

## `open-decisions.yaml`

Chaque décision contient : `id`, `topic`, `question`, `blocking`, `owner`, `due_before`, `current_rule`.

Les offres différées restent visibles avec `blocking: false` si leur structure actuelle peut être conservée sans bloquer la refonte.

## `source-ledger.yaml`

Chaque source contient : `id`, `type`, `title`, `location`, `observed_at`, `scope`.

Ne pas placer de secret, jeton, donnée personnelle réelle ou contenu de compte privé dans le dossier.
