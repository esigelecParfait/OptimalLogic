# Primitives du design system

## Définition

Une primitive est un composant React élémentaire. Elle applique une règle de
structure, de typographie, d'interaction ou de média sans connaître l'activité
du client.

Les primitives sont exportées depuis `components/primitives/index.ts` :

```tsx
// Un seul point d'entrée évite de connaître le fichier interne de chaque primitive.
import { Container, Heading, Stack } from "@/components/primitives";
```

Elles utilisent `components/primitives/primitives.module.css`. Lorsqu'il est
importé, ce CSS Module renvoie à TypeScript un objet de noms de classes locaux ;
il ne produit aucun composant React à lui seul.

## Inventaire et responsabilité

| Primitive    | Élément rendu               | Propriétés spécifiques                                  | Valeurs par défaut                        | Responsabilité                                            |
| ------------ | --------------------------- | ------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| `Section`    | `<section>`                 | `tone?: "canvas" \| "surface" \| "muted"`               | `tone="canvas"`                           | Espacement vertical et fond d'une grande section          |
| `Container`  | `<div>`                     | `size?: "text" \| "content" \| "wide"`                  | `size="content"`                          | Largeur maximale et marges latérales                      |
| `Stack`      | `<div>`                     | `gap?: "small" \| "medium" \| "large" \| "extraLarge"`  | `gap="medium"`                            | Disposition verticale et espacement entre enfants         |
| `Cluster`    | `<div>`                     | `gap`, `justify`, `align`                               | `medium`, `start`, `center`               | Groupe horizontal flexible pouvant revenir à la ligne     |
| `Grid`       | `<div>`                     | `columns?: 1 \| 2 \| 3 \| 4`, `gap`, `align`            | `3`, `medium`, `stretch`                  | Grille responsive d'éléments comparables                  |
| `Heading`    | `<h1>` à `<h4>`             | `as`, `variant?: "display" \| "title" \| "subtitle"`    | `as="h2"`, `variant="title"`              | Séparer la hiérarchie HTML de la taille visuelle          |
| `Text`       | `<p>`                       | `variant?: "body" \| "lead" \| "small"`                 | `variant="body"`                          | Paragraphes et niveaux de texte courant                   |
| `Eyebrow`    | `<p>`                       | Propriétés normales d'un paragraphe                     | —                                         | Libellé court placé avant un titre                        |
| `Button`     | `<a>` Next.js ou `<button>` | `href?`, `variant?: "primary" \| "secondary" \| "text"` | `primary`, et `type="button"` sans `href` | Action ou navigation avec apparence cohérente             |
| `Surface`    | `<div>`                     | `elevation`, `tone`, `padding`                          | `flat`, `default`, `medium`               | Carte ou panneau avec fond, bordure, ombre et remplissage |
| `MediaFrame` | `<div>`                     | `ratio`, `fit`                                          | `landscape`, `cover`                      | Proportion, débordement et ajustement d'un média          |

Toutes les primitives acceptent également les propriétés HTML normales de leur
élément : `id`, `className`, `aria-*`, `data-*`, événements compatibles et
`children`.

## Détail de chaque primitive

### `Section`

Utiliser `Section` pour délimiter une partie sémantique importante d'une page.
Elle fournit trois fonds clairs basés sur les tokens. Elle ne limite pas la
largeur : elle est généralement suivie d'un `Container`.

### `Container`

- `text` convient aux FAQ, articles et textes longs ;
- `content` convient à la majorité des sections ;
- `wide` convient aux heroes et galeries étendues.

Le composant renvoie une `<div>` centrée avec une largeur maximale et des
gouttières responsives.

### `Stack`

`Stack` organise ses enfants verticalement. Le niveau `gap` exprime une relation
entre les éléments ; il évite d'ajouter des marges différentes à chaque enfant.

### `Cluster`

Les valeurs disponibles sont :

