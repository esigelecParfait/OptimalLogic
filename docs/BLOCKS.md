# Blocs de page

## Rôle des blocs

Un bloc est une section éditoriale réutilisable construite avec les primitives.
Il reçoit tout son contenu par des propriétés TypeScript et renvoie du JSX
sémantique : sections, titres, listes, cartes, liens et médias.

Les 28 variantes publiques sont exportées depuis :

```tsx
// Point d'entrée public de la bibliothèque.
import { HeroSplit, ServicesGrid } from "@/components/blocks";
```

Les variantes d'une même famille sont regroupées dans un fichier, par exemple
`components/blocks/hero/HeroBlocks.tsx`. Il n'existe donc pas de fichier séparé
`HeroSplit.tsx` : `HeroSplit`, `HeroCentered` et `HeroEditorial` sont définis
ensemble dans `HeroBlocks.tsx`.

## Contrats communs

### Introduction

```ts
type BlockIntroContent = {
  eyebrow?: string; // Petit libellé facultatif.
  title: string; // Titre obligatoire de la section.
  description?: string; // Introduction facultative.
};
```

### Action

```ts
type BlockAction = {
  label: string; // Texte visible du lien.
  href: string; // Destination du lien.
  variant?: "primary" | "secondary" | "text";
};
```

### Média

```ts
type BlockMedia = {
  content?: ReactNode; // Image Next.js, vidéo ou composant graphique.
  label?: string; // Placeholder affiché si content est absent.
  ratio?: "landscape" | "portrait" | "square" | "wide";
  fit?: "cover" | "contain";
};
```

Le média transmis dans `content` reste responsable de son texte alternatif, de
ses dimensions, de ses performances et de ses droits d'utilisation.

### Ton

```ts
type BlockTone = "canvas" | "surface" | "muted";
```

`id?: string` peut être transmis à tous les blocs afin de créer une ancre ou une
relation accessible. Sauf mention contraire, `eyebrow`, `description`, `tone`
et `id` sont facultatifs, tandis que `title` est obligatoire.

## Hero

Fichier : `components/blocks/hero/HeroBlocks.tsx`.

Propriétés communes : introduction, `primaryAction?`, `secondaryAction?`,
`headingAs?: "h1" | "h2"`, `tone?` et `id?`. `headingAs` vaut `h1` par défaut.

| Variante        | Propriétés supplémentaires                               | Ton par défaut | Rendu et usage                                               |
| --------------- | -------------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| `HeroSplit`     | `media` obligatoire, `mediaPosition?: "left" \| "right"` | `canvas`       | Deux colonnes : texte et média ; média à droite par défaut   |
| `HeroCentered`  | `media?`                                                 | `canvas`       | Message centré puis média large facultatif                   |
| `HeroEditorial` | `aside?: { label?: string; text: string }`, `media?`     | `canvas`       | Grand message asymétrique, note latérale et média facultatif |

Utiliser un seul Hero par page. La page d'accueil emploie normalement
`headingAs="h1"`; le showroom utilise `h2` afin de préserver son propre `h1`.

## Preuves

Fichier : `components/blocks/proof/ProofBlocks.tsx`.

| Variante         | Propriétés                                                                 | Ton par défaut | Rendu                                        |
| ---------------- | -------------------------------------------------------------------------- | -------------- | -------------------------------------------- |
| `ProofLogoCloud` | introduction, `logos: { name: string; mark?: ReactNode }[]`                | `surface`      | Liste sémantique de noms ou logos autorisés  |
| `ProofStats`     | introduction, `stats: { value: string; label: string; detail?: string }[]` | `canvas`       | Liste descriptive `<dl>` de chiffres sourcés |
| `ProofQuote`     | `quote`, `authorName`, `authorRole?`, `eyebrow?`, `media?`                 | `muted`        | Citation `<blockquote>` attribuée            |

Ces blocs sont interdits sans preuve vérifiable ou autorisation d'utilisation.
Les types internes `ProofLogo` et `ProofStat` ne sont pas exportés depuis le
point d'entrée public ; leurs objets sont passés directement dans les tableaux.

## Services

Fichier : `components/blocks/services/ServiceBlocks.tsx`.

```ts
export type ServiceItem = {
  title: string;
  description: string;
  eyebrow?: string;
  href?: string;
  icon?: ReactNode;
};
```

Les trois variantes reçoivent une introduction et `services: ServiceItem[]`.

