---
title: KOTIZ — Plan DevOps et Infrastructure
subtitle: Infrastructure, CI/CD, déploiement et monitoring
version: 2.0
date: 2026-04-24
status: ACTIVE (remplace KOTIZ_Plan_DevOps.docx v1.0 du 21 avril 2026)
authors:
  - Desiré Kouadio (CTO)
  - Henoch Lonzo Koffi (Fondateur)
changes_v2:
  - D3 Hébergeur arrêté à Orange Business Services Abidjan (data residency UEMOA)
  - G12 Métriques business ajoutées (CAC, LTV, taux bundle J+1, rétention)
  - USSD gateway intégrée (cf. ADR-004)
classification: Confidentiel — Usage interne
---

# KOTIZ — Plan DevOps et Infrastructure v2

## 1. Vue d'ensemble

Ce document décrit la stratégie DevOps de KOTIZ : infrastructure VPS, conteneurisation Docker, pipeline CI/CD GitHub Actions, monitoring, sauvegarde et procédures opérationnelles. L'objectif est de maximiser la fiabilité avec le budget contraint.

### 1.1 Philosophie

- **Infrastructure as Code** : toute la configuration versionnée dans Git
- **Automatisation first** : rien qui peut être automatisé ne doit être manuel
- **Observabilité** : tout ce qui se passe en production doit être visible
- **Réversibilité** : chaque déploiement peut être annulé en < 10 min
- **Simplicité VPS** : pas de Kubernetes au démarrage — complexité ajoutée uniquement quand le besoin est confirmé
- **Data residency UEMOA** : l'infrastructure primaire reste sur le territoire UEMOA (ADR-005)

## 2. Infrastructure VPS

### 2.1 Configuration cible MVP — **MIS À JOUR D3 (ADR-005)**

| Composant                 | Spécification                                        | Justification                                                                                                               |
| ------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Hébergeur**             | **Orange Business Services Abidjan (ADR-005)**       | **Data residency UEMOA (NFR-COMP-04), Tier III, partenaire direct Orange Money (peering natif), support francophone local** |
| Serveur principal         | 4 vCPU, 8 Go RAM, 100 Go SSD NVMe                    | Spring Boot + PostgreSQL + Redis + MinIO sur un seul VPS                                                                    |
| OS                        | Ubuntu 22.04 LTS                                     | LTS stable, large communauté, support long                                                                                  |
| Localisation              | **Abidjan, Côte d'Ivoire (UEMOA)**                   | **Conformité BCEAO + latence < 20 ms depuis Adjamé**                                                                        |
| Bande passante            | 1 Gbps incluse, trafic illimité                      | Streaming docs KYC + notifs                                                                                                 |
| Backup VPS                | Snapshot hebdomadaire automatisé                     | Restauration rapide                                                                                                         |
| **Backup off-site UEMOA** | **Autre région CI ou datacenter Sénégal (Tier III)** | **Résilience régionale**                                                                                                    |
| CDN                       | Cloudflare (gratuit ou pro)                          | Assets statiques, réduction latence — **aucune donnée personnelle cachée sur CDN**                                          |

**Budget infra MVP** : ~120-150 k FCFA/mois (VPS Orange Business 4 vCPU) + Cloudflare gratuit. Plus cher que OVH mais compense par peering Orange Money natif (économie trafic) et conformité data residency.

**Plan B si refus Orange Business** : MainOne Abidjan (fiabilité correcte, Tier III, UEMOA compliant).
**Exclu** : OVH Gravelines Europe (viole NFR-COMP-04).

### 2.2 Architecture Docker Compose (inchangée v1.0)

Tous les services sont conteneurisés et orchestrés par Docker Compose. Un seul fichier `docker-compose.yml` versionné dans Git.

| Service Docker | Image                  | Ports internes | Notes                                                       |
| -------------- | ---------------------- | -------------- | ----------------------------------------------------------- |
| nginx          | nginx:1.25-alpine      | 80, 443        | Reverse proxy, SSL, rate limiting, WAF                      |
| kotiz-api      | kotiz/api:${VERSION}   | 8080           | Spring Boot — build CI/CD                                   |
| postgres       | postgres:15-alpine     | 5432           | Volume persistent `/data/postgres`                          |
| redis          | redis:7-alpine         | 6379           | Volume persistent `/data/redis`, `requirepass` activé       |
| minio          | minio/minio:latest     | 9000, 9001     | Stockage objets (KYC docs, recaps PNG, audio vocal TTL 24h) |
| prometheus     | prom/prometheus:latest | 9090           | Métriques Spring Actuator + **métriques business G12**      |
| grafana        | grafana/grafana:latest | 3000           | Dashboards monitoring — accès admin uniquement              |

