---
title: ADR-003 — Score KOTIZ en 5 étoiles (remplace 0-1000)
status: ACCEPTÉE
date: 2026-04-24
decision_makers:
  - Henoch Lonzo Koffi (Fondateur)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-001 (Spring Boot)
  - ADR-002 (Monolithe modulaire)
supersedes: Modèle Score 0-1000 4 paliers de KOTIZ/_archive/2026-10-docs-avant-migration/04_Produit/KOTIZ_PRD_MVP.docx v1.0 (19 avril 2026)
references:
  - Code/platform/docs/product/prd-mvp.md §5.4
  - _archive/2026-bmad/_bmad-output/brainstorming/brainstorming-session-2026-04-23-1800.md idée #24
  - Code/platform/docs/architecture/erd.md §7.1 (scoring_scores)
classification: Confidentiel — Usage interne
---

# ADR-003 — Score KOTIZ en 5 étoiles

## 1. Contexte et problématique

Le PRD v1.0 (19 avril) définissait un Score KOTIZ de 0 à 1000 avec 4 paliers (Découverte / Régulière / Fiable / Premium). Le brainstorming du 23 avril a identifié que **ce modèle est trop abstrait pour l'informel ivoirien** : un chiffre sur 1000 ne parle pas à Fatou, et un seul avantage tangible (Santé préférentielle à 600) au lieu de plusieurs paliers récompensés.

**Conséquence produit :** le Score devient invisible et ne motive pas l'usage quotidien.

**Décision du brainstorming :** passer à un modèle **5 étoiles (1⭐ à 5⭐)** avec **5 paliers d'avantages progressifs**, un par étoile.

Cette décision est intégrée dans le PRD v1.1 (§5.4) validé 4,5/5 le 23 avril.

## 2. Options envisagées

### Option A — Score numérique 0-1000 seul (v1.0 original)

- ✅ Simple côté backend (1 entier)
- ❌ Abstrait côté client (Fatou ne comprend pas un chiffre sur 1000)
- ❌ Un seul avantage (Santé préférentielle)
- ❌ Pas de progression visible quotidienne

### Option B — Score 5 étoiles pur (sans numérique)

- ✅ Lisible universellement
- ❌ Perte de granularité pour les partenaires (IMF, assureurs) qui consomment le Score pour des décisions financières fines
- ❌ Difficile d'afficher une progression vers le palier suivant

### Option C — **Dual : 5 étoiles côté UI client + 0-1000 côté API partenaires (RETENUE)**

- ✅ Lisibilité maximale pour Fatou (étoiles universelles)
- ✅ Granularité préservée pour les partenaires (API `/scoring/me` expose les 2)
- ✅ Progression visible (« plus que 40 points pour 4⭐ »)
- ✅ 5 avantages progressifs tangibles
- ⚠️ Double représentation à maintenir (mitigé par helper `StarRatingResolver`)

## 3. Décision retenue

**Option C — Score dual 5 étoiles (UI) + 0-1000 (partenaires), avec 5 paliers d'avantages progressifs.**

### 3.1 Seuils de conversion numérique → étoiles

| Plage numérique | Étoiles    | Label palier |
| --------------- | ---------- | ------------ |
| 0 – 200         | ⭐         | Débutante    |
| 201 – 400       | ⭐⭐       | Régulière    |
| 401 – 600       | ⭐⭐⭐     | Fiable       |
| 601 – 800       | ⭐⭐⭐⭐   | Confirmée    |
| 801 – 1000      | ⭐⭐⭐⭐⭐ | Premium      |

### 3.2 Avantages progressifs par palier

| Étoiles    | Avantage débloqué (MVP)                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| ⭐         | Accès de base à l'épargne et au bundle Santé Famille                                                      |
| ⭐⭐       | **Recap WhatsApp vocal personnalisé hebdomadaire** (active TTS côté bot)                                  |
| ⭐⭐⭐     | **1 consultation téléphone gratuite avec infirmier partenaire / mois** (partenariat à finaliser avant S5) |
| ⭐⭐⭐⭐   | **Santé préférentielle (-10 % sur la formule Confort)**                                                   |
| ⭐⭐⭐⭐⭐ | **Priorité sur le crédit V2 + éligibilité au programme KOTIZ Cité V3** (promesse long terme)              |

