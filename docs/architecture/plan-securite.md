---
title: KOTIZ — Plan de Sécurité
subtitle: Sécurité applicative, infrastructure et conformité BCEAO + RGPD
version: 2.1
date: 2026-06-03
status: ACTIVE (v2.1 — migration sécurité mobile Flutter→RN/Expo, précision AES-GCM)
authors:
  - Desiré Kouadio (CTO)
  - Henoch Lonzo Koffi (Fondateur)
changes_v2:
  - M13 RBAC éclaté en 8 rôles (ADR-007) — SoD renforcée
  - M16 RGPD 9 principes complets (ex. 5 principes en v1.0)
  - G8 Signature électronique CIMA détaillée
  - D3 Data residency UEMOA (Orange Business Abidjan) intégrée
changes_v2_1:
  - ADR-009/010 Migration sécurité mobile : flutter_secure_storage→expo-secure-store,
    obfuscation→EAS Build/ProGuard, jailbreak→react-native-device-info
  - Précision chiffrement : AES-256-GCM (mode explicité)
classification: STRICTEMENT CONFIDENTIEL — Usage interne
---

# KOTIZ — Plan de Sécurité v2

## 1. Objectifs et périmètre

Ce plan définit la stratégie de sécurité de la plateforme KOTIZ. Il couvre la sécurité applicative (OWASP Top 10), l'authentification et l'autorisation, la protection des données, la sécurité de l'infrastructure, et la conformité aux exigences réglementaires BCEAO, CENTIF-CI et RGPD-like ivoirien (ARPD).

Ce plan doit être revu à chaque sprint majeur, avant tout audit externe, et après tout incident de sécurité.

### 1.1 Principes directeurs

- **Défense en profondeur** : plusieurs couches de sécurité indépendantes
- **Principe du moindre privilège** : chaque composant n'a accès qu'à ce dont il a besoin
- **Sécurité by design** : intégrée dès la conception, pas en correctif
- **Zéro trust** : aucune confiance implicite, même en interne
- **Audit trail complet** : tout événement métier est tracé (BCEAO 10 ans)
- **Data residency UEMOA** : toutes les données personnelles stockées sur le territoire UEMOA (cf. ADR-005 — Orange Business Abidjan)

## 2. Authentification et autorisation

### 2.1 Gestion des identités

| Cas                            | Mécanisme                                   | Détail                                           |
| ------------------------------ | ------------------------------------------- | ------------------------------------------------ |
| Connexion cliente (Fatou)      | Numéro téléphone + OTP SMS + PIN 4 chiffres | Code 6 chiffres, TTL 10 min, max 3 tentatives    |
| Connexion agent (Moussa)       | Numéro téléphone + mot de passe + TOTP      | **2FA obligatoire**, secret TOTP chiffré en base |
| Connexion admin OPS (Ibrahima) | Email + mot de passe + TOTP                 | **2FA obligatoire**, session 2 h max             |
| Connexion admin RISK           | Email + mot de passe + TOTP                 | **2FA obligatoire**, session 2 h max             |
| Connexion admin FINANCE        | Email + mot de passe + TOTP                 | **2FA obligatoire**, session 2 h max             |
| Connexion admin PO (Henoch)    | Email + mot de passe + TOTP                 | **2FA obligatoire**, session 2 h max             |
| API partenaires                | JWT avec claim `partner_id` + secret HMAC   | Clés tournantes tous les 90 jours                |
| Inter-services (SYSTEM)        | JWT service-to-service + IP whitelist       | Tokens TTL 5 min                                 |

### 2.2 Gestion des tokens JWT

- **Access token** : RS256, durée 15 min
- **Refresh token** : opaque (UUID en Redis), durée 30 jours, rotation à chaque utilisation
- **Refresh token** stocké en cookie HttpOnly + Secure + SameSite=Strict (inaccessible JS)
- **Révocation** : blacklist Redis — nécessaire pour logout forcé et blocage compte
- **Clé privée RS256** : variable d'environnement chiffrée (Docker secret sur VPS Orange Business)

### 2.3 RBAC (Role-Based Access Control) — **MIS À JOUR M13 (ADR-007)**

**8 rôles (vs 5 en v1.0) pour respecter la séparation des fonctions (SoD) du PRD §10.3 :**

