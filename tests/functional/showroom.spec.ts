import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/services",
  "/tarifs",
  "/contact",
  "/prise-de-rdv",
  "/aide",
] as const;

const expectedVariants = [
  "HeroSplit",
  "HeroCentered",
  "HeroEditorial",
  "NarrativeMosaic",
  "NarrativeManifesto",
  "ProofLogoCloud",
  "ProofStats",
  "ProofQuote",
  "ServicesGrid",
  "ServicesEditorial",
  "ServicesFeatured",
  "ProcessSteps",
  "ProcessTimeline",
  "WorkflowPipeline",
  "WorkflowRouting",
  "MetricsDashboard",
  "MetricsStrip",
  "GalleryGrid",
  "GallerySpotlight",
  "FaqList",
  "FaqColumns",
  "TeamGrid",
  "TeamSpotlight",
  "PricingCards",
  "PricingFeatured",
  "CtaCentered",
  "CtaSplit",
  "CtaBand",
] as const;

test("la page d'accueil et le showroom répondent correctement", async ({ page }) => {
  // goto renvoie la réponse HTTP de la navigation principale.
  const homeResponse = await page.goto("/");
  expect(homeResponse?.ok()).toBe(true);
  await expect(page.locator("main")).toBeVisible();

  const showroomResponse = await page.goto("/showroom");
  expect(showroomResponse?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { level: 1, name: "Showroom des blocs OptimalLogic" }),
  ).toBeVisible();
});

test("les routes publiques conservées répondent sans erreur serveur", async ({
  page,
}) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.ok(), `La route ${route} doit répondre`).toBe(true);
    await expect(page.locator("main")).toBeVisible();
  }
});

test("le showroom expose les 28 variantes dans l'ordre documenté", async ({ page }) => {
  await page.goto("/showroom");

  // VariantLabel produit les paragraphes directement placés sous main.
  const labels = page.locator("main > p");
  await expect(labels).toHaveCount(expectedVariants.length);
  expect(await labels.allTextContents()).toEqual([...expectedVariants]);
});

test("le showroom reste interne et les FAQ fonctionnent au clavier", async ({ page }) => {
  await page.goto("/showroom");

  // La route de démonstration ne doit jamais être indexée par un moteur de recherche.
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  const firstDetails = page.locator("details").first();
  const firstSummary = firstDetails.locator("summary");

  await firstSummary.focus();
  await page.keyboard.press("Enter");
  await expect(firstDetails).toHaveAttribute("open", "");
});

test("les actions principales restent de vrais liens accessibles", async ({ page }) => {
  await page.goto("/showroom");

  const firstPrimaryAction = page
    .getByRole("link", { name: "Action principale" })
    .first();
  await expect(firstPrimaryAction).toBeVisible();
  await expect(firstPrimaryAction).toHaveAttribute("href", "#showroom-top");
});
