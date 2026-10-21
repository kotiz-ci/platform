---
title: Sprint Change Proposal — Architecture Spring Modulith et Feature-Sliced Design
version: 0.1
date: 2026-09-11
author: Henoch Lonzo Koffi avec Codex
workflow: bmad-correct-course
status: PROPOSE
approval: EN_ATTENTE
scope_classification: MODERATE
trigger: Validation technique explicite du 11 septembre 2026
classification: Usage interne
---

# Sprint Change Proposal — Architecture Spring Modulith et Feature-Sliced Design

> **Décision proposée : ajustement direct modéré.** Le périmètre métier du MVP réduit ne change
> pas. La correction officialise et rend vérifiables les frontières du backend et des frontends
> avant la première vertical slice métier.

## 1. Résumé du changement

### 1.1 Déclencheur

Pendant la préparation de l'usage du skill `/implement`, la structure de code attendue pour les
fonctionnalités backend et frontend a été clarifiée puis validée par Henoch :

- backend : Spring Boot 4, Java 21, Spring Modulith, bounded contexts DDD et architecture
  hexagonale pragmatique ;
- contrat inter-modules : package `api` explicite ;
- implémentation privée : package `internal` ;
- contrôleurs HTTP : `internal.web`, et non `api` ;
- mobile et admin web : Feature-Sliced Design (FSD), adapté aux routeurs Expo et Next.js.

### 1.2 Problème constaté

Les décisions actuelles sont cohérentes sur l'intention, mais les sources de vérité divergent :

1. l'ADR-011 impose `domain / application / infrastructure`, sans structure Spring Modulith
   vérifiable `api / internal` ;
2. le HLD mentionne encore Spring Boot 3.x et React Context comme seule organisation frontend ;
3. le backend exécutable utilise `ci.kotiz.backend`, ce qui ferait détecter les futurs modules sous
   `ci.kotiz.backend.<module>` au lieu de `ci.kotiz.<module>` ;
4. le `pom.xml` ne contient pas Spring Modulith ;
5. le frontend mobile utilise encore des dossiers techniques globaux (`components`, `lib`) et le
   frontend admin est un placeholder ;
6. aucune règle agent ne décrit FSD ni l'API publique des modules ;
7. aucun test automatique ne protège encore les frontières de modules backend ou frontend.

### 1.3 Catégorisation

| Dimension           | Évaluation                                                        |
| ------------------- | ----------------------------------------------------------------- |
| Type                | Limitation technique découverte avant implémentation métier       |
| Story déclenchante  | Aucune story métier ; clarification transversale post-S1          |
| Périmètre produit   | Inchangé                                                          |
| Périmètre technique | Backend, mobile, admin web, règles agents et tests d'architecture |
| Classification      | **MODERATE**                                                      |

### 1.4 Évidence

- `docs/adr/0011-hexagonal-ddd.md` décrit l'hexagone historique.
- `docs/architecture/hld.md` décrit encore Spring Boot 3.x.
- `./apps/backend/pom.xml` utilise déjà Spring Boot 4.1.1 et Java 21.
- `./apps/backend/src/main/java/ci/kotiz/backend/` contient uniquement le bootstrap.
- `./apps/mobile/` reste un scaffold Expo sans découpage FSD.
- `./apps/admin-web/` reste un placeholder.
- l'issue GitHub #30 est fermée ; les issues #32 à #36 terminent le socle S1 et ne doivent pas être
  élargies par ce changement.

## 2. Analyse d'impact

### 2.1 PRD et périmètre MVP

**Aucun changement requis dans les capacités produit.**

- Les parcours, règles métier, personas et NFR restent inchangés.
- Le re-scope approuvé du 1er septembre 2026 reste supérieur à l'ancien PRD lorsque les deux
  documents divergent.
- Les contextes différés ou retirés restent inactifs.
- Aucun argent réel, partenaire, plafond ou tarification n'est ajouté par cette correction.

### 2.2 Epics et stories

| Élément      | Impact                                                                                  |
| ------------ | --------------------------------------------------------------------------------------- |
| Epic 0       | Aucun                                                                                   |
| Epic 1       | Ajouter un ticket technique d'architecture après les issues S1 #32–#36                  |
| Epic 2       | Les composants futurs seront rangés selon FSD ; aucun AC visuel ne change               |
| Epics métier | Ajouter les conventions aux Dev Notes, sans modifier les comportements attendus         |
| Ordre global | Finir S1, appliquer la migration d'architecture, puis démarrer la vertical slice métier |

