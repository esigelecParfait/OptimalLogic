import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./primitives.module.css";

type Common = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
};
type ButtonProps = Common &
  (
    | ({ href: string; loading?: never; disabled?: never } & Omit<
        ComponentPropsWithoutRef<typeof Link>,
        keyof Common | "href"
      >)
    | ({ href?: undefined; loading?: boolean } & Omit<
        ComponentPropsWithoutRef<"button">,
        keyof Common
      >)
  );

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", size = "medium" } = props;
  const variants = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    text: styles.buttonText,
  };
  const classes = cx(styles.button, variants[variant], className);
  if (props.href !== undefined) {
    const {
      href,
      children: label,
      className: _class,
      variant: _variant,
      size: _size,
      ...linkProps
    } = props;
    void _class;
    void _variant;
    void _size;
    return (
      <Link {...linkProps} href={href} className={classes} data-size={size}>
        {label}
      </Link>
    );
  }
  const {
    loading = false,
    disabled,
    type = "button",
    href: _href,
    children: _children,
    className: _class,
    variant: _variant,
    size: _size,
    ...buttonProps
  } = props;
  void _href;
  void _children;
  void _class;
  void _variant;
  void _size;
  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      data-size={size}
    >
      {loading ? "Chargement…" : children}
    </button>
  );
}
