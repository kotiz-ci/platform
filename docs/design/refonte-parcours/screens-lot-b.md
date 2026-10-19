# Écrans — Refonte des parcours, lot B : épargne et retour au solde

Date : 19 octobre 2026. Statut : maquettes à valider par le PO (aucun écran validé).

Outil : Claude Design (type Design). Lien : canvas unique de l'app cliente [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), page « Lot B — Épargne et retour au solde ». Il est privé : à partager depuis le menu Partager pour la conjointe. Depuis le 19 octobre 2026 (décision PO), tous les lots vivent dans ce canvas, qui s'ouvre sur la planche Pilotage.
Archive : l'ancien canvas [KOTIZ — Lot B épargne et retour au solde](https://claude.ai/artifact/JXZsUvk1QcnGo9QsiKMRdF) (version 6) reste en ligne comme version de référence, marqué « Archivé le 19 octobre 2026 ». On ne le modifie plus : la critique et le test du lot B se font dans le canvas unique.
Design system : [DESIGN.md](../../../DESIGN.md) (racine) et [KOTIZ Design System](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134). La version `1792410187-4206` (v9, 19 octobre) est installée une seule fois dans le canvas unique, partagée avec le lot A. Les assets sont copiés une fois pour les deux lots.
Sources : [ux-spec-lot-b.md](ux-spec-lot-b.md) (fait foi pour parcours, écrans, états et décisions PO Q1 à Q12), [test-lot-b.md](test-lot-b.md), [brief.md](brief.md). Conventions reprises du lot A : [screens.md](screens.md), [critique.md](critique.md).

## Comment c'est construit

- **Même construction que le lot A.** Un seul composant d'écrans (`B-Proto.dc.html`, ex-`Main.dc.html` de l'ancien canvas) contient tous les écrans B01 à B16, plus H01 et E08 en raccord. Chaque planche l'affiche dans un état donné, si bien qu'un écran a la même apparence partout, prototype compris.
- **Prototype cliquable unique.** `Main.dc.html`, sur la page Pilotage du canvas, propose dans un seul menu les parcours du lot A et les 8 parcours du lot B (B-P1 à B-P8), avec quatre variantes : B-P1′ (depuis E08), B-P5′ (retour en attente), B-P5″ (retour échoué puis Réessayer) et B-P7′ (limite atteinte depuis le lot C). Une bande sombre en haut, hors produit, rappelle le parcours (« B-P5 Remettre sur mon solde ») et ramène au menu. Convention de nommage du canvas unique : voir [screens.md](screens.md).
- **Raccords réels avec le lot A.** E08 et l'accueil du lot A ouvrent le lot B (B02, B01 ou B07) ; la bande affiche alors « A-P1 → lot B ». Depuis B02, la flèche retour ramène à l'écran du lot A d'origine. « Mon QR » (carte solde de H01) ouvre Q01 du lot A. « Mettre de l'argent » reste « Bientôt ici » (lot C).
- **Planches du lot B** (page « Lot B — Épargne et retour au solde », statut « En cours — maquettes ») : `B-B01`, `B-B02-B03`, `B-B04`, `B-B05-B06`, `B-B07`, `B-B08-B16`, `B-B09-B11`, `B-B12`, `B-B13-B15`, `B-Raccords`, `B-Largeur-320`, plus `B-Proto` (le composant) ; titres « B · B07 Détail d'une épargne — 9 états », etc. Mêmes positions et même rendu que dans l'ancien canvas.
- **Composants.** Chaque écran est composé avec les composants du Design System : `PageHeader`, `HomeHeader`, `BalanceCard`, `Shortcuts`, `InfoLine`, `GoalRow`, `TransactionRow`, `Message`, `StatusPill`, `StepTracker`, `OperationStatus`, `IllustratedResult`, `IconPastille`, `TextField`, `PinSlots` + `PinPad`, `Button`, `BottomSheet`, `BottomNav`.
  - Ce qui manque est construit dans le canvas, dans `kotiz-app.css` (préfixe `lb-`), avec des tokens seulement. Ce sont les candidats listés plus bas.
  - `kotiz-app.css` est commune à tous les lots (elle remplace `lot-a.css` et `lot-b.css`) : cadre d'écran, rôles de texte, bande et menu communs ; une règle propre à un lot est limitée à `.la-root.lot-a` / `.lot-b`.
