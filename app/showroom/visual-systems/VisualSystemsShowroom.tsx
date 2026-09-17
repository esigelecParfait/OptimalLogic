"use client";

import { useState } from "react";

import { Button } from "@/components/primitives";
import { VisualSystemStage } from "@/components/visual-systems";
import { themes, type ThemeId } from "@/design-system/themes";
import {
  visualSystemFamilies,
  visualSystemVariants,
} from "@/design-system/visual-systems";

import styles from "./visual-systems-showroom.module.css";

export function VisualSystemsShowroom() {
  const [theme, setTheme] = useState<ThemeId>("technology");
  const [primary, setPrimary] = useState("diagram-radial");
  const [secondary, setSecondary] = useState("interface-dashboard");
  const [compare, setCompare] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [revision, setRevision] = useState(0);
  const replay = () => {
    setAnimated(true);
    setRevision((value) => value + 1);
  };
  return (
    <div className={styles.shell} data-theme={theme}>
      <header className={styles.header}>
        <p>Étape 7 · Systèmes visuels</p>
        <h1>30 compositions pour expliquer, pas décorer.</h1>
        <span>
          Diagrammes, flux, interfaces fictives, récits de données et transformations.
        </span>
      </header>
      <aside className={styles.controls} aria-label="Contrôles des systèmes visuels">
        <label>
          Thème
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as ThemeId)}
          >
            {themes.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Composition A
          <select
            value={primary}
            onChange={(event) => {
              setPrimary(event.target.value);
              replay();
            }}
          >
            {visualSystemVariants.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label} · {item.density}
              </option>
            ))}
          </select>
        </label>
        <label>
          Composition B
          <select
            value={secondary}
            disabled={!compare}
            onChange={(event) => {
              setSecondary(event.target.value);
              replay();
            }}
          >
            {visualSystemVariants.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label} · {item.density}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.actions}>
          <Button type="button" onClick={() => setAnimated((value) => !value)}>
            {animated ? "Figer" : "Animer"}
          </Button>
          <Button type="button" variant="secondary" onClick={replay}>
            Relancer
          </Button>
        </div>
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={compare}
            onChange={(event) => setCompare(event.target.checked)}
          />{" "}
          Comparer
        </label>
      </aside>
      <main className={compare ? styles.comparison : styles.single} id="main-content">
        <section>
          <h2>Composition A</h2>
          <VisualSystemStage
            variantId={primary}
            animated={animated}
            revision={revision}
          />
        </section>
        {compare && (
          <section>
            <h2>Composition B</h2>
            <VisualSystemStage
              variantId={secondary}
              animated={animated}
              revision={revision}
            />
          </section>
        )}
      </main>
      <section className={styles.catalogue} aria-labelledby="visual-catalogue">
        <div className={styles.catalogueInner}>
          <h2 id="visual-catalogue">Catalogue des systèmes</h2>
          {visualSystemFamilies.map((family) => (
            <section key={family.id}>
              <h3>
                {family.label} <span>{family.count}</span>
              </h3>
              <div className={styles.cards}>
                {visualSystemVariants
                  .filter((item) => item.family === family.id)
                  .map((item) => (
                    <button
                      type="button"
                      data-visual-variant={item.id}
                      onClick={() => {
                        setPrimary(item.id);
                        replay();
                      }}
                      key={item.id}
                    >
                      <strong>{item.label}</strong>
                      <span>{item.purpose}</span>
                      <small>{item.density} · état statique complet</small>
                    </button>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
