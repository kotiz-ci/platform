---
title: ADR-006 — Prime Santé, unité de stockage et conversion UI
status: ACCEPTÉE
date: 2026-04-24
decision_makers:
  - Henoch Lonzo Koffi (Fondateur)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-002 (Monolithe modulaire)
references:
  - Code/platform/docs/product/prd-mvp.md §5.3 (prime /jour)
  - Code/platform/docs/architecture/erd.md §5.1 (weekly_premium_cents)
classification: Confidentiel — Usage interne
---

# ADR-006 — Prime Santé : unité de stockage et conversion UI

## 1. Contexte

Le PRD v1.1 §5.3 exprime les primes Santé **en FCFA par jour** (50 / 100 / 200 FCFA/j) — cohérent avec le positionnement « 550 FCFA/j = épargne + santé » du pitch agent.

L'ERD v1.0 stocke les primes dans `health_plans.weekly_premium_cents` et `health_subscriptions.weekly_premium_cents` — **en centimes FCFA par semaine**.

**Divergence D4** identifiée dans l'audit IR. Risque : confusion côté dev sur l'unité de calcul des prélèvements et sur l'affichage UI.

## 2. Décision retenue

**Conserver `weekly_premium_cents` en base + centraliser la conversion UI via un helper.**

### 2.1 Justification du choix « weekly » en DB

- La périodicité de **prélèvement** effective est hebdomadaire (PRD §5.3 : « prélèvement automatique hebdomadaire »)
- Stocker la valeur effective du prélèvement évite les arrondis / imprécisions (ex : 50 FCFA/j × 7 = 350 FCFA/semaine exact)
- Cohérent avec la colonne existante `health_plans.weekly_premium_cents`

### 2.2 Conversion UI centralisée

Un service Spring `FormulaDisplayService` expose deux méthodes :

```java
public String formatDailyForClient(long weeklyPremiumCents) {
  long dailyCents = weeklyPremiumCents / 7;
  return formatFcfa(dailyCents) + " / jour";
}

public String formatWeeklyForAgent(long weeklyPremiumCents) {
  return formatFcfa(weeklyPremiumCents) + " / semaine";
}
```

### 2.3 Règle d'affichage selon la surface

| Surface                       | Affichage                                       | Exemple                                    |
| ----------------------------- | ----------------------------------------------- | ------------------------------------------ |
| App cliente (Fatou)           | **/jour** (via `formatDailyForClient`)          | « 50 FCFA / jour »                         |
| App agent (Moussa)            | **/semaine** (via `formatWeeklyForAgent`)       | « 350 FCFA / semaine »                     |
| Admin web (Ibrahima, Finance) | **/semaine** (cohérent prélèvement)             | « 350 FCFA / semaine »                     |
| Attestation CIMA (PDF)        | **/jour + /semaine** (pour transparence légale) | « 50 FCFA / jour soit 350 FCFA / semaine » |
| API partenaires               | Centimes bruts (pas de formatage)               | `{"weekly_premium_cents": 35000}`          |

### 2.4 Valeurs concrètes des 3 formules

| Formule                          | /jour (client) | /semaine (agent, DB) | Stockage `weekly_premium_cents` |
| -------------------------------- | -------------- | -------------------- | ------------------------------- |
| Famille                          | 50 FCFA        | 350 FCFA             | 35 000 centimes                 |
| Confort                          | 100 FCFA       | 700 FCFA             | 70 000 centimes                 |
| Premium                          | 200 FCFA       | 1 400 FCFA           | 140 000 centimes                |
| Confort avec -10 % (Score ≥ 4⭐) | 90 FCFA        | 630 FCFA             | 63 000 centimes                 |

## 3. Conséquences

### 3.1 Positives

- Unité de stockage cohérente avec la périodicité réelle du prélèvement
- Pas d'arrondi ni de perte de précision
- Helper centralisé = un seul endroit à maintenir
- Affichage adapté par surface (cliente vs agent vs admin)

### 3.2 Contraintes

- Une règle à retenir par les devs : « DB = weekly, UI cliente = daily »
- Tests unitaires obligatoires sur `FormulaDisplayService` pour éviter les bugs d'arrondi

### 3.3 Risques

| Risque                                              | Probabilité | Impact               | Mitigation                                        |
| --------------------------------------------------- | ----------- | -------------------- | ------------------------------------------------- |
| Dev oublie le helper et affiche weekly en UI client | Moyenne     | Faible (bug visible) | Règle de lint + revue de code + tests UI snapshot |
| Erreur d'arrondi (50 × 7 ≠ 350 si on part du daily) | Faible      | Moyen                | Tests unitaires + valeurs de référence hardcoded  |

## 4. Statut et révision

- **Statut** : ACCEPTÉE
- **Date** : 24 avril 2026
- **Référence** : KOTIZ/ARCH/ADR-006
