# 05 — Contraintes techniques

## Responsive

Obligatoire.

Le site doit être impeccable sur :
- mobile ;
- tablette ;
- desktop ;
- grands écrans.

Priorité mobile importante, car les fiches Google Business, appels et prises de rendez-vous sont souvent consultés depuis smartphone.

## Priorité

Priorité 1 : clarté et conversion.  
Priorité 2 : perception premium.  
Priorité 3 : performance.  
Priorité 4 : animations.

Les animations ne doivent jamais ralentir le site ni gêner la compréhension.

## Format de livraison souhaité

Projet web compatible avec l’existant OptimalLogic :

- Next.js ;
- React ;
- Tailwind CSS ;
- composants propres et réutilisables ;
- structure compatible avec déploiement Vercel.

## Bibliothèques possibles

À utiliser seulement si utile :

- Framer Motion : animations d’apparition, hover, transitions.
- GSAP : uniquement si besoin de scroll animations plus avancées.
- Lucide React : icônes sobres.
- React Hook Form / Zod : formulaires propres si nécessaire.

À éviter :
- Three.js lourd sans vraie raison ;
- animations complexes qui pénalisent la performance ;
- dépendances inutiles.

## Contenu dynamique / backend

Le site OptimalLogic possède déjà une logique de collecte de demandes et de suivi.

À préserver :
- formulaires de contact / tarifs ;
- envoi des demandes vers la base ;
- intégration prise de RDV ;
- espace client ;
- logique de demande liée à une offre ;
- consentement RGPD ;
- pages légales.

## Contraintes fortes

1. Ne pas changer la navigation.
2. Ne pas changer le header.
3. Ne pas changer le footer.
4. Garder les couleurs du site.
5. Garder le contenu central : Google Business, site web, RDV, assistant IA, suivi prospects.
6. Ne pas transformer OptimalLogic en site SaaS abstrait : le site doit rester compréhensible pour un commerce local.
7. Le français doit être impeccable, court, clair et orienté action.

## Performance

Objectifs :
- images optimisées ;
- SVG quand c’est possible ;
- lazy loading pour les visuels lourds ;
- composants accessibles ;
- éviter les scripts d’animation bloquants ;
- préserver un bon score mobile.
