# Handoff — Refonte des parcours, lot B : épargne et retour au solde (React Native / Expo + backend Spring Boot)

Date : 19 octobre 2026. Statut : lot B validé par le PO et sa conjointe le 19 octobre 2026, y compris la création en 5 étapes, les récapitulatifs B06 (aperçu) et B10 (flux) et le retour au solde sans frais.

- Maquettes et prototype : [screens-lot-b.md](screens-lot-b.md) · canvas [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), page « Lot B — Épargne et retour au solde », version 9 (`1792428839-5d95`), prototype `Main.dc.html` (menu B-P1 à B-P8). Il fait foi pour la composition et les textes, y compris les états reportés dessinés en version 9 (états de planche, non joignables par le menu).
- Design system : [DESIGN.md](../../../DESIGN.md) (racine) · [KOTIZ Design System v10](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) (composants `Kotiz.*`, version `1792428939-8e5b`, avec les composants promus du lot B).
- Parcours, écrans, états : [ux-spec-lot-b.md](ux-spec-lot-b.md) (fait foi pour le comportement). Corrections : [critique-lot-b.md](critique-lot-b.md). Test : [test-lot-b.md](test-lot-b.md).
- Socle commun (tokens, composants du lot A, masquage, formats) : [handoff-lot-a.md](handoff-lot-a.md). Ce document ne répète que ce qui change ou s'ajoute.
- Scénarios d'acceptation : [gherkin-lot-b.md](gherkin-lot-b.md) (IDs `B-Pn-Sm`). Rattachement aux issues : [issues-lot-b.md](issues-lot-b.md).
- Cible : app mobile React Native + Expo SDK 54, **variant `client`** seulement (ADR-009, ADR-010, ADR-019). Backend Java 21 / Spring Boot 3, hexagonal (ADR-011), contexte **Savings** (épargnes, retour au solde, ledger), avec IAM pour la vérification du PIN.

Conventions (reprises du lot A) :

- **« à confirmer (Gxx) »** : paramètre non tranché, lu dans une configuration, jamais écrit en dur ni annoncé dans l'interface. G01 = partenaire et juridique, G02 = sécurité et SMS, G03 = assistance.
- **« à dessiner »** : état reporté au design. Le comportement attendu est décrit ; le texte exact et la mise en page viendront des maquettes. Aucun texte n'est inventé ici pour ces états. Depuis la version 9 du canvas, il n'en reste qu'un (voir Points ouverts).
- **Valeurs de démonstration du prototype, qui ne sont pas des règles** : PIN 2468 (4 chiffres), date du jour figée au 19 octobre 2026, solde 12 400 FCFA, épargnes École Awa / Boutique / Tabaski / Moto, références « KTZ-2610-0042 (fictive) », heure « 14:32 ». Aucune ne doit être reprise dans le code, les tests ou les textes.

## Points ouverts

**Critique** ([critique-lot-b.md](critique-lot-b.md)) : la seule correction **Bloquant** (n° 1, frais « à confirmer » sur B10) est **sans objet** depuis la décision PO du 19 octobre 2026 : le retour au solde est sans frais. La n° 15 (états reportés) est traitée : les états sont dessinés en version 9 du canvas et spécifiés dans les écrans ci-dessous.

**Décisions PO du 19 octobre 2026 appliquées**

