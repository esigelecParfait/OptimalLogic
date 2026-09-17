import { expect, test } from "@playwright/test";

test("le showroom espace client reste dans le viewport", async ({ page }) => {
  await page.goto("/showroom/client-area");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
