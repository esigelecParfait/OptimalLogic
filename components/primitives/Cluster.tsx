import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type ClusterJustify = "start" | "center" | "end" | "between";
type ClusterAlign = "start" | "center" | "end" | "stretch";

type ClusterProps = ComponentPropsWithoutRef<"div"> & {
  gap?: "small" | "medium" | "large";
  justify?: ClusterJustify;
  align?: ClusterAlign;
};

const gapClasses = {
  small: styles.gapSm,
  medium: styles.gapMd,
  large: styles.gapLg,
};

const justifyClasses: Record<ClusterJustify, string> = {
  start: styles.clusterStart,
  center: styles.clusterCenter,
  end: styles.clusterEnd,
  between: styles.clusterBetween,
};

const alignClasses: Record<ClusterAlign, string> = {
  start: styles.clusterAlignStart,
  center: styles.clusterAlignCenter,
  end: styles.clusterAlignEnd,
  stretch: styles.clusterAlignStretch,
};

export function Cluster({
  gap = "medium",
  justify = "start",
  align = "center",
  className,
  ...props
}: ClusterProps) {
  return (
    <div
      className={cx(
        styles.cluster,
        gapClasses[gap],
        justifyClasses[justify],
        alignClasses[align],
        className,
      )}
      {...props}
    />
  );
}
