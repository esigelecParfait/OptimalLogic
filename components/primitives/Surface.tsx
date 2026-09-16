import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  elevation?: "flat" | "raised" | "floating";
  padding?: "none" | "small" | "medium" | "large";
  appearance?:
    | "open"
    | "soft"
    | "line"
    | "floating"
    | "layered"
    | "immersive"
    | "solid"
    | "glass"
    | "accent";
  interactive?: boolean;
};

const elevationClasses = {
  flat: styles.surfaceFlat,
  raised: styles.surfaceRaised,
  floating: styles.surfaceFloating,
};

const appearanceClasses = {
  open: styles.surfaceOpen,
  soft: styles.surfaceSoft,
  line: styles.surfaceLine,
  floating: styles.surfaceAppearanceFloating,
  layered: styles.surfaceLayered,
  immersive: styles.surfaceImmersive,
  solid: styles.surfaceSolid,
  glass: styles.surfaceGlass,
  accent: styles.surfaceAccent,
};

const paddingClasses = {
  none: styles.surfacePaddingNone,
  small: styles.surfacePaddingSm,
  medium: styles.surfacePaddingMd,
  large: styles.surfacePaddingLg,
};

export function Surface({
  elevation = "flat",
  padding = "medium",
  appearance = "open",
  interactive = false,
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cx(
        styles.surface,
        elevationClasses[elevation],
        appearanceClasses[appearance],
        interactive && styles.surfaceInteractive,
        paddingClasses[padding],
        className,
      )}
      data-surface={appearance}
      {...props}
    />
  );
}
