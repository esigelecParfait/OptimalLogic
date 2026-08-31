import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

// Les unions empêchent un appelant de demander une variante inexistante.
type GridColumns = 1 | 2 | 3 | 4;
type GridGap = "small" | "medium" | "large";
type GridAlign = "start" | "stretch";

// Grid conserve toutes les propriétés natives d'une balise <div>.
type GridProps = ComponentPropsWithoutRef<"div"> & {
  columns?: GridColumns;
  gap?: GridGap;
  align?: GridAlign;
};

// Chaque option TypeScript est reliée à une classe du CSS Module.
const columnClasses: Record<GridColumns, string> = {
  1: styles.gridColumns1,
  2: styles.gridColumns2,
  3: styles.gridColumns3,
  4: styles.gridColumns4,
};

const gapClasses: Record<GridGap, string> = {
  small: styles.gridGapSm,
  medium: styles.gridGapMd,
  large: styles.gridGapLg,
};

const alignClasses: Record<GridAlign, string> = {
  start: styles.gridAlignStart,
  stretch: styles.gridAlignStretch,
};

// Grid renvoie une <div> CSS Grid qui devient responsive automatiquement.
export function Grid({
  columns = 3,
  gap = "medium",
  align = "stretch",
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cx(
        styles.grid,
        columnClasses[columns],
        gapClasses[gap],
        alignClasses[align],
        className,
      )}
      {...props}
    />
  );
}
