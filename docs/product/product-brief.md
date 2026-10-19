---
workflowType: product-brief
workflow: simplified
version: 1.0
date: 2026-06-03
author: Henoch Lonzo Koffi
project_name: KOTIZ
wds_phase: 1
brief_level: simplified
sources:
  - 01_Business/KOTIZ_Identite_Produit.md
  - docs/product/prd-mvp.md
  - docs/design/ux-design-specification.md
  - docs/adr/0009-mobile-rn-expo.md
---

# Product Brief — KOTIZ MVP

> Document WDS Phase 1 — Fondation stratégique pour tout le travail de design
> Compilé depuis les artifacts projet existants · 3 juin 2026

---

## 1. Scope — Ce que nous concevons

**KOTIZ** est une plateforme fintech multi-surface de micro-épargne et de services financiers inclusifs pour le secteur informel ivoirien.

**Surfaces livrées dans le MVP :**

| Surface                                          | Public                            | Priorité |
| ------------------------------------------------ | --------------------------------- | -------- |
| App mobile (React Native / Expo) — Android-first | Client épargnant (Fatou)          | P0       |
| App mobile (React Native / Expo) — variant agent | Agent terrain (Moussa)            | P0       |
| USSD                                             | Feature phones sans data          | P1       |
| WhatsApp bot                                     | Notifications, consultation solde | P1       |
| Back-office web                                  | Administrateur (Ibrahima)         | P2       |

**Fonctionnalités MVP :**

- **KOTIZ Épargne** — dépôts dès 100 FCFA, objectifs nommés, verrouillage optionnel, récompenses streak
- **KOTIZ Agents** — réseau d'agents certifiés pour cash-in/cash-out et onboarding assisté
- **KOTIZ Santé bundlée** — micro-assurance CIMA souscrite dès J+1 au premier dépôt (3 formules : 50 / 100 / 200 FCFA/j)
- **KOTIZ Score** — score en 5 étoiles (1⭐ → 5⭐) basé sur la régularité d'épargne, 5 paliers d'avantages progressifs

**Hors scope MVP :** tontine rotative, cagnotte collective, micro-crédit, investissement immobilier fractionné.

---

## 2. Challenge & Opportunité

### Le problème exact

En Côte d'Ivoire, ~2 millions de personnes — majoritairement des femmes commerçantes — confient leur épargne quotidienne à un collecteur physique ("signé signé"). Ce système est :

- **Non sécurisé** : le collecteur peut disparaître avec l'argent, zéro recours légal
- **Non tracé** : perte du carnet = perte des preuves
- **Coûteux** : 3,2% prélevé (1 jour de cotisation gardé par le collecteur)
- **Stérile** : zéro rendement, zéro historique financier → impossibilité d'accéder au crédit formel

**Contexte macro :** 78 % des Ivoiriens sont non-bancarisés.

### L'opportunité

KOTIZ **digitalise le signé signé** sans le dénaturer : l'agent KOTIZ remplace le collecteur physique, l'app remplace le carnet. La cliente ne perd plus 3,2% — elle **gagne** (rendement préservé + santé protégée + score de confiance construit).

**Message de vente :** « Tu gagnes » · Pitch agent : « 550 FCFA/jour = épargne + santé »

---

## 3. Business Model

| Flux                   | Mécanisme                                                       | Montant   |
| ---------------------- | --------------------------------------------------------------- | --------- |
| **Commission épargne** | 1,5 % fixe sur chaque dépôt (tous canaux)                       | Variable  |
| **Float income**       | 50 % du rendement DAT (~6%/an)                                  | Variable  |
| **Santé**              | Prime CIMA mensuelle (client paie 50/100/200 FCFA/j)            | Récurrent |
| **Agents**             | Commission agent 0,8–1,2 % (rétrocédée sur la commission KOTIZ) | Variable  |

**KPIs cibles fin MVP (juillet 2026) :**

- 1 000 utilisatrices actives (Abidjan : Adjamé, Yopougon, Abobo, Treichville)
- 50 agents opérationnels
- ≥ 200 souscriptions Santé (taux bundle cible ≥ 40 %)
- Rétention S4 ≥ 40 % · NPS ≥ 40 · CAC ≤ 2 500 FCFA · LTV/CAC ≥ 1 dès M1

---

## 4. Personas

### Fatou — Cliente épargnante (Primary)

- **Profil :** Femme commerçante, marché d'Adjamé, 34 ans, épargne pour l'école de ses enfants
- **Device :** Tecno entrée de gamme, 2 Go RAM, 3G instable
- **Drivers :** Sécurité de son argent, ne pas perdre son capital, construire son avenir
- **Freins :** Défiance envers les apps inconnues, analphabétisme partiel, connectivité fragile
- **Canal préféré :** Agent terrain ou app (si confiante), WhatsApp pour notifications

