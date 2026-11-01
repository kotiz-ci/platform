# Audit des composants — App cliente, lots A à D

Date : 21 octobre 2026. Lecture seule : ni le canvas, ni le Design System, ni DESIGN.md n'ont été modifiés.

**Objet.** Lister ce qui doit devenir réutilisable avant les lots E (cash et agente) et F (sécurité, aide, notifications), et avant que le socle UI soit codé ([#59](https://github.com/kotiz-ci/platform/issues/59)).

**Sources lues.**

- Canvas « KOTIZ — App cliente » ([2bNTYJFqK5bnT5vaGYmTGF](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), version `1792590345-9ff9`). Fichiers lus : les 4 composants d'écrans `A-Proto`, `B-Proto`, `C-Proto` et `D-Proto` (4 315 lignes), les 55 planches, `kotiz-app.css` (502 lignes), `kotiz-tokens.css` et la copie du DS dans `project/ds/kotiz/`. Il n'existe pas de fichier `lot-*.css` : toutes les règles propres aux lots sont dans `kotiz-app.css`, sous les préfixes `la-`, `lb-`, `lc-` et `ld-`.
- KOTIZ Design System ([F7WrzuAZTLaJ1MEGEEu134](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134), version `1792593410-9a1e`) : `README.md`, `bundle.js`, `bundle.css`, `index.d.ts`, `tokens.json` et les 32 fiches de composants.
- Dépôt, branche `docs/restructure-documentation` : `DESIGN.md`, `screens*.md` (§ Composants candidats), `handoff-lot-*.md` (§ Composants et « Hors Design System »), `critique*.md`.

**Méthode.** Chaque prototype a été découpé en sections d'écran, à partir de ses commentaires `<!-- ===== … ===== -->`. Dans chaque section, on a compté les `Kotiz.*` importés et recherché les classes recopiées. Le comptage se fait en **écrans uniques** : 63 écrans produit, dont 3 de l'app agente (A02 à A04). Les raccords, c'est-à-dire les copies d'un écran d'un autre lot (7 sections : H01 ×3, B07, E08 ×2, B15), sont exclus du compte et étudiés à part (§ 2.1). Les écrans « Bientôt ici » et la simulation d'opérateur sont aussi exclus, car ils n'existent que dans le prototype.

---

## 0. Trois constats d'abord

1. **Le canvas dessine avec un DS en retard de trois versions.** La copie `project/ds/kotiz/` est la **v9**, avec 23 composants. Le DS publié est en v12 et compte **33 composants**. Les 10 composants promus depuis le lot B n'existent donc pas dans le canvas : `RootHeader`, `MaskToggle`, `GoalTypeOption`, `GoalTypeGrid`, `GoalProgress`, `AmountField`, `DateChoice`, `ConfirmDialog`, `SummaryPreview` et `SummaryFlow`. Les lots B, C et D les redessinent à la main avec les classes `lb-*` (environ 140 lignes de `kotiz-app.css`). Le DS contient, lui, sa propre version de ces règles (`kz-flowsum`, `kz-preview`, `kz-dialog`…). Il y a donc **deux implémentations parallèles**, qui ont déjà divergé : les lots C et D ont ajouté au `lb-flowsum` du canvas des éléments que le `SummaryFlow` du DS ne connaît pas (§ 2.6). Or les handoffs C et D disent aux devs « `SummaryFlow` du DS v12 ».
2. **Les écrans recopiés d'un lot à l'autre ne sont plus identiques** (§ 2.1). E08 existe en 3 copies : le lot A l'a passé en plein écran, les copies des lots B et C sont restées en carte centrée. H01 existe en 4 copies avec trois rendus de la liste d'opérations.
3. **`StepTracker` : tous les prototypes contournent l'absence de `sent`** dans la copie v9 avec `status: 'done', word: 'Envoyée'`. Au lot A, on n'a même pas de `word` : sur l'écran d'attente « On vérifie ton compte », l'étape « Demande envoyée » affiche **« Fait »**. Cela contredit la décision PO du 19 octobre (jamais « Fait » sur un écran d'attente, DESIGN.md § StepTracker).

---

## 1. Composants `Kotiz.*` réellement utilisés

Comptage sur les 63 écrans uniques.

| Composant                                | Écrans | Où (exemples)                                                                  | Remarque                                                                                                       |
| ---------------------------------------- | -----: | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `Button`                                 |     52 | partout                                                                        | `style="width: 100%"` ajouté à la main 25 fois (§ 3.4)                                                         |
| `PageHeader`                             |     45 | toute page poussée                                                             | 6 fois dans un bricolage `lb-head-row` + `style="flex: 1 1 auto"` pour y coller l'œil (§ 2.11)                 |
| `Message`                                |     29 | A · E02, E03, C01 ; B · B06, B10, B11 ; C · C-01, C-03 ; D · D-02, D-03, D-04… | Sert aussi pour le hors-connexion, avec 5 formulations différentes (§ 2.9)                                     |
| `StatusPill`                             |     12 | A · A04, E07 ; B · B07, B12 ; C · C-05, C-09, C-12 à C-15 ; D · D-05           | Sert aussi de statut de ligne (A04, C-05, C-12, C-15)                                                          |
| `BottomSheet`                            |     10 | A · S01 ; B · B13, B15 ; C · C-00, C-04, C-06, C-10, C-16 ; D · D-00, D-07     | Les 10 ajoutent la croix « Fermer » et le voile à la main (§ 2.8). La prop `options` n'est **jamais** utilisée |
| `IconPastille`                           |      8 | A · E01, E05, E09, E10 ; B · B01, B15 ; C · C-10, C-11                         | Recomposée à la main 4 fois (C-00, C-17, D-00, D-06), parce qu'il n'y a ni teinte neutre ni illustration 64    |
| `TextField`                              |      7 | A · E02, E03, E04, A02 ; B · B04, B05, B08                                     | Le mode multiligne (DS v10) est recomposé en `textarea` sur 4 écrans (B05, B08, C-14, C-16)                    |
| `StepTracker`                            |      6 | A · E07 inconnu ; B · B12 ; C · C-04, C-05, C-09 ; D · D-05                    | `sent` contourné partout ; état `failed` recomposé à la main sur C-12                                          |
| `PinSlots`+`PinPad`                      |      4 | A · E06/E07, C01 ; B · B11 ; D · D-04                                          | Pavé désactivé recomposé en `ld-pad-off` (D-04)                                                                |
| `GoalRow`                                |      3 | A · H01 ; B · B01 ; C · C-10                                                   | Variante « atteinte » recomposée à la main sur 4 écrans (B01, H01 ×2, C-10), variante « fermée » sur B01       |
| `InfoLine`                               |      3 | A · H01 ; B · B07 ; C · C-12                                                   | —                                                                                                              |
| `BottomNav`                              |      3 | A · H01 ; B · B01 ; C · C-11                                                   | —                                                                                                              |
| `NumberChip`                             |      2 | A · E09, E10                                                                   | —                                                                                                              |
| `TransactionRow`                         |      2 | A · H01 ; B · B07                                                              | Recomposé à la main (`lc-tx`) partout ailleurs (§ 2.3)                                                         |
| `CheckOption`                            |      1 | A · E05                                                                        | —                                                                                                              |
| `HomeHeader`, `Shortcuts`, `BalanceCard` |      1 | A · H01 (copié dans B, C et D)                                                 | `BalanceCard` recomposé en entier, en HTML, dans les copies C et D pour la ligne « Retrait en attente »        |

**Jamais utilisés dans le canvas** :

- `AmountInput`, `GoalCard`, `OperationStatus` et `IllustratedResult` sont présents dans la copie v9, mais aucun écran ne s'en sert.
- Les 10 composants du lot B sont absents de la copie v9 (constat 1). Ils sont pourtant cités comme « réutilisés tels quels » dans les handoffs C et D.

---

## 2. Éléments répétés qui ne sont pas (ou plus) des composants

Pour chaque élément, on indique :

- **Où** : les écrans ;
- **Divergence** : ce qui diffère d'une copie à l'autre ;
- **Proposition** : nouveau composant, variante, propriété ou fusion.

### 2.1 Écrans recopiés en raccord

| Écran   | Copies         | Divergence                                                                                                                                                                                                                                                                                                                      | Proposition                                                                                                      |
| ------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A · H01 | A, B, C, D (4) | Opérations : `TransactionRow` du DS avec données en dur (A), `TransactionRow` en boucle (B), `lc-tx` recomposé (C, D). « Objectif atteint » : absent (A, D) ou recomposé (B, C). Carte solde : `Kotiz.BalanceCard` (A, B) ou recomposée en HTML pour l'attente (C, D). « Tout voir › » : `img` (A) ou `kz-mask-icon` (B, C, D). | Un seul H01 dans le canvas, importé par les autres lots, une fois les composants § 2.3, § 2.10 et § 2.12 promus. |
| A · E08 | A, B, C (3)    | A : plein écran (`lc-res-head`, décision PO du 20 octobre). B et C : ancienne carte centrée (`la-center` + `la-badge`).                                                                                                                                                                                                         | Aligner B et C sur A, puis passer à `ResultScreen` (§ 2.2).                                                      |
| B · B07 | B, C (2)       | La copie C n'a ni squelette, ni messages flash, ni raison de fermeture, ni note. Son `InfoLine` « restés sur ton solde » est câblée autrement (`gd.hasRetry` au lieu de `d.hasNotIn`).                                                                                                                                          | Une seule source, importée par les autres lots.                                                                  |
| B · B15 | B, C (2)       | Identiques.                                                                                                                                                                                                                                                                                                                     | —                                                                                                                |

### 2.2 Écrans de résultat plein écran → **`ResultScreen`** (fusion)

- **Où** (9 écrans) : A · E07 en cours, A · E07 inconnu, A · E07 échec, A · E08 ; B · B12, B · B17 ; C · C-05, C-09 ; D · D-05.
- **Divergences** :
  - Le marqueur de statut prend deux formes. Les écrans d'opération utilisent la pastille 64 `lc-res-ico`. E08, B17 et A04 utilisent le badge 80 `la-badge`, avec une image de 36 ou de 56 (`lb-badge-ill`). DESIGN.md demande pourtant une « pastille de statut 64 » partout.
  - Les spinners ont deux tailles : `la-spin-big` (32) et `kz-spin` dans la pastille (28).
  - Le montant passe par `lc-res-amt` + `lb-cur`, alors que `lb-prog-amt` et `lb-sum-amount` font la même chose ailleurs.
  - L'annonce au lecteur d'écran est en dur (`role`, `aria-live`), avec trois réglages différents.
  - Les lignes de statut liées existent en deux versions qui ne se ressemblent pas : `lc-linked-row` (48, Semi Bold, C-05 et C-09) et `la-row` (56, `text-secondary`, A04).
- **Le DS a deux composants non utilisés pour ce besoin** : `OperationStatus` (carte, préréglage `uncertain` refusé par la spec) et `IllustratedResult` (carte centrée). DESIGN.md (§ Écran de résultat plein écran) dit déjà que ces deux composants « restent à aligner ».
- **Proposition : fusionner** `OperationStatus`, `IllustratedResult` et la composition `lc-res` en un **`ResultScreen`**. Les lignes de statut liées deviennent `StatusRows` (§ 4, n° 9).

### 2.3 Lignes d'opération → **`TransactionRow`** (évolution)

- **Où** : `lc-tx` recomposé dans 5 sections (C · C-11 ; H01 dans C et D ; B07 dans B pour la ligne « pas entré » et dans C) et lu sur C-12 et C-15. Le `Kotiz.TransactionRow` d'origine ne sert qu'en A · H01 et B · B07.
- **Divergence** : le balisage recopié fait plus de 1 500 caractères par ligne. Il contient trois `sc-if` pour l'icône (image, horloge ou flèches internes) et des sous-éléments que le DS n'a pas : sous-titre, note de statut combiné, montant sans signe en attente.
- **Proposition : évolution** selon l'API déjà écrite dans les handoffs C et D (`subtitle`, `note`, `variant` : `deposit` / `internal` / `withdrawal` / `correction`, signe seulement si l'opération est faite). L'élément est **à promouvoir tel quel**.

