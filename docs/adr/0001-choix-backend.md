# ADR-001 — Choix du framework backend

> Converti depuis `docs/adr/0001-choix-backend.md` le 2026-10-19 (KOTIZ SAS, avril 2026, version 1.0). Original archivé dans `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/`.

## 1. Contexte et problématique

KOTIZ est une plateforme de micro-épargne et de services financiers inclusifs destinée aux populations non-bancarisées de Côte d'Ivoire. La plateforme doit gérer des transactions financières sensibles, des workflows d'approbation multi-niveaux, un registre comptable en double entrée (double-entry bookkeeping), et des intégrations avec plusieurs opérateurs de mobile money.

Le choix du framework backend est une décision structurante qui impacte la fiabilité, la sécurité, la maintenabilité et la capacité à recruter sur le marché ivoirien.

### 1.1 Contraintes techniques

- Transactions financières critiques nécessitant ACID strict et gestion de la concurrence
- Besoins en Event Sourcing / CQRS pour la traçabilité du ledger immutable
- Intégrations multiples : mobile money (Orange, Wave, MTN), BCEAO, SMS/USSD, webhooks partenaires
- Équipe réduite au démarrage (1 CTO + 1-2 développeurs) — la lisibilité et la productivité comptent
- Budget contraint : 45M FCFA pour le MVP — pas de sur-ingénierie
- Marché africain : latence réseau variable, appareils faible mémoire, connectivité intermittente

### 1.2 Contraintes organisationnelles

- Compétences disponibles dans l'équipe actuelle : Java / Spring Boot (CTO)
- Besoin de documentation automatique (OpenAPI/Swagger) pour les partenaires
- Conformité BCEAO et PCI-DSS niveau 1 à terme

## 2. Options envisagées

Trois options ont été analysées en profondeur pour le framework backend de KOTIZ.

### Option A — Spring Boot (Java 17 / Spring Boot 3.x)

| **Critère**                | **Évaluation**                                                    |
| -------------------------- | ----------------------------------------------------------------- |
| Maturité et stabilité      | Très élevée — 20 ans d'écosystème bancaire et fintech             |
| Sécurité                   | Spring Security, intégrations JWT/OAuth2 natives, WSO2 compatible |
| Gestion des transactions   | Spring Data JPA + @Transactional, isolation niveaux configurables |
| Event Sourcing / CQRS      | Axon Framework, Spring Events — patterns bien documentés          |
| OpenAPI                    | springdoc-openapi — génération automatique depuis annotations     |
| Support long terme         | LTS garanti, Spring 6 / Boot 3 sur JDK 17+                        |
| Courbe d'apprentissage     | Modérée — annotations, IoC, AOP à maîtriser                       |
| Disponibilité développeurs | Bonne en Côte d'Ivoire et Afrique francophone                     |

### Option B — NestJS (Node.js / TypeScript)

| **Critère**                | **Évaluation**                                                 |
| -------------------------- | -------------------------------------------------------------- |
| Maturité et stabilité      | Élevée — mais écosystème fintech moins mature que Java         |
| Sécurité                   | Passport.js, guards — bonne mais moins intégrée qu'en Spring   |
| Gestion des transactions   | Sequelize/TypeORM — fonctionnel mais moins robuste sous charge |
| Event Sourcing / CQRS      | NestJS CQRS module — plus récent, moins d'exemples fintech     |
| OpenAPI                    | Swagger nativement intégré via décorateurs                     |
| Support long terme         | Dépend de Node.js — moins de LTS garantis                      |
| Courbe d'apprentissage     | Faible si TypeScript maîtrisé                                  |
| Disponibilité développeurs | Bonne mais moins de profils fintech spécialisés                |

### Option C — FastAPI (Python)

| **Critère**                | **Évaluation**                                                         |
| -------------------------- | ---------------------------------------------------------------------- |
| Maturité et stabilité      | Moyenne — très performant pour APIs, moins pour transactions complexes |
| Sécurité                   | À construire manuellement — moins d'intégrations bancaires natives     |
| Gestion des transactions   | SQLAlchemy — fonctionnel mais pas conçu pour CQRS/Event Sourcing       |
| Event Sourcing / CQRS      | Écosystème limité pour patterns bancaires                              |
| OpenAPI                    | Génération automatique depuis types Pydantic — excellent               |
| Disponibilité développeurs | Bonne — Python répandu, mais moins en contexte bancaire CI             |

