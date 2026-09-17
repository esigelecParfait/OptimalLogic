import { readFile } from "node:fs/promises";

const catalogue = await readFile(
  new URL("../design-system/client-area.ts", import.meta.url),
  "utf8",
);
const component = await readFile(
  new URL("../components/client-area/ClientAreaStage.tsx", import.meta.url),
  "utf8",
);
const showroom = await readFile(
  new URL("../app/showroom/client-area/ClientAreaShowroom.tsx", import.meta.url),
  "utf8",
);

for (const family of [
  "dashboard",
  "profile",
  "requests",
  "appointments",
  "documents",
  "support",
])
  if (!catalogue.includes(`id: "${family}"`))
    throw new Error(`Famille absente : ${family}`);
for (const layout of [
  "overview",
  "activity",
  "workspace",
  "split",
  "timeline",
  "focused",
])
  if (!catalogue.includes(`["${layout}"`)) throw new Error(`Layout absent : ${layout}`);
for (const state of [
  "normal",
  "loading",
  "empty",
  "partial",
  "error",
  "restricted",
  "success",
])
  if (!catalogue.includes(`id: "${state}"`)) throw new Error(`État absent : ${state}`);
for (const guarantee of [
  "Démonstration fictive",
  "aria-busy",
  "aucune donnée client réelle",
])
  if (!component.includes(guarantee)) throw new Error(`Garantie absente : ${guarantee}`);
if (
  !showroom.includes("clientNavigationVariants") ||
  !showroom.includes("data-client-composition")
)
  throw new Error("Le showroom ne consomme pas tous les contrats client-area.");

console.log("36 compositions client, 6 navigations et 7 états conformes.");