| Variante            | Ton par défaut | Rendu et priorité                                  |
| ------------------- | -------------- | -------------------------------------------------- |
| `ServicesGrid`      | `canvas`       | Cartes de même importance dans une grille          |
| `ServicesEditorial` | `surface`      | Lignes numérotées pour une lecture éditoriale      |
| `ServicesFeatured`  | `muted`        | Premier élément agrandi, puis services secondaires |

Le texte du lien est actuellement fixé à « Découvrir » lorsque `href` existe.
La propriété `eyebrow` d'un `ServiceItem` est acceptée par le type, mais n'est
pas encore affichée par les trois variantes actuelles.

## Processus

Fichier : `components/blocks/process/ProcessBlocks.tsx`.

```ts
export type ProcessItem = {
  title: string;
  description: string;
  detail?: string;
};
```

Les deux variantes reçoivent une introduction et `steps: ProcessItem[]`.

| Variante          | Ton par défaut | Rendu                       |
| ----------------- | -------------- | --------------------------- |
| `ProcessSteps`    | `canvas`       | Grille de cartes numérotées |
| `ProcessTimeline` | `surface`      | Liste ordonnée verticale    |

L'ordre du tableau définit l'ordre réel du processus.

## Narration

Fichier : `src/components/blocks/narrative/NarrativeBlocks.tsx`.

`NarrativeMosaic` hiérarchise des problèmes, convictions ou décisions dans une
mosaïque. `NarrativeManifesto` place une déclaration centrale face à une liste
de principes. Ces variantes structurent un récit ; elles ne justifient aucune
promesse non sourcée.

## Workflow

Fichier : `src/components/blocks/workflow/WorkflowBlocks.tsx`.

`WorkflowPipeline` décrit des étapes et un résultat. `WorkflowRouting` relie
plusieurs sources à une décision puis à plusieurs issues. Les règles métier et
les capacités effectivement installées restent fournies par le projet client.

## Indicateurs

Fichier : `src/components/blocks/metrics/MetricsBlocks.tsx`.

`MetricsDashboard` fournit un panneau opérationnel et `MetricsStrip` une bande
compacte. Tous deux reçoivent des `MetricItem` typés. Une valeur publiée doit
avoir une source, une période et un responsable identifiés.

## Galerie

Fichier : `components/blocks/gallery/GalleryBlocks.tsx`.

```ts
export type GalleryItem = BlockMedia & {
  title?: string;
  caption?: string;
};
```

Les deux variantes reçoivent une introduction et `items: GalleryItem[]`.

| Variante           | Ton par défaut | Rendu et priorité                              |
| ------------------ | -------------- | ---------------------------------------------- |
| `GalleryGrid`      | `canvas`       | Mosaïque de médias                             |
| `GallerySpotlight` | `muted`        | Premier média agrandi, puis médias secondaires |

## FAQ

Fichier : `components/blocks/faq/FaqBlocks.tsx`.

```ts
export type FaqItem = {
  question: string;
  answer: ReactNode;
};
```

Les deux variantes reçoivent une introduction et `items: FaqItem[]`.

| Variante     | Ton par défaut | Rendu                                        |
| ------------ | -------------- | -------------------------------------------- |
| `FaqList`    | `canvas`       | Colonne étroite adaptée aux longues réponses |
| `FaqColumns` | `surface`      | Deux colonnes sur ordinateur, une sur mobile |

Chaque question utilise les éléments HTML natifs `<details>` et `<summary>`, ce
qui conserve le fonctionnement au clavier sans JavaScript client.

## Équipe

Fichier : `components/blocks/team/TeamBlocks.tsx`.

```ts
export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  profileHref?: string;
  media?: BlockMedia;
};
```

Les deux variantes reçoivent une introduction et `members: TeamMember[]`.

| Variante        | Ton par défaut | Rendu et priorité                              |
| --------------- | -------------- | ---------------------------------------------- |
| `TeamGrid`      | `canvas`       | Une carte par membre                           |
| `TeamSpotlight` | `muted`        | Premier membre agrandi, puis équipe secondaire |

Si un média manque, le bloc affiche le placeholder « Portrait autorisé à
fournir ». Aucun faux membre ne doit être ajouté pour remplir la grille.

## Tarifs

Fichier : `components/blocks/pricing/PricingBlocks.tsx`.

```ts
export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  action: BlockAction;
  badge?: string;
  highlighted?: boolean;
};
```

