# Direction artistique proposée

Statut : `ready_for_review` — fondation code-native confirmée par `DEC-011`, système détaillé non approuvé

## Positionnement visuel

OptimalLogic doit paraître précis, calme et structurant : une maison numérique qui transforme des signaux dispersés en contexte, priorité et prochaine action humaine. La perception premium vient d’abord de la typographie, de la grille, des contrastes, des surfaces et de la qualité des interfaces. Le mouvement enrichit ce système sans devenir sa seule qualité visible.

## Concept adapté — Maison des signaux code-native — recommandé

Une architecture noire et ivoire traversée par un signal vert. Des lignes, nœuds, cadres et panneaux d’interface se rassemblent, se qualifient puis franchissent un seuil. Tout élément informatif est construit en HTML sémantique, SVG inline ou CSS : aucun master photographique ou raster généré n’est nécessaire au site.

- Hiérarchie : grands titres éditoriaux, labels compacts, panneaux 7/5 asymétriques et respirations franches.
- Typographie : Space Grotesk pour l’identité et l’utilitaire, Inter pour la lecture, Lora proposée pour quelques déclarations éditoriales.
- Couleurs : noir, blanc et vert existants ; ivoire pour la respiration ; bleu froid très limité au chapitre Startup.
- Interfaces : panneaux illustratifs et états de décision, sans prétendre représenter un produit réel.
- Schémas : flux exacts, libellés issus des contenus approuvés et structure accessible.
- Mouvement : convergence, assemblage de contexte, franchissement de seuil et handoff humain, joués une fois.
- Bénéfice : traduit directement la promesse « signal vers action » sans dépendre d’images génériques.
- Risque : devenir un modèle SaaS abstrait si les libellés, la hiérarchie et les compositions ne restent pas propres à OptimalLogic.

## Grammaire visuelle

1. **Signal** — ligne fine ou point d’entrée représentant une demande ou une information.
2. **Contexte** — panneau qui rassemble les éléments utiles sans simuler une donnée réelle.
3. **Seuil** — changement de surface ou de contraste marquant une décision.
4. **Transmission** — liaison explicite vers une personne ou une prochaine action.
5. **Respiration** — chapitre ivoire qui ralentit la lecture et reformule l’enjeu.

Les lignes, nœuds, surfaces et annotations utilisent les mêmes tokens sur toutes les pages. Une section n’ajoute pas sa propre esthétique ou son propre effet.

## Grille et composition

- Conteneur maximal : 1280 px ; grille 12 colonnes ; gouttières fluides.
- Paragraphes courants : 52–68 caractères par ligne.
- Une composition structurelle maximum par chapitre majeur.
- Panneaux larges avec grands rayons ; éviter la multiplication de cartes petites et identiques.
- Le vert est réservé aux actions prioritaires, états positifs et point de décision.
- Le mobile devient une narration verticale ; les flux sont recomposés, pas recadrés.
- Le rendu sans JavaScript et le mode réduit montrent directement l’état final complet.

## Stratégie des médias

- Photographie décorative : interdite.
- Raster généré : interdit pour les pages du site.
- Photo, capture ou logo authentique : autorisé uniquement comme preuve sourcée et approuvée.
- Interface illustrative : construite en code et explicitement non présentée comme un produit existant.
- Carte sociale : générée avec les API de métadonnées Next.js à partir de la typographie et des formes code-native.
- Les quatre anciens PNG restent historiques, classés `rejected_not_consumed` et interdits d’intégration.

## Identité de mouvement

- `signal-converge` : plusieurs entrées convergent vers un contexte commun.
- `context-assemble` : les informations se rangent en panneaux lisibles.
- `threshold-cross` : une progression franchit un seuil vers l’action suivante.
- `human-handoff` : le contexte, la priorité et l’action passent vers la décision humaine.

Deux séquences fortes maximum par page. Les micro-interactions CSS restent sobres. Aucune boucle décorative permanente, aucun scroll-jacking et aucune information portée uniquement par le mouvement.

## Accessibilité visuelle

Contraste WCAG 2.2 AA, focus visible indépendant du survol, tailles tactiles minimales de 44 px, aucune information portée uniquement par le vert ou le mouvement. Chaque SVG informatif possède un titre ou une description ; les décorations sont ignorées par les technologies d’assistance.

## Options rejetées

- Les trois masters générés et leur dérivé social comme éléments consommés par le site.
- Dashboard SaaS, verre néon et grille de métriques.
- Portrait, logo client, témoignage, résultat ou capture de produit inventés.
- Curseur personnalisé, parallaxe globale, glow permanent et reveal identique sur toutes les sections.
- Copie de la palette bleue Span ou du héros portrait Sevora.

## Validation attendue

La stratégie code-native est confirmée. Restent à valider : usage proposé de Lora, ajout de l’ivoire, accent bleu Startup, grammaire des lignes et panneaux, densité des compositions et intensité des quatre mouvements identitaires.
