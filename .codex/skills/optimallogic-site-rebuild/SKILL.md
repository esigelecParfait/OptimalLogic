---
name: optimallogic-site-rebuild
description: Auditer le site OptimalLogic existant et produire le dossier directeur complet de sa refonte sans supprimer de page, modifier silencieusement les offres ni inventer de preuve. Utiliser cette skill pour recadrer, migrer ou reconstruire le frontend public, les parcours de conversion et les espaces fonctionnels d’OptimalLogic.
---

# OptimalLogic Site Rebuild

Produire un contrat de reconstruction avant de modifier le frontend OptimalLogic.

## Entrées obligatoires

- le site public actuellement en ligne ;
- le dépôt OptimalLogic et la révision auditée ;
- les décisions explicites de l’utilisateur ;
- l’inventaire des routes publiques, authentifiées, administratives et de référence ;
- les offres et prix actuellement publiés, même lorsqu’ils doivent être révisés plus tard.

Lire [references/directive-pack-contract.md](references/directive-pack-contract.md) avant de créer ou modifier le dossier directeur. Partir des modèles dans `assets/` plutôt que d’improviser une structure.

## Invariants OptimalLogic

1. Conserver toutes les pages fonctionnelles du site initial. Une page peut être recomposée, mais pas supprimée silencieusement.
2. Classer les routes de démonstration ou de comparaison comme `reference_only`; elles restent disponibles pendant la migration mais n’entrent pas dans la navigation finale.
3. Conserver le positionnement existant autour de la présence digitale, de l’IA et de l’acquisition, puis expliciter la centralisation, la qualification, le traitement et le suivi des appels, devis, formulaires, rendez-vous et messages.
4. Conserver les offres et prix actuels comme `current_pending_revision` jusqu’à une décision commerciale explicite. Le frontend doit les lire depuis des données configurables.
5. Ne jamais inventer de témoignage, client, résultat, volume, gain, certification, partenaire ou fonctionnalité déjà opérationnelle.
6. Séparer les contenus OptimalLogic du dépôt modèle générique.
7. Préserver les parcours, données, routes serveur, politiques RLS et intégrations existants sauf demande explicite de modification.

## Workflow

### 1. Établir les sources

Attribuer un identifiant stable à chaque source : site public, dépôt, message utilisateur, document ou décision. Signaler les contradictions et choisir uniquement lorsqu’une instruction récente les résout explicitement.

### 2. Inventorier les pages

Créer `page-inventory.yaml`. Pour chaque route, consigner :

- audience et niveau d’accès ;
- rôle actuel ;
- état `preserve`, `redesign`, `internal` ou `reference_only` ;
- navigation, CTA, données et intégrations ;
- risques de migration et critère d’acceptation.

### 3. Produire le contrat métier

Créer ou réviser `site-spec.yaml` selon le contrat OptimalLogic existant. Conserver les offres actuelles sans les présenter comme définitivement approuvées. Utiliser `ready`, jamais `approved`, tant que l’utilisateur n’a pas validé le fichier produit.

### 4. Organiser le contenu et la conversion

Créer :

- `content-map.yaml` pour le message, les preuves, les contenus conservés, réécrits ou manquants ;
- `conversion-map.yaml` pour les CTA, formulaires, appels, devis, rendez-vous, aide et espaces connectés ;
- `open-decisions.yaml` pour les décisions commerciales ou juridiques non bloquantes.

Chaque promesse doit renvoyer à une source ou être marquée `proposed_copy`.

### 5. Préparer les skills suivantes

Le dossier doit rendre possibles, sans nouvelle interprétation métier :

- la direction artistique ;
- le manifeste d’images ;
- le motion design ;
- l’association des composants ;
- l’implémentation frontend ;
- la QA.

### 6. Valider

Exécuter :

```bash
python3 scripts/validate_rebuild_pack.py <dossier-directeur>
```

Ne pas coder si une page fonctionnelle n’est pas inventoriée, si le statut est `needs_input`, ou si une contradiction change le périmètre, les données, la sécurité ou les offres.

## Sorties

- `site-spec.yaml` ;
- `page-inventory.yaml` ;
- `content-map.yaml` ;
- `conversion-map.yaml` ;
- `open-decisions.yaml` ;
- `source-ledger.yaml` ;
- un résultat de validation sans erreur.
