# Brief d’implémentation Codex

Refondre uniquement la couche frontend publique d’OptimalLogic selon
`docs/refonte-final/`.

## Résultat attendu

- Accueil, Services, Offres, Prise de rendez-vous et Contact cohérents ;
- trois offres : Présence digitale, SMS, appels + SMS ;
- noms et prix toujours chargés depuis la BDD par le mécanisme existant ;
- aucune modification backend, Supabase, API, RLS ou configuration ;
- Connexion dans le header ;
- cible multisectorielle ;
- palette verrouillée ;
- trois animations définies dans `07-motion/`.

## Arrêt obligatoire

Ne pas commencer le changement de catalogue frontend tant que les trois
présentations n’ont pas été associées aux codes existants en BDD. Ne jamais
résoudre cette incertitude par une modification du backend ou un code inventé.

## Validation

Suivre `09-implementation/acceptance-checklist.md` et
`10-validation/validation-checklist.md`. La production reste interdite tant
que la QA et la validation visuelle ne sont pas PASS.
