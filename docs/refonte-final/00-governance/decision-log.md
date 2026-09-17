# Journal des décisions

| ID | Décision | Statut |
|---|---|---|
| DEC-001 | La refonte est préparée sur `champion`; `main` reste protégée. | Confirmée |
| DEC-002 | Le catalogue public contient trois offres : Présence digitale, Accueil & qualification par SMS, Accueil & qualification par appels + SMS. | Confirmée |
| DEC-003 | Le backend et la configuration des offres ne sont pas modifiés. Les noms et prix continuent de venir de la BDD via le contrat existant. | Verrouillée |
| DEC-004 | Les contenus frontend s’associent aux codes existants après vérification; aucun code BDD n’est inventé. | Confirmée |
| DEC-005 | La cible est l’ensemble des entreprises, notamment commerces et TPE/PME, sans spécialisation garage. | Confirmée |
| DEC-006 | Pages principales : Accueil, Services, Offres, Prise de rendez-vous et Contact. `/tarifs` reste compatible avec le libellé Offres. | Confirmée |
| DEC-007 | `Connexion` est visible dans le header. | Confirmée |
| DEC-008 | Trois animations fortes : demande qualifiée sur Accueil; appels + SMS et présence digitale sur Services. | Confirmée |
| DEC-009 | Les photographies réelles, licenciées et sourcées sont autorisées dans l’animation présence digitale. | Confirmée |
| DEC-010 | Palette : `#0B0D0F`, `#15191D`, `#F1F0EB`, `#9CA3AA`, `#315866`, `#66877D`, `#2A3035`. | Verrouillée |
| DEC-011 | Appels et SMS sont au cœur de l’accueil automatisé; aucune offre n’est présentée comme illimitée. | Confirmée |
| DEC-012 | Espaces privés, API, authentification et intégrations existantes sont hors périmètre de modification. | Verrouillée |

## À vérifier sans modifier le backend

- correspondance entre les trois offres frontend et les codes déjà présents en BDD ;
- volumes inclus et dépassements SMS/minutes avant affichage ;
- droits et hébergement des photographies ;
- validation visuelle, responsive et accessibilité.
