---
title: ADR-008 — Monorepo Turborepo (au lieu de monorepo simple ou polyrepo)
status: ACCEPTÉE
date: 2026-04-26
decision_makers:
  - Henoch Lonzo Koffi (Fondateur)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-001 (Spring Boot)
  - ADR-002 (Monolithe modulaire — backend)
references:
  - Code/platform/docs/product/prd-mvp.md §1 (équipe MVP — 4 devs)
  - Code/platform/docs/product/epics.md Story 1.1
classification: Confidentiel — Usage interne
---

# ADR-008 — Monorepo Turborepo

## 1. Contexte

L'équipe MVP a été dimensionnée à **4 développeurs** (vs 3 initialement prévus) :

- Dev #1 : Desiré (CTO) — backend + architecture
- Dev #2 : backend Spring Boot
- Dev #3 : mobile Flutter
- Dev #4 : fullstack ou frontend (admin web + USSD + viralité)

La story 1.1 v1 prévoyait un « monorepo Git simple » avec dossiers `mobile/`, `backend/`, `admin-web/`, `shared/`, `infra/`. Avec 4 devs en parallèle sur 6 sprints, ce choix présente 2 problèmes :

1. **CI complète à chaque commit** : un commit qui touche 2 lignes Flutter relance le build Spring Boot + tests admin-web. Sur 6 sprints, ça représente plusieurs heures perdues / dev / semaine.
2. **Cache de build absent** : un dev qui pull la branche d'un autre re-builde tout, même ce qui n'a pas bougé.

## 2. Options envisagées

### Option A — Monorepo simple (story 1.1 v1)

- Un seul repo, un seul `package.json` racine, scripts npm naïfs.
- ✅ Atomicité commits cross-cutting
- ✅ 1 seul clone, 1 seul tracker
- ❌ CI matrix complexe à construire à la main
- ❌ Pas de cache → builds lents à 4 devs

### Option B — Polyrepo (3 repos)

`kotiz-mobile`, `kotiz-backend`, `kotiz-admin-web` + 1 package `kotiz-design-tokens` publié sur registre privé.

- ✅ Builds rapides par projet
- ✅ Permissions Git fines
- ❌ Coordination releases lourde (chaque feature cross-cutting = 3 PRs synchronisées)
- ❌ Design system à publier comme package (overhead pour 3 mois MVP)
- ❌ Audit BCEAO/CIMA plus difficile (1 commit hash ≠ état complet)

### Option C — Monorepo Turborepo (RETENUE)

Un seul repo avec Turborepo qui détecte les changements et ne rebuild/retest que les apps impactées.

- ✅ Atomicité commits cross-cutting (option A)
- ✅ Builds rapides (cache + filtrage Turborepo)
- ✅ 1 commit hash = état complet du système (audit BCEAO ↗)
- ✅ Standard de l'industrie fintech (Stripe, Plaid, Coinbase, Brex, Mercury, Robinhood, Block/Square, Adyen)
- ⚠️ Setup initial 1 jour de plus que monorepo simple (acceptable)

### Option D — Nx (alternative à Turborepo)

Microsoft, Capital One, American Airlines. Plus puissant mais plus lourd.

- ✅ Riche en plugins
- ❌ Courbe d'apprentissage plus longue
- ❌ Overkill pour 4 devs

### Option E — Bazel (Google, Uber)

- ✅ Scale infinie
- ❌ Très lourd, 1-2 mois de setup
- ❌ Inadapté pour 4 devs / 3 mois MVP

## 3. Décision retenue

**Option C — Monorepo Turborepo.**

### 3.1 Structure

```
kotiz/
├── apps/
│   ├── mobile/              # Flutter (cliente + agent dans 1 codebase, profils dédiés)
│   ├── backend/             # Spring Boot 3.x
│   └── admin-web/           # React/Next.js (console Ibrahima/Risk/Finance/PO)
├── packages/
│   ├── design-tokens/       # Source de vérité — consommé par mobile + admin-web
│   ├── api-types/           # Types TS générés depuis OpenAPI backend
│   └── shared-utils/        # Format FCFA, validators, constants
├── infra/
│   ├── docker/              # docker-compose.yml + Dockerfiles
│   ├── nginx/
│   └── github-actions/      # workflows CI/CD
├── .github/
│   └── CODEOWNERS           # Ownership par dossier
├── pnpm-workspace.yaml      # apps/* + packages/*
├── turbo.json               # Config Turborepo
├── CONTRIBUTING.md          # Conventional Commits FR
└── README.md                # Onboarding dev (≤ 1h)
```

### 3.2 Configuration Turborepo (essentielle)

`turbo.json` minimum :

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 3.3 Filtrage par changement (la fonctionnalité clé)

Exemples concrets :

- `pnpm turbo run build` → build tout
- `pnpm turbo run build --filter=mobile` → build seulement Flutter
- `pnpm turbo run test --filter=...[origin/main]` → test seulement ce qui change vs main
- En CI GitHub Actions : `turbo run build test --filter=...[HEAD^]` détecte automatiquement les apps impactées par le commit

### 3.4 Allocation 4 devs

| Dev              | Ownership principal                                    | Stories               |
| ---------------- | ------------------------------------------------------ | --------------------- |
| Desiré (CTO)     | `apps/backend/` (lead) + `infra/` + ADRs               | Epic 1, 4, 8, 10      |
| Dev #2 backend   | `apps/backend/` modules savings/payments/wa            | Epic 4, 7, 9          |
| Dev #3 mobile    | `apps/mobile/` + `packages/design-tokens` côté Flutter | Epic 2, 5, 6          |
| Dev #4 fullstack | `apps/admin-web/` + USSD + viralité                    | Epic 9 (USSD), 10, 11 |

`CODEOWNERS` formalise ces ownerships pour bloquer les PRs sans review du dev approprié.

## 4. Conséquences

### 4.1 Positives

- Builds 3-5× plus rapides en CI grâce au filtrage Turborepo (mesure : ~12 min build complet → ~3-4 min sur changement ciblé)
- Cache local : un dev qui pull une branche ne re-builde pas tout
- Atomicité commits cross-cutting (bundle J+1 = backend + mobile + admin en 1 PR)
- Audit BCEAO/CIMA simplifié : 1 commit hash = état complet plateforme
- Aligné avec le standard fintech moderne

### 4.2 Contraintes acceptées

- 1 jour de setup initial supplémentaire vs monorepo simple
- 3 stacks tech à cohabiter (Java/Maven + Dart/pub + JS/pnpm) — gérable mais nécessite discipline
- Clone initial ~3 Go (Flutter SDK + Java + node_modules)

### 4.3 Risques

| Risque                        | Probabilité | Impact | Mitigation                                                                                                        |
| ----------------------------- | ----------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| Turborepo bogue ou abandon    | Faible      | Moyen  | Vercel = entreprise stable, OSS depuis 2021, racheté = soutenu. Plan B : migration vers Nx en 1 semaine si besoin |
| Cache Turborepo corrompu      | Faible      | Faible | `pnpm turbo clean` + rebuild. CI a son propre cache GitHub Actions                                                |
| Devs perdus dans la structure | Moyen       | Faible | README racine + onboarding doc + sessions équipe au sprint 1                                                      |

## 5. Statut et révision

- **Statut** : ACCEPTÉE
- **Date** : 26 avril 2026
- **Action** : amende Story 1.1 (`Initialiser le monorepo KOTIZ avec Turborepo`)
- **Prochaine révision** : Sprint 6 — vérifier que le setup tient avec 4 devs en charge max
- **Référence** : KOTIZ/ARCH/ADR-008
