# KOTIZ — Plateforme micro-épargne CI

> **KOTIZ** permet à Fatou (commerçante non-bancarisée d'Adjamé) d'épargner dès 100 FCFA via mobile, USSD, WhatsApp ou agent — avec assurance santé bundlée, score fidélité 5 étoiles, et conformité BCEAO complète. MVP livré 27 juillet 2026, pilote 1 000 clientes.

## Stack

Spring Boot 3.3 + React Native (Expo SDK 54) + Next.js 15 + PostgreSQL 15.8 + Redis 7.4 + Loki + Grafana — monorepo Turborepo 2.3.

> Mobile en RN/Expo plutôt que Flutter — décision 6 mai 2026 (cf. [ADR-009](../05_Architecture/KOTIZ_ADR_009_Mobile_RN_Expo.md)).

## Démarrage rapide (≤ 30 min)

### Prérequis machine

| Outil | Version exacte | Installation |
|---|---|---|
| Node.js | 20.18.0 LTS | `nvm install 20.18.0 && nvm use 20.18.0` |
| pnpm | 9.12.3 | `corepack enable` (PAS `npm install -g`) |
| Java | 17.0.13 Temurin | `sdk install java 17.0.13-tem` |
| Expo Go (device) | dernière | App Store iOS / Play Store Android |
| Docker | ≥ 24.x | Docker Desktop ou OrbStack (Mac M1/M2) |

> Vérifier : `bash scripts/onboarding-check.sh`

### Lancer l'environnement local (8 commandes — Story 1.6 AC2)

```bash
git clone git@github.com:kotiz-ci/kotiz.git && cd kotiz
corepack enable
pnpm install
cp .env.example .env && bash infra/docker/init-dev-secrets.sh   # Story 1.3a remplit init-dev-secrets.sh
pnpm dev:up                                                      # Story 1.3a fournit les services
pnpm db:migrate                                                  # Story 1.4
pnpm db:seed                                                     # Story 1.4
curl http://localhost:8080/actuator/health                       # → {"status":"UP"}
```

### Démarrer une app spécifique

```bash
pnpm dev --filter=mobile        # Metro bundler — scanner QR avec Expo Go
pnpm dev --filter=admin-web     # Next.js dev — http://localhost:3000
pnpm dev --filter=backend       # Spring Boot (Story 1.1 finalise)
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
- **[Onboarding détaillé](docs/onboarding.md)** — par persona dev (≤ 60 min) — _livré Story 1.6_
- **[Troubleshooting](docs/troubleshooting.md)** — 16 problèmes courants — _livré Story 1.6_
- **[Glossaire métier](docs/glossary.md)** — BCEAO, CIMA, KYC Tier, Score 5⭐ — _livré Story 1.6_
- **[Index runbooks](docs/runbooks-index.md)** — restore, rotation clé — _livré Story 1.6_
- **Vidéo Loom (10-15 min) bienvenue Henoch + Desiré** — _livré Story 1.6_

## Architecture

| Doc | Contenu |
|---|---|
| [HLD v2](../05_Architecture/KOTIZ_HLD_v2.md) | Vue d'ensemble (9 modules backend, palette v2, auth, etc.) |
| [ERD v2](../05_Architecture/KOTIZ_ERD_v2.md) | Modèle de données (38 tables) |
| [ADR-001 Backend](../05_Architecture/KOTIZ_ADR_001_Choix_Backend.docx) | Choix Spring Boot |
| [ADR-002 Architecture modulaire](../05_Architecture/KOTIZ_ADR_002_Architecture_Modulaire.docx) | Monolithe modulaire |
| [ADR-003 Score 5⭐](../05_Architecture/KOTIZ_ADR_003_Score_5_Etoiles.md) | Algorithme score |
| [ADR-004 USSD MVP](../05_Architecture/KOTIZ_ADR_004_USSD_MVP.md) | USSD via Orange Business |
| [ADR-005 Data Residency UEMOA](../05_Architecture/KOTIZ_ADR_005_Data_Residency_UEMOA.md) | Hébergement Abidjan + runners CI |
| [ADR-006 Prime Santé](../05_Architecture/KOTIZ_ADR_006_Prime_Sante_Unite.md) | Assurance bundle J+1 |
| [ADR-007 RBAC 8 rôles](../05_Architecture/KOTIZ_ADR_007_RBAC_8_Roles.md) | Sécurité + SoD |
| [ADR-008 Monorepo Turborepo](../05_Architecture/KOTIZ_ADR_008_Monorepo_Turborepo.md) | Choix monorepo |
| [ADR-009 Mobile RN/Expo](../05_Architecture/KOTIZ_ADR_009_Mobile_RN_Expo.md) | Mobile en React Native |
| [Plan DevOps v2](../05_Architecture/KOTIZ_Plan_DevOps_v2.md) | CI/CD + secrets + observability |
| [Plan Sécurité v2](../05_Architecture/KOTIZ_Plan_Securite_v2.md) | OWASP top 10 + supply chain |

## Structure du monorepo (cf. [ADR-008](../05_Architecture/KOTIZ_ADR_008_Monorepo_Turborepo.md))

```
kotiz/
├── apps/
│   ├── mobile/          # RN/Expo SDK 54 — Cliente + Agent (un seul codebase)
│   ├── backend/         # Spring Boot 3.3 — 9 modules métier
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
- Commit signé GPG sinon CI rouge

## Qui contacter

| Domaine | Personne | Slack |
|---|---|---|
| Backend / Architecture | Desiré (CTO) | @desire |
| Mobile RN/Expo | Dev #3 | @dev3 _(à recruter — cible 12 mai)_ |
| Admin web / USSD | Dev #4 | @dev4 _(à recruter — cible 12 mai)_ |
| Compliance / PRD / Design | Henoch (Fondateur) | @henoch |
| UX/UI | Sally | @sally |

## Sprints MVP (cf. [sprint-status.yaml](../_bmad-output/implementation-artifacts/sprint-status.yaml))

| Sprint | Dates | Focus |
|---|---|---|
| Pré-S0 | 28 avril → 4 mai | Recrutement dev #2 + setup |
| **Sprint 1** | **5 → 18 mai 2026** | **Socle technique (Epic 1) + DS début + Auth début** |
| Sprint 2 | 19 mai → 1 juin | Fin DS + fin Auth + Wallet & MM début |
| Sprint 3 | 2 → 15 juin | Fin Wallet + Épargne + Agents début |
| Sprint 4 | 16 → 29 juin | Fin Agents + Santé bundle + USSD/WA + Admin |
| Sprint 5 | 30 juin → 13 juillet | Fin Santé + Score 5⭐ + DPIA |
| Sprint 6 | 14 → 27 juillet | Tests terrain + Audit pentest + BCEAO + Go-live pilote 1 000 clientes |

## Décisions techniques validées (28 avril 2026)

- Coverage tests ≥ 80% (DoD per_story)
- Loki en MVP (pas ELK)
- Stored procedure pour ledger double-entrée
- AES-256-GCM pour PII
- Loom video obligatoire pour démos
- USSD MVP via Orange Business Abidjan
- RBAC 8 rôles (cf. ADR-007)
- **Mobile en RN/Expo** (cf. ADR-009 — décision 6 mai 2026)

## Licence

Proprietary © KOTIZ SAS 2026 — voir [LICENSE](LICENSE)
