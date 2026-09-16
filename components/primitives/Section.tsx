import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type SectionTone = "canvas" | "surface" | "muted" | "inverse";
type SectionTreatment = "open" | "line" | "soft" | "immersive";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  treatment?: SectionTreatment;
};

const toneClasses: Record<SectionTone, string> = {
  canvas: styles.toneCanvas,
  surface: styles.toneSurface,
  muted: styles.toneMuted,
  inverse: styles.toneInverse,
};

const treatmentClasses: Record<SectionTreatment, string> = {
  open: styles.sectionOpen,
  line: styles.sectionLine,
  soft: styles.sectionSoft,
  immersive: styles.sectionImmersive,
};

export function Section({
  tone = "canvas",
  treatment = "open",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cx(
        styles.section,
        toneClasses[tone],
        treatmentClasses[treatment],
        className,
      )}
      data-section-treatment={treatment}
      {...props}
    />
  );
}
