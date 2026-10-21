---
title: Sprint Change Proposal — Re-scope MVP post-audit readiness (NOT READY)
version: 1.0
date: 2026-09-01
author: Henoch Lonzo Koffi
workflow: bmad-correct-course
status: APPROUVE
approved_by: Henoch Lonzo Koffi
approved_date: 2026-09-01
scope_classification: MAJOR
trigger_document: KOTIZ/_archive/2026-bmad/_bmad-output/planning-artifacts/implementation-readiness-report-2026-08-23.md
classification: Usage interne
---

# Sprint Change Proposal — Re-scope MVP post-audit readiness

> **Classification du changement : MAJOR** — replan fondamental. Routage PM / Architecte, pas Developer.

---

## 1. Résumé du changement

### 1.1 Déclencheur

L'audit d'implementation readiness du **23 août 2026** (`implementation-readiness-report-2026-08-23.md`, évaluateur : Codex, revue adversariale BMAD) a rendu le verdict :

> **NOT READY — Non prêt pour un lancement, un pilote avec argent réel, ni l'exécution du MVP complet.**

Bilan : **plus de 50 écarts, risques ou questions ouvertes** répartis sur huit catégories — gouvernance, réglementation, business model, produit, agents, assurance, UX, architecture/exécution.

### 1.2 Catégorisation

| Dimension          | Valeur                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type d'issue       | `Strategic pivot` + `Misunderstanding of original requirements`                                                                                                        |
| Story déclenchante | Aucune story unique — l'audit porte sur le corpus entier. Story témoin : `1-1-monorepo-kotiz-turborepo` (en `review` depuis le 26 juin, seule story développée sur 73) |
| Découverte         | Audit de cohérence produit demandé par Henoch, 23 août 2026                                                                                                            |
| Portée             | PRD, epics, architecture, UX, sprint plan, calendrier                                                                                                                  |

### 1.3 Énoncé du problème

**Les documents de planification donnent une impression de maturité très supérieure à la réalité opérationnelle et juridique du projet.**

Trois faits établis :

1. **Le montage juridique n'existe pas.** Le PRD affirme simultanément que KOTIZ « n'est pas une banque », qu'elle est une plateforme/distributrice, et que « KOTIZ est EME ». Ce sont trois modèles juridiques mutuellement exclusifs. Depuis le 1er mai 2025, les structures non agréées concernées doivent cesser d'offrir des services de paiement dans l'UMOA.
2. **La circulation de l'argent n'est pas spécifiée.** Ni détenteur légal des fonds, ni ledger de référence, ni règles de réconciliation, ni responsabilité en cas d'écart, ni parcours de litige/reversal. Ce sont les fondations du produit, pas des détails d'implémentation.
3. **La rentabilité par transaction n'est pas établie.** Commission KOTIZ 1,5 %, commission agent cash-in 0,5 %, cash-out 1 %, frais opérateurs, prime Santé : aucun document ne dit si ces montants s'additionnent, s'incluent, ou qui les finance.

### 1.4 Preuve matérielle

| Indicateur                        | Planifié          | Réel au 1er sept. 2026                           |
| --------------------------------- | ----------------- | ------------------------------------------------ |
| Stories développées               | 76                | **1** (`1-1`, en `review`)                       |
| Commits code                      | —                 | **1** (`feat: init monorepo turborepo`)          |
| Épics en cours                    | 12                | **1** (Epic 1) — les 11 autres en `backlog`      |
| Code métier (ledger, wallet, KYC) | Sprints 1→5       | **0 ligne**                                      |
| Fin de MVP planifiée              | 27 juillet 2026   | Dépassée de **5 semaines**, aucune brique livrée |
| Partenaire agréé                  | Implicite         | **Aucun contrat**                                |
| Term sheet assureur               | Avant S3 (18 mai) | **Aucun**                                        |
| Autorisations ARTCI               | DPIA en S5        | **Aucune demande déposée**                       |

> Le calendrier mai → juillet 2026 est **caduc** et doit être retiré de tous les documents, pas décalé.

---

## 2. Analyse d'impact

### 2.1 Impact epics — vue d'ensemble

| Epic                                             | Décision                 | Nature de l'impact                                                                 |
| ------------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------- |
| **Epic 0 — Gouvernance & Portes réglementaires** | 🆕 **CRÉÉ**              | 7 stories non-dev. Bloquant absolu pour tout argent réel                           |
| Epic 1 — Socle technique                         | 🟡 Ajusté                | 1 story ajoutée (kill switch), 1 différée (`1-3b` staging/prod)                    |
| Epic 2 — Design System                           | 🟠 Réduit                | 4/7 stories actives, 3 différées                                                   |
| Epic 3 — Auth & KYC                              | 🟡 Ajusté                | 1 ajoutée (récupération compte / SIM-swap), 1 différée (biométrie), `3.4` réécrite |
| Epic 4 — Wallet & Mobile Money                   | 🔴 **Refondu + renommé** | → **Wallet, Ledger & Réconciliation**. 3 stories ajoutées, 2 différées (Wave, MTN) |
| Epic 5 — Épargne & Objectifs                     | 🔴 Fortement réduit      | 2/6 stories actives, 4 différées                                                   |
| Epic 6 — Agents & Onboarding                     | 🟡 Ajusté                | 2 ajoutées (float, manuel opérationnel), 1 différée (bundle Santé)                 |
| Epic 7 — Santé bundlée                           | ⛔ **DIFFÉRÉ EN BLOC**   | 0/6 actives                                                                        |
| Epic 8 — Score 5 étoiles                         | ⛔ **DIFFÉRÉ EN BLOC**   | 0/5 actives                                                                        |
| Epic 9 — Canaux conversationnels                 | ⛔ Différé sauf SMS      | 1/6 active (`9.5` SMS transactionnels, remontée en priorité)                       |
| Epic 10 — Admin & Conformité                     | 🟠 Réduit                | 4/7 actives, 3 différées (dépendent du RACI Gate 1)                                |
| Epic 11 — Viralité & Anti-churn                  | ⛔ **DIFFÉRÉ EN BLOC**   | 0/6 actives                                                                        |
| Epic 12 — Tests terrain & Launch                 | 🔴 **Refondu + renommé** | → **Pilote fermé**. 2 ajoutées, périmètre divisé par 50                            |

