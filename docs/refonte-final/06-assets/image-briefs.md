# Briefs des images finales

Statut : `ready_for_review`

## Ligne visuelle commune

Les trois masters utilisent une architecture noire, une matière ivoire et un signal vert limité. Ils soutiennent la narration sans simuler de produit. Aucun texte, écran, chiffre, logo client ou portrait n'est intégré.

## Accueil — `asset-home-signal-hero`

- Rôle : matérialiser la convergence de plusieurs demandes vers une prochaine action.
- Lecture : lignes dispersées → convergence → seuil vert → passage ivoire.
- Cadrage : point focal au centre droit ; le crop mobile conserve la convergence.
- Interdit : dashboard, graphiques ou boutons.

## Services — `asset-services-context`

- Rôle : illustrer le passage d'informations hétérogènes à trois trajectoires organisées.
- Lecture : fragments à gauche → jonction → trois voies calmes à droite.
- Cadrage : le crop mobile doit montrer une partie du désordre et la jonction.
- Interdit : dossiers, icônes de canaux ou libellés rasterisés.

## Contact — `asset-contact-threshold`

- Rôle : présenter le contact comme un seuil simple vers un échange utile.
- Lecture : espace sombre → ligne verte → ouverture ivoire.
- Cadrage : conserver le seuil et la courbe verte sur mobile.
- Interdit : portrait, téléphone, bulle de chat ou fausse disponibilité.

## Réseaux sociaux

`asset-social-card` est un recadrage 1200 × 630 du master d'accueil. Aucun texte n'est aplati dans l'image ; titre et description restent pilotés par les métadonnées Next.js.

## Passage au web

Les PNG sont les masters de travail. Codex produira AVIF/WebP, réservera les ratios pour prévenir le CLS, utilisera `next/image`, renseignera `sizes` et ne placera `priority` que sur le média LCP de l'accueil.
