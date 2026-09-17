import { expect, test } from "@playwright/test";

test("le showroom expose 34 presets et les contrôles attendus", async ({ page }) => {
  await page.goto("/showroom/motion");
  await expect(
    page.getByRole("heading", { name: "34 comportements, un langage de mouvement." }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /balanced|subtle|strong/ })).toHaveCount(
    34,
  );
  await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Relancer" })).toBeVisible();
});

test("lecture, relance, comparaison et vitesse sont pilotables", async ({ page }) => {
  await page.goto("/showroom/motion");
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Lecture" })).toBeVisible();
  await page.getByLabel("Comparer").uncheck();
  await expect(page.getByRole("heading", { name: "Variante B" })).toHaveCount(0);
  await page.getByLabel("Vitesse").selectOption("1.5");
  await page.getByRole("button", { name: "Relancer" }).click();
  await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();
});

test("le mode réduit remplace WebGL par un état final", async ({ page }) => {
  await page.goto("/showroom/motion");
  await page.getByLabel("Variante A").selectOption("webgl-orbit");
  await page.getByLabel("Simuler le mouvement réduit").check();
  await expect(page.getByText("État final statique — mouvement réduit")).toBeVisible();
});