- **Données fictives**, annoncées dans le menu et sur le canvas :
  - personnage Fatou Koné, PIN 2468, solde disponible 12 400 FCFA ;
  - École Awa : 45 000 / 100 000 F, date le 30 juin 2027 ;
  - Boutique : 8 000 / 50 000 F ;
  - Tabaski : 52 000 / 50 000 F, objectif atteint (scénario 3 actives) ;
  - Moto : fermée le 12 oct.
  
  Ce sont les données de `test-lot-b.md`. La référence du reçu est marquée « (fictive) ».
- **Formats.** 360 × 800. Une planche de contrôle à 320 de large reprend B01, B02, B07 (montant à 7 chiffres), B09, B10 et B12.
- **Paramètres non tranchés.** Ils sont notés dans des notes orange sous les planches : frais (G01), minimums, PIN (G02), aide (G03), création idempotente, longueurs.

## Écrans

| ID | Écran | Maquette | États couverts | Statut | Écarts |
|---|---|---|---|---|---|
| B01 | Mes épargnes (racine) | Planche B01 | vide, 2 actives + Fermées, 3 actives (limite, objectif atteint), masqué, fermées seulement, après fermeture (message une fois), hors connexion | à valider | État vide avec bouton principal « Crée ta première épargne » dans le contenu (racine avec barre basse). Chargement (squelette) non dessiné |
| B02 | Choisis le type | Planche B02-B03 | nominal, retour avec type marqué | à valider | Grille 2 colonnes de 9 types, cible ≥ 96 de haut. Pas de bouton : toucher = suite (spec) |
| B03 | Montant cible | Planche B02-B03 | vide (inactif + raison), saisi clavier ouvert, 0 (erreur) | à valider | Libellé du champ masqué visuellement (le titre pose la question), lu par TalkBack. Aide « C'est le montant que tu veux atteindre. » sous le trait quand le montant est valide |
| B04 | Vérifie ton épargne | Planche B04 | sans personnalisation, avec nom/date/note, même nom qu'une active (Q11), création en cours, échec connu, résultat inconnu (En attente + « Vérifier à nouveau »), hors connexion | à valider | Ligne Type affichée seulement avec un nom personnalisé (spec) : sans nom, changer de type passe par ←. « Limite atteinte entre-temps » ouvre B15 (dans le prototype, pas en planche) |
| B05 | Personnaliser | Planche B05-B06 | vide, rempli, date passée refusée | à valider | **Écart** : « Valider » est désactivé tant que la date est passée (règle commune « bouton désactivé + raison ») ; la spec dit « toujours actif ». Sélecteur de date du navigateur dans le prototype |
| B06 | Ton épargne est créée | Planche B05-B06 | succès | à valider | `IllustratedResult` (illustration « Projet créé » du DS), bouton principal en bas d'écran |
| B07 | Détail d'une épargne | Planche B07 | partielle, à zéro, objectif atteint, retour en attente, alimentation en attente, modifiée, fermée, masquée, page entière | à valider | Œil aussi sur une épargne fermée (masquage cohérent). Pas d'illustration « objectif atteint » (asset absent) : texte « Objectif atteint ✓ » seul. Retour en attente : la raison s'affiche une fois, sous « Remettre sur mon solde » ; « Fermer » est désactivé lui aussi |
| B08 | Modifier l'épargne | Planche B08-B16 | nominal (Enregistrer inactif), objectif sous l'épargné (aide Q10), nom et date effacés | à valider | Type affiché en ligne « Type : École — ne change pas » avec l'illustration. Erreur d'enregistrement et « fermée entre-temps » non dessinées |
| B09 | Combien remettre ? | Planche B09-B11 | vide, saisi clavier ouvert, Tout remettre, plus que le disponible, disponible changé | à valider | Puce « Tout remettre » élargie, avec un état sélectionné vert doux |
| B10 | Vérifie ton retour | Planche B09-B11 | nominal, retour total | à valider | **Frais : « à confirmer »** (G01). Le prototype laisse passer au PIN ; en production l'autorisation reste bloquée (PRD §7 règle 5). États « frais inconnus » et « refus partenaire » non dessinés |
| B11 | PIN de confirmation | Planche B09-B11 | saisie, PIN incorrect ; envoi dans le prototype | à valider | Mention de secret gardée sous l'erreur (critique lot A #15). Blocage reporté (G02) |
| B12 | Résultat du retour | Planche B12 | fait, fait total avec lien « Fermer cette épargne ? », en attente, incertain, échoué | à valider | `OperationStatus` sur fond canvas. En attente et incertain : ambre + horloge + `StepTracker`, aucun succès. Pas de Réessayer en incertain (RM-FUND-09) |
| B13 | Il reste de l'argent | Planche B13-B15 | nominal | à valider | Montant visible même masqué (Q3) |
| B14 | Fermer l'épargne ? | Planche B13-B15 | depuis le détail à 0, depuis le lien de B12 ; fermeture en cours dans le prototype | à valider | Bouton principal vert « Fermer l'épargne », jamais rouge. Les échecs (« pas fermée », « de l'argent est arrivé ») passent par B07 + Message : non dessinés en planche (le message « de l'argent est arrivé » existe dans le prototype comme variante de B07) |
| B15 | Limite atteinte | Planche B13-B15 | nominal (entrée lot C, sur H01) | à valider | — |
| B16 | Quitter sans enregistrer ? | Planche B08-B16 | nominal | à valider | « Rester » en principal, « Quitter » en secondaire |
| H01, E08 | Raccords du lot A | Planche Raccords | compte neuf (après E08), avec solde sans épargne, avec épargnes, après un retour fait, après un retour en attente, compte créé | — | Carte solde alignée sur le lot A (correction du 19 octobre après commentaire du PO). Compte neuf : 0 FCFA, sans ligne Dernier dépôt, Retirer désactivé avec « Rien à retirer pour l'instant. », ligne d'identité cliquable, « Tes opérations s'afficheront ici. ». Après un retour : le solde n'augmente que si le retour est fait (32 400 F), et la ligne de la carte montre le dernier mouvement entrant (« Depuis École Awa + 20 000 F Fait », ou « En attente » sans changer le solde). Voir la question 7 |
| — | Bientôt ici | Planche Raccords + prototype | Mettre de l'argent (lot C), Opérations, reçu, aide, PIN oublié, Retirer | — | Écran neutre de démonstration, pas un écran produit |

