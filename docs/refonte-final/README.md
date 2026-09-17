# Refonte finale OptimalLogic

Ce dossier est la source de vérité de la prochaine refonte. Il remplace
`docs/refonte-v2/`, conservé uniquement comme historique.

## Décisions principales

- trois offres : Présence digitale, Accueil & qualification par SMS, Accueil &
  qualification par appels + SMS ;
- récupération existante des noms et prix depuis la BDD, sans modification du
  backend ni de sa configuration ;
- cible multisectorielle : entreprises, commerces et TPE/PME ;
- Connexion dans le header ;
- palette graphite, ivoire, bleu pétrole et vert minéral ;
- trois animations fortes réparties entre Accueil et Services ;
- photographie réelle autorisée uniquement pour la présence digitale.

## Dossiers

1. `00-governance/` — décisions et état du workflow.
2. `01-audit/` — inventaire et périmètre protégé.
3. `02-references/` — références et règles anti-copie.
4. `03-strategy/` — site-spec, audiences, trois offres et parcours.
5. `04-content/` — contenus et configuration commerciale de référence.
6. `05-art-direction/` — direction, tokens et compositions.
7. `06-assets/` — manifeste des visuels.
8. `07-motion/` — contrats des trois animations.
9. `08-backend/` — état historique à préserver; aucune modification autorisée.
10. `09-implementation/` — blueprint frontend et tests de non-régression.
11. `10-validation/` — QA non exécutable avant implémentation.
12. `11-handoff/` — dossier Codex, bloqué jusqu’aux validations requises.

## Statut

Les décisions de conception sont consolidées. L’implémentation reste bloquée
tant que la correspondance des trois présentations avec les codes existants
n’est pas vérifiée et que les photographies ne sont pas licenciées. Ce blocage
n’autorise aucune modification du backend.
