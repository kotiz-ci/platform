# `apps/backend` — KOTIZ Backend (Spring Boot)

Premier chemin exécutable du backend KOTIZ : application Spring Boot, endpoint
Actuator de santé et test d'intégration. Ce socle n'embarque ni accès base de
données, ni comportement métier.

Service backend KOTIZ : monolithe modulaire Spring Boot 4.1 découpé en **11 bounded contexts** :
`savings`, `scoring` (core), `agents`, `health`, `payments`, `growth`, `admin` (supporting), `iam` (ex-`core`), `notifications`, `wa`, `ussd` (generic/canal).

La portée active, différée ou retirée de chaque contexte est définie dans le
[Context Map](../../CONTEXT-MAP.md). Chaque contexte actif suivra une structure
hexagonale `domain / application / infrastructure`. Module de référence : `savings`.

```
ci.kotiz.backend.<context>
├── domain/          (agrégats, VO, événements — zéro dépendance framework)
├── application/     (port/in = cas d'usage, port/out = ports sortants, service = impl.)
└── infrastructure/  (adapter/in rest+event, adapter/out persistence(JPA)+acl, config)
```

## Exécution locale

Le wrapper Maven verrouille Maven 3.9.14 ; aucune installation Maven globale
n'est requise. La version Java attendue est Eclipse Temurin 21.0.12+8, déclarée
à la racine dans `.tool-versions`.

```bash
pnpm --filter backend dev
curl http://127.0.0.1:8080/actuator/health # → {"status":"UP"}
pnpm --filter backend test
```

Le profil `local` ne contient aucun secret. Les futurs secrets d'infrastructure
seront introduits avec les stories qui en ont besoin.

## Stack cible (Story 1.1 toolchain)

| Composant      | Version                | Rôle                    |
| -------------- | ---------------------- | ----------------------- |
| Java           | 21.0.12 Temurin        | Langage                 |
| Spring Boot    | 4.1.1                  | Framework               |
| Maven          | 3.9.14 (`./mvnw`)      | Build                   |
| PostgreSQL     | 15 (dernier correctif) | Persistance (Story 1.4) |
| Flyway         | latest                 | Migrations (Story 1.4)  |
| Testcontainers | latest                 | Tests d'intégration     |

## Dépendances du socle exécutable

- `actuator` (health, metrics)
- `webmvc` (serveur HTTP embarqué)
- `test` (test d'intégration du contexte et du health check)

Les dépendances de sécurité, persistance, migration, OpenAPI et modules métier
seront ajoutées uniquement par les vertical slices qui les utilisent.

## Référence

- [ADR-0001 — contextes actifs du MVP](../../docs/adr/0001-limit-mvp-database-to-active-contexts.md)
- [ADR-0003 — runtimes supportés](../../docs/adr/0003-use-supported-s1-runtime-lines.md)
- Story 1.1 AC1 — init Spring Initializr
- Story 1.4 — DB + migrations + ledger double-entrée
- Story 1.5 — observability (logging Loki + masquage PII)