## Parcours du prototype

| Parcours | Départ dans le menu | Chemin attendu |
|---|---|---|
| B-P1 Créer une épargne | B-P1 → H01 sans épargne | « Créer une épargne › » → B02 → B03 → B04 (→ B05 → B04) → Créer mon épargne → B06 → B07 à zéro → ← H01 |
| B-P1′ Depuis Compte créé | B-P1′ → E08 | Créer mon épargne → B02 … B06 → B07 → ← H01 |
| B-P2 Voir mes épargnes | B-P2 → H01 (2 actives) | raccourci Épargnes, onglet Épargnes ou « Tout voir » → B01 ; Moto dans « Fermées » |
| B-P3 Suivre une épargne | B-P3 → B01 (3 actives) | École Awa (Encore 55 000 F), Tabaski (Objectif atteint ✓), Boutique (retour « En attente », Remettre désactivé avec la raison) |
| B-P4 Modifier | B-P4 → B07 École Awa | Modifier → objectif 120 000 → Enregistrer → B07 « Modifications enregistrées. », « Encore 75 000 F » ; changement puis ← → B16 |
| B-P5 Remettre sur mon solde | B-P5 → B07 École Awa | Remettre → 20 000 → B10 → B11 (2468) → B12 Fait → Voir mon solde : 32 400 F |
| B-P5′ Retour en attente | B-P5′ → B07 Boutique | Remettre → Tout remettre → B10 « Boutique sera à 0 F » → PIN → B12 En attente ; B07 bloque un nouveau retour |
| B-P5″ Retour échoué | B-P5″ → B07 École Awa | … → B12 Échoué → Réessayer → B10 → nouveau PIN → B12 Fait |
| B-P6 Fermer | B-P6 → B07 École Awa (25 000 F) | Fermer → B13 → Remettre (Tout remettre prérempli) → B10 → PIN → B12 Fait total → « Fermer cette épargne ? » → B14 → Fermer l'épargne → B01 « École Awa est fermée. » |
| B-P7 Limite | B-P7 → B01 (3 actives) | aucun bouton Créer, message de limite, compteur « 3 sur 3 » |
| B-P7′ Limite depuis le lot C | B-P7′ → H01 + B15 | Voir mes épargnes → B01 |
| B-P8 Masquage | B-P8 → H01 visible | œil de la carte solde → B01 et B07 masqués (barre visible) → Remettre : saisie et récapitulatif visibles |

