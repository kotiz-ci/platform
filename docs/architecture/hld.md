---
title: KOTIZ — HLD (High Level Design)
subtitle: Architecture générale de la plateforme KOTIZ
version: 2.1
date: 2026-06-03
status: ACTIVE (v2.1 — migration stack mobile Flutter→RN/Expo, propagation ADR-009/010)
authors:
  - Henoch Lonzo Koffi (Fondateur, PO)
  - Desiré Kouadio (CTO)
inputs_v2:
  - docs/product/prd-mvp.md (PRD v1.1 validé 4,5/5 le 23 avril)
  - docs/design/ux-design-specification.md (UX Skeleton v1.0)
  - docs/product/epics.md (12 épics, 75 stories)
  - KOTIZ/_archive/2026-bmad/_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-23.md (audit)
changes_v2:
  - D1 Score 5 étoiles (remplace 0-1000 — cf. ADR-003)
  - D2 USSD dans le MVP en mode léger (cf. ADR-004)
  - D3 Data residency UEMOA — hébergeur Orange Business Services Abidjan (cf. ADR-005)
  - G10 Support vocal TTS/STT dans le module wa
  - G11 Référence au design system mobile (shared/design-tokens.json)
  - M13 RBAC éclaté en 8 rôles (cf. ADR-007)
  - M15 Mention Tontine V2 retirée (strictement hors-scope KOTIZ)
classification: Confidentiel — Usage interne
---

# KOTIZ — HLD (High Level Design) v2

## 1. Vue d'ensemble

Ce document décrit l'architecture de haut niveau de la plateforme KOTIZ v1.1. Il couvre les couches applicatives, les composants principaux, les flux de données, les intégrations tierces et les choix d'infrastructure. Il sert de référence pour toute l'équipe de développement et pour les parties prenantes techniques.

### 1.1 Périmètre MVP (aligné PRD v1.1)

| Module                | Description fonctionnelle                                                                                  | Canal                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Epargne               | Plans d'épargne, dépôts, retraits, ledger immuable, objectifs + verrouillage + streak                      | App mobile + Agent + WhatsApp Bot + USSD      |
| Agents                | Réseau de points de service, KYC terrain, commissions, **proposition bundle Santé J+1**                    | App Agent mobile                              |
| Santé                 | Souscription micro-assurance **dès J+1 au premier dépôt**, gestion sinistres manuelle MVP, partenaire CIMA | App mobile + Agent (bundle) + WhatsApp        |
| Score                 | **Score comportemental 5 étoiles** (1⭐ à 5⭐, sous-jacent 0-1000) avec 5 paliers d'avantages progressifs  | Interne (API) + App + WhatsApp                |
| Paiements             | Mobile money Orange/Wave/MTN, agrégateurs BIZAO/CinetPay, idempotency                                      | API tierce                                    |
| WhatsApp Bot          | Canal conversationnel principal : solde, cotiser, souscrire Santé, score, aide, **vocal in/out**           | WhatsApp Business                             |
| **USSD**              | **Menu 4 niveaux léger** : solde + cotiser montant fixe + aide (cf. ADR-004)                               | USSD `*XXX#` (code à assigner par régulateur) |
| Viralité & Anti-churn | Parrainage Score Booster, onboarding à deux, recap hebdo partageable, détection inactivité 3j + push vocal | WhatsApp + push natif                         |
| Notifications         | Push app, SMS — notifications sortantes hors bot WA                                                        | Multi-canal                                   |
| Back-office           | Administration, rôles (**8 rôles SoD — cf. ADR-007**), reporting BCEAO, AML + STR CENTIF, audit trail      | Web (admin)                                   |

### 1.2 Acteurs principaux