**Bilan quantitatif**

|                                        | Avant | Après                                                                                                                                         |
| -------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Épics                                  | 12    | 13 (dont 1 nouveau non-dev)                                                                                                                   |
| Stories référencées                    | 76    | 92 (**+16 ajoutées**)                                                                                                                         |
| **Stories actives dans le MVP réduit** | 76    | **53** dont **7 non-dev** (Epic 0) et **7 pilote** (Epic 12) → **39 restantes, dont 38 de dev** (`6-9` manuel opérationnel agent est non-dev) |
| Stories différées en V1                | 0     | **39**                                                                                                                                        |

> ⚠️ **Lecture honnête** : 38 stories de dev, ce n'est pas « petit ». Mais 12 d'entre elles (Epic 4 refondu) sont exactement les parcours d'échec, d'idempotence, de réconciliation et de litige que l'audit identifie comme manquants — c'est le cœur non négociable d'un produit qui manipule de l'argent. La réduction porte sur la **largeur** (4 briques → 1), pas sur la **profondeur** du flux monétaire.

### 2.2 Conflits d'artefacts

| Document                                                                                                                                                                                                                                | Conflit constaté                                                     | Action requise                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/product/prd-mvp.md` §1, §2, §5                                                                                                                                                                                                    | Trois modèles juridiques contradictoires ; « KOTIZ est EME »         | Réécriture §2 : statut = **indéterminé, arbitré en Gate 1**. Interdiction de toute affirmation de statut avant ADR-012                      |
| `docs/product/prd-mvp.md` §1 « Ce que livre le MVP »                                                                                                                                                                                    | 4 briques livrées ensemble                                           | Réduire à **1 brique** (Épargne/cash) + 3 briques V1 conditionnées                                                                          |
| `docs/product/prd-mvp.md` §1 KPIs                                                                                                                                                                                                       | 1 000 clientes, 50 agents, 200 souscriptions Santé, fin juillet 2026 | Remplacer par KPIs de pilote fermé (20 clientes, 2 agents) + critères go/no-go                                                              |
| `docs/product/prd-mvp.md` §5.1                                                                                                                                                                                                          | Plafonds Tier 1 à 2 M FCFA « auto-validé par agent »                 | **Marquer comme hypothèse non validée.** Plafonds fixés par le partenaire agréé, jamais codés depuis le PRD                                 |
| `docs/product/prd-mvp.md` §5.3                                                                                                                                                                                                          | Santé : formules, primes, commission 20-25 %, réduction Score        | **Marquer intégralement comme hypothèse.** Aucune valeur codée avant term sheet assureur                                                    |
| `docs/product/prd-mvp.md` §5.4                                                                                                                                                                                                          | Score 5 étoiles, promesse d'accès crédit                             | Ajouter section gouvernance de modèle (explication, contestation, versionnement, biais). Découpler gamification et score transmis aux tiers |
| `docs/product/prd-mvp.md` §14.1                                                                                                                                                                                                         | Timeline mai → juillet 2026                                          | **Supprimer.** Remplacer par phases conditionnées aux gates                                                                                 |
| `docs/product/prd-mvp.md` §9/§10                                                                                                                                                                                                        | Tarification éclatée, non consolidée                                 | Ajouter §8.8 : table canonique brut → net par canal (livrable Gate 2)                                                                       |
| `epics.md`                                                                                                                                                                                                                              | 12 épics × 73 stories sur 6 sprints                                  | Réécriture Epic List + Récapitulatif + Timeline + Dépendances                                                                               |
| `sprint-status.yaml`                                                                                                                                                                                                                    | 6 sprints datés mai-juillet, `last_updated: 2026-06-26`              | Réécriture du bloc `development_status` + `sprint_*` + `operational_risks`                                                                  |
| `docs/architecture/hld.md`                                                                                                                                                                                                              | 3 opérateurs MM, wallet KOTIZ propriétaire                           | Ajouter ADR-012 (modèle réglementaire) + ADR-013 (state machine transaction) ; ramener à 1 opérateur                                        |
| `docs/architecture/erd.md`                                                                                                                                                                                                              | Ledger sans états canoniques ni contre-écriture                      | Ajouter états transaction + table de litiges + contraintes d'immutabilité                                                                   |
| `docs/architecture/plan-securite.md`                                                                                                                                                                                                    | AES-GCM sans gestion de clés                                         | Compléter : rotation, sauvegardes, recherche sur données chiffrées, suppression sélective vs ledger immuable                                |
| `docs/design/ux-design-specification.md`                                                                                                                                                                                                | KYC optionnel dans les scénarios                                     | Aligner sur le KYC obligatoire du partenaire agréé                                                                                          |
| `KOTIZ/_archive/2026-bmad/_bmad-output/C-UX-Scenarios/`                                                                                                                                                                                 | Parcours nominaux uniquement                                         | Ajouter parcours `pending`, `échec`, `reversal`, `contestation`, `support`                                                                  |
| `INDEX.md` racine                                                                                                                                                                                                                       | Ne reflète plus les livrables                                        | Regénérer (Gate 0)                                                                                                                          |
| Rapports IR 04-23, 04-25, 06-03                                                                                                                                                                                                         | Présents sans marque d'obsolescence                                  | Déplacer vers `KOTIZ/_archive/2026-04-anciens-livrables/` (Gate 0)                                                                          |
| `KOTIZ/_archive/2026-10-docs-avant-migration/04_Produit/KOTIZ_PRD_MVP.docx`, `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_HLD.docx`, `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_ERD.docx` | Versions DOCX historiques hors archive                               | Déplacer vers `KOTIZ/_archive/2026-04-anciens-livrables/` (Gate 0)                                                                          |

### 2.3 Impact technique

| Domaine                 | Impact                                                                                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code existant           | **Aucun rollback nécessaire.** Le monorepo (`1-1`) est agnostique du modèle réglementaire et reste valide                                                             |
| `packages/shared-utils` | Dette déjà tracée dans `deferred-work.md` (`phone.ts`, `fcfa.ts`, `rbac.ts`). `rbac.ts` remonte en priorité (Epic 10.2, risque fail-open)                             |
| Nommage DDD             | Le resync du 26 juin impose `core → iam` + ajout `growth`/`ussd`. **`growth` et `ussd` sortent du périmètre** → migrations `1-4` réduites à 9 contextes au lieu de 11 |
| Infrastructure          | `1-3b` (staging/prod Orange Business) reste bloqué — et devient **doublement bloqué** : la résidence des données dépend du partenaire agréé retenu en Gate 1          |
| Intégrations MM         | 3 opérateurs → **1 seul, en sandbox d'abord**. Économie majeure de surface d'échec                                                                                    |
| Observabilité           | Contrainte ajoutée : aucune fuite de CNI, téléphone, santé, audio ou secret dans les logs (`1-5`)                                                                     |
| Tests                   | ATDD obligatoire sur les invariants du ledger et la séparation des rôles (Gate 4 de l'audit)                                                                          |
| Distribution mobile     | Play Store / App Store → **EAS interne / TestFlight** pour le pilote fermé                                                                                            |

---

## 3. Approche recommandée

### 3.1 Options évaluées

| Option                                                                    | Viabilité     | Effort    | Risque         | Verdict                                                                                                                                                   |
| ------------------------------------------------------------------------- | ------------- | --------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Direct Adjustment** — ajuster les stories dans la structure actuelle | ❌ Non viable | Faible    | **Très élevé** | L'audit ne remonte pas des défauts de stories mais l'absence de fondations juridiques et financières. Ajuster des stories ne crée pas un partenaire agréé |
| **2. Rollback** — annuler le travail réalisé                              | ❌ Sans objet | Nul       | Nul            | Une seule story livrée, et elle reste valide quel que soit le modèle retenu. Rien à annuler                                                               |
| **3. PRD MVP Review** — réduire et redéfinir le périmètre                 | ✅ **Viable** | **Élevé** | Moyen          | Seule option qui traite la cause. Recommandée par l'audit (Gate 3)                                                                                        |

### 3.2 Approche retenue — **Option 3 (MVP Review), variante hybride à deux pistes**

**Justification :**

Le risque dominant identifié par l'audit est de _« coder une plateforme très large avant d'avoir fixé le montage légal, la circulation exacte de l'argent, les responsabilités partenaires et la rentabilité par transaction »_. L'ordre correct est :

```
légalité → flux d'argent → unit economics → parcours d'échec → vertical slice → pilote limité → extension
```

Un gel total du développement respecterait cet ordre mais immobiliserait l'équipe plusieurs mois. Or **le vertical slice en argent simulé est valide quel que soit le modèle juridique retenu en Gate 1** : un ledger double-entrée, une state machine de transaction, une réconciliation et un parcours de litige sont nécessaires que KOTIZ soit EME, agent d'un agréé, ou simple orchestrateur. Seuls changent les _acteurs_ du RACI, pas les _mécanismes_.

D'où les deux pistes parallèles :

**Piste A — Gates (non-dev, bloquante pour l'argent réel)**
Portée par Henoch + conseils externes. Gate 0 → Gate 1 → Gate 2. Aucun euro ni franc réel ne circule tant que Gate 1 n'est pas franchie.

**Piste B — Vertical slice sandbox (dev, démarre immédiatement)**
Argent simulé exclusivement. Livre le flux `onboarding conforme → cash-in/dépôt → ledger → confirmation → solde → réconciliation → retrait/litige` avec tous ses parcours d'échec.

**Point de jonction :** la Piste B ne peut pas passer en argent réel sans que la Piste A ait livré Gate 1 + Gate 2. C'est une **porte dure**, pas une recommandation.

### 3.3 Périmètre du MVP réduit (Gate 3 de l'audit)

| Dimension               | Avant                               | Après                                                                    |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| Partenaire agréé        | Implicite / non défini              | **1, contractualisé**                                                    |
| Opérateurs Mobile Money | 3 (Orange, Wave, MTN)               | **1** (sandbox d'abord)                                                  |
| Zone géographique       | 4 communes d'Abidjan                | **1 quartier**                                                           |
| Agents                  | 50                                  | **2**                                                                    |
| Clientes                | 1 000                               | **20**                                                                   |
| Canaux                  | App + USSD + WhatsApp + agent + web | **App légère + agent** (+ SMS transactionnel)                            |
| Briques fonctionnelles  | Épargne + Agents + Santé + Score    | **Épargne/cash uniquement**                                              |
| Argent                  | Réel dès le go-live                 | **Sandbox → argent réel après Gate 1 + pentest**                         |
| Assurance Santé         | Bundle J+1 en production            | **Test de proposition non activé** (aucun engagement contractuel client) |
| Avantage crédit         | Promis via le Score                 | **Retiré du discours produit**                                           |

### 3.4 Estimation d'effort et impact calendrier

| Phase                      | Contenu                                                              | Durée estimée                                                                                | Dépendance                                                                                     |
| -------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Piste A — Gates**        | Gate 0 → 1 → 2                                                       | **4 à 8 semaines**, dont Gate 1 largement hors de notre contrôle (avocat, partenaire, ARTCI) | Démarre immédiatement                                                                          |
| **S1 → S2**                | Epic 1 fin + Epic 2 réduit + Epic 3                                  | 4 semaines · 7 sept → 4 oct 2026                                                             | Aucune                                                                                         |
| **S3 → S5**                | Epic 4 refondu (ledger, states, idempotence, réconciliation, litige) | 6 semaines · 5 oct → 15 nov                                                                  | S2                                                                                             |
| **S6 → S7**                | Epic 5 réduit + Epic 6 (agents, float, cash-in/out)                  | 4 semaines · 16 nov → 13 déc                                                                 | S5                                                                                             |
| **S8**                     | Epic 10 réduit (admin, RBAC/SoD, audit trail)                        | 2 semaines · 14 → 27 déc                                                                     | S7                                                                                             |
| **S9**                     | Epic 12.7 — bascule sandbox complète, argent simulé bout en bout     | 2 semaines · 4 → 17 janv. 2027                                                               | S8                                                                                             |
| **Phase P — Pilote fermé** | 12.1 → 12.8 · 20 clientes, 2 agents, argent réel                     | **AUCUNE DATE**                                                                              | ⛔ Gate 1 + Gate 2 franchies **ET** pentest (`12.2`) passé **ET** DPIA/ARTCI (`12.3`) obtenues |

> **Règle de calendrier :** la Phase P n'a volontairement pas de date. Lui en donner une reproduirait exactement l'erreur du plan mai-juillet 2026. Elle démarre quand les portes sont franchies, pas à une date décidée à l'avance.

### 3.5 Évaluation du risque

| Risque                                                                                | Gravité     | Mitigation                                                                                                                                     |
| ------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Gate 1 traîne 6 mois ou plus (avocat, partenaire, ARTCI)                              | 🔴 Critique | Démarrer les 3 pistes juridiques en parallèle dès cette semaine. Piste B avance pendant ce temps                                               |
| Aucun partenaire agréé n'accepte le modèle KOTIZ                                      | 🔴 Critique | Approcher ≥ 3 candidats en parallèle. Si aucun n'accepte → pivot vers le modèle « orchestrateur sans détention de fonds » (option 3 de Gate 1) |
| Gate 2 révèle une marge nette négative                                                | 🔴 Critique | Faire Gate 2 **avant** d'écrire la première ligne du ledger. Si négative → repricing ou pivot du modèle, pas du code                           |
| Rework de la Piste B après Gate 1                                                     | 🟡 Moyen    | Limiter la Piste B aux mécanismes agnostiques. Ne coder **aucun plafond, tarif ou tier en dur** — tout en configuration                        |
| Démobilisation de l'équipe / perte du dev #2                                          | 🟡 Moyen    | La Piste B garantit du travail concret et non jetable dès le 7 septembre                                                                       |
| Le report de la Santé casse l'unit economics (LTV/CAC ≥ 1 reposait sur le bundle J+1) | 🟠 Élevé    | Assumé : cette hypothèse n'était **pas prouvée** (zone d'ombre n°13 de l'audit). Gate 2 doit la tester, pas la présupposer                     |
| Perte de crédibilité auprès d'OMIS Finances / investisseurs sur le décalage           | 🟡 Moyen    | Communiquer le re-scope comme une décision de rigueur, pas un échec. Un pilote fermé propre vaut mieux qu'un go-live non conforme              |

---

## 4. Propositions de changement détaillées

### 4.1 Nouvel Epic 0 — Gouvernance & Portes réglementaires

**Goal :** Lever les blocages juridiques, réglementaires et économiques qui interdisent tout pilote avec argent réel. Aucune story de cet epic n'est du code.

**Owner :** Henoch (CEO/PO) + conseils externes. **Target :** immédiat, en parallèle de la Piste B.

| Story | Intitulé                                      | Livrable                                                                                                                                                                                                            | Bloquant pour             |
| ----- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 0.1   | Gate 0 — Gouvernance documentaire             | Docs canoniques nommés, versions périmées dans `KOTIZ/_archive/2026-04-anciens-livrables/`, `INDEX.md` regénéré, registre de décisions (owner/date/impact)                                                          | Tout le reste (2-3 jours) |
| 0.2   | Gate 1a — Avis juridique écrit                | Consultation avocat fintech + assurance + données personnelles, CI/UMOA                                                                                                                                             | 0.3                       |
| 0.3   | Gate 1b — Choix du modèle réglementaire       | **ADR-012** tranchant entre : (a) KOTIZ établissement agréé, (b) agent/distributeur technique d'un EME ou établissement de paiement agréé, (c) orchestrateur sans wallet propre ni détention de fonds               | Tout l'argent réel        |
| 0.4   | Gate 1c — Partenaire agréé + RACI contractuel | LOI signée + RACI : détention des fonds, cantonnement, ledger légal, KYC, AML/STR, réconciliation, remboursements, responsabilité client                                                                            | Epic 4, Epic 10           |
| 0.5   | Gate 1d — Conformité données personnelles     | Registre des traitements, bases légales, demandes ARTCI (biométrie, santé, voix, téléphone), contrats sous-traitants, cartographie transferts (Meta/Google/Firebase/Expo/EAS/GitHub/cloud), politiques de rétention | Epic 3, Epic 12           |
| 0.6   | Gate 2a — Modèle unit economics canonique     | Table par canal : montant brut → frais opérateur → commission KOTIZ → commission agent → prime → taxes → **net crédité** → **marge nette**. Sensibilité sur montant moyen, fréquence, churn, coûts                  | Epic 4, Epic 6            |
| 0.7   | Gate 2b — Proposition tarifaire unique        | Une seule phrase de prix compréhensible par Fatou. Répond à : « pourquoi payer 1,5 % alors que certains dépôts MM paraissent gratuits ? »                                                                           | Epic 5, discours agent    |

---

### 4.2 Modifications d'épics existants

#### Epic 1 — Socle technique · 🟡 Ajusté

```
Story 1.3b — Environnements staging / prod
  ANCIEN : backlog, cible Sprint 2, bloqué par contrat Orange Business
  NOUVEAU : deferred-v1
  Condition de réactivation : Gate 1b (ADR-012) + Gate 1c
  Raison : la résidence et l'hébergement des données dépendent du partenaire
           agréé retenu. Provisionner avant ce choix = risque de rework total.

