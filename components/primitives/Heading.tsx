// Importe le type des propriétés HTML acceptées par un titre <h2>.
import type { ComponentPropsWithoutRef } from "react";

// Assemble les classes CSS.
import { cx } from "@/lib/cx";

// Importe les styles du CSS Module.
import styles from "./primitives.module.css";

/*
 * Liste des balises HTML autorisées.
 * Le choix de la balise dépend de la hiérarchie SEO de la page.
 */
type HeadingElement = "h1" | "h2" | "h3" | "h4";

/*
 * Liste des tailles visuelles disponibles.
 * La balise HTML et la taille visuelle restent indépendantes.
 */
type HeadingVariant = "display" | "title" | "subtitle";

/*
 * Le composant accepte les propriétés normales d’un h2,
 * ainsi que nos propriétés personnalisées.
 */
type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  // Balise HTML utilisée.
  as?: HeadingElement;

  // Apparence visuelle utilisée.
  variant?: HeadingVariant;
};

/* Associe chaque variante à sa classe CSS. */
const variantClasses: Record<HeadingVariant, string> = {
  display: styles.headingDisplay,
  title: styles.headingTitle,
  subtitle: styles.headingSubtitle,
};

export function Heading({
  // Utilise h2 si aucune balise n’est indiquée.
  as: Component = "h2",

  // Utilise la taille title par défaut.
  variant = "title",

  // Classe CSS supplémentaire facultative.
  className,

  // Contenu et autres propriétés HTML.
  ...props
}: HeadingProps) {
  return (
    <Component
      // Combine le style commun, la variante et la classe externe.
      className={cx(styles.heading, variantClasses[variant], className)}

      // Transmet children, id, aria-label, etc.
      {...props}
    />
  );
}