| Acteur                       | Profil                                                                               | Interface                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Fatou (Utilisatrice finale)  | Commerçante non-bancarisée, 25-45 ans, Android économique Tecno                      | App React Native / Expo — variant client (Android prioritaire, iOS ensuite) + WhatsApp + USSD |
| Moussa (Agent KOTIZ)         | Point de service terrain, collecte dépôts, KYC clients, **propose bundle Santé J+1** | App React Native / Expo — variant agent (Android) — cf. ADR-010                               |
| Ibrahima (Ops admin)         | Gestionnaire back-office, supervision, KYC Tier 2+, AML niveau 1                     | Back-office Web                                                                               |
| Risk (rôle)                  | Validation suspensions AML > 500k, décisions STR complexes                           | Back-office Web                                                                               |
| Finance (rôle)               | Réconciliation quotidienne MM/wallet, reporting BCEAO                                | Back-office Web                                                                               |
| Henoch (PO / CEO)            | Arbitrage produit, paramètres critiques                                              | Back-office Web                                                                               |
| Partenaire IMF               | Institution de micro-finance, détention des fonds client                             | API REST                                                                                      |
| Assureur CIMA (via courtier) | Partenaire assurance santé, gestion des sinistres                                    | API REST                                                                                      |
| Opérateur mobile money       | Orange Money, Wave, MTN MoMo                                                         | API mobile money                                                                              |

## 2. Architecture en couches

La plateforme KOTIZ est organisée en 4 couches distinctes : Présentation, API Gateway, Application (monolithe modulaire), Infrastructure.

### 2.1 Couche Présentation

| Composant                                     | Technologie                                                                                                               | Cible                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| App mobile utilisateur (Fatou)                | React Native 0.81.x / Expo SDK ~54 — Expo Router + React Context — **consomme `shared/design-tokens.json`** — cf. ADR-009 | Android (prioritaire), iOS   |
| App mobile agent (Moussa)                     | React Native / Expo — **même codebase, variant `EXPO_PUBLIC_APP_VARIANT=agent`, binaire EAS distinct** — cf. ADR-010      | Android                      |
| WhatsApp Bot (Fatou)                          | Meta WhatsApp Business Platform — module `wa` Spring Boot — **support vocal in/out (TTS/STT)**                            | Tout téléphone avec WhatsApp |
| **USSD gateway (Fatou feature phone)**        | **Partenaire télécom (Orange/MTN) — menu 4 niveaux, scope réduit MVP (cf. ADR-004)**                                      | Tout téléphone               |
| Back-office web (Ibrahima, Risk, Finance, PO) | Next.js 15 (TypeScript) — décision ADR-008/009                                                                            | Navigateur desktop           |

**Design system mobile :**

- `shared/design-tokens.json` — palette v2 (13 couleurs + 4 nouveaux tokens : `teal-deep`, `gold-dark`, `success`, `info`), typo Inter, échelle espacements 4pt, radius, shadows, durations
- 15 composants React Native partagés (AppHeader, TabBar, BottomSheet, PrimaryButton, SecondaryButton, IconButton, AudioToggle, DepositCard, GoalCard, StarRating, StreakBadge, AmountInput, Toast, EmptyState, LoadingSkeleton) — stylés NativeWind ^4.2
- Font : Inter Variable (sous-set latin + diacritiques africains, ≤ 200 Ko embarquée)
- Référence complète dans `docs/design/ux-design-specification.md`

**Règles :**

- L'app mobile utilise Expo Router pour la navigation et React Context pour la gestion d'état
- Le WhatsApp Bot est le canal conversationnel principal de Fatou : solde, cotiser, aide, souscrire Santé, parrainer, mode vocal — sans ouvrir l'app
- Le back-office web communique exclusivement via l'API REST de la couche application
- Aucune logique métier dans les couches de présentation — tout passe par l'API

### 2.2 Couche API et sécurité

| Composant        | Technologie                                                         | Rôle                                                                             |
| ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Reverse proxy    | Nginx                                                               | Terminaison SSL, rate limiting, routage vers Spring Boot                         |
| API REST         | Spring Web MVC + springdoc-openapi 3.1                              | Contrôleurs REST, validation, gestion erreurs RFC 7807                           |
| Authentification | Spring Security + JWT (RS256, 15 min) + refresh token opaque (30 j) | Authentification stateless, refresh en cookie HttpOnly SameSite Strict           |
| Autorisation     | RBAC Spring Security                                                | **8 rôles** : USER, AGENT, OPS, RISK, FINANCE, PO, PARTNER, SYSTEM (cf. ADR-007) |
| MFA              | TOTP (QR code) via Spring Security TOTP                             | **2FA obligatoire** pour OPS, RISK, FINANCE, PO (ex ADMIN) et AGENT              |

### 2.3 Couche Application (monolithe modulaire — bounded contexts DDD)

