---
workflowType: create-epics-and-stories
workflow: create
version: 0.1 (requirements extracted — en attente confirmation)
date: 2026-04-23
author: Henoch Lonzo Koffi
project_name: KOTIZ
stepsCompleted:
  - step-01-validate-prerequisites
inputDocuments:
  - docs/product/prd-mvp.md (PRD v1.1, 30 FRs + 21 NFRs + 8 parcours)
  - docs/design/ux-design-specification.md (UX Skeleton v1.0)
  - docs/product/prd-mvp-validation.md (rapport validation — référence)
---

# KOTIZ MVP — Epic & Story Breakdown

## Overview

Ce document décompose les requirements du PRD v1.1 et de la spec UX KOTIZ MVP en épics et stories prêtes pour l'implémentation. Il alimente le cycle de développement BMad : `[SP] Sprint Planning` → `[CS] Create Story` → `[DS] Dev Story` → `[CR] Code Review` → `[ER] Retrospective`.

## Requirements Inventory

### Functional Requirements (30 FRs extraits du PRD v1.1)

#### Épargne (FR-EP)

- **FR-EP-01** — Fatou peut déposer dès 100 FCFA via app, USSD, WhatsApp ou cash chez agent. Plafonds 500k/tx, 2M wallet Tier 1 (auto-validé) — Tier 2+ au-delà. [trace: P1, P2, P6]
- **FR-EP-02** — Fatou peut créer jusqu'à 3 objectifs simultanés nommés, avec montant cible et date cible optionnelle. [trace: P2]
- **FR-EP-03** — Fatou peut verrouiller un objectif jusqu'à une date cible ; déverrouillage anticipé avec malus Score. [trace: P2]
- **FR-EP-04** — Fatou peut voir en temps réel son solde, la progression vers chaque objectif, son streak en jours consécutifs. [trace: P2, P8]
- **FR-EP-05** — Système attribue badge + bonus Score (+5/+15/+30 points) pour streaks 7/30/90 jours. [trace: P2, P8]

#### Agents (FR-AG)

- **FR-AG-01** — Moussa peut enrôler une nouvelle cliente via CNI recto/verso + selfie + OTP SMS en ≤ 5 min. KYC Tier 1 auto ou Tier 2+ vers Ibrahima. [trace: P1]
- **FR-AG-02** — Moussa peut proposer le bundle Santé J+1 à l'onboarding (3 questions foyer + recommandation formule). Acceptation 2 clics, rétractation 24 h. [trace: P1]
- **FR-AG-03** — Moussa peut faire cash-in (cash → wallet cliente). Commission 0,5 %, plafond 500 FCFA/tx, plafonds 200k/tx et 2M/jour. [trace: P1, P2]
- **FR-AG-04** — Moussa peut faire cash-out (wallet cliente → cash). Commission 1 %, plafonds identiques FR-AG-03. [trace: —]
- **FR-AG-05** — Moussa peut consulter dashboard (clientes rattachées, tx du jour, commission, float, alertes anti-churn). Rafraîchissement ≤ 3 s. [trace: P7]
- **FR-AG-06** — Ibrahima peut suspendre un agent en un clic avec motif. Suspension immédiate + notification. [trace: P5]

#### Santé (FR-SA)

- **FR-SA-01** — Fatou peut consulter les 3 formules (Famille 50 / Confort 100 / Premium 200 FCFA/j) avec couverture en langage simple. Affichage ≤ 2 s. [trace: P1, P3]
- **FR-SA-02** — Fatou peut simuler la formule adaptée via 3 questions (composition foyer, âges enfants, budget). Reco obtenue en ≤ 3 clics et ≤ 5 s. Mode vocal possible. [trace: P1, P3]
- **FR-SA-03** — Fatou peut souscrire une formule : signature électronique + paiement 1ère prime. Attestation WhatsApp + SMS en ≤ 30 s. [trace: P1, P3]
- **FR-SA-04** — Fatou peut consulter le statut de sa police (active/attente/suspendue/résiliée) et l'historique des prélèvements. [trace: —]
- **FR-SA-05** — Fatou peut déclarer un sinistre avec formulaire simplifié + upload justificatifs. Statut affiché (Reçu/En cours/Décision/Payé). [trace: —]

#### Score (FR-SC)

- **FR-SC-01** — Système calcule chaque nuit (00h-04h) la valeur numérique 0-1000 et l'étoile (1⭐ à 5⭐) pour chaque utilisatrice active, via 4 composantes pondérées (régularité 40 %, stabilité 25 %, ancienneté 20 %, engagement 15 %). Disponible dès 04h15. [trace: P4]
- **FR-SC-02** — Fatou peut voir ses étoiles, la progression vers le palier suivant, les avantages débloqués, en ≤ 2 s. Icône haut-parleur disponible. [trace: P4, P8]
- **FR-SC-03** — Fatou peut accéder à un écran « Comprendre mon score » en ≤ 2 clics avec 4 composantes chiffrées + projection d'impact d'actions. [trace: P4]
- **FR-SC-04** — Système débloque automatiquement les avantages paliers (consultation téléphone à 3⭐, –10 % Confort à 4⭐, priorité crédit V2 à 5⭐) en ≤ 24 h après franchissement + notification. [trace: P4]

#### Admin / Conformité (FR-AD)

- **FR-AD-01** — Ibrahima peut valider manuellement les KYC Tier 2+ routés par les agents. Délai cible ≤ 24 h. File triable. [trace: —]
- **FR-AD-02** — Ibrahima peut recevoir les alertes AML, investiguer, rédiger le STR, le transmettre à CENTIF-CI et archiver. Délai ≤ 24 h. Rétention 10 ans. Revue Risk obligatoire > 500k FCFA. [trace: P5]
- **FR-AD-03** — Ibrahima ou Finance peut exporter les rapports BCEAO mensuels et CENTIF trimestriels en 1 clic avec signature numérique + horodatage. 100 % dans les délais. [trace: —]
- **FR-AD-04** — Ibrahima/Risk/Finance peut consulter l'audit trail complet. Requête < 5 s pour les 12 derniers mois, rétention 10 ans. [trace: —]

#### Viralité & engagement (FR-VI)

- **FR-VI-01** — Fatou peut parrainer une amie via WhatsApp (Score Booster +5 points si 1er dépôt ≤ 7 j). Invitation en ≤ 3 clics. Bonus auto. [trace: P6]
- **FR-VI-02** — Moussa peut enrôler 2 clientes le même jour pour bonus onboarding à deux (200 FCFA chacune crédités J+1). [trace: P6]
- **FR-VI-03** — Système génère chaque vendredi 19h une carte récap partageable (épargne semaine, étoiles, streak, progression objectif) via WhatsApp Business API. [trace: P8]

#### Anti-churn (FR-RE)

- **FR-RE-01** — Système détecte quotidiennement (à minuit J+3) les utilisatrices sans dépôt depuis 3 jours. [trace: P7]
- **FR-RE-02** — Système envoie push WhatsApp vocal avec rappel de l'objectif + photo personnelle. Bambara si disponible, sinon FR. Envoi ≤ 2 h après détection. [trace: P7]
- **FR-RE-03** — Système notifie l'agent (dashboard + push) pour chaque cliente rattachée sans dépôt depuis 3 jours. [trace: P7]

---

### Non-Functional Requirements (21 NFRs extraits du PRD v1.1)

#### Performance (NFR-PERF)

- **NFR-PERF-01** — Écran d'accueil app en ≤ 1,5 s P95 sur 3G. APM mobile.
- **NFR-PERF-02** — Confirmation dépôt MM en ≤ 10 s P95. Logs backend + SLA opérateurs.
- **NFR-PERF-03** — Job nocturne calcul Score ≤ 4 h pour toutes les utilisatrices actives. Monitoring scheduler.
- **NFR-PERF-04** — Réponse USSD ≤ 3 s P95. Mesuré par l'opérateur partenaire.

#### Disponibilité (NFR-AVAIL)

- **NFR-AVAIL-01** — Disponibilité ≥ 99 % / 30 j glissants sur les 5 canaux. Synthetic monitoring externe.
- **NFR-AVAIL-02** — RPO ≤ 1 h, RTO ≤ 4 h. Tests de restauration trimestriels.
- **NFR-AVAIL-03** — Offline-soft sur app cliente (queue dépôts rejouée à reconnexion). Tests d'intégration.

#### Sécurité (NFR-SEC)

- **NFR-SEC-01** — Chiffrement au repos AES-256 + transit TLS 1.2+. Audit externe annuel.
- **NFR-SEC-02** — Secrets applicatifs via vault. Jamais en clair. Scan CI/CD.
- **NFR-SEC-03** — PIN 4 chiffres + OTP SMS minimum client. MFA renforcée admin.
- **NFR-SEC-04** — Journalisation accès données client (10 ans). Revue trimestrielle.
- **NFR-SEC-05** — Test d'intrusion externe avant prod + annuel. Rapport signé.

#### Conformité (NFR-COMP)

- **NFR-COMP-01** — Reporting BCEAO mensuel/trimestriel dans les délais. Taux remise cible 100 %.
- **NFR-COMP-02** — STR CENTIF-CI en ≤ 24 h après détection. Horodatage détection → envoi.
- **NFR-COMP-03** — Conformité RGPD-like ivoirienne. DPIA annuelle.
- **NFR-COMP-04** — Data residency territoire UEMOA. Audit infra.

#### Compatibilité (NFR-COMPAT)

- **NFR-COMPAT-01** — Android 7+ (API 24) et iOS 13+. Matrice de tests.
- **NFR-COMPAT-02** — APK/IPA ≤ 30 Mo. Builds de production.
- **NFR-COMPAT-03** — ≤ 5 Mo data/session (5 min). Tests réseau contrôlé.

#### Unit economics (NFR-ACQ)

- **NFR-ACQ-01** — CAC ≤ 2 500 FCFA sur la période MVP. (dépenses acquisition + bonus parrainage) / nouvelles utilisatrices actives.
- **NFR-ACQ-02** — LTV/CAC ≥ 1,0 mois 1, ≥ 3,0 mois 12, ≥ 7,0 mois 24. Cohortes mensuelles.

---

### Additional Requirements (Architecture — minimales)

Extraites implicitement du PRD v1.1 (les détails sont dans `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_HLD.docx` et seront consultés au moment du dev) :

