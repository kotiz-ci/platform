---
title: KOTIZ — ERD (Modèle de données commenté)
subtitle: Schéma relationnel et dictionnaire de données
version: 2.0
date: 2026-04-24
status: ACTIVE (remplace KOTIZ_ERD.docx v1.0 du 21 avril 2026)
authors:
  - Desiré Kouadio (CTO)
  - Henoch Lonzo Koffi (Fondateur, PO)
inputs_v2:
  - docs/product/prd-mvp.md
  - KOTIZ/_archive/2026-bmad/_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-23.md
changes_v2:
  - D1 scoring_scores étendue (star_rating + tier_label + numeric_score 0-1000)
  - G7 health_subscriptions.subscription_channel + cancellation_deadline (bundle J+1)
  - G8 health_subscriptions signature électronique (consent_signed_at/ip/hash/version)
  - G9 nouvelles tables core_referrals + core_inactivity_events
  - M16 nouvelle table core_consents + core_data_export_requests (RGPD)
  - D4 unité prime Santé clarifiée (weekly_premium_cents conservé + helper UI)
  - Ajout tables savings_goals (verrouillage + streak)
  - Ajout tables scoring_tier_benefits
  - Ajout tables admin_str_reports (STR CENTIF)
classification: Confidentiel — Usage interne
---

# KOTIZ — ERD (Modèle de données commenté) v2

## 1. Principes de modélisation (inchangés)

### 1.1 Conventions de nommage

