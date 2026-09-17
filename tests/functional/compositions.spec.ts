import { expect, test } from "@playwright/test";

test("le showroom expose les 38 variantes dans huit familles", async ({ page }) => {
  await page.goto("/showroom/compositions");
  await expect(
    page.getByRole("heading", { name: "38 compositions, huit familles" }),
  ).toBeVisible();
  await expect(page.locator("[data-variant]")).toHaveCount(38);
  await expect(page.locator("main > section")).toHaveCount(8);
});

test("les compositions acceptent les huit thèmes", async ({ page }) => {
  await page.goto("/showroom/compositions");
  const selector = page.getByLabel("Identité visuelle");
  await expect(selector.locator("option")).toHaveCount(8);
  for (const theme of [
    "editorial",
    "technology",
    "professional",
    "luxury",
    "creative",
    "organic",
    "industrial",
    "accessible",
  ]) {
    await selector.selectOption(theme);
    await expect(page.locator(`[data-theme="${theme}"]`)).toBeVisible();
  }
});

test("les formulaires de démonstration sont correctement étiquetés", async ({ page }) => {
  await page.goto("/showroom/compositions#contact");
  await expect(page.getByLabel("Nom")).toBeVisible();
  await expect(page.getByLabel("E-mail")).toHaveAttribute("type", "email");
  await expect(page.getByLabel("Message")).toBeVisible();
});

test("les quatre layouts complets sont disponibles", async ({ page }) => {
  await page.goto("/showroom/layouts");
  await expect(
    page.getByRole("heading", { name: "Quatre rythmes de pages publiques" }),
  ).toBeVisible();
  await expect(
    page.locator("[id='conversion'], [id='editorial'], [id='showcase'], [id='local']"),
  ).toHaveCount(4);
});
