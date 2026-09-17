import { mkdir } from "node:fs/promises";

import { test } from "@playwright/test";

const recipes = [
  "conseil-editorial",
  "saas-technology",
  "services-professional",
  "marque-luxury",
  "studio-creative",
  "entreprise-organic",
  "service-industrial",
  "service-accessible",
];

test("génère les captures QA représentatives", async ({ page }) => {
  await mkdir("docs/qa/screenshots", { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/showroom/sites");
  await page.screenshot({ path: "docs/qa/screenshots/catalogue-1440.png" });
  for (const slug of recipes) {
    await page.goto(`/showroom/sites/${slug}`);
    await page.screenshot({ path: `docs/qa/screenshots/${slug}-1440.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/showroom/sites");
  await page.screenshot({ path: "docs/qa/screenshots/catalogue-390.png" });
  await page.goto("/showroom/sites/saas-technology");
  await page.screenshot({ path: "docs/qa/screenshots/saas-technology-390.png" });
  await page.goto("/showroom/client-area");
  await page.screenshot({ path: "docs/qa/screenshots/client-area-390.png" });
});
