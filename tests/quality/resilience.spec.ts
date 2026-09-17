import { expect, test } from "@playwright/test";

test("le mouvement réduit neutralise les animations longues", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/showroom/motion");
  const durations = await page.locator("*").evaluateAll((elements) =>
    elements.flatMap((element) => {
      const style = getComputedStyle(element);
      return `${style.animationDuration},${style.transitionDuration}`
        .split(",")
        .map((value) => Number.parseFloat(value) * (value.includes("ms") ? 1 : 1000));
    }),
  );
  expect(Math.max(...durations)).toBeLessThanOrEqual(1);
});

test("les pages principales restent utilisables avec un texte à 200 %", async ({
  page,
}) => {
  for (const route of ["/showroom/sites", "/showroom/auth", "/showroom/client-area"]) {
    await page.goto(route);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
      `Débordement avec texte à 200 % sur ${route}`,
    ).toBe(false);
  }
});

test("aucune erreur console ou ressource ne bloque le catalogue", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) =>
    errors.push(`${request.method()} ${request.url()} : ${request.failure()?.errorText}`),
  );
  await page.goto("/showroom/sites");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});
