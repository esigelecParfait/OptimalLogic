# Rapport de handoff

## Décision

**BLOCKED**

## État

Les livrables sont corrigés pour les trois offres, la cible entreprise, la
palette, la photographie réelle, les trois animations et Connexion dans le
header. Le contrat existant de récupération des noms et prix depuis la BDD est
explicitement protégé.

## Blocages avant implémentation

- associer les trois présentations frontend aux codes BDD existants ;
- confirmer les volumes et dépassements SMS/minutes ;
- choisir des photographies licenciées ;
- obtenir l’approbation des livrables mis à jour.

## Interdictions

Ne pas modifier le backend, Supabase, les routes API, les politiques RLS ou la
configuration des offres pour contourner ces blocages. Ne pas fusionner vers
`main` et ne pas déployer sans QA PASS et autorisation explicite.