| Rôle                               | Description             | Permissions clés                                                                                  | Interdictions                                                                                  |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| USER                               | Client final (Fatou)    | Lire/créer son compte, initier dépôts/retraits, souscrire Santé, parrainer                        | Aucun accès admin                                                                              |
| AGENT                              | Agent terrain (Moussa)  | Créer des clients, initier des dépôts pour tiers, voir ses commissions, proposer bundle J+1       | Pas d'accès aux autres agents, pas de plafonds                                                 |
| **OPS (ex ADMIN v1.0)**            | Admin Ops (Ibrahima)    | KYC Tier 2, support, tickets, alertes AML niveau 1, export rapports                               | **Ne peut pas modifier plafonds BCEAO, ne peut pas approuver seul une suspension > 500k FCFA** |
| **RISK** 🆕                        | Admin Risque            | Validation suspensions AML complexes, investigation, décision finale STR, audit périodique        | **Ne peut pas initier de transactions ni gérer les clientes au quotidien**                     |
| **FINANCE** 🆕                     | Admin Finance           | Réconciliation quotidienne MM/wallet, reporting BCEAO, revue commissions agents, export financier | **Ne peut pas valider un KYC ni suspendre un agent**                                           |
| **PO (Product Owner — Henoch)** 🆕 | CEO / PO                | Arbitrage produit, validation modifications paramètres critiques (plafonds, poids Score)          | **Ne peut pas accéder aux données clientes individuelles sans motif loggé**                    |
| PARTNER                            | Système IMF ou assureur | API spécifique partenaire (read + opérations convenues)                                           | Pas d'accès aux autres partenaires                                                             |
| SYSTEM                             | Services internes       | Accès complet inter-modules (jamais exposé à l'extérieur)                                         | Jamais de token exposé publiquement                                                            |

### 2.4 Règles SoD strictes (nouveau)

Le workflow technique applique les règles suivantes via des permissions granulaires :

- **Suspension AML > 500k FCFA** : nécessite approbation OPS + RISK (double signature dans le workflow)
- **Modification plafond BCEAO** : PO seul peut proposer, mais la modification est audit-loggée + revue mensuelle
- **Génération rapport BCEAO** : FINANCE ou OPS peuvent générer, mais seul FINANCE peut signer et envoyer
- **Décision finale STR CENTIF** : OPS rédige, RISK valide (cf. `admin_str_reports.risk_validated_by`)
- **Accès données clientes individuelles par PO** : uniquement avec `motif` obligatoire, loggé dans `core_audit_logs`

## 3. Sécurité applicative (OWASP Top 10)

### 3.1 Inventaire des risques OWASP et mitigations (inchangé v1.0)

| Risque OWASP 2021               | Niveau | Mitigation KOTIZ                                                  |
| ------------------------------- | ------ | ----------------------------------------------------------------- |
| A01 — Broken Access Control     | Élevé  | Spring Security RBAC 8 rôles + tests automatiques                 |
| A02 — Cryptographic Failures    | Élevé  | TLS 1.3 partout, pgcrypto AES-256, RS256 JWT                      |
| A03 — Injection                 | Élevé  | Spring Data JPA (pas de SQL natif), Spring Validation, DTO strict |
| A04 — Insecure Design           | Moyen  | Threat modeling à chaque sprint                                   |
| A05 — Security Misconfiguration | Moyen  | Checklist Spring hardening, scan OWASP ZAP                        |
| A06 — Vulnerable Components     | Moyen  | Dependabot + OWASP Dependency-Check                               |
| A07 — Auth Failures             | Élevé  | Rate limiting Nginx + Redis, TOTP MFA, verrouillage 5 échecs      |
| A08 — Integrity Failures        | Moyen  | Signature releases GitHub, images Docker registry privé           |
| A09 — Logging Failures          | Moyen  | Audit trail PostgreSQL immuable, logs JSON structurés             |
| A10 — SSRF                      | Faible | Whitelist URLs autorisées pour webhooks                           |

### 3.2 Protection des données sensibles (enrichi G8)

- **Données chiffrées en base** (pgcrypto AES-256-GCM) :
  - NIU / CNI
  - Numéro de compte mobile money
  - Secret TOTP
  - **Hash consentements** (cf. `core_consents.consent_hash`)
  - **Hash signatures CIMA** (cf. `health_subscriptions.consent_hash`)
- **Hachage irréversible** (bcrypt cost 12) : mots de passe, codes PIN
- **Pseudonymisation** des exports et rapports (PII masqué — ex : `07xx-xxx-xxx`)
- **Données biométriques** (photos KYC) : chiffrées au repos MinIO (chiffrement serveur + clé rotative)
- **Audio vocal WhatsApp** (G10) : stocké MinIO avec TTL 24h, **supprimé automatiquement après transcription** — seul le texte est conservé dans `wa_voice_transcripts`
- Aucune donnée sensible dans les logs applicatifs — vérifié par règle de lint et revue de code

### 3.3 Sécurité mobile (React Native / Expo)

- **Certificate pinning** : l'app React Native (react-native-ssl-pinning) rejette tout certificat TLS non conforme au pin KOTIZ
- **Stockage local chiffré** : `expo-secure-store` (iOS Keychain / Android Keystore) — aucun token stocké en AsyncStorage non chiffré
- **Obfuscation du code** en production : minification Metro bundler + ProGuard/R8 Android via EAS Build (`eas build --profile production`)
- **Détection root/jailbreak** : bloquer ou avertir via `react-native-device-info` (`isRooted()` / `isEmulator()`)
- Pas de screenshots autorisés sur écrans sensibles (solde, PIN, signature Santé)

## 4. Sécurité infrastructure

### 4.1 Réseau et exposition (mis à jour D3)

| Composant             | Exposition                                         | Sécurisation                                              |
| --------------------- | -------------------------------------------------- | --------------------------------------------------------- |
| Nginx (reverse proxy) | Internet (80, 443)                                 | TLS 1.3, HSTS, CSP, rate limiting, WAF règles basiques    |
| Spring Boot           | Interne VPS uniquement (8080)                      | Non exposé directement — via Nginx                        |
| PostgreSQL            | Interne VPS uniquement (5432)                      | Bind 127.0.0.1, auth scram-sha-256, rôles minimum         |
| Redis                 | Interne VPS uniquement (6379)                      | Bind 127.0.0.1, requirepass, pas de commandes dangereuses |
| MinIO                 | Interne VPS uniquement (9000)                      | Accès API uniquement, credentials rotatifs                |
| SSH                   | Internet (port non standard)                       | Clé RSA uniquement, fail2ban, pas de root login           |
| **Hébergeur**         | **Orange Business Services Abidjan (cf. ADR-005)** | **Tier III, peering Orange Money, data residency UEMOA**  |

### 4.2 Sécurité Docker (inchangé v1.0)

- Images de base officielles (openjdk:17-jre-slim, postgres:15-alpine, redis:7-alpine)
- Utilisateur non-root dans chaque conteneur (USER 1000)
- Read-only filesystem quand possible
- Secrets Docker (`docker secret`) pour les mots de passe — jamais en variable d'environnement claire
- Scan d'images Docker avec Trivy dans CI/CD

### 4.3 Backup et recovery (précisé D3)

- **Backup PostgreSQL quotidien** via `pg_dump` encrypté (GPG), conservé **hors VPS primaire mais sur territoire UEMOA** (autre région CI ou datacenter Sénégal)
- **Rétention** : 30 jours quotidiens + 12 mois mensuels (BCEAO)
- **Test de restore mensuel automatisé** — le backup non testé n'est pas un backup fiable
- **RTO** (Recovery Time Objective) : < 4 h (NFR-AVAIL-02)
- **RPO** (Recovery Point Objective) : < 1 h (NFR-AVAIL-02, amélioré vs v1.0 grâce à WAL streaming)

## 5. Conformité réglementaire

### 5.1 Exigences BCEAO

| Exigence                                   | Implémentation                                                        | Statut MVP            |
| ------------------------------------------ | --------------------------------------------------------------------- | --------------------- |
| Identification des clients (KYC 3 niveaux) | Module agents + `core_users.kyc_level`                                | ✅ MVP                |
| Conservation des transactions 10 ans       | Ledger immuable + backup long terme                                   | ✅ MVP                |
| Rapport mensuel d'activité BCEAO           | Module admin FINANCE                                                  | ✅ MVP                |
| **STR CENTIF-CI sous 24 h**                | **Module `admin_str_reports`, workflow OPS + RISK, envoi automatisé** | ✅ **MVP (FR-AD-02)** |
| Notification incidents sécurité            | Runbook incident + notification BCEAO 72h                             | ✅ MVP                |
| **Data residency UEMOA**                   | **Orange Business Abidjan + backups UEMOA (ADR-005)**                 | ✅ **MVP**            |
| Agrément EME BCEAO                         | Dossier BCEAO                                                         | V2                    |

### 5.2 Conformité ARPD / RGPD-like — **ENRICHI M16**

**9 principes appliqués (cf. PRD v1.1 §10.1) :**

| Principe                         | Application KOTIZ                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Finalité**                  | Chaque donnée collectée est associée à une finalité documentée dans CGU + politique de confidentialité                                   |
| **2. Minimisation**              | Seules les données nécessaires à la finalité sont collectées (ex : pas de géolocalisation sans consentement explicite)                   |
| **3. Consentement explicite**    | Obtenu à l'onboarding + renouvelé à chaque nouveau produit (Santé J+1). Stocké dans `core_consents` avec hash + version + IP + timestamp |
| **4. Droit d'accès**             | L'utilisatrice peut demander l'export complet via app ou support — délai ≤ 30 j (table `core_data_export_requests`)                      |
| **5. Droit de rectification**    | L'utilisatrice peut corriger ses données depuis l'app                                                                                    |
| **6. Droit à l'effacement**      | Fermeture de compte + effacement ≤ 30 j, sauf obligation légale de rétention (audit trail 10 ans)                                        |
| **7. Rétention**                 | Données actives : durée de la relation + 1 an. Audit trail LBC/FT : 10 ans. Purge automatique au-delà                                    |
| **8. Sécurité**                  | AES-256 au repos + TLS 1.3 en transit + vault secrets (cf. §3.2 et §4.1)                                                                 |
| **9. Notification de violation** | Notification CDP (Commission de Protection des Données) **≤ 72 h** + utilisatrices impactées sans délai                                  |

**DPIA (Data Protection Impact Assessment)** : une DPIA formelle sera réalisée **avant le go-live S5** couvrant :

- Traitements à risque élevé (données santé, KYC, géolocalisation, audio vocal)
- Mesures de mitigation
- Plan de réaction en cas d'incident

**DPO (Délégué à la Protection des Données)** : désigné avant le lancement MVP (S6).

## 6. Gestion des incidents (mis à jour)

| Niveau        | Définition                                                                                        | Délai réponse | Actions                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| P0 — Critique | Accès non autorisé à des données clients, fraude confirmée, **violation de données personnelles** | < 1 h         | Isolation, **BCEAO notifié sous 72 h**, **CDP notifiée sous 72 h**, clientes notifiées |
| P1 — Élevé    | Vulnérabilité exploitée, paiement anormal, service indisponible                                   | < 4 h         | Patch d'urgence, post-mortem sous 48 h                                                 |
| P2 — Moyen    | Tentatives d'intrusion bloquées, anomalie suspecte                                                | < 24 h        | Investigation, correctif planifié                                                      |
| P3 — Faible   | Alerte CVE sur dépendance, fausse alarme                                                          | < 1 semaine   | Mise à jour planifiée, documentation                                                   |

## 7. Plan de tests de sécurité (inchangé v1.0)

| Test                            | Fréquence                             | Outil / Méthode                          |
| ------------------------------- | ------------------------------------- | ---------------------------------------- |
| Scan OWASP Top 10 (DAST)        | Chaque release majeure                | OWASP ZAP automatisé dans CI/CD          |
| Audit dépendances (SCA)         | Chaque PR                             | Dependabot + OWASP Dependency-Check      |
| Scan image Docker               | Chaque build                          | Trivy dans GitHub Actions                |
| Tests d'accès (authz)           | Chaque sprint                         | Tests JUnit5 spécifiques refus d'accès   |
| **Test de pénétration externe** | **Avant lancement MVP (S6) + annuel** | **Pentest externe (prestataire)**        |
| Revue de code sécurité          | Chaque PR                             | Checklist OWASP en template PR           |
| Test de backup/restore          | Mensuel                               | Script automatisé + validation intégrité |
| **DPIA (RGPD)**                 | **Annuelle + avant go-live S6**       | **Audit interne + avocat conformité**    |

---

## Métadonnées

| Version           | 2.1                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Date              | 3 juin 2026                                                                                               |
| Auteurs           | Desiré Kouadio (CTO), Henoch Lonzo Koffi (Fondateur)                                                      |
| Remplace          | KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_Plan_Securite.docx v1.0 (21 avril 2026) |
| Référence interne | KOTIZ/ARCH/SEC-002                                                                                        |
| Prochaine revue   | Avant lancement MVP / Sprint 6                                                                            |
