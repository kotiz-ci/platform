# Écrans — Refonte des parcours, lot A : accès et accueil

Date : 19 octobre 2026. Statut : maquettes à valider par le PO (aucun écran validé).

Outil : Claude Design (type Design) — canvas unique de l'app cliente [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), page « Lot A — Accès et accueil » (privé : à partager depuis le menu Partager pour la conjointe). Depuis le 19 octobre 2026 (décision PO), tous les lots vivent dans ce canvas ; il s'ouvre sur la planche Pilotage.
Archive : l'ancien canvas [KOTIZ — Lot A accès et accueil](https://claude.ai/artifact/BrxhpBYZ9u4ejXV4bmUWWK) reste en ligne comme version de référence, marqué « Archivé le 19 octobre 2026 ». Les planches du lot A y sont identiques ; on ne le modifie plus.
Design system : [DESIGN.md](../../../DESIGN.md) (racine) et [KOTIZ Design System](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) publié dans Claude Design, installé une seule fois dans le canvas (v9 `1792410187-4206` : tokens, composants `Kotiz.*`, assets copiés).
Sources : [ux-spec-lot-a.md](ux-spec-lot-a.md) (fait foi pour parcours, écrans, états), [test-lot-a.md](test-lot-a.md), [brief.md](brief.md).

## Convention du canvas unique (décision PO du 19 octobre 2026)

[KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF) est le canvas unique et définitif de **tous** les parcours de l'app cliente. Les lots C, D, E et F s'y ajouteront ; on ne crée plus de canvas par lot. Pour que chaque lot reste distinct :

- **Sections** : une page par lot, « Lot A — Accès et accueil », « Lot B — Épargne et retour au solde », puis la même forme pour les suivants (« Lot C — Dépôt et affectation »…), ajoutée seulement quand le lot a des écrans.
- **Statut visible** sur chaque section (titre de page du canvas, menu du prototype, planche Pilotage) : « Validé le 19 octobre 2026 » pour le lot A, « En cours — maquettes » pour le lot B.
- **Planches** préfixées par la lettre du lot : « A · E03 Code SMS — 5 états », « A · H01 Accueil… », « B · B07 Détail d'une épargne… ». **Fichiers** aussi : `A-E03.dc.html`, `B-B07.dc.html`, composant d'écrans `A-Proto.dc.html` / `B-Proto.dc.html` (racine `.la-root.lot-a` / `.lot-b`).
- **Parcours** préfixés comme dans les Gherkin : A-P1 … A-P10, B-P1 … B-P8 (variantes B-P1′, B-P5′, B-P5″, B-P7′) ; scénarios A-P1-S1… Le menu du prototype, la bande du prototype et le tableau de pilotage utilisent ces identifiants.
- **Ajouter un lot** : une page « Lot X — Titre », ses planches `X-…`, son composant `X-Proto.dc.html`, ses parcours dans le menu de `Main.dc.html` (raccords par `onLot`) et dans `pilotage-data.js`. Un seul Design System, une seule `kotiz-app.css` (règles propres au lot sous `.la-root.lot-x`), une seule clé de masquage `kotiz-masque`. La même note figure sur la planche Pilotage (« Comment ajouter un lot »).
- **Lot validé** : seuls ses noms de planches peuvent changer, jamais son rendu.
- Une seule session à la fois modifie le canvas.

## Comment c'est construit

