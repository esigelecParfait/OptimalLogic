# Architecture du dépôt modèle OptimalLogic

## Objectif

Ce dépôt fournit les fondations communes des sites clients OptimalLogic. Il
sépare les décisions métier, l'identité visuelle, les composants réutilisables
et la composition finale des pages.

Le flux général est le suivant :

```text
Informations client
        ↓
brief + site-spec.yaml validés
        ↓
direction artistique et thème
        ↓
tokens visuels
        ↓
sélection des variantes de blocs + contenus typés
        ↓
composition des pages Next.js
        ↓
HTML/CSS livré au navigateur
```

## Responsabilité de chaque couche

| Couche                      | Emplacement                            | Responsabilité                                                                                              | Ne doit pas contenir                                      |
| --------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Brief et `site-spec`        | Racine du dépôt client                 | Objectifs, audiences, pages, parcours, contenus, preuves, médias, fonctionnalités et critères d'acceptation | Décisions visuelles improvisées ou informations inventées |
| Thème                       | `design-system/foundation-tokens.json` | Couleurs, polices, tailles, espacements, formes, ombres, largeurs et mouvements de la marque                | Textes client ou structure d'une page                     |
| Primitives                  | `src/components/primitives/`           | Règles élémentaires de structure, typographie, interaction et média                                         | Offres, prix, témoignages ou logique métier client        |
| Éléments partagés des blocs | `src/components/blocks/shared/`        | Introduction, actions et cadre média communs à plusieurs familles                                           | Composition complète d'une page                           |
| Blocs                       | `src/components/blocks/`               | Sections éditoriales réutilisables recevant du contenu par des propriétés TypeScript                        | Contenu client écrit en dur ou choix global de navigation |
| Mouvement                   | `src/components/motion/`               | Révélations progressives, groupes et respect de la réduction des mouvements                                 | Contenu essentiel masqué ou animation décorative gratuite |
| Pages                       | `src/app/`                             | Ordre des blocs, hiérarchie des titres, métadonnées et parcours propres à chaque URL                        | Nouvelle primitive générique cachée dans une seule page   |

## Circulation du brief vers la page

### 1. Le brief établit les faits

La skill `optimallogic-site-intake` transforme les informations brutes du client
en brief et en `site-spec.yaml`. Ce fichier doit être validé avant la création du
site. Il constitue la source de vérité pour les éléments suivants :

- positionnement et audiences ;
- arborescence et objectif de chaque page ;
- messages, appels à l'action et destinations ;
- services, tarifs et processus réellement proposés ;
- preuves autorisées et sources associées ;
- médias disponibles, manquants et droits d'utilisation ;
- modules backend nécessaires ;
- exigences SEO, légales, d'accessibilité et de livraison.

Une information absente du `site-spec` ne doit pas être inventée dans un bloc.

### 2. La direction artistique devient un thème

La direction artistique traduit le positionnement en décisions visuelles. Les
valeurs globales sont ensuite inscrites dans
`design-system/foundation-tokens.json`, puis générées avec `npm run tokens`.

Les composants ne connaissent pas directement « le vert du client » ou « le
rayon de ses cartes ». Ils utilisent des rôles comme `--color-action`,
`--radius-lg` ou `--space-section`. Changer ces valeurs fait évoluer tout le
site sans réécrire chaque composant.

### 3. Les besoins éditoriaux sélectionnent les blocs

Chaque section définie dans le plan d'une page est associée à une variante de la
bibliothèque : `HeroSplit`, `ServicesGrid`, `ProcessTimeline`, etc. La variante
est choisie selon la hiérarchie réelle du contenu, pas pour remplir une page.

Les données sont transmises avec des propriétés typées :

```tsx
// La page choisit une variante publique de la bibliothèque.
import { HeroSplit } from "@/components/blocks";

export default function HomePage() {
  return (
    <HeroSplit
      // Le contenu doit avoir été validé dans le site-spec.
      title="Proposition de valeur validée"
      description="Bénéfice principal validé avec le client."
      primaryAction={{ label: "Nous contacter", href: "/contact" }}
      media={{ label: "Photographie autorisée à fournir" }}
    />
  );
}
```