Le cœur de la plateforme est un monolithe modulaire Spring Boot 3.x (voir ADR-002). L'application est décomposée en **11 bounded contexts** (DDD stratégique — cf. `docs/architecture/ddd-context-map-glossaire.md`). Chaque contexte est structuré en **architecture hexagonale (Ports & Adapters) + DDD tactique** (cf. **ADR-011**) : packages `domain / application / infrastructure`, entités JPA cantonnées à la couche infrastructure, communication inter-contextes via ports + ACL + événements de domaine.

> **Évolution v2.1 (26 juin 2026)** : l'ancien module `core` est renommé **`iam`** (le core domain est `savings`+`scoring`, pas l'identité) ; ajout des contextes **`growth`** (viralité + anti-churn, extrait de `core`) et **`ussd`** (canal). Le langage ubiquitaire et les invariants de chaque contexte sont fixés dans `docs/architecture/ddd-context-map-glossaire.md`.

| Bounded context     | Sous-domaine   | Principaux agrégats / entités (domaine)                                                                      | Services (application)                                          |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| **savings**         | 🔴 core        | SavingsAccount, Transaction, LedgerEntry, SavingsGoal, StreakBadge                                           | DepositService, WithdrawalService, GoalService, StreakService   |
| **scoring**         | 🔴 core        | Score (star_rating + tier_label + numeric_score), ScoreSignal, TierBenefit                                   | ScoringEngine, SignalCollector, TierBenefitActivator            |
| **agents**          | 🟡 supporting  | Agent, AgentZone, Commission, CustomerEnrollment/KYCDocument                                                 | AgentService, KYCService, CommissionService                     |
| **health**          | 🟡 supporting  | HealthSubscription (bundle_channel + signature + cancellation_deadline), HealthPlan, Claim, InsurancePartner | SubscriptionService, ClaimService, BundleJ1Service              |
| **payments**        | 🟡 supporting  | PaymentOrder (idempotency_key), PaymentCallback, MobileMoneyAccount                                          | PaymentGateway, CallbackProcessor (ACL par prestataire MM)      |
| **growth** 🆕       | 🟡 supporting  | Referral, OnboardingBonus, InactivityEvent                                                                   | ReferralService, AntiChurnService                               |
| **iam** (ex-`core`) | ⚪ generic     | User, Role, Credential, Session, Consent, DataExportRequest, AuditLog                                        | AuthService, ConsentService, SessionService (Open Host Service) |
| **notifications**   | ⚪ generic     | NotificationQueue, Template, **RecapWeeklyJob**                                                              | PushService, SMSService, WhatsAppService, RecapService          |
| **admin**           | 🟡 supporting  | Report, AuditTrail, SystemConfig, **STRReport**, AMLAlert, KYCTier2QueueItem                                 | ReportingService, AdminService, STRService                      |
| **wa**              | ⚪ canal (ACL) | WaSession, WaMessageLog, **WaVoiceTranscript**                                                               | WaService, **VoiceService (STT/TTS)**, TemplateManager          |
| **ussd** 🆕         | ⚪ canal (ACL) | UssdSession, UssdMenu (4 niveaux)                                                                            | UssdService                                                     |

### 2.4 Couche Infrastructure

| Composant                  | Technologie                                                                                | Usage                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Base de données principale | PostgreSQL 15                                                                              | Toutes les données métier, ledger immuable, transactions ACID                                                            |
| Cache / Sessions           | Redis 7                                                                                    | Cache applicatif, sessions JWT, rate limiting distribué, sessions WhatsApp courtes                                       |
| Stockage objets            | MinIO (auto-hébergé) ou S3 compatible — **résidence UEMOA**                                | Documents KYC, justificatifs sinistres, audio vocal WhatsApp (TTL 24h)                                                   |
| Serveur                    | **VPS Orange Business Services Abidjan** — 4 vCPU, 8 Go RAM, 100 Go SSD NVMe (cf. ADR-005) | Tous les services en Docker Compose                                                                                      |
| CDN                        | Cloudflare (plan gratuit ou pro)                                                           | Assets statiques, réduction latence Afrique — **pas de stockage de données personnelles sur CDN (data residency UEMOA)** |
| CI/CD                      | GitHub Actions                                                                             | Build, tests, déploiement automatique sur VPS                                                                            |
| **TTS/STT**                | **Google Cloud Speech-to-Text + Text-to-Speech (FR par défaut, bambara/dioula si dispo)**  | Transcription vocaux WhatsApp entrants + synthèse vocaux sortants (cf. G10)                                              |