- **Un seul composant d'écrans pour le lot** (`A-Proto.dc.html`, ex-`Main.dc.html` de l'ancien canvas) contient tous les écrans du lot A. Chaque planche du canvas l'affiche dans un état donné : un écran a donc la même apparence partout, prototype compris.
- **Prototype cliquable unique** : `Main.dc.html`, sur la page Pilotage du canvas. Son menu propose les parcours des lots A (A-P1 à A-P10) et B (B-P1 à B-P8) ; il monte `A-Proto` ou `B-Proto` au point de départ choisi. Une bande sombre en haut (hors produit) rappelle le parcours (« A-P1 Inscription autonome ») et ramène au menu.
- **Raccords vers le lot B, réels** : sur E08 (et E08′), « Créer mon épargne » ouvre B02 du lot B, et la flèche retour ramène à E08 ; sur l'accueil vide, « Créer une épargne › » fait de même. Sur l'accueil rempli, « Tout voir », chaque ligne d'épargne (vers B07), le raccourci et l'onglet Épargnes ouvrent le lot B (scénario 3 épargnes actives). Le prénom saisi suit dans le lot B. Les entrées des lots C, D et F restent l'écran « Bientôt ici ».
- **Tout écran est composé avec les composants du Design System** (version 9 du 19 octobre, avec les corrections de la [critique](critique.md), copiée dans le canvas) : `PageHeader`, `TextField`, `Message`, `PinSlots` + `PinPad`, `CheckOption`, `IconPastille`, `NumberChip`, `StepTracker`, `StatusPill`, `GoalRow`, `InfoLine`, `Shortcuts` (état désactivé), `Button`, `BalanceCard`, `HomeHeader`, `TransactionRow` (horloge), `BottomNav`, `BottomSheet`, `IllustratedResult`. `kotiz-app.css` (commune à tous les lots ; une règle propre à un lot est limitée à `.la-root.lot-a`, `.lot-b`…) ne garde que la mise en page propre au canvas : cadre d'écran et centrage optique, hero de E01 (exception PO), placement de la feuille S01, récap A03 et lignes A04, cadre du QR de Q01, menu et bande du prototype, planches. `kotiz-tokens.css` recopie les variables de `tokens.json` (le Design System ne sert pas de `tokens.css`).
- **Données fictives**, annoncées dans le menu du prototype : numéro 07 08 12 34 56, PIN 2468, code SMS = tout code d'au moins 4 chiffres (0000 = code faux, 9999 = code expiré). Le numéro décide de la suite après le code, comme le ferait le système : fiche agente en P4, compte actif en P5-P7, aucun compte pour tout autre numéro.
- Formats : 360 × 800 ; planche de contrôle à 320 de large (E03, C01, H01, E08, A02), planche « A · Contrôle 320 de large » (`A-Largeur-320.dc.html`).
- **Planches du lot A** (page « Lot A — Accès et accueil ») : `A-E01`, `A-E02`, `A-E03`, `A-S01`, `A-E04`, `A-E05`, `A-E06-E07`, `A-E08`, `A-E09-E10`, `A-C01`, `A-H01`, `A-Q01`, `A-A02-A04`, `A-Largeur-320`, plus `A-Proto` (le composant) ; titres « A · E01 Bienvenue », etc. Mêmes positions et même rendu que dans l'ancien canvas : seuls les noms changent. Les identifiants d'écran (E01…) et de parcours restent ceux de la spec, avec le préfixe A- pour les parcours.
- Les paramètres non tranchés sont listés dans des notes orange sur le canvas, sous chaque planche.

## Validation

**Lot A validé par le PO le 19 octobre 2026**, après test des 10 parcours par la conjointe du PO avec `test-lot-a.md` (case ① « Design validé » cochée pour P1 à P10). Arbitrages tranchés à cette occasion :