### 2.3 Gestion des secrets (inchangée v1.0)

- **Secrets applicatifs** (DB password, JWT key, API keys MM/CIMA/Meta/Google Cloud) : Docker Secrets (`/run/secrets/`)
- **Jamais** de secrets en variable d'environnement en clair dans `docker-compose.yml`
- **Secrets CI/CD** : GitHub Actions Secrets
- **Rotation** : trimestrielle pour clés API, mensuelle pour mots de passe DB
- **V2** : HashiCorp Vault ou Infisical auto-hébergé sur UEMOA

## 3. Pipeline CI/CD (GitHub Actions)

### 3.1 Branches et déclencheurs (inchangé v1.0)

| Branche / Événement         | Pipeline déclenché                | Actions                                                             |
| --------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| Pull Request vers `develop` | CI complète                       | Build, tests unitaires, tests intégration, scan sécurité, SonarQube |
| Push sur `develop`          | CI + Déploiement staging          | Build, tests, push image Docker, deploy sur VPS staging             |
| Push sur `main` (release)   | CI + Déploiement production       | Build, tests, tag sémantique, push image, deploy prod blue-green    |
| Nightly (02h00 CI)          | Tests de régression + backup test | Suite tests complète + test de restore backup                       |

### 3.2 Jobs du pipeline CI/CD (inchangé v1.0)

1. **Build** : Maven build (`mvn clean package`), génération JAR
2. **Unit tests** : `mvn test` (JUnit5, Mockito), couverture ≥ 70 % via JaCoCo
3. **Integration tests** : Testcontainers (PostgreSQL + Redis réels)
4. **Security scan** : OWASP Dependency-Check + Trivy
5. **Build image Docker** : `docker build`, tag `${GITHUB_SHA}`, push registry privé
6. **Deploy** : SSH sur VPS, `docker pull`, `docker compose up -d --no-deps kotiz-api`
7. **Smoke test** : curl `/actuator/health`, vérification 200 OK

### 3.3 Stratégie de déploiement blue-green (inchangée v1.0)

Cf. v1.0 §3.3. Stratégie blue-green simplifiée sur VPS unique conservée.

## 4. Monitoring et observabilité — **ENRICHI G12**

### 4.1 Métriques techniques (inchangé v1.0)

| Métrique                   | Source                       | Alerte si                |
| -------------------------- | ---------------------------- | ------------------------ |
| Taux d'erreur HTTP 5xx     | Spring Actuator / Prometheus | > 1 % sur 5 min          |
| Latence P99 des requêtes   | Spring Actuator / Micrometer | > 2 s                    |
| Utilisation mémoire JVM    | JVM Micrometer               | > 80 % heap              |
| Connexions pool PostgreSQL | HikariCP                     | > 80 % pool              |
| Taille file Redis          | Redis INFO                   | > 10 000 clés en attente |
| Transactions en attente    | Custom savings               | > 100 PENDING > 5 min    |

### 4.2 **Métriques business 🆕 (G12)**

Dashboard Grafana dédié « Business KOTIZ » avec les métriques critiques pour le pilotage produit :

