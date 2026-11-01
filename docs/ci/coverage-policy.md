# Politique de couverture CI

Toute logique exécutable modifiée doit être couverte à au moins 80 % sur les
lignes, fonctions et branches que son outil sait mesurer. Le seuil est appliqué
dans la commande `test` du workspace afin qu'un run Turborepo affecté ne puisse
pas le contourner.

## Gates actifs

| Workspace                | Périmètre mesuré                    | Gate                           |
| ------------------------ | ----------------------------------- | ------------------------------ |
| `apps/backend`           | classes Java applicatives           | JaCoCo `verify`, lignes ≥ 80 % |
| `apps/mobile`            | routes `app/` et couches FSD `src/` | Jest `--coverage` ≥ 80 %       |
| `packages/shared-utils`  | utilitaires FCFA, téléphone et RBAC | Node test coverage ≥ 80 %      |
| `packages/design-tokens` | génération et validation des tokens | Node test coverage ≥ 80 %      |

Le contrôle `coverage:scope:affected` refuse toute modification de source
exécutable qui n'entre pas dans l'un de ces gates. Les routes et composants React
Native sont mesurés par Jest (`jest-expo`) et React Native Testing Library.

Ce contrôle de périmètre s'applique aux pull requests de tickets vers `develop`.
Le mode promotion (`develop` vers `main`) tolère en plus un fichier exécutable
non couvert intégré avant l'activation du gate, seulement si son blob Git
correspond exactement à l'empreinte legacy enregistrée dans
`check-coverage-scope.mjs`. Cette liste est vide depuis que Jest mesure `app/` et
`src/` du mobile : les cinq fichiers qu'elle contenait sont désormais couverts ou
déclarés ci-dessous. Tout nouvel exécutable non couvert reste bloqué. La promotion
réexécute également les tests, le lint, le type-check et le build des workspaces
affectés sur la différence complète avec `main`.

## Exceptions déclaratives

- `packages/api-types/src/index.ts` ne contient actuellement que des types et un
  placeholder de génération OpenAPI : aucune instruction runtime à mesurer.
- `packages/design-tokens/tokens.json` est une source de données déclarative. Sa
  structure et ses valeurs sont vérifiées par le validateur couvert.
- Les barrels `src/index.ts`, les fichiers de types et les artefacts générés de
  `packages/design-tokens/dist/` ne portent aucune décision exécutable propre.
- `apps/mobile/src/shared/ui/theme.ts` est un adaptateur déclaratif sans branche
  qui expose les design tokens générés au runtime React Native.
- `apps/mobile/app.config.ts` est la configuration Expo dynamique ; elle est validée
  par `expo-doctor`, le type-check des deux variants et les tests de contrat Story 1.1.
- `apps/mobile/jest.config.js` et `apps/mobile/eslint.config.js` déclarent l'outillage.
  Les règles FSD d'`eslint.config.js` sont prouvées par `test/fsd-boundaries.test.mjs`.
- `eslint.config.mjs` est une déclaration de règles sans logique métier. Une
  modification invalide toutefois tous les workspaces via Turborepo.
- `apps/admin-web` est encore un placeholder documentaire sans code applicatif.

Une nouvelle exception doit nommer le fichier, expliquer pourquoi aucune logique
n'est exécutable et être relue dans la PR. Une baisse de seuil n'est pas une
exception acceptable.
