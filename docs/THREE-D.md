# Système 3D

Le showroom `/showroom/3d` rassemble 18 variantes : six perspectives CSS, six panneaux HTML/CSS en profondeur et six scènes WebGL. Les variantes restent pilotées par les huit thèmes sans dupliquer les composants.

## Choisir le bon niveau

- `perspective` : héros, cartes et détails visuels légers. À privilégier par défaut.
- `depth` : interfaces, espaces clients, processus et galeries contenant du vrai contenu HTML.
- `webgl` : une scène forte au maximum par page, uniquement lorsqu’elle apporte une représentation impossible à obtenir clairement en CSS.

Chaque identifiant est défini dans `design-system/three-d.ts`. `ThreeDStage` expose la même API pour les trois familles.

## Garanties

- WebGL est isolé par import dynamique sans rendu serveur.
- Le DPR est plafonné entre 1 et 1,5.
- Une scène en pause utilise `frameloop="demand"`.
- Le système détecte l’indisponibilité de WebGL.
- `prefers-reduced-motion` et le contrôle du showroom affichent un diagramme statique complet.
- Aucun modèle 3D externe, texture lourde ou post-traitement n’est requis.

## Mesures

Exécuter `npm run check:3d`, les tests Playwright responsive et `npm run test:performance`. La page publique d’accueil reste la cible Lighthouse : le code Three.js ne doit jamais entrer dans son chargement initial tant qu’un bloc WebGL n’y est pas explicitement sélectionné.
