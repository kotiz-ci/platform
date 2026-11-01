---
title: ADR-004 — USSD dans le MVP (menu 4 niveaux léger)
status: ACCEPTÉE
date: 2026-04-24
decision_makers:
  - Henoch Lonzo Koffi (Fondateur)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-002 (Monolithe modulaire)
supersedes: HLD v1.0 §6.3 qui reportait USSD en V2
references:
  - Code/platform/docs/product/prd-mvp.md §6 (matrice canaux) + Epic 9 Story 9.4
classification: Confidentiel — Usage interne
---

# ADR-004 — USSD dans le MVP

## 1. Contexte

Le HLD v1.0 (21 avril) mentionnait le « Canal USSD pour les non-smartphones » en **V2** post-MVP. Le PRD v1.1 (validé 4,5/5 le 23 avril) liste USSD **dans la matrice canaux MVP §6** et l'Epic 9 Story 9.4 le spécifie explicitement.

**Divergence critique D2** identifiée dans l'audit Implementation Readiness (23 avril).

**Arbitrage nécessaire** : USSD en MVP, ou reporté en V2 ?

## 2. Options envisagées

### Option A — USSD dans le MVP en mode léger (RETENUE)

- Menu 4 niveaux maximum : solde / cotiser montant fixe / aide / contact agent
- Scope réduit : **pas** de souscription Santé, **pas** de création d'objectif nommé, **pas** de parrainage en USSD
- Code `*XXX#` assigné par régulateur télécom + partenariat Orange ou MTN
- ✅ Inclut les feature phones / clientes sans smartphone / pannes data
- ✅ Cohérent PRD v1.1
- ✅ Canal de secours en cas de panne app ou WhatsApp
- ❌ Dépendance partenaire télécom et régulateur (délai 2-4 semaines)
- ❌ +1 story dans l'Epic 9 (story 9.4)

### Option B — USSD reporté en V2 (HLD v1.0 original)

- USSD retiré du MVP, focus app + WhatsApp bot
- ✅ Pas de dépendance télécom critique
- ✅ Libère 1 story du sprint 4
- ❌ Contradiction PRD v1.1 (nécessiterait amendement NFR + matrice canaux)
- ❌ Exclut les feature phones au launch — environ 20-30 % du marché cible selon GSMA 2024
- ❌ Pas de canal de secours en cas de panne app/WhatsApp

## 3. Décision retenue

**Option A — USSD dans le MVP en mode léger.**

### 3.1 Scope fonctionnel MVP USSD

| Niveau             | Option | Action                            |
| ------------------ | ------ | --------------------------------- |
| 1 (menu principal) | 1      | Solde                             |
| 1                  | 2      | Cotiser                           |
| 1                  | 3      | Aide                              |
| 1                  | 4      | Contact agent                     |
| 2 (cotiser)        | 1      | 100 FCFA                          |
| 2 (cotiser)        | 2      | 500 FCFA                          |
| 2 (cotiser)        | 3      | 1 000 FCFA                        |
| 3 (confirmation)   | —      | Saisie PIN                        |
| 4 (résultat)       | —      | Succès / échec + solde mis à jour |

### 3.2 Hors scope USSD MVP

- Souscription Santé (redirection vers app / agent / WhatsApp)
- Création d'objectif nommé (redirection vers app)
- Visualisation Score étoiles (seule la valeur numérique courte possible)
- Déclaration de sinistre
- Parrainage

### 3.3 Contraintes techniques

- Temps de réponse ≤ 3 s P95 (NFR-PERF-04)
- Pas de saisie longue > 10 caractères
- Session USSD TTL 2 min max
- Code `*XXX#` placeholder — **demande au régulateur télécom dès pré-sprint 0**
- Partenaire télécom : Orange ou MTN (le peering Orange Business permet un deal potentiel avec Orange)

### 3.4 Dépendances critiques

- Code USSD régulateur (délai 2-4 semaines — à démarrer immédiatement)
- Contrat partenaire télécom signé avant S4
- Si ni l'un ni l'autre ne tient avant S4 → **plan B** : USSD décalé au sprint 6 ou reporté en V1 post-MVP, avec amendement du PRD

## 4. Conséquences

### 4.1 Positives

- Inclusion de ~20-30 % de clientes feature phone dans le MVP
- Canal de secours fiable si app ou WhatsApp Meta en panne
- Cohérence avec la mission d'inclusion financière KOTIZ

### 4.2 Contraintes

- +1 story Epic 9 (story 9.4) déjà comptabilisée
- Dépendance télécom + régulateur — zone de risque P0
- Module `ussd` à ajouter au monolithe Spring Boot (petit, 200-300 lignes estimées)

### 4.3 Risques

| Risque                                 | Probabilité | Impact | Mitigation                                                       |
| -------------------------------------- | ----------- | ------ | ---------------------------------------------------------------- |
| Code `*XXX#` non assigné avant S4      | Moyenne     | Élevé  | Demande immédiate régulateur + plan B report V1                  |
| Contrat télécom retardé                | Moyenne     | Élevé  | Négociation parallèle Orange + MTN, Orange prioritaire (peering) |
| Scope USSD tiré vers plus que le léger | Faible      | Moyen  | Discipline de scope (cf. §3.2 hors scope)                        |

## 5. Statut et révision

- **Statut** : ACCEPTÉE
- **Date de décision** : 24 avril 2026
- **Décideurs** : Henoch (Fondateur), Desiré (CTO)
- **Prochaine révision** : Sprint 4 (avant intégration gateway USSD)
- **Référence interne** : KOTIZ/ARCH/ADR-004
