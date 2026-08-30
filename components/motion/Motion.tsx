"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

import { cx } from "@/lib/cx";

import styles from "./motion.module.css";

export type MotionPreset = "fade" | "rise" | "scale" | "clip";

type MotionState = "hidden" | "visible";

function useMotionVisibility(once: boolean) {
  const reference = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<MotionState>("visible");

  useEffect(() => {
    const node = reference.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!node || reducedMotion.matches || !("IntersectionObserver" in window)) {
      setState("visible");
      return;
    }

    const rectangle = node.getBoundingClientRect();
    const alreadyVisible = rectangle.top < window.innerHeight && rectangle.bottom > 0;

    if (alreadyVisible) {
      setState("visible");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          if (once) observer.disconnect();
        } else if (!once) {
          setState("hidden");
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return { reference, state };
}

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  preset?: MotionPreset;
  delay?: "none" | "short" | "medium";
  once?: boolean;
};

export function MotionReveal({
  children,
  className,
  preset = "rise",
  delay = "none",
  once = true,
}: MotionRevealProps) {
  const { reference, state } = useMotionVisibility(once);

  return (
    <div
      className={cx(styles.reveal, className)}
      data-motion-delay={delay}
      data-motion-preset={preset}
      data-motion-state={state}
      ref={reference as RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
}

type MotionGroupProps = {
  children: ReactNode;
  className?: string;
  preset?: MotionPreset;
  as?: "div" | "ul" | "ol";
  once?: boolean;
  label?: string;
};

export function MotionGroup({
  children,
  className,
  preset = "rise",
  as: Component = "div",
  once = true,
  label,
}: MotionGroupProps) {
  const { reference, state } = useMotionVisibility(once);

  return (
    <Component
      aria-label={label}
      className={cx(styles.group, className)}
      data-motion-preset={preset}
      data-motion-state={state}
      ref={reference as RefObject<HTMLDivElement & HTMLUListElement & HTMLOListElement>}
    >
      {children}
    </Component>
  );
}

type MotionItemProps = {
  children: ReactNode;
  className?: string;
  order?: number;
  as?: "div" | "li";
};

export function MotionItem({
  children,
  className,
  order = 0,
  as: Component = "div",
}: MotionItemProps) {
  const style = { "--ol-motion-order": Math.min(Math.max(order, 0), 5) } as CSSProperties;

  return (
    <Component className={cx(styles.item, className)} style={style}>
      {children}
    </Component>
  );
}
