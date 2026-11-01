# Handoff — Refonte des parcours, lot D : retraits Mobile Money (React Native / Expo + backend Spring Boot)

Date : 21 octobre 2026. Statut : lot D validé par le PO et sa conjointe le 21 octobre 2026, après la critique (15 corrections appliquées) et le test de [test-lot-d.md](test-lot-d.md), sans remarque.

- Maquettes et prototype : [screens-lot-d.md](screens-lot-d.md) · canvas [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), page « Lot D — Retraits », **version 31** (`1792590345-9ff9`, statut « Validé ») ; dernières modifications d'écrans en version 27 (`1792536289-ee61`). Composant d'écrans `D-Proto.dc.html` ; contenu retrait des écrans C-11 à C-15 dans `C-Proto.dc.html` ; prototype `Main.dc.html` (menu D-00, D-P1 à D-P9, D-P2′, D-P2″, D-P3′, D-P3″, D-P4′, D-P4″, D-P4‴, D-P7′). Il fait foi pour la composition et les textes.
- Design system : [DESIGN.md](../../../DESIGN.md) (racine) · [KOTIZ Design System v12](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) (non modifié par le lot D ; composants `Kotiz.*`, `components/index.d.ts`, illustrations `Actions/mobile-money.svg` et `Actions/agente.svg`, logos `Operateurs/`).
- Parcours, écrans, états : [ux-spec-lot-d.md](ux-spec-lot-d.md) (fait foi pour le comportement ; le canvas fait foi pour les textes quand ils diffèrent, voir Points ouverts). Corrections : [critique-lot-d.md](critique-lot-d.md). Test : [test-lot-d.md](test-lot-d.md).
- Socle commun (tokens, composants, masquage, formats, résultat plein écran, `TransactionRow`, Opérations / détail / reçu / signalement) : [handoff-lot-a.md](handoff-lot-a.md), [handoff-lot-b.md](handoff-lot-b.md), [handoff-lot-c.md](handoff-lot-c.md). Ce document ne répète que ce qui change ou s'ajoute.
- Scénarios d'acceptation : [gherkin-lot-d.md](gherkin-lot-d.md) (IDs `D-Pn-Sm`, 126 scénarios). Rattachement aux issues : [issues-lot-d.md](issues-lot-d.md).
- Cible : app mobile React Native + Expo SDK 54, **variant `client`** seulement (ADR-009, ADR-010, ADR-019). Backend Java 21 / Spring Boot 3, hexagonal (ADR-011) : contextes **Payments** (ordre de retrait vers le Mobile Money, confirmation du partenaire, idempotence), **Savings** (solde disponible, montant engagé, écritures ledger), **IAM** (PIN KOTIZ), **Assistance** (signalement, ADR-0020), **Notifications** (lot F).

Rappel : « D-01 » (avec tiret) est un **écran** ; « D07 » est le code de l'issue [kotiz-ci/platform#68](https://github.com/kotiz-ci/platform/issues/68). Une issue est toujours citée avec son numéro.

Conventions (reprises des lots A à C) :

- **« à confirmer (Gxx) »** : paramètre non tranché, lu dans une configuration, jamais écrit en dur ni annoncé dans l'interface. G01 = partenaire et juridique, G02 = sécurité et SMS, G03 = assistance.
- **« à dessiner »** : comportement de la spec sans état dessiné ; le texte exact viendra des maquettes (voir Points ouverts).
- **Frais du retrait : non confirmés (G01).** Le prototype affiche des frais fictifs, annoncés dans sa bande hors produit : **ce ne sont pas des valeurs produit, aucune n'est reprise ici.** Règle produit : **frais à confirmer, autorisation bloquée tant qu'ils sont inconnus.** Quand un frais est confirmé, il est lu dans la configuration du partenaire et renvoyé par le serveur avec le récapitulatif ; jamais calculé par l'app à partir d'un taux supposé.
- **Valeurs de démonstration du prototype, qui ne sont pas des règles** : numéro 07 08 12 34 56, solde 12 400 FCFA, épargnes École Awa et Boutique, opérateurs Wave et Orange Money, montants 5 000 / 5 050 / 7 350 / 12 277, références « KTZ-2610-… (fictive) », dossier « 2610-… (fictif) », heure « 14:32 », date du jour figée au 19 octobre 2026, PIN 2468, blocage au 3e PIN faux, motifs « Motif A / B (à confirmer) ». Aucune ne doit être reprise dans le code, les tests ou les textes.
- Dans ce document, `{montant reçu}` = ce que Fatou tape et reçoit sur son Mobile Money ; `{montant pris}` = `{montant reçu}` + `{frais}`, **renvoyé par le serveur** ; `{opérateur}` = Wave, Orange Money… ; `{numéro}` = numéro vérifié, en entier.

## Points ouverts

**Critique** ([critique-lot-d.md](critique-lot-d.md)) : les 2 corrections **Bloquant** (n° 1 rappel du PIN, n° 2 récapitulatif refusé) sont corrigées (canvas version 26) et validées. Aucune correction ouverte dans le lot D. Deux reports hors canvas : n° 11 pour C-02 (lot C) et n° 14 (illustration « Mon solde » neutre, Design System) ; voir [issues-lot-d.md](issues-lot-d.md) § Reports vers d'autres lots.

**Décisions PO à respecter** (20 et 21 octobre 2026)

1. **PIN KOTIZ obligatoire** pour un retrait (l'argent sort de KOTIZ) ; **aucun PIN ni code opérateur** n'est jamais demandé.
2. **Numéro vérifié seul**, visible et non modifiable (D-01 à D-05, C-12, C-13) ; un autre numéro est une évolution post-MVP : aucun champ, bouton ni lien.
3. **Retrait depuis le solde disponible uniquement.** Pour une épargne : retour au solde du lot B d'abord (avec son propre PIN), puis un retrait distinct ; jamais d'enchaînement automatique ni de retrait direct depuis une épargne.
4. « Retirer » ouvre la feuille **D-00 « Comment tu veux retirer ? »**, puis des pages.
5. **Opérateur d'abord, puis montant** (D-01 → D-02), comme le dépôt.
6. **Fatou tape le montant qu'elle reçoit** ; les frais (s'ils sont confirmés) **s'ajoutent** à ce qui est pris sur son solde. **« Tout mon solde » = maximum calculé par le serveur**, jamais par l'app.
7. **Frais non confirmés (G01)** : voir Conventions. En production, tant que G01 n'est pas levé, D-03 est dans l'état « frais inconnus » et aucun retrait ne part.
8. Récapitulatif : « Tu reçois sur ton {opérateur} » (montant dominant), « Pris sur ton solde », « Frais », « Ton solde après ».
9. **Refus par une règle avant le PIN** (D-03) ; **échec technique après le PIN** (D-05).
10. **Le solde disponible baisse dès l'envoi** du retrait (Q4) ; un **second retrait** pendant une attente est une **nouvelle demande** distincte, dans la limite du disponible (Q2).
11. **Opérations = montant pris sur le solde** (ligne, détail, signalement) ; le détail ajoute « Tu as reçu {montant reçu} » ; D-05 et le reçu mettent en avant le montant reçu.
12. **Carte solde** : « Retrait en attente · − {montant pris} » (ambre + horloge) à la place de « Dernier dépôt » tant qu'un retrait est en attente ; retour à « Dernier dépôt » quand il est fait ou échoué (évolution de la règle du lot B).
13. Sur D-05 Fait, bouton texte **« Tu ne vois pas l'argent sur ton {opérateur} ? »** → D-07 → signalement (Q5) ; jamais de « refais le retrait ».
14. **Résultats en plein écran**, jamais de pop-up ; D-05 Fait sans illustration (Q8).
15. **PNV-2 validée** : A · H01, solde à 0 et une épargne avec de l'argent → « Retirer » désactivé avec « Ton argent est dans tes épargnes. ». **PNV-1 refusée** après test (pas de « Retirer maintenant » sur B · B12). **PNV-3 refusée** (pas de « Refaire ce retrait » sur un détail échoué).
16. Retrait en espèces et retrait Mobile Money assisté : **lot E** (D-06 n'est qu'une explication) ; PIN oublié, aide, notifications : **lot F**.

**Écarts entre la spec et le canvas validé** (le canvas fait foi ; à reporter dans `ux-spec-lot-d.md` par la session qui la tient)

