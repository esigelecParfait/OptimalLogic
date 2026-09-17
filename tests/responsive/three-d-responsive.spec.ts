import { expect, test } from "@playwright/test";

test("le showroom 3D ne crée aucun débordement horizontal", async ({ page }) => {
  await page.goto("/showroom/3d");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
