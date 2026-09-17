import { expect, test } from "@playwright/test";

test("le showroom des systèmes visuels reste dans le viewport", async ({ page }) => {
  await page.goto("/showroom/visual-systems");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
