# Issues — Refonte des parcours, lot A : accès et accueil

Date : 19 octobre 2026. Statut : **brouillons, rien n'est publié sur GitHub**. La publication des commentaires est faite par la session principale après relecture et feu vert explicite du PO (brief : « aucune modification d'issue sans feu vert explicite du PO »).

Sources : [handoff-lot-a.md](handoff-lot-a.md), [gherkin-lot-a.md](gherkin-lot-a.md), [screens.md](screens.md), issues lues le 19 octobre 2026 avec `gh issue view` (#58 à #85).

**Constat sur les issues actuelles** : #59, #64, #65 et #75 n'ont que trois critères génériques (« démontrable de bout en bout », « échecs, autorisations et preuves d'audit couverts », « valeurs configurables »). Les brouillons ajoutent les critères vérifiables du design ; ils ne retirent rien.

**Liens vers la branche** : les liens GitHub ci-dessous pointent vers `docs/restructure-documentation`. Les trois fichiers ne sont **ni commités ni poussés** : les liens ne répondront qu'après le push de la branche.

## Correspondance parcours / écrans → issues

| Parcours | Écrans | Issue | Scénarios | Remarque |
|---|---|---|---|---|
| Socle (tous) | tokens, composants `Kotiz.*`, barre basse, règles d'accessibilité | [#59](https://github.com/kotiz-ci/platform/issues/59) D02 Socle UI accessible | A-P2-S2, A-P9-S7, A-P9-S14 + critères « Socle » du handoff | Précédé du réalignement des tokens (sans issue, voir plus bas) |
| P1 Inscription autonome | E01, E02, E03, S01, E04, E05, E06, E07, E08 | [#64](https://github.com/kotiz-ci/platform/issues/64) D03 Compte sécurisé en mode limité | A-P1-S1 à S28 | Cœur de l'issue |
| P2 Accompagnée | mêmes écrans que P1 | [#64](https://github.com/kotiz-ci/platform/issues/64) | A-P2-S1 à S4 | Aucun écran propre |
| P4 Activation personnelle (côté cliente) | E01, E02, E03, E05′, E06, E07, E08′ | [#64](https://github.com/kotiz-ci/platform/issues/64) **en partie** | A-P4-S1 à S7 | Dépend de la fiche créée par l'agente, qui n'a pas d'issue |
| P5 Téléphone habituel | C01 → H01 | [#64](https://github.com/kotiz-ci/platform/issues/64) | A-P5-S1 à S6 | Accès bloqué : G02, écran reporté |
| P6 Nouveau téléphone | E01, E02, E03, C01, E10 → H01 | [#64](https://github.com/kotiz-ci/platform/issues/64) | A-P6-S1 à S7 | — |
| P7 Numéro déjà inscrit | E09 → C01 | [#64](https://github.com/kotiz-ci/platform/issues/64) | A-P7-S1 à S6 | — |
| P8 Compte créé | E08 → H01 vide | [#64](https://github.com/kotiz-ci/platform/issues/64) | A-P8-S1 à S6 | Sorties vers lots B et C |
| P9 Accueil — ligne d'identité | H01 (ligne KYC, 5 statuts) | [#65](https://github.com/kotiz-ci/platform/issues/65) D04 KYC progressif | A-P9-S9 à S11 | Invitation et statuts seulement ; capture en sous-lot A2 |
| P9 Accueil — état vide | H01 vide | [#64](https://github.com/kotiz-ci/platform/issues/64) | A-P9-S1, A-P8-S2 | Arrivée après inscription / activation |
| P9 Accueil — rempli, masquage, statuts, hors ligne | H01 | **aucune issue** | A-P9-S2 à S8, S12 à S15 | Voir « Capacités sans issue » |
| P10 Mon QR | Q01 | **aucune issue** | A-P10-S1 à S5 | Voir « Capacités sans issue » |
| P3 Agente : Ajouter une cliente | A02, A03, A04 (app agente) | **aucune issue** | A-P3-S1 à S12 | #70 ne couvre pas la fiche cliente |
| Envoi des SMS (code, renvoi, invitation) | E02, E03, S01, A04 | [#75](https://github.com/kotiz-ci/platform/issues/75) D14 Notifications transactionnelles | A-P1-S6, A-P1-S10, A-P1-S11, A-P3-S9 | Dépendance à revoir (voir brouillon #75) |

**Issues lues et non concernées** : #70 D09 « Activer une agente et gérer ses avoirs » (activation et float de l'agente, pas la fiche d'une cliente) ; #66 à #69, #71 à #74, #76 à #85 (dépôt, retrait, cash, épargne, admin, Santé, étoiles, décisions de canal) ; #58 D01 (frontières de modules, prérequis technique de #59 et #64).

## Capacités du lot A sans issue

Aucun numéro n'est inventé. Chaque ligne est à arbitrer par le PO : nouvelle issue ou rattachement à une issue existante.

| Capacité | Écrans | Scénarios | Contexte DDD | Piste |
|---|---|---|---|---|
| **Créer la fiche d'une cliente depuis l'app agente**, avec invitation SMS et statuts Fiche / Accès / Invitation | A02, A03, A04 (variant `agent`) | A-P3-S1 à S12 | Agents (`CustomerEnrollment`) + Notifications | Nouvelle issue « Ajouter une cliente (fiche agente + invitation) ». #70 ne la couvre pas. |
| **Activer une fiche créée par une agente** (routage fiche → E05′, accès « activé » visible côté agente) | E05′, E08′ | A-P4-S1 à S7 | IAM + Agents | Soit critère ajouté à #64 (côté cliente), soit dans la nouvelle issue ci-dessus ; dépend de la fiche. |
| **Accueil rempli** : carte solde, dernier dépôt, raccourcis, 3 épargnes, 3 dernières opérations, statuts Fait / En attente / Échoué, hors ligne daté, barre basse | H01 | A-P9-S2 à S4, S12 à S15 | Savings (lecture) | Nouvelle issue « Accueil cliente », bloquée par #66 (dépôt) et #73 (épargne) pour les données réelles ; l'état vide reste dans #64. |
| **Masquage persistant des montants** (Accueil, puis Épargnes et Opérations) | H01 (+ lots B, C) | A-P9-S5 à S8 | app mobile (préférence locale) | Avec l'issue « Accueil cliente », ou dans #59 si on le traite comme comportement du socle. |
| **Mon QR** (affichage du QR d'identification, luminosité maximale) | Q01 | A-P10-S1 à S5 | IAM / Agents (identification au cash-in) | Rattachement possible à #71 D10 cash-in (« Scan et confirmation client ») ou nouvelle issue ; contenu du QR à confirmer G02. |
| **Réaligner `packages/design-tokens` sur DESIGN.md** (palette v2 navy / teal → Direction 04 vert `#00564D`) | tous | critères « Socle » du handoff | — | Décision PO du 19 octobre 2026 : « issue à ouvrir plus tard ». Prérequis de #59 pour le lot A. |

Raccords vers des lots non livrés, sans issue de lot A à créer : aide et contact (« Besoin d'aide ? », « Contacter l'aide », « Ce n'est pas moi », G03), récupération d'accès (« PIN oublié ? », « Récupérer mon accès », « J'ai changé de numéro »), notifications (cloche), Profil — lot F.

## Paramètres « à confirmer » du lot A

| Paramètre | Gate | Écrans |
|---|---|---|
| Longueur du code SMS, durée de validité, délai avant « Renvoyer », nombre de renvois et de tentatives, blocage, « seul le dernier code vaut », lecture automatique du SMS | G02 | E02, E03, S01 |
| Longueur finale du PIN (4 au prototype, composant jusqu'à 6), PIN refusés, essais et blocage | G02 | E06, E07, C01 |
| Reconnaissance du téléphone habituel, prénom affiché sur C01, délai de verrouillage, sort des anciennes sessions | G02 | C01, P6 |
| Moment de révélation de l'existence d'un compte, affichage du nom de la fiche en activation, E10 → E04 sans nouveau code | G02 | E03, E05′, E10 |
| Invitation : déclencheur, contenu, lien d'installation, validité, renvoi | G02 | A03, A04 |
| Mon QR : contenu, fixe ou renouvelé, hors ligne, capture autorisée | G02 | Q01 |
| Liste, textes et versions des accords ; consigne « comme sur ta pièce » ; règles de nom | G01 | E04, E05 |
| Solde avec une opération en attente ; compte fermé ou suspendu | G01 (+ G02) | H01, E09 |
| Contact derrière toutes les entrées d'aide | G03 | E02, S01, E05′, E07, C01, A02 |
| Faisabilité Expo de la luminosité maximale ; capture d'écran bloquée ; délais d'expiration réseau | technique | Q01, E06, E07, C01 |

**Valeurs de démonstration à ne jamais reprendre** : décompte de 15 s, code SMS accepté dès 4 chiffres (0000 / 9999), PIN 2468, données fictives.

---

## Brouillon — commentaire pour #59 (D02 Fournir le socle UI accessible)

```markdown
## Design validé (lot A, 19 octobre 2026)

Le lot A (accès et accueil de l'app cliente) a été validé par le PO le 19 octobre 2026, après test des 10 parcours par une testeuse sur le prototype. Cette issue reçoit le socle dont tous les écrans du lot ont besoin.

- Prototype : https://claude.ai/artifact/BrxhpBYZ9u4ejXV4bmUWWK
- Design System KOTIZ v9 (composants `Kotiz.*`) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (tokens, composants, états) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-a.md
- Gherkin : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-a.md
- Référence visuelle : `DESIGN.md` à la racine.

### Écrans concernés
Tous les écrans du lot A : E01 à E10, S01, C01, H01, Q01 (app cliente) et A02 à A04 (app agente).

### Critères d'acceptation ajoutés
- [ ] Les tokens de `DESIGN.md` (couleurs, typographies Inter, espacements, rayons, tailles, ombre overlay, durées 160 / 240 / 320 ms) sont exposés par `@kotiz/design-tokens` et consommés par l'app ; plus aucune valeur de la palette v2 (navy, teal, or) n'est utilisée.
- [ ] Aucun écran n'utilise de couleur, de taille de texte ou de rayon en dur.
- [ ] Les composants `Button`, `PageHeader`, `TextField`, `Message`, `PinSlots`, `PinPad`, `CheckOption`, `IconPastille`, `NumberChip`, `StepTracker`, `StatusPill`, `HomeHeader`, `BalanceCard`, `Shortcuts`, `InfoLine`, `GoalRow`, `TransactionRow`, `BottomNav` et `BottomSheet` existent avec les propriétés et états du handoff.
- [ ] Chaque commande a une zone tactile d'au moins 48 × 48 et un rôle d'accessibilité.
- [ ] Un statut s'affiche toujours en mot et avec son pictogramme : « Fait », « En attente », « Échoué », « Non débité ». Le mot du statut fait est « Fait » partout.
- [ ] Le rose d'erreur ne sert qu'aux erreurs et aux échecs ; l'ambre ne sert qu'au statut « En attente ».
- [ ] `PinSlots` n'affiche jamais un chiffre et lit sa longueur dans la configuration.
- [ ] Texte essentiel en 14 minimum ; le 12 n'est utilisé que pour la barre basse et les dates.
- [ ] Les écrans restent lisibles, sans chevauchement, à 320 de large et avec le plus grand texte système.
- [ ] Avec « réduire les animations », aucune transition n'est animée.
- [ ] La barre basse (Accueil, Épargnes, Opérations, Profil) n'apparaît que sur les écrans racines (scénario A-P9-S14).
- [ ] Un montant masqué est lu « Montant masqué » par TalkBack (A-P9-S7).

### Écarts avec les critères actuels de l'issue
- Les trois critères actuels sont génériques ; ceux ci-dessus les rendent vérifiables pour le lot A.
- **Prérequis sans issue** : `packages/design-tokens` décrit encore la palette v2 ; `DESIGN.md` (vert `#00564D`) fait foi. Le réalignement est un chantier code séparé (décision PO du 19 octobre 2026), à ouvrir avant ou dans cette issue.
- L'audio et le mode vocal cités par l'issue ne sont pas dessinés dans le lot A (optionnels, jamais par défaut).
- Le masquage persistant des montants peut être porté ici (comportement transverse) ou par une issue « Accueil cliente » : à arbitrer.

### Paramètres à confirmer
- Longueur du PIN et du code (G02) : les composants acceptent 4 à 6 cases, la valeur vient de la configuration.
- Assets : illustration Direction 04 de l'écran Bienvenue à livrer ; pictogrammes Épargnes et Opérations de la barre basse provisoires.
```

## Brouillon — commentaire pour #64 (D03 Ouvrir un compte sécurisé en mode limité)

```markdown
## Design validé (lot A, 19 octobre 2026)

Le lot A (accès et accueil de l'app cliente) a été validé par le PO le 19 octobre 2026, après test des 10 parcours par une testeuse sur le prototype.

- Prototype (menu P1 à P10) : https://claude.ai/artifact/BrxhpBYZ9u4ejXV4bmUWWK
- Design System KOTIZ v9 : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-a.md
- Gherkin (scénarios A-P1, A-P2, A-P4, A-P5 à A-P8, A-P9-S1) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-a.md

### Écrans concernés
E01 Bienvenue · E02 Ton numéro · E03 Ton code SMS · S01 Pas de SMS ? · E04 Ton nom · E05 Tes accords (et variante activation E05′) · E06 Crée ton PIN · E07 Écris-le encore une fois + création (en cours, résultat inconnu, échec) · E08 Compte créé / Ton accès est activé · E09 Ce numéro a déjà un compte · E10 Aucun compte avec ce numéro · C01 Entrer mon PIN · H01 Accueil (état vide).

Parcours : P1 inscription autonome, P2 accompagnée, P4 activation (côté cliente), P5 téléphone habituel, P6 nouveau téléphone, P7 numéro déjà inscrit, P8 compte créé.

### Critères d'acceptation ajoutés
- [ ] Une seule entrée « Créer mon compte » : après un code SMS valide, le système route vers le nom (aucun compte), les accords en variante activation (fiche agente), « Ce numéro a déjà un compte » (compte actif) ; « Me connecter » route vers le PIN ou « Aucun compte avec ce numéro ».
- [ ] Aucune réponse avant un code SMS valide ne révèle si un numéro a un compte ou une fiche (A-P1-S25, A-P4-S6).
- [ ] « Ce numéro a déjà un compte » n'affiche que le numéro ; aucun second compte n'est possible (A-P7-S2, A-P7-S5).
- [ ] Le code SMS seul n'ouvre jamais le compte : le PIN est toujours demandé (A-P6-S3).
- [ ] Les boutons « Recevoir le code », « Valider », « Continuer » et « J'accepte et je continue » restent désactivés tant que la saisie est incomplète, avec la raison affichée.
- [ ] Chaque accord est enregistré séparément avec sa version de texte (A-P1-S18).
- [ ] Le PIN est saisi deux fois ; deux saisies différentes ramènent à la création avec « Les deux codes ne sont pas pareils. Recommence. ».
- [ ] Pendant la création, l'écran affiche « Création de ton compte… » sans aucun signe de succès ; « Compte créé » n'apparaît qu'après confirmation du serveur (A-P1-S21).
- [ ] Délai dépassé → statut « En attente », « On vérifie ton compte », suivi des étapes et « Vérifier à nouveau » ; échec → « Échoué », « Ton compte n'est pas créé », « Réessayer » (A-P1-S22, A-P1-S23).
- [ ] La création de compte et l'activation sont idempotentes : une nouvelle tentative avec la même clé ne crée jamais un second compte (A-P1-S24).
- [ ] PIN et code SMS ne sont jamais affichés en clair, stockés sur l'appareil ni journalisés (A-P1-S26).
- [ ] La mention « Ne le montre à personne, même à une agente. » est sur l'écran du code et les deux écrans PIN (A-P2-S2) ; aucune API accessible à une agente ne reçoit le code, le PIN ou les consentements d'une cliente (A-P2-S3).
- [ ] Après création ou activation, « Créer mon épargne » est le seul bouton principal ; « Plus tard » et le retour Android ouvrent l'accueil vide (« 0 FCFA », Retirer désactivé avec sa raison).
- [ ] Sur le téléphone habituel, l'app ouvre directement « Akwaba, {prénom} » + PIN ; un PIN faux affiche « PIN incorrect. Réessaie. ».
- [ ] Les prénoms affichés (Compte créé, PIN, accueil) sont ceux de la cliente, jamais une valeur par défaut.
- [ ] Hors ligne : saisie gardée, « Réessayer », aucun écran suivant, aucun succès supposé.

### Écarts avec les critères actuels de l'issue
- Les trois critères actuels sont génériques ; ceux ci-dessus les rendent vérifiables.
- **Récupération** (citée par l'issue) : le lot A ne dessine que les entrées (« PIN oublié ? », « Récupérer mon accès », « J'ai changé de numéro ») ; les écrans de récupération sont au lot F.
- **Capacités limitées visibles** (citée par l'issue) : le design n'annonce aucun plafond ni capacité chiffrée tant que le partenaire ne les a pas confirmés ; seule la ligne d'identité de l'accueil invite à vérifier son identité (#65).
- **Accès bloqué** après trop d'essais (code SMS et PIN) : non dessiné, en attente de G02.
- L'activation d'une fiche créée par une agente (P4) suppose la création de fiche côté agente, **qui n'a pas d'issue** à ce jour.
- Preuves d'audit : non dessinées (pas d'écran), à couvrir côté backend.

### Paramètres à confirmer
- G02 : longueur, validité, délai avant renvoi et nombre de tentatives du code SMS ; blocage ; lecture automatique du SMS ; longueur finale du PIN (4 au prototype, jusqu'à 6) et PIN refusés ; essais et blocage du PIN ; reconnaissance du téléphone habituel et délai de verrouillage ; moment de révélation d'un compte ; affichage du nom de la fiche en activation ; création depuis « Aucun compte » sans nouveau code ; sort des anciennes sessions.
- G01 : liste et textes des accords ; consigne « comme sur ta pièce » et règles de nom ; compte fermé ou suspendu.
- G03 : contact derrière « Besoin d'aide ? », « Contacter l'aide » et « Ce n'est pas moi ».
- Les valeurs du prototype (décompte de 15 s, code accepté dès 4 chiffres, PIN 2468) sont des données de démonstration, pas des règles.
- Ouvert côté produit : retour depuis « Ton nom » vers le code ou vers le numéro.
```

## Brouillon — commentaire pour #65 (D04 Compléter progressivement le KYC)

```markdown
## Design validé (lot A, 19 octobre 2026)

Le lot A a été validé par le PO le 19 octobre 2026. Pour le KYC, il ne couvre **que l'invitation et les statuts** sur l'accueil (décision PO : les écrans de capture des pièces forment le sous-lot A2, qui attend le partenaire).

- Prototype (parcours P9) : https://claude.ai/artifact/BrxhpBYZ9u4ejXV4bmUWWK
- Design System KOTIZ v9 (composant `InfoLine`) : https://claude.ai/artifact/F7WrzuAZTLaJ1MEGEEu134
- Handoff (H01, ligne d'identité) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-a.md
- Gherkin (A-P9-S9 à A-P9-S11) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-a.md

### Écrans concernés
H01 Accueil — ligne d'identité discrète (une ligne, pas une carte). Côté agente, A02 « Ajouter une cliente » ne demande aucune pièce.

### Critères d'acceptation ajoutés
- [ ] La ligne d'identité de l'accueil suit le statut KYC :
  - non commencé : « Vérifie ton identité pour aller plus loin. › » (mène à la vérification) ;
  - en vérification : « Ton identité est en vérification. » (sans suite, ni chevron ni bouton) ;
  - complément requis : « Il manque une information pour ton identité. › » ;
  - refusé : « Ta vérification n'a pas abouti. Voir pourquoi › » ;
  - validé : la ligne disparaît.
- [ ] La ligne n'affiche ni montant, ni plafond, ni délai (A-P9-S11).
- [ ] La création de compte et de fiche ne demande aucune pièce d'identité.

### Écarts avec les critères actuels de l'issue
- L'issue couvre le KYC « immédiat ou différé, autonome ou assisté, avec décision indépendante » ; le lot A ne dessine ni la capture des pièces, ni le parcours assisté par une agente, ni la décision : sous-lot A2, en attente de G01.
- Les trois critères actuels sont génériques ; seuls les statuts et l'invitation sont précisés ici.

### Paramètres à confirmer
- G01 : niveaux, pièces et contrôles KYC ; effet du statut sur les capacités (aucun plafond affiché tant qu'il n'est pas confirmé).
```

## Brouillon — commentaire pour #75 (D14 Envoyer les notifications transactionnelles)

```markdown
## Design validé (lot A, 19 octobre 2026)

Le lot A a été validé par le PO le 19 octobre 2026. Il utilise deux SMS : le **code SMS** (inscription, activation, connexion sur un nouveau téléphone) et l'**invitation** envoyée quand une agente crée une fiche.

- Prototype : https://claude.ai/artifact/BrxhpBYZ9u4ejXV4bmUWWK
- Handoff (E02, E03, S01, A03, A04) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/handoff-lot-a.md
- Gherkin (A-P1-S6, A-P1-S10, A-P1-S11, A-P3-S9) : https://github.com/kotiz-ci/platform/blob/docs/restructure-documentation/docs/design/refonte-parcours/gherkin-lot-a.md

### Écrans concernés
E02 Ton numéro (envoi) · E03 Ton code SMS (renvoi, nouveau code) · S01 Pas de SMS ? · A03 Vérifie la fiche et A04 Fiche créée (invitation, côté agente).

### Critères d'acceptation ajoutés
- [ ] Un double appui sur « Recevoir le code » n'envoie qu'un seul SMS (A-P1-S6).
- [ ] « Renvoyer le code » n'est possible qu'après le délai configuré ; après un renvoi, l'app affiche « Nouveau code envoyé. » (A-P1-S10).
- [ ] Un changement de numéro invalide le code envoyé à l'ancien numéro (A-P1-S11).
- [ ] L'échec d'envoi d'un SMS est remonté à l'app (« Le SMS n'est pas parti. Réessaie. ») ; l'invitation a trois états visibles côté agente : « Envoyée », « Pas partie », « En attente » (A-P3-S1, A-P3-S9).
- [ ] Le contenu d'un code SMS n'est jamais journalisé.
- [ ] Aucune réponse liée à l'envoi du code ne révèle si le numéro a un compte (A-P1-S25).

### Écarts avec les critères actuels de l'issue
- **Dépendance** : l'issue est bloquée par #65 et #67, alors que l'envoi du code SMS est nécessaire dès #64 (ouverture de compte). À revoir : sortir l'envoi du code SMS en prérequis de #64, ou le porter dans #64.
- L'invitation SMS à la création de fiche n'est pas citée par l'issue ; la création de fiche par l'agente **n'a pas d'issue** à ce jour.
- Les notifications de statut (« Ton dépôt est arrivé »…) et les préférences SMS ne sont pas dessinées dans le lot A (lot F).

### Paramètres à confirmer
- G02 : longueur et validité du code, délai avant renvoi, nombre de renvois, « seul le dernier code vaut », lecture automatique du SMS sur Android ; invitation : déclencheur, contenu, lien d'installation, validité, règles de renvoi.
- La valeur de démonstration du prototype (décompte de 15 s) n'est pas une règle.
```
