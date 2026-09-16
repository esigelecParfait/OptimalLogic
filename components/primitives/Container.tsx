import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type ContainerSize = "text" | "content" | "wide";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

const sizeClasses: Record<ContainerSize, string> = {
  text: styles.containerText,
  content: styles.containerContent,
  wide: styles.containerWide,
};

export function Container({ size = "content", className, ...props }: ContainerProps) {
  return (
    <div className={cx(styles.container, sizeClasses[size], className)} {...props} />
  );
}
