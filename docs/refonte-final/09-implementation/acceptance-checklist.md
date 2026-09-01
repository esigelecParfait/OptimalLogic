# Checklist d'acceptation future

Statut : `ready_for_review`

- [ ] Les livrables ont une approbation utilisateur explicite.
- [ ] La reconstruction part de la référence saine et respecte le périmètre protégé.
- [ ] Les six routes publiques consomment leurs contenus, médias et compositions.
- [ ] Les cinq codes sont exacts ; `commerce_premium` est absent du catalogue public.
- [ ] `nom_offre`, `prix` et `prix_abonnement` viennent de Supabase sans fallback.
- [ ] L'accompagnement mensuel est facultatif.
- [ ] Aucun dashboard public ; support et compte privés restent fonctionnels.
- [ ] Aucun texte ou média ne présente une preuve ou une intégration non sourcée.
- [ ] Les trois masters et sept schémas code-native sont consommés.
- [ ] Les pages restent serveur sauf les îlots explicitement listés.
- [ ] Le mouvement respecte le budget et devient immédiat en mode réduit.
- [ ] Les parcours privés et intégrations passent leurs tests de régression.
- [ ] Métadonnées, robots, sitemap et image OG utilisent les API natives Next.js.
- [ ] Tests statiques, unitaires, Playwright, responsive, accessibilité et Lighthouse sont verts.
- [ ] Aucune fusion dans `main` ni aucun déploiement sans autorisation.
