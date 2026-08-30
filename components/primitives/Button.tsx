import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

type ButtonVariant = "primary" | "secondary" | "text";

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  text: styles.buttonText,
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  ...buttonProps
}: ButtonProps) {
  const classes = cx(styles.button, variantClasses[variant], className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
