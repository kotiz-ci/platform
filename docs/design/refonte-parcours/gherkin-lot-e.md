# Gherkin — Refonte des parcours, lot E : espèces et accompagnement par une agente

Date : 30 octobre 2026. Statut : dérivé du lot E validé par le PO et sa conjointe (test à deux téléphones), critiqué le 30 octobre 2026 (15 corrections faites ou assumées) et corrigé (canvas version 36).
Sources : [handoff-lot-e.md](handoff-lot-e.md) (textes exacts, règles, critères d'acceptation), [ux-spec-lot-e.md](ux-spec-lot-e.md) (décisions PO du 21 et du 30 octobre 2026), [screens-lot-e.md](screens-lot-e.md), [critique-lot-e.md](critique-lot-e.md), [test-lot-e.md](test-lot-e.md), [prototype](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF) (pages « Lot E — Espèces et agente » et « Lot E — app agente », version 36 `1793360611-467c`). Rattachement aux issues : [issues-lot-e.md](issues-lot-e.md).

## Mode d'emploi

- Langue Gherkin : français (`# language: fr`). Mots-clés : Fonctionnalité, Contexte, Scénario, Plan du scénario, Exemples, Étant donné, Quand, Alors, Et, Mais.
- **IDs stables** : `E-Pn-Sm` (lot E, parcours n, scénario m), repris en tag `@E-Pn-Sm`. Un ID n'est jamais réutilisé ; un scénario retiré garde son ID barré dans ce fichier. Les variantes du prototype (E-P1′ frais inconnus, E-P2′ mise de côté échouée, E-P4′ à E-P4⁶, E-P5′, E-P9′, E-P9″…) sont rangées dans leur parcours de base, sans prime dans l'ID.
- Rappel : « E-01 » (avec tiret) est un écran du lot E ; « A · E01 » est un écran du lot A ; « D10 » est l'issue [#71](https://github.com/kotiz-ci/platform/issues/71).
- **Deux apps, deux acteurs** : « je » est **Fatou** dans une fonctionnalité taguée `@client`, **Awa** dans une fonctionnalité taguée `@agente`. Un scénario de bout en bout nomme les deux (« Fatou… », « Awa… »).
- **Tags** : `@nominal`, `@erreur`, `@interdit` (règle qui ne doit jamais être violée), `@a-confirmer` (dépend d'un paramètre non tranché), `@G01` `@G02` `@G03` `@G04` (gate concerné), `@client` `@agente` (variant d'app), `@backend` (vérifiable au niveau API), `@raccord` (écran d'un autre lot touché par le lot E), `@a-dessiner` (comportement de la spec sans état dessiné), `@sans-smartphone` (cliente sans accès à l'app : codes SMS, livrables seulement après G02).
- **Paramètres non tranchés** entre chevrons, lus dans la configuration du test : `<frais>` (frais confirmés renvoyés par le serveur), `<montant pris>` (montant pris sur le solde pour un retrait, renvoyé par le serveur), `<code>` (code ponctuel valide de la demande), `<HH:MM>`, `<date>`.
- **Frais du cash : non confirmés (G01).** Les scénarios qui vont au bout d'une opération posent dans leur `Contexte` que les frais sont confirmés dans la configuration, sans valeur. Tant qu'ils sont inconnus, l'autorisation reste bloquée (E-P1-S20, E-P7-S6, E-P8-S7). **Aucune ligne « à confirmer » n'existe en production** (note PO 4, E-P5-S18, E-P13-S8).
- **Apostrophe** : les textes d'interface entre guillemets et dans les tableaux `Exemples` utilisent ’ (critique n° 11), comme le catalogue de textes ; un test compare le texte exact.
- **Accès suspendu de l'agente** (E-53, E-58, E-64) : états du lot G, **pas encore testés**, non couverts ici ; ils iront dans le Gherkin du lot G.
- **Données d'exemple fictives** (jamais des règles) : Fatou Koné, 07 08 12 34 56 (vu par l'agente : 07 •• •• •• 56), solde 12 400 FCFA, épargnes École Awa et Boutique ; Awa Traoré, AG-0142 ; montants 3 000 et 5 000 F ; demandes n° 2110-0031, 2110-0032, 2110-0033.
- Utilisation : `/implement-ticket` ou `/implement-spec` reprend les scénarios de l'issue visée (table de [issues-lot-e.md](issues-lot-e.md)) **avant** le code ; chaque scénario devient un test d'acceptation à la frontière la plus haute possible (écran pour `@client` et `@agente`, API pour `@backend`).

---

## E-P1 — Déposer des espèces sur mon solde, avec mon téléphone

Couvre A · Q01 (ouverture de la demande), E-01, E-03, E-04 (fait) côté cliente ; E-51, E-53, E-54, E-55, E-56, E-58, E-59 côté agente.

```gherkin
# language: fr
@E-P1
Fonctionnalité: Déposer des espèces sur mon solde avec une agente
  Pour mettre mes espèces sur KOTIZ en sécurité
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons que je confirme d'abord, que je donne les espèces ensuite, et que le dépôt ne soit fait qu'après le comptage

  Contexte:
    Étant donné que Fatou est connectée à l'app cliente avec l'accès à l'app activé
    Et qu'Awa est connectée à l'app agente
    Et que les frais du dépôt en espèces sont confirmés dans la configuration à <frais>
    Et que les fonds d'Awa suffisent pour 5 000 F

  @E-P1-S1 @nominal @client @agente
  Scénario: E-P1-S1 Dépôt de bout en bout, espèces remises au bon moment
    Étant donné que Fatou affiche "Mon QR"
    Quand Awa scanne le QR, vérifie "Fatou Koné", touche "Dépôt en espèces", saisit "5000" et touche "Continuer"
    Et qu'Awa touche "Envoyer à son téléphone"
    Alors Fatou voit l'écran "Dépôt en espèces" s'ouvrir seul avec "Tu donnes" et "5 000 FCFA"
    Et Awa voit "Fatou confirme sur son téléphone." et "Ne prends pas encore les espèces."
    Quand Fatou touche "Je confirme"
    Alors Fatou voit "Donne les espèces à Awa."
    Et Awa voit "Confirmé par Fatou" et "Prends les espèces et compte-les."
    Quand Awa compte les espèces et touche "Confirmer les espèces reçues"
    Alors Awa voit "Dépôt fait." et "Sur le compte de Fatou Koné"
    Et Fatou voit le statut "Fait" et "Ton argent est sur ton solde."
    Et le solde disponible de Fatou augmente de 5 000 F

  @E-P1-S2 @nominal @raccord @client
  Scénario: E-P1-S2 La demande reçue pendant Mon QR s'ouvre seule
    Étant donné que j'affiche "Mon QR"
    Quand la demande de dépôt d'Awa arrive
    Alors l'écran "Dépôt en espèces" s'ouvre sans que je touche rien
    Et la luminosité de l'écran revient à mon réglage

  @E-P1-S3 @nominal @client
  Scénario: E-P1-S3 Le récapitulatif du dépôt dit qui, combien et vers où
    Quand j'ouvre la demande de dépôt d'Awa
    Alors je vois "Awa Traoré" et "Agente KOTIZ · AG-0142"
    Et je vois "Tu donnes" et "5 000 FCFA"
    Et je vois "Ne donne pas encore les espèces." sous le montant
    Et je vois le trajet "Tes espèces" vers "Mon solde"
    Et je vois le bouton texte "Changer la destination"
    Et je vois "Frais" avec <frais> et "Demande" avec "n° 2110-0031"
    Et le bouton principal est "Je confirme" et le bouton texte est "Ce n’est pas le bon montant"

  @E-P1-S4 @interdit @client
  Scénario: E-P1-S4 Le dépôt ne demande jamais de PIN et n'affiche pas mon solde
    Quand je vais de la demande de dépôt au résultat
    Alors aucun écran ne me demande mon PIN ni un code
    Et aucun écran de la demande n'affiche mon solde ni mes épargnes avec leur montant

  @E-P1-S5 @nominal @client
  Scénario: E-P1-S5 Après « Je confirme », je sais que ce n'est pas encore fait
    Quand je touche "Je confirme"
    Alors je vois la pastille horloge et le statut "En attente"
    Et je vois "Donne les espèces à Awa." et "Elle les compte devant toi."
    Et je vois le montant "5 000 FCFA"
    Et je vois les étapes "Tu as confirmé · Confirmé", "Awa compte les espèces · En attente", "Arrive sur ton solde · Pas encore"
    Et je vois "Avec Awa Traoré", "Vers Mon solde" et "Demande n° 2110-0031"
    Et je vois le bouton texte "Voir dans Opérations"
    Et je ne vois aucun bouton pour changer la destination

  @E-P1-S6 @interdit @backend
  Scénario: E-P1-S6 La confirmation seule ne déplace aucun argent
    Étant donné que Fatou a confirmé la demande n° 2110-0031
    Quand Awa n'a pas encore touché "Confirmer les espèces reçues"
    Alors aucune écriture n'existe pour cette demande
    Et le solde disponible de Fatou et les fonds d'Awa n'ont pas changé

  @E-P1-S7 @nominal @client
  Scénario: E-P1-S7 L'écran d'attente passe seul au résultat
    Étant donné que je suis sur "Donne les espèces à Awa."
    Quand Awa lance le dépôt et qu'il est confirmé
    Alors l'écran passe seul au résultat "Fait"
    Et je vois "Ton argent est sur ton solde.", "5 000 FCFA", "Avec Awa Traoré", la référence et "Tu reçois aussi un SMS."
    Et le bouton principal est "Terminé" et le bouton texte est "Voir le reçu"

  @E-P1-S8 @nominal @client
  Scénario: E-P1-S8 Le résultat ne revient jamais vers la demande
    Étant donné que je vois le résultat "Fait" du dépôt
    Quand je touche "Terminé", la croix ou le retour Android
    Alors je suis sur l'accueil
    Et je ne reviens jamais sur la demande ni sur "Donne les espèces à Awa."

  @E-P1-S9 @nominal @client
  Scénario: E-P1-S9 Fermer l'écran d'attente ne coupe pas le dépôt
    Étant donné que je suis sur "Donne les espèces à Awa."
    Quand je ferme l'écran
    Alors je suis sur l'accueil et la carte solde affiche "Dépôt en attente"
    Et Awa peut toujours lancer le dépôt

  @E-P1-S10 @nominal @agente
  Scénario: E-P1-S10 Trouver la cliente par son QR
    Quand j'ouvre "Trouver la cliente"
    Alors je vois le viseur, "Scanne le QR de la cliente." et "Le QR sert à la trouver. Il ne paie rien."
    Et je vois le bouton texte "Chercher par numéro"
    Quand je vise un QR KOTIZ valide
    Alors je vois "Lecture…" puis l'écran "C’est bien elle ?"

  @E-P1-S11 @nominal @interdit @agente
  Scénario: E-P1-S11 « C’est bien elle ? » sans aucun argent de la cliente
    Quand j'ouvre "C’est bien elle ?" pour Fatou
    Alors je vois "Fatou Koné", "07 •• •• •• 56" et "Accès à l’app : activé"
    Et je vois "Demande-lui son nom avant de continuer."
    Et je vois les lignes "Dépôt en espèces", "Retrait", "Accompagnement" avec "Pas demandé" et "Point de ses épargnes"
    Et je ne vois pas "Créer une épargne pour elle"
    Et je vois le bouton texte "Ce n’est pas elle"
    Et je ne vois ni solde, ni épargne, ni opération de Fatou

  @E-P1-S12 @nominal @agente
  Scénario: E-P1-S12 « Ce n’est pas elle » n'enregistre rien
    Étant donné que je suis sur "C’est bien elle ?"
    Quand je touche "Ce n’est pas elle"
    Alors je suis sur "Trouver la cliente"
    Et aucune demande n'est créée

  @E-P1-S13 @nominal @agente
  Scénario: E-P1-S13 Saisir le montant du dépôt
    Quand je touche "Dépôt en espèces"
    Alors je vois "Dépôt en espèces", "Étape 1 sur 3" et "Pour Fatou Koné"
    Et le champ du montant est vide, sans montant rapide
    Et je vois "Ne prends pas encore les espèces."
    Et "Continuer" est désactivé avec la raison "Écris le montant."
    Quand je saisis "5000" et touche "Continuer"
    Alors je vois "Vérification…" puis "Vérifie le dépôt avec elle"

  @E-P1-S14 @nominal @agente
  Scénario: E-P1-S14 Relire le dépôt avec une cliente qui a l'app
    Quand j'arrive sur "Vérifie le dépôt avec elle"
    Alors je vois "Étape 2 sur 3", "Elle donne" et "5 000 FCFA" avec "Modifier"
    Et je vois "Cliente Fatou Koné", "Agente Toi (Awa Traoré)" et "Vers Elle choisit sur son téléphone"
    Et je vois "Frais" avec <frais>
    Et je vois "Elle confirme d’abord. Ensuite seulement, prends les espèces."
    Et le bouton principal est "Envoyer à son téléphone" et le bouton texte est "Annuler"

  @E-P1-S15 @nominal @agente
  Scénario: E-P1-S15 « Annuler » avant l'envoi ne laisse aucune trace
    Étant donné que je suis sur "Vérifie le dépôt avec elle"
    Quand je touche "Annuler"
    Alors je suis sur "C’est bien elle ?"
    Et aucune demande n'existe pour ce dépôt

  @E-P1-S16 @nominal @agente
  Scénario: E-P1-S16 Attendre la confirmation de Fatou
    Quand je touche "Envoyer à son téléphone"
    Alors je vois "Envoi…" puis la pastille horloge et "En attente"
    Et je vois "Fatou confirme sur son téléphone." et "5 000 FCFA"
    Et je vois "Cliente Fatou Koné" et "Demande n° 2110-0031"
    Et je vois "Ne prends pas encore les espèces."
    Et je vois les boutons texte "Elle n’a pas internet ? Envoyer le code par SMS" et "Annuler la demande"

  @E-P1-S17 @nominal @agente
  Scénario: E-P1-S17 Recevoir et compter, seulement après la confirmation
    Quand Fatou confirme sur son téléphone
    Alors je vois "Étape 3 sur 3" et "Confirmé par Fatou"
    Et je vois "Prends les espèces et compte-les.", "5 000 FCFA" et "Devant elle."
    Et je vois "Cliente Fatou Koné" et "Demande n° 2110-0031"
    Et le bouton principal est "Confirmer les espèces reçues", le secondaire "Le montant n’est pas le même"
    Et l'en-tête propose "Annuler" et aucune flèche retour

  @E-P1-S18 @nominal @agente
  Scénario: E-P1-S18 Le retour Android ne lance rien sur l'écran de comptage
    Étant donné que je suis sur "Prends les espèces et compte-les."
    Quand je touche le retour Android
    Alors je reste sur cet écran
    Et rien n'est lancé

  @E-P1-S19 @nominal @agente @backend
  Scénario: E-P1-S19 « Confirmer les espèces reçues » lance le dépôt une seule fois
    Étant donné que je suis sur "Prends les espèces et compte-les."
    Quand je touche deux fois rapidement "Confirmer les espèces reçues"
    Alors je vois "Lancement du dépôt…"
    Et un seul dépôt est lancé pour la demande n° 2110-0031
    Et je vois "Dépôt fait.", "5 000 FCFA", "Sur le compte de Fatou Koné", la référence et "Fatou reçoit un SMS."
    Et le bouton principal est "Terminé" et le bouton texte est "Voir le reçu"

  @E-P1-S20 @erreur @a-confirmer @G01 @client @agente @backend
  Scénario: E-P1-S20 Frais inconnus : rien ne peut être confirmé ni envoyé
    Étant donné que les frais du dépôt en espèces ne sont pas connus dans la configuration
    Quand Awa arrive sur "Vérifie le dépôt avec elle"
    Alors elle voit "On ne connaît pas encore les frais." et "Rien n’est envoyé. Réessaie plus tard."
    Et "Envoyer à son téléphone" est désactivé avec la raison "Les frais ne sont pas encore connus."
    Quand une demande existante arrive malgré tout sur l'app de Fatou
    Alors Fatou voit "On ne connaît pas encore les frais." et "Rien n’a bougé. Réessaie plus tard."
    Et "Je confirme" est désactivé avec la raison "Les frais ne sont pas encore connus."
    Et le serveur refuse de créer ou de confirmer une demande sans frais connus

  @E-P1-S21 @nominal @agente
  Scénario: E-P1-S21 Terminer ramène à « Trouver la cliente »
    Étant donné que je vois "Dépôt fait."
    Quand je touche "Terminé" ou la croix
    Alors je suis sur "Trouver la cliente"

  @E-P1-S22 @nominal @backend
  Scénario: E-P1-S22 Le SMS de confirmation a son propre statut
    Étant donné que le dépôt n° 2110-0031 est fait
    Quand l'envoi du SMS de confirmation à Fatou échoue
    Alors le dépôt reste "Fait"
    Et le statut d'envoi du SMS est "non abouti", distinct du statut du dépôt
    Et aucun écran ne propose de refaire le dépôt

  @E-P1-S23 @nominal @client @agente
  Scénario: E-P1-S23 Chaque app reprend la demande en cours après une interruption
    Étant donné que Fatou a confirmé la demande n° 2110-0031 et qu'Awa compte les espèces
    Quand Fatou et Awa ferment puis rouvrent leur app
    Alors Fatou est ramenée sur "Donne les espèces à Awa." pour la demande n° 2110-0031
    Et Awa est ramenée sur "Prends les espèces et compte-les." pour la même demande
    Et aucune nouvelle demande n'est créée

  @E-P1-S24 @nominal @a-dessiner @client
  Scénario: E-P1-S24 Deux demandes de deux agentes ne sont jamais fusionnées
    Étant donné qu'Awa et Binta m'envoient chacune une demande de dépôt
    Quand j'ouvre mes demandes
    Alors chaque demande a son écran, son agente et son numéro
    Et confirmer l'une ne confirme pas l'autre
```