Le masquage est gardé dans le stockage du navigateur, avec une seule clé pour toute l'app (`kotiz-masque`) : masquer sur l'accueil du lot A masque aussi Épargnes et le détail du lot B, et inversement.

## Contrôle avant rendu

Les contrôles ont été faits sur un rendu local du runtime Design (le même code que le canvas), planche par planche, à 360 et à 320 de large. Un script a vérifié chaque téléphone : nombre de boutons principaux, tailles de texte, cibles, présence de la barre basse et débordement. Les 8 parcours ont aussi été déroulés en cliquant dans le prototype rendu.

- **Orientation.** « Étape n sur 3 » en création (Type, Cible, Vérifier) et en retour (Montant, Vérifier, PIN). B05 n'a pas d'étape. Le nom de l'épargne est rappelé de B09 à B12, avec « Depuis » et « Vers ». ✓
- **Montant dominant.** Le montant de B03, B07, B08 et B09 est en `amount` 34 Bold ; celui de B10 (« Tu remets ») aussi. Le titre de B12 porte le montant. Contrôlé à 7 chiffres sur 320. ✓
- **Statut réel.** L'attente est ambre avec horloge et `StepTracker`, sans aucun succès visible (vérifié par script sur B04 inconnu, B07 en attente et B12 en attente ou incertain). L'échec est rouge, avec croix et « Échoué ». Le seul succès vert est un résultat confirmé (B12 Fait, B06, messages « Modifications enregistrées » et « est fermée »). L'objectif atteint n'utilise ni `StatusPill` ni titre de résultat. ✓
- **Un seul bouton principal.** Vérifié par script sur les 64 téléphones des planches. B01 à 3 actives, B02, B11 et Bientôt ici n'en ont pas, comme le veut la spec. ✓
- **Couleurs.** Le vert est réservé au bouton principal. L'ambre ne sert qu'à l'attente, le rouge qu'à l'échec. Les accents restent dans les illustrations ; le violet de la pastille Épargnes est déjà validé au lot A. ✓
- **Texte essentiel ≥ 14.** Vérifié par script. Seuls sont plus petits les libellés de la barre basse, les dates des mouvements et la bande du prototype. ✓
- **Cibles ≥ 44.** Vérifié par script. Le champ montant est passé de 42 à 48 pendant le contrôle. ✓
- **Barre basse.** Elle n'apparaît que sur B01 et H01 (racines). ✓
- **Aucune valeur inventée.** Les frais sont « à confirmer ». Aucun minimum ni maximum de cible ou de retour, aucun délai, aucune longueur de nom, aucun montant rapide sur la cible. ✓
- **Santé.** Le libellé est « Santé » seul, sans mot d'assurance. L'illustration du Design System est une trousse de soins avec une croix corail : voir la question 1.
- **Corrections faites pendant le contrôle :**
  - le montant de B07 et de B10 s'affichait en 16, parce que le runtime enveloppe les valeurs dans un `span` ;
  - le nom du récapitulatif n'avait pas de style ;
  - le champ montant faisait 42 de haut ;
  - « ? » et « ! » sont maintenant précédés d'une espace insécable ;
  - la raison s'affichait deux fois sur B07 en attente.
- **Non vérifié :**
  - le rendu dans le canvas claude.ai lui-même, le navigateur intégré n'étant pas connecté ;
  - un vrai téléphone Android et TalkBack ;
  - l'illustration PNG de B06 dans le rendu local (asset copié du Design System, non servi en local).

- **Passage au canvas unique (19 octobre)** : chaque planche du lot B a été rendue en local dans l'ancien et dans le nouveau canvas, et comparée élément par élément (position, taille, texte, styles calculés) : identique sur les 11 planches, à la phase de l'animation du spinner près. Les parcours ont été rejoués depuis le menu unique.

## Composants candidats à promouvoir dans le Design System

Construits dans `kotiz-app.css` (tokens seulement), sans toucher au Design System :

