import { expect, test } from "@playwright/test";
import { themes } from "../../design-system/themes";

test("la grammaire expose six surfaces continues et explicites", async ({ page }) => {
  await page.goto("/showroom/foundations");

  for (const appearance of ["open", "soft", "line", "floating", "layered", "immersive"]) {
    await expect(page.locator(`[data-surface="${appearance}"]`).first()).toBeVisible();
  }

  await expect(page.locator('[data-section-treatment="soft"]')).toBeVisible();
  await expect(page.locator('[data-section-treatment="line"]')).toBeVisible();
});

test("huit thèmes lisibles et sans débordement sur mobile et ordinateur", async ({
  page,
}) => {
  await page.goto("/showroom/foundations");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of themes) {
      await page.getByLabel("Identité visuelle").selectOption(theme.id);
      const result = await page.evaluate(() => {
        const scope = document.querySelector("[data-theme]")!;
        const style = getComputedStyle(scope);
        const luminance = (color: string) => {
          const normalized = color.trim();
          const channels = normalized.startsWith("#")
            ? normalized
                .slice(1)
                .match(normalized.length === 4 ? /./g : /../g)!
                .map((part) => parseInt(part.length === 1 ? part + part : part, 16))
            : normalized
                .match(/[\d.]+/g)!
                .slice(0, 3)
                .map(Number);
          const values = channels.map((channel) => {
            const c = channel / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
        };
        const contrast = (a: string, b: string) => {
          const x = luminance(style.getPropertyValue(a)),
            y = luminance(style.getPropertyValue(b));
          return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
        };
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          contrasts: [
            contrast("--color-text", "--color-canvas"),
            contrast("--color-text-muted", "--color-canvas"),
            contrast("--color-text-muted", "--color-surface-muted"),
            contrast("--color-action-contrast", "--color-action"),
            contrast("--color-danger", "--color-canvas"),
          ],
        };
      });
      expect(result.overflow, theme.id + " at " + width).toBe(false);
      for (const ratio of result.contrasts)
        expect(ratio, theme.id).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("navigation mobile au clavier et attributs du bouton lien", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/showroom/foundations");
  await expect(page.getByRole("link", { name: "Connexion", exact: true })).toBeVisible();
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("link", { name: "Accéder au formulaire" })).toHaveAttribute(
    "href",
    "#form",
  );
});

test("formulaire local : validation puis confirmation sans requête", async ({ page }) => {
  await page.goto("/showroom/foundations");
  await page.getByRole("button", { name: "Tester le formulaire" }).click();
  await expect(page.getByRole("status")).toContainText("sans envoi");
  await page.getByLabel("Votre nom").fill("Camille");
  await page.getByLabel("Adresse email").fill("camille@example.com");
  await page.getByLabel("Votre besoin").selectOption("website");
  await page.getByLabel("Votre message").fill("Présentation du projet.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Tester le formulaire" }).click();
  await expect(page.getByRole("status")).toContainText("Aucune donnée");
  await expect(page.getByLabel("Exemple d’erreur")).toHaveAttribute(
    "aria-describedby",
    "error-example-error",
  );
});

test("contenu disponible sans JavaScript et avec mouvement réduit", async ({
  browser,
  page,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:3100/showroom/foundations");
  await expect(staticPage.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    staticPage.getByRole("link", { name: "Connexion", exact: true }),
  ).toBeVisible();
  await context.close();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/showroom/foundations");
  const action = page.getByRole("link", { name: "Explorer les composants" });
  await action.hover();
  await expect(action).toHaveCSS("transform", "none");
  await page.screenshot({
    path: "test-results/foundations-desktop.png",
    fullPage: true,
  });
});
