---
title: ADR-011 — Architecture hexagonale + DDD tactique par module
status: ACCEPTÉE — AMENDÉE le 2026-10-21 (§6)
date: 2026-06-26
decision_makers:
  - Henoch Lonzo Koffi (Fondateur / CEO / PO)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-001 (Spring Boot)
  - ADR-002 (Monolithe modulaire — backend)
  - ADR-008 (Monorepo Turborepo)
references:
  - Code/platform/docs/architecture/ddd-context-map-glossaire.md (context map + 11 bounded contexts + langage ubiquitaire)
  - Code/platform/docs/architecture/hld.md §2.3
  - _archive/2026-bmad/_bmad-output/implementation-artifacts/1-1-monorepo-kotiz-turborepo.md
classification: Confidentiel — Usage interne
---

# ADR-011 — Architecture hexagonale + DDD tactique par module

> **Amendée le 21 octobre 2026.** La structure de package des §3.1 à §3.3 et §4 est remplacée par
> le §6 (Spring Modulith, `api` / `internal`, hexagone pragmatique). Le reste de l'ADR, dont la
> règle « domaine sans framework » et l'effort calibré du §3.4, reste valable.

## 1. Contexte

L'ADR-002 a fixé un **monolithe modulaire Spring Boot** (9 modules). Le document DDD stratégique
du 26 juin 2026 (`docs/architecture/ddd-context-map-glossaire.md`) a affiné cela en **11 bounded contexts**
et fixé le langage ubiquitaire.

Il manquait la décision d'**architecture interne** : _comment_ structure-t-on le code à
l'intérieur de chaque module ? Le HLD décrivait un modèle classique « couches + entités JPA +
services », qui présente 3 risques pour KOTIZ :

1. **Logique métier diluée** dans les services et couplée à JPA/Spring → invariants fintech
   (ledger équilibré, idempotence, `Money` en centimes) difficiles à protéger et à tester isolément.
2. **ATDD partout** (décision projet) exige de pouvoir tester le domaine **sans base ni framework**
   (tests rapides, déterministes) et de **mocker proprement** les prestataires externes
   (Orange Money, Wave, MTN, CIMA). Un modèle anémique rend cela pénible.
3. **Cohérence à 4 devs** : sans patron de structure imposé, chaque module diverge.

## 2. Options envisagées

### Option A — Couches classiques (HLD initial)

`controller → service → repository (JPA)`, entités JPA = modèle métier.

- ✅ Familier, rapide à écrire
- ❌ Domaine anémique, couplé à JPA/Spring
- ❌ Tests domaine impossibles sans base
- ❌ ACL prestataires MM non naturel

### Option B — Onion / Clean Architecture stricte

Cercles concentriques, nombreuses couches.

- ✅ Isolation forte
- ❌ Cérémonie élevée pour un MVP 3 mois ; sur-ingénierie sur les contextes generic

### Option C — Hexagonal (Ports & Adapters) + DDD tactique par module — **RETENUE**

Chaque bounded context = un package hexagonal `domain / application / infrastructure`. Effort DDD
**calibré par sous-domaine** (core = complet, generic/canal = allégé).

- ✅ Domaine pur, testable sans base (ATDD)
- ✅ Ports/adapters = ACL naturel pour prestataires MM et CIMA
- ✅ Invariants protégés dans les agrégats
- ✅ Effort modulable (pas de sur-ingénierie sur `notifications`, `ussd`)
- ⚠️ Mapper domaine ↔ JPA à maintenir (coût accepté, cf. §5)

## 3. Décision

Adopter l'**architecture hexagonale (Ports & Adapters) avec DDD tactique**, appliquée
**par bounded context**, dans le monolithe modulaire.

### 3.1 Structure de package type (racine `com.kotiz.<context>`)

