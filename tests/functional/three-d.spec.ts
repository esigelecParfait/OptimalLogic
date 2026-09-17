import { expect, test } from "@playwright/test";

test("le showroom expose 18 variantes réparties en trois familles", async ({ page }) => {
  await page.goto("/showroom/3d");
  await expect(
    page.getByRole("heading", { name: "18 variantes, trois niveaux de profondeur." }),
  ).toBeVisible();
  await expect(page.locator("[data-3d-variant]")).toHaveCount(18);
  await expect(page.getByRole("heading", { name: /Perspectives CSS/ })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Panneaux en profondeur/ }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /Scènes WebGL/ })).toBeVisible();
});

test("comparaison, pause et alternatives statiques sont pilotables", async ({ page }) => {
  await page.goto("/showroom/3d");
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Lecture" })).toBeVisible();
  await page.getByLabel("Comparer").uncheck();
  await expect(page.getByRole("heading", { name: "Variante B" })).toHaveCount(0);
  await page.getByLabel("Simuler l’alternative statique").check();
  await expect(page.locator('[data-static-fallback="true"]')).toHaveCount(1);
});