### 2.5 Module WhatsApp Bot (`wa`)

Le module `wa` est le cœur conversationnel de KOTIZ. Il gère l'ensemble des interactions entrantes et sortantes via WhatsApp Business Platform (Meta Cloud API). **Il supporte désormais les messages vocaux in & out** pour respecter le mode vocal optionnel (UX-DR-A11Y-01).

| Composant               | Rôle                                  | Détail                                                                                                                        |
| ----------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Webhook Controller      | Point d'entrée des messages Meta      | `POST /wa/webhook` — validation signature HMAC-SHA256 avant tout traitement                                                   |
| Command Router          | Reconnaissance d'intention            | Parse le texte : `solde`, `cotiser N`, `souscrire santé`, `score`, `parrainer`, `aide`, `vocal on/off`                        |
| **Voice Service (STT)** | **Transcription des vocaux entrants** | **Google Cloud Speech-to-Text. Fallback français si langue dioula non supportée. Audio stocké MinIO TTL 24h, supprimé après** |
| **Voice Service (TTS)** | **Synthèse des vocaux sortants**      | **Google Cloud Text-to-Speech. Activé pour utilisatrices ≥ 2⭐ (avantage palier) ou activé manuellement via `vocal on`**      |
| Session Manager         | Machine à états par utilisateur       | Stocke l'état de conversation dans Redis (TTL 10 min) pour les flux multi-étapes                                              |
| Template Manager        | Envoi des messages sortants           | Utilise les templates pré-approuvés Meta (bienvenue, confirmation, erreur, solde, palier⭐, attestation Santé)                |
| Circuit Breaker         | Résilience Meta API                   | Désactivation automatique si taux d'erreur Meta > 10 % sur 1 minute                                                           |
| Anti-abus               | Limites d'utilisation                 | 30 requêtes solde/jour/cliente, 10 liens cotisation actifs/jour/cliente                                                       |

### 2.6 Module USSD (nouveau)

Le module USSD expose un menu 4 niveaux léger via un partenaire télécom (Orange ou MTN) pour inclure les feature phones.

**Scope MVP (cf. ADR-004 Option A) :**

- Niveau 1 : menu principal (1. Solde, 2. Cotiser, 3. Aide, 4. Contact agent)
- Niveau 2 : sous-actions (ex : Cotiser → choix 100 / 500 / 1 000 FCFA)
- Niveau 3 : confirmation (ex : PIN saisie)
- Niveau 4 : résultat (succès / échec)

**Contraintes :**

- Temps de réponse ≤ 3 s P95 (NFR-PERF-04)
- Pas de saisie longue (> 10 caractères)
- Code `*XXX#` à assigner par régulateur télécom (demande à faire dès pré-sprint 0)
- Pas de souscription Santé en USSD (redirigé vers app / agent / WhatsApp)
- Pas de création d'objectif nommé en USSD (simplicité)

## 3. Flux de données principaux

### 3.1 Flux onboarding bundle Santé J+1 (nouveau — parcours critique MVP)

Ce flux est **le plus critique du MVP** car il conditionne le LTV/CAC.

| Étape | Acteur              | Composant                    | Action                                                                                              |
| ----- | ------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| 1     | Moussa              | App RN Agent (variant agent) | Initie l'enrôlement (nom, téléphone, scan CNI recto/verso, selfie, OTP)                             |
| 2     | Spring Security     | JWT Filter                   | Valide le token JWT agent                                                                           |
| 3     | AgentService        | KYCService                   | KYC Tier 1 auto-validé (< 5 min)                                                                    |
| 4     | AgentService        | BundleJ1Service              | **Propose formule Santé adaptée (3 questions foyer → reco)**                                        |
| 5     | Moussa + cliente    | App RN Agent (variant agent) | **Acceptation bundle en 2 clics**                                                                   |
| 6     | HealthService       | PaymentGateway               | Premier dépôt Épargne initié (cash chez agent)                                                      |
| 7     | PaymentGateway      | Ledger                       | **Entrées ledger double-entrée créées**                                                             |
| 8     | HealthService       | HealthSubscription           | **Souscription créée avec `subscription_channel = BUNDLE_J1`, `cancellation_deadline = now + 24h`** |
| 9     | SchedulerService    | PremiumService               | **Prime Santé prélevée J+1 (effet couverture) — suspendable sans frais si cliente annule sous 24h** |
| 10    | NotificationService | WhatsApp + SMS               | Bienvenue + attestation Santé + lien install app                                                    |

