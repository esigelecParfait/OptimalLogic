import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const sourcePath = resolve(projectRoot, "design-system/foundation-tokens.json");
const outputPath = resolve(projectRoot, "src/styles/tokens.generated.css");

const tokenDocument = JSON.parse(await readFile(sourcePath, "utf8"));

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();

const variableName = (path) => {
  const [layer, ...parts] = path.split(".");
  const prefix = layer === "primitive" ? "ol" : "";
  return "--" + [prefix, ...parts].filter(Boolean).map(toKebabCase).join("-");
};

const flatten = (value, path, target) => {
  for (const [key, entry] of Object.entries(value)) {
    const nextPath = path ? path + "." + key : key;
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      flatten(entry, nextPath, target);
    } else if (typeof entry === "string" || typeof entry === "number") {
      target.set(nextPath, String(entry));
    }
  }
};

const tokens = new Map();
flatten(tokenDocument.primitive, "primitive", tokens);
flatten(tokenDocument.semantic, "semantic", tokens);

const referencePattern = /\{([^}]+)\}/g;
const toCssValue = (value) =>
  value.replace(referencePattern, (_, referencePath) => {
    if (!tokens.has(referencePath)) {
      throw new Error("Unknown token reference: " + referencePath);
    }
    return "var(" + variableName(referencePath) + ")";
  });

const lines = [
  "/* Generated from design-system/foundation-tokens.json. Do not edit directly. */",
  ":root {",
  ...Array.from(
    tokens,
    ([path, value]) => "  " + variableName(path) + ": " + toCssValue(value) + ";",
  ),
  "}",
  "",
];

await writeFile(outputPath, lines.join("\n"), "utf8");
console.log("Generated " + outputPath);