### 2.4 Récapitulatifs : `SummaryPreview`, `SummaryFlow`, récapitulatif de dépôt et récapitulatif de retrait

| Récapitulatif          | Écrans            | Rendu dans le canvas                                  | Écart avec le DS                                                                                                                                                                                       |
| ---------------------- | ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Création d'épargne     | B · B06           | `lb-hero` (copie de `SummaryPreview`)                 | Aucun.                                                                                                                                                                                                 |
| Retour au solde        | B · B10           | `lb-flowsum`                                          | Aucun.                                                                                                                                                                                                 |
| Dépôt                  | C · C-03          | `lb-flowsum` + `lc-taken` + `lc-twosteps` + nœud logo | Le `SummaryFlow` du DS ne sait pas faire : la ligne « Pris sur ton {opérateur} » sous le montant, le nœud de départ avec logo et numéro, les deux temps numérotés, les lignes de chargement des frais. |
| Mise de côté           | C · C-08          | `lb-flowsum`                                          | La colonne de libellés est à 50 % (`lc-sum-wide`), contre 88 dans le DS.                                                                                                                               |
| Retrait                | D · D-03          | `lb-flowsum` + `ld-wallet` + nœud « Vers ton numéro » | Mêmes manques qu'au dépôt, plus le pictogramme portefeuille et une ligne en gras (`ld-row-strong`).                                                                                                    |
| Détail d'une opération | C · C-12          | `lb-flow` sans carte                                  | La liste Depuis ↓ Vers est sortie de la carte : le DS ne l'exporte pas seule.                                                                                                                          |
| Fiche cliente (agente) | A · A03           | `la-recap` (grille 2 colonnes, fond `surface-canvas`) | Troisième style de récapitulatif : fond gris au lieu d'une carte bordée, grille au lieu de lignes.                                                                                                     |
| Rappel avant PIN       | B · B11, D · D-04 | phrase seule (B11), `ld-pin-recap` (D-04)             | Deux formes pour la même fonction.                                                                                                                                                                     |
| Opération rappelée     | C · C-14          | `lc-oprecap`                                          | Encore un autre bloc gris.                                                                                                                                                                             |