Le ticket technique doit être une condition préalable à la première story qui crée un bounded
context métier ou une feature frontend. Il ne doit pas bloquer la clôture indépendante des issues

# 32–#36 si celles-ci restent compatibles avec le bootstrap actuel.

### 2.3 Architecture backend

La racine Spring Boot devient `ci.kotiz`, afin que les bounded contexts soient des sous-packages
directs détectables par Spring Modulith :

```text
ci.kotiz
├── KotizApplication.java
├── iam
├── savings
├── agents
├── payments
├── notifications
└── admin
```

Structure interne canonique d'un bounded context :

```text
ci.kotiz.savings
├── package-info.java                 # @ApplicationModule
├── api
│   ├── package-info.java             # @NamedInterface("api")
│   ├── SavingsManagement.java
│   ├── MakeDeposit.java
│   ├── DepositResult.java
│   └── DepositMade.java
└── internal
    ├── domain
    ├── application
    ├── persistence
    └── web
```

Règles :

- `api` est le contrat Java inter-modules, pas la couche HTTP ;
- `internal.web` contient contrôleurs, requêtes et réponses REST ;
- `internal.domain` contient les invariants et reste sans Spring/JPA sur les contextes complexes ;
- `internal.application` porte l'orchestration et les frontières transactionnelles ;
- `internal.persistence` contient les entités et adapters JPA ;
- un module ne référence jamais `autreModule.internal` ;
- les dépendances synchrones passent par une named interface ;
- les réactions multiples passent de préférence par des événements publics ;
- DDD stratégique partout ; DDD tactique complet uniquement quand la complexité le justifie ;
- aucun port, mapper ou service intermédiaire ne doit être créé sans frontière ou règle réelle.

### 2.4 Architecture frontend

FSD devient la convention des deux frontends. Les couches suivent cette dépendance descendante :

```text
app/pages -> widgets -> features -> entities -> shared
```

Chaque slice expose un `index.ts`. Les imports profonds depuis une autre slice sont interdits. Deux
slices de la même couche ne s'importent pas directement.

#### Mobile Expo

```text
apps/mobile
├── app/                              # Expo Router, routes minces et providers globaux
└── src/
    ├── pages/
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
```

Les routes Expo réexportent ou composent une page FSD. Les variantes `(client)` et `(agent)` sont
conservées. Une fonctionnalité suit les segments utiles parmi `ui`, `api`, `model`, `lib` et
`config`. Aucun dossier vide n'est créé par principe.

#### Admin Next.js

```text
apps/admin-web
├── app/                              # Next.js App Router
└── src/
    ├── _app/                         # couche App FSD, nom adapté à Next.js
    ├── _pages/                       # couche Pages FSD, nom adapté à Next.js
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
```

Les fichiers `app/**/page.tsx` restent minces et réexportent les pages de `src/_pages`. Les APIs
serveur Next.js ne remplacent pas le backend Spring métier.

### 2.5 Tests et qualité

Backend :

- test pur du domaine pour les invariants ;
- test du cas d'usage via ports réels ou doublures aux frontières convenues ;
- `@WebMvcTest` pour HTTP ;
- Testcontainers/PostgreSQL pour la persistance ;
- `@ApplicationModuleTest` pour un bounded context ;
- `ApplicationModules.of(KotizApplication.class).verify()` pour cycles, internals et dépendances ;
- suite complète Maven en fin de ticket.

Frontend :

- tests de feature par comportement public ;
- tests de composant avec React Native Testing Library ou Testing Library ;
- type-check des variantes client et agent ;
- lint des règles FSD et des APIs publiques ;
- Maestro uniquement pour les parcours E2E qui existent réellement ;
- suite complète Turborepo en fin de ticket.

### 2.6 UX

Les maquettes, interactions, états, accessibilité, tokens et parcours ne changent pas. La spec UX
doit seulement recevoir une référence vers l'ADR frontend ; aucune réécriture de maquette n'est
nécessaire.

### 2.7 Autres artefacts