| Écran                            | Spec                                                                                     | Canvas validé (fait foi)                                                                                                                                                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-01 aucun opérateur             | `Message` + lien « Retirer auprès d'une agente › »                                       | `Message` info « Le retrait Mobile Money n'est pas possible pour l'instant. » + **bouton principal** « Retirer auprès d'une agente » dans la zone d'action                                                                                                                                              |
| D-01 hors connexion              | Raison « Pas de connexion. »                                                             | `Message` « Mis à jour à {HH:MM} · hors connexion », raison « Retirer demande la connexion. Réessaie quand tu captes. » + bouton texte « Réessayer »                                                                                                                                                    |
| D-02 argent dans une épargne     | `InfoLine` « Ton argent d'épargne doit revenir sur ton solde. Remettre sur mon solde › » | Phrase « Le reste est dans tes épargnes. » sous la puce + **bouton texte** « Remettre sur mon solde » sous Continuer (pas d'ⓘ)                                                                                                                                                                          |
| D-02 au-delà du compte           | `Message` info + lien « Vérifier mon identité › »                                        | Aide en erreur « Ce montant dépasse ce que ton compte permet. », champ en erreur, pas de `Message` ; « Ton identité est en vérification. » (même règle que C-02 : ou lien « Vérifier mon identité › » si l'identité reste à vérifier)                                                                   |
| D-02 Tout mon solde              | Aide inchangée                                                                           | Aide « {montant reçu max} + {frais} de frais : tout ton solde. » quand la puce est choisie (le prototype ajoute « (fictifs) »)                                                                                                                                                                          |
| D-02 en attente                  | « 5 000 F sont en attente de retrait. »                                                  | « {montant pris} sont en attente de retrait. » (somme des retraits en attente, frais compris)                                                                                                                                                                                                           |
| D-03 nominal                     | Trois lignes Tu reçois / Frais / Pris sur ton solde ; trois phrases                      | Montant dominant « Tu reçois sur ton {opérateur} », **« Pris sur ton solde : {montant pris} »** dessous (16 Semi Bold) ; lignes « Frais », « Ton solde après » ; deux phrases : « L'argent sort : tu confirmes avec ton PIN KOTIZ. » (Semi Bold) / « KOTIZ ne te demande jamais ton code {opérateur}. » |
| D-03 frais inconnus              | « Les frais ne sont pas encore connus. » ; Continuer désactivé + raison                  | `Message` info titre « On ne connaît pas les frais. », texte « Réessaie plus tard. » ; montant reçu et flux seulement ; ni phrases PIN ni Continuer ; **principal « Revenir à l'accueil »**                                                                                                             |
| D-03 refusé                      | `Message` + Continuer désactivé + lien « Contacter l'aide › »                            | `Message` erreur titre « Ce retrait n'est pas possible pour l'instant. », texte « Ton argent n'a pas bougé. » ; montant et flux seulement, sans « Modifier » ; principal « Revenir à l'accueil », bouton texte « Contacter l'aide »                                                                     |
| D-03 opérateur indisponible      | `Message` « Wave est indisponible pour l'instant. »                                      | `Message` info titre « {opérateur} est indisponible pour l'instant. », texte « Ton montant est gardé. » ; principal « Choisir un autre Mobile Money »                                                                                                                                                   |
| D-04 rappel                      | « Tu reçois 5 000 F sur ton Wave » + numéro + « Pris sur ton solde »                     | Deux lignes étiquette : valeur, **« Pris sur ton solde : {montant pris} »** d'abord, puis « Tu reçois : {montant reçu} sur ton {opérateur} · {numéro} »                                                                                                                                                 |
| D-04 PIN bloqué / hors connexion | Message avec « ton argent n'a pas bougé »                                                | Aucun montant ; « Rien n'a été pris sur ton solde. » (Semi Bold) sous le titre ; bloqué : `Message` erreur « Trop d'essais. » / « Ton retrait n'est pas envoyé. » ; hors connexion : `Message` info « Pas de connexion. » / « Rien n'a été envoyé. Réessaie quand tu captes. »                          |
| D-04 PIN incorrect / envoi       | Deux messages empilés                                                                    | Incorrect : un seul `Message` erreur « PIN incorrect. Réessaie. » avant le rappel, consigne en texte simple sous les cases. Envoi : cases pleines, `Message` chargement « Envoi… » à la place de la consigne, pavé grisé et désactivé, « PIN oublié ? » masqué                                          |
| D-05                             | Lignes Frais / Pris sur ton solde ; en attente : ligne « Ton solde »                     | « Pris sur ton solde : {montant pris} » **sous le montant** (fait, en attente, on vérifie) ; lignes Vers, Frais, Ton solde (fait seulement), Référence                                                                                                                                                  |
| D-05 On vérifie                  | Pas de sous-titre                                                                        | Sous-titre « La connexion a coupé. On regarde où il en est. », pas d'étapes                                                                                                                                                                                                                             |
| D-05 Échoué                      | « Ton argent n'a pas quitté KOTIZ » si G01                                               | Sous le montant « Rien n'est arrivé sur ton {opérateur}. » (Semi Bold), pas de « Pris sur ton solde » ni de Frais ; ligne « Ton solde » ; annonce `assertive` ; refus de l'opérateur : bouton texte « Choisir un autre Mobile Money » (→ D-01, montant gardé)                                           |
| D-07                             | Lien « Contacter l'aide › » dans le contenu ; un seul jeu de boutons                     | Aucun lien dans le contenu. Depuis Fait : principal « Signaler un problème », boutons texte « Revenir » et « Contacter l'aide ». Depuis En attente : principal « Revenir », bouton texte « Signaler un problème »                                                                                       |
| C-11 / C-12                      | « − 5 000 F » (montant reçu)                                                             | Montant **pris sur le solde** (« − {montant pris} » si fait) ; C-12 ajoute « Tu as reçu {montant reçu} » (fait) ; en attente « {montant reçu} pas encore sur ton {opérateur}. » ; échoué « Rien n'est arrivé sur ton {opérateur}. » + raison                                                            |
| C-13                             | Montant reçu sans étiquette                                                              | « Tu as reçu » au-dessus du montant reçu ; ligne « Pris sur ton solde »                                                                                                                                                                                                                                 |

**États « à dessiner »** (comportement spécifié, texte exact à venir des maquettes ; scénarios `@a-dessiner`)

- D-02 **hors connexion, « Tout mon solde »** : le maximum vient du serveur, donc la puce est désactivée avec une raison (le prototype la laisse active et calcule sur le solde en cache) ; texte proposé « Tout mon solde demande la connexion. » (D-P7-S3).
- D-02 **chargement du maximum** (> 1 s) : puce en « Un instant… » (D-P1-S14).
- D-02 **minimum ou maximum par retrait** de l'opérateur ou du partenaire : raison sous le champ, texte et valeurs à confirmer (G01) (D-P3-S9).

**Petites incohérences du prototype à ne pas reproduire**

- `StepTracker` de D-05 et de C-12 en attente : l'étape « Demande envoyée » est construite avec `status: 'done'` et le mot « Envoyée ». **À coder avec `status: 'sent'`** (règle du lot B : jamais `done` sur un écran d'attente).
- D-02 « Remettre sur mon solde » ouvre **B · B07** quand une seule épargne a de l'argent, **B · B01** sinon. La décision PO de la spec écarte « B07 direct » : **à coder vers B · B01 dans tous les cas**, sauf confirmation contraire du PO (voir Questions).
- Le prototype calcule lui-même des frais fictifs et le maximum de « Tout mon solde » : **ne pas reproduire**. Les frais sont lus dans la configuration du partenaire et le maximum est calculé par le serveur.
- PIN bloqué au 3e essai faux, accueil du lot D qui ne montre pas le retour au solde fait dans le lot B (données séparées), bande « Quitter et rouvrir » : prototype seulement.

**Avant de coder**

