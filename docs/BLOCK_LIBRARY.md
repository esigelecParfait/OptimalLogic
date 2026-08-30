# Bibliothèque de blocs OptimalLogic

## Objectif

Cette bibliothèque compose les primitives du design system pour produire des
sections de page réutilisables. Elle fournit une structure technique commune,
mais ne fixe ni la marque, ni les contenus, ni la composition finale d'un site.

Une page client doit choisir ses blocs à partir d'un `site-spec.yaml` validé.
Les couleurs, polices, espacements, rayons et mouvements viennent ensuite des
tokens de la direction artistique du client.

## Ce que renvoient les fichiers

| Type de fichier     | Utilité                                         | Ce qu'il renvoie ou exporte                                            |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| `*Blocks.tsx`       | Définit les composants React d'une famille      | Du JSX sémantique : `section`, titres, listes, cartes, liens et médias |
| `*.module.css`      | Définit la composition responsive d'une famille | Un objet de classes CSS locales lorsqu'il est importé dans TypeScript  |
| `*/index.ts`        | Simplifie les imports d'une famille             | Des réexports TypeScript ; aucun HTML                                  |
| `blocks/index.ts`   | Point d'entrée public de la bibliothèque        | Les 28 variantes et leurs types de contenu                             |
| `blocks/types.ts`   | Contrats communs                                | Types des actions, médias, introductions et tons                       |
| `shared/*.tsx`      | Évite de dupliquer les introductions et actions | JSX construit avec `Heading`, `Text`, `Button`, `Stack` et `Cluster`   |
| `showroom/page.tsx` | Affiche les variantes en développement          | Une page Next.js complète à `/showroom`                                |
| `showroom-data.ts`  | Fournit des placeholders typés                  | Des tableaux de données de démonstration, jamais des preuves réelles   |

## Inventaire des 28 variantes

| Famille   | Variante             | Utilité                                       | Entrées principales                     | Rendu principal                      |
| --------- | -------------------- | --------------------------------------------- | --------------------------------------- | ------------------------------------ |
| Hero      | `HeroSplit`          | Associer une proposition de valeur à un média | introduction, actions, média, position  | Hero en deux colonnes                |
| Hero      | `HeroCentered`       | Donner la priorité à un message central       | introduction, actions, média facultatif | Hero centré puis média large         |
| Hero      | `HeroEditorial`      | Créer une entrée asymétrique                  | introduction, note latérale, média      | Grand titre, note et visuel          |
| Narrative | `NarrativeMosaic`    | Hiérarchiser des constats ou convictions      | introduction et éléments narratifs      | Mosaïque asymétrique                 |
| Narrative | `NarrativeManifesto` | Exposer une conviction et ses principes       | déclaration, corps et principes         | Composition éditoriale en deux zones |
| Proof     | `ProofLogoCloud`     | Afficher des relations autorisées             | titres et logos validés                 | Liste sémantique de logos            |
| Proof     | `ProofStats`         | Afficher des chiffres sourcés                 | titres et statistiques validées         | Liste descriptive de données         |
| Proof     | `ProofQuote`         | Afficher une citation autorisée               | citation, auteur, rôle, média           | `blockquote` attribué                |
| Services  | `ServicesGrid`       | Présenter des offres de même niveau           | introduction et services                | Grille responsive de cartes          |
| Services  | `ServicesEditorial`  | Donner un traitement plus éditorial           | introduction et services                | Lignes numérotées                    |
| Services  | `ServicesFeatured`   | Mettre une prestation en avant                | introduction et services ordonnés       | Grande carte puis cartes secondaires |
| Process   | `ProcessSteps`       | Présenter des étapes indépendantes            | introduction et étapes                  | Grille de cartes numérotées          |
| Process   | `ProcessTimeline`    | Montrer une progression chronologique         | introduction et étapes                  | Liste ordonnée verticale             |
| Workflow  | `WorkflowPipeline`   | Expliquer une transformation séquentielle     | introduction, étapes et résultat        | Pipeline numéroté                    |
| Workflow  | `WorkflowRouting`    | Montrer collecte, décision et issues          | sources, décision et résultats          | Routage en colonnes                  |
| Metrics   | `MetricsDashboard`   | Présenter un état opérationnel sourcé         | introduction, indicateurs et note       | Panneau d'indicateurs                |
| Metrics   | `MetricsStrip`       | Rythmer une page avec des indicateurs         | titre et indicateurs                    | Bande descriptive compacte           |
| Gallery   | `GalleryGrid`        | Présenter plusieurs médias                    | introduction et médias                  | Mosaïque responsive                  |
| Gallery   | `GallerySpotlight`   | Donner la priorité à un média                 | introduction et médias ordonnés         | Média principal et compléments       |
| FAQ       | `FaqList`            | Afficher de longues réponses                  | introduction et questions               | Accordéons sur une colonne           |
| FAQ       | `FaqColumns`         | Afficher des questions plus courtes           | introduction et questions               | Accordéons sur deux colonnes         |
| Team      | `TeamGrid`           | Présenter les membres au même niveau          | introduction et profils                 | Grille de cartes profil              |
| Team      | `TeamSpotlight`      | Mettre un profil principal en avant           | introduction et profils ordonnés        | Grand profil puis liste secondaire   |
| Pricing   | `PricingCards`       | Comparer des formules équivalentes            | introduction et formules                | Grille de cartes tarifaires          |
| Pricing   | `PricingFeatured`    | Recommander explicitement une formule         | introduction et formules                | Offre mise en avant et alternatives  |
| CTA       | `CtaCentered`        | Conclure avec une décision simple             | introduction et actions                 | Panneau centré                       |
| CTA       | `CtaSplit`           | Ajouter du contexte à la décision             | introduction, actions et note           | Message et actions séparés           |
| CTA       | `CtaBand`            | Terminer une page avec un CTA compact         | introduction et actions                 | Bande horizontale contrastée         |