### Moussa — Agent terrain (Secondary)

- **Profil :** 28–45 ans, ex-collecteur "signé signé" reconverti, entrepreneur de proximité
- **Drivers :** Revenu complémentaire, progression Bronze→Silver→Gold, outil simple et rapide
- **Freins :** Float insuffisant bloquant les opérations, complexité de l'interface agent
- **Canal préféré :** App mobile variant agent

### Ibrahima — Administrateur back-office (Tertiary)

- **Profil :** Gestionnaire, 30–45 ans, KOTIZ SAS Abidjan
- **Drivers :** Vue d'ensemble, réconciliation quotidienne, gestion des incidents
- **Canal préféré :** Back-office web

---

## 5. Design Goals

### Fonctionnels

- Parcours dépôt en < 3 taps pour Fatou
- Onboarding avec agent : < 5 minutes
- Bundle Santé proposé automatiquement à J+1 du premier dépôt
- Streak et score visibles à chaque connexion

### Expérientiels

- Ton **« Akwaba Fatou »** : tutoiement, phrases courtes (< 10 mots), mots locaux en accroche uniquement
- Chaque dépôt réussi = célébré (son + visuel), streak bonifié, étoiles qui évoluent
- **Signe signe digitalisé** : l'UI renforce la promesse « tu gagnes » à chaque interaction
- Mode vocal **optionnel** (accessibilité, pas défaut)

### Business

- LTV/CAC ≥ 1 dès le mois 1 via bundle Santé
- NPS ≥ 40 sur les 100 premières clientes
- Viralité via parrainage Score Booster + recap hebdo partageable

---

## 6. Design Direction

### Style

- Références : **Djamo** (épuré, mobile-first, accent couleur fort) × **Wave** (minimaliste, whitespace maximal) × **Revolut** (premium, typographie soignée, data viz)
- **Règle d'or :** max 2 couleurs de marque par écran + neutres
- Typo : **Inter** (variable, axe wght 300–700)

### Palette de marque (tokens clés)

| Token          | Hex     | Rôle                            |
| -------------- | ------- | ------------------------------- |
| `navy`         | #0A2540 | Titres, header, texte primaire  |
| `teal-deep`    | #007A6E | Boutons primaires, liens, focus |
| `gold-dark`    | #B8860B | Montants, épargne               |
| `violet`       | #6C4AB6 | Santé, innovation               |
| `success-deep` | #047857 | Confirmations                   |
| `warn`         | #D94F4F | Erreurs, alertes                |

### Accessibilité

- WCAG AA minimum partout · taille texte minimum 14 pt
- Icônes universelles · mode vocal optionnel
- Low-end device : APK ≤ 30 Mo, pas d'animations lourdes, offline-first partiel

---

## 7. Contraintes

### Techniques

- **Stack mobile :** React Native / Expo, monorepo Turborepo
- **2 binaires EAS distincts :** client (Fatou) + agent (Moussa) — ADR-010
- **Backend :** Node.js / PostgreSQL (stored procedures pour ledger) — AES-GCM chiffrement
- **APK ≤ 30 Mo**, support 3G instable, offline partiel

### Réglementaires

- BCEAO (monnaie électronique) · CENTIF-CI (KYC/AML) · CIMA (micro-assurance) · ARPD (données personnelles)
- KOTIZ est distributeur technologique — pas une banque, pas un assureur

### Timeline

- MVP : mai → juillet 2026 (6 sprints de 2 semaines)
- Zone de lancement : Abidjan (Adjamé, Yopougon, Abobo, Treichville)
- Dev #2 backend requis **avant sprint 1** (risque bus factor critique)

### Positionnement stratégique

- **Jamais "tontine"** — aucune association KOTIZ / tontine (conviction absolue du fondateur)
- **Jamais "banque"** — KOTIZ n'accorde pas de crédit direct et ne porte pas de risque bancaire

---

## 8. Structure juridique

- **Forme :** KOTIZ SAS, siège Abidjan, Côte d'Ivoire
- **Fondateur/PO :** Henoch Lonzo Koffi
- **CTO :** Desiré Kouadio

---

_Produit par Freya (WDS Designer) · Phase 1 Product Brief · 3 juin 2026_
_Sources : KOTIZ_Identite_Produit.md · KOTIZ_PRD_MVP_v1.1.md · KOTIZ_UX_Design_Specification.md_