---

## E-P2 — Déposer des espèces dans une épargne

Couvre E-01 (destination), E-02, E-03 (quatre étapes), E-04 (fait dans une épargne, mise de côté échouée ou en attente) et le raccord C-08.

```gherkin
# language: fr
@E-P2 @client
Fonctionnalité: Choisir l'épargne qui reçoit mon dépôt en espèces
  Pour mettre directement mes espèces de côté
  En tant que Fatou, cliente
  Je veux choisir la destination dans mon app, sans la montrer à l'agente

  Contexte:
    Étant donné que je suis connectée avec l'accès à l'app activé
    Et que j'ai les épargnes actives "École Awa" et "Boutique"
    Et que les frais du dépôt en espèces sont confirmés dans la configuration à <frais>
    Et que j'ai reçu la demande de dépôt n° 2110-0031 d'Awa pour 5 000 F

  @E-P2-S1 @nominal
  Scénario: E-P2-S1 Ouvrir le choix de la destination
    Quand je touche "Changer la destination"
    Alors une feuille s'ouvre avec le titre "Où va l’argent ?" et "Tout le montant va au même endroit."
    Et je vois "Mon solde" sélectionné, puis "École Awa" et "Boutique"
    Et aucune ligne n'affiche de montant

  @E-P2-S2 @nominal
  Scénario: E-P2-S2 Choisir une épargne
    Étant donné que la feuille "Où va l’argent ?" est ouverte
    Quand je touche "École Awa"
    Alors la feuille se ferme
    Et je vois le trajet "Tes espèces" vers "École Awa"

  @E-P2-S3 @nominal
  Scénario: E-P2-S3 Fermer la feuille ne change pas la destination
    Étant donné que la feuille "Où va l’argent ?" est ouverte
    Quand je la ferme avec la croix ou le retour Android
    Alors la destination est toujours "Mon solde"

  @E-P2-S4 @nominal
  Scénario: E-P2-S4 L'attente montre une quatrième étape pour l'épargne
    Étant donné que j'ai choisi "École Awa"
    Quand je touche "Je confirme"
    Alors je vois les étapes "Tu as confirmé", "Awa compte les espèces", "Arrive sur ton solde" et "Passe dans École Awa"
    Et je vois "Vers École Awa"

  @E-P2-S5 @nominal
  Scénario: E-P2-S5 Dépôt fait dans l'épargne
    Étant donné que j'ai confirmé un dépôt vers "École Awa"
    Quand le dépôt et la mise de côté sont confirmés
    Alors je vois "Fait" et "Ton argent est dans École Awa."
    Et je vois les statuts "Dépôt · Fait" et "Dans École Awa · Fait"
    Et le bouton principal est "Terminé" et les boutons texte sont "Voir mon épargne" et "Voir le reçu"

  @E-P2-S6 @erreur
  Scénario: E-P2-S6 Dépôt fait, mise de côté échouée : à reprendre
    Étant donné que j'ai confirmé un dépôt vers "École Awa"
    Quand le dépôt est confirmé et que la mise de côté échoue de façon confirmée
    Alors je vois "À reprendre" et "Ton argent est sur ton solde."
    Et je vois "Il n’est pas allé dans École Awa."
    Et je vois les statuts "Dépôt · Fait" et "Dans École Awa · Échoué"
    Et le bouton principal est "Réessayer de mettre de côté" et le bouton texte est "Laisser sur mon solde"

  @E-P2-S7 @interdit @raccord @backend
  Scénario: E-P2-S7 Reprendre la mise de côté ne demande ni espèces ni nouveau dépôt
    Étant donné que je vois "À reprendre" après un dépôt en espèces
    Quand je touche "Réessayer de mettre de côté"
    Alors j'arrive sur le récapitulatif de reprise du lot C
    Et aucun nouveau dépôt n'est créé et aucune espèce n'est demandée

  @E-P2-S8 @nominal
  Scénario: E-P2-S8 Mise de côté en attente : suivi seulement
    Quand le dépôt est confirmé et que la mise de côté est encore en attente
    Alors je vois "En attente" et "Ton argent est sur ton solde."
    Et je vois "Dépôt · Fait", "Dans École Awa · En attente" et "Ne refais rien."
    Et le bouton principal est "Terminé" et le bouton texte est "Voir dans Opérations"

  @E-P2-S9 @nominal
  Scénario: E-P2-S9 Sans épargne, seule « Mon solde » est proposée
    Étant donné que je n'ai aucune épargne active
    Quand j'ouvre "Où va l’argent ?"
    Alors je vois seulement "Mon solde"
    Et je vois "Tu pourras créer une épargne après."
    Et aucune création d'épargne n'est enchaînée

  @E-P2-S10 @erreur
  Scénario: E-P2-S10 L'épargne choisie a été fermée entre-temps
    Étant donné que j'ai choisi "École Awa"
    Quand "École Awa" est fermée avant ma confirmation
    Alors je vois "École Awa est fermée." et "Ton argent ira sur Mon solde."
    Et le trajet va vers "Mon solde"
    Et je vois toujours "Changer la destination"

  @E-P2-S11 @nominal
  Scénario: E-P2-S11 Chargement des épargnes sans chiffre
    Étant donné que mes épargnes mettent du temps à charger
    Quand j'ouvre "Où va l’argent ?"
    Alors je vois un squelette annoncé "Chargement de tes épargnes"
    Et aucun chiffre n'est affiché

  @E-P2-S12 @interdit @agente
  Scénario: E-P2-S12 L'agente ne voit ni l'épargne choisie ni la mise de côté
    Étant donné que Fatou a choisi "École Awa" dans son app
    Quand Awa suit la demande puis voit le résultat
    Alors Awa voit "Vers Elle choisit sur son téléphone" puis "Dépôt fait."
    Et Awa ne voit jamais le nom "École Awa" ni le résultat de la mise de côté

  @E-P2-S13 @interdit @backend
  Scénario: E-P2-S13 Une seule destination pour tout le montant, en deux mouvements liés
    Étant donné que Fatou a confirmé 5 000 F vers "École Awa"
    Quand le dépôt est lancé
    Alors le serveur crée un dépôt de 5 000 F sur le solde disponible puis une affectation liée de 5 000 F vers "École Awa"
    Et l'échec de l'affectation ne rend pas le dépôt échoué
```

---

## E-P3 — Déposer des espèces sans smartphone (code du dépôt)

Couvre E-52, E-53 (accès pas activé), E-55 sans app (destination, accord de noms), E-57 (code du dépôt, code pour voir les noms), E-58 et les SMS.

```gherkin
# language: fr
@E-P3 @agente @sans-smartphone @a-confirmer @G02
Fonctionnalité: Déposer des espèces pour une cliente sans smartphone
  Pour servir une cliente qui n'a pas l'app
  En tant qu'Awa, agente
  Je veux que Fatou confirme par un code lu dans son SMS, jamais par un PIN

  Contexte:
    Étant donné que je suis connectée à l'app agente
    Et que Fatou n'a pas activé son accès à l'app
    Et que les frais du dépôt en espèces sont confirmés dans la configuration à <frais>
    Et que mes fonds suffisent pour 5 000 F

  @E-P3-S1 @nominal
  Scénario: E-P3-S1 Chercher la cliente par son numéro
    Quand je touche "Chercher par numéro"
    Alors je vois "Son numéro KOTIZ" avec "+225" et "Tu vérifies son nom à l’étape suivante."
    Et "Chercher" est désactivé avec la raison "Écris son numéro."
    Quand je saisis "0708123456" et touche "Chercher"
    Alors je vois "Recherche…" puis "C’est bien elle ?" avec "Fatou Koné" et "Accès à l’app : pas activé"
    Et je vois la ligne "Créer une épargne pour elle"

  @E-P3-S2 @erreur
  Plan du scénario: E-P3-S2 Numéro incomplet ou introuvable
    Quand je saisis "<numéro>" et touche "Chercher"
    Alors je vois "<message>"

    Exemples:
      | numéro    | message                               |
      | 0708      | Écris les 10 chiffres de son numéro.  |
      | 0102030405 | Aucune cliente à ce numéro.          |

  @E-P3-S3 @nominal @raccord
  Scénario: E-P3-S3 Cliente introuvable : créer sa fiche
    Étant donné que je vois "Aucune cliente à ce numéro."
    Quand je touche "Créer sa fiche"
    Alors j'arrive sur la création de fiche du lot A
    Et la recherche n'a créé aucune opération

  @E-P3-S4 @nominal
  Scénario: E-P3-S4 Relire le dépôt sans app : destination par défaut et code par SMS
    Quand je saisis "5000" pour Fatou et touche "Continuer"
    Alors je vois "Vers" avec "Son compte KOTIZ" sélectionné et "Une de ses épargnes"
    Et je vois "Une de ses épargnes" avec "Elle doit accepter que tu voies les noms."
    Et je vois "Elle reçoit un SMS avec le code du dépôt."
    Et le bouton principal est "Envoyer le code par SMS"

  @E-P3-S5 @nominal
  Scénario: E-P3-S5 Voir les noms des épargnes demande l'accord de Fatou
    Quand je touche "Une de ses épargnes"
    Alors une feuille s'ouvre avec "Voir les noms de ses épargnes ?"
    Et je vois "Elle reçoit un code par SMS. Tu verras les noms, jamais les montants."
    Et le bouton principal est "Envoyer le code des noms" et l'autre bouton "Garder son solde"

  @E-P3-S6 @nominal @backend
  Scénario: E-P3-S6 Le code des noms montre les noms, sans montant, pour ce dépôt seulement
    Étant donné que j'ai envoyé le code des noms
    Quand je saisis le <code> que Fatou me dit sur "Code pour voir les noms" et touche "Valider le code"
    Alors je reviens sur "Vérifie le dépôt avec elle" avec "Où va l’argent ? Choisis avec elle."
    Et je vois "École Awa" et "Boutique" sans aucun montant
    Et cet accord ne vaut que pour la demande en cours

  @E-P3-S7 @nominal
  Scénario: E-P3-S7 Sans accord des noms, le dépôt va sur son compte
    Étant donné que la feuille "Voir les noms de ses épargnes ?" est ouverte
    Quand je touche "Garder son solde"
    Alors la destination est "Son compte KOTIZ"
    Et "Envoyer le code par SMS" reste actif

  @E-P3-S8 @nominal
  Scénario: E-P3-S8 Saisir le code du dépôt dit par Fatou
    Quand je touche "Envoyer le code par SMS"
    Alors je vois le titre "Code du dépôt"
    Et je vois "Fatou lit le SMS. Elle vérifie, puis te dit le code."
    Et je vois le rappel du dépôt de 5 000 F et "Ne prends pas les espèces sans code."
    Et le champ affiche les chiffres en clair, avec l'indication "Code lu par Fatou" et l'aide "Ce n’est jamais son PIN."
    Et "Valider le code" est désactivé avec la raison "Écris le code que Fatou te dit."

  @E-P3-S9 @nominal @backend
  Scénario: E-P3-S9 Le code valide confirme les conditions, sans rien lancer
    Étant donné que je suis sur "Code du dépôt"
    Quand je saisis le <code> et touche "Valider le code"
    Alors je vois "Code du dépôt validé" et "Prends les espèces et compte-les."
    Et aucun dépôt n'est lancé tant que je n'ai pas touché "Confirmer les espèces reçues"

  @E-P3-S10 @interdit @backend
  Plan du scénario: E-P3-S10 Un code ne vaut que pour sa demande et sa finalité
    Étant donné que je suis sur "Code du dépôt" de la demande n° 2110-0031
    Quand je saisis "<code saisi>"
    Alors le code est refusé avec "Code incorrect. Demande-lui de relire le SMS."

    Exemples:
      | code saisi                                   |
      | le code du dépôt d’une autre demande         |
      | le code pour voir les noms de cette demande  |
      | le PIN de Fatou                              |

  @E-P3-S11 @interdit
  Scénario: E-P3-S11 Le champ de code n'est jamais un champ PIN
    Quand j'ouvre n'importe quel écran de code
    Alors le champ n'a pas de cases masquées comme un PIN
    Et l'app agente n'a aucun champ nommé "PIN"

  @E-P3-S12 @nominal @backend @G04
  Scénario: E-P3-S12 Fatou reçoit le SMS du code puis celui du dépôt fait
    Quand j'envoie le code du dépôt
    Alors Fatou reçoit sur son numéro vérifié un SMS qui dit l'agente, le montant, la destination, les frais et le code
    Quand le dépôt est fait
    Alors Fatou reçoit un SMS de confirmation avec la référence
    Et aucun SMS n'indique une longueur, une durée de validité ou un nombre d'essais
```