### 4. Les blocs composent les primitives

Un bloc décide de la structure éditoriale. Par exemple, `HeroSplit` assemble une
`Section`, un `Container`, un `Stack`, un `BlockIntro`, des actions et un cadre
média. Les primitives appliquent ensuite les classes CSS qui lisent les tokens.

Le chemin de rendu réel est donc :

```text
app/page.tsx
  → HeroSplit
    → BlockIntro / BlockActions / BlockMediaFrame
      → Section / Container / Heading / Button / MediaFrame
        → classes CSS
          → variables de src/styles/tokens.generated.css
            → éléments HTML affichés
```

### 5. Next.js construit la page

Les fichiers `app/**/page.tsx` renvoient la composition React de chaque URL.
Next.js transforme cette composition en HTML et charge les styles associés. Le
fichier `app/layout.tsx` porte les métadonnées globales, la langue et les polices
chargées pour tout le site.

## Arborescence utile

```text
src/app/
├── layout.tsx                 # Enveloppe globale du site.
├── page.tsx                   # Page d'accueil du client.
├── globals.css                # Normalisation et import des tokens.
└── showroom/                  # Vérification interne des variantes.

src/components/
├── primitives/                # 11 composants élémentaires.
└── blocks/
    ├── shared/                # Sous-composants communs aux blocs.
    ├── hero/, services/, ...  # 12 familles et 28 variantes.
    ├── types.ts               # Contrats de contenu communs.
    └── index.ts               # Point d'entrée public.

design-system/
└── foundation-tokens.json     # Source globale personnalisable.

docs/                          # Architecture et guides de maintenance.
```

## Ce qui est automatique aujourd'hui

- TypeScript vérifie les propriétés transmises aux composants.
- Les primitives et blocs appliquent automatiquement les variantes CSS.
- Next.js construit les pages et leurs routes.
- `npm run check` vérifie le formatage, ESLint, TypeScript, le build, les
  parcours fonctionnels et quatre largeurs responsives.
- `npm run check:all` ajoute les budgets Lighthouse.
- GitHub Actions rejoue ces étapes sur les pushes et pull requests concernés.

## Ce qui reste contrôlé manuellement

- la correspondance entre le `site-spec` et les composants React ;
- le choix de la variante de chaque bloc ;
- la traduction de la direction artistique dans les tokens ;
- l'intégration et la vérification des médias ;
- la hiérarchie finale des titres et des pages ;
- l'installation des modules backend ;
- l'autorisation de mise en production.

Il n'existe actuellement ni parseur de `site-spec.yaml`, ni moteur qui génère
automatiquement les pages. Cette automatisation pourra être ajoutée plus tard,
après stabilisation du contrat et des règles de sélection.

## Règles d'architecture

1. Une page client commence toujours par un `site-spec.yaml` validé.
2. Une valeur visuelle globale appartient aux tokens.
3. Une règle élémentaire réutilisée par plusieurs blocs appartient aux
   primitives.
4. Une composition éditoriale réutilisable appartient aux blocs.
5. L'ordre des sections et les contenus propres à une URL appartiennent aux
   pages.
6. Les blocs de preuve sont interdits sans source ou autorisation vérifiable.
7. Une page ne contient qu'un seul titre principal `h1`.
8. Un module backend est ajouté uniquement avec ses routes serveur, sa
   configuration, ses migrations, ses règles de sécurité et ses tests.
9. Toute livraison doit réussir `npm run check:all` et une revue visuelle
   humaine des pages finales.

## Choisir le bon niveau de modification

| Besoin                                          | Niveau à modifier                 |
| ----------------------------------------------- | --------------------------------- |
| Changer la couleur de tous les boutons          | Token `--color-action`            |
| Changer le rayon de toutes les grandes cartes   | Token `--radius-lg`               |
| Ajouter un alignement disponible partout        | Primitive concernée               |
| Ajouter une nouvelle composition de services    | Nouvelle variante de bloc         |
| Modifier le texte d'un service client           | Données transmises depuis la page |
| Changer l'ordre des sections de l'accueil       | `app/page.tsx`                    |
| Ajouter une réservation ou une authentification | Module backend documenté          |
