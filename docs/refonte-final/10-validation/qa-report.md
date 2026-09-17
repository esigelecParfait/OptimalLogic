# Rapport QA

## Décision

**FAIL — non livrable en production.**

Le dossier de conception est désormais aligné sur les trois offres, la palette,
les animations et la protection du backend. Cette décision ne juge pas encore
un site implémenté.

## Points conformes

- trois offres et cible multisectorielle documentées ;
- récupération BDD des noms et prix explicitement préservée ;
- backend, Supabase, API, RLS et configuration classés hors périmètre ;
- trois contrats d’animation et leurs états à mouvement réduit définis.

## Blocages

1. photographies de production et droits non validés ;
2. volumes et dépassements SMS/minutes non confirmés ;
3. refonte complète non implémentée et absence de preview ;
4. tests visuels, responsive, accessibilité et non-régression non exécutés.

Le schéma Supabase et les politiques RLS ne doivent pas être modifiés pour lever
ces blocages. La preuve attendue est une lecture du contrat existant et des
tests de non-régression.
