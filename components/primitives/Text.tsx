import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type TextVariant = "body" | "lead" | "small";

type TextProps = ComponentPropsWithoutRef<"p"> & {
  variant?: TextVariant;
};

const variantClasses: Record<TextVariant, string> = {
  body: styles.textBody,
  lead: styles.textLead,
  small: styles.textSmall,
};

export function Text({ variant = "body", className, ...props }: TextProps) {
  return <p className={cx(styles.text, variantClasses[variant], className)} {...props} />;
}