---

## E-P4 — Dépôt en espèces : les imprévus

Couvre E-54 (fonds insuffisants, montant corrigé, hors règles), E-56 (refusée, sans réponse, sans internet), E-57 (code incorrect, expiré, bloqué, SMS non reçu), E-58 (confirmation plus valable, montant différent, hors connexion), E-59 (pas fait, en vérification), E-60, E-03 et E-04 (plus valable, annulé, refusé, échoué, en vérification), E-05 et C-14.

```gherkin
# language: fr
@E-P4
Fonctionnalité: Les imprévus du dépôt en espèces
  Pour ne jamais perdre d'espèces ni d'argent
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons que chaque imprévu dise ce qui est fait, ce qui ne l'est pas, et que faire des espèces

  Contexte:
    Étant donné que Fatou a l'accès à l'app activé
    Et que les frais du dépôt en espèces sont confirmés dans la configuration à <frais>

  @E-P4-S1 @erreur @interdit @agente
  Scénario: E-P4-S1 Fonds de l'agente insuffisants : arrêt avant toute demande
    Étant donné que les fonds d'Awa ne suffisent pas pour 5 000 F
    Quand Awa saisit "5000" et touche "Continuer"
    Alors Awa voit "Tes fonds ne suffisent pas pour ce dépôt."
    Et Awa voit une seule fois "Ne prends pas les espèces."
    Et aucun montant des fonds d'Awa n'est affiché
    Et Awa voit le lien "Mes fonds"
    Et aucune demande n'arrive sur le téléphone de Fatou

  @E-P4-S2 @erreur @a-confirmer @G01 @agente
  Scénario: E-P4-S2 Montant hors règles
    Étant donné qu'une règle du compte de Fatou refuse 5 000 F
    Quand Awa saisit "5000" et touche "Continuer"
    Alors Awa voit "Ce montant n’est pas possible pour cette cliente."
    Et aucune valeur chiffrée de la règle n'est affichée

  @E-P4-S3 @erreur @client @agente
  Scénario: E-P4-S3 Fatou refuse la demande : refus neutre des deux côtés
    Étant donné que Fatou voit la demande de dépôt n° 2110-0031
    Quand Fatou touche "Ce n’est pas le bon montant"
    Alors Fatou voit la pastille neutre, "Refusé par toi", "Tu as refusé ce dépôt." et "Rien n’a bougé."
    Et Fatou ne voit ni croix rouge ni montant
    Et Awa voit la pastille neutre "Refusée", "Fatou n’a pas confirmé.", "Rien n’a bougé." et "Ne prends pas les espèces."
    Et le bouton principal d'Awa est "Revenir à sa fiche"

  @E-P4-S4 @erreur @client @agente @backend
  Scénario: E-P4-S4 Montant compté différent : nouvelle confirmation obligatoire
    Étant donné qu'Awa est sur "Prends les espèces et compte-les." pour 5 000 F
    Quand Awa touche "Le montant n’est pas le même"
    Alors Awa voit "Combien elle dépose ?" avec le montant prérempli et "Nouveau montant : elle doit confirmer à nouveau."
    Quand Awa saisit "4500", continue et envoie
    Alors Fatou voit "Le montant a changé." et "Vérifie à nouveau." avec "4 500 FCFA"
    Et l'ancienne confirmation de Fatou ne permet plus aucun lancement

  @E-P4-S5 @erreur @agente
  Scénario: E-P4-S5 Confirmation plus valable chez l'agente : ne pas prendre les espèces
    Étant donné qu'Awa est sur l'écran de comptage
    Quand la confirmation de Fatou n'est plus valable
    Alors Awa ne voit plus "Confirmé par Fatou"
    Et Awa voit le titre "Redemande sa confirmation."
    Et Awa voit "Ne prends pas encore les espèces. Si tu les as, garde-les de côté."
    Et Awa voit "Sa confirmation n’est plus valable." et "Rien n’est lancé."
    Et le montant reste affiché
    Et le bouton principal est "Redemander sa confirmation"

  @E-P4-S6 @erreur @client
  Scénario: E-P4-S6 Confirmation plus valable chez la cliente : état neutre
    Étant donné que je suis sur "Donne les espèces à Awa."
    Quand ma confirmation n'est plus valable
    Alors je vois une pastille neutre sans statut "En attente"
    Et je vois le titre "Confirme à nouveau." et "Awa ne peut pas encore lancer le dépôt."
    Et je vois "Ta confirmation n’est plus valable." et "Rien n’est entré. Confirme à nouveau."
    Et la première étape est "Ta confirmation · Plus valable", sans coche
    Et le bouton principal est "Confirmer à nouveau"
    Quand je touche "Confirmer à nouveau"
    Alors je vois la demande avec "Ta confirmation n’est plus valable." et "Confirme à nouveau."

  @E-P4-S7 @interdit @backend
  Scénario: E-P4-S7 Une confirmation expirée ne permet aucun lancement
    Étant donné que la confirmation de la demande n° 2110-0031 a expiré
    Quand l'app agente demande le lancement du dépôt
    Alors le serveur refuse le lancement
    Et aucun mouvement n'est créé
    Et la demande et la remise éventuelle restent enregistrées

  @E-P4-S8 @erreur @agente @sans-smartphone @a-confirmer @G02
  Plan du scénario: E-P4-S8 Code de la cliente incorrect, expiré ou bloqué
    Étant donné que je suis sur "Code du dépôt"
    Quand le code saisi est "<cas>"
    Alors je vois "<message>"
    Et le bouton principal est "<principal>"

    Exemples:
      | cas       | message                                         | principal        |
      | incorrect | Code incorrect. Demande-lui de relire le SMS.   | Valider le code  |
      | expiré    | Ce code n’est plus valable.                     | Renvoyer le SMS  |

  @E-P4-S9 @erreur @agente @sans-smartphone @a-confirmer @G02
  Scénario: E-P4-S9 Code bloqué pour la demande
    Étant donné que le code du dépôt est bloqué après trop d'essais
    Alors je vois "Trop d’essais."
    Et "Valider le code" est désactivé avec la raison "Code bloqué pour cette demande."
    Et je vois le bouton texte "Contacter l’aide"
    Et aucun nombre d'essais n'est affiché

  @E-P4-S10 @nominal @agente @sans-smartphone @a-confirmer @G02
  Scénario: E-P4-S10 Elle n'a pas reçu le SMS
    Étant donné que je suis sur "Code du dépôt"
    Quand je touche "Elle n’a pas reçu le SMS"
    Alors une feuille s'ouvre avec "Elle n’a pas reçu le SMS ?" et "Vérifie son numéro avec elle : 07 •• •• •• 56."
    Et je vois "Renvoyer le SMS", "Revenir" et "Contacter l’aide"
    Quand je touche "Renvoyer le SMS"
    Alors je vois "Nouveau SMS envoyé. L’ancien code ne marche plus."
    Et l'ancien code est refusé

  @E-P4-S11 @nominal @agente
  Scénario: E-P4-S11 Annuler la demande avant le lancement
    Étant donné que je suis sur l'écran de comptage du dépôt n° 2110-0031
    Quand je touche "Annuler"
    Alors un dialogue s'ouvre avec "Annuler la demande ?", "Elle reste dans l’historique.", "Fatou reçoit un SMS." et "Si elle t’a donné des espèces, rends-les."
    Et les boutons sont "Annuler la demande" et "Continuer"
    Quand je touche "Annuler la demande"
    Alors je suis sur "C’est bien elle ?" avec "Demande n° 2110-0031 annulée. Fatou reçoit un SMS."
    Et la demande est "Annulée" et toujours visible dans l'historique

  @E-P4-S12 @erreur @agente
  Scénario: E-P4-S12 L'annulation échoue
    Étant donné que le dialogue "Annuler la demande ?" est ouvert
    Quand l'annulation n'aboutit pas
    Alors je vois "Pas annulée. Réessaie."
    Et la demande n'a pas changé

  @E-P4-S13 @interdit @agente @backend
  Scénario: E-P4-S13 Pas d'annulation après le lancement
    Étant donné que le dépôt n° 2110-0031 est déjà lancé
    Quand je tente d'annuler la demande
    Alors je vois "Le dépôt est déjà lancé. Tu ne peux plus l’annuler."
    Et je suis sur le résultat du dépôt

  @E-P4-S14 @erreur @client
  Scénario: E-P4-S14 La cliente voit l'annulation et peut dire qu'elle a donné les espèces
    Quand Awa annule la demande n° 2110-0031
    Alors je vois "Annulé", "Awa a annulé le dépôt." et "Rien n’est entré sur ton compte."
    Et je vois "Demande n° 2110-0031"
    Et le bouton principal est "Terminé" et le bouton secondaire "J’ai donné les espèces"
    Et Fatou reçoit un SMS d'annulation avec le numéro de la demande

  @E-P4-S15 @nominal @raccord @client
  Scénario: E-P4-S15 « J’ai donné les espèces » mène au signalement
    Étant donné que je vois "Awa a annulé le dépôt."
    Quand je touche "J’ai donné les espèces"
    Alors une feuille s'ouvre avec "Tu as donné les espèces ?", "Dis-le-nous. On vérifie avec l’agente." et "Ce n’est pas encore un remboursement."
    Et je vois "Demande n° 2110-0031" et "5 000 F · Awa Traoré"
    Et les boutons sont "Signaler un problème", "Revenir" et "Contacter l’aide"
    Quand je touche "Signaler un problème"
    Alors j'arrive sur le signalement avec le motif "J’ai remis les espèces" présélectionné
    Et la demande, l'agente et le montant sont repris sans ressaisie

  @E-P4-S16 @nominal @client
  Scénario: E-P4-S16 Un signalement déjà envoyé est rouvert, jamais doublé
    Étant donné que j'ai déjà signalé la remise pour la demande n° 2110-0031
    Quand j'ouvre la feuille "Tu as donné les espèces ?"
    Alors le bouton principal est "Voir mon signalement"

  @E-P4-S17 @interdit @backend
  Scénario: E-P4-S17 Signaler une remise ne crée aucun mouvement
    Quand Fatou envoie le signalement "J’ai remis les espèces"
    Alors aucun mouvement d'argent n'est créé
    Et la demande reste "Annulée"

  @E-P4-S18 @erreur @client @agente
  Scénario: E-P4-S18 Fonds devenus insuffisants au lancement : rendre les espèces
    Étant donné qu'Awa a touché "Confirmer les espèces reçues"
    Quand le recontrôle des fonds d'Awa échoue
    Alors Awa voit "Échoué", "Dépôt pas fait.", "Rien n’est entré sur son compte." et "Rends les 5 000 F à Fatou."
    Et Fatou voit "Ton dépôt n’est pas fait.", "Rien n’est entré sur ton compte." et "Awa doit te rendre tes espèces."
    Et Fatou voit le bouton texte "Tu n’as pas récupéré tes espèces ?"

  @E-P4-S19 @erreur @interdit @client @agente @backend
  Scénario: E-P4-S19 Résultat inconnu après le lancement : on vérifie, rien ne se refait
    Étant donné qu'Awa a lancé le dépôt
    Quand la connexion est perdue avant le résultat
    Alors Awa voit "En attente", "Dépôt en cours de vérification.", "Ne refais pas le dépôt.", "Garde le numéro de demande." et le numéro de la demande
    Et Fatou voit "On vérifie ton dépôt.", "Awa a reçu tes espèces. Ce n’est pas encore sur ton compte." et "Ne refais pas le dépôt."
    Et Fatou voit le bouton texte "Signaler un problème"
    Et aucune annulation ni aucun nouveau dépôt n'est proposé
    Et aucun remboursement automatique n'est fait tant que le crédit reste possible

  @E-P4-S20 @erreur @agente
  Scénario: E-P4-S20 Hors connexion sur l'écran de comptage
    Étant donné qu'Awa est sur l'écran de comptage
    Quand la connexion est coupée
    Alors Awa voit "Pas de connexion. Rien n’a été envoyé." et "Garde les espèces de côté."
    Et rien n'est lancé

  @E-P4-S21 @erreur @client
  Scénario: E-P4-S21 Hors connexion sur la demande
    Étant donné que je vois la demande de dépôt
    Quand je touche "Je confirme" sans connexion
    Alors je vois "Pas de connexion. Rien n’a été envoyé."
    Et le bouton principal devient "Réessayer"
    Et ma confirmation n'est pas envoyée en silence au retour du réseau

  @E-P4-S22 @nominal @agente @sans-smartphone @backend
  Scénario: E-P4-S22 Elle n'a pas internet : le code par SMS pour la même demande
    Étant donné qu'Awa attend la confirmation de la demande n° 2110-0031
    Quand Awa touche "Elle n’a pas internet ? Envoyer le code par SMS"
    Alors Awa voit "Code du dépôt" pour la demande n° 2110-0031
    Et aucune nouvelle demande n'est créée
    Et la confirmation dans l'app de Fatou n'est plus possible pour cette demande

  @E-P4-S23 @erreur @agente
  Scénario: E-P4-S23 Pas de réponse : renvoyer une nouvelle demande, sans relance automatique
    Étant donné qu'Awa attend la confirmation de Fatou
    Quand Fatou ne répond pas
    Alors Awa voit "Pas de réponse pour l’instant." et "Tu peux renvoyer une nouvelle demande."
    Et le bouton principal est "Renvoyer la demande" et le bouton texte "Annuler la demande"
    Et aucune relance n'est envoyée automatiquement

  @E-P4-S24 @interdit @client
  Scénario: E-P4-S24 Aucun résultat du dépôt ne propose de le refaire ni ne parle de remboursement
    Quand je vois un résultat de dépôt en espèces, quel que soit son statut
    Alors je ne vois jamais "Réessayer le dépôt"
    Et je ne vois jamais le mot "Remboursé"

  @E-P4-S25 @nominal @client
  Scénario: E-P4-S25 Fermer une demande sans répondre la laisse en attente
    Étant donné que je vois la demande de dépôt d'Awa
    Quand je la ferme avec la croix ou le retour Android
    Alors la demande n'est pas refusée
    Et l'accueil affiche "Awa attend ta réponse ›"
```

