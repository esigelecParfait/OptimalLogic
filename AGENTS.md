# Instructions OptimalLogic

La source de vérité de la refonte est `docs/refonte-final/`.
L'ancien dossier `docs/refonte-v2/` a été supprimé et ne doit pas être recréé.

## Contraintes verrouillées

- Le catalogue public contient exactement trois offres : Présence digitale,
  Accueil & qualification par SMS, Accueil & qualification par appels + SMS.
- Ne modifier ni le backend, ni Supabase, ni les routes API, ni les politiques
  RLS, ni la configuration existante des offres.
- Conserver la récupération actuelle de `nom_offre`, `prix` et
  `prix_abonnement` depuis la BDD. Aucun prix ou nom de secours codé en dur.
- Les adaptations du catalogue sont frontend uniquement et doivent se brancher
  sur le contrat existant sans changer sa forme.
- Conserver les espaces privés, l’administration, l’authentification et les API.
- Afficher `Connexion` dans le header public.
- Ne pas créer de dashboard public.
- Conserver `/tarifs` comme route technique compatible et afficher le libellé
  public « Offres ».
- Réserver les trois animations fortes à l’Accueil et aux Services.
- Ne pas publier ni fusionner vers `main` sans QA PASS, validation visuelle et
  autorisation explicite.

## Ordre de lecture

1. `docs/refonte-final/03-strategy/site-spec.yaml`
2. `docs/refonte-final/04-content/offer-content.yaml`
3. `docs/refonte-final/05-art-direction/`
4. `docs/refonte-final/06-assets/asset-manifest.yaml`
5. `docs/refonte-final/07-motion/`
6. `docs/refonte-final/09-implementation/`
7. `docs/refonte-final/10-validation/`
8. `docs/refonte-final/11-handoff/`
