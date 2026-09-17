// Récupère les propriétés HTML autorisées pour une balise <section>.
import type { ComponentPropsWithoutRef } from "react";

// Fonction permettant de combiner les classes.
import { cx } from "@/lib/cx";

// Styles isolés du CSS Module.
import styles from "./primitives.module.css";

/*
 * Seules ces trois variantes de fond sont autorisées.
 */
type SectionTone = "canvas" | "surface" | "muted";
type SectionTreatment = "open" | "line" | "soft" | "immersive";

/*
 * Le composant accepte toutes les propriétés HTML d'une section,
 * auxquelles nous ajoutons la propriété facultative "tone".
 */
type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  treatment?: SectionTreatment;
};

/*
 * Associe chaque valeur de tone à sa classe CSS.
 */
const toneClasses: Record<SectionTone, string> = {
  canvas: styles.sectionCanvas,
  surface: styles.sectionSurface,
  muted: styles.sectionMuted,
};

const treatmentClasses: Record<SectionTreatment, string> = {
  open: styles.sectionOpen,
  line: styles.sectionLine,
  soft: styles.sectionSoft,
  immersive: styles.sectionImmersive,
};

export function Section({
  // Le fond principal est utilisé par défaut.
  tone = "canvas",
  treatment = "open",

  // Permet d'ajouter une classe supplémentaire.
  className,

  // Récupère les autres propriétés et le contenu.
  ...props
}: SectionProps) {
  return (
    <section
      /*
       * Ajoute la classe structurelle "section",
       * puis la classe correspondant à la couleur de fond.
       */
      className={cx(
        styles.section,
        toneClasses[tone],
        treatmentClasses[treatment],
        className,
      )}

      data-section-treatment={treatment}

      // Transmet children, id, aria-label, etc.
      {...props}
    />
  );
}
