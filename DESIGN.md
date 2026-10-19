---
name: KOTIZ
description: Micro-épargne mobile pour les commerçantes d'Abidjan — Direction 04, sobre, chaleureuse, le montant au centre.
colors:
  action-primary: "#00564D"
  action-pressed: "#00423B"
  surface: "#FFFFFF"
  surface-canvas: "#F3F4F6"
  surface-brand: "#00564D"
  surface-brand-deep: "#00423B"
  surface-brand-subtle: "#E2F3ED"
  surface-information: "#E9F2FB"
  surface-error: "#FBECEA"
  surface-pending: "#FDF1DC"
  surface-purple: "#EEE9FB"
  surface-scrim: "#2532387A"
  text-primary: "#253238"
  text-secondary: "#626E76"
  text-brand: "#00564D"
  text-inverse: "#FFFFFF"
  text-danger: "#B83B35"
  text-pending: "#8A5300"
  text-purple: "#6B50AF"
  border-default: "#E4E7EB"
  border-focus: "#00564D"
  border-danger: "#B83B35"
  border-inverse: "#FFFFFF"
  border-inverse-subtle: "#FFFFFF29"
  success: "#00564D"
  error: "#B83B35"
  pending: "#8A5300"
  info: "#E9F2FB"
  accent-blue: "#69ADE8"
  accent-coral: "#D96860"
  accent-purple: "#8870CD"
  accent-silver: "#CAD3DC"
typography:
  amount:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: "42px"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "32px"
  section:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "23px"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "21px"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "21px"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "18px"
  note:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "16px"
rounded:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  xxl: "32px"
  full: "999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  ml: "20px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.action-primary}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "52px"
    width: "100%"
  button-primary-pressed:
    backgroundColor: "{colors.action-pressed}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "52px"
  button-primary-loading:
    backgroundColor: "{colors.action-primary}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "52px"
  button-primary-disabled:
    backgroundColor: "{colors.surface-canvas}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.surface-brand-subtle}"
    textColor: "{colors.text-brand}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "52px"
    width: "100%"
  button-text:
    textColor: "{colors.text-brand}"
    typography: "{typography.label}"
    height: "52px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "56px"
    padding: "0 16px"
  field-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    height: "56px"
  field-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-danger}"
    rounded: "{rounded.md}"
    height: "56px"
  field-disabled:
    backgroundColor: "{colors.surface-canvas}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    height: "56px"
  amount-input:
    textColor: "{colors.text-primary}"
    typography: "{typography.amount}"
  amount-quick-pick:
    backgroundColor: "{colors.surface-information}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    height: "48px"
    width: "108px"
  option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "16px"
  option-selected:
    backgroundColor: "{colors.surface-brand-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "16px"
  balance-card:
    backgroundColor: "{colors.surface-brand-deep}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.xl}"
    padding: "20px"
  balance-card-amount:
    textColor: "{colors.text-inverse}"
    typography: "{typography.amount}"
  balance-card-qr:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    size: "112px"
  goal-card:
    backgroundColor: "{colors.surface-canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px"
  goal-progress-track:
    backgroundColor: "{colors.border-default}"
    rounded: "{rounded.full}"
    height: "5px"
  goal-progress-fill:
    backgroundColor: "{colors.action-primary}"
    rounded: "{rounded.full}"
    height: "5px"
  shortcut-illustrated:
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    size: "96px"
  transaction-row:
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    height: "40px"
  transaction-row-icon:
    backgroundColor: "{colors.surface-brand-subtle}"
    rounded: "{rounded.sm}"
    size: "40px"
  transaction-row-icon-failed:
    backgroundColor: "{colors.surface-error}"
    rounded: "{rounded.sm}"
    size: "40px"
  header:
    textColor: "{colors.text-primary}"
    typography: "{typography.section}"
    height: "48px"
  header-icon-button:
    backgroundColor: "{colors.surface-canvas}"
    rounded: "{rounded.xl}"
    size: "48px"
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.caption}"
    padding: "12px 12px 24px"
  nav-item-active:
    backgroundColor: "{colors.surface-brand-subtle}"
    textColor: "{colors.text-brand}"
    rounded: "{rounded.md}"
  message-information:
    backgroundColor: "{colors.surface-information}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  message-success:
    backgroundColor: "{colors.surface-brand-subtle}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  message-error:
    backgroundColor: "{colors.surface-error}"
    textColor: "{colors.text-danger}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  message-loading:
    backgroundColor: "{colors.surface-canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.xl}"
    padding: "20px"
  result:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.xl}"
    padding: "20px"
  bottom-sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "12px 20px 32px"
  touch-target:
    size: "48px"
  page-header:
    textColor: "{colors.text-primary}"
    typography: "{typography.section}"
    height: "48px"
  message-pending:
    backgroundColor: "{colors.surface-pending}"
    textColor: "{colors.text-pending}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  pin-slot:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    size: "56px"
  pin-key:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    height: "52px"
  check-option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "72px"
  check-option-checked:
    backgroundColor: "{colors.surface-brand-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    height: "72px"
  checkbox:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xs}"
    size: "24px"
  checkbox-checked:
    backgroundColor: "{colors.action-primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.xs}"
    size: "24px"
  icon-pastille:
    backgroundColor: "{colors.surface-brand-subtle}"
    rounded: "{rounded.full}"
    size: "64px"
  icon-pastille-lg:
    backgroundColor: "{colors.surface-information}"
    rounded: "{rounded.full}"
    size: "80px"
  number-chip:
    backgroundColor: "{colors.surface-canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  step-tracker:
    backgroundColor: "{colors.surface-canvas}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  step-dot:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: "32px"
  status-pill-done:
    backgroundColor: "{colors.surface-brand-subtle}"
    textColor: "{colors.text-brand}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  status-pill-pending:
    backgroundColor: "{colors.surface-pending}"
    textColor: "{colors.text-pending}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  status-pill-failed:
    backgroundColor: "{colors.surface-error}"
    textColor: "{colors.text-danger}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  goal-list:
    backgroundColor: "{colors.surface-canvas}"
    rounded: "{rounded.lg}"
    padding: "4px 16px"
  goal-row:
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    height: "64px"
  info-line:
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    height: "48px"
---