- `gap`: `small`, `medium`, `large` ;
- `justify`: `start`, `center`, `end`, `between` ;
- `align`: `start`, `center`, `end`, `stretch`.

Il est adapté aux groupes de boutons, métadonnées ou éléments de navigation.

### `Grid`

Les valeurs disponibles sont :

- `columns`: `1`, `2`, `3`, `4` ;
- `gap`: `small`, `medium`, `large` ;
- `align`: `start`, `stretch`.

Le nombre de colonnes indique la cible sur les grands écrans. Les règles du CSS
Module réduisent la grille sur les écrans plus étroits.

### `Heading`

`as` choisit le sens du titre pour le document, tandis que `variant` choisit son
apparence. Ces deux décisions sont indépendantes :

```tsx
// Ce titre reste un h2 dans le plan HTML, mais reçoit la grande apparence display.
<Heading as="h2" variant="display">
  Notre méthode
</Heading>
```

Une page doit normalement contenir un seul `h1`, puis respecter l'ordre des
niveaux sans choisir une balise uniquement pour sa taille.

### `Text` et `Eyebrow`

`Text` renvoie toujours un paragraphe. `lead` renforce une introduction, `body`
sert au texte courant et `small` aux précisions secondaires. `Eyebrow` renvoie
un paragraphe court en capitales visuelles ; ce n'est pas un titre HTML.

### `Button`

Avec `href`, `Button` renvoie un `Link` Next.js affiché comme un lien. Sans
`href`, il renvoie un véritable `<button>` :

```tsx
// Navigation : le rendu final est un lien.
<Button href="/contact">Nous contacter</Button>

// Action locale : le rendu final est un bouton HTML.
<Button type="submit" variant="secondary">
  Envoyer
</Button>
```

Un bouton sans `href` utilise `type="button"` par défaut afin de ne pas envoyer
accidentellement un formulaire.

### `Surface`

Les valeurs disponibles sont :

- `elevation`: `flat` ou `raised` ;
- `tone`: `default` ou `muted` ;
- `padding`: `none`, `small`, `medium` ou `large`.

`Surface` fournit l'apparence d'une carte mais ne décide pas de son contenu.

### `MediaFrame`

Les ratios sont `square`, `portrait`, `landscape` et `wide`.

- `fit="cover"` remplit le cadre et peut recadrer le média ;
- `fit="contain"` montre le média entier et peut laisser de l'espace libre.

`MediaFrame` ne crée ni image ni texte alternatif. Le composant placé dans
`children` reste responsable de l'accessibilité du média. Les blocs utilisent
`BlockMediaFrame`, un adaptateur qui ajoute un placeholder lorsque le média
n'est pas encore fourni.

## Exemple de composition

```tsx
import {
  Button,
  Container,
  Heading,
  Section,
  Stack,
  Text,
} from "@/components/primitives";

export function IntroExample() {
  return (
    // Section fournit le fond et l'espace vertical.
    <Section tone="muted">
      {/* Container limite la largeur de lecture. */}
      <Container size="text">
        {/* Stack espace verticalement le titre, le texte et l'action. */}
        <Stack gap="large">
          <Heading as="h2">Titre de section</Heading>
          <Text>Contenu validé de la section.</Text>
          <Button href="/contact">Continuer</Button>
        </Stack>
      </Container>
    </Section>
  );
}
```

Ce composant renvoie une section HTML contenant une div de largeur limitée, un
titre `h2`, un paragraphe et un lien.

## Règles de modification

1. Une primitive ne reçoit jamais de texte, d'offre ou de règle métier client.
2. Ajouter une variante seulement si elle est utile à plusieurs familles de
   blocs.
3. Utiliser les tokens pour les valeurs globales.
4. Conserver les propriétés HTML natives et les attributs d'accessibilité.
5. Conserver le focus visible et le comportement clavier.
6. Tester chaque changement dans plusieurs blocs du showroom.
7. Lancer `npm run check` avant de valider la modification.
