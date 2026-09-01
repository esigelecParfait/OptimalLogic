# Principes de mouvement

Statut : `ready_for_review`

Le mouvement constitue un langage propre à OptimalLogic : il montre comment un signal devient contexte, priorité, transmission puis décision humaine. Il ne remplace ni la direction artistique statique ni le contenu.

## Identité de mouvement

1. **Convergence** — plusieurs entrées rejoignent un contexte commun.
2. **Assemblage** — les informations se structurent en panneaux lisibles.
3. **Seuil** — une trajectoire franchit une frontière vers l’action suivante.
4. **Handoff humain** — le contexte préparé rejoint clairement la personne qui décide.

Ces quatre comportements sont réservés aux diagrammes et interfaces déclarés dans `06-assets/asset-manifest.yaml`. Les autres transitions restent utilitaires et discrètes.

## Règles

1. Deux séquences fortes maximum par page ; le reste utilise des transitions d’état courtes ou aucun mouvement.
2. L’état final complet est rendu avant hydratation et reste lisible sans JavaScript.
3. Privilégier `opacity`, `transform` et `stroke-dashoffset` ; éviter les mesures de layout en boucle.
4. Une séquence liée au scroll se joue une fois.
5. Un stagger contient cinq éléments maximum et moins de 60 ms entre eux.
6. Les flux ne bouclent pas et ne simulent pas une activité temps réel.
7. Sur pointeur grossier, supprimer les comportements dépendants du survol.
8. `prefers-reduced-motion: reduce` affiche immédiatement l’état final.
9. Un reveal générique ne peut pas devenir l’identité commune de toutes les sections.
10. Aucun mouvement ne change le sens, l’ordre ou la valeur des données affichées.

## Hiérarchie

- Identitaire : convergence, assemblage, seuil ou handoff, 420–700 ms.
- Structurel : apparition sobre d’une composition, 260–420 ms.
- Interface : bouton, onglet, accordéon, champ et créneau, 120–260 ms.
- Asynchrone : transition unique d’état ; aucune pulsation ou simulation permanente.

## Interdits

Smooth scroll global, curseur personnalisé, scroll-jacking, parallaxe systématique, autoplay, ticker automatique, compteur inventé, zoom média permanent, animation de texte caractère par caractère et contenu masqué en attente de JavaScript.
