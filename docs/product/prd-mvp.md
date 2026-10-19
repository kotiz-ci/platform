---
workflowType: prd
workflow: edit
version: 1.2
date: 2026-06-03
author: Henoch Lonzo Koffi
company: KOTIZ SAS — Abidjan, Côte d'Ivoire
classification:
  domain: fintech
  subDomain: inclusive-finance
  projectType: multi-surface
  complexity: high
inputDocuments:
  - KOTIZ/_archive/2026-10-docs-avant-migration/04_Produit/KOTIZ_PRD_MVP.docx (v1.0, 19 avril 2026, archive)
  - KOTIZ/_archive/2026-10-docs-avant-migration/04_Produit/KOTIZ_Catalogue_Modules.docx (19 modules V1/V2/V3)
  - KOTIZ/_archive/2026-bmad/_bmad-output/brainstorming/brainstorming-session-2026-04-23-1800.md
stepsCompleted:
  - step-e-01-discovery
  - step-e-02-review
  - step-e-03-edit
editHistory:
  - date: 2026-04-24
    version: 1.1
    author: Henoch Lonzo Koffi (avec BMad Edit Workflow)
    changes: |
      Synchronisation brainstorming 23 avril (7 décisions produit).
      Migration Markdown + atomisation FR/NFR avec IDs et trace.
      Ajout sections conformité (RGPD, STR CENTIF, SoD, PCI-DSS, device permissions).
      Ajout 3 parcours : bundle Santé J+1, parrainage Score Booster, alerte anti-churn 3j, recap hebdo partageable.
      Réécriture §5.4 Score en 5 étoiles avec 5 paliers progressifs.
      Suppression §5.5 Socle technique (déplacé vers HLD).
      Correction bus factor équipe (dev #2 avant S1).
confidentiality: Document interne confidentiel — Ne pas diffuser sans autorisation écrite
---

# KOTIZ — Product Requirements Document

## MVP — 3 mois · Épargne · Agents · Santé · Score

> Plateforme de micro-épargne et services financiers inclusifs pour le secteur informel en Côte d'Ivoire
> Version 1.1 · 24 avril 2026 · Henoch Lonzo Koffi · KOTIZ SAS · Abidjan

---

## 1. Executive Summary

KOTIZ est une plateforme de micro-épargne et de services financiers inclusifs pour le secteur informel ivoirien. La cible prioritaire est les 78 % d'Ivoiriens non-bancarisés — commerçantes de marché, artisans, conducteurs, vendeuses ambulantes — qui n'ont accès ni à un compte bancaire, ni à une couverture santé, ni à un historique financier exploitable.

### Positionnement

KOTIZ digitalise le **signe signe** — le système de collecte d'épargne quotidienne informel ivoirien. L'agent KOTIZ remplace le collecteur traditionnel ; l'app remplace le carnet ; au lieu de perdre 1 jour de collecte (soit 3,2 % du capital), la cliente **gagne** : rendement préservé, santé protégée, score de confiance construit, accès progressif au terrain.

**Message de vente :** « Tu gagnes » (pas « tu paies moins »). Pitch agent : « 550 FCFA / jour = épargne + santé ».

### Ce que livre le MVP (mai → juillet 2026, 6 sprints)

4 briques fonctionnelles livrées ensemble, sans tontine (reportée stratégiquement en V2).

- **KOTIZ Épargne** — dépôts dès 100 FCFA, objectifs nommés, verrouillage optionnel, récompenses streak.
- **KOTIZ Agents** — réseau d'agents certifiés pour cash-in/cash-out et onboarding assisté.
- **KOTIZ Santé bundlée** — micro-assurance CIMA souscrite **dès J+1 au premier dépôt** (3 formules 50/100/200 FCFA/j). Gestion sinistres manuelle assureur en MVP (digitalisation complète en V1).
- **KOTIZ Score** — score en **5 étoiles** (1 ⭐ → 5 ⭐) basé sur la régularité et la stabilité d'épargne, avec 5 paliers d'avantages progressifs. Socle invisible de tous les services financiers futurs.

### KPIs cibles fin MVP (fin juillet 2026)

- 1 000 utilisatrices actives (Abidjan : Adjamé, Yopougon, Abobo, Treichville)
- 50 agents KOTIZ opérationnels
- ≥ 200 souscriptions Santé (taux bundle cible ≥ 40 % des nouvelles inscriptions J+1)
- Rétention S4 ≥ 40 %
- NPS ≥ 40 sur les 100 premières clientes interrogées
- Taux d'échec mobile money ≤ 3 % sur 30 jours glissants
- CAC ≤ 2 500 FCFA
- LTV / CAC ≥ 1 dès le mois 1 (grâce au bundle Santé J+1)

### Équipe MVP

- **CTO** : Desiré Kouadio (architecture, backend, revue de code, recrutement devs).
- **Dev #2 backend** : **à recruter AVANT le sprint 1** (bus factor identifié comme risque critique — cf. §14). Priorité P0 absolue avant démarrage.
- **Dev #3 mobile** : à recruter avant S2.
- **Product Owner** : Henoch Lonzo Koffi (backlog, priorisation, acceptation).
- **UX prestataire** : 4 premières semaines (maquettes, prototype, tests terrain Adjamé).
- **QA prestataire** : à partir du sprint 4.

### Budget MVP estimatif

| Poste                                                           | Montant (M FCFA) |
| --------------------------------------------------------------- | ---------------- |
| Salaires équipe (CTO + 2 devs + QA + UX)                        | 18               |
| Licences et APIs (Meta WhatsApp, SMS, cloud, monitoring)        | 3                |
| Frais commerciaux partenariats (mobile money, assureur, agents) | 2                |
| Marketing test (Adjamé, agents, referral WhatsApp)              | 4                |
| **Total MVP**                                                   | **27**           |

Inclus dans le budget global 45 M FCFA MVP. Marge 18 M FCFA pour contingence et phase B de lancement.

---

## 2. Positionnement et identité produit

### Qui nous sommes

KOTIZ est une plateforme de micro-épargne et de services financiers accessibles, pensée pour les populations informelles d'Afrique de l'Ouest. Elle combine **l'épargne quotidienne digitalisée (signe signe)**, **un réseau humain d'agents de confiance**, **l'accès immédiat à la micro-assurance santé**, et **un score comportemental** qui ouvre progressivement l'accès au crédit, à l'investissement et aux opportunités patrimoniales.

### Le signe signe comme fondement culturel

Le signe signe est un système d'épargne informel où un collecteur passe quotidiennement encaisser une petite somme contre une marque (« signe ») sur un carnet. Le collecteur conserve 1 jour de collecte sur 31 (soit ≈ 3,2 %) comme commission. Ce système est profondément ancré dans les marchés ivoiriens et sert aujourd'hui près de 5 millions de personnes dans l'informel ouest-africain.

KOTIZ digitalise le signe signe :

- Le **collecteur** devient l'**agent KOTIZ certifié**, formé et responsabilisé.
- Le **carnet** devient l'**app** avec confirmation temps réel et traçabilité complète.
- Au lieu de perdre 3,2 %, la cliente **gagne** : rendement préservé, bonus Score, santé, progression vers le crédit et l'immobilier.

Cette digitalisation ne cherche pas à remplacer un comportement existant — elle le renforce en lui donnant un meilleur retour émotionnel et financier.

### Ce que nous ne sommes PAS (et pourquoi)

**KOTIZ n'est pas une application de tontine.** La tontine digitale existe déjà dans Orange Money, Wave, MTN MoMo et plusieurs apps locales. Se battre sur ce terrain reviendrait à entrer sur un marché commodité, non différenciant, avec des concurrents aux poches beaucoup plus profondes.

La tontine reste un module important de la roadmap KOTIZ, mais elle arrivera en **V2**, après que la marque soit installée sur le terrain de l'épargne, de la santé et du score de confiance. À ce moment-là, KOTIZ Tontine sera perçue comme un prolongement naturel d'une plateforme financière établie, pas comme sa raison d'être.

### Proposition de valeur — « Tu gagnes »

Pour **Fatou**, commerçante au marché d'Adjamé, 34 ans, KOTIZ résout quatre problèmes simultanés qu'aucun acteur ne traite aujourd'hui de façon intégrée :

1. Elle ne peut pas épargner de façon sécurisée parce que son argent reste à la maison ou dans son pagne, où il se dépense ou se perd.
2. Elle n'a aucune couverture santé, et une maladie de ses enfants peut effacer 6 mois d'économies.
3. Elle n'a aucun historique financier exploitable par une institution — donc aucun accès au crédit légal.
4. Elle a du mal à distinguer les vraies opportunités des arnaques, et se sent exclue de l'économie formelle.

KOTIZ lui offre :

- Une épargne quotidienne dès **100 FCFA** gérée sur son téléphone ou via Moussa, l'agent KOTIZ de son marché.
- Une **couverture santé abordable dès J+1** (50 FCFA/j pour sa famille) — pas dans 3 mois, dès son premier dépôt.
- Un **Score KOTIZ en étoiles** qui, mois après mois, construit son capital de confiance — qui ouvrira demain l'accès au crédit, à l'assurance préférentielle, aux investissements patrimoniaux et à un terrain.

**Le message de vente n'est pas « moins cher » — c'est « tu gagnes ».** 550 FCFA / jour = épargne quotidienne + couverture santé Famille. Plus aucune perte de 3,2 %. Plus de rupture scolaire. Plus d'invisibilité bancaire.

### Différenciateurs clés vs concurrence

| Critère                          | Orange Money / Wave / MTN             | KOTIZ MVP                                                                  |
| -------------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| Positionnement                   | Portefeuille électronique généraliste | Plateforme d'inclusion financière pour l'informel                          |
| Filiation culturelle             | Aucune — produit générique            | Digitalisation directe du signe signe                                      |
| Micro-épargne structurée         | Absente ou basique (wallet simple)    | Objectifs nommés, verrouillage, récompenses, projection visuelle           |
| Micro-assurance santé intégrée   | Non                                   | 3 formules 50/100/200 FCFA/j, souscription en 3 écrans, bundle J+1         |
| Score comportemental exploitable | Non exposé au client                  | Score 5 étoiles, 5 paliers d'avantages progressifs                         |
| Réseau humain de confiance       | Points de vente transactionnels       | Agents KOTIZ formés, identifiés (Moussa), rattachés à un marché / quartier |
| Canaux conversationnels          | App + USSD                            | App + USSD + WhatsApp Bot complet (cotiser, consulter, adhérer, support)   |
| Mode vocal optionnel             | Non                                   | Bouton haut-parleur sur écrans critiques + WhatsApp vocal                  |

---

## 3. Le problème à résoudre

### Le marché informel est bancairement invisible

78 % des Ivoiriens sont non-bancarisés (source Banque Mondiale Global Findex). La majorité vit d'une activité informelle : commerçantes de marché, artisans, transporteurs, vendeuses ambulantes, conducteurs de taxi et de mototaxi. Pour cette population, les services financiers formels restent hors d'atteinte pour trois raisons structurelles.

### 1. L'épargne est précaire — et amputée quand elle existe

Sans compte bancaire, Fatou garde son argent à la maison, dans son pagne, ou le confie à un collecteur signe signe informel. Ces mécanismes exposent à trois pertes :

- **Vol ou dispersion physique** : l'argent à domicile est vulnérable.
- **Pression sociale** : la famille élargie réclame des prêts dès qu'elle sait qu'il y a de l'argent.
- **Commission collecteur** : le système signe signe traditionnel prélève 1 jour sur 31 (≈ 3,2 %). Sur une année, 3 à 4 jours de collecte partent en commission — soit potentiellement plusieurs semaines de salaire informel perdues.

KOTIZ remplace cette perte par un **gain** : rendement préservé, bonus Score, et accès progressif à des produits patrimoniaux.

### 2. Aucune couverture en cas d'aléa de santé

La CMU (Couverture Maladie Universelle) ivoirienne couvre officiellement la population, mais son activation effective reste partielle dans l'informel, les remboursements complexes, et de nombreux soins restent à la charge des familles. Une hospitalisation d'un enfant peut effacer 6 à 12 mois d'économies. La peur du coût médical conduit souvent à reporter les consultations, aggravant la situation.

### 3. Pas d'historique financier = pas d'accès au crédit formel

Les IMF (institutions de microfinance) demandent : un bulletin de salaire (Fatou n'en a pas), une caution solidaire (risqué socialement), des garanties matérielles (rares). Les taux d'intérêt des acteurs non régulés atteignent 30 à 50 % par an. La plupart des commerçantes financent leur stock quotidien sur le marché parallèle, à des conditions abusives.

### Pourquoi la solution passe par le score comportemental

La seule manière de donner à Fatou un accès à des services financiers équitables sans passer par un bulletin de salaire ou une garantie matérielle, c'est de construire un historique comportemental exploitable par des partenaires tiers (assureurs, IMF, banques, investisseurs). C'est l'objet du **KOTIZ Score** — le socle invisible du MVP.

Le Score remplace le bulletin de salaire par la **régularité**. Il remplace la garantie matérielle par la **stabilité**. Il remplace la caution solidaire par un **track record vérifiable**. C'est la colonne vertébrale de toute la roadmap KOTIZ, de l'épargne au micro-crédit jusqu'à la Bourse diaspora en V3.

---

## 4. Personas canoniques

Trois personas définissent qui utilise KOTIZ. Ils sont **invariants** — aucun livrable produit ne doit en introduire d'autres sans arbitrage explicite.

### Fatou — cliente principale

> _« Je veux mettre de côté sans que l'argent disparaisse, et protéger mes enfants si je tombe malade. »_

**Profil**
Commerçante au marché d'Adjamé, 34 ans, 3 enfants scolarisés, vit à Abobo. Téléphone : smartphone Android Tecno d'entrée de gamme (Android 9, 2 Go RAM). Connexion 3G/4G instable, data limitée. Lit et écrit le français ; bambara à l'oral uniquement. Usage quotidien de WhatsApp (groupes famille + tontines informelles).

**Accessibilité — contrainte critique**
Fatou a un niveau d'alphabétisation intermédiaire sur le texte technique. Pour compenser :

- Toutes les actions critiques proposent un **bouton haut-parleur (mode vocal)** qui lit à voix haute ce qui est affiché. Le vocal est **optionnel** — pas activé par défaut.
- Les choix se font par **icônes universelles** (cadenas pour verrouillage, main ouverte pour flex, étoiles pour le Score).
- Le bot WhatsApp accepte et répond en **vocal** (optionnel, activable à la demande).

**Parcours type avec KOTIZ**
Elle s'inscrit via Moussa, l'agent KOTIZ qui vient régulièrement sur le marché. **Dès ce premier rendez-vous, elle souscrit aussi la formule Santé Famille (50 FCFA/j) en bundle** (cf. §7 Parcours 1). Elle verse 500 FCFA tous les matins avant d'ouvrir son étal, soit via l'app, soit en espèces auprès de Moussa. Tous les vendredis, elle reçoit sur WhatsApp un récap de la semaine et l'évolution de son Score. À la rentrée scolaire, elle débloque l'objectif « école des enfants » qu'elle a programmé.

**Frictions à lever**

- Illettrisme partiel sur certains écrans techniques → mode vocal optionnel.
- Méfiance vis-à-vis des apps qu'elle ne connaît pas → Moussa comme intermédiaire de confiance.
- Expérience de fraudes mobile money passées → communication réconciliation quotidienne + garantie remboursement agent.
- Pression sociale (famille qui demande de l'argent) → objectifs verrouillés + code PIN.

**Canaux privilégiés**
WhatsApp (canal principal conversationnel), App mobile (pour les actions importantes), rencontre physique avec Moussa (confiance locale). USSD uniquement en dépannage.

### Moussa — agent terrain KOTIZ

> _« J'accompagne 80 épargnantes, je suis leur visage KOTIZ et je gagne ma vie à la commission. »_

**Profil**
Agent terrain indépendant, 28 ans, vit dans le même quartier que ses clientes. Ancien conducteur de mototaxi. Formé par KOTIZ sur 3 jours avec test final. Smartphone fourni par KOTIZ à l'enrôlement, contrat de mandat commercial.

**Parcours type avec KOTIZ**
Il enrôle des nouvelles clientes sur le marché (KYC simplifié avec photo CNI), **bundle immédiatement une formule Santé adaptée au profil**, collecte les dépôts en espèces et les bascule vers les wallets, assiste les clientes en cas de problème (PIN oublié, échec de paiement). Il voit en temps réel sa commission du jour et le statut de ses clientes.

**Anti-churn : alerte 3 jours**
Si une de ses clientes n'a pas cotisé depuis 3 jours, Moussa reçoit une notification « Fatou n'a pas cotisé depuis 3 jours — passe la voir » avec rappel du pourquoi de son épargne (cf. §7 Parcours 7).

**Frictions à lever**

- Zones à forte densité (Adjamé, Marcory, Treichville) : concurrence entre agents → rattachement clientes ↔ agent unique.
- Gestion du cash physique → plafonds + alertes + caution.
- Sécurité personnelle → horaires, transport, contrat d'assurance.

**Canaux privilégiés**
App agent KOTIZ (mobile native dédiée), fallback USSD pour les clientes qui n'ont pas de smartphone, appel direct au support KOTIZ en cas de blocage.

### Ibrahima — admin back-office KOTIZ

> _« Je pilote les ops, les agents et la conformité, je suis les yeux de KOTIZ sur le terrain. »_

**Profil**
Gestionnaire back-office, 35 ans, profil RH ou ops junior. Travaille dans les bureaux KOTIZ à Abidjan. Ordinateur portable standard, navigateur Chrome. Profil bureautique courant.

**Parcours type avec KOTIZ**
Il supervise les inscriptions en attente de validation KYC Tier 2+, gère les agents (activation, désactivation, plafonds), **traite les alertes AML et rédige les STR (Suspicious Transaction Report) vers CENTIF-CI sous 24 h**, exporte les rapports mensuels pour la BCEAO et la CENTIF, traite les tickets support niveau 2.

**Séparation des fonctions (SoD)**
Ibrahima est un rôle **Ops**. Les rôles **Risk** (décisions de suspension AML complexes, validations > 500 k FCFA) et **Finance** (réconciliation, reporting financier) sont tenus par d'autres personnes (cf. §10.3).

**Frictions à lever**

- Volume croissant de tickets → filtres puissants et priorisation auto.
- Peur de rater une alerte critique → alertes multi-canal (email + SMS + push web).
- Pression sur les délais KYC Tier 2+ (24 h cible).

**Canaux privilégiés**
Console web back-office KOTIZ (bureau, grand écran), email, notifications temps réel sur les alertes critiques.

---

## 5. Product Scope — In Scope (MVP)

Le MVP KOTIZ est défini par **4 briques fonctionnelles**. Toute demande d'ajout en cours de route doit être explicitement arbitrée par Henoch (product owner) en fonction de l'impact sur la capacité de l'équipe.

> Note : le « socle technique » (stack, infra, sécurité technique) n'est plus dans ce PRD v1.1 — il est dans `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_HLD.docx`. Les principes produit (offline-soft, multi-canal, conformité BCEAO) restent ici et sont formalisés en §9 NFRs.

### 5.1 Brique Épargne

C'est la brique centrale du MVP : sans elle, aucune des autres briques ne tient. L'épargne construit le Score, finance la Santé, et justifie la présence des Agents sur le terrain.

**Objectifs fonctionnels**

- Permettre à Fatou de déposer dès 100 FCFA par jour, depuis l'app, l'USSD, WhatsApp ou en cash chez Moussa.
- Créer et nommer un objectif d'épargne (« École enfants », « Rentrée scolaire », « Stock Tabaski »).
- Verrouiller optionnellement l'épargne jusqu'à une date cible (déverrouillage anticipé possible mais pénalise le Score).
- Visualiser chaque jour ce qui est épargné, la progression vers l'objectif, la série (« streak ») de jours consécutifs.
- Récompenses symboliques (badges, bonus Score) pour les séries de 7, 30, 90 jours.
- **Nouveau : bundle Santé J+1** — à la première souscription épargne, l'utilisatrice se voit proposer la Santé Famille (50 FCFA/j) en 2 clics supplémentaires. Cible ≥ 40 % d'adhésion bundle.

**Règles métier clés**

| Règle                                      | Valeur MVP                    | Justification                                                                          |
| ------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------- |
| Montant minimum de dépôt                   | 100 FCFA                      | Seuil psychologique accessible à une commerçante de marché                             |
| Montant maximum par dépôt                  | 500 000 FCFA                  | Cohérent avec les plafonds EME BCEAO et les volumes informels observés                 |
| Solde maximum d'un wallet                  | 2 000 000 FCFA                | Plafond Tier 1 BCEAO (auto-validé par agent) — Tier 2+ au-delà                         |
| Objectifs simultanés par utilisatrice      | 3 objectifs max               | Simplicité cognitive                                                                   |
| Minimum quotidien pour préserver le streak | 100 FCFA                      | Permet de préserver le streak même les jours difficiles                                |
| Déverrouillage anticipé                    | Autorisé, avec malus Score    | Ne pas pénaliser trop fort — Fatou garde le contrôle                                   |
| Rémunération du solde                      | Non en MVP (décision produit) | Éviter le statut de collecteur d'épargne réglementé. Remplacé par récompenses et Score |

**Parcours utilisateur type (dépôt quotidien app)**

1. Fatou ouvre l'app. Écran d'accueil : solde, objectif principal, progression, étoiles, bouton « Cotiser maintenant ».
2. Elle tape « Cotiser ». Choisit le montant (100 / 500 / 1 000 / personnalisé) et l'objectif à alimenter.
3. Elle choisit le moyen : Orange Money / Wave / MTN MoMo. Autorise le débit.
4. Confirmation visuelle immédiate (succès ou échec). Son KOTIZ distinctif joué à la confirmation.
5. Notification push + message WhatsApp récapitulatif optionnel. Badge « streak +1 » affiché.

**KPI de la brique Épargne**

- Nombre de dépôts / utilisatrice active / semaine (cible MVP : ≥ 3).
- Montant moyen épargné / utilisatrice / semaine (cible MVP : ≥ 1 500 FCFA).
- Taux de complétion d'objectif (cible MVP : ≥ 30 % des objectifs atteints dans les 90 j).
- Taux d'échec de paiement mobile money (cible ≤ 3 %).
- **Taux de bundle Santé J+1 (cible ≥ 40 %).**

**Dépendances**

- Intégrations mobile money : Orange Money, Wave, MTN MoMo (contrats signés — dépendance critique).
- Wallet interne : cf. HLD.
- Score : chaque dépôt alimente le calcul de régularité.
- Santé : le module bundle doit être prêt en S4 (pas S5).

### 5.2 Brique Agents

Le réseau d'agents est la différence la plus visible entre KOTIZ et les wallets génériques. C'est le relais humain qui rassure Fatou et qui fait exister la marque physiquement à Adjamé. Il est aussi le **successeur direct du collecteur signe signe traditionnel**, avec une ambition différente : au lieu de prélever une commission, il accompagne la croissance du Score et du capital de sa cliente.

**Pourquoi les agents sont critiques**

- Beaucoup de clientes n'ont pas de smartphone ou en ont peur. Moussa est leur interface.
- Le cash reste dominant dans l'informel — KOTIZ doit permettre de basculer du cash vers le digital sans friction.
- L'agent connaît les clientes, détecte les fraudes, absorbe le support niveau 1.
- En cas de problème technique, la confiance envers Moussa évite que la cliente quitte l'app pour toujours.

**Périmètre fonctionnel MVP**

- App agent mobile native dédiée (login par code + PIN, mode portrait, UI à gros boutons, pensée pour utilisation outdoor).
- Onboarding client en ≤ 5 minutes : saisie identité + photo CNI recto/verso + selfie + numéro téléphone. KYC Tier 1 auto-validé. Tier 2+ routé vers Ibrahima pour validation humaine.
- **Bundle Santé J+1 proposé à chaque onboarding** (formulaire de 3 questions intégré).
- Cash-in : l'agent reçoit le cash et crédite le wallet de la cliente. Confirmation SMS + WhatsApp à la cliente.
- Cash-out : la cliente débite son wallet vers l'agent, qui lui remet le cash.
- Tableau de bord agent : liste des clientes rattachées, transactions du jour, commission cumulée, solde float, **alertes anti-churn (clientes sans dépôt depuis 3 jours)**.
- Plafonds : l'agent ne peut dépasser un plafond journalier (2 M FCFA de transactions cumulées) sans validation back-office.

**Règles métier Agents**

| Règle                      | Valeur MVP                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| Commission par transaction | 0,5 % sur cash-in / 1 % sur cash-out, plafonnée à 500 FCFA / transaction                  |
| Plafond transaction unique | 200 000 FCFA                                                                              |
| Plafond cumulé journalier  | 2 000 000 FCFA, déblocable par Ibrahima sur justification                                 |
| Contrat                    | Mandat commercial — agent indépendant, rémunéré à la commission, responsable de son cash  |
| Formation obligatoire      | 3 jours présentiel + test final. Sans test passé, l'agent ne peut pas être activé         |
| Désactivation              | Admin peut suspendre un agent en un clic (alerte AML, plainte cliente, inactivité > 30 j) |

**KPI de la brique Agents**

- Nombre d'agents actifs (cible MVP : 50).
- Nombre de clientes moyennes par agent actif (cible MVP : ≥ 15).
- Taux d'enrôlements validés KYC en moins de 24 h (cible ≥ 95 %).
- **Taux de bundle Santé proposé à l'onboarding (cible ≥ 80 %).**
- **Taux d'adhésion bundle Santé (cible ≥ 40 % des proposés).**
- Incidents cash déclarés / mois (cible ≤ 1 %).

### 5.3 Brique Santé — bundle dès J+1

La Santé est la preuve concrète que KOTIZ protège. C'est un produit de couverture à coût très bas (50 / 100 / 200 FCFA par jour) opéré en partenariat avec un assureur CIMA agréé via un courtier. **KOTIZ est intermédiaire (courtier) — elle ne porte pas le risque assuranciel.**

**Positionnement repensé : bundle dès J+1**

Dans la version v1.0 du PRD, la Santé était positionnée comme une brique à livrer en sprint 5, en upsell. Le brainstorming du 23 avril a tranché : **la Santé est bundlée dès le J+1 au premier dépôt**. Raison : sans ce bundle, le LTV/CAC est dangereusement < 1 en année 1. Avec le bundle, ARPU x 2 et LTV/CAC > 1 dès le mois 1.

**Périmètre MVP : « read + souscription + bundle J+1 »**

L'utilisatrice peut :

- Recevoir la proposition de la formule Santé adaptée **dès le premier dépôt** (ou le jour suivant via push WhatsApp) — 2 clics pour accepter.
- Consulter les 3 formules (Famille 50 FCFA/j, Confort 100 FCFA/j, Premium 200 FCFA/j) avec description claire de la couverture.
- Simuler la couverture en fonction de la composition de son foyer (3 questions en ≤ 5 s).
- Souscrire en ligne, signer électroniquement les conditions particulières, payer la première mensualité.
- Voir à tout moment le statut de sa police (active, en attente, suspendue).
- Déclarer un sinistre par un formulaire simplifié + téléchargement de justificatifs (traitement, remboursement et communication côté assureur restent manuels en MVP).

La digitalisation complète des claims (suivi temps réel, acceptation/refus dans l'app, paiement automatique du remboursement) est prévue pour la **V1**, pas en MVP.

**Les 3 formules MVP**

| Formule | Prime        | Couverture                                                                           | Cible                                            |
| ------- | ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------ |
| Famille | 50 FCFA / j  | Consultations de base, médicaments génériques, 1 hospitalisation / an plafonnée      | Commerçantes à budget serré                      |
| Confort | 100 FCFA / j | Consultations + médicaments + hospitalisation + pédiatrie enfants scolarisés         | Familles avec enfants en âge scolaire            |
| Premium | 200 FCFA / j | Confort + maternité + spécialistes + 2 hospitalisations / an + capital décès modeste | Clientes plus aisées, score élevé, achat sponsor |

**Règles métier Santé**

- KOTIZ est intermédiaire d'assurance — licence CIMA via un partenaire courtier agréé.
- Commission KOTIZ : 20 à 25 % de la prime collectée (négociation en cours).
- Paiement : prélèvement automatique hebdomadaire ou mensuel sur le wallet, avec retry en cas d'échec.
- Suspension : 2 prélèvements consécutifs échoués → police suspendue. Réactivation possible sous 30 j.
- **Score KOTIZ ≥ 4 étoiles (équivalent 600+) = 10 % de réduction sur Confort** (Santé préférentielle — mécanique palier).
- Sinistres : délai de traitement contractuel 15 jours. Suivi affiché dans l'app : Reçu / En cours / Décision / Payé.

**KPI de la brique Santé**

- Taux de souscription bundle J+1 (cible MVP : ≥ 40 % des nouvelles inscriptions).
- Nombre de clientes souscrites à fin juillet 2026 (cible : ≥ 200, révisée à la hausse vs v1.0 grâce au bundle).
- Taux de réussite des prélèvements Santé (cible ≥ 97 %).
- Délai moyen de traitement des sinistres déclarés (cible ≤ 15 jours).
- NPS Santé post-premier sinistre (cible ≥ 35).

**Dépendances**

- Partenariat assureur CIMA signé avant le sprint 3 — dépendance critique.
- Documents PDF conditions générales validés par l'avocat conformité.
- Canal WhatsApp ouvert pour l'envoi d'attestations.
- Module bundle intégré au sprint 4 (pas S5).

### 5.4 Brique Score — 5 étoiles

Le Score est la colonne vertébrale invisible du MVP et la différence stratégique majeure avec n'importe quel wallet mobile money. Il transforme chaque cotisation, chaque objectif tenu, chaque mois d'activité en un **capital de confiance** exploitable par des tiers.

> **Changement majeur v1.1** : le modèle 0-1000 a été remplacé par un **modèle 5 étoiles** avec paliers d'avantages progressifs, suite au brainstorming du 23 avril. Raison : un chiffre sur 1000 est trop abstrait pour l'informel. Les étoiles sont universelles et chaque étoile gagnée déclenche un avantage tangible.

**Objectifs fonctionnels**

- Calculer pour chaque utilisatrice un score visible en **étoiles (1 ⭐ → 5 ⭐)**, mis à jour chaque nuit.
- Sous le capot : valeur numérique 0-1000 conservée pour les partenaires (IMF, assureurs) qui consomment une API Score.
- Afficher le score dans l'app sous forme gamifiée (étoiles remplies, étoile partielle en cours, prochain palier visible).
- Expliquer en langage simple pourquoi le score monte ou baisse.
- Connecter le score aux avantages : une valeur ≥ 4 étoiles ouvre la Santé préférentielle dès le MVP.

**Composition du Score v1 (visible à l'utilisatrice)**

| Composante             | Poids | Ce qui fait monter / baisser                                                                                     |
| ---------------------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| Régularité d'épargne   | 40 %  | Nombre de jours sur 30 où un dépôt ≥ 100 FCFA a été effectué. Séries (streak) bonifiées                          |
| Stabilité des montants | 25 %  | Écart-type des montants hebdomadaires. Un comportement stable est mieux noté qu'un comportement erratique        |
| Ancienneté active      | 20 %  | Nombre de mois depuis l'inscription avec au moins 1 dépôt dans le mois. Récompense la fidélité                   |
| Engagement multi-canal | 15 %  | Diversité des interactions : app, WhatsApp, USSD, agent. Plus l'utilisatrice est active, plus le signal est fort |

**Paliers Score — 5 étoiles avec avantages concrets**

| Étoiles    | Tranche numérique | Label     | Avantages débloqués                                                           |
| ---------- | ----------------- | --------- | ----------------------------------------------------------------------------- |
| ⭐         | 0 – 200           | Débutante | Accès de base à l'épargne et au bundle Santé Famille                          |
| ⭐⭐       | 201 – 400         | Régulière | Récap WhatsApp vocal personnalisé hebdomadaire                                |
| ⭐⭐⭐     | 401 – 600         | Fiable    | 1 consultation téléphone gratuite avec infirmier partenaire par mois          |
| ⭐⭐⭐⭐   | 601 – 800         | Confirmée | Santé préférentielle (–10 % sur la formule Confort)                           |
| ⭐⭐⭐⭐⭐ | 801 – 1000        | Premium   | Priorité sur le crédit V2 + éligibilité au programme terrain (KOTIZ Cité, V3) |

**Règles métier Score**

- Calcul batch quotidien (job nocturne) à partir des événements du jour.
- Transparence : chaque utilisatrice peut voir les 4 composantes chiffrées et savoir quelle action aurait quel impact (« Si tu cotises 7 jours d'affilée, tu passeras à 4 étoiles »).
- Anti-gaming : les dépôts suivis d'un retrait sans délai ne comptent pas dans la régularité (on mesure l'épargne nette, pas le flux).
- Version v1 — l'algorithme sera ajusté au vu du comportement réel observé après 3 mois de production.

**Usages en MVP**

- Affichage dans l'app (valeur étoiles + niveau + évolution mensuelle).
- Santé préférentielle (4 ⭐) : –10 % sur la formule Confort.
- Message WhatsApp mensuel : « Fatou, tu es passée de 3 à 4 étoiles ce mois-ci 👏 — tu débloques –10 % sur Confort. »
- Consultation téléphone (3 ⭐) : routage vers infirmier partenaire via bot WhatsApp ou appel.

**Dépendances**

- Données d'événements : dépôts, retraits, interactions (cf. HLD).
- Job scheduler nocturne et monitoring des calculs.
- Revue produit mensuelle pour ajuster les coefficients (si dérive).
- Partenariat infirmier partenaire pour 3 ⭐ (à finaliser avant S5).

---

## 6. Channels Matrix

KOTIZ est une plateforme multi-canal dans laquelle aucun canal n'est accessoire. Chaque canal couvre des cas d'usage distincts, avec des niveaux de richesse d'expérience différents. La cliente doit pouvoir basculer librement de l'un à l'autre.

### Matrice des fonctionnalités par canal

| Fonctionnalité            | App mobile cliente     | USSD *XXX#       | WhatsApp Bot       | Agent terrain       | Console web admin |
| ------------------------- | ---------------------- | ---------------- | ------------------ | ------------------- | ----------------- |
| Inscription / KYC Tier 1  | ✅ (auto)              | ✅ (basique)     | Redirection app    | ✅ (assisté)        | —                 |
| Validation KYC Tier 2+    | —                      | —                | —                  | —                   | ✅                |
| Bundle Santé J+1          | ✅                     | —                | ✅ (guidé)         | ✅ (assistance)     | —                 |
| Consultation solde        | ✅                     | ✅               | ✅                 | Via l'agent         | ✅                |
| Dépôt wallet (digital)    | ✅                     | ✅               | ✅ (lien paiement) | —                   | —                 |
| Dépôt cash                | —                      | —                | —                  | ✅ (rôle principal) | —                 |
| Créer / modifier objectif | ✅ (complet)           | ✅ (simplifié)   | Via template WA    | Assistance          | —                 |
| Souscription Santé        | ✅ (complet)           | Initiation seule | ✅ (guidée)        | Assistance          | —                 |
| Visualisation Score       | ✅ (graphique étoiles) | Valeur seule     | Étoiles + conseil  | Via l'agent         | —                 |
| Mode vocal                | ✅ (bouton HP)         | —                | ✅ (vocaux)        | —                   | —                 |
| Support niveau 1          | FAQ + chat             | Menu aide        | ✅ (bot + humain)  | ✅ (principal)      | —                 |
| Alerte AML / STR          | —                      | —                | —                  | —                   | ✅ (Ibrahima)     |

> Le code USSD `*XXX#` est un placeholder — code à assigner par le régulateur télécom avant production.

### Principes par canal

- **WhatsApp Bot = canal conversationnel principal** : 90 %+ des mobiles ivoiriens l'ont, coût d'acquisition nul, viralité organique via groupes familiaux. Accepte les messages vocaux (in & out).
- **USSD garantit l'inclusion** des clientes feature phone et les cas de panne data — menu 4 niveaux maximum, aucune saisie longue.
- **L'App mobile** est l'expérience la plus riche, positionnée comme la référence visuelle, le lieu de la marque et du Score.
- **L'Agent** est le canal de confiance et le point d'entrée cash — son importance ne se mesure pas en nombre de features mais en taux de conversion, rétention et bundle Santé.
- **Console web admin** (Ibrahima, Risk, Finance) : gestion interne, conformité, reporting.

### Device permissions (app mobile cliente & agent)

| Permission                      | Usage                                           | Critère                         | Fallback si refus                           |
| ------------------------------- | ----------------------------------------------- | ------------------------------- | ------------------------------------------- |
| Caméra                          | Scanner CNI recto/verso + selfie à l'onboarding | Obligatoire                     | Impossible d'onboarder — reroute vers agent |
| Stockage local                  | Queue offline des dépôts                        | Obligatoire                     | Mode « en ligne strict » (dégradé)          |
| Notifications push              | Confirmations dépôt, streak, score, bundle      | Recommandé                      | Fallback sur SMS + WhatsApp                 |
| Localisation                    | Association agent le plus proche (optionnel)    | Optionnel                       | Saisie manuelle du marché                   |
| Biométrie (Face ID / empreinte) | Connexion rapide (optionnel)                    | Optionnel                       | PIN 4 chiffres par défaut                   |
| Contacts                        | Parrainage amie                                 | Demandé au moment du parrainage | Saisie manuelle du numéro                   |

### WhatsApp Bot comme surface

Le bot WhatsApp est une surface autonome avec :

- Un arbre de dialogue versionné (5-10 intents principaux : `cotiser`, `solde`, `score`, `santé`, `aide`, `parrainer`, `vocal on/off`).
- Acceptation des messages vocaux (transcription STT backend).
- Réponses vocales pour les utilisatrices 2 ⭐+ (avantage Score — cf. §5.4).
- Hand-off humain vers Moussa ou support KOTIZ si le bot ne comprend pas après 2 tours.
- Fallback si API Meta down : SMS + push natif + message dans l'app.

---

## 7. User Journeys (MVP)

Ces parcours sont les plus critiques du MVP. Ils doivent être testés sur le terrain à Adjamé avant la mise en production avec au moins 10 clientes non formées par persona.

### P1 — Onboarding bundle Épargne + Santé J+1 (via Moussa)

Ce parcours remplace l'onboarding v1.0 en y intégrant le bundle Santé dès le premier rendez-vous. **C'est le parcours le plus critique du MVP** — il conditionne le LTV/CAC.

1. Moussa rencontre Fatou sur le marché.
2. Onboarding en ≤ 5 minutes (CNI scannée, selfie, OTP saisi par Fatou).
3. **Moussa propose immédiatement le bundle Santé** : « Avec ton épargne, tu peux déjà protéger tes enfants. 50 FCFA / jour, ça marche ? » (2 clics supplémentaires dans l'app agent).
4. Si bundle accepté : 3 questions foyer (en vocal possible) → recommandation formule Famille affichée.
5. Premier dépôt cash 500 FCFA + première prime Santé J+1 prélevée du wallet après confirmation de la cliente (délai 24 h pour annuler sans frais).
6. Confirmation SMS + WhatsApp à Fatou (épargne créée + police Santé active J+1).
7. Fatou reçoit un message WhatsApp de bienvenue avec ses codes, l'attestation Santé et un lien pour installer l'app.

- **Objectif** : Fatou comprend ce qu'elle vient de faire, son argent est en sécurité, elle sait que sa famille est protégée, elle sait comment contacter Moussa.
- **Critère de succès** : ≥ 40 % des onboardings → bundle Santé accepté.

### P2 — Dépôt quotidien autonome (app ou WhatsApp)

1. Fatou ouvre l'app, clique « Cotiser », choisit 500 FCFA, confirme via Orange Money / Wave / MTN MoMo.
2. Alternative WhatsApp : elle écrit « cotiser 500 » (ou envoie un vocal « mets-moi 500 KOTIZ ») au bot, reçoit un lien de paiement, confirme.
3. Retour visuel immédiat : solde mis à jour, streak +1, son KOTIZ distinctif, notification push, message WhatsApp récap.

- **Objectif** : rendre le geste quotidien aussi simple que recharger son téléphone.

### P3 — Souscription Santé autonome (si pas bundle J+1)

Pour les utilisatrices qui n'ont pas accepté le bundle à l'onboarding et y reviennent plus tard.

1. Fatou ouvre l'onglet « Santé » dans l'app.
2. Elle répond à 3 questions (composition foyer, âge des enfants, budget mensuel envisagé) — mode vocal optionnel.
3. L'app lui recommande une formule et en explique les limites en clair, sans jargon.
4. Elle lit (ou écoute) les conditions particulières, coche « J'ai compris ».
5. Premier paiement débité du wallet. Attestation d'adhésion envoyée par WhatsApp et SMS.

- **Objectif** : convertir la confiance bâtie par l'épargne en adhésion à un produit de protection.

### P4 — Évolution Score + déclenchement Santé préférentielle

1. Après 60 jours de dépôts réguliers, le Score de Fatou franchit la tranche 4 étoiles (601).
2. Notification app + WhatsApp : « Fatou, tu es passée à 4 ⭐ ! Tu débloques –10 % sur Confort. »
3. Fatou peut renégocier sa prime (baisse de 100 à 90 FCFA/j) ou passer à Confort depuis Famille.

- **Objectif** : matérialiser la valeur du Score dès le MVP, pour qu'il ne soit pas une promesse abstraite.

### P5 — Gestion d'une alerte AML et STR CENTIF-CI

1. Le système détecte une transaction inhabituelle (ex : 3 cash-in > 100 k FCFA chez un même agent dans la journée, ou pattern erratique sur un wallet).
2. Ibrahima reçoit une alerte dans la console back-office, statut « À traiter ».
3. Il ouvre la fiche cliente et l'historique, contacte l'agent et la cliente, décide.
4. **Si suspect** : suspension du compte + **rédaction STR dans la console** + envoi automatique à CENTIF-CI dans les 24 h + archivage (rétention 10 ans).
5. Revue Risk par un second rôle (SoD) sur les cas > 500 k FCFA.

- **Objectif** : prouver que la conformité LBC/FT fonctionne dès la mise en production.

### P6 — Parrainage Score Booster (viralité)

1. Fatou reçoit une notification WhatsApp après sa 10ᵉ cotisation : « Invite une amie et gagnez chacune +5 points Score. »
2. Elle tape le bouton « Parrainer » → choix du contact WhatsApp ou saisie numéro.
3. Son amie Awa reçoit un message personnalisé de Fatou avec un lien d'inscription.
4. Si Awa s'inscrit et fait son premier dépôt dans les 7 jours : +5 points Score pour chacune.
5. Bonus « onboarding à deux » : si les deux s'inscrivent le même jour via le même agent, chacune gagne 200 FCFA de bonus crédité sur le wallet (promo MVP limitée).

- **Objectif** : CAC ≤ 2 500 FCFA via viralité organique.
- **Critère de succès** : 30 % des utilisatrices actives utilisent le parrainage dans les 60 jours.

### P7 — Alerte anti-churn 3 jours

1. Fatou n'a pas cotisé depuis 3 jours. Le système détecte l'inactivité.
2. Push vocal WhatsApp à Fatou : « Salut Fatou, même 100 FCFA aujourd'hui ça compte — tu es à 2 jours de perdre ton streak. » (vocal en dioula si dispo, sinon français).
3. Rappel visuel de son objectif (« École des enfants ») avec la photo qu'elle a uploadée à l'onboarding — ancrage émotionnel.
4. En parallèle, Moussa reçoit une alerte sur son app agent : « Fatou n'a pas cotisé depuis 3 j — passe la voir. »
5. Si pas de reprise après 7 jours : escalade vers une intervention humaine (appel de Moussa).

- **Objectif** : rétention S4 ≥ 40 %.
- **Critère de succès** : taux de reprise dépôt ≤ 7 j après alerte ≥ 60 %.

### P8 — Recap partageable hebdomadaire (viralité + engagement)

1. Chaque vendredi 19 h, Fatou reçoit un récap WhatsApp : « Cette semaine tu as épargné 3 500 FCFA. Tu es à 3 ⭐ 🏆. Streak : 12 jours. Objectif École : 43 % atteint. »
2. Format carte partageable (image générée) avec son prénom (sans montants visibles si partagé, pour le respect de la vie privée).
3. Bouton « Partager mes étoiles » → message pré-rédigé sur WhatsApp.

- **Objectif** : viralité organique + engagement.
- **Critère de succès** : 15 % des récaps sont partagés.

---

## 8. Functional Requirements (atomisés)

Chaque FR suit le format `[Acteur] peut [capacité]`, avec critère d'acceptation testable et lien `trace` vers les parcours (§7) qui le réalisent.

### 8.1 Épargne (FR-EP-xx)

**FR-EP-01 — Dépôt multi-canal dès 100 FCFA**

- **Acteur** : Fatou (cliente).
- **Capacité** : déposer un montant ≥ 100 FCFA et ≤ 500 000 FCFA via app, USSD, WhatsApp, ou cash chez agent.
- **Critère d'acceptation** : dépôt confirmé en ≤ 10 s avec notification push + WhatsApp. Solde wallet mis à jour de façon atomique.
- **trace** : [P1, P2, P6]

**FR-EP-02 — Création d'objectif d'épargne nommé**

- **Acteur** : Fatou.
- **Capacité** : créer jusqu'à 3 objectifs simultanés, nommés, avec montant cible et date cible optionnelle.
- **Critère d'acceptation** : création en ≤ 5 écrans. Objectifs visibles sur accueil.
- **trace** : [P2]

**FR-EP-03 — Verrouillage optionnel d'un objectif**

- **Acteur** : Fatou.
- **Capacité** : verrouiller un objectif jusqu'à une date cible. Déverrouillage anticipé possible avec malus Score.
- **Critère d'acceptation** : verrouillage/déverrouillage en ≤ 2 clics avec confirmation explicite du malus.
- **trace** : [P2]

**FR-EP-04 — Visualisation solde / progression / streak**

- **Acteur** : Fatou.
- **Capacité** : voir en temps réel son solde, la progression vers chaque objectif, son streak en jours consécutifs.
- **Critère d'acceptation** : écran d'accueil affiche ces 3 informations en ≤ 2 s après ouverture de l'app.
- **trace** : [P2, P8]

**FR-EP-05 — Récompenses streak (badges + bonus Score)**

- **Acteur** : Système.
- **Capacité** : attribuer badge + bonus Score (+5 / +15 / +30 points) pour streaks 7 / 30 / 90 jours.
- **Critère d'acceptation** : badge affiché dans l'app + message WhatsApp. Bonus Score calculé par le job nocturne.
- **trace** : [P2, P8]

### 8.2 Agents (FR-AG-xx)

**FR-AG-01 — Onboarding cliente KYC Tier 1 en ≤ 5 min**

- **Acteur** : Moussa (agent).
- **Capacité** : enrôler une nouvelle cliente via CNI recto/verso + selfie + OTP SMS.
- **Critère d'acceptation** : compte actif en Tier 1 en ≤ 5 min. Validation auto (Tier 1) ou routage Ibrahima (Tier 2+).
- **trace** : [P1]

**FR-AG-02 — Proposition bundle Santé J+1 à l'onboarding**

- **Acteur** : Moussa.
- **Capacité** : proposer immédiatement la formule Santé adaptée après l'onboarding (3 questions foyer + recommandation).
- **Critère d'acceptation** : proposition affichée en ≤ 2 écrans. Acceptation en 2 clics. Délai 24 h de rétractation sans frais.
- **trace** : [P1]

**FR-AG-03 — Cash-in (cash → wallet cliente)**

- **Acteur** : Moussa.
- **Capacité** : créditer le wallet d'une cliente contre remise de cash.
- **Critère d'acceptation** : commission 0,5 % (plafond 500 FCFA), plafond 200 k FCFA/tx et 2 M FCFA/jour. Confirmation SMS + WhatsApp à la cliente.
- **trace** : [P1, P2]

**FR-AG-04 — Cash-out (wallet cliente → cash)**

- **Acteur** : Moussa.
- **Capacité** : débiter le wallet d'une cliente contre remise de cash.
- **Critère d'acceptation** : commission 1 % (plafond 500 FCFA), plafonds identiques à FR-AG-03.
- **trace** : []

**FR-AG-05 — Dashboard agent**

- **Acteur** : Moussa.
- **Capacité** : consulter en temps réel clientes rattachées, transactions du jour, commission cumulée, solde float, alertes anti-churn.
- **Critère d'acceptation** : dashboard rafraîchi en ≤ 3 s.
- **trace** : [P7]

**FR-AG-06 — Suspension d'un agent par l'admin**

- **Acteur** : Ibrahima (admin Ops).
- **Capacité** : suspendre un agent en un clic, avec motif (alerte AML, plainte, inactivité).
- **Critère d'acceptation** : suspension immédiate (pas de nouvelle transaction possible). Notification envoyée à l'agent.
- **trace** : [P5]

### 8.3 Santé (FR-SA-xx)

**FR-SA-01 — Consultation catalogue 3 formules**

- **Acteur** : Fatou.
- **Capacité** : consulter les 3 formules (Famille / Confort / Premium) avec description de couverture.
- **Critère d'acceptation** : catalogue visible en ≤ 2 s. Chaque formule présente prime, couverture, exclusions en langage simple.
- **trace** : [P1, P3]

**FR-SA-02 — Simulation formule adaptée au foyer**

- **Acteur** : Fatou.
- **Capacité** : répondre à 3 questions (composition foyer, âges enfants, budget) et recevoir une recommandation.
- **Critère d'acceptation** : 3 questions + 1 recommandation en ≤ 3 clics et ≤ 5 s. Mode vocal optionnel pour les questions.
- **trace** : [P1, P3]

**FR-SA-03 — Souscription + signature + paiement 1ère mensualité**

- **Acteur** : Fatou.
- **Capacité** : souscrire à une formule, signer électroniquement les conditions particulières, payer la première prime.
- **Critère d'acceptation** : souscription complète en ≤ 3 écrans. Attestation envoyée par WhatsApp + SMS en ≤ 30 s.
- **trace** : [P1, P3]

**FR-SA-04 — Consultation statut de la police**

- **Acteur** : Fatou.
- **Capacité** : voir le statut de sa police (active, en attente, suspendue, résiliée) et l'historique des prélèvements.
- **Critère d'acceptation** : statut affiché dans l'onglet Santé + alertes push en cas de suspension imminente.
- **trace** : []

**FR-SA-05 — Déclaration de sinistre**

- **Acteur** : Fatou.
- **Capacité** : déclarer un sinistre avec formulaire simplifié + upload photo justificatifs.
- **Critère d'acceptation** : déclaration en ≤ 4 écrans. Statut affiché (Reçu / En cours / Décision / Payé).
- **trace** : []

### 8.4 Score (FR-SC-xx)

**FR-SC-01 — Calcul nocturne du score 5 étoiles**

- **Acteur** : Système (job nocturne).
- **Capacité** : calculer chaque nuit la valeur numérique (0-1000) et l'étoile associée pour chaque utilisatrice active, à partir des 4 composantes pondérées (régularité 40 %, stabilité 25 %, ancienneté 20 %, engagement 15 %).
- **Critère d'acceptation** : job exécuté entre 00h00 et 04h00 Abidjan. Toutes les utilisatrices actives traitées. Score disponible en lecture dès 04h15.
- **trace** : [P4]

**FR-SC-02 — Affichage du Score en étoiles**

- **Acteur** : Fatou.
- **Capacité** : voir ses étoiles (1 ⭐ → 5 ⭐) sur l'écran d'accueil, la progression vers le palier suivant, les avantages débloqués au palier actuel.
- **Critère d'acceptation** : 3 informations affichées en ≤ 2 s. Icône haut-parleur pour mode vocal.
- **trace** : [P4, P8]

**FR-SC-03 — Explication des composantes + projection d'impact**

- **Acteur** : Fatou.
- **Capacité** : voir les 4 composantes chiffrées et comprendre quelle action aurait quel impact sur son score.
- **Critère d'acceptation** : écran « Comprendre mon score » accessible en ≤ 2 clics. Projection type « Si tu cotises 7 jours d'affilée, tu passeras à 4 ⭐ ».
- **trace** : [P4]

**FR-SC-04 — Déclenchement d'avantages paliers**

- **Acteur** : Système.
- **Capacité** : débloquer automatiquement les avantages liés au palier atteint (consultation téléphone à 3 ⭐, –10 % Confort à 4 ⭐, priorité crédit V2 à 5 ⭐).
- **Critère d'acceptation** : avantage activé en ≤ 24 h après franchissement du palier. Notification push + WhatsApp à l'utilisatrice.
- **trace** : [P4]

### 8.5 Admin / Conformité (FR-AD-xx)

**FR-AD-01 — Validation KYC Tier 2+ par Ibrahima**

- **Acteur** : Ibrahima (Ops).
- **Capacité** : valider manuellement les dossiers KYC Tier 2+ routés par les agents.
- **Critère d'acceptation** : délai cible de traitement ≤ 24 h. File triable par ancienneté / criticité.
- **trace** : []

**FR-AD-02 — Gestion alertes AML et rédaction STR CENTIF-CI**

- **Acteur** : Ibrahima (Ops) + validation Risk.
- **Capacité** : recevoir les alertes AML automatiques, investiguer, rédiger le STR (Suspicious Transaction Report), le transmettre automatiquement à CENTIF-CI, archiver.
- **Critère d'acceptation** : STR rédigé et transmis ≤ 24 h après détection. Rétention archive ≥ 10 ans. Revue Risk obligatoire sur les cas > 500 k FCFA.
- **trace** : [P5]

**FR-AD-03 — Export des rapports BCEAO / CENTIF**

- **Acteur** : Ibrahima ou rôle Finance.
- **Capacité** : exporter les rapports mensuels BCEAO et trimestriels CENTIF dans les délais réglementaires.
- **Critère d'acceptation** : export disponible en 1 clic. Signature numérique et horodatage. 100 % des rapports remis dans les délais.
- **trace** : []

**FR-AD-04 — Consultation audit trail**

- **Acteur** : Ibrahima / Risk / Finance (selon SoD).
- **Capacité** : consulter l'historique complet des actions utilisateurs et admin sur une cliente / un agent / une police.
- **Critère d'acceptation** : requête < 5 s pour les 12 derniers mois. Rétention 10 ans.
- **trace** : []

### 8.6 Viralité & engagement (FR-VI-xx)

**FR-VI-01 — Parrainage Score Booster**

- **Acteur** : Fatou (parraine Awa).
- **Capacité** : inviter une amie via bouton WhatsApp, gagner +5 points Score si l'amie s'inscrit + fait son 1er dépôt dans les 7 j.
- **Critère d'acceptation** : invitation générée en ≤ 3 clics. Bonus crédité automatiquement après validation.
- **trace** : [P6]

**FR-VI-02 — Onboarding à deux**

- **Acteur** : Moussa + 2 nouvelles clientes.
- **Capacité** : enrôler deux clientes le même jour via le même agent. Chacune reçoit 200 FCFA de bonus crédités sur son wallet.
- **Critère d'acceptation** : bonus crédité en J+1 après les deux premiers dépôts respectifs.
- **trace** : [P6]

**FR-VI-03 — Recap hebdo partageable**

- **Acteur** : Système → Fatou.
- **Capacité** : générer chaque vendredi 19h une carte récap (épargne semaine, étoiles, streak, progression objectif) partageable sur WhatsApp.
- **Critère d'acceptation** : carte générée côté serveur, image envoyée via WhatsApp Business API.
- **trace** : [P8]

### 8.7 Anti-churn (FR-RE-xx)

**FR-RE-01 — Détection inactivité 3 jours**

- **Acteur** : Système.
- **Capacité** : détecter quotidiennement les utilisatrices sans dépôt depuis 3 jours consécutifs.
- **Critère d'acceptation** : détection à J+3 à minuit. Liste transmise au moteur de notifications et à l'app agent.
- **trace** : [P7]

**FR-RE-02 — Push vocal WhatsApp anti-churn + ancrage émotionnel**

- **Acteur** : Système → Fatou.
- **Capacité** : envoyer un push WhatsApp vocal avec rappel de l'objectif et sa photo personnelle.
- **Critère d'acceptation** : push envoyé ≤ 2 h après détection. Mode vocal en dioula si dispo, sinon français.
- **trace** : [P7]

**FR-RE-03 — Alerte agent 3 jours**

- **Acteur** : Système → Moussa.
- **Capacité** : notifier l'agent lorsqu'une de ses clientes n'a pas cotisé depuis 3 jours.
- **Critère d'acceptation** : alerte dans le dashboard agent + notification push.
- **trace** : [P7]

---

## 9. Non-Functional Requirements

Chaque NFR suit le template **« Le système doit [critère] [condition] [méthode de mesure] »**.

### 9.1 Performance

**NFR-PERF-01** — Le système doit afficher l'écran d'accueil app en ≤ 1,5 s pour le 95ᵉ percentile, mesuré par APM mobile (Firebase Performance ou équivalent) sur le réseau 3G.

**NFR-PERF-02** — Le système doit confirmer un dépôt mobile money en ≤ 10 s pour le 95ᵉ percentile, mesuré par logs backend et rapports de SLA avec les opérateurs MM.

**NFR-PERF-03** — Le système doit exécuter le job nocturne de calcul Score en ≤ 4 h pour l'ensemble des utilisatrices actives, mesuré par monitoring du scheduler.

**NFR-PERF-04** — Le système doit répondre aux requêtes USSD en ≤ 3 s pour le 95ᵉ percentile, mesuré par l'opérateur USSD partenaire.

### 9.2 Disponibilité & résilience

**NFR-AVAIL-01** — Le système doit maintenir une disponibilité ≥ 99 % sur 30 jours glissants, mesurée par sondes externes (synthetic monitoring) couvrant les 5 canaux (app, USSD, WhatsApp bot, web admin, API).

**NFR-AVAIL-02** — Le système doit respecter RPO ≤ 1 h et RTO ≤ 4 h, mesurés par tests de restauration trimestriels documentés.

**NFR-AVAIL-03** — Le système doit fonctionner en mode offline-soft sur l'app cliente (queue de dépôts rejouée à la reconnexion), validé par tests d'intégration sur scénario perte réseau.

### 9.3 Sécurité

**NFR-SEC-01** — Le système doit chiffrer les données sensibles au repos avec AES-256 (ou équivalent) et en transit avec TLS 1.2+ exclusivement, validé par audit technique externe annuel.

**NFR-SEC-02** — Le système doit gérer les secrets applicatifs via un coffre-fort dédié (vault), jamais en clair dans le code ni la configuration, validé par revue de code et scan CI/CD.

**NFR-SEC-03** — Le système doit imposer PIN 4 chiffres + OTP SMS comme minimum pour l'authentification cliente, et MFA renforcée (mot de passe + OTP) pour les rôles admin, vérifié par tests d'accès.

**NFR-SEC-04** — Le système doit journaliser tous les accès aux données client (admin + API + support) avec horodatage, acteur et motif, rétention 10 ans, validé par revue d'échantillons trimestrielle.

**NFR-SEC-05** — Le système doit subir un test d'intrusion externe avant la mise en production MVP, puis annuellement, validé par rapport d'audit signé.

### 9.4 Conformité

**NFR-COMP-01** — Le système doit produire le reporting BCEAO mensuel et trimestriel dans les délais réglementaires, mesuré par taux de remise dans les délais (cible 100 %).

**NFR-COMP-02** — Le système doit permettre la rédaction et l'envoi d'un STR à CENTIF-CI en ≤ 24 h après détection d'une alerte AML, mesuré par horodatage détection → envoi.

**NFR-COMP-03** — Le système doit respecter la réglementation ivoirienne sur la protection des données personnelles (cf. §10.1) et documenter les flux, validé par DPIA annuelle.

**NFR-COMP-04** — Le système doit stocker les données à caractère personnel sur le territoire ivoirien ou ouest-africain UEMOA (data residency), validé par audit d'infrastructure.

### 9.5 Compatibilité

**NFR-COMPAT-01** — L'app mobile cliente doit fonctionner sur Android 7+ (API 24) et iOS 13+, validé par matrice de tests.

**NFR-COMPAT-02** — L'app mobile cliente doit avoir une taille APK/IPA ≤ 30 Mo, mesurée sur builds de production.

**NFR-COMPAT-03** — L'app doit consommer ≤ 5 Mo de data par session moyenne de 5 minutes, mesuré par tests sur réseau contrôlé.

### 9.6 Économie d'acquisition

**NFR-ACQ-01** — Le CAC doit être ≤ 2 500 FCFA sur la période MVP, mesuré par (dépenses acquisition + coûts bonus parrainage) / nouvelles utilisatrices actives.

**NFR-ACQ-02** — Le LTV / CAC doit atteindre ≥ 1,0 au mois 1, ≥ 3,0 au mois 12, ≥ 7,0 au mois 24, mesuré par cohortes mensuelles.

---

## 10. Data Protection & Compliance

Cette section formalise les exigences conformité au niveau produit (les détails d'implémentation sont dans `KOTIZ/_archive/2026-10-docs-avant-migration/05_Architecture/KOTIZ_Plan_Securite.docx`).

### 10.1 Protection des données personnelles

KOTIZ manipule des données à caractère personnel sensibles : CNI, selfie, données de santé (souscription Santé), transactions financières, géolocalisation optionnelle.

**Principes appliqués (alignés sur la législation ivoirienne et les bonnes pratiques RGPD)**

| Principe               | Application KOTIZ                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Finalité               | Chaque donnée collectée est associée à une finalité documentée dans les CGU et la politique de confidentialité                                                  |
| Minimisation           | Seules les données nécessaires à la finalité sont collectées (ex : pas de géolocalisation sans consentement explicite)                                          |
| Consentement explicite | Obtenu à l'onboarding, renouvelé à chaque nouveau produit (Santé J+1)                                                                                           |
| Droit d'accès          | L'utilisatrice peut demander l'export complet de ses données via app ou support — délai ≤ 30 j                                                                  |
| Droit de rectification | L'utilisatrice peut corriger ses données personnelles depuis l'app                                                                                              |
| Droit à l'effacement   | L'utilisatrice peut demander la fermeture de son compte et l'effacement de ses données — délai ≤ 30 j, sauf obligation légale de rétention (audit trail 10 ans) |
| Rétention              | Données actives : durée de la relation + 1 an. Audit trail LBC/FT : 10 ans. Purge automatique au-delà                                                           |
| Sécurité               | Chiffrement au repos (AES-256) + en transit (TLS 1.2+) + gestion des secrets (vault) — cf. §9.3                                                                 |
| Violation de données   | Notification CDP (Commission de Protection des Données) ≤ 72 h + utilisatrices impactées sans délai                                                             |

**DPIA (Data Protection Impact Assessment)**

Une DPIA formelle sera réalisée **avant la mise en production** MVP (cible sprint 5), couvrant :

- Traitements à risque élevé (données santé, données KYC, géolocalisation).
- Mesures de mitigation.
- Plan de réaction en cas d'incident.

### 10.2 Lutte contre le blanchiment / financement du terrorisme (LBC/FT)

KOTIZ est EME (Établissement de Monnaie Électronique) — soumis aux obligations CENTIF-CI.

**Obligations MVP**

- **KYC Tier 1** : identification cliente (CNI + selfie + OTP) à l'onboarding par agent, plafond wallet 2 M FCFA (Tier 1 = auto-validé ; Tier 2+ = au-delà, validation humaine Ibrahima).
- **KYC Tier 2+** : validation humaine Ibrahima pour wallet > 2 M FCFA ou transactions agrégées > 5 M FCFA/mois.
- **Surveillance transactionnelle** : moteur d'alerte automatique sur patterns suspects (règles configurables).
- **STR** : rédaction et envoi à CENTIF-CI ≤ 24 h après détection (cf. FR-AD-02). Archivage 10 ans.
- **Liste sanctions** : check quotidien contre listes OFAC / UE / ONU.
- **Formation équipe** : Ibrahima et les rôles Risk / Finance formés LBC/FT avant go-live.

### 10.3 Séparation des fonctions (SoD — Segregation of Duties)

Exigence BCEAO et bonne pratique SOX-like. Aucun rôle unique ne peut à la fois initier, approuver et réconcilier une opération.

| Rôle                  | Responsabilités                                                                            | Interdictions                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Ops (Ibrahima)**    | KYC Tier 2+, support clientes et agents, gestion tickets, alertes AML niveau 1             | Ne peut pas modifier les plafonds BCEAO, ni approuver seul une suspension > 500 k FCFA |
| **Risk**              | Validation suspensions AML complexes, investigation, décision finale STR, audit périodique | Ne peut pas initier de transactions ni gérer les clientes au quotidien                 |
| **Finance**           | Réconciliation quotidienne MM/wallet, reporting financier BCEAO, revue commissions agents  | Ne peut pas valider un KYC ni suspendre un agent                                       |
| **CEO / PO (Henoch)** | Arbitrage produit, validation modifications paramètres critiques (plafonds, poids Score)   | Ne peut pas accéder aux données clientes individuelles sans motif documenté            |

Le workflow technique applique ces règles via des permissions granulaires sur la console admin (cf. HLD).

### 10.4 PCI-DSS

**Position explicite : hors scope MVP.**

KOTIZ ne stocke, ne traite ni ne transmet de données de carte bancaire en MVP :

- Les paiements entrants passent par les wallets mobile money (Orange Money, Wave, MTN MoMo) — pas de carte.
- Les paiements vers les assureurs et partenaires passent par virement bancaire initié par Finance (hors plateforme technique client).

**Conséquence** : KOTIZ n'est pas soumise à la certification PCI-DSS en MVP.

**Réévaluation** requise si l'un des cas suivants se présente :

- Intégration future d'un paiement par carte (corridor diaspora en V2).
- Intégration d'un marchand acceptant des cartes (KOTIZ Market V3).
- Partenariat avec une IMF qui exigerait le passage de données de carte via notre plateforme.

### 10.5 Device permissions

Les permissions demandées à l'app mobile sont documentées dans la CGU (cf. matrice §6). Le refus d'une permission optionnelle ne doit jamais bloquer un parcours critique.

---

## 11. Virality & Acquisition

La viralité est une brique économique du MVP, pas un « nice-to-have ». Sans mécanismes viraux fonctionnels, le CAC dépasse le LTV et KOTIZ ne peut pas scaler.

**3 mécanismes MVP (cf. FR-VI-01 à FR-VI-03 et parcours P6, P8)**

1. **Parrainage Score Booster** — Fatou invite Awa, chacune gagne +5 points Score si Awa fait son 1er dépôt ≤ 7 j.
2. **Onboarding à deux** — si 2 clientes sont enrôlées le même jour par le même agent, chacune reçoit 200 FCFA de bonus.
3. **Recap hebdomadaire partageable** — carte WhatsApp générée chaque vendredi, partageable, pré-rédigée.

**Mécanismes complémentaires à tester en sprint 6 ou post-MVP**

- Défi 30 jours entre amies.
- Notifications d'impact familial (« Aujourd'hui tu as mis assez pour une consultation pédiatrique »).
- « Protège une amie » — 7 jours de Santé offerts à une amie parrainée.
- Journée santé gratuite au marché (événementiel mensuel).

**KPIs viralité**

- Taux de parrainage actif : cible 30 % des utilisatrices actives dans les 60 jours.
- Coefficient viral (K-factor) : cible ≥ 0,5 au mois 3 (chaque utilisatrice amène en moyenne 0,5 nouvelle inscrite).
- Taux de partage du recap : cible 15 %.

---

## 12. Success Criteria / KPIs

### 12.1 KPIs acquisition

- Nombre d'utilisatrices inscrites (cible fin MVP : 1 500, dont 1 000 actives).
- Nombre d'agents actifs (cible : 50).
- CAC moyen (cible ≤ 2 500 FCFA — cf. NFR-ACQ-01).
- Taux d'inscriptions via agents vs autonomes (cible : 70 % via agents en MVP).
- Coefficient viral K-factor (cible ≥ 0,5 au mois 3).

### 12.2 KPIs activation / rétention

- Taux de premier dépôt dans les 7 jours après inscription (cible ≥ 70 %).
- Taux d'adhésion bundle Santé J+1 (cible ≥ 40 %).
- Rétention semaine 1 / 2 / 4 (cibles 75 % / 55 % / 40 %).
- Nombre de dépôts moyens / utilisatrice active / semaine (cible ≥ 3).
- Montant moyen cumulé par utilisatrice active à 30 j (cible ≥ 8 000 FCFA).
- Taux de reprise dépôt ≤ 7 j après alerte anti-churn (cible ≥ 60 %).

### 12.3 KPIs par brique

- **Épargne** : cf. §5.1 (dépôts/semaine, montants, complétion objectif).
- **Agents** : cf. §5.2 (agents actifs, clientes/agent, taux KYC < 24 h).
- **Santé** : cf. §5.3 (souscriptions, prélèvements, NPS sinistre).
- **Score** : % d'utilisatrices à ≥ 4 étoiles à J+90 (cible ≥ 15 %).

### 12.4 KPIs techniques et conformité (cf. §9 NFRs)

- Disponibilité plateforme ≥ 99 % / 30 j (NFR-AVAIL-01).
- Taux d'échec mobile money ≤ 3 % (NFR-PERF-02).
- Temps moyen traitement ticket support niveau 2 ≤ 4 h.
- 0 incident critique de sécurité en production.
- 100 % des rapports BCEAO / CENTIF remis dans les délais (NFR-COMP-01).
- STR CENTIF ≤ 24 h (NFR-COMP-02).

### 12.5 KPIs satisfaction

- NPS sur 100 premières clientes : cible ≥ 40.
- NPS agents (Moussa) : cible ≥ 50.
- Note Play Store / App Store : cible ≥ 4,2.

### 12.6 KPIs unit economics

- LTV / CAC au mois 1 : ≥ 1,0 (NFR-ACQ-02).
- LTV / CAC au mois 12 : ≥ 3,0.
- ARPU bundle Santé bundlée : 2× ARPU sans bundle (validé par cohortes).

---

## 13. Out of Scope (MVP)

Les éléments ci-dessous sont volontairement repoussés hors du périmètre MVP. Chacun fait l'objet d'une fiche individuelle dans `KOTIZ_Catalogue_Modules.docx` et devra avoir son propre PRD dédié avant activation. **AUCUN module optionnel ne sera traité en parallèle du MVP** — Henoch arbitre lequel attaquer après stabilisation.

### Repoussé en V2 (après installation marque)

- **KOTIZ Tontine** — reporté stratégiquement pour ne pas positionner KOTIZ comme « énième app de tontine ».

### Modules V1 candidats post-MVP

- KOTIZ Éducation (épargne scolaire dédiée).
- KOTIZ SOS (aide d'urgence micro-crédit court terme).
- KOTIZ Retraite (épargne long terme).

### Modules V2

- KOTIZ Crédit (micro-crédit partenaire IMF).
- KOTIZ BNPL (paiement 3x chez marchands).
- KOTIZ Diaspora (corridor transferts).
- KOTIZ Score Marchand.

### Modules V3

- KOTIZ Bourse, Invest, Invest Immo, Cité, Garantie, Weather, Héritage, Cercle, Academy, Market, Pro — cf. catalogue complet.

### Fonctionnalités repoussées dans les briques MVP

- Épargne : rémunération du solde (risque réglementaire — V1+).
- Santé : digitalisation complète des claims (V1).
- Score : version v2 machine-learning et données téléphone externes (V1+).
- Agents : pool partagé, fédération inter-zones (V1).
- Back-office : reporting temps réel, entrepôt analytique (V1).

---

## 14. Timeline & Risks

### 14.1 Timeline MVP — 6 sprints de 2 semaines

| Sprint     | Dates                | Objectif majeur                                                                                                                 |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Pré-S1** | Avant 5 mai 2026     | **Recrutement dev #2 backend (P0, bus factor)**                                                                                 |
| S1         | 5 → 18 mai 2026      | Socle technique : auth, wallet, DB, premiers écrans app, squelette back-office                                                  |
| S2         | 19 mai → 1 juin      | Intégration Orange Money + Wave + MTN. Dépôt et retrait wallet. Ledger double-entrée                                            |
| S3         | 2 → 15 juin          | Épargne objectifs + App agent + onboarding KYC Tier 1 + signature partenaire assureur                                           |
| S4         | 16 → 29 juin         | **Bundle Santé J+1 complet** + WhatsApp Bot (cotiser, solde, aide) + USSD menu v1                                               |
| S5         | 30 juin → 13 juillet | KOTIZ Santé (catalogue + souscription + prélèvement) + premier calcul Score 5 étoiles + DPIA                                    |
| S6         | 14 → 27 juillet      | Mécanismes viralité + anti-churn + hardening + tests terrain Adjamé 50 clientes + audit sécurité + validation BCEAO + lancement |

> **Changement v1.1** : le bundle Santé est avancé au sprint 4 (au lieu du S5 dans v1.0), car il conditionne tous les KPIs économiques.

### 14.2 Principaux risques MVP

| Risque                                           | Gravité         | Mitigation                                                                                                                                              |
| ------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bus factor Desiré seul dev backend**           | **🔴 Critique** | Recruter dev #2 backend AVANT S1 — P0 absolu. Documentation architecture à jour. Revue de code croisée systématique dès S2                              |
| Retard intégration Orange Money (SLA partenaire) | Élevée          | Démarrer l'intégration dès S1 avec sandbox. Engager Wave comme plan B dès le départ                                                                     |
| Partenaire assureur non signé avant S3           | Élevée          | Négociation active. Plan B : livrer Santé en S5 avec partenaire de rechange, décaler bundle J+1 au S5                                                   |
| Adoption agent faible à Adjamé                   | Moyenne         | Pré-recrutement 60 agents pour en activer 50. Formation en groupe. Rémunération garantie le premier mois                                                |
| Fraude opérateur agent                           | Moyenne         | Plafonds + alertes AML + caution + contrôles terrain aléatoires + communication réconciliation quotidienne aux clientes                                 |
| **Non-conformité BCEAO au go-live**              | **🔴 Critique** | Audit conformité externe au sprint 5. Reporting de test soumis en aperçu à la BCEAO. Pilote limité à 1 000 clientes au go-live. DPIA finalisée avant S6 |
| Dérive périmètre                                 | Moyenne         | Règle projet formelle : tout nouveau module hors 4 briques → fiche catalogue → arbitrage Henoch                                                         |
| Dépendance à un seul partenaire IMF (crédit V2)  | Moyenne         | Multi-IMF dès la phase d'approche (V2). Objectif licence EME propre An 2 pour indépendance                                                              |
| CAC > 2 500 FCFA                                 | Moyenne         | Mécanismes viralité intégrés dès S6 (Score Booster + onboarding à deux). Bundle Santé J+1 compense                                                      |
| Adoption bundle Santé < 40 %                     | Moyenne         | Formation agents ciblée. Message « Tu gagnes » scripté. Test A/B de propositions. Plan B : relance WhatsApp J+3 si pas accepté à J+1                    |

---

## 15. Glossary

| Terme                     | Définition                                                                                                                                                                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MVP                       | Minimum Viable Product — version livrée en 3 mois avec les 4 briques KOTIZ Épargne / Agents / Santé / Score                                                                                                                                                             |
| **Signe signe**           | Système d'épargne informel ivoirien : un collecteur passe quotidiennement encaisser une petite somme contre une marque sur un carnet, en contrepartie de 1 jour de collecte sur 31 (≈ 3,2 %). KOTIZ digitalise ce système en le transformant en gain plutôt qu'en perte |
| **Bundle J+1**            | Souscription Santé proposée automatiquement à l'onboarding ou le lendemain du premier dépôt épargne — levier principal du LTV/CAC du MVP                                                                                                                                |
| **Streak**                | Série de jours consécutifs avec au moins un dépôt ≥ 100 FCFA — affichée à l'utilisatrice et bonifiée au Score                                                                                                                                                           |
| Score KOTIZ               | Score comportemental affiché en étoiles (1 ⭐ à 5 ⭐), sous-tendu par une valeur numérique 0-1000, calculé à partir de la régularité, la stabilité, l'ancienneté et l'engagement multi-canal                                                                            |
| **Palier étoile**         | Tranche de Score déclenchant un avantage concret (Santé préférentielle à 4 ⭐, priorité crédit à 5 ⭐, etc.)                                                                                                                                                            |
| Fatou / Moussa / Ibrahima | Personas canoniques KOTIZ : Cliente (Fatou), Agent (Moussa), Admin (Ibrahima). Invariants                                                                                                                                                                               |
| Brique                    | Composant fonctionnel client-facing du MVP. Exactement 4 briques au MVP : Épargne, Agents, Santé, Score                                                                                                                                                                 |
| Module optionnel          | Composant non inclus dans le MVP, listé dans le catalogue, avec son propre PRD avant activation                                                                                                                                                                         |
| EME                       | Établissement de Monnaie Électronique — statut BCEAO qui autorise à émettre de la monnaie électronique                                                                                                                                                                  |
| CIMA                      | Conférence Interafricaine des Marchés d'Assurances — autorité de tutelle des assureurs de la zone UEMOA                                                                                                                                                                 |
| CENTIF                    | Cellule nationale de traitement des informations financières — Côte d'Ivoire. Autorité LBC/FT                                                                                                                                                                           |
| KYC                       | Know Your Customer — vérification d'identité cliente, exigence LBC/FT                                                                                                                                                                                                   |
| **STR**                   | Suspicious Transaction Report — déclaration de soupçon à CENTIF-CI ≤ 24 h après détection                                                                                                                                                                               |
| SoD                       | Segregation of Duties — séparation des fonctions admin (Ops / Risk / Finance / PO) (rôles back-office ; 8 rôles RBAC complets incluant USER/AGENT/PARTNER/SYSTEM cf. ADR-007)                                                                                           |
| DPIA                      | Data Protection Impact Assessment — évaluation d'impact sur la protection des données                                                                                                                                                                                   |
| Santé préférentielle      | Réduction tarifaire de –10 % sur la formule Confort, déclenchée par un Score ≥ 4 étoiles (équivalent 600+)                                                                                                                                                              |
| **Tu gagnes**             | Positionnement KOTIZ : le message de vente n'est pas « moins cher » mais « tu gagnes » (rendement préservé, santé protégée, score construit)                                                                                                                            |
| CAC / LTV                 | Customer Acquisition Cost / Lifetime Value — unit economics critiques du MVP                                                                                                                                                                                            |

---

_Document interne confidentiel — Ne pas diffuser sans autorisation écrite._
_Version 1.2 · 3 juin 2026 · © KOTIZ SAS, Abidjan._
