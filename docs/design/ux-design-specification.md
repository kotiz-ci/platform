---
workflowType: ux-design
workflow: create-compressed
version: 1.1
date: 2026-06-03
author: Henoch Lonzo Koffi
project_name: KOTIZ
stepsCompleted:
  - step-01-init
  - step-discovery-compressed
  - step-design-tokens
  - step-accessibility
  - step-components
  - step-journeys-wireframes
  - step-reference-screens
  - step-surface-matrix
inputDocuments:
  - docs/product/prd-mvp.md (PRD v1.1, validé 4,5/5 le 23 avril)
  - docs/product/prd-mvp-validation.md
  - KOTIZ/_archive/2026-bmad/_bmad-output/brainstorming/brainstorming-session-2026-04-23-1800.md
  - KOTIZ/_archive/2026-10-docs-avant-migration/04_Produit/KOTIZ_Catalogue_Modules.docx
visualReferences:
  - Djamo (Côte d'Ivoire) — épuré, mobile-first, accent couleur fort
  - Wave (Sénégal/CI) — minimaliste, whitespace maximal, clarté du flux d'argent
  - Revolut — premium, typographie soignée, data viz sophistiquée
scope: UX Skeleton (light) — décisions structurantes avant sprint 1 (5 mai 2026)
---

# UX Design Specification — KOTIZ MVP

**Auteur :** Henoch Lonzo Koffi
**Date :** 23 avril 2026
**Projet :** KOTIZ — plateforme de micro-épargne et services financiers inclusifs pour le secteur informel ivoirien
**Scope :** UX Skeleton (light) — décisions structurantes avant le sprint 1

---

## Principes directeurs

1. **Épuré avant tout** (inspiration Djamo × Wave × Revolut) — **max 2 couleurs de marque par écran**, beaucoup d'espace blanc, hiérarchie nette.
2. **L'argent au centre** — chaque écran critique affiche en gros le solde ou l'action monétaire. Pas d'ornementation autour.
3. **Accessibilité first** — mode vocal optionnel, icônes universelles, taille minimum texte 14 pt, contraste WCAG AA minimum partout.
4. **Low-end device** — Tecno entrée de gamme, 2 Go RAM, 3G instable. APK ≤ 30 Mo. Pas d'animations lourdes.
5. **Tone « Akwaba Fatou »** — tutoiement, phrases courtes (< 10 mots), mots locaux en accroche uniquement.
6. **Signe signe digitalisé** — l'UI renforce la promesse « tu gagnes » à chaque interaction : dépôt confirmé = célébré (son + visuel), streak bonifié, étoiles qui évoluent.

---

## 1. Design Tokens

### 1.1 Couleurs — palette v2 (14 tokens)

| Token             | Hex       | Usage                                                 | Contraste sur blanc      |
| ----------------- | --------- | ----------------------------------------------------- | ------------------------ |
| `navy`            | `#0A2540` | Titres, header, texte primaire sur fond clair         | 15,1:1 ✅ AAA            |
| `teal`            | `#00A896` | Accents décor, illustrations, icônes non-interactives | 2,9:1 (décor uniquement) |
| `teal-deep` 🆕    | `#007A6E` | **Boutons primaires, liens, focus rings**             | 4,9:1 ✅ AA              |
| `gold`            | `#E6B325` | Badges étoiles, fonds dorés, éléments décoratifs      | 2,2:1 (décor uniquement) |
| `gold-dark` 🆕    | `#B8860B` | Texte « argent/épargne » sur fond clair               | 4,5:1 ✅ AA              |
| `violet`          | `#6C4AB6` | Santé, innovation, bien-être                          | 7,1:1 ✅ AAA             |
| `success` 🆕      | `#10B981` | Dépôt réussi, streak badge, confirmation positive     | 3,2:1 (usage large text) |
| `success-deep` 🆕 | `#047857` | Texte succès sur fond clair                           | 5,7:1 ✅ AA              |
| `warn`            | `#D94F4F` | Erreur, alerte critique                               | 4,6:1 ✅ AA              |
| `info` 🆕         | `#3B82F6` | Info neutre, notification non-urgente                 | 4,5:1 ✅ AA              |
| `light`           | `#F4F6F8` | Fonds, cards, sections alternées                      | —                        |
| `muted`           | `#5A6470` | Texte secondaire, helpers, placeholders               | 6,5:1 ✅ AA              |
| `ink`             | `#1A202C` | Texte principal                                       | 15,2:1 ✅ AAA            |
| `border`          | `#D0D5DD` | Séparateurs, outlines inputs                          | —                        |

**Règle d'or épurée :** max 2 couleurs de marque par écran + neutres. Exemple :

- ✅ Écran Épargne : Navy (titres) + Gold-dark (montants) + neutres.
- ✅ Écran Santé : Navy (titres) + Violet (icône + boutons) + neutres.
- ❌ Jamais Navy + Teal-deep + Gold + Violet + Warn sur le même écran.

**Dark mode** (préparé pour sprint 2+) :

- `navy` → `#E8EEF5` (inversé, texte clair)
- `light` → `#0F1419` (fond sombre)
- Toutes les autres couleurs conservent leur hue mais gagnent 10 % de luminance pour rester lisibles.

### 1.2 Typographie — Inter

**Font stack** : `Inter, -apple-system, SF Pro, Roboto, system-ui, sans-serif`
**Documents** : Calibri (inchangé — gabarit interne, PDF, Word, investor-facing)

**Échelle typographique (mobile-first) :**

| Rôle      | Taille | Line-height | Weight | Usage                                      |
| --------- | ------ | ----------- | ------ | ------------------------------------------ |
| `display` | 32 px  | 40 px       | 700    | Chiffres héros (solde, montant dépôt XL)   |
| `h1`      | 24 px  | 32 px       | 700    | Titre écran                                |
| `h2`      | 20 px  | 28 px       | 600    | Sous-section                               |
| `h3`      | 17 px  | 24 px       | 600    | Titre de card                              |
| `body-lg` | 16 px  | 24 px       | 400    | Texte principal (valeur par défaut mobile) |
| `body`    | 14 px  | 20 px       | 400    | Texte secondaire, labels                   |
| `caption` | 12 px  | 16 px       | 400    | Metadata, timestamps, helpers              |
| `button`  | 16 px  | 20 px       | 600    | Label de bouton (touch-friendly)           |

**Règles :**

- **Taille minimum** : 14 px partout (pas de texte plus petit, contrainte Fatou / low-end).
- **Chiffres** : activer `font-variant-numeric: tabular-nums` pour alignement parfait des colonnes FCFA.
- **Poids** : limiter à 400 (regular), 600 (semi-bold), 700 (bold). Pas d'italique (Inter italique moins lisible sur Tecno).
- **Accessibilité** : `line-height` minimum 1,4 pour les paragraphes (anti-dyslexie).

### 1.3 Espacements — système 4 pt

| Token      | Valeur | Usage                                   |
| ---------- | ------ | --------------------------------------- |
| `space-0`  | 0      | Reset                                   |
| `space-1`  | 4 px   | Gap intra-composant minuscule           |
| `space-2`  | 8 px   | Gap entre icône et texte                |
| `space-3`  | 12 px  | Gap entre boutons                       |
| `space-4`  | 16 px  | Padding par défaut des cards            |
| `space-5`  | 20 px  | Gap entre sections dans un écran        |
| `space-6`  | 24 px  | Marge verticale entre blocs             |
| `space-8`  | 32 px  | Grande marge verticale (hero → contenu) |
| `space-10` | 40 px  | Séparation héros / footer               |
| `space-12` | 48 px  | Marge d'écran top (sous safe area)      |

**Marges écran mobile** : `16 px` horizontal (touches latérales évitées), `20 px` vertical entre sections.
**Marges card** : `16 px` padding interne.

### 1.4 Border radius

| Token         | Valeur  | Usage                                |
| ------------- | ------- | ------------------------------------ |
| `radius-sm`   | 4 px    | Inputs, tags petits                  |
| `radius-md`   | 8 px    | Cards, boutons, inputs par défaut    |
| `radius-lg`   | 12 px   | Modales, bottom sheets (bords hauts) |
| `radius-xl`   | 16 px   | Cards d'accueil (feeling Djamo)      |
| `radius-full` | 9999 px | Avatars, badges circulaires, FAB     |

**Style Djamo/Wave** : privilégier `radius-lg` (12 px) et `radius-xl` (16 px) pour les cards héroïques. Boutons = `radius-md` (8 px).

### 1.5 Shadows (légères — pas de shadow lourde pour low-end)

| Token          | Valeur                              | Usage                                         |
| -------------- | ----------------------------------- | --------------------------------------------- |
| `shadow-sm`    | `0 1px 2px rgba(10, 37, 64, 0.05)`  | Cards au repos                                |
| `shadow-md`    | `0 4px 8px rgba(10, 37, 64, 0.08)`  | Cards hover/pressed                           |
| `shadow-lg`    | `0 8px 16px rgba(10, 37, 64, 0.12)` | Bottom sheets, modales                        |
| `shadow-focus` | `0 0 0 3px rgba(0, 122, 110, 0.3)`  | Ring focus (teal-deep, accessibilité clavier) |

### 1.6 Durations & motion

| Token           | Valeur                         | Usage                                      |
| --------------- | ------------------------------ | ------------------------------------------ |
| `duration-fast` | 150 ms                         | Hover, press feedback                      |
| `duration-base` | 250 ms                         | Transitions par défaut (tab switch, modal) |
| `duration-slow` | 400 ms                         | Slide-in bottom sheet, page transition     |
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Courbe par défaut                          |

**Contrainte low-end** : pas d'animation > 400 ms, pas de parallax, pas de lottie > 50 Ko.

### 1.7 Z-index

| Layer            | Valeur |
| ---------------- | ------ |
| Base             | 0      |
| Content          | 1      |
| Sticky header    | 10     |
| Tab bar          | 20     |
| FAB              | 30     |
| Toast / snackbar | 50     |
| Bottom sheet     | 60     |
| Modal backdrop   | 70     |
| Modal content    | 80     |
| Tooltip          | 90     |
| Alert critique   | 100    |

---

## 2. Spécification Accessibilité

### 2.1 Mode vocal optionnel

**Principe** : le vocal est un **plus**, pas le défaut. L'utilisatrice active le vocal via un bouton `AudioToggle` persistant en haut à droite de chaque écran critique.

**Scope vocal MVP** :

- Écran d'accueil (lecture : « Bonjour Fatou, ton solde est de 12 400 FCFA, tu es à 3 étoiles »)
- Parcours dépôt (lecture à chaque étape + confirmation)
- Parcours souscription Santé (lecture des 3 formules + recommandation)
- Parcours Score (lecture de la progression et des avantages)
- Alertes critiques anti-churn (push vocal WhatsApp, pas in-app)

**Hors scope MVP** :

- Dictée vocale (saisie à la voix) — V1
- Navigation entièrement vocale (TalkBack/VoiceOver complet) — standard Android/iOS, on active le support mais on ne le customise pas

**Langues vocales** :

- **Français** (défaut, TTS système Android/iOS)
- **Bambara/dioula** (optionnel, via Google Cloud TTS si disponible, sinon fallback français)

### 2.2 Icônes universelles

Parce que Fatou lit partiellement, on compense par des icônes **non-ambiguës** :

| Action                | Icône                                 | Alternative textuelle (si mode vocal) |
| --------------------- | ------------------------------------- | ------------------------------------- |
| Cotiser / déposer     | 💰 / `HandCoins` (Phosphor)           | « Cotiser »                           |
| Objectif d'épargne    | 🎯 / `Target`                         | « Objectif »                          |
| Verrouiller           | 🔒 / `Lock`                           | « Verrouiller »                       |
| Flex (non-verrouillé) | 🤲 / `HandHeart` (main ouverte)       | « Flexible »                          |
| Santé                 | 🏥 / `FirstAid` (avec couleur violet) | « Santé »                             |
| Score                 | ⭐ / `Star`                           | « Mes étoiles »                       |
| Agent                 | 👤 / `UserCircle`                     | « Ton agent »                         |
| WhatsApp              | `WhatsappLogo` (Phosphor)             | « WhatsApp »                          |
| Mode vocal            | 🔊 / `SpeakerHigh`                    | « Écouter »                           |
| Partager              | `Share`                               | « Partager »                          |
| Aide                  | `Question` / `Info`                   | « Besoin d'aide »                     |
| Retour                | `ArrowLeft`                           | « Retour »                            |
| Confirmer             | `CheckCircle`                         | « Confirmer »                         |
| Supprimer             | `Trash`                               | « Supprimer »                         |
| Erreur                | `WarningCircle` (warn)                | « Erreur »                            |

**Règle** : **toute action critique a à la fois icône + label texte.** Jamais d'icône seule sur les boutons d'action.

### 2.3 Contraste

**Règles WCAG AA strictes partout :**

- Texte body (14-16 px) : contrast ≥ 4,5:1
- Large text (≥ 18 px ou 14 px gras) : contrast ≥ 3:1
- Interactive elements (boutons, liens, inputs) : contrast ≥ 4,5:1
- Focus rings : contrast ≥ 3:1 avec le fond adjacent

**Validation automatique** : test de contraste intégré au design system (Figma plugin) avant chaque merge.

### 2.4 Touch targets & tailles

| Élément                                    | Taille minimum                             |
| ------------------------------------------ | ------------------------------------------ |
| Touch target (boutons, liens cliquables)   | **44 × 44 px** (standard iOS/Android)      |
| Tap gap (espace entre éléments cliquables) | **8 px minimum**                           |
| Texte body                                 | **14 px minimum**                          |
| Texte légal/fin                            | **12 px minimum** (pied de page, mentions) |

### 2.5 États obligatoires par composant

Chaque composant interactif doit avoir les 7 états :

1. **Default** (au repos)
2. **Hover** (desktop only, inapplicable mobile)
3. **Pressed** (feedback tactile immédiat — opacity 0.8 ou scale 0.98)
4. **Focused** (ring `shadow-focus`, accessibilité clavier/tab admin)
5. **Disabled** (opacity 0.4, cursor not-allowed)
6. **Loading** (skeleton ou spinner, feedback dans les 200 ms)
7. **Error** (bordure `warn`, message < 10 mots)

**Bonus** : **Empty** state obligatoire partout où une liste peut être vide (zéro clientes, zéro dépôts, zéro alertes).

### 2.6 Contrainte low-end device

- **APK target** : ≤ 30 Mo (cf. NFR-COMPAT-02)
- **Images** : WebP obligatoire, lazy-loading, dimensions réelles < 1 Mo chacune
- **Icônes** : SVG inline ou font-icon (Phosphor webfont), pas de PNG
- **Animations** : limiter à `duration-base` (250 ms). Pas de Lottie > 50 Ko.
- **Fonts** : Inter Variable (1 fichier au lieu de 6), sous-set latin + africain
- **Data par session** : ≤ 5 Mo (cf. NFR-COMPAT-03)

---

## 3. Bibliothèque de composants (15 critiques)

### 3.1 Composants structurels

**1. `AppHeader`** — header sticky en haut de chaque écran

- Contient : logo KOTIZ (à gauche), titre d'écran (centré), `AudioToggle` (à droite)
- Hauteur : 56 px + safe area
- Fond : blanc, shadow-sm au scroll

**2. `TabBar`** — navigation principale (client app)

- 4 tabs : 🏠 Accueil · 💰 Épargne · 🏥 Santé · ⭐ Score
- Hauteur : 56 px + safe area bottom
- Style : icône + label, teal-deep pour tab active

**3. `BottomSheet`** — actions contextuelles

- Slide-in bottom, radius-lg sur les coins hauts
- Max height : 80 % hauteur écran
- Drag handle en haut (4 × 32 px, muted)

### 3.2 Composants d'action

**4. `PrimaryButton`** — bouton action principale

- Fond : `teal-deep` — texte : blanc — radius-md — 48 px de hauteur
- Variants : `default` · `loading` (spinner blanc) · `disabled`
- Usage : 1 seul par écran (règle épurée)

**5. `SecondaryButton`** — action secondaire

- Fond : blanc — bordure : `border` — texte : `ink` — radius-md — 48 px
- Usage : actions non-primaires, modales

**6. `IconButton`** — action compacte (fermer, retour, vocal)

- 44 × 44 px touch target, radius-full, fond `light`

**7. `AudioToggle`** — bouton vocal persistant

- Icône `SpeakerHigh` / `SpeakerX` (muted)
- État visible : allumé = teal-deep, éteint = muted
- Position : top-right de chaque écran critique

### 3.3 Composants de données

**8. `DepositCard`** — carte héros de l'écran accueil

- Affiche : solde total (display 32 px, ink), label « Mon épargne » (caption muted)
- Couleur accent : `gold-dark` pour le montant
- Action : tap → écran détail solde

**9. `GoalCard`** — carte objectif d'épargne

- Affiche : nom objectif, montant atteint / cible, barre de progression (teal-deep), streak
- Icône : 🎯 ou 🔒 (selon statut verrouillé)
- Taille : card width 100 %, padding 16

**10. `StarRating`** — score KOTIZ en 5 étoiles

- 5 étoiles côte-à-côte, gold rempli pour étoiles acquises, border pour non-acquises
- Sous-titre : label palier (`Régulière`, `Confirmée`, etc.)
- Animation : glissement visuel au franchissement d'un palier (0.4 s)

**11. `StreakBadge`** — indicateur de série

- Pill radius-full, fond `success`, texte blanc, icône `Flame`
- Format : « 🔥 12 jours »

**12. `AmountInput`** — saisie de montant FCFA

- Display grand (h1 24 px), alignement central
- Suffix : « FCFA » en muted
- Chips de suggestion rapide : 100 · 500 · 1 000 · Autre
- Validation inline : min 100, max selon contexte

### 3.4 Composants de feedback

**13. `Toast`** — notification in-app discrète

- Bottom-positioned, auto-dismiss 3 s
- Variants : `success` (fond success, icône CheckCircle) · `info` · `warn`

**14. `EmptyState`** — état vide

- Illustration afro-moderne centrée (taille ~160 px)
- Titre h2, description body muted, CTA primaire
- Ex : « Pas encore d'objectif » → illustration + « Crée ton premier objectif »

**15. `LoadingSkeleton`** — placeholder pendant chargement

- Forme grise animée (shimmer léger)
- Respecte la structure de la card finale (anti-layout-shift)

### Bonus (si temps)

**16. `BundleProposal`** — carte de proposition Santé J+1 (parcours P1)

- Card violet soft avec illustration famille
- Titre : « Protège ta famille dès demain »
- Formule recommandée + prime + 2 boutons (`Accepter` primary / `Plus tard` secondary)

**17. `AlertCard`** (admin) — carte d'alerte AML

- Radius-md, bordure `warn`, titre + timestamp + preview
- CTA `Investiguer`

---

## 4. Wireframes des 5 parcours critiques

> Format : wireframe textuel (ASCII-like) — suffisant pour débloquer les stories. Le prestataire UX produira les maquettes Figma pendant S1-S2.

### P1 — Onboarding bundle Épargne + Santé J+1 (via Moussa)

**Écran 1 : Moussa — Nouvelle cliente**

```
┌─────────────────────────────┐
│  [←] Nouvelle cliente    🔊  │  AppHeader agent
├─────────────────────────────┤
│                             │
│   Étape 1 / 4  ○●●●         │  StepProgress
│                             │
│   Prénom : [Fatou________]  │  FormField
│   Nom    : [Diallo_______]  │
│   Tél    : [07 XX XX XX ]   │
│                             │
│   [ Continuer ]             │  PrimaryButton
│                             │
└─────────────────────────────┘
```

**Écran 2 : Scan CNI + selfie**

```
┌─────────────────────────────┐
│  [←] Vérification     🔊    │
├─────────────────────────────┤
│   Étape 2 / 4  ○○●●         │
│                             │
│   [ 📷 Scan CNI recto    ]  │  PrimaryButton
│   [ 📷 Scan CNI verso    ]  │
│   [ 📷 Selfie de Fatou  ]   │
│                             │
│   🔒 Données chiffrées      │  Reassurance
│                             │
└─────────────────────────────┘
```

**Écran 3 : OTP**

```
┌─────────────────────────────┐
│  [←] Vérifie son numéro  🔊 │
├─────────────────────────────┤
│   Étape 3 / 4  ○○○●         │
│                             │
│   Fatou a reçu un code SMS  │
│   Demande-lui de le saisir  │
│                             │
│   [ _ ][ _ ][ _ ][ _ ]      │  OTP input
│                             │
│   [ Valider ]               │
│                             │
└─────────────────────────────┘
```

**Écran 4 : 🌟 BUNDLE SANTÉ J+1 🌟 (écran critique)**

```
┌─────────────────────────────┐
│  [←] Protège ta famille 🔊  │
├─────────────────────────────┤
│   Étape 4 / 4  ○○○○✓        │
│                             │
│   ╔═══════════════════════╗ │
│   ║  [Illustration famille]║ │
│   ║                        ║ │
│   ║  Protège ta famille    ║ │
│   ║  dès demain           ║ │  BundleProposal
│   ║                        ║ │  (violet soft)
│   ║  Formule Famille       ║ │
│   ║  50 FCFA / jour        ║ │
│   ║  Consultations + méd.  ║ │
│   ║                        ║ │
│   ║  💡 Tu peux annuler    ║ │
│   ║     sous 24h sans frais║ │
│   ╚═══════════════════════╝ │
│                             │
│   [ Accepter Famille    ]   │  PrimaryButton violet
│   [ Voir les autres    ]    │  SecondaryButton
│   [ Plus tard           ]   │  Link muted
│                             │
└─────────────────────────────┘
```

**Écran 5 : Premier dépôt + confirmation**

```
┌─────────────────────────────┐
│  Bienvenue Fatou! 🎉        │
│                             │
│   500 FCFA épargnés  ✓      │  AmountInput (display)
│   50 FCFA Santé J+1  ✓      │  (succès)
│                             │
│   [Illustration succès]     │
│                             │
│   Ton agent Moussa est ton  │
│   contact quand tu as besoin│
│                             │
│   [ Terminer              ] │
└─────────────────────────────┘
```

→ **Fatou reçoit WhatsApp** : bienvenue + attestation Santé + lien app.

### P2 — Dépôt quotidien autonome

**Écran 1 : Accueil**

```
┌─────────────────────────────┐
│  KOTIZ        Akwaba Fatou🔊│
├─────────────────────────────┤
│                             │
│   ╔══════════════════════╗  │
│   ║  Mon épargne         ║  │  DepositCard
│   ║  12 400 FCFA         ║  │  (gold-dark)
│   ║                      ║  │
│   ║  3 ⭐  Régulière     ║  │  StarRating
│   ║  🔥 12 jours         ║  │  StreakBadge
│   ╚══════════════════════╝  │
│                             │
│   [    + Cotiser        ]   │  PrimaryButton (FAB-like)
│                             │
│   🎯 École des enfants      │  GoalCard
│      7 500 / 50 000 FCFA    │
│      ████░░░░░░ 15%         │
│                             │
│   🏥 Santé Famille active   │  Badge violet
│                             │
│ [🏠] [💰] [🏥] [⭐]         │  TabBar
└─────────────────────────────┘
```

**Écran 2 : Cotiser**

```
┌─────────────────────────────┐
│  [←] Cotiser           🔊   │
├─────────────────────────────┤
│                             │
│   Combien aujourd'hui ?     │
│                             │
│   ┌──────────────────────┐  │
│   │     500 FCFA         │  │  AmountInput (display)
│   └──────────────────────┘  │
│                             │
│   [100] [500] [1000] [Autre]│  Quick chips
│                             │
│   Pour quel objectif ?      │
│   ● École des enfants      │  Radio
│   ○ Stock Tabaski          │
│                             │
│   Comment payer ?           │
│   ● Orange Money            │
│   ○ Wave                    │
│   ○ MTN MoMo                │
│                             │
│   [ Cotiser 500 FCFA    ]   │
└─────────────────────────────┘
```

**Écran 3 : Confirmation (+ son KOTIZ)**

```
┌─────────────────────────────┐
│                             │
│      [Illustration succès]  │
│                             │
│      ✓ 500 FCFA épargnés    │  Success message
│                             │
│      🔥 Streak +1 = 13 jours│  StreakBadge
│                             │
│      Plus que 50 FCFA       │  Progress toward next star
│      pour 4 ⭐              │
│                             │
│      [ Retour à l'accueil ] │
│      [ Cotiser encore     ] │
└─────────────────────────────┘
```

### P4 — Évolution Score + Santé préférentielle

**Écran 1 : Notification WhatsApp + push (event)**

> Push : « Fatou, tu es passée à 4 ⭐ ! Tu débloques -10% sur Confort. »

**Écran 2 : Mon Score (dans l'app)**

```
┌─────────────────────────────┐
│  [←] Mon Score         🔊   │
├─────────────────────────────┤
│                             │
│   ⭐⭐⭐⭐☆                  │  StarRating animé
│   4 étoiles · Confirmée     │  (transition gold)
│                             │
│   Tu es passée de 3 à 4 ⭐  │  Success toast
│                             │
│   🎁 Nouvel avantage :      │
│   ╔══════════════════════╗  │
│   ║ -10% sur Confort     ║  │  Card violet
│   ║ [ Activer maintenant ]║  │
│   ╚══════════════════════╝  │
│                             │
│   Prochain palier : 5 ⭐    │
│   Priorité crédit + terrain │
│   ░░░░░░░░░░ 72 / 200 pts   │  Progress bar
│                             │
│   [ Comprendre mon score ]  │
└─────────────────────────────┘
```

**Écran 3 : Comprendre mon score (détail composantes)**

```
┌─────────────────────────────┐
│  [←] Mon score en détail 🔊 │
├─────────────────────────────┤
│                             │
│   Régularité (40%)    A     │  Component rows
│   ████████░░ 28 / 30 jours  │
│                             │
│   Stabilité (25%)     B+    │
│   ██████░░░░                │
│                             │
│   Ancienneté (20%)    C     │
│   Depuis 3 mois             │
│                             │
│   Engagement (15%)    A     │
│   App, WhatsApp, agent      │
│                             │
│   💡 Si tu cotises 7 jours  │
│      de suite, tu gagnes    │
│      +15 points             │
└─────────────────────────────┘
```

### P5 — Alerte AML et STR (admin Ibrahima)

**Écran 1 : Dashboard admin**

```
┌──────────────────────────────────────────────┐
│  KOTIZ Admin                Ibrahima · Ops   │
├──────────────────────────────────────────────┤
│                                              │
│  ▲ 3 alertes AML à traiter        [Voir]   │  AlertCard (warn)
│  ● 12 KYC Tier 2 en attente       [Voir]   │
│  ● 2 agents suspendus aujourd'hui [Voir]   │
│                                              │
├─ QUEUE AML (priorité haute) ────────────────┤
│                                              │
│  ┌─────────────────────────────────────┐    │
│  │ Cliente #4421 — pattern erratique   │    │  AlertCard
│  │ 3 cash-in 150k FCFA / 1h            │    │
│  │ Agent : Moussa Koné                 │    │
│  │ Détection : il y a 8 min            │    │
│  │                          [Investiguer]   │    │
│  └─────────────────────────────────────┘    │
│                                              │
│  ┌─────────────────────────────────────┐    │
│  │ Cliente #3217 — liste sanctions ONU │    │
│  │ ...                                  │    │
│  └─────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

**Écran 2 : Investigation + rédaction STR**

```
┌──────────────────────────────────────────────┐
│  [←] Alerte AML #4421             Statut: 🟡 │
├──────────────────────────────────────────────┤
│                                              │
│  Cliente : Fatima Kouakou  (ID 4421)         │
│  Agent   : Moussa Koné      (ID 112)         │
│                                              │
│  ── Détails de l'alerte ─────────────        │
│  Détection  : 2026-05-03 14:32               │
│  Pattern    : 3 cash-in > 100k FCFA / 1h     │
│  Montant    : 450 000 FCFA cumulés           │
│  Historique : [voir 30 derniers jours]       │
│                                              │
│  ── Décision ──────────────────────          │
│  ○ Faux positif — classer                    │
│  ● Suspect — suspendre + STR                 │
│  ○ À escalader (> 500k → Risk)               │
│                                              │
│  ── Rédaction STR CENTIF-CI ────             │
│  Motif : [dropdown — blanchiment suspect]    │
│  Faits : [textarea pré-rempli]               │
│  Pièces jointes : [+]                        │
│                                              │
│  ⚠️ Délai légal : envoyer sous 24h            │
│                                              │
│  [Suspendre + Envoyer STR]  [Sauver brouillon]│
└──────────────────────────────────────────────┘
```

### P7 — Anti-churn 3 jours

**Événement** : Fatou n'a pas cotisé depuis 3 jours.

**Écran Fatou — Push WhatsApp vocal**

> (message vocal dioula) « Akwaba Fatou, même 100 FCFA aujourd'hui ça compte. Tu es à 2 jours de perdre ta série de 12 jours. Ton école des enfants avance bien. »
> [Accompagné de la photo qu'elle a uploadée à l'onboarding]

**Écran Fatou — Si elle ouvre l'app**

```
┌─────────────────────────────┐
│  Akwaba Fatou 🔊            │
├─────────────────────────────┤
│                             │
│   [Photo "École enfants"]   │  Photo emotional anchor
│                             │
│   Ta série : 12 jours       │  Emphase
│   Plus que 2 jours pour     │
│   ne pas la perdre          │
│                             │
│   Même 100 FCFA suffisent   │
│                             │
│   [ Cotiser 100 FCFA    ]   │  PrimaryButton (facilité)
│   [ Plus tard           ]   │
│                             │
└─────────────────────────────┘
```

**Écran Moussa — App agent**

```
┌─────────────────────────────┐
│  ⚠️ 3 clientes à visiter    │
├─────────────────────────────┤
│                             │
│  ● Fatou Diallo             │
│    Sans dépôt depuis 3j     │
│    [Voir · Appeler ]        │  AlertCard
│                             │
│  ● Awa Traoré               │
│    Sans dépôt depuis 4j     │
│    [Voir · Appeler ]        │
│                             │
└─────────────────────────────┘
```

---

## 5. Écrans de référence par UI

### 5.1 App Client (Fatou) — 3 écrans

**E1. Accueil** — cf. P2 écran 1 ci-dessus (carte solde + streak + étoiles + objectif + bundle Santé actif).

**E2. Mon Score** — cf. P4 écran 2.

**E3. Mon agent**

```
┌─────────────────────────────┐
│  [←] Mon agent         🔊   │
├─────────────────────────────┤
│                             │
│   [Photo Moussa - avatar]   │
│                             │
│   Moussa Koné               │
│   Adjamé-Marché, zone 3     │
│                             │
│   ⭐ 4,8 / 5 (82 clientes)  │
│   Depuis 8 mois avec KOTIZ  │
│                             │
│   [ 💬 Écrire sur WhatsApp ]│
│   [ 📞 Appeler              ]│
│   [ 📍 Voir sur la carte    ]│
│                             │
│   ── Mes 3 derniers dépôts ─│
│   500 FCFA (il y a 2 h)    │
│   500 FCFA (il y a 1 j)    │
│   ...                       │
└─────────────────────────────┘
```

### 5.2 App Agent (Moussa) — 3 écrans

**E1. Dashboard**

```
┌─────────────────────────────┐
│  Moussa K. · Adjamé    🚪   │
├─────────────────────────────┤
│                             │
│   Aujourd'hui               │
│   ┌─────────┬─────────┐     │
│   │ 47 tx   │ 8 450   │     │  KPI cards
│   │ dépôts  │ FCFA    │     │
│   │         │ comm.   │     │
│   └─────────┴─────────┘     │
│                             │
│   Float cash   125 000 FCFA │
│   Plafond jour 89 % utilisé │  Warning level
│                             │
│   ⚠️ 3 clientes à visiter   │  AlertCard
│                             │
│   [ + Nouvelle cliente    ] │  PrimaryButton
│   [ 💵 Cash-in            ] │
│   [ 💸 Cash-out           ] │
│                             │
│ [📊] [👥] [💵] [⚙️]          │  TabBar
└─────────────────────────────┘
```

**E2. Nouvelle cliente** — cf. P1 ci-dessus (écrans 1-5 du parcours).

**E3. Mes clientes**

```
┌─────────────────────────────┐
│  [←] Mes clientes (82) 🔍   │
├─────────────────────────────┤
│                             │
│  ⚠️ À visiter (3)           │
│  Fatou Diallo · 3j sans dép.│
│  Awa Traoré · 4j            │
│                             │
│  ── Toutes mes clientes ────│
│                             │
│  Fatou D. · 4⭐ · 12 400 FCFA│  ListItem
│  Awa T.   · 3⭐ · 8 200     │
│  Aminata K.· 5⭐ · 45 000   │
│  ...                        │
│                             │
└─────────────────────────────┘
```

### 5.3 Console Admin Web (Ibrahima) — 3 écrans

**E1. Dashboard** — cf. P5 ci-dessus.

**E2. Queue KYC Tier 2**

```
┌──────────────────────────────────────────────┐
│  KOTIZ Admin · Queue KYC Tier 2+             │
├──────────────────────────────────────────────┤
│                                              │
│  Filtres : [Tous] [< 6h] [Urgent] [Retenus]  │
│                                              │
│  ┌──────┬─────────┬──────┬─────────┬──────┐ │
│  │ ID   │ Cliente │ Motif│ Âge     │ Action│ │
│  ├──────┼─────────┼──────┼─────────┼──────┤ │
│  │ 4421 │ Fatima K│ Soldel│ 2h      │ [Voir]│ │
│  │ 4425 │ Awa T.  │ TranzM│ 1j      │ [Voir]│ │
│  └──────┴─────────┴──────┴─────────┴──────┘ │
│                                              │
│  Délai cible : < 24h. 2 dossiers > 24h ⚠️    │
│                                              │
└──────────────────────────────────────────────┘
```

**E3. Rapport BCEAO mensuel (génération)**

```
┌──────────────────────────────────────────────┐
│  Rapports réglementaires                     │
├──────────────────────────────────────────────┤
│                                              │
│  Mois : [Avril 2026 ▼]  Type : [BCEAO M ▼]   │
│                                              │
│  Contenu généré :                            │
│  • Volume wallet : 42,8 M FCFA               │
│  • Transactions : 18 452                     │
│  • Nouvelles ouvertures : 312                │
│  • Incidents sécurité : 0                    │
│  • STR envoyés : 3                           │
│                                              │
│  [ Prévisualiser PDF ]                       │
│  [ Signer + envoyer BCEAO ]                  │
│                                              │
│  Audit trail : signature numérique + horodatage│
└──────────────────────────────────────────────┘
```

---

## 6. Matrice composants × surface

Qui utilise quels composants ?

| Composant         | Client (Fatou)          | Agent (Moussa)           | Admin (Ibrahima)           |
| ----------------- | ----------------------- | ------------------------ | -------------------------- |
| `AppHeader`       | ✅                      | ✅                       | ✅ (variante web)          |
| `TabBar`          | ✅ 4 tabs               | ✅ 4 tabs                | ❌ (nav web latérale)      |
| `BottomSheet`     | ✅                      | ✅                       | ❌ (modale desktop)        |
| `PrimaryButton`   | ✅                      | ✅                       | ✅                         |
| `SecondaryButton` | ✅                      | ✅                       | ✅                         |
| `IconButton`      | ✅                      | ✅                       | ✅                         |
| `AudioToggle`     | ✅                      | ⚠️ optionnel             | ❌                         |
| `DepositCard`     | ✅ (hero accueil)       | ❌                       | ❌                         |
| `GoalCard`        | ✅                      | ❌                       | ❌                         |
| `StarRating`      | ✅                      | ✅ (vue cliente)         | ✅ (liste)                 |
| `StreakBadge`     | ✅                      | ✅ (alerte anti-churn)   | ❌                         |
| `AmountInput`     | ✅                      | ✅                       | ❌ (masked input)          |
| `Toast`           | ✅                      | ✅                       | ✅                         |
| `EmptyState`      | ✅ (illustrations afro) | ✅ (illustrations agent) | ✅ (illustrations neutres) |
| `LoadingSkeleton` | ✅                      | ✅                       | ✅                         |
| `BundleProposal`  | ✅ (parcours P1)        | ✅ (pitch agent)         | ❌                         |
| `AlertCard`       | ⚠️ variantes simples    | ✅ (anti-churn)          | ✅ (AML hero)              |

**Design system = un seul repo de composants partagé** entre les 3 UIs, avec props `variant` pour adapter la densité/couleur selon la surface.

---

## 7. Son KOTIZ (signature sonore)

4 sons à produire (brief prestataire sound designer) :

| Événement                                | Durée | Style                                                         |
| ---------------------------------------- | ----- | ------------------------------------------------------------- |
| Dépôt réussi                             | 0,5 s | Djembé kick subtil + note claire ascendante                   |
| Streak +1 (7/30/90j)                     | 0,4 s | Cloche légère + souffle de percussion                         |
| Palier étoile franchi (niveau supérieur) | 1,0 s | Glissando ascendant 3 notes + percussion discrète célébration |
| Erreur paiement                          | 0,4 s | Note descendante teal (doux, pas agressif)                    |

**Priorité MVP** : les 2 premiers (dépôt + streak). Le palier étoile et l'erreur peuvent être ajoutés au sprint 6.

**Sources recommandées** : sound designer ivoirien local (budget ~200 K FCFA) ou bibliothèque Artlist/Motion Array (20 $/mois).

---

## 8. Prochaines étapes (après MVP)

Ce skeleton UX sera enrichi par le prestataire UX pendant S1-S2 avec :

- **Maquettes Figma haute fidélité** de tous les écrans (20-30 écrans client + 15 agent + 10 admin)
- **Prototypes interactifs** testables avec 10 clientes à Adjamé (parcours P1, P2, P4, P7)
- **Design tokens en code** (`design-tokens.json` pour React Native / Expo + Web)
- **Illustrations afro-modernes** (15-20 empty states + onboardings)
- **Tests d'accessibilité réels** avec utilisatrices analphabètes partielles + TalkBack
- **3 UI Briefs finaux** : `KOTIZ_UI_Brief_Client.docx`, `_Agent.docx`, `_Admin.docx` (livrables prévus par l'ancien `INDEX.md`, archivé dans `KOTIZ/_archive/2026-10-docs-avant-migration/`)

---

_Document interne confidentiel — Ne pas diffuser sans autorisation écrite._
_Version 1.0 — UX Skeleton · 23 avril 2026 · © KOTIZ SAS, Abidjan._
