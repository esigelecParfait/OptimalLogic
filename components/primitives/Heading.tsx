import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type HeadingVariant = "hero" | "display" | "title" | "subtitle";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: Extract<ElementType, "h1" | "h2" | "h3" | "h4">;
  variant?: HeadingVariant;
};

const variantClasses: Record<HeadingVariant, string> = {
  hero: styles.headingHero,
  display: styles.headingDisplay,
  title: styles.headingTitle,
  subtitle: styles.headingSubtitle,
};

export function Heading({
  as: Component = "h2",
  variant = "title",
  className,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cx(styles.heading, variantClasses[variant], className)}
      {...props}
    />
  );
}
