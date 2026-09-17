"use client";

import dynamic from "next/dynamic";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useEffect } from "react";

import { getMotionPreset, motionTokens } from "@/design-system/motion";

import styles from "./motion.module.css";

const WebGLStage = dynamic(
  () => import("./WebGLStage").then((module) => module.WebGLStage),
  {
    ssr: false,
    loading: () => <div className={styles.webglFallback}>Chargement de la scène 3D…</div>,
  },
);

type Props = {
  presetId: string;
  revision: number;
  paused: boolean;
  speed: number;
  forceReduced?: boolean;
};

export function MotionStage({
  presetId,
  revision,
  paused,
  speed,
  forceReduced = false,
}: Props) {
  const preset = getMotionPreset(presetId);
  const systemReduced = useReducedMotion();
  const controls = useAnimationControls();
  const reduced = forceReduced || systemReduced;
  const duration = reduced ? 0 : motionTokens.duration.slow / speed;
  const state = paused ? "paused" : "running";

  useEffect(() => {
    if (paused) {
      controls.stop();
      return;
    }
    void controls.start("visible");
  }, [controls, paused, presetId, reduced, revision, speed]);

  if (preset.family === "webgl")
    return reduced ? (
      <StaticStage label={preset.label} />
    ) : (
      <WebGLStage variant={preset.id} paused={paused} speed={speed} />
    );
  if (preset.family === "svg")
    return (
      <div className={styles.stage} data-play-state={state}>
        <svg
          className={styles.diagram}
          viewBox="0 0 600 260"
          role="img"
          aria-label={preset.label}
        >
          <path
            key={revision}
            className={styles.path}
            pathLength="1"
            d={
              preset.id === "svg-orbit"
                ? "M300 130 C390 15 535 60 500 150 C465 240 305 240 300 130 C295 20 130 20 95 115 C60 210 210 255 300 130"
                : "M45 190 C130 25 220 235 300 90 S470 35 555 165"
            }
          />
          <circle className={styles.node} cx="45" cy="190" r="12" />
          <circle className={styles.node} cx="300" cy="90" r="12" />
          <circle className={styles.node} cx="555" cy="165" r="12" />
        </svg>
      </div>
    );
  if (preset.family === "typography")
    return (
      <div className={styles.stage} data-play-state={state}>
        <motion.p
          key={revision}
          className={`${styles.typeDemo} ${styles[preset.id]}`}
          initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration }}
        >
          Transformer le signal en décision.
        </motion.p>
      </div>
    );
  if (preset.family === "scroll")
    return (
      <div className={styles.stage} data-play-state={state}>
        <motion.div
          key={revision}
          className={`${styles.sequence} ${styles[preset.id]}`}
          initial={reduced ? false : "hidden"}
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: motionTokens.stagger.base / speed },
            },
          }}
        >
          {["Observer", "Structurer", "Décider", "Agir"].map((item, index) => (
            <motion.article
              key={item}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration } },
              }}
            >
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </motion.article>
          ))}
        </motion.div>
      </div>
    );
  return (
    <div className={styles.stage} data-play-state={state}>
      <button
        key={revision}
        className={`${styles.microDemo} ${styles[preset.id]}`}
        type="button"
      >
        <span className={styles.microIcon}>↗</span>
        <span>{preset.label}</span>
      </button>
      {preset.family === "css3d" && (
        <div key={`3d-${revision}`} className={`${styles.css3d} ${styles[preset.id]}`}>
          <div>Optimal</div>
          <div>Logic</div>
          <div>Motion</div>
        </div>
      )}
    </div>
  );
}

function StaticStage({ label }: { label: string }) {
  return (
    <div className={styles.webglFallback}>
      <strong>{label}</strong>
      <span>État final statique — mouvement réduit</span>
    </div>
  );
}
