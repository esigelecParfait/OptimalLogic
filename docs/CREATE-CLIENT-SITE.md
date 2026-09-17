# Créer un dépôt client depuis le modèle

## Résultat attendu

Chaque client possède un dépôt GitHub privé indépendant. Le dépôt client reçoit
la structure technique du modèle, puis son propre `site-spec.yaml`, son thème,
ses pages, ses médias, ses modules backend et son historique Git.

Un dépôt créé depuis un modèle n'est pas un fork. Son historique est séparé et
les mises à jour futures du modèle ne s'y appliquent pas automatiquement.

## Préconditions

Avant de créer un client :

- la version validée du modèle doit être présente sur sa branche par défaut
  `main` ;
- le dépôt `esigelecParfait/optimallogic-site-template` doit rester privé ;
- l'option GitHub `Template repository` doit être activée dans
  `Settings > General` ;
- le `site-spec.yaml` du client doit être validé ;
- le nom, le propriétaire et les personnes autorisées du dépôt doivent être
  connus.

Le nom du dépôt ne suffit pas à en faire un modèle : l'option GitHub doit être
activée explicitement par une personne disposant des droits d'administration.

Documentation officielle :

- [Créer un modèle de dépôt](https://docs.github.com/fr/repositories/creating-and-managing-repositories/creating-a-template-repository)
- [Créer un dépôt à partir d'un modèle](https://docs.github.com/fr/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

## Méthode recommandée dans l'interface GitHub

1. Ouvrir `esigelecParfait/optimallogic-site-template`.
2. Vérifier que la branche affichée est `main` et que la version attendue y est
   bien fusionnée.
3. Cliquer sur `Use this template` puis `Create a new repository`.
4. Choisir le propriétaire du nouveau dépôt.
5. Nommer le dépôt avec un identifiant stable, par exemple
   `client-nom-commerce-site`.
6. Choisir la visibilité `Private`.
7. Ne pas sélectionner `Include all branches` : un client doit recevoir la
   version stable de `main`, pas les branches de travail du modèle.
8. Cliquer sur `Create repository from template`.
9. Dans les paramètres du nouveau dépôt, vérifier les collaborateurs et retirer
   tout accès qui n'est pas nécessaire au projet.

## Alternative avec GitHub CLI

La commande officielle `gh repo create` accepte `--template`, `--private` et
`--clone` :

```powershell
# Crée un dépôt privé à partir du modèle puis le clone sur l'ordinateur.
# Remplacer client-nom-commerce-site par le vrai nom du dépôt.
gh repo create esigelecParfait/client-nom-commerce-site `
  --private `
  --template esigelecParfait/optimallogic-site-template `
  --clone
```

Sous Bash, utiliser `\` à la place de l'accent grave PowerShell pour continuer
une commande sur la ligne suivante.

Référence : [manuel `gh repo create`](https://cli.github.com/manual/gh_repo_create).

## Initialiser le travail local

```powershell
# Entre dans le dépôt qui vient d'être cloné.
cd client-nom-commerce-site

# Vérifie que origin pointe vers le dépôt privé du client.
git remote -v

# Crée une branche de travail ; main reste la référence stable.
git switch -c feat/client-foundation

# Installe exactement les dépendances verrouillées par package-lock.json.
npm install

# Installe Chromium une seule fois sur cet ordinateur.
npm run setup:browsers

# Vérifie que le modèle fonctionne avant toute personnalisation.
npm run check
```

Si le contrôle initial échoue, corriger ou signaler le problème avant d'ajouter
du code client. Cette étape distingue une erreur du modèle d'une erreur de
personnalisation.

## Ajouter la source de vérité du client

Placer le fichier validé à la racine :

```text
client-nom-commerce-site/
├── site-spec.yaml             # Brief exécutable et validé du client.
├── app/                       # Pages propres au client.
├── components/                # Fondations héritées et extensions justifiées.
├── design-system/             # Thème de la marque.
└── docs/                      # Décisions et livraison du client.
```

Le fichier doit être relu avant son commit afin d'éviter les données sensibles,
secrets, mots de passe ou informations personnelles inutiles.

```powershell
# Affiche précisément les fichiers qui seront suivis par Git.
git status

# Ajoute uniquement le site-spec validé.
git add site-spec.yaml

# Enregistre la fondation fonctionnelle du projet client.
git commit -m "docs: ajouter le site-spec validé du client"
```

## Ordre de personnalisation

### 1. Identité du dépôt

Modifier :

- le nom et la description dans `package.json` et `README.md` ;
- `title`, `description` et la langue dans `app/layout.tsx` ;
- le favicon et les métadonnées finales ;
- les informations de provenance de la version du modèle dans le dossier de
  livraison.

### 2. Thème

Traduire la direction artistique validée dans
`design-system/tokens.css`. Suivre [`TOKENS.md`](TOKENS.md) et vérifier toutes
les variantes dans le showroom.

### 3. Pages et blocs

Pour chaque page définie dans le `site-spec` :

1. identifier son objectif et son action principale ;
2. choisir une seule variante de Hero ;
3. sélectionner seulement les blocs nécessaires au parcours ;
4. transmettre les contenus validés par les propriétés TypeScript ;
5. vérifier la hiérarchie `h1`, `h2`, `h3` ;
6. intégrer uniquement des médias autorisés ;
7. vérifier tous les liens et destinations.

Consulter [`ARCHITECTURE.md`](ARCHITECTURE.md) et [`BLOCKS.md`](BLOCKS.md).

### 4. Backend

Installer uniquement les modules demandés par le `site-spec`. Chaque module doit
inclure ses routes serveur, variables d'environnement documentées, migrations,
politiques Supabase RLS, gestion des erreurs et tests.

Les secrets vont dans `.env.local` ou dans le gestionnaire d'environnement de
l'hébergeur. Ils ne sont jamais écrits dans le code, le `site-spec`,
`.env.example` ou l'historique Git. `.env.example` contient uniquement les noms
des variables et des valeurs factices non sensibles.

### 5. Nettoyage du dépôt client

Avant livraison :

- remplacer la page de démonstration initiale ;
- supprimer ou protéger `/showroom` ;
- retirer les placeholders et médias non fournis ;
- supprimer les blocs, fichiers et dépendances réellement inutiles seulement si
  cette réduction reste maintenable ;
- vérifier qu'aucune preuve fictive n'est présentée comme réelle.

## Contrôles avant chaque commit important

```powershell
# Vérifie le format et les règles ESLint.
npm run lint

# Vérifie les contrats TypeScript sans produire de build.
npm run typecheck

# Exécute les deux contrôles précédents puis le build de production.
npm run check:static

# Ajoute les tests fonctionnels et les quatre largeurs responsives.
npm run check

# Ajoute les budgets Lighthouse avant une livraison.
npm run check:all
```

Compléter ces contrôles par une vérification manuelle :

- 320, 768, 1024 et 1440 px ;
- navigation au clavier et focus visible ;
- contrastes et réduction des mouvements ;
- métadonnées, SEO et liens ;
- formulaires, emails et permissions backend ;
- absence de secrets et de données fictives.

## Conserver l'indépendance du client

Le dépôt client ne doit pas utiliser le dépôt modèle comme `origin`. La commande
`git remote -v` doit afficher uniquement le dépôt privé du client pour `fetch`
et `push`.

Lorsqu'une nouvelle version du modèle est publiée :

1. lire `CHANGELOG.md` dans le modèle ;
2. identifier les changements utiles au client ;
3. les reporter dans une branche dédiée du dépôt client ;
4. tester les éventuelles incompatibilités ;
5. fusionner seulement après revue.

Cette mise à jour est volontaire. Elle ne doit pas écraser la direction
artistique, les pages ou les modules backend propres au client.

## Critère de fin de création

Le dépôt client est correctement initialisé lorsque :

- il est privé et possède son propre `origin` ;
- son `site-spec.yaml` validé est présent ;
- sa version d'origine du modèle est identifiable ;
- `npm run check` réussit avant personnalisation ;
- les accès GitHub sont limités aux personnes nécessaires ;
- une branche de travail distincte de `main` existe.