Story 1.4 — Base de données et migrations initiales
  ANCIEN : 11 bounded contexts (core→iam, +growth, +ussd)
  NOUVEAU : 9 bounded contexts — growth et ussd sortent du périmètre MVP réduit
  Raison : Epic 9 (canaux) et Epic 11 (viralité) sont différés en V1.

Story 1.7 — Kill switch financier granulaire  [🆕 NOUVELLE]
  As a Ibrahima (admin Ops),
  I want pouvoir couper instantanément un canal, un agent, un opérateur,
       un type d'opération ou un client donné,
  So that un incident financier soit contenu sans arrêter toute la plateforme.
  Raison : zone d'ombre technique n°18 de l'audit. Prérequis de tout pilote
           avec argent réel.
```

#### Epic 2 — Design System · 🟠 Réduit

```
ACTIVES   : 2.1 (tokens), 2.2 (Inter), 2.3 (composants base — réduits au slice),
            2.4 (données & feedback — ÉLARGIE : états pending / échec / reversal /
                 contestation, cf. Gate 4 de l'audit)
DEFERRED-V1 : 2.5 (BundleProposal — dépend d'Epic 7),
              2.6 (illustrations afro-modernes),
              2.7 (sons signature)
Conditions de réactivation : 2.5 → term sheet assureur signé ;
                             2.6/2.7 → sortie du pilote fermé.
```

#### Epic 3 — Auth & KYC · 🟡 Ajusté

```
Story 3.3 — Biométrie optionnelle
  → deferred-v1. Condition : autorisation ARTCI biométrie obtenue (0.5).

Story 3.4 — Enrôlement cliente par Moussa (KYC Tier 1 auto)
  ANCIEN : Tier 1 auto-validé par l'agent, plafond wallet 2 M FCFA
  NOUVEAU : tiers, plafonds et pièces exigées définis par le partenaire agréé
            et configurables. AUCUNE valeur codée en dur depuis le PRD.
  Raison : faille n°6 de l'audit. Le PRD rend le KYC obligatoire, les scénarios
           WDS le rendent optionnel, et le plafond de 2 M est une hypothèse
           documentaire non validée par un établissement agréé.

Story 3.2 — PIN 4 chiffres
  ÉLARGIE : spécifier stockage, nombre de tentatives, blocage, déblocage,
            et récupération (zone d'ombre technique n°10).

Story 3.7 — Récupération de compte + anti-SIM-swap  [🆕 NOUVELLE]
  As a Fatou,
  I want pouvoir récupérer mon compte après perte de téléphone ou de numéro,
  So that mon épargne ne soit ni perdue ni volée par ingénierie sociale.
  Inclut : device binding, détection SIM-swap, limites de vélocité.
  Raison : zones d'ombre techniques n°8 et n°9.
```

#### Epic 4 — ~~Wallet & Mobile Money~~ → **Wallet, Ledger & Réconciliation** · 🔴 Refondu

> **C'est le cœur du vertical slice.** L'audit y concentre 8 de ses 20 zones d'ombre techniques.

```
Story 4.1 — Wallet + ledger double-entrée
  ÉLARGIE : + ATDD sur les invariants du ledger (Gate 4 de l'audit)
            + immutabilité stricte : jamais de modification, uniquement
              contre-écriture contrôlée (zone d'ombre n°19)
            + désignation explicite de la source de vérité entre ledger KOTIZ
              et ledger du partenaire agréé (zone d'ombre n°3)

Story 4.2 — Intégration opérateur Mobile Money
  ANCIEN : Orange Money (dépôt + retrait)
  NOUVEAU : UN opérateur, sandbox d'abord, choisi après Gate 1c
  Raison : Gate 3 — « un opérateur ». Le choix dépend du partenaire agréé.

Stories 4.3 (Wave) et 4.4 (MTN)
  → deferred-v1. Condition : 2 cycles de réconciliation propres sur l'opérateur 1.

Story 4.6 — Mode offline-soft (queue de dépôts)
  → deferred-v1. Raison : risque de double-dépense et de dépôt fantôme sur un
    flux monétaire non encore éprouvé. À reprendre après stabilisation du ledger.

Story 4.7 — Réconciliation
  ANCIEN : réconciliation quotidienne MM ↔ wallet
  NOUVEAU : réconciliation INTRAJOURNALIÈRE + traitement documenté des écarts
            + gestion des jours non ouvrés et cut-off de reversement cash
  Raison : zones d'ombre n°4 et n°5.

Story 4.8 — State machine canonique de transaction  [🆕 NOUVELLE]
  États : initiated → authorized → pending → settled | failed | reversed | disputed
  Inclut le catalogue des erreurs et des compensations (Gate 4).
  Raison : zone d'ombre technique n°1.

Story 4.9 — Idempotence et robustesse des callbacks  [🆕 NOUVELLE]
  Couvre : double callback, callback tardif, callback falsifié,
           débit opérateur sans crédit wallet.
  Raison : zone d'ombre technique n°2. NFR déjà présent dans la DoD
           (idempotency_paiements) mais aucune story ne le portait.

Story 4.10 — Parcours litige / contestation / reversal  [🆕 NOUVELLE]
  As a Fatou, I want contester une transaction et obtenir une résolution tracée.
  Inclut : UX de contestation, workflow support, contre-écriture, délais,
           qui rembourse en cas de fraude agent ou d'écart (zone d'ombre business n°4).
  Raison : Gate 4 de l'audit + faille n°7 (parcours d'échec insuffisamment spécifiés).
```

#### Epic 5 — Épargne & Objectifs · 🔴 Fortement réduit

```
ACTIVES :
  5.1 — Dépôt (RÉDUITE : app + agent uniquement, plus de multi-canal USSD/WhatsApp)
  5.4 — Solde et historique (RÉDUITE : plus de streak, plus de progression d'objectif)

DEFERRED-V1 :
  5.2 (objectifs nommés), 5.3 (verrouillage), 5.5 (badges/bonus Score),
  5.6 (détail objectif)

Note sur 5.3 : le verrouillage soulève une zone d'ombre juridique non résolue
(zone d'ombre business n°7) — la cliente peut-elle retirer immédiatement un
objectif « verrouillé », et avec quelles conséquences contractuelles ? À trancher
en Gate 1 avant toute implémentation.
```

#### Epic 6 — Agents & Onboarding · 🟡 Ajusté

```
Story 6.3 — Bundle Santé J+1 → deferred-v1 (dépend d'Epic 7).

Story 6.4 — Cash-in
  ÉLARGIE : + preuve que le cash a effectivement été remis (zone d'ombre n°7)
            + moment exact où la remise devient irrévocable

Story 6.5 — Cash-out
  ÉLARGIE : + liquidité minimale de l'agent (zone d'ombre n°6)

Story 6.8 — Comptabilité du float agent  [🆕 NOUVELLE]
  Qui possède le cash, comment le float est acheté, comment il est comptabilisé,
  caution de 50 000 FCFA, niveaux Bronze/Silver/Gold — actuellement présents dans
  l'identité et les scénarios mais absents du PRD de façon cohérente.
  Raison : faille n°3 de l'audit.

Story 6.9 — Manuel opérationnel agent + procédure incident  [🆕 NOUVELLE]
  Contrat agent, faux billets, vol, agression, agent décédé ou disparu,
  garantie et remboursement de la cliente.
  Raison : faille n°3. NON-DEV — livrable opérationnel.

Note KPI : 50 agents pour 1 000 clientes = 20 clientes/agent, pas les 80 du persona
Moussa (zone d'ombre n°17). Le pilote à 2 agents / 20 clientes doit précisément
servir à mesurer le revenu réel d'un agent (zone d'ombre n°16).
```

#### Epic 7 — Santé bundlée · ⛔ DIFFÉRÉ EN BLOC (6 stories)

```
Condition de réactivation (les 4 doivent être remplies) :
  1. Term sheet signé avec un assureur ou courtier agréé CIMA
  2. Produit homologué, wording contractuel validé
  3. Modèle d'intermédiation défini — KOTIZ ne peut pas se présenter comme
     courtier sans qualité ; le nom et la qualité de l'intermédiaire/assureur
     doivent être visibles dans les documents commerciaux
  4. Règles de prime, rétractation, suspension, sinistres, réseau de soins
     et responsabilité KOTIZ documentées

Pendant le pilote : la Santé reste un TEST DE PROPOSITION non activé — on peut
mesurer l'intérêt (« seriez-vous intéressée par… ») sans aucun engagement
contractuel envers la cliente ni encaissement de prime.

Impact assumé : le bundle Santé J+1 portait la promesse LTV/CAC ≥ 1 dès M1.
Cette promesse n'était pas prouvée (zone d'ombre n°13). Gate 2 doit la tester.
```

#### Epic 8 — Score 5 étoiles · ⛔ DIFFÉRÉ EN BLOC (5 stories)

```
Condition de réactivation :
  1. Gouvernance du modèle définie : versionnement, backtesting,
     surveillance des biais
  2. Droit d'explication et procédure de contestation pour la cliente
  3. Séparation explicite entre la gamification interne et un éventuel score
     transmis à des partenaires (portée décisionnelle = données sensibles)
  4. Correction du biais identifié : le Score récompense l'usage multi-canal et
     la stabilité du montant → pénalise les feature phones et les revenus
     irréguliers, c'est-à-dire précisément les plus vulnérables (faille n°7)

Action immédiate : RETIRER du discours produit et du PRD toute promesse
d'accès prioritaire au crédit adossée au Score.
```

#### Epic 9 — Canaux conversationnels · ⛔ Différé sauf SMS

```
ACTIVE :
  9.5 — SMS transactionnels (OTP + confirmations + alertes)
        REMONTÉE EN PRIORITÉ : indispensable au vertical slice (OTP d'inscription,
        confirmation de dépôt). Rattachée aux Epics 3 et 4.

DEFERRED-V1 : 9.1 (WhatsApp Business API), 9.2 (bot 7 intents),
              9.3 (mode vocal), 9.4 (gateway USSD), 9.6 (templates Meta)

Raison : Gate 3 — « sans USSD vocal ». S'ajoutent la dépendance ARTCI (voix),
la cartographie des transferts Meta (Gate 1d), et le code USSD régulateur
(2 à 4 semaines de délai, risque R3 déjà différé).
```

#### Epic 10 — Admin & Conformité · 🟠 Réduit

```
ACTIVES :
  10.1 — Console admin + MFA
  10.2 — RBAC + SoD  ⚠️ PRIORITÉ RELEVÉE : rbac.ts présente un risque de
         fail-open sur données externes (JWT/API), déjà tracé dans deferred-work.md
  10.3 — Queue KYC Tier 2
  10.7 — Audit trail complet ⚠️ PRIORITÉ RELEVÉE : seul contrepoids au cumul des
         rôles PO/Risk/Finance sur Henoch (risque R4, accepté, ADR-007)

DEFERRED-V1 (dépendent du RACI Gate 1c) :
  10.4 — Alertes AML automatiques
  10.5 — Rédaction et envoi STR CENTIF-CI
  10.6 — Export rapports BCEAO / CENTIF

Raison : si le partenaire agréé porte l'obligation de déclaration, KOTIZ ne
construit pas ces chaînes. Les coder avant le RACI, c'est risquer de construire
la conformité de quelqu'un d'autre.
```

#### Epic 11 — Viralité & Anti-churn · ⛔ DIFFÉRÉ EN BLOC (6 stories)

```
Condition de réactivation : Gate 2 validée.
Question ouverte n°15 de l'audit : qui finance les bonus de 200 FCFA, et à quel
niveau de fraude le programme reste-t-il rentable ? Lancer des mécanismes de
viralité avant de connaître la marge nette par transaction, c'est acheter de la
croissance à perte inconnue.
```

#### Epic 12 — ~~Tests terrain & Launch~~ → **Pilote fermé** · 🔴 Refondu

```
Story 12.7 — Phase sandbox argent simulé  [🆕 NOUVELLE, PRÉALABLE OBLIGATOIRE]
  Bout en bout du vertical slice en argent simulé. Aucune cliente réelle,
  aucun franc réel. Critère de sortie : 2 cycles de réconciliation sans
  écart inexpliqué.

Story 12.8 — Critères go/no-go + plan de réponse incident  [🆕 NOUVELLE]
  Go/no-go : zéro écart non expliqué, temps de résolution, taux d'activation,
  fréquence de dépôt, confiance déclarée, coût opérationnel par cliente.
  Plan incident : astreinte, communication client, preuve de restauration
  (zone d'ombre n°20).

Story 12.1 — Tests terrain
  ANCIEN : 10 clientes non formées par persona
  NOUVEAU : 20 clientes + 2 agents + 1 quartier, plafonds faibles

Story 12.2 — Audit sécurité externe + pentest
  CONSERVÉE, DEVIENT BLOQUANTE : aucun argent réel avant pentest passé.

Story 12.3 — DPIA
  ÉLARGIE ET AVANCÉE : la DPIA seule ne suffit pas. Devient le pendant technique
  de la story 0.5 (registre des traitements + autorisations ARTCI).

Story 12.4 — Validation BCEAO
  RÉÉCRITE : la nature de la démarche dépend entièrement du modèle retenu en
  ADR-012. Si KOTIZ est agent d'un établissement agréé, c'est le partenaire qui
  porte la relation avec le régulateur.

Story 12.5 — Go-live
  ANCIEN : pilote limité 1 000 clientes
  NOUVEAU : pilote fermé 20 clientes. Extension uniquement après DEUX cycles
            de réconciliation propres.

Story 12.6 — Publication Play Store / App Store
  → deferred-v1. Distribution EAS interne / TestFlight pour le pilote fermé.
```

---

### 4.3 Modifications du PRD

| §                                | Modification                                                                                                                                                                           | Justification                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| §1 « Ce que livre le MVP »       | 4 briques → **1 brique (Épargne/cash)** + 3 briques V1 conditionnées                                                                                                                   | Gate 3                             |
| §1 KPIs cibles                   | Supprimer les cibles 1 000 clientes / 50 agents / 200 Santé / juillet 2026. Remplacer par les critères go/no-go du pilote fermé (story 12.8)                                           | Calendrier caduc, périmètre réduit |
| §1 Équipe / Budget               | Actualiser : le budget 27 M FCFA était bâti sur 6 sprints. Le nouveau plan couvre ~9 sprints + honoraires juridiques Gate 1 non budgétés                                               | Réalisme financier                 |
| §2 « Ce que nous ne sommes PAS » | **Ajouter** : « Le statut réglementaire de KOTIZ est en cours d'arbitrage (ADR-012, Gate 1). Aucune communication interne ou externe ne doit affirmer un statut avant cet arbitrage. » | Faille n°1                         |
| §2 Proposition de valeur         | Retirer la promesse d'accès au crédit adossée au Score                                                                                                                                 | Faille n°7                         |
| §5.1 Épargne                     | Marquer plafonds et tiers comme **hypothèses à valider par le partenaire agréé**                                                                                                       | Faille n°6                         |
| §5.3 Santé                       | Marquer **l'intégralité** de la section comme hypothèse non contractualisée                                                                                                            | Faille n°4                         |
| §5.4 Score                       | Ajouter une sous-section « Gouvernance du modèle » (explication, contestation, versionnement, backtesting, biais)                                                                      | Faille n°7                         |
| **§8.8 (nouveau)**               | Table canonique de tarification par canal : brut → frais opérateur → commission KOTIZ → commission agent → prime → taxes → net crédité → marge nette                                   | Faille n°2, livrable Gate 2a       |
| §13 Out of Scope                 | Ajouter la liste des 36 stories `deferred-v1` avec leur condition de réactivation                                                                                                      | Traçabilité                        |
| §14.1 Timeline                   | **Supprimer le tableau des 6 sprints mai-juillet 2026.** Remplacer par les phases conditionnées de §3.4                                                                                | Calendrier caduc                   |
| §14.2 Risques                    | Ajouter R8 (Gate 1 non franchie), R9 (aucun partenaire agréé n'accepte), R10 (marge nette négative). Réviser R2/R5/R6 dont les échéances sont dépassées                                | Réalisme                           |

### 4.4 Modifications d'architecture

| Document                                                | Modification                                                                                                                                                                                        |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADR-012 (nouveau)**                                   | Modèle réglementaire KOTIZ + partenaire agréé + RACI. **Bloquant.** Rédigé à l'issue de la story 0.3                                                                                                |
| **ADR-013 (nouveau)**                                   | State machine canonique de transaction + politique d'idempotence + gestion des callbacks (story 4.8/4.9)                                                                                            |
| **ADR-014 (nouveau)**                                   | Politique de correction comptable : ledger immuable, contre-écriture contrôlée exclusivement                                                                                                        |
| `docs/architecture/hld.md` → v2.2                       | 3 opérateurs MM → 1 ; ajouter kill switch ; retirer les composants Santé/Score/USSD/WhatsApp du diagramme MVP (les basculer en V1)                                                                  |
| `docs/architecture/erd.md` → v2.1                       | Ajouter les états canoniques de transaction, la table des litiges, les contraintes d'immutabilité du ledger, la comptabilité du float agent                                                         |
| `docs/architecture/plan-securite.md` → v2.2             | Compléter AES-GCM : gestion et rotation des clés, sauvegardes, recherche sur données chiffrées, suppression sélective des données personnelles face au ledger immuable (zones d'ombre n°11 et n°12) |
| `docs/architecture/plan-devops.md` → v2.1               | Retirer les échéances mai-juillet. Ajouter la contrainte de non-fuite de PII dans les logs. Marquer l'hébergement staging/prod comme dépendant de Gate 1                                            |
| `docs/architecture/ddd-context-map-glossaire.md` → v1.1 | 11 contextes → 9 dans le périmètre MVP réduit (`growth` et `ussd` en V1)                                                                                                                            |

### 4.5 Modifications UX

| Artefact                                                | Modification                                                                                                                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/design/ux-design-specification.md` → v1.2         | Aligner le KYC sur l'obligation du partenaire agréé (aujourd'hui optionnel dans les scénarios) — faille n°6                                                                           |
| `KOTIZ/_archive/2026-bmad/_bmad-output/C-UX-Scenarios/` | **Ajouter les parcours manquants** : transaction `pending`, échec, `reversal`, contestation, prise en charge support. Aujourd'hui seuls les parcours nominaux sont spécifiés (Gate 4) |
| Écrans Santé / Score / WhatsApp / USSD                  | Marquer `deferred-v1`. Les maquettes sont conservées, pas jetées                                                                                                                      |
| `KOTIZ/_archive/2026-bmad/_bmad-output/F-Mockups/`      | Ajouter les écrans d'états d'erreur du slice (dépôt en attente, dépôt échoué, contestation ouverte)                                                                                   |

---

## 5. Handoff d'implémentation

### 5.1 Classification de portée : **MAJOR**

Ce changement redéfinit le périmètre du MVP, ajoute un epic bloquant non technique, diffère 36 stories et invalide le calendrier. Il ne relève ni du Developer agent ni d'une simple réorganisation de backlog.

### 5.2 Routage

| Rôle                    | Titulaire                                            | Responsabilité                                                                         | Livrables               |
| ----------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| **CEO / Product Owner** | Henoch                                               | Piste A intégrale. Arbitrage ADR-012. Négociation partenaire agréé. Gate 2             | Stories 0.1 → 0.7       |
| **Conseils externes**   | Avocat fintech/assurance/données + expert conformité | Avis juridique écrit, montage réglementaire, dossier ARTCI                             | Support 0.2, 0.4, 0.5   |
| **CTO / Architecte**    | Desiré Kouadio                                       | ADR-012 (volet technique), ADR-013, ADR-014. Mise à jour HLD/ERD/Plan Sécurité/DevOps  | §4.4                    |
| **Product Owner**       | Henoch                                               | Réécriture PRD §1/§2/§5/§8.8/§13/§14 + `epics.md` + `sprint-status.yaml`               | §4.1 → §4.3             |
| **Developer agent**     | Dev #1 + dev #2                                      | Piste B — vertical slice sandbox. Reprise du cycle `[CS] → [DS] → [CR]` à partir du S1 | Epics 1 → 6, 10 réduits |
| **UX**                  | Prestataire                                          | Parcours d'échec et de litige, alignement KYC                                          | §4.5                    |

### 5.3 Critères de succès du changement

Le re-scope est réussi quand :

1. ✅ ADR-012 est écrit et signé — le statut réglementaire de KOTIZ n'est plus ambigu dans aucun document
2. ✅ Un RACI contractuel existe avec un partenaire agréé nommé
3. ✅ La table de tarification canonique brut → net existe, et la marge nette par transaction est un nombre connu
4. ✅ Aucun document ne porte de date de livraison MVP non conditionnée à une gate
5. ✅ `epics.md` et `sprint-status.yaml` reflètent 13 épics dont un bloquant, et 39 stories `deferred-v1` avec condition de réactivation explicite
6. ✅ Le vertical slice tourne en sandbox de bout en bout, avec 2 cycles de réconciliation sans écart inexpliqué
7. ✅ Aucun franc réel n'a circulé avant que 1, 2, 3 et le pentest ne soient acquis

### 5.4 Actions immédiates — semaine du 1er septembre 2026

| #   | Action                                                                  | Owner                           | Échéance  |
| --- | ----------------------------------------------------------------------- | ------------------------------- | --------- |
| 1   | Approuver ce Sprint Change Proposal                                     | Henoch                          | 1er sept. |
| 2   | Story 0.1 — Gate 0, ménage documentaire (2-3 j)                         | Henoch                          | 4 sept.   |
| 3   | Prendre rendez-vous avocat fintech/assurance/données (story 0.2)        | Henoch                          | 4 sept.   |
| 4   | Lister et approcher ≥ 3 candidats partenaires agréés (story 0.4)        | Henoch                          | 11 sept.  |
| 5   | Mettre à jour `epics.md` + `sprint-status.yaml` selon §4                | Henoch / `bmad-sprint-planning` | 5 sept.   |
| 6   | Code review de la story `1-1` (en attente depuis le 26 juin)            | Dev                             | 5 sept.   |
| 7   | Démarrer S1 — Piste B (Epic 1 fin : `1-2`, `1-3a`, `1-4` à 9 contextes) | Dev                             | 7 sept.   |

---

## 6. Checklist de navigation du changement

| §   | Item                                   | Statut                                                            |
| --- | -------------------------------------- | ----------------------------------------------------------------- |
| 1.1 | Story déclenchante identifiée          | ✅ Done — audit corpus, story témoin `1-1`                        |
| 1.2 | Problème défini et catégorisé          | ✅ Done — `strategic pivot` + `misunderstanding of requirements`  |
| 1.3 | Impact initial et preuves rassemblés   | ✅ Done — §1.4                                                    |
| 2.1 | Epic courant évaluable en l'état ?     | ✅ Done — Epic 1 poursuivable, `1-3b` différée                    |
| 2.2 | Changements epic-level déterminés      | ✅ Done — 1 créé, 4 différés en bloc, 5 réduits, 2 refondus       |
| 2.3 | Épics restants revus                   | ✅ Done — les 12                                                  |
| 2.4 | Épics invalidés / nouveaux nécessaires | ✅ Done — Epic 0 créé ; aucun epic supprimé                       |
| 2.5 | Ordre et priorités revus               | ✅ Done — §3.4                                                    |
| 3.1 | Conflits PRD                           | ⚠️ Action-needed — 12 sections à réécrire (§4.3)                  |
| 3.2 | Conflits architecture                  | ⚠️ Action-needed — 3 ADR à créer, 5 docs à mettre à jour (§4.4)   |
| 3.3 | Conflits UI/UX                         | ⚠️ Action-needed — parcours d'échec absents (§4.5)                |
| 3.4 | Autres artefacts                       | ⚠️ Action-needed — `INDEX.md`, archivage, `deferred-work.md`, DoD |
| 4.1 | Option 1 — Direct Adjustment           | ❌ Non viable                                                     |
| 4.2 | Option 2 — Rollback                    | ❌ Sans objet                                                     |
| 4.3 | Option 3 — MVP Review                  | ✅ Viable — **retenue**                                           |
| 4.4 | Chemin retenu et justifié              | ✅ Done — Option 3 hybride deux pistes (§3.2)                     |
| 5.1 | Résumé de l'issue                      | ✅ Done — §1                                                      |
| 5.2 | Impact epics et artefacts documenté    | ✅ Done — §2                                                      |
| 5.3 | Chemin recommandé argumenté            | ✅ Done — §3                                                      |
| 5.4 | Impact MVP et plan d'action            | ✅ Done — §3.3, §5.4                                              |
| 5.5 | Plan de handoff agent                  | ✅ Done — §5.2                                                    |
| 6.1 | Checklist complète                     | ✅ Done                                                           |
| 6.2 | Exactitude du SCP vérifiée             | ✅ Done                                                           |
| 6.3 | Approbation utilisateur                | ✅ Done — approuvé par Henoch, 1er sept. 2026                     |
| 6.4 | `sprint-status.yaml` mis à jour        | ✅ Done — 1er sept. 2026                                          |
| 6.5 | Prochaines étapes confirmées           | ✅ Done — §5.4                                                    |

---

## 7. Conclusion

L'audit ne dit pas que KOTIZ est un mauvais projet. Il dit que **le problème résolu est réel et la vision différenciante**, mais que le plan actuel revient à construire une plateforme large avant d'avoir fixé le montage légal, la circulation exacte de l'argent et la rentabilité par transaction.

Ce Sprint Change Proposal remet le projet dans le bon ordre :

```
légalité → flux d'argent → unit economics → parcours d'échec → vertical slice → pilote fermé → extension
```

Il ne diffère pas la vision : il diffère les briques qui reposent sur des contrats non signés, pour concentrer l'équipe sur le seul flux qui doit fonctionner parfaitement avant que quiconque confie 100 FCFA à KOTIZ.

---

_Document interne confidentiel — Ne pas diffuser sans autorisation écrite._
_Sprint Change Proposal v1.0 · 1er septembre 2026 · Généré via `bmad-correct-course` · © KOTIZ SAS, Abidjan._