- E08 : « Plus tard » reste en lien en haut à droite (correction #9 de la critique close, aucune hésitation au test).
- E03 : retrait de « Besoin d'aide ? » validé ; l'aide passe par S01 « Je n'ai pas reçu le code ».
- E01 : hero vert profond validé comme exception à la règle « vert plein réservé au bouton et à la carte solde » ; l'illustration Direction 04 définitive reste un asset à livrer, sans bloquer le handoff.
- Toujours non validé : marge du QR à 4 modules (proposition, DESIGN.md).

## Écrans

| ID  | Écran                              | Maquette          | États couverts                                                                                     | Statut | Écarts                                                                                                                                                                                                                                                                                                                                                                                         |
| --- | ---------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E01 | Bienvenue                          | Planche E01       | nominal                                                                                            | validé | Haut d'écran vert profond avec arc (style carte solde) et 4 illustrations du DS en pastilles, à la demande du PO en commentaire du 19 octobre. Écart à DESIGN.md (vert plein réservé au bouton et à la carte solde) : à inscrire comme exception validée pour E01. Après critique : hero ramené à environ deux tiers de l'écran, une seule illustration au lieu de quatre pastilles flottantes |
| E02 | Ton numéro                         | Planche E02       | saisi, incomplet (bouton inactif + raison), clavier ouvert, hors connexion                         | validé | Libellé de champ « Numéro de téléphone » ajouté sous le titre (le DS impose un libellé permanent)                                                                                                                                                                                                                                                                                              |
| E03 | Code SMS                           | Planche E03       | en attente + décompte, code incorrect, code expiré, renvoi disponible, nouveau code envoyé         | validé | Mention de secret sur fond Information (pas d'icône cadenas dans le DS) ; « trop d'essais » reporté (G02). Après critique : « Besoin d'aide ? » retiré (l'aide passe par S01), décompte écrit « dans 15 s » (15 s = démo, délai à confirmer G02)                                                                                                                                               |
| S01 | Je n'ai pas reçu le code           | Planche S01       | renvoi disponible ; décompte visible dans le prototype                                             | validé | Bottom sheet DS repositionnée sur l'écran (surcharge CSS de placement)                                                                                                                                                                                                                                                                                                                         |
| E04 | Ton nom                            | Planche E04       | saisi ; vide (bouton inactif) dans le prototype                                                    | validé | Un seul champ « Prénom et nom » (choix de maquette)                                                                                                                                                                                                                                                                                                                                            |
| E05 | Tes accords                        | Planche E05       | une case (bouton inactif + consigne), tout coché, variante activation « Ta fiche KOTIZ est prête » | validé | Libellés des accords = emplacements (G01). Variante activation en message d'information « Une agente a préparé ta fiche » (plus de succès vert avant la fin), « Étape 4 sur 5 »                                                                                                                                                                                                                |
| E06 | Crée ton PIN                       | Planche E06-E07   | en cours, après PIN non identiques                                                                 | validé | Passage automatique à E07 au 4ᵉ chiffre (pas de bouton)                                                                                                                                                                                                                                                                                                                                        |
| E07 | Confirme ton PIN                   | Planche E06-E07   | en cours, création en cours, résultat inconnu (En attente), échec                                  | validé | Voir Q4 (résultat inconnu). Échec : pastille « Échoué », « Ton compte n'est pas créé », sans illustration (critique) ; la mention de secret reste sous l'erreur « codes pas pareils »                                                                                                                                                                                                          |
| E08 | Compte créé / Ton accès est activé | Planche E08       | P1 et variante P4                                                                                  | validé | Badge coche au lieu d'une illustration (absente du DS). Demande PO (commentaire du 19 oct.) : plus de pile de trois boutons. « Faire mon premier dépôt » passe en bouton texte, « Plus tard » en lien en haut à droite. À reporter dans la spec et dans test-lot-a.md (P8 tâche 3 parle d'un bouton secondaire)                                                                                |
| E09 | Ce numéro a déjà un compte         | Planche E09-E10   | nominal                                                                                            | validé | Même demande PO : « Récupérer mon accès » en bouton texte, « Utiliser un autre numéro » passe en haut à droite, même libellé que le test                                                                                                                                                                                                                                                       |
| E10 | Pas de compte à ce numéro          | Planche E09-E10   | nominal                                                                                            | validé | —                                                                                                                                                                                                                                                                                                                                                                                              |
| C01 | Entrer mon PIN                     | Planche C01       | téléphone habituel, PIN incorrect, nouveau téléphone ; vérification dans le prototype              | validé | Écran « accès bloqué » reporté (G02)                                                                                                                                                                                                                                                                                                                                                           |
| H01 | Accueil                            | Planche H01       | vide, rempli (pli à 800), masqué, hors connexion, page entière                                     | validé | Carte projet allégée du DS (sans %) ; raccourci « Épargnes » au lieu de « Mes épargnes » (tient sur une ligne, même mot que la barre basse) ; statut « Fait » avec pictogramme partout (Q2 tranchée) ; épargnes « 45 000 F sur 100 000 F » ; Retirer et sorties sans rose d'erreur ; prénom saisi repris dans l'accueil, C01 et Q01 ; chargement reporté                                       |
| Q01 | Mon QR                             | Planche Q01       | nominal                                                                                            | validé | Logo K superposé au QR comme sur la carte solde ; chargement, erreur, hors ligne reportés                                                                                                                                                                                                                                                                                                      |
| A02 | Nouvelle fiche (agente)            | Planche A02-A04   | saisi (facultatifs vides), numéro déjà connu                                                       | validé | Dialogue « Quitter sans créer la fiche ? » reporté                                                                                                                                                                                                                                                                                                                                             |
| A03 | Vérifie la fiche (agente)          | Planche A02-A04   | nominal, création en cours, fiche non créée                                                        | validé | « Résultat inconnu » reporté                                                                                                                                                                                                                                                                                                                                                                   |
| A04 | Fiche créée (agente)               | Planche A02-A04   | invitation envoyée, invitation pas partie ; invitation en cours dans le prototype                  | validé | —                                                                                                                                                                                                                                                                                                                                                                                              |
| —   | Bientôt ici                        | dans le prototype | raccords vers lots B, C, D, F et A2                                                                | —      | Écran neutre de démonstration, pas un écran produit                                                                                                                                                                                                                                                                                                                                            |

## Parcours du prototype

| Parcours                  | Départ dans le menu | Chemin attendu                                                                                                                                                    |
| ------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A-P1 Inscription autonome | A-P1 → E01          | E01 → E02 → E03 → E04 → E05 → E06 → E07 → création → E08 → Plus tard → H01 vide                                                                                   |
| A-P2 Accompagnée          | A-P2 → E01          | identique à P1                                                                                                                                                    |
| A-P3 Agente               | A-P3 → A02          | A02 → A03 → A04 → Terminé → A02 ; le même numéro une seconde fois → doublon                                                                                       |
| A-P4 Activation           | A-P4 → E01          | Créer mon compte → E02 → E03 → E05′ → E06 → E07 → E08′                                                                                                            |
| A-P5 Téléphone habituel   | A-P5 → C01          | C01 (2468) → H01 rempli                                                                                                                                           |
| A-P6 Nouveau téléphone    | A-P6 → E01          | Me connecter → E02 → E03 → C01 → H01 ; autre numéro → E10                                                                                                         |
| A-P7 Numéro déjà inscrit  | A-P7 → E01          | Créer mon compte → E02 → E03 → E09 → C01                                                                                                                          |
| A-P8 Compte créé          | A-P8 → E08          | Plus tard → H01 vide ; Créer mon épargne → lot B (B02)                                                                                                            |
| A-P9 Accueil              | A-P9 → H01 rempli   | œil → masqué ; conservé quand on rouvre le lien et partagé avec le lot B (stockage du navigateur, clé unique `kotiz-masque`, à vérifier sur le téléphone de test) |
| A-P10 Mon QR              | A-P10 → H01 rempli  | carte solde → Q01 → ←                                                                                                                                             |

