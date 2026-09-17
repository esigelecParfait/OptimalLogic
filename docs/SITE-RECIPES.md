# Catalogue et recettes de sites complets

Le catalogue `/showroom/sites` relie les fondations, compositions publiques,
animations, capacités 3D, systèmes visuels, interfaces d'authentification et
espaces clients. Il présente huit sites fictifs, soit une recette par thème.

## Rôle d'une recette

Une recette déclare une combinaison compatible : hero, services, preuves,
mouvement, profondeur, système visuel, authentification et espace client. Elle
sert de point de départ ; elle ne remplace jamais le `site-spec` du client.

Les recettes sont définies dans `design-system/site-recipes.ts`. Les pages sont
générées par `/showroom/sites/[slug]`, ce qui maintient un seul composant de page
et évite huit copies divergentes.

## Garanties

- toutes les routes sont internes et `noindex` ;
- les noms, offres, chiffres et preuves sont explicitement fictifs ;
- les formulaires et boutons ne sont connectés à aucun backend ;
- les aperçus privés n'établissent aucune session ;
- aucun module Supabase, stockage ou migration n'est ajouté ;
- une alternative mobile et statique doit rester compréhensible.

Avant de créer un site client, sélectionner une recette, remplacer chaque
contenu par une source approuvée, retirer les modules inutiles et refaire les
contrôles de qualité.