### 3.2 Flux dépôt d'épargne (inchangé v1.0)

Cf. HLD v1.0 §3.1 — flux validé, aucun changement.

### 3.3 Flux authentification MFA (mise à jour rôles)

- Étape 1 : l'utilisateur soumet login + mot de passe → Spring Security valide les credentials
- Étape 2 : Spring Security retourne un challenge MFA si le rôle nécessite 2FA (**OPS, RISK, FINANCE, PO, AGENT — tous les rôles admin et agents — cf. ADR-007**)
- Étape 3 : l'utilisateur soumet le code TOTP (6 chiffres)
- Étape 4 : Spring Security valide le code TOTP et émet le JWT access token + refresh token
- Étape 5 : le refresh token est stocké en cookie HttpOnly SameSite Strict
- Étape 6 : le JWT access token (15 min) est stocké en mémoire sécurisée par l'app (expo-secure-store)

### 3.4 Flux bot WhatsApp — commande vocal « mets-moi 500 KOTIZ » (mise à jour G10)

| Étape | Acteur                          | Composant                       | Action                                                                             |
| ----- | ------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| 1     | Fatou                           | WhatsApp                        | Envoie un vocal « mets-moi 500 KOTIZ » au numéro KOTIZ                             |
| 2     | Meta Cloud API                  | Webhook POST `/wa/webhook`      | Transmet l'événement signé HMAC-SHA256                                             |
| 3     | WaWebhookController             | Signature validator             | Valide la signature Meta                                                           |
| 4     | **VoiceService (STT)**          | **Google Cloud Speech-to-Text** | **Transcrit l'audio en texte (FR par défaut, détection dioula possible)**          |
| 5     | CommandRouter                   | Intent parser                   | Détecte la commande « cotiser N », extrait le montant (500 FCFA)                   |
| 6     | SessionManager                  | Redis                           | Vérifie qu'aucun flux cotiser n'est déjà ouvert                                    |
| 7     | WaService                       | SavingsPort                     | Vérifie KYC level ≥ 1 et plafonds de cotisation                                    |
| 8     | PaymentGateway                  | Lien paiement                   | Génère un lien de paiement sécurisé (TTL 10 min, idempotency_key)                  |
| 9     | TemplateManager                 | Meta Cloud API                  | Envoie template `cotisation_lien` avec le lien                                     |
| 10    | **VoiceService (TTS) si ≥ 2⭐** | **Google Cloud Text-to-Speech** | **Envoie aussi une confirmation vocale « J'ai préparé un lien pour 500 FCFA... »** |
| 11    | SessionManager                  | Redis                           | Sauvegarde l'état `WAITING_PAYMENT`                                                |
| 12    | CallbackProcessor               | Webhook Orange/Wave             | Reçoit confirmation paiement MM                                                    |
| 13    | LedgerService                   | PostgreSQL                      | Crée l'écriture comptable immuable                                                 |
| 14    | TemplateManager                 | Meta Cloud API                  | Envoie `cotisation_confirmee` avec solde mis à jour (et vocal si ≥ 2⭐)            |

### 3.5 Flux Score 5 étoiles (nouveau — cf. ADR-003)

| Étape | Acteur                    | Composant            | Action                                                                                                                        |
| ----- | ------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1     | Scheduler (00h01 Abidjan) | ScoringEngine        | Job nocturne démarre                                                                                                          |
| 2     | ScoringEngine             | PostgreSQL           | Lit tous les événements du jour (dépôts, retraits, interactions multi-canal, ancienneté)                                      |
| 3     | ScoringEngine             | SignalCollector      | Calcule les 4 composantes pondérées : régularité 40 %, stabilité 25 %, ancienneté 20 %, engagement 15 %                       |
| 4     | ScoringEngine             | ScoreRecord          | **Enregistre `numeric_score` (0-1000) + `star_rating` (1-5) + `tier_label` (Débutante/Régulière/Fiable/Confirmée/Premium)**   |
| 5     | ScoringEngine             | TierBenefitActivator | **Détecte franchissement de palier → déclenche avantage (consultation téléphone 3⭐, -10% Confort 4⭐, priorité crédit 5⭐)** |
| 6     | NotificationService       | WhatsApp + Push      | Notifie la cliente du nouveau palier                                                                                          |
| 7     | Monitoring                | Prometheus           | Métriques job : durée, volume, distribution étoiles                                                                           |

