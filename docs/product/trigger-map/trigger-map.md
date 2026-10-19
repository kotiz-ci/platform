---
workflowType: trigger-map
workflow: documentation-synthesis
version: 1.0
date: 2026-06-04
author: Henoch Lonzo Koffi × Freya (WDS Designer)
project_name: KOTIZ
wds_phase: 2
sources:
  - docs/product/product-brief.md
  - 01_Business/KOTIZ_Identite_Produit.md
  - docs/product/prd-mvp.md
  - docs/design/ux-design-specification.md
  - docs/product/trigger-map/decisions/agent-float-system.md
workshops_completed:
  - business-goals
  - target-groups
  - driving-forces
  - prioritization
  - gap-analysis
---

# Trigger Map — KOTIZ MVP

> Référence stratégique unique · WDS Phase 2
> Connecte les objectifs business à la psychologie utilisateur
> Construit le 4 juin 2026 · Validé par Henoch Lonzo Koffi

---

## Vision

> _Devenir la plateforme de référence pour l'inclusion financière des millions d'Ivoiriens non-bancarisés, en digitalisant le signé signé — transformant chaque cotisation quotidienne en sécurité, rendement et accès progressif aux services financiers formels._

---

## Objectifs Business

### 🔴 Primary — Activation

| #   | Objectif                   | Cible                                                    | Deadline   |
| --- | -------------------------- | -------------------------------------------------------- | ---------- |
| P1  | Utilisatrices actives      | ≥ 1 000 (Abidjan : Adjamé, Yopougon, Abobo, Treichville) | Juil. 2026 |
| P2  | Agents KOTIZ opérationnels | ≥ 50 agents certifiés                                    | Juil. 2026 |

### 🟠 Secondary — Engagement & Monétisation

| #   | Objectif                    | Cible                       | Deadline   |
| --- | --------------------------- | --------------------------- | ---------- |
| S1  | Souscriptions Santé bundlée | ≥ 200 · taux ≥ 40 % dès J+1 | Juil. 2026 |
| S2  | Rétention                   | S4 ≥ 40 %                   | Juil. 2026 |
| S3  | LTV / CAC                   | ≥ 1 dès le mois 1           | Juil. 2026 |

### 🟡 Tertiary — Qualité & Efficience

| #   | Objectif               | Cible                                | Deadline   |
| --- | ---------------------- | ------------------------------------ | ---------- |
| T1  | NPS                    | ≥ 40 (sur 100 premières clientes)    | Juil. 2026 |
| T2  | CAC                    | ≤ 2 500 FCFA                         | Juil. 2026 |
| T3  | Fiabilité mobile money | Taux d'échec ≤ 3 % sur 30j glissants | Juil. 2026 |

---

## Groupes Cibles & Driving Forces

### 👩🏾 Fatou — Cliente épargnante · PRIMARY

**Profil :** Commerçante, marché d'Adjamé, 34 ans. Épargne pour l'école de ses enfants. Tecno entrée de gamme, 2 Go RAM, 3G instable. Cotisait avec un collecteur physique — le connaît, lui faisait (un peu) confiance.

**Rôle dans le flywheel :** Elle est le cœur du produit. Sans elle, pas de float, pas de commission, pas de données de score. Sa fidélité construit le modèle économique.

