# `apps/backend` — KOTIZ Backend (Spring Boot)

Premier chemin exécutable du backend KOTIZ : application Spring Boot, connexion
PostgreSQL locale, endpoint Actuator de santé et test d'intégration. Ce socle
n'embarque encore aucun comportement métier.

Service backend KOTIZ : monolithe modulaire Spring Boot 4.1 dont les modules sont
matérialisés et vérifiés par **Spring Modulith**
([ADR-011 §6](../../docs/adr/0011-hexagonal-ddd.md)). Les contextes et leur statut
(actif, différé, retiré) sont définis dans le [Context Map](../../CONTEXT-MAP.md) ;
seul un contexte actif reçoit un module.

```
ci.kotiz
├── KotizApplication.java
└── <contexte>/                   # module Spring Modulith (ex. iam)
    ├── package-info.java         # @ApplicationModule
    ├── api/                      # @NamedInterface("api") — seul contrat visible des autres modules
    └── internal/                 # implémentation privée
        ├── domain/               # invariants, sans Spring ni JPA sur les contextes complexes
        ├── application/          # orchestration, transactions
        ├── persistence/          # entités et adapters JPA
        └── web/                  # contrôleurs REST (jamais dans api)
```

Module de référence : `iam` (structure seule, sans règle métier avant D03). Un
module ne référence jamais `autreModule.internal` ; un segment de `internal`
n'est créé que lorsqu'un comportement l'exige.

## Tests d'architecture

| Test             | Preuve                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| `ModularityTest` | `ApplicationModules.verify()` passe ; aucun contexte différé ou retiré                              |
| `ModularityTest` | des applications factices (`kotiz.fixture.modulith`) : accès `api` accepté, accès `internal` refusé |
| `IamModuleTest`  | `@ApplicationModuleTest` démarre le module `iam` seul                                               |

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

| Composant       | Version                | Rôle                    |
| --------------- | ---------------------- | ----------------------- |
| Java            | 21.0.12 Temurin        | Langage                 |
| Spring Boot     | 4.1.1                  | Framework               |
| Maven           | 3.9.14 (`./mvnw`)      | Build                   |
| PostgreSQL      | 15 (dernier correctif) | Persistance (Story 1.4) |
| Flyway          | 12.4.0                 | Migrations techniques   |
| Testcontainers  | 2.0.5                  | Tests d'intégration     |
| Spring Modulith | 2.1.1 (BOM)            | Frontières de modules   |

## Dépendances du socle exécutable

- `actuator` (health, metrics)
- `webmvc` (serveur HTTP embarqué)
- `jdbc` et pilote PostgreSQL (connexion et health indicator)
- `flyway` (migrations au démarrage avec identifiants séparés)
- `testcontainers-postgresql` (preuve d'intégration sur une base propre)
- `test` (test d'intégration du contexte et du health check)
- `spring-modulith-api` (annotations de module) et `spring-modulith-starter-test`
  (vérification des frontières, `@ApplicationModuleTest`)

Les dépendances de sécurité, persistance applicative, OpenAPI et modules métier
seront ajoutées uniquement par les vertical slices qui les utilisent.

## Référence

- [ADR-0016 — contextes actifs du MVP](../../docs/adr/0016-limit-mvp-database-to-active-contexts.md)
- [ADR-0018 — runtimes supportés](../../docs/adr/0018-use-supported-s1-runtime-lines.md)
- Story 1.1 AC1 — init Spring Initializr
- Story 1.4 — DB + migrations + ledger double-entrée
- Story 1.5 — observability (logging Loki + masquage PII)
