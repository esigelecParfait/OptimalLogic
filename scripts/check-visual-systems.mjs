import { readFile } from "node:fs/promises";

const catalogue = await readFile(
  new URL("../design-system/visual-systems.ts", import.meta.url),
  "utf8",
);
const expected = { diagram: 6, flow: 6, interface: 6, chart: 6, transformation: 6 };
for (const [family, count] of Object.entries(expected)) {
  const ids = [
    ...catalogue.matchAll(new RegExp(`\\[\\s*"${family}",\\s*"([a-z-]+)"`, "g")),
  ].map((match) => match[1]);
  if (ids.length !== count || new Set(ids).size !== count)
    throw new Error(
      `${family}: ${count} compositions uniques attendues, ${ids.length} trouvées.`,
    );
}
for (const forbidden of ["Math.random", "recharts", "d3", "canvas"])
  if (catalogue.includes(forbidden)) throw new Error(`Motif interdit : ${forbidden}`);
const stage = await readFile(
  new URL("../components/visual-systems/VisualSystemStage.tsx", import.meta.url),
  "utf8",
);
for (const required of [
  "accessibilityLabel",
  "Démonstration fictive",
  "aria-hidden",
  "figcaption",
])
  if (!stage.includes(required))
    throw new Error(`Garantie visuelle absente : ${required}`);
console.log("30 systèmes visuels : familles, traçabilité et contenu fictif conformes.");
