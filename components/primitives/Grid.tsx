// Importe les propriétés HTML acceptées par une balise <div>.
import type { ComponentPropsWithoutRef } from "react";

// Importe la fonction qui assemble plusieurs classes CSS.
import { cx } from "@/lib/cx";

// Importe les styles locaux des primitives.
import styles from "./primitives.module.css";

// Limite la grille à un maximum de quatre colonnes.
type GridColumns = 1 | 2 | 3 | 4;

// Définit les niveaux d'espacement disponibles.
type GridGap = "small" | "medium" | "large";

// Définit les alignements verticaux disponibles.
type GridAlign = "start" | "stretch";

// Fusionne les propriétés normales d'un <div>
// avec les propriétés personnalisées de Grid.
type GridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: GridColumns;
  gap?: GridGap;
  align?: GridAlign;
};

// Associe chaque nombre de colonnes à une classe CSS.
const columnClassNames: Record<GridColumns, string> = {
  1: styles.gridColumns1,
  2: styles.gridColumns2,
  3: styles.gridColumns3,
  4: styles.gridColumns4,
};

// Associe chaque niveau d'espacement à une classe CSS.
const gapClassNames: Record<GridGap, string> = {
  small: styles.gridGapSmall,
  medium: styles.gridGapMedium,
  large: styles.gridGapLarge,
};

// Associe chaque alignement à une classe CSS.
const alignClassNames: Record<GridAlign, string> = {
  start: styles.gridAlignStart,
  stretch: styles.gridAlignStretch,
};

// Exporte le composant pour les futurs blocs.
export function Grid({
  // Contenu placé entre <Grid> et </Grid>.
  children,

  // Classe CSS supplémentaire éventuellement fournie par le parent.
  className,

  // Valeurs utilisées lorsqu'aucune option n'est précisée.
  columns = 3,
  gap = "medium",
  align = "stretch",

  // Récupère les autres propriétés HTML.
  ...props
}: GridProps) {
  return (
    <div
      // Assemble les classes correspondant aux options demandées.
      className={cx(
        styles.grid,
        columnClassNames[columns],
        gapClassNames[gap],
        alignClassNames[align],
        className,
      )}

      // Transmet les propriétés restantes à la balise <div>.
      {...props}
    >
      {/* Affiche les éléments contenus dans la grille. */}
      {children}
    </div>
  );
}
