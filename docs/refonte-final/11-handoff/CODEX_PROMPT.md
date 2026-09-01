# Prompt Codex

**STATUT : `BLOCKED_NOT_FOR_EXECUTION`**

Ce fichier n'est pas encore le prompt que l'utilisateur doit donner à Codex. Il est volontairement bloqué parce que les livrables portent le statut `ready_for_review` et que plusieurs décisions attendent une validation humaine.

## Conditions de déblocage

1. Le site-spec, les contenus, le concept, les tokens, les compositions, les images, le motion, les frontières backend et les dépendances sont explicitement approuvés.
2. Les décisions O-002, O-005, O-006 et O-007 sont closes ou assorties d'une règle validée.
3. Le manifeste de handoff est recalculé sur la révision finale approuvée.
4. La skill `optimallogic-codex-handoff` est réexécutée.

Après ces validations, ce fichier sera remplacé par un prompt complet contenant la branche de départ, l'ordre des lots, les fichiers à lire, le périmètre protégé, les tests, les preuves attendues et les interdictions de push, fusion ou déploiement non autorisés.