Les deux variantes reçoivent une introduction et `plans: PricingPlan[]`.

| Variante          | Ton par défaut | Rendu et priorité                                             |
| ----------------- | -------------- | ------------------------------------------------------------- |
| `PricingCards`    | `canvas`       | Plans comparables dans une grille                             |
| `PricingFeatured` | `muted`        | Plan `highlighted` agrandi, ou premier plan si aucun ne l'est |

Les prix, périodes, prestations et destinations doivent toujours venir des
données validées ; ils ne sont pas écrits dans le composant.

## Appels à l'action

Fichier : `components/blocks/cta/CtaBlocks.tsx`.

Propriétés communes : introduction, `primaryAction` obligatoire,
`secondaryAction?`, `tone?` et `id?`.

| Variante      | Propriété supplémentaire         | Ton par défaut | Rendu                                      |
| ------------- | -------------------------------- | -------------- | ------------------------------------------ |
| `CtaCentered` | —                                | `muted`        | Panneau centré                             |
| `CtaSplit`    | `note?: string`                  | `surface`      | Message à gauche, actions et note à droite |
| `CtaBand`     | `tone` accepte aussi `"inverse"` | `inverse`      | Bande compacte et contrastée               |

Pour `CtaBand`, `inverse` est géré localement par le CSS du bloc, car la
primitive `Section` n'expose que les trois tons clairs.

## Composants partagés internes

| Composant         | Responsabilité                         | Rendu particulier                                          |
| ----------------- | -------------------------------------- | ---------------------------------------------------------- |
| `BlockIntro`      | Assemble eyebrow, titre et description | N'ajoute aucun élément pour une valeur facultative absente |
| `BlockActions`    | Assemble zéro, une ou deux actions     | Renvoie `null` si aucune action n'existe                   |
| `BlockMediaFrame` | Adapte `BlockMedia` à `MediaFrame`     | Affiche un placeholder si `content` est absent             |

Ces composants ne sont pas exportés par `components/blocks/index.ts`. Ils sont
des détails d'implémentation communs aux familles de blocs.

## Exemple complet

```tsx
import { HeroSplit, ServicesGrid } from "@/components/blocks";

const services = [
  {
    title: "Service validé",
    description: "Description validée avec le client.",
    href: "/services/service-valide",
  },
];

export default function HomePage() {
  return (
    <main>
      <HeroSplit
        // Le Hero porte l'unique h1 de cette page.
        headingAs="h1"
        title="Proposition de valeur validée"
        primaryAction={{ label: "Prendre rendez-vous", href: "/contact" }}
        media={{ label: "Média principal autorisé à fournir" }}
      />

      <ServicesGrid
        // Les sections suivantes utilisent leur h2 par défaut.
        title="Nos services"
        services={services}
        tone="surface"
      />
    </main>
  );
}
```

Le fichier renvoie une page contenant deux sections : un Hero à deux colonnes,
puis une grille de services.

## Règles liées aux tableaux

1. Les variantes `Featured` et `Spotlight` exigent au moins un élément utile.
2. L'ordre des tableaux est significatif pour `ServicesFeatured`,
   `GallerySpotlight`, `TeamSpotlight` et les étapes de processus.
3. `PricingFeatured` recherche d'abord `highlighted: true`, puis utilise le
   premier plan.
4. Un tableau vide ne provoque pas nécessairement une erreur technique, mais
   produit une section éditorialement incomplète ; il doit être bloqué par la
   validation de contenu.
5. Les clés utilisent actuellement le titre ou le nom avec l'index. Les données
   d'un futur CMS pourront introduire des identifiants stables.

## Choisir ou ajouter une variante

Choisir une variante existante lorsque la différence concerne seulement le
contenu, le thème ou l'ordre des éléments. Ajouter une variante seulement si la
composition répond à un besoin réutilisable impossible à exprimer proprement
avec l'existant.

Pour ajouter une variante :

1. définir ses propriétés typées dans la famille concernée ;
2. composer uniquement les primitives nécessaires ;
3. ajouter les styles responsives dans le CSS Module de la famille ;
4. l'exporter depuis l'`index.ts` de la famille puis depuis
   `components/blocks/index.ts` ;
5. ajouter un cas explicite dans `/showroom` ;
6. documenter la variante dans ce fichier et dans le changelog ;
7. vérifier le clavier, le responsive et `npm run check`.
