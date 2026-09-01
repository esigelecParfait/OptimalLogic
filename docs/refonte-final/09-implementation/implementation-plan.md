# Plan d'implémentation destiné à Codex

Statut : `ready_for_review`

Ce plan décrit une future reconstruction. Il n'autorise aucune modification avant validation des livrables.

## Architecture cible

- Repartir du comportement de `main@af4dc00`, puis réappliquer les livrables approuvés.
- Conserver Next.js App Router ; pages et layouts restent des Server Components par défaut.
- Limiter les composants clients à la navigation mobile, aux onglets, formulaires, calendrier, accordéons, assistant et îlots motion.
- Placer les primitives dans `components/ui`, les sections dans `components/marketing`, les schémas dans `components/visuals` et les parcours métier dans `components/domain`.
- Construire les compositions d’interfaces et diagrammes en Server Components HTML/SVG/CSS avec leur état final complet ; limiter Motion aux petits îlots qui enrichissent ces éléments.
- Garder Supabase, Cal.com, Anthropic, Brevo, Google, l'administration et l'espace privé derrière leurs frontières actuelles.

## Ordre futur

1. Restaurer le périmètre applicatif sain et retirer les artefacts rejetés.
2. Installer seulement les dépendances approuvées.
3. Définir polices, tokens, primitives et shell public.
4. Construire les douze actifs code-native et interdire toute consommation des quatre rasters historiques.
5. Reconstruire `/`, `/services`, `/tarifs`, `/contact`, `/prise-de-rdv`, puis `/aide`.
6. Harmoniser pages légales et authentification sans changer leurs parcours.
7. Corriger le contrat des cinq offres et le contexte de l'assistant public.
8. Ajouter les métadonnées natives Next.js.
9. Exécuter l'intégralité du plan de tests.

## Documentation Next.js de référence

La version installée fournit localement les guides Server/Client Components, `next/font` et Metadata. Ils imposent de réduire les frontières `use client`, auto-héberger les polices et utiliser les API natives de métadonnées. La carte sociale sera produite par `ImageResponse`, sans master raster.

## Definition of done

Une page n'est terminée que lorsque chaque section du plan de composition consomme son contenu, son actif éventuel, son mouvement et son test. Chaque composition informative doit être complète sans JavaScript. Aucun prix de secours, dashboard public, raster rejeté, preuve fictive ou contenu dépendant de JavaScript n'est accepté.
