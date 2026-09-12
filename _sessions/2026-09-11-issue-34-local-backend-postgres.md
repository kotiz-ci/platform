# Session — Issue #34 : backend et PostgreSQL local

## Contexte

- Ticket : GitHub issue #34, bloqué auparavant par #31 désormais fermé.
- Branche isolée : `feat/local-backend-postgres` dans un worktree dédié.
- Base mise à jour : `origin/develop` à `8df5f03`.
- Aucun changement du ticket #32 n'a été lu, modifié ou intégré.

## Livraison

- Compose contient uniquement le backend KOTIZ et PostgreSQL 15.19 Alpine 3.24.
- `pnpm dev:up` génère le secret PostgreSQL hors Git, construit les services et
  attend leurs health checks.
- Le backend utilise PostgreSQL via JDBC et expose Actuator sur
  `localhost:8080/actuator/health`.
- `pnpm dev:down` conserve `pgdata`; `pnpm dev:reset` supprime les volumes.
- `pnpm verify:local-dev` exécute une recette isolée de santé, persistance et reset.
- Les images Java sont verrouillées sur Temurin 21.0.12+8 / Alpine 3.24.

## TDD et preuves

- RED initial : 4 tests en échec sur le placeholder Compose, les scripts absents et
  la documentation de clone frais manquante.
- GREEN contrat : 5 tests verts, dont la recette Docker réelle activée par
  `KOTIZ_RUN_DOCKER_TESTS=1`.
- Runtime : backend et PostgreSQL sains; health HTTP `UP`; valeur `preserved`
  retrouvée après `down` puis `up`; volume supprimé après `down -v`.
- Backend : compilation et test Spring Boot/JDBC/H2 verts sous Java 21.
- TypeScript : 7 tâches de type-check vertes sous Node 24.21.0 et pnpm 9.12.3.

## Revue

La double revue standards/spec a signalé les images Java flottantes, l'absence de
recette automatisée, la dépendance `openssl` et une garde anti-secret insuffisante.
Les quatre points ont été corrigés avant la validation finale.
