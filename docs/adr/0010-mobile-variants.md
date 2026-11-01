---
title: ADR-010 — Mobile Variants Client / Agent (1 codebase, 2 binaires EAS)
status: ACCEPTÉE
date: 2026-05-07
decision_makers:
  - Henoch Lonzo Koffi (Fondateur CEO)
  - Murat (Test Architect / conseil technique)
related_adrs:
  - ADR-008 (Monorepo Turborepo) — amende §3.4 (allocation devs mobile)
  - ADR-009 (Mobile RN/Expo) — extension naturelle
  - ADR-007 (RBAC 8 rôles) — sécurité agent isolée
references:
  - Code/platform/docs/product/prd-mvp.md (personas Fatou cliente vs Moussa agent)
  - Code/platform/docs/architecture/hld.md §2.6 (apps mobile cliente + agent)
  - _archive/2026-bmad/_bmad-output/implementation-artifacts/1-1-monorepo-kotiz-turborepo.md (anti-pattern apps/agent séparé — amendé par cette ADR)
  - _archive/2026-bmad/_bmad-output/implementation-artifacts/1-2-pipeline-cicd-de-base.md (CI 2 jobs EAS Build)
classification: Confidentiel — Usage interne
---

# ADR-010 — Mobile Variants Client / Agent

## 1. Contexte

KOTIZ sert deux personas mobiles distincts :

- **Fatou (cliente)** — commerçante non-bancarisée, Tecno Spark / Itel low-end, data limitée, alphabétisation hétérogène
- **Moussa (agent)** — point de service terrain, smartphone milieu de gamme, manipule des montants, valide KYC Tier 1

L'ADR-008 §3.4 + Story 1.1 anti-patterns interdisaient initialement `apps/agent/` séparé en privilégiant **un seul binaire avec routing par rôle** (`apps/mobile/app/(client)/` + `apps/mobile/app/(agent)/`). Cette décision optimisait le coût dev mais ignorait les standards fintech avec agents (M-Pesa, bKash, Wave Business, Orange Money — **tous** distribuent 2 apps).

Le 7 mai 2026, Henoch a tranché : on adopte le standard fintech avec deux binaires distincts, **mais en gardant un seul codebase** (cohérence ADR-008 + ADR-009 monorepo TS-first).

## 2. Options envisagées

### Option A — 1 binaire / 2 profils (décision initiale ADR-008)

- ✅ 1 codebase, 1 review store, coût dev minimal
- ❌ Bundle inclut tout le code agent (~+1-2 Mo, ~5-10% surcoût pour Fatou)
- ❌ Surface d'attaque agent visible côté cliente (revue OWASP plus lourde)
- ❌ Branding store ambigu — "KOTIZ" = cliente OU agent ?

### Option B — 2 codebases séparés (`apps/mobile-client/` + `apps/mobile-agent/`)

- ✅ Découplage total
- ❌ **Duplication massive** : design system, navigation, auth, types API, hooks dupliqués
- ❌ Coût dev mobile +60-80%
- ❌ Bus factor x2

### Option C — 1 codebase, 2 builds EAS (variants Expo) — **RETENUE**

- ✅ 1 codebase (cohérence ADR-008 + ADR-009)
- ✅ 2 binaires distincts sur stores (sécurité + branding + bundle léger)
- ✅ Tests partagés (Jest + Maestro = mêmes fixtures)
- ✅ Design system partagé (`@kotiz/design-tokens`)
- ✅ Distribution agent restreinte possible (TestFlight + Play Internal)
- ✅ Coût dev marginal : ~+5% vs option A, ~-40% vs option B
- ⚠️ Variants Expo nécessitent `app.config.ts` dynamique + `eas.json` multi-profils — courbe d'apprentissage faible
- ⚠️ Tree-shaking imparfait au niveau bundle (les deux groupes routes sont compilés) — gain bundle ~30-50% du surcoût option A, à optimiser V1 via babel/metro plugin si besoin

## 3. Décision retenue

**Option C — 1 codebase, 2 binaires EAS distincts via variants.**

### 3.1 Mécanisme technique

Variable d'env `EXPO_PUBLIC_APP_VARIANT=client|agent` lue par :

