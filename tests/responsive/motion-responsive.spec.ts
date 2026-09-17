import { expect, test } from "@playwright/test";

test("le showroom motion ne déborde pas horizontalement", async ({ page }) => {
  await page.goto("/showroom/motion");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
