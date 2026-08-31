# Plan d'implémentation frontend OptimalLogic V2

Statut : `implemented_pending_human_review` — les lots de code ont été exécutés par
Codex depuis le pack V2 sur `feat/refonte-premium-v2`. La validation navigateur,
Supabase et humaine reste requise avant toute production. Aucun déploiement n'a été
effectué.

## Lot 0 — Sécuriser la migration

- créer une branche dédiée dans le dépôt OptimalLogic lors du démarrage du code
  site ;
- ajouter ce pack dans `docs/directive-pack/` et enregistrer sa révision ;
- figer les tests des routes et parcours actuels ;
- créer une source typée unique pour les offres existantes ;
- vérifier les protections Supabase, auth, RLS, admin et livraisons client.

Critère : toutes les routes de `page-inventory.yaml` répondent et les tests
actuels sont reproductibles avant refonte.

## Lot 1 — Fondations de marque

- mapper `brand-tokens.json` aux tokens du frontend OptimalLogic ;
- installer ou confirmer les polices et licences ;
- construire les shells marketing, auth, client et admin ;
- intégrer focus, états, skip-links et réduction du mouvement ;
- garder les actifs de marque hors du dépôt modèle.

Critère : showroom et shells passent formatage, lint, types, build, responsive et
contraste, sans changement backend.

## Lot 2 — Pages marketing

- reconstruire `/`, `/services`, `/tarifs`, `/contact`, `/prise-de-rdv` et
  `/aide` depuis `page-composition.yaml` ;
- brancher les cinq codes d'offres validés depuis Supabase, avec nom et prix issus
  de la BDD et sans montant de remplacement ;
- relier les CTA aux destinations réelles ;
- intégrer uniquement les images sélectionnées et optimisées ;
- appliquer `page-motion-map.yaml` avec les fallbacks documentés.

Critère : contenu sans preuve inventée, parcours au clavier et sans JavaScript
non essentiel, aucun débordement aux cinq viewports.

## Lot 3 — Authentification et surfaces internes préservées

- restyler les écrans de connexion, activation et réinitialisation sans changer
  leurs protocoles ;
- supprimer le dashboard client du parcours et rediriger `/espace-client` vers le support ;
- conserver support, compte et administration hors de la refonte marketing ;
- utiliser l'IA uniquement selon les garde-fous du `conversion-map.yaml` ;
- préserver la livraison Délices de Léon et les règles spécifiques.

Critère : aucun dashboard dans le parcours client, contrôle de rôle serveur, RLS,
isolation client et scénarios d'échec inchangés ou renforcés.

## Lot 4 — Pages légales et références

- appliquer la typographie de lecture aux pages légales sans modifier leur
  sens ;
- conserver `/comparer` et `/preview/**` hors navigation, en `noindex` et comme
  références temporaires ;
- obtenir la revue légale et décider du retrait ou de la protection des previews
  avant production.

Critère : aucune route supprimée silencieusement et aucun contenu de référence
indexable en production.

## Lot 5 — QA et bascule

- exécuter formatage, lint, TypeScript, tests unitaires/API, build, Playwright
  fonctionnel et responsive ;
- auditer accessibilité, performance, SEO, sécurité et données ;
- tester mouvement réduit, tactile, navigation arrière et absence de JS ;
- comparer chaque page à l'inventaire et au pack ;
- obtenir les validations humaines : direction, images, contenu, légal et
  production.

Critère : rapport QA `PASS` ou `PASS AVEC RÉSERVES` sans réserve bloquante.

## Dépendances et décisions différées

- La grille publique est fixée à cinq codes existants. Toute modification de nom
  ou de montant se fait dans la table `offres`.
- Les captures produit attendent des données réelles anonymisées.
- Une capacité IA n'entre dans le contenu définitif qu'après test technique de
  son flux, de son repli et de sa traçabilité.

## Trace d'exécution Codex

| Contrat utilisé                                 | Exécution dans le dépôt                                              | Preuve principale                                          |
| ----------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `site-spec.yaml` et `page-inventory.yaml`       | Conservation des routes et reconstruction des six surfaces publiques | `app/(main)`, `app/(assistant)`                            |
| `page-composition.yaml` et `component-map.yaml` | Assemblage avec les blocs V2 et les shells existants                 | pages publiques et `components/marketing`                  |
| `asset-manifest.yaml`                           | Consommation des trois WebP prévus                                   | `/`, `/services`, `/contact`                               |
| `motion-spec.yaml` et `page-motion-map.yaml`    | Presets reliés à de petits composants clients                        | `components/motion`, `components/marketing/DemandFlow.tsx` |
| `site-spec.business.offers`                     | Cinq codes autorisés ; nom et prix lus depuis Supabase               | `lib/offers`, `app/api/offres`, `/tarifs`                  |
| `conversion-map.yaml`                           | Formulaire, réservation et aide conservés puis recomposés            | `/contact`, `/prise-de-rdv`, `/aide`                       |

Cette trace décrit l'origine des changements. Elle ne transforme pas les livrables
`proposed` en décisions approuvées par l'utilisateur.