| Métrique business                           | Source                                                                                    | Fréquence | Cible MVP                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- | --------- | ------------------------- |
| **CAC hebdomadaire**                        | Calcul custom (dépenses acquisition + bonus parrainage / nouvelles utilisatrices actives) | Hebdo     | ≤ 2 500 FCFA (NFR-ACQ-01) |
| **LTV par cohorte mensuelle**               | Calcul custom (revenus commissions + float / cohorte)                                     | Mensuel   | LTV/CAC ≥ 1 M1, ≥ 3 M12   |
| **Taux bundle Santé J+1**                   | `health_subscriptions WHERE subscription_channel = 'BUNDLE_J1'` / total onboardings       | Quotidien | ≥ 40 % (FR-SA-03)         |
| **Rétention S1/S2/S4**                      | Cohortes de dépôts par semaine d'inscription                                              | Hebdo     | 75 % / 55 % / 40 %        |
| **Coefficient viral (K-factor)**            | Filleules inscrites par parraine active                                                   | Mensuel   | ≥ 0,5 au mois 3           |
| **Taux de partage recap hebdo**             | `notifications_recap_jobs.shared_by_user = true` / total envoyés                          | Hebdo     | 15 %                      |
| **Taux de reprise post alerte 3j**          | `core_inactivity_events.recovered_at NOT NULL` / alertes                                  | Hebdo     | ≥ 60 %                    |
| **Distribution étoiles (1⭐→5⭐)**          | `scoring_scores GROUP BY star_rating`                                                     | Quotidien | ≥ 15 % à 4⭐ à J+90       |
| **Taux de souscription Santé** (non-bundle) | souscriptions autonomes / utilisatrices actives                                           | Mensuel   | ≥ 20 % des actives        |
| **Délai moyen KYC Tier 2**                  | `admin_kyc_tier2_queue.decided_at - triggered_at`                                         | Quotidien | ≤ 24 h                    |
| **Délai moyen STR CENTIF**                  | `admin_str_reports.submitted_to_centif_at - detected_at`                                  | Quotidien | **≤ 24 h (NFR-COMP-02)**  |
| **Incidents cash agents**                   | `agents_commissions.incidents_count`                                                      | Mensuel   | ≤ 1 %                     |

### 4.3 Logs structurés (inchangé v1.0)

- Format JSON (Logback + logstash-logback-encoder)
- Champs obligatoires : `timestamp`, `level`, `service`, `traceId`, `spanId`, `userId` (si applicable), `message`
- **Pas de données personnelles (PII) dans les logs** — masquage automatique via MDC (ex : numéros téléphone en `07xx-xxx-xxx`)
- Rotation : 30 jours local, 1 an archives hors VPS
- Centralisation V2 : Grafana Loki

### 4.4 Alertes (inchangé v1.0 + ajouts business)

| Canal              | Usage                                                                                                    | Destinataires        |
| ------------------ | -------------------------------------------------------------------------------------------------------- | -------------------- |
| WhatsApp / SMS     | Alertes critiques P0/P1 (service down, taux erreur élevé, **taux échec bundle J+1 < 20 % 3 j de suite**) | CTO + Fondateur      |
| Email              | Alertes P2/P3 (CVE, anomalie lente, **CAC > 3 000 FCFA 7 j de suite**)                                   | CTO                  |
| Grafana dashboard  | Monitoring temps réel                                                                                    | Toute l'équipe       |
| GitHub Issues auto | Alertes Dependabot, scan Trivy                                                                           | Équipe développement |

## 5. Environnements (inchangé v1.0)

| Environnement | Infrastructure                                 | Usage                               | Données                   |
| ------------- | ---------------------------------------------- | ----------------------------------- | ------------------------- |
| development   | Local (Docker Compose)                         | Dev quotidien                       | Données fictives          |
| staging       | VPS partagé (2 vCPU) UEMOA                     | Tests intégration, démo partenaires | Données anonymisées       |
| production    | **VPS dédié Orange Business Abidjan (4 vCPU)** | Service clients réels               | Données réelles chiffrées |

**Règles :**

- Chaque environnement a ses propres secrets et configurations
- Migrations DB toujours testées sur staging avant prod
- **SSH production restreint aux IPs équipe technique (whitelist Nginx + UFW)**

## 6. Procédures opérationnelles (inchangé v1.0)

Cf. v1.0 §6. Déploiement standard et rollback d'urgence conservés.

---

## Métadonnées

| Version           | 2.0                                                  |
| ----------------- | ---------------------------------------------------- |
| Date              | 24 avril 2026                                        |
| Auteurs           | Desiré Kouadio (CTO), Henoch Lonzo Koffi (Fondateur) |
| Remplace          | KOTIZ_Plan_DevOps.docx v1.0 (21 avril 2026)          |
| Référence interne | KOTIZ/ARCH/DEVOPS-002                                |
| Prochaine revue   | Sprint 3 — avant premier déploiement staging         |
