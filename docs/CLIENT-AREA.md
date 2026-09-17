# Espaces clients configurables

Le showroom `/showroom/client-area` présente les structures réutilisables de
l'espace client. Il contient six navigations et trente-six compositions : six
variantes pour les tableaux de bord, profils, demandes, rendez-vous, documents
et parcours de support.

## Périmètre

- rôle principal : client ;
- modules équipe et facturation : démonstrations optionnelles seulement ;
- états : normal, chargement, vide, partiel, erreur, accès limité et succès ;
- compatibilité avec les huit thèmes du dépôt ;
- alternatives responsive pour mobile, tablette et ordinateur.

## Contrat de données

Les contenus du showroom sont fictifs. Les boutons ne déclenchent aucune
requête et aucun stockage local. L'intégration d'un dépôt client doit remplacer
ces exemples par des données typées provenant du backend déjà approuvé.

Cette étape n'ajoute ni authentification, ni session, ni politique RLS, ni
migration Supabase. Les droits réels doivent être contrôlés côté serveur ; un
état visuel `restricted` ne constitue jamais une autorisation.

## Utilisation

Sélectionner une navigation, une composition, un état et un thème dans le
showroom. Une composition validée peut ensuite consommer
`ClientAreaStage`, ou servir de référence pour assembler les primitives du
projet client. Seuls les modules nécessaires au site-spec doivent être repris.
