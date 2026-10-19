# Issues — Refonte des parcours, lot B : épargne et retour au solde

Date : 19 octobre 2026. Statut : **brouillon, rien n'est publié**. La publication (commentaires, nouvelle issue, changements de « Blocked by ») est faite par la session principale après relecture et feu vert explicite du PO (brief : « aucune modification d'issue sans feu vert explicite du PO »).

Sources : [handoff-lot-b.md](handoff-lot-b.md), [gherkin-lot-b.md](gherkin-lot-b.md), [ux-spec-lot-b.md](ux-spec-lot-b.md), [screens-lot-b.md](screens-lot-b.md), issues lues le 19 octobre 2026 avec `gh issue view` (#58 à #96).

**Liens vers la branche** : les liens GitHub ci-dessous pointent vers `docs/restructure-documentation`. Ils ne fonctionnent qu'une fois `handoff-lot-b.md` et `gherkin-lot-b.md` commités et la branche poussée (non fait à ce jour).

## Constat sur les issues actuelles

- **[#73](https://github.com/kotiz-ci/platform/issues/73) D12 « Épargner dans un objectif signé-signé »** est la seule issue du lot B. Son corps tient en une ligne (« Objectif nommé, cotisations flexibles, signatures numériques et retrait ») et trois critères génériques.
  - « **retrait** » doit devenir « **retour au solde** » : le mouvement d'une épargne vers le solde disponible n'est jamais un retrait (le retrait externe est au lot D, [#68](https://github.com/kotiz-ci/platform/issues/68) et [#72](https://github.com/kotiz-ci/platform/issues/72)).
  - « **signatures numériques** » relève du carnet signé-signé (lot E), pas du lot B.
  - « **cotisations flexibles** » = l'alimentation d'une épargne (« Mettre de l'argent »), qui relève du lot C (non spécifié) ; le lot B n'en dessine que le bouton d'entrée.
  - Le titre « signé-signé » renvoie au carnet ; le lot B parle d'« épargne » (projet). Proposition de titre : « D12 — Créer et gérer ses épargnes par projet ».
  - **Dépendance** : #73 est bloquée par [#69](https://github.com/kotiz-ci/platform/issues/69) D08 (réconciliation et litiges). Créer, modifier, fermer une épargne et respecter la limite de 3 ne dépendent pas de la réconciliation. À revoir : bloquée par #59 (socle UI) et #64 (compte).
- **[#94](https://github.com/kotiz-ci/platform/issues/94) D21 accueil** affiche déjà les épargnes (« X F sur Y F », 3 au maximum) et porte le masquage persistant « aussi pour Épargnes ». Le lot B y ajoute la variante « Objectif atteint », les entrées vers B01 / B02 / B07 / B15 et l'affichage d'un retour au solde dans les Dernières opérations.
- **[#67](https://github.com/kotiz-ci/platform/issues/67) D06 cycle de vie des transactions** porte l'idempotence, l'attente et l'échec dont le retour au solde a besoin.
- **[#59](https://github.com/kotiz-ci/platform/issues/59) D02 socle UI** a reçu les composants du lot A ; le lot B ajoute ses composants et variantes.

## Correspondance parcours / écrans → issues

| Parcours | Écrans | Issue | Scénarios | Remarque |
|---|---|---|---|---|
| Socle lot B | Composants du DS v10 : `GoalRow` (`state` reached / closed), `RootHeader` + `MaskToggle`, `GoalTypeOption` + `GoalTypeGrid`, `AmountField`, `DateChoice`, `TextField` `multiline`, `SummaryPreview`, `SummaryFlow`, `GoalProgress`, `ConfirmDialog`, `StepTracker` (`sent`), 3 illustrations ; hors DS : squelette de chargement, `TransactionRow` mouvement interne | [#59](https://github.com/kotiz-ci/platform/issues/59) D02 Socle UI | critères « Socle lot B » du handoff, B-P1-S4, B-P2-S7, B-P3-S12, B-P8-S4 | Tout est publié dans le DS v10 sauf le squelette et la variante interne de `TransactionRow` |
| P1 Créer une épargne | B02, B03, B04, B05, B06, B17 (+ B15) | [#73](https://github.com/kotiz-ci/platform/issues/73) D12 | B-P1-S1 à S29 | Cœur de l'issue |
| P2 Voir mes épargnes | B01 | [#73](https://github.com/kotiz-ci/platform/issues/73) | B-P2-S1 à S10 | Racine Épargnes, barre basse |
| P3 Suivre une épargne | B01, B07 | [#73](https://github.com/kotiz-ci/platform/issues/73) | B-P3-S1 à S12 | « Mettre de l'argent » et « Tout voir » mènent au lot C |
| P4 Modifier | B08, B16 | [#73](https://github.com/kotiz-ci/platform/issues/73) | B-P4-S1 à S14 | — |
| P5 Remettre sur mon solde | B09, B10, B11, B12 | **D24, issue à créer** (décision PO du 19 octobre 2026, brouillon ci-dessous) | B-P5-S1 à S30 (S23 retiré) | Seul parcours avec PIN, écritures ledger et résultats en attente ; bloquée par #73 et #67 |
| P5 — cycle de vie | B10 (refus par règle avant autorisation), B12 (attente, incertain, échec technique), idempotence | [#67](https://github.com/kotiz-ci/platform/issues/67) D06 | B-P5-S13, S14, S15, S26, S28 à S30 | Critères ajoutés à #67, vérifiés sur le retour |
| P5 — accueil après un retour | H01 | [#94](https://github.com/kotiz-ci/platform/issues/94) D21 | B-P5-S20, B-P5-S21 | Solde, « Dernier dépôt », Dernières opérations |
| P6 Fermer | B13, B14 (+ lien de B12) | [#73](https://github.com/kotiz-ci/platform/issues/73) | B-P6-S1 à S13 | B-P6-S4 et S7 traversent P5 (D24) : la fermeture reste dans #73 |
| P7 Limite de 3 | B01 (état), B15 | [#73](https://github.com/kotiz-ci/platform/issues/73) | B-P7-S1 à S7 | Même limite en création assistée (lot E) |
| P8 Masquage | B01, B07 (états) | [#73](https://github.com/kotiz-ci/platform/issues/73) ; réglage dans [#94](https://github.com/kotiz-ci/platform/issues/94) | B-P8-S1 à S8 | #94 porte le réglage persistant ; #73 l'applique aux écrans Épargnes |
| Raccords accueil | H01 (« Objectif atteint », entrées Créer / Épargnes / une épargne), E08 → B02 | [#94](https://github.com/kotiz-ci/platform/issues/94), [#64](https://github.com/kotiz-ci/platform/issues/64) | B-P1-S28, B-P2-S5 | E08 « Créer mon épargne » est déjà dans #64 |

**Issues lues et non concernées** : [#66](https://github.com/kotiz-ci/platform/issues/66) D05 dépôt direct (lot C ; prérequis indirect pour avoir de l'argent à mettre dans une épargne) ; [#68](https://github.com/kotiz-ci/platform/issues/68) D07 et [#72](https://github.com/kotiz-ci/platform/issues/72) D11 retraits (lot D, jamais enchaînés au retour au solde) ; [#69](https://github.com/kotiz-ci/platform/issues/69) D08 réconciliation (aucun écran du lot B) ; [#75](https://github.com/kotiz-ci/platform/issues/75) D14 notifications (aucun SMS dans le lot B ; l'autorisation SMS du retour assisté est au lot E) ; [#76](https://github.com/kotiz-ci/platform/issues/76) et [#77](https://github.com/kotiz-ci/platform/issues/77) Santé (assurance, hors MVP : le type d'épargne « Santé » n'a aucun lien avec elles) ; [#78](https://github.com/kotiz-ci/platform/issues/78) étoiles (le `GoalLock` et ses malus de score ne sont pas repris) ; [#93](https://github.com/kotiz-ci/platform/issues/93), [#95](https://github.com/kotiz-ci/platform/issues/95), [#96](https://github.com/kotiz-ci/platform/issues/96) (lot A ; #96 reste un prérequis via #59, sans token nouveau au lot B).

## Capacités du lot B sans issue

| Capacité | Écrans | Scénarios | Contexte DDD | Piste |
|---|---|---|---|---|
| **Remettre l'argent d'une épargne sur le solde disponible** (montant, récapitulatif Depuis → Vers, PIN, résultat fait / en attente / incertain / échoué, sans frais) | B09, B10, B11, B12 | B-P5-S1 à S30 (S23 retiré) | Savings (+ IAM pour le PIN) | **Issue D24 à créer** (décision PO du 19 octobre 2026), bloquée par #73 et #67. Brouillon final ci-dessous. |
| Alimenter une épargne (« Mettre de l'argent » : Mobile Money ou solde disponible) | B07 → lot C | — | Savings + Payments | **Lot C, non spécifié** : pas d'issue à proposer depuis le lot B. Sans elle, P3, P5 et P6 avec des fonds ne se démontrent de bout en bout qu'avec des données de test. |
| Nommer le retour au solde, l'affectation et la fermeture dans le glossaire ; retirer ou marquer hors MVP le `GoalLock` | — | — | Savings | **`domain-modeling`**, avant le code de #73 et D24. Pas un ticket. |

### Issue à créer — D24 (décision PO du 19 octobre 2026)

Titre : **D24 — Remettre l'argent d'une épargne sur le solde**
Label : `ready-for-agent` · Blocked by : #73, #67 · Après création : ajouter « Blocks : D24 » dans #73 et #67 si l'usage du dépôt le prévoit.

```markdown
## What to build

Retour au solde (parcours P5 du lot B) : la cliente remet tout ou partie d'une épargne sur son solde disponible. Montant (« Tout remettre » possible), récapitulatif Depuis → Vers, autorisation par le PIN KOTIZ, résultat fait / en attente / incertain / échoué. C'est un mouvement interne **sans frais** : il ne s'appelle jamais « retrait » et n'enchaîne aucun retrait externe. L'épargne reste ouverte, même à zéro ; après un retour total fait, un lien propose de la fermer (fermeture portée par #73).

## Design validé (lot B, 19 octobre 2026)

- Prototype (parcours B-P5, B-P5′, B-P5″, B-P6) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v10 (composants du lot B) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (B09 à B12, `SummaryFlow`, règles réseau et backend) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-b.md
- Gherkin B-P5-S1 à B-P5-S30 : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-b.md

Écrans : B09 Combien remettre ? · B10 Vérifie ton retour (dont refus par règle, avant le PIN) · B11 Entre ton PIN (dont PIN bloqué) · B12 Résultat (fait, fait total, en attente, incertain, échoué).

## Acceptance criteria

- [ ] Depuis le détail d'une épargne, « Remettre sur mon solde » ouvre la saisie du montant ; il est désactivé, avec sa raison, si l'épargne est à 0 ou si un retour est déjà en attente (B-P3-S5, B-P5-S17).
- [ ] Le montant doit être > 0 et ≤ montant épargné confirmé ; « Tout remettre » remplit le disponible (B-P5-S4, B-P5-S5).
- [ ] Le récapitulatif montre le montant, « Depuis {épargne} → Vers Mon solde », « Il restera » et « Ton solde après » exact ; **aucune ligne de frais** (B-P5-S6).
- [ ] Le retour n'est envoyé qu'après un PIN valide ; un PIN faux n'envoie rien (B-P5-S10) ; le PIN n'est jamais affiché, stocké ni journalisé (B-P5-S12).
- [ ] « Fait » n'apparaît qu'après confirmation ; en attente et incertain, aucun « Fait » ni vert de succès, « Ne refais pas l'opération. », pas de « Réessayer » en incertain (B-P5-S13, B-P5-S14).
- [ ] Échoué : « Ton argent n'a pas bougé. » et « Réessayer » relit le récapitulatif et redemande le PIN (B-P5-S15).
- [ ] PIN bloqué : « Ton PIN est bloqué », « Trop d'essais. », ni cases ni pavé, « Voir mon épargne » et « PIN oublié ? », aucun nombre d'essais ni durée affiché, rien n'est envoyé (B-P5-S11).
- [ ] Refus par une règle connu d'avance (niveau d'accès, KYC) : affiché sur le récapitulatif **avant le PIN**, avec la raison communicable, « Ton argent n'a pas bougé. » et « Contacter l'aide » ; « Continuer » désactivé ; aucune limite chiffrée ; aucun PIN demandé (B-P5-S29).
- [ ] Échec technique au moment du mouvement : affiché **après le PIN** sur le résultat « Échoué » (« Ton retour de {montant} n'a pas marché. », « Ton argent n'a pas bougé. »), jamais sur le récapitulatif ; une règle devenue bloquante entre le récapitulatif et le PIN donne aussi « Échoué », sans écriture (B-P5-S28, B-P5-S30).
- [ ] Disponible changé entre-temps → retour à la saisie avec « Le montant disponible a changé. » (B-P5-S16).
- [ ] Le retour Android sur le résultat mène au détail de l'épargne, jamais au PIN (B-P5-S18).
- [ ] Écritures ledger équilibrées du montant exact, sans écriture de frais ; un seul retour en attente par épargne ; demande idempotente (B-P5-S25 à B-P5-S27).
- [ ] L'épargne reste active après un retour total ; aucune fermeture automatique (B-P6-S6) ; le lien « Fermer cette épargne ? » n'apparaît qu'après un retour total fait, sans alimentation en attente (B-P6-S7).
- [ ] Sur l'accueil, le solde n'augmente que pour un retour fait ; la ligne « Dernier dépôt » ne montre jamais un retour ; le retour apparaît dans les Dernières opérations (B-P5-S20, B-P5-S21).
- [ ] Montants masqués : saisie, récapitulatif (sauf « Ton solde après »), rappel du PIN et résultat restent visibles (B-P5-S24, B-P8-S6).

## À confirmer

- G01 : montant minimum de retour (aucun côté produit tant que le partenaire n'en impose pas) ; raisons communicables d'un refus par règle (niveau d'accès, KYC ; affichées sur le récapitulatif, sans limite chiffrée) ; le retour consomme-t-il la capacité du niveau d'accès limité (recommandation : non) ; montant épargné avec un mouvement en attente (confirmé seulement).
- G02 : longueur du PIN (4 au prototype), nombre d'essais et durée du blocage (l'écran est dessiné, sans chiffre).
- À dessiner : B10 refus par règle (ajout au canvas en cours ; le titre exact du message suivra le canvas, B-P5-S29) ; B11 hors connexion avant l'envoi du PIN (rien n'est envoyé, B-P5-S22).
- G03 : contact derrière « Contacter l'aide » (refus par règle, incertain).
- Technique : délai au-delà duquel le résultat devient incertain ; capture d'écran bloquée sur le PIN.
- Hors périmètre : variante assistée sans smartphone (autorisation SMS propre au mouvement, lot E).

## Blocked by

- #73 (épargnes)
- #67 (cycle de vie des transactions : idempotence, attente, échec)
```

## Paramètres « à confirmer » du lot B

| Paramètre | Gate | Écrans |
|---|---|---|
| Montant épargné avec un mouvement en attente (confirmé seulement, recommandé) | G01 | B01, B07, B09 |
| Montant minimum de retour ; cible minimum et maximum | G01 | B03, B08, B09 |
| Raisons communicables d'un refus par règle (affiché avant le PIN) ; effet du niveau d'accès limité sur le retour | G01 | B10 |
| Longueur du PIN, essais restants, blocage | G02 | B11 |
| Contact d'aide (« Contacter l'aide ») | G03 | B10, B12 |
| Délais d'expiration (création, retour) ; capture d'écran sur le PIN | technique | B06, B11, B12 |
| Longueur maximale du nom et de la note ; emoji ; conflit de modification sur deux téléphones ; création idempotente | technique | B05, B06, B08 |
| Ordre des épargnes dans les listes ; seuil des fermées affichées (5 proposé) | implémentation | B01 |
| Raccourcis de date en fin de mois | implémentation | B04, B08 |
| Aide « par semaine » sur B08 : objectif entier (prototype) ou reste à épargner | PO | B08 |
| Nom accessible de l'œil : « montants » (B01, B07) ou « solde » (H01) | PO | B01, B07, H01 |

**Valeurs de démonstration à ne jamais reprendre** : PIN 2468, date du jour figée au 19 octobre 2026, solde 12 400 FCFA, références « (fictive) », données École Awa / Boutique / Tabaski / Moto.

---

## Brouillon — commentaire pour #73 (D12 Épargner dans un objectif signé-signé)

```markdown
## Design validé (lot B, 19 octobre 2026)

Le lot B (épargne et retour au solde de l'app cliente) a été validé le 19 octobre 2026 par le PO et sa conjointe, après test sur le prototype, avec la création en 5 étapes et le retour au solde sans frais. Cette issue reçoit la vie d'une épargne : création, liste, détail, modification, fermeture et limite de 3. **Le retour d'une épargne vers le solde est porté par D24** (« Remettre l'argent d'une épargne sur le solde », issue séparée, décision PO du 19 octobre 2026).

- Prototype (page « Lot B — Épargne et retour au solde », parcours B-P1 à B-P8) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v10 (composants du lot B) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-b.md
- Gherkin (B-P1 à B-P4, B-P6 à B-P8) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-b.md

### Écrans concernés
B01 Mes épargnes (racine) · B02 Quel projet ? · B03 Combien ? · B04 Pour quand ? · B05 Comment tu l'appelles ? · B06 Vérifie ton épargne · B17 Ton épargne est créée · B07 Détail · B08 Modifier · B16 Quitter sans enregistrer ? · B13 Il reste de l'argent · B14 Fermer l'épargne ? · B15 Limite atteinte.

### Critères d'acceptation ajoutés
- [ ] Créer une épargne en 5 étapes (Projet, Combien, Pour quand, Nom, Vérifier), « Étape n sur 5 » ; type et cible requis ; date, nom et note facultatifs mais toujours présentés ; nom prérempli avec le type (« Mon projet » pour Autre projet) (B-P1-S1, S2, S12).
- [ ] Neuf types : École, Commerce, Santé, Maison, Voyage, Véhicule, Fête, Imprévus, Autre projet. « Santé » n'évoque jamais une assurance (cœur, sans croix ni bouclier) (B-P1-S3, S4).
- [ ] « Pour quand ? » : 3 mois, 6 mois, 1 an, une date à venir, ou « Pas de date pour l'instant » ; « Ça fait environ X F par semaine. » = ⌈objectif / max(1, semaines entières restantes)⌉ ; date passée ou du jour refusée (B-P1-S7 à S11).
- [ ] Le récapitulatif est un aperçu de l'épargne (nom, objectif, « 0 F pour l'instant », date + « ≈ X F / semaine » ou « Pas de date · Ajouter ») ; chaque « Modifier » ramène au récapitulatif (B-P1-S14 à S17).
- [ ] Créer, modifier et fermer ne demandent pas de PIN et ne déplacent aucun argent (B-P1-S20, B-P1-S29, B-P4-S14).
- [ ] Création : aucun succès avant confirmation ; échec « Échoué : ton épargne n'est pas créée. » ; résultat inconnu « On vérifie si ton épargne est créée. Ne la recrée pas. » + « Vérifier à nouveau » sans doublon (B-P1-S21 à S25).
- [ ] Liste : « X F sur Y F » sans pourcentage, compteur « n sur 3 épargnes actives », section « Fermées » sans montant ; au-delà de 5 fermées, les 5 plus récentes puis « Voir les {n} épargnes fermées › » (B-P2-S1 à S5, B-P2-S10).
- [ ] Chargement de la liste et du détail : squelette annoncé, jamais de montant ni de « 0 », ni compteur, ni « Créer », ni « Modifier » avant la réponse (B-P2-S7, B-P3-S12).
- [ ] Détail : montant, « sur cible », % entier inférieur, « Encore X F pour ton objectif. », « encore n semaines » ; objectif atteint = barre pleine, montant réel, « Objectif atteint » sans coche, aucun % > 100, épargne toujours ouverte (B-P3-S1 à S4, S10).
- [ ] Mouvement en attente : montant et barre sur le confirmé ; retour en attente → « Remettre » et « Fermer » désactivés avec une seule phrase ; alimentation en attente → seul « Fermer » désactivé (B-P3-S6, S7).
- [ ] Modifier : type fixe, mêmes champs que la création, « Enregistrer » actif seulement après un changement, « Ton objectif sera atteint avec ce montant. », « Quitter sans enregistrer ? » (B-P4-S1 à S10) ; échec « Échoué : rien n'a changé. » avec saisie gardée ; épargne fermée entre-temps « Cette épargne est fermée. », rien n'est enregistré (B-P4-S12, B-P4-S13).
- [ ] Fermer : seulement à 0 et sans mouvement en attente, avec confirmation ; avec des fonds, « Il reste X F » propose « Remettre sur mon solde » (parcours de D24) ; jamais de fermeture automatique ; l'historique est conservé ; pas de réouverture ; échec « Échoué : {nom} n'est pas fermée. », l'épargne reste active (B-P6-S1 à S13).
- [ ] 3 épargnes actives au maximum, fermées non comptées, contrôlé côté serveur même en simultané ; à 3, pas de bouton Créer et aucune action qui ferme à la place de la cliente (B-P7-S1 à S7).
- [ ] Montants masqués sur Mes épargnes et le détail avec le réglage persistant de l'accueil ; TalkBack lit « Montant masqué » ; une épargne vide masquée ne se trahit pas (B-P8-S1 à S5).

### Écarts avec l'issue actuelle
- « Retrait » devient **retour au solde** (mouvement interne, sans frais) et sort de cette issue : il est porté par **D24** (issue séparée, bloquée par #73 et #67, décision PO du 19 octobre 2026). Ici, seuls restent l'entrée « Remettre sur mon solde » du détail et son état désactivé (à zéro, retour en attente), et la fermeture proposée après un retour total.
- « Signatures numériques » relève du carnet signé-signé (lot E) : à retirer de cette issue.
- « Cotisations flexibles » = alimenter une épargne (« Mettre de l'argent ») : lot C, non spécifié ; seul le bouton d'entrée est dessiné.
- Titre proposé : « D12 — Créer et gérer ses épargnes par projet » (le lot B ne parle pas de signé-signé).
- **Dépendance** : bloquée par #69 (réconciliation), dont aucune capacité du lot B n'a besoin. Proposition : bloquée par #59 (socle UI) et #64 (compte).
- Le glossaire DDD décrit un `GoalLock` (verrouillage jusqu'à la date, malus de score) qui contredit l'épargne flexible validée : à ne pas implémenter ; le glossaire ne nomme pas encore la fermeture ni les mouvements internes (à traiter avec `domain-modeling`).
- Les états reportés (chargements, plus de 5 fermées, échecs de Modifier et de la fermeture) sont dessinés dans la version 9 du canvas et couverts par les critères ci-dessus.

### Paramètres à confirmer
- G01 : montant épargné avec un mouvement en attente ; cible minimum et maximum (aucune valeur affichée d'ici là).
- Technique : délai d'expiration de la création ; longueur maximale du nom et de la note ; emoji ; modification depuis deux téléphones.
- PO : aide « par semaine » sur Modifier calculée sur l'objectif entier (prototype) ou sur le reste.
- Les données du prototype (École Awa, Boutique, Tabaski, Moto, date du jour figée) sont fictives.
```

## Brouillon — commentaire pour #94 (D21 Afficher l'accueil cliente avec masquage des montants)

```markdown
## Design validé (lot B, 19 octobre 2026)

Le lot B (épargne et retour au solde) a été validé le 19 octobre 2026. Il précise ce que l'accueil affiche des épargnes et d'un retour au solde.

- Prototype (page « Lot B », planche Raccords ; parcours B-P2, B-P5, B-P7′, B-P8) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Raccords H01, `GoalRow`) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-b.md
- Gherkin (B-P2-S5, B-P5-S20, B-P5-S21, B-P8-S1 à S3) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-b.md

### Critères d'acceptation ajoutés
- [ ] Une épargne dont l'épargné atteint ou dépasse la cible affiche le montant réel et « Objectif atteint », sans coche ni vert, barre pleine, comme sur Mes épargnes (B-P2-S5).
- [ ] Après un retour au solde **fait**, le solde disponible augmente du montant exact ; **en attente**, il ne change pas (B-P5-S20, B-P5-S21).
- [ ] La ligne « Dernier dépôt » de la carte solde ne montre que des dépôts ; un retour au solde apparaît en tête des Dernières opérations (« Depuis {épargne} », `+`, statut en mots) (B-P5-S20).
- [ ] « Créer une épargne » (accueil vide) ouvre la création, ou la feuille « Tu as déjà 3 épargnes actives » à 3 actives ; « Tout voir » et le raccourci Épargnes ouvrent Mes épargnes ; une épargne ouvre son détail.
- [ ] Le réglage de masquage est le même sur l'accueil, Mes épargnes et le détail d'une épargne : le changer à un endroit le change partout, et il persiste (B-P8-S1 à S3).

### Écarts
- L'accueil du lot A affichait une épargne atteinte avec le `GoalRow` standard : le lot B ajoute la variante « atteinte » (aussi demandée par la critique du lot B).
- Nom accessible de l'œil : « Masquer le solde » sur la carte (lot A), « Masquer les montants » sur Mes épargnes et le détail (lot B), pour le même réglage : à garder ou à unifier (PO).

### Paramètres à confirmer
- G01 : solde disponible et montant épargné avec un mouvement en attente.
```

## Brouillon — commentaire pour #67 (D06 Sécuriser le cycle de vie des transactions)

```markdown
## Design validé (lot B, 19 octobre 2026)

Le lot B a été validé le 19 octobre 2026. Le **retour au solde** (mouvement interne d'une épargne vers le solde disponible, sans frais, autorisé par PIN ; issue D24) est la première opération du design qui montre les états refus par règle, attente, incertain et échec. Ses écrans précisent ce que cette issue doit garantir.

- Prototype (parcours B-P5, B-P5′ en attente, B-P5″ échoué) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Réseau, idempotence, concurrence ; B12) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-b.md
- Gherkin (B-P1-S23, B-P5-S13 à S17, B-P5-S26, B-P5-S28 à S30) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-b.md

### Critères d'acceptation ajoutés
- [ ] Une demande avec la même clé d'idempotence ne produit jamais deux effets (création d'épargne, retour au solde) (B-P1-S23, B-P5-S26).
- [ ] Un délai dépassé ou une connexion perdue après l'envoi donne un résultat « en attente » interrogeable, jamais un succès ni un échec supposé ; aucune nouvelle tentative n'est proposée tant que le résultat est inconnu (B-P5-S14).
- [ ] Une opération en attente n'est jamais affichée « Fait » ; tant qu'un retour est en attente sur une épargne, un second retour et la fermeture sont refusés (B-P5-S13, B-P5-S17).
- [ ] Après un échec confirmé, « Réessayer » crée une nouvelle demande avec une nouvelle clé et redemande l'autorisation (B-P5-S15).
- [ ] Un refus par règle connu d'avance est rendu **avant** l'autorisation, avec une raison communicable et sans valeur chiffrée, et aucune demande n'est créée (B-P5-S29).
- [ ] Les règles sont revérifiées au moment du mouvement : une règle devenue bloquante, ou un échec technique, donne un résultat « échoué » après l'autorisation, sans aucune écriture (B-P5-S28, B-P5-S30).

### Écarts
- L'issue est formulée pour les transactions externes (callback tardif, reversal). Le retour au solde est interne et sans partenaire de paiement ; s'il est toujours synchrone côté KOTIZ, l'état « en attente » ne vient que d'un délai réseau. À confirmer côté architecture.

### Paramètres à confirmer
- Technique : délai d'expiration au-delà duquel le résultat devient « en attente » ou incertain.
```

## Brouillon — commentaire pour #59 (D02 Fournir le socle UI accessible)

```markdown
## Design validé (lot B, 19 octobre 2026)

Le lot B (épargne et retour au solde) a été validé le 19 octobre 2026. Il réutilise le socle du lot A et ajoute des composants et des variantes.

- Prototype (page « Lot B ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v10 (composants du lot B) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (§ Composants) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-b.md

### Critères d'acceptation ajoutés
- [ ] `GoalRow` a `state` `reached` (drapeau + « Objectif atteint » en texte neutre, sans coche, barre pleine) et `closed` (« Fermée le … », sans barre ni montant).
- [ ] `RootHeader` + `MaskToggle`, `GoalTypeOption` + `GoalTypeGrid`, `AmountField` (saisie réelle, puce large « Tout remettre »), `DateChoice` (avec `TextField type="date"`), `TextField` `multiline`, `SummaryPreview`, `SummaryFlow`, `GoalProgress` et `ConfirmDialog` existent avec les noms et propriétés du Design System v10 (`components/index.d.ts`).
- [ ] `SummaryPreview` est lu par TalkBack en une phrase ; `SummaryFlow` nomme son flux « De {épargne} vers Mon solde » ; aucun des deux n'a de ligne de frais dans le lot B.
- [ ] `StepTracker` a l'étape `sent` « Envoyée » et n'affiche jamais « Fait » sur un écran d'attente.
- [ ] `TransactionRow` a une variante mouvement interne (« Vers mon solde », « Depuis mon solde ») qui ne ressemble pas à un apport externe.
- [ ] Les illustrations `Objectifs/sante-coeur.svg` (Santé), `Objectifs/imprevus.svg` (Imprévus) et `Objectifs/objectif-atteint.svg` sont utilisées ; aucun asset du groupe `Archives` (trousse à croix, bouclier) n'est embarqué.
- [ ] Une raison de bouton désactivé est annoncée avec le bouton par TalkBack, y compris quand une phrase couvre deux boutons (le `Button` du DS ne transmet pas encore cette description).

### Écarts
- Les composants et illustrations du lot B sont publiés dans le Design System v10, sauf le **squelette de chargement** (B01, B07, à construire dans l'app) et la **variante mouvement interne de `TransactionRow`** (laissée de côté, à décider avec le lot C) ; `DateField` est remplacé par `TextField type="date"`.
- Aucun token nouveau ; la puce « Tout remettre » garde un rayon 8 hors échelle, à rattacher à un token.
```

---

## Écarts relevés entre les documents et les décisions PO du 19 octobre 2026

Signalés, non corrigés ici. État vérifié le 19 octobre 2026 sur le canvas `1792428839-5d95` et le Design System `1792433315-d20c`.

**Résolus**
- Canvas : plus aucun frais sur B10 (ni ligne Frais, ni « avant frais », ni état « frais inconnus ») ; menu « Retour au solde : sans frais ».
- `test-lot-b.md` et la correction n° 1 de `critique-lot-b.md` : « sans frais ».
- `ux-spec-lot-b.md` § B06 : décrit l'aperçu (`Summary.Preview`).
- `ux-spec-lot-b.md` § B10 : le refus par règle y est placé avant le PIN, ce que le PO a confirmé le 19 octobre 2026 (ce n'est plus un écart).
- Design System : cœur, coffret, drapeau et composants du lot B publiés, trousse à croix et bouclier archivés ; le README (« sans exception », « Objectif atteint » sans coche) et la fiche `GoalCard` (sans coche, drapeau) sont corrigés.

**Résolus ensuite le 19 octobre 2026** (canvas version 12 `1792433346-fbe2`, Design System version 11) : état « refus par règle » sur B10 avant le PIN et échec technique nommé sur B12 ; `screens-lot-b.md` aligné sur le DS v10 et sans frais ; `ux-spec-lot-b.md` (B07 sans coche, versions et composants à jour) ; `test-lot-b.md` P4-2 « Projet : École — ne change pas ».

**Hors de ces corrections**
| Où | Écart | Ce qui fait foi |
|---|---|---|
| [ddd-context-map-glossaire.md](../../architecture/ddd-context-map-glossaire.md) § 5.1 | `GoalLock` (verrouillage jusqu'à la date, malus de score) ; ni retour au solde, ni affectation, ni fermeture | Épargne flexible (RM-SAV-03) ; à traiter avec `domain-modeling` |
| [#73](https://github.com/kotiz-ci/platform/issues/73) | « retrait », « signatures numériques », bloquée par #69 | Retour au solde dans D24 ; carnet au lot E ; voir brouillon |

## Publications à faire (après feu vert du PO)

1. **Créer l'issue D24** « Remettre l'argent d'une épargne sur le solde » (brouillon ci-dessus), label `ready-for-agent`, Blocked by #73 et #67.
2. **Commenter #73** (brouillon « Design validé ») ; mettre à jour son titre, son corps (« retrait » → renvoi à D24, retrait de « signatures numériques ») et son « Blocked by » (#69 → #59, #64) si le PO le valide.
3. **Commenter #94** (accueil : « Objectif atteint », solde après un retour, masquage commun).
4. **Commenter #67** (refus par règle avant autorisation, attente, incertain, échec technique, idempotence).
5. **Commenter #59** (composants du DS v10 et illustrations).

Préalable : commiter `handoff-lot-b.md` et `gherkin-lot-b.md` et pousser `docs/restructure-documentation`, sinon les liens GitHub des commentaires ne fonctionnent pas.
