# Prompt Codex

**STATUT : `BLOCKED_NOT_FOR_EXECUTION`**

Ce fichier n'est pas encore le prompt que l'utilisateur doit donner à Codex. Il est volontairement bloqué parce que les livrables portent le statut `ready_for_review` et que plusieurs décisions attendent une validation humaine.

## Conditions de déblocage

1. Le site-spec, les contenus, le concept, les tokens, les compositions, le motion et les dépendances sont explicitement approuvés.
2. Les décisions O-001, O-002 et O-003 sont closes ou assorties d'une règle validée.
3. Les trois présentations frontend sont associées à des codes BDD existants sans modification du backend.
4. Le manifeste de handoff est recalculé sur la révision finale approuvée.
5. La skill `optimallogic-codex-handoff` est réexécutée.

Après ces validations, ce fichier sera remplacé par un prompt complet contenant la branche de départ, l'ordre des lots, les fichiers à lire, le périmètre protégé, les actifs HTML/SVG/CSS à construire, les tests et les preuves attendues. Il interdira toute modification du backend, de Supabase, des API, de RLS et de la configuration existante des offres.
