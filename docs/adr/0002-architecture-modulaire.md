# ADR-002 — Architecture monolithe modulaire

> Converti depuis `KOTIZ_ADR_002_Architecture_Modulaire.docx` le 2026-10-19 (KOTIZ SAS, avril 2026, version 1.0). Original archivé dans `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/`.

## 1. Contexte et problématique

Suite au choix de Spring Boot comme framework backend (ADR-001), la question de l'organisation architecturale du code se pose : faut-il construire une architecture microservices d'emblée, ou adopter une approche adaptée aux contraintes de démarrage de KOTIZ ?

KOTIZ démarre avec une équipe de 1 à 3 développeurs, un budget de 45M FCFA pour le MVP, et un périmètre fonctionnel de 4 modules principaux : Epargne, Agents, Santé, Score de Confiance. Les décisions architecturales doivent équilibrer la rapidité de livraison et la capacité d'évolution future.

### 1.1 Critères de décision

- Vitesse de développement et de déploiement pour un MVP en 3 mois
- Complexité opérationnelle acceptable pour une équipe réduite
- Capacité d'évolution future vers une architecture distribuée si nécessaire
- Coût infrastructure compatible avec le VPS budget-contraint
- Cohérence des données transactionnelles entre les modules
- Facilité de test et de débogage en phase de développement intense

## 2. Options envisagées

### Option A — Microservices dès le départ

Chaque module fonctionnel (Epargne, Agents, Santé, Score) est déployé comme un service indépendant avec sa propre base de données.

| **Aspect**                 | **Évaluation pour KOTIZ**                                                 |
| -------------------------- | ------------------------------------------------------------------------- |
| Déploiement                | Complexe — orchestration Kubernetes ou Docker Swarm nécessaire dès J1     |
| Développement              | Lent — overhead de configuration réseau, service discovery, API Gateway   |
| Transactions distribuées   | Très complexe — saga pattern obligatoire pour chaque opération financière |
| Tests                      | Difficiles — mocking de services multiples, tests d'intégration coûteux   |
| Coût infrastructure        | Élevé — N VPS ou services cloud pour N microservices                      |
| Adéquation équipe 1-3 devs | Inadéquate — sur-ingénierie pour la taille de l'équipe                    |

### Option B — Monolithe classique (non modulaire)

Une seule application sans séparation des responsabilités internes.

| **Aspect**     | **Évaluation pour KOTIZ**                                  |
| -------------- | ---------------------------------------------------------- |
| Déploiement    | Simple — un seul artefact                                  |
| Développement  | Rapide à court terme, mais dette technique rapide          |
| Tests          | Simples au départ, complexes en croissance (fort couplage) |
| Évolutivité    | Limitée — extraction future très coûteuse                  |
| Maintenabilité | Se dégrade rapidement avec la croissance de l'équipe       |

### Option C — Monolithe modulaire (Modular Monolith)

Une seule application déployée, organisée en modules fonctionnels indépendants avec des interfaces clairement définies. Chaque module est responsable de son propre domaine métier.

| **Aspect**                 | **Évaluation pour KOTIZ**                                                     |
| -------------------------- | ----------------------------------------------------------------------------- |
| Déploiement                | Simple — un seul artefact, un seul VPS au démarrage                           |
| Développement              | Rapide — pas d'overhead réseau ni de config distribuée                        |
| Transactions               | Simples — transactions ACID locales suffisantes pour le MVP                   |
| Tests                      | Modules testables indépendamment grâce aux interfaces                         |
| Évolutivité                | Excellente — chaque module peut être extrait en microservice quand nécessaire |
| Maintenabilité             | Bonne — séparation claire des responsabilités sans complexité opérationnelle  |
| Adéquation équipe 1-3 devs | Parfaite — productivité maximale avec structure solide                        |

## 3. Décision retenue

_Option C retenue — Monolithe modulaire. KOTIZ est construit comme une application Spring Boot unique, organisée en modules fonctionnels indépendants avec interfaces explicites. Une seule application au déploiement, mais conçue pour extraire des microservices à tout moment._

### 3.1 Structure des modules