## Contrôle avant rendu

Vérifié sur un rendu local du runtime Design (même code que le canvas), à 360 et 320 de large, plus une simulation des 10 parcours.

- Orientation : « Étape n sur 5 » (P1 et P4 ; en P4 l'étape Nom compte comme faite), aucun indicateur en connexion. ✓
- Montant dominant : solde en 34 Bold sur la carte ; montants masqués partout sur l'accueil, barres conservées. ✓
- Statut réel : création = attente neutre sans succès ; résultat inconnu = « En attente » ambre ; échec = rouge + croix ; succès seulement sur E08 et A04. ✓
- Un seul bouton principal par écran (contrôlé par script ; C01, H01 et Q01 n'en ont pas, conformément à la spec). ✓
- Couleurs : vert + accents d'illustration ; ambre réservé à l'attente. Voir Q6 pour l'accueil.
- Texte essentiel ≥ 14 (contrôlé par script : seuls les libellés de la barre basse, les dates, la mention « QR de démonstration » et la bande du prototype sont plus petits). ✓
- Cibles ≥ 44 (contrôlé par script ; liens « Lire » élargis à 48). ✓
- Barre basse uniquement sur H01. ✓
- Correctif fait pendant le contrôle : la carte solde était écrasée quand l'accueil défile.
- Non vérifié : rendu dans le canvas claude.ai lui-même (navigateur intégré non connecté) et sur un vrai téléphone Android.
- **Passage au canvas unique (19 octobre)** : chaque planche du lot A a été rendue en local dans l'ancien et dans le nouveau canvas, et comparée élément par élément (position, taille, texte, styles calculés) : identique sur les 14 planches, à la phase de l'animation du spinner près. Les 10 parcours ont été rejoués depuis le menu unique, avec les raccords vers le lot B.

## Ajouts proposés au DESIGN.md

Faits dans le Design System publié (version 8, 19 octobre) et utilisés par le canvas : champ saisissable avec préfixe (`TextField`), `PageHeader`, `Message`, `CheckOption` (token `radius-6`), `PinSlots` + `PinPad` (`size-pin-slot`), état désactivé de `Shortcuts` (avec `hint`), horloge « En attente », pictogrammes Fermer et Effacer, `IconPastille` (`size-pastille`, `size-pastille-lg`), `NumberChip`, `StepTracker` (`size-step-dot`), `StatusPill`, `GoalRow`, `InfoLine`. DESIGN.md (dépôt) reste à aligner sur ces ajouts par la session design system.

Restent ouverts :

1. **Pictogrammes** : icônes Épargnes et Opérations de la barre basse (provisoires dans `BottomNav` depuis la version 9 : bocal, flèches entrée / sortie), cadenas des écrans à secret.
2. **Illustrations à fournir** : accueil et résultat « bienvenue » (E08 garde le badge coche).
3. **Hero E01** : exception PO à la règle du vert, à inscrire dans DESIGN.md ; à transformer en composant si E08 reçoit le même traitement.
4. ~~**`GoalRow` sur l'accueil**~~ : tranché par la critique, la ligne affiche « 45 000 F sur 100 000 F » (version 9).

## Questions

1. **Indicateur d'étape en activation (P4).** _Tranché (critique du 19 octobre) : total gardé à 5, E05′ = « Étape 4 sur 5 »._ Avec une seule porte (H1), l'app ne sait qu'il s'agit d'une activation qu'après le code SMS. E02-E03 affichent donc « Étape 1 sur 5 » et « 2 sur 5 », puis E05′ passe à « Étape 3 sur 4 ». La spec demande « sur 4 » dès E02, ce qui n'est pas possible. Garder ce saut, ou afficher « 4 sur 5 » en sautant l'étape Nom ?
2. **Libellé du statut fait.** _Tranché (critique du 19 octobre) : « Fait » partout, DS et DESIGN.md alignés._ Spec et test : « Fait » ; DESIGN.md et le composant `TransactionRow` : « Réussi ». La maquette suit le composant. Lequel retenir ?
3. **Masquage des montants d'épargne.** Spec : « ••• ••• FCFA » ; composant `GoalCard` : « ••• F sur ••• F ». La maquette suit le composant.
4. **Résultat inconnu à la création du compte.** Statut « En attente », bouton « Vérifier à nouveau », phrase « Ne crée pas un second compte. » Les textes sont à valider.
5. **Action principale de l'accueil.** La spec marque Déposer comme principal ; les raccourcis du DS ont tous le même poids. Déposer ne se distingue que par sa première place. Est-ce suffisant ?
6. **Couleurs de l'accueil.** _Corrigé (critique du 19 octobre) : Retirer en bleu doux, sorties en pastille neutre, rose réservé à l'échec ; le violet d'Épargnes reste._ Les pastilles des raccourcis apportent un rose (`surface-error`) et un violet en plus du vert, et la ligne d'opération sortante a aussi une pastille rose. Est-ce acceptable au regard de la règle « deux couleurs de marque » et de la confusion possible avec l'erreur ? À passer en critique-design.
7. **Épargnes sur l'accueil** (proposition appliquée à la demande du PO, 19 oct.) : les cartes `GoalCard` empilées sont remplacées sur l'accueil par des lignes compactes dans un seul bloc gris (illustration 32, nom, « 45 000 / 100 000 F », barre fine, chevron ; environ 64 px par ligne), 3 au maximum (règle produit), plus « Tout voir › » vers l'onglet Épargnes. Le pourcentage reste absent. À valider, puis à ajouter au Design System comme variante compacte de la carte projet.
8. **E04 vers E03 au retour** : la spec dit « retour à l'étape précédente », alors que le code est déjà validé. La maquette revient à E03 ; faut-il plutôt revenir à E02 ?
9. **Place de la cloche** de notifications sur l'accueil (lot F) et du lien « Besoin d'aide » : gardés tels que dans le DS et la spec, contact à confirmer (G03).
10. **QR** : marge blanche réduite et logo central à tester sur de vrais téléphones en plein soleil, avec la luminosité maximale (faisabilité Expo à confirmer).
11. **Notifications de statut** (lot F, à décider dès maintenant) : « Ton dépôt de 5 000 F est arrivé », « Ton versement vers École Awa est en attente », « Nouvelle connexion sur un autre téléphone », « Ton identité est vérifiée ». Elles prolongent le principe « statut réel avant tout ». Faut-il les traiter en tête du lot F, avec le SMS comme canal principal (G02) ? Sur l'accueil, la ligne « Dernier dépôt » de la carte solde en tient déjà lieu en partie. Les annonces de nouveautés restent au backlog (rappels et promotions hors MVP) ; le jour venu, une ligne discrète sur l'accueil ou une feuille unique après mise à jour, jamais de pop-up bloquant ni de pastille marketing sur la cloche.

## Reporté

Accès bloqué après trop d'essais (code et PIN, G02) ; chargement de H01 (squelette) ; chargement, erreur et hors ligne de Q01 ; dialogue de sortie d'A02 ; résultat inconnu d'A03 ; écrans KYC (sous-lot A2) ; lots C à F (écran « Bientôt ici » dans le prototype ; le lot B est raccordé depuis le 19 octobre).

## Résultats en plein écran (décision PO du 20 octobre 2026, canvas version 29)

La règle « écran de résultat plein écran » (DESIGN.md, Layout) vaut pour tous les lots. Au lot A, les écrans qui étaient en carte centrée passent à la composition de C-05 ; seul A-Proto change, les textes et les décisions validés sont gardés :

- **A · E07 Création en cours** : bloc de statut à gauche (pastille ambre avec l'indicateur de chargement), « Création de ton compte… », « Un instant… » ; pas d'en-tête (état bref).
- **A · E07 Résultat inconnu** : croix « Fermer » en haut à gauche (→ E01), pastille ambre + horloge, `StatusPill` En attente, « On vérifie ton compte », phrase « Ne crée pas un second compte. », `StepTracker` dans le flux ; zone d'action « Vérifier à nouveau » + bouton texte « Besoin d'aide ? ».
- **A · E07 Échec** : croix « Fermer » (→ E01), pastille rouge + croix, `StatusPill` Échoué, « Ton compte n'est pas créé », annonce assertive ; « Réessayer » + « Besoin d'aide ? » en bouton texte.
- **A · E08 / E08′ Compte créé / accès activé** : « Plus tard » gardé en haut à droite (décision du lot A, à la place de la croix), pastille coche alignée à gauche, « C'est fait, Fatou ! », « Créer mon épargne » en principal et « Faire mon premier dépôt » en bouton texte.
- Contrôles : planches A · E06-E07, A · E08 et A · Contrôle 320 (un bouton principal, cibles ≥ 44, texte ≥ 14, aucun débordement) ; les autres planches du lot A ont le même rendu qu'avant. À reporter au handoff du lot A.

## Design System v12 installé dans le canvas (21 octobre 2026, canvas version 32)

Cette étape applique la proposition n° 1 de l'[audit des composants](audit-composants.md), validé par le PO. La copie du DS dans le canvas (`project/ds/kotiz/`) passe de la v9 à la **v12** publiée (`1792593410-9a1e`, 33 composants) : `bundle.js`, `bundle.css` et `README.md` sont remplacés ; `tokens.json` était déjà identique. Avec le seul nouveau bundle, les planches s'affichent comme avant, à l'exception du pictogramme animé « Envoi… ».

**Éléments remplacés par les composants `Kotiz.*`** (textes et décisions inchangés) :

- `RootHeader` (+ `MaskToggle`) : B · B01, C-11 (à la place de `lb-root-head` + `lb-eye`).
- `MaskToggle` à côté du `PageHeader` : B · B07, sa copie au lot C, C-12, C-13 (à la place de `lb-eye`).
- `GoalTypeGrid` + `GoalTypeOption` : B · B02 (à la place de `lb-types`).
- `AmountField` : B · B03, B · B08 (libellé visible), B · B09 (puce large « Tout remettre »), C-07 (puce « Tout mon solde »).
- `DateChoice` : B · B04, B · B08 (à la place de `lb-dates`).
- `TextField` multiligne : B · B05 et B · B08 (note), C-14 (« Ajoute un mot »), C-16 (« Dis pourquoi »).
- `SummaryPreview` : B · B06 (à la place de `lb-hero`).
- `SummaryFlow` : B · B10, C-08 (à la place de `lb-flowsum`). Sur C-08, la colonne des libellés prend la largeur du DS (88) au lieu de 50 %. Les nœuds Depuis / Vers passent par `dc-props`, car le runtime réserve l'attribut `from`.
- `ConfirmDialog` : B · B14, B · B16, C-14 « Quitter sans envoyer ? » (à la place de `lb-dialog`). Seule une règle de placement reste dans `kotiz-app.css`.
- `GoalRow` `state="reached"` / `"closed"` : B · B01, la copie d'A · H01 aux lots B et C, C-10 (lignes jusque-là recomposées à la main). Sur C-10, la ligne d'une épargne atteinte affiche maintenant son montant, comme les autres lignes.
- `StepTracker` `sent` : A · E07 « On vérifie ton compte », B · B12, C-04 (« Envoyée », « Validée »), C-05, C-09, C-12 et D-05. Sur A · E07, « Demande envoyée » dit maintenant **« Envoyée »** au lieu de « Fait » (décision n° 3). Plus aucun écran d'attente n'a d'étape « Fait ».

**Copies d'écrans harmonisées** :

- A · E08 : les copies des lots B et C ont maintenant le même rendu plein écran que A · E08, avec « Plus tard » en haut à droite.
- A · H01 : dans les quatre copies (A, B, C, D), la liste « Dernières opérations » utilise la même composition de ligne (`lc-tx`, future `TransactionRow` v2). Chaque ligne a un sous-titre origine → destination, et le signe n'apparaît que si l'opération est faite (critique C n° 8). Au lot A, cela ajoute « Vers ton solde » / « Depuis ton solde » sous les trois lignes, et la ligne en attente « Vers École Awa » perd son signe « − ». Ces textes sont ceux des raccords validés du lot C.
- La `TransactionRow` v12 du DS affiche toujours un signe et n'a pas de sous-titre. Elle n'est donc plus utilisée sur l'accueil ; B · B07 la garde pour ses mouvements.

**Gardés provisoirement en version canvas.** Pour ces éléments, le composant v12 ne couvre pas un ajout validé ; la session Design System prépare les nouvelles versions :

- C-03 et D-03 gardent `lb-flowsum` (nœud avec logo et numéro, « Pris sur ton … », deux temps numérotés, pictogramme portefeuille), en attendant `SummaryFlow` v2.
- C-02 (montants rapides sélectionnables) et D-02 (toute la ligne du montant ouvre le clavier, critique D n° 11) gardent leur champ, en attendant `AmountField` v2.
- Sur B03, B09 et C-07, le champ montant vide garde la cible étroite du DS (23 × 48). La même correction est à faire dans le DS.
- B · B07 et sa copie gardent la progression `lb-prog`. Le `GoalProgress` v12 écrit « pour atteindre ton objectif », alors que le texte validé est « pour ton objectif », et l'écran a des phrases en plus.
- C-12 garde le trajet Depuis ↓ Vers sans carte et les étapes « Pas fait », en attendant `FlowPath` et `StepTracker` `failed`.
- C-14 garde les motifs en `lb-dates`, en attendant un `ChoiceList` à concevoir.
- Restent aussi en version canvas, comme composants nouveaux ou évolutions listés dans l'audit (n° 2 à 17) :
  - lignes d'opération `lc-tx`, lignes de choix `lc-row` ;
  - carte solde « Retrait en attente » (C, D) ;
  - résultats plein écran `lc-res`, étapes numérotées ;
  - reçu, fil du dossier, puces de filtre ;
  - squelettes, refus + aide, pavé PIN gelé (D-04).

**Contrôles.**

- Les textes des 55 planches ont été comparés avant / après : seuls changent les points ci-dessus.
- Le script de contrôle a tourné à 360 et 320 sur les planches modifiées : un bouton principal hors voile, texte ≥ 14, aucun débordement. Seule exception sur les cibles : le champ montant vide, signalé plus haut.
- Parcours rejoués au clic dans Main : B-P1, B-P4, B-P5, B-P6, C-P3, C-P7, A-P5, D-P1.
- Pas vérifié : le rendu dans claude.ai, un vrai Android.

## Design System v15 rebranché dans le canvas (21 octobre 2026, canvas version 33)

Étape 2 de l'[audit des composants](audit-composants.md), validée par le PO. La copie du DS dans le canvas (`project/ds/kotiz/`) passe à la **v15** publiée (`1792595297-f394`) :

- `bundle.js`, `bundle.css`, `README.md` et `tokens.json` sont remplacés ;
- les jetons `size-logo-*` et `opacity-disabled` sont ajoutés à `kotiz-tokens.css`.

Aucun composant archivé (`AmountInput`, `GoalCard`, `OperationStatus`, `IllustratedResult`) n'est utilisé dans le canvas. Les textes validés ne changent pas, sauf les phrases hors connexion standard demandées (voir plus bas).

**Rebranchements par composant** :

- `ResultScreen` : A · E07 (en cours, inconnu, échec), A · E08 et ses copies aux lots B et C, B · B12, B · B17, C-05, C-09, D-05. La pastille 64 remplace partout l'ancien badge 80 ; seul B17 garde son illustration (« Épargne créée »). A · E08 n'a pas d'illustration de résultat dans le canvas : il prend la pastille.
- `ActionZone` : toutes les zones d'action fixes des lots A à D. Le filet n'apparaît que si le contenu défile (`divider="auto"`, ce qui remplace `lc-foot-line`). Les raisons de bouton désactivé passent par `reason` (B10, C-03, C-08, C-14).
- « Contacter l'aide » devient un bouton texte de la zone d'action, et n'est plus un lien dans le contenu : A02 (numéro déjà connu), B10, C-03 et C-08 (refus), C-15, feuille C-04 « Le dépôt n'arrive pas ? ».
- `TransactionRow` v2 : les quatre copies d'A · H01, B · B07 et sa copie au lot C, C-11 Opérations. La ligne « Pas entré » de B07 et la ligne de retrait en attente sont incluses.
- `BottomSheet` (`onClose`, `options`, `actions`) et `OptionRow` :
  - feuilles S01, B13, B15 (et sa copie), C-00, C-06, C-10, C-04 aide, C-16, D-00 et D-07 ;
  - listes d'opérateurs C-01 et D-01 ;
  - le bouton de fermeture fait main disparaît.
- `Amount` : montants des résultats, de B07 (et copie), C-12, C-13, des lignes de détail, de la carte solde et des lignes d'opération. Les montants pris dans une phrase restent du texte.
- `SummaryFlow` v2 (`FlowPath` + `DetailList`) : B10, C-03, C-08, D-03. C-03 et D-03 quittent `lb-flowsum` : nœud logo avec le numéro, « Pris sur ton … » en `amountNote`.
- `FlowPath` seul : C-12.
- `DetailList` remplace les lignes `lb-sum-row` :
  - B12, B17, C-05, C-09, D-05 ;
  - C-12, reçu C-13, C-15 ;
  - récapitulatif du PIN D-04.
- `BalanceCard.pendingOut` remplace la carte « Retrait en attente » recomposée à la main (copies d'A · H01 aux lots C et D).
- `SectionHeader` (« Tout voir ») : copies d'A · H01, B07 et sa copie.
- `PageHeader.trailing` porte l'œil à la place de `lb-head-row` : B07, C-12, C-13.
- `PinPad.disabled` remplace `ld-pad-off` sur D-04.
- Conventions (décision 9) : `onPress` partout, icônes système intégrées (retour, fermer, effacer, chevron, œil et agrandir de la carte solde). L'œil de `MaskToggle` / `RootHeader`, la cloche de `HomeHeader` et le chevron d'`InfoLine` gardent leur URL : le DS v15 ne les intègre pas.

**Décisions appliquées** :

- Hors connexion (décision 5) : `Kotiz.OFFLINE` partout.
  - `stale('14:32')` : accueil, B01, B07, C-01, C-11, D-01, D-02.
  - `blocked` : A · E02 et B · B06 (au lieu de « Pas de connexion. » + « Ta saisie est gardée. »), C-03, C-08, D-03, D-04 (au lieu de « … Réessaie quand tu captes. »).
  - `unavailable` : C-12 (au lieu de « Détail indisponible hors connexion. »).
  - Les phrases du DS ont l'apostrophe typographique (« n’a »).
- « Mon solde » (décision 6) : portefeuille neutre du DS (`kind: 'wallet'`) dans B10, B12, C-03, C-05, C-06, C-08, C-09, C-12, C-13 et D-03.
- Statut unique (décision 9) : « À reprendre » est un `failed` avec son libellé. Écrans touchés :
  - lignes C-11 et B07 ;
  - pastilles C-12, C-14, C-15 ;
  - résultat partiel de C-05 (rouge au lieu d'ambre).
  - Une ligne en attente ou échouée n'a plus de signe : B07 en attente, C-11 « À reprendre ».

**Effets visibles à connaître** :

- La carte solde ajoute le mot « En attente » à côté de « Retrait en attente ».
- D-03 affiche « Un instant… » (`rowsLoading`) pendant le calcul des frais, au lieu du squelette.
- C-03 : les deux temps numérotés passent sous les lignes Frais / Arrive.
- Masqué : « ••• » au lieu de « ••• ••• ».
- Les actions des feuilles suivent l'ordre du DS : principal, puis boutons texte.

**Gardés en version canvas, et pourquoi** (CSS du canvas : 377 → 250 règles, 47 → 31,5 Ko) :

- Écrans PIN A · E06/E07, A · C01, B · B11, D-04 : `PinScreen` v15 n'a ni phrase libre sous le titre, ni libellé du bouton de blocage (il impose « Terminé »), ni variante connexion. Sans ces ajouts, il faudrait changer des textes validés :
  - « Ce code protège ton argent… » ;
  - « 2 000 F d'École Awa vers ton solde » ;
  - « Voir mon épargne » ;
  - « Rien n'a été pris sur ton solde. »
    Ces écrans restent composés de `PinSlots`, `PinPad` et `Message`.
- C-02 et D-02 : `AmountField` n'a pas changé en v15 (montants rapides, toute la ligne cliquable). La cible du champ vide reste à 23 × 48 (B03, B09, C-02, C-07, D-02).
- B07 et sa copie : progression `lb-prog`. Le texte de `GoalProgress` reste différent du texte validé (question PO ouverte).
- C-12 : étapes « Pas fait » (`lc-steps`), car `StepTracker` n'a pas d'état `failed`.
- C-14 : motifs en `lb-dates`, en attendant `ChoiceList`.
- D-02 : ligne « Depuis : Mon solde » avec un portefeuille dessiné, car le DS n'exporte pas son portefeuille hors des composants.
- Lignes liées « Lié à cette opération » (C-12, C-15) : ce ne sont pas des lignes de choix.
- A04 (application agente) : garde son badge, il n'est pas dans la liste des résultats plein écran.
- Composants encore à concevoir (audit, n° 2 à 17) :
  - squelettes ;
  - puces de filtre C-11 ;
  - reçu C-13, fil du dossier C-15, rappel d'opération C-14 ;
  - étapes numérotées C-03, C-17, D-06 ;
  - puce de type B03 à B08.
- Cadre du prototype : rôles de texte `la-*`, menu, bandeau, planches, héros E01, Q01, simulation de l'opérateur.
- Placement seulement : voile des feuilles (`la-scrim`) et du `ConfirmDialog`.

**Contrôles.**

- Textes des 55 planches comparés avec la v32. Seuls changent les points ci-dessus et l'ordre de lecture des composants du DS.
- Script de contrôle à 360 et 320 sur les 55 planches : mêmes alertes qu'en v32, toutes antérieures à cette étape :
  - case à cocher 24 × 24 d'E05 ;
  - mention 11 px de Q01 ;
  - bouton principal sous le voile des feuilles et dialogues ;
  - champ montant vide 23 × 48.
- Les 55 parcours de Main s'ouvrent sans erreur. Rejoués au clic jusqu'au bout :
  - A-P1 (jusqu'à C-00), A-P5 → D-P1 → reçu → Opérations ;
  - C-P1, B-P1 → C-06 → C-08 → C-09 ;
  - B-P4 (B12), B-P5 (B13), C-P5 (C-10) ;
  - D-P2″ (carte en attente → C-12), D-P4 (PIN faux puis bloqué).
- Défaut trouvé, déjà présent en v32 : B-P1 → « Mettre de l'argent » (lot C) → « Remettre sur mon solde » → B11 reste sur « Envoi… ». L'épargne créée au lot B n'est pas retrouvée au retour du lot C. Non corrigé ici.
- Pas vérifié : le rendu dans claude.ai, un vrai Android.
