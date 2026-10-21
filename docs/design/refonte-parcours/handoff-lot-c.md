# Handoff — Refonte des parcours, lot C : dépôt, affectation, opérations et reçus (React Native / Expo + backend Spring Boot)

Date : 20 octobre 2026. Statut : lot C validé par le PO et sa conjointe le 20 octobre 2026, après la critique (15 corrections appliquées) et le test de [test-lot-c.md](test-lot-c.md), sans remarque.

- Maquettes et prototype : [screens-lot-c.md](screens-lot-c.md) · canvas [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), page « Lot C — Dépôt et affectation », **version 22** (`1792494666-2bc8`), composant d'écrans `C-Proto.dc.html`, prototype `Main.dc.html` (menu C-P1 à C-P8, C-P1′, C-P1″, C-P1‴, C-P4′, C-P4″). Il fait foi pour la composition et les textes. La version 22 ne change que les statuts et reporte au lot B l'état B · B07 « Dépôt pas entré ».
- Design system : [DESIGN.md](../../../DESIGN.md) (racine) · [KOTIZ Design System v12](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) (composants `Kotiz.*`, `components/index.d.ts`, illustrations `Actions/mobile-money.svg` et `Actions/agente.svg`).
- Parcours, écrans, états : [ux-spec-lot-c.md](ux-spec-lot-c.md) (fait foi pour le comportement ; le canvas fait foi pour les textes quand ils diffèrent, voir Points ouverts). Corrections : [critique-lot-c.md](critique-lot-c.md). Test : [test-lot-c.md](test-lot-c.md).
- Socle commun (tokens, composants des lots A et B, masquage, formats) : [handoff-lot-a.md](handoff-lot-a.md), [handoff-lot-b.md](handoff-lot-b.md). Ce document ne répète que ce qui change ou s'ajoute.
- Scénarios d'acceptation : [gherkin-lot-c.md](gherkin-lot-c.md) (IDs `C-Pn-Sm`, 165 scénarios). Rattachement aux issues : [issues-lot-c.md](issues-lot-c.md).
- Cible : app mobile React Native + Expo SDK 54, **variant `client`** seulement (ADR-009, ADR-010, ADR-019). Backend Java 21 / Spring Boot 3, hexagonal (ADR-011) : contextes **Payments** (ordre de dépôt Mobile Money, confirmation du partenaire, idempotence), **Savings** (solde, épargnes, affectation, écritures ledger), **Notifications** (lot F), et un contexte à désigner pour le signalement (voir Avant de coder, point 3).

Conventions (reprises des lots A et B) :

- **« à confirmer (Gxx) »** : paramètre non tranché, lu dans une configuration, jamais écrit en dur ni annoncé dans l'interface. G01 = partenaire et juridique, G02 = sécurité et SMS, G03 = assistance.
- **« à dessiner »** : comportement de la spec sans état dessiné ; le texte exact viendra des maquettes. Trois cas au lot C (voir Points ouverts).
- **Frais du dépôt Mobile Money : non confirmés (G01).** Le prototype affiche des frais fictifs, annoncés dans sa bande hors produit : **ce ne sont pas des valeurs produit, aucune n'est reprise ici.** Règle produit : frais à confirmer ; **l'autorisation reste bloquée tant qu'ils sont inconnus**. Quand un frais est confirmé, il est lu dans la configuration du partenaire et affiché ; jamais calculé par l'app à partir d'un taux supposé.
- **Valeurs de démonstration du prototype, qui ne sont pas des règles** : numéro 07 08 12 34 56, solde 12 400 FCFA, épargnes École Awa / Boutique / Tabaski / Loyer / Moto, opérateurs Wave et Orange Money, références « KTZ-2610-… (fictive) », dossiers « 2610-… (fictif) », heure « 14:32 », date du jour figée au 19 octobre 2026, motifs « Motif A / B (à confirmer) », réponse du conseiller, « Reçu fictif (prototype) », écran « Simulation de l'application Wave · hors KOTIZ ». Aucune ne doit être reprise dans le code, les tests ou les textes.

## Points ouverts

**Critique** ([critique-lot-c.md](critique-lot-c.md)) : les 3 corrections **Bloquant** sont corrigées (canvas version 20) et validées. La n° 1 (B07) est reportée au lot B (version 22, planche B · B07, état « Dépôt pas entré ») et spécifiée ici en raccord. Aucune correction ouverte.

**Décisions PO à respecter** (19 et 20 octobre 2026)