- **Tables** : snake_case, préfixées par module (ex : `savings_transactions`, `agents_kyc_documents`)
- **Clés primaires** : UUID v4 (colonne `id`) — jamais d'entiers auto-incrémentés
- **Clés étrangères** : suffixe `_id` (ex : `user_id`, `plan_id`)
- **Colonnes temporelles** : `created_at` / `updated_at` / `deleted_at` (soft delete) partout
- **Colonnes audit** : `created_by`, `updated_by` (UUID de l'utilisateur)
- **Colonnes montants** : BIGINT en centimes FCFA (1 000 FCFA = 100 000 centimes) — jamais FLOAT
- **Colonnes sensibles** : chiffrées avec pgcrypto AES-256 (NIU, IBAN, biométrie, secrets TOTP, **hash consentement**)

### 1.2 Modules et tables (v2 — 38 tables, vs 21 en v1)

| Table                            | Module        | Description                                                                         | Statut v2                  |
| -------------------------------- | ------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| core_users                       | core          | Comptes utilisateurs                                                                | ✅ v1                      |
| core_roles                       | core          | 8 rôles système (USER, AGENT, OPS, RISK, FINANCE, PO, PARTNER, SYSTEM)              | 🔄 **mis à jour M13**      |
| core_user_roles                  | core          | Association user-rôle (many-to-many)                                                | ✅ v1                      |
| core_audit_logs                  | core          | Journal d'audit immuable                                                            | ✅ v1                      |
| core_notifications               | core          | File d'attente des notifications                                                    | ✅ v1                      |
| **core_consents** 🆕             | core          | **Consentements RGPD (horodatés, versionnés)**                                      | 🆕 **v2 (M16)**            |
| **core_data_export_requests** 🆕 | core          | **Demandes d'export de données personnelles RGPD**                                  | 🆕 **v2 (M16)**            |
| **core_referrals** 🆕            | core          | **Parrainages avec tracking bonus**                                                 | 🆕 **v2 (G9)**             |
| **core_inactivity_events** 🆕    | core          | **Détection inactivité 3 j pour anti-churn**                                        | 🆕 **v2 (G9)**             |
| savings_plans                    | savings       | Plans d'épargne                                                                     | ✅ v1                      |
| savings_accounts                 | savings       | Comptes d'épargne                                                                   | ✅ v1                      |
| savings_transactions             | savings       | Dépôts / retraits / intérêts                                                        | ✅ v1                      |
| savings_ledger_entries           | savings       | Ledger double-entrée immuable                                                       | ✅ v1                      |
| **savings_goals** 🆕             | savings       | **Objectifs nommés (max 3 par user, verrouillage optionnel)**                       | 🆕 **v2 (FR-EP-02/03)**    |
| **savings_streak_badges** 🆕     | savings       | **Badges streak 7/30/90 jours**                                                     | 🆕 **v2 (FR-EP-05)**       |
| agents_profiles                  | agents        | Profils des agents                                                                  | ✅ v1                      |
| agents_zones                     | agents        | Zones géographiques                                                                 | ✅ v1                      |
| agents_kyc_documents             | agents        | Documents KYC clients                                                               | ✅ v1                      |
| agents_commissions               | agents        | Commissions par période                                                             | ✅ v1                      |
| health_plans                     | health        | 3 formules CIMA (Famille/Confort/Premium)                                           | ✅ v1                      |
| health_subscriptions             | health        | **Souscriptions + bundle_channel + signature électronique + cancellation_deadline** | 🔄 **mis à jour G7+G8+D4** |
| health_claims                    | health        | Déclarations de sinistres (MVP manuel)                                              | ✅ v1                      |
| scoring_scores                   | scoring       | **Scores avec star_rating + tier_label + numeric_score 0-1000**                     | 🔄 **mis à jour D1**       |
| scoring_signals                  | scoring       | Signaux comportementaux                                                             | ✅ v1                      |
| **scoring_tier_benefits** 🆕     | scoring       | **Avantages débloqués par palier étoile + historique d'activation**                 | 🆕 **v2 (FR-SC-04)**       |
| wa_sessions                      | wa            | Sessions de conversation WhatsApp                                                   | ✅ v1                      |
| wa_message_log                   | wa            | Journal des messages WhatsApp                                                       | ✅ v1                      |
| **wa_voice_transcripts** 🆕      | wa            | **Transcriptions vocales entrantes (TTL 24h)**                                      | 🆕 **v2 (G10)**            |
| payments_orders                  | payments      | Ordres de paiement                                                                  | ✅ v1                      |
| payments_callbacks               | payments      | Webhooks opérateurs                                                                 | ✅ v1                      |
| **notifications_recap_jobs** 🆕  | notifications | **Jobs recap hebdo partageable (FR-VI-03)**                                         | 🆕 **v2 (G9)**             |
| **admin_str_reports** 🆕         | admin         | **STR CENTIF-CI — rédaction + envoi + archivage 10 ans**                            | 🆕 **v2 (FR-AD-02)**       |
| **admin_kyc_tier2_queue** 🆕     | admin         | **File des dossiers KYC Tier 2+ en attente**                                        | 🆕 **v2 (FR-AD-01)**       |

**Total : 38 tables (vs 21 en v1.0).**

## 2. Module CORE

### 2.1 core_users (inchangé v1)

Cf. ERD v1.0 §2.1 — structure conservée.

### 2.2 core_roles (mis à jour M13)

| Colonne       | Type         | Contrainte             | Description                                                        |
| ------------- | ------------ | ---------------------- | ------------------------------------------------------------------ |
| id            | UUID         | PK                     | Identifiant                                                        |
| code          | VARCHAR(20)  | UNIQUE, NOT NULL       | **USER, AGENT, OPS, RISK, FINANCE, PO, PARTNER, SYSTEM** (8 rôles) |
| name          | VARCHAR(100) | NOT NULL               | Libellé lisible                                                    |
| description   | TEXT         | NULL                   | Description des permissions                                        |
| is_admin_role | BOOLEAN      | NOT NULL DEFAULT false | True pour OPS, RISK, FINANCE, PO                                   |
| requires_mfa  | BOOLEAN      | NOT NULL DEFAULT false | True pour tous sauf USER                                           |
| created_at    | TIMESTAMPTZ  | NOT NULL DEFAULT now() | —                                                                  |

**Permissions associées** : définies dans `application.yml` ou table `core_role_permissions` (v3). Pour MVP, hard-coded dans `SecurityConfig.java`.

### 2.3 core_audit_logs (inchangé v1)

Cf. ERD v1.0 §2.2.

### 2.4 **core_consents** 🆕 (RGPD — M16)

Table immuable des consentements RGPD. Chaque action de consentement (inscription, souscription Santé, parrainage) est horodatée et versionnée.

| Colonne             | Type        | Contrainte                  | Description                                                         |
| ------------------- | ----------- | --------------------------- | ------------------------------------------------------------------- |
| id                  | UUID        | PK                          | —                                                                   |
| user_id             | UUID        | FK core_users.id, NOT NULL  | Utilisateur concerné                                                |
| consent_type        | VARCHAR(50) | NOT NULL                    | CGU_INSCRIPTION, SANTE_SOUSCRIPTION, MARKETING, PARRAINAGE_CONTACTS |
| granted             | BOOLEAN     | NOT NULL                    | true = accepté, false = retiré                                      |
| consent_version     | VARCHAR(20) | NOT NULL                    | Version du document (ex : CGU_1.0)                                  |
| consent_hash        | BYTEA       | NOT NULL                    | Hash SHA-256 du document consenti (preuve)                          |
| ip_address          | INET        | NULL                        | IP au moment du consentement                                        |
| user_agent          | TEXT        | NULL                        | User agent (app version, device)                                    |
| method              | VARCHAR(30) | NOT NULL                    | APP, AGENT_ONBOARDING, WHATSAPP, WEB                                |
| granted_by_agent_id | UUID        | FK agents_profiles.id, NULL | Si consentement via agent                                           |
| created_at          | TIMESTAMPTZ | NOT NULL DEFAULT now()      | Date du consentement (immuable)                                     |

**Règle RLS** : aucune modification ou suppression autorisée (trigger PostgreSQL). Rétention 10 ans post-relation.

### 2.5 **core_data_export_requests** 🆕 (RGPD — M16)

Table des demandes d'export de données personnelles (droit d'accès RGPD). Délai cible ≤ 30 j.

