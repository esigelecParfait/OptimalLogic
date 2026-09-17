"use client";
import { useState, type ReactNode } from "react";
import { themes, type ThemeId } from "@/design-system/themes";
import styles from "./foundations.module.css";

export function ThemePreview({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("editorial");
  return (
    <div data-theme={theme} className={styles.preview}>
      <div className={styles.toolbar}>
        <label htmlFor="theme">Identité visuelle</label>
        <select
          id="theme"
          value={theme}
          onChange={(event) => setTheme(event.target.value as ThemeId)}
        >
          {themes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <span>8 thèmes · mêmes composants</span>
      </div>
      {children}
    </div>
  );
}
