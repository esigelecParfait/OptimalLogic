import { readFile } from "node:fs/promises";

const recipes = await readFile(
  new URL("../design-system/site-recipes.ts", import.meta.url),
  "utf8",
);
const page = await readFile(
  new URL("../components/demo-site/DemoSite.tsx", import.meta.url),
  "utf8",
);
const dynamicPage = await readFile(
  new URL("../app/showroom/sites/[slug]/page.tsx", import.meta.url),
  "utf8",
);

const slugs = [...recipes.matchAll(/slug: "([a-z-]+)"/g)].map((match) => match[1]);
const themes = [...recipes.matchAll(/theme: "([a-z-]+)"/g)].map((match) => match[1]);
if (slugs.length !== 8 || new Set(slugs).size !== 8)
  throw new Error("8 recettes uniques sont attendues.");
if (themes.length !== 8 || new Set(themes).size !== 8)
  throw new Error("Chaque recette doit utiliser un thème distinct.");
for (const field of [
  "motion",
  "depth",
  "visualSystem",
  "authVariant",
  "clientVariant",
  "clientNavigation",
])
  if ((recipes.match(new RegExp(`^    ${field}: "`, "gm")) ?? []).length !== 8)
    throw new Error(`Contrat incomplet : ${field}`);
for (const guarantee of [
  "Démonstration fictive",
  "Connexion",
  "AuthStage",
  "ClientAreaStage",
  "Formulaire non connecté",
])
  if (!page.includes(guarantee))
    throw new Error(`Garantie de page absente : ${guarantee}`);
for (const guarantee of [
  "dynamicParams = false",
  "generateStaticParams",
  "robots: { index: false",
])
  if (!dynamicPage.includes(guarantee))
    throw new Error(`Garantie de route absente : ${guarantee}`);

console.log("8 recettes, 8 thèmes et leurs pages publiques/privées conformes.");
