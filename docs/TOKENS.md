# Personnalisation des tokens visuels

## Rôle du fichier

`design-system/foundation-tokens.json` est la source du thème global. La
commande `npm run tokens` génère `src/styles/tokens.generated.css`, qui expose
les variables CSS utilisées par les primitives, les blocs et les pages.

Le fichier généré est importé une seule fois dans `src/styles/globals.css` :

```css
/* Rend les tokens disponibles dans tout le site. */
@import "../styles/tokens.generated.css";
```

Une variable déclarée dans `:root` est accessible à tous les composants. Ne pas
modifier le CSS généré directement : le JSON décrit les valeurs primitives et
leurs rôles sémantiques.

## Deux niveaux de couleurs

### Valeurs primitives

Les variables `--ol-*` contiennent les couleurs physiques de la palette :

| Groupe  | Tokens actuels                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Neutres | `--ol-white`, `--ol-ink`, `--ol-neutral-50`, `--ol-neutral-100`, `--ol-neutral-200`, `--ol-neutral-500`, `--ol-neutral-900` |
| Accent  | `--ol-accent-500`, `--ol-accent-600`, `--ol-accent-700`                                                                     |

### Rôles sémantiques

Les composants utilisent principalement des rôles, pas les couleurs physiques :

| Token                     | Responsabilité                          |
| ------------------------- | --------------------------------------- |
| `--color-canvas`          | Fond général du site                    |
| `--color-surface`         | Fond des sections et cartes principales |
| `--color-surface-muted`   | Fond secondaire ou atténué              |
| `--color-text`            | Texte principal                         |
| `--color-text-muted`      | Texte secondaire                        |
| `--color-border`          | Bordures et séparateurs                 |
| `--color-action`          | Boutons et actions principales          |
| `--color-action-hover`    | État survolé de l'action principale     |
| `--color-action-contrast` | Texte placé sur la couleur d'action     |
| `--color-focus`           | Contour visible au clavier              |

Cette séparation permet de remplacer une palette sans modifier les composants.

## Inventaire complet

### Typographie

| Catégorie         | Tokens                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| Familles          | `--font-body`, `--font-display`, `--font-code`                                                    |
| Graisses          | `--font-weight-regular`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`   |
| Hauteurs de ligne | `--line-height-tight`, `--line-height-heading`, `--line-height-body`                              |
| Approche          | `--tracking-tight`, `--tracking-normal`, `--tracking-wide`                                        |
| Tailles           | `--text-xs`, `--text-sm`, `--text-md`, `--text-lg`, `--text-xl`, `--text-title`, `--text-display` |

`app/layout.tsx` charge actuellement Geist et Geist Mono. La police d'affichage
utilise actuellement Georgia. Si une marque emploie d'autres polices, leur
chargement doit être configuré dans le layout avant de référencer leurs
variables dans les tokens.

### Espacements

| Catégorie        | Tokens                                                   |
| ---------------- | -------------------------------------------------------- |
| Échelle          | `--space-1` à `--space-9`                                |
| Sections         | `--space-section`                                        |
| Marges latérales | `--gutter-mobile`, `--gutter-tablet`, `--gutter-desktop` |

### Formes et profondeur

| Catégorie | Tokens                                                       |
| --------- | ------------------------------------------------------------ |
| Rayons    | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill` |
| Ombres    | `--shadow-sm`, `--shadow-md`                                 |

### Mise en page

| Token                 | Responsabilité                              |
| --------------------- | ------------------------------------------- |
| `--container-text`    | Largeur confortable pour les textes longs   |
| `--container-content` | Largeur standard des sections               |
| `--container-wide`    | Largeur des compositions visuelles étendues |

### Mouvement

| Catégorie | Tokens                                                    |
| --------- | --------------------------------------------------------- |
| Durées    | `--duration-fast`, `--duration-normal`, `--duration-slow` |
| Courbes   | `--ease-standard`, `--ease-emphasized`                    |

La règle globale `prefers-reduced-motion` de `app/globals.css` réduit les
animations pour les utilisateurs qui l'ont demandé dans leur système.

## Méthode de personnalisation d'un client

### 1. Partir de la direction artistique validée

Avant toute modification, relever :

- couleurs de marque et rôles associés ;
- polices autorisées et licences ;
- niveau de contraste souhaité ;
- densité des espacements ;
- géométrie des surfaces ;
- profondeur des ombres ;
- largeur de contenu ;
- caractère et intensité du mouvement.

### 2. Modifier d'abord les valeurs globales

```json
{
  "primitive": {
    "color": { "accent": { "500": "#9d6b3d", "600": "#7f522d" } }
  },
  "semantic": {
    "color": { "action": "{primitive.color.accent.600}" }
  }
}
```

Les valeurs ci-dessus sont un exemple technique, pas une recommandation de
marque prête à livrer.

### 3. Conserver les rôles

Une classe de bloc doit utiliser :

```css
.card {
  /* Le rôle reste valable si la palette du client change. */
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
```

Éviter une couleur écrite directement dans le composant :

```css
/* À éviter : cette valeur contourne le thème global. */
.card {
  background: #ffffff;
}
```

### 4. Vérifier les conséquences globales

Après une modification :

```powershell
# Régénère les variables CSS, puis vérifie le projet.
npm run tokens
npm run check

# Lance le showroom pour la vérification visuelle.
npm run dev
```

Ouvrir `http://localhost:3000/showroom` et vérifier au minimum :

- contraste texte/fond et bouton/fond ;
- visibilité du focus au clavier ;
- états normal, survolé et actif des liens ;
- lisibilité à 320, 768, 1024 et 1440 px ;
- cohérence des rayons, espacements et ombres ;
- comportement avec la réduction des mouvements.

## Quand ajouter un token

Ajouter un token uniquement lorsqu'une décision visuelle est :

- réutilisée dans plusieurs composants ;
- porteuse d'un rôle clair ;
- destinée à varier selon la marque ;
- impossible à exprimer proprement avec l'échelle existante.

Une valeur utilisée une seule fois pour une composition très spécifique peut
rester dans le CSS Module du bloc. Si elle devient récurrente, elle doit être
promue en token.

## Erreurs à éviter

1. Modifier les couleurs directement dans plusieurs fichiers de blocs.
2. Utiliser `--ol-accent-*` partout au lieu des rôles `--color-*`.
3. Supprimer le contour de focus sans alternative accessible.
4. Charger une police sans vérifier sa licence et ses performances.
5. Réduire les tailles jusqu'à rendre les textes illisibles sur mobile.
6. Créer une échelle différente pour chaque page.