1. **`app.config.ts`** (remplace `app.json`) — calcule dynamiquement :
   - `name` : "KOTIZ" vs "KOTIZ Agent"
   - `slug` : `kotiz-mobile` vs `kotiz-mobile-agent`
   - `scheme` : `kotiz` vs `kotiz-agent`
   - `bundleIdentifier` (iOS) : `ci.kotiz.client` vs `ci.kotiz.agent`
   - `package` (Android) : `ci.kotiz.client` vs `ci.kotiz.agent`
   - `icon` / `splash` : assets dédiés
   - `permissions` (Android) : agent demande caméra (ScanID) + RECORD_AUDIO + ACCESS_FINE_LOCATION ; cliente uniquement RECORD_AUDIO (mode vocal optionnel)
   - `extra.variant` : exposé au runtime

2. **`apps/mobile/app/_layout.tsx`** — lit `Constants.expoConfig?.extra?.variant` au boot et :
   - **client** : redirige vers `/(client)`, masque les routes `(agent)`
   - **agent** : redirige vers `/(agent)`, masque les routes `(client)`
   - Garde-fou runtime : si l'utilisateur connecté n'a pas le rôle correspondant au variant, déconnexion forcée + écran d'erreur "Mauvaise app installée"

3. **`eas.json`** — 6 profils :

   ```
   development-client | development-agent      → Expo Go + dev menu
   preview-client     | preview-agent          → APK installable + iOS internal
   production-client  | production-agent       → store-ready
   ```

4. **`scripts/` package.json** :

   ```
   pnpm dev:client            # EXPO_PUBLIC_APP_VARIANT=client expo start
   pnpm dev:agent             # EXPO_PUBLIC_APP_VARIANT=agent expo start
   pnpm build:preview:client  # eas build --profile preview-client
   pnpm build:preview:agent   # eas build --profile preview-agent
   ```

### 3.2 Distribution stores

| Variant    | Distribution V1 (MVP juillet 2026)                                                                                          | Distribution V2 (post-launch)                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Client** | **Public Play Store + App Store** — pilote 1 000 clientes Sprint 6                                                          | Public, scaling Côte d'Ivoire UEMOA                                                                       |
| **Agent**  | **Restreinte** : TestFlight (iOS) + Play Internal Testing (Android) — distribuée par lien aux Moussa onboardés par Ibrahima | Évaluer passage public sur Play Store si pool agents > 200 ; iOS reste interne (M-Pesa Agent fait pareil) |

Justification distribution agent restreinte V1 :

- Sécurité — limite l'exposition aux acteurs non vérifiés
- Contrôle qualité — chaque Moussa onboardé par Ibrahima (Story 6.7) reçoit lien d'install
- Conformité BCEAO — traçabilité install agent ↔ contrat agent signé (audit)
- Coût Apple Developer + Google Play : 1 seul compte org KOTIZ couvre les 2 apps

### 3.3 Sécurité — gating dual

| Couche               | Garde-fou client                                                                                  | Garde-fou agent |
| -------------------- | ------------------------------------------------------------------------------------------------- | --------------- |
| Build (compile time) | `app.config.ts` ne génère pas le bundleId agent                                                   | idem inverse    |
| Boot (runtime)       | `_layout.tsx` redirige hors `(agent)`                                                             | idem inverse    |
| Auth (backend)       | JWT contient le rôle ; backend rejette `CLIENT` qui appelle endpoint agent (cf. ADR-007 RBAC)     | idem            |
| Audit (Story 1.5)    | tout appel cross-variant est loggé `core_audit_logs` avec catégorie `SUSPICIOUS_VARIANT_MISMATCH` | idem            |

Une fuite hypothétique : un utilisateur curieux peut décompresser l'APK agent et voir le code routes. **Mitigation** : aucune logique sensible côté mobile (RBAC = serveur). Les "secrets" dans le bundle sont des constantes UI (couleurs, copy), pas des clés. Les vraies clés (JWT signing, AES master key) restent backend.

### 3.4 Tests — pas de duplication

| Niveau                   | Outil                                                              | Stratégie                                                                          |
| ------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Unit (Jest)              | partagé                                                            | Tests sur composants/hooks communs ; tests par variant pour les écrans spécifiques |
| Component (RNTL)         | partagé                                                            | Storybook RN V1                                                                    |
| **E2E (Maestro)**        | **2 suites distinctes** : `e2e/client/*.yaml` + `e2e/agent/*.yaml` | CI lance les 2 en parallèle                                                        |
| Accessibility (jest-axe) | partagé                                                            | DoD WCAG AA s'applique aux 2 variants                                              |

