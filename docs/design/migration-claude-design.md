# KOTIZ — Préparation de la migration vers Claude Design

Date : 19 octobre 2026. Compagnon de [`DESIGN.md`](../../DESIGN.md). Source : Figma `Ejhn5axhlQERtHPKYQ39gp`, lu en lecture seule le 19 octobre (aucune mutation). Rien n'est publié dans Claude Design avant validation de `DESIGN.md` par le PO.

## 1. Revérification de l'audit du 11 octobre sur le Figma live

| Constat | Verdict au 19 oct. | Preuve live |
|---|---|---|
| F01 navigation | **Confirmé** | `28:1538` et `185:957` : Accueil / Santé / Score / Profil. Corrigé dans `DESIGN.md` (Layout › Navigation MVP). |
| F02 masquage et vocabulaire | **Confirmé** | Variante masquée `13:588` : solde en `••• •••` mais « 12 500 F » (Épargné ce mois-ci) visible ; accueil masqué `13:1021` : 12 montants restent lisibles (projet, %, reste, mouvements). Libellé « Épargne disponible » dans `28:931`. Corrigé dans `DESIGN.md` (Carte solde). |
| F03 progression désynchronisable | **Confirmé** | `13:639` : « 65 % » est une propriété TEXT ; barre `13:637` 207 px sur 318 px, seul le remplissage est lié à une variable. Nuance : le prototype d'affectation a déjà des variables `progress`, `barWidth`, `remainingText`. Corrigé dans `DESIGN.md` (Carte projet). |
| F04 largeurs et textes longs | **Confirmé** | Onglets en FIXED 91,5 ; conteneur titre projet 240 FIXED avec `clipsContent` et texte en WIDTH_AND_HEIGHT. Navigation corrigée par F01 (Fill) ; titre projet signalé dans `DESIGN.md`. |
| F05 états du bouton | **Confirmé** | `37:1101` : une seule propriété *Appearance* = Primary / Secondary / Disabled / Pressed / Loading. |
| F06 code SMS/PIN | **Confirmé** | `158:916` : seule variante *Chiffres* = 4 / 6, aucune variante d'état, description vide. |
| F07 statut non protégé | **Confirmé** | `158:917` : titre, détail et icône (INSTANCE_SWAP) indépendants, aucune valeur préférée. Titre en 24 et détail en 14 non liés aux styles de texte. |
| F08 confirmation et résultats génériques | **Confirmé** | `66:591` : seulement *Titre* et *Description* ; `66:652` : Succès / Erreur. Aucun résultat « Compte créé » ni « Fiche créée ». |
| F09 finitions hors contrat | **Confirmé** | Touche `211:994` : 108 × 52, rayon 8 brut, seul le remplissage est lié ; aucune propriété. Même rayon 8 sur les montants rapides `211:988`. |
| F10 documentation et réemploi | **Confirmé** | Index `13:460` : 11 familles, ajouts (code, clavier, zone tactile, navigation active, logos) hors sections ; guide `75:1044` annonce « zones tactiles de 44 » ; propriétés de `13:639` nommées par leurs valeurs (« 65 % », « Rentrée des enfants ») ; description de `120:866` « Illustration vectorielle » alors que `115:192` contient un rectangle « PNG transparent ». |

Aucun constat infirmé. Trois constats nouveaux, hors F01-F10 :

- **N1 — information essentielle sous 14 pt.** « Non débité » en 11 et « Échoué · … » en 12 dans `25:1058` ; libellés de navigation en 12. La règle Figma (« les notes de 11 ne portent jamais une information essentielle ») et `PRODUCT.md` (14 pt minimum) ne sont pas respectées par ce master.
- **N2 — pas de couleur d'attente.** Aucune variable pour « en attente » / avertissement. Le chargement s'appuie sur `surface-canvas` + indicateur.
- **N3 — tokens du code divergents.** `packages/design-tokens/tokens.json` et `ux-design-specification.md` §1 (navy, teal, or, violet) ne correspondent pas aux variables Figma Direction 04 (`#00564D`, `#253238`, `#F3F4F6`…).

Les écrans de référence de l'accueil (`13:945`, `13:1021`, `13:658`) sont sur la page **99 — Archives et explorations** (section « ARCHIVE / 2026-10-08 / Propositions avant validation » pour les deux premiers). La page **03 — Parcours mobile** ne contient que le pilote `234:437` (Alimenter une épargne).

## 2. Avis expert sur l'accueil Direction 04

