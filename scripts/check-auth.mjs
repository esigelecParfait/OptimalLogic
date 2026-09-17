import { readFile } from "node:fs/promises";

const source = await readFile(
  new URL("../design-system/auth.ts", import.meta.url),
  "utf8",
);
for (const family of ["sign-in", "sign-up", "activation", "recovery", "verification"])
  if (!source.includes(`id: "${family}"`))
    throw new Error(`Famille auth absente : ${family}`);
for (const layout of ["centered", "split", "floating", "immersive", "guided", "portal"])
  if (!source.includes(`["${layout}"`)) throw new Error(`Layout auth absent : ${layout}`);
for (const mode of ["disabled", "invite_only", "public"])
  if (!source.includes(`id: "${mode}"`))
    throw new Error(`Mode d’inscription absent : ${mode}`);
const statesBlock = source.split("export const authStates")[1]?.split("];", 1)[0] ?? "";
const states = [...statesBlock.matchAll(/\{ id: "([a-z_]+)", label:/g)].map(
  (match) => match[1],
);
if (states.length !== 11 || new Set(states).size !== 11)
  throw new Error(`11 états auth attendus, ${states.length} trouvés.`);
const stage = await readFile(
  new URL("../components/auth/AuthStage.tsx", import.meta.url),
  "utf8",
);
for (const required of [
  "preventDefault",
  'autoComplete="email"',
  '"current-password"',
  '"new-password"',
  "aria-invalid",
  "aucune donnée n’est transmise",
])
  if (!stage.includes(required)) throw new Error(`Garantie auth absente : ${required}`);
for (const forbidden of [
  "fetch(",
  "localStorage",
  "sessionStorage",
  "supabase",
  "better-auth",
])
  if (stage.includes(forbidden))
    throw new Error(`Connexion backend interdite dans le showroom : ${forbidden}`);
console.log("30 variantes auth : 5 familles, 6 layouts, 11 états et 3 modes conformes.");