---

## E-P5 — Retirer des espèces, avec mon téléphone

Couvre E-06, E-07, E-08 (fait), E-09 côté cliente ; E-61, E-62, E-63, E-56, E-64 (fait), E-59 (retrait terminé) côté agente.

```gherkin
# language: fr
@E-P5
Fonctionnalité: Retirer des espèces avec une agente
  Pour avoir mes espèces en main
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons que je confirme avec mon PIN caché, que l'argent sorte d'abord, et que les espèces me soient remises ensuite

  Contexte:
    Étant donné que Fatou est connectée à l'app cliente avec l'accès à l'app activé
    Et que son solde disponible est de 12 400 FCFA
    Et que les frais du retrait en espèces sont confirmés dans la configuration à <frais>
    Et que le serveur renvoie <montant pris> pour un retrait de 3 000 F

  @E-P5-S1 @nominal @client @agente
  Scénario: E-P5-S1 Retrait de bout en bout, espèces remises après le résultat
    Étant donné que Fatou affiche "Mon QR"
    Quand Awa scanne le QR, touche "Retrait" puis "En espèces", saisit "3000", coche "J’ai 3 000 F en espèces sur moi." et touche "Continuer"
    Et qu'Awa touche "Envoyer à son téléphone"
    Alors Fatou voit "Retrait en espèces" s'ouvrir seul avec "Tu reçois en espèces" et "3 000 FCFA"
    Quand Fatou touche "Continuer" et saisit son PIN KOTIZ correct
    Et que le retrait est confirmé
    Alors Awa voit "Retrait fait. Donne 3 000 F." et "3 000 FCFA"
    Et Fatou voit "Ton retrait est fait." et "Awa te donne tes espèces. Compte-les."
    Quand Awa remet les espèces et que Fatou touche "J’ai reçu mes espèces"
    Alors Fatou voit "Tu as reçu tes espèces."
    Et Awa voit "Retrait terminé."
    Et le solde disponible de Fatou est de 12 400 FCFA moins <montant pris>

  @E-P5-S2 @nominal @agente
  Scénario: E-P5-S2 Choisir comment elle retire
    Étant donné que je suis sur "C’est bien elle ?"
    Quand je touche "Retrait"
    Alors une feuille s'ouvre avec "Comment elle retire ?"
    Et je vois "En espèces" et "Sur son Mobile Money" avec "Vers son numéro vérifié"

  @E-P5-S3 @nominal @agente
  Scénario: E-P5-S3 Déclarer avoir les espèces avant d'envoyer
    Quand je touche "En espèces"
    Alors je vois "Retrait en espèces", "Étape 1 sur 2", "Pour Fatou Koné" et "Elle reçoit"
    Et je vois "Ne donne pas encore les espèces."
    Quand je saisis "3000"
    Alors je vois la case "J’ai 3 000 F en espèces sur moi." non cochée
    Et "Continuer" est désactivé avec la raison "Coche si tu as les espèces."
    Quand je coche la case
    Alors "Continuer" est actif

  @E-P5-S4 @nominal @agente
  Scénario: E-P5-S4 Changer le montant décoche la case
    Étant donné que j'ai saisi "3000" et coché "J’ai 3 000 F en espèces sur moi."
    Quand je change le montant en "5000"
    Alors la case "J’ai 5 000 F en espèces sur moi." n'est plus cochée
    Et "Continuer" est désactivé

  @E-P5-S5 @interdit @agente
  Scénario: E-P5-S5 Aucun solde ni montant suggéré chez l'agente
    Quand je saisis le montant d'un retrait
    Alors je ne vois ni "Tout son solde", ni montant rapide, ni solde de Fatou

  @E-P5-S6 @nominal @agente
  Scénario: E-P5-S6 Relire le retrait avec elle
    Quand je touche "Continuer"
    Alors je vois "Vérifie le retrait avec elle", "Étape 2 sur 2", "Elle reçoit en espèces" et "3 000 FCFA" avec "Modifier"
    Et je vois le trajet "Son compte KOTIZ" vers "En espèces" et "De ta main"
    Et je vois "Cliente Fatou Koné" et "Frais" avec <frais>
    Et je vois "Elle confirme avec son PIN. Ne regarde pas son écran." et "Ne donne pas encore les espèces."
    Et le bouton principal est "Envoyer à son téléphone"

  @E-P5-S7 @nominal @agente
  Scénario: E-P5-S7 Attendre le PIN de Fatou sans regarder
    Quand je touche "Envoyer à son téléphone"
    Alors je vois "Fatou confirme avec son PIN." et "3 000 FCFA"
    Et je vois "Ne regarde pas son écran. Ne donne pas encore les espèces."
    Et je vois "Elle n’a pas internet ? Envoyer le code par SMS" et "Annuler la demande"

  @E-P5-S8 @nominal @client
  Scénario: E-P5-S8 Le récapitulatif du retrait avant le PIN
    Quand j'ouvre la demande de retrait d'Awa
    Alors je vois "Retrait en espèces", "Awa Traoré" et "Agente KOTIZ · AG-0142"
    Et je vois "Tu reçois en espèces" et "3 000 FCFA"
    Et je vois "Prends les espèces seulement quand c’est fait." sous le montant
    Et je vois le trajet "Mon solde" vers "En espèces" avec "De la main d’Awa"
    Et je vois "Frais" avec <frais>, "Pris sur ton solde" avec <montant pris> et "Demande n° 2110-0032"
    Et je vois "L’argent sort : tu confirmes avec ton PIN KOTIZ."
    Et le bouton principal est "Continuer" et le bouton texte est "Ce n’est pas le bon montant"
    Et je ne vois pas mon solde complet

  @E-P5-S9 @nominal @client
  Scénario: E-P5-S9 Le PIN avec l'avertissement à sa place
    Quand je touche "Continuer"
    Alors je vois "Entre ton PIN", "Retrait en espèces" et "3 000 F · avec Awa Traoré"
    Et je vois "Cache ton écran. Ne montre ton PIN à personne, même à l’agente."
    Et je vois le bouton texte "PIN oublié ?"

  @E-P5-S10 @interdit @client
  Plan du scénario: E-P5-S10 L'avertissement du PIN reste affiché dans tous les états de saisie
    Étant donné que je suis sur "Entre ton PIN" du retrait en espèces
    Quand l'écran est dans l'état "<état>"
    Alors je vois "Cache ton écran. Ne montre ton PIN à personne, même à l’agente."
    Et le message d'état "<message>" est sous les cases

    Exemples:
      | état             | message                   |
      | PIN incorrect    | PIN incorrect. Réessaie.  |
      | hors connexion   | Pas de connexion.         |
      | envoi            | Envoi…                    |

  @E-P5-S11 @interdit @client @agente
  Scénario: E-P5-S11 Le PIN n'existe que dans l'app de la cliente
    Quand Awa suit tout le retrait dans l'app agente
    Alors aucun écran de l'app agente n'a de champ PIN
    Et le PIN de Fatou n'est jamais affiché, gardé ni journalisé

  @E-P5-S12 @nominal @client
  Scénario: E-P5-S12 Retrait fait : prendre les espèces maintenant
    Quand le retrait est confirmé
    Alors je vois "Fait", "Ton retrait est fait." et "Awa te donne tes espèces. Compte-les."
    Et je vois "3 000 FCFA"
    Et je vois "Retrait · Fait" et "Espèces reçues · En attente" avec l'horloge et "Tu confirmes quand tu as compté."
    Et je vois "Avec Awa Traoré" et "Demande n° 2110-0032"
    Et le bouton principal est "J’ai reçu mes espèces" et le bouton texte "Je n’ai pas reçu mes espèces"
    Et TalkBack lit sur le bouton principal l'aide "Appuie quand tu as compté tes espèces."

  @E-P5-S13 @interdit @client
  Scénario: E-P5-S13 « J’ai reçu mes espèces » n'existe jamais avant « Fait »
    Quand le retrait est envoyé mais pas encore confirmé
    Alors je ne vois pas "J’ai reçu mes espèces"
    Et la remise ne s'écrit jamais "À confirmer"

  @E-P5-S14 @nominal @agente
  Scénario: E-P5-S14 L'agente donne les espèces seulement après le résultat
    Quand le retrait de Fatou est confirmé
    Alors je vois "Fait", "Retrait fait. Donne 3 000 F." puis "3 000 FCFA" en grand
    Et je vois "Elle les compte devant toi."
    Et je vois "Retrait · Fait" et "Espèces reçues · En attente" avec "Fatou confirme quand elle a compté."
    Et je ne vois aucun bouton principal
    Et je vois le bouton texte "Elle ne confirme pas ?"

  @E-P5-S15 @nominal @client @agente
  Scénario: E-P5-S15 « J’ai reçu mes espèces » clôt le retrait des deux côtés
    Étant donné que Fatou voit "Ton retrait est fait."
    Quand Fatou touche "J’ai reçu mes espèces"
    Alors Fatou voit "Envoi…" puis "Fait" et "Tu as reçu tes espèces."
    Et Fatou voit "Retrait · Fait" et "Espèces reçues · Fait" avec "Confirmé par toi"
    Et Fatou voit "Avec Awa Traoré", la référence et "Pris sur ton solde" avec <montant pris>
    Et Fatou voit "Terminé" et "Voir le reçu"
    Et Awa voit "Retrait terminé." avec "Espèces reçues · Fait" et "Confirmé par Fatou"

  @E-P5-S16 @interdit @backend
  Scénario: E-P5-S16 Confirmer deux fois la réception ne crée rien de plus
    Étant donné que Fatou a confirmé la réception du retrait n° 2110-0032
    Quand la confirmation est envoyée une seconde fois
    Alors la remise reste "reçues"
    Et aucun mouvement n'est créé

  @E-P5-S17 @erreur @client
  Scénario: E-P5-S17 L'envoi de « J’ai reçu mes espèces » échoue
    Étant donné que je vois "Ton retrait est fait."
    Quand je touche "J’ai reçu mes espèces" et que l'envoi échoue
    Alors je reste sur cet écran avec "Pas envoyé." et "Réessaie. Tes espèces restent en attente."
    Et "Espèces reçues" est toujours "En attente"

  @E-P5-S18 @interdit @a-confirmer @G01 @client
  Scénario: E-P5-S18 Une opération faite affiche toujours son montant réel
    Étant donné que le retrait n° 2110-0032 est fait et que Fatou a reçu ses espèces
    Quand Fatou voit "Tu as reçu tes espèces." puis le reçu
    Alors "Pris sur ton solde" affiche <montant pris> renvoyé par le serveur
    Et aucune ligne n'affiche "à confirmer"

  @E-P5-S19 @interdit @agente
  Scénario: E-P5-S19 L'agente ne peut pas déclarer les espèces remises
    Quand Awa suit un retrait en espèces de bout en bout
    Alors aucun écran de l'app agente n'a de bouton "Espèces remises"
    Et aucune action d'Awa ne clôt la remise

  @E-P5-S20 @nominal @client @raccord
  Scénario: E-P5-S20 Fermer le résultat garde la remise en attente
    Étant donné que je vois "Ton retrait est fait."
    Quand je ferme l'écran
    Alors je suis sur l'accueil
    Et le détail du retrait garde le bouton principal "J’ai reçu mes espèces"

  @E-P5-S21 @nominal @client
  Scénario: E-P5-S21 Le résultat passe seul de l'attente à « Fait »
    Étant donné que je vois "On vérifie ton retrait."
    Quand le retrait est confirmé
    Alors l'écran passe seul à "Ton retrait est fait."
    Et le changement est annoncé à TalkBack

  @E-P5-S22 @interdit @client
  Scénario: E-P5-S22 Aucun délai n'est annoncé
    Quand je vais de la demande de retrait au résultat
    Alors aucun écran n'annonce un délai, une durée de validité ni un nombre d'essais
```

---

## E-P6 — Retirer des espèces sans smartphone (deux codes)

Couvre E-63 sans app, E-57 (code du retrait, code de réception), E-64 sans app, E-59.

```gherkin
# language: fr
@E-P6 @agente @sans-smartphone @a-confirmer @G02
Fonctionnalité: Retirer des espèces pour une cliente sans smartphone
  Pour servir une cliente qui n'a pas l'app sans risque de double débit
  En tant qu'Awa, agente
  Je veux un code pour autoriser le retrait, et un autre code pour prouver la réception

  Contexte:
    Étant donné que je suis connectée à l'app agente
    Et que Fatou n'a pas activé son accès à l'app
    Et que les frais du retrait en espèces sont confirmés dans la configuration à <frais>
    Et que j'ai saisi un retrait de 3 000 F et coché "J’ai 3 000 F en espèces sur moi."

  @E-P6-S1 @nominal
  Scénario: E-P6-S1 Envoyer le code du retrait
    Quand j'arrive sur "Vérifie le retrait avec elle"
    Alors je vois "Elle reçoit un SMS avec un code." et "Ne donne pas encore les espèces."
    Et le bouton principal est "Envoyer le code par SMS"
    Quand je le touche
    Alors je vois "Code du retrait" et "Ne donne pas les espèces sans code."
    Et Fatou reçoit un SMS qui dit l'agente, le montant, les frais et le code du retrait

  @E-P6-S2 @nominal @backend
  Scénario: E-P6-S2 Le code du retrait autorise le retrait
    Étant donné que je suis sur "Code du retrait"
    Quand je saisis le <code> et touche "Valider le code"
    Alors le retrait est autorisé
    Et je vois le résultat financier du retrait

  @E-P6-S3 @nominal
  Scénario: E-P6-S3 Retrait fait sans app : la réception passe par un second code
    Quand le retrait est confirmé
    Alors je vois "Retrait fait. Donne 3 000 F.", "3 000 FCFA" et "Elle les compte devant toi."
    Et je vois "Espèces reçues · En attente" avec "Avec le code de réception"
    Et je vois "Quand elle a compté, envoie-lui le code de réception."
    Et le bouton principal est "Envoyer le code de réception"

  @E-P6-S4 @nominal @backend
  Scénario: E-P6-S4 Le code de réception clôt le retrait sans rien débiter
    Étant donné que j'ai remis les espèces et envoyé le code de réception
    Quand je saisis le <code> sur "Code de réception" et touche "Valider le code"
    Alors je vois "Retrait terminé." et "Espèces reçues · Fait" avec "Confirmé par Fatou"
    Et aucun nouveau débit n'est créé

  @E-P6-S5 @interdit @backend
  Scénario: E-P6-S5 Ni la déclaration de l'agente ni le silence ne prouvent la réception
    Étant donné que le retrait est fait et que la remise est en attente
    Quand je n'ai pas le code de réception
    Alors aucun écran ne me permet de clore la remise
    Et la remise reste "En attente"

  @E-P6-S6 @interdit @backend
  Scénario: E-P6-S6 Les deux codes ne sont pas interchangeables
    Quand je saisis le code du retrait sur "Code de réception"
    Alors le code est refusé avec "Code incorrect. Demande-lui de relire le SMS."
    Et la remise reste "En attente"

  @E-P6-S7 @erreur
  Scénario: E-P6-S7 SMS de réception non reçu
    Étant donné que je suis sur "Code de réception"
    Quand je touche "Elle n’a pas reçu le SMS"
    Alors je vois "Renvoyer le SMS", "Revenir" et "Contacter l’aide"

  @E-P6-S8 @erreur @backend
  Scénario: E-P6-S8 Code du retrait expiré avant l'exécution : aucun débit
    Étant donné que le code du retrait a expiré avant l'autorisation
    Alors je vois "Ce code n’est plus valable." et le bouton principal "Renvoyer le SMS"
    Et aucun débit n'a eu lieu
    Et un nouveau SMS porte un nouveau code
```

