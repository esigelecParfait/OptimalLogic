import { expect, test } from "@playwright/test";

for (const path of ["/showroom/compositions", "/showroom/layouts"]) {
  test(`${path} reste contenu dans le viewport`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
