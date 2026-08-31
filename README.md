# OptimalLogic

Site public, espaces connectés et outils opérationnels OptimalLogic.

La refonte premium V2 est préparée sur `feat/refonte-premium-v2`. La branche
`main` reste la version stable tant que la refonte n'a pas reçu de validation
humaine et d'autorisation de mise en production.

## Système V2 transféré

- dossier directeur : `docs/refonte-v2/` ;
- tokens : `design-system/foundation-tokens.json` ;
- primitives : `components/primitives/` ;
- 28 variantes de blocs : `components/blocks/` ;
- mouvement accessible : `components/motion/` ;
- skills Codex : `.codex/skills/` ;
- skills lisibles par Claude Code : `.claude/skills/optimallogic-*/` ;
- showroom interne : `/showroom` ;
- Quality Gate : `.github/workflows/quality.yml`.

Les pages publiques principales consomment désormais ces fondations. Les trois visuels de
la refonte sont utilisés sur l’accueil, les services et le contact. La page Tarifs publie
cinq codes d’offres et lit leurs noms et montants depuis Supabase, sans prix de secours.
Le dashboard client a été retiré du parcours : `/espace-client` mène directement au
support authentifié.

## Installation

```bash
npm install
npm run setup:browsers
```

Créer ensuite un fichier `.env.local` à partir de `.env.example`, avec des
valeurs propres à l'environnement local.

## Commandes

```bash
npm run dev
npm run tokens
npm run format
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:functional
npm run test:responsive
npm run test:performance
npm run check:all
```

La procédure détaillée et les corrections usuelles se trouvent dans
`docs/QUALITY-CONTROLS.md`.