---

## E-P7 — Retrait en espèces : les imprévus

Couvre E-06 (refus avant le PIN, frais inconnus, annulée, montant changé, hors connexion), E-07 (bloqué), E-08 (en attente, échoué), E-10, C-14, E-63 (refus), E-64 (en attente, échoué, contestée, feuille « Elle ne confirme pas ? »), E-62 et E-63 hors connexion.

```gherkin
# language: fr
@E-P7
Fonctionnalité: Les imprévus du retrait en espèces
  Pour ne jamais donner ni prendre des espèces sur une supposition
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons que chaque refus, attente ou échec dise quoi faire des espèces

  Contexte:
    Étant donné que Fatou a l'accès à l'app activé
    Et que les frais du retrait en espèces sont confirmés dans la configuration à <frais>

  @E-P7-S1 @erreur @client
  Plan du scénario: E-P7-S1 Refus avant le PIN, raison dite à Fatou seule
    Étant donné que "<cause>"
    Quand j'ouvre la demande de retrait d'Awa
    Alors je vois "<message>"
    Et je ne vois pas "Continuer"
    Et le bouton principal est "Terminé"
    Et je vois le bouton texte "<geste>"

    Exemples:
      | cause                                         | message                                         | geste                  |
      | mon solde ne suffit pas                       | Ton solde ne suffit pas pour ce retrait.        | aucun                  |
      | le retrait dépasse mon niveau d’accès         | Ce retrait dépasse ce que ton compte permet.    | Vérifier mon identité  |
      | mon argent est dans mes épargnes              | Ton argent est dans tes épargnes.               | Remettre sur mon solde |

  @E-P7-S2 @nominal @raccord @client
  Scénario: E-P7-S2 « Remettre sur mon solde » ouvre Mes épargnes
    Étant donné que je vois "Ton argent est dans tes épargnes."
    Quand je touche "Remettre sur mon solde"
    Alors j'arrive sur "Mes épargnes"
    Et aucun retrait n'est enchaîné

  @E-P7-S3 @interdit @agente
  Scénario: E-P7-S3 L'agente ne voit jamais la raison d'un refus
    Étant donné que le retrait de Fatou est refusé avant l'autorisation
    Quand Awa est sur "Vérifie le retrait avec elle"
    Alors Awa voit "Ce retrait n’est pas possible pour cette cliente." et "Elle voit la raison sur son téléphone."
    Et Awa ne voit ni le solde, ni le niveau d'accès, ni les épargnes de Fatou
    Et le bouton principal d'Awa est "Revenir à sa fiche"

  @E-P7-S4 @erreur @agente @sans-smartphone @a-confirmer @G02
  Scénario: E-P7-S4 Sans app, la raison du refus part par SMS
    Étant donné que Fatou n'a pas l'accès à l'app et que son retrait est refusé
    Quand Awa est sur "Vérifie le retrait avec elle"
    Alors Awa voit "Ce retrait n’est pas possible pour cette cliente." et "Elle reçoit la raison par SMS."
    Et Fatou reçoit un SMS qui dit la raison et "Rien n’est sorti."

  @E-P7-S5 @interdit @backend
  Scénario: E-P7-S5 Un refus connu d'avance ne demande jamais le PIN
    Étant donné qu'une règle refuse le retrait avant l'autorisation
    Alors aucun écran du PIN n'est proposé
    Et aucune autorisation n'est enregistrée

  @E-P7-S6 @erreur @a-confirmer @G01 @client @agente @backend
  Scénario: E-P7-S6 Frais inconnus : retrait bloqué
    Étant donné que les frais du retrait en espèces ne sont pas connus dans la configuration
    Quand Fatou ouvre la demande de retrait
    Alors elle voit "On ne connaît pas encore les frais." et "Rien n’est sorti. Réessaie plus tard."
    Et "Continuer" est désactivé avec la raison "Les frais ne sont pas encore connus."
    Et Awa ne peut pas envoyer la demande, avec la raison "Les frais ne sont pas encore connus."
    Et le serveur refuse toute autorisation sans frais connus

  @E-P7-S7 @erreur @client @agente
  Scénario: E-P7-S7 Fatou refuse le retrait
    Quand Fatou touche "Ce n’est pas le bon montant"
    Alors Fatou voit "Refusé par toi", "Tu as refusé ce retrait." et "Rien n’est sorti."
    Et rien n'est pris sur son solde
    Et Awa voit "Refusée" et "Fatou n’a pas confirmé."

  @E-P7-S8 @erreur @client
  Scénario: E-P7-S8 L'agente annule avant le PIN
    Étant donné que je vois la demande de retrait
    Quand Awa annule la demande
    Alors je vois "Awa a annulé la demande." et "Rien n’est sorti."
    Et le bouton principal est "Terminé"

  @E-P7-S9 @erreur @client @backend
  Scénario: E-P7-S9 L'agente change le montant après l'envoi : nouvelle demande
    Étant donné que je vois la demande de retrait de 3 000 F
    Quand Awa envoie un autre montant
    Alors je vois "Le montant a changé." et "Vérifie à nouveau."
    Et l'ancienne demande ne peut plus être autorisée

  @E-P7-S10 @erreur @client
  Scénario: E-P7-S10 PIN bloqué : rien n'est sorti, rien n'est remis
    Quand je me trompe de PIN jusqu'au blocage
    Alors je vois "Ton PIN est bloqué", "Trop d’essais." et "Rien n’est sorti. Awa ne te donne rien."
    Et les cases et le pavé sont retirés
    Et le bouton principal est "Terminé" et le bouton texte "PIN oublié ?"
    Et aucun nombre d'essais ni durée n'est affiché

  @E-P7-S11 @erreur @interdit @client @agente @backend
  Scénario: E-P7-S11 Résultat inconnu : personne ne donne ni ne prend les espèces
    Quand le résultat du retrait n'est pas connu
    Alors Fatou voit "En attente", "On vérifie ton retrait.", "Ne prends pas encore les espèces." et "Ne refais pas le retrait."
    Et Fatou voit "Terminé" et le bouton texte "Signaler un problème"
    Et Awa voit "On vérifie le retrait." et "Ne donne pas encore les espèces."
    Et aucune nouvelle demande n'est créée pour ce retrait

  @E-P7-S12 @erreur @client @agente
  Scénario: E-P7-S12 Retrait pas fait : rien n'est remis
    Quand le retrait échoue de façon confirmée
    Alors Fatou voit "Échoué", "Ton retrait n’est pas fait.", "Rien n’a été pris sur ton solde." et "Awa ne te donne rien."
    Et Awa voit "Retrait pas fait." et "Ne donne rien."

  @E-P7-S13 @a-confirmer @G01 @client
  Scénario: E-P7-S13 Si le partenaire ne garantit pas l'échec, on vérifie le solde
    Étant donné que la configuration indique qu'un échec confirmé ne garantit pas que rien n'a été pris
    Quand le retrait échoue
    Alors je vois "En attente" et "On vérifie ton solde."
    Et je ne vois pas "Rien n’a été pris sur ton solde."

  @E-P7-S14 @erreur @client
  Scénario: E-P7-S14 Je n'ai pas reçu mes espèces
    Étant donné que je vois "Ton retrait est fait."
    Quand je touche "Je n’ai pas reçu mes espèces"
    Alors une feuille s'ouvre avec "Tu n’as pas reçu tes espèces ?", "Ne refais pas le retrait." et "L’assistance vérifie avec l’agente."
    Et je vois "Retrait de 3 000 F", "Awa Traoré" et la référence
    Et les boutons sont "Signaler un problème", "Revenir" et "Contacter l’aide"

  @E-P7-S15 @nominal @raccord @client @agente
  Scénario: E-P7-S15 Le signalement « Espèces non reçues » conteste la remise
    Étant donné que la feuille "Tu n’as pas reçu tes espèces ?" est ouverte
    Quand je touche "Signaler un problème" et envoie le signalement
    Alors le motif "Espèces non reçues" était présélectionné et le retrait repris sans ressaisie
    Et le détail du retrait affiche la remise "Contestée"
    Et Awa voit "Fatou dit ne pas avoir reçu les espèces." et "L’assistance va vérifier."
    Et aucun nouveau retrait n'est créé

  @E-P7-S16 @nominal @agente
  Scénario: E-P7-S16 Elle ne confirme pas : l'agente ne peut que demander de l'aide
    Étant donné que je vois "Retrait fait. Donne 3 000 F." avec la remise en attente
    Quand je touche "Elle ne confirme pas ?"
    Alors je vois "Elle confirme sur son téléphone quand elle a compté.", "Ne refais pas le retrait." et "L’assistance peut recueillir sa confirmation."
    Et je vois "Contacter l’aide"
    Et rien ne me permet de clore la remise

  @E-P7-S17 @erreur @agente
  Plan du scénario: E-P7-S17 Hors connexion pendant la préparation du retrait
    Étant donné que je suis sur "<écran>" sans connexion
    Alors je vois "Pas de connexion. Rien n’a été envoyé."
    Et le bouton principal est désactivé avec la raison "<raison>"
    Et je vois "Ne donne pas encore les espèces."

    Exemples:
      | écran                             | raison                            |
      | Combien elle retire en espèces ?  | Continuer demande la connexion.   |
      | Vérifie le retrait avec elle      | Envoyer demande la connexion.     |

  @E-P7-S18 @erreur @client
  Scénario: E-P7-S18 Hors connexion sur le récapitulatif du retrait
    Étant donné que je vois la demande de retrait sans connexion
    Alors je vois "Pas de connexion. Rien n’a été envoyé."
    Et le bouton principal est "Réessayer"
```

---

## E-P8 — Retrait sur mon Mobile Money préparé par une agente

Couvre E-61, E-65, E-66, E-67, E-56 et E-57 (Mobile Money), E-59 (Mobile Money) côté agente ; E-11, D-04 et D-05 depuis E-11 côté cliente.

```gherkin
# language: fr
@E-P8
Fonctionnalité: Retrait Mobile Money préparé par une agente
  Pour recevoir mon argent sur mon Mobile Money avec l'aide d'une agente
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons que le retrait aille vers mon numéro vérifié seulement, avec mon PIN, sans aucune espèce

  Contexte:
    Étant donné que Fatou a l'accès à l'app activé et le numéro vérifié 07 08 12 34 56
    Et que Wave et Orange Money sont disponibles pour ce numéro
    Et que les frais du retrait Wave sont confirmés dans la configuration à <frais>

  @E-P8-S1 @nominal @client @agente
  Scénario: E-P8-S1 Retrait Mobile Money préparé, de bout en bout
    Quand Awa touche "Retrait" puis "Sur son Mobile Money", choisit "Wave", saisit "5000" et touche "Envoyer à son téléphone"
    Alors Awa voit "Fatou confirme avec son PIN." et "Ne regarde pas son écran."
    Et Fatou voit "Retrait Mobile Money" avec "Préparé avec Awa Traoré · agente"
    Quand Fatou touche "Continuer" et saisit son PIN KOTIZ correct
    Et que Wave confirme le transfert
    Alors Fatou voit "Ton argent est sur ton Wave."
    Et Awa voit "Retrait fait.", "Wave a confirmé." et "Aucune espèce à donner."

  @E-P8-S2 @nominal @agente
  Scénario: E-P8-S2 Choisir l'opérateur vers son numéro vérifié
    Quand je touche "Sur son Mobile Money"
    Alors je vois "Sur quel Mobile Money ?", "Vers son numéro vérifié" et "07 •• •• •• 56"
    Et je vois les opérateurs disponibles pour ce numéro, avec leur logo
    Et aucun champ ne permet un autre numéro

  @E-P8-S3 @erreur @agente
  Scénario: E-P8-S3 Opérateur indisponible ou aucun opérateur
    Étant donné que Orange Money est indisponible
    Quand j'ouvre "Sur quel Mobile Money ?"
    Alors la ligne "Orange Money" est désactivée avec "Orange Money est indisponible pour l’instant."
    Quand aucun opérateur n'est disponible
    Alors la feuille "Comment elle retire ?" désactive "Sur son Mobile Money" avec "Mobile Money indisponible pour l’instant."

  @E-P8-S4 @nominal @interdit @agente
  Scénario: E-P8-S4 Saisir le montant sans voir le solde
    Quand je choisis "Wave"
    Alors je vois "Combien elle reçoit ?", "Elle reçoit" et "Sur son Wave. Tu ne vois pas son solde."
    Et je ne vois ni solde ni "Tout son solde"
    Quand le montant n'est pas possible pour cette cliente
    Alors je vois "Montant pas possible."

  @E-P8-S5 @nominal @agente
  Scénario: E-P8-S5 Relire le retrait Mobile Money
    Quand je continue avec 5 000 F
    Alors je vois "Vérifie le retrait Mobile Money", "Elle reçoit" et "5 000 FCFA" avec "Modifier"
    Et je vois "Vers son numéro" et "07 •• •• •• 56 · Wave"
    Et je vois "Frais" avec <frais>
    Et je vois "Elle confirme avec son PIN. Ne regarde pas son écran."
    Et le bouton principal est "Envoyer à son téléphone"

  @E-P8-S6 @nominal @interdit @client
  Scénario: E-P8-S6 La cliente voit qui a préparé, et son numéro non modifiable
    Quand j'ouvre la demande de retrait Mobile Money
    Alors je vois "Préparé avec Awa Traoré · agente"
    Et je vois "Tu reçois sur ton Wave" et "5 000 FCFA"
    Et je vois "Vers ton numéro" et "07 08 12 34 56 · Wave"
    Et je vois "Le numéro est le tien. On ne peut pas le changer."
    Et je vois "Frais", "Pris sur ton solde" et "Ton solde après" renvoyés par le serveur
    Et le bouton principal est "Continuer" et le bouton texte "Je ne veux pas ce retrait"

  @E-P8-S7 @erreur @client
  Plan du scénario: E-P8-S7 Le retrait préparé est bloqué avant le PIN
    Étant donné que "<cause>"
    Quand j'ouvre la demande de retrait Mobile Money
    Alors je vois "<message>"
    Et je ne peux pas saisir mon PIN

    Exemples:
      | cause                                  | message                                        |
      | les frais Wave ne sont pas connus      | On ne connaît pas encore les frais.            |
      | Wave est devenu indisponible           | Wave est indisponible pour l’instant.          |
      | mon solde ne suffit pas                | Ton solde ne suffit pas pour ce retrait.       |
      | le retrait dépasse mon niveau d’accès  | Ce retrait dépasse ce que ton compte permet.   |
      | mon argent est dans mes épargnes       | Ton argent est dans tes épargnes.              |

  @E-P8-S8 @nominal @raccord @client
  Scénario: E-P8-S8 Le PIN et le résultat du lot D, sans compteur d'étape
    Quand je touche "Continuer"
    Alors j'arrive sur "Entre ton PIN" du lot D sans "Étape 4 sur 4"
    Et je vois "Préparé avec : Awa Traoré"
    Quand le retrait est confirmé
    Alors je vois le résultat du lot D "Ton argent est sur ton Wave."

  @E-P8-S9 @interdit @client @agente
  Scénario: E-P8-S9 Aucune espèce ni confirmation de remise dans cette branche
    Quand le retrait Mobile Money préparé est fait
    Alors Fatou ne voit pas "J’ai reçu mes espèces"
    Et Awa ne voit ni "Donne", ni "Code de réception"
    Et les fonds d'Awa n'ont pas bougé

  @E-P8-S10 @erreur @client @agente
  Scénario: E-P8-S10 Fatou ne veut pas ce retrait
    Quand Fatou touche "Je ne veux pas ce retrait"
    Alors Fatou voit "Refusé par toi" et "Tu as refusé ce retrait."
    Et Awa voit "Refusée"

  @E-P8-S11 @nominal @agente @sans-smartphone @a-confirmer @G02
  Scénario: E-P8-S11 Sans app : code du retrait Mobile Money
    Étant donné que Fatou n'a pas l'accès à l'app
    Quand je touche "Envoyer le code par SMS" sur "Vérifie le retrait Mobile Money"
    Alors Fatou reçoit un SMS avec l'opérateur, son numéro, le montant, les frais et le code
    Quand je saisis le <code> sur "Code du retrait Mobile Money" et touche "Valider le code"
    Alors je vois le résultat du retrait Mobile Money

  @E-P8-S12 @erreur @agente
  Plan du scénario: E-P8-S12 Résultat du retrait Mobile Money côté agente
    Quand le retrait Mobile Money est "<statut>"
    Alors je vois "<titre>" et "<texte>"

    Exemples:
      | statut     | titre            | texte                              |
      | en attente | On vérifie.      | Wave n’a pas encore confirmé.      |
      | échoué     | Pas fait.        | Rien n’est sorti de son compte.    |
```

