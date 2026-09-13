# Politique de couverture CI

Toute logique exécutable modifiée doit être couverte à au moins 80 % sur les
lignes, fonctions et branches que son outil sait mesurer. Le seuil est appliqué
dans la commande `test` du workspace afin qu'un run Turborepo affecté ne puisse
pas le contourner.

## Gates actifs

| Workspace                | Périmètre mesuré                        | Gate                           |
| ------------------------ | --------------------------------------- | ------------------------------ |
| `apps/backend`           | classes Java applicatives               | JaCoCo `verify`, lignes ≥ 80 % |
| `apps/mobile`            | politique et adaptateur de variant Expo | Node test coverage ≥ 80 %      |
| `packages/shared-utils`  | utilitaires FCFA, téléphone et RBAC     | Node test coverage ≥ 80 %      |
| `packages/design-tokens` | génération et validation des tokens     | Node test coverage ≥ 80 %      |

Le contrôle `coverage:scope:affected` refuse toute modification de source
exécutable qui n'entre pas dans l'un de ces gates. Les routes React Native ne
disposent pas encore d'un runner JSX instrumenté : leur modification est donc
bloquée jusqu'à l'ajout de ce runner, ou jusqu'à l'extraction de leur logique dans
un module `lib/*.ts` couvert.

## Exceptions déclaratives

- `packages/api-types/src/index.ts` ne contient actuellement que des types et un
  placeholder de génération OpenAPI : aucune instruction runtime à mesurer.
- `packages/design-tokens/tokens.json` est une source de données déclarative. Sa
  structure et ses valeurs sont vérifiées par le validateur couvert.
- Les barrels `src/index.ts`, les fichiers de types et les artefacts générés de
  `packages/design-tokens/dist/` ne portent aucune décision exécutable propre.
- `apps/mobile/lib/theme.ts` est un adaptateur déclaratif sans branche qui expose
  les design tokens générés au runtime React Native.
- `eslint.config.mjs` est une déclaration de règles sans logique métier. Une
  modification invalide toutefois tous les workspaces via Turborepo.
- `apps/admin-web` est encore un placeholder documentaire sans code applicatif.

Une nouvelle exception doit nommer le fichier, expliquer pourquoi aucune logique
n'est exécutable et être relue dans la PR. Une baisse de seuil n'est pas une
exception acceptable.