**Seuils étoiles :**

- ⭐ 0-200 — Débutante
- ⭐⭐ 201-400 — Régulière
- ⭐⭐⭐ 401-600 — Fiable
- ⭐⭐⭐⭐ 601-800 — Confirmée
- ⭐⭐⭐⭐⭐ 801-1000 — Premium

## 4. Intégrations tierces

| Partenaire                                 | Type d'intégration                           | Protocole                          | Notes                                                             |
| ------------------------------------------ | -------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------- |
| Orange Money CI                            | Mobile money — débit/crédit                  | REST HTTPS + webhook               | Sandbox disponible. **Peering natif via Orange Business Hosting** |
| Wave CI                                    | Mobile money — débit/crédit                  | REST HTTPS + webhook               | API Wave Business                                                 |
| MTN MoMo                                   | Mobile money — débit/crédit                  | REST HTTPS + webhook               | MoMo API sandbox                                                  |
| BIZAO                                      | Agrégateur de paiement                       | REST HTTPS                         | Fallback si opérateur indisponible                                |
| CinetPay                                   | Agrégateur de paiement                       | REST HTTPS + webhook               | Alternatif BIZAO                                                  |
| Partenaire IMF                             | Dépôt et garde des fonds                     | REST HTTPS mutualisé               | Convention de partenariat                                         |
| Courtier CIMA                              | Souscriptions et sinistres                   | REST HTTPS                         | Contrat intermédiation (dépendance critique S3)                   |
| Partenaire infirmier téléphone             | Consultation téléphone (avantage 3⭐)        | API appel + WhatsApp               | Finalisation avant S5                                             |
| WhatsApp Business Platform                 | Bot conversationnel + vocal in/out           | Meta Cloud API + webhook           | Canal principal Fatou — approbation Meta 5-10 jours               |
| **Google Cloud STT/TTS**                   | **Vocal WhatsApp (FR + dioula si supporté)** | **REST HTTPS**                     | **Coût ~0,02 USD par minute — budgété dans NFR-ACQ-01**           |
| SMS Gateway                                | Notifications SMS sortantes + OTP            | REST (Infobip ou opérateur local)  | Fallback si WhatsApp indisponible                                 |
| **Opérateur télécom USSD (Orange ou MTN)** | **Passerelle USSD `*XXX#` — menu 4 niveaux** | **USSD protocol + REST callbacks** | **Code régulateur à assigner — demande dès pré-sprint 0**         |

## 5. Sécurité et conformité

### 5.1 Principes de sécurité

- **Défense en profondeur** : Nginx (SSL, WAF basique) + Spring Security (auth/authz) + validation entrées + audit trail
- **Principe du moindre privilège** : chaque rôle (8 rôles cf. ADR-007) n'accède qu'à ses ressources
- **Chiffrement au repos** : PostgreSQL avec pgcrypto AES-256 pour les données sensibles (NIU, comptes bancaires, biométrie, secrets TOTP, **hash consentement**)
- **Chiffrement en transit** : TLS 1.3 partout — Nginx, communications PostgreSQL, Redis, mobile money APIs, Google Cloud TTS/STT
- **Certificate pinning** dans l'app React Native (react-native-ssl-pinning) pour prévenir les attaques MITM
- **Logs d'audit complets et immuables** pour tous les événements métier (requis BCEAO) — `core_audit_logs` avec RLS + trigger PostgreSQL
- **Data residency UEMOA** : tous les stockages (DB, cache, objets, logs) restent sur le territoire UEMOA (Orange Business Abidjan)

### 5.2 Conformité réglementaire

| Exigence                           | Réglementation                   | Implémentation                                                                                  |
| ---------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| KYC clients et agents              | BCEAO / CENTIF-CI                | Module agents avec workflow KYC 3 niveaux, stockage documents chiffrés                          |
| Traçabilité des transactions       | BCEAO directive 2019             | Ledger immuable PostgreSQL, audit trail Spring                                                  |
| **STR sous 24 h**                  | **CENTIF-CI LBC/FT**             | **Module admin : workflow STR automatisé, transmission CENTIF-CI, archivage 10 ans**            |
| Protection des données             | Loi ivoirienne 2013-450 / ARPD   | Consentement explicite, droit à l'oubli, **DPO désigné, DPIA annuelle (cf. §5.2 Plan Sécu v2)** |
| Conservation des données           | BCEAO 10 ans                     | Archivage automatique PostgreSQL, backup hors site                                              |
| Rapport d'activité                 | BCEAO mensuel                    | Module admin : génération rapports réglementaires automatisés                                   |
| **Data residency**                 | **NFR-COMP-04 PRD v1.1 + BCEAO** | **Orange Business Services Abidjan (UEMOA) — voir ADR-005**                                     |
| **SoD (Séparation des fonctions)** | **BCEAO + PRD §10.3**            | **8 rôles RBAC (cf. ADR-007)**                                                                  |

