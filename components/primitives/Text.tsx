// Récupère les propriétés HTML d’un paragraphe.
import type { ComponentPropsWithoutRef } from "react";

// Assemble les classes.
import { cx } from "@/lib/cx";

// Importe les styles isolés.
import styles from "./primitives.module.css";

/* Variantes de paragraphes disponibles. */
type TextVariant = "body" | "lead" | "small";

/*
 * Ajoute la propriété variant aux propriétés normales d’un paragraphe.
 */
type TextProps = ComponentPropsWithoutRef<"p"> & {
  variant?: TextVariant;
};

/* Associe chaque variante à sa classe CSS. */
const variantClasses: Record<TextVariant, string> = {
  body: styles.textBody,
  lead: styles.textLead,
  small: styles.textSmall,
};

export function Text({
  // Le paragraphe standard est utilisé par défaut.
  variant = "body",

  // Classe supplémentaire facultative.
  className,

  // Contenu et autres propriétés.
  ...props
}: TextProps) {
  return (
    <p
      // Applique le style commun et la variante sélectionnée.
      className={cx(styles.text, variantClasses[variant], className)}

      // Transmet les propriétés restantes au paragraphe.
      {...props}
    />
  );
}
