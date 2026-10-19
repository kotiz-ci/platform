---
title: ADR-007 — RBAC éclaté en 8 rôles (SoD renforcée)
status: ACCEPTÉE
date: 2026-04-24
decision_makers:
  - Henoch Lonzo Koffi (Fondateur)
  - Desiré Kouadio (CTO)
related_adrs:
  - ADR-001 (Spring Boot — Spring Security)
supersedes: Plan Sécurité v1.0 §2.3 (5 rôles)
references:
  - Code/platform/docs/product/prd-mvp.md §10.3 (Séparation des fonctions)
classification: Confidentiel — Usage interne
---

# ADR-007 — RBAC éclaté en 8 rôles

## 1. Contexte

Le Plan Sécurité v1.0 (21 avril) définissait 5 rôles : USER, AGENT, **ADMIN**, PARTNER, SYSTEM.

Le PRD v1.1 §10.3 (validé 23 avril) exige la **séparation des fonctions (SoD)** avec 4 rôles admin distincts : **Ops, Risk, Finance, PO**. Cette exigence est une obligation BCEAO et une bonne pratique SOX-like pour les EME.

Le rôle unique `ADMIN` de v1.0 est **trop large** et viole SoD — il ne peut pas à la fois initier, approuver et réconcilier une opération.

**Divergence M13** identifiée dans l'audit Implementation Readiness.

## 2. Décision retenue

**8 rôles RBAC** avec permissions granulaires strictes.

### 2.1 Les 8 rôles

| Rôle                    | Description             | Acteur type                                      | MFA obligatoire                  |
| ----------------------- | ----------------------- | ------------------------------------------------ | -------------------------------- |
| **USER**                | Client final            | Fatou                                            | Non (PIN + OTP SMS)              |
| **AGENT**               | Agent terrain           | Moussa                                           | ✅ TOTP                          |
| **OPS** (ex ADMIN v1.0) | Admin Ops               | Ibrahima                                         | ✅ TOTP                          |
| **RISK** 🆕             | Admin Risque            | À recruter (V1) ou Henoch en transition          | ✅ TOTP                          |
| **FINANCE** 🆕          | Admin Finance           | À clarifier (Henoch en MVP ou comptable externe) | ✅ TOTP                          |
| **PO** 🆕               | Product Owner / CEO     | Henoch                                           | ✅ TOTP                          |
| **PARTNER**             | Système IMF ou assureur | Système tiers                                    | JWT + HMAC (pas MFA utilisateur) |
| **SYSTEM**              | Services internes       | Jobs / inter-modules                             | JWT service-to-service           |

### 2.2 Matrice de permissions SoD

| Action                             | USER              | AGENT        | **OPS**           | **RISK**           | **FINANCE**          | **PO**                             | PARTNER                    | SYSTEM |
| ---------------------------------- | ----------------- | ------------ | ----------------- | ------------------ | -------------------- | ---------------------------------- | -------------------------- | ------ |
| Lire/créer son compte épargne      | ✅                | —            | —                 | —                  | —                    | —                                  | —                          | —      |
| Créer client (KYC Tier 1)          | —                 | ✅           | —                 | —                  | —                    | —                                  | —                          | —      |
| Valider KYC Tier 2+                | —                 | —            | ✅                | —                  | —                    | —                                  | —                          | —      |
| Suspendre agent                    | —                 | —            | ✅ (motif requis) | ✅                 | —                    | —                                  | —                          | —      |
| Rédiger STR                        | —                 | —            | ✅                | —                  | —                    | —                                  | —                          | —      |
| Valider STR > 500k                 | —                 | —            | —                 | ✅ (obligatoire)   | —                    | —                                  | —                          | —      |
| Réconciliation MM ↔ wallet         | —                 | —            | —                 | —                  | ✅                   | —                                  | —                          | —      |
| Signer rapport BCEAO               | —                 | —            | —                 | —                  | ✅                   | —                                  | —                          | —      |
| Générer rapport BCEAO              | —                 | —            | ✅                | —                  | ✅                   | —                                  | —                          | —      |
| Modifier plafonds BCEAO            | —                 | —            | —                 | —                  | —                    | ✅ (+ audit log)                   | —                          | —      |
| Modifier poids Score               | —                 | —            | —                 | —                  | —                    | ✅ (+ audit log)                   | —                          | —      |
| Accès données cliente individuelle | N/A (ses données) | Ses clientes | ✅ (ticket)       | ✅ (investigation) | ✅ (audit financier) | ✅ (motif obligatoire + audit log) | ❌                         | ❌     |
| API partenaire (spécifique)        | —                 | —            | —                 | —                  | —                    | —                                  | ✅ (périmètre contractuel) | —      |
| Inter-services internes            | —                 | —            | —                 | —                  | —                    | —                                  | —                          | ✅     |

