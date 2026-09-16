# Intégration du système versionné 0.2.0

## Source

Le système provient de
`esigelecParfait/optimallogic-site-template@feat/premium-frontend-system-v2`.
Il est intégré dans ce dépôt sans remplacer le site, ses API ou ses espaces
connectés.

## Correspondance des emplacements

| Dépôt modèle                 | Dépôt OptimalLogic                    | Usage                           |
| ---------------------------- | ------------------------------------- | ------------------------------- |
| `design-system/`             | `design-system/`                      | source des tokens réutilisables |
| `src/styles/`                | `styles/`                             | CSS généré du système           |
| `src/components/primitives/` | `components/primitives/`              | 11 briques élémentaires         |
| `src/components/blocks/`     | `components/blocks/`                  | 28 variantes éditoriales        |
| `src/components/motion/`     | `components/motion/`                  | mouvement accessible            |
| `src/app/showroom/`          | `app/showroom/`                       | vérification interne            |
| `.codex/skills/`             | `.codex/skills/` et `.claude/skills/` | directives agents               |
| pack V2                      | `docs/refonte-v2/`                    | source de vérité de la refonte  |
| médias WebP                  | `public/images/refonte-v2/`           | actifs prêts à intégrer         |

## Éléments volontairement non remplacés

- `app/` et les routes publiques existantes ;
- `package.json` et les versions Next.js/React du site, fusionnés plutôt
  qu'écrasés ;
- routes API et intégrations ;
- authentification, admin et espace client ;
- SQL historique et accès Supabase ;
- configuration Vercel ;
- contenus, logo, offres et tarifs actuels.

## État de migration

- fondations transférées ;
- pack validé ;
- showroom disponible ;
- Quality Gate ajouté ;
- pages publiques V2 non encore assemblées ;
- aucune fusion dans `main` ;
- aucun déploiement production autorisé.

Les pages doivent maintenant être migrées par lots depuis
`docs/refonte-v2/implementation-plan.md`.
