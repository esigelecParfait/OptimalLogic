import { expect, test } from "@playwright/test";

test("le showroom auth ne déborde pas horizontalement", async ({ page }) => {
  await page.goto("/showroom/auth");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