```
com.kotiz.savings
├── domain/                      ← PUR : zéro dépendance framework (ni Spring, ni JPA)
│   ├── model/                   SavingsAccount (agrégat), LedgerEntry, Money, SavingsGoal,
│   │                            GoalLock, Streak, StreakBadge  (VO = record immuable)
│   ├── event/                   DepositMade, GoalReached, StreakBadgeEarned, ...
│   └── service/                 services de domaine purs (calculs, invariants transverses)
│
├── application/                 ← ORCHESTRATION : dépend de domain uniquement
│   ├── port/
│   │   ├── in/                  cas d'usage (interfaces) : MakeDepositUseCase, CreateGoalUseCase
│   │   └── out/                 ports sortants : LedgerRepository, SavingsAccountRepository,
│   │                            PaymentPort (→ Payments), DomainEventPublisher
│   └── service/                 impl. des cas d'usage : DepositService implements MakeDepositUseCase
│
└── infrastructure/              ← DÉTAILS : dépend de application + domain
    ├── adapter/
    │   ├── in/
    │   │   ├── rest/            SavingsController (Spring MVC) → appelle les port/in
    │   │   └── event/          listeners d'événements entrants (autres contextes)
    │   └── out/
    │       ├── persistence/    SavingsAccountJpaAdapter implements SavingsAccountRepository
    │       │                   + SavingsAccountEntity (JPA) + SavingsAccountMapper
    │       └── payment/        PaymentAclAdapter implements PaymentPort  (ACL → contexte Payments)
    └── config/                 wiring Spring (beans, transaction boundaries)
```

### 3.2 Règle de dépendance (sens unique)

```
infrastructure ──▶ application ──▶ domain
        (domain ne dépend de RIEN — ni Spring, ni JPA, ni autre contexte)
```

- `domain` : POJO/records purs. **Interdiction** d'y importer `jakarta.persistence.*`,
  `org.springframework.*`, ou un type d'un autre contexte.
- Les **entités JPA vivent dans `infrastructure/adapter/out/persistence`**, jamais dans `domain`.
  Un `Mapper` convertit agrégat de domaine ↔ entité JPA.
- Un contexte ne connaît un autre contexte **que via un port sortant** (`port/out`) implémenté par
  un **ACL adapter**. Jamais d'appel direct d'un service d'un autre module.

### 3.3 Communication inter-contextes

- **Synchrone** (Customer/Supplier) : via `port/out` + ACL adapter (ex. `Savings` → `PaymentPort`
  → adapter appelle le use-case de `Payments`).
- **Asynchrone** (Published Language) : événements de domaine publiés via `DomainEventPublisher`
  (Spring `ApplicationEventPublisher` en MVP ; **pattern Outbox** en base pour les événements
  critiques argent/score, afin de garantir la livraison — à confirmer story par story).