1. **Retour au solde sans frais.** C'est un mouvement interne : aucune ligne « Frais », aucun état « frais inconnus », aucun blocage du PIN lié à G01, « Ton solde après » exact (solde disponible + montant). Le canvas version 9 est aligné (B10 et menu du prototype : « Retour au solde : sans frais »).
2. **Création en 5 étapes** (B02 Quel projet, B03 Combien, B04 Pour quand, B05 Comment tu l'appelles, B06 Vérifie ton épargne) ; B06 est un **aperçu** (`SummaryPreview`), B10 un **flux Depuis → Vers** (`SummaryFlow`).

**États reportés, dessinés en version 9 du canvas** (spécifiés dans § Écrans, scénarios dans le Gherkin) :

| Écran | État                                                                             | Planche     |
| ----- | -------------------------------------------------------------------------------- | ----------- |
| B01   | Chargement (squelette) ; plus de 5 épargnes fermées                              | `B-B01`     |
| B07   | Chargement (squelette) ; échec de fermeture (après B14) ; de l'argent est arrivé | `B-B07`     |
| B08   | Échec d'enregistrement ; épargne fermée entre-temps                              | `B-B08-B16` |
| B11   | PIN bloqué (trop d'essais)                                                       | `B-B09-B11` |
| B12   | Échoué au moment du mouvement (échec technique après le PIN)                     | `B-B12`     |

**États encore à dessiner** :

- B10 **refusé par une règle** (décision PO du 19 octobre 2026, ajout au canvas en cours) : comportement spécifié dans § B10, textes donnés par le PO ; le titre exact du message suivra le canvas.
- B11 hors connexion avant l'envoi du PIN. Comportement attendu : rien n'est envoyé, le PIN est effacé, la cliente le sait et peut réessayer ; la spec propose « Pas de connexion. Rien n'a été envoyé. » (non dessiné).

**Avant de coder**

1. **Prérequis du lot A** : réalignement des tokens ([#96](https://github.com/kotiz-ci/platform/issues/96)) et socle UI ([#59](https://github.com/kotiz-ci/platform/issues/59)) ; accueil H01 ([#94](https://github.com/kotiz-ci/platform/issues/94)).
2. **Assets** : cœur Santé (`Objectifs/sante-coeur.svg`), coffret Imprévus (`Objectifs/imprevus.svg`) et drapeau (`Objectifs/objectif-atteint.svg`) sont dans le DS v10 ; l'ancienne trousse à croix et l'ancien bouclier sont dans `Archives` : **ne pas les utiliser**. Le README et la fiche `GoalCard` du DS (version `1792433315-d20c`) écrivent désormais « Objectif atteint » sans coche, comme DESIGN.md.
3. **Contrat d'API à écrire** : aucun champ n'existe. Les données sont nommées par leur sens métier et les termes du glossaire DDD (`SavingsGoal`, `SavingsAccount`, `Transaction`, `LedgerEntry`, `Money`). Le glossaire ne nomme ni le **retour au solde** (mouvement interne épargne → solde), ni l'**affectation** (solde → épargne, lot C), ni la **fermeture** d'une épargne : à faire nommer par `domain-modeling` avant le code. Le `GoalLock` du glossaire (verrouillage jusqu'à la date, malus de score) **contredit l'épargne flexible validée** et est hors MVP : ne pas l'implémenter.
4. **Alimentation d'une épargne** (« Mettre de l'argent », lot C) : pas encore spécifiée. Sans elle, une épargne reste à 0 en production ; les parcours P3, P5 et P6 avec des fonds ne se vérifient de bout en bout qu'une fois le lot C livré (ou avec des données de test).

**Questions encore ouvertes sur le comportement** (aucune ne change la composition validée)

- Montant épargné avec un mouvement en attente : confirmé seulement (H3), règle à confirmer G01.
- Montant minimum de retour, cible minimum et maximum : aucune valeur côté produit tant que le partenaire n'en impose pas (G01).
- Le retour au solde consomme-t-il la capacité du niveau d'accès limité ? Recommandation : non, mouvement interne (G01).
- Longueur maximale du nom et de la note, emoji dans le nom, conflit de modification sur deux téléphones (dernière écriture gagne, à confirmer) : technique.
- Aide « par semaine » sur B08 : le prototype validé la calcule sur l'objectif entier, même quand l'épargne contient déjà de l'argent (École Awa : 2 778 F par semaine alors qu'il reste 55 000 F). Le handoff suit le prototype ; calculer sur le reste à épargner serait plus juste (PO).
- Raccourcis de date en fin de mois (« Dans 1 an » depuis un 29 février, « Dans 3 mois » depuis un 31) : à confirmer à l'implémentation ; recommandation : dernier jour du mois visé.
- Nom accessible de l'œil : « Masquer les montants » / « Afficher les montants » sur B01 et B07 (prototype lot B), « Masquer le solde » / « Afficher le solde » sur la carte solde H01 (lot A). Même réglage, deux libellés : à garder tel quel ou à unifier (PO).

## Tokens

Aucun token nouveau : le lot B utilise ceux du [handoff du lot A § Tokens](handoff-lot-a.md#tokens) (noms cibles `@kotiz/design-tokens`). Usages propres au lot B :

| DESIGN.md                                                     | Code (cible)                                          | Usage lot B                                                                                                               |
| ------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `typography.amount` (34 / 42 / 700, tabulaires)               | `typography.amount`                                   | Cible saisie (B03, B08), montant épargné (B07), montant à remettre (B09), « Tu remets » (B10), objectif de l'aperçu (B06) |
| `typography.title`                                            | `typography.title`                                    | Titres d'écran, nom de l'épargne sur B06 (24 Bold) et B07, titre des dialogues                                            |
| `typography.section`                                          | `typography.section`                                  | « Fermées », « Derniers mouvements », « Détails », « Dedans : 0 F » (B17)                                                 |
| `colors.surface-brand-subtle` + `border-focus` 2 px           | `palette.surfaceBrandSubtle`, `palette.borderFocus`   | Sélection : type (B02), date (B04, B08), puce « Tout remettre » active (B09)                                              |
| `colors.surface-canvas`                                       | `palette.surfaceCanvas`                               | Bloc `goal-list`, puce « ≈ X F / semaine » (B06), boutons désactivés                                                      |
| `colors.surface-pending` / `text-pending`                     | `palette.surfacePending` / `palette.textPending`      | Retour en attente ou incertain (B07, B12), résultat inconnu de la création (B06) **uniquement**                           |
| `colors.text-primary` Semi Bold                               | `palette.textPrimary`                                 | « Objectif atteint » (jamais `text-brand`, jamais de coche) ; bouton texte « Fermer cette épargne »                       |
| `colors.surface-scrim` + `shadow-overlay` + `rounded.xl` (24) | `palette.surfaceScrim`, `shadows.overlay`, `radii.xl` | Dialogues B14, B16 ; feuilles B13, B15                                                                                    |
| `rounded.lg` (20)                                             | `radii.lg`                                            | Carte d'aperçu B06, carte de flux B10, bloc `goal-list`                                                                   |
| `size-touch-min` (48)                                         | `size.touchMin`                                       | Options de date, œil, liens « Modifier », puce « Tout remettre »                                                          |

**Valeurs en dur relevées dans le prototype** (à ne pas reproduire, à porter par des tokens existants) : rayon 8 de la puce « Tout remettre » (hérité de `kz-pick`, à rattacher à un token : déjà signalé par DESIGN.md) ; illustration 64 de l'aperçu B06 et 40 des nœuds du flux B10 (hors `size.*` : proposer `size.pastille` 64 et une taille d'illustration 40 au DS) ; barre de progression 8 px sur B07 (5 px sur les lignes) ; largeur des planches. Aucune couleur nouvelle.

## Composants

Rien n'existe encore dans `apps/mobile/components/` (dossier vide). Les composants du lot A (handoff A § Composants) sont des prérequis. Le lot B les réutilise et utilise les composants **promus dans le Design System v10** (`1792428939-8e5b`, DESIGN.md § Composants promus depuis le lot B). Les noms et propriétés ci-dessous sont ceux de `components/index.d.ts` du DS v10, à reproduire en React Native. Règle commune : un composant affiche des valeurs fournies par l'app (montants, pourcentages, statuts, phrase de reste calculés par la logique de l'écran selon F03) ; il ne décide d'aucun résultat financier.

### Réutilisés tels quels (DS v9, inchangés en v10)

`PageHeader` (avec `step` « Étape n sur 5 » ou « Étape n sur 3 », `link` « Modifier » sur B07), `Message` (info, succès, erreur, chargement, attente), `PinSlots` + `PinPad`, `IconPastille`, `StatusPill`, `Button`, `BottomNav`, `BottomSheet`, `IllustratedResult` (B17, illustration `120:866` « épargne créée »), `TransactionRow`, `OperationStatus`, `HomeHeader` / `BalanceCard` / `Shortcuts` (H01, lot A). `InfoLine` n'est pas utilisé dans le lot B.

Précisions d'usage :

- **`OperationStatus`** sur B12 : `done`, `pending`, `failed`. **L'état incertain de B12 utilise `status="pending"`** (signature ambre + horloge + « En attente »), pas le préréglage `uncertain` du DS (information + « À vérifier », proposition non validée) : décision de la spec (B12 incertain = « même signature En attente »). Le refus par le partenaire utilise `failed`.
- **`StatusPill status="neutral"`** : bandeau « Fermée le {date} » sur B07 fermée.

### Promus dans le DS v10 (noms exacts)

**`GoalRow`** (évolution) — `{ name, saved?, target?, state?: 'open' | 'reached' | 'closed', closedOn?, flagSrc?, illustrationSrc?, masked?, chevronIcon?, onClick? }`

- `open` (défaut) : « 45 000 F sur 100 000 F », barre 5 px, sans pourcentage.
- `reached` (épargné ≥ cible) : montant réel « 52 000 F sur 50 000 F », drapeau 20 (`flagSrc` = `Objectifs/objectif-atteint.svg`) + « Objectif atteint » en `text-primary`, **sans coche ni vert**, barre pleine. **Même rendu sur B01 et H01.**
- `closed` (section « Fermées » de B01) : nom en `text-secondary` + « Fermée le 12 oct. » (`closedOn`), **sans montant ni barre**, chevron.
- Masqué : « ••• F sur ••• F », lu « Montant masqué » ; « Objectif atteint » reste visible. Filet entre les lignes ; ligne entière cliquable, zone ≥ 48.

**`RootHeader`** — `{ title, masked?, onToggleMask?, eyeIcon? }` : en-tête de B01, titre 24 Bold « Mes épargnes », sans retour, œil intégré.
**`MaskToggle`** — `{ masked?, onToggle?, eyeIcon? }` : bouton 48, œil barré quand masqué, `aria-pressed` (RN : `accessibilityState.selected`), nom « Masquer les montants » / « Afficher les montants ». Placé dans `RootHeader` (B01) et à droite du `PageHeader` (B07). Lit et écrit **le réglage unique de masquage** (le même que l'œil de `BalanceCard` sur H01).

**`GoalTypeOption`** dans **`GoalTypeGrid`** — `GoalTypeOption { label, illustrationSrc?, selected?, onSelect? }`, `GoalTypeGrid { label?, children }` (B02).

- Grille 2 colonnes (1 colonne en très grand texte), illustration 48 + libellé 14 Semi Bold, cible ≥ 96. Sélectionné : `surface-brand-subtle`, bordure 2 `border-focus`, `selected`. Groupe nommé « Type d'épargne ».
- Types, dans cet ordre (identifiant → libellé → illustration du groupe Objectifs) : `ecole` École (Scolarité) · `commerce` Commerce · `sante` Santé (**`Objectifs/sante-coeur.svg`**, cœur) · `maison` Maison (Logement) · `voyage` Voyage · `vehicule` Véhicule · `fete` Fête (Événement) · `imprevus` Imprévus (**`Objectifs/imprevus.svg`**, coffret) · `autre` Autre projet (Projet). Nom par défaut = libellé, sauf `autre` → « Mon projet ». **Ne jamais utiliser le groupe `Archives`** (ancienne trousse à croix, ancien bouclier).

**`AmountField`** — `{ id?, label?, hideLabel?, amount?: number | '', onChange?(value: number | ''), currency?, help?, error?, wideChip?: { label, selected?, onClick? } }` (B03, B08, B09).

- Libellé visible sur B08 (« Objectif ») ; `hideLabel` sur B03 (« Montant de ton objectif ») et B09 (« Montant à remettre sur ton solde »), toujours lu.
- Clavier numérique, espaces des milliers à la frappe, zéros en tête retirés, collage non numérique ignoré, 9 chiffres au plus (prototype ; plafond réel à confirmer G01, jamais affiché). Montant `amount` 34 + « FCFA » ; à 7 chiffres sur 320 il garde 34 et ne rétrécit que s'il déborde. Zone de saisie ≥ 48. `help` (`text-secondary`) ou `error` (`text-danger`, trait rouge) lié au champ. Toujours visible, même montants masqués.
- `wideChip` « Tout remettre » (B09) : 48 de haut, sélectionnée vert doux + bordure 2 ; toute saisie différente la désélectionne. Rayon 8 hors échelle (à rattacher à un token, DESIGN.md).

**`DateChoice`** — `{ options: { id, label }[], selected?, onSelect?(id), label? }` (B04, B08).

- Options d'une ligne, pleine largeur, 48 de haut, `label` 16 Semi Bold, rayon 16 ; sélection vert doux + bordure 2 + `selected`. Groupe nommé « Date de ton objectif ». Ids : `3m`, `6m`, `1y`, `custom`.
- « Choisir une date » ouvre un **`TextField type="date"`** (« Ta date », sélecteur Android natif) ; date passée ou du jour → erreur « Choisis une date à venir. ».
- L'écran (pas le composant) affiche dessous, en zone `role=status` : « Pour le {date longue} » et « Ça fait environ {X F} par semaine. » (Règles transverses § Aide « par semaine »), le lien « Pas de date pour l'instant » (B04) ou « Retirer la date » / « Pas de date pour l'instant. » (B08).

**`TextField`** (évolution) — `multiline: true` pour la note sur 3 lignes, sans redimensionnement (B05, B08), libellé « Note (facultatif) », aide « Par exemple : frais de rentrée de Awa. » (B05). Longueur maximale à confirmer (technique), aucun compteur.

**`SummaryPreview`** (aussi `Kotiz.Summary.Preview`) — `{ id?, illustrationSrc?, typeLabel?, name, target, dateText?, weekly?, onEdit?: { name?, target?, date? }, reassurance?, details?: SummaryRowData[], srSentence? }`, `SummaryRowData { label, value, empty?, onEdit?, editLabel?, editAria? }` (B06).

- Une seule carte `surface` bordée, rayon 20, sans vert plein : illustration 64 ; type en `text-secondary` (absent s'il est égal au nom) ; nom 24 Bold ; objectif 34 Bold + « FCFA » ; barre vide + « 0 F pour l'instant » ; « d'ici le {date} » + puce `surface-canvas` « ≈ {X F} / semaine », ou « Pas de date » + « Ajouter » ; « Modifier » (48) sur le nom, l'objectif et la date. `reassurance` hors carte : « Aucun argent ne bouge. ». `details` : **Projet** toujours, **Note** seulement si remplie, chacun avec « Modifier ».
- TalkBack : la carte est lue en une phrase (`srSentence` ; défaut généré) : « Épargne École Awa, projet École, objectif 100 000 francs, d'ici le 30 juin 2027, environ 2 778 francs par semaine, 0 franc pour l'instant. » (sans date : « …, pas de date, … »). Noms des liens : « Modifier le nom », « Modifier l'objectif », « Modifier la date », « Ajouter une date », « Modifier le projet », « Modifier la note ».
- Pendant la création et en résultat inconnu : `onEdit` absent et `details` sans `onEdit` (aucun « Modifier », aucun « Ajouter »).

**`SummaryFlow`** (aussi `Kotiz.Summary.Flow`) — `{ label?, lead?, amount, onEditAmount?, from: { name, illustrationSrc? }, to: { name, illustrationSrc? }, rows?: SummaryRowData[] }` (B10 ; réutilisable aux lots C et D).

- Carte `surface` bordée, rayon 20 : `lead` « Tu remets » + montant 34 + « FCFA » + « Modifier » ; liste Depuis {épargne} ↓ Vers « Mon solde » (illustrations 40 : celle du type, puis Déposer), nommée « De {épargne} vers Mon solde ».
- `rows` du lot B : « Il restera » → « {X F} dans {épargne} » ; « Ton solde après » → solde disponible + montant, **exact**. **Aucune ligne « Frais »** (mouvement interne sans frais ; la ligne Frais du composant ne sert qu'aux lots C et D, avec un frais confirmé). « Ton solde après » est retirée quand les montants sont masqués.

**`GoalProgress`** — `{ name, saved, target, masked?, flagSrc? }` (B07).

- Montant épargné `amount` + « FCFA » ; « sur {cible} » ; barre 8 + « {n} % » ; « Encore {reste} pour ton objectif. ». Atteint : drapeau 32 + « Objectif atteint » (`section`, `text-primary`, sans coche), barre pleine, montant réel, pas de %. Masqué : « ••• ••• FCFA », « sur ••• F », ni % ni reste, barre visible non annoncée.
- **Hors composant, sur l'écran B07** : à zéro « Mets ton premier montant quand tu veux. » (**retirée en masqué** : elle révèle le zéro) ; atteint « Ton épargne reste ouverte. Tu peux continuer ou remettre l'argent sur ton solde. » ; fermée : montant « 0 FCFA » seul, sans `GoalProgress`.
- Barre : `accessibilityRole="progressbar"` avec la valeur en visible, aucune valeur en masqué.

**`ConfirmDialog`** — `{ id?, title, children, primary, secondary?, onPrimary?, onSecondary?, primaryState?: 'default' | 'loading' | 'disabled' }` (B14, B16).

- Voile `surface-scrim`, carte rayon 24 + `shadow-overlay`, titre 24, phrases courtes (la conséquence irréversible en gras), primaire puis secondaire empilés ; rôle `alertdialog`, focus sur le titre, retour Android = secondaire. Le primaire de B14 est **vert, jamais rouge** ; `primaryState="loading"` → « Fermeture… ».

**`StepTracker`** (évolution) — `Step { label, status?: 'done' | 'sent' | 'pending' | 'todo', word? }`.

- B12 en attente et incertain : `steps = [{ label: 'Demande', status: 'sent' }, { label: 'Arrivée sur ton solde', status: 'pending' }]`, `label = « Où en est ton retour »`. `sent` = pastille neutre + point + « Envoyée » en `text-primary`. **Jamais `done` ni le mot « Fait » sur un écran d'attente.**

**Illustrations** (groupe Objectifs) : `sante-coeur.svg` (Santé), `imprevus.svg` (Imprévus), `objectif-atteint.svg` (drapeau, `GoalRow` `reached` et `GoalProgress`). Décoratives (`accessible={false}`). Aucune croix, aucun bouclier, aucun parapluie, aucune coche. À copier dans `apps/mobile/assets`.

### Hors Design System (à construire dans l'app ou à décider)

| Élément                                             | Où       | Statut                                                                           | À faire                                                                                                                                                                                                                           |
| --------------------------------------------------- | -------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DateField` (champ date dédié, « Retirer la date ») | B04, B08 | **Laissé de côté** par le DS v10                                                 | Utiliser `TextField type="date"` + le sélecteur natif Android (faisabilité à confirmer côté dev) ; « Retirer la date » est un bouton texte de l'écran                                                                             |
| `TransactionRow`, variante mouvement interne        | B07, H01 | **Laissé de côté**, à décider avec le lot C                                      | En attendant : titres propres et illustration Épargnes dans une pastille neutre — B07 « Vers mon solde » (`−`) / « Depuis mon solde » (`+`) ; H01 « Depuis {épargne} » (`+`) / « Vers {épargne} » (`−`). Jamais de logo opérateur |
| Squelette de chargement (B01, B07)                  | B01, B07 | **Absent du bundle** (source Figma `66:582` citée par DESIGN.md, sans composant) | Composant d'écran : blocs `surface-canvas` sans texte, `role=status` + `aria-busy`, libellé lu « Chargement de tes épargnes » / « Chargement de ton épargne » ; jamais de montant ni de « 0 »                                     |
| Description d'une raison liée à un bouton désactivé | B07      | `Button` du DS ne transmet pas de description                                    | Ajouter une prop d'accessibilité (`accessibilityHint` ou équivalent) au `Button` RN, pour relier « Un retour est en cours… » aux deux boutons                                                                                     |
| Préréglage `uncertain` de `OperationStatus`         | B12      | Présent dans le DS mais **non utilisé**                                          | Ne pas l'utiliser au lot B (`pending` à la place)                                                                                                                                                                                 |

## Écrans

Plateforme : Android d'abord ; largeurs 320 à 430 (contrôle à 320, 360, 390, 430) ; portrait seul. **Barre basse uniquement sur B01** (et H01). Toutes les autres pages sont poussées, avec `PageHeader`. Clavier ouvert : champ actif et bouton principal visibles (bouton collé au-dessus du clavier).

Règles communes (spec § Règles communes) :

- **Étapes** : création « Étape n sur 5 » (B02 à B06 : Projet, Combien, Pour quand, Nom, Vérifier) ; retour au solde « Étape n sur 3 » (B09 Montant, B10 Vérifier, B11 PIN).
- **Destination lisible** : B09 à B12 rappellent le nom de l'épargne, « Depuis » et « Vers ».
- **Attente réseau** > 1 s : bouton en `loading` (« Création… », « Enregistrement… », « Envoi… », « Fermeture… »), écran figé, double appui ignoré, aucun écran suivant avant la réponse.
- **Hors ligne** : `Message` info « Pas de connexion. » + « Ta saisie est gardée. », bouton « Réessayer ». Jamais de succès supposé.
- **Retour Android** = `←`, sauf mentions contraires (B12, B17).

### B01 — Mes épargnes (racine)

- Structure (défile, sauf la barre basse) : `RootHeader` « Mes épargnes » + œil ; `Message` succès « {nom} est fermée. » (une fois, au retour d'une fermeture) ; si hors ligne `Message` info « Mis à jour à {HH:MM} · hors connexion » ; épargnes actives dans un bloc `goal-list` de `GoalRow` (ordre : à confirmer à l'implémentation, recommandation : date de création) ; compteur « {n} sur 3 épargnes actives » (`body`, `text-secondary`) ; bouton principal « Créer une épargne » (absent à 3 actives) ; section « Fermées » (titre `section` + `GoalRow` `closed`, les 5 plus récentes, puis le lien « Voir les {n} épargnes fermées › » s'il y en a plus de 5) ; `BottomNav` (Épargnes actif).
- Données : épargnes de la cliente (identifiant, type, nom, montant épargné confirmé, cible, statut active / fermée, date de fermeture), date de dernière mise à jour.
- Interactions : une épargne active ou fermée → B07 ; œil → bascule le réglage de masquage ; Créer une épargne / Crée ta première épargne → B02 ; onglets → racines.
- États :
  - **Vide** : `IconPastille` violette 80 (illustration Épargnes), « Pas encore d'épargne. » (`section`), « Mets de côté pour un projet : école, boutique, fête… », bouton principal « Crée ta première épargne ». Aucune relance.
  - **1 ou 2 actives** : liste + compteur + « Créer une épargne ».
  - **3 actives** : liste + compteur « 3 sur 3 épargnes actives » + `Message` info titre « Tu as 3 épargnes actives. C'est le maximum. », texte « Pour en créer une autre, ferme une épargne vide. » ; **aucun bouton Créer, aucun bouton qui ferme ou vide une épargne**.
  - **Fermées seulement** : état vide + section Fermées.
  - **Masqué** : `GoalRow` masquées, œil barré.
  - **Chargement** (premier affichage, version 9) : squelette de 2 lignes (illustration, deux traits, barre) en blocs gris, `role=status` + `aria-busy`, lu « Chargement de tes épargnes » ; **aucun montant, aucun « 0 », compteur, « Créer une épargne », état vide et section Fermées cachés** jusqu'à la réponse.
  - **Plus de 5 fermées** (version 9) : les 5 fermées les plus récentes (date de fermeture décroissante), puis le lien « Voir les {n} épargnes fermées › », qui déplie la liste complète sur place. Seuil de 5 : valeur du prototype validé, configurable.
  - **Hors ligne** : derniers montants connus + message daté ; « Créer une épargne » reste visible (B06 refusera l'envoi).
- Cas : nom long tronqué sur une ligne ; deux épargnes au même nom affichées toutes les deux ; montant à 7 chiffres qui passe à la ligne sous le nom ; retour au solde en attente sur une épargne : la ligne garde le montant confirmé.

### B02 — Quel projet ? (étape 1 sur 5)

- Structure : `PageHeader` (← vers la provenance : E08, H01, B01 ou lot C ; « Étape 1 sur 5 ») ; titre « Quel projet ? » ; `GoalTypeOption` ; « Tu lui donneras un nom plus loin. ». Pas de bouton principal.
- Interactions : toucher un type → B03 (ou → B06 si ouvert depuis le récapitulatif) ; ←.
- États : nominal ; retour depuis B03 : type marqué sélectionné ; choisir un autre type garde la cible saisie ; si le nom n'a pas été modifié, il suit le nouveau type, sinon il est gardé.
- Entrée : avant d'ouvrir B02, l'app vérifie le nombre d'épargnes actives connu ; à 3 → B15 (voir P7).

### B03 — Combien ? (étape 2 sur 5)

- Structure : `PageHeader` (« Étape 2 sur 5 ») ; rappel du type (illustration 32 + libellé) ; titre « Combien tu veux mettre de côté ? » ; `AmountField` (libellé lu « Montant de ton objectif ») ; aide sous le trait ; bouton « Continuer ».
- Aide / raison : vide → « Écris un montant. » ; 0 → « Le montant doit être plus grand que 0. » ; valide → « C'est ton objectif. Aucun argent ne bouge. ».
- Interactions : Continuer → B04 (ou B06 depuis le récapitulatif) ; ← → B02 (type gardé) ou B06.
- États : vide et 0 (Continuer désactivé + raison) ; saisi ; clavier ouvert. Pas de montants rapides. Cible minimum et maximum : à confirmer G01, aucune valeur affichée.

### B04 — Pour quand ? (étape 3 sur 5)

- Structure : `PageHeader` (« Étape 3 sur 5 ») ; rappel « {type} · {cible} » ; titre « Pour quand ? » ; `DateChoice` ; `DateField` si « Choisir une date » ; zone « Pour le … » + « Ça fait environ … par semaine. » ; tant que rien n'est choisi : « Choisis une durée, ou continue sans date. » ; lien « Pas de date pour l'instant » ; bouton « Continuer ».
- Interactions : un raccourci → date = aujourd'hui + 3, 6 ou 12 mois (même jour du mois) ; « Choisir une date » → sélecteur ; Continuer → B05 (ou B06 depuis le récapitulatif) ; « Pas de date pour l'instant » → B05 sans date ; ←.
- États : rien choisi (Continuer désactivé + raison) ; raccourci sélectionné ; date choisie à venir ; date passée ou du jour (erreur « Choisis une date à venir. », Continuer désactivé).
- La question est toujours posée ; la réponse est facultative.

### B05 — Comment tu l'appelles ? (étape 4 sur 5)

- Structure : `PageHeader` (« Étape 4 sur 5 ») ; rappel du type ; titre « Comment tu l'appelles ? » ; `TextField` « Nom » **prérempli avec le nom par défaut** du type, aide « Si tu ne mets rien : {nom par défaut} » ; `TextField` multiligne « Note (facultatif) », aide « Par exemple : frais de rentrée de Awa. » ; bouton « Continuer » **toujours actif**.
- Règle : nom effacé → le nom par défaut est utilisé à la création. Nom et note : longueur maximale à confirmer (technique).
- Interactions : Continuer → B06 ; ← → B04 (ou B06 depuis le récapitulatif).

### B06 — Vérifie ton épargne (étape 5 sur 5)

- Structure : `PageHeader` (« Étape 5 sur 5 ») ; titre « Vérifie ton épargne » ; messages éventuels ; `SummaryPreview` ; « Aucun argent ne bouge. » ; bloc « Détails » ; bouton principal.
- Interactions : « Modifier » → étape concernée (nom et note → B05, objectif → B03, date → B04, projet → B02), dont Continuer (ou le toucher d'un type) ramène à B06 ; « Ajouter » (sans date) → B04 ; Créer mon épargne → création ; ← → B05.
- Bouton principal : « Créer mon épargne » ; « Création… » pendant l'envoi ; « Vérifier à nouveau » en résultat inconnu ; « Réessayer » hors ligne.
- États :
  - nominal (avec ou sans date, avec ou sans note) ;
  - **même nom qu'une épargne active** : `Message` info « Tu as déjà une épargne {nom}. Donne un autre nom à celle-ci. », sans bloquer ;
  - **création en cours** : tout figé, aucun « Modifier » ;
  - **échec connu** : `Message` erreur titre « Échoué : ton épargne n'est pas créée. », texte « Réessaie. », saisie gardée, « Modifier » de retour ;
  - **résultat inconnu** (délai dépassé, connexion perdue après envoi) : `Message` attente titre « En attente », texte « On vérifie si ton épargne est créée. Ne la recrée pas. », bouton « Vérifier à nouveau » (interroge le résultat avec la même clé, **ne recrée jamais**), aucun « Modifier » ;
  - **limite atteinte entre-temps** (refus serveur) → B15 ;
  - **hors ligne** : `Message` info « Pas de connexion. » + « Ta saisie est gardée. », « Réessayer ».
- Données envoyées : type, nom (ou nom par défaut), cible, date (facultative), note (facultative), clé d'idempotence générée à l'entrée de B06.

### B17 — Ton épargne est créée

- Affiché **seulement après confirmation serveur**.
- Structure : `IllustratedResult` (illustration `120:866`, titre « C'est fait ! Ton épargne {nom} est créée. », détail « Aucun argent n'a bougé. ») ; « Dedans : 0 F » (`section`) ; « Objectif : {cible} » (`text-secondary`) ; « Pour le {date} » s'il y a une date ; bouton principal « Voir mon épargne ».
- Interactions : Voir mon épargne → B07 de la nouvelle épargne ; **retour Android = Voir mon épargne** (jamais B06). Depuis B07, ← mène à H01 si la création venait de E08 ou H01, à B01 si elle venait de B01.
- Animation : entrée du résultat 320 ms, sans célébration animée ; 0 ms en mouvement réduit.

### B07 — Détail d'une épargne

- Structure (défile) : `PageHeader` (← provenance, lien « Modifier » absent si fermée) + `MaskToggle` ; messages ; bandeau `StatusPill` neutre « Fermée le {date} » si fermée ; illustration 56 + nom (`title`, retour à la ligne) ; `GoalProgress` ; « Pour le {date} · encore {n} semaines » (ou « · moins d'une semaine » sous 7 jours ; rien après la date si elle est passée) ; « Note : {note} » ; boutons « Mettre de l'argent » (principal) et « Remettre sur mon solde » (secondaire) + raison éventuelle ; section « Derniers mouvements » (3 `TransactionRow` + « Tout voir › ») ; bouton texte « Fermer cette épargne » (`text-primary`) + raison éventuelle.
- Données : épargne (type, nom, note, cible, date, montant épargné confirmé, statut, date de fermeture), indicateurs « retour en attente » et « alimentation en attente », 3 derniers mouvements (titre, date, montant, sens, statut).
- Interactions : Mettre de l'argent → lot C ; Remettre sur mon solde → B09 ; Modifier → B08 ; un mouvement / Tout voir → lot C (Opérations filtrées) ; Fermer cette épargne → B13 (fonds > 0) ou B14 (à 0) ; œil.
- États :
  - **partielle** : montant, « sur {cible} », barre, « {n} % », « Encore {reste} pour ton objectif. » ;
  - **à zéro** : « 0 FCFA », barre vide, pas de %, « Mets ton premier montant quand tu veux. » ; Remettre désactivé avec « Rien à remettre pour l'instant. » ; « Tes mouvements s'afficheront ici. » ;
  - **objectif atteint** : voir `GoalProgress` ; mêmes boutons, même ordre ; aucun `StatusPill`, aucun titre de résultat ;
  - **retour en attente** : Remettre et Fermer désactivés ; **une seule phrase** sous Remettre : « Un retour est en cours. Tu pourras remettre ou fermer après. », reliée aux deux boutons pour TalkBack (`accessibilityHint` ou description : le `Button` du DS ne transmet pas `aria-describedby`, à ajouter) ; montant et barre sur le confirmé ;
  - **alimentation en attente** : seul Fermer est désactivé, avec « De l'argent est en route. Tu pourras fermer après. » ;
  - **modifiée** : `Message` succès « Modifications enregistrées. » ;
  - **de l'argent est arrivé** (fermeture refusée) : `Message` info « De l'argent est arrivé. {nom} reste ouverte. » ;
  - **fermée** : bandeau, « 0 FCFA », pas de barre ni de boutons ni de « Modifier », mouvements conservés ; aucune réouverture ;
  - **masquée** : `GoalProgress` masqué, montants des mouvements masqués ; libellés, statuts, dates, date cible visibles ;
  - **échec de fermeture** (après B14, version 9) : `Message` erreur titre « Échoué : {nom} n'est pas fermée. », texte « Ton argent et tes mouvements n'ont pas changé. Réessaie. » ; l'épargne reste active, « Fermer cette épargne » reste disponible ;
  - **chargement** (version 9) : squelette (illustration 56 + titre, montant, ligne, barre, deux boutons en blocs gris), `role=status` + `aria-busy`, lu « Chargement de ton épargne » ; **« Modifier » caché**, aucun montant ni « 0 » ;
  - **hors ligne** : derniers montants + message daté, boutons gardés.
- Cas : cible dépassée de beaucoup (« 152 000 FCFA sur 50 000 F », jamais « 304 % ») ; épargne fermée ailleurs pendant la consultation → état fermée au rafraîchissement.

### B08 — Modifier l'épargne

- Structure : `PageHeader` (titre « Modifier ») ; ligne « Projet : {type} — ne change pas » ; `TextField` « Nom » (aide « Si tu ne mets rien : {nom par défaut} ») ; `AmountField` « Objectif » ; « Pour quand ? » (`DateChoice`, date actuelle en « Choisir une date », « Retirer la date ») ; « Note (facultatif) » ; bouton « Enregistrer ».
- Règles : aucun mouvement de fonds ; type non modifiable ; nom, note et date effaçables ; cible requise et > 0 ; cible ≤ montant épargné → aide « Ton objectif sera atteint avec ce montant. » ; la modification reste possible pendant un mouvement en attente.
- Bouton : désactivé tant que rien n'a changé ou que la cible est vide ou à 0 (raisons « Écris un montant. », « Le montant doit être plus grand que 0. ») ; « Enregistrement… » pendant l'envoi.
- Interactions : Enregistrer → B07 + « Modifications enregistrées. » ; ← avec changements → B16 ; ← sans changement → B07.
- États : nominal ; enregistrement ; hors ligne ;
  - **échec d'enregistrement** (version 9) : `Message` erreur titre « Échoué : rien n'a changé. », texte « Tes saisies sont gardées. Réessaie. » ; champs gardés, « Enregistrer » actif ;
  - **épargne fermée entre-temps** (version 9) : `Message` info titre « Cette épargne est fermée. », texte « Elle a été fermée entre-temps. Tes changements ne sont pas enregistrés. » ; le bouton principal devient « Voir mon épargne » (→ B07 en état fermée) à la place d'« Enregistrer ».

### B16 — Quitter sans enregistrer ?

- `ConfirmDialog` : titre « Quitter sans enregistrer ? », « Tes changements seront perdus. », primaire « Rester » (ferme le dialogue), secondaire « Quitter » (→ B07, anciennes valeurs). Affiché seulement si un champ a changé.

### B09 — Combien remettre ? (étape 1 sur 3)

- Structure : `PageHeader` (← B07, « Étape 1 sur 3 ») ; titre « Combien remettre sur ton solde ? » ; `Message` éventuel ; « Depuis : {épargne} · {disponible} dedans » ; `AmountField` (libellé lu « Montant à remettre sur ton solde ») + puce « Tout remettre » ; « Vers : Solde disponible » ; bouton « Continuer ».
- Raisons : vide « Écris un montant. » ; 0 « Le montant doit être plus grand que 0. » ; supérieur au disponible « Tu peux remettre {disponible} au plus. ».
- Interactions : Tout remettre → montant = disponible ; Continuer → B10 ; ← → B07.
- États : vide ; saisi ; Tout remettre ; supérieur au disponible ; prérempli depuis B13 (Tout remettre sélectionné, modifiable) ; **disponible changé** (au retour de B10 ou sur refus serveur) : `Message` info titre « Le montant disponible a changé. », texte « Il y a maintenant {X F} dans {épargne}. ».
- Accès : impossible si l'épargne est à 0 ou si un retour est en attente (boutons désactivés sur B07). Minimum de retour : à confirmer G01, aucune valeur.

### B10 — Vérifie ton retour (étape 2 sur 3)

- Structure : `PageHeader` (← B09, « Étape 2 sur 3 ») ; titre « Vérifie ton retour » ; `SummaryFlow` (« Tu remets » {montant} FCFA + « Modifier » ; Depuis {épargne} → Vers Mon solde ; « Il restera » ; « Ton solde après ») ; si retour total : `Message` info « {épargne} sera à 0 F. Elle reste ouverte. » ; « L'argent reste sur KOTIZ. Pour le sortir, utilise Retirer. » ; bouton « Continuer ».
- **Sans frais** : pas de ligne Frais, pas d'état « frais inconnus », Continuer jamais bloqué par G01. « Ton solde après » = solde disponible + montant.
- Interactions : Continuer → B11 ; Modifier / ← → B09 (montant gardé).
- États : nominal ; retour total ; masqué (« Ton solde après » retiré) ; disponible changé → B09 avec le message ; hors ligne ;
  - **refusé par une règle** (décision PO du 19 octobre 2026) : quand une règle du partenaire ou de KOTIZ (niveau d'accès, KYC, G01) interdit déjà ce retour, le refus est connu **avant le PIN** et s'affiche sur B10 : `Message` erreur avec la raison communicable (titre proposé « Ce retour n'est pas possible pour l'instant. », texte exact à reprendre du canvas), « Ton argent n'a pas bougé. », lien « Contacter l'aide › » (G03) ; **« Continuer » désactivé**, la raison étant affichée ; **aucune limite, aucun plafond ni montant chiffré**. Le récapitulatif reste lisible ; « Modifier » et ← restent possibles. Le contrôle est fait par le serveur à l'ouverture de B10 (et à la reprise après arrière-plan), pas déduit par l'app.
  - Un échec **technique** au moment du mouvement n'est jamais affiché sur B10 : il arrive après le PIN, sur B12 (« Échoué »).
- Reprise après arrière-plan : solde et disponible relus avant B11, récapitulatif recalculé.

### B11 — Entre ton PIN (étape 3 sur 3)

- Structure : `PageHeader` (← B10, « Étape 3 sur 3 ») ; titre « Entre ton PIN » (« Ton PIN est bloqué » en état bloqué) ; rappel « {montant} {d'épargne / de épargne} vers ton solde » (élision : « d'École Awa », « de Boutique ») ; `Message` erreur éventuel ; `Message` chargement « Envoi… » pendant l'envoi ; `Message` info « Ne le montre à personne, même à une agente. » ; `PinSlots` (longueur configurée, G02) ; lien « PIN oublié ? » ; `PinPad` en bas.
- Interactions : dernier chiffre → envoi (pas de bouton) ; PIN oublié ? → lot F ; ← → B10, PIN effacé.
- États : saisie ; envoi (pavé figé) ; « PIN incorrect. Réessaie. » (cases en erreur puis vidées ; essais restants seulement si la règle est configurée, G02) ; **bloqué** (version 9) : titre « Ton PIN est bloqué », `Message` erreur titre « Trop d'essais. », texte « Ton retour n'est pas envoyé : ton argent n'a pas bougé. Réessaie plus tard, ou utilise PIN oublié. » ; mention de secret, `PinSlots` et `PinPad` retirés ; bouton principal « Voir mon épargne » (→ B07), bouton texte « PIN oublié ? » (lot F) ; nombre d'essais et durée du blocage à confirmer (G02), **aucun chiffre affiché**, même règle que C01 ; hors ligne avant envoi (**à dessiner** : « Pas de connexion. Rien n'a été envoyé. » d'après la spec) ; connexion perdue après envoi → B12 incertain.
- Sécurité : PIN jamais affiché, stocké ni journalisé ; capture d'écran bloquée à confirmer (technique, comme E06).

### B12 — Résultat du retour

- Structure : plein écran sans `PageHeader`, fond canvas ; `OperationStatus` au centre ; boutons en bas.
- **Fait** : titre « {montant} sont sur ton solde. » ; « Depuis : {épargne} » ; partiel : « Il reste {X F} dans {épargne}. » + petite barre ; total : « {épargne} est à 0 F. Elle reste ouverte. » ; référence ; lien « Voir le reçu › » (lot C). Boutons : « Voir mon épargne » (principal), « Voir mon solde » (texte) ; **si total, épargne à 0, aucune alimentation en attente** : lien « Fermer cette épargne ? » 16 plus bas → B14 par-dessus B12. Pas d'illustration de célébration.
- **En attente** : `OperationStatus` `pending`, titre « Ton retour est en attente. », `StepTracker` (Demande · Envoyée ; Arrivée sur ton solde · En attente), « {montant} {d'épargne} vers ton solde. », « Ne refais pas l'opération. », « Tu le retrouves dans Opérations. », référence. Pas de reçu, pas de lien de fermeture.
- **Incertain** (connexion perdue après envoi, délai dépassé) : même signature `pending`, titre « On vérifie ton retour. », même contenu + lien « Contacter l'aide › » (G03). **Aucun Réessayer.**
- **Échoué** : `OperationStatus` `failed`, titre « Ton retour de {montant} n'a pas marché. », « Ton argent n'a pas bougé. Il est dans {épargne}. » ; boutons « Réessayer » (principal → B10 relu, nouveau PIN) et « Voir mon épargne » (texte).
- **Échoué** couvre aussi l'échec technique au moment du mouvement (le mouvement est tenté et son échec est confirmé) : même écran, même texte. Un refus par règle connu d'avance n'arrive jamais ici : il est montré sur B10 avant le PIN (décision PO du 19 octobre 2026). Le canvas version 9 montre encore un état « Refusé par le partenaire » sur B12 (« Ton retour de {montant} n'est pas accepté. ») : à ne pas reprendre.
- Interactions : Voir mon épargne / **retour Android** → B07 (jamais B10 ni B11) ; Voir mon solde → H01.
- Montants toujours visibles, même masqués (Q3). Annonce du titre en `role=status` (fait, attente) ou `alert` (échec).

### B13 — Il reste de l'argent (feuille)

- `BottomSheet` titre « Il reste {X F} dans {épargne} », « Pour la fermer, elle doit être vide. », « Remets d'abord l'argent sur ton solde. », primaire « Remettre sur mon solde » (→ B09 avec Tout remettre sélectionné), texte « Garder mon épargne » (ferme), ✕ « Fermer ». Montant visible même masqué.

### B14 — Fermer l'épargne ?

- `ConfirmDialog` : titre « Fermer {épargne} ? », « Elle quittera tes épargnes actives. », « Ses mouvements restent dans Opérations. », « Tu ne pourras pas la rouvrir. » (Semi Bold) ; primaire « Fermer l'épargne » (« Fermeture… » pendant l'envoi), secondaire « Garder » (retour à B07 ou à B12).
- Ouvert depuis B07 (épargne à 0, rien en attente) ou depuis le lien de B12.
- Résultats : fait → B01 + « {épargne} est fermée. » ; de l'argent est arrivé → B07 + « De l'argent est arrivé. {épargne} reste ouverte. » ; échec → B07 + `Message` erreur « Échoué : {épargne} n'est pas fermée. » / « Ton argent et tes mouvements n'ont pas changé. Réessaie. » (version 9) ; hors ligne.
- Jamais le mot « supprimer ».

### B15 — Limite atteinte (feuille)

- `BottomSheet` titre « Tu as déjà 3 épargnes actives », `IconPastille` violette, « C'est le maximum. » (Semi Bold), « Pour en créer une autre, ferme une épargne vide. », « Les épargnes fermées ne comptent pas. », primaire « Voir mes épargnes » (→ B01), ✕ « Fermer ».
- Ouvert depuis : toute entrée « Créer » quand 3 épargnes sont actives (lot C après un dépôt, E08, H01) et le refus serveur sur B06. Aucune action qui ferme ou vide une épargne.

### Raccords H01 (lot A, déjà livré par #94)

- `GoalRow` `reached` pour une épargne atteinte (même rendu que B01).
- État vide : « Pas encore d'épargne. » + « Créer une épargne › » → B02 (ou B15 à 3 actives).
- Après un retour au solde : le solde n'augmente que si le retour est **fait** ; la ligne « Dernier dépôt » de la carte solde reste réservée aux **dépôts** ; le retour apparaît en tête des Dernières opérations (« Depuis {épargne} », `+`, statut Fait ou En attente).
- E08 « Créer mon épargne » → B02 (ou B15).

## Règles transverses

### Progression (DESIGN.md F03)

- Entrées : montant épargné (mouvements **confirmés** seulement, H3, à confirmer G01) et cible. `pourcentage = ⌊épargné / cible × 100⌋` ; `barre = min(pourcentage, 100) %` ; `reste = cible − épargné`, affiché seulement s'il est positif. Atteint si `épargné ≥ cible` : « Objectif atteint », barre pleine, jamais de % > 100.
- Calcul fait par l'app (ou fourni par l'API) dans une fonction unique partagée par H01, B01, B07 et B12 ; testée unitairement.

### Aide « par semaine » (B04, B06, B08)

- `semaines = max(1, ⌊jours jusqu'à la date / 7⌋)` ; `par semaine = ⌈cible / semaines⌉`, format `X F`. Exemples : 100 000 F au 30 juin 2027 depuis le 19 octobre 2026 → 2 778 F ; 100 000 F dans 6 mois → 3 847 F ; 50 000 F dans 6 mois → 1 924 F.
- Aide d'affichage seulement : jamais un engagement, un rappel ni un prélèvement. Date du jour = date locale de l'appareil (fuseau Abidjan, UTC+0) ; recalculée à chaque affichage.
- B07 : « encore {n} semaines » avec `n = ⌊jours / 7⌋` ; « moins d'une semaine » si `n < 1` ; rien si la date est passée.

### Masquage des montants

- Réglage unique du lot A, persistant (stockage local, portée appareil ou compte à confirmer), basculé par l'œil de H01, B01 ou B07. Masqué sur B01 et B07 : voir `GoalRow` et `GoalProgress`.
- **Toujours visibles** : saisie (B03, B08, B09), récapitulatifs (B06, B10 sauf « Ton solde après »), rappel du PIN (B11), résultat (B12), feuille B13.

### Statuts et vocabulaire

- « Fait », « En attente », « Échoué » : mot + pictogramme + couleur. « Fait » n'apparaît que pour un résultat confirmé. Un délai dépassé produit « En attente », jamais un succès.
- « Objectif atteint » est un état de l'épargne, jamais un statut de transaction.
- Le mouvement interne s'appelle **« Remettre sur mon solde »** ; jamais « retrait », « retirer » ni « transfert ». Fermer ≠ supprimer.
- Santé : libellé « Santé » seul ; aucun écran, libellé ni illustration n'évoque une assurance, une couverture, une cotisation ou un remboursement.
- Aucun frais, plafond, minimum, délai ni garantie non confirmé. Le retour au solde est sans frais.

### Formats (PRODUCT.md)

- Montants entiers FCFA, espace insécable des milliers (`45 000 FCFA` ; dans une ligne `45 000 F`) ; `+` / `−` sur les mouvements ; `formatAmount` partagé. Backend : `Money` en centimes, jamais de `float`.
- Dates : longues « 30 juin 2027 » (B04, B06, B07, B17) ; courtes « 12 oct. » (fermée) ; mouvements « 18 oct. · 09:24 ».
- Espace insécable avant « ? », « ! » et « : ».

### Navigation et pile

- B02 à B06 forment une pile ; « Modifier » depuis B06 ouvre l'étape en mode « retour au récapitulatif ».
- Après B17, la pile de création est vidée : B07 revient à H01 ou B01.
- Après B12, la pile du retour (B09 à B11) est vidée : le retour mène à B07.
- B13, B15 : feuilles ; B14, B16 : dialogues ; retour Android = fermer / bouton secondaire.

### Réseau, idempotence, concurrence

- Pas de file hors ligne (H5) : création, modification, retour et fermeture demandent le réseau.
- **Création** et **retour au solde** : idempotents, clé générée par l'app à l'entrée de B06 / B10, réutilisée par « Vérifier à nouveau » et par l'interrogation du résultat. « Réessayer » après un **échec confirmé** du retour génère une nouvelle clé et redemande le PIN.
- Délais d'expiration : à confirmer (technique) ; au-delà, B06 « En attente » ou B12 incertain.
- Le serveur fait foi pour : la limite de 3 (refus → B15), le disponible (refus → B09 « Le montant disponible a changé. »), la fermeture à zéro et sans attente (refus → B07 « De l'argent est arrivé… »), un retour déjà en attente (refus), une épargne fermée (refus).

### Backend (contexte Savings)

- **Épargne** (`SavingsGoal`) : type (fixe), nom, note, cible, date facultative, statut active / fermée, date de fermeture. Créer, modifier et fermer **ne déplacent aucun argent** et ne demandent pas de PIN (H1).
- **Limite** : 3 épargnes actives par cliente, fermées exclues, contrôlée de façon atomique (deux créations simultanées ne donnent jamais 4 actives).
- **Retour au solde** : mouvement interne de l'épargne vers le solde disponible de la même cliente, autorisé par le PIN KOTIZ (IAM), montant entier > 0 et ≤ épargné confirmé, **aucun frais** ; écritures ledger équilibrées (débit épargne, crédit solde, même montant) ; résultat fait / en attente / échoué ; un seul retour en attente par épargne (RM-FUND-09). Aucun retrait externe enchaîné.
- **Refus par règle avant autorisation** : le serveur dit, avant le PIN, si une règle interdit ce retour (niveau d'accès, KYC, G01) et renvoie une raison communicable sans valeur chiffrée ; l'app l'affiche sur B10. Le serveur refait le contrôle au moment du mouvement : une règle devenue bloquante entre B10 et le PIN produit un échec sur B12, sans effet sur les fonds.
- **Fermeture** : refusée si l'épargne n'est pas à 0, si un mouvement est en attente ou si elle est déjà fermée ; l'historique et les reçus sont conservés ; aucune réouverture.
- **Interdits côté serveur** : aucune fermeture automatique (même à 0, même après un retour total), aucun transfert automatique quand la cible est atteinte, aucun blocage des fonds jusqu'à la date (pas de `GoalLock`).
- Événements (noms à fixer avec `domain-modeling`) : épargne créée, modifiée, fermée ; retour au solde demandé, fait, échoué ; objectif atteint (information seulement, aucun effet sur les fonds).

### Accessibilité

- Cibles ≥ 48 ; texte essentiel ≥ 14 ; titre de chaque écran annoncé `header` ; erreurs `alert` ; attentes `status`.
- Noms accessibles : œil, « Modifier le nom / l'objectif / la date / le projet / la note », « Ajouter une date », flux « De {épargne} vers Mon solde », phrase unique de l'aperçu B06, « Fermer » des feuilles.
- Une raison de bouton désactivé est liée au bouton (B07 : une phrase pour deux boutons).
- Grand texte : grille B02 sur 1 colonne, options de date sur deux lignes, aucun chevauchement.

## Cas limites

- **Noms** : 40 caractères et plus → retour à la ligne partout sauf `GoalRow` (une ligne, « … ») ; même nom que deux actives → autorisé ; nom vide → nom par défaut ; emoji et longueur maximale → à confirmer.
- **Montants** : 7 chiffres (« 1 250 000 FCFA ») à 320 ; cible très dépassée ; retour égal au disponible = total ; retour d'un montant > disponible refusé avant B10.
- **Listes** : 0 épargne ; 3 actives ; fermées seulement ; plus de 5 fermées (5 + « Voir les {n} épargnes fermées › ») ; 0 mouvement.
- **Double soumission** : chaque bouton principal passe en `loading` ; PIN envoyé une seule fois ; clé d'idempotence réutilisée.
- **Concurrence** : de l'argent arrive pendant B14 → refus ; le disponible baisse entre B09 et B11 → retour à B09 ; limite atteinte depuis un autre appareil pendant la création → B15 ; épargne fermée ailleurs pendant B08 → état fermée.
- **Interruption** : app en arrière-plan sur B10 → récapitulatif relu ; sur B11 → PIN effacé ; résultat arrivé app fermée → B07 et Opérations montrent le statut réel.
- **Dates** : date du jour ou passée refusée ; date à moins d'une semaine → calcul sur 1 semaine ; date cible dépassée sur une épargne existante → B07 affiche la date sans « encore » ; fin de mois (à confirmer).
- **Session expirée** pendant un parcours : retour à C01, saisie de B03 à B05 gardée seulement si la règle de reprise du lot A le permet (à confirmer G02) ; jamais le PIN.
- **Permissions** : aucune (le sélecteur de date ne demande rien).

## Critères d'acceptation

Chaque groupe peut devenir un ticket ; le rattachement aux issues est dans [issues-lot-b.md](issues-lot-b.md), les scénarios dans [gherkin-lot-b.md](gherkin-lot-b.md).

### Socle lot B — composants et assets

- [ ] `GoalRow` accepte `state` `reached` (drapeau + « Objectif atteint » en `text-primary`, sans coche, barre pleine) et `closed` (« Fermée le … », sans barre ni montant).
- [ ] `RootHeader`, `MaskToggle`, `GoalTypeOption` + `GoalTypeGrid`, `AmountField`, `DateChoice`, `TextField` `multiline`, `SummaryPreview`, `SummaryFlow`, `GoalProgress` et `ConfirmDialog` existent avec les noms et propriétés du DS v10 (`components/index.d.ts`) ; le choix d'une date utilise `TextField type="date"` (pas de `DateField`).
- [ ] Un squelette de chargement d'écran (hors DS) n'affiche aucun montant ni « 0 » et est annoncé comme chargement.
- [ ] `SummaryFlow` n'a aucune ligne « Frais » dans le lot B.
- [ ] `StepTracker` affiche l'étape `sent` « Envoyée » et n'affiche jamais « Fait » sur un écran d'attente.
- [ ] Les illustrations `Objectifs/sante-coeur.svg`, `Objectifs/imprevus.svg` et `Objectifs/objectif-atteint.svg` sont utilisées ; aucun asset du groupe `Archives` n'est embarqué.
- [ ] Une fonction unique calcule %, barre, reste et « atteint » selon F03 ; une fonction unique calcule l'aide « par semaine » ; les deux sont testées unitairement avec les exemples du handoff.

### B01 — Mes épargnes

- [ ] B01 est une racine avec la barre basse, onglet Épargnes actif.
- [ ] Les épargnes actives s'affichent en « X F sur Y F » sans pourcentage ; une épargne atteinte affiche « Objectif atteint » sans coche ; une fermée est dans « Fermées », sans barre ni montant.
- [ ] Le compteur « n sur 3 épargnes actives » est affiché ; les fermées ne comptent pas.
- [ ] À 3 actives : aucun bouton « Créer une épargne », le message de limite s'affiche, et aucun bouton ne ferme ni ne vide une épargne.
- [ ] Vide : « Pas encore d'épargne. » et « Crée ta première épargne » ; aucune relance.
- [ ] L'œil masque tous les montants de B01 et utilise le même réglage que H01.
- [ ] Hors ligne : derniers montants + « Mis à jour à HH:MM · hors connexion ». Au chargement, jamais « 0 F ».
- [ ] Chargement : squelette annoncé « Chargement de tes épargnes », sans montant, compteur, bouton Créer, état vide ni section Fermées.
- [ ] Plus de 5 épargnes fermées : seules les 5 plus récentes s'affichent, suivies de « Voir les {n} épargnes fermées › », qui affiche toute la liste.

### B02 à B06 — Créer une épargne

- [ ] L'en-tête affiche « Étape 1 sur 5 » à « Étape 5 sur 5 » de B02 à B06.
- [ ] B02 propose les 9 types dans l'ordre du handoff ; toucher un type ouvre B03 sans bouton.
- [ ] Santé s'affiche avec le libellé « Santé » seul et le cœur ; aucun texte de la création n'évoque une assurance.
- [ ] B03 : « Continuer » désactivé tant que le montant est vide ou à 0, avec la raison ; montant valide → « C'est ton objectif. Aucun argent ne bouge. ».
- [ ] B04 : la question est toujours posée ; « Continuer » désactivé tant qu'aucune date valide n'est choisie, avec « Choisis une durée, ou continue sans date. » ; « Pas de date pour l'instant » mène à B05 ; une date passée ou du jour est refusée avec « Choisis une date à venir. ».
- [ ] B04 affiche « Pour le … » et « Ça fait environ X F par semaine. » selon la formule du handoff.
- [ ] B05 préremplit le nom avec le libellé du type (« Mon projet » pour Autre projet) ; un nom effacé donne le nom par défaut ; « Continuer » est toujours actif.
- [ ] B06 affiche l'aperçu : nom, objectif, « 0 F pour l'instant », date + « ≈ X F / semaine » ou « Pas de date · Ajouter », puis « Aucun argent ne bouge. » et les détails (Projet ; Note seulement si remplie).
- [ ] Chaque « Modifier » de B06 ouvre l'étape concernée, qui ramène à B06.
- [ ] Pendant la création et en résultat inconnu, aucun « Modifier » n'est actif ; « Vérifier à nouveau » ne crée jamais une seconde épargne.
- [ ] Échec connu → « Échoué : ton épargne n'est pas créée. » ; même nom qu'une active → message d'information, sans blocage ; refus pour limite → B15.
- [ ] Aucune étape ne demande de PIN ni ne déplace d'argent.

### B17 — Ton épargne est créée — critères

- [ ] B17 n'apparaît qu'après confirmation serveur, avec « Dedans : 0 F » plus visible que l'objectif, et « Aucun argent n'a bougé. ».
- [ ] « Voir mon épargne » et le retour Android ouvrent B07 ; jamais B06.

### B07 — Détail d'une épargne — critères

- [ ] Montant épargné en 34, « sur {cible} », barre, « n % » (entier inférieur), « Encore X F pour ton objectif. ».
- [ ] Cible atteinte : barre pleine, montant réel, aucun % > 100, drapeau + « Objectif atteint » sans coche ; mêmes boutons dans le même ordre ; l'épargne reste ouverte.
- [ ] À zéro : « Remettre sur mon solde » désactivé avec « Rien à remettre pour l'instant. ».
- [ ] Retour en attente : « Remettre » et « Fermer » désactivés avec une seule phrase, reliée aux deux boutons ; montant et barre inchangés.
- [ ] Alimentation en attente : seul « Fermer » est désactivé, avec sa phrase.
- [ ] « Fermer cette épargne » est un bouton texte non rouge, en bas.
- [ ] Masqué : aucun montant, %, reste ni phrase de zéro visible ; barre visible et non annoncée.
- [ ] Fermée : bandeau « Fermée le … », pas de barre, pas de bouton, pas de « Modifier », mouvements consultables.
- [ ] Date : « Pour le … · encore n semaines » ou « · moins d'une semaine ».
- [ ] Chargement : squelette annoncé « Chargement de ton épargne », sans montant ni « 0 », sans lien « Modifier ».
- [ ] Échec de fermeture : « Échoué : {nom} n'est pas fermée. » et « Ton argent et tes mouvements n'ont pas changé. Réessaie. » ; l'épargne reste active.

### B08 et B16 — Modifier

- [ ] Le type est affiché « — ne change pas » et ne peut pas être modifié.
- [ ] « Enregistrer » reste désactivé tant que rien n'a changé ou que la cible est vide ou à 0.
- [ ] Une cible ≤ montant épargné affiche « Ton objectif sera atteint avec ce montant. » avant l'enregistrement.
- [ ] Après enregistrement, B07 affiche « Modifications enregistrées. » et des valeurs cohérentes (%, barre, reste) ; aucun argent n'a bougé.
- [ ] ← avec des changements ouvre B16 ; « Quitter » garde les anciennes valeurs ; ← sans changement revient à B07 sans dialogue.
- [ ] Échec d'enregistrement : « Échoué : rien n'a changé. » + « Tes saisies sont gardées. Réessaie. » ; les champs gardent la saisie.
- [ ] Épargne fermée entre-temps : « Cette épargne est fermée. » + « Elle a été fermée entre-temps. Tes changements ne sont pas enregistrés. » ; « Voir mon épargne » remplace « Enregistrer » et rien n'est enregistré.

### B09 à B12 — Remettre sur mon solde

- [ ] B09, B10, B11 affichent « Étape 1 sur 3 » à « Étape 3 sur 3 » ; le nom de l'épargne et « Vers : Solde disponible » / « Mon solde » sont visibles de B09 à B12.
- [ ] B09 : « Continuer » désactivé si vide, 0 ou supérieur au disponible, avec la raison ; « Tout remettre » remplit le disponible.
- [ ] B10 ne contient **aucune ligne de frais** ; « Ton solde après » = solde disponible + montant ; « Il restera » = disponible − montant.
- [ ] Retour total : B10 affiche « {épargne} sera à 0 F. Elle reste ouverte. ».
- [ ] Le retour n'est envoyé qu'après le PIN ; PIN faux → « PIN incorrect. Réessaie. », rien n'est envoyé.
- [ ] B12 « Fait » n'apparaît qu'après confirmation ; « En attente » et l'incertain n'affichent jamais « Fait » ni de vert de succès ; l'incertain n'a pas de « Réessayer ».
- [ ] Échoué : « Ton argent n'a pas bougé. Il est dans {épargne}. » et « Réessayer » ramène à B10 relu avec un nouveau PIN.
- [ ] PIN bloqué : titre « Ton PIN est bloqué », « Trop d'essais. », aucun pavé ni case, « Voir mon épargne » et « PIN oublié ? » ; aucun nombre d'essais ni durée affiché tant que G02 n'est pas tranché ; rien n'est envoyé.
- [ ] Refus par une règle : affiché sur B10, avant le PIN, avec la raison, « Ton argent n'a pas bougé. » et « Contacter l'aide » ; « Continuer » désactivé ; aucune limite chiffrée ; aucun PIN demandé.
- [ ] Un échec technique au moment du mouvement s'affiche sur B12 « Échoué » après le PIN, jamais sur B10 ; l'argent n'a pas bougé.
- [ ] Après un retour, l'épargne reste ouverte, même à 0 ; « Fermer cette épargne ? » n'apparaît que si le retour est fait, total, et sans alimentation en attente.
- [ ] Le retour Android sur B12 ouvre B07, jamais B10 ni B11.
- [ ] Après un retour fait, le solde de H01 augmente du montant exact ; en attente, il ne change pas ; la ligne « Dernier dépôt » ne montre jamais un retour.
- [ ] Aucun retrait externe n'est enchaîné.

### B13 et B14 — Fermer

- [ ] « Fermer cette épargne » avec des fonds ouvre B13 (montant visible même masqué) ; « Remettre sur mon solde » ouvre B09 avec Tout remettre sélectionné.
- [ ] À 0 et sans mouvement en attente, B14 demande une confirmation ; « Garder » ne ferme rien.
- [ ] Fermeture faite → B01 avec « {épargne} est fermée. » ; l'épargne est dans « Fermées » et ne compte plus dans la limite.
- [ ] De l'argent arrivé entre-temps → refus, B07 « De l'argent est arrivé. {épargne} reste ouverte. ».
- [ ] Aucune épargne n'est jamais fermée sans confirmation explicite.

### B15 — Limite

- [ ] Toute entrée « Créer » avec 3 actives ouvre B15, dont le seul bouton est « Voir mes épargnes ».

### Backend Savings

- [ ] Une 4e épargne active est refusée, y compris en cas de créations simultanées ; les fermées ne comptent pas.
- [ ] Créer, modifier et fermer ne créent aucune écriture ledger.
- [ ] Un retour au solde crée des écritures équilibrées du montant exact, sans frais, et n'est accepté que si le PIN est valide, le montant > 0 et ≤ épargné confirmé, et aucun retour n'est en attente sur cette épargne.
- [ ] Création et retour sont idempotents : la même clé ne produit jamais deux effets.
- [ ] La fermeture est refusée si l'épargne n'est pas à 0 ou a un mouvement en attente ; une épargne fermée ne reçoit plus aucun mouvement ni modification.
- [ ] Aucun traitement ne ferme, ne vide, ne bloque ni ne transfère automatiquement une épargne (cible atteinte, date dépassée, solde à 0).
