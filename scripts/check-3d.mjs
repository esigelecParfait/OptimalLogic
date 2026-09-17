import { readFile } from "node:fs/promises";

const catalogue = await readFile(
  new URL("../design-system/three-d.ts", import.meta.url),
  "utf8",
);
const expected = { perspective: 6, depth: 6, webgl: 6 };
for (const [prefix, count] of Object.entries(expected)) {
  const ids = [
    ...catalogue.matchAll(new RegExp(`\\[\\s*"(${prefix}-[a-z-]+)"`, "g")),
  ].map((match) => match[1]);
  if (ids.length !== count || new Set(ids).size !== count)
    throw new Error(
      `${prefix}: ${count} variantes uniques attendues, ${ids.length} trouvées.`,
    );
}
const stage = await readFile(
  new URL("../components/three/ThreeDStage.tsx", import.meta.url),
  "utf8",
);
const webgl = await readFile(
  new URL("../components/three/WebGLScene.tsx", import.meta.url),
  "utf8",
);
for (const required of [
  "dynamic(",
  "ssr: false",
  "StaticFallback",
  "useReducedMotion",
  "dpr={[1, 1.5]",
  'powerPreference: "high-performance"',
]) {
  if (!(stage + webgl).includes(required))
    throw new Error(`Garantie 3D absente : ${required}`);
}
for (const forbidden of ["repeat: Infinity", "devicePixelRatio", "OrbitControls"]) {
  if ((stage + webgl).includes(forbidden))
    throw new Error(`Motif 3D interdit : ${forbidden}`);
}
console.log("18 variantes 3D : catalogue, fallback et budget de rendu conformes.");
