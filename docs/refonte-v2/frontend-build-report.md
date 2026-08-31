# Rapport d’intégration frontend

Révision du pack : `2026-08-30.1`

Branche : `feat/refonte-premium-v2`

État : `public_migration_in_progress`

## Réalisé

- fondations Signal House appliquées au shell marketing public ;
- accueil et services reconstruits avec les blocs génériques du showroom ;
- visuels générés réellement consommés sur `/`, `/services` et `/contact` via `next/image` ;
- système de mouvement relié au code, dont le flux SVG de l’accueil avec `motion/react` ;
- skill d’animation Codex et Claude renforcée avec contrôle contrat/code/rendu ;
- dépendances structurelles ajoutées : `motion`, `class-variance-authority`, `clsx` et
  `tailwind-merge` ;
- dashboard client supprimé : `/espace-client` redirige vers le support et n’est plus
  présenté dans la navigation publique ;
- tarifs nettoyés de toute promesse de dashboard ou tableau imposé.

## Préservé volontairement

- routes API, Supabase, authentification et contrôles serveur ;
- support et informations de compte existants, hors navigation marketing ;
- administration interne, distincte du site public ;
- showroom interne comme banc de régression des primitives et variantes, sans refonte
  cosmétique ;
- contenus, offres et tarifs existants hors corrections de vocabulaire liées au dashboard.

## Reste à migrer

- alignement complet de `/tarifs`, `/prise-de-rdv` et `/aide` sur les compositions V2 ;
- validation visuelle humaine des pages publiques ;
- validation Supabase/RLS avant toute décision de production.

## Livraison

La validation se fait par `git pull` de `feat/refonte-premium-v2` puis exécution locale.
Aucune fusion dans `main` et aucun déploiement Vercel ne sont demandés par ce rapport.
