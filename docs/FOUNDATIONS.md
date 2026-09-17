# Fondations — huit thèmes

Étape 3, préparée depuis premium au commit 1de025702a63e5abcf98f548bd5618118132f8d9.
Statut : implémenté, validation navigateur en attente.

## Démonstration

Lancer npm ci puis npm run dev. Ouvrir /showroom/foundations (également présenté sur /).
Le sélecteur applique huit thèmes aux mêmes composants.
La connexion du header mène à une explication de démonstration, pas à une authentification.
Le formulaire valide les champs localement et n'envoie aucune donnée.

## Personnalisation

- design-system/tokens.css : échelles communes de tailles, espacements et grilles.
- design-system/themes.css : couleurs sémantiques, typographies, formes, ombres, largeur et rythme par identité.
- design-system/themes.ts : identifiants et noms du sélecteur.
- Pour appliquer une identité à un site, placer data-theme="industrial", par exemple, sur html.
- Aucun composant ne sélectionne de palette par nom de thème.
- Les polices système proposées fonctionnent sans téléchargement ; les fontes de marque peuvent remplacer les familles au niveau du thème.

## Composants

Button distingue lien et bouton, conserve les attributs aria et propose trois tailles,
trois styles, les états disabled et loading.
FormField accepte input, select ou textarea et associe label, aide et erreur.
Checkbox repose sur une case native.
SiteHeader reçoit marque, liens et destination du compte. Le menu mobile se ferme
avec Échap et rend le focus au bouton. Sans JavaScript les liens restent accessibles.
Les primitives existantes assurent les surfaces, colonnes, conteneurs et titres.

## Vérification

- npm run check:static : format, 8 contrats de thème, 112 contrastes >= 4.5:1, lint, TypeScript, build.
- npm run setup:browsers puis npm run check : tests fonctionnels et responsive.
- Les nouveaux tests couvrent 8 thèmes aux largeurs 320, 390, 768 et 1440,
  le menu clavier, les attributs du lien, le formulaire, le mode sans JS et reduced motion.
- Dans l'environnement de préparation, Chromium n'a pas pu être téléchargé
  (expiration réseau). Aucun résultat navigateur ou visuel n'est déclaré PASS.
- La CI déclenchera aussi les contrôles lors des futurs pushes sur premium.

## Périmètre

Pas de nouvelle dépendance, de migration, d'authentification serveur ni de 3D.
Les 22 blocs initiaux restent disponibles sur `/showroom`. Les 38 compositions
publiques prioritaires sont visibles sur `/showroom/compositions` et quatre
layouts complets sur `/showroom/layouts`.
Les cinq SVG de démarrage Next/Vercel inutilisés ont été retirés ; ils restent
récupérables dans le commit de référence.
Le catalogue illustré des références de l'étape 2 reste à produire.