**Proposition.**

- Garder `SummaryPreview` tel quel (création d'un objet).
- **Faire évoluer `SummaryFlow`** : `amountNote`, nœuds typés (`illustration`, `logo`, `wallet`) avec `dirLabel` et `sub`, `rows[].emphasis`, `rows` en chargement, et un emplacement `children` pour les étapes numérotées.
- **Exporter `FlowPath`** (la liste Depuis ↓ Vers seule) pour C-12, puis pour le reçu.
- Retirer `la-recap`, qui devient `SummaryPreview` ou `DetailList` au lot E, où la fiche cliente reviendra.

### 2.5 Lignes clé / valeur → **`DetailList`** (nouveau, extrait de `Summary`)

- **Où** (13 écrans) : B · B06, B10, B12, B17 ; C · C-03, C-05, C-08, C-09, C-12, C-13, C-15 ; D · D-03, D-05.
- **Divergence** : la colonne de libellés a trois largeurs (`lb-sum-row dt` 88, `lc-sum-kv` 120, `lc-sum-wide` 50 %). Les valeurs prennent des formes ad hoc : numéro en sous-ligne, logo d'opérateur (`ld-dd-opr`), barre de progression dans la valeur (`lc-res-track`), mot de statut (`lc-put-word`). Le masquage est recopié valeur par valeur (C-12, C-13).
- **Proposition** : sortir `SummaryRowData` / `kz-sum-rows` du DS en composant autonome.

### 2.6 Sélecteurs d'opérateur et lignes de choix → **`OptionRow`** + **`BottomSheet`** (évolution)

- **Où** : `lc-row` sur C · C-00, C-01, C-06 et D · D-00, D-01, et en ligne liée sur C-12 et C-15 (7 écrans).
- **Divergence** :
  - La partie gauche prend trois formes : logo 64 × 48 (`lc-logo`), illustration 48 (`lc-ill-40`, mal nommée), pastille neutre 64 (`lc-pastille-nt`).
  - Le DS a déjà des options dans `BottomSheet` (`kz-option`, logo 48 × 36, sélection vert doux), jamais utilisées.
  - Le libellé est en 16 dans `lc-row` et en 14 dans `kz-option`.
- **Proposition : fusionner** en un `OptionRow`, que `BottomSheet.options` réutilise.

### 2.7 Champs montant → **`AmountField`** (évolution) et retrait d'`AmountInput`

- **Où** : `lb-amount-input` recomposé sur 6 écrans (B · B03, B08, B09 ; C · C-02, C-07 ; D · D-02).
- **Divergence** :
  - La puce large existe en trois libellés et deux classes : « Tout remettre », « Tout mon solde » (`lb-pick-wide`), plus les montants rapides sélectionnables (`lc-pick`).
  - D-02 a seul la ligne entière cliquable (`ld-amount-tap`, critique D n° 11, demandée aussi pour C-02).
  - Le libellé est visible sur B08 et masqué ailleurs.
  - Le rayon des puces est de 8, hors échelle.
- **Le DS a deux composants pour ce besoin** : `AmountInput` (affichage seul, montants rapides) et `AmountField` (vraie saisie, puce large). Aucun écran n'utilise `AmountInput`.
- **Proposition** : un seul `AmountField`, avec `quickPicks` sélectionnables et toute la ligne cliquable. Retirer `AmountInput`.

### 2.8 Feuilles : Déposer / Retirer et feuilles d'aide

- **Feuilles Déposer et Retirer.** C-00 et D-00 ont le même balisage : deux `lc-row` avec pastille neutre et une raison si Mobile Money est indisponible. Seuls le titre et le premier libellé changent (« Par Mobile Money » / « Sur mon Mobile Money »). **Proposition : un composant d'écran unique**, `MoneyMethodSheet` (`direction`, `mobileMoney`), avec le cash du lot E comme troisième option.
- **Feuilles d'aide « pas reçu ».** C-04 « Le dépôt n'arrive pas ? » et D-07 « L'argent n'est pas sur ton Wave ? » suivent la même trame : consignes, phrase en gras « Ne refais pas… », aide. Elles diffèrent pourtant : « Contacter l'aide › » est un lien dans le contenu sur C-04 et un bouton texte sur D-07 ; « Revenir » est un bouton secondaire sur C-04 et un bouton texte sur D-07.
- **Toutes les feuilles (10).** Chacune ajoute à la main `la-scrim`, le bouton « Fermer » (`kz-icon-btn la-sheet-close` + image) et `la-sheet-plain`. **Proposition** : `BottomSheet` reçoit `onClose` (croix 48 intégrée, retour Android), `subtitle` et `actions`.

### 2.9 États hors connexion → **`NetworkNotice`** (à concevoir)

Les 16 écrans concernés utilisent 5 formes différentes :

| Forme                                                                     | Écrans                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------- |
| `Message info` « Mis à jour à 14:32 · hors connexion »                    | A · H01, B · B01, B · B07, C · C-01, C · C-11, D · D-01 |
| même phrase, mais en `la-text` sous la ligne Depuis                       | D · D-02                                                |
| `Message info` « Pas de connexion. » + « Ta saisie est gardée. »          | A · E02, B · B06                                        |
| même titre + « Rien n'a été envoyé. » (ou « …Réessaie quand tu captes. ») | C · C-03, C-08, D · D-03, D-04                          |
| raison sous la liste (`lb-reason`), avec ou sans « Réessayer »            | C · C-01, C-11 (« Voir plus »), D · D-01                |
| écran vide centré « Détail indisponible hors connexion. » + « Réessayer » | C · C-12                                                |

**Proposition** : un composant à trois variantes, `NetworkNotice` (`kind` : `stale` | `blocked` | `unavailable`, `updatedAt`, `consequence`, `onRetry`). Les phrases sont à fixer par le PO. Les lots E et F auront des actions qui demandent la connexion : dépôt cash, changement de PIN.

### 2.10 Zones d'action fixes → **`ActionZone`** (nouveau, socle)

- **Où** : 47 écrans sur 63.
- **Divergence** :
  - Les classes varient selon les lots : `la-foot` (A, B), `la-foot la-foot-center`, `la-foot-canvas` (C01) et `{{footCls}}` = `lc-foot` / `lc-foot-line` (C, D seulement).
  - Le filet « seulement quand ça défile » (DESIGN.md § Layout) n'existe qu'aux lots C et D. Le padding est de 12/20 en A et B, de 16 + zone sûre en C et D.
  - Le bouton principal est forcé en `style="width: 100%"` 25 fois.
  - La raison sous un bouton désactivé (`lb-reason`) est un paragraphe libre, sans lien d'accessibilité vers le bouton (« Description d'une raison liée à un bouton désactivé », signalé dans les 4 handoffs).