## 6. Scalabilité et évolution

### 6.1 Phase MVP (0-6 mois)

- Un seul VPS Orange Business Abidjan 4 vCPU / 8 Go RAM / 100 Go SSD — budget ~120-150k FCFA/mois
- Docker Compose avec 5 conteneurs : Spring Boot, PostgreSQL, Redis, Nginx, MinIO
- Backup automatique nightly vers stockage externe UEMOA (autre région CI ou Sénégal)
- Monitoring : Spring Actuator + Prometheus + Grafana (stack légère sur même VPS)
- **Dashboard Grafana « Business »** : CAC hebdo, LTV cohortes, taux bundle J+1, rétention S1/S2/S4, NPS (cf. G12)

### 6.2 Phase post-MVP (6-18 mois)

- Ajout d'un VPS de read replica PostgreSQL pour les requêtes de reporting
- Séparation du Redis sur son propre VPS si charge mémoire critique
- Migration vers Docker Swarm ou K3s pour la haute disponibilité
- Extraction des premiers microservices selon les indicateurs ADR-002

### 6.3 Évolution fonctionnelle (18+ mois)

- ~~Canal USSD~~ **déjà en MVP (ADR-004)**
- **KOTIZ Crédit V2** (micro-crédit partenaire IMF)
- **KOTIZ BNPL V2** (paiement 3x chez marchands)
- **KOTIZ Bourse, Invest Immo, Cité V3** (vision long terme)
- Expansion géographique UEMOA : Sénégal, Mali, Burkina

> **⚠️ Note importante :** La Tontine est **strictement hors-scope KOTIZ** (décision produit, feedback_no_tontine en mémoire). Toute référence précédente à « module tontine » dans les docs architecture v1.0 est **supprimée**.

## 7. Décisions architecturales liées

| ADR     | Titre                                                                 | Statut                     |
| ------- | --------------------------------------------------------------------- | -------------------------- |
| ADR-001 | Choix du framework backend (Spring Boot)                              | ACCEPTÉE                   |
| ADR-002 | Architecture monolithe modulaire                                      | ACCEPTÉE                   |
| ADR-003 | **Score 5 étoiles (remplace 0-1000)**                                 | **ACCEPTÉE 24 avril 2026** |
| ADR-004 | **USSD dans le MVP (menu 4 niveaux léger)**                           | **ACCEPTÉE 24 avril 2026** |
| ADR-005 | **Hébergeur Orange Business Services Abidjan (data residency UEMOA)** | **ACCEPTÉE 24 avril 2026** |
| ADR-006 | **Prime Santé — unité weekly_premium_cents + conversion UI**          | **ACCEPTÉE 24 avril 2026** |
| ADR-007 | **RBAC éclaté en 8 rôles SoD**                                        | **ACCEPTÉE 24 avril 2026** |
| ADR-008 | **Monorepo Turborepo (4 devs)**                                       | **ACCEPTÉE 26 avril 2026** |
| ADR-009 | **Mobile React Native / Expo (switch depuis Flutter)**                | **ACCEPTÉE 6 mai 2026**    |
| ADR-010 | **Mobile variants Client/Agent : 1 codebase, 2 binaires EAS**         | **ACCEPTÉE 7 mai 2026**    |

---

## Métadonnées

| Version            | 2.0                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Date               | 24 avril 2026                                                                                   |
| Auteurs            | Henoch Lonzo Koffi (Fondateur), Desiré Kouadio (CTO)                                            |
| Remplace           | KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_HLD.docx v1.0 (21 avril 2026) |
| Référence interne  | KOTIZ/ARCH/HLD-002                                                                              |
| Prochaine révision | Sprint 3 (pré-déploiement staging)                                                              |
