import { expect, test } from "@playwright/test";

const responsiveRoutes = [
  "/",
  "/services",
  "/tarifs",
  "/contact",
  "/prise-de-rdv",
  "/aide",
  "/showroom",
] as const;

test("le showroom ne déborde pas horizontalement", async ({ page }, testInfo) => {
  await page.goto("/showroom");

  const layout = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    contentWidth: document.documentElement.scrollWidth,
  }));

  expect(
    layout.contentWidth,
    `Débordement détecté dans le projet ${testInfo.project.name}`,
  ).toBeLessThanOrEqual(layout.viewportWidth + 1);
});

test("les routes publiques ne débordent pas horizontalement", async ({
  page,
}, testInfo) => {
  for (const route of responsiveRoutes) {
    await page.goto(route);

    const layout = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      contentWidth: document.documentElement.scrollWidth,
    }));

    expect(
      layout.contentWidth,
      `Débordement sur ${route} dans le projet ${testInfo.project.name}`,
    ).toBeLessThanOrEqual(layout.viewportWidth + 1);
  }
});

test("aucun élément visible ne sort de la largeur du viewport", async ({
  page,
}, testInfo) => {
  await page.goto("/showroom");

  // Le diagnostic renvoie les dix premiers éléments fautifs pour faciliter la correction.
  const offenders = await page.locator("body *").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const rectangle = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rectangle.width > 0 &&
          (rectangle.left < -1 || rectangle.right > window.innerWidth + 1)
        );
      })
      .slice(0, 10)
      .map((element) => {
        const rectangle = element.getBoundingClientRect();

        return {
          element: element.tagName.toLowerCase(),
          text: element.textContent?.trim().slice(0, 60) ?? "",
          left: Math.round(rectangle.left),
          right: Math.round(rectangle.right),
        };
      }),
  );

  expect(
    offenders,
    `Éléments hors écran dans le projet ${testInfo.project.name}`,
  ).toEqual([]);
});

test("les 28 variantes restent présentes à cette largeur", async ({ page }) => {
  await page.goto("/showroom");
  await expect(page.locator("main > p")).toHaveCount(28);
});