---

## E-P9 — Accepter, refuser ou retirer l'accompagnement d'une agente

Couvre E-68, E-56 et E-57 (accompagnement) côté agente ; E-12, E-14, E-15, E-16 (accompagnement), A · H01 (raccords) côté cliente.

```gherkin
# language: fr
@E-P9
Fonctionnalité: Accompagnement par une agente
  Pour être aidée par une agente sans lui donner accès à mon argent
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons un accord explicite, révocable, qui ne donne ni solde ni point

  Contexte:
    Étant donné que Fatou a l'accès à l'app activé
    Et qu'Awa ne l'accompagne pas encore

  @E-P9-S1 @nominal @agente
  Scénario: E-P9-S1 L'agente voit ce que l'accompagnement permet
    Quand je touche "Accompagnement" sur "C’est bien elle ?"
    Alors je vois "Accompagnement" et le statut "Pas demandé"
    Et je vois "Avec son accord, tu pourras :", "l’aider à créer une épargne ;" et "demander à voir le point d’une épargne."
    Et je vois "Tu ne verras jamais son solde ni son PIN."
    Et le bouton principal est "Envoyer la demande"

  @E-P9-S2 @nominal @agente
  Scénario: E-P9-S2 Envoyer la demande d'accompagnement
    Quand je touche "Envoyer la demande"
    Alors je vois "Fatou répond sur son téléphone."
    Et je vois "Elle n’a pas internet ? Envoyer le code par SMS" et "Annuler la demande"

  @E-P9-S3 @nominal @client
  Scénario: E-P9-S3 La cliente lit ce que l'agente peut et ne peut pas faire
    Quand j'ouvre la demande d'accompagnement d'Awa
    Alors je vois "Accompagnement", "Awa veut t’accompagner", "Awa Traoré" et "Agente KOTIZ · AG-0142"
    Et je vois "Avec ton accord, elle peut :", "t’aider à créer une épargne ;", "te demander de voir le point d’une épargne."
    Et je vois "Elle ne peut pas :", "voir ton solde ni tes opérations ;", "voir un point sans ton accord ;", "connaître ton PIN."
    Et je vois "Tu peux arrêter quand tu veux, dans Profil."
    Et le bouton principal est "Accepter" et le secondaire "Refuser"

  @E-P9-S4 @nominal @client @agente
  Scénario: E-P9-S4 Accepter l'accompagnement
    Quand Fatou touche "Accepter"
    Alors Fatou voit la page d'Awa avec "Awa t’accompagne."
    Et Awa voit le statut "Accepté" et les lignes "Point de ses épargnes"

  @E-P9-S5 @erreur @client @agente
  Scénario: E-P9-S5 Refuser l'accompagnement
    Quand Fatou touche "Refuser"
    Alors Fatou est sur l'accueil avec "Tu as refusé. Awa ne peut pas t’accompagner."
    Et Awa voit le statut "Refusé" et "Elle a refusé. Redemande seulement si elle te le dit."
    Et Awa n'a pas de bouton principal et voit le bouton texte "Elle a changé d’avis ? Redemander"

  @E-P9-S6 @nominal @agente
  Scénario: E-P9-S6 Redemander après un refus crée une nouvelle demande
    Étant donné que Fatou a refusé l'accompagnement
    Quand je touche "Elle a changé d’avis ? Redemander"
    Alors une nouvelle demande d'accompagnement est envoyée
    Et Fatou peut encore la refuser

  @E-P9-S7 @interdit @backend
  Scénario: E-P9-S7 Le silence et le refus n'accordent rien, sans relance automatique
    Étant donné qu'une demande d'accompagnement attend
    Quand Fatou ne répond pas ou refuse
    Alors Awa n'a aucun droit sur Fatou
    Et aucune relance n'est envoyée automatiquement
    Et Awa voit "Aucune relance automatique. Elle répond quand elle veut." tant que la demande attend

  @E-P9-S8 @interdit @backend
  Scénario: E-P9-S8 L'accompagnement ne donne ni solde, ni opération, ni point
    Étant donné qu'Awa accompagne Fatou
    Quand Awa demande le solde, les opérations ou le point d'une épargne sans permission
    Alors le serveur refuse

  @E-P9-S9 @nominal @backend
  Scénario: E-P9-S9 L'accompagnement n'est pas exclusif et ne bloque aucune opération
    Étant donné qu'Awa accompagne Fatou
    Quand Fatou dépose ou retire chez une autre agente
    Alors l'opération est possible comme pour toute cliente
    Et un dépôt ou un retrait ne crée jamais d'accompagnement

  @E-P9-S10 @nominal @client
  Scénario: E-P9-S10 Mon accompagnement liste les agentes et les demandes
    Étant donné que Binta veut m'accompagner et qu'Awa m'accompagne avec la permission de voir 1 épargne
    Quand j'ouvre "Mon accompagnement"
    Alors je vois "À répondre" avec "Binta Koffi veut t’accompagner" et "En attente de ta réponse"
    Et je vois "T’accompagnent" avec "Awa Traoré" et "Voit le point de 1 épargne"
    Et je vois "Une agente ne voit jamais ton solde."

  @E-P9-S11 @nominal @client
  Scénario: E-P9-S11 Mon accompagnement vide
    Étant donné qu'aucune agente ne m'accompagne et qu'aucune demande n'attend
    Quand j'ouvre "Mon accompagnement"
    Alors je vois "Aucune agente ne t’accompagne." et "Une agente peut te le proposer."
    Et je ne vois aucun bouton pour ajouter une agente

  @E-P9-S12 @nominal @client
  Scénario: E-P9-S12 La page de mon agente
    Étant donné qu'Awa m'accompagne et voit le point d'École Awa
    Quand j'ouvre la page d'Awa
    Alors je vois "Awa Traoré", "Agente KOTIZ · AG-0142" et "T’accompagne depuis le" suivi de la date
    Et je vois "Elle peut voir le point de" avec "École Awa" et "Retirer"
    Et je vois "Elle ne voit pas ton solde ni tes opérations."
    Et je vois le bouton texte "Retirer Awa de mon accompagnement"

  @E-P9-S13 @nominal @client @backend
  Scénario: E-P9-S13 Retirer l'agente de mon accompagnement
    Étant donné que je suis sur la page d'Awa
    Quand je touche "Retirer Awa de mon accompagnement"
    Alors un dialogue s'ouvre avec "Retirer Awa de ton accompagnement ?", "Elle ne pourra plus t’aider ni voir tes points.", "Ton argent et tes opérations ne changent pas." et "Les points déjà envoyés restent envoyés."
    Quand je touche "Retirer Awa"
    Alors je suis sur "Mon accompagnement" sans Awa
    Et toutes les permissions de point d'Awa sont retirées
    Et aucune opération financière n'est annulée

  @E-P9-S14 @nominal @client @backend
  Scénario: E-P9-S14 Retirer l'agente annule sa création d'épargne en attente
    Étant donné qu'une création d'épargne préparée par Awa attend ma confirmation
    Quand j'ouvre le dialogue de retrait d'Awa
    Alors je vois aussi "Sa demande de création sera annulée."
    Quand je touche "Retirer Awa"
    Alors la demande de création est annulée et son code ne marche plus

  @E-P9-S15 @erreur @client
  Scénario: E-P9-S15 Le retrait de l'accompagnement échoue ou n'a pas de connexion
    Quand le retrait d'Awa n'aboutit pas
    Alors je vois "Pas retiré." et "Réessaie. Rien n’a changé."
    Et les droits d'Awa sont inchangés
    Quand je n'ai pas de connexion
    Alors les boutons "Retirer" sont désactivés avec une seule raison "Retirer demande la connexion."

  @E-P9-S16 @erreur @client
  Scénario: E-P9-S16 Une demande retirée par l'agente n'existe plus
    Étant donné qu'Awa a annulé sa demande d'accompagnement
    Quand j'ouvre cette demande
    Alors je vois "Cette demande n’existe plus."

  @E-P9-S17 @nominal @agente @sans-smartphone @a-confirmer @G02
  Scénario: E-P9-S17 Sans app : accepter par le code d'accompagnement
    Étant donné que Fatou n'a pas l'accès à l'app
    Quand je touche "Envoyer le code par SMS" sur "Accompagnement"
    Et que je saisis le <code> sur "Code d’accompagnement" et touche "Valider le code"
    Alors je vois le statut "Accepté"
    Et Fatou n'a donné aucun accès à son solde

  @E-P9-S18 @nominal @raccord @client
  Scénario: E-P9-S18 L'accueil rappelle une demande en attente
    Étant donné que j'ai fermé la demande d'accompagnement d'Awa sans répondre
    Quand j'ouvre l'accueil
    Alors je vois "Awa attend ta réponse ›" à la place de la ligne d'identité
    Quand je touche cette ligne
    Alors j'arrive sur "Awa veut t’accompagner"

  @E-P9-S19 @nominal @raccord @client
  Scénario: E-P9-S19 L'entrée « Mon accompagnement » est dans Profil
    Quand je touche "Mon accompagnement" dans Profil
    Alors j'arrive sur "Mon accompagnement"
    Mais tant que Profil n'est pas livré, je vois "Bientôt ici"
```

---

## E-P10 — Laisser une agente voir le point d'une épargne

Couvre E-69 et E-56 (point) côté agente ; E-13, E-15 (permissions), E-16 (point) côté cliente.

