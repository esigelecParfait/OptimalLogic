"use client";

import { useState } from "react";

import { ClientAreaStage } from "@/components/client-area";
import {
  clientAreaFamilies,
  clientAreaStates,
  clientAreaVariants,
  clientNavigationVariants,
  type ClientAreaState,
  type ClientNavigationVariant,
} from "@/design-system/client-area";
import { themes, type ThemeId } from "@/design-system/themes";

import styles from "./client-area-showroom.module.css";

const navigation = ["Accueil", "Demandes", "Rendez-vous", "Documents", "Support"];

export function ClientAreaShowroom() {
  const [theme, setTheme] = useState<ThemeId>("professional");
  const [primary, setPrimary] = useState("dashboard-overview");
  const [secondary, setSecondary] = useState("requests-workspace");
  const [navigationVariant, setNavigationVariant] =
    useState<ClientNavigationVariant>("sidebar");
  const [state, setState] = useState<ClientAreaState>("normal");
  const [compare, setCompare] = useState(true);

  return (
    <div className={styles.showroom} data-theme={theme}>
      <header className={styles.intro}>
        <p>Étape 9 · Espaces clients</p>
        <h1>Un portail modulable, centré sur les actions utiles.</h1>
        <span>6 navigations · 36 compositions · 7 états · 8 thèmes</span>
      </header>
      <aside className={styles.controls} aria-label="Contrôles du showroom espace client">
        <Control
          label="Thème"
          value={theme}
          onChange={(value) => setTheme(value as ThemeId)}
          options={themes}
        />
        <Control
          label="Navigation"
          value={navigationVariant}
          onChange={(value) => setNavigationVariant(value as ClientNavigationVariant)}
          options={clientNavigationVariants}
          id="client-navigation"
        />
        <Control
          label="Composition A"
          value={primary}
          onChange={setPrimary}
          options={clientAreaVariants}
        />
        <Control
          label="Composition B"
          value={secondary}
          onChange={setSecondary}
          options={clientAreaVariants}
          disabled={!compare}
        />
        <Control
          label="État"
          value={state}
          onChange={(value) => setState(value as ClientAreaState)}
          options={clientAreaStates}
        />
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={compare}
            onChange={(event) => setCompare(event.target.checked)}
          />{" "}
          Comparer
        </label>
      </aside>
      <main
        className={styles.portal}
        data-navigation={navigationVariant}
        id="main-content"
      >
        <aside className={styles.portalNav} aria-label="Navigation client fictive">
          <a
            className={styles.brand}
            href="#main-content"
            aria-label="OptimalLogic, accueil de l’espace client"
          >
            <b>O</b>
            <span>OptimalLogic</span>
          </a>
          <nav>
            {navigation.map((item, index) => (
              <a
                href="#client-catalogue"
                aria-current={index === 0 ? "page" : undefined}
                key={item}
              >
                <span>{item.slice(0, 1)}</span>
                <b>{item}</b>
              </a>
            ))}
          </nav>
          <button type="button">
            <span>PK</span>
            <b>Parfait K.</b>
          </button>
        </aside>
        <div className={styles.portalContent}>
          <div className={styles.portalTop}>
            <button type="button" aria-label="Ouvrir le menu">
              ☰
            </button>
            <span>Espace client</span>
            <button type="button">Profil</button>
          </div>
          <div className={compare ? styles.comparison : styles.single}>
            <section>
              <h2>Composition A</h2>
              <ClientAreaStage variantId={primary} state={state} />
            </section>
            {compare && (
              <section>
                <h2>Composition B</h2>
                <ClientAreaStage variantId={secondary} state={state} />
              </section>
            )}
          </div>
        </div>
      </main>
      <section
        className={styles.catalogue}
        id="client-catalogue"
        aria-labelledby="client-catalogue-title"
      >
        <div>
          <h2 id="client-catalogue-title">Catalogue espace client</h2>
          {clientAreaFamilies.map((family) => (
            <section key={family.id}>
              <h3>
                {family.label} <span>{family.count}</span>
              </h3>
              <div className={styles.cards}>
                {clientAreaVariants
                  .filter((item) => item.family === family.id)
                  .map((item) => (
                    <button
                      type="button"
                      data-client-composition={item.id}
                      onClick={() => setPrimary(item.id)}
                      key={item.id}
                    >
                      <strong>{item.label}</strong>
                      <small>7 états · module configurable</small>
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

function Control({
  label,
  value,
  onChange,
  options,
  disabled = false,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ id: string; label: string }>;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
