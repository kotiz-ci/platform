---
title: ADR-009 — Mobile en React Native / Expo (au lieu de Flutter)
status: ACCEPTÉE
date: 2026-05-06
decision_makers:
  - Henoch Lonzo Koffi (Fondateur CEO)
  - Murat (Test Architect / conseil technique)
related_adrs:
  - ADR-001 (Spring Boot — backend)
  - ADR-002 (Monolithe modulaire — backend)
  - ADR-008 (Monorepo Turborepo) — amendée par cette ADR
references:
  - Code/platform/docs/product/prd-mvp.md §1 (équipe MVP — 4 devs) + §14 (risques recrutement)
  - Code/platform/docs/architecture/hld.md §3.5 (palette 13+4 tokens)
  - Code/_legacy/poc-pitch-omis/ (POC pitch OMIS Finances 1er mai 2026 — déjà en RN/Expo)
  - _archive/2026-bmad/_bmad-output/implementation-artifacts/1-1-monorepo-kotiz-turborepo.md
  - _archive/2026-bmad/_bmad-output/implementation-artifacts/1-6-documentation-d-onboarding-dev.md
classification: Confidentiel — Usage interne
---

# ADR-009 — Mobile en React Native / Expo

## 1. Contexte

L'ADR-008 (Monorepo Turborepo) prévoyait initialement Flutter 3.24.5 pour `apps/mobile`. Cette décision date du 26 avril 2026, avant que :

1. Le **POC pitch OMIS Finances** ait été livré le 1er mai 2026 — **en React Native / Expo SDK 54** (`Code/_legacy/poc-pitch-omis/`), avec NativeWind, Expo Router, Inter Google Fonts, lucide-react-native, palette KOTIZ v2 déjà câblée.
2. Le pré-sprint 0 ait confirmé le **risque recrutement dev #3 mobile** (cible 12 mai). Le pool Flutter à Abidjan est ~5-15 devs disponibles vs ~50-150 devs RN/JavaScript.
3. La décision **monorepo TS-first** (ADR-008) ait été pleinement absorbée — `packages/api-types` (OpenAPI → TS) et `packages/design-tokens` n'ont de sens "vrai code partagé" que si toutes les apps consomment du TypeScript.

Cette ADR formalise le **switch de Flutter vers React Native / Expo** décidé par Henoch le **6 mai 2026**, avant le démarrage de Sprint 1 (5 mai = J0, donc impact minimal).

## 2. Options envisagées

### Option A — Conserver Flutter 3.24.5

- ✅ Performance native (compilé AOT vers ARM)
- ✅ Animations Material 3 / Cupertino prêtes à l'emploi
- ✅ Bundle size compact (~10-12 Mo)
- ❌ **Pool devs Abidjan restreint** — risque de bloquer le recrutement dev #3 (cible 12 mai)
- ❌ **Code partagé monorepo amputé** — `packages/api-types` doit être généré en double (TS pour admin-web + Dart pour mobile via `openapi-generator`)
- ❌ **Design tokens dupliqués** — `tokens.json` → `tokens.css` ET `tokens.dart` (deux pipelines Style Dictionary)
- ❌ **POC pitch OMIS à jeter** — refonte complète, perte du travail du 1er mai
- ❌ **OTA updates fintech** — pas natif (nécessite Shorebird payant ~$100/mois)
- ❌ **SDKs partenaires** : la communauté Flutter pour Mobile Money africain (Orange Money, Wave, MTN MoMo) est moins active qu'en RN

### Option B — React Native / Expo SDK 54+ (RETENUE)

- ✅ **Pool devs Abidjan large** (~50-150) — recrutement dev #3 + dev #4 fluidifié
- ✅ **Vrai code partagé monorepo** — `packages/api-types` consommé natif par mobile + admin-web (1 seul pipeline TS)
- ✅ **Design tokens unifiés** — `tokens.json` → `tokens.ts` (consommé par RN via NativeWind ET par admin-web Tailwind)
- ✅ **POC pitch OMIS réutilisable** — composants, navigation Expo Router, palette v2 déjà câblée
- ✅ **Expo Updates OTA** natif et gratuit — patch correctifs sans review App Store (critique post-launch fintech)
- ✅ **Stack fintech moderne** : Coinbase, Mercury, Brex, Discord, Shopify Shop sont en RN ; Stripe et Plaid SDK officiels RN
- ✅ **Maturité Mobile Money africain** : `react-native-paystack`, wrappers Orange Money / Wave plus actifs en JS
- ✅ **Hot reload + Expo Go** : itérations devs ~3x plus rapides qu'avec Flutter (pas de recompilation)
- ⚠️ Bundle size plus gros (~15-18 Mo après Hermes + EAS Build) — acceptable pour fintech utilitaire CI
- ⚠️ Performance animations complexes inférieure à Flutter — non bloquant pour KOTIZ (UX utilitaire, pas jeu)