```gherkin
# language: fr
@E-P10
Fonctionnalité: Permission de voir le point d'une épargne
  Pour qu'une agente m'aide sans voir tout mon argent
  En tant que Fatou, cliente, avec Awa, agente
  Nous voulons une permission accordée épargne par épargne, révocable, jamais ajoutée seule

  Contexte:
    Étant donné que Fatou a l'accès à l'app activé et les épargnes actives "École Awa" et "Boutique"

  @E-P10-S1 @erreur @agente
  Scénario: E-P10-S1 Sans accompagnement, pas de demande de point
    Étant donné qu'Awa n'accompagne pas Fatou
    Quand Awa ouvre "Point de ses épargnes"
    Alors Awa voit "Elle doit d’abord accepter ton accompagnement." et la ligne "Accompagnement"
    Et Awa ne voit le nom d'aucune épargne

  @E-P10-S2 @nominal @agente
  Scénario: E-P10-S2 Demander à voir un point
    Étant donné qu'Awa accompagne Fatou
    Quand Awa touche "Demander à voir un point"
    Alors Awa voit "Fatou choisit les épargnes."
    Et Awa voit "Elle n’a pas internet ? Envoyer le code par SMS" et "Annuler la demande"

  @E-P10-S3 @nominal @client
  Scénario: E-P10-S3 Aucune épargne cochée au départ
    Quand j'ouvre la demande de point d'Awa
    Alors je vois "Point d’une épargne", "Awa veut voir le point de tes épargnes"
    Et je vois "Elle verra les versements, le total et la cible. Jamais ton solde ni tes autres opérations."
    Et je vois "École Awa" et "Boutique" sans montant et non cochées
    Et je vois "Une nouvelle épargne ne sera pas ajoutée seule."
    Et le bouton principal "Autoriser" est désactivé avec la raison "Coche au moins une épargne."
    Et le bouton secondaire est "Refuser"

  @E-P10-S4 @nominal @client
  Plan du scénario: E-P10-S4 Le bouton dit combien d'épargnes j'autorise
    Quand je coche "<cases>"
    Alors le bouton principal est "<libellé>" et il est actif

    Exemples:
      | cases                 | libellé                     |
      | École Awa             | Autoriser pour 1 épargne    |
      | École Awa et Boutique | Autoriser pour 2 épargnes   |

  @E-P10-S5 @nominal @client @agente
  Scénario: E-P10-S5 Autoriser une seule épargne
    Quand Fatou coche "École Awa" et touche "Autoriser pour 1 épargne"
    Alors Fatou voit la page d'Awa avec "Elle peut voir le point de" et "École Awa"
    Et Awa voit "Tu peux voir" avec "École Awa" et "Voir et envoyer son point"
    Et Awa ne voit pas "Boutique"

  @E-P10-S6 @interdit @backend
  Scénario: E-P10-S6 Une nouvelle épargne n'est jamais ajoutée seule
    Étant donné qu'Awa voit le point d'École Awa
    Quand Fatou crée l'épargne "Moto"
    Alors Awa ne peut pas voir le point de "Moto"

  @E-P10-S7 @nominal @client
  Scénario: E-P10-S7 Une épargne déjà autorisée reste cochée
    Étant donné qu'Awa voit déjà le point d'École Awa
    Quand j'ouvre une nouvelle demande de point d'Awa
    Alors "École Awa" est cochée, désactivée, avec "Déjà autorisée"
    Et les autorisations s'ajoutent sans rien retirer

  @E-P10-S8 @erreur @client
  Scénario: E-P10-S8 Aucune épargne active
    Étant donné que je n'ai aucune épargne active
    Quand j'ouvre la demande de point d'Awa
    Alors je vois "Tu n’as pas d’épargne."
    Et le bouton principal est "Fermer", sans aucune raison sous le bouton

  @E-P10-S9 @erreur @client
  Scénario: E-P10-S9 Refuser la demande de point
    Quand je touche "Refuser"
    Alors je suis sur l'accueil avec un message de refus
    Et Awa ne peut voir aucun point

  @E-P10-S10 @nominal @client @agente
  Scénario: E-P10-S10 Retirer la permission d'une épargne garde l'accompagnement
    Étant donné qu'Awa voit le point d'École Awa
    Quand Fatou touche "Retirer" sur "École Awa"
    Alors un dialogue s'ouvre avec "Awa ne verra plus le point d’École Awa ?", "Elle t’accompagne toujours." et "Les points déjà envoyés restent envoyés."
    Quand Fatou touche "Retirer"
    Alors "École Awa" disparaît de la page d'Awa
    Et Awa accompagne toujours Fatou
    Et Awa ne voit plus "École Awa" dans "Tu peux voir"

  @E-P10-S11 @interdit @agente
  Scénario: E-P10-S11 L'agente ne voit jamais le nom d'une épargne non autorisée
    Étant donné qu'Awa voit seulement le point d'École Awa
    Quand Awa ouvre "Point de ses épargnes"
    Alors Awa voit "École Awa" et "Tu ne vois que les épargnes qu’elle choisit."
    Et Awa ne voit jamais "Boutique"

  @E-P10-S12 @nominal @agente
  Scénario: E-P10-S12 Une demande de point en attente
    Étant donné qu'une demande de point attend la réponse de Fatou
    Quand Awa ouvre "Point de ses épargnes"
    Alors Awa voit "Une demande attend sa réponse."

  @E-P10-S13 @nominal @agente @sans-smartphone @a-confirmer @G02
  Scénario: E-P10-S13 Sans app : code des noms, choix de l'épargne, puis code du point
    Étant donné que Fatou n'a pas l'accès à l'app et qu'Awa l'accompagne
    Quand Awa touche "Demander à voir un point"
    Alors Awa passe par "Code pour voir les noms"
    Et Awa voit "Choisis l’épargne avec elle" et "Noms seulement, pour cette demande. Aucun montant."
    Quand Awa choisit "École Awa" et valide le "Code du point"
    Alors Awa voit "Tu peux voir" avec "École Awa"
```

---

## E-P11 — Mon carnet : voir, garder et partager le point d'une épargne

Couvre B · B07 (raccord), E-17, E-18, E-19.

```gherkin
# language: fr
@E-P11 @client
Fonctionnalité: Mon carnet et mon point
  Pour avoir mon signé-signé sur mon téléphone et le montrer à qui je veux
  En tant que Fatou, cliente
  Je veux voir les versements confirmés d'une épargne et partager un point daté

  Contexte:
    Étant donné que je suis connectée
    Et que mon épargne "École Awa" a 45 000 F sur une cible de 100 000 F

  @E-P11-S1 @nominal @raccord
  Scénario: E-P11-S1 Ouvrir mon carnet depuis le détail de l'épargne
    Étant donné que je suis sur le détail d'"École Awa"
    Quand je touche "Mon carnet"
    Alors je vois "Carnet d’École Awa" et "Ton signé-signé, sur ton téléphone."
    Et je vois "45 000 F" sur "100 000 F" avec la barre de progression

  @E-P11-S2 @nominal
  Plan du scénario: E-P11-S2 Chaque versement confirmé porte ses accords réels
    Étant donné qu'École Awa a reçu "<mouvement>"
    Quand j'ouvre "Carnet d’École Awa"
    Alors je vois la ligne "<titre>" avec "<montant>" et la note "<note>"

    Exemples:
      | mouvement                     | titre                          | montant   | note                                       |
      | un dépôt en espèces avec Awa  | Dépôt en espèces · Avec Awa    | +5 000 F  | Confirmé par toi · Espèces reçues par Awa  |
      | un dépôt Wave                 | Dépôt Wave                     | +2 000 F  | Validé sur ton Wave                        |
      | une mise de côté du solde     | Depuis ton solde               | +3 000 F  | Confirmé par toi                           |
      | un retour au solde            | Vers ton solde                 | −1 000 F  | Avec ton PIN                               |

  @E-P11-S3 @interdit
  Scénario: E-P11-S3 Le carnet ne montre que le confirmé, sans signature inventée
    Étant donné qu'un dépôt vers École Awa est en attente
    Quand j'ouvre "Carnet d’École Awa"
    Alors ce dépôt n'est pas une ligne du carnet
    Et je vois "1 dépôt en attente n’est pas encore dans ton carnet."
    Et aucune ligne n'a de signature dessinée ni de validation d'agente pour un versement fait sans agente

  @E-P11-S4 @nominal @raccord
  Scénario: E-P11-S4 Une ligne du carnet ouvre le détail de l'opération
    Quand je touche la ligne "Dépôt en espèces · Avec Awa"
    Alors j'arrive sur le détail de cette opération

  @E-P11-S5 @nominal
  Scénario: E-P11-S5 Le carnet suit le masquage
    Étant donné que les montants sont masqués
    Quand j'ouvre "Carnet d’École Awa"
    Alors les montants affichent "•••" et TalkBack lit "Montant masqué"
    Quand je touche l'œil
    Alors les montants s'affichent partout où le réglage s'applique

  @E-P11-S6 @nominal
  Plan du scénario: E-P11-S6 États du carnet
    Étant donné que "<cas>"
    Quand j'ouvre "Carnet d’École Awa"
    Alors je vois "<attendu>"

    Exemples:
      | cas                                 | attendu                                   |
      | l’épargne n’a aucun versement       | Pas encore de versement.                  |
      | le carnet met du temps à charger    | Chargement du carnet                      |
      | je n’ai pas de connexion            | Mis à jour à <HH:MM> · hors connexion     |
      | l’épargne a été fermée le 19 oct.   | Fermée le 19 oct.                         |

  @E-P11-S7 @nominal @interdit
  Scénario: E-P11-S7 Mon point du jour est un relevé daté, toujours en clair
    Étant donné que les montants sont masqués
    Quand je touche "Mon point du jour"
    Alors je vois "Préparation de ton point" puis "Mon point"
    Et je vois "KOTIZ", "Relevé daté", "Mon point · École Awa" et "Au <date> à <HH:MM>"
    Et je vois "Total épargné", "Cible" et "Versements confirmés", y compris les retours au solde
    Et je vois "Ce relevé montre tes versements confirmés à cette date." et "Fatou Koné"
    Et les montants sont affichés en clair
    Et le bouton principal est "Partager"

  @E-P11-S8 @erreur
  Scénario: E-P11-S8 Le point ne s'affiche pas
    Quand la préparation du point échoue
    Alors je vois "Ton point ne s’affiche pas."

  @E-P11-S9 @nominal @G04
  Scénario: E-P11-S9 Recevoir un résumé par SMS sur mon numéro
    Étant donné que je suis sur "Mon point"
    Quand je touche "Partager"
    Alors une feuille s'ouvre avec "Partager mon point"
    Et je vois "Recevoir un résumé par SMS" avec "Sur ton numéro 07 08 12 34 56"
    Et je vois "Partager le relevé" avec "Tu choisis l’application et la personne."
    Et je vois "KOTIZ ne sait pas si la personne l’a reçu."
    Quand je touche "Recevoir un résumé par SMS"
    Alors je vois "Résumé envoyé sur ton numéro."

  @E-P11-S10 @erreur @backend
  Scénario: E-P11-S10 Envoi non abouti : renvoyer le même point
    Quand l'envoi du résumé n'aboutit pas
    Alors je vois "Envoi non abouti." et "Le même point sera renvoyé."
    Et le bouton principal est "Renvoyer ce point"
    Quand je touche "Renvoyer ce point"
    Alors c'est le même point daté qui est renvoyé
    Et aucun mouvement n'est créé

  @E-P11-S11 @interdit
  Scénario: E-P11-S11 Partager le relevé n'affiche aucun statut
    Quand je touche "Partager le relevé"
    Alors la feuille de partage du téléphone s'ouvre
    Et KOTIZ n'affiche jamais "Envoyé" ni "Reçu" pour ce partage
    Et KOTIZ ne me demande aucun destinataire

  @E-P11-S12 @erreur
  Scénario: E-P11-S12 Hors connexion, le partage demande la connexion
    Étant donné que je n'ai pas de connexion
    Quand j'ouvre "Partager mon point"
    Alors "Recevoir un résumé par SMS" est désactivé avec la raison "Partager demande la connexion."

  @E-P11-S13 @nominal @backend
  Scénario: E-P11-S13 Un point plus tard est un nouveau point daté
    Étant donné que j'ai vu mon point au 21 oct. à 10:45
    Quand je touche "Mon point du jour" plus tard
    Alors un nouveau point avec une nouvelle date est préparé
    Et le premier point n'a pas changé
```

---

## E-P12 — Avec une cliente sans smartphone : point d'une épargne et création d'épargne

Couvre E-69 et E-70 (point), E-53 (ligne de création), E-71, E-72, E-57 (code de création), E-59 (création) côté agente ; E-15 (création en attente) côté cliente.

```gherkin
# language: fr
@E-P12 @agente
Fonctionnalité: Point et création d'épargne pour une cliente sans smartphone
  Pour servir une cliente qui n'a pas l'app sans voir plus que ce qu'elle autorise
  En tant qu'Awa, agente
  Je veux montrer un point autorisé, l'envoyer sur son numéro, et créer une épargne avec son code

  Contexte:
    Étant donné que je suis connectée à l'app agente
    Et que Fatou n'a pas activé son accès à l'app
    Et que j'accompagne Fatou

  @E-P12-S1 @nominal @interdit
  Scénario: E-P12-S1 Montrer le point d'une épargne autorisée
    Étant donné que Fatou m'autorise à voir le point d'École Awa
    Quand je touche "École Awa" dans "Point de ses épargnes"
    Alors je vois "Point d’École Awa", "Point · École Awa" et "Au <date> à <HH:MM>"
    Et je vois "Total épargné", "Cible" et les versements confirmés, retours au solde compris
    Et je vois "Envoyé à :" avec "07 •• •• •• 56" et "(son numéro vérifié)"
    Et le bouton principal est "Envoyer le point à Fatou par SMS"
    Et je ne vois aucun champ destinataire ni aucun partage vers une autre application

  @E-P12-S2 @nominal @G04
  Scénario: E-P12-S2 Envoyer le point par SMS vers son numéro vérifié
    Quand je touche "Envoyer le point à Fatou par SMS"
    Alors je vois "Point envoyé par SMS."
    Et le SMS part seulement vers le numéro vérifié de Fatou

  @E-P12-S3 @erreur @backend
  Scénario: E-P12-S3 Envoi non abouti : même point, permission revérifiée
    Quand l'envoi du point n'aboutit pas
    Alors je vois "Envoi non abouti." et "Le même point sera renvoyé."
    Quand je touche "Renvoyer ce point"
    Alors la permission est vérifiée de nouveau
    Et le même point daté est renvoyé

  @E-P12-S4 @interdit @backend
  Scénario: E-P12-S4 Permission retirée : plus rien n'est affiché ni envoyé
    Étant donné que Fatou a retiré ma permission pour École Awa
    Quand j'ouvre ou j'envoie le point d'École Awa
    Alors je vois "Fatou a retiré ton accès à ce point."
    Et aucun montant n'est affiché
    Et l'envoi est désactivé avec la raison "Tu n’as plus accès à ce point."

  @E-P12-S5 @erreur
  Scénario: E-P12-S5 Le point demande internet
    Étant donné que je n'ai pas de connexion
    Quand j'ouvre le point d'École Awa
    Alors je vois "Cet écran a besoin d’internet. Réessaie plus tard."

  @E-P12-S6 @interdit
  Scénario: E-P12-S6 La création n'existe que pour une cliente sans accès à l'app
    Étant donné qu'une autre cliente a l'accès à l'app activé
    Quand j'ouvre "C’est bien elle ?" pour cette cliente
    Alors je ne vois pas "Créer une épargne pour elle"

  @E-P12-S7 @nominal
  Scénario: E-P12-S7 Créer une épargne pour elle en quatre étapes
    Quand je touche "Créer une épargne pour elle"
    Alors je vois "Quel projet ?", "Pour Fatou Koné" et "Étape 1 sur 5"
    Quand je choisis "Véhicule", continue, saisis "300000", continue, choisis "Pas de date pour l’instant" et continue
    Alors je vois "Comment elle l’appelle ?" et "Étape 4 sur 5" avec un nom prérempli
    Quand je saisis "Moto" et touche "Continuer"
    Alors je vois "Vérifie l’épargne avec elle", "Étape 5 sur 5", "Moto", "0 F pour l’instant" et "Pas de date"
    Et je vois "Aucun argent ne bouge." et "Elle confirme avec un code SMS."
    Et le bouton principal est "Envoyer le code par SMS"

  @E-P12-S8 @erreur @interdit
  Scénario: E-P12-S8 Limite d'épargnes : sans nombre ni nom
    Étant donné que Fatou a déjà le nombre maximum d'épargnes actives
    Quand je touche "Créer une épargne pour elle"
    Alors je vois "Elle ne peut pas créer d’autre épargne pour l’instant."
    Et aucun nombre, aucun nom ni aucun montant d'épargne n'est affiché
    Et aucune fermeture n'est proposée

  @E-P12-S9 @nominal @sans-smartphone @a-confirmer @G02 @backend
  Scénario: E-P12-S9 Le code de création crée l'épargne, sans argent
    Étant donné que j'ai envoyé le code de création de "Moto"
    Quand je saisis le <code> sur "Code de création" et touche "Valider le code"
    Alors je vois "Épargne créée.", "Moto, pour Fatou Koné", "Objectif" et "Pour l’instant" avec "0 F"
    Et je vois "Aucun argent n’a bougé." et "Pour l’alimenter : un dépôt."
    Et aucun dépôt n'est enchaîné

  @E-P12-S10 @erreur
  Plan du scénario: E-P12-S10 Création en vérification ou pas faite
    Quand la création de "Moto" est "<statut>"
    Alors je vois "<titre>" et "<texte>"

    Exemples:
      | statut     | titre         | texte                                               |
      | en attente | On vérifie.   | La création de Moto n’est pas encore confirmée.     |
      | échouée    | Pas créée.    | Aucune épargne n’a été créée.                       |

  @E-P12-S11 @erreur @backend
  Scénario: E-P12-S11 L'accompagnement retiré annule la création en attente
    Étant donné que j'attends le code de création de "Moto"
    Quand Fatou retire mon accompagnement
    Alors je vois "Demande annulée." et "Fatou a retiré ton accompagnement."
    Et le bouton principal est "Revenir à sa fiche"
    Et le code de création ne marche plus

  @E-P12-S12 @nominal @client
  Plan du scénario: E-P12-S12 La cliente qui active son app voit la création assistée
    Étant donné que Fatou active son app pendant que la création de "Moto" est "<statut>"
    Quand Fatou ouvre la page d'Awa
    Alors elle voit "<texte>" sans action

    Exemples:
      | statut                                  | texte                                                       |
      | en attente de sa confirmation par SMS   | Création de Moto en attente de ta confirmation par SMS.     |
      | confirmée, au résultat pas encore connu | On vérifie la création de Moto.                             |
```

