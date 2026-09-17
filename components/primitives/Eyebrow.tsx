// Récupère les propriétés HTML d’un paragraphe.
import type { ComponentPropsWithoutRef } from "react";

// Assemble les classes CSS.
import { cx } from "@/lib/cx";

// Importe les styles.
import styles from "./primitives.module.css";

export function Eyebrow({
  // Classe supplémentaire facultative.
  className,

  // Contenu et autres propriétés HTML.
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      // Applique la classe eyebrow et une éventuelle classe externe.
      className={cx(styles.eyebrow, className)}

      // Transmet children et les autres propriétés.
      {...props}
    />
  );
}
