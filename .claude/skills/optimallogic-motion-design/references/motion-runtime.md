# Contrat d’implémentation du mouvement

## Architecture

- Garder `page.tsx`, les layouts et les sections éditoriales côté serveur.
- Introduire un Client Component uniquement autour de la séquence ou interaction animée.
- Le contenu essentiel doit être présent dans le HTML et rester lisible sans JavaScript.
- Une animation d’entrée ne doit jamais être la seule manière de révéler un CTA ou une preuve.

## Choix du moteur

- Utiliser CSS pour `hover`, `focus`, transitions de couleur, opacité simple et déplacements
  courts sans orchestration.
- Utiliser le paquet `motion` pour les séquences coordonnées, SVG, changements d’état,
  présence/sortie et interactions qui nécessitent interruption ou réduction du mouvement.
- Ne pas ajouter GSAP, moteur de smooth-scroll, WebGL ou seconde bibliothèque de mouvement
  sans un besoin observable que CSS et Motion ne couvrent pas.

## Presets et traçabilité

Chaque consommateur reçoit ou expose un identifiant sémantique provenant de
`motion-spec.yaml`. Les composants ne choisissent pas des durées arbitraires. Le rapport
d’implémentation contient au minimum :

| Page | Section | Preset | Composant | Repli réduit |
| --- | --- | --- | --- | --- |

Un preset présent uniquement dans la documentation est `unimplemented`. Une animation de
code sans entrée dans `page-motion-map.yaml` est `unmapped`.

## Vérifications observables

- inspecter les imports et consommateurs de `components/motion` et `motion/react` ;
- confirmer que les moments `strong` existent sur les sections prévues et n’excèdent pas le
  budget ;
- vérifier le rendu à 320, 390, 768, 1024 et 1440 px ;
- activer `prefers-reduced-motion: reduce` et confirmer l’absence de translation, boucle,
  parallaxe et tracé progressif ;
- tester sans JavaScript que tous les contenus, liens et formulaires restent disponibles ;
- mesurer qu’aucune animation ne crée de CLS ni d’écouteur de scroll global permanent.