---

## E-P13 — Retrouver une opération en espèces

Couvre C-11, C-12, C-13, C-14 (contenu espèces).

```gherkin
# language: fr
@E-P13 @client @raccord
Fonctionnalité: Mes opérations en espèces
  Pour retrouver ce qui s'est passé avec une agente
  En tant que Fatou, cliente
  Je veux voir chaque opération en espèces avec son agente, son statut réel et ses accords

  Contexte:
    Étant donné que je suis connectée
    Et que j'ai fait un dépôt en espèces avec Awa, un retrait en espèces avec Awa et un dépôt annulé

  @E-P13-S1 @nominal
  Scénario: E-P13-S1 Les lignes des opérations en espèces
    Quand j'ouvre "Opérations"
    Alors je vois "Dépôt en espèces" avec "Avec Awa · Sur ton solde" et "+ 5 000 F"
    Et je vois "Retrait en espèces" avec "Avec Awa" et "− 3 000 F"

  @E-P13-S2 @nominal
  Scénario: E-P13-S2 Un retrait dont la remise attend porte « Espèces en attente »
    Étant donné que je n'ai pas encore confirmé la réception du retrait
    Quand j'ouvre "Opérations"
    Alors la ligne "Retrait en espèces" porte la note "Espèces en attente"
    Et jamais "Espèces à confirmer"

  @E-P13-S3 @nominal
  Scénario: E-P13-S3 Une demande annulée reste visible sans signe
    Quand j'ouvre "Opérations"
    Alors la demande annulée affiche son montant sans signe, une croix et "Annulé"

  @E-P13-S4 @nominal
  Scénario: E-P13-S4 Un dépôt vers une épargne tient sur une ligne
    Étant donné que j'ai déposé en espèces vers École Awa
    Quand j'ouvre "Opérations"
    Alors je vois une seule ligne "Dépôt vers École Awa" avec "En espèces avec Awa"

  @E-P13-S5 @nominal
  Scénario: E-P13-S5 Le détail d'un dépôt en espèces porte ses accords
    Quand j'ouvre le dépôt en espèces fait
    Alors je vois le trajet "Tes espèces" vers "Mon solde"
    Et je vois "Avec" avec "Awa Traoré" et "AG-0142", "Demande n°", "Confirmé par toi" avec l'heure, "Espèces reçues par Awa" avec l'heure et la référence
    Et je vois "Frais" avec <frais>
    Et je vois "Voir le reçu" et le bouton texte "Signaler un problème"

  @E-P13-S6 @nominal
  Scénario: E-P13-S6 Le détail d'un retrait dont la remise attend
    Quand j'ouvre le retrait en espèces non confirmé
    Alors je vois "Retrait · Fait" et "Espèces reçues · En attente" avec l'horloge
    Et je vois "Tu confirmes quand tu as compté." sous le montant
    Et le bouton principal est "J’ai reçu mes espèces"
    Et "Signaler un problème" est un bouton texte

  @E-P13-S7 @nominal
  Scénario: E-P13-S7 Le détail d'un dépôt annulé
    Quand j'ouvre le dépôt annulé
    Alors je vois "Awa a annulé le dépôt."
    Et je ne vois aucune référence d'opération
    Et je vois le bouton texte "Signaler un problème"

  @E-P13-S8 @nominal @interdit
  Scénario: E-P13-S8 Le reçu d'une opération en espèces faite, avec les montants réels
    Quand j'ouvre le reçu du retrait en espèces fait
    Alors je vois le montant, la date, "Awa Traoré", la référence et le statut
    Et je vois "Espèces reçues" avec "confirmé par toi" ou "en attente"
    Et "Pris sur ton solde" affiche <montant pris> et "Frais" affiche <frais>
    Et aucune ligne n'affiche "à confirmer"
    Et une opération non faite n'a jamais de reçu

  @E-P13-S9 @nominal
  Plan du scénario: E-P13-S9 Les filtres incluent les opérations en espèces
    Quand je choisis le filtre "<filtre>"
    Alors je vois "<ligne>"

    Exemples:
      | filtre   | ligne                 |
      | Dépôts   | Dépôt en espèces      |
      | Retraits | Retrait en espèces    |
      | Épargnes | Dépôt vers École Awa  |

  @E-P13-S10 @nominal
  Plan du scénario: E-P13-S10 Le signalement présélectionne le motif espèces
    Quand je signale un problème sur "<opération>"
    Alors le motif "<motif>" est présélectionné en tête des motifs
    Et l'opération est reprise sans ressaisie

    Exemples:
      | opération           | motif                    |
      | un dépôt annulé     | J’ai remis les espèces   |
      | un retrait en espèces | Espèces non reçues     |

  @E-P13-S11 @nominal
  Scénario: E-P13-S11 Les opérations en espèces suivent le masquage
    Étant donné que les montants sont masqués
    Quand j'ouvre "Opérations", le détail ou le reçu d'une opération en espèces
    Alors les montants affichent "•••"
```

---

## Index des scénarios

| Parcours                                                               | IDs                  | Nombre  |
| ---------------------------------------------------------------------- | -------------------- | ------- |
| E-P1 Dépôt en espèces sur le solde (avec Q01, reprise, frais inconnus) | E-P1-S1 à E-P1-S24   | 24      |
| E-P2 Dépôt en espèces dans une épargne                                 | E-P2-S1 à E-P2-S13   | 13      |
| E-P3 Dépôt sans smartphone (code du dépôt, accord de noms)             | E-P3-S1 à E-P3-S12   | 12      |
| E-P4 Imprévus du dépôt                                                 | E-P4-S1 à E-P4-S25   | 25      |
| E-P5 Retrait en espèces                                                | E-P5-S1 à E-P5-S22   | 22      |
| E-P6 Retrait sans smartphone (deux codes)                              | E-P6-S1 à E-P6-S8    | 8       |
| E-P7 Imprévus du retrait                                               | E-P7-S1 à E-P7-S18   | 18      |
| E-P8 Retrait Mobile Money préparé                                      | E-P8-S1 à E-P8-S12   | 12      |
| E-P9 Accompagnement                                                    | E-P9-S1 à E-P9-S19   | 19      |
| E-P10 Permission de point                                              | E-P10-S1 à E-P10-S13 | 13      |
| E-P11 Carnet et relevé                                                 | E-P11-S1 à E-P11-S13 | 13      |
| E-P12 Point et création sans smartphone                                | E-P12-S1 à E-P12-S12 | 12      |
| E-P13 Opérations en espèces                                            | E-P13-S1 à E-P13-S11 | 11      |
| **Total**                                                              |                      | **202** |

**Couverture des écrans**

| Écran | Scénarios principaux                                                                                  |
| ----- | ----------------------------------------------------------------------------------------------------- |
| E-01  | E-P1-S1, S3, S20, S24 ; E-P2-S1, S2, S10 ; E-P4-S3, S4, S21, S25                                      |
| E-02  | E-P2-S1 à S3, S9, S11                                                                                 |
| E-03  | E-P1-S5, S7, S9, S23 ; E-P2-S4 ; E-P4-S6                                                              |
| E-04  | E-P1-S7, S8 ; E-P2-S5, S6, S8 ; E-P4-S3, S14, S18, S19, S24 ; E-P7-S7                                 |
| E-05  | E-P4-S15, S16                                                                                         |
| E-06  | E-P5-S1, S8 ; E-P7-S1, S2, S6 à S9, S18                                                               |
| E-07  | E-P5-S9 à S11 ; E-P7-S10                                                                              |
| E-08  | E-P5-S12, S13, S17, S20, S21 ; E-P7-S11 à S13                                                         |
| E-09  | E-P5-S15, S16, S18                                                                                    |
| E-10  | E-P7-S14, S15                                                                                         |
| E-11  | E-P8-S1, S6 à S8, S10                                                                                 |
| E-12  | E-P9-S3 à S5, S16, S18                                                                                |
| E-13  | E-P10-S3 à S9                                                                                         |
| E-14  | E-P9-S10, S11, S19                                                                                    |
| E-15  | E-P9-S4, S12, S15 ; E-P10-S5, S10 ; E-P12-S12                                                         |
| E-16  | E-P9-S13, S14 ; E-P10-S10                                                                             |
| E-17  | E-P11-S1 à S6                                                                                         |
| E-18  | E-P11-S7, S8, S10, S13                                                                                |
| E-19  | E-P11-S9, S11, S12                                                                                    |
| E-51  | E-P1-S10, S12, S21                                                                                    |
| E-52  | E-P3-S1 à S3                                                                                          |
| E-53  | E-P1-S11, S12 ; E-P3-S1 ; E-P4-S11 ; E-P12-S6                                                         |
| E-54  | E-P1-S13 ; E-P4-S1, S2, S4                                                                            |
| E-55  | E-P1-S14, S15, S20 ; E-P3-S4 à S7                                                                     |
| E-56  | E-P1-S16 ; E-P4-S3, S22, S23 ; E-P5-S7 ; E-P8-S1 ; E-P9-S2 ; E-P10-S2                                 |
| E-57  | E-P3-S8 à S11 ; E-P4-S8 à S10 ; E-P6-S1, S2, S4, S6 à S8 ; E-P8-S11 ; E-P9-S17 ; E-P10-S13 ; E-P12-S9 |
| E-58  | E-P1-S17 à S19, S23 ; E-P3-S9 ; E-P4-S4, S5, S20                                                      |
| E-59  | E-P1-S19, S21 ; E-P4-S18, S19 ; E-P5-S15 ; E-P6-S4 ; E-P8-S1, S12 ; E-P12-S9, S10                     |
| E-60  | E-P4-S11 à S13                                                                                        |
| E-61  | E-P5-S2 ; E-P8-S3                                                                                     |
| E-62  | E-P5-S3 à S5 ; E-P7-S17                                                                               |
| E-63  | E-P5-S6 ; E-P6-S1 ; E-P7-S3, S4, S17                                                                  |
| E-64  | E-P5-S14, S19 ; E-P6-S3, S5 ; E-P7-S11, S12, S15, S16                                                 |
| E-65  | E-P8-S2, S3                                                                                           |
| E-66  | E-P8-S4                                                                                               |
| E-67  | E-P8-S5, S11                                                                                          |
| E-68  | E-P9-S1, S4 à S7, S17                                                                                 |
| E-69  | E-P10-S1, S2, S5, S11 à S13 ; E-P12-S1                                                                |
| E-70  | E-P12-S1 à S5                                                                                         |
| E-71  | E-P12-S7, S8                                                                                          |
| E-72  | E-P12-S7, S11                                                                                         |

**Interdits couverts**

- Aucun PIN au dépôt ; PIN seulement dans l'app cliente, jamais affiché ni gardé ; aucun champ PIN dans l'app agente ; un code n'est jamais un PIN : E-P1-S4, E-P5-S10, E-P5-S11, E-P3-S11.
- L'agente ne voit ni solde, ni épargne, ni opération, ni raison d'un refus, ni montant de ses fonds ; noms seulement sous accord : E-P1-S11, E-P2-S12, E-P4-S1, E-P5-S5, E-P7-S3, E-P8-S4, E-P10-S11.
- La confirmation seule ne déplace rien ; une confirmation expirée ne lance rien ; aucune espèce sans code : E-P1-S6, E-P4-S7, E-P3-S9.
- Aucune remise avant le résultat confirmé ; « J’ai reçu mes espèces » jamais avant « Fait » ; aucun « Espèces remises » ; la déclaration de l'agente et le silence ne prouvent rien : E-P5-S13, E-P5-S19, E-P6-S5, E-P7-S11.
- Un code ne vaut que pour sa demande et sa finalité ; les deux codes du retrait ne sont pas interchangeables ; le code de réception ne débite rien : E-P3-S10, E-P6-S4, E-P6-S6.
- Frais inconnus = autorisation bloquée ; une opération faite affiche son montant réel : E-P1-S20, E-P7-S6, E-P8-S7, E-P5-S18, E-P13-S8.
- Aucun doublon (lancement, confirmation de réception, reprise) ; résultat inconnu sans nouvelle opération : E-P1-S19, E-P1-S23, E-P5-S16, E-P4-S19, E-P7-S11.
- Aucun « Réessayer le dépôt », jamais « Remboursé » ; reprise de mise de côté sans nouveau dépôt : E-P4-S24, E-P2-S7.
- Accompagnement : ni accord déduit du silence, ni relance automatique, ni accès au solde ; permission de point par épargne, jamais ajoutée seule ; retrait de l'accompagnement = retrait des permissions et de la création en attente : E-P9-S7, E-P9-S8, E-P10-S6, E-P9-S13, E-P9-S14.
- Relevé toujours en clair ; partage sans statut ; envoi agente vers le numéro vérifié seulement : E-P11-S7, E-P11-S11, E-P12-S1, E-P12-S4.
- Création assistée seulement sans accès à l'app, sans argent, limite sans nombre : E-P12-S6, E-P12-S8, E-P12-S9.
