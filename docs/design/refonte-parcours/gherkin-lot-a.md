# Gherkin — Refonte des parcours, lot A : accès et accueil

Date : 19 octobre 2026. Statut : dérivé du lot A validé par le PO le 19 octobre 2026.
Sources : [handoff-lot-a.md](handoff-lot-a.md) (critères d'acceptation, textes exacts), [ux-spec-lot-a.md](ux-spec-lot-a.md), [screens.md § Validation](screens.md#validation), [prototype](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF). Rattachement aux issues : [issues-lot-a.md](issues-lot-a.md).

## Mode d'emploi

- Langue Gherkin : français (`# language: fr`). Mots-clés : Fonctionnalité, Contexte, Scénario, Plan du scénario, Exemples, Étant donné, Quand, Alors, Et, Mais.
- **IDs stables** : `A-Pn-Sm` (lot A, parcours n, scénario m), repris en tag `@A-Pn-Sm`. Un ID n'est jamais réutilisé ; un scénario retiré garde son ID barré dans ce fichier.
- **Tags** : `@nominal`, `@erreur`, `@interdit` (règle qui ne doit jamais être violée), `@a-confirmer` (le scénario dépend d'un paramètre non tranché), `@G01` `@G02` `@G03` (gate concerné), `@client` / `@agent` (variant d'app), `@backend` (vérifiable au niveau API).
- **Paramètres non tranchés** : écrits entre chevrons (`<longueur du code>`, `<délai avant renvoi>`, `<longueur du PIN>`…). Ils sont lus dans la configuration du test ; **aucune valeur de démonstration du prototype n'est une règle** (15 s, code « ≥ 4 chiffres », 0000 / 9999, PIN 2468). Les données d'exemple (07 08 12 34 56, Fatou Koné, montants) sont fictives.
- Utilisation : `/implement-ticket` ou `/implement-spec` reprend les scénarios de l'issue visée (voir la table de rattachement de [issues-lot-a.md](issues-lot-a.md)) **avant** le code ; chaque scénario devient un test d'acceptation à la frontière la plus haute possible (écran pour `@client` / `@agent`, API pour `@backend`).

---

## P1 — Inscription autonome

```gherkin
# language: fr
@client @P1
Fonctionnalité: Inscription autonome
  Pour mettre mon argent de côté sans dépendre d'une personne
  En tant que Fatou, nouvelle cliente
  Je veux créer mon compte KOTIZ seule sur mon téléphone

  Contexte:
    Étant donné que le numéro "07 08 12 34 56" n'a ni compte ni fiche
    Et que la configuration fixe la longueur du code SMS à <longueur du code>
    Et que la configuration fixe la longueur du PIN à <longueur du PIN>

  @A-P1-S1 @nominal
  Scénario: A-P1-S1 Créer son compte de bout en bout
    Étant donné que j'ouvre KOTIZ pour la première fois
    Et que je vois l'écran "Bienvenue"
    Quand je touche "Créer mon compte"
    Et que je saisis le numéro "0708123456"
    Et que je touche "Recevoir le code"
    Et que je saisis le code reçu par SMS
    Et que je touche "Valider"
    Et que je saisis "Fatou Koné" dans "Prénom et nom"
    Et que je touche "Continuer"
    Et que je coche chaque accord
    Et que je touche "J'accepte et je continue"
    Et que je crée un PIN puis le saisis une seconde fois à l'identique
    Alors je vois "C'est fait, Fatou !"
    Et je vois "Ton compte est créé."
    Et le seul bouton principal est "Créer mon épargne"

  @A-P1-S2 @nominal
  Plan du scénario: A-P1-S2 L'indicateur d'étape suit l'inscription
    Étant donné que je suis en train de créer mon compte
    Quand j'arrive sur l'écran "<écran>"
    Alors l'en-tête affiche "<étape>"

    Exemples:
      | écran           | étape         |
      | Ton numéro      | Étape 1 sur 5 |
      | Ton code SMS    | Étape 2 sur 5 |
      | Ton nom         | Étape 3 sur 5 |
      | Tes accords     | Étape 4 sur 5 |
      | Crée ton PIN    | Étape 5 sur 5 |

  @A-P1-S3 @nominal
  Scénario: A-P1-S3 Le numéro collé est normalisé
    Étant donné que je suis sur l'écran "Ton numéro"
    Quand je colle "+225 07 08 12 34 56"
    Alors le champ affiche "07 08 12 34 56"
    Et le bouton "Recevoir le code" est actif

  @A-P1-S4 @erreur
  Scénario: A-P1-S4 Numéro incomplet
    Étant donné que je suis sur l'écran "Ton numéro"
    Quand je saisis "070812"
    Alors je vois "Il faut 10 chiffres."
    Et le bouton "Recevoir le code" est désactivé

  @A-P1-S5 @erreur
  Scénario: A-P1-S5 Pas de connexion à l'envoi du code
    Étant donné que je suis sur l'écran "Ton numéro" avec un numéro valide
    Et que le téléphone n'a pas de connexion
    Quand je touche "Recevoir le code"
    Alors je vois "Pas de connexion."
    Et je vois "Ta saisie est gardée."
    Et le numéro saisi est toujours affiché
    Et le bouton principal est "Réessayer"
    Et l'écran "Ton code SMS" ne s'ouvre pas

  @A-P1-S6 @erreur
  Scénario: A-P1-S6 Double appui sur "Recevoir le code"
    Étant donné que je suis sur l'écran "Ton numéro" avec un numéro valide
    Quand je touche deux fois de suite "Recevoir le code"
    Alors le bouton affiche "Envoi du code…"
    Et un seul SMS est demandé

  @A-P1-S7 @erreur
  Scénario: A-P1-S7 Code SMS incorrect
    Étant donné que je suis sur l'écran "Ton code SMS"
    Quand je saisis un code qui ne correspond pas
    Et que je touche "Valider"
    Alors je vois "Ce code ne marche pas. Vérifie le SMS."
    Et je reste sur l'écran "Ton code SMS"

  @A-P1-S8 @erreur @a-confirmer @G02
  Scénario: A-P1-S8 Code SMS expiré
    Étant donné que je suis sur l'écran "Ton code SMS"
    Et que le code reçu a dépassé <durée de validité du code>
    Quand je le saisis et touche "Valider"
    Alors je vois "Ce code n'est plus valable. Demande un nouveau code."

  @A-P1-S9 @nominal @a-confirmer @G02
  Scénario: A-P1-S9 Valider reste inactif tant que le code est incomplet
    Étant donné que je suis sur l'écran "Ton code SMS"
    Quand je saisis un code plus court que <longueur du code>
    Alors le bouton "Valider" est désactivé
    Et la vérification ne démarre pas toute seule quand le code est complet

  @A-P1-S10 @nominal @a-confirmer @G02
  Scénario: A-P1-S10 Renvoyer le code après le délai
    Étant donné que je suis sur l'écran "Ton code SMS"
    Alors je vois "Renvoyer le code dans" suivi du temps restant en secondes
    Quand <délai avant renvoi> est écoulé
    Et que je touche "Renvoyer le code"
    Alors je vois "Nouveau code envoyé."

  @A-P1-S11 @nominal
  Scénario: A-P1-S11 Corriger le numéro depuis l'écran du code
    Étant donné que je suis sur l'écran "Ton code SMS" pour le numéro "07 08 12 34 57"
    Quand je touche "Modifier"
    Alors je suis sur l'écran "Ton numéro" avec "07 08 12 34 57" pré-rempli
    Quand je corrige en "07 08 12 34 56" et touche "Recevoir le code"
    Alors un nouveau code est envoyé au "07 08 12 34 56"
    Et le code envoyé au "07 08 12 34 57" n'est plus accepté

  @A-P1-S12 @nominal @G03
  Scénario: A-P1-S12 Je n'ai pas reçu le code
    Étant donné que je suis sur l'écran "Ton code SMS"
    Quand je touche "Je n'ai pas reçu le code"
    Alors une feuille "Pas de SMS ?" s'ouvre
    Et elle affiche mon numéro avec "Modifier"
    Et elle propose "Renvoyer le code" et "Contacter l'aide"
    Quand je touche "Fermer"
    Alors je suis sur l'écran "Ton code SMS"

  @A-P1-S13 @nominal
  Scénario: A-P1-S13 L'écran du code n'a qu'une entrée d'aide
    Étant donné que je suis sur l'écran "Ton code SMS"
    Alors je ne vois pas "Besoin d'aide ?"
    Et je vois "Je n'ai pas reçu le code"

  @A-P1-S14 @erreur
  Scénario: A-P1-S14 Nom vide
    Étant donné que je suis sur l'écran "Ton nom"
    Quand le champ "Prénom et nom" est vide
    Alors le bouton "Continuer" est désactivé

  @A-P1-S15 @nominal
  Scénario: A-P1-S15 Nom long avec apostrophe
    Étant donné que je suis sur l'écran "Ton nom"
    Quand je saisis "Adjoua Marie-Christine N'Guessan Kouassi"
    Alors le nom est affiché en entier, sur plusieurs lignes si besoin
    Et le bouton "Continuer" est actif

  @A-P1-S16 @erreur
  Scénario: A-P1-S16 Accords incomplets
    Étant donné que je suis sur l'écran "Tes accords"
    Quand je coche un seul accord
    Alors le bouton "J'accepte et je continue" est désactivé
    Et je vois "Coche chaque case pour continuer."

  @A-P1-S17 @nominal @a-confirmer @G01
  Scénario: A-P1-S17 Lire un accord sans perdre ses cases
    Étant donné que je suis sur l'écran "Tes accords" avec le premier accord coché
    Quand je touche "Lire" sur le second accord
    Alors je vois le texte complet de cet accord
    Quand je reviens
    Alors le premier accord est toujours coché

  @A-P1-S18 @backend @a-confirmer @G01
  Scénario: A-P1-S18 Chaque accord est enregistré séparément
    Étant donné que la configuration liste <accords obligatoires> avec leur version
    Quand j'accepte tous les accords et que mon compte est créé
    Alors un consentement est enregistré pour chaque accord, avec sa version et sa date

  @A-P1-S19 @erreur
  Scénario: A-P1-S19 Les deux PIN ne sont pas pareils
    Étant donné que j'ai créé un PIN sur l'écran "Crée ton PIN"
    Quand je saisis un PIN différent sur l'écran "Écris-le encore une fois"
    Alors je suis sur l'écran "Crée ton PIN" avec les cases vides
    Et je vois "Les deux codes ne sont pas pareils. Recommence."
    Et je vois toujours "Ne le montre à personne, même à une agente."

  @A-P1-S20 @nominal
  Scénario: A-P1-S20 Passage automatique à la confirmation du PIN
    Étant donné que je suis sur l'écran "Crée ton PIN"
    Quand je saisis le dernier chiffre de mon PIN
    Alors l'écran "Écris-le encore une fois" s'ouvre sans que je touche un bouton

  @A-P1-S21 @interdit
  Scénario: A-P1-S21 Aucun succès pendant la création du compte
    Étant donné que j'ai confirmé mon PIN
    Quand la création de mon compte est en cours
    Alors je vois "Création de ton compte…"
    Et je ne vois ni "C'est fait", ni coche, ni illustration, ni couleur de succès
    Et l'écran "Compte créé" ne s'affiche qu'après la confirmation du serveur

  @A-P1-S22 @erreur @interdit
  Scénario: A-P1-S22 Résultat inconnu à la création
    Étant donné que j'ai confirmé mon PIN
    Quand la réponse du serveur n'arrive pas avant <délai d'expiration de la création>
    Alors je vois le statut "En attente"
    Et je vois "On vérifie ton compte"
    Et je vois "Ne crée pas un second compte."
    Et je vois les étapes "Demande envoyée" Fait, "Vérification" En attente, "Compte confirmé" Pas encore
    Et je ne vois pas "C'est fait"
    Quand je touche "Vérifier à nouveau"
    Alors l'app interroge l'état de la création
    Et aucun second compte n'est créé

  @A-P1-S23 @erreur
  Scénario: A-P1-S23 Échec de la création
    Étant donné que j'ai confirmé mon PIN
    Quand le serveur répond que la création a échoué
    Alors je vois le statut "Échoué"
    Et je vois "Ton compte n'est pas créé"
    Et je vois "Rien n'a été créé. Tu peux réessayer maintenant."
    Et je vois "Réessayer"
    Et je ne vois aucune illustration

  @A-P1-S24 @backend @interdit
  Scénario: A-P1-S24 Réessayer la création ne crée jamais deux comptes
    Étant donné qu'une demande de création de compte a été envoyée avec une clé d'idempotence
    Quand la même demande est renvoyée avec la même clé
    Alors le serveur renvoie le même résultat
    Et un seul compte existe pour ce numéro

  @A-P1-S25 @interdit @G02
  Scénario: A-P1-S25 Aucune divulgation avant un code SMS valide
    Étant donné que le numéro "07 08 12 34 56" a déjà un compte actif
    Quand je saisis ce numéro et touche "Recevoir le code"
    Alors l'app affiche l'écran "Ton code SMS" comme pour un numéro sans compte
    Et aucun texte, délai ou code de réponse ne révèle que ce numéro a un compte
    Quand je saisis un code incorrect
    Alors le message est "Ce code ne marche pas. Vérifie le SMS." comme pour un numéro sans compte

  @A-P1-S26 @interdit
  Scénario: A-P1-S26 Les secrets ne sont jamais conservés
    Étant donné que je saisis mon PIN sur l'écran "Crée ton PIN"
    Alors aucun chiffre n'est affiché dans les cases
    Et le PIN n'est écrit ni dans le stockage du téléphone ni dans les journaux de l'app ou du serveur
    Et le code SMS n'est écrit dans aucun journal

  @A-P1-S27 @nominal @a-confirmer @G02
  Scénario: A-P1-S27 Reprise après interruption pendant l'inscription
    Étant donné que j'ai validé mon code SMS et saisi mon nom
    Et que l'app est fermée sur l'écran "Crée ton PIN"
    Quand je rouvre KOTIZ sur le même téléphone dans <durée de conservation de l'étape>
    Alors je reprends à l'étape PIN
    Et les cases du PIN sont vides

  @A-P1-S28 @nominal @a-confirmer @G01
  Scénario: A-P1-S28 Règles de nom refusées
    Étant donné que je suis sur l'écran "Ton nom"
    Quand je saisis un nom qui enfreint <règles de nom du partenaire>
    Alors je vois une phrase qui dit quoi corriger sous le champ
    Et le bouton "Continuer" est désactivé
```

## P2 — Cliente accompagnée sur son téléphone

```gherkin
# language: fr
@client @P2
Fonctionnalité: Inscription accompagnée par une agente
  Pour être aidée sans exposer mes secrets
  En tant que cliente accompagnée par une agente
  Je veux créer mon compte sur mon propre téléphone en saisissant moi-même mes secrets

  @A-P2-S1 @nominal
  Scénario: A-P2-S1 Même parcours que l'inscription autonome
    Étant donné qu'une agente m'explique KOTIZ à côté de moi
    Quand je crée mon compte sur mon téléphone
    Alors je passe par les mêmes écrans que l'inscription autonome, dans le même ordre
    Et aucun écran ne demande si une agente est présente

  @A-P2-S2 @interdit
  Plan du scénario: A-P2-S2 La mention de secret est sur chaque écran à secret
    Quand j'arrive sur l'écran "<écran>"
    Alors je vois "Ne le montre à personne, même à une agente."

    Exemples:
      | écran                    |
      | Ton code SMS             |
      | Crée ton PIN             |
      | Écris-le encore une fois |

  @A-P2-S3 @interdit @agent @backend
  Scénario: A-P2-S3 Aucun secret ne passe par l'agente
    Étant donné une agente connectée à l'app agente
    Quand une cliente crée son compte avec son aide
    Alors l'app agente n'affiche aucun champ de code SMS, de PIN ou de consentement de la cliente
    Et aucune API accessible à l'agente ne reçoit ni ne renvoie le code SMS, le PIN ou les consentements de la cliente

  @A-P2-S4 @interdit @backend
  Scénario: A-P2-S4 L'accompagnement ne crée aucun rattachement
    Étant donné qu'une cliente a créé son compte avec l'aide d'une agente
    Alors aucun rattachement entre la cliente et l'agente n'est créé
    Et l'agente n'a aucun accès au solde ni aux opérations de la cliente
```

## P3 — Agente : Ajouter une cliente

```gherkin
# language: fr
@agent @P3
Fonctionnalité: Créer la fiche d'une cliente depuis l'app agente
  Pour démarrer proprement l'inscription d'une cliente
  En tant qu'agente KOTIZ
  Je veux créer sa fiche sans agir à sa place

  Contexte:
    Étant donné que je suis une agente connectée à l'app agente
    Et que je suis sur l'écran "Ajouter une cliente"

  @A-P3-S1 @nominal @a-confirmer @G02
  Scénario: A-P3-S1 Créer une fiche avec les champs facultatifs vides
    Quand je saisis "Fatou Koné" dans "Nom complet"
    Et que je saisis "0708123456" dans "Téléphone"
    Et que je laisse "Activité (facultatif)" et "Localisation (facultatif)" vides
    Et que je touche "Continuer"
    Alors je suis sur l'écran "Vérifie la fiche"
    Et je vois "Fatou Koné" et "+225 07 08 12 34 56"
    Et je ne vois ni "Activité" ni "Lieu"
    Et je vois "Ce qui va se passer"
    Et je vois "Tu ne vois pas son argent."
    Quand je touche "Créer la fiche"
    Alors je vois "Fiche créée"
    Et la ligne "Fiche" affiche "Créée"
    Et la ligne "Accès à l'app" affiche "Pas encore activé"
    Et la ligne "Invitation SMS" affiche "Envoyée", "Pas partie" ou "En attente" selon <résultat de l'envoi de l'invitation>

  @A-P3-S2 @nominal
  Scénario: A-P3-S2 Activité et lieu renseignés apparaissent au récapitulatif
    Quand je remplis tous les champs dont "Vente de pagnes" et "Marché d'Adjamé"
    Et que je touche "Continuer"
    Alors je vois "Activité" "Vente de pagnes" et "Lieu" "Marché d'Adjamé"

  @A-P3-S3 @nominal
  Scénario: A-P3-S3 Modifier depuis le récapitulatif garde la saisie
    Étant donné que je suis sur l'écran "Vérifie la fiche"
    Quand je touche "Modifier"
    Alors je suis sur l'écran "Ajouter une cliente" avec ma saisie conservée

  @A-P3-S4 @erreur
  Scénario: A-P3-S4 Numéro incomplet
    Quand je saisis "070812" dans "Téléphone"
    Alors je vois "Il faut 10 chiffres."
    Et le bouton "Continuer" est désactivé

  @A-P3-S5 @erreur @interdit @G03
  Scénario: A-P3-S5 Numéro déjà connu, sans aucune divulgation
    Étant donné que le numéro "07 08 12 34 56" a déjà un compte ou une fiche
    Quand je saisis ce numéro et touche "Continuer"
    Alors je vois "Ce numéro a déjà un compte. Demande à la cliente ou contacte l'aide."
    Et je vois "Contacter l'aide"
    Et je ne vois aucune donnée de la fiche ou du compte existant
    Et aucun bouton ne permet d'ouvrir la fiche existante
    Et aucune fiche n'est créée
    Et aucun rattachement n'est créé

  @A-P3-S6 @erreur
  Scénario: A-P3-S6 Échec de création de la fiche
    Étant donné que je suis sur l'écran "Vérifie la fiche"
    Quand je touche "Créer la fiche" et que le serveur répond par une erreur
    Alors je vois "La fiche n'est pas créée."
    Et le bouton principal est "Réessayer"
    Et ma saisie est conservée

  @A-P3-S7 @backend @interdit
  Scénario: A-P3-S7 Réessayer ne crée jamais deux fiches
    Étant donné qu'une demande de création de fiche a été envoyée avec une clé d'idempotence
    Quand la même demande est renvoyée avec la même clé
    Alors une seule fiche existe pour ce numéro

  @A-P3-S8 @erreur
  Scénario: A-P3-S8 Numéro devenu doublon entre la saisie et la création
    Étant donné que je suis sur l'écran "Vérifie la fiche"
    Et qu'un compte a été créé entre-temps pour ce numéro
    Quand je touche "Créer la fiche"
    Alors je suis sur l'écran "Ajouter une cliente"
    Et je vois "Ce numéro a déjà un compte. Demande à la cliente ou contacte l'aide."

  @A-P3-S9 @nominal @a-confirmer @G02
  Scénario: A-P3-S9 Renvoyer une invitation qui n'est pas partie
    Étant donné que je suis sur l'écran "Fiche créée"
    Et que la ligne "Invitation SMS" affiche "Pas partie"
    Alors je vois "Renvoyer l'invitation"
    Quand je touche "Renvoyer l'invitation" dans le respect de <règles de renvoi de l'invitation>
    Alors la ligne "Invitation SMS" affiche "En attente"

  @A-P3-S10 @nominal
  Scénario: A-P3-S10 Pas de renvoi quand l'invitation est partie
    Étant donné que je suis sur l'écran "Fiche créée"
    Et que la ligne "Invitation SMS" affiche "Envoyée"
    Alors je ne vois pas "Renvoyer l'invitation"

  @A-P3-S11 @interdit
  Scénario: A-P3-S11 La fiche ne donne aucun accès à l'agente
    Étant donné que je viens de créer la fiche de Fatou Koné
    Alors aucun écran ne me propose d'ouvrir la session de la cliente
    Et aucun écran ne m'affiche son solde
    Et l'écran "Ajouter une cliente" n'a aucun champ PIN, code SMS ou pièce d'identité

  @A-P3-S12 @interdit
  Scénario: A-P3-S12 Aucune géolocalisation automatique
    Quand je remplis "Localisation (facultatif)"
    Alors c'est un texte libre
    Et l'app ne demande pas l'accès à la position du téléphone
```

## P4 — Activation personnelle

```gherkin
# language: fr
@client @P4
Fonctionnalité: Activer son accès après une fiche créée par une agente
  Pour utiliser KOTIZ sans que l'agente agisse à ma place
  En tant que cliente inscrite par une agente
  Je veux activer mon accès moi-même sur mon téléphone

  Contexte:
    Étant donné qu'une agente a créé une fiche "Fatou Koné" pour le numéro "07 08 12 34 56"
    Et que l'accès à l'app de cette fiche n'est pas activé

  @A-P4-S1 @nominal
  Scénario: A-P4-S1 Activer son accès de bout en bout
    Étant donné que j'ouvre KOTIZ
    Quand je touche "Créer mon compte"
    Et que je saisis le numéro "0708123456" et le code reçu par SMS
    Alors je suis sur l'écran "Tes accords"
    Et je vois le message d'information "Une agente a préparé ta fiche" avec "Fatou Koné"
    Et l'en-tête affiche "Étape 4 sur 5"
    Et l'écran "Ton nom" n'a pas été affiché
    Quand je coche chaque accord et touche "J'accepte et je continue"
    Et que je crée et confirme mon PIN
    Alors je vois "C'est fait, Fatou !"
    Et je vois "Ton accès est activé."
    Et le seul bouton principal est "Créer mon épargne"

  @A-P4-S2 @interdit
  Scénario: A-P4-S2 Aucun succès avant la fin de l'activation
    Quand j'arrive sur l'écran "Tes accords" en activation
    Alors le message sur la fiche est un message d'information
    Et je ne vois ni coche de succès ni "C'est fait" avant la confirmation de l'activation

  @A-P4-S3 @nominal @G03
  Scénario: A-P4-S3 Ce n'est pas moi
    Étant donné que je suis sur l'écran "Tes accords" en activation
    Quand je touche "Ce n'est pas moi"
    Alors j'arrive sur l'aide
    Et l'accès de la fiche reste non activé

  @A-P4-S4 @interdit @backend
  Scénario: A-P4-S4 L'invitation seule n'active rien
    Étant donné que le SMS d'invitation a été envoyé
    Mais que la cliente n'a validé ni code SMS, ni accords, ni PIN
    Alors l'accès à l'app de la fiche est toujours "Pas encore activé"

  @A-P4-S5 @nominal
  Scénario: A-P4-S5 Même résultat en passant par "Me connecter"
    Étant donné que j'ouvre KOTIZ
    Quand je touche "Me connecter"
    Et que je saisis le numéro "0708123456" et le code reçu par SMS
    Alors je suis sur l'écran "Tes accords" en activation

  @A-P4-S6 @interdit @G02
  Scénario: A-P4-S6 Le nom de la fiche n'apparaît qu'après le code SMS
    Quand je saisis le numéro "0708123456" sur l'écran "Ton numéro"
    Alors aucun écran avant la validation du code n'affiche "Fatou Koné"

  @A-P4-S7 @backend
  Scénario: A-P4-S7 L'activation est visible côté agente
    Quand la cliente a terminé son activation
    Alors la fiche indique un accès à l'app activé
```

## P5 — Connexion sur le téléphone habituel

```gherkin
# language: fr
@client @P5
Fonctionnalité: Se connecter sur son téléphone habituel
  Pour accéder vite à mon argent
  En tant que cliente avec un compte actif
  Je veux ouvrir mon compte avec mon PIN

  Contexte:
    Étant donné que j'ai un compte actif au nom de "Fatou Koné"
    Et que ce téléphone est reconnu pour mon compte

  @A-P5-S1 @nominal @a-confirmer @G02
  Scénario: A-P5-S1 Ouvrir son compte avec le PIN
    Quand j'ouvre KOTIZ
    Alors je vois "Akwaba, Fatou"
    Et je vois mon numéro masqué "07 •• •• •• 56"
    Et je vois "Entre ton PIN"
    Quand je saisis mon PIN
    Alors je vois "Vérification…"
    Et j'arrive sur l'accueil

  @A-P5-S2 @erreur @a-confirmer @G02
  Scénario: A-P5-S2 PIN incorrect
    Étant donné que je suis sur l'écran PIN
    Quand je saisis un PIN incorrect
    Alors je vois "PIN incorrect. Réessaie."
    Et les cases du PIN sont vidées
    Et le nombre d'essais restants n'est affiché que si <règle d'essais> est configurée

  @A-P5-S3 @nominal
  Scénario: A-P5-S3 PIN oublié
    Étant donné que je suis sur l'écran PIN
    Quand je touche "PIN oublié ?"
    Alors j'arrive sur la récupération d'accès

  @A-P5-S4 @nominal
  Scénario: A-P5-S4 Utiliser un autre numéro sur un téléphone partagé
    Étant donné que je suis sur l'écran PIN
    Quand je touche "Utiliser un autre numéro"
    Alors je suis sur l'écran "Bienvenue"

  @A-P5-S5 @erreur
  Scénario: A-P5-S5 Pas de connexion à la vérification du PIN
    Étant donné que le téléphone n'a pas de connexion
    Quand je saisis mon PIN
    Alors je vois "Pas de connexion. Réessaie quand tu captes."
    Et l'accueil ne s'ouvre pas

  @A-P5-S6 @erreur @a-confirmer @G02
  Scénario: A-P5-S6 Trop d'essais de PIN
    Étant donné que j'ai atteint <nombre maximal d'essais de PIN>
    Quand je saisis encore un PIN
    Alors l'accès est bloqué selon <règle de blocage>
    Et le message indique la suite à donner sans annoncer de durée non configurée
```

## P6 — Connexion sur un nouveau téléphone

```gherkin
# language: fr
@client @P6
Fonctionnalité: Se connecter sur un nouveau téléphone
  Pour retrouver mon compte après un changement de téléphone
  En tant que cliente avec un compte actif
  Je veux me connecter avec mon numéro, un code SMS et mon PIN

  @A-P6-S1 @nominal
  Scénario: A-P6-S1 Se connecter sur un nouveau téléphone
    Étant donné que j'ai un compte actif pour le numéro "07 08 12 34 56"
    Et que ce téléphone n'est pas reconnu
    Quand j'ouvre KOTIZ
    Alors je vois l'écran "Bienvenue"
    Quand je touche "Me connecter"
    Et que je saisis le numéro "0708123456" et le code reçu par SMS
    Alors je suis sur l'écran "Ton PIN"
    Quand je saisis mon PIN
    Alors j'arrive sur l'accueil

  @A-P6-S2 @nominal
  Scénario: A-P6-S2 Pas d'indicateur d'étape en connexion
    Étant donné que j'ai touché "Me connecter"
    Alors les écrans "Ton numéro" et "Ton code SMS" n'affichent aucun "Étape n sur 5"

  @A-P6-S3 @interdit
  Scénario: A-P6-S3 Le code SMS seul n'ouvre jamais le compte
    Étant donné que j'ai validé un code SMS correct pour un compte actif
    Alors l'accueil ne s'ouvre pas
    Et le PIN est demandé

  @A-P6-S4 @nominal @a-confirmer @G02
  Scénario: A-P6-S4 Aucun compte à ce numéro
    Étant donné que le numéro "07 01 02 03 04" n'a ni compte ni fiche
    Quand je me connecte avec ce numéro et le code reçu par SMS
    Alors je vois "Aucun compte avec ce numéro"
    Et je vois "07 01 02 03 04"
    Et je vois "C'est bien ton numéro ?"
    Quand je touche "Créer mon compte"
    Alors je suis sur l'écran "Ton nom" sans recevoir de nouveau code

  @A-P6-S5 @nominal
  Scénario: A-P6-S5 Corriger le numéro depuis "Aucun compte"
    Étant donné que je suis sur l'écran "Aucun compte avec ce numéro"
    Quand je touche "Utiliser un autre numéro"
    Alors je suis sur l'écran "Ton numéro"

  @A-P6-S6 @nominal
  Scénario: A-P6-S6 J'ai changé de numéro
    Étant donné que je suis sur l'écran "Aucun compte avec ce numéro"
    Quand je touche "J'ai changé de numéro"
    Alors j'arrive sur la récupération d'accès

  @A-P6-S7 @interdit @a-confirmer @G02
  Scénario: A-P6-S7 Aucune affirmation sur les anciennes sessions
    Quand je me connecte sur un nouveau téléphone
    Alors aucun message n'affirme que la session de l'autre téléphone est fermée, tant que <traitement des anciennes sessions> n'est pas confirmé
```

## P7 — Numéro déjà inscrit

```gherkin
# language: fr
@client @P7
Fonctionnalité: Tenter de créer un compte avec un numéro déjà inscrit
  Pour ne jamais avoir deux comptes
  En tant que cliente qui a déjà un compte
  Je veux être guidée vers mon compte existant

  Contexte:
    Étant donné que le numéro "07 08 12 34 56" a déjà un compte actif

  @A-P7-S1 @nominal
  Scénario: A-P7-S1 Être guidée vers la connexion
    Quand je touche "Créer mon compte"
    Et que je saisis le numéro "0708123456" et le code reçu par SMS
    Alors je vois "Ce numéro a déjà un compte"
    Et je vois "07 08 12 34 56"
    Et je vois "Connecte-toi avec ton PIN."
    Quand je touche "Me connecter"
    Alors je suis sur l'écran "Ton PIN"

  @A-P7-S2 @interdit
  Scénario: A-P7-S2 Aucune information du compte n'est affichée
    Étant donné que je suis sur l'écran "Ce numéro a déjà un compte"
    Alors je ne vois ni nom, ni solde, ni statut d'identité, ni autre donnée du compte

  @A-P7-S3 @nominal
  Scénario: A-P7-S3 Récupérer mon accès
    Étant donné que je suis sur l'écran "Ce numéro a déjà un compte"
    Quand je touche "Récupérer mon accès"
    Alors j'arrive sur la récupération d'accès

  @A-P7-S4 @nominal
  Scénario: A-P7-S4 Utiliser un autre numéro
    Étant donné que je suis sur l'écran "Ce numéro a déjà un compte"
    Quand je touche "Utiliser un autre numéro"
    Alors je suis sur l'écran "Ton numéro"

  @A-P7-S5 @interdit @backend
  Scénario: A-P7-S5 Aucun second compte possible
    Quand une création de compte est demandée pour "07 08 12 34 56"
    Alors le serveur refuse la création
    Et un seul compte existe pour ce numéro

  @A-P7-S6 @a-confirmer @G01 @G02
  Scénario: A-P7-S6 Compte fermé ou suspendu
    Étant donné que le compte du numéro est <état fermé ou suspendu>
    Quand je valide le code SMS en inscription
    Alors l'app suit <traitement du compte fermé ou suspendu>
```

## P8 — Compte créé et ses trois sorties

```gherkin
# language: fr
@client @P8
Fonctionnalité: Choisir la suite après la création du compte
  Pour commencer à mon rythme
  En tant que cliente qui vient de créer son compte
  Je veux choisir entre créer une épargne, déposer ou plus tard, sans obligation

  Contexte:
    Étant donné que la création de mon compte vient d'être confirmée
    Et que je suis sur l'écran "C'est fait, Fatou !"

  @A-P8-S1 @nominal
  Scénario: A-P8-S1 Trois sorties, un seul bouton principal
    Alors le seul bouton principal est "Créer mon épargne"
    Et "Faire mon premier dépôt" est un bouton texte
    Et "Plus tard" est un lien en haut à droite
    Et l'écran n'a pas de bouton de retour

  @A-P8-S2 @nominal
  Scénario: A-P8-S2 Plus tard ouvre l'accueil vide
    Quand je touche "Plus tard"
    Alors j'arrive sur l'accueil
    Et je vois "0 FCFA"

  @A-P8-S3 @interdit
  Scénario: A-P8-S3 Le retour Android ne ramène jamais au PIN
    Quand j'appuie sur le retour Android
    Alors j'arrive sur l'accueil
    Et l'écran PIN ne s'ouvre pas

  @A-P8-S4 @nominal
  Scénario: A-P8-S4 Créer mon épargne
    Quand je touche "Créer mon épargne"
    Alors j'arrive sur la création d'épargne (lot B)

  @A-P8-S5 @nominal
  Scénario: A-P8-S5 Faire mon premier dépôt
    Quand je touche "Faire mon premier dépôt"
    Alors j'arrive sur le dépôt (lot C)

  @A-P8-S6 @interdit
  Scénario: A-P8-S6 Le prénom affiché est celui saisi
    Étant donné que j'ai saisi "Awa Traoré" à l'étape du nom
    Alors je vois "C'est fait, Awa !"
    Et je ne vois jamais un prénom par défaut
```

## P9 — Accueil : vide, rempli, montants masqués

```gherkin
# language: fr
@client @P9
Fonctionnalité: Voir ce que j'ai sur l'accueil
  Pour savoir ce que je peux utiliser tout de suite
  En tant que cliente connectée
  Je veux un accueil lisible, et pouvoir cacher mes montants

  @A-P9-S1 @nominal
  Scénario: A-P9-S1 Accueil vide
    Étant donné un compte sans épargne ni opération
    Quand j'arrive sur l'accueil
    Alors je vois "Solde disponible" et "0 FCFA"
    Et le raccourci "Retirer" est désactivé avec "Rien à retirer pour l'instant."
    Et je vois "Pas encore d'épargne." et "Créer une épargne"
    Et je vois "Tes opérations s'afficheront ici."

  @A-P9-S2 @nominal
  Scénario: A-P9-S2 Accueil rempli
    Étant donné un compte avec un solde disponible de 12400 FCFA
    Et deux épargnes "École Awa" (45000 sur 100000) et "Boutique" (8000 sur 100000)
    Quand j'arrive sur l'accueil
    Alors je vois "12 400" et "FCFA" sous "Solde disponible"
    Et je vois "École Awa" avec "45 000 F sur 100 000 F" et une barre de progression
    Et je ne vois aucun pourcentage d'épargne
    Et le solde disponible n'inclut pas le montant des épargnes
    Et je vois au plus 3 dernières opérations avec "Tout voir"

  @A-P9-S3 @nominal
  Plan du scénario: A-P9-S3 Le statut des opérations s'écrit en mots
    Étant donné une opération au statut "<statut système>"
    Quand j'arrive sur l'accueil
    Alors sa ligne affiche "<mot>" avec son pictogramme

    Exemples:
      | statut système | mot        |
      | confirmée      | Fait       |
      | non confirmée  | En attente |
      | échouée        | Échoué     |

  @A-P9-S4 @interdit
  Scénario: A-P9-S4 Une opération en attente ne ressemble jamais à un succès
    Étant donné un versement "Vers École Awa" non confirmé
    Quand j'arrive sur l'accueil
    Alors sa ligne affiche "En attente" avec l'horloge
    Et elle n'affiche pas "Fait"

  @A-P9-S5 @nominal
  Scénario: A-P9-S5 Masquer les montants
    Étant donné l'accueil rempli, montants visibles
    Quand je touche "Masquer le solde"
    Alors le solde affiche "••• •••" suivi de "FCFA"
    Et le dernier dépôt affiche "••• F"
    Et chaque épargne affiche "••• F sur ••• F" avec sa barre sans chiffre
    Et les montants des opérations sont masqués
    Et les noms, libellés, statuts, dates et le QR restent visibles
    Et l'œil est barré et s'appelle "Afficher le solde"

  @A-P9-S6 @interdit
  Scénario: A-P9-S6 Le masquage persiste entre deux ouvertures
    Étant donné que j'ai masqué mes montants sur l'accueil
    Quand je ferme complètement l'app puis la rouvre et me connecte
    Alors les montants de l'accueil sont toujours masqués

  @A-P9-S7 @interdit
  Scénario: A-P9-S7 Le lecteur d'écran ne lit pas un montant masqué
    Étant donné que mes montants sont masqués
    Quand TalkBack lit l'accueil
    Alors chaque montant masqué est lu "Montant masqué"
    Et aucune barre de progression n'annonce de valeur

  @A-P9-S8 @nominal
  Scénario: A-P9-S8 Réafficher les montants
    Étant donné que mes montants sont masqués
    Quand je touche "Afficher le solde"
    Alors tous les montants de l'accueil sont visibles

  @A-P9-S9 @nominal
  Plan du scénario: A-P9-S9 La ligne d'identité suit le statut KYC
    Étant donné que mon identité est au statut "<statut>"
    Quand j'arrive sur l'accueil
    Alors la ligne d'identité affiche "<texte>"
    Et elle "<suite>" vers la vérification d'identité

    Exemples:
      | statut            | texte                                              | suite          |
      | non commencé      | Vérifie ton identité pour aller plus loin.         | mène           |
      | en vérification   | Ton identité est en vérification.                  | ne mène pas    |
      | complément requis | Il manque une information pour ton identité.       | mène           |
      | refusé            | Ta vérification n'a pas abouti. Voir pourquoi      | mène           |

  @A-P9-S10 @nominal
  Scénario: A-P9-S10 Identité validée
    Étant donné que mon identité est validée
    Quand j'arrive sur l'accueil
    Alors la ligne d'identité n'est pas affichée

  @A-P9-S11 @interdit
  Scénario: A-P9-S11 Aucun plafond ni délai inventé
    Quand j'arrive sur l'accueil, quel que soit mon statut d'identité
    Alors la ligne d'identité ne contient ni montant, ni plafond, ni délai

  @A-P9-S12 @erreur
  Scénario: A-P9-S12 Accueil hors connexion
    Étant donné que l'accueil a été mis à jour à 14:32
    Et que le téléphone n'a plus de connexion
    Quand j'ouvre l'accueil
    Alors je vois les derniers montants connus
    Et je vois "Mis à jour à 14:32 · hors connexion"

  @A-P9-S13 @interdit
  Scénario: A-P9-S13 Pas de zéro trompeur au chargement
    Quand l'accueil charge ses données
    Alors aucun montant "0" n'est affiché avant la réponse

  @A-P9-S14 @nominal
  Scénario: A-P9-S14 La barre basse n'existe que sur les racines
    Quand je suis sur l'accueil
    Alors je vois la barre basse "Accueil", "Épargnes", "Opérations", "Profil", avec "Accueil" sélectionné
    Et aucun écran d'inscription, de code, de PIN ou de résultat n'affiche cette barre

  @A-P9-S15 @nominal
  Scénario: A-P9-S15 Salutation avec le prénom de la cliente
    Étant donné que mon compte est au nom de "Awa Traoré"
    Quand j'arrive sur l'accueil
    Alors je vois "Akwaba, Awa"
```

## P10 — Mon QR

```gherkin
# language: fr
@client @P10
Fonctionnalité: Montrer mon QR à une agente
  Pour être identifiée sans dicter mon numéro
  En tant que cliente connectée
  Je veux afficher mon QR

  Contexte:
    Étant donné que je suis sur l'accueil d'un compte au nom de "Fatou Koné"

  @A-P10-S1 @nominal
  Scénario: A-P10-S1 Ouvrir Mon QR depuis l'accueil
    Quand je touche "Mon QR" sur la carte du solde
    Alors je vois l'écran "Mon QR"
    Et je vois un QR nommé "Ton QR KOTIZ"
    Et je vois "Fatou Koné" et "07 •• •• •• 56"
    Et je vois "L'agente scanne ce code pour te trouver. Il ne sert pas à payer."

  @A-P10-S2 @interdit
  Scénario: A-P10-S2 Aucun montant sur Mon QR
    Étant donné que mes montants sont visibles sur l'accueil
    Quand j'ouvre "Mon QR"
    Alors je ne vois ni solde ni aucun montant

  @A-P10-S3 @nominal
  Scénario: A-P10-S3 Revenir à l'accueil
    Étant donné que je suis sur l'écran "Mon QR"
    Quand je touche "Retour à l'accueil" ou le retour Android
    Alors je suis sur l'accueil

  @A-P10-S4 @nominal @a-confirmer
  Scénario: A-P10-S4 Luminosité maximale pendant l'affichage du QR
    Étant donné que la luminosité de mon téléphone est à mi-hauteur
    Quand j'ouvre "Mon QR"
    Alors la luminosité passe au maximum
    Quand je quitte "Mon QR" ou mets l'app en arrière-plan
    Alors la luminosité revient à mi-hauteur

  @A-P10-S5 @a-confirmer @G02
  Scénario: A-P10-S5 Mon QR sans connexion
    Étant donné que le téléphone n'a pas de connexion
    Quand j'ouvre "Mon QR"
    Alors l'écran suit <disponibilité du QR hors ligne>
    Et il n'affiche jamais de montant
```

---

## Index des scénarios

| Parcours                        | IDs                 | Nombre |
| ------------------------------- | ------------------- | ------ |
| P1 Inscription autonome         | A-P1-S1 à A-P1-S28  | 28     |
| P2 Accompagnée                  | A-P2-S1 à A-P2-S4   | 4      |
| P3 Agente : Ajouter une cliente | A-P3-S1 à A-P3-S12  | 12     |
| P4 Activation personnelle       | A-P4-S1 à A-P4-S7   | 7      |
| P5 Téléphone habituel           | A-P5-S1 à A-P5-S6   | 6      |
| P6 Nouveau téléphone            | A-P6-S1 à A-P6-S7   | 7      |
| P7 Numéro déjà inscrit          | A-P7-S1 à A-P7-S6   | 6      |
| P8 Compte créé                  | A-P8-S1 à A-P8-S6   | 6      |
| P9 Accueil                      | A-P9-S1 à A-P9-S15  | 15     |
| P10 Mon QR                      | A-P10-S1 à A-P10-S5 | 5      |

**Interdits couverts** : aucun secret vu par l'agente (A-P2-S2, A-P2-S3, A-P3-S11) ; aucun succès pendant l'attente (A-P1-S21, A-P1-S22, A-P4-S2, A-P9-S4) ; aucune divulgation avant code SMS (A-P1-S25, A-P4-S6) ni après sur E09 et A02 (A-P7-S2, A-P3-S5) ; masquage persistant et non lu (A-P9-S6, A-P9-S7) ; aucun doublon (A-P1-S24, A-P3-S7, A-P7-S5) ; secrets jamais conservés (A-P1-S26) ; code SMS seul n'ouvre pas le compte (A-P6-S3).
