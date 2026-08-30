import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type Gap = "small" | "medium" | "large" | "extraLarge";

type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: Gap;
};

const gapClasses: Record<Gap, string> = {
  small: styles.gapSm,
  medium: styles.gapMd,
  large: styles.gapLg,
  extraLarge: styles.gapXl,
};

export function Stack({ gap = "medium", className, ...props }: StackProps) {
  return <div className={cx(styles.stack, gapClasses[gap], className)} {...props} />;
}
