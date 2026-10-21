# Issues — Refonte des parcours, lot D : retraits Mobile Money

Date : 21 octobre 2026. Statut : **brouillon, rien n'est publié**. La publication (commentaires, changements de « Blocked by ») est faite par la session principale après relecture et feu vert explicite du PO (brief : « aucune modification d'issue sans feu vert explicite du PO »).

Sources : [handoff-lot-d.md](handoff-lot-d.md), [gherkin-lot-d.md](gherkin-lot-d.md) (126 scénarios), [ux-spec-lot-d.md](ux-spec-lot-d.md), [screens-lot-d.md](screens-lot-d.md), [critique-lot-d.md](critique-lot-d.md), issues lues le 21 octobre 2026 avec `gh issue view <n> -R kotiz-ci/platform --comments` (#59, #67, #68, #69, #72, #94, #99) et la liste complète des issues.

Rappel : « D-01 » (avec tiret) est un **écran** ; « D07 » est le code de l'issue #68.

**Liens vers la branche** : les liens GitHub ci-dessous pointent vers `docs/restructure-documentation`. Ils ne fonctionnent qu'une fois `handoff-lot-d.md`, `gherkin-lot-d.md` (et `ux-spec-lot-d.md`, `screens-lot-d.md`, `critique-lot-d.md`, `test-lot-d.md`, non commités à ce jour) commités et la branche poussée.

## Constat sur les issues actuelles

- **[kotiz-ci/platform#68](https://github.com/kotiz-ci/platform/issues/68) D07 « Effectuer un retrait direct en sandbox »** : une ligne (« Retrait vers le numéro vérifié après précontrôle et confirmation »), trois critères génériques, aucun commentaire, bloquée par #67. Il manque tout le parcours : la feuille D-00 et l'explication agente (D-06), le choix de l'opérateur, le montant reçu et « Tout mon solde » (maximum du serveur), le récapitulatif (frais confirmés seulement, frais inconnus = blocage), les refus avant le PIN, le PIN KOTIZ, les cinq états du résultat, la feuille « pas reçu » (D-07).
- **[kotiz-ci/platform#67](https://github.com/kotiz-ci/platform/issues/67) D06 « Sécuriser le cycle de vie des transactions »** : a reçu les critères des lots B (retour au solde) et C (dépôt pour une épargne, reprise). Il manque le **retrait** : montant engagé dès l'envoi, fait seulement à la confirmation de l'opérateur, échec qui libère l'engagement, réessai = nouvelle demande et nouveau PIN, second retrait distinct pendant une attente, reprise de la même demande au retour dans l'app.
- **[kotiz-ci/platform#69](https://github.com/kotiz-ci/platform/issues/69) D08 « Réconcilier et contester une transaction »** : a reçu le volet cliente du lot C ; ses « Blocked by » sont déjà #67 et #99 (le blocage par #68 a été levé). Le lot D ajoute le **signalement d'un retrait** (« parti mais pas reçu »), qui suit #68.
- **[kotiz-ci/platform#99](https://github.com/kotiz-ci/platform/issues/99) D26 « Consulter mes opérations, le détail et le reçu »** : marque le retrait « hors périmètre (lot D, lignes seulement) ». Le lot D fixe le **contenu retrait** de la ligne, du détail et du reçu.
- **[kotiz-ci/platform#94](https://github.com/kotiz-ci/platform/issues/94) D21 accueil** : porte la carte solde, les raccourcis et les Dernières opérations. Le lot D change l'entrée « Retirer » (feuille D-00), la raison de « Retirer » désactivé (**PNV-2**) et la carte solde (**« Retrait en attente »**, évolution de la règle « Dernier dépôt » du lot B).
- **[kotiz-ci/platform#72](https://github.com/kotiz-ci/platform/issues/72) D11 « Réaliser un cash-out auprès d'une agente »** : le parcours est au lot E. Le lot D n'apporte que le **raccord** (« Auprès d'une agente » → D-06 → Mon QR).
- **[kotiz-ci/platform#59](https://github.com/kotiz-ci/platform/issues/59) D02 socle UI** : reçoit les composants et évolutions du lot D (hors DS v12).
- **Aucune capacité du lot D sans issue** : tout ce qui se code tient dans #68, #67, #69, #99, #94 et #59 (voir § Capacités sans issue). Aucune issue à créer.

## Correspondance parcours / écrans → issues

| Parcours                                 | Écrans                                                                                                                                                                                                               | Issue                                                                                                                         | Scénarios                                                         | Remarque                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Socle lot D                              | `TransactionRow` `withdrawal`, `SummaryFlow` « Vers ton numéro », `BalanceCard` « Retrait en attente », ligne du montant entière (`AmountField`), `PinPad` désactivé, `StepTracker` `sent`, pictogramme portefeuille | [#59](https://github.com/kotiz-ci/platform/issues/59) D02                                                                     | critères « Socle lot D » du handoff ; D-P1-S11, D-P1-S22, D-P8-S2 | Construits dans le canvas (`ld-`), hors DS v12                                                                |
| D-P1 Retirer sur mon Mobile Money        | D-00, D-01 à D-05 (fait)                                                                                                                                                                                             | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P1-S1 à S29                                                     | Cœur de l'issue                                                                                               |
| D-P1 — backend                           | récapitulatif, ordre                                                                                                                                                                                                 | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P1-S30                                                          | Récapitulatif et maximum du serveur, clé unique                                                               |
| D-P1 — accueil                           | A · H01                                                                                                                                                                                                              | [#94](https://github.com/kotiz-ci/platform/issues/94) D21                                                                     | D-P1-S2 à S4 (entrée « Retirer »)                                 | Feuille D-00                                                                                                  |
| D-P2 Solde insuffisant, attente, épargne | D-02                                                                                                                                                                                                                 | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P2-S1 à S5, S8 à S12                                            | « Remettre sur mon solde » → B · B01 (lot B, [#97](https://github.com/kotiz-ci/platform/issues/97) inchangée) |
| D-P2 — accueil (PNV-2)                   | A · H01                                                                                                                                                                                                              | [#94](https://github.com/kotiz-ci/platform/issues/94) D21                                                                     | D-P2-S6, S7                                                       | Raison « Ton argent est dans tes épargnes. »                                                                  |
| D-P3 Bloqué avant le PIN                 | D-00, D-01, D-02, D-03                                                                                                                                                                                               | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P3-S1 à S16                                                     | Frais inconnus = blocage, côté app et serveur                                                                 |
| D-P4 Après le PIN — résultat             | D-05                                                                                                                                                                                                                 | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P4-S1, S2, S8 à S14, S16, S18                                   | Cinq états, Réessayer, autre Mobile Money                                                                     |
| D-P4 — cycle de vie                      | backend                                                                                                                                                                                                              | [#67](https://github.com/kotiz-ci/platform/issues/67) D06                                                                     | D-P4-S9, S15, S17, S19 à S22                                      | Engagement, confirmation, échec, idempotence                                                                  |
| D-P4 — carte solde                       | A · H01                                                                                                                                                                                                              | [#94](https://github.com/kotiz-ci/platform/issues/94) D21                                                                     | D-P4-S3 à S7                                                      | « Retrait en attente · − {montant pris} »                                                                     |
| D-P5 Pas reçu                            | D-05, D-07                                                                                                                                                                                                           | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P5-S1 à S3                                                      | La feuille D-07 est dans le parcours du retrait                                                               |
| D-P5 — signalement d'un retrait          | C-14, C-15, C-12                                                                                                                                                                                                     | [#69](https://github.com/kotiz-ci/platform/issues/69) D08                                                                     | D-P5-S4 à S9                                                      | Même signalement que le lot C, sur un retrait                                                                 |
| D-P6 PIN incorrect ou bloqué             | D-04                                                                                                                                                                                                                 | [#68](https://github.com/kotiz-ci/platform/issues/68) D07                                                                     | D-P6-S1 à S9                                                      | Aucun nombre d'essais (G02)                                                                                   |
| D-P7 Hors connexion, interruption        | D-01 à D-05                                                                                                                                                                                                          | [#68](https://github.com/kotiz-ci/platform/issues/68) D07 ; [#67](https://github.com/kotiz-ci/platform/issues/67) D06         | D-P7-S1 à S5, S7 (#68) ; D-P7-S6, S8 à S10 (#67)                  | Jamais deux demandes                                                                                          |
| D-P8 Retrouver un retrait                | C-11, C-12, C-13                                                                                                                                                                                                     | [#99](https://github.com/kotiz-ci/platform/issues/99) D26                                                                     | D-P8-S1 à S14                                                     | Montant pris, « Tu as reçu », reçu d'un retrait fait                                                          |
| D-P9 Auprès d'une agente                 | D-00, D-06                                                                                                                                                                                                           | [#68](https://github.com/kotiz-ci/platform/issues/68) D07 ; raccord [#72](https://github.com/kotiz-ci/platform/issues/72) D11 | D-P9-S1 à S4                                                      | D-06 n'est qu'une explication ; le cash-out reste dans #72 (lot E)                                            |

**Issues lues et non concernées directement** : [#97](https://github.com/kotiz-ci/platform/issues/97) D24 retour au solde (utilisé tel quel par D-P2 ; PNV-1 refusée, donc rien à ajouter à B · B12) ; [#73](https://github.com/kotiz-ci/platform/issues/73) D12 épargnes (B · B01 ouvert depuis D-02 sans changement) ; [#66](https://github.com/kotiz-ci/platform/issues/66) D05 dépôt (aucun changement) ; [#64](https://github.com/kotiz-ci/platform/issues/64) D03 compte (création du PIN KOTIZ, prérequis) ; [#65](https://github.com/kotiz-ci/platform/issues/65) D04 KYC (D-02 renvoie seulement vers « Vérifier mon identité ») ; [#75](https://github.com/kotiz-ci/platform/issues/75) D14 notifications (SMS de confirmation d'un retrait : lot F) ; [#95](https://github.com/kotiz-ci/platform/issues/95) D22 Mon QR (ouvert par D-06, sans changement) ; [#96](https://github.com/kotiz-ci/platform/issues/96) D23 tokens (prérequis via #59, aucun token nouveau) ; [#60](https://github.com/kotiz-ci/platform/issues/60) H01 et [#61](https://github.com/kotiz-ci/platform/issues/61) H02 (décisions humaines sur le partenaire et les tarifs : ce sont elles qui lèvent G01, frais de retrait compris) ; [#63](https://github.com/kotiz-ci/platform/issues/63) H04 (règles du PIN, G02).

## Capacités sans issue

| Capacité                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Écrans                 | Scénarios     | Contexte DDD           | Piste                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------- | ---------------------- | -------------------------------------------------------------------------------- |
| Nommer le **montant engagé** (sortie envoyée non confirmée, exclue du solde disponible, alors que le glossaire dit « seul le confirmé y compte ») ; préciser **`Withdrawal` « fait = transfert confirmé par l'opérateur »** et ses statuts ; nommer les **frais de retrait**, le **montant reçu** et le **montant pris**, le **maximum retirable**, le sens de l'**ordre de retrait** dans Payments, le **numéro vérifié** ; un événement d'échec du retrait | —                      | D-P4-S20, S21 | Savings, Payments, IAM | **`domain-modeling`**, avant le code de #68 et #67. Pas un ticket.               |
| Promouvoir dans le Design System les composants du lot D (voir Reports)                                                                                                                                                                                                                                                                                                                                                                                      | —                      | —             | —                      | **Travail design** (pas de ticket) ; le code les construit dans #59 en attendant |
| « PIN oublié ? », « Contacter l'aide », SMS de confirmation d'un retrait                                                                                                                                                                                                                                                                                                                                                                                     | D-03, D-04, D-05, D-07 | D-P6-S7       | IAM, Notifications     | **Lot F** : « Bientôt ici » en attendant                                         |
| Retrait en espèces et retrait Mobile Money assisté par une agente                                                                                                                                                                                                                                                                                                                                                                                            | D-06                   | —             | Agents, Payments       | **Lot E** ([#72](https://github.com/kotiz-ci/platform/issues/72))                |

Aucune issue à créer : la capacité « retirer » a son issue (#68), et ses morceaux transverses ont déjà la leur (#67, #69, #99, #94, #59).

## Reports vers d'autres lots

| Report                                                      | Lot / cible                                                                                                    | Pourquoi                                                                                                                                                                                                                                                                           | Ce qu'il faut faire                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Champ montant de C-02 : toute la ligne ouvre le clavier** | **Lot C** (canvas, écran C-02 validé) et [#59](https://github.com/kotiz-ci/platform/issues/59) (`AmountField`) | Critique lot D n° 11 : le champ vide de C-02 mesure 23 × 48 (seule la largeur du « 0 » est touchable). Corrigé pour D-02 (version 26 : la ligne entière est le `label` du champ, 320 × 48), C-02 non touché car le lot C est validé.                                               | Session du lot C : appliquer la même correction à C-02 dans le canvas (affichage seulement, à faire valider par le PO) ; la reporter dans `handoff-lot-c.md`. Code : une seule correction au niveau de `AmountField` (critère « Socle lot D »).                       |
| **Ligne « Retrait en attente » de `BalanceCard`**           | **Design System** (`BalanceCard`) et [DESIGN.md](../../../DESIGN.md) § Carte solde ; handoffs des lots A et B  | Décision PO du 20 octobre 2026 : évolution de la règle « Dernier dépôt seulement » du lot B. Le `BalanceCard` du DS ne sait afficher qu'un « + » ; la variante est recomposée dans le canvas (`ld-last-out`).                                                                      | Session du Design System : ajouter une prop (proposition `pendingOut: { label, amount, onOpen }`, prioritaire sur `lastDeposit`, ambre + horloge, masquable) ; mettre à jour DESIGN.md § Carte solde (« Dernier dépôt » seulement **hors retrait en attente**).       |
| **Illustration « Mon solde » neutre**                       | **Design System** (illustrations)                                                                              | Critique lot D n° 14 : le nœud « Depuis : Mon solde » utilise l'illustration Déposer (portefeuille avec « + » et flèche qui entre) sur un retrait. Le canvas utilise en attendant un pictogramme portefeuille au trait (D-02, D-03) ; C-12 et C-13 gardent l'illustration Déposer. | Session du Design System : dessiner une illustration portefeuille neutre (sans flèche) ; puis l'utiliser dans D-02, D-03, C-12, C-13 et les flux internes (à valider PO).                                                                                             |
| Autres candidats `ld-` à promouvoir                         | Design System                                                                                                  | Composants construits dans le canvas, tokens seulement                                                                                                                                                                                                                             | `SummaryFlow` nœud « Vers ton numéro » ; `TransactionRow` `withdrawal` ; `StepTracker` contenu retrait ; `Message` pending sous « Depuis » ; ligne « Vers ton numéro » ; rappel du PIN à deux lignes ; ligne clé / valeur avec logo d'opérateur ; `PinPad` désactivé. |
| Écarts spec / canvas                                        | `ux-spec-lot-d.md` (lot D)                                                                                     | Le canvas validé fait foi                                                                                                                                                                                                                                                          | Session de la spec : reporter la table « Écarts » de [handoff-lot-d.md](handoff-lot-d.md) § Points ouverts.                                                                                                                                                           |
| Vocabulaire                                                 | [glossaire DDD](../../architecture/ddd-context-map-glossaire.md)                                               | Termes manquants (voir § Capacités sans issue)                                                                                                                                                                                                                                     | `domain-modeling`.                                                                                                                                                                                                                                                    |

## Paramètres « à confirmer » du lot D

| Paramètre                                                                                                                                                                    | Gate         | Écrans                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------- |
| **Frais du retrait** et **modèle de frais** (ajoutés au montant reçu, comme le design, ou retenus) ; montant pris ; frais inconnus = autorisation bloquée                    | G01          | D-02, D-03, D-04, D-05, C-12, C-13 |
| Opérateurs disponibles **pour le numéro vérifié** et leur ordre                                                                                                              | G01          | D-00, D-01                         |
| Minimum et maximum par retrait ; plafonds du niveau d'accès limité                                                                                                           | G01          | D-02, D-03                         |
| Moment du débit et calcul du disponible avec un retrait en attente (montant engagé)                                                                                          | G01, domaine | A · H01, D-02                      |
| « Échec confirmé » = argent pas sorti de KOTIZ ? ; refus de l'opérateur après un débit : même opération ou correction liée ; raison communicable d'un refus                  | G01          | D-03, D-05, C-12                   |
| Action de la cliente exigée par l'opérateur pour recevoir (non attendu)                                                                                                      | G01          | —                                  |
| Référence de l'opérateur, mentions légales du reçu ; vérification du numéro qui expire                                                                                       | G01          | C-12, C-13, D-03                   |
| Longueur du PIN, nombre d'essais, blocage (durée, déblocage), capture d'écran bloquée                                                                                        | G02          | D-04                               |
| Motif « argent pas arrivé sur mon Mobile Money » ; contact d'aide ; texte de D-07 par opérateur                                                                              | G03          | D-03, D-05, D-07, C-14             |
| `<délai de confirmation>` (passage à « On vérifie ») ; interrogation du statut au retour ; cache hors ligne du disponible                                                    | technique    | D-02, D-05                         |
| D-02 « Remettre sur mon solde » avec une seule épargne pleine (B · B01 ou B · B07) ; carte solde avec deux retraits en attente ; montant d'un retrait échoué dans Opérations | PO           | D-02, A · H01, C-11, C-12          |

**Valeurs de démonstration à ne jamais reprendre** : frais fictifs du prototype (1 % du montant reçu, bande hors produit), montants 5 050 / 7 350 / 12 277 / 123, numéro 07 08 12 34 56, solde 12 400 FCFA, épargnes École Awa et Boutique, références « (fictive) », PIN 2468, blocage au 3e essai, heure 14:32, date figée au 19 octobre 2026, « Motif A / B (à confirmer) ».

---

## Brouillon — commentaire pour #68 (D07 Effectuer un retrait direct en sandbox)

```markdown
## Design validé (lot D, 21 octobre 2026)

Le lot D (retraits Mobile Money de l'app cliente) a été validé le 21 octobre 2026 par le PO et sa conjointe, après critique et test sur le prototype. Cette issue reçoit le **retrait vers le Mobile Money du numéro vérifié**, de l'entrée « Retirer » au résultat. Le cycle de vie (montant engagé, idempotence, confirmation, échec) est précisé dans #67 ; la carte solde et l'entrée « Retirer » de l'accueil dans #94 ; la ligne, le détail et le reçu d'un retrait dans #99 ; le signalement d'un retrait dans #69.

- Prototype (page « Lot D — Retraits », parcours D-00, D-P1 à D-P9 et variantes) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v12 (illustrations Mobile Money et agente, logos opérateurs) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (D-00 à D-07, règles frais, montants, réseau, backend Payments / Savings / IAM) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md
- Gherkin (D-P1-S1 à S30 ; D-P2-S1 à S5, S8 à S12 ; D-P3-S1 à S16 ; D-P4-S1, S2, S8 à S14, S16, S18 ; D-P5-S1 à S3 ; D-P6-S1 à S9 ; D-P7-S1 à S5, S7 ; D-P9-S1 à S4) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-d.md

### Écrans concernés

D-00 Comment tu veux retirer ? (feuille) · D-01 Sur quel Mobile Money ? · D-02 Combien tu retires ? · D-03 Vérifie ton retrait · D-04 Entre ton PIN · D-05 Résultat du retrait · D-06 Retirer auprès d'une agente (explication) · D-07 L'argent n'est pas sur ton {opérateur} ? (feuille).

### Critères d'acceptation ajoutés

- [ ] « Retirer » ouvre la feuille « Comment tu veux retirer ? » (Sur mon Mobile Money / Auprès d'une agente) ; « Auprès d'une agente » explique le retrait en espèces et ouvre Mon QR, sans montant ni statut (D-P1-S2 à S4, D-P9-S1 à S4).
- [ ] Le retrait va **uniquement vers le numéro vérifié**, affiché en entier et non modifiable ; aucun champ, bouton ni lien pour un autre numéro (D-P1-S8).
- [ ] Liste des opérateurs disponibles pour ce numéro (logo, nom, chevron, sans radio) ; un seul reste une liste ; indisponible = ligne désactivée avec raison ; aucun opérateur → bouton « Retirer auprès d'une agente » (D-P1-S6, S7, D-P3-S1 à S4).
- [ ] Fatou saisit **le montant qu'elle reçoit** ; Continuer désactivé avec raison si vide, 0, au-delà du maximum du serveur ou du niveau d'accès (aucune limite chiffrée) ; **« Tout mon solde » = maximum calculé par le serveur** ; toute la ligne du montant ouvre le clavier (D-P1-S9 à S14, D-P2-S1, D-P3-S5, S6, S9).
- [ ] **Depuis le solde disponible seulement** : montant trop grand avec une épargne pleine → « Le reste est dans tes épargnes. » + « Remettre sur mon solde » (→ Mes épargnes, retour au solde du lot B avec son propre PIN) ; aucun retrait direct depuis une épargne, aucun enchaînement (D-P2-S2 à S5).
- [ ] Récapitulatif : « Tu reçois sur ton {opérateur} » + montant reçu, flux vers le numéro vérifié ; **frais à confirmer** : « Pris sur ton solde », « Frais » et « Ton solde après » n'apparaissent qu'avec un frais confirmé, renvoyés par le serveur ; **tant que les frais sont inconnus, l'autorisation reste bloquée** (« On ne connaît pas les frais. Réessaie plus tard. », « Revenir à l'accueil », aucun PIN, le serveur refuse l'ordre) (D-P1-S13, S15 à S18, D-P3-S7, S8, S10 à S12).
- [ ] **Refus par une règle avant le PIN** (montant et flux seulement, « Revenir à l'accueil », « Contacter l'aide », aucune valeur chiffrée, aucune demande) ; opérateur devenu indisponible → « Choisir un autre Mobile Money », montant gardé (D-P3-S13 à S16).
- [ ] **PIN KOTIZ obligatoire**, rappel « Pris sur ton solde » puis « Tu reçois » ; **aucun PIN ni code opérateur** n'est demandé ; PIN jamais affiché ni gardé ; pavé désactivé pendant l'envoi (D-P1-S19 à S22).
- [ ] PIN incorrect : erreur en tête, aucun nombre d'essais ; PIN bloqué : « Rien n'a été pris sur ton solde. », « Trop d'essais. », aucun montant, « Terminé » et « PIN oublié ? » ; aucun ordre créé (D-P6-S1 à S9).
- [ ] Résultat plein écran : **« Fait » seulement après la confirmation du transfert par l'opérateur** ; en attente (étapes « Envoyée » / « En attente » / « Pas encore », « Ne refais pas le retrait. ») ; on vérifie (aucun Réessayer) ; échoué technique ou refus de l'opérateur (« Rien n'est arrivé sur ton {opérateur}. », « Ton solde », Réessayer = récapitulatif relu + nouveau PIN, « Choisir un autre Mobile Money ») ; retour jamais vers la saisie ; aucune garantie non confirmée (D-P1-S23 à S26, D-P4-S1, S2, S8 à S14, S18).
- [ ] « Tu ne vois pas l'argent sur ton {opérateur} ? » (fait) et « Le retrait n'arrive pas ? » (attente) ouvrent la feuille de vérification, « Ne refais pas le retrait. », puis le signalement de ce retrait (D-P5-S1 à S3).
- [ ] Hors connexion à chaque étape : rien n'est envoyé, la cliente le sait ; après une interruption avant le PIN, récapitulatif recalculé et PIN effacé (D-P7-S1 à S5, S7).
- [ ] Backend : récapitulatif et maximum retirable renvoyés par le serveur ; un ordre de retrait n'est créé qu'après un PIN valide, vers le numéro vérifié, avec des frais confirmés et une clé unique ; montant pris > disponible refusé (D-P1-S30, D-P2-S12, D-P3-S10, D-P6-S5).

### Écarts avec l'issue actuelle

- L'issue tient en une ligne : le design en fait un parcours de six écrans (feuille, opérateur, montant, récapitulatif, PIN, résultat) plus deux feuilles et une explication.
- « Précontrôle » = tout ce qui est connu d'avance se dit **avant le PIN** (disponible, épargne, niveau d'accès sur D-02 ; frais, règles, opérateur sur D-03) ; un échec technique ou un refus de l'opérateur se dit **après** (D-05).
- « Confirmation » = PIN KOTIZ ; le retrait n'est « fait » qu'à la confirmation du transfert par l'opérateur.
- Les frais du prototype sont fictifs et annoncés comme tels : **aucune valeur n'est une règle**. En production, sans frais confirmés (G01, #60, #61), le retrait reste bloqué au récapitulatif.
- Le retrait en espèces et le retrait Mobile Money assisté par une agente restent au lot E (#72) ; D-06 n'est qu'une explication.
- Vocabulaire à fixer avant le code (`domain-modeling`) : **montant engagé**, `Withdrawal` « fait = transfert confirmé par l'opérateur », frais de retrait, montant reçu / montant pris, maximum retirable.
- Proposition : ajouter « Blocked by #59 » (socle UI : ligne de choix, résultat plein écran, `SummaryFlow`) et citer #99 (liens vers le détail et le reçu).

### Paramètres à confirmer

- G01 : opérateurs pour le numéro vérifié et leur ordre ; frais et modèle de frais ; minimum et maximum ; niveau d'accès limité ; « échec confirmé » = argent pas sorti ? ; raison d'un refus ; vérification du numéro qui expire.
- G02 : longueur du PIN, essais, blocage ; capture d'écran du PIN.
- G03 : contact derrière « Contacter l'aide » ; texte de la feuille « pas reçu » par opérateur.
- PO : « Remettre sur mon solde » avec une seule épargne pleine (Mes épargnes, recommandé, ou détail de l'épargne comme le prototype).
- Les données du prototype (numéro, solde, épargnes, références, frais) sont fictives.
```

## Brouillon — commentaire pour #67 (D06 Sécuriser le cycle de vie des transactions)

```markdown
## Design validé (lot D, 21 octobre 2026)

Le lot D a été validé le 21 octobre 2026. Le **retrait Mobile Money** est la première sortie d'argent hors de KOTIZ : il précise ce que cette issue doit garantir, en plus du retour au solde (lot B) et du dépôt pour une épargne (lot C).

- Prototype (parcours D-P2″ retrait déjà en attente, D-P4, D-P4′, D-P4″, D-P4‴, D-P7′) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Montants, signes et soldes ; § Réseau, idempotence, concurrence ; § Backend) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md
- Gherkin (D-P4-S9, S15, S17, S19 à S22 ; D-P7-S6, S8 à S10) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-d.md

### Critères d'acceptation ajoutés

- [ ] Dès l'envoi d'un retrait, le **montant pris** (montant reçu + frais confirmés) est engagé et **exclu du solde disponible** (décision PO Q4) ; il ne peut être ni retiré ni mis de côté une seconde fois (D-P4-S20, S21).
- [ ] Le retrait n'est **fait** qu'à la **confirmation du transfert par l'opérateur** : écritures équilibrées, événement de retrait fait publié une seule fois (D-P4-S21).
- [ ] Un **échec confirmé** (technique ou refus de l'opérateur) libère l'engagement, sans écriture de débit ; si le partenaire impose un débit puis un retour, une **correction** liée au retrait d'origine, visible seulement confirmée (D-P4-S20).
- [ ] Une règle devenue bloquante entre le récapitulatif et l'envoi donne un résultat « échoué » après le PIN, sans engagement ni débit (D-P4-S22).
- [ ] Un résultat inconnu (connexion perdue, `<délai de confirmation>` dépassé) est « en attente » interrogeable, **sans Réessayer** ; au retour dans l'app, la même demande est interrogée avec sa clé, jamais recréée (D-P4-S9, D-P7-S8, S9).
- [ ] Après un échec **confirmé**, « Réessayer » crée une **nouvelle demande**, avec une nouvelle clé et un nouveau PIN ; la demande échouée reste « échouée » (D-P4-S15).
- [ ] Un **second retrait** pendant qu'un premier est en attente est une nouvelle demande distincte, dans la limite du disponible réduit (décision PO Q2).
- [ ] Une confirmation rejouée ou tardive du partenaire ne produit jamais un second débit (D-P4-S19).
- [ ] Le statut n'est jamais déduit d'un SMS ou d'une notification de l'opérateur (D-P4-S17).
- [ ] Au retour du réseau, aucune demande ne part sans un nouveau PIN ; une session expirée ne renvoie jamais une demande déjà envoyée (D-P7-S6, S10).

### Écarts

- Le glossaire DDD dit du solde disponible que « seul le confirmé y compte » : la décision Q4 demande un **montant engagé** (sortie envoyée non confirmée) exclu du disponible. À nommer avec `domain-modeling` avant le code, avec `Withdrawal` « fait = transfert confirmé par l'opérateur ».
- Le moment exact du débit (à l'envoi ou à la confirmation) et le traitement d'un refus après débit sont à confirmer avec le partenaire (G01) ; le design recommande l'engagement à l'envoi et le débit à la confirmation.

### Paramètres à confirmer

- Technique : délai de confirmation avant « On vérifie » ; interrogation du statut au retour dans l'app.
- G01 : moment du débit ; refus de l'opérateur après débit (même opération ou correction).
```

## Brouillon — commentaire pour #69 (D08 Réconcilier et contester une transaction)

```markdown
## Design validé (lot D, 21 octobre 2026)

Le lot D a été validé le 21 octobre 2026. Il ajoute le **signalement d'un retrait** au volet cliente du lot C : quand KOTIZ dit « Fait » (ou « En attente » depuis longtemps) mais que la cliente ne voit rien sur son Mobile Money, elle ne refait pas le retrait, elle signale le problème sur ce retrait.

- Prototype (parcours D-P5) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (D-07 ; § Écrans du lot C, contenu retrait) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md
- Gherkin (D-P5-S4 à S9) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-d.md

### Critères d'acceptation ajoutés

- [ ] Le signalement d'un retrait reprend « Retrait {opérateur} · {montant pris sur le solde} », la date, la référence et le statut, sans ressaisie (D-P5-S4).
- [ ] Il s'ouvre depuis la feuille « L'argent n'est pas sur ton {opérateur} ? » / « Le retrait n'arrive pas ? » ou depuis le détail du retrait ; un dossier existant est rouvert, jamais doublé (D-P5-S7, S8).
- [ ] Envoi : message d'information « Ton signalement est envoyé. » / « Ce n'est pas un remboursement. » ; aucun mouvement d'argent, aucun nouveau retrait, statut du retrait inchangé (D-P5-S5, S6).
- [ ] Motifs lus dans la configuration de l'assistance, aucun motif propre au retrait ajouté par l'app (D-P5-S9).

### Écarts

- Ce volet dépend de #68 (retrait) ; le volet du lot C n'en dépend pas : « Blocked by » actuels (#67, #99) inchangés.
- Un motif du type « L'argent n'est pas arrivé sur mon Mobile Money » est à **proposer** à l'assistance (G03), jamais inscrit d'office.
- Refus de l'opérateur après un débit : si le partenaire impose un retour par une écriture distincte, c'est une **correction** liée au retrait (à confirmer G01).

### Paramètres à confirmer

- G03 : motifs ; contact d'aide ; texte de la feuille « pas reçu » par opérateur.
```

## Brouillon — commentaire pour #99 (D26 Consulter mes opérations, le détail et le reçu)

```markdown
## Design validé (lot D, 21 octobre 2026)

Le lot D a été validé le 21 octobre 2026. Il fixe le **contenu retrait** d'Opérations, du détail et du reçu, que cette issue marquait « hors périmètre (lot D, lignes seulement) ».

- Prototype (parcours D-P8, planche « D · C-11 à C-15 ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Écrans du lot C, contenu retrait ; `TransactionRow` `withdrawal`) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md
- Gherkin (D-P8-S1 à S14) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-d.md

### Critères d'acceptation ajoutés

- [ ] Une ligne par retrait : « Retrait {opérateur} » · « Vers {numéro abrégé} » · **montant pris sur le solde** (montant reçu + frais) ; « − » seulement si fait ; en attente ou échoué, montant sans signe en texte secondaire ; un retrait fait n'a jamais la pastille d'échec (D-P8-S1, S2).
- [ ] Filtre « Retraits » et texte « Aucun retrait pour l'instant. » (D-P8-S3, S4).
- [ ] Détail fait : montant pris, Depuis Mon solde → Vers {opérateur} {numéro}, Date, Frais (si confirmés), **« Tu as reçu »** {montant reçu}, Référence ; « Voir le reçu » ; « Signaler un problème » en bouton texte (D-P8-S5).
- [ ] Détail en attente : « {montant reçu} pas encore sur ton {opérateur}. », étapes « Envoyée » / « En attente » / « Pas encore », « Le reçu sera prêt quand ce sera fait. », « Ne refais pas le retrait. », aucun bouton principal (D-P8-S6).
- [ ] Détail échoué : « Rien n'est arrivé sur ton {opérateur}. », raison (technique ou refus de l'opérateur), pas de ligne Frais ; **ni Réessayer ni « Refaire ce retrait »** (PNV-3 refusée) (D-P8-S7, S8).
- [ ] Reçu seulement pour un retrait fait : « Retrait Mobile Money », **« Tu as reçu »** au-dessus du montant reçu, Depuis / Vers avec numéro entier, Date, « Pris sur ton solde » et « Frais » si confirmés, Référence, nom de la cliente, pas de partage ; masqué (D-P8-S9 à S11).
- [ ] API : chaque retrait expose statut réel, montant reçu, frais confirmés et montant pris ; référence de l'opérateur si fournie ; aucun reçu pour un retrait non fait (D-P8-S10, S13, S14).

### Écarts

- Le critère « Hors périmètre : parcours de retrait (lot D, lignes seulement) » est remplacé par ce contenu ; le parcours du retrait lui-même est dans #68.
- Décision PO du 20 octobre 2026 : Opérations montre ce qui a **quitté le solde** ; le résultat et le reçu mettent en avant ce que la cliente a **reçu**.

### Paramètres à confirmer

- G01 : frais affichés (seulement confirmés) ; référence de l'opérateur et mentions légales du reçu.
- PO : montant d'un retrait échoué dans la liste (montant de la demande frais compris, sans signe, comme le prototype ; recommandé).
```

## Brouillon — commentaire pour #94 (D21 Afficher l'accueil cliente)

```markdown
## Design validé (lot D, 21 octobre 2026)

Le lot D (retraits) a été validé le 21 octobre 2026. Il change l'entrée « Retirer », la raison de « Retirer » désactivé et la **carte solde** pendant un retrait en attente.

- Prototype (planche « D · Raccords » ; A · H01, 6e et 7e téléphones ; parcours D-P2′, D-P4) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (§ Raccords vers les autres lots ; `BalanceCard` « Retrait en attente » ; `Shortcuts`) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md
- Gherkin (D-P1-S2 à S4 ; D-P2-S6, S7 ; D-P4-S3 à S7) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-d.md

### Critères d'acceptation ajoutés

- [ ] Le raccourci « Retirer » ouvre la feuille « Comment tu veux retirer ? » quand le solde disponible est > 0 ; la fermer ramène à l'accueil ; un double appui n'ouvre qu'une feuille (D-P1-S2 à S4).
- [ ] Solde à 0 : « Retirer » désactivé avec **« Ton argent est dans tes épargnes. »** si une épargne active a de l'argent (PNV-2 validée), sinon « Rien à retirer pour l'instant. » (D-P2-S6, S7).
- [ ] Dès l'envoi d'un retrait, le solde disponible baisse du montant pris ; tant qu'un retrait est en attente, la ligne du bas de la carte affiche **« Retrait en attente · − {montant pris} »** (ambre + horloge) à la place de « Dernier dépôt », et ouvre ce retrait (D-P4-S3, S4).
- [ ] La carte revient à « Dernier dépôt » dès que le retrait est fait ou échoué ; la ligne est masquée avec le reste (« ••• F », « Montant masqué ») (D-P4-S5 à S7).
- [ ] Les Dernières opérations montrent la ligne « Retrait {opérateur} » (montant pris, « − » seulement si fait) (D-P1-S1, D-P4-S3).

### Écarts

- **Évolution de la règle du lot B** (« Dernier dépôt » pour les dépôts seulement) validée par le PO le 20 octobre 2026 pour un retrait en attente : à reporter dans DESIGN.md § Carte solde et au `BalanceCard` du Design System (prop à ajouter).
- Le paramètre G01 « calcul du solde disponible avec une opération en attente » est tranché en principe pour le retrait (il baisse dès l'envoi) ; le calcul exact reste à confirmer.
- À confirmer PO : deux retraits en attente (une ligne avec la somme qui ouvre le premier, comme le prototype, recommandé).
```

## Brouillon — commentaire pour #72 (D11 Réaliser un cash-out auprès d'une agente)

```markdown
## Raccord du lot D (21 octobre 2026)

Le lot D (retraits Mobile Money) a été validé le 21 octobre 2026. Il ne dessine **que l'entrée côté cliente** du retrait en espèces ; le parcours de cette issue reste au **lot E**.

- Prototype (parcours D-P9) : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Handoff (D-06) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md
- Gherkin (D-P9-S1 à S4, implémentés dans #68) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-d.md

### Ce que le lot D fixe

- « Retirer » → feuille « Comment tu veux retirer ? » → « Auprès d'une agente » → écran « Montre Mon QR à une agente » : « 1 L'agente scanne ton QR. », « 2 Tu vérifies et tu confirmes dans KOTIZ. », « 3 L'agente te donne tes espèces. », « Ne donne jamais ton PIN à l'agente. », « Rien ne sort avant ta confirmation. », bouton « Afficher Mon QR ».
- Ces textes engagent le lot E : la cliente **vérifie et confirme dans KOTIZ** (avec son PIN, jamais vu par l'agente) avant toute remise.

### Pour le lot E (non spécifié ici)

- Scan, montant, autorisation par la cliente, remise des espèces, « Espèces reçues », codes sans smartphone (G02), retrait Mobile Money **assisté** préparé par une agente (PRD 30b, décision PO Q6).
- Aucun critère d'acceptation ajouté à cette issue par le lot D.
```

## Brouillon — commentaire pour #59 (D02 Fournir le socle UI accessible)

```markdown
## Design validé (lot D, 21 octobre 2026)

Le lot D a été validé le 21 octobre 2026. Il réutilise le socle des lots A à C et ajoute des variantes, construites dans le canvas en attendant leur promotion dans le Design System.

- Prototype (page « Lot D — Retraits ») : https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF
- Design System KOTIZ v12 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (§ Composants, § Tokens) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-d.md

### Critères d'acceptation ajoutés

- [ ] `TransactionRow` variante `withdrawal` : « Retrait {opérateur} », « Vers {numéro abrégé} », montant pris, « − » seulement si fait, pastille Retirer / horloge / croix ; un retrait fait n'a jamais la pastille d'échec (D-P8-S1, S2).
- [ ] `SummaryFlow` : nœud d'arrivée « Vers ton numéro » (logo, numéro entier, opérateur) et ligne « Pris sur ton solde » sous le montant dominant, seulement avec des frais confirmés.
- [ ] `BalanceCard` : ligne « Retrait en attente · − {montant} » (ambre + horloge), prioritaire sur « Dernier dépôt », masquable, qui ouvre le retrait.
- [ ] `AmountField` : **toute la ligne du montant** ouvre le clavier (cible ≥ 48 sur toute la largeur), pour D-02 et C-02 (D-P1-S11).
- [ ] `PinPad` : état désactivé (grisé, touches annoncées désactivées) pendant l'envoi (D-P1-S22).
- [ ] `StepTracker` : l'étape envoyée utilise `sent` « Envoyée », jamais `done` sur une attente.
- [ ] Pictogramme portefeuille neutre pour « Mon solde » dans les flux d'un retrait, en attendant l'illustration du Design System.

### Écarts

- Hors DS v12 : toutes ces variantes. Aucun token nouveau ; valeurs en dur à rattacher listées dans le handoff (pastille portefeuille 40 / 24, logo 32 × 24, opacité du pavé désactivé).
```
