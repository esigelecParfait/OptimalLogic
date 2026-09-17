# OptimalLogic

Site public, espaces connectés et outils opérationnels OptimalLogic.

La refonte premium est préparée sur `champion`. La branche `main` reste la
version stable tant que la refonte n'a pas reçu de validation humaine, une QA
PASS et une autorisation de mise en production.

## Dossier de refonte

- dossier directeur : `docs/refonte-final/` ;
- `docs/refonte-v2/` : historique uniquement ;
- tokens : `design-system/foundation-tokens.json` ;
- primitives : `components/primitives/` ;
- 28 variantes de blocs : `components/blocks/` ;
- mouvement accessible : `components/motion/` ;
- skills Codex : `.codex/skills/` ;
- skills lisibles par Claude Code : `.claude/skills/optimallogic-*/` ;
- showroom interne : `/showroom` ;
- Quality Gate : `.github/workflows/quality.yml`.

La spécification cible trois offres : Présence digitale, Accueil & qualification
par SMS, Accueil & qualification par appels + SMS. La configuration backend ne
doit pas être modifiée : les noms et prix restent lus depuis Supabase par le
mécanisme existant, sans valeur de secours codée en dur. Les trois animations
fortes sont réservées à l’Accueil et aux Services.

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
