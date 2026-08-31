# Rapport d’intégration frontend

Révision du pack : `2026-08-30.1`

Branche : `feat/refonte-premium-v2`

État : `public_migration_complete_qa_pending`

## Chaîne réellement exécutée par Codex

1. installation préalable du dépôt modèle V2, de ses blocs, contrôles et dépendances ;
2. lecture du dossier directeur `docs/refonte-v2/` par la skill
   `optimallogic-site-rebuild` ;
3. association des compositions aux composants avec
   `optimallogic-frontend-builder` ;
4. intégration des médias déclarés avec `optimallogic-visual-assets` ;
5. implémentation des presets et de leurs replis avec
   `optimallogic-motion-design` ;
6. contrôles techniques et rapport QA, sans fusion ni déploiement.

Le code des pages est donc le résultat de l'exécution des livrables et skills installés,
et non un substitut au système V2. Les statuts `ready` ou `proposed` du dossier directeur
restent inchangés lorsqu'ils nécessitent encore une validation humaine.

## Réalisé

- fondations Signal House appliquées au shell marketing public ;
- accueil et services reconstruits avec les blocs génériques du showroom ;
- visuels générés réellement consommés sur `/`, `/services` et `/contact` via `next/image` ;
- système de mouvement relié au code, dont le flux SVG de l’accueil avec `motion/react` ;
- skill d’animation Codex et Claude renforcée avec contrôle contrat/code/rendu ;
- dépendances structurelles ajoutées : `motion`, `class-variance-authority`, `clsx` et
  `tailwind-merge`, puis `zod` et `server-only` pour les frontières serveur et la
  validation des données Supabase ;
- dashboard client supprimé : `/espace-client` redirige vers le support et n’est plus
  présenté dans la navigation publique ;
- tarifs nettoyés de toute promesse de dashboard ou tableau imposé ;
- `/tarifs`, `/prise-de-rdv` et `/aide` alignés sur le shell, les tokens et les
  comportements V2 ;
- catalogue public limité à cinq codes existants ; noms et montants lus depuis la table
  `offres`, sans montant de secours ;
- métadonnées par route, sitemap et règles d’indexation ajoutés avec les API natives de
  Next.js 16 ;
- en-têtes `nosniff`, anti-iframe, politique de référent et permissions navigateur
  appliqués à toutes les routes.

## Préservé volontairement

- routes API, Supabase, authentification et contrôles serveur ;
- support et informations de compte existants, hors navigation marketing ;
- administration interne, distincte du site public ;
- showroom interne comme banc de régression des primitives et variantes, sans refonte
  cosmétique ;
- support client et compte existants, hors navigation marketing.

## Reste à valider

- validation visuelle humaine des pages publiques ;
- validation Supabase/RLS avec l’environnement de production ;
- exécution Playwright et Lighthouse dès qu’un navigateur Chromium est disponible.

## Livraison

La validation se fait par `git pull` de `feat/refonte-premium-v2` puis exécution locale.
Aucune fusion dans `main` et aucun déploiement Vercel ne sont demandés par ce rapport.