1. **Prérequis** : tokens ([kotiz-ci/platform#96](https://github.com/kotiz-ci/platform/issues/96)), socle UI ([kotiz-ci/platform#59](https://github.com/kotiz-ci/platform/issues/59)), accueil ([kotiz-ci/platform#94](https://github.com/kotiz-ci/platform/issues/94)), cycle de vie ([kotiz-ci/platform#67](https://github.com/kotiz-ci/platform/issues/67)), Opérations ([kotiz-ci/platform#99](https://github.com/kotiz-ci/platform/issues/99)), retour au solde ([kotiz-ci/platform#97](https://github.com/kotiz-ci/platform/issues/97), pour D-P2), PIN KOTIZ du lot A (création et vérification).
2. **Gate G01** : sans frais confirmés, le retrait ne peut pas être démontré de bout en bout hors sandbox. En sandbox, les frais sont une valeur de configuration de test, nommée comme telle, jamais un défaut du code.
3. **Vocabulaire** (`domain-modeling`, avant le code de #68 et #67) — termes **absents ou contradictoires** dans le [glossaire DDD](../../architecture/ddd-context-map-glossaire.md) v1.1 :
   - **« Montant engagé »** (sortie envoyée, pas encore confirmée par l'opérateur). Le glossaire dit du solde disponible « seul le confirmé y compte », alors que la décision Q4 retire un retrait en attente du disponible dès l'envoi. À nommer (proposition : `engagedAmount`, réservation sur `SavingsAccount`), jamais affiché sous ce mot à Fatou : disponible = confirmé − engagé.
   - **`Withdrawal` « fait = transfert confirmé par l'opérateur »** : le glossaire dit seulement « sortie d'argent hors de KOTIZ, autorisée par le PIN ». À préciser : un PIN accepté ne fait pas un retrait fait ; statuts envoyé (en attente), inconnu (« on vérifie »), fait, échoué (technique, refus de l'opérateur) ; lien éventuel avec une `Correction` (refus après débit).
   - **Montant reçu, montant pris sur le solde, frais de retrait** : aucun terme pour les frais ni pour les deux montants d'une sortie. Événement d'échec absent (`WithdrawalMade` seul).
   - **Maximum retirable** (« Tout mon solde ») : calcul serveur, à nommer.
   - **Ordre de retrait** dans Payments : `PaymentOrder` ne dit pas le sens (collecte d'un dépôt ou versement vers la cliente).
   - **Numéro vérifié** : utilisé par les lots C et D, absent du glossaire (IAM ?).
4. **Contrat d'API à écrire** : aucun champ n'existe. Nommer les données par leur sens métier et les termes du glossaire (`Withdrawal`, `PaymentOrder`, `IdempotencyKey`, `PaymentCallback`, `PaymentProvider`, `SavingsAccount`, `availableBalance`, `Money`, `IssueReport`), complétés après le point 3.

**Questions encore ouvertes sur le comportement** (aucune ne change la composition validée)

- G01 : liste et ordre des opérateurs **pour le numéro vérifié** ; **modèle de frais réel** (le design suppose des frais ajoutés au montant reçu : si le partenaire les retient sur le montant, D-02 et D-03 changent) ; minimum et maximum par retrait ; plafonds du niveau d'accès limité ; moment du débit (à l'envoi ou à la confirmation) et calcul exact du disponible avec un retrait en attente ; un « échec confirmé » garantit-il que l'argent n'a pas quitté KOTIZ (sinon aucune phrase de ce type) ; refus de l'opérateur **après** un débit : même opération « Échoué » (recommandé) ou correction liée ; l'opérateur exige-t-il une action de la cliente pour recevoir (non attendu) ; référence de l'opérateur et mentions légales du reçu ; vérification du numéro qui peut expirer ou être suspendue (refus de D-03).
- G02 : longueur du PIN, nombre d'essais, durée et déblocage (jamais affichés) ; blocage de la capture d'écran sur D-04 ; SMS de confirmation d'un retrait (lot F).
- G03 : motif de signalement « l'argent n'est pas arrivé sur mon Mobile Money » (à proposer, jamais inscrit d'office) ; contact derrière « Contacter l'aide » ; texte de D-07 propre à chaque opérateur.
- Technique : `<délai de confirmation>` au-delà duquel le résultat devient « On vérifie » ; interrogation du statut au retour dans l'app ; cache hors ligne du disponible.
- PO : (1) D-02 « Remettre sur mon solde » avec une seule épargne pleine → B · B01 (décision de la spec) ou B · B07 (prototype) ; (2) carte solde avec **deux retraits en attente** : le prototype affiche une ligne « Retrait en attente · − {somme} » qui ouvre le premier ; garder (recommandé) ou ouvrir Opérations filtrées ; (3) montant d'un retrait **échoué** dans Opérations : le prototype montre le montant de la demande frais compris, sans signe, en gris (rien n'a été pris) ; garder (recommandé, cohérent avec la ligne en attente) ou montrer le montant reçu.

## Tokens

Aucun token nouveau : le lot D utilise ceux du [handoff du lot A § Tokens](handoff-lot-a.md#tokens) (noms cibles `@kotiz/design-tokens`). Usages propres au lot D :

| DESIGN.md                                                            | Code (cible)                                        | Usage lot D                                                                                                                                                                                  |
| -------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typography.amount` (34 / 42 / 700, tabulaires)                      | `typography.amount`                                 | Saisie (D-02), « Tu reçois sur ton {opérateur} » (D-03), montant reçu du résultat (D-05) et du reçu (C-13), montant pris du détail (C-12)                                                    |
| `typography.title`                                                   | `typography.title`                                  | Titres d'écran, de résultat et de feuille (D-00, D-07)                                                                                                                                       |
| `typography.label` (16 Semi Bold)                                    | `typography.label`                                  | Lignes de choix (D-00, D-01), « Pris sur ton solde : … » (D-03, D-05)                                                                                                                        |
| `typography.body` Semi Bold                                          | `typography.body` + `fontWeight 600`                | « L'argent sort : tu confirmes avec ton PIN KOTIZ. », « Rien n'a été pris sur ton solde. », « Rien n'est arrivé sur ton {opérateur}. », « Ne refais pas le retrait. », valeurs du rappel PIN |
| `colors.surface-pending` / `text-pending` + horloge                  | `palette.surfacePending` / `palette.textPending`    | Retrait en attente et « On vérifie » (D-05, C-11, C-12), `Message` « … sont en attente de retrait. » (D-02), ligne « Retrait en attente » de la carte solde (A · H01)                        |
| `colors.surface-error` / `text-danger` + croix                       | `palette.surfaceError` / `palette.textDanger`       | D-05 Échoué, ligne et détail d'un retrait échoué, `Message` erreur (D-03 refusé, D-04 PIN incorrect et bloqué)                                                                               |
| `colors.surface-brand-subtle` + `border-focus` 2                     | `palette.surfaceBrandSubtle`, `palette.borderFocus` | Puce « Tout mon solde » sélectionnée (D-02), pastille du résultat fait (D-05)                                                                                                                |
| `colors.surface-canvas`                                              | `palette.surfaceCanvas`                             | Pastilles neutres de D-00, pastille du portefeuille « Mon solde » (D-02, D-03), pastille d'un retrait fait (C-11), étapes numérotées (D-06)                                                  |
| `colors.text-secondary`                                              | `palette.textSecondary`                             | Montant d'un retrait en attente ou échoué (C-11, C-12), étiquettes du rappel PIN, « Pas encore »                                                                                             |
| `colors.surface-information`                                         | `palette.surfaceInformation`                        | Messages info : frais inconnus, hors connexion, solde changé, opérateur indisponible, consigne « Ne le montre à personne… »                                                                  |
| `rounded.lg` (20)                                                    | `radii.lg`                                          | Carte `SummaryFlow` (D-03)                                                                                                                                                                   |
| `size.touchMin` (48) / `size.pastille` (64) / `size.pastilleLg` (80) | `size.*`                                            | Ligne du montant de D-02 (≥ 48 de haut, toute la ligne), lignes de choix ≥ 64 (D-00, D-01), icône de résultat 64 (D-05), pastille 80 de D-06                                                 |

**Valeurs en dur relevées dans le prototype** (à porter par des tokens existants ou à proposer au DS) : pastille du portefeuille 40 (D-03) et 24 (« Depuis : » de D-02) ; logo d'opérateur 32 × 24 dans la ligne « Vers » de D-05 et de D-02 ; opacité 0,4 du pavé pendant l'envoi (`ld-pad-off`) ; hauteur 24 de la pastille d'horloge de la carte solde. Aucune couleur nouvelle.

## Composants

Rien n'existe encore dans `apps/mobile/components/`. Les composants des lots A, B et C sont des prérequis ([handoff-lot-a.md](handoff-lot-a.md), [handoff-lot-b.md](handoff-lot-b.md), [handoff-lot-c.md](handoff-lot-c.md) § Composants). Règle commune : un composant affiche des valeurs fournies par l'écran (montants, frais confirmés, statuts, maximum retirable) ; il ne calcule ni frais ni résultat financier.

### Réutilisés tels quels (DS v12 et compositions validées du lot C)

`PageHeader` (`step` « Étape n sur 4 », sans `step` après un échec et sur PIN bloqué ; `backLabel="Fermer"` + croix sur D-05), `BottomSheet` (D-00, D-07 ; croix « Fermer » 48), ligne de choix / `OperatorRow` (lot C), `AmountField` (puce large « Tout mon solde », sans montants rapides), `SummaryFlow` (D-03), `PinSlots` + `PinPad` (composition de B · B11), `Message` (`info`, `error`, `loading`, `pending`), `StatusPill` (`done`, `pending`, `failed`), `StepTracker` (`sent` « Envoyée »), écran de résultat plein écran et zone d'action fixe (lot C), étapes numérotées (C-17), `IconPastille`, `TransactionRow` (lot C, variante `withdrawal` ci-dessous), `Receipt`, `CaseTimeline`, `Button` (`primary`, `secondary`, `text` ; `loading` « Un instant… »), `HomeHeader` / `BalanceCard` / `Shortcuts` (H01), `InfoLine`, logos `Operateurs/` (Wave symbole seul, Orange Money, MTN MoMo, Moov Money ; jamais recolorés), illustrations `Actions/mobile-money.svg` (même image que le dépôt, décision PO) et `Actions/agente.svg`, Retirer (`13:619`).

Précisions d'usage :

- **`SummaryFlow`** (D-03) : `lead` « Tu reçois sur ton {opérateur} », `amount` = montant reçu, `onEditAmount` (« Modifier », nommé « Modifier le montant ») ; sous le montant, **seulement si les frais sont confirmés**, « Pris sur ton solde : {montant pris} » ; nœud de départ « Depuis » / « Mon solde » (pastille portefeuille neutre) ; nœud d'arrivée (voir ci-dessous) ; `rows` : « Frais » {frais}, « Ton solde après » {disponible − montant pris} (retirée en masqué) ; flux nommé « De Mon solde vers ton {opérateur} {numéro} ».
- **`AmountField`** (D-02) : libellé lu « Montant que tu reçois » ; **toute la ligne du montant** (chiffres + « FCFA » + filet) ouvre le clavier (le `label` englobe le champ, cible ≥ 48 de haut sur toute la largeur ; correction n° 11 de la critique, à appliquer au composant pour C-02 aussi).
- **`StepTracker`** (D-05 et C-12 en attente) : `steps = [{ label: 'Demande envoyée', status: 'sent' }, { label: 'Envoi vers ton {opérateur}', status: 'pending' }, { label: 'Arrivée sur ton {opérateur}', status: 'todo' }]`, `label` « Où en est ton retrait ». Mots : « Envoyée », « En attente », « Pas encore ». Jamais `done` ni « Fait » pendant l'attente.
- **`BalanceCard`** : prop à ajouter, `pendingOut?: { amount, onOpen }` (voir ci-dessous) ; sinon `lastDeposit` comme au lot B.
- **`Shortcuts`** : « Retirer » `disabled` quand le solde disponible est à 0, avec `hint` « Ton argent est dans tes épargnes. » si une épargne active a un montant épargné > 0, sinon « Rien à retirer pour l'instant. ».

### Hors Design System (candidats `ld-` du canvas, à construire dans l'app, à promouvoir ensuite)

**`BalanceCard` ligne « mouvement en attente »** (décision PO du 20 octobre 2026) — tant qu'au moins un retrait est en attente, la ligne du bas de la carte (zone 48, même place que « Dernier dépôt ») devient « Retrait en attente » · « − {somme des montants pris en attente} » · pastille ambre + horloge (`surface-pending`, `text-pending`) ; elle ouvre C-12 du retrait en attente (le premier s'il y en a plusieurs, voir Questions). Retour à « Dernier dépôt » dès qu'aucun retrait n'est en attente. Masqué : « ••• F » lu « Montant masqué ». Le `BalanceCard` du DS ne sait afficher qu'un « + » : la variante est recomposée dans le canvas avec ses classes. Proposer `pendingOut?: { label: 'Retrait en attente', amount, onOpen }`, prioritaire sur `lastDeposit`.

**`SummaryFlow` nœud d'arrivée « Vers ton numéro »** — logo de l'opérateur (cadre 40 × 30) + « Vers ton numéro » (`flow-dir`) + « {numéro} · {opérateur} » (numéro tabulaire, jamais coupé) ; miroir du nœud de départ de C-03. Nœud de départ « Mon solde » avec le **pictogramme portefeuille neutre** (au trait, sans flèche, pastille `surface-canvas` 40 ; 24 dans la ligne « Depuis : » de D-02), en attendant l'illustration « Mon solde » neutre du DS (report n° 14).

**`TransactionRow` variante `withdrawal`** — titre « Retrait {opérateur} », sous-titre « Vers {numéro abrégé} » (« 07 08 … 56 »), montant = **montant pris sur le solde** ; fait : « − {montant pris} », pastille `surface-canvas` + illustration Retirer, « Fait » + coche ; en attente : montant sans signe en `text-secondary`, pastille horloge, « En attente » ambre ; échoué : montant sans signe en `text-secondary`, pastille `surface-error` + croix, « Échoué ». Un retrait fait n'a jamais la pastille d'échec.

**Rappel du PIN à deux lignes** (D-04) — liste clé : valeur, 14 Regular `text-secondary` pour l'étiquette, valeur en Semi Bold `text-primary` : « Pris sur ton solde : {montant pris} », puis « Tu reçois : {montant reçu} sur ton {opérateur} · {numéro} ». Absent sur PIN bloqué et hors connexion.

**Ligne « Vers ton numéro »** en lecture seule sous la liste d'opérateurs (D-01) : « Vers ton numéro » (`body` `text-secondary`) puis le numéro (Semi Bold, tabulaire). Ni lien, ni bouton, ni chevron.

**Ligne clé / valeur avec logo d'opérateur** (D-05 « Vers ») : logo 32 × 24 + nom, numéro dessous en `text-secondary`.

**`Message` en attente sous la ligne « Depuis »** (D-02) : usage nouveau du `Message` `pending` (ambre + horloge) pour dire pourquoi le disponible est réduit.

**Pavé désactivé pendant l'envoi** (D-04) : `PinPad` grisé, `accessibilityState.disabled` sur chaque touche, aucun appui pris en compte ; le DS n'a pas cet état.

| Élément                                             | Où                                                            | Statut                                                           | À faire                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Illustration « Mon solde » neutre                   | D-02, D-03 (et C-12, C-13 qui gardent l'illustration Déposer) | Absente du DS ; pictogramme portefeuille au trait dans le canvas | Demander au Design System (report n° 14) ; coder le pictogramme en attendant |
| Description d'une raison liée à un bouton désactivé | D-02 (Continuer)                                              | `Button` du DS ne la transmet pas (lots B et C)                  | `accessibilityHint` ou équivalent                                            |
| État `disabled` du `PinPad`                         | D-04 envoi                                                    | Absent du DS                                                     | Prop `disabled`                                                              |

## Écrans

Plateforme : Android d'abord ; largeurs 320 à 430 (contrôle à 320, 360, 390, 430) ; portrait seul. **Aucune barre basse dans le lot D** (sauf sur les racines A · H01 et C-11). Pages poussées avec `PageHeader`, ou feuilles. Clavier ouvert : champ actif et bouton principal visibles. Montants et numéros jamais coupés (espaces insécables, références avec tirets insécables).

Règles communes :

- **Étapes** : « Étape 1 sur 4 » (D-01 Moyen), « 2 sur 4 » (D-02 Montant), « 3 sur 4 » (D-03 Vérifier), « 4 sur 4 » (D-04 PIN). Les feuilles ne comptent pas. **Après un échec, Réessayer repart de D-03 sans compteur** (ni sur D-03 ni sur D-04), et D-01 atteint par « Choisir un autre Mobile Money » non plus.
- **D'où et vers où** lisibles de D-02 à D-05 : « Depuis : Mon solde » et « Vers : [logo] {opérateur} · {numéro} ».
- **Attente réseau** > 1 s : bouton en « Un instant… » (récapitulatif) ou « Envoi… » (PIN), « Modifier » masqué, double appui ignoré.
- **Retour Android** = `←` jusqu'à D-04 (PIN effacé) ; sur D-05 = Terminé (→ A · H01), jamais D-04 ni D-03.

### D-00 — Comment tu veux retirer ? (feuille)

- Structure : `BottomSheet` titre « Comment tu veux retirer ? », croix « Fermer » ; deux lignes de choix ≥ 64 (pastille neutre 64 + illustration 48, libellé 16 Semi Bold, chevron) : « Sur mon Mobile Money » (`mobile-money.svg`) → D-01 ; « Auprès d'une agente » (`agente.svg`) → D-06. Pas de bouton principal, pas de montant, pas de solde.
- États : nominal ; **aucun opérateur disponible** : « Sur mon Mobile Money » désactivé, raison « Mobile Money indisponible pour l'instant. », sans chevron ; « Auprès d'une agente » reste active ; hors ligne : la feuille s'ouvre, D-01 gère le réseau.
- Interactions : Fermer / retour Android → A · H01 (ou l'accueil d'où elle part), rien n'est perdu. Un double appui sur « Retirer » n'ouvre qu'une feuille ; « Retirer » désactivé ne l'ouvre pas.

### D-01 — Sur quel Mobile Money ? (étape 1 sur 4)

- Structure : `PageHeader` (←, « Étape 1 sur 4 ») ; titre « Sur quel Mobile Money ? » ; sous-titre « Depuis : Mon solde » ; liste des opérateurs **disponibles pour le numéro vérifié** (`OperatorRow`, ordre du partenaire, G01) ; sous la liste « Vers ton numéro » + numéro vérifié, **sans lien ni bouton**.
- Données : opérateurs (identifiant, nom, logo, disponibilité, raison), numéro vérifié, date de la dernière liste connue.
- Interactions : toucher un opérateur disponible → D-02 (pas de radio, pas de Continuer) ; ← → A · H01 (la feuille D-00 est refermée).
- États :
  - **Un seul opérateur** : la liste reste une liste, pas de saut automatique.
  - **Opérateur indisponible** : ligne désactivée, raison « {opérateur} est indisponible pour l'instant. ».
  - **Aucun opérateur** : `Message` info « Le retrait Mobile Money n'est pas possible pour l'instant. » ; bouton principal « Retirer auprès d'une agente » (→ D-06).
  - **Chargement** (premier affichage) : squelette de 2 lignes, annoncé « Chargement des Mobile Money ».
  - **Hors connexion** : `Message` info « Mis à jour à {HH:MM} · hors connexion » ; dernière liste connue, opérateurs désactivés sans chevron (logos non atténués) ; raison « Retirer demande la connexion. Réessaie quand tu captes. » ; bouton texte « Réessayer » (reconnecte et recharge la liste).
- Cas : logo manquant (nom seul, jamais le logo d'un autre opérateur) ; grand texte (le nom passe à la ligne).

### D-02 — Combien tu retires ? (étape 2 sur 4)

- Structure : `PageHeader` (←, « Étape 2 sur 4 ») ; titre « Combien tu retires ? » ; messages éventuels ; « Depuis : [portefeuille 24] **Mon solde** », puis sur sa ligne « {disponible} disponibles » ; `Message` en attente éventuel ; `AmountField` (« FCFA » 16, aide sous le filet) ; puce large « Tout mon solde » ; phrases éventuelles ; « Vers : [logo] **{opérateur}** · {numéro} » ; zone d'action : « Continuer » (+ bouton texte « Remettre sur mon solde » si l'argent est dans une épargne).
- `{disponible}` = solde disponible du serveur, **déjà réduit des retraits en attente** (montants pris).
- Aide / raison (sous le champ ; champ en erreur quand c'est une erreur) :
  - vide : « Écris un montant. » (Continuer désactivé) ;
  - 0 : « Le montant doit être plus grand que 0. » ;
  - saisi : « Tu reçois ce montant sur ton {opérateur}. Les frais s'ajoutent. » ;
  - « Tout mon solde » choisi : « {montant reçu max} + {frais} de frais : tout ton solde. » ;
  - plus que ce que le solde permet (montant + frais > disponible, **contrôle serveur**) : « Tu peux recevoir au plus {montant reçu max}. » ; frais inconnus : « Tu as {disponible} disponibles. » ; Continuer désactivé ;
  - au-delà de ce que le compte permet (niveau d'accès, RM-ACC-03) : « Ce montant dépasse ce que ton compte permet. » + sous la puce « Ton identité est en vérification. » (vérification en cours) **ou** lien « Vérifier mon identité › » (identité à vérifier, → sous-lot A2), même règle que C-02 ; Continuer désactivé ; montant gardé ; **aucune limite chiffrée**.
- « Tout mon solde » : remplit le champ avec le **maximum retirable renvoyé par le serveur** (`{montant reçu max}`, disponible moins les frais) ; puce sélectionnée (vert doux + bordure 2, `accessibilityState.selected`) tant que la saisie ne change pas ; une saisie libre la désélectionne. Frais inconnus : la puce remplit le disponible, D-03 bloquera.
- États :
  - **Retrait en attente** (H5) : `Message` pending sous « Depuis » : « {somme des montants pris en attente} sont en attente de retrait. » ; un **dépôt** en attente : « Ton dépôt de {montant} n'est pas encore arrivé. » (spec ; il n'augmente pas le disponible).
  - **L'argent est dans une épargne** (montant trop grand et au moins une épargne active avec un montant épargné > 0) : sous la puce « Le reste est dans tes épargnes. » ; bouton texte « Remettre sur mon solde » sous Continuer → **B · B01** (liste des épargnes) ; le retrait en cours est abandonné (rien n'a été envoyé). Aucun montant d'épargne affiché.
  - **Solde changé** (retour de D-03) : `Message` info titre « Ton solde a changé. », texte « Tu as {disponible} disponibles. ».
  - **Hors connexion** : sous le disponible « Mis à jour à {HH:MM} · hors connexion » ; saisie possible ; Continuer → D-03, qui dit « Pas de connexion. » ; « Tout mon solde » désactivé (à dessiner).
  - Montant toujours visible, même masqué.
- Interactions : Continuer → D-03 ; ← → D-01 (opérateur gardé) ; retour depuis D-03 : montant gardé, puce resélectionnée s'il correspond au maximum.
- Cas : montant à 7 chiffres à 320 ; saisie de chiffres seulement (zéros de tête retirés, 9 chiffres au plus) ; minimum / maximum par retrait (raison, G01, à dessiner).

### D-03 — Vérifie ton retrait (étape 3 sur 4)

- Structure : `PageHeader` (←, « Étape 3 sur 4 », sans compteur après un échec) ; titre « Vérifie ton retrait » ; messages éventuels ; carte `SummaryFlow` (§ Composants) ; phrases « L'argent sort : tu confirmes avec ton PIN KOTIZ. » (Semi Bold) et « KOTIZ ne te demande jamais ton code {opérateur}. » ; bouton « Continuer ».
- `{montant pris}`, `{frais}` et le solde après sont **renvoyés par le serveur** (récapitulatif de la demande), jamais calculés par l'app. Le serveur refait le contrôle à l'ouverture et à la reprise après arrière-plan : frais, opérateur, règles du compte, disponible.
- États :
  - **Frais confirmés** : nominal.
  - **Calcul** (> 1 s) : squelette de deux lignes sous le flux, annoncé « Calcul des frais » ; Continuer en « Un instant… ».
  - **Frais inconnus** (état réel tant que G01 n'est pas levé) : `Message` info titre « On ne connaît pas les frais. », texte « Réessaie plus tard. » ; seulement « Tu reçois sur ton {opérateur} » + montant + « Modifier » et le flux ; ni « Pris sur ton solde », ni Frais, ni « Ton solde après », ni les phrases sur le PIN ; principal « Revenir à l'accueil » (→ A · H01) ; **rien n'est envoyé**, le serveur refuse de créer l'ordre.
  - **Refusé par une règle** (connu d'avance : niveau d'accès, compte restreint, plafond, vérification du numéro ; G01) : `Message` erreur titre « Ce retrait n'est pas possible pour l'instant. », texte « Ton argent n'a pas bougé. » ; montant et flux seulement, sans « Modifier » ; principal « Revenir à l'accueil », bouton texte « Contacter l'aide » (→ lot F) ; **aucune valeur chiffrée**, aucune demande créée.
  - **Opérateur devenu indisponible** : `Message` info titre « {opérateur} est indisponible pour l'instant. », texte « Ton montant est gardé. » ; principal « Choisir un autre Mobile Money » (→ D-01, montant gardé).
  - **Solde changé** : retour à D-02 avec « Ton solde a changé. ».
  - **Hors connexion** : `Message` info titre « Pas de connexion. », texte « Rien n'a été envoyé. » ; bouton « Réessayer » (recalcule le récapitulatif).
  - **Masqué** : tout reste visible sauf « Ton solde après ».
- Interactions : Continuer → D-04 ; « Modifier » et ← → D-02 (montant gardé). Pas de changement de numéro.
- Données envoyées à la création de la demande : opérateur, montant reçu, clé d'idempotence générée à l'entrée de D-03 (réutilisée par D-04 et par l'interrogation du statut).

### D-04 — Entre ton PIN (étape 4 sur 4)

- Structure (composition de B · B11) : `PageHeader` (←, « Étape 4 sur 4 ») ; titre « Entre ton PIN » ; rappel à deux lignes (§ Composants) ; `Message` info « Ne le montre à personne, même à une agente. » ; `PinSlots` (longueur lue en configuration, 4 à 6, G02) ; bouton texte « PIN oublié ? » (→ lot F) ; `PinPad`. La saisie complète du PIN envoie (pas de bouton).
- États :
  - **Saisie** : cases qui se remplissent, jamais un chiffre affiché.
  - **Envoi** : cases pleines, `Message` chargement « Envoi… » à la place de la consigne, pavé grisé et désactivé, « PIN oublié ? » masqué, ← inactif ; puis D-05.
  - **PIN incorrect** : `Message` erreur « PIN incorrect. Réessaie. » **en tête**, puis le rappel ; cases en erreur puis vidées ; consigne « Ne le montre à personne, même à une agente. » en texte simple sous les cases ; essais restants **seulement si la règle est confirmée (G02)**.
  - **PIN bloqué** (trop d'essais, ou déjà bloqué à l'arrivée) : titre « Ton PIN est bloqué », sans compteur ; « Rien n'a été pris sur ton solde. » (Semi Bold) ; `Message` erreur titre « Trop d'essais. », texte « Ton retrait n'est pas envoyé. » ; **aucun montant** ; cases et pavé retirés ; principal « Terminé » (→ A · H01), bouton texte « PIN oublié ? » ; ← → A · H01. Aucun nombre d'essais ni durée (G02).
  - **Hors connexion avant l'envoi** : PIN effacé ; « Rien n'a été pris sur ton solde. » ; `Message` info titre « Pas de connexion. », texte « Rien n'a été envoyé. Réessaie quand tu captes. » ; **aucun montant** ; pavé disponible pour réessayer.
  - **Connexion perdue après l'envoi** : D-05 « On vérifie ».
  - **Règle devenue bloquante** entre D-03 et l'envoi : D-05 Échoué (contrôle refait au moment du mouvement).
- Interactions : ← → D-03 (PIN effacé) ; Effacer.
- Sécurité : PIN jamais affiché, conservé ni journalisé ; envoyé seulement au serveur pour vérification ; capture d'écran bloquée (à confirmer, G02) ; cliente accompagnée : l'agente ne voit ni ne saisit le PIN.

### D-05 — Résultat du retrait

- Structure : écran de résultat plein écran du lot C : `PageHeader` avec seulement la croix « Fermer » ; bloc de statut en haut à gauche (icône 64, `StatusPill`, titre sans montant, sous-titre, montant reçu `amount` + « FCFA », puis « Pris sur ton solde : {montant pris} » ou « Rien n'est arrivé sur ton {opérateur}. »), annoncé `accessibilityLiveRegion="polite"` (fait, attente) ou `assertive` + rôle alerte (échec) ; détails dans le flux ; zone d'action fixe. Pas d'illustration.
- Lignes clé / valeur : « Vers » [logo] {opérateur} + numéro ; « Frais » (si confirmés ; pas sur un échec) ; « Ton solde » {disponible} (fait et échoué) ; « Référence ».
- États (statut · titre · sous-titre · contenu · principal · boutons texte) :
  - **Fait** (transfert confirmé par l'opérateur) : `done` « Fait » · « Ton argent est sur ton {opérateur}. » · « Depuis ton solde KOTIZ. » · — · « Terminé » (→ A · H01) · « Voir le reçu » (→ C-13), « Tu ne vois pas l'argent sur ton {opérateur} ? » (→ D-07).
  - **En attente** (envoyé, pas encore confirmé) : `pending` « En attente » · « Ton retrait est en attente. » · « {opérateur} n'a pas encore confirmé. » · `StepTracker` « Où en est ton retrait » ; « Ne refais pas le retrait. » (Semi Bold) ; « Tu le retrouves dans Opérations. » · « Terminé » · « Voir dans Opérations » (→ C-12), « Le retrait n'arrive pas ? » (→ D-07 depuis l'attente). **Pas de reçu.**
  - **On vérifie** (connexion perdue après l'envoi, `<délai de confirmation>` dépassé) : `pending` « En attente » · « On vérifie ton retrait. » · « La connexion a coupé. On regarde où il en est. » · « Ne refais pas le retrait. » ; « Tu le retrouves dans Opérations. » ; pas d'étapes · « Terminé » · « Voir dans Opérations », « Contacter l'aide ». **Aucun Réessayer.**
  - **Échoué, problème technique** (confirmé, après le PIN) : `failed` « Échoué » · « Ton retrait n'a pas marché. » · « Un problème technique l'a arrêté. » · « Rien n'est arrivé sur ton {opérateur}. » ; ligne « Ton solde » · « Réessayer » (→ D-03 relu, nouveau PIN, nouvelle demande) · « Terminé ».
  - **Échoué, refusé par l'opérateur** : même structure · sous-titre « {opérateur} a refusé le retrait. » (raison de l'opérateur seulement si elle est fournie, G01) · « Réessayer » · « Choisir un autre Mobile Money » (→ D-01, montant gardé, seulement si un autre opérateur est disponible), « Terminé ».
  - « Ton argent n'a pas quitté KOTIZ. » **n'est jamais affiché** tant que G01 ne le garantit pas ; la ligne « Ton solde » est un fait affiché, pas une garantie.
- Interactions : « Fermer », « Terminé » et retour Android → A · H01 ; la pile du retrait est vidée. Montants visibles même masqués.
- Statut : un SMS ou une notification de l'opérateur ne change **jamais** le statut affiché ; seul le statut KOTIZ (confirmation du partenaire) fait foi.

### D-06 — Retirer auprès d'une agente

- Structure (composition de C-17) : `PageHeader` (←, titre « Retirer auprès d'une agente ») ; pastille bleue 80 avec `agente.svg` 64 ; titre « Montre Mon QR à une agente » ; étapes numérotées « 1 L'agente scanne ton QR. », « 2 Tu vérifies et tu confirmes dans KOTIZ. », « 3 L'agente te donne tes espèces. » ; « Ne donne jamais ton PIN à l'agente. » (Semi Bold) ; « Rien ne sort avant ta confirmation. » ; principal « Afficher Mon QR » (→ A · Q01).
- ← → A · H01 avec D-00 rouverte. Aucun réseau requis ; aucun montant, statut, frais, délai ni liste d'agentes. Le parcours agente (scan, montant, autorisation, remise, « Espèces reçues », codes sans smartphone) est au lot E.

### D-07 — L'argent n'est pas sur ton {opérateur} ? (feuille)

- Structure : `BottomSheet`, croix « Fermer » ; titre « L'argent n'est pas sur ton {opérateur} ? » (depuis Fait) ou « Le retrait n'arrive pas ? » (depuis En attente) ; « Ouvre ton application {opérateur} et regarde ton solde. » ; « Le message de {opérateur} peut arriver plus tard. » ; « Ne refais pas le retrait. » (Semi Bold) ; « Retrait de {montant reçu} · {référence} » (`text-secondary`). Aucun lien dans le contenu, aucun délai.
- Boutons : **depuis Fait** : principal « Signaler un problème » (→ C-14 sur ce retrait, ou C-15 si un dossier existe), boutons texte « Revenir » (ferme) et « Contacter l'aide » (→ lot F) ; **depuis En attente** : principal « Revenir », bouton texte « Signaler un problème ».
- Retour Android = fermer. Contenu provisoire, propre à chaque opérateur (G01, G03). Le signalement ne crée aucun mouvement.

### Écrans du lot C, contenu retrait

Les écrans C-11 à C-15 du [handoff du lot C](handoff-lot-c.md) affichent les retraits sans nouvel écran. Ce qui est propre au retrait :

- **C-11** : ligne `TransactionRow` `withdrawal` (§ Composants) ; filtre « Retraits » (retraits Mobile Money, et au lot E retraits en espèces) ; filtre vide « Aucun retrait pour l'instant. ».
- **C-12** : titre « Retrait {opérateur} » + `MaskToggle` ; `StatusPill` du statut réel ; montant pris en `amount` + « FCFA » (« − » seulement si fait, sinon `text-secondary`) ; phrase sous le montant : en attente « {montant reçu} pas encore sur ton {opérateur}. », échoué « Rien n'est arrivé sur ton {opérateur}. » ; flux « Depuis · Mon solde » ↓ « Vers · {opérateur} {numéro} » ; lignes « Date », « Frais » (si confirmés, pas sur un échec), « Tu as reçu » {montant reçu} (fait seulement), « Référence », référence de l'opérateur si fournie (G01).
  - **Fait** : principal « Voir le reçu » ; bouton texte « Signaler un problème ».
  - **En attente / on vérifie** : `StepTracker` « Où en est ton retrait » ; « Le reçu sera prêt quand ce sera fait. » ; « Ne refais pas le retrait. » ; **aucun bouton principal**, aucun Réessayer ; bouton texte « Signaler un problème ».
  - **Échoué** : « Ton retrait n'a pas marché. » + raison (« Un problème technique l'a arrêté. » ou « {opérateur} a refusé le retrait. ») ; **aucun Réessayer ni « Refaire ce retrait »** (PNV-3 refusée : un nouveau retrait part de l'accueil) ; bouton texte « Signaler un problème ».
  - Dossier existant : ligne « Mon signalement · {statut} · Dossier n° {id} » (→ C-15) à la place de « Signaler un problème ». Correction confirmée liée : section « Lié à cette opération » (lot C), seulement si G01 impose une écriture distincte.
- **C-13** : seulement pour un retrait **fait** ; type « Retrait Mobile Money » ; « Tu as reçu » au-dessus du montant reçu ; « Depuis » Mon solde ; « Vers » {opérateur} + numéro entier ; « Date » ; « Pris sur ton solde » et « Frais » (si confirmés) ; « Référence » ; référence de l'opérateur (si fournie) ; « Cliente » {nom complet} ; pied : mentions légales du partenaire (G01). Pas de partage.
- **C-14** : rappel « Retrait {opérateur} · {montant pris} », « {date courte} · {référence} », statut ; motifs lus en configuration (G03) ; le reste comme au lot C.
- **C-15** : inchangé (message info « Ton signalement est envoyé. » / « Ce n'est pas un remboursement. »).

### Raccords vers les autres lots

- **A · H01** (et l'accueil de chaque lot) : raccourci « Retirer » → D-00 si le solde disponible est > 0 ; désactivé à 0 avec la raison « Ton argent est dans tes épargnes. » (une épargne active a de l'argent, PNV-2) ou « Rien à retirer pour l'instant. » ; carte solde « Retrait en attente » (§ Composants) ; « Dernières opérations » avec la ligne de retrait ; solde disponible réduit dès l'envoi d'un retrait.
- **B · B10** « Pour le sortir : Retirer. » et **B · B12** « Voir mon solde » puis « Retirer » : jamais d'enchaînement automatique (PNV-1 refusée).
- **D → B** : D-02 « Remettre sur mon solde » → B · B01 (voir Questions) ; le retour au solde (B09 à B12, avec PIN) reste celui du lot B.
- **D → C** : Opérations, « Voir dans Opérations », « Voir le reçu », « Signaler un problème » → C-11, C-12, C-13, C-14.
- **D → A** : D-06 « Afficher Mon QR » → A · Q01.
- **D → E / F** : retrait en espèces et retrait Mobile Money assisté (lot E, [#72](https://github.com/kotiz-ci/platform/issues/72)) ; « PIN oublié ? », « Contacter l'aide », notifications et SMS de confirmation (lot F) : « Bientôt ici » tant que le lot n'est pas livré.
- **Interruption** : app tuée ou mise en arrière-plan avant le PIN → au retour, D-03 recalculé (« Un instant… »), PIN jamais gardé ; après l'envoi → D-05 de la même demande, ou A · H01 avec la ligne « Retrait {opérateur} · En attente » qui mène à C-12. **Aucune nouvelle demande.**

## Règles transverses

### Statuts et vocabulaire

- « Fait » **seulement après la confirmation du transfert par l'opérateur** (RM-FUND-06) ; un PIN accepté ne fait pas un retrait fait : après l'envoi, « Envoyée » et « En attente ». « On vérifie » = résultat inconnu, signature ambre. « Échoué » = échec confirmé.
- Libellés : « Retirer » (bouton), « retrait » (titres, lignes), « Sur mon Mobile Money », « Auprès d'une agente », « Remettre sur mon solde » (lot B). Jamais « transfert », « envoyer de l'argent », « cash-out », « code {opérateur} » demandé par KOTIZ, « retrait » pour un mouvement interne, « remboursé » pour un dossier, ni de référence à la tontine.

### Frais (G01)

- Frais **lus dans la configuration du partenaire**, renvoyés par le serveur avec le récapitulatif (montant reçu, frais, montant pris, solde après, maximum retirable). **Frais inconnus = autorisation bloquée** : D-03 bloqué, le serveur refuse de créer l'ordre. Aucun taux, aucun frais par défaut dans le code.
- Affichage d'un frais confirmé : D-02 (aide de « Tout mon solde »), D-03 (« Pris sur ton solde », « Frais », « Ton solde après »), D-04 (« Pris sur ton solde »), D-05 (« Pris sur ton solde », « Frais »), C-12 (« Frais »), C-13 (« Pris sur ton solde », « Frais »). Sans frais confirmé, aucune de ces lignes.

### Montants, signes et soldes (H5, H8)

- **Solde disponible = confirmé − montant engagé** (Q4) : il baisse du montant pris **dès l'envoi** d'un retrait ; un retrait échoué rend le montant au disponible ; un retrait fait le débite définitivement. Un **dépôt** en attente n'augmente toujours pas le disponible (lot C). Calcul exact à confirmer (G01, `domain-modeling`).
- Montant pris = montant reçu + frais, toujours renvoyé par le serveur. « Tout mon solde » = maximum retirable du serveur.
- Signes vus depuis le solde (H01, C-11, C-12, carte solde) : « − » seulement pour un retrait **fait** ; en attente ou échoué, montant sans signe en `text-secondary` ; la carte solde dit « − {montant pris} » avec « Retrait en attente » et l'horloge.
- Montants affichés : Opérations, détail, signalement et carte solde = **montant pris** ; D-03 (montant dominant), D-05 et reçu = **montant reçu**, avec « Pris sur ton solde » à côté.

### Formats (PRODUCT.md)

- Montants entiers FCFA, espace insécable des milliers, « {n} FCFA » dans les montants dominants, « {n} F » dans les lignes ; `formatAmount` partagé. Backend : `Money` en centimes, jamais de `float`.
- Numéro : « 07 08 12 34 56 » (groupes de 2) en entier ; abrégé « 07 08 … 56 » dans une ligne de retrait seulement.
- Dates : comme au lot C (« 19 oct. 2026, 09:05 » au détail, « 19 oct. · 09:05 » en ligne). Espace insécable avant « ? », « ! » et « : ».

### Masquage

- Réglage unique des lots A à C. Masqués : carte solde (« Retrait en attente » compris), lignes d'Opérations, détail (montant, frais, « Tu as reçu »), reçu. **Toujours visibles** : D-02, D-03 (sauf « Ton solde après »), D-04, D-05, D-07, C-14.

### Navigation et pile

- D-01 à D-04 forment une pile ; après l'envoi, la pile est vidée : depuis D-05, Fermer, Terminé et retour Android → A · H01.
- D-00 et D-07 : feuilles, retour Android = fermer. D-06 ← → D-00 rouverte.
- Réessayer (D-05 échoué) → D-03 relu sans compteur ; « Choisir un autre Mobile Money » → D-01, montant gardé.

### Réseau, idempotence, concurrence

- Pas de file hors ligne : le retrait demande le réseau à partir du récapitulatif ; la saisie est gardée, rien n'est envoyé en silence.
- **Clé d'idempotence** générée à l'entrée de D-03, réutilisée par toute nouvelle tentative d'envoi de la **même** demande et par l'interrogation du statut. « Réessayer » après un échec **confirmé** = nouvelle demande, nouvelle clé, nouveau PIN. Résultat inconnu = « En attente » interrogeable, **jamais de Réessayer**.
- **Second retrait** pendant une attente = nouvelle demande distincte (montant et référence propres), dans la limite du disponible réduit ; jamais la répétition de la même (Q2).
- Au retour au premier plan ou au relancement, l'app interroge le statut de la demande en cours (même référence, même clé) ; aucune nouvelle demande.
- Le serveur fait foi pour : opérateurs disponibles, frais, maximum retirable, règles du compte (refus connu d'avance, sans valeur chiffrée), disponible, statut.

### Backend

- **IAM** — vérification du PIN KOTIZ (essais, blocage : G02) avant toute création d'ordre ; un PIN bloqué ne crée aucun ordre.
- **Payments** — ordre de retrait (`PaymentOrder`, sens versement) : **numéro vérifié de la cliente seulement**, opérateur disponible pour ce numéro, montant reçu, frais confirmés, `IdempotencyKey` unique ; confirmations du partenaire (`PaymentCallback`) idempotentes, y compris tardives ; un ACL par opérateur (`PaymentProvider`). Statuts : en attente, fait (transfert confirmé), échoué (technique), refusé par l'opérateur ; inconnu côté client tant que rien n'est confirmé. Refus de créer l'ordre si les frais sont inconnus, si l'opérateur est indisponible ou si une règle l'interdit (raison communicable, sans valeur chiffrée). Événements `PaymentInitiated`, `PaymentConfirmed`, `PaymentFailed`.
- **Savings** — à l'envoi, **montant engagé** = montant pris, exclu du disponible ; à la confirmation, écritures équilibrées (montant reçu vers le partenaire, frais selon la configuration) et `WithdrawalMade` ; à l'échec confirmé, engagement libéré, **aucune écriture de débit** (recommandé : pas de correction pour un retrait qui n'est jamais parti ; si le partenaire impose un débit puis un retour, correction liée au retrait d'origine, visible seulement confirmée). Montant > 0, montant pris ≤ disponible, contrôle refait au moment du mouvement. Maximum retirable calculé ici. Aucun retrait depuis une épargne.
- **Historique** (D26, [#99](https://github.com/kotiz-ci/platform/issues/99)) : un retrait = une ligne, montant pris, montant reçu et frais au détail, statut réel jamais promu ; reçu d'un retrait fait seulement.
- **Assistance** (ADR-0020, [#69](https://github.com/kotiz-ci/platform/issues/69)) : signalement d'un retrait comme d'un dépôt ; aucun mouvement d'argent.
- **Notifications** (lot F) : SMS de confirmation d'un retrait fait : hors lot D.

### Accessibilité

- Cibles ≥ 48 (lignes de choix ≥ 64, ligne du montant de D-02 sur toute sa largeur) ; texte essentiel ≥ 14 ; titre de chaque écran annoncé `header` ; résultat de D-05 en zone de statut (`polite`, `assertive` pour l'échec) ; erreurs `alert`.
- Noms accessibles : flux « De Mon solde vers ton {opérateur} {numéro} », « Modifier le montant », « Montant que tu reçois », « Fermer » des feuilles et du résultat, squelettes « Chargement des Mobile Money » et « Calcul des frais », « Montant masqué », œil de la carte « Masquer le solde » / « Afficher le solde ».
- Ligne désactivée : `accessibilityState.disabled` + raison lue ; raison d'un bouton désactivé reliée au bouton ; pavé du PIN désactivé pendant l'envoi.
- Statut jamais porté par la couleur seule ; logos et illustrations décoratifs (le nom est dans le texte).
- Grand texte : nom d'opérateur, lignes clé / valeur et rappel du PIN passent à la ligne, montant à 34 garde sa taille, numéro jamais coupé.

### Animations

- Apparition du résultat et changement d'état de D-05 : fondu ≤ 200 ms, sans célébration ; 0 ms en « réduire les animations ». Aucune animation de succès pendant une attente.

## Cas limites

- **Montants** : 7 chiffres à 320 ; montant exactement égal au maximum du serveur (accepté) ; disponible positif mais inférieur aux frais (maximum retirable à 0 : non dessiné, texte à confirmer avec le PO quand les frais seront connus) ; solde disponible à 0 parce qu'un retrait est en attente (« Retirer » désactivé, carte « Retrait en attente »).
- **Opérateurs** : aucun ; un seul ; logo manquant ; opérateur devenu indisponible entre D-01 et D-03 ; opérateur qui refuse après l'envoi.
- **Concurrence** : un dépôt arrive ou un autre retrait part entre D-02 et D-03 (« Ton solde a changé. ») ; deux retraits en attente (disponible réduit des deux, carte solde avec la somme) ; règle devenue bloquante après le PIN (D-05 Échoué).
- **Double soumission** : double appui sur Continuer, PIN complété deux fois, Réessayer touché deux fois : une seule demande par clé.
- **Interruption** : app en arrière-plan sur D-02 à D-04 → D-03 recalculé, PIN effacé ; app tuée après l'envoi → D-05 ou ligne « En attente » ; résultat arrivé app fermée → H01, carte solde et C-11 montrent le statut réel.
- **Hors ligne** : à chaque étape (rien envoyé, saisie gardée) ; perte de réseau après l'envoi (« On vérifie »).
- **Session expirée** pendant le parcours : retour à A · C01 ; une demande déjà envoyée n'est jamais renvoyée, son statut se lit après reconnexion.
- **PIN** : déjà bloqué à l'arrivée sur D-04 ; bloqué pendant la saisie ; PIN oublié (lot F).
- **« Fait » mais rien sur le Mobile Money** : D-07 puis signalement, jamais un nouveau retrait proposé ; SMS de l'opérateur reçu avant le résultat KOTIZ (ignoré).
- **Permissions** : aucune.

## Critères d'acceptation

Chaque groupe peut devenir un ticket ; le rattachement aux issues est dans [issues-lot-d.md](issues-lot-d.md), les scénarios dans [gherkin-lot-d.md](gherkin-lot-d.md).

### Socle lot D — composants

- [ ] `TransactionRow` a la variante `withdrawal` : « Retrait {opérateur} », « Vers {numéro abrégé} », montant pris, « − » seulement si fait, pastille Retirer / horloge / croix ; un retrait fait n'a jamais la pastille d'échec.
- [ ] `SummaryFlow` a le nœud d'arrivée « Vers ton numéro » (logo, numéro entier, opérateur) et la ligne « Pris sur ton solde » sous le montant dominant, affichée seulement avec des frais confirmés.
- [ ] `BalanceCard` affiche « Retrait en attente · − {montant} » (ambre + horloge) à la place de « Dernier dépôt » tant qu'un retrait est en attente, masquable, et ouvre ce retrait.
- [ ] `AmountField` : toute la ligne du montant ouvre le clavier (cible ≥ 48 sur toute la largeur), pour D-02 et C-02.
- [ ] `PinPad` a un état désactivé ; `StepTracker` utilise `sent` « Envoyée » pour la demande envoyée, jamais `done` sur une attente.
- [ ] Le pictogramme portefeuille neutre remplace l'illustration Déposer dans « Depuis : Mon solde » de D-02 et D-03.
- [ ] Aucun frais, taux, minimum, maximum, plafond, délai, nombre d'essais ni motif n'est écrit en dur.

### A · H01 — Entrée « Retirer » et carte solde

- [ ] « Retirer » ouvre la feuille « Comment tu veux retirer ? » quand le solde disponible est > 0.
- [ ] À 0, « Retirer » est désactivé avec « Ton argent est dans tes épargnes. » si une épargne a de l'argent, sinon « Rien à retirer pour l'instant. ».
- [ ] Après l'envoi d'un retrait, le solde disponible est réduit du montant pris et la carte affiche « Retrait en attente · − {montant pris} » ; elle revient à « Dernier dépôt » quand le retrait est fait ou échoué.
- [ ] Après un retrait fait, la ligne « Retrait {opérateur} · − {montant pris} · Fait » est en tête des Dernières opérations.

### D-00 et D-06 — Choisir comment retirer

- [ ] La feuille propose « Sur mon Mobile Money » et « Auprès d'une agente », sans bouton principal ni montant ; la fermer ramène à l'accueil.
- [ ] Sans opérateur, « Sur mon Mobile Money » est désactivé avec « Mobile Money indisponible pour l'instant. ».
- [ ] D-06 explique en trois étapes, n'affiche ni montant ni statut, « Afficher Mon QR » ouvre Mon QR ; son retour rouvre la feuille.

### D-01 à D-04 — Retirer sur mon Mobile Money

- [ ] « Étape 1 sur 4 » à « Étape 4 sur 4 » ; « Depuis : Mon solde » et « Vers : {opérateur} · {numéro} » lisibles de D-02 à D-04.
- [ ] D-01 liste les opérateurs disponibles pour le numéro vérifié, sans radio ni Continuer ; un seul reste une liste ; sans opérateur, bouton « Retirer auprès d'une agente » ; hors connexion, liste datée désactivée, raison et « Réessayer ».
- [ ] Le numéro vérifié est affiché en entier sur D-01 à D-05, C-12 et C-13, sans champ, bouton ni lien pour un autre numéro.
- [ ] D-02 : Continuer désactivé si vide, 0, au-delà du maximum du serveur ou du niveau d'accès, avec la raison ; « Tout mon solde » remplit le maximum du serveur et explique « + frais : tout ton solde » ; montant trop grand avec une épargne pleine : « Le reste est dans tes épargnes. » et « Remettre sur mon solde » ; retrait en attente : « {montant pris} sont en attente de retrait. ».
- [ ] D-03 montre « Tu reçois sur ton {opérateur} » + montant reçu, le flux vers le numéro vérifié et, **seulement si les frais sont confirmés**, « Pris sur ton solde », « Frais », « Ton solde après » et les deux phrases sur le PIN.
- [ ] **Frais inconnus** : « On ne connaît pas les frais. Réessaie plus tard. », aucune ligne de frais, aucun Continuer, « Revenir à l'accueil » ; aucune demande ; le serveur refuse l'ordre.
- [ ] Refus par une règle : message, montant et flux seulement, « Revenir à l'accueil » et « Contacter l'aide », aucun PIN proposé, aucune valeur chiffrée ; opérateur devenu indisponible : « Choisir un autre Mobile Money », montant gardé.
- [ ] D-04 demande le PIN KOTIZ avec le rappel « Pris sur ton solde » puis « Tu reçois » ; aucun écran ne demande le PIN ou le code de l'opérateur.
- [ ] PIN incorrect : erreur en tête, cases vidées, aucun nombre d'essais ; PIN bloqué : « Rien n'a été pris sur ton solde. », « Trop d'essais. », aucun montant, « Terminé » et « PIN oublié ? » ; hors connexion : « Rien n'a été pris sur ton solde. », PIN effacé.
- [ ] Pendant l'envoi, le pavé est désactivé et un second envoi est impossible ; un double appui ne crée qu'une demande.
- [ ] Au retour dans l'app ou au relancement, l'app affiche l'état réel de la même demande, sans en créer une nouvelle.

### D-05 et D-07 — Résultat et « pas reçu »

- [ ] Plein écran, croix « Fermer » seule en haut, montant reçu dans le tiers haut, actions en bas ; retour jamais vers D-03 ni D-04.
- [ ] « Fait » seulement après la confirmation de l'opérateur ; « Voir le reçu » et « Tu ne vois pas l'argent sur ton {opérateur} ? ».
- [ ] En attente : étapes « Envoyée » / « En attente » / « Pas encore », « Ne refais pas le retrait. », ni reçu ni Réessayer ; On vérifie : « La connexion a coupé. On regarde où il en est. », aucun Réessayer.
- [ ] Échoué : « Rien n'est arrivé sur ton {opérateur}. », « Ton solde », annonce assertive, Réessayer qui relit D-03 et redemande le PIN (nouvelle demande) ; refus de l'opérateur : « Choisir un autre Mobile Money ».
- [ ] « Ton argent n'a pas quitté KOTIZ » n'apparaît jamais tant que G01 ne le garantit pas.
- [ ] D-07 dit de regarder son application, que le message peut arriver plus tard, « Ne refais pas le retrait. » ; depuis Fait, « Signaler un problème » est principal ; depuis En attente, « Revenir » est principal ; aucun signalement ne crée de mouvement.

### C-11 à C-15 — Retraits dans Opérations

- [ ] Une ligne par retrait, montant pris, signe seulement si fait ; filtre « Retraits ».
- [ ] Détail : montant pris, « Tu as reçu » (fait), frais si confirmés, étapes en attente, raison de l'échec, aucun Réessayer ni « Refaire ce retrait » ; « Signaler un problème » toujours en bouton texte.
- [ ] Reçu seulement pour un retrait fait : « Tu as reçu » + montant reçu, Depuis / Vers avec numéro entier, « Pris sur ton solde » et « Frais » si confirmés, pas de partage.
- [ ] Le signalement d'un retrait reprend « Retrait {opérateur} · {montant pris} » sans ressaisie.

### Backend Payments, Savings, IAM

- [ ] Un ordre de retrait n'est créé qu'après un PIN KOTIZ valide, vers le numéro vérifié, avec des frais confirmés, un opérateur disponible et une clé d'idempotence unique ; sinon refus avec une raison communicable, sans valeur chiffrée.
- [ ] Dès l'envoi, le montant pris est engagé et exclu du disponible ; le retrait n'est « fait » qu'à la confirmation du partenaire, en écritures équilibrées ; un échec confirmé libère l'engagement sans débit.
- [ ] Le récapitulatif et le maximum retirable (montant reçu, frais, montant pris, solde après) viennent du serveur.
- [ ] La même clé ne produit jamais deux retraits ; une confirmation rejouée ou tardive non plus ; un résultat inconnu reste interrogeable, sans nouvelle demande.
- [ ] Aucun retrait ne débite une épargne.