- `iam` expose un **Open Host Service** (contrat d'identité/JWT stable) consommé par tous.

### 3.4 Effort calibré par sous-domaine

| Sous-domaine       | Contextes                                         | Application de l'hexagone                                                                |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 🔴 Core            | `savings`, `scoring`                              | **Complet** : agrégats riches, invariants dans le domaine, tous les ports, ATDD maximal  |
| 🟡 Supporting      | `agents`, `health`, `payments`, `growth`, `admin` | **Standard** : hexagone complet, domaine plus fin                                        |
| ⚪ Generic / Canal | `iam`, `notifications`, `wa`, `ussd`              | **Allégé** : domaine minimal, surtout des adapters ; `wa`/`ussd` = ACL fins vers le core |

### 3.5 Nommage des modules (aligné DDD)

- `core` → **renommé `iam`** (le core domain est `savings`+`scoring`, pas l'identité).
- **Ajout** de `growth` (viralité + anti-churn) et `ussd` (canal).
- Liste finale des 11 modules : `savings`, `scoring`, `agents`, `health`, `payments`, `growth`,
  `iam`, `notifications`, `admin`, `wa`, `ussd`.

## 4. Exemple de référence — cas d'usage « Dépôt » (`savings`)

```
1. SavingsController (infra/in/rest)         reçoit POST /savings/deposits
2. → MakeDepositUseCase (app/port/in)        interface
3. → DepositService (app/service)            orchestre :
      - charge SavingsAccount via SavingsAccountRepository (port/out)
      - appelle PaymentPort (port/out) pour encaisser (ACL → Payments)
      - account.deposit(Money)               ← INVARIANTS dans l'agrégat (domain) :
                                                min 100 FCFA, génère 2 LedgerEntry équilibrées
      - publie DepositMade (domain/event) via DomainEventPublisher (port/out)
4. Adapters (infra/out) : JpaAdapter persiste, AclAdapter parle à Payments,
   EventPublisher émet — Scoring/Notifications/Growth réagissent.
```

L'invariant « `Σ débits = Σ crédits` » et « `Money` en centimes XOF » vivent **dans le domaine**,
donc testables par un test unitaire pur (sans Spring ni base) — base de l'ATDD.

## 5. Conséquences

### Positives

- Domaine testable en isolation → tests ATDD rapides et déterministes.
- Invariants fintech (ledger, idempotence, Money) protégés dans les agrégats.
- ACL par prestataire MM/CIMA → intégrations externes remplaçables et mockables.
- Patron unique → cohérence à 4 devs, onboarding facilité.

### Négatives / coûts acceptés

- **Mapper domaine ↔ JPA** à écrire et maintenir (boilerplate). Accepté : le découplage vaut le coût
  sur les contextes core/supporting. Mapper allégé/omis possible sur les generic.
- Courbe d'apprentissage hexagonal/DDD pour l'équipe → mitigée par ce module `savings` de référence
  - revue de pair.

### Actions de suivi

1. **MAJ HLD v2** : remplacer « 9 modules » par les 11 bounded contexts + cette structure interne.
2. **MAJ `apps/backend/README.md`** : renommer `core`→`iam`, ajouter `growth`/`ussd`, décrire l'arbo hexagonale.
3. Story 1.1 (déjà scaffoldée) : le package Spring devra suivre cette structure ; à vérifier lors de la resync du suivi.
4. Chaque story métier (Epic 3+) réutilise ce squelette et référence le glossaire du contexte concerné.

---

_ADR produit en atelier guidé — 26 juin 2026. Découle de `docs/architecture/ddd-context-map-glossaire.md`._

---

## 6. Amendement du 21 octobre 2026 — Spring Modulith et hexagone pragmatique

Source : [Sprint Change Proposal du 11 septembre 2026](../product/sprint-change-proposal-2026-09-11.md),
approuvé par le PO le 21 octobre 2026.

### 6.1 Racine et modules

La racine Spring Boot est `ci.kotiz` (`ci.kotiz.KotizApplication`). Chaque contexte actif de
`CONTEXT-MAP.md` est un sous-package direct, donc un module détecté et vérifié par Spring Modulith.
Aucun package n'est créé pour un contexte différé ou retiré.

```text
ci.kotiz.savings
├── package-info.java                 # @ApplicationModule
├── api                               # contrat Java inter-modules (pas la couche HTTP)
│   ├── package-info.java             # @NamedInterface("api")
│   └── …                             # cas d'usage, résultats, événements publics
└── internal                          # implémentation privée
    ├── domain                        # invariants ; sans Spring ni JPA sur les contextes complexes
    ├── application                   # orchestration et frontières transactionnelles
    ├── persistence                   # entités et adapters JPA
    └── web                           # contrôleurs, requêtes et réponses REST
```

### 6.2 Règles

- Un module n'expose aux autres que son package `api` ; il ne référence jamais `autreModule.internal`.
- Les dépendances synchrones passent par la named interface `api` ; les réactions multiples passent
  de préférence par des événements publics.
- DDD stratégique partout ; DDD tactique complet seulement quand la complexité le justifie (§3.4).
- Aucun port, mapper ou service intermédiaire n'est créé sans frontière ou règle réelle. Un segment
  de `internal` n'existe que lorsqu'un comportement l'exige.

### 6.3 Vérification

- `ModularityTest` exécute `ApplicationModules.of(KotizApplication.class).verify()` (cycles, accès
  aux internals, dépendances non déclarées) et refuse tout contexte différé ou retiré.
- Des applications factices hors de `ci.kotiz` prouvent que la vérification accepte un accès par
  `api` et refuse un accès à `*.internal`.
- Chaque module a un test `@ApplicationModuleTest` qui le démarre seul.
- Spring Modulith est importé par son BOM, aligné sur la ligne Spring Boot (2.1.x pour Boot 4.1).

Module de référence : `iam`, sans règle métier jusqu'à l'ouverture de compte (D03).
