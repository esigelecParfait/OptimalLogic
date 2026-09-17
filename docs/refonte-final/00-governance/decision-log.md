# Journal des décisions

| ID | Décision | Statut |
|---|---|---|
| DEC-001 | La refonte est préparée sur `champion`; `main` reste protégée. | Confirmée |
| DEC-002 | Le catalogue public contient trois offres : Présence digitale, Accueil & qualification par SMS, Accueil & qualification par appels + SMS. | Confirmée |
| DEC-003 | Le backend et la configuration des offres ne sont pas modifiés. Les noms et prix continuent de venir de la BDD via le contrat existant. | Verrouillée |
| DEC-004 | Correspondance frontend validée : `commerce_intelligent` → Présence digitale, `tpe_pme_croissance` → SMS, `tpe_pme_performance` → appels + SMS. Aucun code BDD n’est inventé. | Verrouillée |
| DEC-005 | La cible est l’ensemble des entreprises, notamment commerces et TPE/PME, sans spécialisation garage. | Confirmée |
| DEC-006 | Pages principales : Accueil, Services, Offres, Prise de rendez-vous et Contact. `/tarifs` reste compatible avec le libellé Offres. | Confirmée |
| DEC-007 | `Connexion` est visible dans le header. | Confirmée |
| DEC-008 | Trois animations fortes : demande qualifiée sur Accueil; appels + SMS et présence digitale sur Services. | Confirmée |
| DEC-009 | Les photographies réelles, licenciées et sourcées sont autorisées dans l’animation présence digitale. | Confirmée |
| DEC-010 | Palette : `#0D0D0C`, `#191918`, `#F1EFE9`, `#A5A29B`, bronze `#9A8060`, bordures `#31312E`. | Verrouillée |
| DEC-011 | Appels et SMS sont au cœur de l’accueil automatisé; aucune offre n’est présentée comme illimitée. | Confirmée |
| DEC-012 | Espaces privés, API, authentification et intégrations existantes sont hors périmètre de modification. | Verrouillée |

## À vérifier sans modifier le backend

- volumes inclus et dépassements SMS/minutes avant affichage ;
- droits et hébergement des photographies ;
- validation visuelle, responsive et accessibilité.
