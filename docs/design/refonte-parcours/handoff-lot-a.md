# Handoff — Refonte des parcours, lot A : accès et accueil (React Native / Expo + backend Spring Boot)

Date : 19 octobre 2026. Statut : lot A validé par le PO le 19 octobre 2026 (test des 10 parcours par la conjointe du PO, case ① « Design validé » cochée pour P1 à P10).

- Maquettes et prototype : [screens.md](screens.md) · [prototype cliquable lot A](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF) (fait foi pour la composition et les textes).
- Design system : [DESIGN.md](../../../DESIGN.md) (racine) · [KOTIZ Design System v9](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) (composants `Kotiz.*`, version `1792410187-4206`).
- Parcours, écrans, états : [ux-spec-lot-a.md](ux-spec-lot-a.md) (fait foi pour le comportement). Arbitrages finaux : [screens.md § Validation](screens.md#validation). Corrections : [critique.md](critique.md).
- Scénarios d'acceptation : [gherkin-lot-a.md](gherkin-lot-a.md) (IDs `A-Pn-Sm`). Rattachement aux issues : [issues-lot-a.md](issues-lot-a.md).
- Cible : app mobile React Native + Expo SDK 54, **variant `client`** (écrans E01 à Q01) et **variant `agent`** (A02 à A04), deux binaires distincts (ADR-009, ADR-010, ADR-019). Backend Java 21 / Spring Boot 3, hexagonal (ADR-011), contextes IAM, Agents, Notifications.

Conventions de ce document :
- **« à confirmer (Gxx) »** : paramètre non tranché. Il est lu dans une configuration, jamais écrit en dur, et l'interface ne l'annonce pas tant qu'il n'est pas tranché. G01 = partenaire et juridique, G02 = sécurité et SMS, G03 = assistance.
- **Valeurs de démonstration du prototype, qui ne sont pas des règles** : décompte « dans 15 s » avant Renvoyer, code SMS accepté dès 4 chiffres (0000 = faux, 9999 = expiré), PIN 2468, numéro 07 08 12 34 56, montants et noms de l'accueil, QR de démonstration. Aucune ne doit être reprise dans le code, les tests ou les textes.

## Points ouverts

**Critique** : aucune correction **Bloquant** ouverte. La seule bloquante (#1, prénom codé en dur) est corrigée ; les 14 autres sont corrigées ou closes (#9 close par le PO après test).

**Avant de coder**
1. **Tokens du code non alignés** : `packages/design-tokens` expose encore la « palette v2 » (navy `#0A2540`, teal `#007A6E`, or). DESIGN.md (Direction 04, vert `#00564D`) fait foi. Le réalignement est un chantier code séparé (décision PO du 19 octobre 2026), suivi par [#96](https://github.com/kotiz-ci/platform/issues/96) D23 : il précède tout écran du lot A (voir [issues-lot-a.md](issues-lot-a.md)).
2. **Asset à livrer : illustration Direction 04 de E01** (hero de Bienvenue). En attendant, E01 affiche l'illustration du DS dans une `IconPastille` 80 (vert doux), comme le prototype. Ne bloque pas le développement.
3. **Assets provisoires** (ne bloquent pas) : pictogrammes Épargnes et Opérations de la barre basse (tracés provisoires dans `BottomNav`), cadenas des écrans à secret (non utilisé : la mention de secret est un `Message` information), illustration « bienvenue » de E08 (badge coche en attendant).
4. **Contrat d'API à écrire** : aucun champ d'API n'existe encore pour le lot A. Les données ci-dessous sont nommées par leur sens métier et le terme du glossaire DDD (`User`, `Credential`, `Session`, `Consent`, `CustomerEnrollment`) ; les noms de champs sont à fixer dans la spec d'implémentation.

**Questions encore ouvertes sur le comportement** (aucune ne change la composition validée)
- Retour `←` depuis E04 : le prototype revient à E03 alors que le code est déjà validé (screens.md Q8). À trancher par le PO : E03 ou E02.
- Format masqué des épargnes : le prototype et DESIGN.md affichent « ••• F sur ••• F » (`GoalRow`), la spec écrit « ••• ••• FCFA » (screens.md Q3). Ce handoff suit le prototype validé.
- Ligne « Dernier dépôt » de la carte solde et marge du QR sur la carte (critique, signalements sans arbitrage) : gardées telles que le DS v9 ; marge à 4 modules = proposition non validée.
- Poids de Déposer sur l'accueil (Q5) : inchangé, à observer au lot C.
- Place de la cloche (lot F), notifications de statut (Q11, lot F).

## Tokens

Source : DESIGN.md (YAML) = `tokens.json` du DS v9. **Le nom « Code » est le nom cible proposé** pour `@kotiz/design-tokens` après réalignement : objet `palette` en camelCase comme l'existant (`palette.textPrimary`), classes NativeWind en kebab-case (`bg-action-primary`). Les clés actuelles (`primary`, `secondary`, `accent`, `bg`, `navy`…) sont à retirer au réalignement.

### Couleurs

| DESIGN.md | Code (cible) | Valeur | Usage |
|---|---|---|---|
| `colors.action-primary` | `palette.actionPrimary` · `bg-action-primary` | `#00564D` | Bouton principal (un seul par écran) |
| `colors.action-pressed` | `palette.actionPressed` | `#00423B` | Bouton principal appuyé |
| `colors.surface` | `palette.surface` | `#FFFFFF` | Champs, cartes, barre basse, sheet |
| `colors.surface-canvas` | `palette.surfaceCanvas` | `#F3F4F6` | Fond d'écran, bouton désactivé, bloc épargnes, touches du PinPad |
| `colors.surface-brand` | `palette.surfaceBrand` | `#00564D` | Arc de la carte solde |
| `colors.surface-brand-deep` | `palette.surfaceBrandDeep` | `#00423B` | Fond de la carte solde ; hero de E01 (exception PO) |
| `colors.surface-brand-subtle` | `palette.surfaceBrandSubtle` | `#E2F3ED` | Succès, bouton secondaire, onglet actif, case cochée |
| `colors.surface-information` | `palette.surfaceInformation` | `#E9F2FB` | Message information, raccourci Retirer |
| `colors.surface-error` | `palette.surfaceError` | `#FBECEA` | Erreur et échec **uniquement** |
| `colors.surface-pending` | `palette.surfacePending` | `#FDF1DC` | Statut « En attente » **uniquement** |
| `colors.surface-purple` | `palette.surfacePurple` | `#EEE9FB` | Pastille du raccourci Épargnes |
| `colors.surface-scrim` | `palette.surfaceScrim` | `#2532387A` | Voile derrière la bottom sheet |
| `colors.text-primary` | `palette.textPrimary` | `#253238` | Texte essentiel |
| `colors.text-secondary` | `palette.textSecondary` | `#626E76` | Texte secondaire, dates (limite 4,76:1 sur canvas) |
| `colors.text-brand` | `palette.textBrand` | `#00564D` | Liens, boutons texte, statut Fait |
| `colors.text-inverse` | `palette.textInverse` | `#FFFFFF` | Texte sur vert plein |
| `colors.text-danger` | `palette.textDanger` | `#B83B35` | Erreur, Échoué |
| `colors.text-pending` | `palette.textPending` | `#8A5300` | En attente |
| `colors.text-purple` | `palette.textPurple` | `#6B50AF` | Texte violet ponctuel, jamais un statut |
| `colors.border-default` | `palette.borderDefault` | `#E4E7EB` | Bordure décorative (1,24:1, jamais seule pour un état) |
| `colors.border-focus` | `palette.borderFocus` | `#00564D` | Champ actif, case PIN suivante (2 px) |
| `colors.border-danger` | `palette.borderDanger` | `#B83B35` | Champ et cases PIN en erreur (2 px) |
| `colors.border-inverse-subtle` | `palette.borderInverseSubtle` | `#FFFFFF29` | Filet de la ligne « Dernier dépôt » |
| `colors.accent-blue` / `accent-coral` / `accent-purple` / `accent-silver` | `palette.accentBlue` … | `#69ADE8` / `#D96860` / `#8870CD` / `#CAD3DC` | Illustrations seulement ; jamais de texte ni de statut |

### Typographie (Inter, via `@expo-google-fonts/inter`, déjà en dépendance)

| DESIGN.md | Code (cible) | Taille / interligne / graisse | Usage lot A |
|---|---|---|---|
| `typography.amount` | `typography.amount` | 34 / 42 / 700, chiffres tabulaires (`fontVariant: ['tabular-nums']`) | Solde de la carte |
| `typography.title` | `typography.title` | 24 / 32 / 700 | Titres d'écran, touches du PinPad, `NumberChip` |
| `typography.section` | `typography.section` | 16 / 23 / 600 | Salutation, titres de section, titre de `PageHeader` |
| `typography.label` | `typography.label` | 14 / 21 / 600 | Boutons, libellés de champ, statuts, montants de ligne |
| `typography.body` | `typography.body` | 14 / 21 / 400 | Texte courant, aides, messages |
| `typography.caption` | `typography.caption` | 12 / 18 / 400 | **Uniquement** libellés de la barre basse et dates |
| `typography.note` | `typography.note` | 11 / 16 / 500 | Mention non essentielle (aucune dans l'app livrée ; « QR de démonstration » est propre au prototype) |

Pas de `allowFontScaling={false}` : le texte système agrandi doit passer (retour à la ligne, aucune hauteur fixe sur un paragraphe).

### Espacements, rayons, tailles, ombre, mouvement

| DESIGN.md | Code (cible) | Valeur |
|---|---|---|
| `spacing.xxs` … `spacing.xl` | `space.xxs` … `space.xl` | 4 · 8 · 12 · 16 · 20 · 24 · 32 |
| `rounded.xs` / `sm` / `md` / `lg` / `xl` / `xxl` / `full` | `radii.xs` … `radii.full` | 6 · 12 · 16 · 20 · 24 · 32 · 999 |
| `size-touch-min` (DS) / `touch-target` | `size.touchMin` | 48 |
| `size-control` | `size.control` | 52 (boutons, touches PinPad) |
| `size-field` | `size.field` | 56 (zone de saisie) |
| `size-pin-slot` | `size.pinSlot` | 56 (rétrécit jusqu'à 40 seulement si la place manque) |
| `size-pastille` / `size-pastille-lg` | `size.pastille` / `size.pastilleLg` | 64 / 80 |
| `size-step-dot` | `size.stepDot` | 32 |
| `size-icon` / `size-icon-small` | `size.icon` / `size.iconSmall` | 24 / 20 |
| `shadow-overlay` | `shadows.overlay` | y 8, flou 24, `#253238` à 12 % (bottom sheet seulement) |
| Mouvement (DESIGN.md § Elevation) | `motion.feedback` / `motion.standard` / `motion.enter` | 160 / 240 / 320 ms, `cubic-bezier(0.2, 0, 0, 1)`, 0 ms si « réduire les animations » |

Marges d'écran : 20. Écart entre groupes : 16.

**Valeurs en dur relevées dans le prototype** (à ne pas reproduire) : hauteur du hero E01 (≈ deux tiers de l'écran, mise en page `lot-a.css`) et son arc ; taille du QR de Q01 et son cadre blanc de 16 ; placement de la bottom sheet S01 ; lignes du récap A03 et des statuts A04. Les faire porter par des tokens existants (`space.*`, `radii.*`) ; aucune couleur nouvelle.

## Composants

Aucun composant n'existe encore dans `apps/mobile/components/` (dossier vide). Les composants ci-dessous sont à créer dans le socle UI (#59) avec **les mêmes noms et propriétés** que le DS v9 (`components/index.d.ts` du DS), en React Native. Règle commune : chaque composant affiche des valeurs fournies par l'app ; aucun ne décide d'un statut ni ne calcule un montant.

Règles d'accessibilité communes : zone tactile ≥ 48 × 48 (`hitSlop` si le visuel est plus petit) ; `accessibilityRole` exact (`button`, `checkbox`, `header`, `alert`, `progressbar`, `tab`) ; statut annoncé en mots, jamais par la seule couleur ; focus visible 2 px `border-focus`.

### Button
- Rôle : action d'un écran. Un seul `primary` par écran.
- Propriétés : `hierarchy: 'primary' | 'secondary' | 'text'` (défaut `primary`), `state: 'default' | 'pressed' | 'loading' | 'disabled'` (défaut `default`), `onPress`, `children: string`.
- Variantes / états : primaire vert plein 52, rayon 16, largeur pleine ; secondaire vert doux ; texte vert sans fond, hauteur 52. `loading` : indicateur + libellé de traitement fourni par l'écran (« Vérification… », « Envoi du code… », « Création de la fiche… »), **double appui bloqué**. `disabled` : fond `surface-canvas`, texte `text-secondary`, toujours accompagné d'une raison visible ailleurs sur l'écran.
- Existant : aucun. Les champs `hierarchy` et `state` sont séparés (correction F05).

### PageHeader
- Rôle : en-tête des pages poussées (tous les écrans sauf H01, E01, C01 téléphone habituel, A04).
- Propriétés : `onBack?: () => void | null` (null = pas de retour, cas E08), `backLabel?: string` (nom accessible, défaut « Retour »), `title?: string`, `step?: string` (« Étape n sur 5 »), `link?: { label, onPress }` (sortie secondaire à droite).
- États : avec retour / sans retour ; titre ou étape ; lien à droite. Hauteur 48.

### TextField
- Rôle : saisie d'un texte ou d'un numéro.
- Propriétés : `label` (permanent, au-dessus), `value`, `onChangeText`, `placeholder`, `prefix?: string` (`+225`, séparé par un filet), `keyboardType`, `textContentType` / `autoComplete` (`tel`, `oneTimeCode` / `sms-otp`, `name`), `help?`, `error?`, `state: 'empty' | 'filled' | 'active' | 'error' | 'disabled'`.
- États : vide, rempli, actif (bordure 2 `border-focus`), erreur (bordure 2 `border-danger` + texte d'erreur 14 `text-danger` + pictogramme), désactivé (fond canvas). L'aide et l'erreur sont en 14 et liées au champ pour TalkBack (`accessibilityHint` ou description).

### Message
- Rôle : information, succès, erreur, chargement, attente, dans le flux de l'écran.
- Propriétés : `tone: 'info' | 'success' | 'error' | 'loading' | 'pending'` (défaut `info`), `title?`, `children`.
- Signatures : info = bleu + pictogramme i ; succès = vert doux + coche ; erreur = rose + croix, `text-danger` ; chargement = canvas + indicateur, texte toujours présent ; attente = ambre + horloge + « En attente ». Erreur annoncée comme `alert`.

### PinSlots + PinPad
- Rôle : saisie d'un PIN sans jamais l'afficher.
- `PinSlots` : `length: 4 | 5 | 6` (**valeur lue dans la configuration, à confirmer G02** ; 4 au prototype), `filled: number`, `error: boolean`, `label` (« Ton PIN »). Cases 56, rayon 16 ; case vide `surface-canvas` bordée `text-secondary` ; case suivante bordée `border-focus` ; erreur : bordures `border-danger`. Jamais de chiffre affiché, ni pendant ni après l'appui. Annonce TalkBack : « n chiffres sur N saisis ».
- `PinPad` : `onDigit(d)`, `onErase()`. Pavé 3 × 4, touches 52 en `title` sur `surface-canvas`, touche Effacer avec nom accessible « Effacer ». Pas de clavier système. Retour haptique léger possible (`expo-haptics`, 160 ms max), désactivé si l'utilisateur a réduit les animations.

### CheckOption
- Rôle : un accord à cocher (E05).
- Propriétés : `label`, `checked`, `onChange`, `readLabel` (« Lire »), `readAccessibilityLabel` (« Lire les conditions d'utilisation »), `onRead`, `disabled?`.
- États : non coché (blanc, bordure), coché (vert doux, bordure verte, case 24 rayon 6 pleine verte + coche blanche), désactivé. Hauteur 72 minimum, la phrase passe à la ligne. Rôle `checkbox` avec état annoncé ; le lien « Lire » est une cible séparée de 48.

### IconPastille
- Rôle : une illustration ronde par écran (E01, E05, E09, E10).
- Propriétés : `src`, `size: 64 | 80` (défaut 64), `tone: 'mint' | 'blue' | 'purple' | 'white'`. Décorative (`accessible={false}`).

### NumberChip
- Rôle : afficher le numéro à vérifier (E09, E10). `children: string`. Texte `title` sur `surface-canvas`, jamais coupé (retour à la ligne interdit à l'intérieur du numéro : espaces insécables entre groupes).

### StepTracker
- Rôle : suivi d'une attente (résultat inconnu de E07). Remplace toute illustration pendant une attente.
- Propriétés : `steps: { label, status: 'done' | 'pending' | 'todo', word? }[]`, `label` (nom accessible de la liste).
- États par étape : Fait (pastille 32 vert doux + coche), En attente (ambre + horloge), Pas encore (pastille vide). Chaque étape est lue avec son mot.

### StatusPill
- Rôle : statut en mot + pictogramme. `status: 'done' | 'pending' | 'failed' | 'neutral'`, `children?` (mot ; défauts « Fait », « En attente », « Échoué »). Texte 14 `label`.

### HomeHeader
- Rôle : en-tête de l'accueil. `greeting` (« Akwaba, {prénom} »), `logoSrc`, `onNotifications` (cloche, bouton 48 fond canvas ; place à confirmer lot F).

### BalanceCard
- Rôle : solde disponible + QR sur l'accueil.
- Propriétés : `amount` (entier FCFA fourni par l'API), `masked: boolean`, `lastDeposit?: { amount, status: 'done' | 'pending' | 'failed', label }`, `onToggleMask`, `onOpenQr`, `onOpenLast`, `qrSrc` ou données du QR.
- Composition : fond `surface-brand-deep`, rayon 24, arc `surface-brand` ton sur ton ; à gauche « Solde disponible » + œil (bouton 48), montant `amount` + « FCFA » ; à droite le QR sur fond blanc (rayon 12, logo K au centre ≤ 20 %, correction d'erreur H), « Mon QR » ; sous un filet `border-inverse-subtle`, la ligne « Dernier dépôt » (zone 48) avec son `StatusPill`.
- États : visible ; masqué (montant `••• •••`, dernier dépôt `••• F`, **œil barré**, nom accessible de l'œil « Afficher le solde » / « Masquer le solde », chaque montant masqué annoncé « Montant masqué ») ; sans dernier dépôt (ligne absente) ; carte étroite (QR 112 → 92 → 64, le montant garde ses 34).

### Shortcuts
- Rôle : trois actions illustrées de l'accueil.
- Propriétés : `items: { id: 'deposit' | 'withdraw' | 'savings', label, illustrationSrc, disabled? }[]`, `hint?` (raison d'une action désactivée), `onSelect(id)`.
- Teintes : Déposer `surface-brand-subtle`, Retirer `surface-information`, Épargnes `surface-purple` ; **jamais `surface-error`**. Désactivé : pastille canvas, illustration à 40 %, libellé `text-secondary`, `accessibilityState.disabled`, et la phrase `hint` affichée (« Rien à retirer pour l'instant. »). Cible 96 × 93.

### InfoLine
- Rôle : ligne discrète d'identité sur l'accueil, entre deux filets. `children` (phrase), `onPress?`, `chevronIcon?`. Sans suite (statut « en vérification ») : ni chevron, ni rôle bouton.

### GoalRow (dans un bloc `goal-list`)
- Rôle : une épargne en ligne compacte sur l'accueil (3 au maximum).
- Propriétés : `name`, `saved`, `target`, `illustrationSrc`, `masked`, `onPress`.
- Affiche : illustration 32, nom (une ligne, troncature « … »), « 45 000 F sur 100 000 F », barre 5 px (largeur = `min(⌊saved / target × 100⌋, 100) %`, calculée par l'app), chevron. Pas de pourcentage sur l'accueil. Masqué : « ••• F sur ••• F », barre visible sans `accessibilityValue`.

### TransactionRow
- Rôle : une opération dans « Dernières opérations ».
- Propriétés : `title`, `date`, `amount`, `direction: 'in' | 'out'`, `status: 'done' | 'pending' | 'failed' | 'not-debited'`, `iconSrc`, `masked`.
- Affiche : pastille 40 (vert doux pour un apport, `surface-canvas` pour une sortie, `surface-error` seulement pour un échec), titre `label`, date `caption`, montant signé `+` / `−` en `label`, statut en mot 14 + pictogramme (« Fait », « En attente », « Échoué », « Non débité »). Ligne entière cliquable (zone ≥ 48).

### BottomNav
- Rôle : barre des quatre racines, **uniquement sur H01** dans le lot A.
- Propriétés : `items` (Accueil, Épargnes, Opérations, Profil, dans cet ordre), `active`, `onSelect`. Destinations en largeur égale, chacune ≥ 48 × 48 ; actif = pastille vert doux 44 × 40 + libellé `text-brand` + `accessibilityState.selected`. Safe area basse lue du système (`react-native-safe-area-context`).

### BottomSheet
- Rôle : S01 « Pas de SMS ? ». Réutiliser `@gorhom/bottom-sheet` (déjà en dépendance).
- Propriétés : `title`, `children`, bouton Fermer (✕, 48, nom accessible « Fermer »). Fond `surface`, coins hauts 24, `shadows.overlay`, voile `surface-scrim`. Fermeture : ✕, appui sur le voile, retour Android. Focus TalkBack placé sur le titre à l'ouverture, rendu au lien « Je n'ai pas reçu le code » à la fermeture.

### Composants non utilisés dans le lot A
`AmountInput`, `GoalCard`, `OperationStatus`, `IllustratedResult` (lots B à F). Le hero de E01 n'est pas un composant DS (exception PO, mise en page propre à l'écran).

## Écrans

Plateforme : Android d'abord ; largeurs 320 à 430 (contrôle à 320, 360, 390, 430) ; portrait seul. Toutes les pages sauf H01 sont **sans barre basse**. Safe areas lues du système. Clavier ouvert : le champ actif et le bouton principal restent visibles (`KeyboardAvoidingView` ou équivalent ; bouton collé au-dessus du clavier).

Règles communes aux écrans d'accès E02 à E07 et C01 (spec § Règles communes) :
- **Étape** : P1/P2 « Étape n sur 5 » (1 Numéro, 2 Code, 3 Nom, 4 Accords, 5 PIN) ; P4 même total, E05′ = « Étape 4 sur 5 » ; P6 (connexion) : aucun indicateur. L'app ne sait qu'il s'agit d'une activation qu'après le code SMS.
- **Attente réseau** au-delà d'1 s : le bouton passe en `loading` avec son libellé de traitement, les champs sont figés, aucun écran suivant n'apparaît avant la réponse.
- **Hors ligne** : `Message` info « Pas de connexion. » + « Ta saisie est gardée. », bouton principal « Réessayer ». Jamais de succès supposé.
- **Secrets** (code SMS, PIN) : jamais conservés après la sortie de l'écran, jamais journalisés, jamais remplis depuis le presse-papiers pour le PIN ; à la reprise après interruption, l'étape PIN recommence (H5).

### E01 — Bienvenue (client)
- Structure : haut d'écran en hero vert profond (`surface-brand-deep`, arc ton sur ton, environ deux tiers de l'écran) avec logo KOTIZ + mot « KOTIZ », une seule illustration (asset Direction 04 à livrer ; en attendant `IconPastille` 80 vert doux), promesse en `title` blanc : « Ton argent, mis de côté, toujours à toi. » ; bas blanc fixe : `Button` primaire « Créer mon compte », `Button` texte « Me connecter ». Rien ne défile à 360 × 800 ; en grand texte, le hero se réduit et les deux boutons restent visibles sans défilement.
- Données : aucune.
- Interactions : Créer mon compte → E02 en mode inscription (étapes affichées) ; Me connecter → E02 en mode connexion (sans étape) ; retour Android → quitte l'app.
- États : nominal ; hors ligne (boutons actifs, l'erreur apparaît à E02).
- Animations : aucune.

### E02 — Ton numéro (client)
- Structure : `PageHeader` (retour → E01, étape « Étape 1 sur 5 » en inscription) ; titre « Ton numéro » ; `TextField` « Numéro de téléphone », préfixe `+225`, clavier numérique, chiffres groupés par 2 (« 07 08 12 34 56 »), aide « On t'envoie un code par SMS. » ; en bas `Button` « Recevoir le code » puis bouton texte « Besoin d'aide ? ».
- Données : numéro saisi (10 chiffres nationaux) ; envoi d'OTP (IAM / Notifications).
- Interactions : saisie → formatage par paires ; collage de « +225 07… » ou avec espaces → normalisé en 10 chiffres ; Recevoir le code → envoi, bouton « Envoi du code… », puis E03 ; Besoin d'aide ? → aide (lot F, contact à confirmer G03) ; retour → E01.
- États : vide (bouton désactivé) ; incomplet (bouton désactivé + aide « Il faut 10 chiffres. ») ; saisi ; envoi en cours ; échec d'envoi (« Le SMS n'est pas parti. Réessaie. ») ; hors ligne ; limite d'envois atteinte (message et suite **à confirmer G02**, écran non dessiné).
- Validation : 10 chiffres. Liste des préfixes ivoiriens acceptés **à confirmer G02** (le prototype ne contrôle que le nombre de chiffres).

### E03 — Ton code SMS (client)
- Structure : `PageHeader` (retour → E02, « Étape 2 sur 5 » en inscription) ; titre « Ton code SMS » ; « Envoyé au » + numéro en entier + bouton texte « Modifier » ; `Message` succès « Nouveau code envoyé. » / « Utilise le dernier code reçu. » après un renvoi ; `TextField` « Code reçu par SMS » (clavier numérique, `oneTimeCode`), placeholder « Écris le code » ; `Message` info « Ne le montre à personne, même à une agente. » ; « Renvoyer le code dans {décompte} » (texte) ou bouton texte « Renvoyer le code » ; bouton texte « Je n'ai pas reçu le code » ; en bas `Button` « Valider ». **Pas de lien « Besoin d'aide ? »** sur E03 (l'aide passe par S01).
- Données : numéro, longueur attendue du code, délai avant renvoi et validité (**tous à confirmer G02**, lus en configuration ou renvoyés par l'API d'envoi).
- Interactions : Valider → vérification (« Vérification… ») puis routage selon le numéro (voir Règles transverses § Routage après le code) ; Modifier → E02 (numéro gardé, le code envoyé ne vaut plus) ; Renvoyer le code → nouveau code, décompte relancé ; Je n'ai pas reçu le code → S01 ; retour → E02.
- États : attente du SMS (décompte) ; saisi ; vérification ; code incorrect (« Ce code ne marche pas. Vérifie le SMS. ») ; code expiré (« Ce code n'est plus valable. Demande un nouveau code. ») ; renvoi disponible ; nouveau code envoyé ; hors ligne ; trop d'essais (**à confirmer G02**, écran non dessiné, reporté).
- Règle : bouton Valider désactivé tant que le code n'a pas la longueur configurée (**longueur à confirmer G02** ; le « ≥ 4 chiffres » du prototype n'est pas une règle). Pas de validation automatique au dernier chiffre. Décompte écrit « dans N s » (jamais « 0:15 »), **durée à confirmer G02** (15 s = démo). Lecture automatique du SMS Android (SMS Retriever / User Consent) **à confirmer G02** : si retenue, le code se remplit et la cliente garde la main sur Valider.
- Aucun compte n'est créé à cette étape ; l'existence d'un compte n'est révélée qu'après un code valide (H2).

### S01 — Pas de SMS ? (bottom sheet sur E03)
- Structure : titre « Pas de SMS ? », bouton ✕ ; « Vérifie ton numéro : » + numéro + « Modifier » ; « Le SMS peut prendre un peu de temps. » ; « Vérifie que ton téléphone capte. » ; `Button` primaire « Renvoyer le code » (ou « Renvoyer le code dans N s », désactivé) ; `Button` texte « Contacter l'aide ».
- Interactions : Modifier → ferme et ouvre E02 ; Renvoyer → renvoi, ferme la sheet, E03 affiche « Nouveau code envoyé. » ; Contacter l'aide → lot F (**contact à confirmer G03**) ; ✕ / voile / retour Android → ferme.
- États : renvoi indisponible (décompte), disponible, en cours, renvoyé, échec.
- Animation : entrée 320 ms, sortie 240 ms, courbe standard ; 0 ms en mouvement réduit.

### E04 — Ton nom (client, inscription seulement)
- Structure : `PageHeader` (« Étape 3 sur 5 ») ; titre « Ton nom » ; `TextField` « Prénom et nom », placeholder « Par exemple : Fatou Koné », aide « Écris ton nom comme sur ta pièce d'identité. » (**consigne à confirmer G01**) ; `Button` « Continuer ».
- Données : nom complet saisi (un seul champ). Le prénom affiché ensuite (E08, H01, C01, Q01) = premier mot du nom saisi, sauf règle contraire de l'API.
- Interactions : Continuer → E05 ; retour → E03 dans le prototype (**à trancher : E03 ou E02**, screens.md Q8).
- États : vide (bouton désactivé) ; saisi ; invalide (vide ou caractères refusés : **règles de nom à confirmer G01**) ; hors ligne.
- Non affiché en activation (P4) : le nom vient de la fiche.

### E05 — Tes accords (client)
- Structure : `PageHeader` (« Étape 4 sur 5 ») ; en inscription : `IconPastille` 64 vert doux ; en activation (E05′) : `Message` info « Une agente a préparé ta fiche » + nom de la fiche, puis bouton texte « Ce n'est pas moi » ; titre « Tes accords » + « Lis-les, puis coche chaque case. » ; une `CheckOption` par accord ; « Coche chaque case pour continuer. » tant que tout n'est pas coché ; `Button` « J'accepte et je continue ».
- Données : **liste, nombre et textes des accords à confirmer G01** (juridique, ARPD, partenaire) ; les deux libellés du prototype (« J'accepte les conditions d'utilisation. », « J'accepte l'usage de mes données. ») sont des emplacements. Chaque accord est enregistré séparément (`Consent`, avec sa version de texte). Nom de la fiche en E05′ : affiché seulement après le code SMS valide, **affichage à confirmer G02**.
- Interactions : cocher / décocher ; Lire → page poussée du texte complet, retour sans perdre les cases ; Ce n'est pas moi → aide (lot F, **G03**) ; J'accepte et je continue → E06 ; retour → E04 (inscription) ou E03 (activation).
- États : aucune case, partiel (bouton désactivé + consigne), tout coché, envoi, hors ligne.
- Interdit : aucun accord de rattachement à une agente ici (accord distinct, lot E). Aucun message de succès vert en E05′.

### E06 — Crée ton PIN (client)
- Structure : `PageHeader` (« Étape 5 sur 5 ») ; titre « Crée ton PIN » ; « Ce code protège ton argent. Garde-le pour toi. » ; `Message` info « Ne le montre à personne, même à une agente. » ; `PinSlots` (longueur configurée) ; `PinPad` fixé en bas.
- Interactions : chaque chiffre remplit une case ; Effacer retire le dernier ; au dernier chiffre → E07 automatiquement (pas de bouton) ; retour → E05.
- États : vide, en cours, refusé par une règle (**PIN refusés, ex. suites, à confirmer G02**), revenu d'E07 après « codes pas pareils » (`Message` erreur « Les deux codes ne sont pas pareils. Recommence. » au-dessus de la mention de secret, qui reste visible).
- Hors ligne : n'empêche pas la saisie (l'envoi se fait en E07).
- Sécurité : capture d'écran bloquée (`FLAG_SECURE`) **à confirmer (technique)**.

### E07 — Écris-le encore une fois (client) et création du compte
- Structure : même composition qu'E06, titre « Écris-le encore une fois », texte « Le même code, pour vérifier. ».
- Interactions : au dernier chiffre → comparaison locale ; différent → E06 vidé avec le message d'erreur ; identique → création (inscription) ou activation (P4). Retour → E06, tout effacé.
- États de la création (plein écran, sans `PageHeader`, sans barre basse) :
  - **Création en cours** : indicateur neutre, titre « Création de ton compte… » (`role=status`), « Un instant… ». Aucune illustration, aucun vert de succès.
  - **Résultat inconnu** (délai dépassé ou réseau coupé pendant la création) : `StatusPill` « En attente », titre « On vérifie ton compte », « La réponse n'est pas encore arrivée. Ne crée pas un second compte. », `StepTracker` « Où en est ton compte » (Demande envoyée = Fait ; Vérification = En attente ; Compte confirmé = Pas encore), `Button` « Vérifier à nouveau » (interroge l'état, **ne recrée pas**), bouton texte « Besoin d'aide ? » (G03).
  - **Échec** : `StatusPill` « Échoué », titre « Ton compte n'est pas créé » (`role=alert`), « Rien n'a été créé. Tu peux réessayer maintenant. », `Button` « Réessayer », « Besoin d'aide ? ». Aucune illustration.
  - **Confirmé** → E08.
- Données : création de `User` + `Credential` (PIN) + `Consent` en une opération idempotente (clé d'idempotence générée côté app à l'entrée d'E07 et réutilisée par « Réessayer » et « Vérifier à nouveau »). Délai au-delà duquel le résultat devient « inconnu » : **à confirmer (technique)**. Conservation de la saisie côté serveur après échec : **à confirmer**.

### E08 — Compte créé / Ton accès est activé (client)
- Structure : `PageHeader` sans retour, lien « Plus tard » à droite ; badge coche (illustration « bienvenue » à fournir plus tard) ; titre « C'est fait, {prénom} ! » (`role=status`) ; « Ton compte est créé. » ou, en activation, « Ton accès est activé. » ; « Tu peux déposer ou créer une épargne quand tu veux. » ; `Button` primaire « Créer mon épargne » ; `Button` texte « Faire mon premier dépôt ». Pas de pile de trois boutons.
- Affiché **seulement** quand la création ou l'activation est confirmée par le serveur.
- Interactions : Créer mon épargne → lot B ; Faire mon premier dépôt → lot C ; Plus tard → H01 vide ; **retour Android = Plus tard** (jamais retour vers le PIN). Tant que les lots B et C ne sont pas livrés, ces deux sorties mènent à H01 ou sont masquées selon le flag de livraison (à décider à l'implémentation, jamais un écran mort).
- Animation : apparition du contenu en fondu 240 ms ; aucune célébration animée ; 0 ms en mouvement réduit.
- Le niveau d'accès limité (KYC) n'est pas annoncé ici.

### E09 — Ce numéro a déjà un compte (client)
- Structure : `PageHeader` (retour → E02, lien « Utiliser un autre numéro » à droite) ; `IconPastille` 80 (logo) ; titre « Ce numéro a déjà un compte » ; `NumberChip` du numéro ; « Connecte-toi avec ton PIN. » ; `Button` « Me connecter » ; `Button` texte « Récupérer mon accès ».
- Données : le numéro seulement. **Aucun nom, solde, statut d'identité ni autre donnée du compte.**
- Interactions : Me connecter → C01 (nouveau téléphone) ; Récupérer mon accès → lot F ; Utiliser un autre numéro → E02.
- Cas : compte fermé ou suspendu sur ce numéro **à confirmer G01/G02**.

### E10 — Aucun compte avec ce numéro (client, connexion)
- Structure : `PageHeader` (retour → E02) ; `IconPastille` 80 bleu ; titre « Aucun compte avec ce numéro » ; `NumberChip` ; « C'est bien ton numéro ? » ; bouton texte « J'ai changé de numéro › » ; `Button` « Créer mon compte » ; `Button` texte « Utiliser un autre numéro ».
- Interactions : Créer mon compte → E04 sans renvoyer de code (**à confirmer G02** : validité de la preuve de possession) ; Utiliser un autre numéro → E02 ; J'ai changé de numéro → lot F.

### C01 — Entrer mon PIN (client)
- Structure : téléphone habituel : pas de `PageHeader`, titre « Akwaba, {prénom} » ; nouveau téléphone : `PageHeader` (retour → E02), titre « Ton PIN ». Puis numéro masqué « 07 •• •• •• 56 » (2 premiers et 2 derniers chiffres visibles), « Entre ton PIN », `PinSlots`, liens « PIN oublié ? » et « Besoin d'aide ? », `PinPad` ; en bas, seulement sur téléphone habituel, bouton texte « Utiliser un autre numéro ».
- Interactions : au dernier chiffre → vérification (`Message` chargement « Vérification… ») → H01 ; PIN oublié ? → lot F ; Besoin d'aide ? → lot F (G03) ; Utiliser un autre numéro → E01.
- États : saisie ; vérification ; incorrect (`Message` erreur « PIN incorrect. Réessaie. », cases en erreur puis vidées ; **essais restants affichés seulement si la règle est confirmée G02**) ; bloqué (**à confirmer G02**, écran reporté) ; hors ligne (« Pas de connexion. Réessaie quand tu captes. »).
- Données : prénom affiché sur téléphone habituel (**à confirmer G02**) ; reconnaissance du téléphone habituel (H3) et délai de verrouillage après arrière-plan **à confirmer G02**.

### H01 — Accueil (client, racine)
- Structure (défile, sauf la barre basse fixe) : `HomeHeader` « Akwaba, {prénom} » + cloche ; si hors ligne, `Message` info « Mis à jour à {HH:MM} · hors connexion » ; `BalanceCard` ; `Shortcuts` (Déposer, Retirer, Épargnes) ; `InfoLine` d'identité ; section « Mes épargnes » (titre + « Tout voir › ») avec jusqu'à 3 `GoalRow` dans un bloc gris ; section « Dernières opérations » (titre + « Tout voir › ») avec 3 `TransactionRow` ; `BottomNav` (Accueil actif).
- Données (API à définir) : prénom ; solde disponible (entier FCFA, distinct des épargnes, jamais additionné) ; dernier dépôt (montant, statut, libellé) ; épargnes actives (nom, épargné, cible, illustration) ; 3 dernières opérations (titre, date, montant, sens, statut) ; statut KYC ; date de dernière mise à jour ; données du QR.
- Ligne d'identité selon le statut KYC :
  | Statut | Texte | Suite |
  |---|---|---|
  | Non commencé | « Vérifie ton identité pour aller plus loin. » + › | sous-lot A2 |
  | En vérification | « Ton identité est en vérification. » | aucune (ni chevron, ni bouton) |
  | Complément requis | « Il manque une information pour ton identité. » + › | sous-lot A2 |
  | Refusé | « Ta vérification n'a pas abouti. Voir pourquoi » + › | sous-lot A2 |
  | Validé | ligne absente | — |
  Aucun plafond, délai ni chiffre dans ces textes.
- Interactions : œil → bascule masqué / visible (persistant) ; carte QR / « Mon QR » → Q01 ; ligne « Dernier dépôt » → détail de l'opération (lot C) ; Déposer → lot C ; Retirer → lot D ; Épargnes → lot B ; une épargne → détail (lot B) ; Tout voir (épargnes) → lot B ; une opération / Tout voir → lot C ; cloche → lot F ; onglets → racines (Épargnes lot B, Opérations lot C, Profil lot F) ; retour Android → quitte l'app.
- États : **vide** (« 0 FCFA », pas de ligne Dernier dépôt, Retirer désactivé + « Rien à retirer pour l'instant. », « Pas encore d'épargne. » + « Créer une épargne › », « Tes opérations s'afficheront ici. ») ; **rempli** ; **masqué** (tous les montants de l'écran, voir Règles transverses § Masquage) ; **hors ligne** (derniers montants connus + message daté) ; **opération en attente** (ligne « En attente », jamais « Fait » ; **inclusion dans le solde à confirmer G01**) ; **chargement** (squelette sans montant à 0, reporté au design : structure grise, aucun « 0 FCFA » trompeur) ; 3 épargnes actives (pas de lien Créer).
- Responsive : à 320, la carte réduit le QR (64, sans logo) pour garder le montant en 34 ; `1 250 000 FCFA` tient sur une ligne en grand texte.

### Q01 — Mon QR (client)
- Structure : `PageHeader` (retour nommé « Retour à l'accueil », titre « Mon QR ») ; QR grand format sur fond blanc (cadre 16, logo K au centre) avec nom accessible « Ton QR KOTIZ » ; nom complet ; numéro masqué « 07 •• •• •• 56 » ; « L'agente scanne ce code pour te trouver. Il ne sert pas à payer. ». Aucun solde, aucun montant, aucun bouton principal.
- Interactions : ← ou retour Android → H01.
- Luminosité : maximale à l'ouverture, réglage de la cliente rétabli en quittant Q01 (y compris passage en arrière-plan) — décision PO, **faisabilité Expo à confirmer** (`expo-brightness`, à ajouter).
- États : nominal ; chargement, erreur (« Ton QR ne s'affiche pas. Réessaie. »), hors ligne (**QR disponible hors ligne à confirmer G02**) : non dessinés, reportés. Contenu du QR, QR fixe ou renouvelé, capture autorisée : **à confirmer G02**. Le masquage des montants est sans effet ici.

### A02 — Ajouter une cliente (agente)
- Structure : `PageHeader` (retour nommé « Retour à Mes clientes », titre « Ajouter une cliente ») ; `TextField` « Nom complet » (placeholder « Prénom et nom ») ; `TextField` « Téléphone » `+225` ; `TextField` « Activité (facultatif) » ; `TextField` « Localisation (facultatif) » (texte libre, **aucune géolocalisation**) ; `Message` info « Elle activera son accès sur son téléphone. » ; `Button` « Continuer ».
- Interactions : Continuer → vérification du numéro (« Vérification… ») → A03 ; retour → Mes clientes (hors lot A ; dialogue « Quitter sans créer la fiche ? » reporté).
- États : vide / incomplet (bouton désactivé ; « Il faut 10 chiffres. ») ; saisi ; **numéro déjà connu** : erreur sous le champ « Ce numéro a déjà un compte. Demande à la cliente ou contacte l'aide. » + bouton texte « Contacter l'aide » (G03) — **aucun accès à la fiche existante, aucune de ses données** ; hors ligne (saisie gardée).
- Interdit : aucun champ PIN, code SMS ou pièce d'identité.

### A03 — Vérifie la fiche (agente)
- Structure : `PageHeader` (retour → A02, titre « Vérifie la fiche ») ; bloc récapitulatif : nom, « +225 » + numéro, bouton texte « Modifier », puis Activité et Lieu **seulement si renseignés** ; section « Ce qui va se passer » : « La fiche est créée et elle reçoit un SMS d'invitation. » / « Elle active son accès elle-même, sur son téléphone. » / « Tu ne vois pas son argent. » ; `Button` « Créer la fiche ».
- Interactions : Modifier → A02 (saisie gardée) ; Créer la fiche → « Création de la fiche… » → A04.
- États : nominal ; création en cours ; erreur (`Message` erreur « La fiche n'est pas créée. » / « Réessaie. », bouton « Réessayer ») ; numéro devenu doublon entre A02 et A03 → retour A02 avec le message doublon ; résultat inconnu (« On vérifie… », reporté au design) — **le Réessayer ne crée jamais une seconde fiche** (clé d'idempotence).
- Données : `CustomerEnrollment` (nom, numéro, activité, localisation, agente auteure) ; déclenchement de l'invitation SMS (**déclencheur, contenu, lien, validité à confirmer G02**, H4).

### A04 — Fiche créée (agente)
- Structure : badge coche ; titre « Fiche créée » (`role=status`) + nom ; trois lignes de statut distinctes : « Fiche » `StatusPill` done « Créée » ; « Accès à l'app » `StatusPill` neutral « Pas encore activé » ; « Invitation SMS » `StatusPill` done « Envoyée » / failed « Pas partie » / pending « En attente » ; « Aide-la à ouvrir KOTIZ sur son téléphone. Elle saisit elle-même son code et son PIN. » ; si invitation pas partie : `Button` secondaire « Renvoyer l'invitation » ; `Button` primaire « Terminé ».
- Interactions : Terminé → Mes clientes ; Renvoyer l'invitation → renvoi (**règles de renvoi à confirmer G02**), statut repasse « En attente ».
- Interdit : aucun écran ne propose d'ouvrir la session de la cliente ni de voir son solde.

## Règles transverses

### Routage après un code SMS valide (H1, H2)
Le backend renvoie, **après** validation du code seulement, l'un des cas suivants ; l'app route sans demander quoi que ce soit à la cliente :

| Situation du numéro | Entrée « Créer mon compte » | Entrée « Me connecter » |
|---|---|---|
| Aucun compte | E04 (P1) | E10 (P6) |
| Fiche créée par une agente, accès non activé | E05′ (P4) | E05′ (P4) |
| Compte actif | E09 (P7) | C01 (P6) |
| Compte fermé ou suspendu | **à confirmer G01/G02** | **à confirmer G01/G02** |

Avant un code valide, aucune réponse (E02, E03, renvoi, erreurs) ne doit permettre de distinguer ces cas (protection contre l'énumération, **moment exact à confirmer G02**).

### Masquage des montants
- Un seul réglage « montants masqués », basculé par l'œil, **conservé entre deux ouvertures** (stockage local de l'appareil ; portée par appareil ou par compte à confirmer). Il s'applique à Accueil, Épargnes et Opérations (lots B et C reprennent la règle).
- Masqué : solde `••• •••` + « FCFA », dernier dépôt `••• F`, épargnes « ••• F sur ••• F », montants des opérations masqués. Visibles : libellés, noms, statuts, devise, dates, barres (sans valeur annoncée), QR, œil (barré).
- Lecteur d'écran : chaque montant masqué est lu « Montant masqué » ; pas de `accessibilityValue` sur les barres en état masqué.
- Exception : la saisie d'un montant et le récapitulatif d'une opération affichent toujours les montants (lots C et D).

### Formats régionaux (PRODUCT.md)
- Montants : entiers FCFA (XOF), sans décimales, espace insécable comme séparateur de milliers (`12 400 FCFA` ; en ligne `12 500 F`), signe `+` / `−` (vrai signe moins) sur les opérations. Formatage par une fonction unique partagée (`formatAmount` du DS ; `@kotiz/shared-utils`), montants reçus en entiers (`Money` en centimes côté backend, jamais de `float`).
- Téléphone : préfixe `+225` fixe, 10 chiffres groupés par 2 ; masqué = 2 premiers + `•• •• ••` + 2 derniers.
- Dates : français, « 18 oct. · 09:24 » ; heure « 14:32 ».

### Textes
- Tutoiement, phrases de moins de 10 mots, textes exacts = ceux du prototype et de ce document. Aucun texte n'annonce un frais, un plafond, un délai, une longueur de code ou une garantie non confirmés. Aucune mention de tontine, de banque ou de crédit.
- Un seul mot pour « fait » : **« Fait »** (et « C'est fait » en titre de E08).

### Accessibilité
- Cibles ≥ 48 × 48 (44 minimum absolu) ; texte essentiel ≥ 14 ; `caption` 12 seulement pour la barre basse et les dates.
- Contrastes AA (voir DESIGN.md § Colors) ; statut = mot + pictogramme + couleur.
- Ordre de focus = ordre visuel ; titre de chaque écran annoncé comme `header` à l'arrivée ; erreurs annoncées (`accessibilityLiveRegion="polite"` / `alert`) ; changements d'état d'attente annoncés (`role=status`).
- Grand texte système : aucun chevauchement, boutons principaux toujours atteignables (défilement si nécessaire, bouton collé en bas).
- Mode vocal : optionnel, jamais par défaut, hors lot A.

### Réseau
- Toutes les actions du lot A demandent le réseau (pas de file hors ligne, H6). Hors ligne : saisie gardée, rien envoyé en silence, « Réessayer ».
- Attente > 1 s : état `loading` du bouton. Délais d'expiration des appels : **à confirmer (technique)** ; un délai dépassé produit « en attente » ou « résultat inconnu », jamais un succès.
- Opérations créatrices (création de compte, activation, création de fiche, renvoi d'invitation) : idempotentes, clé générée par l'app et réutilisée par chaque nouvelle tentative.

### Sécurité
- Code SMS et PIN : jamais affichés en clair (PIN), jamais stockés sur l'appareil, jamais journalisés (app et backend), jamais envoyés à l'app agente.
- L'app agente n'a aucun écran, champ ni appel qui saisit ou lit un code SMS, un PIN ou un consentement de la cliente.
- Capture d'écran sur E06, E07, C01 (et Q01) : **à confirmer (technique / G02)**.

### Navigation
- Racines : Accueil · Épargnes · Opérations · Profil ; barre basse uniquement sur H01 dans ce lot.
- Raccords vers les lots non livrés : jamais d'écran mort ni de lien vers une archive ; un écran neutre « Bientôt ici » n'existe que dans le prototype — en production, l'entrée est masquée ou désactivée avec sa raison tant que le lot n'est pas livré (choix à l'implémentation).

## Cas limites

- **Textes longs** : nom de 40 caractères et plus (E04, E08, H01, Q01, A02-A04) → retour à la ligne, jamais tronqué sauf `GoalRow` (une ligne, « … ») ; prénom vide → salutation « Akwaba » sans prénom (ne jamais afficher « Fatou » par défaut : défaut corrigé de la critique #1).
- **Accents et apostrophes** acceptés dans les noms (« N'Guessan », « Koné ») ; caractères refusés : à confirmer G01.
- **Numéro collé** avec `+225`, `00225`, espaces ou tirets → normalisé ; plus de 10 chiffres après normalisation → erreur « Il faut 10 chiffres. ».
- **Montants extrêmes** : solde à 7 chiffres (`1 250 000`) garde le corps 34 à 320 de large (QR réduit) ; `0` affiché « 0 FCFA » seulement quand l'API le confirme (jamais pendant un chargement).
- **Listes** : 0 épargne / 0 opération → états vides ; plus de 3 épargnes impossible (règle produit) ; plus de 3 opérations → seulement les 3 dernières + « Tout voir ».
- **Double soumission** : chaque bouton principal passe en `loading` et ignore les appuis suivants ; Réessayer et Vérifier à nouveau réutilisent la même clé d'idempotence.
- **SMS en retard** : un code arrivé après un renvoi — **« seul le dernier code vaut » à confirmer G02**.
- **Modification du numéro depuis E03 ou S01** : l'ancien code ne vaut plus, nouvel envoi à la validation d'E02.
- **Interruption** (appel, mise en arrière-plan, app tuée) pendant l'inscription : réouverture sur l'étape non terminée, même téléphone ; code SMS encore valable → E03 reste ouvert (durée à confirmer G02) ; PIN → E06 recommence ; durée de conservation de l'étape à confirmer.
- **Réseau coupé pendant la création** → résultat inconnu (jamais « Compte créé » supposé).
- **Session expirée / verrouillage** : retour sur C01 (téléphone habituel) ; délai à confirmer G02.
- **Téléphone partagé** : « Utiliser un autre numéro » sur C01.
- **Permission refusée** : le lot A ne demande ni caméra, ni localisation, ni contacts. La lecture automatique du SMS, si retenue, ne bloque jamais la saisie manuelle. La luminosité (Q01) ne doit pas demander de permission système bloquante ; si elle est indisponible, Q01 s'affiche au réglage courant.
- **Agente sur un numéro déjà connu** (compte autonome actif ou fiche existante) → même message, aucun rattachement créé, aucune donnée affichée.
- **Fiche « Ce n'est pas moi »** (E05′) → aide, rien n'est activé.

## Critères d'acceptation

Chaque groupe peut devenir un ticket ; le rattachement aux issues est dans [issues-lot-a.md](issues-lot-a.md), les scénarios détaillés dans [gherkin-lot-a.md](gherkin-lot-a.md).

### Socle — tokens et composants
- [ ] `@kotiz/design-tokens` expose les couleurs, typographies, espacements, rayons, tailles, ombre et durées de DESIGN.md avec les valeurs du tableau Tokens ; plus aucune valeur de la palette v2 n'est consommée par l'app mobile.
- [ ] Aucun écran du lot A n'utilise une couleur, une taille de texte ou un rayon en dur.
- [ ] Les composants `Button`, `PageHeader`, `TextField`, `Message`, `PinSlots`, `PinPad`, `CheckOption`, `IconPastille`, `NumberChip`, `StepTracker`, `StatusPill`, `HomeHeader`, `BalanceCard`, `Shortcuts`, `InfoLine`, `GoalRow`, `TransactionRow`, `BottomNav`, `BottomSheet` existent avec les propriétés et états listés.
- [ ] Chaque composant interactif a une zone tactile ≥ 48 × 48 et un rôle d'accessibilité.
- [ ] Un statut s'affiche toujours avec son mot et son pictogramme ; le mot du statut fait est « Fait » partout.
- [ ] `surface-error` n'est utilisé que pour une erreur ou un échec ; `surface-pending` que pour « En attente ».
- [ ] `PinSlots` n'affiche jamais un chiffre et lit sa longueur dans la configuration.
- [ ] Les écrans se lisent sans chevauchement à 320 de large et avec le plus grand texte système.
- [ ] Avec « réduire les animations », aucune transition n'est animée.

### E01 — Bienvenue
- [ ] « Créer mon compte » est le seul bouton principal ; « Me connecter » est un bouton texte.
- [ ] Les deux boutons sont visibles sans défilement à 360 × 800, y compris en grand texte.
- [ ] La promesse ne contient ni « banque », ni « tontine », ni garantie.

### E02 — Ton numéro
- [ ] Le préfixe +225 est fixe et le numéro s'affiche groupé par 2.
- [ ] « Recevoir le code » reste désactivé tant que le numéro n'a pas 10 chiffres, et l'aide « Il faut 10 chiffres. » s'affiche dès la saisie commencée.
- [ ] Un numéro collé avec +225 ou des espaces est normalisé.
- [ ] Pendant l'envoi, le bouton affiche « Envoi du code… » et un second appui n'envoie pas de second SMS.
- [ ] Hors ligne, la saisie est gardée, « Réessayer » remplace le bouton, aucun écran suivant ne s'ouvre.
- [ ] En inscription l'en-tête affiche « Étape 1 sur 5 » ; en connexion, aucun indicateur d'étape.

### E03 — Code SMS et S01
- [ ] Le numéro s'affiche en entier avec « Modifier », qui ramène à E02 avec le numéro gardé.
- [ ] « Valider » reste désactivé tant que le code n'a pas la longueur configurée ; aucune longueur n'est codée en dur.
- [ ] Le délai avant « Renvoyer le code » vient de la configuration et s'affiche « dans N s ».
- [ ] Code faux → « Ce code ne marche pas. Vérifie le SMS. » ; code expiré → « Ce code n'est plus valable. Demande un nouveau code. » ; l'écran reste E03.
- [ ] Après un renvoi, « Nouveau code envoyé. » s'affiche.
- [ ] La mention « Ne le montre à personne, même à une agente. » est visible.
- [ ] E03 n'a pas de lien « Besoin d'aide ? » ; S01 propose « Contacter l'aide ».
- [ ] S01 s'ouvre depuis « Je n'ai pas reçu le code », se ferme par ✕, voile ou retour Android, et son bouton de renvoi suit le même décompte qu'E03.
- [ ] Aucune réponse avant un code valide ne révèle si le numéro a un compte.

### E04 — Ton nom
- [ ] « Continuer » est désactivé tant que le champ est vide.
- [ ] Un nom long passe à la ligne sans troncature ; accents et apostrophes sont acceptés.
- [ ] E04 n'apparaît jamais en activation (P4).

### E05 — Tes accords
- [ ] La liste des accords vient de la configuration (textes et versions) ; chaque accord est enregistré séparément avec sa version.
- [ ] « J'accepte et je continue » reste désactivé, avec « Coche chaque case pour continuer. », tant qu'une case obligatoire n'est pas cochée.
- [ ] « Lire » ouvre le texte complet ; au retour, les cases cochées sont conservées.
- [ ] En activation, l'écran affiche un message d'information « Une agente a préparé ta fiche » avec le nom, un lien « Ce n'est pas moi », et « Étape 4 sur 5 » ; aucun message de succès.
- [ ] Aucun accord de rattachement à une agente n'est proposé.

### E06-E07 — PIN et création du compte
- [ ] Au dernier chiffre d'E06, E07 s'ouvre sans bouton.
- [ ] Deux PIN différents → retour à E06 vide avec « Les deux codes ne sont pas pareils. Recommence. » et la mention de secret toujours visible.
- [ ] Pendant la création, l'écran affiche « Création de ton compte… » sans illustration ni couleur de succès.
- [ ] Délai dépassé ou réseau coupé → « En attente », « On vérifie ton compte », suivi des étapes et « Vérifier à nouveau », qui ne crée pas de second compte.
- [ ] Échec → « Échoué », « Ton compte n'est pas créé », « Rien n'a été créé. Tu peux réessayer maintenant. », « Réessayer ».
- [ ] Le PIN n'est jamais affiché, stocké sur l'appareil ni journalisé ; à la reprise après interruption, E06 recommence.

### E08 — Compte créé / accès activé
- [ ] E08 ne s'affiche qu'après confirmation serveur de la création ou de l'activation.
- [ ] Le titre reprend le prénom saisi (ou celui de la fiche en activation), jamais un prénom par défaut.
- [ ] « Créer mon épargne » est le seul bouton principal ; « Faire mon premier dépôt » est un bouton texte ; « Plus tard » est un lien en haut à droite.
- [ ] Plus tard et le retour Android ouvrent H01 vide ; le retour ne ramène jamais au PIN.

### E09 et E10
- [ ] E09 n'affiche que le numéro : aucun nom, solde, statut ni autre donnée du compte.
- [ ] E09 : « Me connecter » ouvre C01 ; « Récupérer mon accès » ouvre la récupération (lot F) ; « Utiliser un autre numéro » ouvre E02.
- [ ] E10 : « Créer mon compte » ouvre E04 ; « Utiliser un autre numéro » ouvre E02 ; « J'ai changé de numéro » ouvre la récupération (lot F).

### C01 — Entrer mon PIN
- [ ] Sur le téléphone habituel, le titre est « Akwaba, {prénom} » et « Utiliser un autre numéro » est proposé ; sur un nouveau téléphone, le titre est « Ton PIN » avec un retour vers E02.
- [ ] Le numéro est masqué (2 premiers et 2 derniers chiffres visibles).
- [ ] La vérification démarre au dernier chiffre ; PIN faux → « PIN incorrect. Réessaie. » et cases vidées.
- [ ] Le nombre d'essais restants n'est affiché que si la règle est configurée.
- [ ] Le code SMS seul n'ouvre jamais le compte : le PIN est toujours demandé après E03.

### H01 — Accueil
- [ ] La barre basse (Accueil, Épargnes, Opérations, Profil) n'apparaît que sur H01 dans le lot A, Accueil sélectionné et annoncé.
- [ ] Le solde est libellé « Solde disponible » et n'inclut jamais le montant des épargnes.
- [ ] État vide : « 0 FCFA », Retirer désactivé avec « Rien à retirer pour l'instant. », « Pas encore d'épargne. » + « Créer une épargne », « Tes opérations s'afficheront ici. ».
- [ ] Une opération non confirmée s'affiche « En attente » avec l'horloge, jamais « Fait ».
- [ ] La ligne d'identité suit les cinq statuts KYC avec les textes exacts et disparaît une fois l'identité validée ; elle n'affiche ni plafond, ni délai.
- [ ] L'œil masque tous les montants de l'accueil (solde, dernier dépôt, épargnes, opérations), barre l'œil, garde les barres sans chiffre, et TalkBack lit « Montant masqué ».
- [ ] Le choix masqué est conservé après fermeture et réouverture de l'app.
- [ ] Les épargnes affichent « X F sur Y F » sans pourcentage, 3 au maximum.
- [ ] Hors ligne, les derniers montants connus restent avec « Mis à jour à HH:MM · hors connexion ».
- [ ] Pendant le chargement, aucun montant « 0 » n'est affiché.

### Q01 — Mon QR
- [ ] Q01 n'affiche aucun solde ni montant, même montants visibles.
- [ ] Le nom complet et le numéro masqué sont affichés, avec « L'agente scanne ce code pour te trouver. Il ne sert pas à payer. ».
- [ ] La luminosité passe au maximum à l'ouverture et revient au réglage de la cliente en quittant Q01 (si la faisabilité Expo est confirmée).
- [ ] Le QR a un nom accessible « Ton QR KOTIZ ».

### A02-A04 — Ajouter une cliente (app agente)
- [ ] A02 n'a aucun champ PIN, code SMS ou pièce d'identité ; Activité et Localisation sont facultatifs et ne bloquent pas.
- [ ] Localisation est un texte libre ; aucune géolocalisation n'est demandée.
- [ ] Numéro déjà connu → « Ce numéro a déjà un compte. Demande à la cliente ou contacte l'aide. », aucune donnée de la fiche existante, aucun bouton pour l'ouvrir, aucun rattachement créé.
- [ ] A03 n'affiche Activité et Lieu que s'ils sont renseignés, et l'encadré « Ce qui va se passer » avec ses trois phrases.
- [ ] « Créer la fiche » puis « Réessayer » ne créent jamais deux fiches.
- [ ] A04 affiche trois statuts distincts : Fiche « Créée », Accès à l'app « Pas encore activé », Invitation SMS « Envoyée » / « Pas partie » / « En attente ».
- [ ] « Renvoyer l'invitation » n'apparaît que si l'invitation n'est pas partie.
- [ ] L'app agente ne propose aucun écran d'ouverture de la session de la cliente ni d'accès à son solde.

### P4 — Activation personnelle (bout en bout)
- [ ] Une fiche créée par une agente reste « accès non activé » tant que la cliente n'a pas validé le code SMS, ses accords et son PIN sur son téléphone.
- [ ] Après le code SMS d'un numéro avec fiche, l'app ouvre E05′ sans demander le nom, puis E06, E07 et E08 « Ton accès est activé. ».
- [ ] Après activation, le statut « Accès à l'app » de la fiche devient activé côté système.