> Proposition du 19 octobre ; **points 1 à 6 validés par le PO le 19 octobre 2026** (voir §4) et reportés dans `DESIGN.md`. Le point 7 relève de la spec UX des parcours.

Inspecté : `13:945` (accueil), `13:1021` (masqué), `13:658` (planche Direction 04).

### Ce qu'on garde
1. **La carte verte solde + QR** : c'est l'identité. Un seul aplat vert sur l'écran, le montant en 34 Bold blanc, le QR sur fond blanc. On reconnaît KOTIZ dès l'ouverture.
2. **Les trois raccourcis illustrés** (Déposer, Retirer, Épargnes) : grands, libellés visibles, illustrations propres à KOTIZ. C'est la chaleur à la Djamo, sans texte à lire.
3. **Le canvas gris clair, les cartes plates sans ombre, le vert réservé** : c'est ce qui donnait l'effet « premium épuré » perdu ensuite. À garder sur tous les écrans.
4. **L'en-tête « Akwaba, Fatou »** avec le logo et la cloche en bouton 48 : ton juste, une phrase courte.

### Ce qu'on fait évoluer
1. **« Solde disponible » à la place de « Épargne disponible »** et masquage de tous les montants (F02, déjà dans `DESIGN.md`).
2. **La ligne « Épargné ce mois-ci »** : c'est un deuxième chiffre dans la carte, en 12 et 14, qui concurrence le solde. Proposition : la retirer de la carte, ou la garder seulement si le PO y tient comme signal d'encouragement, et alors la masquer avec le solde.
3. **Le QR prend presque la moitié de la carte.** Au marché, Fatou ouvre l'app d'abord pour voir combien elle a. Proposition : garder le QR mais le réduire (vignette + « Mon QR » qui ouvre la vue agrandie `17:951`), pour que le solde occupe la largeur et puisse afficher des montants à 7 chiffres sans réduire la police. L'audit ne demande pas de réduire le QR : c'est un arbitrage PO.
4. **« Ton prochain projet »** : une carte grise avec illustration, montant, %, barre et phrase de reste, c'est dense pour une lecture partielle. Proposition, dans l'esprit Revolut : une seule ligne forte (nom + « 32 500 F sur 50 000 F ») et la barre ; la phrase « Encore 17 500 F… » passe sur le détail de l'épargne. Sans épargne, un état vide illustré (Djamo) qui propose d'en créer une, sans l'imposer.
5. **« Derniers mouvements »** : le statut d'une opération échouée est en 11 et 12 (N1). Proposition : statut en mots en 14 (« Échoué », « En attente », « Réussi »), montant aligné à droite en chiffres tabulaires, trois lignes au maximum, lignes séparées par un espace plutôt que par des pastilles colorées partout (Revolut : la couleur seulement sur l'exception).
6. **La barre basse passe à Accueil / Épargnes / Opérations / Profil** (F01). Il manque deux icônes fonctionnelles (Épargnes, Opérations) dans la famille `82:220` : à dessiner dans le style des existantes.
7. **La saisie du montant reste hors de l'accueil.** L'accueil ne fait qu'ouvrir Déposer / Retirer ; l'écran de saisie suit Wave : montant énorme centré, devise à côté, montants rapides, un seul bouton. C'est là que se règle le défaut « montant peu perceptible », pas sur l'accueil.

### Ce qu'on n'ajoute pas
Pas de bannière, de carrousel, de score, d'étoiles ni de promotion sur l'accueil. Chaque ajout repousse les mouvements sous la ligne de flottaison d'un Android 360 px.

## 3. Assets à migrer vers Claude Design

**Migrés le 19 octobre 2026** dans le Design System Claude Design « KOTIZ Design System » (https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134), avec les tokens de `DESIGN.md` et 10 composants. Restent à faire : icônes Épargnes, Opérations et horloge (à dessiner) ; Wave, MTN MoMo et Moov Money en PNG 64 × 48 (à réexporter en meilleure définition) ; illustrations de résultat en PNG 350 × 292. L'ancien Design System « KOTIZ » du 2 octobre (palette v2) est conservé tel quel, il ne fait plus foi.

Tous sont sur les pages `01 — Identité et illustrations` (`75:1119`) et `02 — Composants` (`34:1090`). Les exporter depuis Figma sans les modifier.

### Logo
| Asset | Node |
|---|---|
| Logo · 28 | `17:907` |
| Logo · 36 | `13:528` |
| Logo · 40 | `17:946` |