### Option C — Native pur (Kotlin Android + Swift iOS)

- ✅ Performance maximale, accès natif total
- ❌ **Coût 2x** — il faut 2 équipes (1 Android, 1 iOS) ou 1 dev full-stack mobile très senior
- ❌ Inadapté pour MVP 12 semaines / 4 devs

## 3. Décision retenue

**Option B — React Native / Expo SDK 54+.**

### 3.1 Stack mobile cible

| Composant                        | Version                     | Rôle                                                     |
| -------------------------------- | --------------------------- | -------------------------------------------------------- |
| **React Native**                 | `0.81.x` (via Expo SDK 54+) | Framework UI cross-platform                              |
| **Expo SDK**                     | `~54.0.x` (stable)          | Toolchain (build, OTA, modules natifs)                   |
| **Expo Router**                  | `~6.0.x`                    | Routing file-based (équivalent App Router)               |
| **TypeScript**                   | `~5.9.x` strict             | Langage                                                  |
| **NativeWind**                   | `^4.2.x`                    | Tailwind CSS sur RN                                      |
| **React**                        | `19.1.x`                    | Lib UI sous-jacente                                      |
| **react-native-reanimated**      | `~4.1.x`                    | Animations performantes                                  |
| **react-native-gesture-handler** | `~2.28.x`                   | Gestes natifs                                            |
| **lucide-react-native**          | `^1.14.x`                   | Icônes (cohérent avec admin-web qui aura `lucide-react`) |
| **@expo-google-fonts/inter**     | `^0.4.x`                    | Police KOTIZ (HLD §3.5)                                  |
| **expo-haptics**                 | `~15.0.x`                   | Feedback haptique (UX micro-épargne)                     |
| **@gorhom/bottom-sheet**         | `^5.x`                      | Bottom sheets (déjà dans POC)                            |

### 3.2 Stratégie test mobile (impact test design Epic 1)

| Niveau                | Outil                                        | Justification                                             |
| --------------------- | -------------------------------------------- | --------------------------------------------------------- |
| **Unit**              | Jest + ts-jest                               | Standard RN, mature, jugé par flutter_test                |
| **Component / UI**    | @testing-library/react-native                | Convention RN pour tests d'écrans                         |
| **Visual regression** | optionnel — Storybook RN + Chromatic en V1   | hors MVP                                                  |
| **E2E mobile**        | **Maestro** (YAML, no-code, mainstream 2026) | Plus simple que Detox, moins fragile, support iOS+Android |
| **Accessibility**     | jest-axe + react-native-a11y                 | DoD WCAG AA                                               |
| **Property-based**    | fast-check                                   | Idem backend (ledger invariants)                          |

> **Note Murat :** Maestro est devenu le standard de facto pour E2E RN en 2025-2026 (Coinbase, Mercury). Detox reste valide mais flaky sur iOS18+. Choix **Maestro**.

### 3.3 Code partagé monorepo (gain net)

```
packages/
├── design-tokens/
│   ├── tokens.json              # source de vérité (17 couleurs v2 + 4)
│   └── dist/
│       ├── tokens.ts            # consommé par mobile (NativeWind preset) + admin-web (Tailwind config)
│       ├── tokens.css           # consommé par admin-web alternatif
│       └── tokens.json          # source brute (exports raw)
├── api-types/
│   └── src/                     # généré par openapi-typescript depuis backend OpenAPI 3.x
│                                # consommé natif par mobile + admin-web
├── shared-utils/
│   └── src/                     # FCFA formatter, E.164 validator, RBAC checks
│                                # consommé natif par mobile + admin-web
```

**Gain mesurable** : ~30-40% de code partagé entre mobile et admin-web (constants, validators, types API, design tokens) — impossible avec Flutter.

### 3.4 Allocation 4 devs (mise à jour ADR-008 §3.4)

| Dev               | Ownership principal                                    | Stack                      |
| ----------------- | ------------------------------------------------------ | -------------------------- |
| Desiré (CTO)      | `apps/backend/` (lead) + `infra/` + ADRs               | Java 17 / Spring Boot 3.3  |
| Dev #2 backend    | `apps/backend/` modules savings/payments/wa            | Java 17 / Spring Boot 3.3  |
| **Dev #3 mobile** | `apps/mobile/` + co-ownership `packages/design-tokens` | **TypeScript / RN / Expo** |
| Dev #4 fullstack  | `apps/admin-web/` + USSD + viralité                    | TypeScript / Next.js 15    |

**Avantage clé :** Dev #3 et Dev #4 partagent maintenant la stack TypeScript ⇒ **review croisée mobile/web** possible ⇒ bus factor mobile diminue.

## 4. Conséquences

### 4.1 Positives