- Ledger double-entrée wallet conforme BCEAO (base technique de toutes les stories Épargne et Agents).
- Intégrations mobile money : Orange Money, Wave, MTN MoMo (webhooks, idempotency, retry, circuit breaker).
- Job scheduler nocturne (calcul Score, détection anti-churn).
- WhatsApp Business API (bot + templates + vocaux).
- USSD gateway partenaire télécom (code `*XXX#` à assigner).
- Console web admin (React ou Vue — au choix de Desiré, pas figé dans le PRD).
- Infrastructure : VPS Abidjan (data residency UEMOA).
- Partenaire courtier CIMA signé pour la Santé (dépendance critique S3).
- Partenaire infirmier téléphone signé pour avantage 3⭐ (S5).

**⚠️ Starter template :** aucun starter imposé — architecture greenfield selon les choix du CTO Desiré. Epic 1 Story 1 = « Initialize monorepo + CI skeleton ».

---

### UX Design Requirements (extraits de l'UX Spec v1.0)

#### Design tokens (UX-DR)

- **UX-DR-01** — Implémenter le design system tokens complet (13 couleurs palette v2 + échelle typo Inter + échelle espacements 4pt + radius + shadows + durations) en fichier partagé `design-tokens.json` exploitable par mobile + web admin.
- **UX-DR-02** — Intégrer la font **Inter Variable** (sous-set latin + diacritiques africains) dans l'app mobile (≤ 200 Ko).

#### Composants (UX-DR-COMP)

- **UX-DR-COMP-01** — Développer `AppHeader` (logo + titre + AudioToggle).
- **UX-DR-COMP-02** — Développer `TabBar` (4 tabs : Accueil, Épargne, Santé, Score).
- **UX-DR-COMP-03** — Développer `PrimaryButton` + `SecondaryButton` + `IconButton` (tous les 7 états : default, pressed, focused, disabled, loading, error, + hover desktop admin).
- **UX-DR-COMP-04** — Développer `AudioToggle` (bouton vocal persistant, état allumé/éteint, intégré au moteur TTS natif).
- **UX-DR-COMP-05** — Développer `DepositCard` (carte hero accueil, solde + étoiles + streak).
- **UX-DR-COMP-06** — Développer `GoalCard` (carte objectif, progression, statut verrouillé).
- **UX-DR-COMP-07** — Développer `StarRating` (5 étoiles animées + label palier).
- **UX-DR-COMP-08** — Développer `StreakBadge` (pill success + icône flame).
- **UX-DR-COMP-09** — Développer `AmountInput` (display montant + suffix FCFA + chips quick 100/500/1000/autre).
- **UX-DR-COMP-10** — Développer `BottomSheet` (slide-in, drag handle).
- **UX-DR-COMP-11** — Développer `Toast` (variants success/info/warn, auto-dismiss 3 s).
- **UX-DR-COMP-12** — Développer `EmptyState` (illustration + titre + CTA).
- **UX-DR-COMP-13** — Développer `LoadingSkeleton` (shimmer, anti-layout-shift).
- **UX-DR-COMP-14** — Développer `BundleProposal` (card violet — parcours P1).
- **UX-DR-COMP-15** — Développer `AlertCard` (pour anti-churn agent et AML admin).

#### Accessibilité (UX-DR-A11Y)

- **UX-DR-A11Y-01** — Implémenter le mode vocal optionnel (TTS natif FR + bambara/dioula si dispo, fallback FR). Activable via `AudioToggle`.
- **UX-DR-A11Y-02** — Respecter WCAG AA partout : contrast ≥ 4,5:1 pour texte body, ≥ 3:1 pour texte large et icônes interactives, ring focus visible.
- **UX-DR-A11Y-03** — Touch targets ≥ 44 × 44 px. Tap gap ≥ 8 px.
- **UX-DR-A11Y-04** — Support natif TalkBack (Android) et VoiceOver (iOS) — labels + hints sur tous les composants interactifs.
- **UX-DR-A11Y-05** — 16 icônes universelles mappées aux actions critiques (cotiser, objectif, verrouiller, santé, score, agent, WhatsApp, mode vocal, partager, aide, retour, confirmer, supprimer, erreur).

#### Illustrations & son (UX-DR-BRAND)

- **UX-DR-BRAND-01** — Commissionner 15-20 illustrations afro-modernes (empty states, onboardings, succès, erreur réseau, erreur paiement, célébration palier).
- **UX-DR-BRAND-02** — Produire 2 sons signature MVP : dépôt réussi (0,5 s) et streak +1 (0,4 s). Les 2 autres (palier étoile, erreur) peuvent être livrés au sprint 6.

---

### FR Coverage Map (vue d'ensemble)

| Parcours                           | FRs couverts                                 | NFRs associés                | Composants UX requis                         |
| ---------------------------------- | -------------------------------------------- | ---------------------------- | -------------------------------------------- |
| **P1 Onboarding bundle J+1**       | FR-AG-01, FR-AG-02, FR-SA-01/02/03, FR-EP-01 | NFR-PERF-02, NFR-SEC-03      | Tous les UX-DR-COMP + BundleProposal         |
| **P2 Dépôt quotidien**             | FR-EP-01/04                                  | NFR-PERF-01/02, NFR-AVAIL-03 | DepositCard, AmountInput, Toast, StreakBadge |
| **P3 Souscription Santé autonome** | FR-SA-01/02/03                               | NFR-PERF-02                  | BundleProposal, AmountInput                  |
| **P4 Évolution Score**             | FR-SC-01/02/03/04, FR-SA-04                  | NFR-PERF-03                  | StarRating, GoalCard, Toast                  |
| **P5 Alerte AML + STR**            | FR-AD-02, FR-AG-06                           | NFR-COMP-02, NFR-SEC-04      | AlertCard admin (desktop)                    |
| **P6 Parrainage Score Booster**    | FR-VI-01, FR-VI-02                           | NFR-ACQ-01                   | Toast, sharing sheet                         |
| **P7 Anti-churn 3j**               | FR-RE-01/02/03                               | NFR-PERF-03                  | AlertCard agent, push vocal WA               |
| **P8 Recap hebdo partageable**     | FR-VI-03, FR-EP-04                           | NFR-ACQ-01                   | Carte récap (canvas server)                  |

---

## Epic List

**12 épics organisés en 3 phases, alignés sur les 6 sprints MVP (mai-juillet 2026).**

### Phase FONDATIONS (livrable avant S3)

- **Epic 1 — Socle technique** (S0 pré-S1 → S1)
- **Epic 2 — Design System** (S1 → S2)
- **Epic 3 — Auth & KYC** (S1 → S2)
- **Epic 4 — Wallet & Mobile Money** (S2 → S3)

### Phase BRIQUES MÉTIER (cœur MVP, S3 → S5)

- **Epic 5 — Épargne & Objectifs** (S3)
- **Epic 6 — Agents & Onboarding** (S3 → S4)
- **Epic 7 — Santé bundlée** (S4 → S5)
- **Epic 8 — Score 5 étoiles** (S5)
- **Epic 9 — Canaux conversationnels** (S4)

### Phase CONFORMITÉ & LANCEMENT (S4 → S6)

- **Epic 10 — Admin & Conformité** (S4 → S6)
- **Epic 11 — Viralité & Anti-churn** (S6)
- **Epic 12 — Tests terrain & Launch** (S6)

**Total : ~70 stories estimées. Story points à affiner au sprint planning.**

---

## Epic 1: Socle technique

**Goal:** Poser les fondations techniques du monorepo, de la CI/CD, des environnements et de l'observabilité pour que toutes les stories suivantes se déroulent sur une base stable. Résout le bus factor via pair-programming dès S1.

