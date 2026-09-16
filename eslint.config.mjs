import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Archives et ressources d'agents : elles ne sont pas exécutées par le site.
    "OptimalLogic-pre-refonte-backup/**",
    // Routes de référence conservées pendant la migration et non publiées
    // dans la navigation finale. Elles seront supprimées ou remises à niveau
    // dans le lot dédié du plan de refonte.
    "app/preview/**",
    ".claude/skills/**",
    ".codex/skills/**",
    // Scripts Apps Script conservés comme documentation externe.
    "docs/google-apps-script-*.js",
  ]),
]);

export default eslintConfig;
