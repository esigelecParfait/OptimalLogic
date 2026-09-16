# Checklist QA mouvement

- [ ] Le HTML essentiel est visible avant hydratation.
- [ ] Les titres, formulaires et CTA restent utilisables sans JavaScript.
- [ ] `prefers-reduced-motion: reduce` supprime translations, masques, tracés et boucles.
- [ ] Le mode réduit conserve focus, validation et messages d'état.
- [ ] Aucun mouvement lié au survol n'est requis sur tactile ou pointeur grossier.
- [ ] Deux moments forts maximum sont visibles sur chaque page.
- [ ] Une séquence contient six éléments maximum et moins de 420 ms de délai cumulé.
- [ ] Les observateurs se déconnectent après une animation `once`.
- [ ] Aucune animation ne modifie la géométrie et ne crée de CLS observable.
- [ ] Retour arrière, changement de route et restauration du focus sont cohérents.
- [ ] Les formulaires n'attendent jamais la fin d'une animation pour annoncer un état.
- [ ] Les tests responsive passent à 320, 390, 768, 1024 et 1440 px.
- [ ] La fluidité est vérifiée sur un appareil mobile réel ou représentatif.
- [ ] Les animations de médias s'arrêtent hors écran.
- [ ] Une capture vidéo ou preuve de revue humaine est ajoutée avant validation `approved`.
