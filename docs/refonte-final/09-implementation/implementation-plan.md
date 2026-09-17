# Plan d’implémentation frontend

## Limite ferme

Ne modifier aucun fichier backend, Supabase, API, authentification, RLS ou
configuration d’offres. La récupération actuelle de `nom_offre`, `prix` et
`prix_abonnement` reste inchangée.

## Lots

1. Vérifier en lecture seule les codes déjà renvoyés par `/api/offres` et
   documenter leur correspondance avec les trois offres.
2. Mettre à jour navigation, libellés et contenus multisectoriels.
3. Restructurer l’Accueil et intégrer `request-never-lost`.
4. Restructurer Services et intégrer `calls-sms-demo` puis
   `digital-presence-gallery`.
5. Restructurer `/tarifs` en page Offres à trois présentations frontend,
   alimentées par les noms et prix du contrat existant.
6. Appliquer la palette, les tokens et les états responsive.
7. Conserver Contact, réservation, connexion, espaces privés et administration;
   ajuster seulement leur couche visuelle publique si nécessaire.
8. Exécuter lint, typecheck, build, tests, Playwright, accessibilité,
   responsive et contrôles de non-régression backend.

Chaque lot doit être réversible. Aucun lot ne doit nécessiter une migration ou
une modification de configuration distante.
