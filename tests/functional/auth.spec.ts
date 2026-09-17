import { expect, test } from "@playwright/test";

test("le showroom auth expose 30 variantes, 11 états et 3 modes", async ({ page }) => {
  await page.goto("/showroom/auth");
  await expect(
    page.getByRole("heading", { name: "30 parcours, des états sans ambiguïté." }),
  ).toBeVisible();
  await expect(page.locator("[data-auth-variant]")).toHaveCount(30);
  await expect(page.getByLabel("État").locator("option")).toHaveCount(11);
  await expect(page.locator("#auth-registration-mode option")).toHaveCount(3);
});

test("le mot de passe est contrôlable et aucun formulaire ne transmet de requête", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (
      request.isNavigationRequest() === false &&
      ["fetch", "xhr"].includes(request.resourceType())
    )
      requests.push(request.url());
  });
  await page.goto("/showroom/auth");
  const password = page.locator('input[name="password"]').first();
  await expect(password).toHaveAttribute("type", "password");
  await page.getByRole("button", { name: "Afficher le mot de passe" }).first().click();
  await expect(password).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Se connecter" }).first().click();
  expect(requests).toEqual([]);
});

test("les modes et états terminaux produisent un retour accessible", async ({ page }) => {
  await page.goto("/showroom/auth");
  await page.getByLabel("Variante A").selectOption("sign-up-centered");
  await page.locator("#auth-registration-mode").selectOption("disabled");
  await expect(page.getByRole("alert").first()).toContainText("Accès indisponible");
  await page.locator("#auth-registration-mode").selectOption("public");
  await page.getByLabel("État").selectOption("success");
  await expect(page.getByRole("status").first()).toContainText("Opération confirmée");
});