### 3.3 Composantes du calcul (inchangées)

- Régularité d'épargne : poids 40 %
- Stabilité des montants : poids 25 %
- Ancienneté active : poids 20 %
- Engagement multi-canal : poids 15 %

### 3.4 Impact sur l'ERD (cf. ERD v2 §7.1)

Table `scoring_scores` étendue avec :

- `numeric_score SMALLINT NOT NULL CHECK BETWEEN 0 AND 1000` — exposé partenaires
- `star_rating SMALLINT NOT NULL CHECK BETWEEN 1 AND 5` — exposé UI client
- `tier_label VARCHAR(30) NOT NULL` — exposé UI client
- `previous_star_rating SMALLINT NULL` — détection franchissement palier
- `next_tier_threshold SMALLINT NULL` — points manquants pour palier suivant

Nouvelle table `scoring_tier_benefits` pour tracer les avantages activés par utilisatrice.

### 3.5 Impact sur l'API

Endpoint `/scoring/me` retourne :

```json
{
  "user_id": "uuid",
  "numeric_score": 625,
  "star_rating": 4,
  "tier_label": "Confirmée",
  "next_tier_threshold_points": 175,
  "components": {
    "regularity": { "score": 80, "weight": 0.4, "grade": "A" },
    "stability": { "score": 65, "weight": 0.25, "grade": "B+" },
    "seniority": { "score": 50, "weight": 0.2, "grade": "C" },
    "engagement": { "score": 90, "weight": 0.15, "grade": "A" }
  },
  "benefits_active": [
    { "code": "RECAP_VOCAL", "activated_at": "..." },
    { "code": "PHONE_CONSULTATION", "activated_at": "..." },
    { "code": "HEALTH_DISCOUNT_10", "activated_at": "..." }
  ],
  "benefits_next": [{ "code": "CREDIT_PRIORITY", "star_required": 5 }]
}
```

### 3.6 Impact sur l'UI

Le composant `StarRating` du design system (UX-DR-COMP-07) affiche 5 étoiles avec état rempli/vide + label palier + progression vers palier suivant. L'icône haut-parleur (`AudioToggle`) permet de lire « Tu es à 3 étoiles, plus que 40 points pour atteindre 4 étoiles ».

## 4. Conséquences

### 4.1 Conséquences positives

- Lisibilité universelle du Score pour Fatou (étoiles compréhensibles même avec alphabétisation partielle)
- 5 avantages progressifs = motivation continue (vs 1 avantage à 600 en v1.0)
- Granularité numérique préservée pour les partenaires IMF/assureurs
- Cohérence avec le brainstorming du 23 avril et le PRD v1.1

### 4.2 Contraintes acceptées

- Double représentation à maintenir (mitigé par le helper `StarRatingResolver` centralisant la conversion)
- Migration DB en 2 phases pour éviter le downtime (`ADD COLUMN nullable` puis backfill puis `NOT NULL`)

### 4.3 Risques identifiés

| Risque                                                  | Probabilité | Impact | Mitigation                                                                     |
| ------------------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------ |
| Incohérence UI (étoiles) vs API (numérique)             | Moyenne     | Faible | Helper centralisé + tests unitaires sur conversions                            |
| Partenaire infirmier téléphone (3⭐) pas signé avant S5 | Moyenne     | Moyen  | Shortlist dès pré-sprint 0, plan B : avantage différé avec notification claire |
| Ajustement seuils nécessaire après 3 mois de production | Élevée      | Faible | Revue mensuelle, seuils paramétrables via SystemConfig                         |

## 5. Statut et révision

- **Statut** : ACCEPTÉE
- **Date de décision** : 24 avril 2026
- **Décideurs** : Henoch (Fondateur), Desiré (CTO)
- **Prochaine révision** : Sprint 6 — après 3 mois de production MVP
- **Référence interne** : KOTIZ/ARCH/ADR-003
