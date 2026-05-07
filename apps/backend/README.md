# `apps/backend` — KOTIZ Backend (Spring Boot)

Service backend KOTIZ : 9 modules métier (`core`, `savings`, `agents`, `health`, `scoring`, `payments`, `wa`, `notifications`, `admin`) sur monolithe modulaire Spring Boot 3.3 (cf. ADR-001 + ADR-002).

## Status Sprint 1

⚠️ **Placeholder** — sera initialisé via Spring Initializr lors de l'exécution Story 1.1 par Desiré.

## Stack cible (Story 1.1 toolchain)

| Composant | Version | Rôle |
|---|---|---|
| Java | 17.0.13 Temurin | Langage |
| Spring Boot | 3.3.x | Framework |
| Maven | 3.9+ (wrapper `./mvnw`) | Build |
| PostgreSQL | 15.8 | Persistance (Story 1.4) |
| Flyway | latest | Migrations (Story 1.4) |
| Redis | 7.4 | Cache + sessions (Story 1.3a) |
| Testcontainers | latest | Tests d'intégration |

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

- ADR-001 — choix Spring Boot
- ADR-002 — monolithe modulaire (9 modules)
- Story 1.1 AC1 — init Spring Initializr
- Story 1.4 — DB + migrations + ledger double-entrée
- Story 1.5 — observability (logging Loki + masquage PII)
