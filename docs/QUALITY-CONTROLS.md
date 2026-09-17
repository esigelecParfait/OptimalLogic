# Contrôles automatiques de qualité

## Objectif

Cette architecture transforme chaque modification en une suite de vérifications
reproductibles. Une modification n'est considérée comme livrable que si toutes
les étapes obligatoires réussissent.

```text
formatage
  → ESLint
    → TypeScript
      → build Next.js
        → tests fonctionnels sur Chromium, Firefox et WebKit
          → responsive à six profils
            → WCAG, zoom et mouvement réduit
              → budgets Lighthouse mobiles
```

Les mêmes commandes sont exécutées sur l'ordinateur du développeur et dans
GitHub Actions. Cela limite les situations où « le site fonctionne chez moi »
mais échoue dans un environnement propre.

## Utilité et résultat de chaque fichier

| Fichier                                        | Utilité                                                     | Ce qu'il produit ou renvoie                                                  |
| ---------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `.prettierrc.json`                             | Définit les règles de présentation du code                  | Une configuration lue par Prettier ; aucun HTML                              |
| `.prettierignore`                              | Exclut dépendances, builds, rapports et fichiers générés    | Une liste de chemins ignorés                                                 |
| `playwright.config.ts`                         | Définit le serveur, trois moteurs et six profils responsive | Une configuration Playwright exécutée par les tests                          |
| `tests/functional/showroom.spec.ts`            | Vérifie les routes, les 22 variantes, la FAQ et les actions | Des résultats PASS/FAIL et des traces en cas d'échec                         |
| `tests/responsive/showroom-responsive.spec.ts` | Cherche les débordements à 320, 768, 1024 et 1440 px        | Un diagnostic contenant les éléments qui sortent de l'écran                  |
| `lighthouserc.json`                            | Définit les seuils de performance et de qualité             | Un rapport Lighthouse local dans `.lighthouseci/`                            |
| `scripts/run-lighthouse.mjs`                   | Lance Lighthouse avec le Chromium installé par Playwright   | Le même code de sortie que Lighthouse : `0` si succès, autre valeur si échec |
| `.github/workflows/quality.yml`                | Rejoue la chaîne dans un environnement GitHub propre        | Un contrôle « Quality gate » et des rapports téléchargeables                 |
| `package.json`                                 | Fournit les commandes communes                              | Des scripts npm utilisables localement et en CI                              |

## Installation locale

Après un clone ou un changement de dépendances :

```powershell
# Installe exactement les versions verrouillées dans package-lock.json.
npm install

# Installe Chromium une seule fois sur cet ordinateur.
npm run setup:browsers
```

GitHub Actions utilise `npm ci`, qui refuse un `package-lock.json` incohérent.

## Commandes disponibles

### Corriger le formatage

```powershell
# Réécrit les fichiers suivis par Prettier selon la configuration commune.
npm run format
```

Cette commande modifie les fichiers. Il faut ensuite relire le diff Git.

### Vérifier le formatage sans écrire

```powershell
npm run format:check
```

Cette commande renvoie un code d'échec si un fichier n'est pas correctement
formaté.

### Contrôles statiques et build

```powershell
# Formatage, ESLint, TypeScript puis build de production.
npm run check:static
```

### Tests fonctionnels

```powershell
# Nécessite un build existant ; npm run check s'en charge automatiquement.
npm run test:functional
```

Les scénarios actuels vérifient :

- réponse HTTP de `/` et `/showroom` ;
- présence et ordre des 22 variantes ;
- directive `noindex` du showroom ;
- ouverture d'une FAQ au clavier ;
- présence d'un vrai lien pour l'action principale.

### Tests responsive

```powershell
npm run test:responsive
```

Playwright rejoue les scénarios responsive aux largeurs suivantes :

| Projet         |       Viewport |
| -------------- | -------------: |
| `mobile-320`   |   320 × 900 px |
| `tablet-768`   |  768 × 1024 px |
| `desktop-1024` |  1024 × 900 px |
| `wide-1440`    | 1440 × 1000 px |

Les tests bloquent un débordement horizontal et listent les premiers éléments
visibles placés hors écran.

### Contrôle obligatoire courant

```powershell
# Formatage → lint → types → build → fonctionnel → responsive.
npm run check
```

### Contrôle complet avec performance

```powershell
# Ajoute Lighthouse à toute la chaîne obligatoire.
npm run check:all
```

## Budgets Lighthouse initiaux

La page d'accueil doit atteindre au minimum :

| Catégorie        | Score bloquant |
| ---------------- | -------------: |
| Performance      |           0,90 |
| Accessibilité    |           0,95 |
| Bonnes pratiques |           0,95 |
| SEO              |           0,95 |

Ces seuils sont un plancher technique du modèle. Un projet client peut imposer
des objectifs plus élevés dans son `site-spec`, mais ne doit pas les réduire
silencieusement pour faire passer une livraison.

Lighthouse reste une simulation de laboratoire. Après déploiement, les mesures
réelles des utilisateurs et les Core Web Vitals doivent compléter ce contrôle.

## Fonctionnement de GitHub Actions

Le workflow est déclenché :

- à chaque pull request ;
- à chaque push sur `main` ;
- à chaque push sur une branche `feat/**`.

GitHub crée un ordinateur Linux temporaire, installe Node.js 24, les dépendances
et Chromium, puis exécute chaque étape séparément. Cette séparation permet
d'identifier immédiatement la catégorie de l'erreur.

Les rapports Playwright et Lighthouse sont conservés comme artefacts pendant
sept jours. Ils ne sont pas envoyés vers un stockage public externe.

## Lire un échec

| Étape rouge                      | Signification probable                     | Première action                              |
| -------------------------------- | ------------------------------------------ | -------------------------------------------- |
| `Check formatting`               | Présentation incohérente                   | Lancer `npm run format`, puis relire le diff |
| `Run ESLint`                     | Mauvaise pratique ou erreur React/Next.js  | Lire le fichier et la règle affichés         |
| `Check TypeScript`               | Propriété ou type incompatible             | Corriger le contrat ou la donnée transmise   |
| `Build production site`          | Next.js ne peut pas produire le site       | Lire la première erreur de compilation       |
| `Run functional browser tests`   | Un parcours ou un élément attendu a changé | Ouvrir le rapport Playwright                 |
| `Run responsive tests`           | Débordement ou élément hors viewport       | Utiliser le projet et l'élément indiqués     |
| `Run Lighthouse quality budgets` | Score inférieur au plancher                | Ouvrir le rapport dans `.lighthouseci/`      |

## Ajouter un nouveau contrôle

Lorsqu'une fonctionnalité est ajoutée :

1. ajouter un scénario fonctionnel représentant le besoin client ;
2. ajouter un scénario responsive si sa composition est nouvelle ;
3. commenter l'intention du test, pas chaque mot de syntaxe ;
4. reproduire l'échec avant de corriger le code ;
5. vérifier que le test échoue réellement lorsque le comportement est cassé ;
6. exécuter `npm run check:all` ;
7. documenter le changement dans `CHANGELOG.md`.

## Dernière protection à activer sur GitHub

Le workflow exécute les contrôles, mais il ne bloque une fusion que si la règle
de protection de `main` exige leur réussite. Après la première exécution verte,
activer dans les paramètres GitHub une règle de branche ou un ruleset exigeant
le statut `Format, code, browser and performance` avant fusion.
