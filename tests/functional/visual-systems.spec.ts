import { expect, test } from "@playwright/test";

test("le showroom expose 30 compositions dans cinq familles", async ({ page }) => {
  await page.goto("/showroom/visual-systems");
  await expect(
    page.getByRole("heading", { name: "30 compositions pour expliquer, pas décorer." }),
  ).toBeVisible();
  await expect(page.locator("[data-visual-variant]")).toHaveCount(30);
  for (const family of [
    "Diagrammes",
    "Flux",
    "Interfaces illustratives",
    "Graphiques narratifs",
    "Transformations avant/après",
  ])
    await expect(page.getByRole("heading", { name: new RegExp(family) })).toBeVisible();
});

test("comparaison et état statique sont pilotables", async ({ page }) => {
  await page.goto("/showroom/visual-systems");
  await page.getByRole("button", { name: "Figer" }).click();
  await expect(page.getByRole("button", { name: "Animer" })).toBeVisible();
  await page.getByLabel("Comparer").uncheck();
  await expect(page.getByRole("heading", { name: "Composition B" })).toHaveCount(0);
  await page.getByRole("button", { name: "Relancer" }).click();
  await expect(page.getByRole("button", { name: "Figer" })).toBeVisible();
});
