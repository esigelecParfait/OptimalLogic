# Audit conceptuel de `feat/refonte-final`

Statut : `ready_for_review`

## Version observée

- Dépôt : `esigelecParfait/OptimalLogic`
- Branche : `feat/refonte-final`
- Révision : `ed260a45558242a02ea06ca57f13567ef4af8860`
- Référence saine : `main@af4dc007ca7a75b8634c7d5e0e6ed6efff10f449`
- Worktree au début de l'audit : propre
- Écart : 307 fichiers, environ 25 266 ajouts et 14 921 suppressions

## Diagnostic

La branche ne représente pas un nettoyage de la refonte ratée. Elle contient encore les pages publiques réécrites, la bibliothèque V2, le showroom, les previews, les actifs V2, des modifications transversales du backend et de l'administration, les dépendances et les rapports historiques. Le dernier commit a seulement retiré les dossiers Claude.

La reconstruction finale ne doit donc pas prendre l'état applicatif actuel comme base visuelle ou fonctionnelle. Elle doit préserver le comportement fiable de `main`, réintroduire les fondations approuvées de façon ciblée et utiliser uniquement `docs/refonte-final/` pour les décisions de refonte.

## Écarts bloquants observés

1. `AGENTS.md` et `lib/offers/public-catalog.ts` exposent `commerce_premium` et omettent `startup_validation`, contrairement à la décision actuelle.
2. Les pages publiques de l'essai V2 ne découlent pas d'un dossier final approuvé.
3. `docs/refonte-v2/`, `/showroom`, `/comparer` et `/preview/**` sont des artefacts de travail, pas des pages finales.
4. Des modifications massives touchent administration, authentification, sécurité et intégrations sans nécessité pour une refonte visuelle.
5. Aucun dossier `supabase/migrations/` ne versionne le schéma réel ni les politiques RLS.
6. Des helpers utiles existent dans l'essai V2, mais leur présence ne vaut pas approbation et ils doivent être réévalués par contrat.

## Éléments fiables à conserver

- Logo et palette codés sur `main`, avec le vert primaire existant.
- Navigation publique Services, Tarifs, Contact et prise de rendez-vous.
- Next.js App Router, TypeScript, Tailwind et polices locales existantes.
- Supabase, Cal.com, Anthropic, Brevo/Google et leurs routes serveur existantes.
- Formulaire de demandes, authentification, support privé, compte privé et administration.
- Routes client spécifiques et outils de sécurité, sous périmètre protégé.
- Structure de tests et de Quality Gate seulement si elle est reprise sans affaiblissement et adaptée à la branche saine.

## Éléments à réécrire

- Toutes les compositions et pages marketing finales.
- Catalogue public des cinq offres et contexte de l'assistant public.
- Tokens, primitives, blocs et motion réellement consommés par les pages.
- SEO public, tout en conservant les routes privées `noindex`.
- Consignes du dépôt devenues contradictoires avec la décision commerciale.

## Éléments à retirer de la version finale

- Documents et médias `refonte-v2` comme sources actives.
- Showroom, comparateur et previews s'ils ne servent plus un test automatique approuvé.
- Composants génériques non utilisés par une route finale.
- Curseur personnalisé, effets globaux ou animations sans rôle.
- Toute mention de dashboard public, preuve fictive, appels/SMS non intégrés ou ancien code d'offre.

## Limite de l'étape

Le nettoyage est conceptuel : aucun fichier applicatif n'est supprimé maintenant. La suppression sélective appartient à Codex après validation du manifeste, avec des commits récupérables.