**Positive Drivers (ce qu'elle veut)**

| #   | Driver                                                          | Contexte usage                                   |
| --- | --------------------------------------------------------------- | ------------------------------------------------ |
| + 1 | Voir son solde grandir chaque jour                              | Récompense visuelle immédiate après chaque dépôt |
| + 2 | Savoir que son argent est en sécurité, tracé, récupérable       | Chaque dépôt confirmé = preuve numérique         |
| + 3 | Atteindre un objectif nommé ("École enfants 2026")              | Son épargne a un sens, pas juste des chiffres    |
| + 4 | Construire son KOTIZ Score pour accéder à de meilleurs services | Elle voit son avenir financier se construire     |
| + 5 | Être protégée par la santé automatiquement dès J+1, sans effort | Elle gagne plus que ce qu'elle dépose            |

**Negative Drivers (ce qu'elle craint) ⚠️ PLUS PUISSANTS**

| #   | Driver                                                        | Intensité                       |
| --- | ------------------------------------------------------------- | ------------------------------- |
| - 1 | Perdre son argent comme avec le collecteur disparu            | 🔴 Maximale — bloque l'adoption |
| - 2 | Faire une erreur dans l'app et ne pas pouvoir la corriger     | 🔴 Très haute                   |
| - 3 | Que quelqu'un accède à son téléphone et vole son épargne      | 🔴 Très haute                   |
| - 4 | Ne pas comprendre l'interface et être humiliée devant l'agent | 🟠 Haute                        |
| - 5 | Manquer un dépôt et perdre son streak / ses récompenses       | 🟡 Moyenne                      |

---

### 👨🏾 Moussa — Agent terrain · CO-PRIMARY

**Profil :** 28–45 ans, ex-collecteur "signé signé" reconverti. Entrepreneur de proximité, connaît ses clientes par prénom. Travaille tôt le matin (marchés à l'aube), en mouvement constant. Réseau social dense dans sa zone.

**Rôle dans le flywheel :** Il est le canal d'acquisition de Fatou ET son point de contact de confiance. Sans lui, la plupart des Fatous ne s'inscrivent pas. Il est aussi un créateur de données (chaque collecte = transaction tracée = score alimenté).

**Positive Drivers (ce qu'il veut)**

| #   | Driver                                                      | Contexte usage                                           |
| --- | ----------------------------------------------------------- | -------------------------------------------------------- |
| + 1 | Revenu structuré et croissant                               | Plus de collectes = plus de commission prévisible        |
| + 2 | Progresser Bronze → Silver → Gold                           | Statut, revenus supérieurs, reconnaissance               |
| + 3 | Ne jamais manquer de float                                  | Pouvoir dire "oui" à toutes ses clientes                 |
| + 4 | Être reconnu comme professionnel certifié dans son quartier | "Agent KOTIZ" = ascension sociale vs collecteur informel |
| + 5 | Former des sous-agents au niveau Gold                       | Devenir entrepreneur avec un réseau                      |

**Negative Drivers (ce qu'il craint) ⚠️ PLUS PUISSANTS**

| #   | Driver                                                | Intensité                              |
| --- | ----------------------------------------------------- | -------------------------------------- |
| - 1 | Float épuisé → refuser une cliente en public          | 🔴 Maximale — sa réputation s'effondre |
| - 2 | Un bug le fait passer pour malhonnête                 | 🔴 Très haute                          |
| - 3 | KOTIZ remplace les agents par l'app                   | 🟠 Haute — crainte existentielle       |
| - 4 | Perdre sa caution (50 000 FCFA) pour erreur technique | 🟠 Haute                               |
| - 5 | L'app plante en plein marché                          | 🟠 Haute                               |

**Décision produit validée :** Système Float Tournée + recharge mobile money terrain
→ `B-Trigger-Map/decisions/agent-float-system.md`

---

### 👨🏾‍💼 Ibrahima — Administrateur back-office · SECONDARY

**Profil :** Gestionnaire, 30–45 ans, KOTIZ SAS Abidjan. Routinier et méthodique — ses journées ont une structure fixe. Très orienté "preuve" — documente tout. Peu visible dans l'organisation mais indispensable.

**Rôle dans le flywheel :** Il garantit que KOTIZ opère légalement et sans friction invisible. Sans lui, les incidents agents passent inaperçus jusqu'au scandale, et les rapports CENTIF-CI sont en retard.

> ⚠️ **Tension à gérer :** Ibrahima est Secondary en priorité design mais P0 en criticité opérationnelle. La fiabilité et l'auditabilité de son back-office sont des requirements non-négociables, même si le design peut être plus utilitaire.

**Positive Drivers (ce qu'il veut)**

| #   | Driver                                       | Contexte usage                            |
| --- | -------------------------------------------- | ----------------------------------------- |
| + 1 | Dashboard temps réel — tout d'un coup d'œil  | Visibilité et contrôle permanent          |
| + 2 | Alertes automatiques — agir avant l'incident | Anticiper, jamais réagir                  |
| + 3 | Données exportables et auditables            | Prêt pour tout contrôle BCEAO en 10 min   |
| + 4 | Réconciliation automatisée                   | Moins de saisie manuelle, moins d'erreurs |
| + 5 | Clore sa journée tout réconcilié             | Sérénité professionnelle                  |

**Negative Drivers (ce qu'il craint) ⚠️ PLUS PUISSANTS**

| #   | Driver                                                         | Intensité                       |
| --- | -------------------------------------------------------------- | ------------------------------- |
| - 1 | Écart de float inexpliqué → première ligne devant la direction | 🔴 Très haute                   |
| - 2 | Incident détecté par plainte client, pas par le système        | 🔴 Très haute                   |
| - 3 | Rapport STR CENTIF incomplet ou tardif                         | 🟠 Haute — risque réglementaire |
| - 4 | Volume qui triple sans outils supplémentaires                  | 🟠 Haute                        |
| - 5 | Panne système lors d'un audit                                  | 🟠 Haute                        |

---

## Prioritisation Stratégique

### Matrice Impact × Faisabilité

```
IMPACT
  ↑
  │  Fatou ●────────────● Moussa
  │     (co-primary)
  │
  │                  ● Ibrahima
  │
  └─────────────────────────────→ FAISABILITÉ
```

| Persona  | Impact   | Faisabilité                              | Priorité      |
| -------- | -------- | ---------------------------------------- | ------------- |
| Fatou    | 🔴 Élevé | 🟠 Moyen (défiance tech, 3G, littératie) | #1 co-primary |
| Moussa   | 🔴 Élevé | 🟢 Élevé (motivé, communauté connue)     | #1 co-primary |
| Ibrahima | 🟠 Moyen | 🟢 Élevé (utilisateur interne)           | #2 secondary  |

**Insight clé :** Moussa est le canal d'acquisition de Fatou. En termes de séquençage design, l'app agent doit être irréprochable avant que l'app cliente soit parfaite.

### Top 5 Driving Forces — Cross-personas

| Rang | Driver                                                         | Personas          | Intensité     |
| ---- | -------------------------------------------------------------- | ----------------- | ------------- |
| 🥇 1 | Sécurité de l'argent                                           | Fatou             | 🔴 Maximale   |
| 🥈 2 | Confiance dans le système (preuve que ça marche)               | Fatou + Moussa    | 🔴 Très haute |
| 🥉 3 | Simplicité sans friction (zéro bug, zéro ambiguïté)            | Moussa + Ibrahima | 🟠 Haute      |
| 4    | Preuve de valeur immédiate (solde visible, commission visible) | Fatou + Moussa    | 🟠 Haute      |
| 5    | Contrôle et anticipation (voir avant le problème)              | Ibrahima + Moussa | 🟡 Moyenne    |

---

## Design Focus Statement

> _Concevoir une expérience qui donne à Fatou la certitude absolue que son argent est en sécurité et qu'elle gagne — et donne à Moussa les outils pour être son partenaire terrain sans jamais la décevoir — en éliminant toute friction, toute ambiguïté et tout risque perçu à chaque interaction._

---

## Gaps & Points de Vigilance

| Gap                                                        | Impact | Action                                                     |
| ---------------------------------------------------------- | ------ | ---------------------------------------------------------- |
| Aucune interview terrain avec Fatou/Moussa réels           | Moyen  | Tests utilisateurs à Adjamé — sprint 4                     |
| Psychologie de Moussa et Ibrahima inférée (pas de terrain) | Moyen  | Valider avec les premiers agents et gestionnaires recrutés |
| PRD v1.1 non mis à jour avec décisions Float Agent         | Faible | Pass `bmad-edit-prd` après finalisation WDS                |

---

## Référence Rapide — "Single Slide"

```
KOTIZ TRIGGER MAP — MVP

VISION
Plateforme fintech de référence pour les non-bancarisés ivoiriens
→ Digitaliser le signé signé · "Tu gagnes"

OBJECTIFS PRIMARY
  1 000 clientes actives + 50 agents (Abidjan · juil. 2026)

GROUPES & FORCES CLÉS
  👩🏾 Fatou (co-primary)
     ✅ Veut : sécurité argent · solde qui grandit · objectif nommé
     ❌ Craint : perdre son argent · erreur irréversible · être humiliée
  👨🏾 Moussa (co-primary)
     ✅ Veut : revenu croissant · statut · float suffisant · jamais dire non
     ❌ Craint : float épuisé en public · bug qui le fait passer pour escroc
  👨🏾‍💼 Ibrahima (secondary)
     ✅ Veut : visibilité totale · alertes auto · réconciliation propre
     ❌ Craint : incident non détecté · non-conformité BCEAO

FOCUS DESIGN
  Sécurité perçue + Zéro friction + Preuve de valeur immédiate
  → Fatou d'abord, Moussa indispensable, Ibrahima fiable
```

---

_Produit par Freya (WDS Designer) · Phase 2 Trigger Map · 4 juin 2026_
_Sources : documentation KOTIZ + workshops de synthèse validés_
_À utiliser comme référence dans : design decisions · stories · specs UX · onboarding équipe_