1. « Déposer » ouvre la feuille **C-00 « Comment tu veux déposer ? »** (Par Mobile Money / Auprès d'une agente), puis des pages.
2. **Numéro vérifié** seul, visible, non modifiable (C-01, C-03) ; un autre numéro est une évolution post-MVP : aucun champ, bouton ni lien au MVP.
3. **Aucun PIN KOTIZ** pour le dépôt, la mise de côté ni la reprise : le bouton du récapitulatif confirme. Le PIN reste pour ce qui fait sortir l'argent d'une épargne (lot B) ou de KOTIZ (lot D).
4. **Mise de côté sans frais** (solde → épargne), comme le retour au solde.
5. **Frais du dépôt Mobile Money non confirmés** : voir Conventions. En production, tant que G01 n'est pas levé, C-03 est dans l'état « frais inconnus » et aucun dépôt Mobile Money ne part.
6. **Une seule ligne Opérations par dépôt vers une épargne**, statut combiné « À reprendre » (ambre + horloge) ou « En attente », avec la phrase « Dépôt fait, épargne pas encore. » ou « Dépôt fait, épargne en cours. ».
7. **Reprise de la seule affectation**, jamais un nouveau dépôt ; sans limite de temps produit ; nouvelle confirmation sur son propre récapitulatif.
8. **Résultats en plein écran** (C-05, C-09) : croix « Fermer » en haut, statut dans le tiers haut, actions ancrées en bas.
9. **Jamais de reçu de succès en attente** ; reçu d'un partiel sans « Fait » global.
10. **Résolu ≠ Remboursé**.
11. **C-10 à 3 épargnes actives** : texte « 3 épargnes actives : c'est le maximum. », sans lien ni bouton « Créer ».
12. **PNV-1** (choisir la destination depuis « Déposer » de l'accueil) **refusée** ; **PNV-2** (« Dernier dépôt » avec sa destination) **refusée après test** (20 octobre 2026).
13. Pas de partage de reçu au lot C (lot E, avec le carnet).

**Écarts entre la spec et le canvas validé** (le canvas fait foi ; à reporter dans `ux-spec-lot-c.md` par la session qui la tient)

| Écran       | Spec                                                                                                                                                          | Canvas validé (fait foi)                                                                                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-04        | Titre « Valide 5 000 F sur ton Wave » ; « Ne ferme pas KOTIZ avant d'avoir validé » ; « Je n'ai rien reçu »                                                   | Titre avec le **montant débité** (« Valide {montant débité} sur ton {opérateur} ») ; « Valide dans {opérateur}, puis reviens ici. » ; « {montant} arrivent sur ton solde. » ; « Voir dans Opérations » une fois validée ; « Le dépôt n'arrive pas ? »             |
| C-05        | Titres avec le montant (« 5 000 F sont sur ton solde. ») ; primaire « Voir mon solde » ; partiel sans pastille, bouton « Réessayer de mettre dans {épargne} » | Titres sans montant (« Ton argent est sur ton solde. », « Ton argent est dans {épargne}. »), montant sur sa ligne en `amount` ; primaire « Terminé » ; partiel : pastille d'action « À reprendre », titre « {montant} sont sur ton solde. », bouton « Reprendre » |
| C-05 échoué | « Ton dépôt de 5 000 F n'a pas marché. », « Retour à l'accueil »                                                                                              | « Ton dépôt n'a pas marché. » + « Un problème technique l'a arrêté. », boutons texte « Ton {opérateur} a été débité ? Signale-le » et « Terminé »                                                                                                                 |
| C-09 échoué | « Les 5 000 F ne sont pas allés dans École Awa. »                                                                                                             | « Ce n'est pas allé dans {épargne}. »                                                                                                                                                                                                                             |
| C-11        | Statut combiné en deux segments (« Dépôt fait · épargne pas faite ») ; « Faire un dépôt » → C-01                                                              | Un seul mot d'action (« À reprendre » / « En attente ») + phrase sous le sous-titre ; « Faire un dépôt » ouvre C-00                                                                                                                                               |
| C-12        | « Signaler un problème » primaire sur un dépôt en attente ; signalement « Signalement en cours · Dossier n° … »                                               | Aucun bouton principal sur un détail en attente ; « Signaler un problème » toujours en bouton texte ; ligne « Mon signalement · {statut} · Dossier n° {id} »                                                                                                      |
| C-13        | « Pour : École Awa » sur tous les dépôts vers une épargne                                                                                                     | Partiel : « Demandé pour » + « Arrivé sur : Mon solde », pas de pastille globale, « Dépôt fait » en tête                                                                                                                                                          |
| C-15        | Message **succès** à l'envoi                                                                                                                                  | Message **information** à l'envoi (« Ton signalement est envoyé. » / « Ce n'est pas un remboursement. ») et à la contestation (« Ton dossier est rouvert. »)                                                                                                      |
| C-17        | « Tu vérifies le montant dans ton app. »                                                                                                                      | « Tu vérifies le montant dans KOTIZ. »                                                                                                                                                                                                                            |

**États « à dessiner »** (comportement spécifié, texte exact à venir des maquettes ; scénarios `@a-dessiner`)

- C-05 **refusé par l'opérateur** (le canvas ne montre que « Annulé chez l'opérateur ») : même structure, sous-titre de la spec « {opérateur} a refusé le dépôt. » (C-P1-S36).
- C-06 **Mobile Money indisponible** (le prototype garde la ligne active) : ligne désactivée, raison de la spec « Mobile Money indisponible pour l'instant. », même texte que C-00 (C-P2-S4).
- C-08 **épargne fermée pendant une mise de côté depuis le solde** (hors reprise) : la spec ouvre C-10 ; la feuille n'est dessinée qu'en reprise (C-P3-S11).

**Petites incohérences du prototype à ne pas reproduire**

- C-12 d'un dépôt dont le passage est **en attente** : le prototype affiche à la fois le bouton principal « Voir le reçu » et le lien « Voir le reçu du dépôt ». À coder : le lien « Voir le reçu du dépôt › » seul (même règle que le partiel), sans bouton principal (à confirmer par le PO, voir Questions).
- B · B12 « Voir le reçu » ouvre Opérations dans le prototype (données séparées) : à coder vers C-13 du retour.
- Les lignes de raccord A · H01 et B · B07 du lot C utilisent la nouvelle `TransactionRow` ; les planches validées des lots A et B gardent l'ancienne. **À coder : la nouvelle partout** (une seule `TransactionRow`).

**Avant de coder**

1. **Prérequis** : réalignement des tokens ([kotiz-ci/platform#96](https://github.com/kotiz-ci/platform/issues/96)), socle UI ([kotiz-ci/platform#59](https://github.com/kotiz-ci/platform/issues/59)), compte ([kotiz-ci/platform#64](https://github.com/kotiz-ci/platform/issues/64)), accueil ([kotiz-ci/platform#94](https://github.com/kotiz-ci/platform/issues/94)), épargnes ([kotiz-ci/platform#73](https://github.com/kotiz-ci/platform/issues/73)).
2. **Gate G01** : sans frais confirmés, le dépôt Mobile Money ne peut pas être démontré de bout en bout hors sandbox. En sandbox, les frais sont une valeur de configuration de test, nommée comme telle, jamais un défaut du code.
3. **Vocabulaire et contextes** (`domain-modeling`, avant le code de #66, #67, #69, D25, D26) :
   - termes **absents du glossaire** ([ddd-context-map-glossaire.md](../../architecture/ddd-context-map-glossaire.md)) : **affectation** (mise de côté solde → épargne), **lien dépôt ↔ affectation**, **reprise** (nouvelle affectation d'un dépôt fait dont l'affectation a échoué), **dossier de signalement**, **contestation**, **correction** (contre-écriture confirmée liée à une opération d'origine). Le glossaire n'a pas non plus le **retour au solde** ni la **fermeture** (déjà signalés au lot B) ;
   - le glossaire écrit `Deposit` « Min. 100 FCFA » et `Streak` « dépôt ≥ 100 FCFA » : **ce ne sont pas des décisions produit**, aucun minimum n'est affiché ni contrôlé côté app tant que G01 ne le confirme pas ; `GoalLock` est hors MVP (ne pas l'implémenter) ;
   - [CONTEXT-MAP.md](../../../CONTEXT-MAP.md) ne contient ni contexte **Ledger** (le ledger est dans **Savings**) ni contexte **Support** : le signalement, le dossier, la contestation et la correction n'ont pas de contexte désigné. **À trancher** : les rattacher à un contexte actif (Admin & Conformité pour le traitement par le conseiller, Savings pour la correction) ou ouvrir un contexte, ce qui demande un ADR. Aucun `CONTEXT.md` n'existe encore dans `apps/backend/*/`.
4. **Contrat d'API à écrire** : aucun champ n'existe. Nommer les données par leur sens métier et les termes du glossaire (`PaymentOrder`, `IdempotencyKey`, `PaymentCallback`, `PaymentProvider`, `SavingsAccount`, `SavingsGoal`, `Transaction`, `LedgerEntry`, `Money`), complétés après le point 3.

**Questions encore ouvertes sur le comportement** (aucune ne change la composition validée)

- G01 : liste et ordre des opérateurs ; protocole de validation chez chaque opérateur (application, message, code) et ce que C-04 affiche (le bouton « Ouvrir {opérateur} » n'existe que si l'opérateur passe par son application) ; annulation possible avant validation ; frais, montant débité, montant arrivé ; minimum et maximum par dépôt ; règles du niveau d'accès limité (C-02) ; un « échec confirmé » garantit-il « rien n'a été pris » (sinon la phrase ne s'affiche jamais) ; référence de l'opérateur et mentions légales du reçu ; calcul du solde avec une opération en attente (confirmé seulement, recommandé) ; une mise de côté ou une reprise consomme-t-elle la capacité du niveau limité (recommandation : non) ; libellé et sens de la correction.
- G03 : motifs de signalement ; pièces jointes (formats, taille, nombre) ; contact derrière « Contacter l'aide » et contenu de la feuille « Le dépôt n'arrive pas ? » ; délais de traitement (jamais annoncés) ; limite de contestation (le prototype n'en permet qu'une par dossier) ; commentaire obligatoire ou non à la contestation (facultatif par défaut) ; un seul dossier par opération.
- Technique : retour dans KOTIZ après l'application de l'opérateur (lien de retour, reprise de C-04) ; `<délai de confirmation>` au-delà duquel le résultat devient « On vérifie » ; idempotence de la reprise ouverte deux fois ; cache d'Opérations et des reçus hors ligne ; `<taille de page>` de « Voir plus » (7 dans le prototype) ; référence copiable par appui long ; capture d'écran autorisée sur le reçu.
- PO : C-12 d'un dépôt dont le passage est en attente (lien seul, recommandé, ou bouton + lien du prototype).

## Tokens

Aucun token nouveau : le lot C utilise ceux du [handoff du lot A § Tokens](handoff-lot-a.md#tokens) (noms cibles `@kotiz/design-tokens`). Usages propres au lot C :

| DESIGN.md                                                            | Code (cible)                                        | Usage lot C                                                                                                                                                              |
| -------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `typography.amount` (34 / 42 / 700, tabulaires)                      | `typography.amount`                                 | Saisie (C-02, C-07), « Tu déposes » / « Tu mets » (C-03, C-08), montant des résultats (C-05, C-09), du détail (C-12) et du reçu (C-13)                                   |
| `typography.title`                                                   | `typography.title`                                  | Titres d'écran et de résultat ; titre de feuille                                                                                                                         |
| `typography.section`                                                 | `typography.section`                                | « Mes épargnes », « Lié à cette opération », « Réponse du conseiller », « L'opération », « Ce que tu as envoyé », « Qu'est-ce qui ne va pas ? », « Dossier n° … »        |
| `typography.label` (16 Semi Bold)                                    | `typography.label`                                  | Lignes de choix (C-00, C-01, C-06), « Pris sur ton {opérateur} : … » (C-03)                                                                                              |
| `colors.surface-pending` / `text-pending` + horloge                  | `palette.surfacePending` / `palette.textPending`    | « En attente » **et « À reprendre »** (décision PO du 19 octobre 2026 : attente d'une action ; extension de la règle « ambre = attente » de DESIGN.md, à reporter au DS) |
| `colors.surface-error` / `text-danger` + croix                       | `palette.surfaceError` / `palette.textDanger`       | « Échoué », étape « Pas fait » (C-12, C-13), « Pas entré » (B07)                                                                                                         |
| `colors.surface-brand-subtle` + `border-focus` 2                     | `palette.surfaceBrandSubtle`, `palette.borderFocus` | Montant rapide sélectionné (C-02), « Tout mon solde » (C-07), puce de filtre active (C-11), option de motif choisie (C-14) ; pastille d'icône d'un dépôt (apport)        |
| `colors.surface-canvas`                                              | `palette.surfaceCanvas`                             | Pastille des mouvements internes, pastilles neutres de C-00, étapes numérotées (C-03, C-17), rappel d'opération (C-14), fil du dossier (C-15)                            |
| `colors.text-secondary`                                              | `palette.textSecondary`                             | Montant en attente ou échoué (C-11, C-12), dates, sous-titres de ligne, « Pas encore »                                                                                   |
| `colors.surface-information`                                         | `palette.surfaceInformation`                        | Messages info : frais inconnus, hors connexion, solde baissé, signalement envoyé, dossier rouvert                                                                        |
| `rounded.lg` (20)                                                    | `radii.lg`                                          | Carte `SummaryFlow` (C-03, C-08), carte du reçu (C-13)                                                                                                                   |
| `rounded.md` (16)                                                    | `radii.md`                                          | Rappel d'opération (C-14), fil et réponse du dossier (C-15), options de motif                                                                                            |
| `size.touchMin` (48) / `size.pastille` (64) / `size.pastilleLg` (80) | `size.*`                                            | Lignes ≥ 64 de haut (C-00, C-01, C-06), icône de résultat 64 (C-05, C-09), pastille 80 de C-17 et de C-11 vide                                                           |

**Valeurs en dur relevées dans le prototype** (à porter par des tokens existants ou à proposer au DS) : pastille d'étape numérotée 28 (C-03, C-17 ; proposer `size.stepDot` 32 ou un nouveau token) ; colonne clé de 120 des lignes clé / valeur (C-05, C-09, C-13, C-15) ; logo opérateur 40 × 30 dans le flux et 32 × 24 dans « Depuis : » ; point du fil du dossier 12 ; vignette photo 48 rayon 12 ; fondu de fin de la ligne de puces (82 %) ; ligne de choix de 64 de haut ; rayon 8 des montants rapides (hérité de `kz-pick`, déjà signalé). Aucune couleur nouvelle.

## Composants

Rien n'existe encore dans `apps/mobile/components/`. Les composants des lots A et B sont des prérequis ([handoff-lot-a.md](handoff-lot-a.md), [handoff-lot-b.md](handoff-lot-b.md) § Composants). Les noms et propriétés ci-dessous sont ceux de `components/index.d.ts` du DS v12, à reproduire en React Native. Règle commune : un composant affiche des valeurs fournies par l'écran (montants, statuts, frais confirmés) ; il ne décide d'aucun résultat financier.

### Réutilisés tels quels (DS v12)

`PageHeader` (`step` « Étape n sur 4 » / « Étape n sur 2 », `title`, `backLabel="Fermer"` + icône croix sur les résultats, `onBack={null}` sur C-04), `RootHeader` + `MaskToggle` (C-11 ; œil à droite du `PageHeader` sur C-12 et C-13), `Message` (`info`, `error`, `pending`), `Button` (`primary`, `secondary`, `text` ; `state` `loading` « Envoi… », `disabled`), `BottomSheet` (C-00, C-06, C-10, C-16, « Le dépôt n'arrive pas ? »), `StatusPill` (`done`, `pending`, `failed`, `neutral`), `StepTracker` (`sent` « Envoyée », `word` « Validée »), `InfoLine`, `IconPastille` (`mint` 80 sur C-11 vide, `purple` sur C-10 et B15), `GoalRow` (C-10, H01), `AmountField` (C-02 avec montants rapides, C-07 avec `wideChip` « Tout mon solde »), `SummaryFlow` (C-03, C-08), `TextField multiline` (C-14, C-16), `ConfirmDialog` (« Quitter sans envoyer ? »), `BottomNav`, `HomeHeader` / `BalanceCard` / `Shortcuts` (H01), logos `Operateurs/` (Wave symbole seul, Orange Money, MTN MoMo, Moov Money ; cadre 64 × 48, jamais recolorés), illustrations `Actions/mobile-money.svg` et `Actions/agente.svg` (48, 56, 64 ; C-00 en pastille neutre 64, C-06 en 48, C-17 en 64 dans une pastille bleue 80), `Actions/deposer` (Mon solde), illustrations du groupe Objectifs (épargnes).

Précisions d'usage :

- **`SummaryFlow`** : la ligne « Frais » n'existe **que** si le frais est confirmé (C-03) ; jamais sur C-08. Le nœud de départ de C-03 porte le logo de l'opérateur, « Depuis ton numéro » et « {numéro} · {opérateur} ». Le flux est nommé « De {opérateur} vers {destination} » (C-03) et « De Mon solde vers {épargne} » (C-08).
- **`StepTracker`** : jamais `done` + « Fait » sur un écran d'attente ; étapes passées « Envoyée », « Validée ». Le statut d'étape **`failed`** (« Pas fait », croix sur `surface-error`) et l'étape de reprise sont des évolutions hors DS (voir ci-dessous).
- **`OperationStatus`** n'est pas utilisé : les résultats C-05 et C-09 sont une composition d'écran (voir § C-05). Le préréglage `uncertain` (« À vérifier ») n'est pas utilisé : l'inconnu a la signature « En attente ».
- **`BottomSheet`** : bouton « Fermer » (croix 48) en haut à droite ; retour Android = fermer.

### Hors Design System (candidats `lc-` du canvas, à construire dans l'app, à promouvoir ensuite)

**`TransactionRow`** (évolution) — proposer `{ title, subtitle?, note?, date, amount, direction?: 'in' | 'out', status, statusLabel?, variant?: 'deposit' | 'internal' | 'withdrawal' | 'correction', iconSrc?, masked?, onPress }`.

- Sous-titre origine → destination (14 Regular, `text-secondary`) sur toutes les lignes.
- `internal` (mise de côté, retour au solde) : pastille `surface-canvas` + pictogramme flèches internes (`text-primary`), **jamais** de logo d'opérateur ni de pastille vert doux d'apport.
- **Statut combiné** (dépôt vers une épargne, dépôt fait, passage pas fait) : un seul mot d'action en ambre + horloge (« À reprendre » si le passage a échoué de façon confirmée, « En attente » s'il est en cours) ; `note` « Dépôt fait, épargne pas encore. » / « Dépôt fait, épargne en cours. » (14 Semi Bold, `text-primary`) sous le sous-titre ; montant « + {montant} » (le dépôt est fait) ; pastille vert doux.
- Signe : « + » ou « − » **seulement si l'opération est faite** ; en attente ou échouée, montant sans signe en `text-secondary`. Échec : pastille `surface-error` + `echec-danger.svg`. Attente simple : pastille avec horloge.
- Vue depuis une épargne (B07) : voir § Raccords. Masqué : « ••• F », lu « Montant masqué ». Ligne entière ≥ 48, ouvre C-12.

**Ligne de choix** (`OperatorRow` sur C-01 ; options de C-00 et C-06) — `{ label, logoSrc? | illustrationSrc?, reason?, disabled?, onPress }` : ligne de 64 de haut au moins, filets haut et bas, logo 64 × 48 (C-01) ou illustration 48 (C-06) ou pastille neutre 64 (C-00), libellé 16 Semi Bold, chevron ; désactivée : `text-secondary`, sans chevron, raison en 14 sous le libellé, `accessibilityState.disabled`.

**`LinkedStatusRows`** (C-05) — deux lignes entre filets, 48 de haut : « Dépôt » + `StatusPill done`, « Dans {épargne} » + `StatusPill` du passage (« Fait », « En attente », « À reprendre »).

**`StepTracker`** (évolution) — `Step.status` `failed` (« Pas fait », croix sur `surface-error`, mot en `text-danger` Semi Bold) ; jusqu'à 4 étapes ; étape de reprise « Reprise vers {épargne} · {date} » (`done`, « Fait »).

**`FilterChips`** (C-11) — puces de 48 de haut sur une ligne défilante, fondu en fin de ligne ; **une seule active** (vert doux + bordure 2, `accessibilityState.selected`) ; puce d'épargne amovible « {épargne} ✕ » nommée « Retirer le filtre {épargne} ».

**`Receipt`** (C-13, promotion du reçu compact `198:988`) — carte `surface` bordée, rayon 20, padding 20 : en-tête logo KOTIZ 28 + « KOTIZ » + `StatusPill done` (ou « Dépôt fait » en texte sur un partiel) ; type ; montant 34 ; lignes clé / valeur (colonne de 120) ; pied (mentions légales du partenaire, G01). Pas de bouton Partager.

**`CaseTimeline`** (C-15) — fond `surface-canvas`, rayon 16 : jalons datés (point 12 `text-secondary`, libellé `text-primary`), jalon courant en Semi Bold avec un point `text-primary` cerclé ; **aucun vert**. Statut du dossier : `StatusPill neutral` (« Envoyé », « En cours », « Résolu »).

**Étapes numérotées** (C-03, C-17) — liste ordonnée : pastille 28 `surface-canvas` + chiffre 14 Semi Bold + phrase 14 Semi Bold.

**Écran de résultat plein écran** (C-05, C-09) — composition d'écran, pas un composant DS : `PageHeader` avec seulement la croix « Fermer » ; bloc de statut en haut, aligné à gauche (icône 64 ronde : vert doux + coche / ambre + horloge / rouge + croix ; `StatusPill` ; titre ; sous-titre ; montant `amount` + « FCFA ») annoncé `accessibilityLiveRegion="polite"` (fait, attente) ou `assertive` (échec) ; détails dans le flux ; zone d'action fixe.

**Zone d'action fixe** (tous les écrans du lot C avec un bouton bas) — fond `surface`, padding 16 au-dessus de la zone sûre, filet `border-default` **seulement** quand le contenu défile dessous ; un seul bouton principal, puis des boutons texte.

**Pictogrammes à dessiner** pour le DS : flèches internes (mouvement interne), croix d'étape « Pas fait ».

| Élément                                             | Où                                 | Statut                                            | À faire                                                                                                      |
| --------------------------------------------------- | ---------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Squelette de liste                                  | C-11                               | Absent du bundle (déjà au lot B)                  | Composant d'écran : 3 lignes grises, annoncé « Chargement de tes opérations », jamais de montant ni de « 0 » |
| Description d'une raison liée à un bouton désactivé | C-02, C-03, C-07, C-08, C-12, C-14 | `Button` du DS ne la transmet pas (déjà au lot B) | `accessibilityHint` ou équivalent, pour lire la raison avec le bouton                                        |
| « Simulation de l'application Wave »                | Prototype                          | **Hors produit**                                  | Ne pas coder : la vraie validation se fait dans l'application de l'opérateur (G01)                           |

## Écrans

Plateforme : Android d'abord ; largeurs 320 à 430 (contrôle à 320, 360, 390, 430) ; portrait seul. **Barre basse uniquement sur C-11** (et H01). Toutes les autres pages sont poussées avec `PageHeader`, ou des feuilles. Clavier ouvert : champ actif et bouton principal visibles (bouton collé au-dessus du clavier). Montants jamais coupés en fin de ligne (espaces insécables, références avec tirets insécables).

Règles communes :

- **Étapes** : dépôt « Étape n sur 4 » (C-01 Moyen, C-02 Montant, C-03 Vérifier, C-04 Valider) ; mise de côté « Étape n sur 2 » (C-07, C-08) ; **reprise sans compteur**. Les feuilles ne comptent pas.
- **Destination lisible** de C-01 à C-05 et de C-07 à C-09 : « Vers : Mon solde » ou « Pour / Vers : {épargne} ».
- **Attente réseau** > 1 s : bouton en `loading` (« Envoi… »), « Modifier » masqué, double appui ignoré, aucun écran suivant avant la réponse.
- **Hors ligne** avant envoi : `Message` info titre « Pas de connexion. », texte « Rien n'a été envoyé. », bouton principal « Réessayer », saisie gardée. Après envoi : résultat « On vérifie », jamais un succès ni un échec supposé.
- **Retour Android** = `←`, sauf C-04 (aucun retour) et les résultats (vers le point de départ).

### C-00 — Comment tu veux déposer ? (feuille)

- Structure : `BottomSheet` titre « Comment tu veux déposer ? », « Fermer » ; deux lignes de choix : « Par Mobile Money » (`mobile-money.svg` en pastille neutre 64) et « Auprès d'une agente » (`agente.svg`). Pas de bouton principal, pas de montant.
- Interactions : « Par Mobile Money » → C-01 (destination Mon solde) ; « Auprès d'une agente » → C-17 ; Fermer / retour Android → écran d'origine (A · H01, A · E08, C-11 vide).
- États : nominal ; **aucun opérateur disponible** : « Par Mobile Money » désactivé, raison « Mobile Money indisponible pour l'instant. », l'agente reste active ; hors ligne : la feuille s'ouvre, C-01 gère le réseau.
- Entrées : « Déposer » (raccourci de H01), « Faire mon premier dépôt » (E08), « Faire un dépôt » (C-11 vide). Un double appui n'ouvre qu'une feuille.

### C-01 — Avec quoi tu déposes ? (étape 1 sur 4)

- Structure : `PageHeader` (←, « Étape 1 sur 4 ») ; titre « Avec quoi tu déposes ? » ; contexte « Vers : Mon solde » (depuis C-00) ou « Pour : {épargne} » (depuis C-06) ; liste des opérateurs **disponibles** (`OperatorRow`, ordre du partenaire, G01) ; sous la liste « Depuis ton numéro {numéro vérifié} » (`body`, numéro en Semi Bold tabulaire), **sans lien ni bouton**.
- Données : opérateurs disponibles pour la cliente (identifiant, nom, logo), numéro vérifié, date de dernière mise à jour de la liste.
- Interactions : toucher un opérateur → C-02 (pas de radio, pas de Continuer) ; ← → C-00 refermée sur l'écran d'origine, ou C-06 / B07.
- États :
  - **Un seul opérateur** : la liste reste une liste, pas de saut automatique.
  - **Aucun opérateur** : `Message` info « Le dépôt Mobile Money n'est pas possible pour l'instant. » + lien « Déposer auprès d'une agente › » (→ C-17).
  - **Hors connexion** : `Message` info « Mis à jour à {HH:MM} · hors connexion » ; dernière liste connue, opérateurs désactivés sans chevron (logos non atténués : marques non recolorées) ; raison « Déposer demande la connexion. Réessaie quand tu captes. ».
  - **Chargement** (premier affichage) : squelette de 2 lignes.
- Cas : logo manquant (nom seul, jamais le logo d'un autre opérateur) ; grand texte (le nom passe à la ligne, le logo garde sa taille).

### C-02 — Combien tu déposes ? (étape 2 sur 4)

- Structure : `PageHeader` (« Étape 2 sur 4 ») ; titre « Combien tu déposes ? » ; « Depuis : [logo 32 × 24] {opérateur} » ; `AmountField` (libellé lu « Montant à déposer ») ; montants rapides 500 / 1 000 / 2 000 (valeurs de démonstration du pilote, PRD §7 règle 4 : à lire en configuration) ; « Vers : [illustration 24] {destination} » ; bouton « Continuer ».
- Aide / raison : vide « Écris un montant. » ; 0 « Le montant doit être plus grand que 0. » (trait rouge). Un montant rapide remplace la saisie et se sélectionne (vert doux + bordure 2) ; une saisie libre le désélectionne.
- États : vide et 0 (Continuer désactivé + raison) ; saisi ; montant rapide ; **au-delà de ce que le compte permet** (niveau d'accès, RM-ACC-03) : `Message` info « Ce montant dépasse ce que ton compte permet pour l'instant. » + lien « Vérifier mon identité › » (identité à vérifier, → sous-lot A2) **ou** texte « Ton identité est en vérification. » (vérification en cours) ; Continuer désactivé ; montant gardé ; **aucune limite chiffrée**. Minimum ou maximum de l'opérateur : raison sous le champ, texte et valeurs à confirmer (G01).
- Interactions : Continuer → C-03 ; ← → C-01 (opérateur gardé). Retour depuis C-03 : montant gardé, montant rapide resélectionné s'il correspond.
- Montant toujours visible, même masqué.

### C-03 — Vérifie ton dépôt (étape 3 sur 4)

- Structure : `PageHeader` (« Étape 3 sur 4 ») ; titre « Vérifie ton dépôt » ; messages éventuels ; carte `SummaryFlow` :
  1. « Tu déposes » + {montant} FCFA + « Modifier » (→ C-02) ; **si les frais sont confirmés**, juste dessous, « Pris sur ton {opérateur} : {montant débité} » (16 Semi Bold) ;
  2. flux : [logo] « Depuis ton numéro » / « {numéro vérifié} · {opérateur} » ↓ [illustration] « Vers » / « Mon solde » ou « {épargne} » ;
  3. vers une épargne : étapes numérotées « 1 Arrive sur ton solde », « 2 Passe dans {épargne} » ;
  4. lignes, **seulement si les frais sont confirmés** : « Frais » {frais} ; « Arrive sur ton solde » {montant} ; vers une épargne : « Dans {épargne} après » « {épargné + montant} sur {cible} » (F03).
     Puis « Tu vas valider sur ton téléphone. » (`body`) et « KOTIZ ne te demande jamais ton code {opérateur}. ». Bouton « Déposer {montant} ».
- `{montant débité}` = montant + frais confirmés, **fournis par le serveur** (récapitulatif de l'ordre), jamais calculés par l'app.
- États :
  - **Frais confirmés** : nominal.
  - **Frais inconnus** (état réel tant que G01 n'est pas levé) : `Message` info titre « Les frais ne sont pas encore connus. », texte « Le dépôt n'est pas possible pour l'instant. » ; ni « Pris sur ton … », ni ligne Frais, ni « Arrive sur ton solde » ; bouton « Déposer {montant} » désactivé, raison « Déposer est bloqué : frais inconnus. » ; **rien n'est envoyé**.
  - **Refus connu d'avance** (compte restreint, règle partenaire) : `Message` erreur titre « Ce dépôt n'est pas possible pour l'instant. », texte « Rien n'a été envoyé. » + lien « Contacter l'aide › » (G03) ; bouton désactivé, raison « Déposer est bloqué : ce dépôt est refusé. » ; aucune valeur chiffrée.
  - **Opérateur devenu indisponible** : `Message` info titre « {opérateur} n'est pas disponible pour l'instant. », texte « Ton montant est gardé. » ; bouton principal « Choisir un autre moyen » (→ C-01, montant gardé).
  - **Épargne fermée entre-temps** : `Message` info titre « {épargne} est fermée. », texte « Rien n'a été envoyé. » ; bouton principal « Voir mon épargne » (→ B07 fermée) ; aucune redirection automatique.
  - **Envoi** : « Envoi… », « Modifier » masqué. **Hors connexion** : « Pas de connexion. » / « Rien n'a été envoyé. », bouton « Réessayer ».
- Contrôle serveur à l'ouverture et à la reprise après arrière-plan : frais, disponibilité de l'opérateur, épargne ouverte, règles du compte ; le récapitulatif est relu avant l'envoi.
- Données envoyées : opérateur, montant, destination (solde ou épargne), clé d'idempotence générée à l'entrée de C-03.

### C-04 — Valide sur ton téléphone (étape 4 sur 4)

- Structure : `PageHeader` **sans retour**, « Étape 4 sur 4 » ; logo de l'opérateur 64 × 48 ; titre `role=status` « Valide {montant débité} sur ton {opérateur} » ; `StepTracker` « Où en est ton dépôt » ; « {montant} arrivent sur ton solde. » (vers une épargne : « {montant} arrivent sur ton solde, puis dans {épargne}. ») ; en attente de validation « Valide dans {opérateur}, puis reviens ici. » (Semi Bold) ; « Réf. {référence} ».
- Étapes : « Demande envoyée à {opérateur} » `sent` « Envoyée » ; « Ta validation sur {opérateur} » En attente → « Validée » ; « Arrivée sur ton solde » Pas encore → En attente ; vers une épargne, quatrième étape « Passage dans {épargne} » Pas encore.
- Boutons : en attente de validation, principal « Ouvrir {opérateur} » **seulement si le protocole de l'opérateur passe par son application** (G01) ; une fois validée, bouton texte « Voir dans Opérations » ; toujours, bouton texte « Le dépôt n'arrive pas ? » (feuille : « Vérifie que ton téléphone capte. », « Ouvre ton application {opérateur}. », « Ne refais pas le dépôt. » en Semi Bold, lien « Contacter l'aide › », bouton secondaire « Revenir » ; contenu provisoire G01 / G03). « Annuler » seulement si l'opérateur permet d'annuler avant validation (G01, non dessiné).
- États : **attente de validation** ; **validée** : titre « Ton dépôt arrive. », étape 2 « Validée », étape 3 En attente ; passage automatique à C-05 au résultat. **Jamais** de bouton « J'ai validé », jamais « Fait ».
- Délai : au-delà de `<délai de confirmation>` (technique, à confirmer), C-05 « On vérifie ».

### Retour depuis l'application de l'opérateur

- La cliente quitte KOTIZ (« Ouvrir {opérateur} » ou validation par message) puis revient. **Au retour au premier plan**, l'app interroge le statut de la demande en cours (même référence, même clé) et affiche : C-04 en attente de validation, C-04 validée, ou C-05 si le résultat est connu. Aucune nouvelle demande n'est créée.
- **App tuée par Android** pendant la validation (téléphone de 2 Go) : au relancement, si une demande de dépôt est ouverte, l'app rouvre sur C-04 ou C-05 de cette demande (après la connexion du lot A) ; sinon l'accueil montre « Dernier dépôt · En attente », qui mène à C-12 de la même opération.
- Lien de retour de l'opérateur vers KOTIZ (deep link, `returnUrl`) : à confirmer avec chaque opérateur (G01, technique). Sans lien de retour, la cliente revient par le sélecteur d'applications : même comportement.
- Un SMS ou une notification de l'opérateur ne change **jamais** le statut affiché : seul le statut KOTIZ (confirmation du partenaire) fait foi.

### C-05 — Résultat du dépôt

- Structure : écran de résultat plein écran (§ Composants). Lignes clé / valeur : « Depuis » {opérateur} + numéro, « Vers » {destination}, vers une épargne réussie « {épargne} » « {épargné} sur {cible} » + barre 8 (F03), « Référence ».
- États (statut · titre · sous-titre · détails · primaire · boutons texte) :
  - **Fait, vers le solde** : `done` « Fait » · « Ton argent est sur ton solde. » · — · — · « Terminé » (→ H01) · « Voir le reçu », « Créer une épargne » (seulement si aucune épargne active, → B02 ; aucune mise de côté automatique). Pas d'illustration, même au premier dépôt.
  - **Fait, vers une épargne** : `done` « Fait » · « Ton argent est dans {épargne}. » · — · `LinkedStatusRows` Dépôt Fait / Dans {épargne} Fait ; si la cible est atteinte « {épargne} a atteint son objectif. » (neutre, sans coche) · « Voir mon épargne » (→ B07) · « Voir le reçu ».
  - **À reprendre** (dépôt fait, passage échoué confirmé) : `pending` « À reprendre » (ambre + horloge) · « {montant} sont sur ton solde. » · « {épargne} ne les a pas reçus. » · `LinkedStatusRows` Dépôt Fait / Dans {épargne} À reprendre · « Reprendre » (→ reprise) · « Laisser sur mon solde » (→ H01), « Voir le reçu du dépôt ».
  - **Dépôt fait, passage en attente** : `pending` « En attente » · « Ton dépôt est fait. » · « Le passage dans {épargne} est en attente. » · `LinkedStatusRows` Dépôt Fait / Dans {épargne} En attente ; « Ne refais pas l'opération. » · « Terminé » · « Voir dans Opérations », « Voir le reçu du dépôt ». **Aucun Reprendre.**
  - **En attente** : `pending` « En attente » · « Ton dépôt est en attente. » · vers une épargne « Rien n'est encore dans {épargne}. » · `StepTracker` (Envoyée, Validée, Arrivée sur ton solde En attente, Passage Pas encore) ; « Ne refais pas l'opération. » ; « Tu le retrouves dans Opérations. » · « Terminé » · « Voir dans Opérations ». Pas de reçu.
  - **On vérifie** (connexion perdue après envoi, délai dépassé) : même signature · « On vérifie ton dépôt. » · idem · « Terminé » · « Voir dans Opérations », « Contacter l'aide ». **Aucun Réessayer.**
  - **Annulé chez l'opérateur** : `failed` « Échoué » · « Ton dépôt n'est pas fait. » · « Tu as annulé sur {opérateur}. » · — · « Réessayer » (→ C-03 relu, nouvelle validation) · « Terminé ». « Rien n'a été pris sur ton {opérateur}. » **seulement si G01 le garantit**.
  - **Refusé par l'opérateur** (à dessiner) : comme annulé, sous-titre « {opérateur} a refusé le dépôt. » ; raison de l'opérateur seulement si elle est fournie.
  - **Échoué** (technique, confirmé) : `failed` « Échoué » · « Ton dépôt n'a pas marché. » · « Un problème technique l'a arrêté. » · vers une épargne « Rien n'est allé dans {épargne}. » · « Réessayer » (→ C-03 relu) · « Ton {opérateur} a été débité ? Signale-le » (→ C-14 sur cette opération), « Terminé ».
- Interactions : « Fermer », « Terminé » et retour Android → point de départ (H01, ou B07 de l'épargne), **jamais C-03 ni C-04**. Montants visibles même masqués.

### C-06 — D'où vient l'argent ? (feuille)

- Structure : `BottomSheet` « D'où vient l'argent ? », « Fermer », « Pour : {épargne} » ; trois lignes de choix (illustrations 48) : « Mon solde disponible » (Déposer), « Mobile Money » (`mobile-money.svg`), « En espèces chez une agente » (`agente.svg`). Aucun montant.
- Ordre : solde > 0 → Mon solde, Mobile Money, espèces ; solde à 0 → Mobile Money, Mon solde (désactivé, « Rien sur ton solde pour l'instant. »), espèces. Aucun opérateur : Mobile Money désactivé, « Mobile Money indisponible pour l'instant. » (à dessiner).
- Interactions : Mon solde → C-07 ; Mobile Money → C-01 « Pour : {épargne} » ; espèces → C-17 avec « Dis à l'agente que c'est pour {épargne}. », dont le retour rouvre C-06 ; Fermer → B07.
- Entrée : « Mettre de l'argent » de B · B07, avec l'épargne ouverte.

### C-07 — Combien tu mets de côté ? (étape 1 sur 2)

- Structure : `PageHeader` (« Étape 1 sur 2 », absent en reprise) ; titre « Combien tu mets de côté ? » (reprise : « Combien tu mets dans {épargne} ? ») ; messages ; « Depuis : Mon solde · {disponible} disponibles » ; `AmountField` (libellé lu « Montant à mettre de côté ») ; puce « Tout mon solde » (pas en reprise) ; « Vers : [illustration] {épargne} » ; bouton « Continuer » ; en reprise, bouton texte « Plus tard » (→ H01).
- Aide / raison : vide « Écris un montant. » ; 0 « Le montant doit être plus grand que 0. » ; > disponible « Tu as {disponible} sur ton solde. » ; reprise > plafond « Tu peux mettre {plafond} au plus. » ; cible atteinte avec ce montant « Ton objectif sera atteint. » (aide, bouton actif).
- États : vide ; saisi ; Tout mon solde ; supérieur ; **solde changé** (au retour de C-08 ou sur refus serveur) : `Message` info titre « Ton solde a changé. », texte « Tu as maintenant {disponible} disponibles. » ; **reprise, solde baissé** : `Message` info titre « Ton solde a baissé. », texte « Tu as {disponible} disponibles. », montant prérempli = plus petit du montant du dépôt d'origine et du disponible, **plafond = ce même montant**.
- Disponible = confirmé seulement (H5). Minimum : à confirmer (G01), aucune valeur.

### C-08 — Vérifie avant de mettre de côté (étape 2 sur 2)

- Structure : `PageHeader` (« Étape 2 sur 2 », absent en reprise) ; titre « Vérifie avant de mettre de côté » (reprise : « Réessayer de mettre de côté ») ; en reprise, lien « Suite à ton dépôt {opérateur} du {date courte} › » (→ C-12 de ce dépôt) ; messages ; `SummaryFlow` « Tu mets » {montant} FCFA + « Modifier » (→ C-07), Depuis « Mon solde » ↓ Vers « {épargne} », lignes « Il restera sur ton solde » {disponible − montant} (retirée en masqué) et « Dans {épargne} après » « {épargné + montant} sur {cible} » ou « {épargné + montant} · objectif atteint » ; « L'argent reste sur KOTIZ. Tu peux le remettre sur ton solde. » ; bouton « Mettre {montant} dans {épargne} » ; en reprise « Plus tard ».
- **Sans frais, sans PIN** : aucune ligne Frais, aucun état « frais inconnus » ; le bouton confirme.
- États : nominal ; envoi ; **refus connu d'avance** : `Message` erreur titre « Ce mouvement n'est pas possible pour l'instant. », texte « Ton argent n'a pas bougé. » + « Contacter l'aide › » ; bouton désactivé, raison « Le mouvement est bloqué : il est refusé. » ; **solde changé** → C-07 avec message ; **épargne fermée** → C-10 (à dessiner hors reprise) ; hors ligne.
- Données envoyées : montant, épargne, en reprise l'identifiant du dépôt d'origine ; clé d'idempotence générée à l'entrée de C-08.

### C-09 — Résultat de la mise de côté

- Même écran plein écran que C-05. Détails : « Depuis » Mon solde, « Vers » {épargne}, « {épargne} » « {épargné} sur {cible} » + barre, « Sur ton solde » {disponible}, « Référence ».
- États :
  - **Fait** : `done` « Fait » · « Ton argent est dans {épargne}. » · reprise : « Ton dépôt du {date courte} est maintenant dans {épargne}. » · cible atteinte « {épargne} a atteint son objectif. » · « Voir mon épargne » · « Voir le reçu » (reçu de la mise de côté).
  - **En attente** : `pending` · « Ta mise de côté est en attente. » · `StepTracker` « Où en est ta mise de côté » (Demande Envoyée ; Dans {épargne} En attente) ; « Ne refais pas l'opération. » ; « Tu la retrouves dans Opérations. » · « Terminé » · « Voir dans Opérations ».
  - **On vérifie** : idem, titre « On vérifie ta mise de côté. » + « Contacter l'aide ». Aucun Réessayer.
  - **Échoué** : `failed` · « Ce n'est pas allé dans {épargne}. » · « Ton argent n'a pas bougé. Il est sur ton solde. » · « Réessayer » (→ C-08 relu, nouvelle confirmation) · « Terminé ».
- Fermer / Terminé / retour Android → B07 de l'épargne visée.

### C-10 — Choisis une autre épargne (feuille)

- Structure : `BottomSheet` titre « {épargne d'origine} est fermée », « Fermer » ; `IconPastille` violette (Épargnes) ; « Tes {montant} sont sur ton solde. » (Semi Bold) ; « Tu peux les mettre dans une autre épargne. » ; liste `GoalRow` des **autres épargnes actives** (atteinte : « Objectif atteint », choisissable) ; « Créer une épargne › » (→ B02) **seulement sous 3 actives** ; à 3 actives, texte « 3 épargnes actives : c'est le maximum. » (sans lien) ; bouton secondaire « Laisser sur mon solde » (→ H01).
- Aucune autre active : « Tu n'as pas d'autre épargne. », bouton **principal** « Laisser sur mon solde », lien « Créer une épargne › ».
- Toucher une épargne → C-08 reprise avec cette destination, montant = plus petit du dépôt d'origine et du disponible.
- Jamais de réouverture de l'épargne fermée ; après création (B02 → B17 → B07), aucune mise de côté automatique, la reprise reste disponible (C-12, B07).

### C-11 — Opérations (racine)

- Structure (défile, sauf la barre basse) : titre 24 « Opérations » + `MaskToggle` ; si hors ligne `Message` info « Mis à jour à {HH:MM} · hors connexion » ; `FilterChips` « Tout » · « Dépôts » · « Retraits » · « Épargnes » (+ « {épargne} ✕ » depuis B07) ; sections par jour (« Aujourd'hui », « Hier », « 17 octobre ») de `TransactionRow` ; bouton secondaire « Voir plus » ; `BottomNav` (Opérations actif). Pas de bouton principal.
- Lignes (titre · sous-titre · montant · statut) :
  - dépôt vers le solde : « Dépôt {opérateur} » · « Vers ton solde » · « + {montant} » si fait ;
  - dépôt vers une épargne : « Dépôt vers {épargne} » · « Depuis {opérateur} » · « + {montant} » · « Fait », ou statut combiné (§ Composants) ;
  - mise de côté : « Vers {épargne} » · « Depuis ton solde » · « − {montant} » (`internal`) ;
  - retour au solde (lot B) : « Depuis {épargne} » · « Vers ton solde » · « + {montant} » (`internal`) ;
  - retrait (lot D, ligne seulement) : « Retrait {opérateur} » · « Vers {numéro abrégé} » · « − {montant} » ;
  - correction confirmée : « Correction » · « Pour ton dépôt du {date courte} » · montant signé ;
  - épargne fermée : nom suivi de « (fermée) ».
  - Date de ligne : « {jour} {mois abrégé} · {HH:MM} » (12, seule exception avec la barre basse).
- Filtres : Dépôts = dépôts (dont vers une épargne) et corrections ; Retraits ; Épargnes = mises de côté, retours au solde et dépôts vers une épargne. Une seule puce active ; la puce d'épargne active seule, les puces de type neutres. Changer de filtre revient à la première page.
- États : **rempli** ; **filtre sans résultat** : « Aucun dépôt pour l'instant. » / « Aucun retrait pour l'instant. » / « Aucun mouvement d'épargne pour l'instant. » + lien « Tout voir » ; **vide** (compte neuf) : `IconPastille` vert doux 80 (Déposer) + « Tes opérations s'afficheront ici. » + bouton texte « Faire un dépôt » (→ C-00), aucune puce ; **masqué** ; **chargement** (squelette annoncé « Chargement de tes opérations », aucune puce, aucun montant) ; **hors ligne** : dernière liste connue, statuts tels que connus, « Voir plus » désactivé avec « Voir plus demande la connexion. ».
- Pagination : « Voir plus » charge `<taille de page>` lignes (7 au prototype), jamais de défilement infini.
- Interactions : une ligne → C-12 ; puces ; œil ; « Voir plus » ; barre basse.

### C-12 — Détail d'une opération

- Structure : `PageHeader` (←, titre du type : « Dépôt {opérateur} », « Dépôt vers {épargne} », « Mise de côté », « Retour au solde », « Retrait {opérateur} », « Correction ») + `MaskToggle` ; `StatusPill` du statut réel (statut combiné : « À reprendre » / « En attente » + phrase en Semi Bold) ; montant `amount` + « FCFA » (signe seulement si fait ; sinon `text-secondary` et phrase « Pas encore sur ton solde. » / « Rien n'est arrivé sur ton solde. ») ; flux Depuis ↓ Vers en lecture seule (opérateur + numéro, Mon solde, épargne, KOTIZ pour une correction) ; étapes ; lignes « Date » (« 18 oct. 2026, 09:24 »), « Frais » (si confirmés), « Référence » ; signalement ; « Lié à cette opération » ; actions.
- Étapes (`StepTracker`) :
  - dépôt vers une épargne : « Dépôt depuis {opérateur} » (Fait / En attente / Échoué) ; si le dépôt est fait, « Passage dans {épargne} » (Fait / En attente / Pas fait) ; après une reprise, « Passage dans {épargne} » reste « Pas fait » et « Reprise vers {épargne choisie} · {date} » est « Fait » ;
  - dépôt en attente vers le solde : « Demande envoyée à {opérateur} » Envoyée, « Ta validation sur {opérateur} » Validée, « Arrivée sur ton solde » En attente.
- États et actions :
  - **Fait** : principal « Voir le reçu » ; bouton texte « Signaler un problème ».
  - **En attente / on vérifie** : « Le reçu sera prêt quand ce sera fait. » ; « Ne refais pas l'opération. » (Semi Bold) ; **aucun bouton principal**, aucun reçu, aucun Réessayer ; « Signaler un problème » en bouton texte.
  - **Échoué** : « Ton dépôt n'a pas marché. » (dépôt) ou « Cette opération n'a pas marché. » ; aucun Réessayer (un dépôt échoué se refait par « Déposer », nouvelle demande) ; « Signaler un problème ».
  - **À reprendre** : « Les {montant} sont sur ton solde. » ; principal « Réessayer de mettre dans {épargne} » (→ reprise) ; lien « Voir le reçu du dépôt › » ; « Signaler un problème ». Solde à 0 : `Message` info « Ton solde est à 0 F. Rien à mettre dans {épargne} pour l'instant. » et Réessayer désactivé avec cette raison.
  - **Passage en attente** : lien « Voir le reçu du dépôt › » ; pas de Réessayer (voir Points ouverts).
  - **Reprise faite** : statut « Fait », étape de reprise, plus de Réessayer, « Voir le reçu ».
  - **Épargne fermée** : « {épargne} est fermée depuis le {date courte} » ; aucune action d'argent vers elle.
  - **Avec un dossier** : `InfoLine` « Mon signalement · {Envoyé | En cours | Résolu} · Dossier n° {id} » (→ C-15) ; « Signaler un problème » n'est plus proposé.
  - **Correction liée** : section « Lié à cette opération » : ligne « Correction · + {montant} » (sur l'opération d'origine) ou « Dépôt d'origine · {montant} » (sur la correction), date et `StatusPill`, → C-12 de l'autre opération. Aucune correction tant qu'elle n'est pas confirmée.
  - **Masqué** : montant et frais masqués ; **hors ligne non chargé** : « Détail indisponible hors connexion. » + « Réessayer ».
- « Signaler un problème » est **toujours un bouton texte**.

### C-13 — Reçu

- Structure : `PageHeader` (←, « Reçu ») + `MaskToggle` ; `Receipt`. Pas de bouton principal, pas de partage.
- Contenu : en-tête « KOTIZ » + `StatusPill done` ; type (« Dépôt Mobile Money », « Mise de côté », « Retour au solde », « Correction ») ; montant ; « Depuis » (opérateur + numéro complet, Mon solde, épargne) ; « Vers » (destination) ; dépôt vers une épargne : « Pour » {épargne}, « Dépôt » « Fait », « Passage dans {épargne} » « Fait » ; « Date » ; si les frais sont confirmés « Pris sur ton {opérateur} » {montant débité} et « Frais » {frais} ; « Référence » ; référence de l'opérateur si fournie (G01) ; « Cliente » {nom complet} ; pied : mentions légales du partenaire (G01) à la place de « Reçu fictif (prototype) ».
- **Dépôt fait, passage pas fait** : pas de `StatusPill` global, « Dépôt fait » en tête ; « Demandé pour » {épargne} ; « Arrivé sur » « Mon solde » ; « Dépôt » « Fait » ; « Passage dans {épargne} » « Pas fait » (croix, `text-danger`) ou « En attente » (`text-pending`) ; après une reprise : « Pas fait · repris le {date} » ; la mise de côté de la reprise a son propre reçu (C-09).
- **Jamais de reçu** pour une opération en attente, inconnue, échouée ou annulée. Masqué : montants et frais masqués. Hors ligne : reçu déjà ouvert affiché depuis le cache ; jamais ouvert : « Reçu indisponible hors connexion. ».
- Accès : C-12 « Voir le reçu » / « Voir le reçu du dépôt », C-05, C-09, B · B12. ← revient à l'écran d'ouverture.

### C-14 — Signaler un problème

- Structure : `PageHeader` (←, « Signaler un problème ») ; message d'erreur éventuel ; rappel de l'opération en lecture seule (bloc `surface-canvas` : « {titre du type} · {montant} », « {date courte} · {référence} », `StatusPill`) ; section « Qu'est-ce qui ne va pas ? » : options d'une ligne, sélection exclusive, **motifs lus en configuration (G03)**, aucun inventé ; `TextField multiline` « Ajoute un mot (facultatif) » ; bouton secondaire « Ajouter une photo (facultatif) » → vignette 48 + « Photo ajoutée » + « Retirer » ; bouton principal « Envoyer » ; sous le bouton : sans motif « Choisis ce qui ne va pas. », avec motif « L'envoi ne lance aucun remboursement. ».
- États : sans motif (Envoyer désactivé) ; prêt ; envoi (« Envoi… ») ; **échec ou hors ligne** : `Message` erreur titre « Rien n'est envoyé. », texte « Ta saisie est gardée. Réessaie. », bouton « Réessayer » ; **quitter** (← avec un mot ou une photo) : `ConfirmDialog` « Quitter sans envoyer ? », « Ton mot et ta photo seront perdus. », primaire « Rester », secondaire « Quitter » (→ C-12) ; sans mot ni photo, ← revient sans dialogue.
- Envoi réussi → C-15 du nouveau dossier, message « envoyé ». Photo : formats, taille, nombre, compression sur 3G à confirmer (G03, technique) ; ne jamais bloquer l'envoi sans photo.
- Accès : C-12 (tout statut, sans dossier existant), C-05 échoué « Ton {opérateur} a été débité ? Signale-le ».

### C-15 — Mon signalement

- Structure : `PageHeader` (←, « Mon signalement ») ; juste après l'envoi, `Message` **info** titre « Ton signalement est envoyé. », texte « Ce n'est pas un remboursement. » ; juste après une contestation, `Message` info titre « Ton dossier est rouvert. », texte « Ce n'est pas un remboursement. » ; « Dossier n° {id} » (`section`, tabulaire) + `StatusPill neutral` (« Envoyé », « En cours », « Résolu ») ; `CaseTimeline` « Où en est ton dossier » (jalons datés, en cas de contestation « Contesté » puis « En cours » **sans effacer** « Résolu ») ; réponse : section « Réponse du conseiller », texte, « Le {date} », si Résolu « Résolu ne veut pas dire remboursé. » (Semi Bold), si Résolu sans correction liée « Aucune somme n'a été versée pour ce dossier. » ; sans réponse : « Un conseiller va regarder ton dossier. » ; section « L'opération » (ligne : titre · montant, date · référence, statut financier réel, → C-12) + lien « Voir la correction › » si une correction confirmée existe ; section « Ce que tu as envoyé » (« Motif », « Ton mot », « Photo » « 1 photo ») ; lien « Contacter l'aide › » ; zone d'action : bouton **secondaire** « Je conteste cette réponse », seulement sur un dossier Résolu contestable.
- ← → C-12 de l'opération du dossier. Aucun délai annoncé. Hors ligne : dernière version datée.

### C-16 — Je conteste cette réponse (feuille)

- Structure : `BottomSheet` « Tu n'es pas d'accord ? », « Fermer » ; message d'erreur éventuel ; « Ton dossier n° {id} sera rouvert. » ; `TextField multiline` « Dis pourquoi (facultatif) » ; « Ce n'est pas un remboursement. » ; bouton principal « Envoyer ma contestation ».
- États : prêt ; envoi (« Envoi… ») ; échec ou hors ligne : `Message` erreur « Rien n'est envoyé. » / « Ta saisie est gardée. Réessaie. », bouton « Réessayer » ; succès : feuille fermée, C-15 « En cours » + message « Ton dossier est rouvert. ».
- Même dossier, même référence : ni nouveau dossier, ni remboursement, ni transaction.

### C-17 — Montre Mon QR à une agente

- Structure : `PageHeader` (←, « Déposer auprès d'une agente ») ; pastille bleue 80 avec `agente.svg` 64 ; titre « Montre Mon QR à une agente » ; étapes numérotées « 1 L'agente scanne ton QR. », « 2 Tu vérifies le montant dans KOTIZ. », « 3 Tu donnes les espèces. » ; « Rien ne bouge avant ta confirmation. » (Semi Bold) ; depuis C-06 : « Dis à l'agente que c'est pour {épargne}. » ; bouton principal « Afficher Mon QR » (→ A · Q01).
- ← → C-00 ou C-06 rouverte. Aucun réseau requis ; aucun montant, aucun statut, aucune liste d'agentes. Le parcours agente (scan, montant, confirmation, remise) est au lot E.

### Raccords vers les autres lots

- **A · H01** : raccourci « Déposer » → C-00 ; « Dernier dépôt » (dépôts seulement, montant + statut, **sans destination**, PNV-2 refusée) → C-12 du dernier dépôt ; un dépôt en attente ne change pas le solde (« Dernier dépôt » En attente) ; « Dernières opérations » utilise la nouvelle `TransactionRow` (3 lignes) ; « Tout voir » et une ligne → C-11 / C-12 ; onglet Opérations → C-11 sans filtre.
- **A · E08** : « Faire mon premier dépôt » → C-00 (au lieu de C-01).
- **B · B07** : « Mettre de l'argent » → C-06 avec l'épargne ; « Tout voir › » de « Derniers mouvements » → C-11 filtrée sur l'épargne ; une ligne → C-12. Lignes vues depuis l'épargne : dépôt « Dépôt {opérateur} » ; mise de côté « Depuis mon solde » ; retour « Vers mon solde ». **Nouvel état « Dépôt pas entré »** (report du lot C, validé le 20 octobre 2026) : pour un dépôt fait dont le passage a échoué et n'est pas repris, `InfoLine` « {montant} sont restés sur ton solde. Les mettre ici › » (→ reprise : C-08, ou C-07 / C-10 selon le solde et l'épargne) ; dans « Derniers mouvements », ligne « Depuis {opérateur} » · « Sur ton solde » · « {montant} » **sans « + »**, en `text-secondary` · « Pas entré » (croix, `text-danger`), pastille d'échec ; toucher la ligne ouvre la reprise. **Jamais « Échoué »** pour ce dépôt. Dépôt dont le passage est en attente : ligne « En attente » ; le montant et la barre de l'épargne restent sur le confirmé.
- **B · B12** : « Voir le reçu › » → C-13 du retour ; « Tu le retrouves dans Opérations » → C-11.
- **C → B** : « Créer une épargne » (C-05, C-10) → B02, ou B15 à 3 actives ; « Voir mon épargne » → B07.
- **C → A** : « Afficher Mon QR » → A · Q01.
- **C → E / D / F** : dépôt en espèces (lot E, après C-17) ; lignes « Retrait » (lot D) ; « Contacter l'aide », notifications d'évolution, SMS de confirmation (lot F) : « Bientôt ici » tant que le lot n'est pas livré.

## Règles transverses

### Statuts et vocabulaire

- « Fait », « En attente », « Échoué » : mot + pictogramme + couleur ; « Fait » seulement après confirmation du partenaire (dépôt) ou du serveur (mouvement interne). « À reprendre » = attente d'une action de la cliente (ambre + horloge). « Pas fait » et « Pas entré » = étape ou passage échoué, jamais le statut du dépôt.
- Un **dépôt fait n'est jamais « Échoué »** parce que l'affectation a échoué (C-05, C-11, C-12, C-13, B07).
- Dossier : « Envoyé », « En cours », « Résolu », « Contesté » en neutre, jamais en vert. **Résolu ≠ Remboursé** : le mot « remboursé » n'apparaît jamais pour un dossier.
- Libellés : « Déposer » (entrée externe), « Mettre de l'argent » (bouton), « mettre de côté » (titres), « Remettre sur mon solde » (lot B). Jamais « affecter », « allocation », « transfert », « retrait » pour un mouvement interne, ni de référence à la tontine.

### Frais (G01)

- Dépôt Mobile Money : frais **lus dans la configuration du partenaire**, renvoyés par le serveur avec le récapitulatif (montant, frais, montant débité, montant arrivé). **Frais inconnus = autorisation bloquée** (C-03 bloqué, serveur qui refuse de créer l'ordre). Aucun taux, aucun frais par défaut dans le code.
- Mise de côté et reprise : **sans frais**, aucune ligne Frais. Retour au solde (lot B) : sans frais.
- Affichage d'un frais confirmé : C-03 (« Pris sur ton {opérateur} », « Frais », « Arrive sur ton solde »), C-04 (titre avec le montant débité), C-12 (« Frais »), C-13 (« Pris sur ton {opérateur} », « Frais »). Sans frais confirmé, aucune de ces lignes.

### Montants, signes et soldes (H5, H8)

- Solde et épargnes : **confirmé seulement** (à confirmer G01). Un dépôt en attente n'augmente ni le solde ni l'épargne ; une mise de côté en attente ne baisse pas le disponible affiché, mais le disponible utilisable pour une nouvelle mise de côté exclut l'argent déjà engagé (contrôle serveur).
- Signes vus depuis le solde (H01, C-11, C-12) : « + » arrive sur le solde (dépôt, retour), « − » le quitte (mise de côté, retrait) ; dépôt vers une épargne : une ligne « + {montant} ». Depuis une épargne (B07) : point de vue de l'épargne. Signe seulement si fait.
- Reprise : montant = plus petit du montant du dépôt d'origine et du disponible ; plafond identique ; jamais d'autres fonds prélevés en silence.
- Progression : fonction F03 unique du lot B (`⌊épargné / cible × 100⌋`, barre plafonnée, « objectif atteint » sans coche).

### Formats (PRODUCT.md)

- Montants entiers FCFA, espace insécable des milliers, « {n} FCFA » dans les montants dominants, « {n} F » dans les lignes ; `formatAmount` partagé ; jamais de coupure dans un montant ni une référence. Backend : `Money` en centimes, jamais de `float`.
- Dates : longues « 18 oct. 2026, 09:24 » (détail, reçu) ; courtes « 18 oct. » (« Suite à ton dépôt … du 18 oct. », « Pour ton dépôt du 10 oct. », fil du dossier) ; lignes « 18 oct. · 09:24 » ; groupes « Aujourd'hui », « Hier », « 17 octobre » (fuseau Abidjan, UTC+0).
- Numéro : « 07 08 12 34 56 » (groupes de 2) en entier ; abrégé dans une ligne de retrait « 07 08 … 56 ».
- Espace insécable avant « ? », « ! » et « : ».

### Masquage des montants

- Réglage unique des lots A et B, persistant, basculé par l'œil de H01, B01, B07, C-11, C-12 ou C-13. Masqué : C-11, C-12 (montant, frais), C-13 (montant, frais, « Pris sur ton … ») ; « ••• F », lu « Montant masqué ».
- **Toujours visibles** : saisie (C-02, C-07), récapitulatifs (C-03 ; C-08 sauf « Il restera sur ton solde »), attente (C-04), résultats (C-05, C-09), feuille C-10 (« Tes {montant} sont sur ton solde. »), rappel d'opération de C-14.

### Navigation et pile

- C-01 à C-03 forment une pile ; après l'envoi (C-04), la pile est vidée : aucun retour vers la saisie. Après C-05 ou C-09, la pile est vidée : Fermer / retour Android → H01 ou B07.
- Reprise : C-08 (← → l'écran d'où elle part : C-05, C-12 ou B07) ; C-07 reprise (← idem).
- C-00, C-06, C-10, C-16 et « Le dépôt n'arrive pas ? » : feuilles ; « Quitter sans envoyer ? » : dialogue ; retour Android = fermer.
- C-12 ← → écran d'ouverture (C-11, H01, B07, C-05, C-08, C-15) ; C-15 ← → C-12 de l'opération du dossier.

### Réseau, idempotence, concurrence

- Pas de file hors ligne : déposer, mettre de côté, reprendre, signaler et contester demandent le réseau ; la saisie est gardée.
- **Dépôt** : clé d'idempotence générée à l'entrée de C-03, réutilisée par toute nouvelle tentative d'envoi et par l'interrogation du statut ; « Réessayer » après un échec ou une annulation **confirmés** crée une nouvelle demande (nouvelle clé, nouvelle validation chez l'opérateur). Un second dépôt pendant qu'un premier est en attente = nouvelle demande distincte (montant et référence propres), jamais la répétition de la même (Q11).
- **Mise de côté et reprise** : clé générée à l'entrée de C-08 ; une seule reprise à la fois par dépôt d'origine (la seconde reçoit l'état de la première).
- **Signalement et contestation** : clé par envoi ; un seul dossier par opération (à confirmer G03).
- Résultat inconnu (délai, connexion perdue après envoi) : « En attente » interrogeable, **jamais de Réessayer**.
- Le serveur fait foi pour : frais, disponibilité des opérateurs, règles du compte (refus connu d'avance, sans valeur chiffrée), épargne ouverte, disponible, limite de 3, dossier existant.

### Backend

- **Payments** — ordre de dépôt (`PaymentOrder`) : numéro vérifié de la cliente seulement, opérateur, montant, frais confirmés, destination (solde ou épargne), `IdempotencyKey` unique ; confirmations du partenaire (`PaymentCallback`) idempotentes, y compris tardives ; un ACL par opérateur (`PaymentProvider`). Statuts : en attente de validation, validé, fait, en attente, échoué, annulé, refusé. Refus de créer l'ordre si les frais sont inconnus ou si une règle l'interdit (raison communicable, sans valeur chiffrée). Événements `PaymentInitiated`, `PaymentConfirmed`, `PaymentFailed`.
- **Savings** — crédit du solde **seulement** à la confirmation, en écritures équilibrées (montant arrivé ; frais en écriture séparée selon la configuration) ; **affectation** solde → épargne (mise de côté, reprise, ou suite d'un dépôt vers une épargne), en écritures équilibrées, **sans frais**, montant > 0, ≤ disponible confirmé, vers une épargne active de la cliente ; **lien dépôt ↔ affectation** : l'opération « dépôt vers une épargne » expose deux statuts ; l'échec de l'affectation laisse le dépôt « fait » et l'argent sur le solde ; **reprise** = nouvelle affectation liée au dépôt d'origine, plafonnée au montant d'origine et au disponible, nouvelle confirmation, nouvelle clé, aucune écriture Payments. Aucune affectation automatique, aucune réouverture d'épargne, aucun `GoalLock`.
- **Historique** : liste unique paginée (dépôts, retraits, mouvements internes, corrections confirmées), filtres par type et par épargne, statuts réels jamais promus ; détail d'une opération ; reçu d'une opération faite seulement.
- **Signalement, dossier, contestation, correction** (contexte à désigner) : dossier lié à une opération, référence propre, motif (liste configurée), mot et photo facultatifs, statuts envoyé / en cours / résolu, réponse du conseiller, contestation sur le même dossier (historique conservé) ; **aucun mouvement d'argent** créé par un dossier ; la **correction** est une opération propre, confirmée, en contre-écritures liées à l'opération d'origine (ledger immuable), visible seulement une fois confirmée.
- **Notifications** (lot F) : SMS de confirmation d'un dépôt, évolutions d'un dossier : hors lot C.

### Accessibilité

- Cibles ≥ 48 (lignes de choix ≥ 64) ; texte essentiel ≥ 14 ; titre de chaque écran annoncé `header` ; résultats et titre de C-04 en zone de statut (`accessibilityLiveRegion`) ; erreurs `alert` ; TalkBack annonce chaque changement d'étape de C-04.
- Noms accessibles : flux « De {opérateur} vers {destination} » / « De Mon solde vers {épargne} », « Modifier le montant », « Fermer » des feuilles et résultats, « Retirer le filtre {épargne} », œil « Masquer les montants » / « Afficher les montants », « Montant masqué », squelette « Chargement de tes opérations ».
- Ligne désactivée : `accessibilityState.disabled` + raison lue ; raison d'un bouton désactivé reliée au bouton.
- Statut jamais porté par la couleur seule ; logos opérateurs décoratifs (le nom est dans le texte), illustrations décoratives.
- Grand texte : nom d'opérateur et statut de ligne passent à la ligne, montant à 34 garde sa taille, aucun chevauchement.

### Animations

- Changements d'étape de C-04 et apparition du résultat : fondu ≤ 200 ms, sans célébration ; 0 ms en « réduire les animations ». Aucune animation de succès pendant une attente.

## Cas limites

- **Montants** : 7 chiffres à 320 (« 1 250 000 FCFA » garde 34, « FCFA » passe dessous) ; dépôt qui fait dépasser la cible (autorisé, « objectif atteint ») ; mise de côté de tout le solde (« Il restera sur ton solde » 0 F).
- **Noms** : épargne au nom long (titre et lignes à la ligne, sous-titre de `TransactionRow` tronqué avec « … », nom complet au détail) ; deux épargnes au même nom ; opérateur au nom long.
- **Listes** : aucun opérateur ; un seul opérateur ; aucune opération ; filtre vide ; plusieurs opérations en attente ; opération en attente depuis longtemps (reste « En attente ») ; épargne fermée et ses lignes « (fermée) ».
- **Double soumission** : chaque bouton d'envoi passe en `loading` ; clé d'idempotence réutilisée ; reprise ouverte depuis C-05 et C-12 : une seule tentative.
- **Concurrence** : opérateur indisponible ou épargne fermée entre C-01 et C-03 ; solde baissé entre C-07 et C-08 ; épargne fermée avant une reprise ; 3e épargne créée ailleurs avant C-10 (le serveur fait foi pour la limite) ; correction confirmée pendant la lecture d'un dossier.
- **Interruption** : app en arrière-plan sur C-03 ou C-08 → récapitulatif relu ; fermée pendant la validation chez l'opérateur → réouverture sur C-04 / C-05 ou « Dernier dépôt · En attente » ; résultat arrivé app fermée → H01 et C-11 montrent le statut réel.
- **Hors ligne** : à chaque envoi (rien envoyé, saisie gardée) ; Opérations, détail et reçu (dernière version connue, datée, ou indisponible).
- **Session expirée** pendant un parcours : retour à A · C01 ; une demande de dépôt déjà envoyée n'est jamais renvoyée, son statut se lit après reconnexion ; saisie gardée seulement si la règle de reprise du lot A le permet (G02).
- **Permissions** : photo de C-14 (galerie ou appareil photo) : refus → l'envoi reste possible sans photo, aucun blocage ; aucune autre permission.
- **Opérateur** : SMS de l'opérateur avant le résultat KOTIZ (ignoré) ; annulation chez l'opérateur ; validation hors délai (C-05 « On vérifie », puis statut réel quand il arrive).

## Critères d'acceptation

Chaque groupe peut devenir un ticket ; le rattachement aux issues est dans [issues-lot-c.md](issues-lot-c.md), les scénarios dans [gherkin-lot-c.md](gherkin-lot-c.md).

### Socle lot C — composants et assets

- [ ] `TransactionRow` a un sous-titre, la variante `internal` (pastille neutre, flèches internes, jamais de logo ni de vert doux), le statut combiné (« À reprendre » / « En attente » en ambre + phrase) et n'affiche « + » ou « − » que pour une opération faite.
- [ ] Une ligne de choix (`OperatorRow` et options de C-00 / C-06) existe avec logo ou illustration, libellé, chevron, état désactivé avec raison lue.
- [ ] `LinkedStatusRows`, `FilterChips` (une seule puce active), `Receipt`, `CaseTimeline` (sans vert) et les étapes numérotées existent ; `StepTracker` a le statut `failed` « Pas fait » et ne montre jamais « Fait » sur une attente.
- [ ] L'écran de résultat plein écran et la zone d'action fixe sont des compositions partagées par C-05 et C-09.
- [ ] Les illustrations `Actions/mobile-money.svg` et `Actions/agente.svg` et les logos officiels des opérateurs (Wave en symbole seul) sont embarqués ; aucun logo n'est recoloré.
- [ ] Aucun frais, taux, minimum, plafond, délai ni motif de signalement n'est écrit en dur.

### C-00 et C-17 — Choisir comment déposer

- [ ] « Déposer » (H01), « Faire mon premier dépôt » (E08) et « Faire un dépôt » (C-11 vide) ouvrent la feuille « Comment tu veux déposer ? » avec « Par Mobile Money » et « Auprès d'une agente », sans bouton principal ni montant.
- [ ] Fermer la feuille ramène à l'écran d'origine ; sans opérateur, « Par Mobile Money » est désactivé avec sa raison.
- [ ] C-17 explique en trois étapes, n'affiche ni montant ni statut, et « Afficher Mon QR » ouvre Mon QR ; son retour rouvre la feuille d'origine (C-00 ou C-06).

### C-01 à C-04 — Déposer par Mobile Money

- [ ] « Étape 1 sur 4 » à « Étape 4 sur 4 » ; la destination est lisible sur chaque écran.
- [ ] C-01 liste les opérateurs disponibles sans radio ni Continuer ; un seul opérateur reste une liste ; sans opérateur, le lien vers l'agente est proposé ; hors connexion, la dernière liste datée est désactivée avec sa raison.
- [ ] Le numéro vérifié est affiché sur C-01 et C-03, sans champ, bouton ni lien pour un autre numéro.
- [ ] C-02 : Continuer désactivé si vide ou 0, avec la raison ; montants rapides qui remplacent la saisie ; au-delà du niveau d'accès, message, lien ou phrase d'identité, Continuer désactivé, aucune limite chiffrée.
- [ ] C-03 montre « Tu déposes », d'où et vers où, et, **seulement si les frais sont confirmés**, « Pris sur ton {opérateur} », « Frais », « Arrive sur ton solde » ; vers une épargne, les deux temps numérotés et « Dans {épargne} après ».
- [ ] **Frais inconnus** : message, aucune ligne de frais, « Déposer » désactivé avec « Déposer est bloqué : frais inconnus. », rien n'est envoyé ; le serveur refuse aussi de créer l'ordre.
- [ ] Refus connu d'avance, opérateur devenu indisponible et épargne fermée entre-temps ont leur message, leur bouton et n'envoient rien.
- [ ] Aucun écran ne demande le code Mobile Money ni le PIN KOTIZ.
- [ ] C-04 : pas de retour, titre avec le montant débité, étapes « Envoyée » / « Validée », jamais « Fait » ni « J'ai validé » ; « Le dépôt n'arrive pas ? » ouvre l'aide sans créer de demande.
- [ ] Au retour depuis l'application de l'opérateur ou au relancement, l'app affiche l'état réel de la même demande (C-04 ou C-05), sans nouvelle demande.
- [ ] Un double appui sur « Déposer {montant} » ne crée qu'une demande ; hors connexion, rien n'est envoyé et « Réessayer » s'affiche.

### C-05 — Résultat du dépôt — critères

- [ ] Plein écran, croix « Fermer » seule en haut, statut et montant dans le tiers haut, actions en bas.
- [ ] « Fait » seulement après la confirmation du partenaire ; en attente et « On vérifie » : ambre + horloge, « Ne refais pas l'opération. », ni reçu ni Réessayer.
- [ ] À reprendre : « {montant} sont sur ton solde. », « {épargne} ne les a pas reçus. », Dépôt Fait / Dans {épargne} À reprendre, « Reprendre », « Laisser sur mon solde », « Voir le reçu du dépôt » ; jamais « Échoué » pour le dépôt.
- [ ] Dépôt fait, passage en attente : aucun Reprendre ni Réessayer.
- [ ] Annulé : « Rien n'a été pris sur ton {opérateur}. » n'apparaît que si G01 le garantit ; Réessayer repasse par C-03 relu et une nouvelle validation.
- [ ] Échoué : « Ton {opérateur} a été débité ? Signale-le » ouvre le signalement de cette opération.
- [ ] Fermer, Terminé et le retour Android mènent à l'accueil ou à l'épargne, jamais à C-03 ni C-04.
- [ ] Après un dépôt fait vers le solde, le solde augmente du montant arrivé ; en attente, il ne change pas et « Dernier dépôt » dit « En attente », sans destination.

### C-06 — D'où vient l'argent ?

- [ ] Feuille « D'où vient l'argent ? » avec « Pour : {épargne} » et trois origines ; solde en premier s'il est > 0, sinon Mobile Money en premier et « Mon solde disponible » désactivé avec « Rien sur ton solde pour l'instant. ».
- [ ] Mobile Money ouvre C-01 « Pour : {épargne} » ; espèces ouvre C-17 avec « Dis à l'agente que c'est pour {épargne}. » ; fermer ramène à l'épargne.

### C-07 à C-09 — Mettre de l'argent depuis mon solde

- [ ] « Étape 1 sur 2 » et « Étape 2 sur 2 » ; Continuer désactivé si vide, 0 ou supérieur au disponible, avec la raison ; « Tout mon solde » remplit le disponible.
- [ ] C-08 n'a **aucune ligne de frais** et **aucun PIN** ; « Il restera sur ton solde » (retirée en masqué) et « Dans {épargne} après » sont exacts.
- [ ] Solde changé → C-07 avec « Ton solde a changé. » ; refus connu d'avance : message, bouton désactivé avec sa raison, aucune valeur.
- [ ] C-09 « Fait » seulement après confirmation ; attente et inconnu sans Réessayer ; échoué : « Ton argent n'a pas bougé. Il est sur ton solde. » et Réessayer qui relit C-08.
- [ ] Fermer et le retour Android mènent au détail de l'épargne.
- [ ] La mise de côté apparaît dans Opérations en « Vers {épargne} · Depuis ton solde · − {montant} », variante interne.

### Reprise (C-05, C-07, C-08, C-10, C-12, B07)

- [ ] La reprise n'est proposée que pour un dépôt fait dont le passage a échoué de façon confirmée, depuis C-05, C-12 et B07, sans limite de temps.
- [ ] C-08 reprise : titre « Réessayer de mettre de côté », lien « Suite à ton dépôt {opérateur} du {date} », pas de compteur, « Plus tard » ; jamais d'opérateur, de validation chez l'opérateur, de PIN, ni d'ordre de paiement.
- [ ] Solde baissé : C-07 reprise, montant prérempli et plafonné au plus petit du dépôt d'origine et du disponible ; solde à 0 : Réessayer désactivé avec sa raison.
- [ ] Épargne fermée : C-10 liste les autres épargnes actives, « Laisser sur mon solde » ; à 3 actives, texte « 3 épargnes actives : c'est le maximum. » sans lien ; jamais de réouverture ni de mise de côté automatique.
- [ ] Reprise faite : C-09 « Ton dépôt du {date} est maintenant dans {épargne}. », ligne d'Opérations « Fait », étape « Reprise vers … · {date} » dans C-12, reçu du dépôt « Pas fait · repris le {date} ».
- [ ] « Laisser sur mon solde » et « Plus tard » laissent l'argent sur le solde et gardent la reprise.

### C-11 — Opérations

- [ ] Racine avec barre basse, sans bouton principal ; lignes groupées par jour, titre, sous-titre, montant et statut en mots.
- [ ] Un dépôt vers une épargne tient sur une seule ligne, avec le statut combiné quand le passage n'est pas fait.
- [ ] Filtres Tout / Dépôts / Retraits / Épargnes et filtre d'épargne depuis B07, une seule puce active ; textes de filtre vide.
- [ ] « Voir plus » pagine, jamais de défilement infini ; vide : « Tes opérations s'afficheront ici. » + « Faire un dépôt » ; masqué ; hors ligne daté avec « Voir plus » désactivé ; chargement sans montant ni « 0 ».

### C-12 — Détail d'une opération — critères

- [ ] Titre du type, statut réel, montant (signe seulement si fait, sinon phrase « Pas encore sur ton solde. » ou « Rien n'est arrivé sur ton solde. »), flux Depuis / Vers, date, frais si confirmés, référence.
- [ ] Dépôt vers une épargne : étapes Dépôt / Passage (/ Reprise) avec leurs statuts réels.
- [ ] En attente : « Le reçu sera prêt quand ce sera fait. », aucun bouton principal ; « Signaler un problème » est toujours un bouton texte.
- [ ] À reprendre : « Réessayer de mettre dans {épargne} » principal, « Voir le reçu du dépôt » ; dossier existant : ligne « Mon signalement · … » à la place de « Signaler un problème » ; correction liée dans « Lié à cette opération ».
- [ ] Masqué ; hors ligne non chargé : « Détail indisponible hors connexion. » + « Réessayer ».

### C-13 — Reçu — critères

- [ ] Reçu seulement pour une opération faite, avec type, montant, Depuis, Vers ou Pour, date, référence, nom de la cliente, et « Pris sur ton {opérateur} » + « Frais » seulement si confirmés.
- [ ] Dépôt fait, passage pas fait : pas de « Fait » global, « Dépôt fait », « Demandé pour », « Arrivé sur : Mon solde », passage « Pas fait » en rouge avec croix.
- [ ] Pas de bouton Partager ; masqué ; hors ligne : cache ou « Reçu indisponible hors connexion. ».

### C-14 à C-16 — Signaler, suivre, contester

- [ ] Le signalement reprend l'opération sans ressaisie ; motif requis (liste configurée) ; mot et photo facultatifs ; « L'envoi ne lance aucun remboursement. ».
- [ ] Échec ou hors ligne : « Rien n'est envoyé. », saisie gardée ; « Quitter sans envoyer ? » seulement avec un mot ou une photo.
- [ ] Après l'envoi : message **information** « Ton signalement est envoyé. » / « Ce n'est pas un remboursement. », dossier à référence propre, statut neutre « Envoyé ».
- [ ] Un seul dossier par opération : le détail ouvre le dossier existant.
- [ ] Résolu : « Résolu ne veut pas dire remboursé. », et sans correction « Aucune somme n'a été versée pour ce dossier. » ; avec correction, « Voir la correction » ouvre le détail de la correction liée.
- [ ] « Je conteste cette réponse » (secondaire, seulement sur Résolu) rouvre le même dossier : même référence, « Résolu » gardé, « Contesté » puis « En cours », message « Ton dossier est rouvert. ».
- [ ] Aucun dossier, résolution ni contestation ne crée de mouvement d'argent ; aucun délai n'est annoncé.

### Raccords A · H01, A · E08, B · B07, B · B12

- [ ] H01 : « Déposer » → C-00 ; « Dernier dépôt » montre montant et statut sans destination et ouvre le détail ; « Dernières opérations » utilise la nouvelle `TransactionRow`.
- [ ] E08 : « Faire mon premier dépôt » → C-00.
- [ ] B07 : « Mettre de l'argent » → C-06 ; « Tout voir » → Opérations filtrées ; état « Dépôt pas entré » (`InfoLine` « {montant} sont restés sur ton solde. Les mettre ici › », ligne « Depuis {opérateur} · Sur ton solde · {montant} · Pas entré ») qui ouvre la reprise ; jamais « Échoué » pour ce dépôt.
- [ ] B12 : « Voir le reçu » → reçu du retour au solde.

### Backend Payments et Savings

- [ ] Un ordre de dépôt n'est créé que depuis le numéro vérifié, avec des frais confirmés, une clé d'idempotence unique, et une raison communicable en cas de refus.
- [ ] Le solde n'est crédité qu'à la confirmation du partenaire, en écritures équilibrées ; les confirmations rejouées ou tardives ne produisent aucun second effet.
- [ ] Un dépôt vers une épargne crée un dépôt puis une affectation liés ; l'échec de l'affectation laisse le dépôt fait et l'argent sur le solde, sans nouvel ordre.
- [ ] Mise de côté et reprise : écritures équilibrées, sans frais, ≤ disponible confirmé, vers une épargne active ; reprise liée au dépôt d'origine, plafonnée à son montant, une seule à la fois.
- [ ] L'historique renvoie une liste unique paginée avec les statuts réels (deux statuts pour un dépôt vers une épargne) ; aucun reçu n'existe pour une opération non faite.
- [ ] Un dossier de signalement ne crée aucune écriture ; une correction n'apparaît que confirmée, en contre-écritures liées à l'opération d'origine.
