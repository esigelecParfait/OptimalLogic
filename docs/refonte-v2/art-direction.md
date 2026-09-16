# Direction artistique proposée — OptimalLogic V2

Statut : `proposed`
Révision : `2026-08-29.1`

## Concept retenu : Signal House

OptimalLogic devient la « maison de contrôle » des demandes entrantes : une
présence digitale visible à l'extérieur et, à l'intérieur, un système calme qui
capte les signaux, les qualifie et rend la prochaine action évidente.

Le site ne doit pas ressembler à un SaaS standard ni à une agence décorative.
Sa silhouette combine une édition noire et ivoire très typographique avec des
vues opérationnelles abstraites : lignes de routage, états, cartes de flux et
moments d'accent vert numérique. La technologie est montrée comme une
infrastructure fiable, pas comme un spectacle futuriste.

## Principes visuels

1. **Contraste éditorial** — grands titres condensés, corps lisible, beaucoup
   d'espace négatif et sections denses uniquement lorsqu'elles matérialisent un
   workflow.
2. **Accent rare** — le vert signale l'action, la donnée active ou un passage
   du flux. Il n'est jamais un fond universel.
3. **Profondeur calme** — surfaces graphite, lignes très fines, halo local et
   grain léger ; pas d'empilement permanent de cartes vitrées.
4. **Preuve avant décor** — une vraie capture produit ou une donnée sourcée
   remplace toujours une illustration quand elle devient disponible.
5. **Mobile recomposé** — le flux horizontal devient une chronologie ; les
   tableaux deviennent des cartes avec statut et prochaine action.

## Typographie

- Display : `Space Grotesk` ou équivalent géométrique licencié, graisses 500–600.
- Texte : `Inter` ou équivalent très lisible, graisses 400–600.
- Données : monospace réservé aux identifiants, états et petits labels.
- H1 : 56–112 px fluide sur desktop, 42–58 px sur mobile, largeur 10–13 mots
  visibles maximum avant retour.

## Palette

- canvas : noir `#080A09` ;
- surface : graphite `#111411` ;
- texte : ivoire `#F5F3EA` ;
- texte secondaire : sauge grise `#A7AEA5` ;
- accent : vert signal `#67F2A0` ;
- accent profond : `#123D29` ;
- alerte : ambre doux `#F2B66D`.

## Grille et composition

- grille desktop 12 colonnes, gouttière 24–32 px, largeur 1440 px max ;
- marge mobile 20 px ;
- sections 96–160 px desktop, 64–96 px mobile ;
- alternance de grandes respirations éditoriales et de panneaux opérationnels ;
- coins 12–24 px : contrôles plus serrés, panneaux plus généreux ;
- lignes de séparation utilisées pour le rythme, ombres réservées aux éléments
  réellement surélevés.

## Signature média

Les visuels générés utilisent une architecture abstraite sombre : volumes noirs
mat, fibres lumineuses vertes, points de signal ivoire, profondeur maîtrisée et
grande zone négative pour le texte. Aucun visage, logo tiers, chiffre lisible,
capture fictive ou texte généré n'est autorisé.

## Signature de mouvement

- le premier écran est visible au rendu serveur ;
- le flux principal peut se tracer une seule fois après l'introduction ;
- les sections éditoriales montent de 8–20 px avec fondu ;
- les états interactifs répondent en moins de 240 ms ;
- le mode réduit garde tous les contenus et supprime tracés, translations et
  boucles ;
- deux moments de mouvement fort maximum par page.

## Anti-patterns

- dégradé violet/bleu générique et fausses nébuleuses IA ;
- curseur personnalisé sur mobile ou au clavier ;
- animations de toutes les cartes au même rythme ;
- dashboards générés par image avec données supposées réelles ;
- slogans vagues sur l'innovation sans action observable ;
- pages tarifaires codées en dur dans un composant de présentation.

## Validation requise

Cette direction peut alimenter le frontend en statut `proposed`. La sélection
des trois visuels de concept, la variante finale du logo et les capacités IA
publiables doivent être validées humainement avant production.
