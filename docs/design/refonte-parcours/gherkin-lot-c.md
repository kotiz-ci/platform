# Gherkin — Refonte des parcours, lot C : dépôt, affectation, opérations et reçus

Date : 20 octobre 2026. Statut : dérivé du lot C validé par le PO et sa conjointe le 20 octobre 2026 (après critique, 15 corrections appliquées, et test sans remarque).
Sources : [handoff-lot-c.md](handoff-lot-c.md) (textes exacts, règles, critères d'acceptation), [ux-spec-lot-c.md](ux-spec-lot-c.md), [screens-lot-c.md](screens-lot-c.md), [critique-lot-c.md](critique-lot-c.md), [prototype](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF) (page « Lot C — Dépôt et affectation », version 22 `1792494666-2bc8`). Rattachement aux issues : [issues-lot-c.md](issues-lot-c.md).

## Mode d'emploi

- Langue Gherkin : français (`# language: fr`). Mots-clés : Fonctionnalité, Contexte, Scénario, Plan du scénario, Exemples, Étant donné, Quand, Alors, Et, Mais.
- **IDs stables** : `C-Pn-Sm` (lot C, parcours n, scénario m), repris en tag `@C-Pn-Sm`. Un ID n'est jamais réutilisé ; un scénario retiré garde son ID barré dans ce fichier. Les variantes du prototype (C-P1′ agente, C-P1″ en attente, C-P1‴ frais inconnus, C-P4′ solde baissé, C-P4″ épargne fermée) sont rangées dans leur parcours de base, sans prime dans l'ID.
- **Tags** : `@nominal`, `@erreur`, `@interdit` (règle qui ne doit jamais être violée), `@a-confirmer` (dépend d'un paramètre non tranché), `@G01` `@G02` `@G03` (gate concerné), `@client` (variant d'app), `@backend` (vérifiable au niveau API), `@raccord` (écran d'un autre lot touché par le lot C), `@a-dessiner` (comportement de la spec sans état dessiné dans le canvas : le texte exact viendra des maquettes ; trois cas : C-P1-S36 refus par l'opérateur, C-P2-S4 Mobile Money indisponible dans « D'où vient l'argent ? », C-P3-S11 épargne fermée pendant une mise de côté).
- **Paramètres non tranchés** entre chevrons, lus dans la configuration du test : `<frais>` (frais confirmés du dépôt Mobile Money), `<montant débité>` (montant + `<frais>`), `<délai de confirmation>`, `<motifs de signalement>`, `<taille de page>`, `<HH:MM>`.
- **Frais du dépôt Mobile Money : non confirmés (G01).** Tant qu'ils sont inconnus, l'autorisation reste bloquée (C-P1-S19). Les scénarios qui vont au bout d'un dépôt posent dans leur `Contexte` que les frais sont confirmés dans la configuration, sans aucune valeur. **Aucun frais du prototype n'est une règle**, et aucune valeur de frais n'est écrite ici.
- **Données d'exemple fictives** (jamais des règles) : Fatou Koné, numéro vérifié 07 08 12 34 56, solde 12 400 FCFA, épargnes École Awa (45 000 F sur 100 000 F), Boutique (8 000 F sur 50 000 F), Tabaski (objectif atteint), Loyer, Moto (fermée), opérateurs Wave et Orange Money, références « KTZ-2610-… », dossiers « 2610-… », montants rapides 500 / 1 000 / 2 000.
- **Aucun PIN KOTIZ dans le lot C** (dépôt, mise de côté, reprise) : le récapitulatif se confirme par son bouton.
- Utilisation : `/implement-ticket` ou `/implement-spec` reprend les scénarios de l'issue visée (table de [issues-lot-c.md](issues-lot-c.md)) **avant** le code ; chaque scénario devient un test d'acceptation à la frontière la plus haute possible (écran pour `@client`, API pour `@backend`).

---

## C-P1 — Déposer sur mon solde par Mobile Money

Couvre C-00, C-17 (variante agente), C-01 à C-05, les variantes « en attente » et « frais inconnus », et les raccords A · H01 et A · E08.

```gherkin
# language: fr
@client @C-P1
Fonctionnalité: Déposer sur mon solde par Mobile Money
  Pour avoir de l'argent sur KOTIZ
  En tant que Fatou, cliente
  Je veux déposer depuis mon Mobile Money vérifié, en sachant combien part et si c'est fait

  Contexte:
    Étant donné que je suis connectée
    Et que mon numéro vérifié est le 07 08 12 34 56
    Et que mon solde disponible est de 12 400 FCFA
    Et que Wave et Orange Money sont disponibles
    Et que les frais du dépôt Wave sont confirmés dans la configuration à <frais>

  @C-P1-S1 @nominal
  Scénario: C-P1-S1 Déposer sur mon solde de bout en bout
    Étant donné que je suis sur l'accueil
    Quand je touche "Déposer"
    Et que je touche "Par Mobile Money"
    Et que je touche "Wave"
    Et que je saisis "5000"
    Et que je touche "Continuer"
    Et que je touche "Déposer 5 000 F"
    Alors je vois "Valide <montant débité> sur ton Wave"
    Quand je valide le dépôt dans l'application Wave
    Et que le partenaire confirme le crédit
    Alors je vois le statut "Fait"
    Et je vois "Ton argent est sur ton solde."
    Et je vois le montant "5 000 FCFA"
    Quand je touche "Terminé"
    Alors je suis sur l'accueil
    Et mon solde disponible est de 17 400 FCFA
    Et la ligne "Dernier dépôt" affiche "5 000 F" avec le statut "Fait"

  @C-P1-S2 @nominal
  Scénario: C-P1-S2 « Déposer » ouvre la feuille « Comment tu veux déposer ? »
    Étant donné que je suis sur l'accueil
    Quand je touche "Déposer"
    Alors une feuille s'ouvre avec le titre "Comment tu veux déposer ?"
    Et je vois les lignes "Par Mobile Money" et "Auprès d'une agente", dans cet ordre
    Et la feuille n'a pas de bouton principal
    Et la feuille n'affiche aucun montant

  @C-P1-S3 @nominal
  Plan du scénario: C-P1-S3 Fermer la feuille ramène à l'écran d'origine
    Étant donné que j'ai ouvert la feuille "Comment tu veux déposer ?" depuis "<écran>"
    Quand je ferme la feuille avec "Fermer" ou le retour Android
    Alors je suis sur "<écran>"
    Et rien n'a été envoyé

    Exemples:
      | écran        |
      | l'accueil    |
      | Compte créé  |

  @C-P1-S4 @nominal @raccord
  Scénario: C-P1-S4 « Faire mon premier dépôt » ouvre la même feuille
    Étant donné que mon compte vient d'être créé et que je suis sur "Compte créé"
    Quand je touche "Faire mon premier dépôt"
    Alors une feuille s'ouvre avec le titre "Comment tu veux déposer ?"

  @C-P1-S5 @erreur @a-confirmer @G01
  Scénario: C-P1-S5 Aucun opérateur disponible
    Étant donné qu'aucun opérateur Mobile Money n'est disponible
    Quand j'ouvre la feuille "Comment tu veux déposer ?"
    Alors la ligne "Par Mobile Money" est désactivée avec "Mobile Money indisponible pour l'instant."
    Et la ligne "Auprès d'une agente" reste active

  @C-P1-S6 @nominal
  Scénario: C-P1-S6 Déposer auprès d'une agente : explication, puis Mon QR
    Étant donné que la feuille "Comment tu veux déposer ?" est ouverte
    Quand je touche "Auprès d'une agente"
    Alors je vois l'en-tête "Déposer auprès d'une agente"
    Et je vois "Montre Mon QR à une agente"
    Et je vois "1" "L'agente scanne ton QR.", "2" "Tu vérifies le montant dans KOTIZ.", "3" "Tu donnes les espèces."
    Et je vois "Rien ne bouge avant ta confirmation."
    Quand je touche "Afficher Mon QR"
    Alors je suis sur "Mon QR"
    Quand je reviens en arrière jusqu'à "Déposer auprès d'une agente" puis que je touche le retour
    Alors la feuille "Comment tu veux déposer ?" est ouverte

  @C-P1-S7 @interdit
  Scénario: C-P1-S7 L'explication du dépôt en espèces ne dit jamais que c'est fait
    Quand j'ouvre "Montre Mon QR à une agente"
    Alors l'écran n'affiche aucun montant, aucun statut "Fait" et aucune liste d'agentes
    Et aucune opération n'est créée
    Et mon solde disponible est toujours de 12 400 FCFA

  @C-P1-S8 @nominal
  Plan du scénario: C-P1-S8 L'indicateur d'étape suit le dépôt
    Étant donné que je suis en train de déposer par Mobile Money
    Quand j'arrive sur l'écran "<écran>"
    Alors l'en-tête affiche "<étape>"

    Exemples:
      | écran                       | étape         |
      | Avec quoi tu déposes ?      | Étape 1 sur 4 |
      | Combien tu déposes ?        | Étape 2 sur 4 |
      | Vérifie ton dépôt           | Étape 3 sur 4 |
      | Valide <montant débité> sur ton Wave | Étape 4 sur 4 |

  @C-P1-S9 @nominal
  Scénario: C-P1-S9 Choisir l'opérateur dans une liste, sans bouton Continuer
    Quand j'ouvre "Avec quoi tu déposes ?" depuis "Par Mobile Money"
    Alors je vois "Vers : Mon solde"
    Et chaque opérateur disponible est une ligne avec son logo officiel, son nom et un chevron
    Et l'écran n'a ni bouton radio ni bouton "Continuer"
    Quand je touche "Wave"
    Alors je suis sur "Combien tu déposes ?"
    Et je vois "Depuis : Wave"

  @C-P1-S10 @interdit
  Scénario: C-P1-S10 Le dépôt part toujours du numéro vérifié, non modifiable
    Quand je vais de "Avec quoi tu déposes ?" à "Vérifie ton dépôt"
    Alors je vois "Depuis ton numéro 07 08 12 34 56" sous la liste des opérateurs
    Et le récapitulatif affiche "Depuis ton numéro" et "07 08 12 34 56 · Wave"
    Et aucun écran du dépôt n'a de champ, de bouton ni de lien pour un autre numéro

  @C-P1-S11 @nominal @a-confirmer @G01
  Scénario: C-P1-S11 Un seul opérateur reste une liste
    Étant donné que seul Wave est disponible
    Quand j'ouvre "Avec quoi tu déposes ?"
    Alors je vois la ligne "Wave" et le numéro vérifié
    Et l'écran ne passe pas tout seul à "Combien tu déposes ?"

  @C-P1-S12 @erreur @a-confirmer @G01
  Scénario: C-P1-S12 Aucun opérateur sur l'écran de choix
    Étant donné qu'aucun opérateur Mobile Money n'est disponible
    Quand j'ouvre "Avec quoi tu déposes ?"
    Alors je vois "Le dépôt Mobile Money n'est pas possible pour l'instant."
    Et je vois le lien "Déposer auprès d'une agente"
    Quand je touche "Déposer auprès d'une agente"
    Alors je vois "Montre Mon QR à une agente"

  @C-P1-S13 @erreur
  Scénario: C-P1-S13 Choix de l'opérateur hors connexion
    Étant donné que je n'ai pas de connexion
    Et que la liste des opérateurs a été chargée à <HH:MM>
    Quand j'ouvre "Avec quoi tu déposes ?"
    Alors je vois "Mis à jour à <HH:MM> · hors connexion"
    Et les opérateurs sont désactivés, sans chevron, logos non recolorés
    Et je vois "Déposer demande la connexion. Réessaie quand tu captes."

  @C-P1-S14 @erreur
  Plan du scénario: C-P1-S14 Le montant du dépôt est requis et plus grand que 0
    Étant donné que je suis sur "Combien tu déposes ?"
    Quand je saisis "<saisie>"
    Alors je vois "<aide>"
    Et le bouton "Continuer" est <état>

    Exemples:
      | saisie | aide                                   | état      |
      |        | Écris un montant.                      | désactivé |
      | 0      | Le montant doit être plus grand que 0. | désactivé |
      | 5000   |                                        | actif     |

  @C-P1-S15 @nominal
  Scénario: C-P1-S15 Un montant rapide remplace la saisie, une saisie libre le désélectionne
    Étant donné que je suis sur "Combien tu déposes ?"
    Quand je touche le montant rapide "1 000"
    Alors le champ affiche "1 000"
    Et le montant rapide "1 000" est sélectionné
    Quand je remplace le montant par "1500"
    Alors aucun montant rapide n'est sélectionné

  @C-P1-S16 @erreur @a-confirmer @G01
  Plan du scénario: C-P1-S16 Montant au-delà de ce que le compte permet
    Étant donné que mon identité est "<identité>"
    Et que le montant saisi dépasse ce que mon niveau d'accès permet
    Quand je suis sur "Combien tu déposes ?"
    Alors je vois "Ce montant dépasse ce que ton compte permet pour l'instant."
    Et je vois "<suite>"
    Et le bouton "Continuer" est désactivé
    Et mon montant est gardé
    Et aucune limite chiffrée n'est affichée

    Exemples:
      | identité          | suite                              |
      | à vérifier        | Vérifier mon identité              |
      | en vérification   | Ton identité est en vérification.  |

  @C-P1-S17 @nominal
  Scénario: C-P1-S17 Revenir en arrière garde la saisie
    Étant donné que j'ai choisi "Wave" et saisi "5000"
    Et que je suis sur "Vérifie ton dépôt"
    Quand je touche "Modifier"
    Alors je suis sur "Combien tu déposes ?" avec "5 000"
    Quand je touche le retour
    Alors je suis sur "Avec quoi tu déposes ?"

  @C-P1-S18 @nominal
  Scénario: C-P1-S18 Le récapitulatif dit combien part, d'où et vers où
    Étant donné que j'ai choisi "Wave" et saisi "5000"
    Quand j'arrive sur "Vérifie ton dépôt"
    Alors je vois "Tu déposes" et "5 000 FCFA"
    Et je vois "Pris sur ton Wave : <montant débité>" juste sous le montant
    Et je vois "Depuis ton numéro", "07 08 12 34 56 · Wave", puis "Vers", "Mon solde"
    Et je vois les lignes "Frais" "<frais>" et "Arrive sur ton solde" "5 000 F"
    Et je vois "Tu vas valider sur ton téléphone."
    Et je vois "KOTIZ ne te demande jamais ton code Wave."
    Et le bouton principal est "Déposer 5 000 F"

  @C-P1-S19 @interdit @G01
  Scénario: C-P1-S19 Frais inconnus : l'autorisation reste bloquée
    Étant donné que les frais du dépôt Wave ne sont pas connus
    Quand j'arrive sur "Vérifie ton dépôt"
    Alors je vois "Les frais ne sont pas encore connus." et "Le dépôt n'est pas possible pour l'instant."
    Et le bouton "Déposer 5 000 F" est désactivé avec "Déposer est bloqué : frais inconnus."
    Et je ne vois ni "Pris sur ton Wave", ni ligne "Frais", ni "Arrive sur ton solde"
    Et aucune demande n'est envoyée à Wave

  @C-P1-S20 @interdit
  Scénario: C-P1-S20 Aucun frais n'est inventé
    Quand je parcours les écrans du dépôt, des opérations et du reçu
    Alors aucun frais n'est affiché s'il n'est pas confirmé dans la configuration
    Et aucun écran n'affiche le mot "fictif" ni de frais en dur
    Et aucun minimum, plafond ou délai n'est annoncé

  @C-P1-S21 @interdit
  Scénario: C-P1-S21 Ni code Mobile Money ni PIN KOTIZ pour déposer
    Quand je vais au bout d'un dépôt Mobile Money
    Alors aucun écran KOTIZ ne demande le code ou le PIN de Wave
    Et aucun écran ne demande le PIN KOTIZ

  @C-P1-S22 @erreur @a-confirmer @G01 @G03
  Scénario: C-P1-S22 Refus connu d'avance
    Étant donné qu'une règle du partenaire interdit déjà ce dépôt
    Quand j'arrive sur "Vérifie ton dépôt"
    Alors je vois "Ce dépôt n'est pas possible pour l'instant." et "Rien n'a été envoyé."
    Et je vois le lien "Contacter l'aide"
    Et le bouton "Déposer 5 000 F" est désactivé avec "Déposer est bloqué : ce dépôt est refusé."
    Et aucune valeur chiffrée n'est affichée

  @C-P1-S23 @erreur
  Scénario: C-P1-S23 Opérateur devenu indisponible avant l'envoi
    Étant donné que Wave devient indisponible pendant que je suis sur "Vérifie ton dépôt"
    Alors je vois "Wave n'est pas disponible pour l'instant." et "Ton montant est gardé."
    Et le bouton principal est "Choisir un autre moyen"
    Quand je touche "Choisir un autre moyen"
    Alors je suis sur "Avec quoi tu déposes ?" et mon montant est gardé

  @C-P1-S24 @interdit
  Scénario: C-P1-S24 Un seul envoi, même en appuyant deux fois
    Étant donné que je suis sur "Vérifie ton dépôt"
    Quand je touche deux fois "Déposer 5 000 F"
    Alors le bouton affiche "Envoi…" et "Modifier" disparaît
    Et une seule demande de dépôt est créée

  @C-P1-S25 @erreur
  Scénario: C-P1-S25 Hors connexion au moment d'envoyer
    Étant donné que je n'ai pas de connexion
    Quand je touche "Déposer 5 000 F"
    Alors je vois "Pas de connexion." et "Rien n'a été envoyé."
    Et le bouton principal devient "Réessayer"
    Et aucune demande n'est créée

  @C-P1-S26 @nominal @a-confirmer @G01
  Scénario: C-P1-S26 Valider chez l'opérateur
    Étant donné que j'ai touché "Déposer 5 000 F"
    Alors je vois "Valide <montant débité> sur ton Wave" avec le logo Wave
    Et l'en-tête n'a pas de retour
    Et je vois les étapes "Demande envoyée à Wave" "Envoyée", "Ta validation sur Wave" "En attente", "Arrivée sur ton solde" "Pas encore"
    Et je vois "5 000 F arrivent sur ton solde."
    Et je vois "Valide dans Wave, puis reviens ici."
    Et je vois la référence de la demande
    Et le bouton principal est "Ouvrir Wave"
    Et je vois le bouton texte "Le dépôt n'arrive pas ?"

  @C-P1-S27 @interdit
  Scénario: C-P1-S27 L'attente chez l'opérateur ne ressemble jamais à un succès
    Quand je suis sur l'écran de validation chez l'opérateur
    Alors aucune étape n'affiche le mot "Fait"
    Et l'écran n'a pas de bouton "J'ai validé"
    Et aucune illustration de succès n'est affichée

  @C-P1-S28 @nominal
  Scénario: C-P1-S28 Validée, le dépôt arrive
    Étant donné que j'ai validé le dépôt dans Wave
    Quand je reviens dans KOTIZ
    Alors l'écran se met à jour sans action de ma part
    Et je vois "Ton dépôt arrive."
    Et l'étape "Ta validation sur Wave" affiche "Validée" et l'étape "Arrivée sur ton solde" "En attente"
    Et je vois le bouton texte "Voir dans Opérations"
    Quand le partenaire confirme le crédit
    Alors le résultat du dépôt s'affiche

  @C-P1-S29 @nominal @a-confirmer @G01 @G03
  Scénario: C-P1-S29 « Le dépôt n'arrive pas ? »
    Étant donné que je suis sur l'écran de validation chez l'opérateur
    Quand je touche "Le dépôt n'arrive pas ?"
    Alors une feuille s'ouvre avec "Vérifie que ton téléphone capte.", "Ouvre ton application Wave." et "Ne refais pas le dépôt."
    Et je vois "Contacter l'aide" et "Revenir"
    Et aucune nouvelle demande n'est créée

  @C-P1-S30 @nominal
  Plan du scénario: C-P1-S30 Reprendre après être sorti de KOTIZ
    Étant donné que j'ai envoyé une demande de dépôt
    Et qu'Android a fermé KOTIZ pendant que j'étais dans Wave
    Et que la demande est "<statut connu>"
    Quand je rouvre KOTIZ
    Alors je vois "<écran>"

    Exemples:
      | statut connu       | écran                                         |
      | en attente de validation | l'écran de validation de la même demande |
      | faite              | le résultat "Fait" de la même demande          |
      | en attente         | le résultat "En attente" de la même demande    |

  @C-P1-S31 @erreur @a-confirmer
  Scénario: C-P1-S31 La confirmation tarde : « On vérifie ton dépôt. »
    Étant donné que la demande est validée chez l'opérateur
    Et qu'aucune confirmation n'arrive avant <délai de confirmation>
    Alors je vois le statut "En attente"
    Et je vois "On vérifie ton dépôt."
    Et je vois "Ne refais pas l'opération." et "Tu le retrouves dans Opérations."
    Et je vois "Contacter l'aide"
    Et l'écran n'a pas de bouton "Réessayer"

  @C-P1-S32 @nominal
  Scénario: C-P1-S32 Résultat fait : détails et suites
    Étant donné que mon dépôt de 5 000 F vers mon solde est confirmé
    Alors l'écran de résultat est plein écran avec seulement "Fermer" en haut
    Et je vois le statut "Fait", "Ton argent est sur ton solde." et "5 000 FCFA"
    Et je vois "Depuis" "Wave" "07 08 12 34 56", "Vers" "Mon solde" et la référence
    Et le bouton principal est "Terminé"
    Et je vois le bouton texte "Voir le reçu"
    Et aucune illustration de célébration n'est affichée

  @C-P1-S33 @nominal
  Scénario: C-P1-S33 Premier dépôt sans épargne
    Étant donné que je n'ai aucune épargne active
    Quand mon premier dépôt vers mon solde est confirmé
    Alors je vois le bouton texte "Créer une épargne"
    Et aucun argent n'est mis dans une épargne automatiquement

  @C-P1-S34 @nominal
  Scénario: C-P1-S34 Dépôt en attente
    Étant donné que le partenaire n'a pas encore confirmé mon dépôt de 2 000 F
    Quand le résultat s'affiche
    Alors je vois le statut "En attente" et "Ton dépôt est en attente."
    Et je vois les étapes "Envoyée", "Validée", puis "Arrivée sur ton solde" "En attente"
    Et je vois "Ne refais pas l'opération." et "Tu le retrouves dans Opérations."
    Et je ne vois ni "Voir le reçu" ni "Réessayer"
    Quand je touche "Terminé"
    Alors mon solde disponible est toujours de 12 400 FCFA
    Et la ligne "Dernier dépôt" affiche "2 000 F" avec le statut "En attente"

  @C-P1-S35 @erreur
  Scénario: C-P1-S35 Annulé chez l'opérateur
    Étant donné que j'ai annulé le paiement dans Wave
    Quand le résultat s'affiche
    Alors je vois le statut "Échoué", "Ton dépôt n'est pas fait." et "Tu as annulé sur Wave."
    Et je ne vois pas "Rien n'a été pris sur ton Wave." tant que le partenaire ne le garantit pas
    Et le bouton principal est "Réessayer"
    Quand je touche "Réessayer"
    Alors je suis sur "Vérifie ton dépôt" relu
    Et une nouvelle validation chez l'opérateur sera demandée

  @C-P1-S36 @erreur @a-confirmer @a-dessiner @G01
  Scénario: C-P1-S36 Refusé par l'opérateur
    Étant donné que Wave a refusé le dépôt
    Quand le résultat s'affiche
    Alors je vois le statut "Échoué", "Ton dépôt n'est pas fait." et "Wave a refusé le dépôt."
    Et la raison de l'opérateur s'affiche seulement si elle est fournie
    Et le bouton principal est "Réessayer"

  @C-P1-S37 @erreur
  Scénario: C-P1-S37 Échec technique confirmé
    Étant donné que le dépôt a échoué de façon confirmée
    Quand le résultat s'affiche
    Alors je vois le statut "Échoué", "Ton dépôt n'a pas marché." et "Un problème technique l'a arrêté."
    Et le bouton principal est "Réessayer"
    Et je vois les boutons texte "Ton Wave a été débité ? Signale-le" et "Terminé"
    Quand je touche "Ton Wave a été débité ? Signale-le"
    Alors je suis sur "Signaler un problème" pour cette opération

  @C-P1-S38 @interdit
  Plan du scénario: C-P1-S38 Le retour depuis un résultat ne ramène jamais à la saisie
    Étant donné que je vois le résultat "<résultat>" d'un dépôt vers mon solde
    Quand je touche "Fermer" ou le retour Android
    Alors je suis sur l'accueil
    Et je ne vois ni "Vérifie ton dépôt" ni l'écran de validation

    Exemples:
      | résultat   |
      | Fait       |
      | En attente |
      | Échoué     |

  @C-P1-S39 @nominal
  Scénario: C-P1-S39 Les montants du dépôt restent visibles en mode masqué
    Étant donné que les montants sont masqués
    Quand je fais un dépôt de 5 000 F
    Alors la saisie, le récapitulatif, l'écran de validation et le résultat affichent les montants

  @C-P1-S40 @nominal
  Scénario: C-P1-S40 Un second dépôt pendant une attente est une nouvelle demande
    Étant donné que mon dépôt de 2 000 F est en attente
    Quand je dépose 5 000 F
    Alors une nouvelle demande est créée avec son propre montant et sa propre référence
    Et la demande de 2 000 F n'est ni répétée ni modifiée

  @C-P1-S41 @interdit
  Scénario: C-P1-S41 Le résultat ne se déduit jamais d'un message de l'opérateur
    Étant donné que j'ai reçu un SMS de Wave qui annonce le paiement
    Et que KOTIZ n'a pas encore la confirmation du partenaire
    Alors le dépôt reste "En attente" dans KOTIZ
    Et mon solde disponible n'a pas changé

  @C-P1-S42 @nominal @raccord
  Scénario: C-P1-S42 L'accueil après un dépôt fait
    Étant donné que mon dépôt de 5 000 F vers mon solde est fait
    Quand je suis sur l'accueil
    Alors mon solde disponible est de 17 400 FCFA
    Et "Dernières opérations" commence par "Dépôt Wave", "Vers ton solde", "+ 5 000 F", "Fait"
    Quand je touche la ligne "Dernier dépôt"
    Alors je vois le détail de ce dépôt

  @C-P1-S43 @backend
  Scénario: C-P1-S43 Le crédit n'est écrit qu'à la confirmation du partenaire
    Étant donné qu'un ordre de dépôt de 5 000 F est créé avec une clé d'idempotence
    Quand le partenaire n'a pas encore confirmé
    Alors aucune écriture ne crédite le solde
    Quand le partenaire confirme
    Alors des écritures équilibrées créditent le solde de 5 000 F
    Et les frais confirmés sont écrits séparément, selon la configuration
    Et un rejeu de la même confirmation ou de la même clé ne produit aucun second effet

  @C-P1-S44 @backend @interdit @G01
  Scénario: C-P1-S44 Le serveur refuse un dépôt dont les frais sont inconnus
    Étant donné que les frais du dépôt Wave ne sont pas configurés
    Quand l'app demande un récapitulatif ou un ordre de dépôt Wave
    Alors le serveur répond que les frais sont inconnus
    Et aucun ordre de paiement n'est créé
```

## C-P2 — Mettre de l'argent dans une épargne par Mobile Money

Couvre C-06, C-01 à C-05 vers une épargne, le raccord B · B07 et le succès partiel « en attente ».

```gherkin
# language: fr
@client @C-P2
Fonctionnalité: Mettre de l'argent dans une épargne par Mobile Money
  Pour faire avancer un projet
  En tant que Fatou, cliente
  Je veux déposer depuis mon Mobile Money directement pour une épargne, en voyant les deux temps

  Contexte:
    Étant donné que je suis connectée
    Et que mon solde disponible est de 12 400 FCFA
    Et que l'épargne "École Awa" contient 45 000 F pour un objectif de 100 000 F
    Et que les frais du dépôt Wave sont confirmés dans la configuration à <frais>

  @C-P2-S1 @nominal
  Scénario: C-P2-S1 Mettre de l'argent par Mobile Money de bout en bout
    Étant donné que je suis sur le détail de "École Awa"
    Quand je touche "Mettre de l'argent"
    Et que je touche "Mobile Money"
    Et que je touche "Wave"
    Et que je saisis "5000"
    Et que je touche "Continuer"
    Et que je touche "Déposer 5 000 F"
    Et que je valide le dépôt dans l'application Wave
    Et que le partenaire confirme le dépôt puis le passage dans "École Awa"
    Alors je vois le statut "Fait" et "Ton argent est dans École Awa."
    Et je vois "Dépôt" "Fait" et "Dans École Awa" "Fait"
    Et je vois "École Awa" "50 000 F sur 100 000 F"
    Quand je touche "Voir mon épargne"
    Alors le détail de "École Awa" affiche "50 000"
    Et mon solde disponible est toujours de 12 400 FCFA

  @C-P2-S2 @nominal
  Scénario: C-P2-S2 « D'où vient l'argent ? » avec un solde
    Étant donné que je suis sur le détail de "École Awa"
    Quand je touche "Mettre de l'argent"
    Alors une feuille s'ouvre avec le titre "D'où vient l'argent ?" et "Pour : École Awa"
    Et je vois "Mon solde disponible", "Mobile Money", "En espèces chez une agente", dans cet ordre
    Et la feuille n'affiche aucun montant

  @C-P2-S3 @nominal
  Scénario: C-P2-S3 « D'où vient l'argent ? » avec un solde à 0
    Étant donné que mon solde disponible est de 0 FCFA
    Quand j'ouvre "D'où vient l'argent ?" depuis "École Awa"
    Alors je vois "Mobile Money", "Mon solde disponible", "En espèces chez une agente", dans cet ordre
    Et "Mon solde disponible" est désactivé avec "Rien sur ton solde pour l'instant."

  @C-P2-S4 @erreur @a-confirmer @a-dessiner @G01
  Scénario: C-P2-S4 Mobile Money indisponible dans « D'où vient l'argent ? »
    Étant donné qu'aucun opérateur Mobile Money n'est disponible
    Quand j'ouvre "D'où vient l'argent ?" depuis "École Awa"
    Alors "Mobile Money" est désactivé avec "Mobile Money indisponible pour l'instant."

  @C-P2-S5 @nominal
  Scénario: C-P2-S5 En espèces chez une agente, pour une épargne
    Étant donné que "D'où vient l'argent ?" est ouverte pour "École Awa"
    Quand je touche "En espèces chez une agente"
    Alors je vois "Montre Mon QR à une agente"
    Et je vois "Dis à l'agente que c'est pour École Awa."
    Quand je touche le retour
    Alors la feuille "D'où vient l'argent ?" est ouverte

  @C-P2-S6 @nominal @raccord
  Scénario: C-P2-S6 Fermer « D'où vient l'argent ? » ramène au détail de l'épargne
    Étant donné que "D'où vient l'argent ?" est ouverte pour "École Awa"
    Quand je ferme la feuille
    Alors je suis sur le détail de "École Awa"
    Et rien n'a été envoyé

  @C-P2-S7 @nominal
  Scénario: C-P2-S7 La destination reste lisible jusqu'au résultat
    Étant donné que je dépose par Mobile Money pour "École Awa"
    Alors "Avec quoi tu déposes ?" affiche "Pour : École Awa"
    Et "Combien tu déposes ?" affiche "Vers : École Awa"
    Et le récapitulatif affiche "Vers" "École Awa"

  @C-P2-S8 @nominal
  Scénario: C-P2-S8 Le récapitulatif nomme les deux temps
    Étant donné que j'ai saisi "5000" pour "École Awa"
    Quand j'arrive sur "Vérifie ton dépôt"
    Alors je vois "1" "Arrive sur ton solde" puis "2" "Passe dans École Awa"
    Et je vois "Dans École Awa après" "50 000 F sur 100 000 F"
    Et je vois "Pris sur ton Wave : <montant débité>"

  @C-P2-S9 @nominal
  Scénario: C-P2-S9 Quatre étapes pendant la validation
    Étant donné que j'ai envoyé un dépôt pour "École Awa"
    Alors je vois les étapes "Demande envoyée à Wave", "Ta validation sur Wave", "Arrivée sur ton solde", "Passage dans École Awa"
    Et je vois "5 000 F arrivent sur ton solde, puis dans École Awa."

  @C-P2-S10 @erreur @interdit
  Scénario: C-P2-S10 Épargne fermée avant l'envoi
    Étant donné que "École Awa" a été fermée pendant que j'étais sur "Vérifie ton dépôt"
    Alors je vois "École Awa est fermée." et "Rien n'a été envoyé."
    Et le bouton principal est "Voir mon épargne"
    Et l'argent n'est redirigé ni vers mon solde ni vers une autre épargne
    Et aucune demande n'est envoyée à Wave

  @C-P2-S11 @nominal
  Scénario: C-P2-S11 Objectif atteint grâce au dépôt
    Étant donné que l'épargne "École Awa" contient 98 000 F pour un objectif de 100 000 F
    Quand mon dépôt de 5 000 F pour "École Awa" est fait et passé dans l'épargne
    Alors je vois "École Awa a atteint son objectif."
    Et ce texte est neutre, sans coche ni célébration
    Et "École Awa" reste ouverte

  @C-P2-S12 @interdit
  Scénario: C-P2-S12 Dépôt fait, passage en attente : suivi seulement
    Étant donné que mon dépôt pour "École Awa" est fait
    Et que son passage dans "École Awa" est en attente
    Quand le résultat s'affiche
    Alors je vois le statut "En attente", "Ton dépôt est fait." et "Le passage dans École Awa est en attente."
    Et je vois "Dépôt" "Fait" et "Dans École Awa" "En attente"
    Et je vois "Ne refais pas l'opération."
    Et le bouton principal est "Terminé"
    Et je vois les boutons texte "Voir dans Opérations" et "Voir le reçu du dépôt"
    Et je ne vois ni "Reprendre" ni "Réessayer"

  @C-P2-S13 @nominal
  Scénario: C-P2-S13 Dépôt en attente pour une épargne
    Étant donné que le partenaire n'a pas encore confirmé mon dépôt pour "École Awa"
    Quand le résultat s'affiche
    Alors je vois "Ton dépôt est en attente." et "Rien n'est encore dans École Awa."
    Et l'étape "Passage dans École Awa" affiche "Pas encore"

  @C-P2-S14 @erreur
  Scénario: C-P2-S14 Dépôt échoué pour une épargne
    Étant donné que mon dépôt pour "École Awa" a échoué de façon confirmée
    Quand le résultat s'affiche
    Alors je vois "Ton dépôt n'a pas marché." et "Rien n'est allé dans École Awa."
    Et le bouton principal est "Réessayer"

  @C-P2-S15 @interdit
  Scénario: C-P2-S15 Un dépôt fait ne devient jamais un échec parce que l'épargne n'a pas reçu l'argent
    Étant donné que mon dépôt pour "École Awa" est fait
    Et que son passage dans "École Awa" a échoué de façon confirmée
    Alors le résultat, la ligne d'Opérations, le détail, le reçu et le détail de l'épargne n'affichent jamais "Échoué" pour ce dépôt
    Et le détail de l'opération affiche l'étape "Dépôt depuis Wave" "Fait"

  @C-P2-S16 @interdit
  Scénario: C-P2-S16 La destination fixée à l'entrée ne change pas
    Étant donné que je dépose depuis "Déposer" de l'accueil
    Alors aucun écran du dépôt ne propose de choisir une épargne
    Et l'argent va sur mon solde
    Étant donné que je dépose depuis "Mettre de l'argent" de "École Awa"
    Alors aucun écran du dépôt ne propose de changer de destination

  @C-P2-S17 @nominal @raccord
  Scénario: C-P2-S17 « Dernier dépôt » après un dépôt pour une épargne
    Étant donné que mon dépôt de 5 000 F pour "École Awa" est fait et passé dans l'épargne
    Quand je suis sur l'accueil
    Alors mon solde disponible est toujours de 12 400 FCFA
    Et la ligne "Dernier dépôt" affiche "5 000 F" et "Fait", sans nom d'épargne

  @C-P2-S18 @nominal @raccord
  Scénario: C-P2-S18 « Tout voir » du détail d'une épargne ouvre Opérations filtrées
    Étant donné que je suis sur le détail de "École Awa"
    Quand je touche "Tout voir" dans "Derniers mouvements"
    Alors je suis sur "Opérations"
    Et la puce "École Awa" est la seule active
    Et seules les opérations liées à "École Awa" sont listées

  @C-P2-S19 @backend
  Scénario: C-P2-S19 Un dépôt pour une épargne = un dépôt puis une affectation liés
    Quand un dépôt Mobile Money de 5 000 F pour "École Awa" est confirmé par le partenaire
    Alors le solde est crédité de 5 000 F
    Puis une affectation de 5 000 F du solde vers "École Awa", liée à ce dépôt, est tentée
    Et l'affectation porte sur la totalité du montant, vers une seule épargne
    Et l'opération expose deux statuts : celui du dépôt et celui de l'affectation

  @C-P2-S20 @backend @interdit
  Scénario: C-P2-S20 L'échec de l'affectation laisse l'argent sur le solde
    Étant donné qu'un dépôt de 5 000 F pour "École Awa" est confirmé
    Quand l'affectation vers "École Awa" échoue de façon confirmée
    Alors le statut du dépôt reste "fait"
    Et les 5 000 F restent sur le solde disponible
    Et aucune écriture ne débite le solde vers "École Awa"
    Et aucun nouvel ordre de paiement n'est créé
```

## C-P3 — Mettre de l'argent depuis mon solde

Couvre C-06 (branche solde), C-07, C-08 et C-09. Mouvement interne **sans frais et sans PIN**.

```gherkin
# language: fr
@client @C-P3
Fonctionnalité: Mettre de l'argent dans une épargne depuis mon solde
  Pour faire avancer un projet avec l'argent déjà sur KOTIZ
  En tant que Fatou, cliente
  Je veux faire passer de l'argent de mon solde vers une épargne, sans frais

  Contexte:
    Étant donné que je suis connectée
    Et que mon solde disponible est de 12 400 FCFA
    Et que l'épargne "Boutique" contient 8 000 F pour un objectif de 50 000 F

  @C-P3-S1 @nominal
  Scénario: C-P3-S1 Mettre de l'argent depuis mon solde de bout en bout
    Étant donné que je suis sur le détail de "Boutique"
    Quand je touche "Mettre de l'argent"
    Et que je touche "Mon solde disponible"
    Et que je saisis "4000"
    Et que je touche "Continuer"
    Et que je touche "Mettre 4 000 F dans Boutique"
    Alors je vois le statut "Fait" et "Ton argent est dans Boutique."
    Et je vois "Depuis" "Mon solde", "Vers" "Boutique", "Boutique" "12 000 F sur 50 000 F" et "Sur ton solde" "8 400 F"
    Quand je touche "Voir mon épargne"
    Alors le détail de "Boutique" affiche "12 000"
    Et mon solde disponible est de 8 400 FCFA

  @C-P3-S2 @nominal
  Plan du scénario: C-P3-S2 L'indicateur d'étape suit la mise de côté
    Étant donné que je mets de l'argent de mon solde dans "Boutique"
    Quand j'arrive sur l'écran "<écran>"
    Alors l'en-tête affiche "<étape>"

    Exemples:
      | écran                             | étape         |
      | Combien tu mets de côté ?         | Étape 1 sur 2 |
      | Vérifie avant de mettre de côté   | Étape 2 sur 2 |

  @C-P3-S3 @nominal
  Scénario: C-P3-S3 D'où part l'argent et où il va
    Quand j'ouvre "Combien tu mets de côté ?" pour "Boutique"
    Alors je vois "Depuis : Mon solde · 12 400 F disponibles"
    Et je vois "Vers : Boutique"
    Et le montant saisi reste visible même si les montants sont masqués

  @C-P3-S4 @erreur
  Plan du scénario: C-P3-S4 Le montant est contrôlé avant le récapitulatif
    Étant donné que je suis sur "Combien tu mets de côté ?"
    Quand je saisis "<saisie>"
    Alors je vois "<aide>"
    Et le bouton "Continuer" est <état>

    Exemples:
      | saisie | aide                                   | état      |
      |        | Écris un montant.                      | désactivé |
      | 0      | Le montant doit être plus grand que 0. | désactivé |
      | 20000  | Tu as 12 400 F sur ton solde.          | désactivé |
      | 4000   |                                        | actif     |

  @C-P3-S5 @nominal
  Scénario: C-P3-S5 Tout mon solde
    Étant donné que je suis sur "Combien tu mets de côté ?"
    Quand je touche "Tout mon solde"
    Alors le champ affiche "12 400"
    Et "Tout mon solde" est sélectionné
    Quand je remplace le montant par "4000"
    Alors "Tout mon solde" n'est plus sélectionné

  @C-P3-S6 @nominal
  Scénario: C-P3-S6 Le montant fait atteindre l'objectif
    Étant donné que l'épargne "Boutique" contient 48 000 F pour un objectif de 50 000 F
    Quand je saisis "4000" sur "Combien tu mets de côté ?"
    Alors je vois "Ton objectif sera atteint."
    Et le bouton "Continuer" est actif

  @C-P3-S7 @interdit
  Scénario: C-P3-S7 Le récapitulatif n'a ni frais ni PIN
    Étant donné que j'ai saisi "4000" pour "Boutique"
    Quand j'arrive sur "Vérifie avant de mettre de côté"
    Alors je vois "Tu mets" "4 000 FCFA" et "Modifier"
    Et je vois "Depuis" "Mon solde" puis "Vers" "Boutique"
    Et je vois "Il restera sur ton solde" "8 400 F" et "Dans Boutique après" "12 000 F sur 50 000 F"
    Et je vois "L'argent reste sur KOTIZ. Tu peux le remettre sur ton solde."
    Et je ne vois aucune ligne "Frais"
    Quand je touche "Mettre 4 000 F dans Boutique"
    Alors aucun écran ne demande de PIN

  @C-P3-S8 @nominal
  Scénario: C-P3-S8 Récapitulatif d'une mise de côté qui atteint l'objectif
    Étant donné que l'épargne "Boutique" contient 48 000 F pour un objectif de 50 000 F
    Quand j'arrive sur "Vérifie avant de mettre de côté" avec 4 000 F
    Alors je vois "Dans Boutique après" "52 000 F · objectif atteint"

  @C-P3-S9 @nominal
  Scénario: C-P3-S9 Récapitulatif en mode masqué
    Étant donné que les montants sont masqués
    Quand j'arrive sur "Vérifie avant de mettre de côté" avec 4 000 F
    Alors je vois "4 000 FCFA" et "Dans Boutique après"
    Et je ne vois pas "Il restera sur ton solde"

  @C-P3-S10 @erreur
  Scénario: C-P3-S10 Le solde a changé entre-temps
    Étant donné que j'ai saisi "4000" pour "Boutique"
    Et que mon solde disponible est passé à 9 400 FCFA avant la confirmation
    Quand le serveur refuse le montant
    Alors je suis sur "Combien tu mets de côté ?"
    Et je vois "Ton solde a changé." et "Tu as maintenant 9 400 F disponibles."

  @C-P3-S11 @erreur @a-dessiner
  Scénario: C-P3-S11 Épargne fermée pendant le récapitulatif
    Étant donné que "Boutique" a été fermée pendant que j'étais sur "Vérifie avant de mettre de côté"
    Quand je touche "Mettre 4 000 F dans Boutique"
    Alors rien ne bouge
    Et la feuille "Boutique est fermée" s'ouvre avec les autres épargnes actives et "Laisser sur mon solde"

  @C-P3-S12 @erreur @a-confirmer @G01 @G03
  Scénario: C-P3-S12 Refus connu d'avance
    Étant donné qu'une règle interdit déjà ce mouvement
    Quand j'arrive sur "Vérifie avant de mettre de côté"
    Alors je vois "Ce mouvement n'est pas possible pour l'instant." et "Ton argent n'a pas bougé."
    Et je vois "Contacter l'aide"
    Et le bouton "Mettre 4 000 F dans Boutique" est désactivé avec "Le mouvement est bloqué : il est refusé."
    Et aucune valeur chiffrée n'est affichée

  @C-P3-S13 @interdit
  Scénario: C-P3-S13 Un seul envoi, même en appuyant deux fois
    Étant donné que je suis sur "Vérifie avant de mettre de côté"
    Quand je touche deux fois "Mettre 4 000 F dans Boutique"
    Alors le bouton affiche "Envoi…"
    Et un seul mouvement est créé

  @C-P3-S14 @erreur
  Scénario: C-P3-S14 Hors connexion au moment de confirmer
    Étant donné que je n'ai pas de connexion
    Quand je touche "Mettre 4 000 F dans Boutique"
    Alors je vois "Pas de connexion." et "Rien n'a été envoyé."
    Et le bouton principal devient "Réessayer"

  @C-P3-S15 @nominal
  Scénario: C-P3-S15 Résultat fait : reçu et objectif
    Étant donné que ma mise de côté de 4 000 F dans "Boutique" est faite
    Alors l'écran de résultat est plein écran avec seulement "Fermer" en haut
    Et le bouton principal est "Voir mon épargne"
    Et je vois le bouton texte "Voir le reçu"
    Et si l'objectif est atteint, je vois "Boutique a atteint son objectif." en texte neutre

  @C-P3-S16 @nominal
  Scénario: C-P3-S16 Mise de côté en attente
    Étant donné que ma mise de côté n'est pas encore confirmée
    Quand le résultat s'affiche
    Alors je vois le statut "En attente" et "Ta mise de côté est en attente."
    Et je vois les étapes "Demande" "Envoyée" et "Dans Boutique" "En attente"
    Et je vois "Ne refais pas l'opération." et "Tu la retrouves dans Opérations."
    Et je ne vois ni "Voir le reçu" ni "Réessayer"

  @C-P3-S17 @interdit @a-confirmer
  Scénario: C-P3-S17 Résultat inconnu : on vérifie, sans Réessayer
    Étant donné que la connexion est perdue après l'envoi, ou qu'aucune réponse n'arrive avant <délai de confirmation>
    Alors je vois le statut "En attente" et "On vérifie ta mise de côté."
    Et je vois "Contacter l'aide"
    Et l'écran n'a pas de bouton "Réessayer"

  @C-P3-S18 @erreur
  Scénario: C-P3-S18 Échec confirmé
    Étant donné que ma mise de côté a échoué de façon confirmée
    Alors je vois le statut "Échoué", "Ce n'est pas allé dans Boutique." et "Ton argent n'a pas bougé. Il est sur ton solde."
    Et le bouton principal est "Réessayer"
    Quand je touche "Réessayer"
    Alors je suis sur "Vérifie avant de mettre de côté", recalculé
    Et une nouvelle confirmation est demandée par le bouton du récapitulatif

  @C-P3-S19 @interdit
  Scénario: C-P3-S19 Le retour depuis le résultat mène au détail de l'épargne
    Étant donné que je vois le résultat d'une mise de côté dans "Boutique"
    Quand je touche "Fermer" ou le retour Android
    Alors je suis sur le détail de "Boutique"
    Et je ne vois ni le récapitulatif ni la saisie

  @C-P3-S20 @nominal @raccord
  Scénario: C-P3-S20 La mise de côté dans Opérations et sur l'accueil
    Étant donné que ma mise de côté de 4 000 F dans "Boutique" est faite
    Alors "Opérations" et "Dernières opérations" affichent "Vers Boutique", "Depuis ton solde", "− 4 000 F", "Fait"
    Et la ligne a la pastille neutre des mouvements internes, sans logo d'opérateur
    Et la ligne "Dernier dépôt" de l'accueil ne change pas

  @C-P3-S21 @backend @interdit
  Scénario: C-P3-S21 Mise de côté : écritures équilibrées, sans frais
    Quand une mise de côté de 4 000 F de mon solde vers "Boutique" est confirmée
    Alors des écritures équilibrées débitent le solde et créditent "Boutique" de 4 000 F
    Et aucune écriture de frais n'est créée
    Et le serveur refuse un montant nul, supérieur au disponible confirmé, ou vers une épargne fermée
    Et la même clé d'idempotence ne produit jamais deux mouvements
```

## C-P4 — Reprendre une mise de côté qui n'a pas été faite

Couvre le succès partiel de C-05, la reprise par C-07, C-08, C-10 et C-09 (avec les variantes « solde baissé » et « épargne fermée »), la reprise depuis C-12, et le nouvel état B · B07 « Dépôt pas entré » reporté au lot B.

```gherkin
# language: fr
@client @C-P4
Fonctionnalité: Reprendre une mise de côté qui n'a pas été faite
  Pour que mon dépôt aille bien dans mon épargne
  En tant que Fatou, cliente
  Je veux reprendre seulement le passage dans l'épargne, jamais refaire le dépôt

  Contexte:
    Étant donné que je suis connectée
    Et que l'épargne "École Awa" contient 45 000 F pour un objectif de 100 000 F
    Et que mon dépôt Wave de 5 000 F pour "École Awa" du 19 octobre est fait
    Et que son passage dans "École Awa" a échoué de façon confirmée
    Et que mon solde disponible est de 17 400 FCFA

  @C-P4-S1 @nominal
  Scénario: C-P4-S1 Le résultat partiel dit où est l'argent
    Quand le résultat du dépôt s'affiche
    Alors je vois le statut "À reprendre", en ambre avec l'horloge
    Et je vois "5 000 F sont sur ton solde." puis "École Awa ne les a pas reçus."
    Et je vois "Dépôt" "Fait" et "Dans École Awa" "À reprendre"
    Et le bouton principal est "Reprendre"
    Et je vois les boutons texte "Laisser sur mon solde" et "Voir le reçu du dépôt"
    Et je ne vois ni "Échoué" pour le dépôt, ni "Épargne alimentée"

  @C-P4-S2 @nominal
  Scénario: C-P4-S2 Reprendre avec assez d'argent sur le solde
    Étant donné que je vois le résultat partiel du dépôt
    Quand je touche "Reprendre"
    Alors je suis sur "Réessayer de mettre de côté"
    Et l'en-tête n'affiche pas d'indicateur d'étape
    Et je vois le lien "Suite à ton dépôt Wave du 19 oct."
    Et je vois "Tu mets" "5 000 FCFA", "Depuis" "Mon solde", "Vers" "École Awa"
    Et je vois "Il restera sur ton solde" "12 400 F" et "Dans École Awa après" "50 000 F sur 100 000 F"
    Et le bouton principal est "Mettre 5 000 F dans École Awa"
    Et je vois le bouton texte "Plus tard"

  @C-P4-S3 @nominal
  Scénario: C-P4-S3 Reprise faite
    Étant donné que je suis sur "Réessayer de mettre de côté"
    Quand je touche "Mettre 5 000 F dans École Awa"
    Alors je vois le statut "Fait", "Ton argent est dans École Awa." et "Ton dépôt du 19 oct. est maintenant dans École Awa."
    Et le détail de "École Awa" affiche "50 000"
    Et mon solde disponible est de 12 400 FCFA
    Et la ligne d'Opérations "Dépôt vers École Awa" affiche "Fait"

  @C-P4-S4 @interdit
  Scénario: C-P4-S4 La reprise n'est jamais un nouveau dépôt
    Quand je reprends la mise de côté
    Alors aucun écran ne demande de choisir un opérateur ni de valider chez l'opérateur
    Et aucun ordre de paiement n'est créé
    Et aucun écran ne demande le PIN KOTIZ
    Et l'autorisation du dépôt d'origine n'est pas réutilisée : la reprise se confirme sur son propre récapitulatif

  @C-P4-S5 @nominal
  Scénario: C-P4-S5 Laisser sur mon solde garde la reprise possible
    Étant donné que je vois le résultat partiel du dépôt
    Quand je touche "Laisser sur mon solde"
    Alors je suis sur l'accueil
    Et mon solde disponible est de 17 400 FCFA
    Et le détail de l'opération propose toujours "Réessayer de mettre dans École Awa"

  @C-P4-S6 @nominal
  Scénario: C-P4-S6 « Plus tard » sur le récapitulatif de reprise
    Étant donné que je suis sur "Réessayer de mettre de côté"
    Quand je touche "Plus tard"
    Alors je suis sur l'accueil
    Et rien n'a bougé
    Et la reprise reste possible

  @C-P4-S7 @nominal
  Scénario: C-P4-S7 La reprise reste possible sans limite de temps
    Étant donné que j'ai laissé l'argent sur mon solde il y a plusieurs semaines
    Quand j'ouvre le détail de l'opération
    Alors je vois "Réessayer de mettre dans École Awa"

  @C-P4-S8 @nominal
  Scénario: C-P4-S8 Reprendre quand le solde a baissé
    Étant donné que mon solde disponible est tombé à 3 000 FCFA
    Quand je touche "Reprendre"
    Alors je suis sur "Combien tu mets dans École Awa ?"
    Et l'en-tête n'affiche pas d'indicateur d'étape
    Et je vois "Ton solde a baissé." et "Tu as 3 000 F disponibles."
    Et le champ est prérempli avec "3 000"
    Et "Tout mon solde" n'est pas proposé
    Et je vois le bouton texte "Plus tard"
    Quand je saisis "4000"
    Alors je vois "Tu peux mettre 3 000 F au plus."
    Et le bouton "Continuer" est désactivé

  @C-P4-S9 @interdit
  Scénario: C-P4-S9 La reprise ne prend jamais plus que le dépôt d'origine
    Étant donné que mon solde disponible est de 30 000 FCFA
    Quand je reprends la mise de côté et que je saisis "6000"
    Alors je vois "Tu peux mettre 5 000 F au plus."
    Et le bouton "Continuer" est désactivé

  @C-P4-S10 @erreur
  Scénario: C-P4-S10 Rien sur le solde pour reprendre
    Étant donné que mon solde disponible est de 0 FCFA
    Quand j'ouvre le détail de l'opération
    Alors je vois "Ton solde est à 0 F. Rien à mettre dans École Awa pour l'instant."
    Et le bouton "Réessayer de mettre dans École Awa" est désactivé

  @C-P4-S11 @nominal
  Scénario: C-P4-S11 Reprendre quand l'épargne a été fermée
    Étant donné que "École Awa" est fermée
    Et que "Boutique" est une autre épargne active
    Quand je reprends la mise de côté
    Alors une feuille s'ouvre avec le titre "École Awa est fermée"
    Et je vois "Tes 5 000 F sont sur ton solde." et "Tu peux les mettre dans une autre épargne."
    Et je vois "Boutique" et le bouton secondaire "Laisser sur mon solde"
    Quand je touche "Boutique"
    Alors je suis sur "Réessayer de mettre de côté" avec "Vers" "Boutique"
    Et le bouton principal est "Mettre 5 000 F dans Boutique"

  @C-P4-S12 @nominal
  Scénario: C-P4-S12 Épargne fermée et aucune autre épargne
    Étant donné que "École Awa" est fermée et que je n'ai aucune autre épargne active
    Quand je reprends la mise de côté
    Alors je vois "Tu n'as pas d'autre épargne."
    Et le bouton principal est "Laisser sur mon solde"
    Et je vois le lien "Créer une épargne"

  @C-P4-S13 @interdit
  Scénario: C-P4-S13 Une épargne fermée n'est jamais rouverte, rien ne part tout seul
    Étant donné que "École Awa" est fermée
    Quand je reprends la mise de côté
    Alors aucune action ne rouvre "École Awa"
    Et l'argent n'est mis automatiquement dans aucune épargne
    Et si je crée une épargne ensuite, rien n'y est mis sans ma confirmation

  @C-P4-S14 @nominal
  Scénario: C-P4-S14 Reprendre depuis le détail de l'opération
    Étant donné que je suis sur le détail "Dépôt vers École Awa"
    Alors je vois le statut "À reprendre" et "Dépôt fait, épargne pas encore."
    Et je vois les étapes "Dépôt depuis Wave" "Fait" et "Passage dans École Awa" "Pas fait"
    Et je vois "Les 5 000 F sont sur ton solde."
    Et le bouton principal est "Réessayer de mettre dans École Awa"
    Quand je le touche
    Alors je suis sur "Réessayer de mettre de côté"

  @C-P4-S15 @nominal
  Scénario: C-P4-S15 Le lien d'origine du récapitulatif ouvre le dépôt
    Étant donné que je suis sur "Réessayer de mettre de côté"
    Quand je touche "Suite à ton dépôt Wave du 19 oct."
    Alors je vois le détail "Dépôt vers École Awa" de ce dépôt

  @C-P4-S16 @nominal @raccord
  Scénario: C-P4-S16 Détail de l'épargne : « Dépôt pas entré »
    Étant donné que je suis sur le détail de "École Awa"
    Alors je vois la ligne d'information "5 000 F sont restés sur ton solde. Les mettre ici"
    Et "Derniers mouvements" affiche "Depuis Wave", "Sur ton solde", "5 000 F" sans "+", et "Pas entré" avec une croix
    Quand je touche la ligne d'information
    Alors je suis sur "Réessayer de mettre de côté"

  @C-P4-S17 @interdit @raccord
  Scénario: C-P4-S17 Le détail de l'épargne n'affiche jamais « Échoué » pour un dépôt fait
    Étant donné que je suis sur le détail de "École Awa"
    Alors la ligne de ce dépôt n'affiche ni "Échoué" ni "+ 5 000 F"
    Et le montant de cette ligne est en texte secondaire

  @C-P4-S18 @nominal
  Scénario: C-P4-S18 Détail de l'opération après la reprise
    Étant donné que la reprise vers "École Awa" est faite le 19 octobre
    Quand j'ouvre le détail "Dépôt vers École Awa"
    Alors je vois le statut "Fait"
    Et je vois les étapes "Dépôt depuis Wave" "Fait", "Passage dans École Awa" "Pas fait", "Reprise vers École Awa · 19 oct." "Fait"
    Et je ne vois plus "Réessayer de mettre dans École Awa"

  @C-P4-S19 @nominal
  Scénario: C-P4-S19 Reçus du dépôt et de la reprise
    Étant donné que la reprise vers "École Awa" est faite le 19 octobre
    Alors le reçu du dépôt affiche "Passage dans École Awa" "Pas fait · repris le 19 oct."
    Et le résultat de la reprise propose "Voir le reçu", qui ouvre le reçu de la mise de côté

  @C-P4-S20 @interdit
  Scénario: C-P4-S20 Pas de reprise tant que le passage n'a pas échoué de façon confirmée
    Étant donné que le passage dans "École Awa" est en attente ou inconnu
    Alors ni le résultat, ni le détail, ni le détail de l'épargne ne proposent "Reprendre" ou "Réessayer"
    Et je vois "Ne refais pas l'opération."

  @C-P4-S21 @backend @interdit
  Scénario: C-P4-S21 Une seule reprise à la fois, liée au dépôt d'origine
    Étant donné que la reprise est ouverte sur deux écrans
    Quand les deux confirment la reprise
    Alors une seule affectation est créée, liée au dépôt d'origine
    Et la seconde demande reçoit l'état de la première
    Et le montant repris ne dépasse ni le montant du dépôt d'origine ni le disponible confirmé
    Et chaque reprise porte sa propre clé d'idempotence
```

## C-P5 — Limite de 3 épargnes au moment de choisir une destination

```gherkin
# language: fr
@client @C-P5
Fonctionnalité: Limite de 3 épargnes au choix d'une destination
  Pour mettre mon argent dans une épargne autorisée
  En tant que Fatou, cliente
  Je veux voir mes épargnes actives et la limite, sans qu'on ferme rien à ma place

  Contexte:
    Étant donné que je suis connectée
    Et que mon dépôt Wave de 5 000 F pour "École Awa" est fait, avec un passage échoué
    Et que "École Awa" est fermée

  @C-P5-S1 @interdit
  Scénario: C-P5-S1 À 3 épargnes actives : la liste, la limite, pas de « Créer »
    Étant donné que "Boutique", "Tabaski" et "Loyer" sont actives
    Quand je reprends la mise de côté
    Alors la feuille "École Awa est fermée" liste "Boutique", "Tabaski" et "Loyer"
    Et je vois "3 épargnes actives : c'est le maximum."
    Et ce texte n'est pas un lien
    Et je ne vois pas "Créer une épargne"
    Et aucune action ne ferme ni ne vide une épargne

  @C-P5-S2 @nominal
  Scénario: C-P5-S2 Moins de 3 actives : créer une épargne reste possible
    Étant donné que seule "Boutique" est active
    Quand je reprends la mise de côté
    Alors je vois le lien "Créer une épargne"
    Quand je le touche
    Alors je suis sur "Quel projet ?"
    Et après la création, la mise de côté reste à reprendre et rien n'est mis automatiquement dans la nouvelle épargne

  @C-P5-S3 @nominal
  Scénario: C-P5-S3 Les épargnes fermées ne comptent pas
    Étant donné que "Boutique" et "Tabaski" sont actives et que "Moto" est fermée
    Quand je reprends la mise de côté
    Alors la feuille liste "Boutique" et "Tabaski", sans "Moto" ni "École Awa"
    Et je vois le lien "Créer une épargne"

  @C-P5-S4 @nominal
  Scénario: C-P5-S4 Une épargne dont l'objectif est atteint reste choisissable
    Étant donné que "Tabaski" a atteint son objectif
    Quand je touche "Tabaski" dans la feuille
    Alors je suis sur "Réessayer de mettre de côté" avec "Vers" "Tabaski"

  @C-P5-S5 @nominal
  Scénario: C-P5-S5 Laisser sur mon solde à la limite
    Étant donné que 3 épargnes sont actives
    Quand je touche "Laisser sur mon solde"
    Alors je suis sur l'accueil
    Et les 5 000 F sont sur mon solde
    Et la reprise reste possible depuis le détail de l'opération
```

## C-P6 — Voir mes opérations, une opération et son reçu

Couvre C-11, C-12, C-13, le masquage et les raccords A · H01 et B · B12.

````gherkin
# language: fr
@client @C-P6
Fonctionnalité: Voir mes opérations, une opération et son reçu
  Pour savoir ce qui s'est passé avec mon argent
  En tant que Fatou, cliente
  Je veux une liste unique, un détail clair et un reçu seulement quand c'est fait

  Contexte:
    Étant donné que je suis connectée
    Et que mon historique contient des dépôts faits, en attente et échoués, une mise de côté, un retour au solde, un retrait et une correction confirmée

  @C-P6-S1 @nominal
  Scénario: C-P6-S1 Opérations est une racine de consultation
    Quand je touche l'onglet "Opérations"
    Alors je vois le titre "Opérations" et l'œil des montants
    Et la barre basse est visible, onglet "Opérations" actif
    Et l'écran n'a pas de bouton principal

  @C-P6-S2 @nominal
  Plan du scénario: C-P6-S2 Chaque ligne dit le type, d'où, vers où, le montant et le statut en mots
    Quand je regarde la ligne d'un "<type>"
    Alors je vois le titre "<titre>", le sous-titre "<sous-titre>", le montant "<montant>" et le statut "<statut>"

    Exemples:
      | type                              | titre                 | sous-titre                 | montant     | statut     |
      | dépôt Wave fait vers le solde     | Dépôt Wave            | Vers ton solde             | + 5 000 F   | Fait       |
      | dépôt Wave fait vers une épargne  | Dépôt vers École Awa  | Depuis Wave                | + 5 000 F   | Fait       |
      | dépôt Wave en attente             | Dépôt Wave            | Vers ton solde             | 2 000 F     | En attente |
      | dépôt Orange Money échoué         | Dépôt Orange Money    | Vers ton solde             | 3 000 F     | Échoué     |
      | mise de côté vers une épargne     | Vers École Awa        | Depuis ton solde           | − 10 000 F  | Fait       |
      | retour au solde                   | Depuis Moto (fermée)  | Vers ton solde             | + 15 000 F  | Fait       |
      | retrait Wave                      | Retrait Wave          | Vers 07 08 … 56            | − 8 000 F   | Fait       |
      | correction confirmée              | Correction            | Pour ton dépôt du 10 oct.  | + 1 500 F   | Fait       |

  @C-P6-S3 @nominal
  Plan du scénario: C-P6-S3 Un dépôt pour une épargne tient sur une seule ligne, avec un statut combiné
    Étant donné que mon dépôt Wave de 5 000 F pour "Boutique" est fait et que son passage est "<passage>"
    Quand je regarde la ligne "Dépôt vers Boutique"
    Alors je vois "Depuis Wave", "+ 5 000 F" et le statut "<mot>" en ambre avec l'horloge
    Et je vois la phrase "<phrase>" sous le sous-titre
    Et cette opération n'a qu'une seule ligne dans la liste

    Exemples:
      | passage                        | mot          | phrase                          |
      | échoué de façon confirmée      | À reprendre  | Dépôt fait, épargne pas encore. |
      | en attente                     | En attente   | Dépôt fait, épargne en cours.   |

  @C-P6-S4 @interdit
  Scénario: C-P6-S4 Le signe « + » seulement quand l'argent est arrivé
    Alors un dépôt en attente ou échoué s'affiche sans signe, en texte secondaire
    Et seule une opération faite porte "+" ou "−"
    Et une mise de côté ou un retour au solde n'a jamais de logo d'opérateur ni la pastille vert doux d'un apport

  @C-P6-S5 @nominal
  Scénario: C-P6-S5 Lignes groupées par jour
    Étant donné que nous sommes le 19 octobre 2026
    Alors les lignes sont groupées sous "Aujourd'hui", "Hier", puis "17 octobre", du plus récent au plus ancien
    Et chaque ligne affiche sa date courte et son heure, par exemple "18 oct. · 09:24"

  @C-P6-S6 @nominal
  Plan du scénario: C-P6-S6 Filtrer par type
    Quand je touche la puce "<puce>"
    Alors seule la puce "<puce>" est active
    Et la liste ne montre que "<contenu>"

    Exemples:
      | puce      | contenu                                                   |
      | Tout      | toutes les opérations                                     |
      | Dépôts    | les dépôts, y compris vers une épargne, et les corrections |
      | Retraits  | les retraits                                              |
      | Épargnes  | les mises de côté, les retours au solde et les dépôts vers une épargne |

  @C-P6-S7 @nominal
  Scénario: C-P6-S7 Retirer le filtre d'une épargne
    Étant donné que j'ai ouvert Opérations depuis "Tout voir" de "École Awa"
    Alors la puce "École Awa" est la seule active
    Et TalkBack annonce "Retirer le filtre École Awa" sur cette puce
    Quand je touche la puce "École Awa"
    Alors la puce disparaît et toutes les opérations sont listées

  @C-P6-S8 @nominal
  Plan du scénario: C-P6-S8 Filtre sans résultat
    Étant donné que je n'ai aucune opération de type "<type>"
    Quand je touche la puce "<puce>"
    Alors je vois "<texte>" et le lien "Tout voir"

    Exemples:
      | type                | puce      | texte                                      |
      | retrait             | Retraits  | Aucun retrait pour l'instant.              |
      | dépôt               | Dépôts    | Aucun dépôt pour l'instant.                |
      | mouvement d'épargne | Épargnes  | Aucun mouvement d'épargne pour l'instant.  |

  @C-P6-S9 @nominal @a-confirmer
  Scénario: C-P6-S9 « Voir plus » charge la page suivante
    Étant donné que j'ai plus de <taille de page> opérations
    Alors je vois les <taille de page> plus récentes et le bouton "Voir plus"
    Quand je touche "Voir plus"
    Alors la page suivante s'ajoute
    Et la liste ne se charge jamais toute seule en défilant

  @C-P6-S10 @nominal
  Scénario: C-P6-S10 Opérations vide
    Étant donné que mon compte est neuf et sans opération
    Quand j'ouvre Opérations
    Alors je vois "Tes opérations s'afficheront ici." et le bouton texte "Faire un dépôt"
    Et je ne vois aucune puce de filtre
    Quand je touche "Faire un dépôt"
    Alors la feuille "Comment tu veux déposer ?" s'ouvre

  @C-P6-S11 @interdit
  Scénario: C-P6-S11 Opérations en mode masqué
    Étant donné que les montants sont masqués
    Quand j'ouvre Opérations
    Alors chaque montant est remplacé par "••• F" et TalkBack lit "Montant masqué"
    Et les titres, sous-titres, statuts et dates restent visibles

  @C-P6-S12 @erreur
  Scénario: C-P6-S12 Opérations hors connexion
    Étant donné que je n'ai pas de connexion
    Et que la liste a été chargée à <HH:MM>
    Quand j'ouvre Opérations
    Alors je vois la dernière liste connue et "Mis à jour à <HH:MM> · hors connexion"
    Et les statuts sont affichés tels que connus, jamais promus
    Et "Voir plus" est désactivé avec "Voir plus demande la connexion."

  @C-P6-S13 @interdit
  Scénario: C-P6-S13 Chargement sans zéro trompeur
    Étant donné que la liste n'est pas encore chargée
    Quand j'ouvre Opérations
    Alors je vois un squelette annoncé "Chargement de tes opérations"
    Et aucun montant, aucune puce et aucun texte de liste vide ne s'affichent

  @C-P6-S14 @nominal
  Scénario: C-P6-S14 Détail d'un dépôt fait vers le solde
    Quand j'ouvre la ligne "Dépôt Wave" de 5 000 F faite
    Alors l'en-tête affiche "Dépôt Wave" et l'œil des montants
    Et je vois le statut "Fait" et "+ 5 000 FCFA"
    Et je vois "Depuis" "Wave" "07 08 12 34 56" puis "Vers" "Mon solde"
    Et je vois "Date" avec la date longue et l'heure, et "Référence"
    Et le bouton principal est "Voir le reçu"
    Et je vois le bouton texte "Signaler un problème"

  @C-P6-S15 @interdit
  Scénario: C-P6-S15 Détail d'un dépôt en attente : pas de reçu, pas de bouton principal
    Quand j'ouvre la ligne "Dépôt Wave" de 2 000 F en attente
    Alors je vois le statut "En attente", "2 000 FCFA" en texte secondaire et "Pas encore sur ton solde."
    Et je vois les étapes "Demande envoyée à Wave" "Envoyée", "Ta validation sur Wave" "Validée", "Arrivée sur ton solde" "En attente"
    Et je vois "Le reçu sera prêt quand ce sera fait." et "Ne refais pas l'opération."
    Et l'écran n'a ni bouton principal, ni "Voir le reçu", ni "Réessayer"
    Et "Signaler un problème" est un bouton texte

  @C-P6-S16 @erreur
  Scénario: C-P6-S16 Détail d'un dépôt échoué
    Quand j'ouvre la ligne "Dépôt Orange Money" de 3 000 F échouée
    Alors je vois le statut "Échoué", "3 000 FCFA" en texte secondaire et "Rien n'est arrivé sur ton solde."
    Et je vois "Ton dépôt n'a pas marché."
    Et l'écran n'a ni "Voir le reçu" ni "Réessayer"
    Et "Signaler un problème" est un bouton texte

  @C-P6-S17 @nominal
  Scénario: C-P6-S17 Détail d'un dépôt fait vers une épargne
    Quand j'ouvre la ligne "Dépôt vers École Awa" faite
    Alors l'en-tête affiche "Dépôt vers École Awa"
    Et je vois le statut "Fait" et les étapes "Dépôt depuis Wave" "Fait" et "Passage dans École Awa" "Fait"
    Et le bouton principal est "Voir le reçu"

  @C-P6-S18 @nominal
  Scénario: C-P6-S18 Détail d'un dépôt fait dont le passage est en attente
    Étant donné que le passage de mon dépôt vers "École Awa" est en attente
    Quand j'ouvre son détail
    Alors je vois le statut "En attente" et "Dépôt fait, épargne en cours."
    Et je vois les étapes "Dépôt depuis Wave" "Fait" et "Passage dans École Awa" "En attente"
    Et je vois le lien "Voir le reçu du dépôt"
    Et je ne vois pas "Réessayer de mettre dans École Awa"

  @C-P6-S19 @nominal @a-confirmer @G01
  Scénario: C-P6-S19 Les frais d'un dépôt n'apparaissent que s'ils sont confirmés
    Étant donné que les frais de ce dépôt sont confirmés à <frais>
    Quand j'ouvre le détail d'un dépôt fait
    Alors je vois la ligne "Frais" "<frais>"
    Étant donné que les frais de ce dépôt ne sont pas connus
    Alors le détail n'a aucune ligne "Frais"

  @C-P6-S20 @erreur
  Scénario: C-P6-S20 Détail jamais chargé, hors connexion
    Étant donné que je n'ai pas de connexion et que ce détail n'a jamais été chargé
    Quand j'ouvre la ligne
    Alors je vois "Détail indisponible hors connexion." et "Réessayer"

  @C-P6-S21 @interdit
  Scénario: C-P6-S21 Détail et reçu en mode masqué
    Étant donné que les montants sont masqués
    Quand j'ouvre le détail d'un dépôt fait, puis son reçu
    Alors les montants et les frais sont masqués et lus "Montant masqué"
    Et l'œil de l'en-tête réaffiche les montants partout

  @C-P6-S22 @nominal
  Scénario: C-P6-S22 Reçu d'un dépôt vers le solde
    Étant donné que je suis sur le détail d'un dépôt Wave fait de 5 000 F
    Quand je touche "Voir le reçu"
    Alors je vois l'en-tête "Reçu" et l'œil
    Et la carte du reçu affiche "KOTIZ", le statut "Fait", "Dépôt Mobile Money" et "5 000 FCFA"
    Et elle affiche "Depuis" "Wave" "07 08 12 34 56", "Vers" "Mon solde", "Date", "Référence" et "Cliente" avec mon nom
    Et si les frais sont confirmés, elle affiche "Pris sur ton Wave" "<montant débité>" et "Frais" "<frais>"

  @C-P6-S23 @nominal
  Scénario: C-P6-S23 Reçu d'un dépôt fait vers une épargne
    Quand j'ouvre le reçu d'un dépôt Wave fait et passé dans "École Awa"
    Alors je vois le statut "Fait", "Pour" "École Awa", "Dépôt" "Fait" et "Passage dans École Awa" "Fait"

  @C-P6-S24 @interdit
  Scénario: C-P6-S24 Reçu d'un dépôt fait dont le passage n'est pas fait
    Étant donné que mon dépôt pour "Boutique" est fait et que son passage a échoué
    Quand j'ouvre son reçu avec "Voir le reçu du dépôt"
    Alors l'en-tête du reçu affiche "Dépôt fait", sans statut "Fait" global
    Et je vois "Demandé pour" "Boutique" et "Arrivé sur" "Mon solde"
    Et je vois "Dépôt" "Fait" et "Passage dans Boutique" "Pas fait" en rouge avec une croix
    Et le reçu n'annonce jamais que l'épargne a reçu l'argent

  @C-P6-S25 @interdit
  Plan du scénario: C-P6-S25 Jamais de reçu tant que ce n'est pas fait
    Étant donné qu'un dépôt est "<statut>"
    Alors ni son résultat ni son détail ne proposent "Voir le reçu"
    Et aucun reçu n'existe pour lui

    Exemples:
      | statut     |
      | en attente |
      | inconnu    |
      | échoué     |
      | annulé     |

  @C-P6-S26 @interdit
  Scénario: C-P6-S26 Pas de partage du reçu au lot C
    Quand j'ouvre un reçu
    Alors je ne vois aucun bouton "Partager"

  @C-P6-S27 @erreur
  Plan du scénario: C-P6-S27 Reçu hors connexion
    Étant donné que je n'ai pas de connexion et que le reçu "<déjà ouvert>"
    Quand j'ouvre le reçu
    Alors je vois "<résultat>"

    Exemples:
      | déjà ouvert          | résultat                              |
      | a déjà été ouvert    | le reçu enregistré sur le téléphone   |
      | n'a jamais été ouvert | Reçu indisponible hors connexion.    |

  @C-P6-S28 @nominal
  Scénario: C-P6-S28 Opération d'une épargne fermée
    Étant donné que "Moto" est fermée
    Quand j'ouvre une opération liée à "Moto"
    Alors le détail reste lisible
    Et je vois "Moto est fermée depuis le 12 oct." pour un dépôt vers cette épargne
    Et aucune action ne déplace d'argent vers "Moto"

  @C-P6-S29 @nominal @raccord
  Plan du scénario: C-P6-S29 Les entrées vers Opérations et le détail
    Étant donné que je suis sur "<écran>"
    Quand je touche "<élément>"
    Alors je vois "<destination>"

    Exemples:
      | écran                 | élément                              | destination                         |
      | l'accueil             | l'onglet Opérations                  | Opérations, sans filtre             |
      | l'accueil             | Tout voir des Dernières opérations   | Opérations, sans filtre             |
      | l'accueil             | une ligne des Dernières opérations   | le détail de cette opération        |
      | l'accueil             | la ligne Dernier dépôt               | le détail du dernier dépôt          |
      | le détail d'une épargne | une ligne de Derniers mouvements   | le détail de cette opération        |

  @C-P6-S30 @nominal @raccord
  Scénario: C-P6-S30 Le retour au solde (lot B) dans Opérations et son reçu
    Étant donné que mon retour de 20 000 F de "École Awa" vers mon solde est fait
    Alors Opérations affiche "Depuis École Awa", "Vers ton solde", "+ 20 000 F", "Fait"
    Quand je touche "Voir le reçu" sur le résultat du retour
    Alors je vois le reçu "Retour au solde"

  @C-P6-S31 @interdit
  Scénario: C-P6-S31 Un seul réglage de masquage
    Quand je masque les montants depuis Opérations
    Alors l'accueil, les épargnes, le détail et le reçu sont aussi masqués
    Et le choix est gardé à la prochaine ouverture de l'app
    Mais la saisie, les récapitulatifs, l'attente et les résultats gardent leurs montants visibles

  @C-P6-S32 @backend
  Scénario: C-P6-S32 Liste unique, paginée, aux statuts réels
    Quand l'app demande les opérations de la cliente
    Alors l'API renvoie dépôts, retraits, mouvements internes et corrections confirmées dans une seule liste, du plus récent au plus ancien
    Et chaque opération porte son type, son origine, sa destination, son montant, sa date et son statut réel
    Et un dépôt vers une épargne porte le statut du dépôt et celui de l'affectation
    Et une opération en attente n'est jamais renvoyée comme faite, quel que soit son âge
    Et la liste est paginée, avec un filtre par type et par épargne

## C-P7 — Signaler un problème et suivre mon signalement

```gherkin
# language: fr
@client @C-P7
Fonctionnalité: Signaler un problème et suivre mon signalement
  Pour que KOTIZ regarde une opération qui ne va pas
  En tant que Fatou, cliente
  Je veux signaler depuis l'opération, sans rien retaper, et suivre le dossier

  Contexte:
    Étant donné que je suis connectée
    Et que mon dépôt Wave de 2 000 F du 17 octobre est en attente
    Et que la liste des motifs de signalement est <motifs de signalement>

  @C-P7-S1 @nominal
  Scénario: C-P7-S1 Signaler un problème de bout en bout
    Étant donné que je suis sur le détail de ce dépôt
    Quand je touche "Signaler un problème"
    Et que je choisis un motif
    Et que je touche "Envoyer"
    Alors je suis sur "Mon signalement"
    Et je vois le message d'information "Ton signalement est envoyé." et "Ce n'est pas un remboursement."
    Et je vois "Dossier n°" suivi d'une référence de dossier, distincte de celle de l'opération
    Et le statut du dossier est "Envoyé", en pastille neutre

  @C-P7-S2 @nominal
  Scénario: C-P7-S2 L'opération est reprise sans ressaisie
    Quand j'ouvre "Signaler un problème" depuis ce dépôt
    Alors je vois "Dépôt Wave · 2 000 F", sa date, sa référence et son statut "En attente"
    Et aucun de ces éléments n'est modifiable

  @C-P7-S3 @erreur
  Scénario: C-P7-S3 Le motif est requis
    Étant donné que je suis sur "Signaler un problème"
    Et que je n'ai choisi aucun motif
    Alors le bouton "Envoyer" est désactivé avec "Choisis ce qui ne va pas."
    Quand je choisis un motif
    Alors le bouton "Envoyer" est actif
    Et je vois "L'envoi ne lance aucun remboursement."

  @C-P7-S4 @interdit @a-confirmer @G03
  Scénario: C-P7-S4 Les motifs viennent de la configuration
    Quand j'ouvre "Signaler un problème"
    Alors "Qu'est-ce qui ne va pas ?" propose exactement <motifs de signalement>, une seule réponse possible
    Et aucun motif n'est écrit en dur dans l'app

  @C-P7-S5 @nominal @a-confirmer @G03
  Scénario: C-P7-S5 Un mot et une photo, facultatifs
    Étant donné que je suis sur "Signaler un problème"
    Quand je saisis un mot dans "Ajoute un mot (facultatif)"
    Et que je touche "Ajouter une photo (facultatif)" et choisis une photo
    Alors je vois "Photo ajoutée" et "Retirer"
    Quand je touche "Retirer"
    Alors la photo est retirée
    Et l'envoi reste possible sans mot ni photo

  @C-P7-S6 @erreur
  Scénario: C-P7-S6 Échec ou hors connexion : rien n'est envoyé
    Étant donné que j'ai choisi un motif et saisi un mot
    Et que je n'ai pas de connexion
    Quand je touche "Envoyer"
    Alors je vois "Rien n'est envoyé." et "Ta saisie est gardée. Réessaie."
    Et le bouton devient "Réessayer"
    Et mon motif et mon mot sont gardés

  @C-P7-S7 @nominal
  Plan du scénario: C-P7-S7 Quitter sans envoyer
    Étant donné que je suis sur "Signaler un problème" avec "<saisie>"
    Quand je touche le retour
    Alors "<résultat>"

    Exemples:
      | saisie              | résultat                                                                      |
      | un mot ou une photo | le dialogue "Quitter sans envoyer ?" s'ouvre avec "Ton mot et ta photo seront perdus.", "Rester" et "Quitter" |
      | seulement un motif  | je reviens au détail de l'opération sans dialogue                              |

  @C-P7-S8 @interdit
  Scénario: C-P7-S8 L'envoi n'est jamais présenté comme un succès ni un remboursement
    Quand mon signalement est envoyé
    Alors le message de confirmation est un message d'information, sans coche verte
    Et aucun écran n'utilise le mot "remboursé"
    Et le statut du dépôt reste "En attente"

  @C-P7-S9 @nominal
  Scénario: C-P7-S9 Retrouver mon signalement depuis l'opération
    Étant donné que j'ai envoyé un signalement sur ce dépôt
    Quand j'ouvre le détail de ce dépôt
    Alors je vois la ligne "Mon signalement · Envoyé · Dossier n°" suivie de la référence du dossier
    Et je ne vois plus "Signaler un problème"
    Quand je touche cette ligne
    Alors je suis sur "Mon signalement" du même dossier

  @C-P7-S10 @nominal @a-confirmer @G03
  Scénario: C-P7-S10 Suivre le dossier
    Étant donné que mon dossier est "En cours"
    Quand j'ouvre "Mon signalement"
    Alors je vois le fil daté "Envoyé" puis "En cours", sans vert de succès
    Et je vois "Un conseiller va regarder ton dossier."
    Et je vois "L'opération" avec son statut financier réel
    Et je vois "Ce que tu as envoyé" avec le motif, mon mot et la photo
    Et je vois "Contacter l'aide"
    Et aucun délai de traitement n'est annoncé

  @C-P7-S11 @interdit
  Scénario: C-P7-S11 « Signaler un problème » n'est jamais le bouton principal
    Quand j'ouvre le détail d'une opération faite, en attente ou échouée sans dossier
    Alors "Signaler un problème" est un bouton texte

  @C-P7-S12 @backend @a-confirmer @G03
  Scénario: C-P7-S12 Un dossier par opération, sans mouvement d'argent
    Quand un signalement est créé sur une opération
    Alors le dossier porte sa propre référence, le motif, le mot et la photo facultatifs, et l'opération liée
    Et un second signalement sur la même opération renvoie le dossier existant
    Et aucune écriture ledger n'est créée
````

## C-P8 — Contester une réponse, et correction financière

```gherkin
# language: fr
@client @C-P8
Fonctionnalité: Contester une réponse et voir une correction
  Pour ne pas rester sur une réponse qui me paraît fausse
  En tant que Fatou, cliente
  Je veux rouvrir le même dossier et voir une correction seulement quand elle est faite

  Contexte:
    Étant donné que je suis connectée
    Et que mon dossier sur le dépôt Wave de 5 000 F du 12 octobre est "Résolu" avec une réponse du conseiller

  @C-P8-S1 @nominal
  Scénario: C-P8-S1 Lire un dossier résolu
    Quand j'ouvre "Mon signalement"
    Alors je vois le statut "Résolu" en pastille neutre
    Et je vois le fil "Envoyé", "En cours", "Résolu", avec leurs dates
    Et je vois "Réponse du conseiller", la réponse et sa date
    Et je vois "Résolu ne veut pas dire remboursé."
    Et je vois le bouton secondaire "Je conteste cette réponse"

  @C-P8-S2 @nominal
  Scénario: C-P8-S2 Résolu sans correction
    Étant donné qu'aucune correction n'est liée à cette opération
    Quand j'ouvre "Mon signalement"
    Alors je vois "Aucune somme n'a été versée pour ce dossier."
    Et je ne vois pas "Voir la correction"

  @C-P8-S3 @nominal
  Scénario: C-P8-S3 Résolu avec une correction confirmée
    Étant donné qu'une correction confirmée de 1 500 F est liée au dépôt Orange Money échoué du 10 octobre
    Et que le dossier de ce dépôt est "Résolu"
    Quand j'ouvre ce dossier
    Alors je vois le lien "Voir la correction"
    Quand je touche "Voir la correction"
    Alors je vois le détail "Correction" de "+ 1 500 FCFA", "Depuis" "KOTIZ"
    Et je vois "Lié à cette opération" avec "Dépôt d'origine · 1 500 F"

  @C-P8-S4 @nominal
  Scénario: C-P8-S4 Contester rouvre le même dossier
    Étant donné que je suis sur "Mon signalement" du dossier résolu
    Quand je touche "Je conteste cette réponse"
    Alors une feuille s'ouvre avec "Tu n'es pas d'accord ?" et "Ton dossier n°" suivi de la même référence, "sera rouvert."
    Et je vois "Dis pourquoi (facultatif)" et "Ce n'est pas un remboursement."
    Quand je touche "Envoyer ma contestation"
    Alors la feuille se ferme
    Et je vois le message d'information "Ton dossier est rouvert." et "Ce n'est pas un remboursement."
    Et le statut du dossier est "En cours"
    Et le fil garde "Résolu" et ajoute "Contesté" puis "En cours"
    Et la référence du dossier n'a pas changé

  @C-P8-S5 @erreur
  Scénario: C-P8-S5 Échec de la contestation
    Étant donné que j'ai saisi un mot dans la feuille de contestation
    Et que l'envoi échoue
    Alors je vois "Rien n'est envoyé." et "Ta saisie est gardée. Réessaie."
    Et le bouton devient "Réessayer"
    Et le dossier reste "Résolu"

  @C-P8-S6 @interdit
  Scénario: C-P8-S6 « Je conteste » seulement sur un dossier résolu
    Étant donné que mon dossier est "Envoyé" ou "En cours"
    Quand j'ouvre "Mon signalement"
    Alors je ne vois pas "Je conteste cette réponse"
    Et "Je conteste cette réponse" n'est jamais un bouton principal vert

  @C-P8-S7 @interdit
  Scénario: C-P8-S7 Ni contestation ni résolution ne créent de mouvement d'argent
    Quand un dossier est résolu ou contesté
    Alors aucune nouvelle opération ni écriture n'est créée par ce seul fait
    Et aucun écran n'écrit "remboursé" pour un dossier
    Et le statut financier de l'opération d'origine ne change pas

  @C-P8-S8 @nominal
  Scénario: C-P8-S8 La correction dans Opérations
    Étant donné qu'une correction confirmée de 1 500 F est liée au dépôt du 10 octobre
    Quand j'ouvre Opérations
    Alors je vois la ligne "Correction", "Pour ton dépôt du 10 oct.", "+ 1 500 F", "Fait"
    Quand j'ouvre le dépôt d'origine
    Alors je vois "Lié à cette opération" avec "Correction · + 1 500 F" et son statut

  @C-P8-S9 @backend @interdit @a-confirmer @G01
  Scénario: C-P8-S9 Une correction n'apparaît que confirmée, liée à son origine
    Étant donné qu'une correction est en préparation pour le dépôt du 10 octobre
    Alors elle n'apparaît ni dans Opérations ni dans le détail
    Quand la correction est confirmée
    Alors elle apparaît comme une opération propre, avec son montant et le lien vers l'opération d'origine
    Et elle est écrite en contre-écritures équilibrées, sans modifier les écritures d'origine

  @C-P8-S10 @a-confirmer @G03
  Scénario: C-P8-S10 Limite de contestation
    Étant donné que la règle de contestation interdit une nouvelle contestation de ce dossier
    Quand j'ouvre "Mon signalement" du dossier résolu
    Alors "Je conteste cette réponse" est absent
    Et la raison est affichée
```

---

## Index des scénarios

| Parcours                                                                       | IDs                | Nombre  |
| ------------------------------------------------------------------------------ | ------------------ | ------- |
| C-P1 Déposer sur mon solde (avec C-00, C-17, attente, frais inconnus, accueil) | C-P1-S1 à C-P1-S44 | 44      |
| C-P2 Mettre de l'argent par Mobile Money                                       | C-P2-S1 à C-P2-S20 | 20      |
| C-P3 Mettre de l'argent depuis mon solde                                       | C-P3-S1 à C-P3-S21 | 21      |
| C-P4 Reprise (avec solde baissé, épargne fermée, B07 « Dépôt pas entré »)      | C-P4-S1 à C-P4-S21 | 21      |
| C-P5 Limite de 3 épargnes                                                      | C-P5-S1 à C-P5-S5  | 5       |
| C-P6 Opérations, détail, reçu                                                  | C-P6-S1 à C-P6-S32 | 32      |
| C-P7 Signaler et suivre                                                        | C-P7-S1 à C-P7-S12 | 12      |
| C-P8 Contester, correction                                                     | C-P8-S1 à C-P8-S10 | 10      |
| **Total**                                                                      |                    | **165** |

**Interdits couverts**

- Frais : jamais inventés, autorisation bloquée tant qu'ils sont inconnus, côté app et serveur : C-P1-S19, C-P1-S20, C-P1-S44, C-P6-S19. Mise de côté sans frais : C-P3-S7, C-P3-S21.
- Aucun PIN KOTIZ pour le dépôt, la mise de côté et la reprise ; jamais le code Mobile Money : C-P1-S21, C-P3-S7, C-P4-S4.
- Numéro vérifié seul, non modifiable : C-P1-S10.
- Destination fixée à l'entrée (PNV-1 refusée) ; « Dernier dépôt » sans destination (PNV-2 refusée) : C-P2-S16, C-P2-S17.
- Attente ≠ succès ; aucun « Fait » ni « J'ai validé » pendant l'attente ; résultat jamais déduit d'un message externe : C-P1-S27, C-P1-S31, C-P1-S34, C-P1-S41, C-P3-S16, C-P3-S17.
- Pas de « Réessayer » sur un résultat inconnu : C-P1-S31, C-P3-S17, C-P2-S12, C-P4-S20.
- Un dépôt fait n'est jamais « Échoué » à cause de l'épargne : C-P2-S15, C-P4-S1, C-P4-S17.
- Reprise = l'affectation seule, jamais un nouveau dépôt ni plus que le dépôt d'origine : C-P4-S4, C-P4-S9, C-P4-S21.
- Épargne fermée : pas de réouverture, pas de redirection ni de mise de côté automatique : C-P2-S10, C-P4-S13, C-P5-S2.
- 3 épargnes actives : pas de « Créer », texte sans lien, aucune fermeture à la place de la cliente : C-P5-S1.
- Résultats en plein écran, retour jamais vers la saisie : C-P1-S32, C-P1-S38, C-P3-S15, C-P3-S19.
- Jamais de reçu pour une opération non faite ; reçu d'un partiel sans « Fait » global ; pas de partage : C-P6-S15, C-P6-S24, C-P6-S25, C-P6-S26.
- Signe « + » seulement quand c'est fait ; mouvement interne qui ne ressemble pas à un apport : C-P6-S4, C-P4-S17.
- Résolu ≠ Remboursé ; envoi et contestation sans succès vert ni mouvement d'argent : C-P7-S8, C-P8-S1, C-P8-S2, C-P8-S7, C-P8-S9.
- Masquage unique, jamais lu par TalkBack ; chargement sans zéro : C-P6-S11, C-P6-S13, C-P6-S21, C-P6-S31.
- Aucun doublon : C-P1-S24, C-P1-S43, C-P3-S13, C-P3-S21, C-P4-S21.
