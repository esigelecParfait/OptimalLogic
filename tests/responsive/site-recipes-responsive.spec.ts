import { expect, test } from "@playwright/test";

for (const slug of ["conseil-editorial", "saas-technology", "service-accessible"]) {
  test(`${slug} reste dans le viewport`, async ({ page }) => {
    await page.goto(`/showroom/sites/${slug}`);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
}
