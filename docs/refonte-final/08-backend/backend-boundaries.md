# Frontières backend à préserver

Statut : `ready_for_review`

## Autorisé lors de la future refonte

- Corriger la liste publique des cinq codes dans le helper et `/api/offres`.
- Valider côté serveur les données Supabase et afficher un état indisponible sans prix de secours.
- Réécrire le contexte de `/api/chat/public` avec les offres et limites approuvées.
- Adapter les interfaces de contact, réservation, aide, connexion, support et compte sans changer leurs autorisations.
- Ajouter des tests autour des comportements existants.

## Protégé

Les routes administratives, règles d'authentification, accès inter-clients, intégrations Cal.com, assistant privé, Brevo, Google Business, sécurité et routes client spécifiques ne changent pas de comportement sans besoin explicitement approuvé.

## Interdit pendant la refonte visuelle

- Modifier directement le schéma distant.
- Inventer une migration, une politique RLS ou un rôle.
- Déplacer une clé serveur dans un composant client.
- Rendre une route privée publique pour simplifier l'interface.
- Supprimer support ou compte privé sous prétexte de retirer le dashboard.
- Envoyer un vrai email, créer un vrai rendez-vous ou appeler un fournisseur réel depuis les tests automatisés.

## Condition de validation

Le backend ne pourra obtenir `PASS` qu'après récupération/versionnement du schéma réel, reconstruction locale et tests RLS autorisés/refusés. Jusqu'alors, la décision reste `not_tested`, jamais `pass`.
