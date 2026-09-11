# `apps/backend` — KOTIZ Backend (Spring Boot)

Premier chemin exécutable du backend KOTIZ : application Spring Boot, connexion
PostgreSQL locale, endpoint Actuator de santé et test d'intégration. Ce socle
n'embarque encore aucun comportement métier.

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

Le profil `local` contient uniquement les paramètres de connexion non sensibles.
Compose monte les mots de passe PostgreSQL générés hors Git via un config tree
Spring. JDBC se connecte avec `kotiz_app`, sans droit de structure, et Flyway avec
`kotiz_migrator`, propriétaire du schéma.

## Stack cible (Story 1.1 toolchain)

| Composant      | Version                | Rôle                    |
| -------------- | ---------------------- | ----------------------- |
| Java           | 21.0.12 Temurin        | Langage                 |
| Spring Boot    | 4.1.1                  | Framework               |
| Maven          | 3.9.14 (`./mvnw`)      | Build                   |
| PostgreSQL     | 15 (dernier correctif) | Persistance (Story 1.4) |
| Flyway         | 12.4.0                 | Migrations techniques   |
| Testcontainers | 2.0.5                  | Tests d'intégration     |

## Dépendances du socle exécutable

- `actuator` (health, metrics)
- `webmvc` (serveur HTTP embarqué)
- `jdbc` et pilote PostgreSQL (connexion et health indicator)
- `flyway` (migrations au démarrage avec identifiants séparés)
- `testcontainers-postgresql` (preuve d'intégration sur une base propre)
- `test` (test d'intégration du contexte et du health check)

Les dépendances de sécurité, persistance applicative, OpenAPI et modules métier
seront ajoutées uniquement par les vertical slices qui les utilisent.

## Référence

- [ADR-0001 — contextes actifs du MVP](../../docs/adr/0001-limit-mvp-database-to-active-contexts.md)
- [ADR-0003 — runtimes supportés](../../docs/adr/0003-use-supported-s1-runtime-lines.md)
- Story 1.1 AC1 — init Spring Initializr
- Story 1.4 — DB + migrations + ledger double-entrée
- Story 1.5 — observability (logging Loki + masquage PII)
