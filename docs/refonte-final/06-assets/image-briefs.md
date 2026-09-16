# Décision relative aux images et briefs code-native

Statut : `ready_for_review`

## Décision

Aucune image photographique ou générée n’est requise pour les pages de la refonte. Les quatre PNG déjà produits sont conservés uniquement comme historique et portent le statut `rejected_not_consumed` dans le manifeste.

La perception premium repose sur :

- typographie expressive et changements d’échelle maîtrisés ;
- panneaux d’interface illustratifs construits en HTML ;
- diagrammes sémantiques construits en SVG inline ;
- surfaces, lignes, nœuds, annotations et textures CSS ;
- quatre mouvements identitaires appliqués à des états statiques complets.

## Règles communes aux actifs code-native

- Les libellés proviennent de `04-content/page-content.yaml` ou `seo-content.yaml`.
- Aucun chiffre, client, résultat, statut temps réel ou fonctionnalité non sourcée.
- Une interface illustrative doit être reconnaissable comme explication, pas comme capture produit.
- L’ordre DOM suit l’ordre de lecture ; le SVG ne remplace pas le texte principal.
- Chaque visuel informatif possède un nom accessible et une description courte.
- Sur mobile, les flux sont recomposés verticalement.
- Sans JavaScript ou en mouvement réduit, l’état final est immédiatement visible.

## Familles de composition

### Convergence de signaux

Utilisée dans le héros et les canaux de services. Plusieurs lignes partent de points distincts, rejoignent un panneau de contexte puis une prochaine action. Le vert ne colore que la trajectoire active ou le seuil final.

### Assemblage de contexte

Utilisé pour la présence, le système et la qualification. Des panneaux déjà lisibles sont réordonnés visuellement lors de l’animation ; aucun contenu n’apparaît uniquement après hydratation.

### Cartes d’audience

Commerce, TPE/PME et Startup conservent leurs propres libellés et une structure commune. Le bleu Startup reste un accent local, jamais une seconde couleur d’action globale.

### Seuil et handoff humain

Le seuil marque le passage d’une demande brute à un échange contextualisé. Le handoff place toujours la décision humaine au dernier état, sans faire croire à une décision automatique.

### Carte sociale

`app/opengraph-image.tsx` ou l’équivalent Next.js produit une composition fixe 1200 × 630 à partir du logo, du titre approuvé et du motif de convergence. Aucun ancien PNG n’est réutilisé.

## Médias authentiques futurs

Une photo d’équipe, une réalisation, un logo client ou une capture réelle pourra être ajoutée plus tard uniquement si elle constitue une preuve sourcée, si les droits sont confirmés et si la composition de la page est à nouveau validée. Aucun emplacement n’est réservé en leur absence.