| Artefact          | Action                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| ADR-011           | Amender vers Spring Modulith + `api/internal` + hexagone pragmatique                           |
| Nouvelle ADR      | Créer **ADR-015** pour FSD ; ADR-012 à ADR-014 restent réservées par le re-scope réglementaire |
| HLD v2            | Aligner Boot 4/Java 21, backend Modulith et front FSD                                          |
| DDD Context Map   | Ajouter API publique, événements et dépendances permises par contexte actif                    |
| `CONTEXT-MAP.md`  | Conserver les statuts actif/différé/retiré ; ajouter la convention d'implémentation            |
| READMEs           | Mettre à jour backend, mobile, admin et racine                                                 |
| `CONTRIBUTING.md` | Ajouter conventions packages, FSD et tests d'architecture                                      |
| `AGENTS.md`       | Ajouter règles obligatoires pour `/implement` et les futurs agents                             |
| Workflows story   | Remplacer les références Boot 3/Java 17 et ancienne arborescence                               |
| Code backend      | Déplacer le bootstrap vers `ci.kotiz`, ajouter dépendances et tests Modulith                   |
| Code mobile       | Préparer les couches FSD et migrer seulement les fichiers existants utiles                     |
| Code admin        | Initialiser FSD au moment où Next.js est réellement initialisé                                 |
| CI                | Exécuter tests de modularité, type-check et lint architectural                                 |

## 3. Options évaluées

### Option 1 — Ajustement direct

- Viabilité : **oui**.
- Effort : moyen.
- Risque : faible à moyen.
- Avantage : aucune fonctionnalité métier ni code métier existant à réécrire.

### Option 2 — Rollback

- Viabilité : non nécessaire.
- Le bootstrap, les variantes Expo et les packages partagés restent réutilisables.
- Aucun rollback de story livrée n'apporte de simplification.

### Option 3 — Nouvelle revue du MVP

- Viabilité : non nécessaire pour ce déclencheur.
- Le re-scope majeur du 1er septembre reste applicable.
- La décision actuelle est technique et ne change ni cible, ni valeur, ni fonctionnalité.

### Approche recommandée

**Option 1 — Ajustement direct**, avec un ticket technique dédié entre la fin du socle S1 et la
première vertical slice métier.

## 4. Propositions de changement détaillées

### 4.1 ADR-011 — Backend

**Ancien :**

```text
Chaque bounded context = domain / application / infrastructure.
Racine d'exemple : com.kotiz.<context>.
```

**Nouveau :**

```text
Racine : ci.kotiz.<context>.
Spring Modulith matérialise et vérifie les bounded contexts.
Chaque module fermé expose uniquement son package api nommé.
L'implémentation vit sous internal/{domain,application,persistence,web}.
L'hexagone complet est réservé aux règles et frontières qui le justifient.
```

**Raison :** rendre les frontières exécutables et testables, tout en évitant la cérémonie d'une
Clean Architecture stricte dans les modules simples.

### 4.2 Nouvelle ADR-015 — Frontend

**Ancien :**

```text
Expo Router + React Context ; dossiers components et lib.
Next.js App Router sans architecture interne formalisée.
```

**Nouveau :**

```text
FSD pour Mobile et Admin : pages, widgets, features, entities, shared.
Routes framework minces.
Slices indépendantes et imports descendants via public API index.ts.
Segments nommés par responsabilité : ui, api, model, lib, config.
```

**Raison :** éviter la croissance de dossiers techniques globaux et permettre plusieurs parcours,
personas et équipes frontend sans couplage transversal.

### 4.3 Story/ticket technique à créer après approbation

Titre proposé :

```text
Architecture — Enforcer Spring Modulith et FSD avant les vertical slices métier
```

Critères d'acceptation proposés :

1. Le bootstrap Spring réside sous `ci.kotiz` et démarre toujours.
2. Spring Modulith est géré par une version compatible avec la ligne Spring Boot retenue.
3. Un module de référence actif démontre `package-info.java`, `api`, `internal` et
   `@NamedInterface("api")`, sans inventer de règle métier.
4. `ApplicationModules.verify()` réussit et échouerait sur un accès à `*.internal`.
5. Un exemple `@ApplicationModuleTest` s'exécute.
6. Les architectures Mobile et Admin sont documentées selon FSD.
7. Les alias TypeScript, lint et APIs publiques de slices sont configurés.
8. Les routes Expo existantes restent fonctionnelles pour les variantes cliente et agent.
9. Aucun contexte différé ou retiré n'est initialisé.
10. Les README, ADR, HLD, `CONTRIBUTING.md`, `AGENTS.md` et workflows story sont alignés.
11. Type-check, tests ciblés, tests complets et build passent.