| Colonne      | Type        | Contrainte                 | Description                              |
| ------------ | ----------- | -------------------------- | ---------------------------------------- |
| id           | UUID        | PK                         | —                                        |
| user_id      | UUID        | FK core_users.id, NOT NULL | Utilisateur demandeur                    |
| status       | VARCHAR(20) | NOT NULL DEFAULT 'PENDING' | PENDING, PROCESSING, COMPLETED, REJECTED |
| requested_at | TIMESTAMPTZ | NOT NULL DEFAULT now()     | —                                        |
| completed_at | TIMESTAMPTZ | NULL                       | —                                        |
| export_url   | TEXT        | NULL                       | Lien MinIO signé (TTL 48h)               |
| processed_by | UUID        | FK core_users.id, NULL     | Admin ayant traité                       |
| notes        | TEXT        | NULL                       | Motif si rejeté                          |

### 2.6 **core_referrals** 🆕 (viralité — G9)

Table des parrainages Score Booster (FR-VI-01). Suit le cycle : invité → inscrit → 1er dépôt → bonus crédité.

| Colonne            | Type        | Contrainte                 | Description                                          |
| ------------------ | ----------- | -------------------------- | ---------------------------------------------------- |
| id                 | UUID        | PK                         | —                                                    |
| referrer_id        | UUID        | FK core_users.id, NOT NULL | Parraine (Fatou)                                     |
| referred_id        | UUID        | FK core_users.id, NULL     | Filleule (Awa) — null tant que pas inscrite          |
| referral_code      | VARCHAR(30) | UNIQUE, NOT NULL           | Code unique trackable (ex : FATOU-X7K2)              |
| invited_at         | TIMESTAMPTZ | NOT NULL DEFAULT now()     | Date d'envoi de l'invitation                         |
| registered_at      | TIMESTAMPTZ | NULL                       | Date d'inscription de la filleule                    |
| first_deposit_at   | TIMESTAMPTZ | NULL                       | Date du 1er dépôt filleule                           |
| deadline_at        | TIMESTAMPTZ | NOT NULL                   | Date limite (invited_at + 7 j)                       |
| bonus_applied      | BOOLEAN     | NOT NULL DEFAULT false     | True si +5 pts Score crédités aux 2                  |
| bonus_applied_at   | TIMESTAMPTZ | NULL                       | Date d'application du bonus                          |
| is_dual_onboarding | BOOLEAN     | NOT NULL DEFAULT false     | True si onboarding à deux (FR-VI-02, bonus 200 FCFA) |
| created_at         | TIMESTAMPTZ | NOT NULL DEFAULT now()     | —                                                    |

**Index** : `referrer_id, deadline_at` (détecter parrainages expirés), `referral_code` UNIQUE.

### 2.7 **core_inactivity_events** 🆕 (anti-churn — G9)

Table des détections d'inactivité 3 j (FR-RE-01). Alimente les push vocaux WhatsApp + alertes agent.

| Colonne           | Type        | Contrainte                 | Description                                   |
| ----------------- | ----------- | -------------------------- | --------------------------------------------- |
| id                | UUID        | PK                         | —                                             |
| user_id           | UUID        | FK core_users.id, NOT NULL | —                                             |
| detected_at       | TIMESTAMPTZ | NOT NULL                   | Date de détection (00h00 J+3)                 |
| days_inactive     | SMALLINT    | NOT NULL                   | 3, 7, 14, 30 (paliers escalade)               |
| last_deposit_at   | TIMESTAMPTZ | NULL                       | Date du dernier dépôt                         |
| push_sent_at      | TIMESTAMPTZ | NULL                       | Date d'envoi push vocal WhatsApp              |
| agent_notified_at | TIMESTAMPTZ | NULL                       | Date de notification agent                    |
| recovered_at      | TIMESTAMPTZ | NULL                       | Date de reprise (1er dépôt après alerte)      |
| escalated_at      | TIMESTAMPTZ | NULL                       | Date d'escalade (si pas de reprise après 7 j) |

**Index** : `user_id, detected_at DESC`.

## 3. Module SAVINGS (Epargne)

### 3.1 savings_accounts (inchangé v1)

Cf. ERD v1.0 §3.1.

