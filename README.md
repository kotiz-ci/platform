# KOTIZ — Plateforme micro-épargne CI

> **KOTIZ** permet à Fatou (commerçante non-bancarisée d'Adjamé) d'épargner
> dès 100 FCFA depuis l'application cliente ou avec l'assistance de Moussa,
> agent KOTIZ. Le socle MVP réduit active IAM, Savings, Agents, Payments,
> Notifications et Admin & Conformité.

## Stack

Spring Boot 4.1 + React Native (Expo SDK 58) + Next.js 15 + PostgreSQL 15 —
monorepo Turborepo 2.3.

> Les lignes de runtime sont fixées par
> [ADR-0018](docs/adr/0018-use-supported-s1-runtime-lines.md), et les deux
> variantes mobiles par [ADR-0019](docs/adr/0019-use-expo-mobile-variants.md).

## Démarrage rapide (≤ 30 min)

### Prérequis machine

| Outil            | Version exacte  | Installation                             |
| ---------------- | --------------- | ---------------------------------------- |
| Node.js          | 24.21.0 LTS     | `nvm install 24.21.0 && nvm use 24.21.0` |
| pnpm             | 9.12.3          | `corepack enable` (PAS `npm install -g`) |
| Java             | 21.0.12 Temurin | `sdk install java 21.0.12-tem`           |
| Expo Go (device) | dernière        | App Store iOS / Play Store Android       |
| Docker           | ≥ 24.x          | Docker Desktop ou OrbStack (Mac M1/M2)   |

> Vérifier : `bash scripts/onboarding-check.sh`

### Lancer l'environnement local

```bash
git clone git@github.com:kotiz-ci/platform.git && cd platform
corepack enable
pnpm install
pnpm dev:up
curl http://localhost:8080/actuator/health # → {"status":"UP"}
```

`pnpm dev:up` génère automatiquement le secret PostgreSQL local hors Git, construit
le backend, démarre PostgreSQL 15.19 et attend que les deux services soient sains.
Voir [`infra/docker/README.md`](infra/docker/README.md) pour l'arrêt et la remise à zéro.

### Démarrer une app spécifique

```bash
pnpm dev --filter=mobile        # Metro bundler — scanner QR avec Expo Go
pnpm dev --filter=admin-web     # Next.js dev — http://localhost:3000
pnpm dev --filter=backend       # Spring Boot — http://127.0.0.1:8080
```

### Tester / build (Turborepo)

```bash
pnpm build                              # build incrémental (cache hit = >>> FULL TURBO)
pnpm test                               # tous tests
pnpm lint && pnpm type-check            # qualité statique
pnpm turbo run test --filter=...[origin/main]  # tests des apps modifiées seulement
```

## Pour aller plus loin

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Conventional Commits FR + GPG signing obligatoire
- Onboarding détaillé par persona dev (≤ 60 min) — _prévu Story 1.6_
- Troubleshooting — _prévu Story 1.6_
- Glossaire métier — _prévu Story 1.6_
- Index des runbooks — _prévu Story 1.6_
- **Vidéo Loom (10-15 min) bienvenue Henoch + Desiré** — _livré Story 1.6_

## Architecture

| Doc                                                                | Contenu                                             |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| [Context Map](CONTEXT-MAP.md)                                      | Contextes actifs, différés et retirés du MVP réduit |
| [ADR-0001](docs/adr/0001-choix-backend.md)                         | Backend Spring Boot (cadrage)                       |
| [ADR-0002](docs/adr/0002-architecture-modulaire.md)                | Monolithe modulaire                                 |
| [ADR-0003](docs/adr/0003-score-5-etoiles.md)                       | Score KOTIZ en 5 étoiles                            |
| [ADR-0004](docs/adr/0004-ussd-mvp.md)                              | USSD léger dans le MVP                              |
| [ADR-0005](docs/adr/0005-data-residency-uemoa.md)                  | Hébergement et data residency UEMOA                 |
| [ADR-0006](docs/adr/0006-prime-sante-unite.md)                     | Prime Santé : unité de stockage                     |
| [ADR-0007](docs/adr/0007-rbac-8-roles.md)                          | RBAC en 8 rôles                                     |
| [ADR-0008](docs/adr/0008-monorepo-turborepo.md)                    | Monorepo Turborepo                                  |
| [ADR-0009](docs/adr/0009-mobile-rn-expo.md)                        | Mobile React Native / Expo                          |
| [ADR-0010](docs/adr/0010-mobile-variants.md)                       | Variantes mobiles Client / Agent                    |
| [ADR-0011](docs/adr/0011-hexagonal-ddd.md)                         | Modules Spring Modulith `api` / `internal` (§6)     |
| [ADR-0015](docs/adr/0015-feature-sliced-design-frontends.md)       | Feature-Sliced Design pour mobile et admin          |
| [ADR-0016](docs/adr/0016-limit-mvp-database-to-active-contexts.md) | Limite des contextes actifs en base                 |
| [ADR-0017](docs/adr/0017-promote-develop-to-main.md)               | Promotion protégée `develop` vers `main`            |
| [ADR-0018](docs/adr/0018-use-supported-s1-runtime-lines.md)        | Lignes de runtime supportées                        |
| [ADR-0019](docs/adr/0019-use-expo-mobile-variants.md)              | Un codebase Expo, deux variantes mobiles            |

## Structure du monorepo

```
kotiz/
├── apps/
│   ├── mobile/          # RN/Expo SDK 58 — Cliente + Agent (un seul codebase), FSD
│   ├── backend/         # Spring Boot 4.1 + Spring Modulith — un module par contexte actif
│   └── admin-web/       # Next.js 15 — Console OPS / RISK / FINANCE / PO / ADMIN / AUDITOR
├── packages/
│   ├── design-tokens/   # @kotiz/design-tokens — 17 couleurs v2 + Inter + radii + spacing
│   ├── api-types/       # @kotiz/api-types — TS générés depuis OpenAPI backend
│   └── shared-utils/    # @kotiz/shared-utils — formatFcfa, normalizePhoneCI, RBAC
├── infra/
│   ├── docker/          # Compose dev (Story 1.3a) + prod overlay (Story 1.3b)
│   ├── nginx/           # Reverse proxy TLS (Story 1.3b)
│   ├── github-actions/  # Reusable workflows (Story 1.2)
│   └── runbooks/        # Procédures opérationnelles
├── .github/
│   ├── CODEOWNERS       # Review automatique par dossier
│   ├── dependabot.yml   # Scan deps quotidien
│   ├── workflows/       # ci.yml + nightly.yml + weekly.yml (Story 1.2)
│   └── ISSUE_TEMPLATE/
├── docs/                # onboarding, troubleshooting, glossary, runbooks-index (Story 1.6)
├── scripts/             # onboarding-check.sh + utilitaires
├── turbo.json           # Config Turborepo
├── pnpm-workspace.yaml  # Monorepo packages
├── tsconfig.base.json   # TS config strict partagé
└── CONTRIBUTING.md      # Conventional Commits FR + GPG
```

## Conventions

- [CONTRIBUTING.md](CONTRIBUTING.md) — Conventional Commits FR + signature GPG obligatoire (Plan Sécu §A08)
- [.github/CODEOWNERS](.github/CODEOWNERS) — review automatique par dossier
- TypeScript strict mode partout (mobile + admin-web + packages)
- Java : Google Java Style + Lombok + records (backend)
- Architecture : modules Spring Modulith `ci.kotiz.<contexte>` côté backend, Feature-Sliced Design côté frontends ([CONTRIBUTING.md](CONTRIBUTING.md#architecture-du-code))
- Commit signé GPG sinon CI rouge

## Qui contacter

| Domaine                   | Personne           | Slack                               |
| ------------------------- | ------------------ | ----------------------------------- |
| Backend / Architecture    | Desiré (CTO)       | @desire                             |
| Mobile RN/Expo            | Dev #3             | @dev3 _(à recruter — cible 12 mai)_ |
| Admin web / USSD          | Dev #4             | @dev4 _(à recruter — cible 12 mai)_ |
| Compliance / PRD / Design | Henoch (Fondateur) | @henoch                             |
| UX/UI                     | Sally              | @sally                              |

## Sprints MVP

| Sprint       | Dates                | Focus                                                                 |
| ------------ | -------------------- | --------------------------------------------------------------------- |
| Pré-S0       | 28 avril → 4 mai     | Recrutement dev #2 + setup                                            |
| **Sprint 1** | **5 → 18 mai 2026**  | **Socle technique (Epic 1) + DS début + Auth début**                  |
| Sprint 2     | 19 mai → 1 juin      | Fin DS + fin Auth + Wallet & MM début                                 |
| Sprint 3     | 2 → 15 juin          | Fin Wallet + Épargne + Agents début                                   |
| Sprint 4     | 16 → 29 juin         | Fin Agents + Santé bundle + USSD/WA + Admin                           |
| Sprint 5     | 30 juin → 13 juillet | Fin Santé + Score 5⭐ + DPIA                                          |
| Sprint 6     | 14 → 27 juillet      | Tests terrain + Audit pentest + BCEAO + Go-live pilote 1 000 clientes |

## Décisions techniques validées (28 avril 2026)

- Coverage tests ≥ 80% (DoD per_story)
- Loki en MVP (pas ELK)
- Stored procedure pour ledger double-entrée
- AES-256-GCM pour PII
- Loom video obligatoire pour démos
- USSD MVP via Orange Business Abidjan
- RBAC 8 rôles (à préciser dans une ADR dédiée avant implémentation)
- **Mobile en RN/Expo**, deux variantes depuis un codebase
  ([ADR-0019](docs/adr/0019-use-expo-mobile-variants.md))

## Licence

Proprietary © KOTIZ SAS 2026 — voir [LICENSE](LICENSE)
