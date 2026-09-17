import { readFile } from "node:fs/promises";

const source = await readFile(
  new URL("../design-system/motion.ts", import.meta.url),
  "utf8",
);
const expected = { micro: 8, type: 6, svg: 6, scroll: 6, css3d: 4, webgl: 4 };
const ids = [
  ...source.matchAll(/\["((?:micro|type|svg|scroll|css3d|webgl)-[a-z-]+)",/g),
].map((match) => match[1]);
const unique = new Set(ids);
if (ids.length !== 34 || unique.size !== 34)
  throw new Error(
    `34 identifiants uniques attendus, ${ids.length}/${unique.size} trouvés.`,
  );
for (const [prefix, count] of Object.entries(expected)) {
  const actual = ids.filter((id) => id.startsWith(`${prefix}-`)).length;
  if (actual !== count)
    throw new Error(`${prefix}: ${count} presets attendus, ${actual} trouvés.`);
}
const implementation = await Promise.all(
  [
    "../components/motion/MotionStage.tsx",
    "../components/motion/WebGLStage.tsx",
    "../components/motion/motion.module.css",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
).then((files) => files.join("\n"));
for (const forbidden of ["scroll-jacking", "repeat: Infinity", "cursor: none"])
  if (implementation.includes(forbidden))
    throw new Error(`Motif interdit détecté : ${forbidden}`);
console.log("34 presets motion : identifiants, familles et interdits conformes.");
