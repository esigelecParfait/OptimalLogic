import { spawn } from "node:child_process";

import { chromium } from "@playwright/test";

// npm ajoute node_modules/.bin au PATH ; le suffixe .cmd est requis sous Windows.
const command = process.platform === "win32" ? "lhci.cmd" : "lhci";

// Réutilise le Chromium installé par Playwright pour éviter deux navigateurs différents.
const lighthouse = spawn(command, ["autorun"], {
  env: {
    ...process.env,
    CHROME_PATH: chromium.executablePath(),
  },
  stdio: "inherit",
});

// Une erreur de lancement doit faire échouer le contrôle de qualité.
lighthouse.on("error", (error) => {
  console.error("Impossible de lancer Lighthouse CI.", error);
  process.exit(1);
});

// Transmet le code de sortie de Lighthouse à npm puis à GitHub Actions.
lighthouse.on("exit", (code) => {
  process.exit(code ?? 1);
});
