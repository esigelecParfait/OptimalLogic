// Récupère les propriétés acceptées par un élément <div>.
import type { ComponentPropsWithoutRef } from "react";

// Importe l'utilitaire de combinaison des classes.
import { cx } from "@/lib/cx";

// Importe les styles isolés.
import styles from "./primitives.module.css";

/*
 * Liste des espacements autorisés.
 */
type StackGap = "small" | "medium" | "large" | "extraLarge";

/*
 * Le composant reçoit les propriétés normales d'une div
 * et une propriété gap facultative.
 */
type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: StackGap;
};

/*
 * Associe chaque option à la classe CSS correspondante.
 */
const gapClasses: Record<StackGap, string> = {
  small: styles.gapSmall,
  medium: styles.gapMedium,
  large: styles.gapLarge,
  extraLarge: styles.gapExtraLarge,
};

export function Stack({
  // L'espacement moyen est appliqué par défaut.
  gap = "medium",

  // Classe supplémentaire facultative.
  className,

  // Contenu et autres propriétés HTML.
  ...props
}: StackProps) {
  return (
    <div
      /*
       * La première classe active le mode vertical.
       * La deuxième sélectionne l'espacement.
       */
      className={cx(styles.stack, gapClasses[gap], className)}

      // Ajoute les propriétés restantes sur la div.
      {...props}
    />
  );
}
