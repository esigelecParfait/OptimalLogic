import { defineConfig, devices } from "@playwright/test";

// Les tests utilisent le build de production sur un port réservé aux contrôles.
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";

export default defineConfig({
  // Tous les scénarios navigateur se trouvent dans le dossier tests.
  testDir: "./tests",
  fullyParallel: true,

  // En CI, un test oublié avec test.only doit bloquer la livraison.
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    [process.env.CI ? "line" : "list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],

  use: {
    baseURL,
    // Conserve des preuves uniquement lorsqu'un contrôle échoue.
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  // Playwright démarre et arrête lui-même le site compilé.
  // npm run check exécute le build avant d'arriver à cette étape.
  webServer: {
    command: "npm run start -- -H 127.0.0.1 -p 3100",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  projects: [
    {
      // Les parcours fonctionnels utilisent un navigateur d'ordinateur standard.
      name: "functional",
      testMatch: "**/functional/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "mobile-320",
      testMatch: "**/responsive/**/*.spec.ts",
      use: { browserName: "chromium", viewport: { width: 320, height: 900 } },
    },
    {
      name: "mobile-390",
      testMatch: "**/responsive/**/*.spec.ts",
      use: { browserName: "chromium", viewport: { width: 390, height: 844 } },
    },
    {
      name: "tablet-768",
      testMatch: "**/responsive/**/*.spec.ts",
      use: { browserName: "chromium", viewport: { width: 768, height: 1024 } },
    },
    {
      name: "desktop-1024",
      testMatch: "**/responsive/**/*.spec.ts",
      use: { browserName: "chromium", viewport: { width: 1024, height: 900 } },
    },
    {
      name: "wide-1440",
      testMatch: "**/responsive/**/*.spec.ts",
      use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
  ],
});
