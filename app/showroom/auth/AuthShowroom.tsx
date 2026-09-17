"use client";

import { useState } from "react";

import { AuthStage } from "@/components/auth";
import {
  authFamilies,
  authStates,
  authVariants,
  registrationModes,
  type AuthState,
  type RegistrationMode,
} from "@/design-system/auth";
import { themes, type ThemeId } from "@/design-system/themes";

import styles from "./auth-showroom.module.css";

export function AuthShowroom() {
  const [theme, setTheme] = useState<ThemeId>("technology");
  const [primary, setPrimary] = useState("sign-in-centered");
  const [secondary, setSecondary] = useState("activation-split");
  const [state, setState] = useState<AuthState>("initial");
  const [mode, setMode] = useState<RegistrationMode>("invite_only");
  const [compare, setCompare] = useState(true);
  return (
    <div className={styles.shell} data-theme={theme} id="auth-showroom">
      <header className={styles.header}>
        <p>Étape 8 · Authentification</p>
        <h1>30 parcours, des états sans ambiguïté.</h1>
        <span>
          Interfaces prêtes à raccorder, sans faux backend ni session persistante.
        </span>
      </header>
      <aside className={styles.controls} aria-label="Contrôles du showroom auth">
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
          <select value={primary} onChange={(event) => setPrimary(event.target.value)}>
            {authVariants.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Variante B
          <select
            value={secondary}
            disabled={!compare}
            onChange={(event) => setSecondary(event.target.value)}
          >
            {authVariants.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          État
          <select
            value={state}
            onChange={(event) => setState(event.target.value as AuthState)}
          >
            {authStates.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="auth-registration-mode">
          Inscription
          <select
            id="auth-registration-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as RegistrationMode)}
          >
            {registrationModes.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={compare}
            onChange={(event) => setCompare(event.target.checked)}
          />{" "}
          Comparer
        </label>
      </aside>
      <main id="main-content" className={compare ? styles.comparison : styles.single}>
        <section>
          <h2>Variante A</h2>
          <AuthStage variantId={primary} state={state} registrationMode={mode} />
        </section>
        {compare && (
          <section>
            <h2>Variante B</h2>
            <AuthStage variantId={secondary} state={state} registrationMode={mode} />
          </section>
        )}
      </main>
      <section className={styles.catalogue} aria-labelledby="auth-catalogue">
        <div className={styles.catalogueInner}>
          <h2 id="auth-catalogue">Catalogue Auth</h2>
          {authFamilies.map((family) => (
            <section key={family.id}>
              <h3>
                {family.label} <span>{family.count}</span>
              </h3>
              <div className={styles.cards}>
                {authVariants
                  .filter((item) => item.family === family.id)
                  .map((item) => (
                    <button
                      type="button"
                      data-auth-variant={item.id}
                      onClick={() => setPrimary(item.id)}
                      key={item.id}
                    >
                      <strong>{item.label}</strong>
                      <small>11 états · 8 thèmes</small>
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