### 3.2 savings_ledger_entries (inchangé v1)

Cf. ERD v1.0 §3.2. Ledger immuable double-entrée PostgreSQL.

### 3.3 **savings_goals** 🆕 (FR-EP-02/03)

Objectifs nommés d'épargne. Max 3 actifs simultanés par utilisateur. Verrouillage optionnel jusqu'à date cible.

| Colonne                      | Type         | Contrainte                       | Description                                                              |
| ---------------------------- | ------------ | -------------------------------- | ------------------------------------------------------------------------ |
| id                           | UUID         | PK                               | —                                                                        |
| user_id                      | UUID         | FK core_users.id, NOT NULL       | —                                                                        |
| account_id                   | UUID         | FK savings_accounts.id, NOT NULL | Compte associé                                                           |
| name                         | VARCHAR(100) | NOT NULL                         | Nom de l'objectif (ex : « École des enfants »)                           |
| target_amount_cents          | BIGINT       | NOT NULL, CHECK > 0              | Montant cible                                                            |
| accumulated_amount_cents     | BIGINT       | NOT NULL DEFAULT 0               | Montant accumulé                                                         |
| target_date                  | DATE         | NULL                             | Date cible optionnelle                                                   |
| is_locked                    | BOOLEAN      | NOT NULL DEFAULT false           | Verrouillé jusqu'à target_date                                           |
| locked_until                 | DATE         | NULL                             | Date de déverrouillage                                                   |
| early_unlock_penalty_applied | BOOLEAN      | NOT NULL DEFAULT false           | True si malus Score appliqué                                             |
| status                       | VARCHAR(20)  | NOT NULL DEFAULT 'ACTIVE'        | ACTIVE, COMPLETED, CANCELLED                                             |
| emotional_anchor_url         | TEXT         | NULL                             | URL MinIO d'une photo uploadée (ancrage émotionnel pour anti-churn — P7) |
| created_at                   | TIMESTAMPTZ  | NOT NULL DEFAULT now()           | —                                                                        |
| updated_at                   | TIMESTAMPTZ  | NOT NULL DEFAULT now()           | —                                                                        |
| completed_at                 | TIMESTAMPTZ  | NULL                             | —                                                                        |

**Contrainte** : trigger PostgreSQL pour empêcher > 3 objectifs ACTIVE par `user_id`.
**Index** : `user_id, status`.

### 3.4 **savings_streak_badges** 🆕 (FR-EP-05)

Badges attribués pour les séries 7 / 30 / 90 jours consécutifs de dépôt ≥ 100 FCFA.

| Colonne            | Type        | Contrainte                 | Description                        |
| ------------------ | ----------- | -------------------------- | ---------------------------------- |
| id                 | UUID        | PK                         | —                                  |
| user_id            | UUID        | FK core_users.id, NOT NULL | —                                  |
| streak_length_days | SMALLINT    | NOT NULL                   | 7, 30, 90                          |
| bonus_score_points | SMALLINT    | NOT NULL                   | +5, +15, +30                       |
| earned_at          | TIMESTAMPTZ | NOT NULL DEFAULT now()     | —                                  |
| notified_at        | TIMESTAMPTZ | NULL                       | Date d'envoi notification WhatsApp |

## 4. Module AGENTS (inchangé v1)

Cf. ERD v1.0 §4. Aucun changement structurel.

## 5. Module HEALTH (Micro-assurance santé) — MIS À JOUR

### 5.1 health_plans (inchangé v1)

Cf. ERD v1.0 §5.1. 3 formules : Famille / Confort / Premium.

**Note conversion UI (D4)** : `weekly_premium_cents` stocké (ex : 35 000 centimes = 350 FCFA/semaine pour Famille). Affichage UI côté client en « /jour » (divisé par 7 = 50 FCFA/j). Affichage côté agent en « /semaine » pour cohérence avec prélèvement. Helper utilitaire `FormulaDisplayService` centralise la conversion.

### 5.2 health_subscriptions (mis à jour G7 + G8)