### 4.4 `/implement`

Avant tout test, `/implement` doit convenir avec l'humain des seams publiques. Pour une vertical
slice complète, les seams attendues sont choisies parmi :

- API du module ;
- endpoint HTTP ;
- événement public ;
- comportement visible d'une feature frontend ;
- persistance réelle lorsque PostgreSQL fait partie du comportement.

Le skill applique ensuite une tranche rouge/verte à la fois, effectue type-check et tests ciblés,
termine par la suite complète, lance la revue Standards + Spec, puis commit sur la branche courante.

## 5. Plan d'implémentation et handoff

### Séquence

1. Approuver le présent Sprint Change Proposal.
2. Amender ADR-011 et créer ADR-015.
3. Aligner HLD, Context Map, READMEs, conventions et règles agents.
4. Créer le ticket GitHub technique avec les critères ci-dessus.
5. Implémenter la migration backend et le squelette FSD via `/implement`.
6. Vérifier architecture, tests, type-check et builds.
7. Effectuer `/code-review` sur les axes Standards et Spec.
8. Ouvrir une PR dédiée vers `develop` selon le flux protégé du dépôt.

### Responsabilités

| Rôle        | Responsabilité                                           |
| ----------- | -------------------------------------------------------- |
| Henoch / PO | Approbation de la proposition et des frontières retenues |
| Architecte  | ADR-011, ADR-015, HLD et règles de dépendance            |
| Developer   | Migration code, configurations et tests                  |
| Reviewer    | Revue Standards + Spec et vérification des preuves       |

### Critères de succès

- une seule architecture canonique est décrite partout ;
- les frontières backend sont vérifiées automatiquement ;
- les frontières frontend sont vérifiées par lint et public APIs ;
- le DDD stratégique et le re-scope du MVP sont préservés ;
- aucune fonctionnalité différée n'est réactivée ;
- la première vertical slice métier peut être implémentée sans décision structurelle ouverte.

## 6. Checklist Correct Course

| ID  | Statut        | Conclusion                                                           |
| --- | ------------- | -------------------------------------------------------------------- |
| 1.1 | N/A           | Aucun défaut d'une story métier ; clarification transversale post-S1 |
| 1.2 | Done          | Limitation technique et divergence documentaire identifiées          |
| 1.3 | Done          | ADR, HLD, code, POM, README et issues inspectés                      |
| 2.1 | Done          | Epic 1 reste réalisable                                              |
| 2.2 | Done          | Un ticket technique ajouté ; aucun nouvel epic                       |
| 2.3 | Done          | Les futures stories reçoivent les nouvelles conventions              |
| 2.4 | Done          | Aucun epic invalidé ou créé                                          |
| 2.5 | Done          | Migration placée après S1 et avant le métier                         |
| 3.1 | Done          | Aucun conflit avec les objectifs PRD                                 |
| 3.2 | Done          | ADR-011, HLD, Context Map et code affectés                           |
| 3.3 | Done          | Aucun parcours UX modifié ; référence ADR seulement                  |
| 3.4 | Done          | Tests, CI, documentation et règles agents affectés                   |
| 4.1 | Viable        | Ajustement direct, effort moyen, risque faible à moyen               |
| 4.2 | Not viable    | Rollback sans bénéfice                                               |
| 4.3 | Not viable    | Nouvelle revue MVP inutile                                           |
| 4.4 | Done          | Option 1 retenue                                                     |
| 5.1 | Done          | Résumé documenté                                                     |
| 5.2 | Done          | Impacts epics et artefacts documentés                                |
| 5.3 | Done          | Approche et alternatives documentées                                 |
| 5.4 | Done          | MVP inchangé et actions séquencées                                   |
| 5.5 | Done          | Handoff PO / Architecte / Developer / Reviewer défini                |
| 6.1 | Done          | Toutes les sections applicables traitées                             |
| 6.2 | Done          | Proposition relue pour cohérence                                     |
| 6.3 | Action-needed | Approbation explicite du présent document requise                    |
| 6.4 | N/A           | Aucun epic supprimé, renuméroté ou ajouté                            |
| 6.5 | Action-needed | Handoff final après approbation                                      |

## 7. Décision demandée

Approuver, demander une révision ou refuser cette proposition. Aucune propagation documentaire,
création de ticket ou migration de code n'est autorisée avant l'approbation explicite.
