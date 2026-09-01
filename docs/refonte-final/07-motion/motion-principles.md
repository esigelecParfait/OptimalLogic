# Principes de mouvement

Statut : `ready_for_review`

Le mouvement explique le passage de plusieurs signaux à une décision humaine. Il ne sert pas à maintenir artificiellement l'attention.

## Règles

1. Deux séquences fortes maximum par page ; le reste utilise des transitions d'état courtes.
2. Le contenu essentiel est visible avant hydratation et utilisable sans JavaScript.
3. Privilégier `opacity`, `transform` et `stroke-dashoffset` ; éviter les mesures de layout en boucle.
4. Une révélation au scroll se joue une fois.
5. Un stagger contient cinq éléments maximum et moins de 60 ms entre eux.
6. Les flux ne bouclent pas et ne simulent pas une activité temps réel.
7. Sur pointeur grossier, supprimer les comportements dépendants du survol.
8. `prefers-reduced-motion: reduce` affiche immédiatement l'état final.

## Hiérarchie

- Narratif : convergence du héros ou progression d'un flux, 420–700 ms.
- Structurel : entrée d'un panneau ou changement de chapitre, 260–420 ms.
- Interface : bouton, onglet, accordéon, champ et créneau, 120–260 ms.
- Asynchrone : skeleton statique ou transition unique ; aucune pulsation permanente.

## Interdits

Smooth scroll global, curseur personnalisé, scroll-jacking, parallaxe systématique, autoplay, ticker automatique, compteur inventé, zoom média permanent et contenu masqué en attente de JavaScript.
