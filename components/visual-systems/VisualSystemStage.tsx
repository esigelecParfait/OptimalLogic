"use client";

import type { CSSProperties } from "react";

import { getVisualSystemVariant } from "@/design-system/visual-systems";

import styles from "./visual-systems.module.css";

type Props = {
  variantId: string;
  animated?: boolean;
  revision?: number;
};

export function VisualSystemStage({ variantId, animated = true, revision = 0 }: Props) {
  const variant = getVisualSystemVariant(variantId);
  return (
    <figure
      key={`${variant.id}-${revision}`}
      className={styles.stage}
      data-family={variant.family}
      data-variant={variant.id}
      data-animated={animated}
      aria-label={variant.accessibilityLabel}
    >
      <div className={styles.visual} aria-hidden="true">
        {variant.family === "diagram" && <Diagram />}
        {variant.family === "flow" && <Flow />}
        {variant.family === "interface" && <IllustrativeInterface />}
        {variant.family === "chart" && <NarrativeChart variantId={variant.id} />}
        {variant.family === "transformation" && <Transformation />}
      </div>
      <figcaption>
        <strong>{variant.label}</strong>
        <span>{variant.purpose}</span>
        <small>Démonstration fictive · {variant.density}</small>
      </figcaption>
    </figure>
  );
}

function Diagram() {
  return (
    <div className={styles.diagram}>
      <svg viewBox="0 0 600 330">
        <path
          className={styles.connector}
          d="M300 165 L110 70 M300 165 L490 70 M300 165 L110 260 M300 165 L490 260"
        />
        <path
          className={styles.connectorAlt}
          d="M110 70 C250 20 350 20 490 70 M110 260 C250 310 350 310 490 260"
        />
      </svg>
      <div className={styles.diagramCore}>Système</div>
      {["Signal", "Règle", "Action", "Suivi"].map((item, index) => (
        <div
          className={styles.diagramNode}
          style={{ "--index": index } as CSSProperties}
          key={item}
        >
          <i />
          {item}
        </div>
      ))}
    </div>
  );
}

function Flow() {
  return (
    <div className={styles.flow}>
      {["Entrée", "Lecture", "Décision", "Action"].map((item, index) => (
        <div
          className={styles.flowStep}
          style={{ "--index": index } as CSSProperties}
          key={item}
        >
          <span>0{index + 1}</span>
          <strong>{item}</strong>
        </div>
      ))}
      <svg viewBox="0 0 600 180">
        <path pathLength="1" d="M70 90 C160 20 205 160 300 90 S440 20 530 90" />
      </svg>
    </div>
  );
}

function IllustrativeInterface() {
  return (
    <div className={styles.interfaceShell}>
      <aside>
        <i />
        <i />
        <i />
        <i />
      </aside>
      <section>
        <header>
          <span>Aperçu fictif</span>
          <b>···</b>
        </header>
        <div className={styles.interfaceGrid}>
          {["À examiner", "En cours", "Prochaine action"].map((item, index) => (
            <article key={item}>
              <small>{item}</small>
              <strong>Repère 0{index + 1}</strong>
              <i />
            </article>
          ))}
        </div>
        <div className={styles.interfaceRows}>
          <i />
          <i />
          <i />
        </div>
      </section>
    </div>
  );
}

function NarrativeChart({ variantId }: { variantId: string }) {
  const isRound = variantId === "chart-donut";
  return (
    <div className={styles.chart}>
      <div className={styles.chartLegend}>
        <span>Indice fictif A</span>
        <span>Indice fictif B</span>
      </div>
      {isRound ? (
        <div className={styles.donut}>
          <span>A / B</span>
        </div>
      ) : (
        <svg viewBox="0 0 600 260" role="presentation">
          <path
            className={styles.gridLine}
            d="M45 35 H570 M45 95 H570 M45 155 H570 M45 215 H570"
          />
          <path
            className={styles.chartArea}
            d="M45 205 C120 190 145 95 220 125 S335 205 410 105 S505 45 570 65 L570 220 L45 220Z"
          />
          <path
            className={styles.chartLine}
            pathLength="1"
            d="M45 205 C120 190 145 95 220 125 S335 205 410 105 S505 45 570 65"
          />
        </svg>
      )}
      <p>Lecture narrative — aucune donnée client réelle.</p>
    </div>
  );
}

function Transformation() {
  return (
    <div className={styles.transformation}>
      <section className={styles.before}>
        <span>Avant</span>
        <strong>Signal dispersé</strong>
        <div>
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>
      <div className={styles.transformArrow}>→</div>
      <section className={styles.after}>
        <span>Après</span>
        <strong>Parcours clarifié</strong>
        <div>
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>
    </div>
  );
}
