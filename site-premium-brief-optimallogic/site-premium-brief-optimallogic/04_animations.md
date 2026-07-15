# 04 — Animations & Interactions

## Intensité générale souhaitée

Subtile, élégante, premium.

Le site doit paraître moderne, mais pas “site démo d’animation”. Les animations doivent renforcer la clarté et la confiance, pas distraire le visiteur.

Intensité : **6/10**.

## Au chargement de la page

Pas d’écran de chargement lourd.

Animation recommandée :
- apparition douce du header ;
- badge du hero qui apparaît en premier ;
- titre qui monte légèrement avec un fondu ;
- CTA qui apparaissent ensuite ;
- dashboard à droite qui se révèle avec un léger décalage.

Durée totale : 700 à 1000 ms maximum.

## Au scroll

Effets recommandés :

- Apparition progressive des sections avec `fade + translateY`.
- Les cartes de problèmes apparaissent une par une.
- Les chiffres du dashboard peuvent compter de manière subtile.
- Les mockups Google Business et site web peuvent avoir un léger parallax vertical.
- Les sections importantes peuvent avoir une transition de fond très douce entre crème clair et blanc cassé.

Rythme : fluide, calme, maîtrisé.

## Éléments 3D

Ne pas intégrer de grosse scène 3D spectaculaire.

Éléments acceptés :
- cartes inclinées très légèrement ;
- mockup téléphone avec perspective douce ;
- dashboard en profondeur légère ;
- ombres réalistes ;
- effet de couche entre fiche Google, site web et dashboard.

Objectif : montrer un système digital complet, pas impressionner avec de la 3D gratuite.

## Hero

Le hero doit garder le message existant, mais peut être rendu plus premium avec :

- à gauche : texte, sous-titre, CTA ;
- à droite : composition visuelle en couches : fiche Google Business mobile + mini site web + dashboard prospects ;
- en arrière-plan : formes très douces ou grille discrète ;
- micro-animation : les cartes flottent très légèrement.

## Au survol

### Cartes services
- élévation légère ;
- bordure un peu plus visible ;
- icône qui se déplace de 2 à 4 px ;
- fond qui devient légèrement plus clair.

### Boutons
- bouton principal noir : léger effet magnétique ou déplacement de la flèche ;
- bouton secondaire : soulignement ou bordure plus marquée.

### Offres tarifaires
- carte survolée légèrement mise en avant ;
- CTA plus contrasté ;
- pas d’animation agressive.

## Curseur personnalisé

Optionnel.

Si utilisé :
- halo très discret ;
- uniquement desktop ;
- désactivé mobile ;
- ne doit pas gêner la lecture.

## Transitions entre sections

Transitions douces :
- fondu ;
- glissement vertical ;
- léger changement de contraste ;
- pas d’effet rideau lourd.

## Style de mouvement

Easing recommandé :
- fluide ;
- organique ;
- premium ;
- sans rebond excessif.

Exemples :
- `easeOutCubic`
- `easeOutQuart`
- ressort très léger uniquement pour les micro-interactions.

## Accessibilité

Obligatoire :
- respecter `prefers-reduced-motion` ;
- pas d’animation indispensable à la compréhension ;
- contrastes suffisants ;
- navigation clavier ;
- formulaires lisibles ;
- boutons visibles ;
- focus states propres.
