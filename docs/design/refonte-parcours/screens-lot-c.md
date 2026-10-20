# Écrans — Refonte des parcours, lot C : dépôt, affectation, opérations et reçus

Date : 19 octobre 2026. Statut : **Lot C validé le 20 octobre 2026** par le PO et sa conjointe (après critique et test, sans remarque) : voir la section Validation.

Outil : Claude Design (type Design). Lien : canvas unique de l'app cliente [KOTIZ — App cliente](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF), page « Lot C — Dépôt et affectation », statut « Validé le 20 octobre 2026 ». Canvas à jour : **version 22** (`1792494666-2bc8`).
Design system : [DESIGN.md](../../../DESIGN.md) (racine) et [KOTIZ Design System](https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134) (non modifié). Le canvas garde sa copie v9 du DS (`ds/kotiz`), partagée avec les lots A et B ; les composants promus du lot B (`SummaryFlow`, `StepTracker` `sent`, `GoalRow` `reached`…) y sont dessinés dans `kotiz-app.css` comme au lot B.
Sources : [ux-spec-lot-c.md](ux-spec-lot-c.md) (fait foi : parcours, numérotation C-00 à C-17, décisions PO du 19 octobre 2026), [test-lot-c.md](test-lot-c.md), [brief.md](brief.md). Conventions : [screens.md](screens.md) (canvas unique), [screens-lot-b.md](screens-lot-b.md), [critique.md](critique.md), [critique-lot-b.md](critique-lot-b.md).

## Comment c'est construit

- **Même construction que les lots A et B.** Un seul composant d'écrans, `C-Proto.dc.html` (racine `.la-root.lot-c`), contient C-00 à C-17, plus A · H01, A · E08 et B · B07 en raccord (mêmes composants que les lots A et B), la feuille B · B15 et l'écran « Bientôt ici ». Chaque planche l'affiche dans un état : un écran a la même apparence partout, prototype compris.
- **Prototype cliquable unique** : `Main.dc.html` (page Pilotage). Son menu a une section « Lot C — Dépôt et affectation · En cours — maquettes » avec C-P1 à C-P8, C-P1′ (déposer auprès d'une agente, parcours de la spec) et quatre variantes de scénario : C-P1″ (dépôt en attente), C-P1‴ (frais inconnus), C-P4′ (reprise, solde baissé), C-P4″ (reprise, épargne fermée). La bande sombre (hors produit) dit « données et frais fictifs ».
- **Validation chez l'opérateur simulée** : « Ouvrir Wave » ouvre un écran « Simulation de l'application Wave · hors KOTIZ » (fond sombre, boutons neutres) avec Valider et Annuler. Le vrai protocole reste à confirmer (G01).
- **Frais du dépôt Mobile Money** (Décision PO Q1) : scénario « frais fictifs » = 1 % du montant, ajouté au débit, annoncé dans la bande et le menu du prototype ; jamais une valeur produit. La variante « frais inconnus » (Déposer bloqué avec sa raison) est dessinée (planche C-03) et jouable (C-P1‴).
- **Planches du lot C** (page « Lot C — Dépôt et affectation ») : `C-C-00` … `C-C-14`, `C-C-15-C-16`, `C-C-17`, `C-Raccords`, `C-Largeur-320`, plus `C-Proto` ; titres « C · C-00 Comment tu veux déposer ? — 3 états », etc. Notes orange « à confirmer » sous les planches, note verte de statut en tête.
- **Raccords réels** (prototype) :
  - A · H01 « Déposer » et A · E08 « Faire mon premier dépôt » ouvrent la feuille C-00 (sur une copie de raccord de H01 ou E08) ; fermer la feuille ramène à l'écran du lot A ; « Par Mobile Money » → C-01, « Auprès d'une agente » → C-17 → « Afficher Mon QR » → A · Q01.
  - A · H01 Opérations (barre basse), « Tout voir » et la ligne d'une opération ouvrent C-11.
  - B · B07 « Mettre de l'argent » ouvre C-06 sur B07 (même épargne, mêmes montants : le lot B transmet l'épargne) ; « Tout voir › » ouvre C-11 filtrée sur l'épargne ; la flèche retour ramène au B07 du lot B. B · H01 « Déposer » (C-00) et Opérations font de même. C-06 « En espèces chez une agente » ouvre C-17 (« Dis à l'agente que c'est pour École Awa. »), dont la flèche retour rouvre C-06.
  - Depuis le lot C : « Créer une épargne » ouvre B · B02 (lot B) ; à 3 actives, B · B15 s'ouvre dans le lot C ; « Remettre sur mon solde », « Modifier » et « Fermer cette épargne » ouvrent B · B07 du lot B ; Mon QR ouvre A · Q01.
  - Lots D, E et F : « Bientôt ici » (retraits, aide, profil, notifications) ; le dépôt en espèces s'arrête à C-17 (explication) et A · Q01.
