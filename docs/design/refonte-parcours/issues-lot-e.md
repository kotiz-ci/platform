# Issues — Refonte des parcours, lot E : espèces et accompagnement par une agente

Date : 30 octobre 2026. Statut : **publié le 1er novembre 2026** (issues #117 à #123, 13 commentaires « Design validé »). Les changements de « Blocked by » des issues existantes attendent encore le feu vert du PO. La publication (commentaires, nouvelles issues, changements de « Blocked by ») est faite par la session principale après relecture et feu vert explicite du PO (brief : « aucune modification d’issue sans feu vert explicite du PO »).

Sources : [handoff-lot-e.md](handoff-lot-e.md), [gherkin-lot-e.md](gherkin-lot-e.md) (202 scénarios), [ux-spec-lot-e.md](ux-spec-lot-e.md), [screens-lot-e.md](screens-lot-e.md), [critique-lot-e.md](critique-lot-e.md), [test-lot-e.md](test-lot-e.md), [ux-spec-lot-g.md](ux-spec-lot-g.md) (D28, D29), issues lues le 30 octobre 2026 avec `gh issue view <n> -R kotiz-ci/platform --comments` (#67, #68, #69, #70, #71, #72, #73, #75, #93) et la liste complète des issues.

Rappel : « E-01 » (avec tiret) est un **écran** ; « D10 » est le code de l'issue #71.

**Numérotation** : D27 est [#103](https://github.com/kotiz-ci/platform/issues/103) (fermée) ; **D28 et D29 sont réservés au lot G** (connexion et accueil de l'agente, décision PO-G12 du 30 octobre 2026, issues pas encore créées) ; les nouvelles issues du lot E vont de **D30 à D36**. Si l'ordre de création change, garder les codes et ne remplacer que les numéros d'issue.

**Liens vers la branche** : les liens GitHub ci-dessous pointent vers `main`. Ils ne fonctionnent qu'une fois la branche `docs/refonte-lot-e` (avec `handoff-lot-e.md`, `gherkin-lot-e.md`, `issues-lot-e.md` et les autres documents du lot E, non commités à ce jour) fusionnée dans `main`.

## Constat sur les issues actuelles

- **[kotiz-ci/platform#71](https://github.com/kotiz-ci/platform/issues/71) D10 « Réaliser un cash-in auprès d’une agente »** : une ligne (« Scan et confirmation client, débit du float et crédit du wallet atomiques »), trois critères génériques, aucun commentaire, bloquée par #65, #67, #70. Il manque tout le parcours : ordre fonds → confirmation → remise → lancement, destination choisie par la cliente, nouvelle confirmation, expiration, sans smartphone, annulation et « J’ai remis les espèces », résultats et SMS.
- **[kotiz-ci/platform#72](https://github.com/kotiz-ci/platform/issues/72) D11 « Réaliser un cash-out auprès d’une agente »** : une ligne (« Débit wallet, crédit float et preuve de remise d’espèces »), un commentaire de raccord du lot D, bloquée par #69, #70, #71. Il manque : déclaration « J’ai les espèces », PIN caché, résultat avant remise, « J’ai reçu mes espèces », deux codes sans smartphone, contestation.
- **[kotiz-ci/platform#68](https://github.com/kotiz-ci/platform/issues/68) D07 « Effectuer un retrait direct en sandbox »** : a reçu le design du lot D. Le lot E ajoute la **branche préparée par une agente** (E-P8).
- **[kotiz-ci/platform#73](https://github.com/kotiz-ci/platform/issues/73) D12** : le lot B a proposé de retirer « signatures numériques » (= carnet, lot E). Le lot E place le carnet dans D35 et la création assistée dans D36 ; il ajoute à B · B07 le bouton « Mon carnet › ».
- **[kotiz-ci/platform#70](https://github.com/kotiz-ci/platform/issues/70) D09 « Activer une agente et gérer ses avoirs »** : le lot G lui retire les écrans de connexion et d'accueil (D28, D29). Le lot E n'en utilise que le **contrôle des fonds** (oui / non, sans montant), son **recontrôle au lancement** et le statut de l'agente.
- **[kotiz-ci/platform#69](https://github.com/kotiz-ci/platform/issues/69) D08** : reçoit les motifs « J’ai remis les espèces » et « Espèces non reçues » et la remise « Contestée ».
- **[kotiz-ci/platform#99](https://github.com/kotiz-ci/platform/issues/99) D26** : reçoit le contenu espèces d'Opérations, du détail et du reçu.
- **[kotiz-ci/platform#94](https://github.com/kotiz-ci/platform/issues/94) D21** : reçoit l'`InfoLine` « {agente} attend ta réponse › » (PNV-3) et le message après un refus.
- **[kotiz-ci/platform#95](https://github.com/kotiz-ci/platform/issues/95) D22 Mon QR** : reçoit l'ouverture automatique de la demande reçue.
- **[kotiz-ci/platform#67](https://github.com/kotiz-ci/platform/issues/67) D06** : reçoit l'idempotence par demande et par lancement, l'expiration de la confirmation, la reprise et le résultat inconnu du cash.
- **[kotiz-ci/platform#75](https://github.com/kotiz-ci/platform/issues/75) D14** : reçoit les SMS du lot E et les demandes en direct.
- **[kotiz-ci/platform#59](https://github.com/kotiz-ci/platform/issues/59) D02** : reçoit les composants nouveaux et les variantes du lot E.
- **[kotiz-ci/platform#98](https://github.com/kotiz-ci/platform/issues/98) D25** : reçoit une nouvelle entrée vers la reprise (dépôt en espèces vers une épargne, mise de côté échouée).
- **Sans issue** : identification de la cliente côté agente, demande d'agente (envoi, attente, annulation), codes ponctuels, accompagnement, permission de point, carnet et relevé, création assistée : **sept issues à créer (D30 à D36)**.

## Correspondance parcours / écrans → issues

| Parcours                          | Écrans                                                                                                                        | Issue                                                             | Scénarios                                                                                                                            | Remarque                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Socle lot E                       | `AgentIdentity`, `OneTimeCodeField`, `QrScanner`, `Statement`, `ResultScreen` neutre, `PinScreen` avertissement, `StatusRows` | [#59](https://github.com/kotiz-ci/platform/issues/59) D02         | critères « Socle lot E » du handoff ; E-P3-S11, E-P4-S3, E-P5-S10, E-P11-S7                                                          | Construits dans le canvas (`le-`), hors DS v15                  |
| Identifier la cliente             | E-51, E-52, E-53                                                                                                              | **D30** ([#117](https://github.com/kotiz-ci/platform/issues/117)) | E-P1-S10 à S12, S21 ; E-P3-S1 à S3                                                                                                   | Commun à toutes les opérations agente                           |
| Demande d'agente                  | E-56, E-60, reprise                                                                                                           | **D31** ([#118](https://github.com/kotiz-ci/platform/issues/118)) | E-P1-S16, S23, S24 ; E-P4-S11 à S13, S23, S25                                                                                        | Générique : dépôt, retrait, Mobile Money, accompagnement, point |
| Codes ponctuels                   | E-57 (8 finalités)                                                                                                            | **D32** ([#119](https://github.com/kotiz-ci/platform/issues/119)) | E-P3-S8, S10 ; E-P4-S8 à S10, S22 ; E-P6-S6                                                                                          | G02 bloquant en production                                      |
| E-P1 à E-P4 Dépôt en espèces      | E-01 à E-05, E-54, E-55, E-58, E-59 (dépôt)                                                                                   | [#71](https://github.com/kotiz-ci/platform/issues/71) D10         | E-P1-S1, S3 à S8, S13 à S15, S17 à S20, S22 ; E-P2-S1 à S6, S8 à S13 ; E-P3-S4 à S7, S9, S12 ; E-P4-S1 à S6, S14, S18, S20, S21, S24 | Cœur de l'issue                                                 |
| E-P5 à E-P7 Retrait en espèces    | E-06 à E-10, E-61 à E-64, E-59 (retrait)                                                                                      | [#72](https://github.com/kotiz-ci/platform/issues/72) D11         | E-P5-S1 à S22 ; E-P6-S1 à S5, S7, S8 ; E-P7-S1 à S14, S16 à S18                                                                      | Cœur de l'issue                                                 |
| E-P8 Retrait Mobile Money préparé | E-11, E-65 à E-67, E-59 (Mobile Money), D-04 et D-05 depuis E-11                                                              | [#68](https://github.com/kotiz-ci/platform/issues/68) D07         | E-P8-S1 à S12                                                                                                                        | Branche assistée du retrait du lot D                            |
| E-P9 Accompagnement               | E-12, E-14, E-15, E-16 (accompagnement), E-68                                                                                 | **D33** ([#121](https://github.com/kotiz-ci/platform/issues/121)) | E-P9-S1 à S17, S19                                                                                                                   | Contexte à trancher (Agents ou IAM)                             |
| E-P10 Permission de point         | E-13, E-15 (permissions), E-16 (point), E-69, E-70                                                                            | **D34** ([#122](https://github.com/kotiz-ci/platform/issues/122)) | E-P10-S1 à S13 ; E-P12-S1 à S5                                                                                                       | E-70 utilise le relevé de D35                                   |
| E-P11 Carnet et relevé            | B · B07 « Mon carnet › », E-17, E-18, E-19                                                                                    | **D35** ([#120](https://github.com/kotiz-ci/platform/issues/120)) | E-P11-S1 à S13                                                                                                                       | Remplace « signatures numériques » de #73                       |
| E-P12 Création assistée           | E-53 (ligne), E-71, E-72, E-57 (création), E-59 (création), E-15                                                              | **D36** ([#123](https://github.com/kotiz-ci/platform/issues/123)) | E-P12-S6 à S12                                                                                                                       | Cliente sans accès à l'app seulement                            |
| E-P13 Opérations en espèces       | C-11, C-12, C-13                                                                                                              | [#99](https://github.com/kotiz-ci/platform/issues/99) D26         | E-P13-S1 à S9, S11                                                                                                                   | Montants réels, « Espèces en attente »                          |
| Signalement espèces               | E-05, E-10, C-14, C-15                                                                                                        | [#69](https://github.com/kotiz-ci/platform/issues/69) D08         | E-P4-S15 à S17 ; E-P7-S15 ; E-P13-S10                                                                                                | Motifs G03 ; remise « Contestée »                               |
| Cycle de vie                      | backend                                                                                                                       | [#67](https://github.com/kotiz-ci/platform/issues/67) D06         | E-P1-S6, S19, S23 ; E-P4-S7, S19 ; E-P5-S16 ; E-P7-S9, S11                                                                           | Idempotence par demande et par lancement                        |
| Accueil                           | A · H01                                                                                                                       | [#94](https://github.com/kotiz-ci/platform/issues/94) D21         | E-P1-S9 ; E-P4-S25 ; E-P9-S18                                                                                                        | « Awa attend ta réponse › »                                     |
| Mon QR                            | A · Q01                                                                                                                       | [#95](https://github.com/kotiz-ci/platform/issues/95) D22         | E-P1-S2                                                                                                                              | Ouverture automatique                                           |
| SMS et demandes en direct         | SMS du lot E                                                                                                                  | [#75](https://github.com/kotiz-ci/platform/issues/75) D14         | E-P1-S22 ; E-P3-S12 ; E-P11-S9 ; E-P12-S2                                                                                            | Statut d'envoi distinct                                         |
| Fonds de l'agente                 | E-54, E-58                                                                                                                    | [#70](https://github.com/kotiz-ci/platform/issues/70) D09         | E-P4-S1, S18 ; E-P8-S9                                                                                                               | Oui / non, jamais le montant                                    |
| Reprise de la mise de côté        | E-04 → C-08                                                                                                                   | [#98](https://github.com/kotiz-ci/platform/issues/98) D25         | E-P2-S6, S7                                                                                                                          | Nouvelle entrée, aucun nouveau dépôt                            |

Des scénarios peuvent apparaître dans deux issues (une vue écran, une vue backend), comme au lot D : chaque issue les implémente à sa frontière.

**Issues lues et non concernées directement** : [#93](https://github.com/kotiz-ci/platform/issues/93) D20 (E-52 « Créer sa fiche » ouvre A · A02 sans changement, E-P3-S3) ; [#97](https://github.com/kotiz-ci/platform/issues/97) D24 (E-06 « Remettre sur mon solde » ouvre Mes épargnes sans changement, E-P7-S2) ; [#64](https://github.com/kotiz-ci/platform/issues/64) D03 (statut de l'accès à l'app, lu par E-53 ; PIN KOTIZ, prérequis) ; [#65](https://github.com/kotiz-ci/platform/issues/65) D04 (« Vérifier mon identité » depuis E-06, sans changement) ; [#96](https://github.com/kotiz-ci/platform/issues/96) D23 (aucun token nouveau) ; [#74](https://github.com/kotiz-ci/platform/issues/74) D13 (administration : réinitialisation et suspension de l'agente, lot G) ; [#60](https://github.com/kotiz-ci/platform/issues/60) H01 et [#61](https://github.com/kotiz-ci/platform/issues/61) H02 (lèvent G01, frais du cash compris) ; [#63](https://github.com/kotiz-ci/platform/issues/63) H04 (lève G02 : codes, PIN, capture d'écran).

## Gates et glossaire qui bloquent chaque ticket

Termes absents du [glossaire DDD](../../architecture/ddd-context-map-glossaire.md) v1.1, à nommer avec `domain-modeling` **avant le code** : **demande**, **accompagnement**, **permission de point**, **code ponctuel**, **remise** (et réception) ; aussi accord de noms, fonds de l'agente, restitution, et les termes du lot D encore absents (montant engagé, montant reçu / pris). Contextes à trancher : demande et accompagnement (Agents ou IAM), permission de point (IAM ou Savings), codes ponctuels (IAM ou Notifications).

| Ticket                               | G01                                                             | G02                                                        | G03                                  | G04                                          | Glossaire (avant le code)                  | Autres prérequis                  |
| ------------------------------------ | --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------ | -------------------------------------------- | ------------------------------------------ | --------------------------------- |
| D30 Identifier la cliente            | ✓ (agente qui sert sa propre fiche)                             | ✓ (protection contre l'énumération)                        | ✓ (contact)                          | —                                            | —                                          | D28 (connexion agente, lot G)     |
| D31 Demande d'agente                 | ✓ (durée de validité de la confirmation)                        | ✓ (temps réel de la demande, authentification de l'agente) | —                                    | —                                            | **demande**                                | D28, D30, #75                     |
| D32 Codes ponctuels                  | —                                                               | ✓ **bloquant en production** (protocole des 8 codes)       | ✓ (contact)                          | —                                            | **code ponctuel**, accord de noms          | D31, #75                          |
| #71 D10 Dépôt en espèces             | ✓ **bloquant** (frais, minimum, maximum, atomicité, recontrôle) | ✓                                                          | ✓ (motif, contact)                   | —                                            | **demande**, **remise**, fonds de l'agente | D30, D31, #70, #67, #98 (épargne) |
| #72 D11 Retrait en espèces           | ✓ **bloquant** (frais, moment du débit, échec confirmé)         | ✓ (PIN, capture, codes)                                    | ✓ (motif, réception sans smartphone) | —                                            | **demande**, **remise**, réception         | D30, D31, #71, #70, #67, #69      |
| #68 D07 Retrait Mobile Money préparé | ✓ **bloquant** (comme le lot D)                                 | ✓                                                          | —                                    | —                                            | **demande** ; termes du lot D              | D30, D31, lot D de #68            |
| D33 Accompagnement                   | —                                                               | ✓ (code d'accompagnement)                                  | ✓ (retrait sans smartphone)          | —                                            | **accompagnement**                         | D30, D31                          |
| D34 Permission de point              | —                                                               | ✓ (code du point, données sur le téléphone de l'agente)    | —                                    | ✓ (SMS du point)                             | **permission de point**                    | D33, D35                          |
| D35 Carnet et relevé                 | —                                                               | —                                                          | —                                    | ✓ **bloquant** (résumé SMS, format, partage) | —                                          | #73, #99                          |
| D36 Création assistée                | —                                                               | ✓ **bloquant en production** (code de création)            | —                                    | —                                            | **accompagnement**, **code ponctuel**      | D33, D32, #73                     |
| #69 D08 Signalement espèces          | —                                                               | —                                                          | ✓ **bloquant** (motifs)              | —                                            | **remise** (contestée)                     | #71, #72                          |
| #99 D26 Opérations en espèces        | ✓ (frais affichés)                                              | —                                                          | —                                    | —                                            | **remise**                                 | #71, #72                          |
| #67 D06 Cycle de vie                 | ✓ (moment du débit, atomicité)                                  | —                                                          | —                                    | —                                            | **demande**                                | —                                 |
| #94 D21, #95 D22                     | —                                                               | ✓ (temps réel)                                             | —                                    | —                                            | **demande**                                | D31                               |
| #75 D14 SMS                          | —                                                               | ✓ (texte final des SMS)                                    | —                                    | ✓                                            | **code ponctuel**                          | —                                 |
| #59 D02 Socle                        | —                                                               | ✓ (longueur du code, jamais en dur)                        | —                                    | —                                            | —                                          | —                                 |

---

## Nouvelles issues à créer (D30 à D36)

### D30 — [#117](https://github.com/kotiz-ci/platform/issues/117) — Trouver et identifier la cliente dans l'app agente

Label : `ready-for-agent` · Blocked by : D28 (connexion de l'agente, lot G), #59 · Après création : citer D30 dans #71 et #72 (point d'entrée) et dans D29 (entrée « Trouver une cliente » de l'accueil agente).

```markdown
## What to build

Dans l'app agente (variant `agent`), l'agente trouve la cliente par son QR KOTIZ (A · Q01) ou par son numéro, vérifie que c'est bien elle, puis choisit l'opération. Écrans E-51 (viseur), E-52 (recherche par numéro), E-53 (« C’est bien elle ? »). E-53 n'affiche **jamais** le solde, les épargnes ni les opérations de la cliente : nom, numéro masqué, accès à l'app activé ou non, et les lignes d'opération (Dépôt en espèces, Retrait, Accompagnement avec son statut, Point de ses épargnes, Créer une épargne pour elle si l'accès à l'app n'est pas activé).

## Design validé (lot E, 30 octobre 2026)

- Prototype (page « Lot E — app agente », E-51 à E-53) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v15 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (E-51 à E-53, `QrScanner`) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P1-S10 à S12, S21 ; E-P3-S1 à S3 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écrans : E-51 Trouver la cliente · E-52 Chercher par numéro · E-53 C'est bien elle ?

## Acceptance criteria

- [ ] Viseur plein cadre, « Scanne le QR de la cliente. », « Le QR sert à la trouver. Il ne paie rien. » ; un QR KOTIZ valide ouvre « C’est bien elle ? » (E-P1-S10).
- [ ] Caméra refusée, QR non KOTIZ, compte qui ne peut pas être servi (bouton texte « Contacter l’aide », sans détail), hors connexion ; « Chercher par numéro » toujours proposé.
- [ ] Recherche par numéro : vide, incomplet (« Écris les 10 chiffres de son numéro. »), recherche, introuvable (« Aucune cliente à ce numéro. » + « Créer sa fiche » → A · A02) ; la recherche n'exécute aucune opération (E-P3-S1 à S3).
- [ ] « C’est bien elle ? » : nom, « 07 •• •• •• 56 », accès à l'app, « Demande-lui son nom avant de continuer. », lignes d'opération ; **aucun solde, aucune épargne, aucune opération** ; « Créer une épargne pour elle » seulement sans accès à l'app (E-P1-S11, E-P12-S6).
- [ ] « Ce n’est pas elle » ramène au viseur sans rien enregistrer ; « Terminé » d'un résultat ramène au viseur (E-P1-S12, S21).
- [ ] Compte restreint : lignes désactivées avec « Pas possible pour cette cliente. » et « Contacter l’aide ».
- [ ] Après une annulation, E-53 affiche « Demande n° … annulée. Fatou reçoit un SMS. » (ou le message de l'accompagnement, du point).
- [ ] API : recherche par QR ou numéro qui ne renvoie que nom, numéro masqué, statut de l'accès à l'app et opérations permises ; aucune donnée financière.

## À confirmer

- G01 : une agente peut-elle servir sa propre fiche de cliente (recommandation : non, refus générique).
- G02 : protection contre l'énumération des numéros.
- G03 : contact derrière « Contacter l’aide ».
- Dépendant du lot G (non spécifié ici) : état « accès suspendu » de E-53, retour vers l'accueil agente (G-20).

## Blocked by

- D28 (connexion de l'agente, lot G, à créer)
- #59 (socle UI)
```

### D31 — [#118](https://github.com/kotiz-ci/platform/issues/118) — Envoyer une demande d'agente à la cliente et suivre sa réponse

Label : `ready-for-agent` · Blocked by : D30, #75, #67 · Après création : citer D31 dans #71, #72, #68, #94, #95, D33, D34.

```markdown
## What to build

La **demande** est ce que l'agente prépare et que la cliente confirme ; elle existe même si aucun argent ne bouge. Cette issue construit son cycle générique, commun au dépôt, au retrait en espèces, au retrait Mobile Money préparé, à l'accompagnement et au point d'une épargne : envoi depuis l'app agente, arrivée en direct dans l'app cliente (ouverture automatique depuis Mon QR, notification, ligne de l'accueil), écran d'attente générique de l'agente (E-56), refus neutre, sans réponse, annulation par l'agente avant le lancement (E-60), passage au code SMS pour la **même** demande (PO-4), reprise de la demande en cours dans les deux apps.

## Design validé (lot E, 30 octobre 2026)

- Prototype (pages « Lot E — Espèces et agente » et « Lot E — app agente », E-56, E-60) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-56, E-60, § Réseau, idempotence, concurrence) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P1-S16, S23, S24 ; E-P4-S11 à S13, S23, S25 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écrans : E-56 Attends sa réponse (5 variantes) · E-60 Annuler la demande ? · reprise sur E-01, E-03, E-06, E-08 (cliente) et E-56, E-57, E-58, E-64 (agente).

## Acceptance criteria

- [ ] E-56 : horloge, « En attente », titre de la variante (« Fatou confirme sur son téléphone. », « Fatou confirme avec son PIN. », « Fatou répond sur son téléphone. », « Fatou choisit les épargnes. »), consigne espèces, boutons texte « Elle n’a pas internet ? Envoyer le code par SMS » et « Annuler la demande » **pour toutes les variantes** (E-P1-S16).
- [ ] Refus : neutre, pill « Refusée », « Fatou n’a pas confirmé. », « Rien n’a bougé. », « Revenir à sa fiche » ; sans réponse : « Pas de réponse pour l’instant. », « Renvoyer la demande » (nouvelle demande), aucune relance automatique (E-P4-S3, S23).
- [ ] « Elle n’a pas internet ? » ouvre le code de la **même** demande ; dès l'envoi du code, l'accord dans l'app n'est plus possible (E-P4-S22, avec D32).
- [ ] E-60 : « Annuler la demande ? », « Elle reste dans l’historique. », « Fatou reçoit un SMS. », dépôt « Si elle t’a donné des espèces, rends-les. » ; retour sur E-53 avec le message ; échec « Pas annulée. Réessaie. » ; impossible après le lancement ou l'autorisation (E-P4-S11 à S13).
- [ ] Côté cliente, fermer une demande sans répondre la laisse **en attente** (aucun refus implicite) ; deux demandes de deux agentes ne sont jamais fusionnées (E-P1-S24, E-P4-S25).
- [ ] Reprise : chaque app rouvre la demande en cours sur son étape, sans nouvelle demande (E-P1-S23).
- [ ] API : demande (type, agente, cliente, montant ou objet, destination, statut envoyée / confirmée / refusée / annulée / expirée), idempotente ; annulation refusée après le lancement ; statut lisible par les deux apps.

## À confirmer

- G02 : mécanisme du temps réel (push ou interrogation) ; durée avant « Pas de réponse » ; authentification de l'agente à l'envoi (ADR-0021 : à la session).
- G01 : durée de validité d'une confirmation.
- Glossaire : **demande** (absente), contexte (Agents ou IAM).

## Blocked by

- D30 (identifier la cliente)
- #75 (notifications : demande en direct, SMS d'annulation)
- #67 (cycle de vie : idempotence, reprise)
```

### D32 — [#119](https://github.com/kotiz-ci/platform/issues/119) — Confirmer une demande par code ponctuel SMS (cliente sans smartphone)

Label : `ready-for-agent` · Blocked by : D31, #75 · Après création : citer D32 dans #71, #72, #68, D33, D34, D36. **Pas livrable en production avant G02.**

```markdown
## What to build

Pour une cliente sans accès à l'app, chaque accord passe par un **code ponctuel** reçu par SMS sur son numéro vérifié, propre à **une** demande et à **une** finalité, que la cliente lit puis dit à l'agente. Huit finalités : dépôt, noms des épargnes, retrait, réception, retrait Mobile Money, accompagnement, point, création. Écran générique E-57 dans l'app agente, avec un champ dont les chiffres sont visibles et qui ne ressemble jamais à un PIN (`OneTimeCodeField`), et la feuille « Elle n’a pas reçu le SMS ? ».

## Design validé (lot E, 30 octobre 2026)

- Prototype (page « Lot E — app agente », E-57, 8 finalités et états) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-57, `OneTimeCodeField`, SMS) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P3-S8, S10, S11 ; E-P4-S8 à S10, S22 ; E-P6-S6 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écran : E-57 Code de la cliente (« Code du dépôt », « Code pour voir les noms », « Code du retrait », « Code de réception », « Code du retrait Mobile Money », « Code d’accompagnement », « Code du point », « Code de création »).

## Acceptance criteria

- [ ] Titre = finalité ; « Fatou lit le SMS. Elle vérifie, puis te dit le code. » ; rappel de la demande ; consigne espèces (« Ne prends pas les espèces sans code. » / « Ne donne pas les espèces sans code. ») ; champ en clair « Code lu par Fatou », aide « Ce n’est jamais son PIN. » (E-P3-S8).
- [ ] Un code d'une autre demande ou d'une autre finalité, ou le PIN, est toujours refusé ; aucun champ PIN dans l'app agente (E-P3-S10, S11, E-P6-S6).
- [ ] Incorrect (« Code incorrect. Demande-lui de relire le SMS. »), expiré (« Ce code n’est plus valable. », principal « Renvoyer le SMS »), bloqué (« Trop d’essais. », « Valider le code » désactivé avec « Code bloqué pour cette demande. », « Contacter l’aide ») (E-P4-S8, S9).
- [ ] « Elle n’a pas reçu le SMS ? » : « Vérifie son numéro avec elle : 07 •• •• •• 56. », « Renvoyer le SMS », « Revenir », « Contacter l’aide » ; après renvoi, « Nouveau SMS envoyé. L’ancien code ne marche plus. » et l'ancien code est refusé (E-P4-S10).
- [ ] Passage au code pour la même demande depuis E-56 (E-P4-S22).
- [ ] Aucune longueur, durée de validité, nombre d'essais ni délai de renvoi affiché ni écrit en dur.
- [ ] API : génération, envoi, validation et blocage par demande et par finalité ; un code valide n'a que l'effet de sa finalité (ex. le code du dépôt confirme les conditions, il ne lance rien).

## À confirmer

- **G02** (bloquant en production) : longueur, validité, essais, renvoi, blocage, preuve d'accord, texte final de chaque SMS.
- G03 : contact derrière « Contacter l’aide ».
- Glossaire : **code ponctuel**, **accord de noms** (absents) ; contexte (IAM ou Notifications).

## Blocked by

- D31 (demande d'agente)
- #75 (envoi des SMS)
```

### D33 — [#121](https://github.com/kotiz-ci/platform/issues/121) — Accepter, refuser et retirer l'accompagnement d'une agente

Label : `ready-for-agent` · Blocked by : D30, D31 · Après création : citer D33 dans D34 et D36.

```markdown
## What to build

L'**accompagnement** est l'accord de la cliente pour qu'une agente l'aide (créer une épargne, demander à voir le point d'une épargne). Il ne donne ni solde, ni opérations, ni point ; il est non exclusif et révocable. Côté agente : E-68 (statut, envoi de la demande ou du code, redemande après un refus seulement si la cliente le demande). Côté cliente : E-12 (accepter ou refuser), E-14 « Mon accompagnement » (entrée Profil, lot F), E-15 (page de l'agente), E-16 variante accompagnement (retirer l'agente, ses permissions et une création en attente).

## Design validé (lot E, 30 octobre 2026)

- Prototype (parcours E-P9, E-P9′, E-P9″) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-12, E-14, E-15, E-16, E-68) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P9-S1 à S17, S19 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écrans : E-12 Awa veut t'accompagner · E-14 Mon accompagnement · E-15 Awa, mon agente · E-16 Retirer Awa de ton accompagnement ? · E-68 Accompagnement (app agente).

## Acceptance criteria

- [ ] E-68 : statut (Pas demandé, En attente, Accepté, Refusé, Retiré par la cliente), ce que l'accompagnement permet, « Tu ne verras jamais son solde ni son PIN. », « Envoyer la demande » (app) ou « Envoyer le code par SMS » (sans app) (E-P9-S1, S2, S17).
- [ ] E-12 dit ce que l'agente peut et ne peut pas faire ; Accepter → E-15 « Awa t’accompagne. » ; Refuser → accueil « Tu as refusé. Awa ne peut pas t’accompagner. » (E-P9-S3 à S5).
- [ ] Après un refus : aucun principal, « Elle a refusé. Redemande seulement si elle te le dit. », « Elle a changé d’avis ? Redemander » = nouvelle demande ; aucune relance automatique ; silence et refus n'accordent rien (E-P9-S5 à S7).
- [ ] L'accompagnement ne donne ni solde, ni opération, ni point ; il n'est pas exclusif ; un dépôt ou un retrait n'en crée jamais (E-P9-S8, S9).
- [ ] E-14 : « À répondre », « T’accompagnent », « Une agente ne voit jamais ton solde. », état vide sans bouton d'ajout ; hors connexion « Répondre demande la connexion. » (E-P9-S10, S11).
- [ ] E-15 : identité, « T’accompagne depuis le … », épargnes visibles avec « Retirer », « Retirer Awa de mon accompagnement » ; échec « Pas retiré. » / « Réessaie. Rien n’a changé. » ; hors connexion une seule raison (E-P9-S12, S15).
- [ ] E-16 : « Retirer Awa de ton accompagnement ? », « Les points déjà envoyés restent envoyés. » ; retirer l'agente retire toutes ses permissions et annule une création en attente (« Sa demande de création sera annulée. ») ; aucune opération financière annulée (E-P9-S13, S14).
- [ ] Demande retirée par l'agente : « Cette demande n’existe plus. » (E-P9-S16).
- [ ] Entrée « Mon accompagnement » dans Profil (« Bientôt ici » tant que le lot F n'est pas livré) (E-P9-S19).

## À confirmer

- G02 : protocole du code d'accompagnement.
- G03 : retrait de l'accompagnement pour une cliente sans smartphone (par l'assistance).
- À dessiner : agente désactivée par KOTIZ (« N’est plus agente KOTIZ », droits retirés, avec #70).
- Glossaire : **accompagnement** (absent ; « rattachement » du registre RM-PERM) ; contexte (Agents ou IAM).

## Blocked by

- D30 (identifier la cliente)
- D31 (demande d'agente)
```

### D34 — [#122](https://github.com/kotiz-ci/platform/issues/122) — Autoriser une agente à voir le point d'une épargne

Label : `ready-for-agent` · Blocked by : D33, D35 · Après création : citer D34 dans D33.

```markdown
## What to build

Une agente qui accompagne la cliente peut demander à voir le **point** d'épargnes. La cliente coche **épargne par épargne** (aucune cochée au départ) ; une nouvelle épargne n'est jamais ajoutée seule ; la permission est révocable et contrôlée à chaque consultation et à chaque envoi. Côté agente : E-69 (épargnes autorisées seulement, demande, choix sans app par code des noms puis code du point) et E-70 (point daté d'une épargne, envoi par SMS vers le numéro vérifié seulement, jamais vers une autre application). Côté cliente : E-13 (choisir), E-15 (lignes « Retirer »), E-16 variante point.

## Design validé (lot E, 30 octobre 2026)

- Prototype (parcours E-P10 ; E-69, E-70) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-13, E-15, E-16, E-69, E-70, `Statement`) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P10-S1 à S13 ; E-P12-S1 à S5 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écrans : E-13 Awa veut voir le point de tes épargnes · E-15 (permissions) · E-16 (point) · E-69 Point de ses épargnes · E-70 Point d'{épargne}.

## Acceptance criteria

- [ ] Sans accompagnement accepté, E-69 renvoie vers l'accompagnement et n'affiche aucun nom (E-P10-S1).
- [ ] E-13 : aucune case cochée, épargnes sans montant, « Une nouvelle épargne ne sera pas ajoutée seule. », « Autoriser » désactivé avec « Coche au moins une épargne. » puis « Autoriser pour N épargne(s) » ; déjà autorisée cochée et désactivée ; aucune épargne : « Tu n’as pas d’épargne. » + « Fermer » sans raison (E-P10-S3, S4, S7, S8).
- [ ] Autoriser une épargne n'ouvre qu'elle ; une épargne créée ensuite n'est jamais ajoutée ; l'agente ne voit jamais le nom d'une épargne non autorisée (E-P10-S5, S6, S11).
- [ ] Retirer une permission (E-16 « Awa ne verra plus le point d’École Awa ? », « Elle t’accompagne toujours. ») garde l'accompagnement (E-P10-S10).
- [ ] Sans app : code des noms → « Choisis l’épargne avec elle » (noms seulement, pour cette demande) → « Code du point » (E-P10-S13).
- [ ] E-70 : point daté (`Statement`), « Envoyé à : 07 •• •• •• 56 (son numéro vérifié) », « Envoyer le point à Fatou par SMS » ; aucun champ destinataire, aucun partage externe, pas d'impression (E-P12-S1, S2).
- [ ] Envoi non abouti : même point renvoyé, permission revérifiée ; permission retirée : « Fatou a retiré ton accès à ce point. », rien d'affiché ; hors connexion « Cet écran a besoin d’internet. Réessaie plus tard. » (E-P12-S3 à S5).
- [ ] API : permission par cliente, agente et épargne ; contrôle à chaque lecture et à chaque envoi ; aucune donnée du point gardée sur le téléphone de l'agente.

## À confirmer

- G02 : code du point et code des noms ; données du point sur le téléphone de l'agente (recommandation : aucune).
- G04 : texte du SMS du point.
- Glossaire : **permission de point** (absente) ; contexte (IAM ou Savings).

## Blocked by

- D33 (accompagnement)
- D35 (relevé daté d'une épargne)
```

### D35 — [#120](https://github.com/kotiz-ci/platform/issues/120) — Consulter mon carnet et partager le point d'une épargne

Label : `ready-for-agent` · Blocked by : #73, #99 · Après création : citer D35 dans #73 (« signatures numériques » = carnet) et dans D34.

```markdown
## What to build

Le carnet « signé-signé » numérique d'une épargne : depuis le détail d'une épargne (B · B07, bouton « Mon carnet › »), la cliente voit les **versements confirmés** avec les accords réels de chacun (dépôt en espèces confirmé par elle et reçu par l'agente, dépôt Mobile Money validé, mise de côté confirmée, retours au solde avec PIN), puis un **point daté** (relevé) qu'elle peut recevoir par SMS sur son numéro ou partager par la feuille de partage du téléphone, sans statut. Aucune signature dessinée, aucune certification.

## Design validé (lot E, 30 octobre 2026)

- Prototype (parcours E-P11 ; B · B07 « Mon carnet › ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-17, E-18, E-19, `Statement`) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P11-S1 à S13 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écrans : E-17 Carnet d'{épargne} · E-18 Mon point au {date} · E-19 Partager mon point · raccord B · B07.

## Acceptance criteria

- [ ] « Mon carnet › » de B · B07 ouvre E-17 : « Carnet d’École Awa », « Ton signé-signé, sur ton téléphone. », progression (E-P11-S1).
- [ ] Versements confirmés seulement, avec les notes d'accord réelles ; retours au solde en « Vers ton solde » − « Avec ton PIN » ; un mouvement en attente est signalé à part (« 1 dépôt en attente n’est pas encore dans ton carnet. ») ; aucune signature ni validation inventée (E-P11-S2, S3).
- [ ] Une ligne ouvre le détail de l'opération ; masquage du réglage unique ; vide, chargement, hors connexion, épargne fermée « Fermée le {date} » (E-P11-S4 à S6).
- [ ] « Mon point du jour » : relevé daté toujours en clair, « Relevé daté », total, cible, versements confirmés, mention fixe (E-P11-S7) ; erreur « Ton point ne s’affiche pas. » (E-P11-S8).
- [ ] Résumé par SMS sur le numéro vérifié : « Résumé envoyé sur ton numéro. » ; non abouti : « Envoi non abouti. », « Le même point sera renvoyé. », « Renvoyer ce point » (même point, aucun mouvement) (E-P11-S9, S10).
- [ ] « Partager le relevé » : feuille du téléphone, **aucun statut**, aucun destinataire saisi dans KOTIZ ; hors connexion « Partager demande la connexion. » (E-P11-S11, S12).
- [ ] Un point plus tard est un nouveau point daté ; le relevé ne devient jamais un solde en direct (E-P11-S13).
- [ ] API : carnet d'une épargne (versements confirmés et retours au solde avec accords et horodatages disponibles), relevé daté immuable, envoi du résumé avec statut d'envoi distinct.

## À confirmer

- **G04** (bloquant) : contenu final du résumé SMS et du relevé ; format partagé (image ou PDF) ; faisabilité du partage externe (G05-3) ; partage hors connexion d'un relevé déjà généré.
- Technique : génération du relevé.

## Blocked by

- #73 (épargnes)
- #99 (opérations, détail : lien depuis une ligne du carnet)
```

### D36 — [#123](https://github.com/kotiz-ci/platform/issues/123) — Créer une épargne pour une cliente sans smartphone

Label : `ready-for-agent` · Blocked by : D33, D32, #73 · Après création : citer D36 dans #73 (création assistée).

```markdown
## What to build

Pour une cliente **sans accès à l'app** qui l'accompagne, l'agente renseigne avec elle une épargne (type, cible, date facultative, nom) en quatre étapes (E-71, compositions de B · B02 à B · B05 au « elle »), relit (E-72), puis la cliente confirme par le **code de création** reçu par SMS. Aucun argent ne bouge ; l'alimentation est un dépôt distinct. Si la cliente retire l'accompagnement pendant l'attente, la demande est annulée. Côté cliente, si elle active son app pendant une création, E-15 affiche la création en attente ou en vérification.

## Design validé (lot E, 30 octobre 2026)

- Prototype (parcours « Créer une épargne pour elle » de la page « Lot E — app agente ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-53, E-71, E-72, E-57 création, E-59 création, E-15) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin E-P12-S6 à S12 : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

Écrans : E-71 Créer une épargne pour elle (4 étapes) · E-72 Vérifie l'épargne avec elle · E-57 Code de création · E-59 (création) · E-15 (création en attente).

## Acceptance criteria

- [ ] L'entrée « Créer une épargne pour elle » n'existe que pour une cliente sans accès à l'app et qui a accepté l'accompagnement (E-P12-S6).
- [ ] Quatre étapes « Étape n sur 5 » au « elle », « Pour Fatou Koné », sans date personnalisée ; récapitulatif « 0 F pour l’instant », « Aucun argent ne bouge. », « Elle confirme avec un code SMS. » (E-P12-S7).
- [ ] Limite : « Elle ne peut pas créer d’autre épargne pour l’instant. », sans nombre, nom ni montant, aucune fermeture proposée (E-P12-S8).
- [ ] Code de création valide : « Épargne créée. », « Aucun argent n’a bougé. », « Pour l’alimenter : un dépôt. » ; en vérification « Ne la recrée pas. » ; échec « Pas créée. » (E-P12-S9, S10).
- [ ] Accompagnement retiré pendant l'attente : « Demande annulée. », « Fatou a retiré ton accompagnement. », code inutilisable (E-P12-S11).
- [ ] Cliente qui active son app : E-15 « Création de {épargne} en attente de ta confirmation par SMS. » ou « On vérifie la création de {épargne}. » sans action (G05-1) (E-P12-S12).
- [ ] API : création assistée liée à l'agente et à l'accompagnement, limite de 3 épargnes actives contrôlée côté serveur, idempotente, sans mouvement d'argent.

## À confirmer

- **G02** (bloquant en production) : code de création.
- Glossaire : **accompagnement**, **code ponctuel**.

## Blocked by

- D33 (accompagnement)
- D32 (codes ponctuels)
- #73 (épargnes)
```

---

## Paramètres « à confirmer » du lot E

| Paramètre                                                                                                                                        | Gate           | Écrans                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ---------------------------------------------------- |
| **Frais du dépôt et du retrait en espèces** et leur modèle ; frais inconnus = autorisation bloquée ; montant pris d'un retrait                   | G01            | E-01, E-06, E-09, E-11, E-55, E-63, E-67, C-12, C-13 |
| Minimum, maximum par opération ; plafonds du niveau d'accès limité                                                                               | G01            | E-54, E-62, E-66                                     |
| Moment du débit des fonds de l'agente et du crédit de la cliente (atomicité) ; recontrôle au lancement ; moment du débit du solde au retrait     | G01            | E-58, E-59, E-64                                     |
| Échec confirmé du retrait = rien pris ? (sinon E-08 « On vérifie ton solde. »)                                                                   | G01            | E-08                                                 |
| Durée de validité de la confirmation d'un dépôt ; délai avant « On vérifie »                                                                     | G01, technique | E-03, E-58, E-04, E-08                               |
| Agente qui sert sa propre fiche                                                                                                                  | G01            | E-53                                                 |
| **Protocole des 8 codes ponctuels** (longueur, validité, essais, renvoi, blocage, preuve d'accord, texte des SMS)                                | G02            | E-57, E-55, E-63, E-64, E-67, E-68, E-69, E-72       |
| Temps réel de la demande ; ouverture automatique depuis Mon QR ; capture d'écran sur E-07 ; longueur du PIN et essais                            | G02            | A · Q01, E-01, E-06, E-07, E-11                      |
| Données du point sur le téléphone de l'agente                                                                                                    | G02            | E-70                                                 |
| Motifs « J’ai remis les espèces » et « Espèces non reçues » ; contact ; réception confirmée par l'assistance ; retrait d'accompagnement sans app | G03            | E-05, E-10, C-14, E-57, E-64, E-15                   |
| Résumé SMS, format du relevé, partage externe                                                                                                    | G04, G05-3     | E-18, E-19, E-70                                     |
| Retour au solde et reprise assistés sans smartphone (G05-2, règle validée, écrans à spécifier)                                                   | —              | hors carte (E-20 à E-50 libres)                      |

**Valeurs de démonstration à ne jamais reprendre** : Fatou Koné, 07 08 12 34 56, solde 12 400 FCFA, École Awa, Boutique, Moto, Awa Traoré, AG-0142, Binta Koffi, montants 3 000 / 4 500 / 5 000 / 300 000, demandes n° 2110-0031 à 2110-0033, références KTZ-2110-…, dossier n° 2110-0019, « 21 oct. 2026 à 10:45 », PIN 2468, blocage au 3e essai, codes « 0000 » / « 9999 », 4 chiffres minimum, délais de 3 s et 4 s du prototype, lignes « à confirmer » sur une opération faite.

---

## Brouillon — commentaire pour #71 (D10 Réaliser un cash-in auprès d'une agente)

```markdown
## Design validé (lot E, 30 octobre 2026)

Le lot E (espèces et accompagnement par une agente, app cliente et app agente) a été validé par le PO et sa conjointe après un test à deux téléphones, puis critiqué et corrigé (canvas version 36). Cette issue reçoit le **dépôt en espèces**, de la saisie par l'agente au résultat des deux côtés. L'identification de la cliente est dans D30, la demande générique (attente, annulation, reprise) dans D31, les codes SMS dans D32, le signalement « J’ai remis les espèces » dans #69, la reprise d'une mise de côté échouée dans #98, les lignes et le détail dans #99.

- Prototype (pages « Lot E — Espèces et agente » et « Lot E — app agente », parcours E-P1 à E-P4 et variantes) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v15 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (E-01 à E-05, E-54, E-55, E-58, E-59 ; règles espèces, vie privée, frais, backend) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P1-S1, S3 à S8, S13 à S15, S17 à S20, S22 ; E-P2-S1 à S6, S8 à S13 ; E-P3-S4 à S7, S9, S12 ; E-P4-S1 à S6, S14, S18, S20, S21, S24) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Écrans concernés

App cliente : E-01 Awa te propose un dépôt · E-02 Où va l'argent ? · E-03 Donne les espèces à Awa · E-04 Résultat du dépôt en espèces · E-05 Tu as donné les espèces ?
App agente : E-54 Combien elle dépose ? · E-55 Vérifie le dépôt avec elle · E-58 Reçois et compte les espèces · E-59 Résultat (dépôt).

### Critères d'acceptation ajoutés

- [ ] **Ordre du dépôt** : montant → contrôle des fonds de l'agente → récapitulatif → confirmation de la cliente (« Je confirme », **sans PIN**) → remise et comptage → « Confirmer les espèces reçues » (lancement) → résultat. La confirmation seule, ou le code seul, ne déplace rien (E-P1-S1, S4 à S6, E-P3-S9).
- [ ] Fonds insuffisants : arrêt **avant** toute demande, « Ne prends pas les espèces. », **aucun montant des fonds** ; recontrôle au lancement : « Dépôt pas fait. » + « Rends les 5 000 F à Fatou. » des deux côtés (E-P4-S1, S18).
- [ ] E-01 montre l'agente (nom, code), « Tu donnes » + montant, « Ne donne pas encore les espèces. », le trajet, la demande ; aucun solde ; « Ce n’est pas le bon montant » = refus **neutre** (E-P1-S3, S4, E-P4-S3).
- [ ] Destination choisie **par la cliente dans son app** (Mon solde par défaut ou une épargne active, sans montant) ; deux mouvements liés ; l'agente ne voit ni l'épargne ni la mise de côté ; épargne fermée entre-temps : retour sur Mon solde avec message (E-P2-S1 à S13).
- [ ] Sans app : destination « Son compte KOTIZ » par défaut ; « Une de ses épargnes » après un accord de noms (code des noms, ce dépôt seulement, sans montant) ; « Code du dépôt » (E-P3-S4 à S7, S9).
- [ ] E-03 : « Donne les espèces à Awa. », étapes « Confirmé / En attente / Pas encore » (+ « Passe dans {épargne} ») ; avance seul ; confirmation plus valable : neutre, « Confirme à nouveau. », « Confirmer à nouveau » ; E-58 plus valable : sans « Confirmé par Fatou », « Redemande sa confirmation. », « Ne prends pas encore les espèces. Si tu les as, garde-les de côté. » (E-P1-S5, S7, E-P4-S5, S6).
- [ ] Montant compté différent : nouvelle demande, nouvelle confirmation, « Le montant a changé. » ; l'ancienne confirmation ne compte plus (E-P4-S4).
- [ ] E-58 : « Confirmé par Fatou », « Prends les espèces et compte-les. », pas de flèche retour ; « Confirmer les espèces reçues » lance une seule fois (E-P1-S17 à S19).
- [ ] E-04 : neuf variantes (fait sur le solde, fait dans une épargne, à reprendre, mise de côté en attente, on vérifie, échoué, annulé, refusé par toi) ; aucun « Réessayer le dépôt », jamais « Remboursé » ; E-59 : fait, en vérification (« Garde le numéro de demande. »), pas fait (E-P1-S7, S8, E-P2-S5, S6, S8, E-P4-S14, S18, S19, S24).
- [ ] Annulé : « Awa a annulé le dépôt. » + secondaire « J’ai donné les espèces » → E-05 → signalement (E-P4-S14).
- [ ] **Frais inconnus = rien ne peut être envoyé ni confirmé**, côté app et serveur (E-P1-S20).
- [ ] Hors connexion à chaque étape : rien n'est envoyé, espèces gardées de côté (E-P4-S20, S21).

### Écarts avec l'issue actuelle

- « Scan et confirmation client » : scan (D30), demande (D31), confirmation dans l'app **sans PIN** (l'argent entre) ou par **code du dépôt** sans smartphone (D32).
- « Débit du float et crédit du wallet atomiques » : vocabulaire à aligner (« fonds de l’agente », « solde disponible ») ; atomicité et moment du débit à confirmer (G01).
- Proposition : ajouter « Blocked by D30, D31 » ; garder #67 et #70 ; #65 (KYC) n'est utilisé que par le refus « hors règles » (aucun écran KYC dans ce parcours).
- Glossaire avant le code : **demande**, **remise**, fonds de l'agente.
- États « accès suspendu » de l'agente (E-53, E-58) : lot G, à venir.

### Paramètres à confirmer

- G01 : frais du dépôt en espèces (aucune valeur au design) ; minimum, maximum ; atomicité ; recontrôle ; durée de validité de la confirmation.
- G02 : codes ; temps réel de la demande. G03 : motif « J’ai remis les espèces », contact.
- Les données du prototype (noms, montants, références) sont fictives.
```

## Brouillon — commentaire pour #72 (D11 Réaliser un cash-out auprès d'une agente)

```markdown
## Design validé (lot E, 30 octobre 2026)

Le lot E a été validé par le PO et sa conjointe (test à deux téléphones), critiqué et corrigé. Cette issue reçoit le **retrait en espèces**, de la déclaration de l'agente à la confirmation de réception par la cliente. Le raccord du lot D (« Auprès d’une agente » → Mon QR) mène maintenant à la demande. L'identification est dans D30, la demande générique dans D31, les codes dans D32, le signalement « Espèces non reçues » dans #69.

- Prototype (parcours E-P5 à E-P7 et variantes) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v15 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (E-06 à E-10, E-61 à E-64, E-59 retrait) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P5-S1 à S22 ; E-P6-S1 à S5, S7, S8 ; E-P7-S1 à S14, S16 à S18) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Écrans concernés

App cliente : E-06 Vérifie ton retrait · E-07 Entre ton PIN · E-08 Résultat du retrait et remise · E-09 Tu as reçu tes espèces · E-10 Tu n'as pas reçu tes espèces ?
App agente : E-61 Comment elle retire ? · E-62 Combien elle retire en espèces ? · E-63 Vérifie le retrait avec elle · E-64 Retrait : donne les espèces · E-59 Résultat (retrait terminé).

### Critères d'acceptation ajoutés

- [ ] **Ordre du retrait** : montant → « J’ai {montant} en espèces sur moi. » (requise, décochée si le montant change) → récapitulatif → autorisation par le **PIN KOTIZ** de la cliente (ou code du retrait) → **résultat financier confirmé** → remise et comptage → « J’ai reçu mes espèces » (ou code de réception) (E-P5-S1, S3, S4).
- [ ] Aucun « Tout son solde », aucune suggestion, aucun solde chez l'agente (E-P5-S5).
- [ ] E-06 : agente, « Tu reçois en espèces », « Prends les espèces seulement quand c’est fait. », frais et montant pris **renvoyés par le serveur**, « L’argent sort : tu confirmes avec ton PIN KOTIZ. » ; pas de solde complet (E-P5-S8).
- [ ] Refus avant le PIN, raison **à la cliente seule** (solde ; niveau d'accès + « Vérifier mon identité » ; épargnes + « Remettre sur mon solde ») ; l'agente lit « Ce retrait n’est pas possible pour cette cliente. » + « Elle voit la raison sur son téléphone. » (ou SMS) (E-P7-S1 à S5).
- [ ] E-07 garde « Cache ton écran. Ne montre ton PIN à personne, même à l’agente. » dans tous les états de saisie ; bloqué : « Trop d’essais. », « Rien n’est sorti. Awa ne te donne rien. » ; aucun champ PIN dans l'app agente (E-P5-S9 à S11, E-P7-S10).
- [ ] E-08 « Fait » : « Awa te donne tes espèces. Compte-les. », Retrait · Fait, **Espèces reçues · En attente** (« Tu confirmes quand tu as compté. »), « J’ai reçu mes espèces » seulement en « Fait » ; jamais « À confirmer » (E-P5-S12, S13).
- [ ] E-64 : « Retrait fait. Donne {montant} F. » + montant 34 **seulement après le résultat confirmé** ; avec app aucun bouton principal ; sans app « Envoyer le code de réception » ; **aucun « Espèces remises »** (E-P5-S14, S19, E-P6-S3).
- [ ] Résultat inconnu : personne ne donne ni ne prend les espèces, pas de nouvelle demande ; échoué : « Rien n’a été pris sur ton solde. », « Ne donne rien. » (E-P7-S11, S12).
- [ ] « J’ai reçu mes espèces » idempotent → E-09 et « Retrait terminé. » ; échec d'envoi « Pas envoyé. » / « Réessaie. Tes espèces restent en attente. » (E-P5-S15 à S17).
- [ ] « Je n’ai pas reçu mes espèces » → E-10 → signalement « Espèces non reçues » → remise **Contestée**, visible chez l'agente (E-P7-S14, S15).
- [ ] Sans app : code du retrait puis **code de réception distinct**, qui ne débite rien ; ni la déclaration de l'agente ni le silence ne clôturent (E-P6-S1 à S5).
- [ ] Une opération faite affiche toujours son **montant réel** (note PO 4 : « à confirmer » = prototype seulement) (E-P5-S18).

### Écarts avec l'issue actuelle

- « Preuve de remise d’espèces » = **confirmation par la cliente** (« J’ai reçu mes espèces » ou code de réception), jamais une déclaration de l'agente.
- « Crédit float » : vocabulaire « fonds de l’agente » ; moment du débit du solde et du crédit des fonds : G01.
- Dépendances : proposition « Blocked by D30, D31, #71 (socle commun), #70, #67 » ; **#69** reste pour le volet contestation (E-P7-S15), qui peut suivre.
- Glossaire avant le code : **demande**, **remise** et **réception**.
- État « accès suspendu » de E-64 (finir la remise) : lot G, à venir.

### Paramètres à confirmer

- G01 : frais du retrait en espèces ; moment du débit ; échec confirmé = rien pris ? (sinon « On vérifie ton solde. »).
- G02 : PIN, capture d'écran, codes. G03 : motif « Espèces non reçues », réception recueillie par l'assistance.
```

## Brouillon — commentaire pour #68 (D07 Effectuer un retrait direct en sandbox)

```markdown
## Design validé (lot E, 30 octobre 2026) — retrait Mobile Money préparé par une agente

Le lot E ajoute à cette issue la **branche assistée** (PRD 30b, décision PO Q6 du lot D) : une agente prépare un retrait Mobile Money vers le **numéro vérifié** de la cliente ; la cliente l'autorise dans son app avec son PIN (D-04, D-05 du lot D) ou, sans app, par le code du retrait Mobile Money. Aucune espèce, aucune confirmation de remise.

- Prototype (parcours E-P8 ; D-04 et D-05 depuis E-11) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (E-11, E-65 à E-67, E-59 Mobile Money) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P8-S1 à S12) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Écrans concernés

App cliente : E-11 Vérifie ton retrait Mobile Money · D-04 et D-05 (lot D) ouverts depuis E-11.
App agente : E-61 · E-65 Sur quel Mobile Money ? · E-66 Combien elle reçoit ? · E-67 Vérifie le retrait Mobile Money · E-56 · E-57 · E-59 (Mobile Money).

### Critères d'acceptation ajoutés

- [ ] L'agente choisit un opérateur disponible pour « 07 •• •• •• 56 », saisit le montant reçu sans voir de solde (« Sur son Wave. Tu ne vois pas son solde. »), relit, envoie (E-P8-S2 à S5).
- [ ] E-11 : « Préparé avec Awa Traoré · agente », « Tu reçois sur ton {opérateur} », numéro vérifié en entier, « Le numéro est le tien. On ne peut pas le changer. », frais et montants du serveur, « Je ne veux pas ce retrait » (refus neutre) (E-P8-S6, S10).
- [ ] Blocages avant le PIN : frais inconnus, opérateur indisponible, trois refus de E-06 (E-P8-S7).
- [ ] D-04 et D-05 du lot D, sans compteur d'étape, « Préparé avec : Awa Traoré » (E-P8-S8).
- [ ] E-59 côté agente : « Retrait fait. », « Wave a confirmé. », « Aucune espèce à donner. » ; « On vérifie. » ; « Pas fait. » (E-P8-S1, S12).
- [ ] Aucun « J’ai reçu », aucun code de réception, aucun mouvement sur les fonds de l'agente (E-P8-S9).
- [ ] Sans app : « Code du retrait Mobile Money » (D32) (E-P8-S11).

### Écarts

- Même ordre de retrait que le lot D (numéro vérifié seul, frais confirmés, `IdempotencyKey`), avec l'agente qui a préparé la demande enregistrée (D31).
- Proposition : ajouter « Blocked by D30, D31 » pour la branche assistée ; la branche directe du lot D n'en dépend pas.

### Paramètres à confirmer

- G01 : comme le lot D. G02 : code du retrait Mobile Money.
```

## Brouillon — commentaire pour #73 (D12 Épargner dans un objectif signé-signé)

```markdown
## Design validé (lot E, 30 octobre 2026) — carnet et création assistée

Le lot E précise les deux sujets que le lot B avait renvoyés : les **« signatures numériques »** sont le **carnet** d'une épargne (versements confirmés avec leurs accords réels, relevé daté), porté par **D35** ; la **création d'une épargne par une agente** pour une cliente sans smartphone est portée par **D36**. Cette issue ne reçoit que le raccord du détail d'une épargne.

- Prototype (planche B · B07, 14e téléphone « Mon carnet › ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Écrans des autres lots, B · B07 ; E-17) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P11-S1) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] B · B07 affiche le bouton texte « Mon carnet › » au-dessus de « Derniers mouvements », qui ouvre le carnet de l'épargne (D35) (E-P11-S1).

### Écarts

- « Signatures numériques » : à retirer du corps de cette issue au profit de D35 (aucune signature dessinée ni certification juridique ; « signé-signé » en accroche du carnet seulement, PNV-2).
- La limite de 3 épargnes actives vaut aussi en création assistée (D36), contrôlée côté serveur.
- Titre proposé au lot B inchangé : « D12 — Créer et gérer ses épargnes par projet ».
```

## Brouillon — commentaire pour #70 (D09 Activer une agente et gérer ses avoirs)

```markdown
## Design validé (lot E, 30 octobre 2026) — ce que le cash attend des fonds de l'agente

Le lot E n'affiche **jamais** le montant des fonds de l'agente dans un parcours d'opération (la cliente regarde souvent l'écran de l'agente). Il attend de cette issue une réponse **oui / non** et un recontrôle au moment du lancement. Les écrans de connexion, d'accueil et « Mes fonds » de l'agente sont au lot G (D28, D29).

- Handoff (E-54, E-58, § Backend Agents) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P4-S1, S18 ; E-P8-S9) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] API de contrôle des fonds : « suffisants / insuffisants » pour un montant, sans renvoyer le montant des fonds dans le parcours de dépôt (E-P4-S1).
- [ ] Recontrôle au lancement du dépôt ; un échec donne un dépôt « pas fait » et la consigne de rendre les espèces (E-P4-S18).
- [ ] Un retrait Mobile Money préparé ne touche jamais les fonds de l'agente (E-P8-S9).
- [ ] Statut de l'agente (actif, suspendu, fermé) lisible par l'app agente avant toute opération (états suspendus : lot G).

### Écarts

- Vocabulaire : « fonds de l’agente » à l'écran (« float » jamais) ; terme à fixer avec `domain-modeling`.
- Moment du débit des fonds (dépôt) et de leur crédit (retrait), réservation éventuelle : G01.
```

## Brouillon — commentaire pour #69 (D08 Réconcilier et contester une transaction)

```markdown
## Design validé (lot E, 30 octobre 2026) — signalements des espèces

Le lot E ajoute deux cas où la cliente signale un problème lié à la **remise** des espèces, sans qu'aucun mouvement d'argent ne soit créé.

- Handoff (E-05, E-10, § Écrans des autres lots, C-14) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P4-S15 à S17 ; E-P7-S15 ; E-P13-S10) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] Dépôt annulé ou pas fait : « J’ai donné les espèces » / « Tu n’as pas récupéré tes espèces ? » → feuille « Tu as donné les espèces ? » → signalement avec le motif **« J’ai remis les espèces »** présélectionné, demande, agente et montant repris ; dossier existant rouvert, jamais doublé (E-P4-S15, S16).
- [ ] Retrait fait, espèces non remises : « Je n’ai pas reçu mes espèces » → feuille → motif **« Espèces non reçues »** ; l'envoi passe la remise à **« Contestée »**, visible par l'agente (E-P7-S15).
- [ ] Aucun signalement ne crée de mouvement ni ne change le statut financier (E-P4-S17).

### Écarts

- Les deux motifs sont à **proposer** à l'assistance (G03), en tête de la liste ; la liste reste lue en configuration.
- La remise (« Contestée ») est un statut distinct du statut financier et du statut du signalement : glossaire **remise** à fixer.
- Suivi de restitution (« Restitution à organiser > … > Espèces rendues ») : lot F.
```

## Brouillon — commentaire pour #99 (D26 Consulter mes opérations, le détail et le reçu)

```markdown
## Design validé (lot E, 30 octobre 2026) — opérations en espèces

Le lot E fixe le contenu des opérations en espèces dans Opérations, le détail et le reçu.

- Prototype (planche E-Raccords : C-11, C-12, C-13, C-14) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Écrans des autres lots, C-11 à C-14) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P13-S1 à S9, S11) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] Lignes : « Dépôt en espèces » · « Avec {agente} · Sur ton solde » ; « Dépôt vers {épargne} » · « En espèces avec {agente} » (une ligne) ; « Retrait en espèces » · « Avec {agente} » ; signe seulement si fait (E-P13-S1, S4).
- [ ] Retrait dont la remise attend : note **« Espèces en attente »** (jamais « à confirmer ») ; contestée : « Espèces non reçues : on vérifie. » (E-P13-S2).
- [ ] Demande annulée : montant sans signe, croix + « Annulé » ; détail « Awa a annulé le dépôt. », sans référence d'opération (E-P13-S3, S7).
- [ ] Détail : « Avec » (agente, code), « Demande n° », « Confirmé par toi · {heure} », « Espèces reçues par {agente} · {heure} », références ; retrait : Retrait · Fait / Espèces reçues · En attente, « Tu confirmes quand tu as compté. », principal **« J’ai reçu mes espèces »** tant que la remise attend (E-P13-S5, S6).
- [ ] Reçu d'une opération faite seulement, avec agente, « Espèces reçues : confirmé par toi / en attente », frais et montant pris **réels** (note PO 4) (E-P13-S8).
- [ ] Filtres Dépôts, Retraits, Épargnes et masquage incluent les opérations en espèces (E-P13-S9, S11).

### Écarts

- Le reçu du prototype garde « à confirmer » sur un retrait fait : **prototype seulement** ; en production, des frais inconnus bloquent l'autorisation.
```

## Brouillon — commentaire pour #94 (D21 Afficher l'accueil cliente avec masquage des montants)

```markdown
## Design validé (lot E, 30 octobre 2026)

Le lot E ajoute à l'accueil la **demande en attente** d'une agente (PNV-3, décision PO du 21 octobre 2026) et le message après un refus.

- Prototype (planche A · H01, 8e téléphone ; planche E-Raccords) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Écrans des autres lots, A · H01) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P1-S9 ; E-P4-S25 ; E-P9-S18) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] Tant qu'une demande d'agente attend (dépôt, retrait, Mobile Money, accompagnement, point), `InfoLine` « {agente} attend ta réponse › » qui ouvre la demande ; elle remplace « Ton identité est en vérification. » (une seule `InfoLine`) (E-P4-S25, E-P9-S18).
- [ ] Après un refus d'accompagnement ou de point : message « Tu as refusé. {agente} ne peut pas t’accompagner. » (ou celui du point).
- [ ] Carte solde « Dépôt en attente » pendant un dépôt en espèces confirmé non fait (E-P1-S9) ; « Retrait en attente » du lot D pendant un retrait en espèces non confirmé.

### Écarts

- PO-9 : la ligne est dans le canvas validé ; elle ne serait retirée que sur décision du PO.
```

## Brouillon — commentaire pour #95 (D22 Afficher Mon QR d'identification)

```markdown
## Design validé (lot E, 30 octobre 2026)

Quand une demande d'agente arrive pendant que Mon QR est affiché, l'écran de la demande s'ouvre seul (décision PO du 21 octobre 2026). Le rendu de Mon QR ne change pas.

- Handoff (§ Écrans des autres lots, A · Q01) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P1-S2) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] Une demande reçue pendant l'affichage de Mon QR ouvre E-01, E-06 ou E-11 sans geste de la cliente ; la luminosité revient au réglage de la cliente (E-P1-S2).

### Écarts

- Mécanisme du temps réel : G02 / technique (D31). Le délai de 3 s du prototype n'est pas une règle.
```

## Brouillon — commentaire pour #67 (D06 Sécuriser le cycle de vie des transactions)

```markdown
## Design validé (lot E, 30 octobre 2026)

Le lot E ajoute la **demande** (préparée par l'agente, confirmée par la cliente) et le **lancement** (par l'agente après le comptage) au cycle de vie.

- Handoff (§ Réseau, idempotence, concurrence ; § Backend) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P1-S6, S19, S23 ; E-P4-S7, S19 ; E-P5-S16 ; E-P7-S9, S11) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] Une clé d'idempotence **par demande** et **par lancement** ; double appui ou rejeu = un seul effet (E-P1-S19, E-P5-S16).
- [ ] Une confirmation seule ne crée aucune écriture ; une confirmation expirée ne permet aucun lancement (E-P1-S6, E-P4-S7).
- [ ] Montant ou destination modifiés = nouvelle demande ; l'ancienne ne peut plus être confirmée ni autorisée (E-P7-S9).
- [ ] Résultat inconnu après lancement ou autorisation : « en attente » interrogeable, ni annulation, ni nouvelle opération, aucun remboursement automatique tant qu'un crédit reste possible (E-P4-S19, E-P7-S11).
- [ ] Reprise de la demande en cours dans les deux apps, sans nouvelle demande (E-P1-S23).

### Écarts

- Atomicité entre le solde de la cliente et les fonds de l'agente, moment des débits : G01.
- Glossaire : **demande** (statuts) à fixer avant le code.
```

## Brouillon — commentaire pour #75 (D14 Envoyer les notifications transactionnelles)

```markdown
## Design validé (lot E, 30 octobre 2026)

Le lot E ajoute les demandes d'agente en direct vers l'app cliente et treize SMS (brouillons de la spec, § SMS du lot E).

- Spec (§ SMS du lot E) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/ux-spec-lot-e.md
- Handoff (§ Backend, Notifications) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md
- Gherkin (E-P1-S22 ; E-P3-S12 ; E-P11-S9 ; E-P12-S2) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] Demande en direct vers l'app cliente (dépôt, retrait, Mobile Money, accompagnement, point).
- [ ] SMS vers le **numéro vérifié** seulement : codes des 8 finalités, dépôt fait, mise de côté échouée, demande annulée, retrait refusé (raison), résumé du point (E-P3-S12, E-P11-S9, E-P12-S2).
- [ ] Le statut d'envoi d'un SMS est distinct du statut financier ; « SMS pas parti » ne justifie jamais de refaire une opération (E-P1-S22).
- [ ] Aucun SMS n'indique une longueur, une durée de validité ni un nombre d'essais.

### Écarts

- Textes finaux : G02 (codes) et G04 (résumé) ; contact d'assistance réel : G03. Les SMS sont au tutoiement (la phrase du PRD 20b est adaptée).
```

## Brouillon — commentaire pour #59 (D02 Fournir le socle UI accessible)

```markdown
## Design validé (lot E, 30 octobre 2026)

Le lot E réutilise le socle des lots A à D et ajoute des composants et variantes, construits dans le canvas et proposés au Design System (DS v15 non modifié).

- Prototype : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v15 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (§ Composants, § Tokens) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/handoff-lot-e.md

### Critères d'acceptation ajoutés

- [ ] `AgentIdentity` (bloc, compact) : nom, « Agente KOTIZ · {code} », sans action.
- [ ] `OneTimeCodeField` : libellé = finalité, chiffres visibles, aide « Ce n’est jamais son PIN. », états incorrect, expiré, bloqué, renvoyé ; longueur en configuration ; jamais l'aspect de `PinSlots` (E-P3-S11).
- [ ] `QrScanner` : viseur, lecture, caméra refusée, QR invalide, compte non servi, hors connexion.
- [ ] `Statement` (famille `Receipt`) : relevé daté toujours en clair (E-P11-S7).
- [ ] `ResultScreen` `neutral` : pastille grise, trait, pill neutre, annonce `polite` (E-P4-S3).
- [ ] `PinScreen` : avertissement affiché en saisie, erreur, envoi et hors connexion, message d'état sous les cases (E-P5-S10).
- [ ] `StatusRows` (variante de `DetailList`) : deux statuts liés, sous-texte ; « Espèces reçues » jamais « À confirmer ».
- [ ] `OptionRow` avec action en fin de ligne ; `CheckOption` avec illustration ; `AmountField` vide gardé à 48 de large.

### Écarts

- Hors DS v15 : tous ces éléments. Aucun token nouveau. D-04 (lot D) passera à l'avertissement permanent quand `PinScreen` aura évolué.
```

## Brouillon — commentaire pour #98 (D25 Mettre de l'argent du solde vers une épargne)

```markdown
## Design validé (lot E, 30 octobre 2026) — reprise après un dépôt en espèces

Un dépôt en espèces vers une épargne dont la mise de côté échoue de façon confirmée ouvre la **même reprise** que le lot C, depuis le résultat E-04 « Réessayer de mettre de côté ».

- Gherkin (E-P2-S6, S7) : https://github.com/kotiz-ci/platform/blob/main/docs/design/refonte-parcours/gherkin-lot-e.md

### Critères d'acceptation ajoutés

- [ ] « Réessayer de mettre de côté » depuis le résultat d'un dépôt en espèces ouvre le récapitulatif de reprise ; aucun nouveau dépôt, aucune espèce demandée (E-P2-S7).

### Écarts

- Aucun changement des écrans du lot C. La reprise assistée pour une cliente sans smartphone (G05-2) n'a pas d'écran : hors lot.
```

---

## Reports et dépendances vers d'autres lots

| Report                                                                                               | Lot / cible                                                      | Ce qu'il faut faire                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **États « accès suspendu »** de E-53, E-58, E-64                                                     | **Lot G** (D29), pas encore testé                                | Spécifier dans le handoff du lot G après son test ; scénarios dans le Gherkin du lot G. Rien n'est codé ici.                                                                                                                                                           |
| Connexion de l'agente, accueil, « Mes fonds »                                                        | Lot G (D28, D29), ADR-0021                                       | Créer D28 et D29 avant D30 ; E-51 `←` → G-20 ; E-54 « Mes fonds › » → G-21 ; reprise d'une opération en cours après le PIN agente.                                                                                                                                     |
| Composants proposés au DS                                                                            | Design System                                                    | `AgentIdentity`, `OneTimeCodeField`, `QrScanner`, `Statement`, `StatusRows`, `ResultScreen` neutre, `PinScreen` avertissement, `OptionRow` avec action, `CheckOption` avec illustration, `FlowPath` nœud modifiable, `AmountField` cible vide, icônes SMS et Partager. |
| D-04 avec l'avertissement permanent                                                                  | Lot D, après l'évolution de `PinScreen`                          | Écart assumé de la critique n° 6.                                                                                                                                                                                                                                      |
| Apostrophes et élision des lots A à D et G                                                           | Catalogue de textes                                              | Écart assumé de la critique n° 11 : appliquer ’ et l'élision au catalogue entier lors de sa construction.                                                                                                                                                              |
| Profil « Mon accompagnement », « Contacter l’aide », PIN oublié, notifications, suivi de restitution | Lot F                                                            | « Bientôt ici » en attendant.                                                                                                                                                                                                                                          |
| Retour au solde et reprise assistés sans smartphone (G05-2)                                          | Incrément du lot E (E-20 à E-50)                                 | Règle validée, écrans à spécifier.                                                                                                                                                                                                                                     |
| Vocabulaire                                                                                          | [Glossaire DDD](../../architecture/ddd-context-map-glossaire.md) | `domain-modeling` : demande, accompagnement, permission de point, code ponctuel, remise (voir § Gates et glossaire).                                                                                                                                                   |

## Ordre de publication proposé

1. Commit et fusion de la branche `docs/refonte-lot-e` dans `main` (liens).
2. Créer D28 et D29 (lot G) si le PO publie le lot G en même temps ; sinon, écrire « D28 (lot G, à créer) » dans les « Blocked by ».
3. Créer D30 à D36 (brouillons ci-dessus), label `ready-for-agent`, dans l'ordre D30, D31, D32, D35, D33, D34, D36, puis remplacer « D3x » par les numéros obtenus.
4. Publier les commentaires « Design validé (lot E) » sur #71, #72, #68, #73, #70, #69, #99, #94, #95, #67, #75, #59, #98.
5. Sur feu vert du PO : « Blocked by » proposés (#71 : + D30, D31 ; #72 : + D30, D31, #67 ; #68 : + D30, D31 pour la branche assistée).