| Colonne                      | Type            | Contrainte                   | Description                                                  |
| ---------------------------- | --------------- | ---------------------------- | ------------------------------------------------------------ |
| id                           | UUID            | PK                           | = numéro de police                                           |
| user_id                      | UUID            | FK core_users.id, NOT NULL   | Assuré principal                                             |
| plan_id                      | UUID            | FK health_plans.id, NOT NULL | Formule souscrite                                            |
| status                       | VARCHAR(20)     | NOT NULL DEFAULT 'ACTIVE'    | ACTIVE, SUSPENDED, TERMINATED, EXPIRED, **CANCELLED_24H**    |
| **subscription_channel** 🆕  | **VARCHAR(30)** | **NOT NULL**                 | **BUNDLE_J1, AUTONOMOUS, UPSELL, AGENT_PROPOSED (cf. G7)**   |
| **cancellation_deadline** 🆕 | **TIMESTAMPTZ** | **NULL**                     | **Date limite de rétractation 24h (seulement si BUNDLE_J1)** |
| start_date                   | DATE            | NOT NULL                     | Date d'effet de la couverture (J+1 si bundle)                |
| end_date                     | DATE            | NULL                         | —                                                            |
| persons_covered              | SMALLINT        | NOT NULL DEFAULT 1           | —                                                            |
| weekly_premium_cents         | BIGINT          | NOT NULL                     | Prime hebdomadaire appliquée                                 |
| discount_applied_pct         | NUMERIC(5,2)    | NOT NULL DEFAULT 0           | Réduction (ex : 10 pour -10 % bundle Score ≥ 4⭐)            |
| consecutive_failures         | SMALLINT        | NOT NULL DEFAULT 0           | Nombre d'échecs prélèvement (2 = suspension)                 |
| last_premium_paid_at         | TIMESTAMPTZ     | NULL                         | Dernier prélèvement réussi                                   |
| attestation_sent_at          | TIMESTAMPTZ     | NULL                         | Date envoi attestation WA + SMS                              |
| **consent_signed_at** 🆕     | **TIMESTAMPTZ** | **NOT NULL**                 | **Date de signature électronique (G8)**                      |
| **consent_ip** 🆕            | **INET**        | **NOT NULL**                 | **IP au moment de la signature**                             |
| **consent_hash** 🆕          | **BYTEA**       | **NOT NULL**                 | **Hash SHA-256 des conditions particulières signées**        |
| **consent_version** 🆕       | **VARCHAR(20)** | **NOT NULL**                 | **Version du document CGU/CP signé (ex : CP_FAMILLE_1.0)**   |
| created_at                   | TIMESTAMPTZ     | NOT NULL DEFAULT now()       | —                                                            |
| updated_at                   | TIMESTAMPTZ     | NOT NULL DEFAULT now()       | —                                                            |

**Workflow bundle J+1 (nouveau) :**

1. Souscription créée avec `subscription_channel = BUNDLE_J1`, `status = ACTIVE`, `cancellation_deadline = now() + 24h`.
2. Prime prélevée après `cancellation_deadline` (pas avant).
3. Si cliente annule avant `cancellation_deadline` : `status = CANCELLED_24H`, aucun prélèvement, pas de pénalité Score.

**Index** : `user_id, status`, `subscription_channel, cancellation_deadline` (pour le scheduler de prélèvement J+1).

### 5.3 health_claims (inchangé v1)

Cf. ERD v1.0 §5.3.

## 6. Module WA (WhatsApp Bot) — MIS À JOUR

### 6.1 wa_sessions (inchangé v1)

Cf. ERD v1.0 §6.1. Enrichissement `flow_type` pour inclure nouveaux intents : `PARRAINAGE`, `RECAP`, `VOCAL_ON_OFF`.

### 6.2 wa_message_log (inchangé v1)

Cf. ERD v1.0 §6.2.

### 6.3 **wa_voice_transcripts** 🆕 (G10)

Stockage des transcriptions des messages vocaux entrants (pour audit + ré-analyse). Audio source supprimé après 24h (respect vie privée).

| Colonne           | Type         | Contrainte                      | Description                                     |
| ----------------- | ------------ | ------------------------------- | ----------------------------------------------- |
| id                | UUID         | PK                              | —                                               |
| message_log_id    | UUID         | FK wa_message_log.id, NOT NULL  | Message vocal source                            |
| user_id           | UUID         | FK core_users.id, NULL          | —                                               |
| audio_minio_key   | VARCHAR(255) | NULL                            | Clé MinIO (effacée à H+24)                      |
| transcript_text   | TEXT         | NOT NULL                        | Transcription texte                             |
| language_detected | VARCHAR(10)  | NOT NULL                        | `fr`, `dyu` (dioula), etc.                      |
| confidence_score  | NUMERIC(3,2) | NULL                            | Confiance STT (0.00-1.00)                       |
| stt_provider      | VARCHAR(30)  | NOT NULL DEFAULT 'GOOGLE_CLOUD' | —                                               |
| stt_cost_cents    | SMALLINT     | NOT NULL DEFAULT 0              | Coût STT en centimes FCFA (pour monitoring CAC) |
| created_at        | TIMESTAMPTZ  | NOT NULL DEFAULT now()          | —                                               |
| audio_deleted_at  | TIMESTAMPTZ  | NULL                            | Date de suppression audio (H+24)                |

## 7. Module SCORING — RÉÉCRIT D1

