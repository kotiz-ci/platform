---
title: ADR-005 — Hébergeur Orange Business Services Abidjan (data residency UEMOA)
status: ACCEPTÉE
date: 2026-04-24
decision_makers:
  - Henoch Lonzo Koffi (Fondateur)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-002 (Monolithe modulaire)
references:
  - Code/platform/docs/product/prd-mvp.md NFR-COMP-04 (data residency UEMOA)
  - _archive/2026-bmad/_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-23.md (divergence D3)
classification: Confidentiel — Usage interne
---

# ADR-005 — Hébergeur Orange Business Services Abidjan

## 1. Contexte

Le PRD v1.1 **NFR-COMP-04** impose que toutes les données à caractère personnel soient stockées sur le territoire ivoirien ou ouest-africain UEMOA.

Le Plan DevOps v1.0 (21 avril) mentionnait en §2.1 deux options d'hébergement : **OVH Gravelines (Europe)** ou MainOne Abidjan. L'option OVH Europe **viole directement NFR-COMP-04** et introduit un risque de refus BCEAO au go-live.

L'arbitrage doit trancher définitivement l'hébergeur en respectant :

- Data residency UEMOA (obligation BCEAO + conformité RGPD ivoirien)
- Fiabilité (uptime SLA 99,9 %+ attendu)
- Budget raisonnable (contrainte MVP 45 M FCFA)
- Expérience fintech / BCEAO
- Support francophone

## 2. Options envisagées

| Critère                              | OVH Gravelines (EU) | MainOne Abidjan  | **Orange Business Services Abidjan**   | AWS Cape Town                             |
| ------------------------------------ | ------------------- | ---------------- | -------------------------------------- | ----------------------------------------- |
| Data residency UEMOA                 | ❌ **viole NFR**    | ✅ CI            | ✅ **CI**                              | ⚠️ Afrique hors UEMOA — avis BCEAO requis |
| Tier III certifié                    | ✅                  | ✅               | ✅                                     | ✅                                        |
| Uptime SLA                           | 99,99 %             | 99,9 %           | 99,9 %                                 | 99,99 %                                   |
| Expérience fintech                   | faible en Afrique   | moyenne          | ✅ **forte** (partenaire Orange Money) | forte                                     |
| Peering Orange Money natif           | non                 | non              | ✅ **oui** — économie coûts sortie     | non                                       |
| Support francophone                  | limité              | oui              | ✅ **équipe Abidjan dédiée**           | anglais                                   |
| Coût estimé (4 vCPU / 8 Go / 100 Go) | ~80 k FCFA/mois     | ~100 k FCFA/mois | ~120-150 k FCFA/mois                   | ~130 k FCFA/mois                          |
| Historique incidents KOTIZ-relevant  | —                   | correct          | ✅ **très bon**                        | excellent mais hors contexte              |

## 3. Décision retenue

**Orange Business Services Abidjan — VPS 4 vCPU / 8 Go RAM / 100 Go SSD NVMe.**

### 3.1 Rationale

1. **Seule option qui satisfait simultanément** NFR-COMP-04 (data residency UEMOA) + fiabilité enterprise + intégration fintech
2. **Peering natif avec Orange Money** = latence ultra-faible sur le canal MM critique + économies sur le trafic de sortie mobile money (qui représente un volume important)
3. **Équipe support francophone locale** réduit les délais d'intervention en cas d'incident
4. **Relation commerciale avec Orange** ouvre aussi des opportunités de négociation sur les frais Orange Money (+) et partenariat USSD (ADR-004)
5. **Coût supérieur à OVH** (~40 k FCFA/mois de plus) compensé par la conformité + économies peering MM

### 3.2 Plan B si refus Orange Business ou tarif trop élevé

**MainOne Abidjan** (fiabilité correcte, Tier III, UEMOA compliant, ~100 k FCFA/mois). À activer uniquement si Orange Business refuse ou propose un tarif > 180 k FCFA/mois.

### 3.3 Explicitement exclus

- **OVH Gravelines Europe** — viole NFR-COMP-04, exclu même si moins cher
- **AWS Cape Town** — Afrique mais hors UEMOA, nécessiterait un avis juridique BCEAO. Exclu pour le MVP.
- **Hébergement sur Google Cloud ou Azure** — pas de région UEMOA disponible actuellement. Exclu.

### 3.4 Backup off-site UEMOA

Backup PostgreSQL quotidien encrypté (GPG) stocké sur **second site UEMOA** distinct du VPS primaire :

- **Option 1 (préférée)** : autre région CI (MainOne secondaire)
- **Option 2** : datacenter Tier III Dakar (Orange Sonatel Data Center)
- Rétention 30 j quotidiens + 12 mois mensuels (BCEAO)

### 3.5 CDN Cloudflare — clarification

Cloudflare est utilisé uniquement pour les assets statiques (images marketing, favicons, logos). **Aucune donnée personnelle** n'est mise en cache sur Cloudflare. La cohérence avec NFR-COMP-04 est préservée car les données personnelles ne transitent jamais par les edges Cloudflare mondiaux.

## 4. Conséquences

### 4.1 Positives

- Conformité BCEAO + ARPD ivoirien sans ambiguïté
- Peering Orange Money natif = latence + économie trafic
- Partenariat stratégique Orange renforcé
- Support francophone local réactif

### 4.2 Contraintes acceptées

- Surcoût ~40 k FCFA/mois vs OVH Europe
- Orange Business a moins de panoply de services cloud (pas de K8s managé, pas de serverless) — acceptable en MVP (Docker Compose suffit)
- Dépendance accrue à Orange (hébergeur + partenaire MM principal) — mitigée par multi-MM (Wave + MTN) et Cloudflare externe

### 4.3 Risques

| Risque                                          | Probabilité | Impact | Mitigation                                                   |
| ----------------------------------------------- | ----------- | ------ | ------------------------------------------------------------ |
| Orange Business refuse contrat ou tarif > 180 k | Moyenne     | Élevé  | Plan B MainOne Abidjan activable sous 72 h                   |
| Panne Orange Business prolongée                 | Faible      | Élevé  | Backup off-site + procédure restore sur MainOne en 4 h (RTO) |
| Dépendance Orange trop forte (single vendor)    | Moyenne     | Moyen  | Évaluation V1 de migration partielle vers 2ᵉ hébergeur UEMOA |

## 5. Statut et révision

- **Statut** : ACCEPTÉE
- **Date de décision** : 24 avril 2026
- **Décideurs** : Henoch (Fondateur), Desiré (CTO)
- **Actions immédiates** :
  - Contacter Orange Business Services Abidjan cette semaine pour devis + SLA
  - Signer contrat avant S1 (5 mai 2026)
  - Backup off-site UEMOA à configurer avant S4
- **Prochaine révision** : Après 3 mois de production MVP (évaluation SLA réel)
- **Référence interne** : KOTIZ/ARCH/ADR-005
