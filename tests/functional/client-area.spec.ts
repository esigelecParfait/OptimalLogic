import { expect, test } from "@playwright/test";

test("le showroom expose 36 compositions et 6 navigations", async ({ page }) => {
  await page.goto("/showroom/client-area");
  await expect(page.getByRole("heading", { name: /Un portail modulable/ })).toBeVisible();
  await expect(page.locator("[data-client-composition]")).toHaveCount(36);
  await expect(page.locator("#client-navigation option")).toHaveCount(6);
});

test("navigation, comparaison et états restent pilotables", async ({ page }) => {
  await page.goto("/showroom/client-area");
  await page.locator("#client-navigation").selectOption("compact");
  await expect(page.locator("[data-navigation=compact]")).toBeVisible();
  await page.getByLabel("État").selectOption("empty");
  await expect(page.getByText("Votre espace est prêt.").first()).toBeVisible();
  await page.getByLabel("Comparer").uncheck();
  await expect(page.getByRole("heading", { name: "Composition B" })).toHaveCount(0);
});

test("aucune action de démonstration ne transmet de requête", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(request.method());
  });
  await page.goto("/showroom/client-area");
  await page.getByRole("button", { name: "Voir l’activité" }).first().click();
  expect(writes).toEqual([]);
});