# Design System: KOTIZ

> Formalisation du système **existant** (Direction 04), pas un rebranding. Source de vérité visuelle : fichier Figma `Ejhn5axhlQERtHPKYQ39gp` (gelé en archive, lu le 19 octobre 2026), collections de variables `KOTIZ / Primitives` et `KOTIZ / Usages et dimensions`, 7 styles de texte, 1 style d'élévation. Les corrections d'audit F01, F02 et F03 sont appliquées ici ; les autres constats restent listés dans [l'audit](docs/design/audit-design-system-2026-10-11.md).
>
> **Divergence connue** : `packages/design-tokens/tokens.json` et `docs/design/ux-design-specification.md` §1 décrivent une « palette v2 » (navy `#0A2540`, teal `#00A896`/`#007A6E`, or, violet). Cette palette n'existe pas dans le Figma Direction 04. Ce fichier suit Figma. **Décision PO du 19 octobre 2026** : l'alignement de `packages/design-tokens` est un chantier de code séparé (issue à ouvrir plus tard), non bloquant pour le design.

## Overview

**Trois adjectifs** : rassurante, lisible, chaleureuse.

**Référence assumée** : l'accueil Direction 04 (« Accueil QR — Direction 04 », node `13:658`) — une carte verte qui porte le solde et le QR, des raccourcis illustrés, tout le reste en gris clair et blanc. Repères de qualité, sans les copier : Wave pour la saisie et le montant, Djamo pour la chaleur des vides et des résultats, Revolut pour la finition des listes.

**Ce qu'on refuse** :
- un écran dominé par le vert, des piles de cartes, des cartes dans les cartes ;
- un succès célébré pendant une attente ;
- toute imagerie de tontine, de banque ou de crédit ;
- le look « app générée » (dégradés, glassmorphisme, emojis comme icônes).

Le secteur est la finance pour un public à lecture partielle. La confiance passe par la lisibilité des chiffres et par un statut toujours explicite. La chaleur passe par le ton « Akwaba Fatou » et les illustrations, pas par la couleur.

## Colors

Deux niveaux dans Figma : des **primitives** (`color/green`, `color/ink`…) et des **usages** qui les aliasent (`color/action/primary`…). Le YAML expose les usages ; c'est ce que les écrans consomment.

| Rôle | Token | Valeur | Contraste mesuré |
|---|---|---|---|
| Action principale, carte solde | `action-primary`, `surface-brand` | `#00564D` | texte blanc 8,61:1 |
| Fond de la carte solde | `surface-brand-deep` | `#00423B` | texte blanc 11,4:1 |
| Filet clair sur la carte solde | `border-inverse-subtle` | blanc à 16 % | décor |
| Action appuyée | `action-pressed` | `#00423B` | texte blanc 11,4:1 |
| Fond d'écran | `surface-canvas` | `#F3F4F6` | — |
| Carte, champ, barre basse | `surface` | `#FFFFFF` | — |
| Fond vert doux (bouton secondaire, onglet actif, succès) | `surface-brand-subtle` | `#E2F3ED` | texte vert 7,5:1 |
| Texte principal | `text-primary` | `#253238` | 13,19:1 sur blanc, 11,99:1 sur canvas |
| Texte secondaire | `text-secondary` | `#626E76` | 5,24:1 sur blanc, 4,76:1 sur canvas |
| Erreur lisible | `text-danger` | `#B83B35` | 5,65:1 sur blanc, 4,92:1 sur `surface-error` |
| Attente lisible | `text-pending` | `#8A5300` | 6,33:1 sur blanc, 5,66:1 sur `surface-pending` |
| Fond d'attente | `surface-pending` | `#FDF1DC` | texte principal 11,8:1 |
| Texte violet (épargne, accent) | `text-purple` | `#6B50AF` | 6,19:1 sur blanc |
| Bordure | `border-default` | `#E4E7EB` | 1,24:1 — décor seulement |
| Voile d'overlay | `surface-scrim` | `#253238` à 48 % | — |

**Accents décoratifs** (`accent-blue` `#69ADE8`, `accent-coral` `#D96860`, `accent-purple` `#8870CD`, `accent-silver` `#CAD3DC`) : réservés aux illustrations et pastilles de raccourcis. Ils ne portent jamais de texte ni de statut. **Le corail est réservé aux illustrations** (décision PO du 19 octobre 2026) : trop proche du rouge d'erreur (1,64:1 entre `#D96860` et `#B83B35`), il ne sert jamais de pastille de statut ni de signal : 2,4:1, 3,44:1, 4,0:1 et 1,51:1 sur blanc.

**Sémantiques** :
- **Succès** = le vert de marque (`#00564D` sur `#E2F3ED`), toujours accompagné d'une coche et d'un mot.
- **Erreur** = `text-danger` sur `surface-error`, avec le pictogramme Échec et un mot.
- **Information** = `surface-information` avec le pictogramme Information ; le texte reste `text-primary`.
- **Attente** = `text-pending` sur `surface-pending`, toujours avec le pictogramme horloge et le mot « En attente » (décision PO du 19 octobre 2026 ; token absent du Figma, ajouté ici). Les trois statuts ont chacun leur signature : vert + coche (fait), ambre + horloge (en attente), rouge + croix (échoué). L'ambre ne sert qu'au statut d'attente : ni bouton, ni décor, ni avertissement générique. Pictogramme horloge à dessiner dans le style des icônes fonctionnelles.
- **Source des couleurs** : les variables Figma Direction 04 (vert `#00564D`) font foi, pas l'ancienne palette navy / teal / or de `ux-design-specification.md` ni `packages/design-tokens` (à réaligner, chantier code séparé).

**Règle des deux couleurs** : au plus deux couleurs de marque par écran (vert + un accent), neutres majoritaires. Le vert plein ne sert qu'au bouton principal et à la carte solde. Pas de thème sombre dans Figma : il n'est pas défini ici.

## Typography

Une seule famille : **Inter**, en 400, 500, 600 et 700. Sept styles Figma (`KOTIZ / Typographie / …`), repris tels quels :

| Token | Style Figma | Taille / interligne | Graisse | Usage |
|---|---|---|---|---|
| `amount` | Montant / 34 | 34 / 42 | Bold | Solde, montant saisi, montant du résultat |
| `title` | Titre / 24 | 24 / 32 | Bold | Titre d'écran, titre de résultat ou de dialogue |
| `section` | Section / 16 | 16 / 23 | Semi Bold | Titre de section, salutation, montants de ligne |
| `label` | Libellé / 14 | 14 / 21 | Semi Bold | Libellés de champ, boutons, titres de ligne |
| `body` | Corps / 14 | 14 / 21 | Regular | Texte courant, valeurs saisies |
| `caption` | Légende / 12 | 12 / 18 | Regular | Libellés de la barre basse et dates uniquement |
| `note` | Note / 11 | 11 / 16 | Medium | Mention non essentielle uniquement |

Règles :
- **Montants** : chiffres tabulaires, séparateur de milliers par espace, devise explicite et séparée du nombre (`125 500` + `FCFA`, ou `12 500 F` en ligne). Le montant est toujours l'élément le plus gros de l'écran de saisie.
- **14 pt minimum pour tout ce qui est essentiel** (engagement de `PRODUCT.md`). **Décision PO du 19 octobre 2026** : le 12 (`caption`) est accepté **uniquement** pour les libellés de la barre basse et les dates ; statuts, montants, consignes et aides de champ sont en 14 minimum. `note` (11) ne porte jamais une information. « Non débité » (11 dans `25:1058`) et « Échoué · … » (12) passent en 14 à la migration.
- Au plus deux graisses visibles par bloc ; pas d'italique.
- Prévoir le texte système agrandi : pas de hauteur fixe sur les paragraphes, retour à la ligne autorisé.

## Layout

- **Base 4** : 4 · 8 · 12 · 16 · 20 · 24 · 32 (variables `space/*`).
- **Marges d'écran : 20.** Écart entre groupes : 16. Intérieur des cartes : 16 à 20. Éléments proches : 4 à 8. Grandes sections : 24 à 32.
- **Largeurs à tester** : 320, 360, 390 (référence Figma) et 430. Safe areas lues depuis le système, jamais codées en dur.
- **Auto-layout** partout : Hug pour le texte et les piles verticales, Fill pour la largeur disponible, Fixed seulement pour un pictogramme ou une zone tactile.
- **Clavier ouvert** : le champ actif et le bouton principal restent visibles.
- **Une décision par écran** : un seul `button-primary`, collé en bas de la zone de contenu.

### Navigation MVP (correction F01)

- **Quatre racines, dans cet ordre : Accueil · Épargnes · Opérations · Profil.** Santé et Score ne figurent plus dans la barre MVP (lots reportés).
- **La barre basse n'apparaît que sur ces quatre racines.** Inscription, formulaires, saisie de montant, récapitulatif, PIN et résultats sont des pages poussées, sans barre basse, avec un en-tête de page (retour vers la provenance).
- Une seule source de barre. Les quatre destinations se répartissent la largeur en **Fill** (pas de cases fixes de 91,5) pour tenir de 320 à 430. Chaque destination est une zone tactile d'au moins 48 × 48.
- Onglet actif : pastille `surface-brand-subtle` 44 × 40 derrière l'icône 24, libellé en `text-brand` ; inactif : icône et libellé `text-secondary`. L'état sélectionné est annoncé au lecteur d'écran, il n'est pas porté par la seule couleur (pastille + couleur).
- Icônes Épargnes et Opérations : à dessiner dans le style des icônes fonctionnelles existantes (**Décision PO du 19 octobre 2026**), comme l'horloge du statut d'attente.
- Les sources historiques `28:1538` et `185:957` (Accueil / Santé / Score / Profil) sont conservées en archive, ni modifiées ni réutilisées.

## Elevation & Depth

Langage **plat**. La profondeur est réservée à ce qui passe au-dessus du contenu.

- Cartes ordinaires, carte solde, lignes : **aucune ombre**. La séparation vient du contraste canvas gris / carte blanche ou gris.
- **Overlay** (dialogue, bottom sheet) : un seul style, `KOTIZ / Élévation / Overlay` — ombre portée y 8, flou 24, `#253238` à 12 %. Fond atténué par `surface-scrim` (48 %).
- Bordures : 1 pour une limite discrète (`border-default`) ; 2 pour le focus (`border-focus`) ou l'erreur (`border-danger`), toujours avec une indication textuelle.
- **Mouvement** : 160 ms retour d'action, 240 ms transition standard, 320 ms entrée d'une surface, 0 ms en mouvement réduit. Courbe `cubic-bezier(0.2, 0, 0, 1)`. Pas de rebond ni de déplacement décoratif sur une opération financière ; le chargement garde toujours un texte.

## Shapes

| Token | Valeur | Usage |
|---|---|---|
| `xs` | 6 | Case à cocher dessinée de 24 uniquement (`CheckOption`) |
| `sm` | 12 | Petits éléments : pastille d'icône de ligne, fond blanc du QR |
| `md` | 16 | Boutons, champs, options, messages, pastille de navigation |
| `lg` | 20 | Cartes de projet |
| `xl` | 24 | Carte solde, dialogues, résultats, bottom sheet (coins hauts), bouton icône d'en-tête |
| `xxl` | 32 | Surfaces larges |
| `full` | 999 | Barre de progression, formes entièrement arrondies |

Icônes fonctionnelles : trait, 24 dans une zone de 48 (20 pour les indicateurs). Illustrations : contours doux, aplats, mêmes proportions dans les raccourcis (48 / 56 / 96) et les choix d'objectif.

## Components

Les sources Figma restent l'autorité de construction ; les node IDs sont donnés pour la migration vers Claude Design.

### Boutons — `37:1101` (base `37:1091`), bouton texte `135:883`
Hauteur 52, largeur Fill, libellé `label`. Hiérarchie : **primaire** (un seul par écran), **secondaire** (fond vert doux, pour « Revenir » ou une alternative), **texte** (sortie discrète). États du primaire : repos, appuyé, chargement (indicateur blanc + libellé « Traitement… » conservé, double validation bloquée), désactivé (gris canvas, texte secondaire 4,76:1). Le set Figma mélange hiérarchie et état dans une seule propriété *Appearance* (F05, non corrigé ici) : en Claude Design, séparer `hiérarchie` et `état`.

### Champs — `65:496` (base `65:455`)
Libellé permanent au-dessus (`label`), zone de saisie 56, aide en dessous en `body` 14 (le Figma l'a en 12 : à passer en 14 à la migration, décision PO du 19 octobre 2026). États : vide, rempli, actif (bordure verte), erreur (bordure et aide `text-danger` + message explicite), désactivé (fond canvas).

### Montant — `65:524` (base `65:497`), saisie active `211:982`, montants rapides `211:988/990/992`, clavier `211:994…1014`
Le montant saisi est en `amount` (34 Bold), la devise à côté en 16, le libellé au-dessus en 14. Montants rapides : 108 × 48, fond `surface-information`, bordure `border-default`. Le clavier numérique (touches 108 × 52) n'est retenu que si le clavier système ne suffit pas (F09 ouvert). Montants rapides et touches utilisent un rayon brut de 8, hors de l'échelle des rayons : à rattacher à un token lors de la migration (pas de valeur choisie ici).

### Carte solde — `13:589` (Visible `13:562` / Masqué `13:588`, base `28:931`)
**Décision PO du 19 octobre 2026** — proposition « P3 · contexte réel », qui remplace les versions précédentes (vignette QR, puis reprise fidèle de `28:931`) :
- Fond `surface-brand-deep` (`#00423B`), rayon 24. Un arc `surface-brand` sort du coin bas gauche, avec un cercle au trait blanc à 7 % : ton sur ton, texte blanc lisible partout (11,4:1 et 8,61:1).
- **Solde à gauche, QR toujours à droite.** Colonne solde : « Solde disponible » + œil, montant `amount`, « FCFA ». Colonne QR : QR sur fond blanc (rayon 12), logo K au centre (≤ 20 % de la surface, correction d'erreur H), puis « Mon QR » + Agrandir (vue 332, `17:951`).
- Le QR rétrécit sans changer de place : 112, puis 92 et 64 sur carte étroite, pour qu'un montant à 7 chiffres garde ses 34 px.
- Marge blanche du QR réduite à environ 2 modules (norme : 4), à tester sur de vrais téléphones. **Proposition non validée** : rétablir les 4 modules standard pour fiabiliser le scan au soleil.
- **Ligne « Dernier dépôt »** sous un filet blanc à 16 % (`border-inverse-subtle`) : libellé, montant en `+`, statut en pastille 14 avec pictogramme (`Fait` + coche, `En attente` + horloge, `Échoué` + croix). Zone tactile de 48 qui ouvre l'opération. Elle remplace tout pourcentage de croissance : KOTIZ ne verse pas d'intérêts.
- Plus de ligne « Épargné ce mois-ci », plus de pousse au trait.

**Correction F02 — vocabulaire et masquage :**
- Le libellé est **« Solde disponible »** (et non « Épargne disponible ») : il désigne l'argent libre, distinct des épargnes par projet.
- **Masqué** = le solde est remplacé par `••• •••` et le montant du dernier dépôt par `••• F`. Le libellé, la devise, le statut, le QR et l'icône œil restent visibles.
- **Le masquage s'étend à tout l'accueil** : montants « X F sur Y F » de la carte projet et montants des derniers mouvements. La barre de progression reste visible, sans chiffre.
- **Persistance (décision PO du 19 octobre 2026)** : le choix masqué / visible est conservé entre deux ouvertures et s'applique aussi à Épargnes et Opérations. Exception : la saisie d'un montant et le récapitulatif affichent toujours les montants, pour que la cliente voie ce qu'elle tape et ce qui sera débité.
- Masqué, l'œil est barré et chaque montant masqué est annoncé « Montant masqué » au lecteur d'écran (jamais « point point point »).
- L'œil est un bouton de 48 × 48 (overlay `180:8548` dans l'accueil), avec un nom accessible « Afficher le solde » / « Masquer le solde ». En Claude Design, la zone tactile fait partie du composant carte, plus d'un overlay externe.
- Le couple montant + QR et l'identité de la carte sont conservés.

### Carte projet (objectif) — `13:639`
Fond `surface-canvas`, rayon 20, padding 16. Le titre doit passer à la ligne (largeur Fill + hauteur Hug ; F04 ouvert).

**Décision PO du 19 octobre 2026** — carte allégée sur l'accueil : illustration 36, **nom du projet** (`label`), **« 32 500 F sur 50 000 F »** (`body`, montants en chiffres tabulaires), **barre 5 px**. La phrase de reste (« Encore 17 500 F pour atteindre ton objectif. ») et le pourcentage passent sur l'écran de détail de l'épargne. Le master `13:639` (montant, %, phrase de reste dans la carte) est la version d'origine.

**Correction F03 — un seul contrat de progression :**
- Deux **entrées** : `montantÉpargné` et `cible`. Tout le reste est **dérivé**, jamais saisi à la main :
  - `pourcentage = ⌊montantÉpargné / cible × 100⌋` — arrondi à l'entier inférieur, donc jamais 100 % avant que la cible soit atteinte (**Décision PO du 19 octobre 2026**) ;
  - `largeurBarre = min(pourcentage, 100) %` de la piste ;
  - `reste = cible − montantÉpargné`, affiché seulement s'il est positif.
- Montant, objectif, pourcentage, barre et phrase de reste changent **ensemble** ; un écran qui en modifie un les met tous à jour.
- **Cible atteinte ou dépassée** (**Décision PO du 19 octobre 2026**) : « Objectif atteint ✓ », barre pleine, montant réel affiché (par exemple « 52 000 F sur 50 000 F ») ; jamais un pourcentage supérieur à 100. Aucune fermeture automatique de l'épargne (`PRODUCT.md`).
- Le prototype Figma applique déjà ce principe pour l'affectation (variables `prototype/affectation/progress`, `progressText`, `barWidth`, `remainingText`). Le master `13:639` ne l'applique pas : à corriger à la migration.
- Le composant affiche des montants calculés par l'application ; il ne calcule rien.

### Raccourcis illustrés — `35:1102` (Déposer `13:605`, Retirer `13:619`, Épargnes `23:1419`)
Pastille ronde colorée + illustration 48, libellé `label` toujours visible, cible 96 × 93. Trois actions au maximum sur l'accueil. Teintes : `surface-brand-subtle` (Déposer), `surface-information` (Retirer), `surface-purple` (Épargnes). **Jamais `surface-error`** : le rose signifie « échoué » (critique du lot A, 19 octobre 2026 ; la source Figma avait Retirer en rose).

### Ligne d'opération — `35:1103` (Dépôt réussi `13:657`, Dépôt échoué `25:1058`, Retrait réussi `25:1070`)
Ligne de 40 de haut, espacées de 16 ; la zone tactile de la ligne entière fait au moins 48. Pastille d'icône 40 (rayon 12), titre `label`, date en `caption`, montant à droite en `label` (`+` pour un apport, `−` pour une sortie). **Décision PO du 19 octobre 2026** : **le statut s'écrit en mots, en 14, avec son pictogramme** (« Fait » + coche, « Échoué » + croix, « En attente » + horloge, « Non débité » + croix), avec sa couleur sémantique en renfort ; pas seulement en couleur. **Un seul mot pour le statut fait dans tout le produit : « Fait »** (remplace « Réussi », critique du lot A du 19 octobre 2026). Pastille d'icône : vert doux pour un apport, `surface-canvas` pour une sortie, `surface-error` réservé à l'échec : un retrait réussi ne ressemble jamais à un échec. Une affectation interne solde ↔ épargne ne doit pas ressembler à un apport. La ligne desktop `159:887` (940 px) n'est pas une source mobile.

### En-têtes — `28:1453` (Accueil), `28:1693` (Page)
Hauteur 48. Accueil : logo 28 + « Akwaba, Fatou » (`section`) + notification en bouton 48 sur fond canvas. Page : retour 48 + titre.

### Navigation — voir Layout › Navigation MVP.

### Messages et attente — `66:574` (Information `66:540`, Succès `66:550`, Erreur `66:562`), chargement `66:575`, squelette `66:582`
Pictogramme + titre `label` + détail `body`/`caption`, rayon 16. Le chargement garde un texte (« Un instant… ») ; le squelette ne sert qu'au premier chargement.

### Statut d'opération — `158:917`
Pictogramme + titre `title` + détail. Préréglages à créer (F07 ouvert) : succès, en attente, échec connu, incertain. **Un délai dépassé ne produit jamais un succès** : il produit « en attente » ou « incertain » avec un suivi.

### Dialogue de confirmation — `66:591` ; résultats — `66:652`, illustrés `120:866` (épargne créée) et `129:871` (création indisponible)
Dialogue : titre, description, primaire + secondaire, en overlay. Il ne confirme que ce qui est visible dans un récapitulatif (F08 ouvert). Résultat simple pour un retour local ; résultat illustré pour un moment majeur (épargne créée, compte créé), jamais pendant l'attente.

### Autres sources réutilisables
Option `65:559` (repos / sélectionnée / désactivée : la sélection se voit par fond vert doux, bordure et libellé) ; choix d'objectif illustré `28:1838`, `37:1102`, `65:613` ; récapitulatif `158:885` ; reçu compact `198:988` ; bottom sheet « Origine des fonds » `198:949` ; code de sécurité `158:916` (4 ou 6 cases : longueurs non validées, gate G02) ; zone tactile `169:887` ; ligne de navigation `170:887` ; carte solde simple `28:1773` ; nouvelle épargne `28:1812`.

### Composants promus depuis le lot A (décision PO du 19 octobre 2026)
Créés pendant les maquettes du lot A (canvas « KOTIZ — Lot A accès et accueil »), ajoutés au bundle `Kotiz.*` pour les lots B à F. Aucune couleur nouvelle ; les tailles hors échelle sont devenues des tokens : `rounded.xs` (6), `size-pin-slot` (56), `size-pastille` (64), `size-pastille-lg` (80), `size-step-dot` (32).
- **`PageHeader`** — pages poussées : retour 48, titre (16 Semi Bold) ou « Étape n sur N » (14 Semi Bold `text-secondary`, à droite), lien discret à droite pour la sortie secondaire. Jamais trois boutons empilés en bas.
- **`TextField`** (évolution) — vraie saisie, préfixe fixe en option (`+225` séparé par un filet), états vide / rempli / actif / erreur / désactivé, aide en 14.
- **`Message`** — information, succès, erreur, chargement, **en attente** (ambre + horloge) ; pictogramme à la couleur du message.
- **`PinSlots` + `PinPad`** — 4 à 6 cases (56, rayon 16, rétrécissent jusqu'à 40 seulement quand la place manque ; case vide en `surface-canvas` bordée `text-secondary`, visible au soleil), bordure verte sur la case suivante, rouge en erreur, jamais de chiffre affiché ; pavé 3 × 4, touches 52 en `title` sur `surface-canvas`. Longueurs non validées (G02).
- **`CheckOption`** — carte d'accord de 72 : case dessinée 24 (`rounded.xs`), phrase, lien « Lire » de 48 ; vert doux et bordure verte une fois cochée.
- **`IconPastille`** — pastille ronde 64 ou 80 avec une illustration du DS (40), teintes vert doux, bleu, violet, blanc ; une par écran.
- **`NumberChip`** — numéro à vérifier en `title` dans une puce `surface-canvas`, jamais coupé.
- **`StepTracker`** — étapes Fait / En attente / Pas encore (pastilles 32 vert doux + coche, ambre + horloge, vide) ; remplace toute illustration pendant une attente (compte, dépôt, retrait).
- **`StatusPill`** — mot + pictogramme : Fait (vert), En attente (ambre), Échoué (rouge), neutre.
- **`GoalRow`** — ligne d'épargne compacte (illustration 32, nom, « 45 000 F sur 100 000 F », barre, chevron ; masqué : « ••• F sur ••• F », barre non annoncée au lecteur d'écran) empilée dans un bloc `goal-list` ; même règle de progression que la carte projet.
- **`InfoLine`** — ligne discrète entre deux filets (information + phrase + chevron), une par écran ; sans suite, ni chevron ni bouton.
- **`Shortcuts`** (évolution) — état désactivé (pastille `surface-canvas`, illustration à 40 %, libellé `text-secondary`) toujours accompagné d'une phrase qui dit pourquoi (« Rien à retirer pour l'instant. »).
- **`TransactionRow`, `OperationStatus`** (évolution) — le statut « En attente » porte l'horloge KOTIZ (`Icones/horloge.svg`), dessinée dans le style des icônes.
- Non promu : le hero vert de E01, tant que le PO n'a pas retenu le même traitement pour E08.

### Logos opérateurs — `225:959` Wave, `225:961` Orange Money, `225:963` MTN MoMo, `225:965` Moov Money
Logos officiels, non recolorés, cadre 64 × 48. **Wave : symbole seul, sans inscription.**

## Do's and Don'ts

**À faire**
- Composer chaque écran avec des instances des sources ; ne jamais détacher pour simuler une variante.
- Garder les neutres majoritaires et le vert pour le geste principal.
- Écrire chaque statut en mots, avec un pictogramme, et une couleur seulement en renfort.
- Afficher le montant et sa destination (solde ou épargne) avant toute confirmation.
- Tester 320 px, texte agrandi, noms de projet longs, montants à 7 chiffres, clavier ouvert.
- Phrases de moins de 10 mots, tutoiement.

**À éviter**
- Plus de deux couleurs de marque sur un écran ; un fond vert plein ailleurs que sur la carte solde ou le bouton principal.
- Cartes dans des cartes, piles de cartes identiques, grilles de trois cartes.
- Ombre sur une carte ordinaire ; ombres lourdes.
- Texte en accent coral, bleu, violet clair ou argent.
- Un statut, un montant, une consigne ou une aide en 11 ou 12 (seuls les libellés de la barre basse et les dates restent en 12).
- Gris sur gris sous 4,5:1 : `text-secondary` sur `surface-canvas` est la limite basse (4,76:1).
- Plus de deux graisses dans un même bloc ; italique.
- Dégradés violet-bleu, glassmorphisme, emojis en guise d'icônes, tout centré.
- Une animation de succès pendant une attente ; une confirmation déduite d'un délai dépassé.
- Toute référence visuelle ou verbale à la tontine.
- Inventer un frais, un plafond, une longueur de code ou un délai dans une maquette.
