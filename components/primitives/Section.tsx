import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type SectionTone = "canvas" | "surface" | "muted" | "inverse";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
};

const toneClasses: Record<SectionTone, string> = {
  canvas: styles.toneCanvas,
  surface: styles.toneSurface,
  muted: styles.toneMuted,
  inverse: styles.toneInverse,
};

export function Section({ tone = "canvas", className, ...props }: SectionProps) {
  return (
    <section className={cx(styles.section, toneClasses[tone], className)} {...props} />
  );
}
