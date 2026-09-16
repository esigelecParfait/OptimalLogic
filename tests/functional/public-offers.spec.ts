import { expect, test } from "@playwright/test";

const databaseOffers = [
  {
    code: "commerce_intelligent",
    nom_offre: "Commerce Signal",
    client_type: "commerce",
    prix: 590,
    prix_abonnement: 129,
    is_active: true,
  },
  {
    code: "commerce_premium",
    nom_offre: "Commerce Transmission",
    client_type: "commerce",
    prix: 990,
    prix_abonnement: 249,
    is_active: true,
  },
  {
    code: "tpe_pme_croissance",
    nom_offre: "PME Croissance BDD",
    client_type: "tpe_pme",
    prix: 1490,
    prix_abonnement: 179,
    is_active: true,
  },
  {
    code: "tpe_pme_performance",
    nom_offre: "PME Performance BDD",
    client_type: "tpe_pme",
    prix: 2490,
    prix_abonnement: 349,
    is_active: true,
  },
  {
    code: "startup_launch",
    nom_offre: "Startup Launch BDD",
    client_type: "startup",
    prix: 790,
    prix_abonnement: null,
    is_active: true,
  },
] as const;

test("la page tarifs consomme exactement les cinq offres de la BDD", async ({ page }) => {
  await page.route("**/api/offres", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ offres: databaseOffers }),
    }),
  );

  await page.goto("/tarifs");

  for (const offer of databaseOffers) {
    await expect(page.getByRole("heading", { name: offer.nom_offre })).toBeVisible();
  }

  await expect(page.getByRole("heading", { name: "Présence Pro" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Startup Validation" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Demander cette formule" })).toHaveCount(
    5,
  );
});

test("une panne Supabase n'affiche aucun prix de remplacement", async ({ page }) => {
  await page.route("**/api/offres", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Catalogue indisponible" }),
    }),
  );

  await page.goto("/tarifs");

  await expect(
    page.getByText(
      "Les prix ne peuvent pas être chargés depuis la base de données. Aucun montant de remplacement n’est affiché.",
    ),
  ).toBeVisible();
  await expect(page.getByText("Prix indisponible")).toHaveCount(5);
  await expect(
    page.getByRole("button", { name: "Offre momentanément indisponible" }),
  ).toHaveCount(5);
});