- **Données fictives** : Fatou Koné, 07 08 12 34 56, solde 12 400 FCFA, École Awa 45 000 / 100 000 F (30 juin 2027), Boutique 8 000 / 50 000 F, Tabaski 52 000 / 50 000 F (scénario 3 actives), Moto fermée le 12 oct. ; références `KTZ-2610-00xx` et dossiers `2610-0007` / `2610-0008` marqués « fictive / fictif ». Historique (C-P6 à C-P8) : dépôt vers Boutique « dépôt fait · épargne pas faite », dépôt en attente du 17 oct., dépôt échoué, retrait Wave (lot D, ligne seulement), correction confirmée liée à un dépôt échoué du 10 oct., dossier résolu sur le dépôt du 12 oct.
- **Formats** : 360 × 800 ; planche de contrôle à 320 de large (C-01, C-03, C-05, C-08, C-11, C-12).

## Écrans

| ID | Écran | Maquette | États couverts | Statut | Écarts |
|---|---|---|---|---|---|
| C-00 | Comment tu veux déposer ? (feuille) | Planche C-C-00 | sur l'accueil, sur Compte créé, aucun opérateur disponible (Mobile Money désactivé + raison) | validé | Lignes « Par Mobile Money » et « Auprès d'une agente » avec pictogrammes au trait en pastille neutre (illustrations absentes du DS). Pas de bouton principal : toucher = suite |
| C-01 | Avec quoi tu déposes ? | Planche C-C-01 | vers mon solde (après C-00), pour une épargne, aucun opérateur (lien « Déposer auprès d'une agente › »), hors connexion (dernière liste connue, datée, opérateurs désactivés + raison) | validé | `OperatorRow` construit dans le canvas (logo 64 × 48, nom, chevron, ligne de 64). Plus de ligne espèces (C-00). « Depuis ton numéro 07 08 12 34 56 » sous la liste : numéro vérifié, non modifiable, sans lien ni bouton. |
| C-02 | Combien tu déposes ? | Planche C-C-02 | vide (inactif + raison), saisi clavier ouvert, montant rapide sélectionné, 0, au-delà du compte (Vérifier mon identité), pour une épargne | validé | Montants rapides = `kz-pick` du DS (fond information) avec état sélectionné vert doux + bordure 2 (comme « Tout remettre ») |
| C-03 | Vérifie ton dépôt | Planche C-C-03 | vers mon solde (frais fictifs), vers une épargne (deux temps numérotés), frais inconnus, refus connu d'avance, opérateur devenu indisponible, épargne fermée entre-temps, envoi, hors connexion | validé | `SummaryFlow` du lot B ; nœud de départ « Depuis ton numéro » + « 07 08 12 34 56 · Wave » (numéro vérifié, non modifiable, Décision PO du 19 octobre 2026). Dépôt vers une épargne : les deux temps sont une liste numérotée (« 1 Arrive sur ton solde », « 2 Passe dans École Awa ») au-dessus des lignes de montant, au lieu de deux lignes de montant |
| C-04 | Valide sur ton téléphone | Planche C-C-04 | attente de validation, vers une épargne (4 étapes), validée (le dépôt arrive), « Je n'ai rien reçu », simulation de l'opérateur | validé | `StepTracker` du DS : étapes passées « Envoyée », « Validée », jamais « Fait ». Feuille « Je n'ai rien reçu » : contenu provisoire (G01, G03) |
| C-05 | Résultat du dépôt | Planche C-C-05 | fait vers le solde, premier dépôt sans épargne (« Créer une épargne › »), fait vers une épargne, dépôt fait + épargne pas faite, dépôt fait + épargne en attente, en attente, on vérifie, annulé chez l'opérateur, échoué | validé | Partiel : carte sans pastille globale avec `LinkedStatusRows` (« Dépôt · Fait », « Dans École Awa · Échoué / En attente »). Annulé : « Rien n'a été pris sur ton Wave » non affiché tant que G01 ne le garantit pas |
| C-06 | D'où vient l'argent ? (feuille) | Planche C-C-06 | solde > 0 (solde en premier), solde à 0 (Mobile Money en premier, solde désactivé + raison) | validé | Pictogrammes au trait téléphone et personne dans une pastille neutre (illustrations absentes du DS) ; « Mon solde » garde l'illustration de B10 |
| C-07 | Combien tu mets de côté ? | Planche C-C-07 | vide, saisi clavier ouvert, Tout mon solde, plus que le solde, solde changé, reprise solde baissé (+ Plus tard) | validé | — |
| C-08 | Vérifie avant de mettre de côté | Planche C-C-08 | nominal (sans frais, sans PIN), reprise (« Suite à ton dépôt Wave du 19 oct. › », Plus tard), refus connu d'avance, envoi, hors connexion | validé | Pas d'étape PIN (Q3) : le bouton du récapitulatif confirme |
| C-09 | Résultat de la mise de côté | Planche C-C-09 | fait, fait en reprise, en attente, on vérifie, échoué | validé | Même structure que B · B12 |
| C-10 | Choisis une autre épargne (feuille) | Planche C-C-10 | une autre épargne active, 3 actives (limite), aucune autre, B · B15 depuis « Créer une épargne » | validé | Dessinée sur C-12 (reprise depuis le détail) ; même feuille depuis C-05 dans le prototype |
| C-11 | Opérations (racine) | Planche C-C-11 | rempli, filtré sur une épargne (puce « École Awa ✕ »), filtre sans résultat, vide (compte neuf), masqué, hors connexion, chargement | validé | `FilterChips` et `TransactionRow` avec sous-titre, variante interne et statut combiné construits dans le canvas. Statut combiné (réponse PO) : un seul mot d'action « À reprendre » en ambre (ou « En attente ») et la phrase « Dépôt fait, épargne pas encore. » (ou « … épargne en cours. ») sous le sous-titre. Lignes groupées par jour, « Voir plus » (7 lignes par page au prototype) |
| C-12 | Détail d'une opération | Planche C-C-12 | dépôt fait vers le solde, dépôt fait vers une épargne, en attente, échoué, dépôt fait + épargne pas faite, idem solde à 0, reprise faite, avec un signalement, correction confirmée liée, masqué, hors connexion non chargé | validé | Dépôt vers une épargne : `StatusPill` « À reprendre » (ambre) + « Dépôt fait, épargne pas encore. », puis `StepTracker` étendu (étape « Pas fait » en croix rouge, étape « Reprise vers … · 19 oct. »). Signalement existant : `InfoLine` « Mon signalement · Résolu · Dossier n° … » |
| C-13 | Reçu | Planche C-C-13 | dépôt vers le solde, dépôt vers une épargne, dépôt fait + épargne pas faite, masqué | validé | `Receipt` construit dans le canvas. Pas de bouton Partager (Q7). « Reçu fictif (prototype) » en pied |
| C-14 | Signaler un problème | Planche C-C-14 | sans motif (inactif + raison), prêt (motif, mot, photo), échec ou hors connexion, « Quitter sans envoyer ? » | validé | Motifs = emplacements « Motif A / B (à confirmer) » + « Autre chose » (G03), au style `DateChoice` (option d'une ligne). Photo simulée |
| C-15 | Mon signalement | Planche C-C-15-C-16 | envoyé (message juste après l'envoi), en cours, résolu (Je conteste), résolu avec correction, contesté (même dossier, historique gardé) | validé | `CaseTimeline` neutre (points gris, aucun vert). Statut du dossier en `StatusPill` neutre |
| C-16 | Je conteste cette réponse (feuille) | Planche C-C-15-C-16 | prêt, échec | validé | Après envoi : feuille fermée, C-15 « En cours » avec message d'information « Ton dossier est rouvert. » (ajout de maquette) |
| C-17 | Montre Mon QR à une agente | Planche C-C-17 | depuis C-00 (vers mon solde), depuis C-06 (« Dis à l'agente que c'est pour École Awa. ») | validé | Pastille 80 bleue avec pictogramme personne (illustration agente à demander). Trois étapes numérotées (même composant que les deux temps de C-03). « Afficher Mon QR » → A · Q01 |
| A · H01, A · E08, B · B07 | Raccords | Planche C-Raccords + C-C-00 + C-C-06 | H01 après un dépôt fait (17 400 F), H01 avec un dépôt en attente (solde inchangé, « Dernier dépôt … En attente »), H01 après le premier dépôt (compte neuf), B07 après un dépôt « À reprendre » (ligne « À reprendre », pas de ligne Réessayer) | — | Copies de raccord : mêmes composants que les lots A et B, mais les lignes d'opérations utilisent la nouvelle `TransactionRow`. L'état B07 « … ne sont pas entrés · Réessayer » n'est **pas** dessiné (décision PO : après le test C-P4) |
| — | Simulation de l'opérateur | Planche C-C-04 + prototype | valider, annuler | — | Hors produit |

## Parcours du prototype

| Parcours | Départ dans le menu | Chemin attendu |
|---|---|---|
| C-P1 Déposer sur mon solde | C-P1 → A · H01 (12 400 F) | Déposer → C-00 Par Mobile Money → C-01 Wave → 5 000 → C-03 (Pris 5 050 F, Frais 50 F, Arrive 5 000 F) → Déposer 5 000 F → C-04 → Ouvrir Wave → Valider → « Ton dépôt arrive. » → C-05 Fait → Voir mon solde : 17 400 F, Dernier dépôt + 5 000 F Fait |
| C-P1′ Déposer auprès d'une agente | C-P1′ → A · H01 | Déposer → C-00 → Auprès d'une agente → C-17 → Afficher Mon QR → A · Q01 (lot A) ; ← de C-17 rouvre C-00 |
| C-P1″ Dépôt en attente | C-P1″ → A · H01 | … → C-05 « Ton dépôt est en attente. » → Voir dans Opérations → C-12 en attente ; H01 : solde inchangé, Dernier dépôt En attente |
| C-P1‴ Frais inconnus | C-P1‴ → A · H01 | … → C-03 : message, Déposer désactivé, « Déposer est bloqué : frais inconnus. » |
| C-P2 Mettre de l'argent par Mobile Money | C-P2 → B · B07 École Awa | Mettre de l'argent → C-06 (En espèces → C-17) → Mobile Money → C-01 « Pour : École Awa » → C-02 → C-03 (deux temps) → C-04 (4 étapes) → C-05 « 5 000 F sont dans École Awa. » → Voir mon épargne : 50 000 F |
| C-P3 Mettre de l'argent depuis mon solde | C-P3 → B · B07 Boutique | Mettre de l'argent → Mon solde disponible → C-07 (Tout mon solde) → C-08 → Mettre … dans Boutique → C-09 Fait → Voir mon épargne |
| C-P4 Épargne pas faite, puis reprise | C-P4 → B · B07 École Awa | Mobile Money … → C-05 « Ton dépôt est fait. École Awa n'a pas reçu l'argent. » → Réessayer de mettre dans École Awa → C-08 « Réessayer de mettre de côté » → C-09 Fait (« Ton dépôt du 19 oct. est maintenant dans École Awa. ») ; « Laisser sur mon solde » garde la reprise (C-12, B07) |
| C-P4′ Reprise, solde baissé | C-P4′ → B · B07 École Awa | … → Réessayer → C-07 « Ton solde a baissé. Tu as 3 000 F disponibles. » (3 000 prérempli, plafond 3 000) → C-08 → C-09 |
| C-P4″ Reprise, épargne fermée | C-P4″ → B · B07 École Awa | … → Réessayer → C-10 « École Awa est fermée » → Boutique → C-08 → C-09, ou Laisser sur mon solde |
| C-P5 Limite de 3 épargnes | C-P5 → C-12 (École Awa fermée, 3 actives) | Réessayer → C-10 (Boutique, Tabaski, Loyer, « 3 épargnes actives : c'est le maximum. », pas de Créer) → une épargne de la liste → C-08, ou Laisser sur mon solde |
| C-P6 Opérations, détail, reçu | C-P6 → A · H01 (historique) | Opérations → filtres → « Dépôt vers École Awa » 18 oct. → Voir le reçu ; dépôt en attente du 17 oct. → « Le reçu sera prêt quand ce sera fait. » |
| C-P7 Signaler un problème | C-P7 → C-11 | Dépôt Wave 2 000 F en attente → Signaler un problème → motif → Envoyer → C-15 « Ton signalement est envoyé. » → ← C-12 « Mon signalement · Envoyé » |
| C-P8 Contester une réponse | C-P8 → C-15 dossier 2610-0007 Résolu | Je conteste cette réponse → C-16 → Envoyer ma contestation → C-15 En cours (Contesté gardé) ; Opérations → Correction → « Dépôt d'origine » |

Raccords (vérifiés en cliquant dans le prototype) : A-P9 « Déposer » → C-00 → ✕ → A · H01 (lot A) ; A-P9 Opérations → C-11 ; A-P8 « Faire mon premier dépôt » → C-00 → ✕ → A · E08 (lot A), et → Par Mobile Money → … → C-05 « Créer une épargne › » → H01 compte neuf ; C-P1′ → C-17 → A · Q01 ; B-P4 B07 « Mettre de l'argent » → C-06 → En espèces → C-17 → ← C-06 ; C-06 ✕ → ← B · B07 (lot B) ; B07 → Mon solde → C-09 → B07 47 000 F ; B-P2 H01 « Déposer » → C-00 → Par Mobile Money → C-01 → ← B · H01.

## Contrôle avant rendu

Contrôles faits sur un rendu local du runtime Design (le code publié dans le canvas), comme aux lots A et B.

- **Script sur les 102 téléphones des planches** : un seul bouton principal visible par écran (feuilles et dialogues compris) ; aucun texte essentiel sous 14 (seuls la barre basse, les dates des lignes, la bande du prototype et le clavier factice sont plus petits) ; aucune cible sous 44 ; aucun débordement à 360 ni à 320 ; barre basse seulement sur C-11 et A · H01 (racines). ✓
- **Parcours** : C-P1 à C-P8, les quatre variantes et les raccords A → C et B → C rejoués de bout en bout dans le prototype (Main). ✓
- **Statut réel** : l'attente est ambre + horloge (C-04, C-05 et C-09 en attente, lignes et détail), sans succès ni reçu ; « Fait » seulement après confirmation ; le partiel n'a pas de pastille globale ; le dossier « Résolu » est neutre. ✓
- **Couleurs** : vert réservé au bouton principal et à la carte solde ; ambre = attente, rouge = échec ; violet seulement dans la pastille Épargnes déjà validée (C-10, B15) ; logos opérateurs non recolorés. ✓
- **Aucun PIN** au lot C (Q3). Mise de côté sans ligne Frais (Q2). ✓
- **Aucune valeur inventée** : frais = fictifs annoncés hors produit ; aucun minimum, plafond, délai, motif de signalement ni liste d'opérateurs réelle (« à confirmer » en notes). ✓
- **Corrections faites pendant le contrôle** : résultats C-05 et C-09 centrés dans un seul bloc ; texte « Passe dans … » coupé par le runtime (valeur `{{x}}` dans un conteneur flex) ; bouton « Réessayer » hors connexion sur C-03 et C-08 ; liste d'opérateurs cachée hors connexion ; frais masqués avec le montant sur C-12 ; colonnes clé / valeur du reçu et du signalement ; « Ton montant » de C-08 qui touchait le bord.
- **Non vérifié** : le rendu dans le canvas claude.ai lui-même (navigateur intégré sans session claude.ai) ; un vrai Android et TalkBack ; les 404 du runtime en local (ressources propres à claude.ai, sans effet sur l'affichage).

## Composants candidats à promouvoir dans le Design System

Construits dans le canvas (`kotiz-app.css`, préfixe `lc-`), avec des tokens seulement. Le Design System n'a pas été modifié.

1. **`TransactionRow`** (évolutions) : sous-titre origine → destination (14, `text-secondary`) ; variante **`internal`** (pastille `surface-canvas` + pictogramme flèches internes, jamais de logo d'opérateur ni de vert doux d'apport) ; **statut combiné** (Q4, réponse PO) : mot d'action « À reprendre » / « En attente » en ambre côté montant + phrase « Dépôt fait, épargne pas encore. » / « … en cours. » sous le sous-titre. Utilisée sur C-11, C-12 (lié), C-15, A · H01 et B · B07 en raccord.
2. **`OperatorRow`** (C-01) et ligne de choix (C-00, C-06) : logo 64 × 48 ou pictogramme en pastille 48, libellé 16 Semi Bold, raison en 14 si désactivée, chevron ; ligne de 64, filets.
3. **`LinkedStatusRows`** (C-05) : deux lignes de statut avec `StatusPill`, sans pastille globale.
4. **`StepTracker`** (évolution) : statut d'étape **`failed`** (« Pas fait », croix sur `surface-error`) et étape de reprise ; jusqu'à 4 étapes (dépôt vers une épargne) ; mot « Validée ».
5. **`FilterChips`** (C-11) : puces 44 sur une ligne défilante, une active (vert doux + bordure 2), puce d'épargne amovible « École Awa ✕ ».
6. **`Receipt`** (C-13) : carte bordée, en-tête KOTIZ + `StatusPill`, type, montant 34, lignes clé / valeur (colonne de 120), pied « Reçu fictif ».
7. **`CaseTimeline`** (C-15) : jalons neutres datés, point courant en `text-primary`, aucun vert ; `StatusPill` neutre « Envoyé / En cours / Résolu ».
8. **Montants rapides sélectionnés** (C-02) : état sélectionné de `kz-pick`.
9. **Étapes numérotées** (C-03, C-17) : pastille 28 numérotée + phrase (« 1 Arrive sur ton solde », « 1 L'agente scanne ton QR. »).
10. **Pictogrammes et illustrations** à dessiner : flèches internes, téléphone (Mobile Money), personne (agente) ; illustration agente pour C-17 (pastille 80).

## Écrans de résultat plein écran (C-05, C-09) — commentaire du PO du 19 octobre 2026

Commentaire : « on ne sent pas qu'on est sur mobile, impression de pop-up ». Avant, le résultat était une carte blanche centrée sur un fond gris, sans en-tête, avec les liens dans la carte. Version 18 :
- fond blanc pleine page ; barre d'app avec seulement une croix « Fermer » de 48 à gauche, qui ramène au point de départ (A · H01, ou B · B07 pour une épargne), jamais aux écrans de saisie ;
- bloc de statut dans le tiers haut, aligné à gauche : pictogramme de statut 64 (coche, horloge ou croix), `StatusPill` (mot + pictogramme), titre, montant en `amount` (34) ;
- détails dans le flux de la page : étapes (en attente), lignes liées « Dépôt / Dans {épargne} », « Ne refais pas l'opération. », puis lignes Depuis, Vers, progression de l'épargne, « Sur ton solde », Référence ;
- actions ancrées en bas : un bouton principal pleine largeur (« Terminé » ; « Voir mon épargne » quand la destination est une épargne ; « Reprendre » pour « À reprendre » ; « Réessayer » pour un échec), puis des boutons texte (« Voir le reçu », « Laisser sur mon solde », « Voir dans Opérations », « Contacter l'aide »). Plus aucun lien dans le contenu.
- Titres reformulés pour ne pas répéter le montant, qui a maintenant sa ligne : « Ton argent est sur ton solde. », « Ton argent est dans École Awa. », « Ton dépôt n'a pas marché. », « Ce n'est pas allé dans Boutique. » (écart de libellé à reporter dans la spec).
- Toutes les règles de statut sont gardées : ambre + horloge pour l'attente et « À reprendre », aucun vert de succès sur un écran d'attente (seules les étapes déjà passées « Envoyée / Validée » et la ligne « Dépôt · Fait » d'un dépôt réellement fait), « Ne refais pas l'opération. » ; les 9 états de C-05 et les 5 de C-09 sont redessinés. Vérifié à 360 et 320 (un seul bouton principal, cibles ≥ 44, aucun débordement après correction de la référence).
- **Même défaut probable sur des résultats déjà validés : B · B12 (retour au solde) et A · E07 (création de compte).** Non touchés ; à soumettre au PO.

## Zone d'action, illustrations et visibilité de C-00 (version 19)

- **Zone d'action fixe** (PO : « un bouton dans le vide en bas ») : sur tous les écrans du lot C avec un bouton bas, la zone est fixe en bas d'écran, fond `surface`, padding 16 au-dessus de la zone sûre, avec un filet `border-default` **seulement** quand le contenu défile dessous (calculé dans le prototype). Le contenu reste en haut de l'écran : plus aucun centrage vertical au lot C (les résultats C-05 et C-09 l'avaient perdu en version 18). Vérifié sur C-00 à C-17 : un seul bouton principal, cibles ≥ 44, aucun débordement à 360 et 320.
- **Illustrations du Design System v12** (groupe Actions) : `mobile-money.svg` et `agente.svg` remplacent les pictogrammes provisoires sur C-00 (pastilles neutres 64), C-06 (48) et C-17 (64 dans une pastille 80). Copie du DS dans le canvas : `tokens.json` et l'enregistrement du design system passés en v12 (`1792440758-5fce`). Le bundle de composants du canvas reste la copie v9, pour ne pas changer le rendu des lots A et B validés.
- **C-00 rendue évidente** : planche « C · C-00 Comment tu veux déposer ? » en premier de la section Lot C, sur la rangée « Entrée du dépôt : feuille « Déposer » (C-00), puis avec quoi, combien, vérifier » ; état « A · H01 · feuille Déposer ouverte » ajouté à C · Raccords ; C-00 ajoutée au contrôle 320 ; entrée de menu « C-00 Feuille « Déposer » » qui s'ouvre sur l'accueil avec la feuille. Vérifié dans le prototype : la feuille s'ouvre depuis Déposer d'A · H01, « Faire mon premier dépôt » d'A · E08, « Faire un dépôt » d'Opérations vide et Déposer de B · H01.

## Corrections de la critique (version 20)

Les 15 corrections de [critique-lot-c.md](critique-lot-c.md) sont appliquées (validées par le PO) ; statut détaillé dans la critique. Principaux changements d'écran :
- C-03 : « Pris sur ton Wave : 5 050 F » sous le montant ; « Frais : 50 F (fictifs) ».
- C-04 : « Valide 5 050 F sur ton Wave », « 5 000 F arrivent sur ton solde. », « Valide dans Wave, puis reviens ici. », « Voir dans Opérations » quand c'est validé, « Le dépôt n'arrive pas ? ».
- C-05 À reprendre : titre « 5 000 F sont sur ton solde. », sous-titre « École Awa ne les a pas reçus. ». Échoué : « Ton Wave a été débité ? Signale-le ».
- C-11 / C-12 : « + » seulement quand c'est Fait ; « Pas encore sur ton solde. » / « Rien n'est arrivé sur ton solde. » ; plus de bouton principal « Signaler » sur un dépôt en attente ; une seule puce de filtre active.
- C-13 : reçu d'un dépôt dont l'épargne n'est pas faite sans pastille globale, « Arrivé sur : Mon solde », passage « Pas fait » en rouge avec croix, « Pris sur ton Wave ».
- C-15 : envoi en message d'information ; « Résolu ne veut pas dire remboursé. » et « Aucune somme n'a été versée pour ce dossier. ».
- C-02 : « Ton identité est en vérification. » au lieu du lien ; C-17 « dans KOTIZ ».
- Montants jamais coupés (espaces insécables) ; une référence fictive par opération ; reprise calculée sur 17 400 F.
- C-10 à 3 actives (décision PO du 19 octobre 2026, version 21) : plus de « Créer une épargne › », seulement « 3 épargnes actives : c'est le maximum. » (texte), comme au lot B. B15 n'est plus ouvert depuis le lot C ; planche C-10 à 3 états.

**Reporté au lot B le 20 octobre 2026 (canvas version 22, planche B · B07, état « Dépôt pas entré ») : B07 dépôt pas entré** — dans « Derniers mouvements » d'une épargne, un dépôt fait dont le passage a échoué s'affiche « Depuis Wave » · « Sur ton solde » · « 5 000 F » (sans « + », `text-secondary`) · « Pas entré » (croix) ; au-dessus, `InfoLine` « 5 000 F sont restés sur ton solde. Les mettre ici › » (→ reprise, C-08). Dessiné sur la copie de raccord du lot C (planche C · Raccords) ; B-Proto et la section Lot B ne sont pas modifiés.

## Évolution post-MVP : autre numéro

Au MVP, le dépôt part toujours du numéro vérifié de la cliente (Décision PO du 19 octobre 2026), affiché sur C-01 (« Depuis ton numéro 07 08 12 34 56 ») et C-03 (« Depuis ton numéro 07 08 12 34 56 · Wave »). La ligne est une ligne pleine largeur sous la liste (C-01) et le nœud de départ du récapitulatif (C-03) : elle pourra devenir un choix plus tard, sans changer la mise en page. Aucun bouton « Ajouter un numéro » ni lien inactif au MVP. Annotation posée dans les notes orange de C-01 et C-03.

## Écarts à la spec

- C-03 vers une épargne : les deux temps sont numérotés hors des lignes de montant (la ligne « Arrive sur ton solde » porte le montant une fois).
- C-11 vide : « Faire un dépôt » ouvre aussi la feuille C-00 (même entrée que « Déposer »).
- Ambre pour « À reprendre » : décision PO du 19 octobre 2026 ; DESIGN.md réserve l'ambre à « En attente » : règle à étendre au Design System (« à reprendre » = attente d'une action).
- C-00 depuis un autre lot : la feuille s'ouvre sur une copie de raccord de l'accueil ou de Compte créé (données du lot C : École Awa, Boutique), puis la fermeture ramène à l'écran réel du lot d'origine.
- Prototype : C-P1′ est désormais « Déposer auprès d'une agente » (spec) ; les variantes de scénario sont C-P1″ (en attente) et C-P1‴ (frais inconnus).
- C-16 succès : message d'information « Ton dossier est rouvert. Ce n'est pas un remboursement. » sur C-15 (la spec ne prévoit que le changement de statut).
- C-12 « Reprise faite » : étape « Reprise vers … · 19 oct. » dans le `StepTracker`, sans montant (masquage) ; le montant est sur le reçu.
- Raccords A · H01 et B · B07 du lot C : nouvelle `TransactionRow` (les planches validées des lots A et B gardent l'ancienne, inchangées). À aligner au handoff.
- Prototype : A-P9 et B-Px → Opérations ouvrent l'historique fictif du lot C (pas les trois lignes fixes de l'accueil du lot A) ; B · B12 « Voir le reçu » ouvre Opérations, pas le reçu du retour (données de prototype séparées).
- Pilotage : le lien « Lot B » disait encore « En cours — maquettes » ; corrigé en « Validé le 19 octobre 2026 ». Planche `B-Raccords` renommée (« ancien raccord lot C (Bientôt ici, remplacé par le lot C) »), rendu inchangé.

## Validation

**Lot C validé le 20 octobre 2026** par le PO et sa conjointe, après la critique ([critique-lot-c.md](critique-lot-c.md), 15 corrections appliquées) et le test de [test-lot-c.md](test-lot-c.md), sans remarque. La validation couvre C-00 à C-17, les raccords A · H01, A · E08 et B · B07, et les parcours C-P1 à C-P8 (avec C-P1′, C-P1″, C-P1‴, C-P4′, C-P4″) dans la version 21 du canvas ; la version 22 ne change que les statuts et reporte au lot B l'état B07 « Dépôt pas entré ».
- Pilotage : case ① « Design validé » cochée pour C-P1 à C-P8, phase « validé » ; section du canvas « Lot C — Dépôt et affectation · Validé le 20 octobre 2026 ».
- PNV-2 : refusée après test (aucune confusion). PNV-1 : refusée (décision PO du 19 octobre 2026).
- Suite : handoff du lot C, Gherkin et issues (#66, #67, #69, nouvelles issues mise de côté et Opérations).

## Réponses du PO (19 octobre 2026)

1. **Frais fictifs** : modèle « ajoutés au débit » gardé (« Pris sur ton Wave 5 050 F · Arrive 5 000 F »), toujours annoncé fictif dans la bande hors produit.
2. **Statut combiné** : une seule pastille d'action, « À reprendre » en ambre + « Dépôt fait, épargne pas encore. » (ou « En attente » + « Dépôt fait, épargne en cours. ») ; plus de double segment ; même logique sur le détail (C-12), le signalement (C-14, C-15). Appliqué, version 17.
3. **B · B07 « … ne sont pas entrés · Réessayer »** : pas maintenant, après le test C-P4. Retiré du raccord B07 du lot C.
4. **C-01 hors connexion** : dernière liste connue, datée (« Mis à jour à 14:32 · hors connexion »), opérateurs désactivés avec la raison « Déposer demande la connexion. Réessaie quand tu captes. ». Appliqué ; logos non atténués (marques non recolorées).
5. **Illustrations Mobile Money et agente** : Design System v12, appliquées en version 19 (C-00, C-06, C-17).
6. **PNV-2** (« Dernier dépôt » avec sa destination) : **refusée après test** (20 octobre 2026) : aucune confusion observée en C-P2-3.

## Reporté


- `test-lot-c.md` nomme les scénarios « Dépôt en attente » et « Frais inconnus » : dans le menu du prototype, ce sont C-P1″ et C-P1‴.
- Lots D, E, F : « Bientôt ici » dans le prototype.
