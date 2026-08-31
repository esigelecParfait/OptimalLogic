# Rapport QA OptimalLogic

## Version auditée

- Client : OptimalLogic
- Révision : `15b9013` sur `feat/refonte-premium-v2`
- Prévisualisation technique : `http://127.0.0.1:3103` pendant le test local
- Production prévue : `https://optimal-logic.com` — non auditée et non modifiée
- Profils : vitrine publique, backend dynamique, authentification, réservation et assistant IA
- Date : 31 août 2026

## Décision

**FAIL pour une autorisation de production.**

Cette décision ne signale pas un échec du build : les contrôles statiques, unitaires et
HTTP passent. Elle signifie que la skill QA interdit de déclarer une livraison premium
tant que les tests navigateur, responsive, accessibilité, Lighthouse, Supabase/RLS et la
validation visuelle humaine ne disposent pas de preuves.

La révision reste utilisable pour la revue locale demandée sur la branche dédiée. Elle
n'est ni fusionnée dans `main`, ni déployée.

## Résumé

- Contrôles réussis : 14
- Échecs techniques constatés : 0
- Contrôles non testés : 10
- Non applicable : 1

## Défauts bloquants et cibles

| ID              | Niveau | Constat                                                                                         | Preuve                                                                                   | Action requise                                                                                                                 | Responsable       |
| --------------- | ------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| QA-BROWSER      | B      | Chromium indisponible ; les 7 tests Playwright n'ont pas démarré.                               | Exécutable `chromium_headless_shell-1234` absent ; téléchargement CDN expiré après 30 s. | Exécuter `npm run setup:browsers`, puis `npm run test:functional` et `npm run test:responsive` sur la machine locale ou la CI. | OptimalLogic / CI |
| QA-DATA         | B      | RLS, rôles et cinq lignes `public.offres` non contrôlés sur un environnement Supabase autorisé. | Aucun dossier de migrations reconstructible et aucun accès distant utilisé.              | Vérifier les cinq codes actifs, les prix, RLS et les quatre profils d'accès avec des comptes de test.                          | OptimalLogic      |
| QA-VISUAL       | C      | Responsive, accessibilité manuelle, rendu premium et Lighthouse sans preuve.                    | Aucun navigateur disponible dans l'environnement d'audit.                                | Revue locale aux cinq largeurs, clavier, zoom 200 %, mouvement réduit et trois passages Lighthouse mobile.                     | OptimalLogic      |
| QA-INTEGRATIONS | B      | Cal, emails, assistant et écritures réelles non sollicités.                                     | Tests volontairement neutres, sans notification ni donnée réelle.                        | Tester les parcours dans un environnement de test avec destinataires contrôlés.                                                | OptimalLogic      |

## Changements couverts

- cinq offres publiques exactement : deux Commerce, deux TPE/PME et une Startup ;
- noms et prix lus depuis Supabase, sans valeur de secours codée en dur ;
- refus serveur d'un `offer_code` Tarifs hors catalogue public ;
- `/tarifs`, `/prise-de-rdv` et `/aide` alignés sur le système V2 ;
- visuels générés consommés sur l'accueil, les services et le contact ;
- animations reliées aux états réels avec repli `prefers-reduced-motion` ;
- dashboard client retiré du parcours, `/espace-client` redirigeant vers le support ;
- SEO par route, sitemap, exclusions d'indexation et en-têtes de sécurité ;
- `zod` et `server-only` ajoutés pour les données et frontières serveur.

## Revue visuelle

Les dix axes sont laissés non notés. Le fichier structuré utilise `0/20` uniquement parce
que son schéma exige dix valeurs numériques ; ce zéro ne constitue pas une appréciation
du design sans rendu. La validation devra porter sur : positionnement, hiérarchie, grille,
typographie, couleurs, images, spécificité, mouvement, crédibilité et mobile.

## Tests exécutés

| Commande ou contrôle                                          | Résultat  | Preuve                                                                   |
| ------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ |
| Validateurs rebuild, composants, mouvement, actifs et backend | PASS      | Cinq validateurs terminés avec code 0.                                   |
| `npm run format:check`                                        | PASS      | Tous les fichiers correspondent au format Prettier.                      |
| `npm run lint`                                                | PASS      | ESLint terminé avec code 0.                                              |
| `npm run typecheck`                                           | PASS      | TypeScript terminé avec code 0.                                          |
| `npm run build`                                               | PASS      | Build Next.js 16.3.3, 32 pages, code 0.                                  |
| `npm run test:unit`                                           | PASS      | 3 fichiers, 9 tests.                                                     |
| `npm audit --omit=dev`                                        | PASS      | 0 vulnérabilité.                                                         |
| Fumée HTTP locale                                             | PASS      | 8 routes publiques en HTTP 200.                                          |
| En-têtes de sécurité                                          | PASS      | `nosniff`, `SAMEORIGIN`, référent strict et Permissions-Policy présents. |
| Indexation interne                                            | PASS      | Showroom, comparateur et preview en `noindex,nofollow`.                  |
| `npx playwright test --list --project=functional`             | PASS      | 7 scénarios reconnus dans 2 fichiers.                                    |
| `npm run test:functional`                                     | NON TESTÉ | Les 7 workers échouent avant navigation faute d'exécutable Chromium.     |
| Responsive, accessibilité et Lighthouse                       | NON TESTÉ | Chromium indisponible.                                                   |

## Livrables et validations

| Élément                       | État              | Preuve                                                         |
| ----------------------------- | ----------------- | -------------------------------------------------------------- |
| Code source                   | Présent           | Commit `15b9013`.                                              |
| Dossier directeur V2          | Présent et valide | `docs/refonte-v2/`.                                            |
| Plan backend                  | Présent et valide | `docs/refonte-v2/backend-plan.yaml`.                           |
| Rapport frontend et mouvement | Présents          | `frontend-build-report.md`, `motion-implementation-report.md`. |
| Rollback                      | Disponible        | `main@af4dc00` reste intact.                                   |
| Validation visuelle client    | Absente           | Revue locale encore à effectuer.                               |
| Autorisation de production    | Absente           | Aucun déploiement demandé.                                     |

## Autorisation de production

- Validation client : non
- Autorisation OptimalLogic : non
- Release ready : non

Le prochain verdict peut devenir `PASS` uniquement après les contrôles navigateur,
Supabase/RLS, intégrations et validation visuelle sur la révision exacte auditée.