- **Proposition** : `ActionZone` (`divider: 'auto'`, `reason`, `align`). La raison passe en `accessibilityHint` du bouton principal.

### 2.11 Œil de masquage hors carte solde → **`PageHeader`** (propriété) et `MaskToggle`

- **Où** : `lb-eye` recomposé sur 6 écrans : B · B01, B07 ; C · C-11, C-12, C-13, et B07 dans C.
- **Divergence** : 2 icônes en masque (`lb-ico-eye`, `lc-ico-eye`) et un bricolage de mise en page (`lb-head-row` + style en ligne).
- **Proposition** : `RootHeader` et `MaskToggle` existent dans le DS v12 (constat 1). Ajouter à `PageHeader` une prop `mask` (ou un emplacement `trailing`) pour B07, C-12 et C-13.

### 2.12 Bandeaux et lignes d'attente

| Forme                                                               | Écrans                                                          |
| ------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Message pending`                                                   | B · B06 inconnu, D · D-02 (« X F sont en attente de retrait. ») |
| ligne « Retrait en attente » sur la carte solde, recomposée en HTML | H01 dans C et D                                                 |
| raison sous bouton désactivé (« Un retour est en cours… »)          | B · B07                                                         |
| `StepTracker`                                                       | 6 écrans                                                        |
| `TransactionRow` en attente                                         | listes                                                          |

**Proposition.**

- **`BalanceCard`** : prop `pendingOut`, avec l'API du handoff D. **À promouvoir tel quel.**
- Le reste est couvert par `Message pending` et `TransactionRow`. Aucun nouveau bandeau.

### 2.13 Écrans « explication agente » → modèle d'écran **`ExplainerScreen`** + **`NumberedSteps`**

- **Où** : C · C-17 « Déposer auprès d'une agente » et D · D-06 « Retirer auprès d'une agente » ont le même balisage : pastille bleue 80 recomposée avec une illustration 64, titre, `lc-twosteps` en 3 étapes, 1 ou 2 phrases de sécurité, « Afficher Mon QR ». Les `lc-twosteps` reviennent aussi en C-03 (deux temps).
- **Le lot E part de ces deux écrans.**
- **Proposition** :
  - `NumberedSteps` (composant) ;
  - `IconPastille` avec `illustrationSize: 40 | 64` et une teinte `neutral` (C-00, D-00) ;
  - un modèle d'écran `ExplainerScreen`, documenté dans le DS, et non un composant.

### 2.14 Écrans PIN → modèle d'écran **`PinScreen`**

- **Où** : A · E06/E07, A · C01, B · B11, D · D-04.
- **Divergence** :
  - le rappel du montant est une phrase en B11, deux lignes clé : valeur en D-04, rien en C01 ;
  - l'avertissement « Ne le montre à personne… » change de place : `Message info` au-dessus des cases, texte sous les cases en erreur (D-04) ;
  - « PIN oublié ? » est un lien dans le contenu, puis un bouton texte dans la zone d'action une fois bloqué ;
  - le pavé désactivé n'existe qu'en D-04.
- **Proposition** : `PinPad.disabled` dans le DS, et un modèle d'écran `PinScreen` (`recap`, états `idle` / `wrong` / `sending` / `blocked` / `offline`). Au lot E, la cliente confirme un retrait cash avec son PIN. Au lot F, il faudra changer le PIN et gérer « PIN oublié ».

### 2.15 Plus petits, mais répétés

| Élément                                             | Écrans                                        | Proposition                                                                                                                                                                                                                           |
| --------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Montant 34 + devise + masquage                      | 18 affichages, 22 « Montant masqué » recopiés | **`Amount`** (primitive) : `value`, `masked`, `size` (`amount`, `label`), `sign`, `currency` (`FCFA` ou `F`), `muted`. Quatre classes font aujourd'hui la même chose : `lb-sum-amount`, `lb-prog-amt`, `lc-res-amt` et `lb-hero-amt`. |
| Ligne « Depuis : … » / « Vers : … »                 | B · B09, C · C-01, C-02, C-07, D · D-01, D-02 | **`FlowLine`** (`direction`, `media`, `name`, `detail`). On trouve 4 formes : texte seul, `lc-fromline` avec logo 32 × 24, `ld-from` avec portefeuille, `ld-tonum`.                                                                   |
| Squelette de chargement                             | B · B01, B07 ; C · C-11 ; D · D-01, D-03      | **`Skeleton`** (`variant` `list` ou `detail`, `rows`, `label`). Laissé de côté par le DS v10, cité dans 3 handoffs. Il utilise `radius-6`, réservé à la case à cocher.                                                                |
| Refus + « Contacter l'aide › » (`lb-refusal`)       | B · B10 ; C · C-01, C-02, C-03, C-08, C-14    | Propriété `action` de `Message` (lien sous le texte). Se règle avec la décision « lien ou bouton » (§ 3.3).                                                                                                                           |
| En-tête de section « Titre + Tout voir › »          | H01, B07                                      | **`SectionHeader`** (`title`, `action`).                                                                                                                                                                                              |
| Puce du type d'épargne (`lb-type-chip`)             | B · B03, B04, B05, B08                        | Reste propre au lot B. Pas de promotion.                                                                                                                                                                                              |
| `FilterChips`, `Receipt`, `CaseTimeline`            | C-11, C-13, C-15 (un écran chacun)            | À promouvoir quand un 2ᵉ écran les utilise. `CaseTimeline` reviendra au lot F (aide, signalements).                                                                                                                                   |
| Dialogue (`lb-dialog`)                              | B · B14, B16 ; C · C-14                       | `ConfirmDialog` existe dans le DS v12 (constat 1).                                                                                                                                                                                    |
| Grille de types, choix de date, progression, aperçu | B · B02, B04, B08, C-14 (motifs), B07, B06    | `GoalTypeOption`, `DateChoice`, `GoalProgress` et `SummaryPreview` existent dans le DS v12. C-14 réutilise `DateChoice` pour une liste de motifs : il faut un `ChoiceList` générique, ou renommer `DateChoice`.                       |

---

## 3. Doublons et incohérences entre composants existants

### 3.1 Composants qui font presque la même chose

| Doublon                                                        | Constat                                                                                                             | Proposition                                                          |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `AmountInput` / `AmountField`                                  | Même rôle. Aucun écran n'utilise `AmountInput`.                                                                     | Garder `AmountField`, y ajouter `quickPicks`, retirer `AmountInput`. |
| `OperationStatus` / `IllustratedResult` / composition `lc-res` | Trois façons d'afficher un résultat. Les deux composants du DS contredisent la règle « plein écran » du 20 octobre. | `ResultScreen` (§ 2.2).                                              |
| `GoalCard` / `GoalRow` / `GoalProgress`                        | `GoalCard` n'est utilisé nulle part : l'accueil est passé à `GoalRow`.                                              | Retirer `GoalCard`, ou le marquer « archive ».                       |
| `DateChoice` / motifs de C-14                                  | Composant métier réutilisé pour une autre liste de choix.                                                           | `ChoiceList` générique ; `DateChoice` en devient un réglage.         |
| `BottomSheet.options` (`kz-option`) / `lc-row`                 | Deux lignes de choix, avec deux tailles de logo et deux tailles de libellé.                                         | `OptionRow` (§ 2.6).                                                 |
| `la-row` (A04) / `lc-linked-row` (C-05)                        | Même idée (libellé + `StatusPill`), avec deux hauteurs et deux couleurs.                                            | `StatusRows`.                                                        |
| `RootHeader` / `HomeHeader` / `PageHeader`                     | Trois en-têtes. Seul `PageHeader` accepte une action à droite, et pas l'œil.                                        | `PageHeader.trailing` ; garder les trois.                            |

### 3.2 Propriétés nommées différemment

- **Rappels d'action** : `onClick` (`Button`, `GoalRow`, `InfoLine`), `onSelect` (`Shortcuts`, `BottomNav`, `BottomSheet`, `GoalTypeOption`, `DateChoice`), `onToggle` (`MaskToggle`), `onToggleMask` (`BalanceCard`, `RootHeader`), `onChange` (`TextField`, `AmountField`, `CheckOption`). Les handoffs écrivent `onPress` pour React Native. → Pour le socle RN, utiliser `onPress` pour une action et `onChange` ou `onValueChange` pour une valeur.
- **Images** : `illustrationSrc`, `iconSrc` (`TransactionRow`, `OperationStatus`), `src` (`IconPastille`), `logo` (`BottomSheetOption`), `logoSrc` (logo KOTIZ), `flagSrc`. → Distinguer `illustration` (fournie par l'écran) des **icônes système**. Les icônes système passent aujourd'hui en props (`backIcon`, `chevronIcon`, `eraseIcon`, `eyeIcon`, `bellIcon`, `expandIcon`) : le socle RN doit les embarquer, sinon chaque écran recopie les URL, comme le font les 4 prototypes.
- **`state` a trois sens** : interaction (`Button` : `pressed`, `loading`), saisie (`TextField` : `active`, `error`), métier (`GoalRow` : `open`, `reached`, `closed`). → `GoalRow.state` devient `status` ou `goalState`.
- **Ensembles de statuts différents** :
  - `StatusPill` : `done`, `pending`, `failed`, `neutral` ;
  - `TransactionRow` : en plus `not-debited` ;
  - `OperationStatus` : en plus `uncertain` (refusé par la spec) ;
  - `StepTracker` : `done`, `sent`, `pending`, `todo`, plus `failed` recomposé ;
  - `Message.tone` : `success` / `error`, là où les autres disent `done` / `failed`.

  → Définir un type `OperationStatus` unique (`done`, `pending`, `failed`) dans le socle. `Message` garde `tone`, mais avec un tableau de correspondance documenté.

- **Libellés d'action passés en texte** : `ConfirmDialog` et `IllustratedResult` reçoivent `primary: string` + `onPrimary`. Les écrans, eux, composent des `Button`. → Passer des actions `{ label, onPress, state }`.

### 3.3 Incohérences d'usage

- **« Contacter l'aide »** a deux formes. C'est un lien avec chevron dans le contenu sur A · A02, B10, C-03, C-08, C-15 et la feuille C-04 (6 fois). C'est un bouton texte de la zone d'action sur A · S01, B12, D-03 et D-07. Or DESIGN.md § Layout dit « aucun lien dans le contenu ». On compte aussi 22 liens `la-link` avec chevron dans le contenu (lots B, C, D).
- **« Mon solde »** a deux images : l'illustration Déposer (B10, C-08, C-12, C-13) et le pictogramme portefeuille (D-02, D-03). C'est le report n° 14 du handoff D.
- **Le statut d'étape en attente** se dit « Fait » sur A · E07 inconnu (constat 3).
- **Le plein écran de résultat** n'est pas encore appliqué aux copies d'E08 dans les lots B et C (§ 2.1).
- **DESIGN.md** range `DateChoice` sous « promus depuis le lot A » alors qu'il vient du lot B.

### 3.4 Valeurs hors échelle

| Valeur                                                                     | Où                                                                                   | Proposition                                                                                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Rayon **8**                                                                | `kz-pick` : montants rapides, puce large (DS)                                        | `radius-12` (déjà noté « à rattacher » dans 2 fiches du DS).                                                     |
| Rayon **6** hors case à cocher                                             | `kz-qr-logo` (DS), `lb-skel` (canvas)                                                | `radius-12` pour le QR ; le squelette passe à `radius-12`. Le token `radius-6` est réservé à `CheckOption`.      |
| Logos d'opérateur : 4 tailles                                              | 64 × 48 (`lc-logo`), 48 × 36 (`kz-option`), 40 × 30 (nœud de flux), 32 × 24 (lignes) | Deux tokens (`size-logo` 64 × 48, `size-logo-sm` 32 × 24), ou un `OperatorLogo` avec `size`.                     |
| Marqueur de résultat 80 (`la-badge`) et 64 (`lc-res-ico`)                  | E08, B17, A04 contre les autres résultats                                            | 64 partout (DESIGN.md), ou décision PO pour les « moments majeurs ».                                             |
| Pastille numérotée **28**, point de jalon **12**, spinner **28** et **32** | `lc-twosteps-n`, `lc-case-dot`, `lc-res-ico .kz-spin`, `la-spin-big`                 | `size-step-dot` (32) pour les étapes numérotées ; un seul spinner (`size-icon-small` ou `size-icon`).            |
| Colonnes de libellés **88 / 120 / 50 %**                                   | `lb-sum-row`, `lc-sum-kv`, `lc-sum-wide`                                             | Deux dispositions : colonne 120 et libellé / valeur aux deux bords.                                              |
| Opacités **.55**, **.4**, **.07**                                          | ligne désactivée, pavé gelé, arc de la carte                                         | Un token `opacity-disabled` (0.4, comme `Shortcuts` désactivé).                                                  |
| 80 styles en ligne                                                         | 25 `width: 100%`, 4 `margin-top: -12px`, des `gap` en dur                            | `ActionZone` et `Button.fullWidth`. Les marges négatives disparaissent avec `Message.action` et `SectionHeader`. |

---

## 4. Liste priorisée

**Ordre de priorité** :

1. ce qui débloque le socle UI (#59) ;
2. ce dont les lots E (cash, agente, QR) et F (sécurité, aide, notifications) auront besoin dès leurs premiers écrans ;
3. le nombre d'écrans simplifiés.

**Deux types de propositions** :

- **Tel quel** : l'élément existe déjà dans le DS ou est entièrement décrit dans un handoff ; il suffit de le promouvoir ou de le copier ;
- **À concevoir** : l'API ou le rendu demandent une décision.

| #   | Nom proposé                                                                                                | Type                                                                    | API (props, variantes, états)                                                                                                                                                                                                                                                                                                           | Écrans concernés                                                                                                                  | Gain                                                                                                          | Risque                                                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Copie du DS v12 dans le canvas** + remplacement des `lb-*` par `Kotiz.*`                                 | Tel quel (préalable)                                                    | Aucune nouvelle API : `RootHeader`, `MaskToggle`, `GoalTypeOption`/`Grid`, `GoalProgress`, `AmountField`, `DateChoice`, `ConfirmDialog`, `SummaryPreview`, `SummaryFlow`, `GoalRow.state`, `StepTracker` `sent`, `TextField.multiline`                                                                                                  | ≈ 25 écrans des lots B, C, D (B01 à B16, C-02 à C-14, D-02, D-03)                                                                 | Supprime environ 140 lignes `lb-` ; le canvas montre ce que les devs coderont ; corrige le « Fait » d'A · E07 | Nouveau rendu des planches validées (contrôle visuel des 55 planches) ; les ajouts C/D de `lb-flowsum` cassent sans le n° 6 |
| 2   | **`ActionZone`**                                                                                           | Tel quel (règle DESIGN.md + `lc-foot`)                                  | `children`, `align: 'stretch' \| 'center'`, `divider: 'auto' \| 'always' \| 'none'`, `reason?: string` (lue avec le bouton principal), `background: 'surface' \| 'canvas'` ; plus `Button.fullWidth` et `Button.accessibilityHint`                                                                                                      | 47 écrans                                                                                                                         | Le plus gros gain du socle : une seule règle de bas d'écran et l'accessibilité de la raison                   | Faible. Vérifier le clavier ouvert (bouton visible) et la zone sûre Android                                                 |
| 3   | **`ResultScreen`** (fusion `OperationStatus` + `IllustratedResult` + `lc-res`)                             | À concevoir                                                             | `status: 'done' \| 'pending' \| 'failed' \| 'progress'`, `illustrationSrc?`, `pill?: { status, word }`, `title`, `subtitle?`, `amount?`, `amountNote?`, `header: { close \| link }`, `children` (étapes, `StatusRows`, `DetailList`), `actions: { primary, text[] }` ; annonce `polite` / `assertive` déduite du statut                 | 9 (A · E07 ×3, E08 ; B12, B17 ; C-05, C-09 ; D-05), et les copies d'E08                                                           | 9 écrans, plus tous les résultats du cash (E) et de la sécurité (F)                                           | Décisions PO : badge 80 ou pastille 64, sort des deux composants du DS. Ne pas casser le « Plus tard » d'E08                |
| 4   | **`TransactionRow`** (évolution)                                                                           | Tel quel (API du handoff C, variante `withdrawal` du handoff D)         | `title`, `subtitle?`, `note?`, `date`, `amount`, `direction`, `status`, `statusLabel?`, `variant: 'deposit' \| 'internal' \| 'withdrawal' \| 'correction'`, `masked`, `onPress` ; signe seulement si `done` ; montant `muted` sinon                                                                                                     | H01 ×4, B07 ×2, C-11 (et C-12, C-15 en lié)                                                                                       | Retire le plus gros balisage recopié (5 sections) ; sert aux listes de l'agente (E) et aux notifications (F)  | Statut combiné (« À reprendre ») : vérifier qu'il ne contredit pas le glossaire Savings / Payments                          |
| 5   | **`OptionRow`** + **`BottomSheet`** (évolution)                                                            | À concevoir (légèrement)                                                | `OptionRow { label, sub?, media?: { kind: 'logo' \| 'illustration' \| 'pastille', src }, disabled?, reason?, trailing?: 'chevron' \| node, onPress }` ; `BottomSheet { title, subtitle?, onClose, options? (rendues en OptionRow), actions? }` ; modèle `MoneyMethodSheet` (C-00, D-00, puis cash au lot E)                             | 7 lignes de choix + 10 feuilles                                                                                                   | 17 écrans ; menus d'aide et de sécurité (F) ; choix agente et cash (E)                                        | Faible. Unifier la taille du libellé (14 ou 16) et du logo                                                                  |
| 6   | **`Amount`** (primitive)                                                                                   | À concevoir                                                             | `value`, `masked`, `size: 'amount' \| 'label' \| 'body'`, `sign?: '+' \| '−'`, `currency: 'FCFA' \| 'F'`, `muted?` ; lit « Montant masqué »                                                                                                                                                                                             | 18 affichages de 34 + 22 masquages, sur une vingtaine d'écrans, et dans `BalanceCard`, `GoalRow`, `TransactionRow`, `SummaryFlow` | Une seule règle pour les milliers, le signe, la devise et le masquage, au cœur du socle                       | Faible. Il faut que tous les composants l'adoptent, sinon on ajoute une 5ᵉ variante                                         |
| 7   | **`SummaryFlow`** (évolution) + **`FlowPath`** + **`DetailList`**                                          | Tel quel pour `DetailList` (extrait du DS) ; à concevoir pour les nœuds | `SummaryFlow { lead, amount, amountNote?, onEditAmount?, from/to: FlowNode, rows?: DetailRow[], rowsLoading?, children? }` ; `FlowNode { kind: 'illustration' \| 'logo' \| 'wallet', src?, dirLabel, name, sub? }` ; `DetailList { rows: { label, value, sub?, media?, emphasis?, masked?, onEdit? }[], layout: 'column' \| 'spread' }` | Flux : B10, C-03, C-08, D-03, C-12 ; lignes : 13 écrans                                                                           | 13 écrans ; récapitulatif cash avec l'agente (E)                                                              | Le contenu des frais reste lié à G01 : le composant n'affiche jamais un frais non confirmé                                  |
| 8   | **`PinScreen`** (modèle d'écran) + `PinPad.disabled`                                                       | À concevoir                                                             | `title`, `recap?: DetailRow[]` (affichage en ligne), `state: 'idle' \| 'wrong' \| 'sending' \| 'blocked' \| 'offline'`, `onForgot`, `length` ; avertissement à une place fixe                                                                                                                                                           | A · E06/E07, C01 ; B11 ; D-04                                                                                                     | 4 écrans ; confirmation d'un retrait cash (E) ; changement de PIN et « PIN oublié » (F)                       | Longueur du PIN non validée (G02) : rien ne doit la figer                                                                   |
| 9   | **`StatusRows`**                                                                                           | Tel quel (`LinkedStatusRows` du handoff C)                              | `rows: { label, status, word? }[]` ; 48 de haut, entre filets                                                                                                                                                                                                                                                                           | A04, C-05, C-09                                                                                                                   | 3 écrans ; statuts de la fiche cliente au lot E                                                               | Faible                                                                                                                      |
| 10  | **`NetworkNotice`**                                                                                        | À concevoir (textes PO)                                                 | `kind: 'stale' \| 'blocked' \| 'unavailable'`, `updatedAt?`, `consequence?`, `onRetry?`                                                                                                                                                                                                                                                 | 16 écrans                                                                                                                         | 16 écrans, 5 formulations ramenées à 3                                                                        | Les phrases engagent la promesse « Rien n'a été envoyé » : à valider avec l'idempotence côté backend                        |
| 11  | **`PageHeader.trailing`** (œil)                                                                            | Tel quel                                                                | `trailing?: node` ou `mask?: { masked, onToggle }`                                                                                                                                                                                                                                                                                      | B07, C-12, C-13 (B01 et C-11 passent à `RootHeader`)                                                                              | 6 écrans                                                                                                      | Faible                                                                                                                      |
| 12  | **`BalanceCard.pendingOut`**                                                                               | Tel quel (handoff D)                                                    | `pendingOut?: { label, amount, onOpen }`, prioritaire sur `lastDeposit`                                                                                                                                                                                                                                                                 | H01 (C, D)                                                                                                                        | Supprime la carte recomposée en HTML ; dépôt cash en attente (E)                                              | Cas « deux retraits en attente » encore ouvert (question du handoff D)                                                      |
| 13  | **`NumberedSteps`** + `IconPastille` (teinte `neutral`, illustration 64) + modèle **`ExplainerScreen`**    | Tel quel                                                                | `NumberedSteps { items: string[], label }` ; `IconPastille { tone: …\|'neutral', illustrationSize: 40 \| 64 }`                                                                                                                                                                                                                          | C-03, C-17, D-06 ; pastilles C-00, D-00                                                                                           | Point de départ des écrans « agente » du lot E                                                                | Faible                                                                                                                      |
| 14  | **`Skeleton`**                                                                                             | À concevoir (petit)                                                     | `variant: 'list' \| 'detail'`, `rows`, `label` (lu), aucun chiffre                                                                                                                                                                                                                                                                      | B01, B07, C-11, D-01, D-03                                                                                                        | 5 écrans ; premiers chargements des lots E et F                                                               | Faible. Rayon : `radius-12`                                                                                                 |
| 15  | **`StepTracker`** : `failed`                                                                               | Tel quel (handoff C)                                                    | `status: … \| 'failed'` (« Pas fait », croix sur `surface-error`)                                                                                                                                                                                                                                                                       | C-12                                                                                                                              | 1 écran ; échec d'une étape cash (E)                                                                          | Faible                                                                                                                      |
| 16  | **`SectionHeader`**, **`FlowLine`**, **`Message.action`**                                                  | À concevoir (petits)                                                    | `SectionHeader { title, action? }` ; `FlowLine { direction, media?, name, detail? }` ; `Message { …, action?: { label, onPress } }`                                                                                                                                                                                                     | H01, B07 ; B09, C-01, C-02, C-07, D-01, D-02 ; 6 refus                                                                            | 14 écrans ; retire les `margin-top: -12px`                                                                    | Dépend de la décision sur les liens (§ 3.3)                                                                                 |
| 17  | Plus tard : `Receipt`, `CaseTimeline`, `FilterChips`, `ChoiceList`                                         | Tel quel (handoff C)                                                    | Voir handoff C                                                                                                                                                                                                                                                                                                                          | C-13, C-15, C-11, C-14                                                                                                            | 1 écran chacun aujourd'hui                                                                                    | À promouvoir quand le lot F réutilise `CaseTimeline` (aide)                                                                 |
| —   | **À retirer du DS** : `AmountInput`, `GoalCard` (et `OperationStatus` / `IllustratedResult` après le n° 3) | Décision                                                                | —                                                                                                                                                                                                                                                                                                                                       | aucun écran                                                                                                                       | Socle plus petit : 4 composants de moins à coder pour #59                                                     | Vérifier qu'aucun lot E ou F prévu ne les cite                                                                              |

**Pour #59.** Il faut coder d'abord les numéros 2 (`ActionZone`), 6 (`Amount`) et 4 (`TransactionRow`). Il faut aussi trancher les conventions du § 3.2 (`onPress`, icônes intégrées, type de statut unique) **avant** d'écrire le premier composant RN. Le n° 1 ne touche que le canvas, mais sans lui, les maquettes et le code divergeront dès le lot E.

---

## Les 8 propositions les plus rentables

1. **Mettre la copie du DS v12 dans le canvas** et remplacer les `lb-*` par `Kotiz.*` (environ 25 écrans, et fin du « Fait » sur l'écran d'attente A · E07).
2. **`ActionZone`** : une seule zone d'action fixe, avec filet automatique et raison liée au bouton (47 écrans, socle #59).
3. **`ResultScreen`** : fusion de `OperationStatus`, `IllustratedResult` et de la composition plein écran C-05 (9 écrans, plus tous les résultats des lots E et F).
4. **`TransactionRow` v2** : sous-titre, note, variantes `internal` / `withdrawal`, signe seulement si fait (5 copies retirées ; listes de l'agente et notifications).
5. **`OptionRow` + `BottomSheet` avec `onClose`** : une seule ligne de choix pour les opérateurs, les sources et les feuilles (17 écrans ; menus des lots E et F).
6. **`Amount`** : une primitive pour le montant, le signe, la devise et le masquage (une vingtaine d'écrans, et tous les composants qui affichent de l'argent).
7. **`SummaryFlow` v2 + `FlowPath` + `DetailList`** : nœuds logo / portefeuille, « Pris sur… », lignes clé / valeur à deux dispositions (13 écrans ; récapitulatif cash).
8. **`PinScreen` + `PinPad.disabled`** : un seul écran PIN avec rappel et états (4 écrans ; retrait cash au lot E, changement de PIN au lot F).

## Décisions à demander au PO

1. **Copie du DS dans le canvas** : peut-on remplacer la copie v9 par la v12 ? Toutes les planches validées des lots A à D seraient rendues de nouveau, puis contrôlées ; le travail serait confié à la session Design System.
2. **Résultat plein écran** : faut-il une pastille 64 partout, ou garder un badge 80 avec illustration pour les « moments majeurs » (E08, B17) ? Faut-il retirer `OperationStatus` et `IllustratedResult` du DS au profit de `ResultScreen` ?
3. **A · E07 « On vérifie ton compte »** : peut-on passer l'étape « Demande envoyée » de « Fait » à « Envoyée » (`sent`), comme aux autres lots ?
4. **« Contacter l'aide » et « Tout voir »** : lien avec chevron dans le contenu, ou bouton texte dans la zone d'action, comme le demande DESIGN.md ? Les deux formes coexistent aujourd'hui.
5. **Hors connexion** : quelles phrases standard retenir pour les trois cas ? Les cas sont : données anciennes, action bloquée (« Rien n'a été envoyé »), écran indisponible.
6. **« Mon solde »** : quelle image unique choisir, entre l'illustration Déposer et le portefeuille neutre (report n° 14 du handoff D) ?
7. **Retirer `AmountInput` et `GoalCard`** du DS, puisqu'aucun écran ne les utilise ?
8. **Valeurs hors échelle** :
   - rayon 8 des montants rapides → 12 ?
   - logos d'opérateur → deux tailles (64 × 48 et 32 × 24) ?
   - lignes clé / valeur → deux dispositions au lieu de trois ?
9. **Conventions du socle RN** (#59, avec les devs) :
   - `onPress` / `onChange` ;
   - icônes système intégrées au DS au lieu d'URL en props ;
   - un seul type de statut d'opération (`done`, `pending`, `failed`).

## Suivi — canvas rebranché sur la v15 (21 octobre 2026)

Fait dans le canvas « KOTIZ — App cliente » (version 33). Le détail est dans [screens.md](screens.md) § « Design System v15 rebranché dans le canvas ».

| Proposition                                                                         | Fait dans le canvas                                                                     |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `ResultScreen`                                                                      | A · E07 ×3, E08 et copies, B12, B17, C-05, C-09, D-05                                   |
| `ActionZone`                                                                        | toutes les zones d'action fixes ; « Contacter l'aide » en bouton texte                  |
| `TransactionRow` v2                                                                 | copies d'A · H01, B07 et copie, C-11                                                    |
| `BottomSheet` + `OptionRow`                                                         | S01, B13, B15, C-00, C-01, C-04 aide, C-06, C-10, C-16, D-00, D-01, D-07                |
| `Amount`                                                                            | résultats, détails, reçu, lignes, carte solde                                           |
| `SummaryFlow` v2, `FlowPath`, `DetailList`                                          | B10, C-03, C-08, D-03 ; C-12 ; lignes de détail de tous les résultats, C-13, C-15, D-04 |
| `BalanceCard.pendingOut`, `SectionHeader`, `PageHeader.trailing`, `PinPad.disabled` | accueil C et D ; « Tout voir » ; B07, C-12, C-13 ; D-04                                 |
| Hors connexion (décision 5)                                                         | trois phrases `Kotiz.OFFLINE` partout                                                   |
| « Mon solde » (décision 6)                                                          | portefeuille neutre dans les trajets, choix et lignes de détail                         |
| Statut unique (décision 9)                                                          | « À reprendre » = `failed` (lignes, pastilles, résultat partiel)                        |
| Archivés (décision 7)                                                               | plus aucun usage dans le canvas                                                         |

**Pas encore fait, et ce qui manque au DS** :

- `PinScreen` n'est utilisé nulle part. Il lui manque :
  - une phrase libre sous le titre (E06/E07, B11) ou après le récapitulatif (« Rien n'a été pris sur ton solde. », D-04) ;
  - un libellé configurable pour le bouton de blocage (B11 : « Voir mon épargne ») ;
  - une variante connexion (C01 : numéro masqué, « Besoin d'aide ? », « Utiliser un autre numéro »).
- `AmountField` v2 : montants rapides (C-02), toute la ligne cliquable (D-02), cible du champ vide à 48 × 48.
- `StepTracker` : état `failed` (« Pas fait », C-12).
- `GoalProgress` : texte « pour ton objectif » (question PO ouverte).
- Icônes encore passées par URL, à intégrer :
  - œil de `MaskToggle` et `RootHeader` ;
  - cloche de `HomeHeader` ;
  - chevron d'`InfoLine`.
- Portefeuille « Mon solde » utilisable seul, par exemple dans une phrase (D-02).
- Composants encore à concevoir (n° 2 à 17) : squelettes, puces de filtre, reçu, fil du dossier, étapes numérotées, ligne liée, `ChoiceList`.
