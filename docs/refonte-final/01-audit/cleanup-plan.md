# Plan de nettoyage futur

Statut : `ready_for_review`

1. Sauvegarder et approuver `docs/refonte-final/` sur `feat/refonte-final`.
2. Créer le lot d'implémentation depuis `main@af4dc00` ou restaurer sélectivement le périmètre applicatif de cette révision, sans réécrire l'historique partagé.
3. Réappliquer le dossier final approuvé et les masters d'images.
4. Retirer `docs/refonte-v2`, les anciens actifs V2, previews, comparateur, showroom et skills locales rejetées.
5. Préserver les routes et services protégés à partir de `main`, puis modifier uniquement les contrats explicitement ciblés.
6. Installer les dépendances approuvées et construire les fondations réellement consommées.
7. Refaire les pages et parcours route par route, avec un commit autonome par lot.
8. Exécuter tous les tests de régression avant tout push d'implémentation.

Ce plan ne doit pas être exécuté pendant la phase de livrables. Toutes les suppressions restent récupérables dans Git.