## 3. Décision retenue

_Option A retenue — Spring Boot (Java 17, Spring Boot 3.x) est le framework backend principal de KOTIZ. Spring Boot offre le meilleur rapport entre maturité, sécurité, intégration des patterns financiers (CQRS, Event Sourcing, ledger immutable) et disponibilité des compétences dans l'équipe actuelle._

### 3.1 Modules Spring retenus

| **Module**           | **Usage**                                            |
| -------------------- | ---------------------------------------------------- |
| Spring Web (MVC)     | API REST, contrôleurs, gestion des erreurs RFC 7807  |
| Spring Security      | JWT, OAuth2, RBAC, rate limiting                     |
| Spring Data JPA      | ORM PostgreSQL, transactions ACID                    |
| Spring Data Redis    | Cache, sessions, rate limiting distribué             |
| Spring Events + Axon | Event Sourcing, CQRS, saga pour workflows financiers |
| Spring Validation    | Validation des entrées, protection contre injections |
| springdoc-openapi    | Documentation API automatique OpenAPI 3.1            |
| Spring Actuator      | Health checks, métriques Prometheus                  |
| Spring Kafka (V2)    | Messaging asynchrone pour scalabilité                |

### 3.2 Architecture applicative

L'architecture retenue est un monolithe modulaire (voir ADR-002) — une base de code unique organisée en modules fonctionnels indépendants. Chaque module correspond à une brique métier (Epargne, Agents, Santé, Score de Confiance). Cette approche permet de démarrer rapidement avec une équipe réduite tout en gardant la capacité d'extraire des microservices ultérieurement.

## 4. Conséquences

### 4.1 Conséquences positives

- Transactions financières fiables grâce à Spring Data JPA et la gestion des transactions ACID
- Sécurité robuste dès le départ avec Spring Security (JWT, OAuth2, RBAC)
- Génération automatique de la documentation API (OpenAPI 3.1) pour les partenaires
- Compatibilité avec les outils de monitoring requis par BCEAO (logs structurés, audit trail)
- Facilité de recrutement — profils Java disponibles en Côte d'Ivoire et dans la diaspora

### 4.2 Contraintes acceptées

- Temps de démarrage JVM plus long qu'une application Node.js — compensé par GraalVM natif image si nécessaire
- Verbosité du code Java — partiellement compensée par Lombok et records Java 17
- Consommation mémoire plus élevée — VPS recommandé : 4 Go RAM minimum pour l'application

### 4.3 Risques identifiés

| **Risque**                                  | **Probabilité** | **Impact** | **Mitigation**                                                           |
| ------------------------------------------- | --------------- | ---------- | ------------------------------------------------------------------------ |
| CTO seul à maîtriser Java en phase initiale | Élevée          | Moyen      | Formation du 2e développeur, documentation interne, onboarding structuré |
| Montée en complexité de la config Spring    | Moyenne         | Faible     | Spring Boot auto-configuration, profils applicatifs par environnement    |
| Migration vers microservices complexe       | Faible          | Moyen      | Monolithe modulaire conçu pour être extrait (ADR-002)                    |

## 5. Statut et révision

| **Statut**             | ACCEPTÉE                                            |
| ---------------------- | --------------------------------------------------- |
| **Date de décision**   | 21 avril 2026                                       |
| **Décideurs**          | Henoch (Fondateur), Desiré (CTO)                    |
| **Prochaine révision** | Sprint 4 — post-MVP alpha (3 mois)                  |
| **ADRs liés**          | ADR-002 (Monolithe modulaire), ADR-003 (PostgreSQL) |
| **Référence interne**  | KOTIZ/ARCH/ADR-001                                  |

### 5.1 Conditions de révision

Cette décision sera réexaminée si l'équipe adopte massivement TypeScript/NestJS, si le budget permet 2+ développeurs spécialisés Node.js, ou si les contraintes de performance JVM deviennent bloquantes pour le déploiement VPS.
