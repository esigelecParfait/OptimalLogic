import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/showroom/sites",
  "/showroom/sites/conseil-editorial",
  "/showroom/sites/saas-technology",
  "/showroom/sites/service-accessible",
  "/showroom/auth",
  "/showroom/client-area",
];

for (const route of routes) {
  test(`${route} ne présente aucune violation WCAG critique ou sérieuse`, async ({
    page,
  }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = results.violations.filter(({ impact }) =>
      ["critical", "serious"].includes(impact ?? ""),
    );
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}
