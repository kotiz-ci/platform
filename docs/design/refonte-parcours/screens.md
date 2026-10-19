# Écrans — Refonte des parcours, lot A : accès et accueil

Date : 19 octobre 2026. Statut : maquettes à valider par le PO (aucun écran validé).

Outil : Claude Design (type Design) — [KOTIZ — Lot A accès et accueil](https://claude.ai/artifact/BrxhpBYZ9u4ejXV4bmUWWK) (privé : à partager depuis le menu Partager pour la conjointe)
Design system : [DESIGN.md](../../../DESIGN.md) (racine) et [KOTIZ Design System](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) publié dans Claude Design, installé dans le canvas (tokens, composants `Kotiz.*`, assets copiés).
Sources : [ux-spec-lot-a.md](ux-spec-lot-a.md) (fait foi pour parcours, écrans, états), [test-lot-a.md](test-lot-a.md), [brief.md](brief.md).

## Comment c'est construit

- **Un seul composant prototype** (`Main.dc.html`) contient tous les écrans du lot A. Chaque planche du canvas l'affiche dans un état donné : un écran a donc la même apparence partout, prototype compris.
- **Prototype cliquable** : le lien ouvre directement le prototype. Un menu propose P1 à P10, chacun avec son point de départ. Une bande sombre en haut (hors produit) rappelle le parcours et ramène au menu.
- **Tout écran est composé avec les composants du Design System** (version 9 du 19 octobre, avec les corrections de la [critique](critique.md), copiée dans le canvas) : `PageHeader`, `TextField`, `Message`, `PinSlots` + `PinPad`, `CheckOption`, `IconPastille`, `NumberChip`, `StepTracker`, `StatusPill`, `GoalRow`, `InfoLine`, `Shortcuts` (état désactivé), `Button`, `BalanceCard`, `HomeHeader`, `TransactionRow` (horloge), `BottomNav`, `BottomSheet`, `IllustratedResult`. `lot-a.css` ne garde que la mise en page propre au canvas : cadre d'écran et centrage optique, hero de E01 (exception PO), placement de la feuille S01, récap A03 et lignes A04, cadre du QR de Q01, menu et bande du prototype, planches. `kotiz-tokens.css` recopie les variables de `tokens.json` (le Design System ne sert pas de `tokens.css`).
- **Données fictives**, annoncées dans le menu du prototype : numéro 07 08 12 34 56, PIN 2468, code SMS = tout code d'au moins 4 chiffres (0000 = code faux, 9999 = code expiré). Le numéro décide de la suite après le code, comme le ferait le système : fiche agente en P4, compte actif en P5-P7, aucun compte pour tout autre numéro.
- Formats : 360 × 800 ; planche de contrôle à 320 de large (E03, C01, H01, E08, A02).
- Les paramètres non tranchés sont listés dans des notes orange sur le canvas, sous chaque planche.

## Validation

**Lot A validé par le PO le 19 octobre 2026**, après test des 10 parcours par la conjointe du PO avec `test-lot-a.md` (case ① « Design validé » cochée pour P1 à P10). Arbitrages tranchés à cette occasion :
- E08 : « Plus tard » reste en lien en haut à droite (correction #9 de la critique close, aucune hésitation au test).
- E03 : retrait de « Besoin d'aide ? » validé ; l'aide passe par S01 « Je n'ai pas reçu le code ».
- E01 : hero vert profond validé comme exception à la règle « vert plein réservé au bouton et à la carte solde » ; l'illustration Direction 04 définitive reste un asset à livrer, sans bloquer le handoff.
- Toujours non validé : marge du QR à 4 modules (proposition, DESIGN.md).

## Écrans

| ID | Écran | Maquette | États couverts | Statut | Écarts |
|---|---|---|---|---|---|
| E01 | Bienvenue | Planche E01 | nominal | validé | Haut d'écran vert profond avec arc (style carte solde) et 4 illustrations du DS en pastilles, à la demande du PO en commentaire du 19 octobre. Écart à DESIGN.md (vert plein réservé au bouton et à la carte solde) : à inscrire comme exception validée pour E01. Après critique : hero ramené à environ deux tiers de l'écran, une seule illustration au lieu de quatre pastilles flottantes |
| E02 | Ton numéro | Planche E02 | saisi, incomplet (bouton inactif + raison), clavier ouvert, hors connexion | validé | Libellé de champ « Numéro de téléphone » ajouté sous le titre (le DS impose un libellé permanent) |
| E03 | Code SMS | Planche E03 | en attente + décompte, code incorrect, code expiré, renvoi disponible, nouveau code envoyé | validé | Mention de secret sur fond Information (pas d'icône cadenas dans le DS) ; « trop d'essais » reporté (G02). Après critique : « Besoin d'aide ? » retiré (l'aide passe par S01), décompte écrit « dans 15 s » (15 s = démo, délai à confirmer G02) |
| S01 | Je n'ai pas reçu le code | Planche S01 | renvoi disponible ; décompte visible dans le prototype | validé | Bottom sheet DS repositionnée sur l'écran (surcharge CSS de placement) |
| E04 | Ton nom | Planche E04 | saisi ; vide (bouton inactif) dans le prototype | validé | Un seul champ « Prénom et nom » (choix de maquette) |
| E05 | Tes accords | Planche E05 | une case (bouton inactif + consigne), tout coché, variante activation « Ta fiche KOTIZ est prête » | validé | Libellés des accords = emplacements (G01). Variante activation en message d'information « Une agente a préparé ta fiche » (plus de succès vert avant la fin), « Étape 4 sur 5 » |
| E06 | Crée ton PIN | Planche E06-E07 | en cours, après PIN non identiques | validé | Passage automatique à E07 au 4ᵉ chiffre (pas de bouton) |
| E07 | Confirme ton PIN | Planche E06-E07 | en cours, création en cours, résultat inconnu (En attente), échec | validé | Voir Q4 (résultat inconnu). Échec : pastille « Échoué », « Ton compte n'est pas créé », sans illustration (critique) ; la mention de secret reste sous l'erreur « codes pas pareils » |
| E08 | Compte créé / Ton accès est activé | Planche E08 | P1 et variante P4 | validé | Badge coche au lieu d'une illustration (absente du DS). Demande PO (commentaire du 19 oct.) : plus de pile de trois boutons. « Faire mon premier dépôt » passe en bouton texte, « Plus tard » en lien en haut à droite. À reporter dans la spec et dans test-lot-a.md (P8 tâche 3 parle d'un bouton secondaire) |
| E09 | Ce numéro a déjà un compte | Planche E09-E10 | nominal | validé | Même demande PO : « Récupérer mon accès » en bouton texte, « Utiliser un autre numéro » passe en haut à droite, même libellé que le test |
| E10 | Pas de compte à ce numéro | Planche E09-E10 | nominal | validé | — |
| C01 | Entrer mon PIN | Planche C01 | téléphone habituel, PIN incorrect, nouveau téléphone ; vérification dans le prototype | validé | Écran « accès bloqué » reporté (G02) |
| H01 | Accueil | Planche H01 | vide, rempli (pli à 800), masqué, hors connexion, page entière | validé | Carte projet allégée du DS (sans %) ; raccourci « Épargnes » au lieu de « Mes épargnes » (tient sur une ligne, même mot que la barre basse) ; statut « Fait » avec pictogramme partout (Q2 tranchée) ; épargnes « 45 000 F sur 100 000 F » ; Retirer et sorties sans rose d'erreur ; prénom saisi repris dans l'accueil, C01 et Q01 ; chargement reporté |
| Q01 | Mon QR | Planche Q01 | nominal | validé | Logo K superposé au QR comme sur la carte solde ; chargement, erreur, hors ligne reportés |
| A02 | Nouvelle fiche (agente) | Planche A02-A04 | saisi (facultatifs vides), numéro déjà connu | validé | Dialogue « Quitter sans créer la fiche ? » reporté |
| A03 | Vérifie la fiche (agente) | Planche A02-A04 | nominal, création en cours, fiche non créée | validé | « Résultat inconnu » reporté |
| A04 | Fiche créée (agente) | Planche A02-A04 | invitation envoyée, invitation pas partie ; invitation en cours dans le prototype | validé | — |
| — | Bientôt ici | dans le prototype | raccords vers lots B, C, D, F et A2 | — | Écran neutre de démonstration, pas un écran produit |

## Parcours du prototype

| Parcours | Départ dans le menu | Chemin attendu |
|---|---|---|
| P1 Inscription autonome | P1 → E01 | E01 → E02 → E03 → E04 → E05 → E06 → E07 → création → E08 → Plus tard → H01 vide |
| P2 Accompagnée | P2 → E01 | identique à P1 |
| P3 Agente | P3 → A02 | A02 → A03 → A04 → Terminé → A02 ; le même numéro une seconde fois → doublon |
| P4 Activation | P4 → E01 | Créer mon compte → E02 → E03 → E05′ → E06 → E07 → E08′ |
| P5 Téléphone habituel | P5 → C01 | C01 (2468) → H01 rempli |
| P6 Nouveau téléphone | P6 → E01 | Me connecter → E02 → E03 → C01 → H01 ; autre numéro → E10 |
| P7 Numéro déjà inscrit | P7 → E01 | Créer mon compte → E02 → E03 → E09 → C01 |
| P8 Compte créé | P8 → E08 | Plus tard → H01 vide |
| P9 Accueil | P9 → H01 rempli | œil → masqué ; conservé quand on rouvre le lien (stockage du navigateur, à vérifier sur le téléphone de test) |
| P10 Mon QR | P10 → H01 rempli | carte solde → Q01 → ← |

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

## Ajouts proposés au DESIGN.md

Faits dans le Design System publié (version 8, 19 octobre) et utilisés par le canvas : champ saisissable avec préfixe (`TextField`), `PageHeader`, `Message`, `CheckOption` (token `radius-6`), `PinSlots` + `PinPad` (`size-pin-slot`), état désactivé de `Shortcuts` (avec `hint`), horloge « En attente », pictogrammes Fermer et Effacer, `IconPastille` (`size-pastille`, `size-pastille-lg`), `NumberChip`, `StepTracker` (`size-step-dot`), `StatusPill`, `GoalRow`, `InfoLine`. DESIGN.md (dépôt) reste à aligner sur ces ajouts par la session design system.

Restent ouverts :
1. **Pictogrammes** : icônes Épargnes et Opérations de la barre basse (provisoires dans `BottomNav` depuis la version 9 : bocal, flèches entrée / sortie), cadenas des écrans à secret.
2. **Illustrations à fournir** : accueil et résultat « bienvenue » (E08 garde le badge coche).
3. **Hero E01** : exception PO à la règle du vert, à inscrire dans DESIGN.md ; à transformer en composant si E08 reçoit le même traitement.
4. ~~**`GoalRow` sur l'accueil**~~ : tranché par la critique, la ligne affiche « 45 000 F sur 100 000 F » (version 9).

## Questions

1. **Indicateur d'étape en activation (P4).** *Tranché (critique du 19 octobre) : total gardé à 5, E05′ = « Étape 4 sur 5 ».* Avec une seule porte (H1), l'app ne sait qu'il s'agit d'une activation qu'après le code SMS. E02-E03 affichent donc « Étape 1 sur 5 » et « 2 sur 5 », puis E05′ passe à « Étape 3 sur 4 ». La spec demande « sur 4 » dès E02, ce qui n'est pas possible. Garder ce saut, ou afficher « 4 sur 5 » en sautant l'étape Nom ?
2. **Libellé du statut fait.** *Tranché (critique du 19 octobre) : « Fait » partout, DS et DESIGN.md alignés.* Spec et test : « Fait » ; DESIGN.md et le composant `TransactionRow` : « Réussi ». La maquette suit le composant. Lequel retenir ?
3. **Masquage des montants d'épargne.** Spec : « ••• ••• FCFA » ; composant `GoalCard` : « ••• F sur ••• F ». La maquette suit le composant.
4. **Résultat inconnu à la création du compte.** Statut « En attente », bouton « Vérifier à nouveau », phrase « Ne crée pas un second compte. » Les textes sont à valider.
5. **Action principale de l'accueil.** La spec marque Déposer comme principal ; les raccourcis du DS ont tous le même poids. Déposer ne se distingue que par sa première place. Est-ce suffisant ?
6. **Couleurs de l'accueil.** *Corrigé (critique du 19 octobre) : Retirer en bleu doux, sorties en pastille neutre, rose réservé à l'échec ; le violet d'Épargnes reste.* Les pastilles des raccourcis apportent un rose (`surface-error`) et un violet en plus du vert, et la ligne d'opération sortante a aussi une pastille rose. Est-ce acceptable au regard de la règle « deux couleurs de marque » et de la confusion possible avec l'erreur ? À passer en critique-design.
7. **Épargnes sur l'accueil** (proposition appliquée à la demande du PO, 19 oct.) : les cartes `GoalCard` empilées sont remplacées sur l'accueil par des lignes compactes dans un seul bloc gris (illustration 32, nom, « 45 000 / 100 000 F », barre fine, chevron ; environ 64 px par ligne), 3 au maximum (règle produit), plus « Tout voir › » vers l'onglet Épargnes. Le pourcentage reste absent. À valider, puis à ajouter au Design System comme variante compacte de la carte projet.
8. **E04 vers E03 au retour** : la spec dit « retour à l'étape précédente », alors que le code est déjà validé. La maquette revient à E03 ; faut-il plutôt revenir à E02 ?
9. **Place de la cloche** de notifications sur l'accueil (lot F) et du lien « Besoin d'aide » : gardés tels que dans le DS et la spec, contact à confirmer (G03).
10. **QR** : marge blanche réduite et logo central à tester sur de vrais téléphones en plein soleil, avec la luminosité maximale (faisabilité Expo à confirmer).
11. **Notifications de statut** (lot F, à décider dès maintenant) : « Ton dépôt de 5 000 F est arrivé », « Ton versement vers École Awa est en attente », « Nouvelle connexion sur un autre téléphone », « Ton identité est vérifiée ». Elles prolongent le principe « statut réel avant tout ». Faut-il les traiter en tête du lot F, avec le SMS comme canal principal (G02) ? Sur l'accueil, la ligne « Dernier dépôt » de la carte solde en tient déjà lieu en partie. Les annonces de nouveautés restent au backlog (rappels et promotions hors MVP) ; le jour venu, une ligne discrète sur l'accueil ou une feuille unique après mise à jour, jamais de pop-up bloquant ni de pastille marketing sur la cloche.

## Reporté

Accès bloqué après trop d'essais (code et PIN, G02) ; chargement de H01 (squelette) ; chargement, erreur et hors ligne de Q01 ; dialogue de sortie d'A02 ; résultat inconnu d'A03 ; écrans KYC (sous-lot A2) ; lots B à F (écran « Bientôt ici » dans le prototype).