| **Module**    | **Responsabilité**                                                 | **Package Java**       |
| ------------- | ------------------------------------------------------------------ | ---------------------- |
| core          | Infrastructure partagée : sécurité, audit, erreurs, configs, auth  | ci.kotiz.core          |
| savings       | Epargne : plans, transactions, ledger, intérêts, retraits          | ci.kotiz.savings       |
| agents        | Réseau agents : KYC, commissions, zones, rapports agent            | ci.kotiz.agents        |
| health        | Micro-assurance santé : souscriptions, sinistres, partenaires CIMA | ci.kotiz.health        |
| scoring       | Score de confiance : calcul, historique, signaux comportementaux   | ci.kotiz.scoring       |
| payments      | Paiements : mobile money, agrégateurs BIZAO/CinetPay, webhooks     | ci.kotiz.payments      |
| wa            | Bot WhatsApp : webhook Meta, router commandes, sessions, templates | ci.kotiz.wa            |
| notifications | Notifications sortantes : push, SMS (hors WhatsApp bot)            | ci.kotiz.notifications |
| admin         | Back-office : utilisateurs, rôles, reporting, audit trail          | ci.kotiz.admin         |

### 3.2 Règles d'isolation des modules

- Chaque module possède ses propres entités JPA, repositories et services — aucune dépendance directe sur les entités d'un autre module
- La communication inter-modules passe exclusivement par des interfaces de port (Spring @Service avec interface) — jamais par injection directe de repositories croisés
- Les événements métier cross-modules transitent par Spring Events (ApplicationEvent) — couplage lâche assuré
- Chaque module définit ses propres DTOs pour les données entrantes et sortantes — pas de partage d'entités JPA
- Les migrations de base de données sont séparées par module via des préfixes de table (ex. : savings_, agents_, health_)

### 3.3 Chemin vers les microservices (evolution future)

La structure modulaire est conçue dès le départ pour permettre l'extraction de microservices individuels. Lorsqu'un module atteint une masse critique nécessitant une équipe dédiée ou un déploiement indépendant :

- Étape 1 : vérifier l'absence de dépendances directes vers d'autres modules (uniquement via Events / interfaces)
- Étape 2 : extraire la base de données du module dans son propre schéma PostgreSQL
- Étape 3 : déployer le module comme un service Spring Boot indépendant
- Étape 4 : remplacer les Spring Events internes par Kafka ou RabbitMQ
- Étape 5 : ajouter un API Gateway (Spring Cloud Gateway ou Nginx) devant les services

## 4. Conséquences

### 4.1 Conséquences positives

- Déploiement d'un seul artefact JAR sur le VPS — simplicité opérationnelle maximale
- Transactions ACID locales pour tous les flux financiers du MVP — pas de saga distribuée
- Productivité équipe maximale : pas de latence réseau inter-services, débogage simple
- Architecture évolutive : chaque module peut devenir un microservice quand l'équipe grandit
- Tests unitaires et d'intégration simples avec H2 en mémoire ou Testcontainers

### 4.2 Contraintes acceptées

- Déploiement unique : une panne affecte tous les modules — mitigé par health checks, circuit breakers et runbook de redémarrage
- Scalabilité horizontale limitée au démarrage : toute l'application scale ou rien — acceptable pour le MVP
- Discipline d'équipe requise pour respecter les règles d'isolation entre modules

### 4.3 Indicateurs de déclenchement de migration

| **Indicateur**       | **Seuil de migration recommandé**                                      |
| -------------------- | ---------------------------------------------------------------------- |
| Taille de l'équipe   | Dès que 2 équipes travaillent sur des modules différents simultanément |
| Charge par module    | Quand un module consomme >60% des ressources du VPS                    |
| Délai de déploiement | Quand le temps de build + test dépasse 15 minutes                      |
| Volume transactions  | Dès que les transactions mensuelles dépassent 500 000                  |

## 5. Statut et révision

| **Statut**             | ACCEPTÉE                                                       |
| ---------------------- | -------------------------------------------------------------- |
| **Date de décision**   | 21 avril 2026                                                  |
| **Décideurs**          | Henoch (Fondateur), Desiré (CTO)                               |
| **Prochaine révision** | Sprint 6 — post-lancement MVP (6 mois)                         |
| **ADRs liés**          | ADR-001 (Spring Boot), ADR-003 (PostgreSQL), ADR-004 (Flutter) |
| **Référence interne**  | KOTIZ/ARCH/ADR-002                                             |