## Contrats de contenu communs

### `BlockAction`

```ts
// Décrit un lien rendu par la primitive Button.
type BlockAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "text";
};
```

### `BlockMedia`

```ts
// Le média peut être une image Next.js, une vidéo ou un composant graphique.
type BlockMedia = {
  content?: ReactNode;
  label?: string;
  ratio?: "landscape" | "portrait" | "square" | "wide";
  fit?: "cover" | "contain";
};
```

Le composant transmis dans `content` reste responsable de son texte alternatif,
de ses dimensions et de ses droits d'utilisation.

## Exemple d'utilisation

```tsx
// Importe seulement la variante choisie pour la page.
import { HeroSplit } from "@/components/blocks";

export default function ClientHomePage() {
  return (
    <HeroSplit
      // Ces valeurs doivent venir du contenu validé du client.
      eyebrow="Catégorie validée"
      title="Proposition de valeur validée"
      description="Description validée dans le site-spec."
      primaryAction={{ label: "Prendre rendez-vous", href: "/contact" }}
      media={{
        // En l'absence d'un média, le label reste visible en développement.
        label: "Photographie principale autorisée à fournir",
        ratio: "portrait",
      }}
    />
  );
}
```

## Règles de sélection

1. Une page n'utilise qu'une seule variante de Hero.
2. Une variante `Featured` suppose une priorité réelle dans les données.
3. `ProofStats`, `ProofQuote` et `ProofLogoCloud` sont interdits sans preuve ou
   autorisation vérifiable.
4. Les tarifs ne sont jamais écrits directement dans les composants.
5. Les médias finaux doivent avoir un texte alternatif et des droits confirmés.
6. Une variante supplémentaire doit répondre à un besoin de composition qui ne
   peut pas être obtenu proprement avec les variantes existantes.

## Vérification visuelle

```powershell
# Démarre le serveur local.
npm run dev
```

Ouvrir ensuite `http://localhost:3000/showroom`. Contrôler au minimum les
largeurs 320 px, 768 px, 1024 px et 1440 px, le clavier et la préférence de
mouvement réduit.

Le showroom est une route interne. Il doit être supprimé ou protégé avant la
livraison d'un dépôt client.