### Logos opérateurs (officiels, non recolorés, cadre 64 × 48)
| Opérateur | Node | Remarque |
|---|---|---|
| Wave | `225:959` | **Symbole seul (pingouin), sans inscription** — conforme |
| Orange Money | `225:961` | Symbole extrait du logo officiel |
| MTN MoMo | `225:963` | Logo officiel |
| Moov Money | `225:965` | Logo officiel |

Authenticité par rapport aux sources officielles non recertifiée (déjà noté par l'audit) ; liste des opérateurs proposés à confirmer avec le partenaire.

### Actions illustrées (48) et tailles liées
| Asset | Node |
|---|---|
| Déposer · 48 / 32 / 56 | `13:463` / `17:854` / `17:912` |
| Retirer · 48 / 32 / 56 | `13:474` / `27:1085` / `17:923` |
| Projet · 48 / 56 | `13:484` / `17:933` |
| Scolarité · 48 / 36 / 56 | `13:490` / `17:847` / `17:939` |
| Épargnes · 48 | `23:1398` |

### Illustrations d'objectif (48)
Santé `23:1518`, Logement `23:1524`, Commerce `23:1531`, Voyage `23:1538`, Véhicule `23:1545`, Événement `23:1553`, Précaution `23:1560`.
Catalogue en contexte : `23:1567`.

### Illustrations de résultat (personnage)
| Asset | Node | Nature |
|---|---|---|
| Projet créé — original sans plante | `115:192` | PNG transparent (`125:192`) ; la version vectorielle `115:193` est masquée |
| Création indisponible | `128:192` | PNG transparent |
| Masters composés : Épargne créée / Création indisponible | `120:866` / `129:871` | Utilisent les deux PNG ci-dessus |

### Icônes fonctionnelles (24) et indicateurs (20)
Accueil `13:498`, Profil `13:508`, Notification `13:512`, Visibilité `13:515` (et 18 : `17:840`), Retour `13:519`, Agrandir `13:522` (et 12 : `17:844`), Suivant `13:525`, Échec `28:1095`.
Indicateurs : Chargement `65:417`, Validation `65:423`, Information `66:526`.
À archiver sans migrer dans la barre MVP : Santé `13:501`, Score `13:505`.
**À créer** : icônes Épargnes et Opérations pour la navigation MVP, et horloge pour le statut d'attente.

### QR de démonstration (non transactionnel)
Accueil · 128 `13:533`, Vue agrandie · 332 `17:951`.

### Écrans de référence (capture, pas reconstruction)
Accueil `13:945`, accueil masqué `13:1021`, planche Direction 04 `13:658`, pilote parcours `234:437`.

## 4. Questions ouvertes pour le PO

1. ~~Couleur de l'état « en attente » (N2)~~ : **tranché le 19 octobre** — ambre `text-pending` `#8A5300` sur `surface-pending` `#FDF1DC` + horloge + mot ; corail réservé aux illustrations ; vert `#00564D` du Figma confirmé comme source. Reporté dans `DESIGN.md`.
2. ~~Arrondi du pourcentage et au-delà de 100 %~~ : **tranché le 19 octobre** — entier inférieur (jamais 100 % avant la cible) ; cible atteinte ou dépassée : « Objectif atteint ✓ », barre pleine, montant réel, jamais plus de 100 %. Reporté dans `DESIGN.md`.
3. ~~Périmètre du masquage~~ : **tranché le 19 octobre** — persistance sur Accueil, Épargnes et Opérations ; saisie et récapitulatif toujours visibles. Reporté dans `DESIGN.md`.
4. ~~Texte 12~~ : **tranché le 19 octobre** — 12 uniquement pour les libellés de la barre basse et les dates ; statuts, montants, consignes en 14 minimum ; « Non débité » (`25:1058`) passe en 14. Reporté dans `DESIGN.md`.
5. ~~Alignement de `packages/design-tokens`~~ : **tranché le 19 octobre** — chantier code séparé, issue à ouvrir plus tard, non bloquant pour le design.
6. ~~Points 2 à 5 de l'avis expert~~ : **validés le 19 octobre** — « Épargné ce mois-ci » retiré de la carte solde ; QR ~~en vignette, solde en pleine largeur~~ (remplacé le même jour par la carte « P3 · contexte réel » : fond vert profond, arc ton sur ton, **QR toujours à droite** avec logo K, ligne « Dernier dépôt » avec statut) ; carte projet allégée (nom + « X F sur Y F » + barre, phrase de reste sur le détail) ; statuts des mouvements en mots en 14. Icônes Épargnes, Opérations et horloge à dessiner dans le style existant. Reporté dans `DESIGN.md`.

Aucune question ouverte restante sur le design system.