- **Recrutement dev #3 fluidifié** (pool 5-10x plus large à Abidjan)
- **POC pitch OMIS réutilisable** — composants, navigation, NativeWind setup déjà KOTIZ v2
- **Code partagé réel** mobile ↔ admin-web (économie estimée : ~10-15 jours/dev sur le MVP)
- **OTA updates Expo** : correctifs critiques pushés en heures (pas en jours via store review)
- **Stack TS unifiée** : un dev fullstack peut review du code mobile, et vice-versa
- **Onboarding ≤1h plus simple** : plus de SDKMAN-Java + fvm-Flutter + nvm-Node, juste **nvm + sdkman** (Java backend uniquement)

### 4.2 Contraintes acceptées

- Bundle mobile ~15-18 Mo (vs ~10-12 Mo Flutter) — non bloquant fintech utilitaire
- Performance animations légèrement inférieure — non bloquant UX KOTIZ (pas de jeu, pas d'animations 60fps complexes)
- Dépendance écosystème npm : surveillance Dependabot critique (déjà couverte Story 1.1 AC5)

### 4.3 Risques

| Risque                                          | Probabilité | Impact | Mitigation                                                                                                                                 |
| ----------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Expo SDK 54 buggy en prod (récent)              | Faible      | Moyen  | Pin version exacte ; surveiller Expo changelog ; plan B = `expo prebuild` (eject vers RN bare) en 1 semaine                                |
| Performance perceptible cliente Fatou           | Faible      | Moyen  | Tests terrain Sprint 6 (Story 12.1) — 10 clientes non-formées. Si KO : prebuild + optims natives ciblées                                   |
| New Architecture (Fabric/TurboModules) instable | Faible      | Faible | POC OMIS a `newArchEnabled: true` et fonctionne — confirmé sur SDK 54                                                                      |
| Mobile Money SDKs RN moins matures que Flutter  | Moyen       | Moyen  | Wrappers wrappers manuels via REST direct si SDK officiel manquant. Story 4.2/4.3/4.4 inclura POC contractuel partenaire avant intégration |
| Drift design system mobile ↔ admin-web          | Moyen       | Faible | `packages/design-tokens` source unique + Storybook partagé V1                                                                              |

### 4.4 Impact sur les stories existantes

| Story                   | Changement                                                                                                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.1 (monorepo)**      | Toolchain : Flutter retiré, Expo CLI ajouté. AC1 structure `apps/mobile` = Expo. AC7 tokens : `dist/tokens.ts` au lieu de `dist/tokens.dart`. Procédure init : `pnpm create expo apps/mobile` au lieu de `flutter create`. Anti-pattern `apps/agent` séparé reste valide. |
| **1.2 (CI/CD)**         | Plus de `flutter test` ni `flutter build apk`. Remplacé par `pnpm test --filter=mobile` (Jest) + `pnpm build --filter=mobile` (Expo Web export pour CI smoke). EAS Build pour binaires natifs (iOS/Android) en Sprint 2.                                                  |
| **1.5 (logging)**       | Pas d'impact (logs côté backend). Mobile aura Sentry RN en V1 (hors MVP).                                                                                                                                                                                                 |
| **1.6 (onboarding)**    | AC2 8 commandes inchangées (basées sur pnpm). AC3 persona dev mobile : Expo CLI au lieu de fvm. AC4 troubleshooting #10-11 : remplacés par "Metro bundler", "Expo Go connection". AC5 GPG inchangé. Versions toolchain : Flutter retiré.                                  |
| **2.x (design system)** | Gain net : UN seul Storybook RN+Web (composants partagés) au lieu de deux (Flutter + Next.js séparés).                                                                                                                                                                    |
| **5.x (épargne)**       | Pas d'impact sur ACs métier. Implémentation mobile en RN.                                                                                                                                                                                                                 |
| **9.3 (mode vocal WA)** | Pas d'impact (WhatsApp côté backend).                                                                                                                                                                                                                                     |
| **Test design Epic 1**  | Annexe ajoutée 2026-05-06 : framework mobile = Jest + RN Testing Library + Maestro. Pas de scénario impacté (Epic 1 = socle, 0 code mobile).                                                                                                                              |

## 5. Statut et révision

- **Statut** : ACCEPTÉE
- **Date** : 6 mai 2026
- **Action** : amende ADR-008 §3.1 (toolchain) + §3.4 (allocation devs). Patch Story 1.1 + 1.6 (toolchain). Annexe test-design Epic 1.
- **Prochaine révision** : Sprint 6 (juillet 2026) — vérifier que Expo SDK 54 tient en prod et que les Mobile Money SDKs RN suffisent.
- **Référence** : KOTIZ/ARCH/ADR-009
- **Décision Henoch** : 2026-05-06 (avant J+1 Sprint 1, impact minimal)
