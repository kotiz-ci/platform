# `apps/backend` — KOTIZ Backend (Spring Boot)

Service backend KOTIZ : monolithe modulaire Spring Boot 4.1 découpé en **11 bounded contexts** :
`savings`, `scoring` (core), `agents`, `health`, `payments`, `growth`, `admin` (supporting), `iam` (ex-`core`), `notifications`, `wa`, `ussd` (generic/canal).

La portée active, différée ou retirée de chaque contexte est définie dans le
[Context Map](../../CONTEXT-MAP.md). Chaque contexte actif suivra une structure
hexagonale `domain / application / infrastructure`. Module de référence : `savings`.

```
com.kotiz.<context>
├── domain/          (agrégats, VO, événements — zéro dépendance framework)
├── application/     (port/in = cas d'usage, port/out = ports sortants, service = impl.)
└── infrastructure/  (adapter/in rest+event, adapter/out persistence(JPA)+acl, config)
```

## Status Sprint 1

⚠️ **Placeholder** — sera initialisé via Spring Initializr lors de l'exécution Story 1.1 par Desiré.

## Stack cible (Story 1.1 toolchain)

| Composant      | Version                 | Rôle                    |
| -------------- | ----------------------- | ----------------------- |
| Java           | 21.0.12 Temurin         | Langage                 |
| Spring Boot    | 4.1.x                   | Framework               |
| Maven          | 3.9+ (wrapper `./mvnw`) | Build                   |
| PostgreSQL     | 15 (dernier correctif)  | Persistance (Story 1.4) |
| Flyway         | latest                  | Migrations (Story 1.4)  |
| Testcontainers | latest                  | Tests d'intégration     |

## Dépendances Spring Initializr (à demander Story 1.1)

- `web` (Spring MVC)
- `security` (Spring Security)
- `data-jpa` + `validation`
- `actuator` (health, metrics)
- `springdoc-openapi-starter-webmvc-ui` 2.x (génère `/v3/api-docs` consommé par `packages/api-types`)
- `lombok`
- `flyway-core` + `flyway-database-postgresql`
- `postgresql` (runtime)
- `testcontainers` (test scope)
- `pgaudit` (configuration applicative — Story 1.4 AC4)

## Référence

- [ADR-0001 — contextes actifs du MVP](../../docs/adr/0001-limit-mvp-database-to-active-contexts.md)
- [ADR-0003 — runtimes supportés](../../docs/adr/0003-use-supported-s1-runtime-lines.md)
- Story 1.1 AC1 — init Spring Initializr
- Story 1.4 — DB + migrations + ledger double-entrée
- Story 1.5 — observability (logging Loki + masquage PII)
