# Étape 4 — Compositions publiques

## Résultat

La bibliothèque contient désormais 38 variantes réparties entre huit familles :

| Famille      | Variantes |
| ------------ | --------: |
| Hero         |         6 |
| Services     |         6 |
| Tarifs       |         4 |
| Réalisations |         4 |
| Preuves      |         6 |
| FAQ          |         4 |
| Contact      |         4 |
| Réservation  |         4 |

Le catalogue complet est visible sur `/showroom/compositions`. Quatre assemblages de pages sont présentés sur `/showroom/layouts` : conversion structurée, éditorial manifeste, produit et réalisations, service local direct.

## Contrats

- Les variantes reçoivent leur contenu par des propriétés TypeScript.
- Une variante ne choisit jamais un thème : les huit identités sont appliquées par `data-theme`.
- Les différences portent sur la grille, la hiérarchie, la densité et le rythme, pas seulement sur la couleur.
- Les attributs `data-motion-scope` des heros constituent des points d'accroche pour une future couche de mouvement. Aucun mouvement n'est requis pour comprendre le contenu.
- Les blocs de contact et de réservation n'implémentent aucun envoi, calendrier ou backend à cette étape.
- Les prix, preuves, citations, clients, résultats et disponibilités du showroom sont neutralisés. Ils doivent être remplacés par des données validées.

## Points d'entrée

Toutes les variantes publiques sont exportées depuis `components/blocks/index.ts`. Les nouvelles familles disposent également de leurs points d'entrée `components/blocks/contact` et `components/blocks/booking`.

## Validation

Exécuter :

```bash
npm run check:static
npm run setup:browsers
npm run check
```

Les tests vérifient le nombre de familles et de variantes, l'application des huit thèmes, les libellés du formulaire, les quatre layouts et l'absence de débordement horizontal aux largeurs configurées dans Playwright.
