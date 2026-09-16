# Quality Gate du dépôt OptimalLogic

## Périmètre actif

Le workflow `.github/workflows/quality.yml` est déclenché sur les pull
requests, `main` et les branches `feat/**`.

Il exécute :

1. installation verrouillée avec `npm ci` ;
2. installation de Chromium ;
3. contrôle Prettier ;
4. ESLint ;
5. TypeScript ;
6. build Next.js ;
7. tests unitaires Vitest ;
8. parcours fonctionnels Playwright ;
9. responsive à 320, 390, 768, 1024 et 1440 px ;
10. budgets Lighthouse.

Les rapports Playwright et Lighthouse sont conservés sept jours comme artefacts
GitHub Actions.

## Limite Supabase actuelle

Le site utilise Supabase, mais le dépôt ne contient pas encore de dossier
`supabase/migrations/` reconstruisant son schéma réel. Le job de migrations et
RLS du dépôt modèle n'a donc pas été copié aveuglément : il aurait testé une
base différente et donné une fausse assurance.

Le contrôle base de données reste `not_tested` jusqu'à l'import versionné du
schéma réel, des politiques RLS et de leurs tests. Il devra alors devenir un
second job bloquant.

## Préparation locale

```bash
npm install
npm run setup:browsers
```

Créer `.env.local` depuis `.env.example`. Les secrets réels ne doivent jamais
être commités. La CI utilise uniquement des valeurs factices pour compiler et
ouvrir les pages ; ses scénarios n'envoient ni demande client, ni email, ni
appel IA.

## Exécution progressive

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:functional
npm run test:responsive
npm run test:performance
```

Le contrôle complet est :

```bash
npm run check:all
```

## Diagnostic des erreurs

| Étape rouge              | Cause habituelle                              | Correction                                                                     |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------ |
| Check formatting         | fichier non normalisé                         | `npm run format`, puis relire le diff                                          |
| Run ESLint               | règle React ou Next.js violée                 | corriger la première erreur, sans désactiver globalement la règle              |
| Check TypeScript         | type, prop ou contexte de route incorrect     | `npm run typecheck` et corriger le contrat                                     |
| Build production site    | variable manquante ou erreur de rendu serveur | compléter `.env.local`, puis relancer `npm run build`                          |
| Unit tests               | logique métier modifiée                       | exécuter `npm run test:unit` et traiter le premier scénario                    |
| Functional browser tests | route ou interaction cassée                   | `npx playwright show-report`                                                   |
| Responsive tests         | largeur ou élément hors écran                 | utiliser la route, le viewport et l'élément donnés par Playwright              |
| Lighthouse               | score inférieur au budget                     | ouvrir le rapport HTML dans `.lighthouseci/`                                   |
| Install Chromium         | navigateur absent                             | `npm run setup:browsers`; en réseau filtré, laisser GitHub Actions l'installer |

Ne jamais réduire un seuil ou retirer un parcours uniquement pour obtenir du
vert. Les routes `app/preview/**` et la sauvegarde historique sont exclues des
contrôles de style car elles sont classées `reference_only`; elles restent
compilées par Next.js tant qu'elles sont présentes.

## Budgets transférés

| Catégorie Lighthouse | Minimum |
| -------------------- | ------: |
| Performance          |    0,80 |
| Accessibilité        |    0,90 |
| Bonnes pratiques     |    0,90 |
| SEO                  |    0,90 |

Ces valeurs sont le plancher du système 0.2.0. La QA premium finale demandera
des budgets plus élevés et une médiane mobile de plusieurs exécutions.

## Contrôles manuels toujours nécessaires

- exactitude du contenu et des offres ;
- validation des médias et droits ;
- clavier, zoom 200 %, lecteur d'écran de fumée ;
- cookies et consentement ;
- accès anonyme, client, autre client et administrateur ;
- formulaires, emails, réservations et services externes ;
- revue responsive et visuelle de chaque page finale.
