import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type MediaRatio = "landscape" | "portrait" | "square" | "wide";
type MediaFit = "cover" | "contain";

type MediaFrameProps = ComponentPropsWithoutRef<"div"> & {
  label?: string;
  ratio?: MediaRatio;
  fit?: MediaFit;
};

const ratioClasses: Record<MediaRatio, string> = {
  landscape: styles.ratioLandscape,
  portrait: styles.ratioPortrait,
  square: styles.ratioSquare,
  wide: styles.ratioWide,
};

const fitClasses: Record<MediaFit, string> = {
  cover: styles.mediaCover,
  contain: styles.mediaContain,
};

export function MediaFrame({
  children,
  className,
  label = "Emplacement média — remplacer par un visuel autorisé",
  ratio = "landscape",
  fit = "cover",
  ...props
}: MediaFrameProps) {
  return (
    <div
      className={cx(styles.mediaFrame, ratioClasses[ratio], fitClasses[fit], className)}
      {...props}
    >
      {children ?? <span className={styles.mediaLabel}>{label}</span>}
    </div>
  );
}
