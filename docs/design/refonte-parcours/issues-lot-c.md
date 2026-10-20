# Issues — Refonte des parcours, lot C : dépôt, affectation, opérations et reçus

Date : 20 octobre 2026. Statut : **brouillon, rien n'est publié**. La publication (commentaires, nouvelles issues, changements de « Blocked by ») est faite par la session principale après relecture et feu vert explicite du PO (brief : « aucune modification d'issue sans feu vert explicite du PO »).

Sources : [handoff-lot-c.md](handoff-lot-c.md), [gherkin-lot-c.md](gherkin-lot-c.md) (165 scénarios), [ux-spec-lot-c.md](ux-spec-lot-c.md), [screens-lot-c.md](screens-lot-c.md), [critique-lot-c.md](critique-lot-c.md), issues lues le 20 octobre 2026 avec `gh issue view <n> -R kotiz-ci/platform --comments` (#59, #64, #66 à #75, #93 à #97).

**Liens vers la branche** : les liens GitHub ci-dessous pointent vers `docs/restructure-documentation`. Ils ne fonctionnent qu'une fois `handoff-lot-c.md`, `gherkin-lot-c.md` (et `ux-spec-lot-c.md`, `screens-lot-c.md`, `critique-lot-c.md`, `test-lot-c.md`, non commités à ce jour) commités et la branche poussée.

## Constat sur les issues actuelles

- **[kotiz-ci/platform#66](https://github.com/kotiz-ci/platform/issues/66) D05 « Effectuer un dépôt direct en sandbox »** : une ligne (« Dépôt depuis le numéro Mobile Money vérifié jusqu'au wallet »), trois critères génériques, aucun commentaire, bloquée par #64. Il manque : la feuille C-00 et le choix agente (C-17), le dépôt **pour une épargne** (dépôt puis affectation liés), le récapitulatif (montant débité, frais confirmés seulement, frais inconnus = blocage), la validation chez l'opérateur et le retour dans KOTIZ, les neuf états du résultat.
- **[kotiz-ci/platform#67](https://github.com/kotiz-ci/platform/issues/67) D06 « Sécuriser le cycle de vie des transactions »** : a reçu les critères du lot B (retour au solde). Il manque le **lien dépôt ↔ affectation**, le succès partiel, la **reprise idempotente** avec nouvelle confirmation (sans PIN), le second dépôt distinct pendant une attente, et le statut jamais déduit d'un message de l'opérateur.
- **[kotiz-ci/platform#69](https://github.com/kotiz-ci/platform/issues/69) D08 « Réconcilier et contester une transaction »** : « Rapprochement, suspense, litige et contre-écriture immuable », bloquée par #67 et **#68** (retrait). Le volet client du lot C (signalement, dossier, contestation, correction confirmée) ne dépend pas du retrait : **proposition, lever le blocage par #68 pour le volet signalement** (voir le brouillon).
- **[kotiz-ci/platform#94](https://github.com/kotiz-ci/platform/issues/94) D21 accueil** : porte « Dernier dépôt », les 3 dernières opérations et le masquage commun. Le lot C change l'entrée « Déposer » (feuille C-00), la ligne d'opération (nouvelle `TransactionRow`), l'ouverture du détail, et confirme que PNV-2 est refusée.
- **[kotiz-ci/platform#73](https://github.com/kotiz-ci/platform/issues/73) D12 épargnes** : sa « cotisation flexible » est l'alimentation d'une épargne (« Mettre de l'argent ») : branche Mobile Money dans #66, branche solde et reprise dans **D25** (à créer). Le détail B07 reçoit le nouvel état **« Dépôt pas entré »** reporté du lot C (20 octobre 2026).
- **[kotiz-ci/platform#97](https://github.com/kotiz-ci/platform/issues/97) D24 retour au solde** : son résultat B12 renvoie au reçu (C-13) et à Opérations (C-11), et ses lignes apparaissent dans Opérations.
- **[kotiz-ci/platform#59](https://github.com/kotiz-ci/platform/issues/59) D02 socle UI** : reçoit les composants et évolutions du lot C (hors DS v12 pour la plupart).
- **[kotiz-ci/platform#64](https://github.com/kotiz-ci/platform/issues/64) D03 compte** : E08 « Faire mon premier dépôt » ouvre désormais la feuille C-00 (avant : C-01).
- **Aucune issue** pour la mise de côté depuis le solde (et sa reprise), ni pour Opérations / détail / reçu : deux issues à créer, **D25** et **D26** (brouillons ci-dessous).

## Correspondance parcours / écrans → issues

| Parcours | Écrans | Issue | Scénarios | Remarque |
|---|---|---|---|---|
| Socle lot C | `TransactionRow` (sous-titre, `internal`, statut combiné, signe), ligne de choix / `OperatorRow`, `LinkedStatusRows`, `StepTracker` `failed`, `FilterChips`, `Receipt`, `CaseTimeline`, étapes numérotées, résultat plein écran, zone d'action fixe, illustrations `Actions/` | [#59](https://github.com/kotiz-ci/platform/issues/59) D02 | critères « Socle lot C » du handoff, C-P6-S4, C-P1-S27 | Seules les illustrations sont dans le DS v12 ; le reste est construit dans le canvas (`lc-`) |
| C-P1 Déposer sur mon solde | C-00, C-17, C-01 à C-05 | [#66](https://github.com/kotiz-ci/platform/issues/66) D05 | C-P1-S1 à S30, C-P1-S32 à S39, C-P1-S41, C-P1-S43, C-P1-S44 | C-17 n'est qu'une explication : le dépôt en espèces reste dans [#71](https://github.com/kotiz-ci/platform/issues/71) (lot E) |
| C-P1 — cycle de vie | C-03 (envoi), C-04 (retour depuis l'opérateur), C-05 (inconnu) | [#67](https://github.com/kotiz-ci/platform/issues/67) D06 | C-P1-S24, S25, S30, S31, S40, S41, S43 | Idempotence, inconnu sans Réessayer, second dépôt distinct |
| C-P1 — accueil | A · H01, A · E08 | [#94](https://github.com/kotiz-ci/platform/issues/94) D21, [#64](https://github.com/kotiz-ci/platform/issues/64) D03 | C-P1-S2, S3, S34, S42 (#94) ; C-P1-S4, S33 (#64) | Feuille C-00, « Dernier dépôt » en attente |
| C-P2 Mettre de l'argent par Mobile Money | C-06 (branche Mobile Money), C-01 à C-05 pour une épargne | [#66](https://github.com/kotiz-ci/platform/issues/66) D05 | C-P2-S1, S7 à S14, S16 | Dépôt pour une épargne = dépôt puis affectation liés |
| C-P2 — lien dépôt ↔ affectation | C-05 partiels, backend | [#67](https://github.com/kotiz-ci/platform/issues/67) D06 | C-P2-S12, S15, S19, S20 | Un dépôt fait n'est jamais « Échoué » |
| C-P2 — feuille « D'où vient l'argent ? » | C-06 | **D25** (à créer) | C-P2-S2 à S6 | Entrée commune des trois origines ; Mobile Money continue dans #66 |
| C-P2 — raccords épargne et accueil | B · B07, A · H01 | [#73](https://github.com/kotiz-ci/platform/issues/73) D12, [#94](https://github.com/kotiz-ci/platform/issues/94) | C-P2-S6, S18 (#73) ; C-P2-S17 (#94) | PNV-2 refusée |
| C-P3 Mettre de l'argent depuis mon solde | C-07, C-08, C-09 | **D25** (à créer) | C-P3-S1 à S21 | Sans frais, sans PIN ; C-P3-S20 aussi dans D26 (ligne d'Opérations) |
| C-P4 Reprise | C-05 (partiel), C-07, C-08, C-10, C-09, C-12 | **D25** (à créer) ; résultat partiel dans [#66](https://github.com/kotiz-ci/platform/issues/66) | C-P4-S2 à S15, S18, S19 (D25) ; C-P4-S1 (#66) | Reprise = affectation seule |
| C-P4 — cycle de vie | backend | [#67](https://github.com/kotiz-ci/platform/issues/67) D06 | C-P4-S20, S21 | Une reprise à la fois, liée au dépôt d'origine |
| C-P4 — état B07 « Dépôt pas entré » | B · B07 | [#73](https://github.com/kotiz-ci/platform/issues/73) D12 | C-P4-S16, S17 | Report du lot C au lot B (canvas version 22) |
| C-P5 Limite de 3 | C-10 | **D25** (à créer) | C-P5-S1 à S5 | La limite est contrôlée par #73 |
| C-P6 Opérations, détail, reçu | C-11, C-12, C-13 | **D26** (à créer) | C-P6-S1 à S28, S31, S32 ; C-P3-S20 | Liste unique, statut combiné, reçu |
| C-P6 — raccords | A · H01, B · B07, B · B12 | [#94](https://github.com/kotiz-ci/platform/issues/94), [#73](https://github.com/kotiz-ci/platform/issues/73), [#97](https://github.com/kotiz-ci/platform/issues/97) D24 | C-P6-S29, S31 (#94) ; C-P6-S29 (#73) ; C-P6-S30 (#97) | Entrées vers C-11 / C-12 / C-13 |
| C-P7 Signaler et suivre | C-14, C-15 | [#69](https://github.com/kotiz-ci/platform/issues/69) D08 | C-P7-S1 à S12 ; C-P1-S37 (entrée depuis l'échec) | Point d'entrée C-12 (D26) |
| C-P8 Contester, correction | C-15, C-16, C-12 (correction) | [#69](https://github.com/kotiz-ci/platform/issues/69) D08 | C-P8-S1 à S10 | Correction confirmée = contre-écriture liée |

**Issues lues et non concernées directement** : [#68](https://github.com/kotiz-ci/platform/issues/68) D07 et [#72](https://github.com/kotiz-ci/platform/issues/72) D11 retraits (lot D ; seules leurs lignes apparaissent dans Opérations) ; [#71](https://github.com/kotiz-ci/platform/issues/71) D10 cash-in (lot E ; C-17 n'en est que l'explication côté cliente) ; [#75](https://github.com/kotiz-ci/platform/issues/75) D14 notifications (SMS de confirmation d'un dépôt et évolutions d'un dossier : lot F) ; [#65](https://github.com/kotiz-ci/platform/issues/65) D04 KYC (C-02 renvoie seulement vers « Vérifier mon identité ») ; [#96](https://github.com/kotiz-ci/platform/issues/96) D23 tokens (prérequis via #59, aucun token nouveau au lot C) ; [#60](https://github.com/kotiz-ci/platform/issues/60) H01 et [#61](https://github.com/kotiz-ci/platform/issues/61) H02 (décisions humaines sur le partenaire et les tarifs : ce sont elles qui lèvent G01, frais compris).

## Capacités du lot C sans issue

| Capacité | Écrans | Scénarios | Contexte DDD | Piste |
|---|---|---|---|---|
| **Mettre de l'argent du solde vers une épargne**, et reprendre une mise de côté qui n'a pas été faite (feuille d'origine des fonds, montant, récapitulatif sans frais ni PIN, résultat, épargne fermée, limite de 3) | C-06, C-07, C-08, C-09, C-10 (+ reprise depuis C-05, C-12, B07) | C-P2-S2 à S6, C-P3-S1 à S21, C-P4-S2 à S15, S18, S19, C-P5-S1 à S5 | Savings | **D25**, à créer (brouillon ci-dessous) |
| **Consulter mes opérations, le détail et le reçu** (liste unique, filtres, pagination, statut combiné, détail, reçu, masquage, hors ligne) | C-11, C-12, C-13 | C-P6-S1 à S28, S31, S32, C-P3-S20 | Savings (historique, ledger), lecture des statuts Payments | **D26**, à créer (brouillon ci-dessous) |
| Nommer l'affectation, le lien dépôt ↔ affectation, la reprise, le dossier de signalement, la contestation et la correction ; retirer ou marquer non produit le « Min. 100 FCFA » de `Deposit` et `Streak`, et le `GoalLock` | — | — | Savings, Payments | **`domain-modeling`**, avant le code de #66, #67, #69, D25, D26. Pas un ticket. |
| Désigner le contexte du signalement, du dossier et de la correction (CONTEXT-MAP n'a ni « Support » ni « Ledger ») | — | C-P7, C-P8 | Admin & Conformité ? Savings (correction) ? nouveau contexte (ADR) ? | **Décision d'architecture (PO / tech)**, avant #69. Pas un ticket tant qu'elle n'est pas prise. |
| Promouvoir dans le Design System les composants du lot C (`TransactionRow` évolué, `OperatorRow`, `LinkedStatusRows`, `StepTracker` `failed`, `FilterChips`, `Receipt`, `CaseTimeline`, étapes numérotées, pictogramme flèches internes) et étendre « ambre » à « À reprendre » | — | — | — | **Travail design** (pas de ticket, brief) ; le code les construit dans #59 en attendant |
| « Contacter l'aide », contenu de « Le dépôt n'arrive pas ? » | C-03, C-04, C-05, C-08, C-09, C-15 | — | — | **Lot F** (G03) : « Bientôt ici » en attendant |

### Issue à créer — D25 (proposition)

Titre : **D25 — Mettre de l'argent du solde vers une épargne**
Label : `ready-for-agent` · Blocked by : #73, #67 · Après création : citer D25 dans le commentaire de #73 (alimentation d'une épargne).

```markdown
## What to build

Alimenter une épargne depuis le solde disponible (parcours C-P3 du lot C), et reprendre une mise de côté qui n'a pas été faite après un dépôt Mobile Money pour une épargne (C-P4, C-P5). Depuis le détail d'une épargne, « Mettre de l'argent » ouvre la feuille « D'où vient l'argent ? » (mon solde, Mobile Money, espèces chez une agente) ; la branche Mobile Money continue dans #66, la branche espèces est une explication (lot E). Le mouvement solde → épargne est interne, **sans frais et sans PIN** : le bouton du récapitulatif confirme. La reprise ne reprend **que l'affectation**, jamais un nouveau dépôt.

## Design validé (lot C, 20 octobre 2026)

- Prototype (page « Lot C — Dépôt et affectation », parcours C-P3, C-P4, C-P4′, C-P4″, C-P5) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v12 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (C-06 à C-10, reprise, règles réseau et backend) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin C-P2-S2 à S6, C-P3-S1 à S21, C-P4-S2 à S15, S18, S19, C-P5-S1 à S5 : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

Écrans : C-06 D'où vient l'argent ? (feuille) · C-07 Combien tu mets de côté ? (et mode reprise) · C-08 Vérifie avant de mettre de côté (et « Réessayer de mettre de côté ») · C-09 Résultat · C-10 Choisis une autre épargne (feuille).

## Acceptance criteria

- [ ] « D'où vient l'argent ? » propose Mon solde disponible, Mobile Money, En espèces chez une agente ; solde en premier s'il est > 0, sinon Mobile Money en premier et « Mon solde disponible » désactivé avec sa raison (C-P2-S2, C-P2-S3).
- [ ] Montant > 0 et ≤ disponible confirmé, avec les raisons ; « Tout mon solde » ; « Étape 1 sur 2 » et « Étape 2 sur 2 » (C-P3-S2 à S6).
- [ ] Le récapitulatif montre le montant, Depuis Mon solde → Vers {épargne}, « Il restera sur ton solde » (retirée en masqué) et « Dans {épargne} après » ; **aucune ligne de frais, aucun PIN** (C-P3-S7 à S9).
- [ ] Solde changé, refus connu d'avance (raison communicable, aucune valeur chiffrée), hors connexion, double appui : rien ne bouge et la cliente le sait (C-P3-S10 à S14).
- [ ] Résultat plein écran : « Fait » seulement après confirmation ; en attente et inconnu sans Réessayer ; échoué « Ton argent n'a pas bougé. Il est sur ton solde. » et Réessayer qui relit le récapitulatif ; retour vers le détail de l'épargne (C-P3-S15 à S19).
- [ ] Reprise d'un dépôt fait dont le passage a échoué de façon confirmée, depuis le résultat, le détail de l'opération et le détail de l'épargne, sans limite de temps ; titre « Réessayer de mettre de côté », lien vers le dépôt d'origine, pas de compteur, « Plus tard » (C-P4-S2, S5 à S7, S14, S15).
- [ ] La reprise ne crée jamais d'ordre de paiement, ne demande ni opérateur ni PIN, et se confirme sur son propre récapitulatif (C-P4-S4).
- [ ] Montant de reprise plafonné au plus petit du dépôt d'origine et du disponible ; solde à 0 : reprise désactivée avec sa raison (C-P4-S8 à S10).
- [ ] Épargne fermée : feuille « {épargne} est fermée » avec les autres épargnes actives et « Laisser sur mon solde » ; à 3 actives, texte « 3 épargnes actives : c'est le maximum. » sans lien ; jamais de réouverture ni de mise de côté automatique (C-P4-S11 à S13, C-P5-S1 à S5).
- [ ] Reprise faite : « Ton dépôt du {date} est maintenant dans {épargne}. », opération repassée à « Fait », étape de reprise dans le détail, reçu de la mise de côté à part (C-P4-S3, S18, S19).
- [ ] Écritures ledger équilibrées, sans frais ; affectation liée au dépôt d'origine en reprise ; demande idempotente ; une seule reprise à la fois (C-P3-S21, C-P4-S21 dans #67).

## À confirmer

- G01 : minimum d'une mise de côté (aucune valeur côté produit) ; la mise de côté ou la reprise consomme-t-elle la capacité du niveau d'accès limité (recommandation : non) ; raisons communicables d'un refus.
- G03 : contact derrière « Contacter l'aide ».
- Technique : délai au-delà duquel le résultat devient « On vérifie ».
- À dessiner : épargne fermée pendant une mise de côté hors reprise (C-P3-S11, la feuille n'est dessinée qu'en reprise).

## Blocked by

- #73 (épargnes)
- #67 (cycle de vie des transactions : lien dépôt ↔ affectation, idempotence, attente, échec)
```

### Issue à créer — D26 (proposition)

Titre : **D26 — Consulter mes opérations, le détail et le reçu**
Label : `ready-for-agent` · Blocked by : #59, #66 · Après création : citer D26 dans #94 (« Tout voir », lignes, « Dernier dépôt »), #69 (point d'entrée du signalement) et #97 (reçu du retour).

```markdown
## What to build

Racine Opérations de l'app cliente (parcours C-P6 du lot C) : une liste unique de tous les mouvements (dépôts, retraits, mouvements internes, corrections confirmées), avec filtres, pagination « Voir plus », masquage et hors ligne ; le détail d'une opération (statut réel, étapes, frais seulement s'ils sont confirmés, signalement et correction liés) ; le reçu d'une opération **faite** seulement. Un dépôt vers une épargne tient sur **une seule ligne** avec un statut combiné quand l'épargne n'a pas encore reçu l'argent.

## Design validé (lot C, 20 octobre 2026)

- Prototype (parcours C-P6, C-P7, C-P8) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v12 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (C-11 à C-13, `TransactionRow`, `FilterChips`, `Receipt`) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin C-P6-S1 à S28, S31, S32, C-P3-S20 : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

Écrans : C-11 Opérations (racine, barre basse) · C-12 Détail d'une opération · C-13 Reçu.

## Acceptance criteria

- [ ] Racine avec barre basse, sans bouton principal ; lignes groupées par jour avec titre, sous-titre origine → destination, montant et statut en mots + pictogramme (C-P6-S1, S2, S5).
- [ ] Un dépôt vers une épargne = une seule ligne ; passage pas fait : « À reprendre » (ou « En attente ») en ambre + « Dépôt fait, épargne pas encore. » (ou « … en cours. ») (C-P6-S3).
- [ ] « + » ou « − » seulement si l'opération est faite ; en attente ou échouée, montant sans signe en texte secondaire ; un mouvement interne n'a jamais de logo d'opérateur ni la pastille d'un apport (C-P6-S4, C-P3-S20).
- [ ] Filtres Tout / Dépôts / Retraits / Épargnes et filtre d'une épargne depuis son détail, une seule puce active ; textes de filtre vide ; « Voir plus » paginé, sans défilement infini (C-P6-S6 à S9).
- [ ] Vide « Tes opérations s'afficheront ici. » + « Faire un dépôt » ; masqué « ••• F » lu « Montant masqué » ; hors ligne : dernière liste datée, statuts jamais promus, « Voir plus » désactivé ; chargement sans montant ni « 0 » (C-P6-S10 à S13).
- [ ] Détail : statut réel, montant, Depuis / Vers, date, référence ; frais seulement s'ils sont confirmés ; étapes Dépôt / Passage / Reprise pour un dépôt vers une épargne (C-P6-S14, S17 à S19).
- [ ] Détail en attente ou échoué : ni reçu ni Réessayer, « Le reçu sera prêt quand ce sera fait. » ; « Signaler un problème » toujours en bouton texte (C-P6-S15, S16).
- [ ] Reçu seulement pour une opération faite ; reçu d'un dépôt dont le passage n'est pas fait : pas de « Fait » global, « Arrivé sur : Mon solde », passage « Pas fait » en rouge ; pas de partage ; masqué ; hors ligne : cache ou « Reçu indisponible hors connexion. » (C-P6-S22 à S27).
- [ ] Le même réglage de masquage vaut pour l'accueil, les épargnes, Opérations, le détail et le reçu (C-P6-S21, S31).
- [ ] API : liste unique paginée, filtrable par type et par épargne, statuts réels (deux statuts pour un dépôt vers une épargne), aucune opération en attente renvoyée comme faite (C-P6-S32).

## À confirmer

- G01 : frais affichés (seulement confirmés) ; référence de l'opérateur et mentions légales du reçu.
- Technique : taille de page de « Voir plus » (7 au prototype) ; cache hors ligne de la liste et des reçus ; référence copiable par appui long ; capture d'écran du reçu.
- PO : détail d'un dépôt dont le passage est en attente (lien « Voir le reçu du dépôt » seul, recommandé, ou bouton + lien comme le prototype).
- Hors périmètre : partage du reçu (lot E) ; parcours de retrait (lot D, lignes seulement).

## Blocked by

- #59 (socle UI)
- #66 (dépôts : premières opérations à lister)
```

## Paramètres « à confirmer » du lot C

| Paramètre | Gate | Écrans |
|---|---|---|
| **Frais du dépôt Mobile Money**, montant débité, montant arrivé (frais inconnus = autorisation bloquée) | G01 | C-03, C-04, C-12, C-13 |
| Liste et ordre des opérateurs ; protocole de validation (application, message, code) ; annulation avant validation ; lien de retour vers KOTIZ | G01, technique | C-00, C-01, C-04 |
| Minimum et maximum par dépôt ; règles du niveau d'accès limité ; minimum d'une mise de côté | G01 | C-02, C-07 |
| « Échec confirmé » = « rien n'a été pris » ? ; raison d'un refus de l'opérateur | G01 | C-05 |
| Calcul du solde et des épargnes avec une opération en attente (confirmé seulement, recommandé) | G01 | H01, B07, C-07 |
| Effet de la mise de côté et de la reprise sur le niveau d'accès limité (recommandation : non) | G01 | C-08 |
| Référence de l'opérateur, mentions légales du reçu ; libellé et sens de la correction | G01 | C-12, C-13, C-15 |
| Motifs de signalement ; pièces jointes ; contact d'aide ; contenu de « Le dépôt n'arrive pas ? » ; délais (jamais annoncés) ; limite de contestation ; commentaire de contestation obligatoire ou non ; un dossier par opération | G03 | C-04, C-14, C-15, C-16 |
| `<délai de confirmation>` (passage à « On vérifie ») ; idempotence de la reprise ; cache hors ligne ; taille de page | technique | C-04, C-05, C-09, C-11, C-13 |
| Détail d'un dépôt dont le passage est en attente : lien seul ou bouton + lien | PO | C-12 |

**Valeurs de démonstration à ne jamais reprendre** : frais fictifs du prototype (bande hors produit), numéro 07 08 12 34 56, solde 12 400 FCFA, épargnes École Awa / Boutique / Tabaski / Loyer / Moto, références « (fictive) », dossiers « (fictif) », « Motif A / B (à confirmer) », réponse du conseiller, heure 14:32, date figée au 19 octobre 2026, écran « Simulation de l'application Wave ».

---

## Brouillon — commentaire pour #66 (D05 Effectuer un dépôt direct en sandbox)

```markdown
## Design validé (lot C, 20 octobre 2026)

Le lot C (dépôt, affectation, opérations et reçus de l'app cliente) a été validé le 20 octobre 2026 par le PO et sa conjointe, après critique et test sur le prototype. Cette issue reçoit le **dépôt Mobile Money**, vers le solde et **pour une épargne**, de l'entrée « Déposer » au résultat. La mise de côté depuis le solde et la reprise sont dans **D25** ; Opérations, détail et reçu dans **D26** ; le cycle de vie (idempotence, lien dépôt ↔ affectation) dans #67.

- Prototype (page « Lot C — Dépôt et affectation », parcours C-P1, C-P1′, C-P1″, C-P1‴, C-P2) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v12 (illustrations Mobile Money et agente, logos opérateurs) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (C-00 à C-05, C-17, retour depuis l'appli de l'opérateur, backend Payments / Savings) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin (C-P1-S1 à S30, S32 à S39, S41, S43, S44 ; C-P2-S1, S7 à S14, S16 ; C-P4-S1) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Écrans concernés
C-00 Comment tu veux déposer ? (feuille) · C-17 Montre Mon QR à une agente (explication) · C-01 Avec quoi tu déposes ? · C-02 Combien tu déposes ? · C-03 Vérifie ton dépôt · C-04 Valide sur ton téléphone · C-05 Résultat du dépôt.

### Critères d'acceptation ajoutés
- [ ] « Déposer » ouvre la feuille « Comment tu veux déposer ? » (Par Mobile Money / Auprès d'une agente) ; « Auprès d'une agente » explique le dépôt en espèces et ouvre Mon QR, sans montant ni statut (C-P1-S2, S3, S5 à S7).
- [ ] Le dépôt part **uniquement du numéro vérifié**, affiché et non modifiable ; aucun champ ni bouton pour un autre numéro (C-P1-S10).
- [ ] Liste des opérateurs disponibles (logo, nom, chevron, sans radio) ; un seul opérateur reste une liste ; aucun opérateur → lien agente ; hors connexion → dernière liste datée, désactivée (C-P1-S9, S11 à S13).
- [ ] Montant > 0 avec raisons ; montants rapides de démonstration configurables ; au-delà du niveau d'accès : message, lien ou phrase d'identité, Continuer désactivé, **aucune limite chiffrée** (C-P1-S14 à S17).
- [ ] Récapitulatif : montant, Depuis ton numéro → Vers {destination} ; **frais à confirmer** : « Pris sur ton {opérateur} », « Frais » et « Arrive sur ton solde » n'apparaissent qu'avec un frais confirmé par le partenaire ; **tant que les frais sont inconnus, l'autorisation reste bloquée** (« Déposer est bloqué : frais inconnus. », rien n'est envoyé, le serveur refuse l'ordre) (C-P1-S18 à S20, S44).
- [ ] Aucun écran ne demande le code Mobile Money ni le PIN KOTIZ (C-P1-S21).
- [ ] Refus connu d'avance, opérateur indisponible, épargne fermée entre-temps : message, bouton adapté, rien n'est envoyé (C-P1-S22, S23, C-P2-S10).
- [ ] Validation chez l'opérateur : pas de retour, titre avec le montant débité, étapes « Envoyée » / « Validée », jamais « Fait » ni « J'ai validé » ; « Le dépôt n'arrive pas ? » ; au retour dans KOTIZ ou au relancement, l'état réel de la même demande (C-P1-S26 à S30).
- [ ] Résultat plein écran : fait, fait pour une épargne, **à reprendre** (dépôt fait, épargne pas faite), dépôt fait + passage en attente, en attente, on vérifie, annulé, refusé, échoué ; retour jamais vers la saisie ; « Ton {opérateur} a été débité ? Signale-le » sur un échec (C-P1-S31 à S39, C-P2-S11 à S14, C-P4-S1).
- [ ] Pour une épargne : « Pour : {épargne} » jusqu'au récapitulatif, deux temps numérotés, quatre étapes ; la destination fixée à l'entrée ne change jamais (C-P2-S1, S7 à S9, S16).
- [ ] Le solde n'est crédité qu'à la confirmation du partenaire ; confirmations idempotentes (C-P1-S43).

### Écarts avec l'issue actuelle
- L'issue ne parle que du dépôt vers le wallet : le design y ajoute le dépôt **pour une épargne** (dépôt puis affectation liés, FIN-03), dont l'échec partiel est spécifié avec #67.
- La validation chez l'opérateur est hors de KOTIZ ; son protocole (application, message, code) est à confirmer par opérateur (G01) : le bouton « Ouvrir {opérateur} » n'existe que si l'opérateur passe par son application.
- Les frais du prototype sont fictifs et annoncés comme tels : **aucune valeur n'est une règle**. En production, sans frais confirmés (G01, H02 #61), le dépôt reste bloqué au récapitulatif.
- C-17 n'est qu'une explication côté cliente : le dépôt en espèces reste dans #71 (lot E).
- Proposition : ajouter « Blocked by #59 » (socle UI : ligne de choix, résultat plein écran).

### Paramètres à confirmer
- G01 : opérateurs et leur ordre ; protocole de validation et annulation ; frais, montant débité, montant arrivé ; minimum et maximum ; niveau d'accès limité ; « échec confirmé » = rien pris ? ; raison d'un refus.
- Technique : lien de retour depuis l'appli de l'opérateur ; délai avant « On vérifie ».
- Les données du prototype (numéro, solde, épargnes, références, frais) sont fictives.
```

## Brouillon — commentaire pour #67 (D06 Sécuriser le cycle de vie des transactions)

```markdown
## Design validé (lot C, 20 octobre 2026)

Le lot C a été validé le 20 octobre 2026. Le **dépôt pour une épargne** (dépôt Mobile Money puis affectation liés), la **reprise** d'une affectation qui n'a pas été faite et le résultat inconnu d'un dépôt précisent ce que cette issue doit garantir, en plus du retour au solde (lot B).

- Prototype (parcours C-P1″ en attente, C-P2, C-P4, C-P4′, C-P4″) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Retour depuis l'application de l'opérateur ; § Réseau, idempotence, concurrence ; § Backend) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin (C-P1-S24, S25, S30, S31, S40, S41, S43 ; C-P2-S12, S15, S19, S20 ; C-P3-S13, S17, S21 ; C-P4-S20, S21) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Critères d'acceptation ajoutés
- [ ] Un dépôt pour une épargne est un dépôt puis une affectation **liés**, sur la totalité du montant, vers une seule épargne ; l'opération expose deux statuts (C-P2-S19).
- [ ] **Un dépôt fait n'est jamais « échoué »** parce que l'affectation a échoué : l'argent reste sur le solde, aucun nouvel ordre de paiement n'est créé (C-P2-S15, C-P2-S20).
- [ ] Affectation en attente ou inconnue : suivi seulement, aucune reprise proposée (C-P2-S12, C-P4-S20).
- [ ] La **reprise** est une nouvelle affectation liée au dépôt d'origine, avec sa propre confirmation (sans PIN) et sa propre clé ; plafonnée au plus petit du montant d'origine et du disponible ; une seule à la fois, la seconde reçoit l'état de la première (C-P4-S21).
- [ ] La même clé ne produit jamais deux effets (dépôt, mise de côté) ; une confirmation tardive ou rejouée du partenaire non plus (C-P1-S24, S43, C-P3-S13, S21).
- [ ] Un résultat inconnu (délai, connexion perdue) est « en attente » interrogeable, sans Réessayer ; au retour dans l'app, la même demande est interrogée, jamais recréée (C-P1-S30, S31, C-P3-S17).
- [ ] Un second dépôt pendant qu'un premier est en attente est une **nouvelle demande distincte** (montant et référence propres), jamais la répétition de la même (C-P1-S40).
- [ ] Le statut n'est jamais déduit d'un SMS ou d'une notification de l'opérateur : seule la confirmation du partenaire fait foi (C-P1-S41).
- [ ] Après un échec ou une annulation **confirmés**, « Réessayer » crée une nouvelle demande et redemande la validation chez l'opérateur (C-P1-S35).

### Écarts
- Le vocabulaire manque au glossaire DDD : **affectation**, **lien dépôt ↔ affectation**, **reprise** (à nommer avec `domain-modeling` avant le code).
- La reprise est interne (Savings) : aucune écriture Payments ; le dépôt d'origine reste « fait ».

### Paramètres à confirmer
- Technique : délai de confirmation avant « On vérifie » ; interrogation du statut au retour depuis l'appli de l'opérateur.
```

## Brouillon — commentaire pour #69 (D08 Réconcilier et contester une transaction)

```markdown
## Design validé (lot C, 20 octobre 2026)

Le lot C a été validé le 20 octobre 2026. Il dessine le **volet cliente** de cette issue : signaler un problème sur une opération, suivre le dossier, contester une réponse sur le même dossier, et voir une **correction** seulement quand elle est confirmée.

- Prototype (parcours C-P7, C-P8) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (C-14 à C-16, C-12 correction liée, `CaseTimeline`) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin (C-P7-S1 à S12, C-P8-S1 à S10, C-P1-S37) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Écrans concernés
C-14 Signaler un problème · C-15 Mon signalement · C-16 Je conteste cette réponse (feuille) · C-12 Détail (ligne « Mon signalement », section « Lié à cette opération »).

### Critères d'acceptation ajoutés
- [ ] Signaler depuis le détail d'une opération, quel que soit son statut : opération reprise sans ressaisie, motif requis (liste configurée, aucun inventé), mot et photo facultatifs, « L'envoi ne lance aucun remboursement. » (C-P7-S1 à S5).
- [ ] Échec ou hors ligne : « Rien n'est envoyé. », saisie gardée ; « Quitter sans envoyer ? » seulement avec un mot ou une photo (C-P7-S6, S7).
- [ ] Après l'envoi : message **information** (jamais un succès vert), « Ce n'est pas un remboursement. », dossier à référence propre, statut neutre Envoyé > En cours > Résolu, aucun délai annoncé (C-P7-S8, S10).
- [ ] Un seul dossier par opération : le détail ouvre le dossier existant (C-P7-S9, S12).
- [ ] **Résolu ≠ Remboursé** : « Résolu ne veut pas dire remboursé. » ; sans correction liée, « Aucune somme n'a été versée pour ce dossier. » ; le mot « remboursé » n'apparaît jamais (C-P8-S1, S2, S7).
- [ ] « Je conteste cette réponse » (secondaire, seulement sur Résolu) rouvre **le même dossier** : même référence, historique gardé (« Contesté » puis « En cours »), aucun nouveau dossier ni mouvement d'argent (C-P8-S4 à S7).
- [ ] Une **correction** n'apparaît que confirmée : opération propre dans Opérations, liée à l'opération d'origine, en contre-écritures équilibrées sans modifier les écritures d'origine (C-P8-S3, S8, S9).

### Écarts
- **Dépendance : proposition de lever le blocage par #68** (retrait) pour le volet signalement. Signaler, suivre, contester un **dépôt** et afficher une correction ne dépendent pas du retrait. Proposition : Blocked by #67 et **D26** (détail d'une opération, point d'entrée du signalement) ; le litige sur un retrait suivra #68 quand il sera livré.
- Le rapprochement et le suspense (côté back-office) ne sont pas dessinés au lot C.
- Le glossaire ne nomme ni le **dossier de signalement**, ni la **contestation**, ni la **correction** ; CONTEXT-MAP n'a pas de contexte « Support » : contexte à désigner (Admin & Conformité ? Savings pour la correction ? nouveau contexte avec ADR ?) avant le code.

### Paramètres à confirmer
- G03 : motifs ; pièces jointes (formats, taille, nombre) ; contact d'aide ; délais ; limite de contestation (le prototype n'en permet qu'une) ; commentaire de contestation obligatoire ou non (facultatif par défaut).
- G01 : libellé et sens de la correction.
```

## Brouillon — commentaire pour #94 (D21 Afficher l'accueil cliente avec masquage des montants)

```markdown
## Design validé (lot C, 20 octobre 2026)

Le lot C (dépôt, affectation, opérations et reçus) a été validé le 20 octobre 2026. Il précise l'entrée « Déposer », la ligne « Dernier dépôt » et les lignes d'opérations de l'accueil.

- Prototype (planche C · Raccords ; parcours C-P1, C-P1″, C-P6) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Raccords vers les autres lots, `TransactionRow`) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin (C-P1-S2, S3, S34, S42 ; C-P2-S17 ; C-P3-S20 ; C-P6-S29, S31) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Critères d'acceptation ajoutés
- [ ] Le raccourci « Déposer » ouvre la feuille « Comment tu veux déposer ? » ; la fermer ramène à l'accueil (C-P1-S2, S3).
- [ ] Après un dépôt **fait** vers le solde, le solde augmente du montant arrivé ; **en attente**, il ne change pas et « Dernier dépôt » affiche « En attente » (C-P1-S34, S42).
- [ ] « Dernier dépôt » affiche le montant et le statut, **sans nom d'épargne** (PNV-2 refusée après test le 20 octobre 2026), et ouvre le détail de ce dépôt (C-P2-S17, C-P6-S29).
- [ ] « Dernières opérations » utilise la `TransactionRow` du lot C : sous-titre, variante interne, statut combiné, « + » / « − » seulement si c'est fait ; « Tout voir », une ligne et l'onglet Opérations ouvrent Opérations ou le détail (C-P3-S20, C-P6-S29).
- [ ] Le réglage de masquage vaut aussi pour Opérations, le détail et le reçu (C-P6-S31).

### Écarts
- L'accueil du lot A utilisait l'ancienne ligne d'opération : à remplacer par la ligne du lot C (une seule `TransactionRow` dans l'app).
- Dépendance : « Tout voir » et les lignes mènent aux écrans de **D26** (à créer).
```

## Brouillon — commentaire pour #73 (D12 Épargner dans un objectif signé-signé) — raccords et état B07 « Dépôt pas entré »

```markdown
## Design validé (lot C, 20 octobre 2026) — raccords du détail d'une épargne

Le lot C a été validé le 20 octobre 2026. Il branche le détail d'une épargne (B07) sur l'alimentation, les opérations et la reprise, et **ajoute à B07 un état reporté depuis le lot C : « Dépôt pas entré »** (correction n° 1 de la critique du lot C, validée avec le lot C, dessinée dans la section Lot B du canvas, version 22).

- Prototype (page « Lot B », planche B07, état « Dépôt pas entré (report du lot C, 20 oct.) » ; page « Lot C », parcours C-P2, C-P4) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Raccords vers les autres lots, B · B07) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin (C-P2-S6, S18 ; C-P4-S16, S17 ; C-P6-S29) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Nouvel état de B07 : « Dépôt pas entré »
Quand un dépôt Mobile Money **fait** pour cette épargne n'a pas pu y passer (échec confirmé, pas encore repris) :
- au-dessus des boutons, une `InfoLine` « {montant} sont restés sur ton solde. Les mettre ici › » ouvre la **reprise** (récapitulatif « Réessayer de mettre de côté », ou la saisie si le solde a baissé, ou « {épargne} est fermée » si l'épargne a été fermée) ;
- dans « Derniers mouvements », la ligne du dépôt s'affiche « Depuis {opérateur} » · « Sur ton solde » · « {montant} » **sans « + »**, en texte secondaire · « Pas entré » avec une croix (pastille d'échec) ; toucher la ligne ouvre la reprise ;
- ce dépôt n'est **jamais** affiché « Échoué » ni « + {montant} » dans l'épargne ; le montant et la barre de l'épargne restent sur le confirmé ;
- une fois la reprise faite, la ligne d'information disparaît et le mouvement compte dans l'épargne.

### Critères d'acceptation ajoutés
- [ ] État « Dépôt pas entré » conforme ci-dessus, avec la ligne d'information qui ouvre la reprise (C-P4-S16, C-P4-S17).
- [ ] « Mettre de l'argent » ouvre la feuille « D'où vient l'argent ? » pour cette épargne ; la fermer ramène à B07 (C-P2-S6) ; la suite est dans #66 (Mobile Money) et **D25** (solde, reprise).
- [ ] « Tout voir › » de « Derniers mouvements » ouvre Opérations filtrées sur l'épargne ; une ligne ouvre le détail de l'opération (C-P2-S18, C-P6-S29).

### Écarts
- La « cotisation flexible » du corps de l'issue est l'alimentation d'une épargne : branche Mobile Money dans #66, branche solde et reprise dans **D25** (issue à créer). Le corps de #73 peut y renvoyer (titre proposé au lot B inchangé : « D12 — Créer et gérer ses épargnes par projet »).
- Cet état complète la planche B07 validée au lot B ; rien d'autre ne change dans le lot B.
```

## Brouillon — commentaire pour #97 (D24 Remettre l'argent d'une épargne sur le solde)

```markdown
## Design validé (lot C, 20 octobre 2026) — raccords

Le lot C a été validé le 20 octobre 2026. Il donne la destination des liens du résultat du retour (B12) et la ligne du retour dans Opérations.

- Handoff (§ Raccords vers les autres lots, C-11, C-13) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md
- Gherkin (C-P6-S30) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Critères d'acceptation ajoutés
- [ ] « Voir le reçu › » du résultat d'un retour **fait** ouvre le reçu « Retour au solde » (C-13) ; « Tu le retrouves dans Opérations » mène à Opérations (C-P6-S30).
- [ ] Dans Opérations, un retour s'affiche « Depuis {épargne} » · « Vers ton solde » · « + {montant} » · statut en mots, variante interne (pastille neutre, sans logo d'opérateur) (C-P6-S30).

### Écarts
- Dans le prototype, « Voir le reçu » de B12 ouvre Opérations (données de prototype séparées) : à coder vers le reçu du retour.
- Dépendance : le reçu et Opérations sont dans **D26** (à créer).
```

## Brouillon — commentaire pour #59 (D02 Fournir le socle UI accessible)

```markdown
## Design validé (lot C, 20 octobre 2026)

Le lot C a été validé le 20 octobre 2026. Il réutilise le socle des lots A et B et ajoute des composants, construits dans le canvas en attendant leur promotion dans le Design System.

- Prototype (page « Lot C ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v12 (illustrations `Actions/mobile-money.svg`, `Actions/agente.svg`) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (§ Composants, § Tokens) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-c.md

### Critères d'acceptation ajoutés
- [ ] `TransactionRow` : sous-titre, variante `internal` (pastille neutre, flèches internes, jamais de logo ni de pastille d'apport), statut combiné (« À reprendre » / « En attente » en ambre + phrase), « + » / « − » seulement si l'opération est faite.
- [ ] Ligne de choix (opérateur, origine des fonds) : logo 64 × 48 ou illustration, libellé, chevron, état désactivé avec raison lue ; ligne ≥ 64.
- [ ] `LinkedStatusRows`, `FilterChips` (une seule puce active, puce d'épargne amovible), `Receipt`, `CaseTimeline` (aucun vert), étapes numérotées.
- [ ] `StepTracker` : statut `failed` « Pas fait », étape de reprise, jusqu'à 4 étapes, jamais « Fait » sur une attente.
- [ ] Écran de résultat plein écran (croix « Fermer », statut en haut, actions en bas) et zone d'action fixe (filet seulement quand le contenu défile dessous), partagés.
- [ ] Logos officiels des opérateurs (Wave en symbole seul), jamais recolorés ; illustrations Mobile Money et agente embarquées.

### Écarts
- Hors DS v12 : tous ces composants sauf les illustrations. « Ambre » couvre aussi « À reprendre » (décision PO du 19 octobre 2026), à reporter au Design System.
- Aucun token nouveau ; valeurs en dur à rattacher listées dans le handoff (pastille numérotée 28, colonne 120, point 12…).
```

## Brouillon — commentaire pour #64 (D03 Ouvrir un compte sécurisé en mode limité)

```markdown
## Design validé (lot C, 20 octobre 2026) — raccord Compte créé

- Gherkin (C-P1-S4, C-P1-S33) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-c.md

### Critères d'acceptation ajoutés
- [ ] Sur « Compte créé », « Faire mon premier dépôt » ouvre la feuille « Comment tu veux déposer ? » (et non plus directement le choix de l'opérateur) ; la fermer ramène à « Compte créé » (C-P1-S4, C-P1-S3).
- [ ] Le résultat du premier dépôt est simple, sans illustration ; sans épargne active, il propose « Créer une épargne », sans mise de côté automatique (C-P1-S33).
```

---

## Écarts relevés entre les documents et les décisions PO

Signalés, non corrigés ici (les fichiers screens / critique / spec sont tenus par une autre session). État vérifié le 20 octobre 2026 sur le canvas `1792494666-2bc8` et le Design System v12.

| Où | Écart | Ce qui fait foi |
|---|---|---|
| [ux-spec-lot-c.md](ux-spec-lot-c.md) | Textes de C-04, C-05, C-09, C-11 (deux segments), C-12 (« Signaler » primaire en attente), C-13 (« Pour » sur un partiel), C-15 (message succès), C-17 (« dans ton app ») ; PNV-2 encore « conditionnelle » ; C-10 à 3 actives avec « Créer une épargne » ; B07 « ne sont pas entrés · Réessayer » | Canvas version 22 et critique (voir la table « Écarts » du handoff) ; PNV-2 refusée le 20 octobre 2026 ; C-10 sans lien ; B07 « Dépôt pas entré » |
| [screens-lot-c.md](screens-lot-c.md) | Ligne « A · H01, A · E08, B · B07 » : « L'état B07 … n'est **pas** dessiné » ; § Parcours C-P4 cite encore « Ton dépôt est fait. École Awa n'a pas reçu l'argent. » | Section Validation du même fichier (B07 reporté au lot B, version 22) ; titre « {montant} sont sur ton solde. » |
| [test-lot-c.md](test-lot-c.md) | Numérotation « C-01 à C-16 » dans l'en-tête (C-00 et C-17 ajoutés depuis) ; C-P2-3 décrit PNV-2 comme à trancher | ux-spec § Numérotation ; PNV-2 refusée |
| [ddd-context-map-glossaire.md](../../architecture/ddd-context-map-glossaire.md) § 5.1 | `Deposit` « Min. 100 FCFA », `Streak`, `GoalLock` ; ni affectation, ni reprise, ni dossier, ni contestation, ni correction | Aucun minimum produit (G01) ; à traiter avec `domain-modeling` |
| [CONTEXT-MAP.md](../../../CONTEXT-MAP.md) | Pas de contexte « Ledger » ni « Support » | Ledger dans Savings ; contexte du signalement à décider |
| DESIGN.md (modifié, non commité) | « Ambre » réservé à « En attente » | Décision PO : « À reprendre » aussi en ambre (à reporter) |
| Prototype C-12 | Bouton « Voir le reçu » + lien « Voir le reçu du dépôt » sur un passage en attente | Lien seul recommandé (question PO) |

## Publications à faire (après feu vert du PO)

Préalable : commiter `handoff-lot-c.md`, `gherkin-lot-c.md` (et les fichiers du lot C non commités) et pousser `docs/restructure-documentation`, sinon les liens GitHub des commentaires ne fonctionnent pas.

1. **Créer D25** « Mettre de l'argent du solde vers une épargne » (brouillon ci-dessus), label `ready-for-agent`, Blocked by #73 et #67.
2. **Créer D26** « Consulter mes opérations, le détail et le reçu » (brouillon ci-dessus), label `ready-for-agent`, Blocked by #59 et #66.
3. Remplacer « D25 » et « D26 » par leurs numéros dans les brouillons de commentaires.
4. **Commenter #66** (dépôt, C-00 à C-05, C-17) ; proposer « Blocked by #59 ».
5. **Commenter #67** (lien dépôt ↔ affectation, reprise, inconnu, second dépôt).
6. **Commenter #69** (signalement, contestation, correction) et, si le PO le valide, **remplacer « Blocked by #68 » par D26** (garder #67).
7. **Commenter #94** (Déposer → C-00, « Dernier dépôt », lignes d'opérations).
8. **Commenter #73** (raccords B07 et **nouvel état « Dépôt pas entré »**).
9. **Commenter #97** (reçu du retour, ligne dans Opérations).
10. **Commenter #59** (composants du lot C).
11. **Commenter #64** (E08 → C-00).
