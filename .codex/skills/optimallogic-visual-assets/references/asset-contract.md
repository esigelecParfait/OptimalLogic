# Contrat des actifs visuels

## Manifeste

`asset-manifest.yaml` contient : `manifest_version`, `status`, `direction_revision`, `assets`, `budget`.

Chaque actif contient :

- `id`, `page_id`, `section_id`, `role`, `priority` ;
- `source_type`, `status`, `brief` ;
- `aspect_ratio`, `desktop_size`, `mobile_size`, `safe_crop` ;
- `alt`, `decorative`, `fallback` ;
- `formats`, `max_weight_kb`, `loading` ;
- `rights_owner`, `rights_status`, `notes`.

Valeurs de `status` : `planned`, `ready`, `rejected`, `not_needed`.

Valeurs de `rights_status` : `confirmed`, `pending`, `not_applicable`. Un actif ne peut devenir `ready` avec des droits `pending`.

## Registre

`asset-register.yaml` associe l’identifiant du manifeste au chemin final, au hash, aux dimensions, au poids, au format, à la provenance et aux pages consommatrices.

## Budget

Le manifeste précise le budget total initial et le budget par média. Une vidéo ou une animation lourde est chargée après interaction ou hors premier écran sauf justification documentée.
