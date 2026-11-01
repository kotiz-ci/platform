# Gherkin — Refonte des parcours, lot D : retraits Mobile Money

Date : 21 octobre 2026. Statut : dérivé du lot D validé par le PO et sa conjointe le 21 octobre 2026 (après critique, 15 corrections appliquées, et test sans remarque).
Sources : [handoff-lot-d.md](handoff-lot-d.md) (textes exacts, règles, critères d'acceptation), [ux-spec-lot-d.md](ux-spec-lot-d.md), [screens-lot-d.md](screens-lot-d.md), [critique-lot-d.md](critique-lot-d.md), [prototype](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF) (page « Lot D — Retraits », version 31 `1792590345-9ff9`). Rattachement aux issues : [issues-lot-d.md](issues-lot-d.md).

## Mode d'emploi

- Langue Gherkin : français (`# language: fr`). Mots-clés : Fonctionnalité, Contexte, Scénario, Plan du scénario, Exemples, Étant donné, Quand, Alors, Et, Mais.
- **IDs stables** : `D-Pn-Sm` (lot D, parcours n, scénario m), repris en tag `@D-Pn-Sm`. Un ID n'est jamais réutilisé ; un scénario retiré garde son ID barré dans ce fichier. Les variantes du prototype (D-P2′ solde à 0, D-P2″ retrait déjà en attente, D-P3′ frais inconnus, D-P3″ refus avant le PIN, D-P4′ on vérifie, D-P4″ échec technique, D-P4‴ refus de l'opérateur, D-P7′ interruption) sont rangées dans leur parcours de base, sans prime dans l'ID.
- Rappel : « D-01 » (avec tiret) est un écran ; « D07 » est l'issue [#68](https://github.com/kotiz-ci/platform/issues/68).
- **Tags** : `@nominal`, `@erreur`, `@interdit` (règle qui ne doit jamais être violée), `@a-confirmer` (dépend d'un paramètre non tranché), `@G01` `@G02` `@G03` (gate concerné), `@client` (variant d'app), `@backend` (vérifiable au niveau API), `@raccord` (écran d'un autre lot touché par le lot D), `@a-dessiner` (comportement de la spec sans état dessiné dans le canvas : D-P1-S14, D-P3-S9, D-P7-S3).
- **Paramètres non tranchés** entre chevrons, lus dans la configuration du test : `<frais>` (frais confirmés du retrait, renvoyés par le serveur), `<montant pris>` (montant reçu + `<frais>`, renvoyé par le serveur), `<maximum retirable>` (montant reçu le plus grand que le disponible permet, renvoyé par le serveur), `<montant reçu>`, `<solde après>`, `<disponible>`, `<délai de confirmation>`, `<HH:MM>`.
- **Frais du retrait : non confirmés (G01).** Tant qu'ils sont inconnus, l'autorisation reste bloquée (D-P3-S7, S8, S10). Les scénarios qui vont au bout d'un retrait posent dans leur `Contexte` que les frais sont confirmés dans la configuration, sans aucune valeur. **Aucun frais du prototype n'est une règle**, et aucune valeur de frais n'est écrite ici.
- **Données d'exemple fictives** (jamais des règles) : Fatou Koné, numéro vérifié 07 08 12 34 56, solde disponible 12 400 FCFA, épargnes École Awa (45 000 F sur 100 000 F) et Boutique (8 000 F sur 50 000 F), opérateurs Wave et Orange Money, références « KTZ-2610-… ».
- **PIN KOTIZ** : demandé pour chaque retrait (l'argent sort de KOTIZ) ; longueur, nombre d'essais et blocage lus en configuration (G02), jamais affichés.
- Utilisation : `/implement-ticket` ou `/implement-spec` reprend les scénarios de l'issue visée (table de [issues-lot-d.md](issues-lot-d.md)) **avant** le code ; chaque scénario devient un test d'acceptation à la frontière la plus haute possible (écran pour `@client`, API pour `@backend`).

---

## D-P1 — Retirer sur mon Mobile Money

Couvre l'entrée « Retirer » de A · H01, D-00, D-01 à D-05 (fait) et le lien vers le reçu.

```gherkin
# language: fr
@client @D-P1
Fonctionnalité: Retirer sur mon Mobile Money
  Pour avoir mon argent sur mon Mobile Money
  En tant que Fatou, cliente
  Je veux retirer de mon solde vers mon numéro vérifié, en sachant ce que je reçois, ce qui est pris et si c'est fait

  Contexte:
    Étant donné que je suis connectée
    Et que mon numéro vérifié est le 07 08 12 34 56
    Et que mon solde disponible est de 12 400 FCFA
    Et que Wave et Orange Money sont disponibles pour mon numéro
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>

  @D-P1-S1 @nominal
  Scénario: D-P1-S1 Retirer sur mon Wave de bout en bout
    Étant donné que je suis sur l'accueil
    Quand je touche "Retirer"
    Et que je touche "Sur mon Mobile Money"
    Et que je touche "Wave"
    Et que je saisis "5000"
    Et que je touche "Continuer"
    Alors je vois "Tu reçois sur ton Wave" et le montant "5 000 FCFA"
    Et je vois "Pris sur ton solde : <montant pris>"
    Quand je touche "Continuer"
    Et que je saisis mon PIN KOTIZ correct
    Et que l'opérateur confirme le transfert
    Alors je vois le statut "Fait"
    Et je vois "Ton argent est sur ton Wave."
    Et je vois le montant "5 000 FCFA"
    Quand je touche "Terminé"
    Alors je suis sur l'accueil
    Et mon solde disponible est de 12 400 FCFA moins <montant pris>
    Et la première des Dernières opérations est "Retrait Wave" avec "− <montant pris>" et le statut "Fait"

  @D-P1-S2 @nominal
  Scénario: D-P1-S2 « Retirer » ouvre la feuille « Comment tu veux retirer ? »
    Étant donné que je suis sur l'accueil
    Quand je touche "Retirer"
    Alors une feuille s'ouvre avec le titre "Comment tu veux retirer ?"
    Et je vois les lignes "Sur mon Mobile Money" et "Auprès d'une agente", dans cet ordre
    Et la feuille n'a pas de bouton principal
    Et la feuille n'affiche ni montant ni solde

  @D-P1-S3 @nominal
  Scénario: D-P1-S3 Fermer la feuille ramène à l'accueil sans rien changer
    Étant donné que la feuille "Comment tu veux retirer ?" est ouverte
    Quand je la ferme avec "Fermer" ou le retour Android
    Alors je suis sur l'accueil
    Et rien n'a été envoyé
    Et mon solde disponible est toujours de 12 400 FCFA

  @D-P1-S4 @nominal
  Scénario: D-P1-S4 Un double appui sur « Retirer » n'ouvre qu'une feuille
    Étant donné que je suis sur l'accueil
    Quand je touche deux fois rapidement "Retirer"
    Alors une seule feuille "Comment tu veux retirer ?" est ouverte

  @D-P1-S5 @nominal
  Plan du scénario: D-P1-S5 L'indicateur d'étape suit le retrait
    Étant donné que je suis en train de retirer sur mon Mobile Money
    Quand j'arrive sur l'écran "<écran>"
    Alors l'en-tête affiche "<étape>"

    Exemples:
      | écran                   | étape         |
      | Sur quel Mobile Money ? | Étape 1 sur 4 |
      | Combien tu retires ?    | Étape 2 sur 4 |
      | Vérifie ton retrait     | Étape 3 sur 4 |
      | Entre ton PIN           | Étape 4 sur 4 |

  @D-P1-S6 @nominal
  Scénario: D-P1-S6 Choisir l'opérateur dans une liste, sans bouton Continuer
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors je vois "Depuis : Mon solde"
    Et chaque opérateur disponible est une ligne avec son logo officiel, son nom et un chevron
    Et l'écran n'a ni bouton radio ni bouton "Continuer"
    Quand je touche "Wave"
    Alors je suis sur "Combien tu retires ?"
    Et je vois "Vers : Wave · 07 08 12 34 56"

  @D-P1-S7 @nominal @a-confirmer @G01
  Scénario: D-P1-S7 Un seul opérateur reste une liste
    Étant donné que seul Wave est disponible pour mon numéro
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors je vois une liste avec la seule ligne "Wave"
    Et je ne suis pas envoyée directement sur "Combien tu retires ?"

  @D-P1-S8 @interdit
  Scénario: D-P1-S8 Le retrait va toujours vers le numéro vérifié, non modifiable
    Quand je vais de "Sur quel Mobile Money ?" au résultat du retrait
    Alors je vois "Vers ton numéro" et "07 08 12 34 56" sous la liste des opérateurs
    Et le récapitulatif affiche "Vers ton numéro" et "07 08 12 34 56 · Wave"
    Et le numéro est affiché en entier sur chaque écran du retrait
    Et aucun écran du retrait n'a de champ, de bouton ni de lien pour un autre numéro

  @D-P1-S9 @nominal
  Scénario: D-P1-S9 La saisie du montant, ce que je reçois
    Quand j'ouvre "Combien tu retires ?" avec Wave
    Alors je vois "Depuis : Mon solde" puis "12 400 F disponibles" sur sa ligne
    Et le champ est lu "Montant que tu reçois"
    Et je vois la puce "Tout mon solde" et aucun montant rapide
    Quand je saisis "5000"
    Alors le champ affiche "5 000" suivi de "FCFA"
    Et je vois "Tu reçois ce montant sur ton Wave. Les frais s'ajoutent."
    Et "Continuer" est actif

  @D-P1-S10 @erreur
  Plan du scénario: D-P1-S10 Continuer désactivé tant que le montant n'est pas valable
    Quand je saisis "<saisie>" sur "Combien tu retires ?"
    Alors "Continuer" est désactivé
    Et je vois "<raison>" sous le champ

    Exemples:
      | saisie | raison                                 |
      |        | Écris un montant.                      |
      | 0      | Le montant doit être plus grand que 0. |

  @D-P1-S11 @nominal
  Scénario: D-P1-S11 Toute la ligne du montant ouvre le clavier
    Étant donné que le champ du montant est vide
    Quand je touche la ligne du montant n'importe où sur sa largeur
    Alors le clavier numérique s'ouvre sur le champ du montant
    Et la zone touchable fait au moins 48 de haut

  @D-P1-S12 @nominal @backend
  Scénario: D-P1-S12 « Tout mon solde » remplit le maximum calculé par le serveur
    Étant donné que le serveur renvoie un maximum retirable de <maximum retirable>
    Quand je touche "Tout mon solde"
    Alors le champ affiche <maximum retirable>
    Et la puce "Tout mon solde" est sélectionnée
    Et je vois "<maximum retirable> + <frais> de frais : tout ton solde."
    Quand je modifie le montant
    Alors la puce "Tout mon solde" n'est plus sélectionnée

  @D-P1-S13 @interdit
  Scénario: D-P1-S13 L'app ne calcule jamais le maximum ni les frais
    Quand je touche "Tout mon solde" ou que j'ouvre "Vérifie ton retrait"
    Alors le maximum, les frais, le montant pris et le solde après affichés sont ceux renvoyés par le serveur
    Et aucun taux de frais n'est présent dans l'app

  @D-P1-S14 @nominal @a-dessiner
  Scénario: D-P1-S14 Chargement du maximum de « Tout mon solde »
    Étant donné que le serveur met plus d'une seconde à renvoyer le maximum retirable
    Quand je touche "Tout mon solde"
    Alors la puce affiche "Un instant…"
    Et le champ ne change pas avant la réponse

  @D-P1-S15 @nominal
  Scénario: D-P1-S15 Le récapitulatif dit ce que je reçois, ce qui est pris et ce qui reste
    Étant donné que j'ai saisi 5 000 pour Wave
    Quand je touche "Continuer"
    Alors je suis sur "Vérifie ton retrait"
    Et le montant dominant est "5 000 FCFA" sous "Tu reçois sur ton Wave"
    Et je vois "Pris sur ton solde : <montant pris>" juste dessous
    Et je vois le flux "Depuis Mon solde" vers "Vers ton numéro 07 08 12 34 56 · Wave"
    Et je vois les lignes "Frais <frais>" et "Ton solde après <solde après>"
    Et je vois "L'argent sort : tu confirmes avec ton PIN KOTIZ."
    Et je vois "KOTIZ ne te demande jamais ton code Wave."
    Et le bouton principal est "Continuer"

  @D-P1-S16 @nominal
  Scénario: D-P1-S16 Modifier le montant depuis le récapitulatif
    Étant donné que je suis sur "Vérifie ton retrait" pour 5 000
    Quand je touche "Modifier"
    Alors je suis sur "Combien tu retires ?"
    Et le champ affiche "5 000"
    Et l'opérateur choisi est toujours Wave

  @D-P1-S17 @nominal
  Scénario: D-P1-S17 Le récapitulatif est lu en une phrase par TalkBack
    Quand TalkBack lit le flux de "Vérifie ton retrait"
    Alors il annonce "De Mon solde vers ton Wave 07 08 12 34 56"
    Et le lien "Modifier" est annoncé "Modifier le montant"

  @D-P1-S18 @nominal
  Scénario: D-P1-S18 Le récapitulatif avec les montants masqués
    Étant donné que j'ai masqué les montants
    Quand j'ouvre "Vérifie ton retrait"
    Alors le montant reçu, "Pris sur ton solde" et les frais restent visibles
    Et la ligne "Ton solde après" n'est pas affichée

  @D-P1-S19 @nominal
  Scénario: D-P1-S19 L'écran du PIN rappelle ce qui est pris et ce que je reçois
    Étant donné que je suis sur "Vérifie ton retrait" pour 5 000 vers Wave
    Quand je touche "Continuer"
    Alors je vois "Entre ton PIN"
    Et je vois d'abord "Pris sur ton solde : <montant pris>"
    Et je vois ensuite "Tu reçois : 5 000 F sur ton Wave · 07 08 12 34 56"
    Et je vois "Ne le montre à personne, même à une agente."
    Et je vois le bouton texte "PIN oublié ?"
    Et l'écran n'a pas de bouton "Valider"

  @D-P1-S20 @interdit
  Scénario: D-P1-S20 KOTIZ demande le PIN KOTIZ et jamais le code de l'opérateur
    Quand je fais un retrait de bout en bout
    Alors le seul secret demandé est mon PIN KOTIZ, sur "Entre ton PIN"
    Et aucun écran ne demande le PIN ou le code Wave
    Et aucun écran ne me demande de valider dans l'application Wave

  @D-P1-S21 @interdit
  Scénario: D-P1-S21 Le PIN n'est jamais affiché ni gardé
    Quand je saisis mon PIN
    Alors les cases se remplissent sans jamais afficher un chiffre
    Et le PIN n'est ni conservé dans l'app ni écrit dans un journal

  @D-P1-S22 @nominal
  Scénario: D-P1-S22 Pendant l'envoi, le pavé est bloqué
    Étant donné que je viens de saisir mon PIN complet
    Quand l'envoi prend plus d'une seconde
    Alors les cases restent pleines
    Et je vois "Envoi…" à la place de "Ne le montre à personne, même à une agente."
    Et le pavé est grisé et annoncé désactivé
    Et "PIN oublié ?" et le retour sont indisponibles
    Et un nouvel appui sur le pavé ne fait rien

  @D-P1-S23 @nominal
  Scénario: D-P1-S23 Le résultat « Fait » en plein écran
    Étant donné que l'opérateur a confirmé le transfert de mon retrait
    Alors je vois un écran plein avec seulement la croix "Fermer" en haut
    Et je vois le statut "Fait" avec la coche
    Et je vois "Ton argent est sur ton Wave." et "Depuis ton solde KOTIZ."
    Et je vois "5 000 FCFA" puis "Pris sur ton solde : <montant pris>"
    Et je vois les lignes "Vers Wave 07 08 12 34 56", "Frais <frais>", "Ton solde" et "Référence"
    Et le bouton principal est "Terminé"
    Et je vois les boutons texte "Voir le reçu" et "Tu ne vois pas l'argent sur ton Wave ?"
    Et l'écran n'a aucune illustration

  @D-P1-S24 @nominal @raccord
  Scénario: D-P1-S24 « Voir le reçu » depuis le résultat
    Étant donné que je suis sur le résultat "Fait" de mon retrait
    Quand je touche "Voir le reçu"
    Alors je vois le reçu de ce retrait avec "Tu as reçu" et "5 000 FCFA"

  @D-P1-S25 @interdit
  Plan du scénario: D-P1-S25 Le résultat ne ramène jamais vers la saisie
    Étant donné que je suis sur le résultat de mon retrait
    Quand je fais "<geste>"
    Alors je suis sur l'accueil
    Et je ne vois jamais "Entre ton PIN" ni "Vérifie ton retrait"

    Exemples:
      | geste                   |
      | toucher "Fermer"        |
      | toucher "Terminé"       |
      | le retour Android       |

  @D-P1-S26 @interdit
  Scénario: D-P1-S26 « Fait » seulement après la confirmation de l'opérateur
    Étant donné que mon PIN a été accepté
    Mais que l'opérateur n'a pas encore confirmé le transfert
    Alors je ne vois nulle part le statut "Fait" pour ce retrait
    Et je ne vois pas "Ton argent est sur ton Wave."

  @D-P1-S27 @nominal
  Scénario: D-P1-S27 Retirer vers Orange Money
    Quand je choisis "Orange Money" et que je saisis "5000"
    Et que je touche "Continuer"
    Alors je vois "Tu reçois sur ton Orange Money"
    Et je vois "Vers ton numéro" et "07 08 12 34 56 · Orange Money"
    Et je vois "KOTIZ ne te demande jamais ton code Orange Money."

  @D-P1-S28 @nominal
  Scénario: D-P1-S28 Les montants restent visibles pendant le retrait même masqués
    Étant donné que j'ai masqué les montants
    Quand je fais un retrait jusqu'au résultat
    Alors la saisie, le rappel du PIN et le résultat affichent les montants en clair

  @D-P1-S29 @interdit
  Scénario: D-P1-S29 Aucun délai d'arrivée n'est annoncé
    Quand je fais un retrait jusqu'au résultat
    Alors aucun écran n'annonce de délai d'arrivée sur le Mobile Money

  @D-P1-S30 @backend @nominal
  Scénario: D-P1-S30 Le récapitulatif vient du serveur et l'ordre porte une clé unique
    Quand j'ouvre "Vérifie ton retrait" pour 5 000 vers Wave
    Alors le serveur renvoie le montant reçu, <frais>, <montant pris> et <solde après>
    Et une clé d'idempotence est générée pour cette demande
    Quand je saisis mon PIN correct
    Alors un seul ordre de retrait est créé avec cette clé, vers 07 08 12 34 56, chez Wave
```

---

## D-P2 — Solde insuffisant, solde réduit par une attente, argent dans une épargne

Couvre les états de D-02 et la raison de « Retirer » désactivé sur A · H01 (PNV-2), avec le passage par le lot B.

```gherkin
# language: fr
@client @D-P2
Fonctionnalité: Retirer quand le solde ne suffit pas
  Pour savoir pourquoi je ne peux pas retirer et quoi faire
  En tant que Fatou, cliente
  Je veux voir avant le PIN ce que mon solde permet et où est mon argent

  Contexte:
    Étant donné que je suis connectée
    Et que mon numéro vérifié est le 07 08 12 34 56
    Et que Wave est disponible pour mon numéro
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>

  @D-P2-S1 @erreur
  Scénario: D-P2-S1 Montant plus grand que ce que le solde permet, sans épargne pleine
    Étant donné que mon solde disponible est de 12 400 FCFA
    Et qu'aucune de mes épargnes n'a d'argent
    Et que le serveur renvoie un maximum retirable de <maximum retirable>
    Quand je saisis "20000" sur "Combien tu retires ?"
    Alors je vois "Tu peux recevoir au plus <maximum retirable>." sous le champ, en erreur
    Et "Continuer" est désactivé
    Et je ne vois pas "Remettre sur mon solde"

  @D-P2-S2 @erreur
  Scénario: D-P2-S2 Montant trop grand et argent dans une épargne
    Étant donné que mon solde disponible est de 12 400 FCFA
    Et que École Awa a 45 000 F
    Quand je saisis "20000" sur "Combien tu retires ?"
    Alors je vois "Tu peux recevoir au plus <maximum retirable>."
    Et je vois "Le reste est dans tes épargnes."
    Et je vois le bouton texte "Remettre sur mon solde" sous "Continuer"
    Et "Continuer" est désactivé
    Et aucun montant d'épargne n'est affiché sur cet écran

  @D-P2-S3 @nominal @raccord @a-confirmer
  Scénario: D-P2-S3 « Remettre sur mon solde » ouvre la liste des épargnes
    Étant donné que je vois "Remettre sur mon solde" sur "Combien tu retires ?"
    Quand je touche "Remettre sur mon solde"
    Alors je suis sur "Mes épargnes"
    Et aucun retrait n'a été envoyé
    Et aucun retour au solde n'est lancé automatiquement

  @D-P2-S4 @nominal @raccord
  Scénario: D-P2-S4 Remettre de l'argent sur le solde, puis retirer
    Étant donné que mon solde disponible est de 12 400 FCFA
    Et que École Awa a 45 000 F
    Quand je remets 10 000 F d'École Awa sur mon solde avec mon PIN
    Et que le retour au solde est fait
    Et que je touche "Voir mon solde"
    Alors mon solde disponible est de 22 400 FCFA
    Quand je touche "Retirer"
    Alors la feuille "Comment tu veux retirer ?" s'ouvre
    Et le retrait suivant demande à nouveau mon PIN KOTIZ

  @D-P2-S5 @interdit
  Scénario: D-P2-S5 Aucun retrait direct depuis une épargne
    Quand je fais un retrait
    Alors la source est toujours "Mon solde"
    Et aucun écran du retrait ne propose de choisir une épargne comme source
    Et le résultat du retour au solde n'ouvre jamais un retrait tout seul

  @D-P2-S6 @erreur @raccord
  Scénario: D-P2-S6 Solde à 0, argent dans une épargne
    Étant donné que mon solde disponible est de 0 FCFA
    Et que École Awa a 45 000 F
    Quand je suis sur l'accueil
    Alors "Retirer" est désactivé
    Et je vois "Ton argent est dans tes épargnes."
    Quand je touche "Retirer"
    Alors aucune feuille ne s'ouvre

  @D-P2-S7 @erreur @raccord
  Scénario: D-P2-S7 Solde à 0 et aucune épargne avec de l'argent
    Étant donné que mon solde disponible est de 0 FCFA
    Et qu'aucune de mes épargnes n'a d'argent
    Quand je suis sur l'accueil
    Alors "Retirer" est désactivé
    Et je vois "Rien à retirer pour l'instant."

  @D-P2-S8 @nominal
  Scénario: D-P2-S8 Un retrait déjà en attente réduit le disponible
    Étant donné qu'un retrait Wave est en attente, avec <montant pris> pris sur mon solde
    Et que mon solde disponible est de 12 400 FCFA moins <montant pris>
    Quand j'ouvre "Combien tu retires ?"
    Alors je vois le disponible déjà réduit, suivi de "disponibles"
    Et je vois le message en attente, avec l'horloge, "<montant pris> sont en attente de retrait."

  @D-P2-S9 @erreur
  Scénario: D-P2-S9 Le disponible réduit limite le second retrait
    Étant donné qu'un retrait Wave est en attente
    Et que le serveur renvoie un maximum retirable de <maximum retirable> sur le disponible réduit
    Quand je saisis un montant plus grand que <maximum retirable>
    Alors je vois "Tu peux recevoir au plus <maximum retirable>."
    Et "Continuer" est désactivé

  @D-P2-S10 @nominal @a-confirmer @G01
  Scénario: D-P2-S10 Un dépôt en attente n'augmente pas le disponible
    Étant donné qu'un dépôt de 2 000 F est en attente
    Quand j'ouvre "Combien tu retires ?"
    Alors le disponible affiché n'inclut pas ces 2 000 F
    Et je vois "Ton dépôt de 2 000 F n'est pas encore arrivé."

  @D-P2-S11 @erreur
  Scénario: D-P2-S11 Le solde a changé entre la saisie et le récapitulatif
    Étant donné que j'ai saisi 5 000 sur "Combien tu retires ?"
    Et que mon solde disponible a baissé avant le récapitulatif
    Quand j'ouvre "Vérifie ton retrait"
    Alors je reviens sur "Combien tu retires ?"
    Et je vois le message "Ton solde a changé." avec "Tu as <disponible> disponibles."
    Et le montant saisi est gardé

  @D-P2-S12 @backend @interdit
  Scénario: D-P2-S12 Le serveur refuse un montant pris supérieur au disponible
    Étant donné que mon solde disponible est de 12 400 FCFA
    Quand une demande de retrait dont le montant pris dépasse 12 400 F arrive au serveur
    Alors le serveur refuse la demande avec une raison communicable
    Et aucun ordre de retrait n'est créé
```

---

## D-P3 — Retrait bloqué avant le PIN

Couvre D-00 et D-01 sans opérateur, D-02 au-delà du compte, D-03 frais inconnus, refus par une règle et opérateur devenu indisponible.

```gherkin
# language: fr
@client @D-P3
Fonctionnalité: Retrait bloqué avant le PIN
  Pour ne jamais taper mon PIN pour apprendre un refus
  En tant que Fatou, cliente
  Je veux savoir avant le PIN que le retrait n'est pas possible, et que rien n'est parti

  Contexte:
    Étant donné que je suis connectée
    Et que mon numéro vérifié est le 07 08 12 34 56
    Et que mon solde disponible est de 12 400 FCFA

  @D-P3-S1 @erreur @a-confirmer @G01
  Scénario: D-P3-S1 Aucun opérateur disponible sur la feuille
    Étant donné qu'aucun opérateur Mobile Money n'est disponible pour mon numéro
    Quand j'ouvre la feuille "Comment tu veux retirer ?"
    Alors la ligne "Sur mon Mobile Money" est désactivée avec "Mobile Money indisponible pour l'instant."
    Et la ligne "Auprès d'une agente" reste active

  @D-P3-S2 @erreur @a-confirmer @G01
  Scénario: D-P3-S2 Aucun opérateur sur la liste : se tourner vers une agente
    Étant donné que la liste des opérateurs revient vide
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors je vois "Le retrait Mobile Money n'est pas possible pour l'instant."
    Et le bouton principal est "Retirer auprès d'une agente"
    Quand je le touche
    Alors je suis sur "Retirer auprès d'une agente"

  @D-P3-S3 @erreur
  Scénario: D-P3-S3 Un opérateur indisponible est désactivé avec sa raison
    Étant donné que Wave est indisponible
    Et qu'Orange Money est disponible
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors la ligne "Wave" est désactivée, sans chevron, avec "Wave est indisponible pour l'instant."
    Et toucher "Wave" ne fait rien
    Quand je touche "Orange Money"
    Alors je suis sur "Combien tu retires ?" avec "Vers : Orange Money · 07 08 12 34 56"

  @D-P3-S4 @nominal
  Scénario: D-P3-S4 Logo d'opérateur manquant
    Étant donné que le logo d'un opérateur n'est pas disponible
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors sa ligne affiche son nom seul
    Et jamais le logo d'un autre opérateur

  @D-P3-S5 @erreur @a-confirmer @G01
  Scénario: D-P3-S5 Au-delà de ce que le compte permet, identité en vérification
    Étant donné que mon identité est en vérification
    Et que le serveur indique que 10 000 dépasse ce que mon compte permet
    Quand je saisis "10000" sur "Combien tu retires ?"
    Alors je vois "Ce montant dépasse ce que ton compte permet." sous le champ, en erreur
    Et je vois "Ton identité est en vérification."
    Et "Continuer" est désactivé
    Et le montant est gardé
    Et aucune limite chiffrée n'est affichée

  @D-P3-S6 @erreur @a-confirmer @G01 @raccord
  Scénario: D-P3-S6 Au-delà de ce que le compte permet, identité à vérifier
    Étant donné que mon identité reste à vérifier
    Et que le serveur indique que le montant dépasse ce que mon compte permet
    Quand je saisis ce montant sur "Combien tu retires ?"
    Alors je vois "Ce montant dépasse ce que ton compte permet."
    Et je vois le lien "Vérifier mon identité ›"
    Et "Continuer" est désactivé

  @D-P3-S7 @erreur @a-confirmer @G01
  Scénario: D-P3-S7 Frais inconnus : le récapitulatif bloque avant le PIN
    Étant donné que les frais du retrait Wave sont inconnus
    Quand j'ouvre "Vérifie ton retrait" pour 5 000 vers Wave
    Alors je vois le message "On ne connaît pas les frais." avec "Réessaie plus tard."
    Et je vois "Tu reçois sur ton Wave", "5 000 FCFA" et le flux vers 07 08 12 34 56
    Et je ne vois ni "Pris sur ton solde", ni "Frais", ni "Ton solde après"
    Et je ne vois pas "L'argent sort : tu confirmes avec ton PIN KOTIZ."
    Et je ne vois pas de bouton "Continuer"
    Et le bouton principal est "Revenir à l'accueil"

  @D-P3-S8 @interdit @G01
  Scénario: D-P3-S8 Aucune valeur de frais n'est inventée
    Étant donné que les frais du retrait sont inconnus
    Quand je parcours le retrait jusqu'au récapitulatif
    Alors aucun écran n'affiche de frais, de taux ni de montant pris
    Et aucun PIN n'est demandé

  @D-P3-S9 @erreur @a-confirmer @G01 @a-dessiner
  Scénario: D-P3-S9 Minimum ou maximum par retrait de l'opérateur
    Étant donné que la configuration du partenaire fixe un minimum et un maximum par retrait
    Quand je saisis un montant hors de ces bornes
    Alors je vois la raison sous le champ
    Et "Continuer" est désactivé
    Et la raison et ses valeurs viennent de la configuration

  @D-P3-S10 @backend @interdit @G01
  Scénario: D-P3-S10 Le serveur refuse l'ordre quand les frais sont inconnus
    Étant donné que les frais du retrait Wave sont inconnus
    Quand une demande de retrait Wave arrive au serveur
    Alors le serveur refuse de créer l'ordre
    Et aucun montant n'est engagé sur mon solde

  @D-P3-S11 @nominal
  Scénario: D-P3-S11 « Revenir à l'accueil » depuis les frais inconnus
    Étant donné que je suis sur "Vérifie ton retrait" avec des frais inconnus
    Quand je touche "Revenir à l'accueil"
    Alors je suis sur l'accueil
    Et mon solde disponible est toujours de 12 400 FCFA

  @D-P3-S12 @nominal
  Scénario: D-P3-S12 Modifier reste possible avec des frais inconnus
    Étant donné que je suis sur "Vérifie ton retrait" avec des frais inconnus
    Quand je touche "Modifier"
    Alors je suis sur "Combien tu retires ?" avec mon montant

  @D-P3-S13 @erreur @a-confirmer @G01 @G03
  Scénario: D-P3-S13 Refusé par une règle avant le PIN
    Étant donné que les frais du retrait Wave sont confirmés dans la configuration à <frais>
    Et qu'une règle du compte refuse ce retrait
    Quand j'ouvre "Vérifie ton retrait" pour 5 000 vers Wave
    Alors je vois le message d'erreur "Ce retrait n'est pas possible pour l'instant." avec "Ton argent n'a pas bougé."
    Et je vois le montant et le flux vers 07 08 12 34 56
    Et je ne vois ni "Pris sur ton solde", ni "Frais", ni "Ton solde après", ni "Modifier"
    Et je ne vois aucune phrase sur le PIN
    Et le bouton principal est "Revenir à l'accueil"
    Et je vois le bouton texte "Contacter l'aide"
    Et aucune valeur chiffrée de plafond n'est affichée

  @D-P3-S14 @interdit
  Scénario: D-P3-S14 Un refus connu d'avance ne propose jamais le PIN
    Étant donné qu'une règle du compte refuse ce retrait
    Quand je suis sur "Vérifie ton retrait"
    Alors je ne peux pas atteindre "Entre ton PIN"
    Et aucune demande de retrait n'est créée

  @D-P3-S15 @erreur
  Scénario: D-P3-S15 L'opérateur devient indisponible avant le PIN
    Étant donné que les frais du retrait Wave sont confirmés dans la configuration à <frais>
    Et que Wave devient indisponible après ma saisie
    Quand j'ouvre "Vérifie ton retrait"
    Alors je vois le message "Wave est indisponible pour l'instant." avec "Ton montant est gardé."
    Et le bouton principal est "Choisir un autre Mobile Money"
    Quand je le touche
    Alors je suis sur "Sur quel Mobile Money ?"
    Quand je touche "Orange Money"
    Alors le montant 5 000 est gardé

  @D-P3-S16 @nominal
  Scénario: D-P3-S16 Calcul du récapitulatif
    Étant donné que le serveur met plus d'une seconde à renvoyer les frais
    Quand j'ouvre "Vérifie ton retrait"
    Alors je vois un squelette annoncé "Calcul des frais" à la place des lignes
    Et le bouton affiche "Un instant…" et ne mène nulle part
```

---

## D-P4 — Après le PIN : en attente, on vérifie, échoué

```gherkin
# language: fr
@client @D-P4
Fonctionnalité: Savoir où en est mon retrait après le PIN
  Pour ne jamais confondre attente et succès, ni refaire un retrait
  En tant que Fatou, cliente
  Je veux voir le statut réel de mon retrait et où est mon argent

  Contexte:
    Étant donné que je suis connectée
    Et que mon numéro vérifié est le 07 08 12 34 56
    Et que mon solde disponible est de 12 400 FCFA
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>
    Et que j'ai saisi mon PIN correct pour un retrait de 5 000 vers Wave

  @D-P4-S1 @nominal
  Scénario: D-P4-S1 Retrait en attente
    Quand l'opérateur n'a pas encore confirmé le transfert
    Alors je vois le statut "En attente" avec l'horloge, en ambre
    Et je vois "Ton retrait est en attente." et "Wave n'a pas encore confirmé."
    Et je vois "5 000 FCFA" puis "Pris sur ton solde : <montant pris>"
    Et je vois les étapes "Demande envoyée · Envoyée", "Envoi vers ton Wave · En attente", "Arrivée sur ton Wave · Pas encore"
    Et je vois "Ne refais pas le retrait." et "Tu le retrouves dans Opérations."
    Et le bouton principal est "Terminé"
    Et je vois les boutons texte "Voir dans Opérations" et "Le retrait n'arrive pas ?"

  @D-P4-S2 @interdit
  Scénario: D-P4-S2 Une attente ne ressemble jamais à un succès
    Quand mon retrait est en attente
    Alors je ne vois ni "Fait", ni coche verte, ni reçu, ni "Voir le reçu"
    Et l'étape envoyée dit "Envoyée", jamais "Fait"
    Et je ne vois pas de bouton "Réessayer"

  @D-P4-S3 @nominal
  Scénario: D-P4-S3 Le solde disponible baisse dès l'envoi
    Étant donné que mon retrait est en attente
    Quand je reviens à l'accueil
    Alors mon solde disponible est de 12 400 FCFA moins <montant pris>
    Et la carte solde affiche "Retrait en attente" avec "− <montant pris>" et l'horloge, à la place de "Dernier dépôt"
    Et la première des Dernières opérations est "Retrait Wave" avec "<montant pris>" sans signe et "En attente"

  @D-P4-S4 @nominal
  Scénario: D-P4-S4 La ligne « Retrait en attente » de la carte ouvre le retrait
    Étant donné que la carte solde affiche "Retrait en attente"
    Quand je la touche
    Alors je vois le détail "Retrait Wave" de ce retrait, en attente

  @D-P4-S5 @nominal
  Scénario: D-P4-S5 La carte revient à « Dernier dépôt » quand le retrait est fait
    Étant donné que la carte solde affiche "Retrait en attente"
    Quand l'opérateur confirme le transfert
    Et que j'ouvre l'accueil
    Alors la carte solde affiche "Dernier dépôt"
    Et la ligne du retrait affiche "− <montant pris>" et "Fait"

  @D-P4-S6 @nominal
  Scénario: D-P4-S6 La carte revient à « Dernier dépôt » quand le retrait échoue
    Étant donné que la carte solde affiche "Retrait en attente"
    Quand l'échec du retrait est confirmé
    Et que j'ouvre l'accueil
    Alors la carte solde affiche "Dernier dépôt"
    Et mon solde disponible est de nouveau de 12 400 FCFA

  @D-P4-S7 @nominal
  Scénario: D-P4-S7 La carte « Retrait en attente » est masquée avec le reste
    Étant donné que la carte solde affiche "Retrait en attente"
    Quand je masque les montants
    Alors la ligne affiche "Retrait en attente" et "••• F"
    Et TalkBack annonce "Montant masqué"

  @D-P4-S8 @nominal
  Scénario: D-P4-S8 On vérifie quand la connexion coupe après l'envoi
    Quand la connexion est perdue après l'envoi de ma demande
    Alors je vois le statut "En attente" avec l'horloge
    Et je vois "On vérifie ton retrait." et "La connexion a coupé. On regarde où il en est."
    Et je vois "Ne refais pas le retrait."
    Et le bouton principal est "Terminé"
    Et je vois les boutons texte "Voir dans Opérations" et "Contacter l'aide"
    Et je ne vois pas de bouton "Réessayer"

  @D-P4-S9 @nominal @a-confirmer
  Scénario: D-P4-S9 On vérifie quand le délai de confirmation est dépassé
    Quand l'opérateur ne répond pas avant <délai de confirmation>
    Alors je vois "On vérifie ton retrait."
    Et aucune nouvelle demande n'est créée

  @D-P4-S10 @erreur
  Scénario: D-P4-S10 Échec technique après le PIN
    Quand l'échec technique de mon retrait est confirmé
    Alors je vois le statut "Échoué" avec la croix
    Et je vois "Ton retrait n'a pas marché." et "Un problème technique l'a arrêté."
    Et je vois "5 000 FCFA" puis "Rien n'est arrivé sur ton Wave."
    Et je ne vois ni "Pris sur ton solde" ni "Frais"
    Et je vois la ligne "Ton solde" avec 12 400 F
    Et le bouton principal est "Réessayer"
    Et je vois le bouton texte "Terminé"
    Et le résultat est annoncé immédiatement par TalkBack

  @D-P4-S11 @erreur
  Scénario: D-P4-S11 Refus de l'opérateur après l'envoi
    Quand Wave refuse le retrait
    Alors je vois le statut "Échoué"
    Et je vois "Ton retrait n'a pas marché." et "Wave a refusé le retrait."
    Et je vois "Rien n'est arrivé sur ton Wave."
    Et le bouton principal est "Réessayer"
    Et je vois les boutons texte "Choisir un autre Mobile Money" et "Terminé"

  @D-P4-S12 @nominal
  Scénario: D-P4-S12 Choisir un autre Mobile Money après un refus
    Étant donné que Wave a refusé mon retrait
    Et qu'Orange Money est disponible
    Quand je touche "Choisir un autre Mobile Money"
    Alors je suis sur "Sur quel Mobile Money ?" sans indicateur d'étape
    Quand je touche "Orange Money"
    Alors le montant 5 000 est gardé

  @D-P4-S13 @interdit @G01
  Scénario: D-P4-S13 Aucune garantie non confirmée sur un échec
    Étant donné que le partenaire ne garantit pas que l'argent n'a pas quitté KOTIZ pour cet échec
    Quand mon retrait a échoué
    Alors je ne vois pas "Ton argent n'a pas quitté KOTIZ."

  @D-P4-S14 @nominal
  Scénario: D-P4-S14 Réessayer relit le récapitulatif et redemande le PIN
    Étant donné que l'échec de mon retrait est confirmé
    Quand je touche "Réessayer"
    Alors je suis sur "Vérifie ton retrait" sans indicateur d'étape
    Quand je touche "Continuer"
    Alors je suis sur "Entre ton PIN" sans indicateur d'étape
    Quand je saisis mon PIN correct
    Et que l'opérateur confirme le transfert
    Alors je vois "Fait" avec une nouvelle référence

  @D-P4-S15 @backend @nominal
  Scénario: D-P4-S15 Réessayer crée une nouvelle demande
    Étant donné que l'échec de ma demande est confirmé
    Quand je réessaie et que je saisis mon PIN
    Alors une nouvelle demande est créée avec une nouvelle clé d'idempotence
    Et la demande échouée reste "Échoué" dans Opérations

  @D-P4-S16 @nominal
  Scénario: D-P4-S16 Un second retrait pendant une attente est une nouvelle demande
    Étant donné qu'un retrait Wave est en attente
    Et que mon disponible réduit le permet
    Quand je fais un second retrait de 1 000 vers Wave
    Alors une nouvelle demande est créée, avec son montant et sa référence propres
    Et Opérations affiche deux retraits distincts

  @D-P4-S17 @interdit
  Scénario: D-P4-S17 Le statut n'est jamais déduit d'un message de l'opérateur
    Étant donné que mon retrait est en attente
    Quand je reçois un SMS de Wave avant la confirmation du partenaire
    Alors le statut affiché reste "En attente"

  @D-P4-S18 @nominal
  Scénario: D-P4-S18 Le résultat arrive pendant que l'app est fermée
    Étant donné que mon retrait était en attente quand j'ai fermé l'app
    Et que l'opérateur a confirmé le transfert entre-temps
    Quand je rouvre l'app
    Alors l'accueil, la carte solde et Opérations montrent le retrait "Fait"

  @D-P4-S19 @backend @interdit
  Scénario: D-P4-S19 Une confirmation rejouée ou tardive ne produit pas un second effet
    Étant donné que mon retrait est déjà fait
    Quand le partenaire renvoie la même confirmation
    Alors mon solde n'est débité qu'une fois
    Et un seul retrait apparaît dans Opérations

  @D-P4-S20 @backend @nominal @a-confirmer @G01
  Scénario: D-P4-S20 Le montant engagé est rendu au disponible sur un échec confirmé
    Étant donné que <montant pris> a été engagé à l'envoi de mon retrait
    Quand l'échec du retrait est confirmé
    Alors l'engagement est libéré
    Et mon solde disponible est de nouveau de 12 400 FCFA
    Et aucune écriture de débit n'existe pour ce retrait

  @D-P4-S21 @backend @nominal
  Scénario: D-P4-S21 Le retrait fait est écrit à la confirmation
    Étant donné que <montant pris> a été engagé à l'envoi de mon retrait
    Quand l'opérateur confirme le transfert
    Alors des écritures équilibrées débitent mon solde de <montant pris>
    Et l'événement de retrait fait est publié une seule fois

  @D-P4-S22 @erreur @backend
  Scénario: D-P4-S22 Une règle devenue bloquante après le PIN donne un échec
    Étant donné qu'une règle du compte devient bloquante entre le récapitulatif et l'envoi
    Quand le serveur refait le contrôle au moment du mouvement
    Alors je vois le résultat "Échoué"
    Et aucun montant n'est engagé ni débité
```

---

## D-P5 — L'argent est parti mais n'est pas sur mon Mobile Money

```gherkin
# language: fr
@client @D-P5
Fonctionnalité: Signaler un retrait pas reçu sur mon Mobile Money
  Pour ne pas refaire un retrait quand je ne vois pas l'argent
  En tant que Fatou, cliente
  Je veux savoir quoi vérifier, puis signaler le problème sur ce retrait

  Contexte:
    Étant donné que je suis connectée
    Et que mon numéro vérifié est le 07 08 12 34 56
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>

  @D-P5-S1 @nominal
  Scénario: D-P5-S1 « Tu ne vois pas l'argent sur ton Wave ? » depuis le résultat fait
    Étant donné que je suis sur le résultat "Fait" d'un retrait Wave de 5 000 F
    Quand je touche "Tu ne vois pas l'argent sur ton Wave ?"
    Alors une feuille s'ouvre avec le titre "L'argent n'est pas sur ton Wave ?"
    Et je vois "Ouvre ton application Wave et regarde ton solde."
    Et je vois "Le message de Wave peut arriver plus tard."
    Et je vois "Ne refais pas le retrait." en gras
    Et je vois "Retrait de 5 000 F" et la référence du retrait
    Et le bouton principal est "Signaler un problème"
    Et je vois les boutons texte "Revenir" et "Contacter l'aide"
    Et la feuille n'a aucun lien dans son contenu ni aucun délai

  @D-P5-S2 @nominal
  Scénario: D-P5-S2 « Le retrait n'arrive pas ? » depuis une attente
    Étant donné que je suis sur le résultat "En attente" d'un retrait Wave
    Quand je touche "Le retrait n'arrive pas ?"
    Alors une feuille s'ouvre avec le titre "Le retrait n'arrive pas ?"
    Et je vois "Ne refais pas le retrait."
    Et le bouton principal est "Revenir"
    Et je vois le bouton texte "Signaler un problème"
    Et je ne vois pas "Contacter l'aide"

  @D-P5-S3 @nominal
  Scénario: D-P5-S3 Revenir ferme la feuille
    Étant donné que la feuille "L'argent n'est pas sur ton Wave ?" est ouverte
    Quand je touche "Revenir" ou "Fermer" ou le retour Android
    Alors je suis sur le résultat du retrait

  @D-P5-S4 @nominal
  Scénario: D-P5-S4 Signaler reprend le retrait sans ressaisie
    Étant donné que la feuille "L'argent n'est pas sur ton Wave ?" est ouverte
    Quand je touche "Signaler un problème"
    Alors je suis sur "Signaler un problème"
    Et je vois "Retrait Wave · <montant pris>", la date et la référence du retrait, avec son statut
    Et je n'ai rien à ressaisir sur le retrait

  @D-P5-S5 @nominal @a-confirmer @G03
  Scénario: D-P5-S5 Envoyer le signalement d'un retrait
    Étant donné que je suis sur "Signaler un problème" pour ce retrait
    Quand je choisis un motif de la liste configurée
    Et que je touche "Envoyer"
    Alors je vois le message d'information "Ton signalement est envoyé." avec "Ce n'est pas un remboursement."
    Et le dossier a le statut "Envoyé"

  @D-P5-S6 @interdit
  Scénario: D-P5-S6 Un signalement ne crée aucun mouvement et ne relance pas le retrait
    Quand j'envoie un signalement sur un retrait
    Alors aucun mouvement d'argent n'est créé
    Et aucun nouveau retrait n'est proposé ni créé
    Et le statut du retrait ne change pas

  @D-P5-S7 @nominal @raccord
  Scénario: D-P5-S7 Le détail du retrait montre mon signalement
    Étant donné que j'ai signalé un problème sur ce retrait
    Quand j'ouvre le détail du retrait depuis Opérations
    Alors je vois "Mon signalement · Envoyé · Dossier n° …"
    Et je ne vois plus "Signaler un problème"
    Et le statut du retrait reste "Fait"

  @D-P5-S8 @nominal
  Scénario: D-P5-S8 Un dossier existe déjà : la feuille ouvre ce dossier
    Étant donné qu'un dossier existe déjà sur ce retrait
    Quand je touche "Signaler un problème" sur la feuille
    Alors je vois "Mon signalement" de ce dossier
    Et aucun second dossier n'est créé

  @D-P5-S9 @interdit @G03
  Scénario: D-P5-S9 Aucun motif inventé
    Quand j'ouvre "Signaler un problème" sur un retrait
    Alors les motifs proposés sont ceux de la configuration de l'assistance
    Et aucun motif propre au retrait n'est ajouté par l'app
```

---

## D-P6 — PIN incorrect ou bloqué

```gherkin
# language: fr
@client @D-P6
Fonctionnalité: PIN incorrect ou bloqué pendant un retrait
  Pour savoir que rien n'est parti quand mon PIN ne passe pas
  En tant que Fatou, cliente
  Je veux un message clair, sans montant trompeur ni nombre d'essais inventé

  Contexte:
    Étant donné que je suis connectée
    Et que mon solde disponible est de 12 400 FCFA
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>
    Et que je suis sur "Entre ton PIN" pour un retrait de 5 000 vers Wave

  @D-P6-S1 @erreur
  Scénario: D-P6-S1 PIN incorrect
    Quand je saisis un PIN incorrect
    Alors je vois en tête le message d'erreur "PIN incorrect. Réessaie."
    Et je vois ensuite "Pris sur ton solde : <montant pris>" et "Tu reçois : 5 000 F sur ton Wave · 07 08 12 34 56"
    Et les cases sont en erreur puis vidées
    Et je vois "Ne le montre à personne, même à une agente." en texte simple sous les cases
    Et un seul message est affiché

  @D-P6-S2 @interdit @G02
  Scénario: D-P6-S2 Aucun nombre d'essais n'est affiché sans règle confirmée
    Étant donné que la règle des essais du PIN n'est pas confirmée
    Quand je saisis un PIN incorrect
    Alors je ne vois aucun nombre d'essais restants

  @D-P6-S3 @erreur @a-confirmer @G02
  Scénario: D-P6-S3 PIN bloqué après trop d'essais
    Quand je saisis un PIN incorrect autant de fois que la règle le permet
    Alors je vois le titre "Ton PIN est bloqué" sans indicateur d'étape
    Et je vois "Rien n'a été pris sur ton solde." en gras
    Et je vois le message d'erreur "Trop d'essais." avec "Ton retrait n'est pas envoyé."
    Et je ne vois ni cases ni pavé
    Et le bouton principal est "Terminé"
    Et je vois le bouton texte "PIN oublié ?"

  @D-P6-S4 @interdit
  Scénario: D-P6-S4 PIN bloqué : aucun montant affiché
    Quand mon PIN est bloqué pendant un retrait
    Alors l'écran n'affiche ni "Pris sur ton solde" ni "Tu reçois" ni aucun montant
    Et aucune durée de blocage n'est affichée

  @D-P6-S5 @backend @interdit
  Scénario: D-P6-S5 PIN incorrect ou bloqué : aucun ordre, aucun engagement
    Quand mon PIN est refusé ou bloqué
    Alors aucun ordre de retrait n'est créé
    Et mon solde disponible est toujours de 12 400 FCFA

  @D-P6-S6 @nominal
  Scénario: D-P6-S6 Sortir d'un PIN bloqué
    Étant donné que mon PIN est bloqué
    Quand je touche "Terminé" ou le retour
    Alors je suis sur l'accueil

  @D-P6-S7 @nominal @raccord
  Scénario: D-P6-S7 PIN oublié mène au lot F
    Quand je touche "PIN oublié ?"
    Alors j'arrive sur la récupération du PIN (lot F, « Bientôt ici » tant qu'il n'est pas livré)

  @D-P6-S8 @erreur @a-confirmer @G02
  Scénario: D-P6-S8 PIN déjà bloqué en arrivant sur l'écran
    Étant donné que mon PIN est déjà bloqué
    Quand je touche "Continuer" sur "Vérifie ton retrait"
    Alors "Entre ton PIN" s'ouvre directement dans l'état "Ton PIN est bloqué"

  @D-P6-S9 @nominal
  Scénario: D-P6-S9 Revenir du PIN au récapitulatif efface le PIN
    Étant donné que j'ai saisi deux chiffres
    Quand je touche le retour
    Alors je suis sur "Vérifie ton retrait"
    Et quand je reviens sur "Entre ton PIN", les cases sont vides
```

---

## D-P7 — Hors connexion et interruption

```gherkin
# language: fr
@client @D-P7
Fonctionnalité: Retirer avec un réseau instable ou une interruption
  Pour que rien ne parte sans que je le sache, et jamais deux fois
  En tant que Fatou, cliente au marché
  Je veux retrouver mon retrait tel qu'il est, après une coupure ou une interruption

  Contexte:
    Étant donné que je suis connectée
    Et que mon solde disponible est de 12 400 FCFA
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>

  @D-P7-S1 @erreur
  Scénario: D-P7-S1 Hors connexion sur la liste des opérateurs
    Étant donné que je n'ai pas de connexion
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors je vois "Mis à jour à <HH:MM> · hors connexion"
    Et la dernière liste connue est affichée, opérateurs désactivés sans chevron
    Et je vois "Retirer demande la connexion. Réessaie quand tu captes."
    Et je vois le bouton texte "Réessayer"
    Quand la connexion revient et que je touche "Réessayer"
    Alors les opérateurs disponibles sont actifs

  @D-P7-S2 @nominal
  Scénario: D-P7-S2 Hors connexion, la saisie reste possible
    Étant donné que je n'ai pas de connexion
    Quand j'ouvre "Combien tu retires ?"
    Alors je vois le disponible avec "Mis à jour à <HH:MM> · hors connexion"
    Et je peux saisir un montant

  @D-P7-S3 @erreur @a-dessiner
  Scénario: D-P7-S3 Hors connexion, « Tout mon solde » est indisponible
    Étant donné que je n'ai pas de connexion
    Quand j'ouvre "Combien tu retires ?"
    Alors la puce "Tout mon solde" est désactivée avec sa raison
    Et aucun maximum n'est calculé par l'app à partir du solde en cache

  @D-P7-S4 @erreur
  Scénario: D-P7-S4 Hors connexion sur le récapitulatif
    Étant donné que je n'ai pas de connexion
    Quand j'ouvre "Vérifie ton retrait"
    Alors je vois le message "Pas de connexion." avec "Rien n'a été envoyé."
    Et le bouton principal est "Réessayer"
    Quand la connexion revient et que je touche "Réessayer"
    Alors le récapitulatif est calculé

  @D-P7-S5 @erreur
  Scénario: D-P7-S5 Hors connexion au moment du PIN, avant l'envoi
    Étant donné que la connexion coupe avant l'envoi de mon PIN
    Quand je finis de saisir mon PIN
    Alors le PIN est effacé
    Et je vois "Rien n'a été pris sur ton solde."
    Et je vois le message "Pas de connexion." avec "Rien n'a été envoyé. Réessaie quand tu captes."
    Et aucun montant n'est affiché
    Et aucune demande n'est envoyée

  @D-P7-S6 @interdit
  Scénario: D-P7-S6 Rien n'est envoyé en silence au retour du réseau
    Étant donné que la connexion a coupé avant l'envoi
    Quand la connexion revient
    Alors aucune demande de retrait ne part sans que je saisisse à nouveau mon PIN

  @D-P7-S7 @nominal
  Scénario: D-P7-S7 Interruption avant le PIN : le récapitulatif est recalculé
    Étant donné que je suis sur "Combien tu retires ?", "Vérifie ton retrait" ou "Entre ton PIN" avec 5 000
    Quand Android ferme l'app puis que je la rouvre
    Alors je retrouve "Vérifie ton retrait" recalculé, avec "Un instant…" pendant le calcul
    Et mon montant est gardé
    Et mon PIN n'est pas gardé

  @D-P7-S8 @nominal
  Scénario: D-P7-S8 Interruption après l'envoi : la même demande
    Étant donné que ma demande de retrait a été envoyée
    Quand Android ferme l'app puis que je la rouvre
    Alors je vois le résultat de la même demande, ou l'accueil avec la ligne "Retrait Wave · En attente"
    Et la ligne mène au détail de ce retrait
    Et Opérations n'affiche qu'un seul retrait

  @D-P7-S9 @backend @interdit
  Scénario: D-P7-S9 Au retour dans l'app, le statut est interrogé avec la même clé
    Étant donné qu'une demande de retrait est ouverte
    Quand l'app revient au premier plan
    Alors l'app interroge le statut de cette demande avec sa clé d'idempotence
    Et aucune nouvelle demande n'est créée

  @D-P7-S10 @nominal
  Scénario: D-P7-S10 Session expirée après l'envoi
    Étant donné que ma demande de retrait a été envoyée
    Quand ma session expire et que je me reconnecte
    Alors la demande n'est pas renvoyée
    Et je lis son statut réel dans l'accueil ou Opérations
```

---

## D-P8 — Retrouver un retrait depuis Opérations

```gherkin
# language: fr
@client @D-P8
Fonctionnalité: Retrouver un retrait, son statut et son reçu
  Pour savoir ce qui est sorti de mon solde et garder une preuve
  En tant que Fatou, cliente
  Je veux voir chaque retrait dans Opérations, son détail et son reçu quand il est fait

  Contexte:
    Étant donné que je suis connectée
    Et que les frais du retrait sont confirmés dans la configuration à <frais>
    Et que j'ai un retrait Wave fait, un retrait Wave en attente et un retrait Wave échoué

  @D-P8-S1 @nominal
  Scénario: D-P8-S1 Une ligne par retrait, avec le montant pris sur le solde
    Quand j'ouvre Opérations
    Alors chaque retrait est une ligne "Retrait Wave" avec le sous-titre "Vers 07 08 … 56"
    Et le retrait fait affiche "− <montant pris>" et "Fait" avec la coche
    Et le retrait en attente affiche son montant sans signe, en gris, et "En attente" avec l'horloge
    Et le retrait échoué affiche son montant sans signe, en gris, et "Échoué" avec la croix

  @D-P8-S2 @interdit
  Scénario: D-P8-S2 Un retrait fait ne ressemble jamais à un échec
    Quand j'ouvre Opérations
    Alors la pastille du retrait fait est l'illustration Retirer sur fond neutre
    Et jamais la pastille d'échec

  @D-P8-S3 @nominal
  Scénario: D-P8-S3 Filtre « Retraits »
    Quand je touche la puce "Retraits" dans Opérations
    Alors je ne vois que les retraits
    Et la puce "Retraits" est la seule active

  @D-P8-S4 @nominal
  Scénario: D-P8-S4 Filtre « Retraits » vide
    Étant donné que je n'ai aucun retrait
    Quand je touche la puce "Retraits"
    Alors je vois "Aucun retrait pour l'instant." et le lien "Tout voir"

  @D-P8-S5 @nominal
  Scénario: D-P8-S5 Détail d'un retrait fait
    Quand j'ouvre le retrait fait
    Alors je vois le titre "Retrait Wave" et le statut "Fait"
    Et je vois "− <montant pris>" en grand
    Et je vois le flux "Depuis Mon solde" vers "Vers Wave 07 08 12 34 56"
    Et je vois les lignes "Date", "Frais <frais>", "Tu as reçu" avec le montant reçu, et "Référence"
    Et le bouton principal est "Voir le reçu"
    Et je vois le bouton texte "Signaler un problème"

  @D-P8-S6 @nominal
  Scénario: D-P8-S6 Détail d'un retrait en attente
    Quand j'ouvre le retrait en attente
    Alors je vois le statut "En attente"
    Et je vois le montant pris sans signe, en gris, et "<montant reçu> pas encore sur ton Wave."
    Et je vois les étapes "Demande envoyée · Envoyée", "Envoi vers ton Wave · En attente", "Arrivée sur ton Wave · Pas encore"
    Et je vois "Le reçu sera prêt quand ce sera fait." et "Ne refais pas le retrait."
    Et l'écran n'a pas de bouton principal
    Et je vois le bouton texte "Signaler un problème"

  @D-P8-S7 @erreur
  Plan du scénario: D-P8-S7 Détail d'un retrait échoué
    Étant donné que mon retrait a échoué pour "<cause>"
    Quand j'ouvre ce retrait
    Alors je vois le statut "Échoué"
    Et je vois "Rien n'est arrivé sur ton Wave."
    Et je vois "Ton retrait n'a pas marché." et "<raison>"
    Et je ne vois pas de ligne "Frais"
    Et je vois le bouton texte "Signaler un problème"

    Exemples:
      | cause                | raison                           |
      | un problème technique | Un problème technique l'a arrêté. |
      | un refus de Wave      | Wave a refusé le retrait.         |

  @D-P8-S8 @interdit
  Scénario: D-P8-S8 Aucun « Réessayer » ni « Refaire ce retrait » sur un détail
    Quand j'ouvre un retrait échoué, en attente ou fait
    Alors je ne vois ni "Réessayer" ni "Refaire ce retrait"
    Et un nouveau retrait se fait depuis "Retirer" sur l'accueil

  @D-P8-S9 @nominal
  Scénario: D-P8-S9 Reçu d'un retrait fait
    Étant donné que j'ouvre le détail du retrait fait
    Quand je touche "Voir le reçu"
    Alors je vois le reçu KOTIZ avec le statut "Fait"
    Et je vois "Retrait Mobile Money", puis "Tu as reçu" au-dessus du montant reçu
    Et je vois "Depuis Mon solde" et "Vers Wave 07 08 12 34 56" avec le numéro entier
    Et je vois "Date", "Pris sur ton solde <montant pris>", "Frais <frais>", "Référence" et mon nom
    Et je ne vois pas de bouton "Partager"

  @D-P8-S10 @interdit
  Scénario: D-P8-S10 Jamais de reçu pour un retrait non fait
    Quand j'ouvre un retrait en attente, en vérification ou échoué
    Alors aucun reçu n'est proposé
    Et aucun reçu n'est disponible par l'API pour ce retrait

  @D-P8-S11 @nominal
  Scénario: D-P8-S11 Détail et reçu masqués
    Étant donné que j'ai masqué les montants
    Quand j'ouvre le détail puis le reçu du retrait fait
    Alors le montant, les frais, "Tu as reçu" et "Pris sur ton solde" affichent "••• F"
    Et TalkBack annonce "Montant masqué"

  @D-P8-S12 @nominal @raccord
  Scénario: D-P8-S12 Depuis le résultat en attente, « Voir dans Opérations »
    Étant donné que je suis sur le résultat "En attente" d'un retrait
    Quand je touche "Voir dans Opérations"
    Alors je vois le détail de ce retrait, en attente

  @D-P8-S13 @nominal @a-confirmer @G01
  Scénario: D-P8-S13 Référence de l'opérateur
    Étant donné que l'opérateur a fourni sa référence pour mon retrait fait
    Quand j'ouvre le détail ou le reçu
    Alors je vois la référence de l'opérateur en plus de la référence KOTIZ

  @D-P8-S14 @backend @nominal
  Scénario: D-P8-S14 L'historique renvoie le montant reçu, les frais et le montant pris
    Quand l'app demande l'historique
    Alors chaque retrait a un statut réel, son montant reçu, ses frais confirmés et son montant pris
    Et aucun retrait en attente n'est renvoyé comme fait
```

---

## D-P9 — Retirer auprès d'une agente (raccord lot E)

```gherkin
# language: fr
@client @D-P9
Fonctionnalité: Comprendre le retrait en espèces auprès d'une agente
  Pour retirer des espèces sans donner mon PIN
  En tant que Fatou, cliente
  Je veux savoir quoi montrer à l'agente

  Contexte:
    Étant donné que je suis connectée
    Et que mon solde disponible est de 12 400 FCFA

  @D-P9-S1 @nominal
  Scénario: D-P9-S1 L'explication du retrait en espèces
    Étant donné que la feuille "Comment tu veux retirer ?" est ouverte
    Quand je touche "Auprès d'une agente"
    Alors je vois l'en-tête "Retirer auprès d'une agente"
    Et je vois "Montre Mon QR à une agente"
    Et je vois "1" "L'agente scanne ton QR.", "2" "Tu vérifies et tu confirmes dans KOTIZ.", "3" "L'agente te donne tes espèces."
    Et je vois "Ne donne jamais ton PIN à l'agente." et "Rien ne sort avant ta confirmation."
    Et le bouton principal est "Afficher Mon QR"

  @D-P9-S2 @nominal @raccord
  Scénario: D-P9-S2 Afficher Mon QR
    Étant donné que je suis sur "Retirer auprès d'une agente"
    Quand je touche "Afficher Mon QR"
    Alors je suis sur "Mon QR"

  @D-P9-S3 @nominal
  Scénario: D-P9-S3 Le retour rouvre la feuille
    Étant donné que je suis sur "Retirer auprès d'une agente"
    Quand je touche le retour
    Alors je suis sur l'accueil avec la feuille "Comment tu veux retirer ?" ouverte

  @D-P9-S4 @interdit
  Scénario: D-P9-S4 L'explication ne crée rien et n'annonce rien
    Quand j'ouvre "Retirer auprès d'une agente"
    Alors l'écran n'affiche ni montant, ni statut, ni frais, ni délai, ni liste d'agentes
    Et aucune opération n'est créée
    Et mon solde disponible est toujours de 12 400 FCFA
```

---

## Index des scénarios

| Parcours                                                                                                  | IDs                | Nombre  |
| --------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| D-P1 Retirer sur mon Mobile Money (avec D-00, accueil, D-01 à D-05 fait)                                  | D-P1-S1 à D-P1-S30 | 30      |
| D-P2 Solde insuffisant, attente, épargne (avec PNV-2)                                                     | D-P2-S1 à D-P2-S12 | 12      |
| D-P3 Bloqué avant le PIN (aucun opérateur, niveau d'accès, frais inconnus, refus, opérateur indisponible) | D-P3-S1 à D-P3-S16 | 16      |
| D-P4 Après le PIN : en attente, on vérifie, échoué (avec carte solde et backend)                          | D-P4-S1 à D-P4-S22 | 22      |
| D-P5 Pas reçu sur le Mobile Money, signalement                                                            | D-P5-S1 à D-P5-S9  | 9       |
| D-P6 PIN incorrect ou bloqué                                                                              | D-P6-S1 à D-P6-S9  | 9       |
| D-P7 Hors connexion et interruption                                                                       | D-P7-S1 à D-P7-S10 | 10      |
| D-P8 Retrouver un retrait (Opérations, détail, reçu)                                                      | D-P8-S1 à D-P8-S14 | 14      |
| D-P9 Auprès d'une agente (raccord lot E)                                                                  | D-P9-S1 à D-P9-S4  | 4       |
| **Total**                                                                                                 |                    | **126** |

**Interdits couverts**

- Frais : jamais inventés ni calculés par l'app, autorisation bloquée tant qu'ils sont inconnus, côté app et serveur : D-P1-S13, D-P3-S8, D-P3-S10.
- PIN KOTIZ seul, jamais le code de l'opérateur ; PIN jamais affiché ni gardé : D-P1-S20, D-P1-S21.
- Numéro vérifié seul, non modifiable : D-P1-S8.
- Retrait depuis le solde seulement, aucun enchaînement depuis le retour au solde : D-P2-S5.
- Montant pris supérieur au disponible refusé par le serveur : D-P2-S12.
- Refus connu d'avance sans PIN : D-P3-S14.
- « Fait » seulement après la confirmation de l'opérateur ; attente ≠ succès ; statut jamais déduit d'un SMS : D-P1-S26, D-P4-S2, D-P4-S17.
- Aucune garantie non confirmée sur un échec (G01) : D-P4-S13.
- Pas de Réessayer sur un résultat inconnu ; pas de Réessayer ni de « Refaire ce retrait » sur un détail : D-P4-S8, D-P8-S8.
- Résultat plein écran, retour jamais vers la saisie : D-P1-S25.
- Aucun délai annoncé : D-P1-S29.
- Aucun doublon (clé, confirmation rejouée, reprise, réseau revenu) : D-P4-S19, D-P7-S6, D-P7-S9.
- PIN incorrect ou bloqué : ni nombre d'essais, ni durée, ni montant, ni ordre : D-P6-S2, D-P6-S4, D-P6-S5.
- Signalement sans mouvement ni motif inventé : D-P5-S6, D-P5-S9.
- Jamais de reçu pour un retrait non fait ; un retrait fait ne ressemble jamais à un échec : D-P8-S2, D-P8-S10.
- L'explication du retrait en espèces ne crée rien : D-P9-S4.
