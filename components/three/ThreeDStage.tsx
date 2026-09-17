"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { getThreeDVariant } from "@/design-system/three-d";

import styles from "./three-d.module.css";

const WebGLScene = dynamic(
  () => import("./WebGLScene").then((module) => module.WebGLScene),
  {
    ssr: false,
    loading: () => <StaticFallback label="Chargement différé de la scène" />,
  },
);

type Props = {
  variantId: string;
  paused?: boolean;
  forceReduced?: boolean;
  revision?: number;
};

export function ThreeDStage({
  variantId,
  paused = false,
  forceReduced = false,
  revision = 0,
}: Props) {
  const variant = getThreeDVariant(variantId);
  const systemReduced = useReducedMotion();
  const reduced = forceReduced || Boolean(systemReduced);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (variant.family !== "webgl") return;
    const frame = window.requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebglAvailable(
          Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")),
        );
      } catch {
        setWebglAvailable(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [variant.family]);

  if (reduced)
    return <StaticFallback label={variant.fallback} reason="Mouvement réduit" />;

  if (variant.family === "webgl")
    return webglAvailable ? (
      <WebGLScene
        key={`${variant.id}-${revision}`}
        variantId={variant.id}
        paused={paused}
      />
    ) : (
      <StaticFallback
        label={variant.fallback}
        reason={webglAvailable === false ? "WebGL indisponible" : "Préparation WebGL"}
      />
    );

  return (
    <div
      className={`${styles.stage} ${styles[variant.family]}`}
      data-variant={variant.id}
      data-play-state={paused ? "paused" : "running"}
      aria-label={`${variant.label} — démonstration 3D`}
    >
      <div className={styles.ambient} />
      <div className={styles.scene}>
        {["Signal", "Décision", "Impact", "Suivi"].map((label, index) => (
          <article
            className={styles.panel}
            style={{ "--index": index } as React.CSSProperties}
            key={label}
          >
            <span>0{index + 1}</span>
            <strong>{label}</strong>
            <i />
          </article>
        ))}
        <div className={styles.core} aria-hidden="true">
          <span>OL</span>
        </div>
      </div>
    </div>
  );
}

function StaticFallback({ label, reason }: { label: string; reason?: string }) {
  return (
    <div
      className={styles.fallback}
      data-static-fallback="true"
      role="img"
      aria-label={label}
    >
      <div className={styles.fallbackDiagram} aria-hidden="true">
        <i />
        <i />
        <i />
        <span>OL</span>
      </div>
      <strong>{label}</strong>
      {reason && <small>{reason}</small>}
    </div>
  );
}