### 7.1 scoring_scores (mis à jour D1)

**Table réécrite pour supporter le modèle 5 étoiles** (cf. ADR-003).

| Colonne              | Type            | Contrainte                                       | Description                                                                           |
| -------------------- | --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| id                   | UUID            | PK                                               | —                                                                                     |
| user_id              | UUID            | FK core_users.id, NOT NULL, UNIQUE               | 1 ligne active par user (historique dans `scoring_history`)                           |
| **numeric_score**    | **SMALLINT**    | **NOT NULL DEFAULT 0, CHECK BETWEEN 0 AND 1000** | **Score numérique sous-jacent (exposé uniquement à l'API partenaires IMF/assureurs)** |
| **star_rating**      | **SMALLINT**    | **NOT NULL DEFAULT 1, CHECK BETWEEN 1 AND 5**    | **1 à 5 étoiles (exposé UI client)**                                                  |
| **tier_label**       | **VARCHAR(30)** | **NOT NULL DEFAULT 'Débutante'**                 | **Débutante / Régulière / Fiable / Confirmée / Premium**                              |
| regularity_score     | SMALLINT        | NOT NULL DEFAULT 0                               | Composante régularité (poids 40 %)                                                    |
| stability_score      | SMALLINT        | NOT NULL DEFAULT 0                               | Composante stabilité (poids 25 %)                                                     |
| seniority_score      | SMALLINT        | NOT NULL DEFAULT 0                               | Composante ancienneté (poids 20 %)                                                    |
| engagement_score     | SMALLINT        | NOT NULL DEFAULT 0                               | Composante engagement multi-canal (poids 15 %)                                        |
| last_calculated_at   | TIMESTAMPTZ     | NOT NULL DEFAULT now()                           | Date du dernier calcul nocturne                                                       |
| previous_star_rating | SMALLINT        | NULL                                             | Étoile précédente (pour détecter franchissement palier)                               |
| next_tier_threshold  | SMALLINT        | NULL                                             | Points manquants pour le prochain palier (affichage UI)                               |
| created_at           | TIMESTAMPTZ     | NOT NULL DEFAULT now()                           | —                                                                                     |
| updated_at           | TIMESTAMPTZ     | NOT NULL DEFAULT now()                           | —                                                                                     |

**Seuils étoiles (constants applicatifs) :**

```
0-200   → 1⭐ Débutante
201-400 → 2⭐ Régulière
401-600 → 3⭐ Fiable
601-800 → 4⭐ Confirmée
801-1000 → 5⭐ Premium
```

### 7.2 scoring_signals (inchangé v1)

### 7.3 **scoring_tier_benefits** 🆕 (FR-SC-04)

Table des avantages débloqués par palier étoile + historique d'activation.

| Colonne      | Type        | Contrainte                      | Description                                                                                                          |
| ------------ | ----------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| id           | UUID        | PK                              | —                                                                                                                    |
| user_id      | UUID        | FK core_users.id, NOT NULL      | —                                                                                                                    |
| star_tier    | SMALLINT    | NOT NULL, CHECK BETWEEN 1 AND 5 | Palier déclencheur                                                                                                   |
| benefit_code | VARCHAR(50) | NOT NULL                        | RECAP_VOCAL (2⭐), PHONE_CONSULTATION (3⭐), HEALTH_DISCOUNT_10 (4⭐), CREDIT_PRIORITY (5⭐), TERRAIN_ELIGIBLE (5⭐) |
| activated_at | TIMESTAMPTZ | NOT NULL DEFAULT now()          | —                                                                                                                    |
| notified_at  | TIMESTAMPTZ | NULL                            | Date notification WhatsApp                                                                                           |
| used_at      | TIMESTAMPTZ | NULL                            | Date d'utilisation effective (ex : 1ère consultation tel)                                                            |
| status       | VARCHAR(20) | NOT NULL DEFAULT 'ACTIVE'       | ACTIVE, EXPIRED, REVOKED (si score redescend palier)                                                                 |

## 8. Module PAYMENTS (inchangé v1)

Cf. ERD v1.0 §7. `payments_orders` + `payments_callbacks` conservés intacts. **Idempotency_key UNIQUE** validée.

## 9. Module NOTIFICATIONS — MIS À JOUR G9

### 9.1 **notifications_recap_jobs** 🆕 (FR-VI-03)

Jobs de génération des recaps hebdo partageables (chaque vendredi 19h).

| Colonne                | Type         | Contrainte                 | Description                                    |
| ---------------------- | ------------ | -------------------------- | ---------------------------------------------- |
| id                     | UUID         | PK                         | —                                              |
| user_id                | UUID         | FK core_users.id, NOT NULL | —                                              |
| week_start_date        | DATE         | NOT NULL                   | Lundi de la semaine couverte                   |
| savings_amount_cents   | BIGINT       | NOT NULL DEFAULT 0         | Montant épargné cette semaine                  |
| star_rating_snapshot   | SMALLINT     | NOT NULL                   | Étoiles à la date du recap                     |
| streak_days_snapshot   | SMALLINT     | NOT NULL                   | Streak à la date du recap                      |
| main_goal_progress_pct | NUMERIC(5,2) | NULL                       | % progression objectif principal               |
| image_minio_key        | VARCHAR(255) | NULL                       | Clé MinIO de la carte PNG générée              |
| sent_at                | TIMESTAMPTZ  | NULL                       | Date d'envoi WhatsApp                          |
| shared_by_user         | BOOLEAN      | NOT NULL DEFAULT false     | True si bouton « Partager mes étoiles » cliqué |
| shared_at              | TIMESTAMPTZ  | NULL                       | —                                              |
| created_at             | TIMESTAMPTZ  | NOT NULL DEFAULT now()     | —                                              |

**Index** : `user_id, week_start_date DESC`.

## 10. Module ADMIN — MIS À JOUR (FR-AD-01 + FR-AD-02)

### 10.1 **admin_kyc_tier2_queue** 🆕 (FR-AD-01)

File d'attente des dossiers KYC Tier 2+ routés vers Ibrahima.

| Colonne        | Type        | Contrainte                 | Description                                            |
| -------------- | ----------- | -------------------------- | ------------------------------------------------------ |
| id             | UUID        | PK                         | —                                                      |
| user_id        | UUID        | FK core_users.id, NOT NULL | Cliente concernée                                      |
| trigger_reason | VARCHAR(50) | NOT NULL                   | WALLET_LIMIT_EXCEEDED, HIGH_VOLUME, MANUAL_ESCALATION  |
| triggered_at   | TIMESTAMPTZ | NOT NULL DEFAULT now()     | —                                                      |
| assigned_to    | UUID        | FK core_users.id, NULL     | Admin OPS ayant pris le dossier                        |
| status         | VARCHAR(20) | NOT NULL DEFAULT 'PENDING' | PENDING, IN_REVIEW, APPROVED, REJECTED, DOCS_REQUESTED |
| priority       | SMALLINT    | NOT NULL DEFAULT 2         | 1 = urgent, 2 = normal, 3 = bas                        |
| decided_at     | TIMESTAMPTZ | NULL                       | —                                                      |
| decision_notes | TEXT        | NULL                       | Motif de décision (si REJECTED / DOCS_REQUESTED)       |
| sla_breach     | BOOLEAN     | NOT NULL DEFAULT false     | True si décision > 24h après triggered_at              |

**Index** : `status, triggered_at` (tri par ancienneté pour éviter le SLA breach).

### 10.2 **admin_str_reports** 🆕 (FR-AD-02 — STR CENTIF-CI ≤ 24h)

Table des Suspicious Transaction Reports rédigés et envoyés à CENTIF-CI. Rétention 10 ans.

| Colonne                   | Type         | Contrainte                  | Description                                                        |
| ------------------------- | ------------ | --------------------------- | ------------------------------------------------------------------ |
| id                        | UUID         | PK                          | —                                                                  |
| detected_at               | TIMESTAMPTZ  | NOT NULL                    | Date de détection de l'alerte AML                                  |
| subject_user_id           | UUID         | FK core_users.id, NOT NULL  | Cliente suspecte                                                   |
| subject_agent_id          | UUID         | FK agents_profiles.id, NULL | Agent impliqué (si applicable)                                     |
| drafted_by                | UUID         | FK core_users.id, NOT NULL  | OPS ayant rédigé                                                   |
| risk_validated_by         | UUID         | FK core_users.id, NULL      | RISK ayant validé (obligatoire si > 500k FCFA)                     |
| pattern_detected          | VARCHAR(100) | NOT NULL                    | Ex : MULTIPLE_CASH_IN_100K_1H, SANCTIONS_LIST_MATCH                |
| total_amount_cents        | BIGINT       | NOT NULL, CHECK > 0         | Montant suspect cumulé                                             |
| str_narrative             | TEXT         | NOT NULL                    | Texte du STR (template pré-rempli + édition)                       |
| attachments_count         | SMALLINT     | NOT NULL DEFAULT 0          | Nombre de pièces jointes MinIO                                     |
| submitted_to_centif_at    | TIMESTAMPTZ  | NULL                        | Date envoi CENTIF-CI                                               |
| centif_acknowledgment_ref | VARCHAR(100) | NULL                        | Référence d'accusé de réception CENTIF                             |
| sla_respected             | BOOLEAN      | NOT NULL                    | True si `submitted_to_centif_at ≤ detected_at + 24h` (NFR-COMP-02) |
| status                    | VARCHAR(20)  | NOT NULL DEFAULT 'DRAFT'    | DRAFT, PENDING_RISK_REVIEW, SENT, ACKNOWLEDGED, ARCHIVED           |
| created_at                | TIMESTAMPTZ  | NOT NULL DEFAULT now()      | —                                                                  |
| archived_until            | DATE         | NOT NULL                    | created_at + 10 ans (rétention légale)                             |

**Règle RLS** : aucune modification ou suppression avant `archived_until` (trigger PostgreSQL).
**Index** : `detected_at DESC`, `subject_user_id`, `status`.

## 11. Index et performance (enrichi)

| Table                      | Colonnes indexées                               | Type                 | Justification                        |
| -------------------------- | ----------------------------------------------- | -------------------- | ------------------------------------ |
| core_users                 | phone_number                                    | UNIQUE B-TREE        | Connexion par téléphone              |
| core_audit_logs            | actor_id, created_at                            | B-TREE composite     | Filtrage logs                        |
| **core_referrals**         | **referral_code**                               | **UNIQUE B-TREE**    | **Tracking invitations**             |
| **core_referrals**         | **referrer_id, deadline_at**                    | **B-TREE composite** | **Parrainages expirés**              |
| **core_inactivity_events** | **user_id, detected_at DESC**                   | **B-TREE composite** | **Anti-churn**                       |
| savings_transactions       | account_id, created_at                          | B-TREE composite     | Historique                           |
| savings_ledger_entries     | transaction_id                                  | B-TREE               | Lookup                               |
| **savings_goals**          | **user_id, status**                             | **B-TREE composite** | **Objectifs actifs**                 |
| agents_profiles            | agent_code                                      | UNIQUE B-TREE        | Lookup agent                         |
| payments_orders            | idempotency_key                                 | UNIQUE B-TREE        | Idempotence                          |
| payments_orders            | user_id, status, created_at                     | B-TREE composite     | Historique                           |
| scoring_signals            | user_id, created_at                             | B-TREE composite     | Agrégation                           |
| **scoring_scores**         | **star_rating, numeric_score**                  | **B-TREE composite** | **Distribution étoiles (analytics)** |
| **scoring_tier_benefits**  | **user_id, status, activated_at**               | **B-TREE composite** | **Avantages actifs**                 |
| health_subscriptions       | user_id, status                                 | B-TREE composite     | Police active                        |
| **health_subscriptions**   | **subscription_channel, cancellation_deadline** | **B-TREE composite** | **Scheduler prélèvement J+1**        |
| health_claims              | subscription_id, status                         | B-TREE composite     | Sinistres en attente                 |
| wa_sessions                | user_id, state, expires_at                      | B-TREE composite     | Session active                       |
| wa_message_log             | wa_phone_number, created_at                     | B-TREE composite     | Historique messages                  |
| **admin_kyc_tier2_queue**  | **status, triggered_at**                        | **B-TREE composite** | **SLA 24h**                          |
| **admin_str_reports**      | **detected_at DESC**                            | **B-TREE**           | **Dashboard AML**                    |

## 12. Stratégie de migration (inchangée)

Migrations Flyway. Cf. ERD v1.0 §9.

**Ajout v2** : les nouvelles tables (core_consents, core_data_export_requests, core_referrals, core_inactivity_events, savings_goals, savings_streak_badges, scoring_tier_benefits, wa_voice_transcripts, notifications_recap_jobs, admin_kyc_tier2_queue, admin_str_reports) sont introduites via des migrations nommées `V20260424_001__core_consents.sql` etc.

La modification de `scoring_scores` (ajout `star_rating`, `tier_label`, `numeric_score`) est faite en 2 phases pour éviter le downtime :

1. V20260424_010 — ADD COLUMN nullable + DEFAULT
2. Job de backfill sur les données existantes (aucune en prod pour le MVP, trivial)
3. V20260424_011 — ALTER COLUMN NOT NULL

---

## Métadonnées

| Version           | 2.0                                                  |
| ----------------- | ---------------------------------------------------- |
| Date              | 24 avril 2026                                        |
| Auteurs           | Desiré Kouadio (CTO), Henoch Lonzo Koffi (Fondateur) |
| Remplace          | KOTIZ_ERD.docx v1.0 (21 avril 2026)                  |
| Référence interne | KOTIZ/ARCH/ERD-002                                   |
| Nombre de tables  | 38 (vs 21 en v1.0)                                   |
| Nouvelles tables  | 11                                                   |
| Tables modifiées  | 3 (core_roles, health_subscriptions, scoring_scores) |
