import { expect, test } from "@playwright/test";

const sites = [
  "conseil-editorial",
  "saas-technology",
  "services-professional",
  "marque-luxury",
  "studio-creative",
  "entreprise-organic",
  "service-industrial",
  "service-accessible",
];

test("le catalogue expose huit recettes et la matrice", async ({ page }) => {
  await page.goto("/showroom/sites");
  await expect(page.getByRole("link", { name: "Ouvrir la démonstration" })).toHaveCount(
    8,
  );
  await expect(page.getByRole("heading", { name: /Une recette traçable/ })).toBeVisible();
  await expect(page.locator("table tbody tr")).toHaveCount(8);
});

for (const slug of sites) {
  test(`${slug} possède une page complète et reste interne`, async ({ page }) => {
    await page.goto(`/showroom/sites/${slug}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(
      page.getByRole("link", { name: "Connexion", exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Démonstration fictive · ne pas publier")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Du site public à l’espace client." }),
    ).toBeVisible();
    await expect(page.getByText("Formules fictives", { exact: true })).toBeVisible();
  });
}
