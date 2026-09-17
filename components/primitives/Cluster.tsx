// Importe les propriétés HTML acceptées par une balise <div>.
import type { ComponentPropsWithoutRef } from "react";

// Importe notre fonction d'assemblage des classes CSS.
import { cx } from "@/lib/cx";

// Importe les styles locaux des primitives.
import styles from "./primitives.module.css";

// Définit les espacements autorisés entre les enfants.
type ClusterGap = "small" | "medium" | "large";

// Définit les alignements horizontaux autorisés.
type ClusterJustify = "start" | "center" | "end" | "between";

// Définit les alignements verticaux autorisés.
type ClusterAlign = "start" | "center" | "end" | "stretch";

// Ajoute nos propriétés personnalisées aux propriétés normales d'un <div>.
type ClusterProps = ComponentPropsWithoutRef<"div"> & {
  gap?: ClusterGap;
  justify?: ClusterJustify;
  align?: ClusterAlign;
};

// Associe chaque valeur d'espacement à sa classe CSS.
const gapClassNames: Record<ClusterGap, string> = {
  small: styles.clusterGapSmall,
  medium: styles.clusterGapMedium,
  large: styles.clusterGapLarge,
};

// Associe chaque alignement horizontal à sa classe CSS.
const justifyClassNames: Record<ClusterJustify, string> = {
  start: styles.clusterJustifyStart,
  center: styles.clusterJustifyCenter,
  end: styles.clusterJustifyEnd,
  between: styles.clusterJustifyBetween,
};

// Associe chaque alignement vertical à sa classe CSS.
const alignClassNames: Record<ClusterAlign, string> = {
  start: styles.clusterAlignStart,
  center: styles.clusterAlignCenter,
  end: styles.clusterAlignEnd,
  stretch: styles.clusterAlignStretch,
};

// Exporte le composant pour pouvoir l'utiliser dans les futurs blocs.
export function Cluster({
  // Contenu placé entre <Cluster> et </Cluster>.
  children,

  // Classe CSS supplémentaire éventuellement fournie par le parent.
  className,

  // Valeurs par défaut du groupe.
  gap = "medium",
  justify = "start",
  align = "center",

  // Récupère les autres propriétés HTML.
  ...props
}: ClusterProps) {
  return (
    <div
      // Assemble la base et les variantes demandées.
      className={cx(
        styles.cluster,
        gapClassNames[gap],
        justifyClassNames[justify],
        alignClassNames[align],
        className,
      )}

      // Transmet les propriétés restantes à la balise HTML.
      {...props}
    >
      {/* Affiche les éléments contenus dans le groupe. */}
      {children}
    </div>
  );
}
