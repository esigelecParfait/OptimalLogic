"use client";

import { useState } from "react";

import { ThreeDStage } from "@/components/three";
import { Button } from "@/components/primitives";
import { threeDFamilies, threeDVariants } from "@/design-system/three-d";
import { themes, type ThemeId } from "@/design-system/themes";

import styles from "./showroom-3d.module.css";

export function ThreeDShowroom() {
  const [theme, setTheme] = useState<ThemeId>("technology");
  const [primary, setPrimary] = useState("perspective-tilt");
  const [secondary, setSecondary] = useState("webgl-network");
  const [compare, setCompare] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [revision, setRevision] = useState(0);
  const replay = () => {
    setPaused(false);
    setRevision((value) => value + 1);
  };

  return (
    <div className={styles.shell} data-theme={theme}>
      <header className={styles.header}>
        <p>Étape 6 · Capacités 3D</p>
        <h1>18 variantes, trois niveaux de profondeur.</h1>
        <span>
          CSS léger, panneaux accessibles et WebGL optionnel avec alternative statique.
        </span>
      </header>
      <aside className={styles.controls} aria-label="Contrôles du showroom 3D">
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
          Variante A
          <select
            value={primary}
            onChange={(event) => {
              setPrimary(event.target.value);
              replay();
            }}
          >
            {threeDVariants.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label} · {item.cost}
              </option>
            ))}
          </select>
        </label>
        <label>
          Variante B
          <select
            value={secondary}
            disabled={!compare}
            onChange={(event) => {
              setSecondary(event.target.value);
              replay();
            }}
          >
            {threeDVariants.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label} · {item.cost}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.actions}>
          <Button type="button" onClick={() => setPaused((value) => !value)}>
            {paused ? "Lecture" : "Pause"}
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
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={reduced}
            onChange={(event) => setReduced(event.target.checked)}
          />{" "}
          Simuler l’alternative statique
        </label>
      </aside>
      <main id="main-content" className={compare ? styles.comparison : styles.single}>
        <section>
          <h2>Variante A</h2>
          <ThreeDStage
            variantId={primary}
            paused={paused}
            forceReduced={reduced}
            revision={revision}
          />
        </section>
        {compare && (
          <section>
            <h2>Variante B</h2>
            <ThreeDStage
              variantId={secondary}
              paused={paused}
              forceReduced={reduced}
              revision={revision}
            />
          </section>
        )}
      </main>
      <section className={styles.catalogue} aria-labelledby="catalogue-3d">
        <div className={styles.catalogueInner}>
          <h2 id="catalogue-3d">Catalogue 3D</h2>
          {threeDFamilies.map((family) => (
            <section key={family.id}>
              <h3>
                {family.label} <span>{family.count}</span>
              </h3>
              <div className={styles.cards}>
                {threeDVariants
                  .filter((item) => item.family === family.id)
                  .map((item) => (
                    <button
                      type="button"
                      data-3d-variant={item.id}
                      key={item.id}
                      onClick={() => {
                        setPrimary(item.id);
                        replay();
                      }}
                    >
                      <strong>{item.label}</strong>
                      <span>{item.purpose}</span>
                      <small>{item.cost} · alternative statique</small>
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
