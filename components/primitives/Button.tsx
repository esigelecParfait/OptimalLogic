import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "@/lib/cx";

import styles from "./primitives.module.css";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.buttonPrimary,
      secondary: styles.buttonSecondary,
      text: styles.buttonText,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    href?: string;
  };

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  ...buttonProps
}: ButtonProps) {
  const classes = cx(buttonVariants({ variant }), className);

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
