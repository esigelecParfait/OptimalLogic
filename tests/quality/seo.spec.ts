import { expect, test } from "@playwright/test";

test("la page publique est indexable et les démonstrations restent privées", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index, follow/,
  );

  for (const route of ["/showroom/sites", "/showroom/sites/saas-technology"]) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex, nofollow/,
    );
  }
});