1. **`RootHeader` + `MaskToggle`** : titre de racine et œil 48 (œil barré quand c'est masqué, `aria-pressed`) sur B01. Le même œil s'ajoute à côté de `PageHeader` sur B07.
2. **`GoalRow`, variantes** :
   - « atteinte » : montant, « Objectif atteint ✓ » en `text-brand` et barre pleine ;
   - « fermée » : « Fermée le 12 oct. », sans barre ni montant ;
   - filet entre les lignes quel que soit l'élément qui les enveloppe.
3. **`GoalTypeOption`** : grille 2 colonnes, illustration 48 + libellé 14, cible ≥ 96, état sélectionné vert doux + bordure 2 (`aria-pressed`).
4. **`GoalProgress`** : montant `amount`, devise en `section` secondaire, « sur X F », barre de 8, %, phrase de reste, « Objectif atteint ✓ » et état masqué.
5. **`Summary`** : récapitulatif libellé / valeur avec « Modifier » ; une ligne facultative absente ne laisse pas de trou. Variante en tête avec montant (B10). Il remplace le récap A03 resté dans `lot-a.css`.
6. **`AmountField`** : `AmountInput` avec une vraie saisie (`inputmode` numérique, séparateur des milliers à la frappe), une raison ou une erreur sous le trait, une cible de 48 et une puce large « Tout remettre » avec état sélectionné.
   - Le rayon 8 hérité de `kz-pick` reste à rattacher à un token.
7. **`TextField` multiligne** : note facultative sur 3 lignes.
8. **`ConfirmDialog`** : voile `surface-scrim`, carte `radius-24` + `shadow-overlay`, titre 24, primaire + secondaire empilés (B14, B16).
9. **`DateField`** : `TextField type="date"` + « Retirer la date » + aide « Pour le 30 juin 2027 ». Le sélecteur natif Android est à confirmer côté dev.
10. **`TransactionRow`, variante mouvement interne** (« Vers mon solde », « Depuis mon solde ») : aujourd'hui, c'est un titre propre avec l'illustration Épargnes. Variante à décider avec le lot C.
11. **Asset manquant** : illustration « objectif atteint » (B07), distincte d'un succès de transaction.

## Questions pour le PO

1. **Illustration Santé.** Celle du Design System est une trousse de soins avec une croix corail. Il n'y a ni bouclier ni contrat, mais la croix peut rappeler une mutuelle. Faut-il la garder, ou demander une variante sans croix (par exemple un cœur) ?
2. **Illustration Imprévus** (Précaution du Design System) : c'est un bouclier. La règle ne vise que Santé, mais un bouclier évoque la protection, donc l'assurance. Faut-il la garder ?
3. **B05 « Valider » avec une date passée** : il est désactivé avec la raison (maquette) alors que la spec le veut toujours actif. Quelle règle retenir ?
4. **Phrase sous la cible (B03)** : « C'est le montant que tu veux atteindre. » s'affiche quand la saisie est valide. Elle a été ajoutée pour garder une ligne d'aide stable sous le trait. Garder ou retirer ?
5. **B12 fait, retour total** : trois actions en bas (« Voir mon épargne », « Voir mon solde », « Fermer cette épargne ? »). La spec le prévoit, mais la critique du lot A se méfiait des piles. À observer en P6-2.
6. **Retour en attente sur B07** : « Fermer cette épargne » est désactivé sans phrase propre. La raison est donnée une seule fois, sous « Remettre sur mon solde ». Est-ce suffisant ?
7. **Ligne du bas de la carte solde après un retour au solde** : le libellé « Dernier dépôt » est remplacé par « Depuis École Awa » (prop `label` du composant), pour que la carte dise d'où vient la hausse du solde. Le signalement de la critique du lot A sur cette ligne reste ouvert. Faut-il garder « Dernier dépôt » (le dépôt Wave) et laisser le retour dans les Dernières opérations seulement ?

## Reporté

Les éléments suivants ne sont pas dessinés :
- B01 et B07 : chargement (squelette) ;
- B08 : échec d'enregistrement et épargne fermée entre-temps ;
- B10 : frais inconnus (autorisation bloquée) et refus du partenaire ;
- B11 : blocage du PIN (G02) ;
- B14 : échec de fermeture (Message sur B07) ;
- B01 : plus de 5 fermées.

Variantes assistées des lots E (création et retour sans smartphone). Lots C, D et F : écran « Bientôt ici » dans le prototype.