**Target sprint:** Pré-S1 (recrutement dev #2) → S1 (init complet).
**Dependencies:** Dev #2 backend recruté avant S1 (P0 critique).
**FRs couverts:** Indirect (toutes) — **NFRs:** NFR-AVAIL-01/02/03, NFR-SEC-01/02, NFR-COMPAT-01/02/03, NFR-PERF-01/04.

### Story 1.1: Initialiser le monorepo KOTIZ avec Turborepo

As a Desiré (CTO),
I want un monorepo Git structuré avec **Turborepo**, organisé en `apps/` (mobile React Native / Expo, backend Spring Boot, admin-web Next.js 15) + `packages/` (design-tokens, api-types, shared-utils) + `infra/`,
So that l'équipe de 4 devs travaille en parallèle sans recompiler tout à chaque commit, en gardant des commits atomiques cross-cutting (mobile + backend en 1 PR), et alignée avec le standard fintech (Stripe, Plaid, Coinbase, Brex, Mercury).

**Acceptance Criteria:**

**Given** le repo est vide
**When** Desiré exécute la procédure d'init documentée
**Then** le monorepo contient la structure `apps/` + `packages/` + `infra/` avec READMEs dédiés
**And** `turbo.json` est configuré avec tasks `build`, `test`, `lint`, `type-check` + cache local + filtrage par changement (`turbo run build --filter=mobile`)
**And** un workspace pnpm racine (`pnpm-workspace.yaml`) référence `apps/*` et `packages/*`
**And** `packages/design-tokens` est consommable par `apps/mobile` (import TypeScript / NativeWind preset) et `apps/admin-web` (import TypeScript)
**And** un commit qui ne touche que `apps/mobile/` ne déclenche **pas** le build/test de `apps/backend/` en CI
**And** les conventions de commit (Conventional Commits FR) sont documentées dans `/CONTRIBUTING.md`
**And** la branche `main` est protégée (review obligatoire, pas de force-push)
**And** `CODEOWNERS` définit les responsables par dossier (ex : dev #3 owner de `apps/mobile/`, dev #2 owner de `apps/backend/`)
**And** un README racine documente : prérequis (Node 20, Java 17, Expo CLI / EAS CLI, Docker), commandes principales (`pnpm dev`, `pnpm build`, `pnpm test --filter=backend`)

**Trace:** ADR-008 (Monorepo Turborepo).
**Inspiration industrie:** standard fintech (Stripe, Plaid, Coinbase, Brex, Mercury, Robinhood) + SaaS modernes (Vercel, Netflix, Linear, Cal.com).

### Story 1.2: Pipeline CI/CD de base (lint, test, build)

As a équipe dev,
I want une pipeline GitHub Actions (ou GitLab CI) exécutant lint + test unitaires + build sur chaque PR,
So that le code pushé est validé automatiquement avant merge.

**AC:**
**Given** un dev ouvre une PR
**When** la PR déclenche le workflow CI
**Then** les 3 jobs (lint, test, build) s'exécutent en parallèle
**And** le status check bloque le merge si un job échoue
**And** la durée totale est ≤ 5 min pour ne pas ralentir les devs

**Trace:** NFR-AVAIL-02 (qualité code), Plan DevOps.

### Story 1.3: Environnements dev / staging / prod

As a équipe,
I want 3 environnements isolés (dev, staging, prod) avec bases de données dédiées et secrets gérés via vault,
So that les tests ne corrompent pas la prod et les credentials ne sont jamais en clair.

**AC:**
**Given** le code est mergé sur `main`
**When** le déploiement staging se déclenche automatiquement
**Then** l'app est déployée sur l'environnement staging avec DB staging
**And** les secrets (API keys MM, CIMA, WhatsApp) sont lus depuis le vault (pas en .env)
**And** la prod ne peut être déployée que manuellement après validation staging

**Trace:** NFR-SEC-02 (secrets vault).

### Story 1.4: Base de données et migrations initiales

As a Desiré,
I want un schéma SQL initial avec tables clés (users, wallets, transactions, ledger_entries, agents, goals, scores, policies, alerts) et un outil de migration versionné,
So that les schémas évoluent proprement sans downtime et que le ledger double-entrée est en place dès le début.

**AC:**
**Given** une DB vide
**When** les migrations initiales sont exécutées
**Then** les 9+ tables de base sont créées avec contraintes et index
**And** le ledger double-entrée est opérationnel (chaque transaction crée 2 entrées équilibrées)
**And** chaque migration est réversible (rollback testé)

**Trace:** Architecture (ledger BCEAO).

### Story 1.5: Logging centralisé et observabilité de base

As a Desiré,
I want des logs structurés (JSON) envoyés vers un système centralisé + métriques Prometheus (ou équivalent) + alerting minimal,
So that nous pouvons diagnostiquer les incidents production dès le jour 1.

**AC:**
**Given** l'app backend émet un événement
**When** un log est écrit
**Then** il est en format JSON avec champs horodatage, niveau, service, trace_id, user_id (si applicable)
**And** il est visible dans la console centralisée en ≤ 30 s
**And** les métriques critiques (latence P95, taux d'erreur, disponibilité) sont exposées
**And** une alerte déclenche sur 5xx rate > 1 % pendant 5 min

**Trace:** NFR-AVAIL-01, NFR-PERF-01.

### Story 1.6: Documentation d'onboarding dev

As a nouveau dev rejoignant l'équipe,
I want un `/README.md` racine + `/docs/onboarding.md` qui m'explique comment démarrer en local en ≤ 1 heure,
So that le bus factor est mitigé et les futurs dev #3, dev #4 soient autonomes rapidement.

**AC:**
**Given** un dev reçoit le repo
**When** il suit les instructions d'onboarding
**Then** il a un environnement local fonctionnel (app + backend + DB) en ≤ 1 h
**And** il sait exécuter les tests + déployer en staging
**And** les commandes principales (`pnpm dev`, `pnpm test`) sont documentées

**Trace:** Mitigation bus factor (cf. PRD §14).

---

## Epic 2: Design System

**Goal:** Implémenter le design system KOTIZ (tokens, font Inter, 15 composants de base, 2 illustrations priority, 2 sons MVP) pour que toutes les stories UI ultérieures consomment des composants partagés.

**Target sprint:** S1 → S2 (en parallèle du socle).
**Dependencies:** Epic 1 (init monorepo dans `shared/`).
**UX-DRs:** UX-DR-01/02, UX-DR-COMP-01 à 15, UX-DR-A11Y-01/02/03/04/05, UX-DR-BRAND-01/02.

### Story 2.1: Design tokens partagés (`design-tokens.json`)

As a équipe,
I want un fichier `shared/design-tokens.json` contenant palette v2 (13 couleurs), typo Inter (8 rôles), espacements 4pt, radius, shadows, durations, z-index,
So that mobile + admin web consomment la même source de vérité.

**AC:**
**Given** un dev veut utiliser une couleur
**When** il réfère `tokens.color.teal_deep`
**Then** il obtient `#007A6E` (jamais une autre nuance)
**And** un changement dans `design-tokens.json` propage automatiquement (build CI échoue si hardcode détecté)
**And** le fichier est exploitable par React Native / Expo (via NativeWind preset) et par Tailwind admin-web (via preset)

**Trace:** UX-DR-01.

### Story 2.2: Intégrer font Inter (mobile + web)

As a équipe mobile et admin,
I want Inter Variable (sous-set latin + diacritiques africains, ≤ 200 Ko) intégrée dans l'app mobile et chargée via CDN sur l'admin web,
So that la typo est cohérente et accessible sur Tecno entrée de gamme.

**AC:**
**Given** un écran affiche du texte
**When** Inter est intégrée
**Then** le texte est rendu en Inter (pas de fallback sauf si Inter échoue à se charger)
**And** la taille du fichier embarqué dans l'APK est ≤ 200 Ko
**And** les diacritiques bambara (à, ɛ, ɔ, ŋ) s'affichent correctement

**Trace:** UX-DR-02, NFR-COMPAT-02.

### Story 2.3: Développer les 15 composants de base (phase 1 — structurels + actions)

As a dev mobile,
I want les composants `AppHeader`, `TabBar`, `BottomSheet`, `PrimaryButton`, `SecondaryButton`, `IconButton`, `AudioToggle` implémentés avec leurs 7 états et leurs tests,
So that je peux assembler les écrans en consommant des composants éprouvés.

**AC:**
**Given** un dev veut afficher un bouton primaire
**When** il utilise `<PrimaryButton label="Cotiser" onPress={...} />`
**Then** le bouton a le style teal-deep défini par les tokens
**And** les 7 états (default, pressed, focused, disabled, loading, error, empty) sont implémentés et testés
**And** la taille touch target est ≥ 44×44 px
**And** les tests unitaires couvrent ≥ 80 % des composants

**Trace:** UX-DR-COMP-01/02/03/04/10, UX-DR-A11Y-03.

### Story 2.4: Développer les 8 composants de données et feedback

As a dev mobile,
I want les composants `DepositCard`, `GoalCard`, `StarRating`, `StreakBadge`, `AmountInput`, `Toast`, `EmptyState`, `LoadingSkeleton` implémentés,
So that l'écran d'accueil et les écrans transactionnels sont prêts à être composés.

**AC:**
**Given** l'écran accueil consomme `<DepositCard balance={12400} starCount={3} streakDays={12} />`
**When** le composant est rendu
**Then** le solde est affiché en display 32 px gold-dark
**And** les 3 étoiles pleines + 2 vides sont affichées
**And** le badge streak « 🔥 12 jours » est visible
**And** les tests unitaires couvrent les variantes (0 étoile, 5 étoiles, streak 0, streak 90)

**Trace:** UX-DR-COMP-05/06/07/08/09/11/12/13.

### Story 2.5: 2 composants métier (BundleProposal + AlertCard)

As a dev mobile,
I want `BundleProposal` (card violet Santé J+1) et `AlertCard` (anti-churn + AML admin) implémentés,
So that les parcours critiques P1 et P5-P7 ont leurs composants dédiés.

**AC:**
**Given** `<BundleProposal formula="Famille" prime={50} onAccept={...} onLater={...} />`
**When** le composant est rendu
**Then** le card violet soft avec illustration famille est affiché
**And** les 3 boutons (Accepter / Voir les autres / Plus tard) sont positionnés
**And** la mention « Tu peux annuler sous 24 h sans frais » est lue en mode vocal si actif

**Trace:** UX-DR-COMP-14/15, UX-DR-A11Y-01.

### Story 2.6: Commissionner 15-20 illustrations afro-modernes

As a Henoch,
I want 15-20 illustrations afro-modernes commissionnées à un illustrateur ivoirien, livrées en SVG + WebP,
So that les empty states, onboardings et célébrations ont une identité visuelle forte et locale.

**AC:**
**Given** le brief illustrateur est validé
**When** les 15-20 illustrations sont livrées
**Then** chaque illustration est en format SVG et WebP
**And** chaque fichier pèse ≤ 50 Ko (WebP optimisé)
**And** le style est cohérent (palette KOTIZ, personnages afro-modernes, scènes de marché + famille + succès)
**And** les illustrations sont référencées par slug dans le design system

**Trace:** UX-DR-BRAND-01.

### Story 2.7: Produire les 2 sons signature MVP

As a Henoch,
I want les 2 sons signature (dépôt réussi 0,5 s + streak +1 0,4 s) produits par un sound designer ivoirien ou sourcés sur Artlist,
So that chaque confirmation de dépôt et chaque streak ont une ancre sonore mémorable.

**AC:**
**Given** la commande est passée
**When** les 2 sons sont livrés
**Then** chaque son est en MP3 + OGG (compatibilité Android + iOS)
**And** chaque fichier pèse ≤ 30 Ko
**And** le son dépôt réussi combine percussion ivoirienne légère + note moderne claire
**And** les 2 sons sont référencés dans le design system (slug)

**Trace:** UX-DR-BRAND-02.

---

## Epic 3: Auth & KYC

**Goal:** Permettre l'authentification par numéro de téléphone + OTP + PIN, avec onboarding par agent (KYC Tier 1 auto) et routage Tier 2+ vers Ibrahima. Support biométrie optionnelle.

**Target sprint:** S1 → S2.
**Dependencies:** Epic 1 (socle), Epic 2 (composants d'auth).
**FRs couverts:** FR-AG-01, FR-AD-01. **NFRs:** NFR-SEC-03.

### Story 3.1: Inscription par numéro de téléphone + OTP SMS

As a Fatou,
I want m'inscrire avec mon numéro de téléphone en recevant un code OTP par SMS,
So that j'ai un compte KOTIZ sécurisé sans avoir besoin d'email.

**AC:**
**Given** Fatou fournit son numéro de téléphone
**When** le système envoie un OTP
**Then** le SMS est reçu en ≤ 30 s
**And** l'OTP est valide pendant 10 min
**And** après 3 échecs consécutifs, le compte est bloqué 30 min
**And** l'OTP n'est jamais stocké en clair (hash + expiry)

**Trace:** FR-AG-01, NFR-SEC-03.

### Story 3.2: PIN 4 chiffres obligatoire à la création du compte

As a Fatou,
I want choisir un PIN 4 chiffres à la création du compte + le confirmer,
So that je peux me reconnecter rapidement sans saisir d'OTP à chaque session.

**AC:**
**Given** Fatou vient de valider son OTP
**When** elle est invitée à créer son PIN
**Then** elle saisit 4 chiffres puis les confirme
**And** le PIN est stocké hashé (bcrypt ou équivalent)
**And** un PIN faible (1234, 0000, 1111) est refusé avec message clair
**And** 5 échecs consécutifs à la connexion bloquent le compte 1 h

**Trace:** NFR-SEC-03.

### Story 3.3: Biométrie optionnelle (Face ID / empreinte)

As a Fatou,
I want activer la biométrie après la création du PIN pour me reconnecter plus vite,
So that je n'ai pas à saisir le PIN à chaque ouverture de l'app.

**AC:**
**Given** le device supporte la biométrie
**When** Fatou active la biométrie dans les paramètres
**Then** la prochaine connexion propose Face ID / empreinte
**And** le PIN reste le fallback en cas d'échec biométrique
**And** si la biométrie n'est pas supportée, l'option n'est pas affichée

**Trace:** UX-DR-A11Y (device permissions §6 PRD).

### Story 3.4: Enrôlement cliente par Moussa (KYC Tier 1 auto)

As a Moussa,
I want enrôler une nouvelle cliente en saisissant nom + téléphone + scan CNI recto/verso + selfie, avec OTP validé par la cliente,
So that le compte est activé en Tier 1 en ≤ 5 min et la cliente peut commencer à épargner.

**AC:**
**Given** Moussa démarre l'enrôlement via l'app agent
**When** il complète les 4 étapes (identité, scan CNI, selfie, OTP)
**Then** le compte est activé en Tier 1 automatiquement
**And** le plafond wallet Tier 1 est 2 M FCFA
**And** la durée totale est ≤ 5 min (mesurée en analytics)
**And** la cliente reçoit SMS + WhatsApp de bienvenue

**Trace:** FR-AG-01.

### Story 3.5: Routage KYC Tier 2+ vers Ibrahima

As a système,
I want router automatiquement vers la queue d'Ibrahima les dossiers nécessitant KYC Tier 2+ (wallet > 2 M FCFA ou transactions agrégées > 5 M FCFA/mois),
So que la conformité BCEAO soit respectée sans bloquer les flux normaux.

**AC:**
**Given** une cliente approche du plafond Tier 1
**When** la règle de seuil est franchie
**Then** un dossier « KYC Tier 2 à valider » apparaît dans la queue d'Ibrahima
**And** le wallet continue à fonctionner jusqu'au plafond Tier 1
**And** au dépassement, les nouvelles transactions sont bloquées avec message clair
**And** Ibrahima traite le dossier en ≤ 24 h (cible)

**Trace:** FR-AD-01.

### Story 3.6: Gestion de session + refresh token

As a Fatou,
I want rester connectée sans re-saisir le PIN toutes les 10 minutes, mais être déconnectée après 30 jours d'inactivité,
So que l'expérience soit fluide tout en restant sécurisée.

**AC:**
**Given** Fatou est connectée avec un refresh token
**When** son access token expire (15 min)
**Then** le refresh token est utilisé silencieusement
**And** après 30 jours sans activité, le refresh token est invalidé
**And** si le refresh token est compromis, révocation manuelle possible par Ibrahima

**Trace:** NFR-SEC-03, NFR-SEC-04.

---

## Epic 4: Wallet & Mobile Money

**Goal:** Implémenter le wallet interne avec ledger double-entrée + intégrations Orange Money, Wave, MTN MoMo (dépôts + retraits) + réconciliation quotidienne. Toutes les transactions financières du MVP reposent sur cet épic.

**Target sprint:** S2 → S3.
**Dependencies:** Epic 1 (DB, CI/CD), Epic 3 (auth pour sécuriser les endpoints).
**FRs couverts:** FR-EP-01 (partiel), FR-AG-03/04 (partiel). **NFRs:** NFR-PERF-02, NFR-AVAIL-03, NFR-SEC-01, NFR-SEC-02.

### Story 4.1: Wallet + ledger double-entrée

As a Desiré,
I want chaque mouvement sur un wallet être enregistré comme 2 entrées comptables équilibrées (débit + crédit) dans une table `ledger_entries`,
So que la conformité BCEAO soit respectée et que les audits soient sans appel.

**AC:**
**Given** Fatou dépose 500 FCFA depuis Orange Money
**When** la transaction est validée
**Then** 2 entrées sont créées : `-500` sur le compte de passage MM et `+500` sur le wallet Fatou
**And** la somme des entrées est 0 (équation comptable respectée)
**And** le trigger DB empêche toute transaction non équilibrée
**And** l'audit trail associe `user_id`, `timestamp`, `tx_id`, `source` (Orange Money / Wave / MTN / cash agent)

**Trace:** Architecture (ledger BCEAO), NFR-COMP-01.

### Story 4.2: Intégration Orange Money (dépôt + retrait)

As a Fatou,
I want déposer depuis mon compte Orange Money vers mon wallet KOTIZ, et retirer inversement,
So que je peux créditer ou débiter rapidement.

**AC:**
**Given** Fatou initie un dépôt de 500 FCFA depuis l'app
**When** elle choisit Orange Money et autorise le débit sur son téléphone
**Then** le wallet est crédité en ≤ 10 s (P95)
**And** en cas d'échec, un message clair s'affiche avec action possible (retry)
**And** les webhooks d'Orange Money sont signés et vérifiés
**And** le flux est idempotent (retry ne crée pas de doublon)
**And** les 3 états (pending, success, failed) sont gérés et affichés

**Trace:** FR-EP-01, NFR-PERF-02.

### Story 4.3: Intégration Wave (dépôt + retrait)

As a Fatou,
I want un support Wave identique à Orange Money,
So que je peux utiliser n'importe quel opérateur.

**AC:** idem Story 4.2 avec Wave.
**Trace:** FR-EP-01, NFR-PERF-02.

### Story 4.4: Intégration MTN Mobile Money (dépôt + retrait)

As a Fatou,
I want un support MTN MoMo identique,
So que tous les opérateurs CI sont couverts.

**AC:** idem Story 4.2 avec MTN MoMo.
**Trace:** FR-EP-01, NFR-PERF-02.

### Story 4.5: Retry + circuit breaker sur les API MM

As a équipe,
I want un retry automatique (3 tentatives avec backoff exponentiel) et un circuit breaker qui s'ouvre si un opérateur a > 30 % d'échecs sur 5 minutes,
So que les pannes MM ne cascadent pas et que les tentatives ne saturent pas le partenaire.

**AC:**
**Given** Orange Money est indisponible
**When** 30 % des appels échouent en 5 min
**Then** le circuit s'ouvre (plus d'appels pendant 2 min)
**And** les utilisatrices voient un message « Orange Money temporairement indisponible, essaie avec Wave »
**And** le circuit se ferme automatiquement au bout de 2 min pour test (half-open)

**Trace:** NFR-AVAIL-03, NFR-PERF-02.

### Story 4.6: Mode offline-soft de l'app (queue de dépôts)

As a Fatou,
I want que mes dépôts initiés sans réseau soient mis en file d'attente et rejoués automatiquement à la reconnexion,
So que je peux continuer même avec un réseau instable.

**AC:**
**Given** Fatou initie un dépôt sans réseau
**When** elle valide dans l'app
**Then** la demande est stockée localement avec statut « en attente de réseau »
**And** dès reconnexion, la demande est rejouée automatiquement
**And** la file locale survit au redémarrage de l'app
**And** si échec définitif après 24 h, la cliente est notifiée

**Trace:** NFR-AVAIL-03, FR-EP-01.

### Story 4.7: Réconciliation quotidienne MM ↔ wallet

As a rôle Finance,
I want un job nocturne qui réconcilie les soldes KOTIZ avec les relevés Orange Money / Wave / MTN MoMo,
So que toute divergence soit détectée et traitée sous 24 h.

**AC:**
**Given** le job tourne à 03h00
**When** il compare les soldes KOTIZ et les extraits MM
**Then** toute divergence > 1 000 FCFA déclenche une alerte Finance
**And** le rapport de réconciliation est accessible dans la console admin
**And** 100 % des divergences sont loggées même si auto-résolues

**Trace:** NFR-COMP-01, Architecture (réconciliation quotidienne).

---

## Epic 5: Épargne & Objectifs

**Goal:** Permettre à Fatou de déposer dès 100 FCFA, créer/verrouiller jusqu'à 3 objectifs nommés, visualiser sa progression et son streak, recevoir des badges. Consomme l'Epic 4 (wallet).

**Target sprint:** S3.
**Dependencies:** Epic 2 (composants GoalCard, AmountInput, StreakBadge), Epic 3 (auth), Epic 4 (wallet + MM).
**FRs couverts:** FR-EP-01/02/03/04/05.

### Story 5.1: Dépôt multi-canal avec confirmation

As a Fatou,
I want déposer dès 100 FCFA depuis l'app (avec le flux Epic 4), voir la confirmation visuelle + entendre le son KOTIZ,
So que chaque geste quotidien soit valorisé et mémorable.

**AC:**
**Given** Fatou ouvre l'écran Cotiser
**When** elle saisit 500 FCFA + choisit un objectif + confirme via Orange Money
**Then** elle voit l'écran succès en ≤ 10 s avec animation + son dépôt réussi
**And** son solde est mis à jour immédiatement
**And** son streak +1 est affiché avec badge
**And** une notification push + WhatsApp récap lui parvient en ≤ 30 s

**Trace:** FR-EP-01, UX-DR-BRAND-02.

### Story 5.2: Création d'un objectif nommé (max 3 simultanés)

As a Fatou,
I want créer un objectif d'épargne avec un nom, un montant cible, une date cible optionnelle,
So que mes épargnes soient structurées autour de mes vrais besoins (école, Tabaski, stock).

**AC:**
**Given** Fatou n'a aucun objectif
**When** elle clique « + Nouvel objectif » et remplit le formulaire
**Then** l'objectif est créé et visible sur l'accueil
**And** elle peut créer jusqu'à 3 objectifs simultanés (4ᵉ refusé avec message clair)
**And** le formulaire accepte mode vocal pour le nom

**Trace:** FR-EP-02.

### Story 5.3: Verrouillage optionnel d'un objectif

As a Fatou,
I want verrouiller un objectif jusqu'à une date cible, avec possibilité de déverrouiller anticipé au prix d'un malus Score,
So que je résiste à la pression sociale tout en gardant le contrôle.

**AC:**
**Given** Fatou crée un objectif « École rentrée 2026 »
**When** elle coche « Verrouiller jusqu'au 1er septembre 2026 »
**Then** l'objectif affiche icône 🔒 et n'est pas retirable avant la date
**And** le déverrouillage anticipé est proposé avec avertissement malus Score (-20 points)
**And** la cliente doit confirmer explicitement le déverrouillage

**Trace:** FR-EP-03.

### Story 5.4: Visualisation progression + streak

As a Fatou,
I want voir en temps réel mon solde total, ma progression par objectif, mon streak en jours consécutifs,
So que je mesure mes efforts quotidiennement.

**AC:**
**Given** Fatou ouvre l'accueil
**When** l'écran charge
**Then** elle voit son solde total en display 32 px gold-dark
**And** ses étoiles + streak en haut de la DepositCard
**And** ses 1-3 GoalCard avec barre de progression et montant atteint / cible
**And** tout est affiché en ≤ 2 s (NFR-PERF-01)

**Trace:** FR-EP-04, NFR-PERF-01.

### Story 5.5: Badges + bonus Score streak (7 / 30 / 90 jours)

As a système,
I want attribuer un badge + bonus Score (+5 / +15 / +30 points) quand Fatou atteint 7, 30 ou 90 jours de streak consécutif,
So que la régularité soit récompensée et les étoiles progressent naturellement.

**AC:**
**Given** Fatou a un streak de 6 jours
**When** elle fait son dépôt du jour 7
**Then** un toast succès + le son « streak +1 » se déclenchent
**And** +5 points sont ajoutés à son Score lors du prochain calcul nocturne
**And** le badge « 7 jours » est affiché dans son profil
**And** un message WhatsApp « Bravo Fatou, 7 jours d'affilée ! » lui parvient

**Trace:** FR-EP-05, UX-DR-BRAND-02.

### Story 5.6: Écran détail objectif + historique dépôts

As a Fatou,
I want cliquer sur un objectif et voir son historique complet (dépôts, dates, évolution),
So que je comprends d'où vient ma progression.

**AC:**
**Given** Fatou tape sur un objectif
**When** l'écran détail s'ouvre
**Then** elle voit la liste des 30 derniers dépôts avec date et montant
**And** un graphe de progression simple (courbe cumulée)
**And** un CTA « Cotiser sur cet objectif »

**Trace:** FR-EP-04.

---

## Epic 6: Agents & Onboarding

**Goal:** App mobile agent (Moussa) : login, dashboard, onboarding cliente avec bundle J+1, cash-in/out, gestion des plafonds, suspension depuis l'admin.

**Target sprint:** S3 → S4.
**Dependencies:** Epic 1 (socle), Epic 2 (composants), Epic 3 (auth agent + KYC Tier 1), Epic 4 (wallet).
**FRs couverts:** FR-AG-01/02/03/04/05/06.

### Story 6.1: Login + dashboard agent

As a Moussa,
I want me connecter à l'app agent avec mon code + PIN et voir mon dashboard avec tx du jour, commission, float, alertes anti-churn,
So que je démarre ma journée avec une vue claire.

**AC:**
**Given** Moussa ouvre l'app agent
**When** il saisit son code + PIN
**Then** son dashboard s'affiche en ≤ 3 s avec :

- Nombre de tx du jour et montant total
- Commission cumulée
- Solde float disponible
- Plafond journalier utilisé en %
- Liste des clientes sans dépôt depuis ≥ 3 jours

**Trace:** FR-AG-05, NFR-PERF-01.

### Story 6.2: Onboarding cliente (Tier 1 auto, ≤ 5 min)

As a Moussa,
I want onboarder une nouvelle cliente en 4 étapes (identité, scan CNI, selfie, OTP) avec suivi de progression,
So que l'enrôlement est rapide, fiable et traçable.

**AC:**
**Given** Moussa clique « + Nouvelle cliente »
**When** il complète les 4 étapes
**Then** la durée totale est ≤ 5 min (mesurée en analytics)
**And** le KYC Tier 1 est validé automatiquement
**And** la cliente reçoit SMS + WhatsApp de bienvenue
**And** si OTP échoue 3 fois, Moussa est invité à vérifier le numéro

**Trace:** FR-AG-01.

### Story 6.3: Proposition bundle Santé J+1 en fin d'onboarding

As a Moussa,
I want proposer automatiquement le bundle Santé Famille (50 FCFA/j) à chaque cliente enrôlée, en utilisant un script guidé et le composant BundleProposal,
So que le taux de bundle J+1 atteigne ≥ 40 %.

**AC:**
**Given** Moussa vient de valider le KYC Tier 1
**When** l'écran de proposition bundle s'affiche
**Then** le script agent suggéré est visible (« Avec ton épargne, tu peux protéger tes enfants. 50 FCFA/jour... »)
**And** Moussa peut adapter la formule (Famille / Confort / Premium) via un sélecteur
**And** l'acceptation prend 2 clics
**And** la cliente a 24 h pour annuler sans frais (bouton dans l'app cliente)

**Trace:** FR-AG-02.

### Story 6.4: Cash-in (cash → wallet cliente)

As a Moussa,
I want créditer le wallet d'une cliente contre remise de cash avec commission 0,5 % (plafonnée 500 FCFA/tx),
So que la cliente puisse transformer son cash en épargne sans friction.

**AC:**
**Given** Moussa sélectionne une cliente et « Cash-in 1 000 FCFA »
**When** il confirme avec son PIN
**Then** 1 000 FCFA sont crédités au wallet cliente
**And** 5 FCFA de commission sont crédités au compte de Moussa
**And** la cliente reçoit SMS + WhatsApp de confirmation
**And** le plafond journalier (2 M FCFA) et le plafond par tx (200 k FCFA) sont respectés
**And** les événements sont journalisés dans l'audit trail

**Trace:** FR-AG-03.

### Story 6.5: Cash-out (wallet cliente → cash)

As a Moussa,
I want débiter le wallet d'une cliente contre remise de cash avec commission 1 % (plafonnée 500 FCFA/tx),
So que la cliente puisse retirer rapidement son épargne si besoin.

**AC:** idem Story 6.4 avec commission 1 % et sens inverse.

**Trace:** FR-AG-04.

### Story 6.6: Gestion des plafonds + alerte déblocage admin

As a système,
I want bloquer les transactions agent au-delà de 200 k FCFA/tx ou 2 M FCFA/jour, avec possibilité de déblocage manuel par Ibrahima,
So que le risque de fraude cash soit contrôlé.

**AC:**
**Given** Moussa atteint son plafond journalier
**When** il tente une nouvelle transaction
**Then** la transaction est refusée avec message « Plafond journalier atteint. Contacte le support. »
**And** Ibrahima peut débloquer le plafond pour Moussa dans la console admin avec motif
**And** le déblocage est limité à +1 M FCFA et 4 h max

**Trace:** FR-AG-03 (plafonds).

### Story 6.7: Suspension d'un agent par Ibrahima

As a Ibrahima,
I want suspendre un agent en un clic avec motif (alerte AML / plainte cliente / inactivité),
So que les risques soient contenus immédiatement.

**AC:**
**Given** Ibrahima consulte la fiche d'un agent
**When** il clique « Suspendre » et saisit un motif
**Then** l'agent ne peut plus initier de transactions immédiatement
**And** l'agent reçoit une notification expliquant la suspension et les prochaines étapes
**And** l'action est loggée dans l'audit trail avec horodatage

**Trace:** FR-AG-06.

---

## Epic 7: Santé bundlée

**Goal:** Catalogue 3 formules (Famille/Confort/Premium), simulation en 3 questions, souscription + signature + paiement 1ère prime, statut police, déclaration de sinistre manuelle. **La brique Santé doit être prête dès S4 pour activer le bundle J+1 (pas S5).**

**Target sprint:** S4 (catalogue + bundle proposition) → S5 (souscription + signature + prélèvement + sinistre).
**Dependencies:** Epic 4 (wallet pour prélèvement), Epic 6 (proposition via agent), Epic 9 (WhatsApp pour attestation).
**FRs couverts:** FR-SA-01/02/03/04/05.

### Story 7.1: Catalogue 3 formules avec description claire

As a Fatou,
I want consulter les 3 formules Santé (Famille/Confort/Premium) avec prime, couverture et exclusions en langage simple,
So que je puisse comparer sans me perdre dans du jargon.

**AC:**
**Given** Fatou ouvre l'onglet Santé
**When** le catalogue charge
**Then** les 3 formules sont affichées en cards violet en ≤ 2 s
**And** chaque card contient : prime/jour, 3-5 lignes de couverture, exclusions principales
**And** l'icône haut-parleur lit la description de la formule en mode vocal
**And** les montants en FCFA sont bien alignés (tabular-nums)

**Trace:** FR-SA-01, UX-DR-A11Y-01.

### Story 7.2: Simulation en 3 questions + recommandation

As a Fatou,
I want répondre à 3 questions (composition foyer, âge enfants, budget) et recevoir une recommandation de formule,
So que je n'ai pas à choisir seule parmi les 3 sans repère.

**AC:**
**Given** Fatou clique « Simuler »
**When** elle répond aux 3 questions
**Then** une recommandation s'affiche en ≤ 5 s (1 formule principale + alternative si proche)
**And** la recommandation est explicitée (« Tu as 3 enfants scolarisés, Confort est fait pour toi parce que... »)
**And** le mode vocal peut lire les questions et la recommandation
**And** le parcours complet prend ≤ 3 clics et ≤ 5 s

**Trace:** FR-SA-02, UX-DR-A11Y-01.

### Story 7.3: Souscription + signature électronique + paiement 1ère prime

As a Fatou,
I want souscrire en 3 écrans (résumé formule, conditions particulières, confirmation paiement), signer en cochant « J'ai compris » et payer la première prime depuis mon wallet,
So que je puisse activer la protection en quelques minutes.

**AC:**
**Given** Fatou est sur la formule recommandée
**When** elle valide les 3 écrans et confirme
**Then** la 1ère prime est prélevée du wallet
**And** l'attestation d'adhésion est envoyée par WhatsApp + SMS en ≤ 30 s
**And** la police est active J+1 (effet assurance décalé d'un jour)
**And** le flux est idempotent (pas de double souscription si retry)

**Trace:** FR-SA-03.

### Story 7.4: Statut police + historique prélèvements

As a Fatou,
I want voir à tout moment le statut de ma police (active/attente/suspendue/résiliée) et l'historique des prélèvements,
So que je sache si ma protection est en ordre.

**AC:**
**Given** Fatou ouvre l'onglet Santé
**When** une police est active
**Then** le statut et la formule sont affichés en haut
**And** l'historique des 12 derniers prélèvements est visible
**And** si 2 prélèvements consécutifs échouent → police passe en « suspendue » avec alerte push
**And** la réactivation sous 30 j est proposée avec CTA

**Trace:** FR-SA-04.

### Story 7.5: Déclaration de sinistre (formulaire simplifié)

As a Fatou,
I want déclarer un sinistre en 4 écrans simples (type de sinistre, description, upload justificatifs, confirmation), et suivre le statut (Reçu / En cours / Décision / Payé),
So que j'ai visibilité même si le traitement assureur reste manuel en MVP.

**AC:**
**Given** Fatou a un sinistre (ex : consultation enfant)
**When** elle complète les 4 écrans
**Then** la déclaration est enregistrée avec statut « Reçu »
**And** elle peut uploader jusqu'à 5 photos de justificatifs
**And** un récap est envoyé par WhatsApp à l'assureur (canal dédié)
**And** le statut évolue au fil du traitement manuel de l'assureur (renseigné par Ibrahima)

**Trace:** FR-SA-05.

### Story 7.6: Prélèvement automatique hebdomadaire / mensuel + retry

As a système,
I want prélever la prime Santé automatiquement selon la périodicité choisie, avec retry en cas d'échec,
So que les polices restent actives sans friction.

**AC:**
**Given** Fatou a choisi prélèvement hebdomadaire
**When** le scheduler déclenche le prélèvement
**Then** le wallet est débité du montant de la semaine
**And** en cas d'échec (solde insuffisant), retry à H+4 puis H+24
**And** après 2 échecs consécutifs : police suspendue + alerte push + notification Ibrahima
**And** le taux de réussite des prélèvements est suivi (cible ≥ 97 % — NFR)

**Trace:** FR-SA-03/04.

---

## Epic 8: Score 5 étoiles

**Goal:** Calcul nocturne du score (0-1000 + étoile), affichage gamifié dans l'app, explication des composantes, déclenchement automatique des avantages paliers.

**Target sprint:** S5.
**Dependencies:** Epic 4 (données transactions), Epic 5 (streak), Epic 6 (événements agent), Epic 9 (WhatsApp pour notifications paliers).
**FRs couverts:** FR-SC-01/02/03/04.

### Story 8.1: Job nocturne de calcul du Score

As a système,
I want calculer chaque nuit (00h-04h) la valeur numérique 0-1000 et l'étoile (1-5) pour chaque utilisatrice active, à partir des 4 composantes pondérées,
So que le Score soit à jour chaque jour et exploitable partout.

**AC:**
**Given** il est 00h01
**When** le job démarre
**Then** il traite toutes les utilisatrices actives (dernier dépôt ≤ 90 j)
**And** il applique les poids : régularité 40 %, stabilité 25 %, ancienneté 20 %, engagement 15 %
**And** le job se termine en ≤ 4 h (NFR-PERF-03)
**And** les scores sont disponibles en lecture dès 04h15
**And** les résultats sont loggés avec statistiques (moyenne, médiane, distribution)

**Trace:** FR-SC-01, NFR-PERF-03.

### Story 8.2: Affichage Score 5 étoiles sur accueil + onglet dédié

As a Fatou,
I want voir mes étoiles (1-5) sur l'accueil, le palier actuel, la progression vers le palier suivant, les avantages débloqués,
So que mon Score soit lisible d'un coup d'œil.

**AC:**
**Given** Fatou ouvre l'app
**When** l'accueil charge
**Then** elle voit ses étoiles sur la DepositCard (haut de l'écran)
**And** l'onglet « Score » affiche le détail : étoiles animées, label palier, avantages débloqués, barre de progression vers palier suivant
**And** les transitions de palier sont animées (glissement 0,4 s)
**And** l'icône haut-parleur lit « Tu es à 3 étoiles, plus que 40 points pour atteindre 4 étoiles »

**Trace:** FR-SC-02, UX-DR-A11Y-01.

### Story 8.3: Écran « Comprendre mon score » (composantes chiffrées + projection)

As a Fatou,
I want comprendre pourquoi j'ai 3 étoiles et voir ce que je devrais faire pour passer à 4,
So que le Score soit tangible et actionnable, pas abstrait.

**AC:**
**Given** Fatou tape « Comprendre mon score »
**When** l'écran charge
**Then** les 4 composantes sont affichées avec note (A/B+/C/etc.) et barre de progression
**And** une section « Projection » suggère 2-3 actions concrètes (« Si tu cotises 7 jours de suite, tu gagnes +15 points »)
**And** l'écran est accessible en ≤ 2 clics depuis l'accueil

**Trace:** FR-SC-03.

### Story 8.4: Déclenchement automatique avantages paliers

As a système,
I want débloquer automatiquement les avantages à chaque franchissement de palier (2 ⭐ → récap vocal, 3 ⭐ → consultation téléphone, 4 ⭐ → -10 % Confort, 5 ⭐ → priorité crédit V2),
So que Fatou perçoit immédiatement la valeur du Score.

**AC:**
**Given** Fatou franchit 4 étoiles (601 points)
**When** le job nocturne détecte le franchissement
**Then** l'avantage « -10 % Confort » est activé dans ≤ 24 h
**And** Fatou reçoit notification push + WhatsApp « Bravo, tu passes à 4 ⭐ ! Tu débloques -10 % sur Confort »
**And** l'écran Santé propose de mettre à jour la police pour bénéficier de la remise
**And** l'événement palier est loggé pour analytics

**Trace:** FR-SC-04.

### Story 8.5: Notification WhatsApp mensuelle d'évolution

As a système,
I want envoyer à chaque utilisatrice active un message WhatsApp mensuel récapitulant son évolution Score,
So que le Score reste top-of-mind et motive à continuer.

**AC:**
**Given** le premier jour du mois
**When** le job hebdomadaire déclenche l'envoi
**Then** chaque utilisatrice active reçoit un WhatsApp personnalisé : « Fatou, en avril tu es passée de 3 à 4 étoiles 👏 »
**And** le message inclut un lien vers l'écran « Comprendre mon score »
**And** le taux d'ouverture est tracké

**Trace:** FR-SC-02, FR-SC-04.

---

## Epic 9: Canaux conversationnels (WhatsApp Bot + USSD)

**Goal:** WhatsApp Business Bot (principal canal conversationnel) + USSD *XXX# (inclusion feature phone) + SMS transactionnels. Vocal FR/dioula optionnel.

**Target sprint:** S4.
**Dependencies:** Epic 1 (socle), Epic 3 (auth téléphone), Epic 4 (wallet pour liens paiement).
**FRs couverts:** FR-EP-01 (canal WA + USSD), FR-SC-02 (notif), FR-VI-01 (parrainage WA), FR-RE-02 (anti-churn vocal).

### Story 9.1: Intégration WhatsApp Business API + webhook

As a Desiré,
I want configurer WhatsApp Business API (via Meta direct ou Twilio/360dialog) + webhook entrant/sortant sécurisé,
So que le bot puisse recevoir et répondre aux messages.

**AC:**
**Given** le compte WA Business est configuré
**When** une cliente envoie un message
**Then** le webhook KOTIZ reçoit le message dans ≤ 2 s
**And** les signatures de webhook sont vérifiées
**And** l'envoi sortant utilise les templates approuvés par Meta
**And** la latence de réponse est ≤ 3 s P95

**Trace:** Architecture (WhatsApp Business API), NFR-PERF-04.

### Story 9.2: Bot WhatsApp — 7 intents principaux

As a Fatou,
I want interagir avec le bot WhatsApp pour : cotiser, voir solde, voir score, souscrire Santé, demander aide, parrainer une amie, activer mode vocal,
So que je n'ai pas besoin d'ouvrir l'app pour les gestes courants.

**AC:**
**Given** Fatou envoie « cotiser 500 » au bot
**When** le bot reçoit le message
**Then** il répond avec un lien de paiement (Orange Money/Wave/MTN au choix)
**And** les 7 intents sont implémentés avec arbre de dialogue versionné
**And** si le bot ne comprend pas après 2 tours, il propose le hand-off humain (Moussa ou support KOTIZ)
**And** fallback si API Meta down → SMS + push natif

**Trace:** FR-EP-01 (canal WA), FR-VI-01.

### Story 9.3: Mode vocal WhatsApp (in & out)

As a Fatou,
I want envoyer un message vocal « mets-moi 500 KOTIZ » et recevoir des réponses vocales pour les notifications importantes,
So que je peux interagir sans savoir écrire.

**AC:**
**Given** Fatou envoie un vocal au bot
**When** le message est reçu
**Then** le backend transcrit via STT (FR ou dioula si dispo) en ≤ 5 s
**And** l'intent est détecté et traité comme un message texte
**And** les utilisatrices ≥ 2 ⭐ reçoivent les notifications importantes en vocal (bonus Score)
**And** les transcriptions sont loggées pour analyse qualité

**Trace:** FR-SC-04 (avantage vocal 2⭐), UX-DR-A11Y-01.

### Story 9.4: Gateway USSD *XXX

As a cliente sans smartphone,
I want composer `*XXX#` et accéder à un menu 4 niveaux (solde, cotiser, score, aide),
So que je ne suis pas exclue du service même sans data ou app.

**AC:**
**Given** la cliente compose `*XXX#`
**When** le menu s'affiche
**Then** elle voit 4 options principales avec temps de réponse ≤ 3 s
**And** le menu ne dépasse jamais 4 niveaux de profondeur
**And** aucune saisie longue (> 10 caractères) n'est requise
**And** le code `*XXX#` est placeholder — résolution avant go-live S6

**Trace:** FR-EP-01 (canal USSD), NFR-PERF-04.

### Story 9.5: SMS transactionnels (confirmations + OTP + alertes)

As a cliente,
I want recevoir un SMS pour chaque événement critique (OTP, dépôt confirmé, prélèvement santé, suspension police, palier étoile franchi),
So que j'ai une trace fiable même sans data.

**AC:**
**Given** un événement critique survient (ex : dépôt Orange Money réussi)
**When** le trigger est émis
**Then** un SMS est envoyé en ≤ 60 s
**And** le SMS est en français par défaut, version courte (≤ 140 caractères)
**And** le coût SMS est tracké pour le NFR-ACQ-01

**Trace:** FR-AG-03 (confirmation SMS), NFR-SEC-03 (OTP SMS).

### Story 9.6: Templates WhatsApp approuvés Meta + i18n

As a Henoch,
I want que tous les templates WhatsApp (bienvenue, attestation, notification, récap hebdo) soient approuvés par Meta et traduisibles (FR obligatoire, dioula optionnel),
So que le bot soit conforme aux règles WA Business.

**AC:**
**Given** un template est créé
**When** il est soumis à Meta
**Then** il est approuvé ou rejeté par Meta dans 1-3 jours
**And** une fois approuvé, il est versionné dans le repo
**And** chaque template a une version FR et une version dioula (vocal) si pertinent

**Trace:** FR-SA-03 (attestation), FR-SC-04 (notif palier).

---

## Epic 10: Admin & Conformité

**Goal:** Console web admin pour Ibrahima (Ops), Risk et Finance : validation KYC Tier 2+, alertes AML avec rédaction STR CENTIF-CI ≤ 24 h, export rapports BCEAO / CENTIF, audit trail 10 ans, séparation des fonctions (SoD).

**Target sprint:** S4 → S6 (critique pour le go-live, obligation BCEAO).
**Dependencies:** Epic 1 (socle), Epic 3 (auth admin MFA), Epic 4 (données transactions), Epic 6 (gestion agents).
**FRs couverts:** FR-AD-01/02/03/04, FR-AG-06. **NFRs:** NFR-SEC-03/04, NFR-COMP-01/02/03/04.

### Story 10.1: Console web admin + auth MFA renforcée

As a Ibrahima,
I want me connecter à la console admin via mot de passe + OTP (MFA renforcée), avec session 2 h maximum,
So que l'accès aux données sensibles soit protégé.

**AC:**
**Given** Ibrahima accède à `admin.kotiz.ci`
**When** il saisit ses credentials
**Then** un OTP est envoyé par SMS ou email
**And** la session expire après 2 h d'inactivité
**And** la MFA est obligatoire pour tous les rôles admin (Ops, Risk, Finance, PO)
**And** 5 échecs consécutifs bloquent le compte 1 h

**Trace:** NFR-SEC-03.

### Story 10.2: Système de rôles + permissions SoD

As a CEO Henoch,
I want définir 4 rôles (Ops, Risk, Finance, PO) avec permissions granulaires respectant la séparation des fonctions,
So que personne ne peut initier + approuver + réconcilier seul une opération.

**AC:**
**Given** la matrice SoD du §10.3 du PRD
**When** les rôles sont implémentés
**Then** Ops peut valider KYC Tier 2 mais pas modifier plafonds BCEAO
**And** Risk valide suspensions > 500k mais ne gère pas les clientes au quotidien
**And** Finance réconcilie mais ne valide pas KYC
**And** PO arbitre paramètres critiques mais n'accède pas aux données clientes sans motif loggé
**And** chaque action sensible est journalisée avec rôle + motif

**Trace:** PRD §10.3, FR-AD-04.

### Story 10.3: Queue KYC Tier 2+ triable

As a Ibrahima,
I want voir la queue des dossiers KYC Tier 2+ en attente, triable par ancienneté / criticité, avec fiche détaillée par cliente,
So que je traite les dossiers en ≤ 24 h sans rater les urgents.

**AC:**
**Given** un agent a escaladé un Tier 2
**When** Ibrahima ouvre la queue
**Then** le dossier apparaît avec ancienneté (couleur selon SLA)
**And** les dossiers > 24 h sont marqués en warn (rouge)
**And** Ibrahima peut valider / rejeter / demander docs en 1 clic
**And** la cliente est notifiée du résultat par WhatsApp + SMS

**Trace:** FR-AD-01.

### Story 10.4: Alertes AML automatiques + investigation

As a Ibrahima,
I want recevoir automatiquement les alertes AML (patterns : 3 cash-in > 100k / 1h, liste sanctions, fréquence anormale), avec fiche d'investigation intégrée,
So que je détecte les suspicions rapidement et les documente.

**AC:**
**Given** un pattern suspect est détecté
**When** l'alerte est créée
**Then** elle apparaît dans la console en temps réel (< 30 s)
**And** la fiche inclut : cliente, agent, historique 30 j, pattern détecté, score de risque
**And** Ibrahima peut : classer faux positif / suspendre + STR / escalader Risk
**And** toutes les décisions sont loggées

**Trace:** FR-AD-02, PRD §10.2.

### Story 10.5: Rédaction + envoi STR CENTIF-CI ≤ 24 h

As a Ibrahima,
I want rédiger un STR (Suspicious Transaction Report) avec template pré-rempli + attacher pièces justificatives + envoyer à CENTIF-CI automatiquement,
So que l'obligation LBC/FT soit respectée.

**AC:**
**Given** Ibrahima décide « Suspect — suspendre + STR »
**When** il rédige le STR
**Then** le formulaire est pré-rempli avec données cliente, tx, patterns
**And** il peut attacher des fichiers
**And** la soumission déclenche un email sécurisé à CENTIF-CI avec horodatage
**And** une copie est archivée 10 ans
**And** le délai détection → envoi est ≤ 24 h (alerte si approche)
**And** la cliente est suspendue immédiatement

**Trace:** FR-AD-02, NFR-COMP-02.

### Story 10.6: Export rapports BCEAO mensuels + CENTIF trimestriels

As a rôle Finance,
I want générer en 1 clic les rapports réglementaires BCEAO (mensuel) et CENTIF (trimestriel) avec signature numérique + horodatage,
So que 100 % des rapports soient remis dans les délais.

**AC:**
**Given** c'est la fin d'un mois
**When** Finance clique « Générer rapport BCEAO Avril »
**Then** le PDF est généré avec tous les agrégats requis (volume wallet, transactions, ouvertures, incidents, STR)
**And** le PDF est signé numériquement + horodaté
**And** un bouton « Envoyer BCEAO » déclenche l'envoi officiel
**And** l'archivage 10 ans est automatique

**Trace:** FR-AD-03, NFR-COMP-01.

### Story 10.7: Audit trail complet + recherche

As a auditeur (interne ou externe),
I want consulter l'historique complet des actions utilisateurs, agents et admin sur une cliente / un agent / une police, avec recherche rapide,
So que toute action soit traçable et opposable.

**AC:**
**Given** un cas d'audit
**When** Ibrahima recherche « cliente 4421 »
**Then** toutes les actions associées sont listées en < 5 s pour 12 derniers mois
**And** chaque entrée contient : timestamp, acteur, action, avant/après, motif
**And** les logs sont conservés 10 ans (rétention BCEAO)
**And** l'export CSV est possible

**Trace:** FR-AD-04, NFR-SEC-04.

---

## Epic 11: Viralité & Anti-churn

**Goal:** 3 mécanismes viraux (parrainage Score Booster, onboarding à deux, recap hebdo partageable) + 3 mécanismes anti-churn (détection 3j, push vocal WA, alerte agent). Critique pour CAC ≤ 2 500 FCFA et rétention S4 ≥ 40 %.

**Target sprint:** S6.
**Dependencies:** Epic 5 (épargne + streak), Epic 6 (agent + plafonds), Epic 9 (WhatsApp Bot), Epic 8 (Score).
**FRs couverts:** FR-VI-01/02/03, FR-RE-01/02/03.

### Story 11.1: Parrainage Score Booster (+5 points)

As a Fatou,
I want parrainer une amie en 3 clics via WhatsApp, et nous gagnons chacune +5 points Score si elle fait son premier dépôt dans les 7 jours,
So que la croissance soit organique et récompensée.

**AC:**
**Given** Fatou a fait ≥ 10 cotisations
**When** elle tape « Parrainer » sur l'app
**Then** un modal propose WhatsApp ou saisie manuelle
**And** l'invitation pré-rédigée est envoyée avec lien unique (trackable)
**And** si l'amie s'inscrit + fait 1er dépôt ≤ 7 j, +5 points sont crédités à chacune (via job nocturne)
**And** la fraude (même numéro, doublon) est détectée et bloquée
**And** le tracking fonctionne même si l'amie installe l'app via Play Store

**Trace:** FR-VI-01, NFR-ACQ-01.

### Story 11.2: Bonus onboarding à deux (200 FCFA)

As a Moussa,
I want enrôler deux clientes le même jour et qu'elles reçoivent chacune 200 FCFA de bonus crédités sur leur wallet,
So que les agents poussent l'effet pair et que le CAC effectif baisse.

**AC:**
**Given** Moussa enrôle 2 clientes dans la même journée
**When** chaque cliente fait son 1er dépôt
**Then** 200 FCFA de bonus sont crédités à chacune en J+1
**And** la promo MVP est limitée (ex : 200 paires max sur le MVP)
**And** le tracking est visible dans le dashboard agent (« 3 paires ce mois-ci »)
**And** le bonus n'est pas cumulable avec le parrainage Score Booster pour la même paire

**Trace:** FR-VI-02, NFR-ACQ-01.

### Story 11.3: Génération recap hebdo partageable

As a système,
I want générer chaque vendredi 19h une carte récap personnalisée (épargne semaine, étoiles, streak, progression objectif) partageable sur WhatsApp,
So que Fatou puisse diffuser sa progression et recruter naturellement.

**AC:**
**Given** le scheduler déclenche à vendredi 19h
**When** le job tourne
**Then** chaque utilisatrice active reçoit une image PNG personnalisée via WhatsApp
**And** la carte contient prénom, épargne semaine, étoiles, streak, progression objectif principal
**And** les montants sont masqués si l'image est partagée (respect vie privée)
**And** le bouton « Partager mes étoiles » sur l'app pré-remplit un message WhatsApp
**And** le taux de partage est tracké (cible 15 %)

**Trace:** FR-VI-03.

### Story 11.4: Détection quotidienne inactivité 3 jours

As a système,
I want détecter chaque nuit à minuit J+3 les utilisatrices sans dépôt depuis 3 jours consécutifs,
So que les push anti-churn et alertes agents soient déclenchés.

**AC:**
**Given** le job tourne à 00h01
**When** il traite les utilisatrices
**Then** la liste des clientes avec 3j sans dépôt est calculée
**And** elle est transmise au moteur de notifications (FR-RE-02) et à l'app agent (FR-RE-03)
**And** la liste est purgée des clientes déjà traitées (pas de spam)

**Trace:** FR-RE-01.

### Story 11.5: Push vocal WhatsApp anti-churn + ancrage émotionnel

As a système,
I want envoyer aux utilisatrices détectées un push WhatsApp vocal rappelant leur objectif avec leur photo personnelle,
So que le signal émotionnel soit maximal.

**AC:**
**Given** Fatou est dans la liste anti-churn
**When** le push est envoyé ≤ 2 h après détection
**Then** Fatou reçoit un message WhatsApp vocal + image
**And** le vocal est en dioula si elle l'a activé, sinon français
**And** le texte mentionne son objectif et son streak (« tu es à 2 jours de perdre ton streak »)
**And** la photo uploadée à l'onboarding (« pourquoi j'épargne ») est incluse

**Trace:** FR-RE-02, UX-DR-A11Y-01.

### Story 11.6: Alerte agent 3 jours

As a Moussa,
I want recevoir sur mon app une liste de mes clientes sans dépôt depuis 3 jours avec CTA « Appeler »,
So que je puisse les visiter ou les appeler rapidement.

**AC:**
**Given** le job a détecté 5 clientes de Moussa
**When** Moussa ouvre son dashboard
**Then** il voit « ⚠️ 5 clientes à visiter »
**And** la liste affiche nom + jours sans dépôt + boutons « Appeler » / « Message WA »
**And** l'alerte disparaît dès que la cliente cotise
**And** si pas de reprise après 7 jours, l'alerte remonte à Ibrahima

**Trace:** FR-RE-03.

---

## Epic 12: Tests terrain & Launch

**Goal:** Tests avec 50 clientes non formées à Adjamé, audit sécurité externe, DPIA finalisée, validation BCEAO, pilote limité 1 000 clientes au go-live.

**Target sprint:** S6 (2 dernières semaines avant lancement).
**Dependencies:** TOUS les épics précédents.
**NFRs:** NFR-SEC-05 (test intrusion), NFR-COMP-03 (DPIA), tous les autres NFRs validés.

### Story 12.1: Tests terrain — 10 clientes non formées par persona

As a Henoch,
I want tester les 8 parcours critiques avec 10 clientes non formées par persona (Fatou, Moussa) à Adjamé,
So que tout bug d'UX, friction ou incompréhension soit détecté avant le go-live public.

**AC:**
**Given** les parcours P1 à P8 sont implémentés
**When** le test terrain est organisé
**Then** ≥ 10 Fatou (analphabétes partielles) et 5 Moussa (agents) testent chaque parcours
**And** chaque parcours est testé avec observation directe + questionnaire NPS + interview qualitative
**And** les bugs P0/P1 sont corrigés avant la story 12.5
**And** un rapport de test est produit avec recommandations

**Trace:** PRD §7 (tests terrain), NPS ≥ 40.

### Story 12.2: Audit sécurité externe + pentest

As a Henoch,
I want un audit sécurité externe + test d'intrusion par un prestataire tiers spécialisé fintech,
So que les vulnérabilités critiques soient corrigées avant la mise en production.

**AC:**
**Given** l'application est en staging
**When** l'audit démarre
**Then** un rapport de vulnérabilités est produit en ≤ 2 semaines
**And** toutes les vulnérabilités P0/P1 sont corrigées avant le go-live
**And** les P2/P3 sont planifiées en V1
**And** le rapport signé est archivé pour audit BCEAO

**Trace:** NFR-SEC-05.

### Story 12.3: DPIA finalisée

As a Henoch (avec l'avocat conformité),
I want une DPIA (Data Protection Impact Assessment) formelle couvrant tous les traitements sensibles (CNI, selfie, santé, géolocalisation),
So que la conformité CDP ivoirienne soit démontrée avant go-live.

**AC:**
**Given** la DPIA est structurée selon le template ivoirien
**When** elle est finalisée
**Then** chaque traitement sensible est documenté (finalité, base légale, minimisation, rétention, sécurité)
**And** les mesures de mitigation sont listées
**And** le plan de réaction en cas d'incident est inclus
**And** le document est validé par l'avocat et signé par Henoch
**And** la DPIA est archivée et accessible sur demande CDP

**Trace:** NFR-COMP-03, PRD §10.1.

### Story 12.4: Validation BCEAO (reporting de test + aperçu pilote)

As a Henoch,
I want soumettre à la BCEAO un aperçu du reporting + le plan du pilote limité à 1 000 clientes au go-live,
So que la BCEAO donne son feu vert formel avant l'ouverture publique.

**AC:**
**Given** le rapport de test BCEAO est généré (Story 10.6)
**When** il est soumis à la BCEAO avec le plan pilote
**Then** la BCEAO confirme la conformité ou demande des ajustements
**And** les ajustements éventuels sont appliqués avant le go-live
**And** le feu vert formel est archivé

**Trace:** NFR-COMP-01, PRD §14 (risque non-conformité BCEAO).

### Story 12.5: Go-live pilote limité 1 000 clientes

As a Henoch,
I want lancer KOTIZ en mode pilote limité à 1 000 clientes sur Adjamé pendant 2-4 semaines, avec monitoring renforcé et kill switch,
So que nous puissions détecter et corriger rapidement tout problème en production sans exposer des milliers d'utilisatrices.

**AC:**
**Given** les stories 12.1 à 12.4 sont terminées
**When** le go-live pilote démarre
**Then** les inscriptions sont plafonnées à 1 000 clientes via une file d'attente
**And** le monitoring (latence, taux d'échec, incidents sécurité) est renforcé H24
**And** un kill switch permet de suspendre les nouvelles inscriptions en 1 clic
**And** les retours terrain sont collectés quotidiennement par Henoch + Ibrahima
**And** si les KPIs techniques et NPS sont atteints à 4 semaines, l'ouverture grand public est planifiée

**Trace:** PRD §14 (mitigation conformité BCEAO).

### Story 12.6: Publication Play Store + App Store

As a Henoch,
I want publier l'app cliente et l'app agent sur Play Store et App Store avec fiches optimisées,
So que les téléchargements soient possibles via les stores officiels.

**AC:**
**Given** les builds de production sont validés
**When** les fiches sont soumises
**Then** les 2 apps sont publiées sur Play Store et App Store
**And** la fiche contient : screenshots, description en français, captures des parcours clés
**And** la version minimale est Android 7+ et iOS 13+
**And** le feedback (notes/commentaires) est monitoré dès J+1

**Trace:** NFR-COMPAT-01, FR-VI (acquisition store).

---

## Récapitulatif

**Total : 12 épics, 73 stories estimées.**

### Distribution par épic

| #   | Épic                   | Sprints | Stories | FRs / NFRs / UX-DRs couverts      |
| --- | ---------------------- | ------- | ------- | --------------------------------- |
| 1   | Socle technique        | S0→S1   | 6       | NFRs infra                        |
| 2   | Design System          | S1→S2   | 7       | 22 UX-DRs                         |
| 3   | Auth & KYC             | S1→S2   | 6       | FR-AG-01, FR-AD-01                |
| 4   | Wallet & Mobile Money  | S2→S3   | 7       | FR-EP-01, FR-AG-03/04             |
| 5   | Épargne & Objectifs    | S3      | 6       | FR-EP-01 à 05                     |
| 6   | Agents & Onboarding    | S3→S4   | 7       | FR-AG-01 à 06                     |
| 7   | Santé bundlée          | S4→S5   | 6       | FR-SA-01 à 05                     |
| 8   | Score 5 étoiles        | S5      | 5       | FR-SC-01 à 04                     |
| 9   | Canaux (WA + USSD)     | S4      | 6       | FR-EP-01 (WA), FR-VI-01, FR-RE-02 |
| 10  | Admin & Conformité     | S4→S6   | 7       | FR-AD-01 à 04, FR-AG-06           |
| 11  | Viralité & Anti-churn  | S6      | 6       | FR-VI-01/02/03, FR-RE-01/02/03    |
| 12  | Tests terrain & Launch | S6      | 6       | Tous NFRs validés                 |

### Timeline synthétique

```
Pré-S1 (avant 5 mai)   Pré-recrutement dev #2 backend (Epic 1)
S1 (5 → 18 mai)        Epic 1 + Epic 2 début + Epic 3 début
S2 (19 mai → 1 juin)   Epic 2 fin + Epic 3 fin + Epic 4 début
S3 (2 → 15 juin)       Epic 4 fin + Epic 5 + Epic 6 début
S4 (16 → 29 juin)      Epic 6 fin + Epic 7 début + Epic 9 + Epic 10 début
S5 (30 juin → 13 juil) Epic 7 fin + Epic 8 + Epic 10 suite
S6 (14 → 27 juillet)   Epic 10 fin + Epic 11 + Epic 12 (tests + launch)
```

### Dépendances critiques

- **Pré-S1** : dev #2 backend recruté (risque critique PRD §14)
- **S3** : partenaire assureur CIMA signé (Epic 7)
- **S3-S4** : intégrations Orange Money / Wave / MTN signées (Epic 4)
- **S4** : bundle Santé J+1 prêt (Epic 7 en parallèle d'Epic 6)
- **S5** : partenaire infirmier téléphone signé (Epic 8 avantage 3⭐)
- **S6** : validation BCEAO + DPIA (Epic 12)

---

_Document interne confidentiel — Ne pas diffuser sans autorisation écrite._
_Version 1.0 — Epic Breakdown · 23 avril 2026 · © KOTIZ SAS, Abidjan._