### 3.5 Allocation 4 devs (mise à jour ADR-008 §3.4 + ADR-009 §3.4)

| Dev              | Variant client      | Variant agent       | Notes                                                                            |
| ---------------- | ------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Dev #3 mobile    | **lead**            | secondary           | écrans Fatou prioritaires Sprint 1-3                                             |
| Dev #4 fullstack | secondary review    | **lead**            | écrans Moussa Sprint 3-4 ; cohérence avec admin-web (Ibrahima valide KYC Tier 2) |
| Desiré (CTO)     | review architecture | review architecture | review backend impacts                                                           |

## 4. Conséquences

### 4.1 Positives

- **Standard fintech respecté** (M-Pesa, bKash, Wave Business, OM Marchand)
- **Bundle cliente plus léger** (~-1-2 Mo après tree-shaking babel V1)
- **Branding distinct** sur stores ⇒ acquisition claire pour Fatou
- **Distribution agent contrôlée** ⇒ conformité BCEAO renforcée
- **Allocation devs claire** : dev #3 mobile lead client, dev #4 lead agent — pas de friction propriété
- **Coût dev marginal** vs duplication codebase

### 4.2 Contraintes acceptées

- 2 listings stores à gérer côté ops produit (screenshots, descriptions, FAQ) — léger surcoût marketing
- 2 jobs EAS Build en CI ⇒ +5-8 min sur build pipeline preview Sprint 2 (acceptable)
- 2 chaînes de release indépendantes (versions numérotées séparément)

### 4.3 Risques

| Risque                                                                      | Probabilité | Impact                 | Mitigation                                                                                                                                        |
| --------------------------------------------------------------------------- | ----------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bug variant detection (variant=client mais routes agent rendues par erreur) | Moyen       | Moyen                  | Test E2E Maestro spécifique à chaque variant + assertion `Constants.expoConfig.extra.variant` au boot. Audit log SUSPICIOUS_VARIANT_MISMATCH.     |
| Tree-shaking imparfait laisse code agent dans bundle client                 | Moyen       | Faible (pas de secret) | OK pour MVP. V1 : babel plugin `babel-plugin-transform-define` + metro `resolveRequest` pour exclure `app/(agent)/*` au build client (et inverse) |
| 2 binaires divergent en versions (bug fix client pas appliqué agent)        | Faible      | Moyen                  | Versions identiques imposées CI : `version` champ unique dans `app.config.ts`, partagé                                                            |
| Compte Apple/Google bundleId rejeté pour agent                              | Faible      | Faible                 | Anticipation Sprint 2 lors création comptes ; bundleIds disponibles vérifiés `ci.kotiz.client` / `ci.kotiz.agent`                                 |

### 4.4 Impact stories existantes

| Story                         | Changement                                                                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.1 (monorepo)**            | Anti-pattern "NE PAS créer apps/agent séparé" reste valide. Ajouter référence ADR-010 et préciser : variants gérés via `app.config.ts`. AC1 inchangé.                                        |
| **1.2 (CI/CD)**               | Jobs `build:mobile` deviennent `build:mobile:client` + `build:mobile:agent` (en preview Sprint 2 si compte Expo créé ; Sprint 1 = web export uniquement). Ajout 2 secrets EAS si applicable. |
| **6.x (Agents & Onboarding)** | Stories 6.x ciblent désormais explicitement le **variant agent**. Story 6.1 (login agent) = écran login spécifique au binaire agent.                                                         |
| **3.x (Auth)**                | Inscription cliente → variant client uniquement. Backend JWT inclut `appVariant` claim ⇒ backend rejette si variant ≠ rôle.                                                                  |
| **Test design Epic 1**        | Annexe A à enrichir (V2) : E2E Maestro 2 suites — déjà préparé en placeholder.                                                                                                               |

## 5. Statut et révision

- **Statut** : ACCEPTÉE
- **Date** : 7 mai 2026
- **Action** : amende ADR-008 §3.4. Patch `apps/mobile/app.config.ts` + `eas.json`. Notes Story 1.1 + Story 1.2.
- **Prochaine révision** : Sprint 6 (juillet 2026) — vérifier que tree-shaking et distribution agent restreinte tiennent en pilote ; décider si V2 passe app agent en public Play Store.
- **Référence** : KOTIZ/ARCH/ADR-010
