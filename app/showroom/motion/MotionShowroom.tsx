"use client";

import { useState } from "react";

import { MotionStage } from "@/components/motion";
import { Button } from "@/components/primitives";
import { motionFamilies, motionPresets } from "@/design-system/motion";
import { themes, type ThemeId } from "@/design-system/themes";

import styles from "./motion-showroom.module.css";

export function MotionShowroom() {
  const [theme, setTheme] = useState<ThemeId>("technology");
  const [primary, setPrimary] = useState("type-mask");
  const [secondary, setSecondary] = useState("svg-converge");
  const [compare, setCompare] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [revision, setRevision] = useState(0);
  const replay = () => {
    setPaused(false);
    setRevision((value) => value + 1);
  };

  return (
    <div data-theme={theme} className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Étape 5 · Motion system</p>
          <h1>34 comportements, un langage de mouvement.</h1>
          <p>
            Comparez les micro-interactions, la typographie, les trajectoires SVG, le
            défilement et les deux niveaux de 3D.
          </p>
        </div>
      </header>
      <aside className={styles.controls} aria-label="Contrôles du showroom">
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
            {motionPresets.map((item) => (
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
            {motionPresets.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label} · {item.cost}
              </option>
            ))}
          </select>
        </label>
        <label>
          Vitesse
          <select
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          >
            <option value={0.5}>0,5×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1,5×</option>
          </select>
        </label>
        <div className={styles.controlActions}>
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
          Simuler le mouvement réduit
        </label>
      </aside>
      <main id="main-content" className={compare ? styles.comparison : styles.single}>
        <section>
          <h2>Variante A</h2>
          <MotionStage
            presetId={primary}
            revision={revision}
            paused={paused}
            speed={speed}
            forceReduced={reduced}
          />
        </section>
        {compare && (
          <section>
            <h2>Variante B</h2>
            <MotionStage
              presetId={secondary}
              revision={revision}
              paused={paused}
              speed={speed}
              forceReduced={reduced}
            />
          </section>
        )}
      </main>
      <section className={styles.catalogue} aria-labelledby="catalogue-title">
        <div className={styles.catalogueInner}>
          <h2 id="catalogue-title">Catalogue des comportements</h2>
          {motionFamilies.map((family) => (
            <section key={family.id}>
              <h3>
                {family.label} <span>{family.count}</span>
              </h3>
              <div className={styles.presets}>
                {motionPresets
                  .filter((preset) => preset.family === family.id)
                  .map((preset) => (
                    <button
                      type="button"
                      onClick={() => {
                        setPrimary(preset.id);
                        replay();
                      }}
                      key={preset.id}
                    >
                      <strong>{preset.label}</strong>
                      <span>
                        {preset.intensity} · {preset.cost}
                      </span>
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