### 2.3 Règles SoD strictes (obligatoires)

- **Suspension AML > 500k FCFA** : OPS rédige, RISK valide (double signature dans `admin_str_reports.risk_validated_by`)
- **Modification plafond BCEAO** : seul PO peut proposer, audit-log obligatoire avec motif, revue mensuelle
- **Génération rapport BCEAO** : OPS ou FINANCE génère, seul FINANCE peut signer et envoyer
- **Accès PO aux données clientes individuelles** : `motif` obligatoire (pas d'option défaut), loggé dans `core_audit_logs.payload.access_reason`

### 2.4 Implémentation Spring Security

Spring Security avec annotations granulaires :

```java
@PreAuthorize("hasRole('OPS')")
public KycDecision validateKycTier2(UUID kycId, ...) { ... }

@PreAuthorize("hasRole('RISK') or (hasRole('OPS') and #amount < 500_000_00)")
public void suspendCompanyAml(UUID userId, long amountCents, ...) { ... }

@PreAuthorize("hasRole('FINANCE')")
public void signAndSendBceaoReport(UUID reportId) { ... }

@PreAuthorize("hasRole('PO')")
@AuditLog(reason = "#reason")  // motif obligatoire
public ClientFile accessClientData(UUID userId, String reason) { ... }
```

### 2.5 Impact sur l'ERD (cf. ERD v2 §2.2)

Table `core_roles` mise à jour avec les 8 rôles + colonnes `is_admin_role` (true pour OPS/RISK/FINANCE/PO) et `requires_mfa` (true pour tous sauf USER).

## 3. Conséquences

### 3.1 Positives

- Conformité SoD (obligation BCEAO + SOX-like)
- Traçabilité renforcée (chaque action admin est associée à un rôle précis)
- Mitigation des risques internes (fraude, erreur humaine)
- Clarté des responsabilités côté équipe KOTIZ

### 3.2 Contraintes

- 4 rôles admin distincts à pourvoir en équipe — pour le MVP, certains peuvent être cumulés temporairement :
  - **Ibrahima** = OPS (dédié)
  - **Henoch** = PO + **transitoirement RISK + FINANCE** (jusqu'au recrutement V1, avec audit log strict)
- Nécessite une discipline de connexion avec le bon rôle (si Henoch cumule 3 rôles, il doit se connecter avec le rôle pertinent par action)
- Formation obligatoire de l'équipe sur la matrice SoD

### 3.3 Risques

| Risque                                                                              | Probabilité  | Impact | Mitigation                                                                           |
| ----------------------------------------------------------------------------------- | ------------ | ------ | ------------------------------------------------------------------------------------ |
| Cumul de rôles PO+RISK+FINANCE en personne unique (Henoch) annule partiellement SoD | Élevée (MVP) | Moyen  | Audit log systématique + revue mensuelle + recrutement RISK + FINANCE en V1 priorité |
| Erreur de configuration Spring Security → privilege escalation                      | Faible       | Élevé  | Tests d'accès exhaustifs dans CI/CD + revue de code obligatoire sur `@PreAuthorize`  |
| Complexification des tests E2E par rôle                                             | Moyenne      | Faible | Fixture de tests par rôle (Testcontainers)                                           |

## 4. Statut et révision

- **Statut** : ACCEPTÉE
- **Date** : 24 avril 2026
- **Actions** :
  - Desiré implémente les 8 rôles dans `SecurityConfig.java` au sprint 1 (Epic 3)
  - Henoch acte le cumul temporaire de rôles PO+RISK+FINANCE avec audit logs
  - Recrutement RISK + FINANCE dédiés en priorité V1 (post-MVP)
- **Prochaine révision** : Sprint 4 (avant le pilote pour vérifier SoD en fonctionnement réel)
- **Référence** : KOTIZ/ARCH/ADR-007
