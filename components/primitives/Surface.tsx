// Importe le type des propriétés acceptées par une balise HTML <div>.
import type { ComponentPropsWithoutRef } from "react";

// Importe notre fonction qui assemble plusieurs noms de classes CSS.
import { cx } from "@/lib/cx";

// Importe les classes locales du fichier CSS Module.
import styles from "./primitives.module.css";

// Définit les deux niveaux d'élévation autorisés.
type SurfaceElevation = "flat" | "raised";

export type SurfaceAppearance =
  "open" | "soft" | "line" | "floating" | "layered" | "immersive";

// Définit les deux couleurs de fond disponibles.
type SurfaceTone = "default" | "muted";

// Définit les niveaux de remplissage intérieur disponibles.
type SurfacePadding = "none" | "small" | "medium" | "large";

// La Surface accepte toutes les propriétés normales d'une balise <div>.
//
// L'opérateur "&" fusionne les propriétés HTML avec nos propriétés
// personnalisées : elevation, tone et padding.
type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  elevation?: SurfaceElevation;
  appearance?: SurfaceAppearance;
  tone?: SurfaceTone;
  padding?: SurfacePadding;
};

// Associe chaque valeur de padding à sa classe CSS.
//
// Record<SurfacePadding, string> oblige TypeScript à vérifier
// que les quatre valeurs possibles possèdent bien une classe.
const paddingClassNames: Record<SurfacePadding, string> = {
  none: styles.surfacePaddingNone,
  small: styles.surfacePaddingSmall,
  medium: styles.surfacePaddingMedium,
  large: styles.surfacePaddingLarge,
};

const appearanceClassNames: Record<SurfaceAppearance, string> = {
  open: styles.surfaceOpen,
  soft: styles.surfaceSoft,
  line: styles.surfaceLine,
  floating: styles.surfaceFloating,
  layered: styles.surfaceLayered,
  immersive: styles.surfaceImmersive,
};

// Exporte le composant pour pouvoir l'utiliser dans les futurs blocs.
export function Surface({
  // Récupère le contenu placé entre <Surface> et </Surface>.
  children,

  // Permet d'ajouter une classe personnalisée depuis l'extérieur.
  className,

  // Définit les valeurs utilisées lorsque ces propriétés sont absentes.
  elevation = "flat",
  appearance,
  tone = "default",
  padding = "medium",

  // Récupère les autres propriétés HTML :
  // id, aria-label, data-*, onClick, etc.
  ...props
}: SurfaceProps) {
  const resolvedAppearance = appearance ?? (elevation === "raised" ? "floating" : "open");

  return (
    <div
      // cx assemble uniquement les classes nécessaires.
      className={cx(
        // Classe commune à toutes les surfaces.
        styles.surface,

        // Ajoute le fond atténué seulement si tone vaut "muted".
        tone === "muted" && styles.surfaceMuted,

        appearanceClassNames[resolvedAppearance],

        // Sélectionne la classe correspondant au remplissage demandé.
        paddingClassNames[padding],

        // Ajoute enfin une éventuelle classe fournie par le parent.
        className,
      )}

      data-surface={resolvedAppearance}

      // Transmet toutes les autres propriétés à la balise <div>.
      {...props}
    >
      {/* Affiche le contenu placé à l'intérieur de la Surface. */}
      {children}
    </div>
  );
}
