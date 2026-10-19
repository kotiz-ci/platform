# Gherkin — Refonte des parcours, lot B : épargne et retour au solde

Date : 19 octobre 2026. Statut : dérivé du lot B validé par le PO et sa conjointe le 19 octobre 2026 (création en 5 étapes, récapitulatifs B06 en aperçu et B10 en flux, retour au solde sans frais).
Sources : [handoff-lot-b.md](handoff-lot-b.md) (critères d'acceptation, textes exacts), [ux-spec-lot-b.md](ux-spec-lot-b.md), [screens-lot-b.md](screens-lot-b.md), [prototype](https://claude.ai/artifact/2bNTYJFqK5bnT5vaGYmTGF) (page « Lot B — Épargne et retour au solde »). Rattachement aux issues : [issues-lot-b.md](issues-lot-b.md).

## Mode d'emploi

- Langue Gherkin : français (`# language: fr`). Mots-clés : Fonctionnalité, Contexte, Scénario, Plan du scénario, Exemples, Étant donné, Quand, Alors, Et, Mais.
- **IDs stables** : `B-Pn-Sm` (lot B, parcours n, scénario m), repris en tag `@B-Pn-Sm`. Un ID n'est jamais réutilisé ; un scénario retiré garde son ID barré dans ce fichier.
- **Historique** : le 19 octobre 2026 (canvas version 9), les états reportés ont reçu leurs textes exacts. B-P2-S7, B-P4-S12, B-P4-S13, B-P5-S11 et B-P6-S9 ont été précisés sans changer d'ID ; B-P5-S23 est retiré ; B-P2-S10, B-P3-S12 et B-P5-S28 sont ajoutés. Décision PO du même jour sur les refus : un refus par règle connu d'avance s'affiche sur le récapitulatif avant le PIN (B-P5-S29, B-P5-S30 côté serveur) ; B-P5-S28 devient l'échec technique après le PIN. Restent `@a-dessiner` : B-P5-S22 (B11 hors connexion) et B-P5-S29 (refus par règle sur B10, état en cours d'ajout au canvas ; le titre exact du message suivra le canvas).
- **Tags** : `@nominal`, `@erreur`, `@interdit` (règle qui ne doit jamais être violée), `@a-confirmer` (dépend d'un paramètre non tranché), `@a-dessiner` (état reporté au design : le comportement est vérifiable, le texte exact viendra des maquettes), `@G01` `@G02` `@G03` (gate concerné), `@client` (variant d'app), `@backend` (vérifiable au niveau API).
- **Paramètres non tranchés** entre chevrons (`<longueur du PIN>`, `<délai d'expiration>`…), lus dans la configuration du test. **Aucune valeur de démonstration du prototype n'est une règle** (PIN 2468, date du jour figée, solde 12 400 FCFA, références « fictives »). Les noms et montants d'exemple (École Awa, Boutique, Tabaski, Moto, 45 000 F…) sont fictifs.
- **Date du jour** : les scénarios qui calculent une date ou un rythme fixent « aujourd'hui » dans leur `Contexte` ; le test injecte cette date (horloge contrôlée).
- Utilisation : `/implement-ticket` ou `/implement-spec` reprend les scénarios de l'issue visée (table de [issues-lot-b.md](issues-lot-b.md)) **avant** le code ; chaque scénario devient un test d'acceptation à la frontière la plus haute possible (écran pour `@client`, API pour `@backend`).

---

## P1 — Créer une épargne

```gherkin
# language: fr
@client @P1
Fonctionnalité: Créer une épargne
  Pour mettre de côté pour un projet précis
  En tant que Fatou, cliente
  Je veux créer une épargne en 5 étapes, sans que mon argent bouge

  Contexte:
    Étant donné que je suis connectée
    Et que nous sommes le 19 octobre 2026
    Et que mon solde disponible est de 12 400 FCFA

  @B-P1-S1 @nominal
  Scénario: B-P1-S1 Créer une épargne de bout en bout, sans date
    Étant donné que je n'ai aucune épargne
    Et que je suis sur l'accueil
    Quand je touche "Créer une épargne"
    Et que je touche le type "École"
    Et que je saisis "100000"
    Et que je touche "Continuer"
    Et que je touche "Pas de date pour l'instant"
    Et que je touche "Continuer"
    Et que je touche "Créer mon épargne"
    Alors je vois "C'est fait ! Ton épargne École est créée."
    Et je vois "Aucun argent n'a bougé."
    Et je vois "Dedans : 0 F"
    Et je vois "Objectif : 100 000 F"
    Et mon solde disponible est toujours de 12 400 FCFA

  @B-P1-S2 @nominal
  Plan du scénario: B-P1-S2 L'indicateur d'étape suit la création
    Étant donné que je suis en train de créer une épargne
    Quand j'arrive sur l'écran "<écran>"
    Alors l'en-tête affiche "<étape>"

    Exemples:
      | écran                    | étape         |
      | Quel projet ?            | Étape 1 sur 5 |
      | Combien ?                | Étape 2 sur 5 |
      | Pour quand ?             | Étape 3 sur 5 |
      | Comment tu l'appelles ?  | Étape 4 sur 5 |
      | Vérifie ton épargne      | Étape 5 sur 5 |

  @B-P1-S3 @nominal
  Scénario: B-P1-S3 Les neuf types proposés, dans l'ordre
    Quand j'ouvre l'écran "Quel projet ?"
    Alors je vois les types "École", "Commerce", "Santé", "Maison", "Voyage", "Véhicule", "Fête", "Imprévus", "Autre projet" dans cet ordre
    Et je vois "Tu lui donneras un nom plus loin."
    Et l'écran n'a pas de bouton "Continuer"

  @B-P1-S4 @interdit
  Scénario: B-P1-S4 Le type Santé n'évoque jamais une assurance
    Quand je choisis le type "Santé" et que je vais jusqu'au récapitulatif
    Alors le libellé du type est "Santé" seul
    Et aucun écran de la création ne contient "assurance", "couverture", "cotisation", "remboursement" ni "mutuelle"
    Et l'illustration du type Santé est le cœur, sans croix, stéthoscope ni bouclier

  @B-P1-S5 @erreur
  Plan du scénario: B-P1-S5 Le montant de l'objectif est requis et plus grand que 0
    Étant donné que je suis sur l'écran "Combien ?"
    Quand je saisis "<saisie>"
    Alors je vois "<aide>"
    Et le bouton "Continuer" est <état>

    Exemples:
      | saisie | aide                                       | état       |
      |        | Écris un montant.                          | désactivé  |
      | 0      | Le montant doit être plus grand que 0.     | désactivé  |
      | 100000 | C'est ton objectif. Aucun argent ne bouge. | actif      |

  @B-P1-S6 @nominal
  Scénario: B-P1-S6 Le montant s'affiche avec le séparateur des milliers
    Étant donné que je suis sur l'écran "Combien ?"
    Quand je saisis "0100000"
    Alors le champ affiche "100 000"
    Et la devise affichée est "FCFA"
    Et l'écran ne propose aucun montant rapide

  @B-P1-S7 @nominal
  Scénario: B-P1-S7 La question de la date est toujours posée
    Étant donné que j'ai choisi "École" et saisi 100 000 FCFA
    Quand j'arrive sur l'écran "Pour quand ?"
    Alors je vois "Dans 3 mois", "Dans 6 mois", "Dans 1 an" et "Choisir une date"
    Et je vois "Choisis une durée, ou continue sans date."
    Et le bouton "Continuer" est désactivé
    Et je vois le lien "Pas de date pour l'instant"

  @B-P1-S8 @nominal
  Plan du scénario: B-P1-S8 Un raccourci donne la date et le rythme par semaine
    Étant donné que j'ai saisi un objectif de <objectif> FCFA
    Et que je suis sur l'écran "Pour quand ?"
    Quand je touche "<raccourci>"
    Alors je vois "Pour le <date>"
    Et je vois "Ça fait environ <par semaine> par semaine."
    Et le bouton "Continuer" est actif

    Exemples:
      | objectif | raccourci   | date            | par semaine |
      | 100000   | Dans 6 mois | 19 avril 2027   | 3 847 F     |
      | 50000    | Dans 6 mois | 19 avril 2027   | 1 924 F     |

  @B-P1-S9 @nominal
  Scénario: B-P1-S9 Choisir une date au calendrier
    Étant donné que j'ai saisi un objectif de 100000 FCFA
    Et que je suis sur l'écran "Pour quand ?"
    Quand je touche "Choisir une date"
    Et que je choisis le 30 juin 2027
    Alors je vois "Pour le 30 juin 2027"
    Et je vois "Ça fait environ 2 778 F par semaine."

  @B-P1-S10 @erreur
  Plan du scénario: B-P1-S10 Une date passée ou du jour est refusée
    Étant donné que je suis sur l'écran "Pour quand ?"
    Quand je touche "Choisir une date"
    Et que je choisis le <date>
    Alors je vois "Choisis une date à venir."
    Et le bouton "Continuer" est désactivé

    Exemples:
      | date            |
      | 19 octobre 2026 |
      | 1 octobre 2026  |

  @B-P1-S11 @nominal
  Scénario: B-P1-S11 Une date à moins d'une semaine compte pour une semaine
    Étant donné que j'ai saisi un objectif de 10000 FCFA
    Quand je choisis la date du 23 octobre 2026
    Alors je vois "Ça fait environ 10 000 F par semaine."

  @B-P1-S12 @nominal
  Plan du scénario: B-P1-S12 Le nom est prérempli avec le type
    Étant donné que j'ai choisi le type "<type>"
    Quand j'arrive sur l'écran "Comment tu l'appelles ?"
    Alors le champ "Nom" contient "<nom>"
    Et je vois "Si tu ne mets rien : <nom>"
    Et le bouton "Continuer" est actif

    Exemples:
      | type         | nom        |
      | École        | École      |
      | Autre projet | Mon projet |

  @B-P1-S13 @nominal
  Scénario: B-P1-S13 Un nom effacé reprend le nom par défaut
    Étant donné que j'ai choisi le type "Commerce"
    Et que je suis sur l'écran "Comment tu l'appelles ?"
    Quand j'efface le nom
    Et que je touche "Continuer"
    Alors le récapitulatif affiche le nom "Commerce"

  @B-P1-S14 @nominal
  Scénario: B-P1-S14 Le récapitulatif est un aperçu de l'épargne
    Étant donné que j'ai choisi "Commerce", saisi 50 000 FCFA, choisi "Dans 6 mois" et nommé l'épargne "Boutique Adjamé"
    Quand j'arrive sur l'écran "Vérifie ton épargne"
    Alors l'aperçu affiche "Boutique Adjamé", "50 000 FCFA" et "0 F pour l'instant"
    Et l'aperçu affiche "d'ici le 19 avril 2027" et "≈ 1 924 F / semaine"
    Et je vois "Aucun argent ne bouge."
    Et les détails affichent "Projet" avec "Commerce"
    Et les détails n'affichent pas de ligne "Note"
    Et TalkBack lit l'aperçu en une seule phrase qui commence par "Épargne Boutique Adjamé, projet Commerce, objectif 50 000 francs"

  @B-P1-S15 @nominal
  Scénario: B-P1-S15 Sans date, la ligne de date reste affichée
    Étant donné que j'ai répondu "Pas de date pour l'instant"
    Quand j'arrive sur l'écran "Vérifie ton épargne"
    Alors l'aperçu affiche "Pas de date"
    Et je vois le lien "Ajouter"
    Quand je touche "Ajouter"
    Alors je suis sur l'écran "Pour quand ?"

  @B-P1-S16 @nominal
  Plan du scénario: B-P1-S16 Modifier une ligne ramène au récapitulatif
    Étant donné que je suis sur l'écran "Vérifie ton épargne"
    Quand je touche "<lien>"
    Alors je suis sur l'écran "<écran>"
    Quand je change la valeur et que je confirme
    Alors je suis de nouveau sur l'écran "Vérifie ton épargne"
    Et la nouvelle valeur est affichée

    Exemples:
      | lien                | écran                   |
      | Modifier le nom     | Comment tu l'appelles ? |
      | Modifier l'objectif | Combien ?               |
      | Modifier la date    | Pour quand ?            |
      | Modifier le projet  | Quel projet ?           |

  @B-P1-S17 @nominal
  Scénario: B-P1-S17 Changer de date depuis le récapitulatif
    Étant donné que je crée "Boutique Adjamé" à 50 000 FCFA pour le 19 avril 2027
    Et que je suis sur l'écran "Vérifie ton épargne"
    Quand je touche "Modifier la date"
    Et que je touche "Choisir une date"
    Et que je choisis le 30 juin 2027
    Et que je touche "Continuer"
    Alors je suis sur l'écran "Vérifie ton épargne"
    Et l'aperçu affiche "d'ici le 30 juin 2027" et "≈ 1 389 F / semaine"

  @B-P1-S18 @nominal
  Scénario: B-P1-S18 Changer de type garde l'objectif et un nom saisi
    Étant donné que j'ai choisi "École", saisi 100 000 FCFA et nommé l'épargne "Awa"
    Quand je reviens à "Quel projet ?" et que je touche "Commerce"
    Alors l'objectif est toujours de 100 000 FCFA
    Et le nom est toujours "Awa"

  @B-P1-S19 @nominal
  Scénario: B-P1-S19 Même nom qu'une épargne active : suggestion sans blocage
    Étant donné que j'ai une épargne active "Boutique"
    Et que je crée une épargne nommée "Boutique"
    Quand j'arrive sur l'écran "Vérifie ton épargne"
    Alors je vois "Tu as déjà une épargne Boutique. Donne un autre nom à celle-ci."
    Et le bouton "Créer mon épargne" est actif

  @B-P1-S20 @interdit
  Scénario: B-P1-S20 Créer une épargne ne demande pas de PIN et ne déplace aucun argent
    Quand je crée une épargne de bout en bout
    Alors aucun écran ne me demande mon PIN
    Et mon solde disponible n'a pas changé
    Et l'épargne créée contient 0 F

  @B-P1-S21 @interdit
  Scénario: B-P1-S21 Aucun succès pendant la création
    Étant donné que je suis sur l'écran "Vérifie ton épargne"
    Et que le serveur met plus d'une seconde à répondre
    Quand je touche "Créer mon épargne"
    Alors le bouton affiche "Création…"
    Et aucun lien "Modifier" n'est actif
    Et l'écran "Ton épargne est créée" ne s'affiche pas avant la confirmation du serveur

  @B-P1-S22 @erreur
  Scénario: B-P1-S22 Échec connu de la création
    Étant donné que je suis sur l'écran "Vérifie ton épargne"
    Et que le serveur refuse la création
    Quand je touche "Créer mon épargne"
    Alors je vois "Échoué : ton épargne n'est pas créée."
    Et je vois "Réessaie."
    Et ma saisie est gardée

  @B-P1-S23 @erreur @interdit
  Scénario: B-P1-S23 Résultat inconnu : vérifier sans recréer
    Étant donné que je suis sur l'écran "Vérifie ton épargne"
    Et que la réponse n'arrive pas avant <délai d'expiration>
    Quand je touche "Créer mon épargne"
    Alors je vois "En attente"
    Et je vois "On vérifie si ton épargne est créée. Ne la recrée pas."
    Et le bouton principal est "Vérifier à nouveau"
    Et aucun lien "Modifier" n'est affiché
    Quand je touche "Vérifier à nouveau"
    Alors le système interroge la création avec la même clé
    Et il n'existe jamais deux épargnes créées par cette demande

  @B-P1-S24 @erreur
  Scénario: B-P1-S24 Pas de connexion au moment de créer
    Étant donné que je suis sur l'écran "Vérifie ton épargne"
    Et que le téléphone n'a pas de connexion
    Quand je touche "Créer mon épargne"
    Alors je vois "Pas de connexion."
    Et je vois "Ta saisie est gardée."
    Et le bouton principal est "Réessayer"
    Et rien n'est envoyé

  @B-P1-S25 @erreur
  Scénario: B-P1-S25 Double appui sur "Créer mon épargne"
    Étant donné que je suis sur l'écran "Vérifie ton épargne"
    Quand je touche deux fois rapidement "Créer mon épargne"
    Alors une seule épargne est créée

  @B-P1-S26 @nominal
  Scénario: B-P1-S26 Après la création, le détail puis le retour à l'accueil
    Étant donné que je viens de créer "École" depuis l'accueil
    Quand je touche "Voir mon épargne"
    Alors je vois le détail de "École" à "0 FCFA"
    Et je vois "Mets ton premier montant quand tu veux."
    Quand je touche le retour
    Alors je suis sur l'accueil

  @B-P1-S27 @interdit
  Scénario: B-P1-S27 Le retour depuis le résultat ne rouvre jamais le récapitulatif
    Étant donné que je vois "Ton épargne est créée"
    Quand j'appuie sur le retour Android
    Alors je vois le détail de l'épargne créée
    Et l'écran "Vérifie ton épargne" ne s'affiche pas

  @B-P1-S28 @nominal
  Scénario: B-P1-S28 Créer depuis "Compte créé"
    Étant donné que je viens de créer mon compte
    Et que je vois "C'est fait, Fatou !"
    Quand je touche "Créer mon épargne"
    Alors je suis sur l'écran "Quel projet ?"
    Et l'en-tête affiche "Étape 1 sur 5"

  @B-P1-S29 @backend @nominal
  Scénario: B-P1-S29 La création enregistre les champs facultatifs sans mouvement de fonds
    Quand la cliente crée une épargne de type "École", cible 100 000 FCFA, sans nom, sans date ni note
    Alors l'épargne est active avec le nom "École"
    Et aucune écriture ledger n'est créée
```

---

## P2 — Voir mes épargnes

```gherkin
# language: fr
@client @P2
Fonctionnalité: Voir mes épargnes
  Pour savoir ce que j'ai mis de côté, projet par projet
  En tant que Fatou, cliente
  Je veux voir toutes mes épargnes dans l'onglet Épargnes

  @B-P2-S1 @nominal
  Scénario: B-P2-S1 Ouvrir l'onglet Épargnes
    Étant donné que j'ai les épargnes actives "École Awa" (45 000 F sur 100 000 F) et "Boutique" (8 000 F sur 50 000 F)
    Et que j'ai une épargne fermée "Moto", fermée le 12 octobre
    Quand je touche l'onglet "Épargnes"
    Alors je vois le titre "Mes épargnes"
    Et je vois "École Awa" avec "45 000 F sur 100 000 F"
    Et je vois "Boutique" avec "8 000 F sur 50 000 F"
    Et aucun pourcentage n'est affiché dans la liste
    Et je vois "2 sur 3 épargnes actives"
    Et je vois le bouton "Créer une épargne"
    Et la barre basse est affichée avec "Épargnes" sélectionné

  @B-P2-S2 @nominal
  Scénario: B-P2-S2 Les épargnes fermées sont à part, sans montant
    Étant donné que j'ai une épargne fermée "Moto", fermée le 12 octobre
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois la section "Fermées"
    Et je vois "Moto" avec "Fermée le 12 oct."
    Et la ligne "Moto" n'a ni barre ni montant

  @B-P2-S3 @nominal
  Scénario: B-P2-S3 Aucune épargne
    Étant donné que je n'ai aucune épargne
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois "Pas encore d'épargne."
    Et je vois "Mets de côté pour un projet : école, boutique, fête…"
    Et le bouton principal est "Crée ta première épargne"

  @B-P2-S4 @nominal
  Scénario: B-P2-S4 Seulement des épargnes fermées
    Étant donné que ma seule épargne est "Moto", fermée
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois "Pas encore d'épargne."
    Et je vois la section "Fermées" avec "Moto"

  @B-P2-S5 @nominal
  Scénario: B-P2-S5 Une épargne atteinte dans la liste
    Étant donné que j'ai une épargne "Tabaski" avec 52 000 F sur 50 000 F
    Quand j'ouvre l'onglet "Épargnes"
    Alors la ligne "Tabaski" affiche "52 000 F sur 50 000 F" et "Objectif atteint"
    Et sa barre est pleine
    Et "Objectif atteint" n'a ni coche ni couleur de succès

  @B-P2-S6 @erreur
  Scénario: B-P2-S6 Hors connexion
    Étant donné que le téléphone n'a pas de connexion
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois les derniers montants connus
    Et je vois "Mis à jour à <heure> · hors connexion"

  @B-P2-S7 @interdit
  Scénario: B-P2-S7 Jamais de zéro trompeur au chargement
    Étant donné que les épargnes ne sont pas encore chargées
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois un squelette annoncé "Chargement de tes épargnes"
    Et aucun montant "0 F" n'est affiché avant la réponse
    Et je ne vois ni le compteur d'épargnes actives, ni "Créer une épargne", ni "Pas encore d'épargne.", ni la section "Fermées"

  @B-P2-S8 @nominal
  Scénario: B-P2-S8 Ouvrir une épargne depuis la liste
    Quand je touche la ligne "École Awa"
    Alors je vois le détail de "École Awa"

  @B-P2-S10 @nominal
  Scénario: B-P2-S10 Plus de 5 épargnes fermées
    Étant donné que j'ai 7 épargnes fermées
    Quand j'ouvre l'onglet "Épargnes"
    Alors la section "Fermées" affiche les 5 épargnes fermées les plus récentes
    Et je vois le lien "Voir les 7 épargnes fermées"
    Quand je touche "Voir les 7 épargnes fermées"
    Alors la section "Fermées" affiche les 7 épargnes fermées

  @B-P2-S9 @nominal
  Scénario: B-P2-S9 Un nom long est coupé dans la liste, complet dans le détail
    Étant donné que j'ai une épargne nommée "Rentrée scolaire de Awa et de son petit frère Koffi"
    Quand j'ouvre l'onglet "Épargnes"
    Alors la ligne affiche le nom sur une seule ligne terminée par "…"
    Quand j'ouvre cette épargne
    Alors le nom complet est affiché
```

---

## P3 — Suivre une épargne

```gherkin
# language: fr
@client @P3
Fonctionnalité: Suivre une épargne
  Pour savoir où j'en suis de mon objectif
  En tant que Fatou, cliente
  Je veux voir le détail d'une épargne

  Contexte:
    Étant donné que nous sommes le 19 octobre 2026

  @B-P3-S1 @nominal
  Scénario: B-P3-S1 Épargne en cours
    Étant donné que l'épargne "École Awa" contient 45 000 F pour un objectif de 100 000 F au 30 juin 2027
    Quand j'ouvre "École Awa"
    Alors je vois "45 000 FCFA"
    Et je vois "sur 100 000 F"
    Et je vois "45 %"
    Et je vois "Encore 55 000 F pour ton objectif."
    Et je vois "Pour le 30 juin 2027 · encore 36 semaines"
    Et le bouton principal est "Mettre de l'argent"
    Et je vois le bouton "Remettre sur mon solde"
    Et je vois "Fermer cette épargne" en bouton texte

  @B-P3-S2 @nominal
  Plan du scénario: B-P3-S2 Le pourcentage est arrondi à l'entier inférieur
    Étant donné qu'une épargne contient <épargné> F pour un objectif de <cible> F
    Quand j'ouvre cette épargne
    Alors je vois "<pourcentage>"

    Exemples:
      | épargné | cible  | pourcentage |
      | 45000   | 100000 | 45 %        |
      | 99999   | 100000 | 99 %        |
      | 1       | 100000 | 0 %         |

  @B-P3-S3 @nominal @interdit
  Scénario: B-P3-S3 Objectif atteint : rien ne bouge tout seul
    Étant donné que l'épargne "Tabaski" contient 52 000 F pour un objectif de 50 000 F
    Quand j'ouvre "Tabaski"
    Alors je vois "52 000 FCFA"
    Et je vois "sur 50 000 F"
    Et la barre est pleine
    Et je vois "Objectif atteint" avec le drapeau, sans coche
    Et je vois "Ton épargne reste ouverte. Tu peux continuer ou remettre l'argent sur ton solde."
    Et aucun pourcentage n'est affiché
    Et aucun statut "Fait" n'est affiché pour l'épargne
    Et le bouton principal est "Mettre de l'argent"
    Et l'épargne est toujours active
    Et aucun mouvement automatique n'a été créé

  @B-P3-S4 @interdit
  Scénario: B-P3-S4 Jamais plus de 100 %
    Étant donné qu'une épargne contient 152 000 F pour un objectif de 50 000 F
    Quand j'ouvre cette épargne
    Alors je vois "152 000 FCFA" et "sur 50 000 F"
    Et aucun texte ne contient "304 %" ni un pourcentage supérieur à 100

  @B-P3-S5 @nominal
  Scénario: B-P3-S5 Épargne à zéro
    Étant donné que l'épargne "École" contient 0 F
    Quand j'ouvre "École"
    Alors je vois "0 FCFA"
    Et la barre est vide et aucun pourcentage n'est affiché
    Et je vois "Mets ton premier montant quand tu veux."
    Et le bouton "Remettre sur mon solde" est désactivé
    Et je vois "Rien à remettre pour l'instant."
    Et je vois "Tes mouvements s'afficheront ici."

  @B-P3-S6 @interdit
  Scénario: B-P3-S6 Un retour en attente ne ressemble jamais à un succès
    Étant donné que l'épargne "Boutique" contient 8 000 F
    Et qu'un retour de 2 000 F vers mon solde est en attente
    Quand j'ouvre "Boutique"
    Alors je vois "8 000 FCFA"
    Et le mouvement "Vers mon solde" affiche "En attente" avec l'horloge
    Et le mouvement n'affiche pas "Fait"
    Et les boutons "Remettre sur mon solde" et "Fermer cette épargne" sont désactivés
    Et je vois une seule fois "Un retour est en cours. Tu pourras remettre ou fermer après."
    Et TalkBack associe cette phrase aux deux boutons

  @B-P3-S7 @nominal
  Scénario: B-P3-S7 Une alimentation en attente bloque seulement la fermeture
    Étant donné que l'épargne "École Awa" contient 45 000 F
    Et qu'une affectation de 2 000 F depuis mon solde est en attente
    Quand j'ouvre "École Awa"
    Alors je vois "45 000 FCFA"
    Et le bouton "Remettre sur mon solde" est actif
    Et le bouton "Fermer cette épargne" est désactivé
    Et je vois "De l'argent est en route. Tu pourras fermer après."

  @B-P3-S8 @nominal
  Scénario: B-P3-S8 Les derniers mouvements de l'épargne
    Étant donné que l'épargne "École Awa" a plus de 3 mouvements
    Quand j'ouvre "École Awa"
    Alors je vois les 3 derniers mouvements avec leur statut en mots
    Et un retour vers le solde s'affiche "Vers mon solde" avec un montant en "−"
    Et une affectation depuis le solde s'affiche "Depuis mon solde" avec un montant en "+"
    Et je vois le lien "Tout voir"

  @B-P3-S9 @nominal
  Scénario: B-P3-S9 Épargne fermée en lecture seule
    Étant donné que l'épargne "Moto" a été fermée le 12 octobre
    Quand j'ouvre "Moto"
    Alors je vois "Fermée le 12 oct."
    Et je vois "0 FCFA"
    Et je ne vois ni barre, ni "Mettre de l'argent", ni "Remettre sur mon solde", ni "Fermer cette épargne", ni "Modifier"
    Et ses mouvements sont consultables

  @B-P3-S10 @nominal
  Plan du scénario: B-P3-S10 Les semaines restantes
    Étant donné qu'une épargne a pour date le <date>
    Quand j'ouvre cette épargne
    Alors je vois "<texte>"

    Exemples:
      | date            | texte                                        |
      | 30 juin 2027    | Pour le 30 juin 2027 · encore 36 semaines    |
      | 23 octobre 2026 | Pour le 23 octobre 2026 · moins d'une semaine |

  @B-P3-S12 @interdit
  Scénario: B-P3-S12 Chargement du détail sans zéro trompeur
    Étant donné que le détail de "École Awa" n'est pas encore chargé
    Quand j'ouvre "École Awa"
    Alors je vois un squelette annoncé "Chargement de ton épargne"
    Et aucun montant ni "0" n'est affiché
    Et le lien "Modifier" n'est pas affiché

  @B-P3-S11 @a-confirmer @G01 @backend
  Scénario: B-P3-S11 Le montant épargné ne compte que les mouvements confirmés
    Étant donné qu'une épargne contient 45 000 F confirmés
    Et qu'une affectation de 2 000 F est en attente
    Quand l'app lit l'épargne
    Alors le montant épargné est <montant avec mouvement en attente>
```

---

## P4 — Modifier une épargne

```gherkin
# language: fr
@client @P4
Fonctionnalité: Modifier une épargne
  Pour ajuster mon projet sans toucher à mon argent
  En tant que Fatou, cliente
  Je veux changer le nom, l'objectif, la date ou la note d'une épargne

  Contexte:
    Étant donné que nous sommes le 19 octobre 2026
    Et que l'épargne "École Awa" (type École) contient 45 000 F pour un objectif de 100 000 F au 30 juin 2027

  @B-P4-S1 @nominal
  Scénario: B-P4-S1 Changer l'objectif
    Étant donné que je suis sur le détail de "École Awa"
    Quand je touche "Modifier"
    Et que je remplace l'objectif par "120000"
    Et que je touche "Enregistrer"
    Alors je vois le détail de "École Awa"
    Et je vois "Modifications enregistrées."
    Et je vois "sur 120 000 F"
    Et je vois "37 %"
    Et je vois "Encore 75 000 F pour ton objectif."
    Et l'épargne contient toujours 45 000 F

  @B-P4-S2 @nominal
  Scénario: B-P4-S2 Les mêmes champs que la création
    Quand j'ouvre "Modifier"
    Alors je vois "Projet : École — ne change pas"
    Et je vois les champs "Nom", "Objectif", "Pour quand ?" et "Note (facultatif)"
    Et l'option "Choisir une date" est sélectionnée avec le 30 juin 2027
    Et je vois "Ça fait environ 2 778 F par semaine."
    Et je vois le lien "Retirer la date"

  @B-P4-S3 @interdit
  Scénario: B-P4-S3 Le type ne change pas
    Quand j'ouvre "Modifier"
    Alors aucun contrôle ne permet de changer le type

  @B-P4-S4 @nominal
  Scénario: B-P4-S4 "Enregistrer" n'est actif qu'après un changement
    Quand j'ouvre "Modifier"
    Alors le bouton "Enregistrer" est désactivé
    Quand je change la note
    Alors le bouton "Enregistrer" est actif

  @B-P4-S5 @erreur
  Plan du scénario: B-P4-S5 L'objectif reste requis
    Étant donné que je suis sur "Modifier"
    Quand je remplace l'objectif par "<saisie>"
    Alors je vois "<raison>"
    Et le bouton "Enregistrer" est désactivé

    Exemples:
      | saisie | raison                                 |
      |        | Écris un montant.                      |
      | 0      | Le montant doit être plus grand que 0. |

  @B-P4-S6 @nominal
  Scénario: B-P4-S6 Objectif sous le montant épargné
    Étant donné que je suis sur "Modifier"
    Quand je remplace l'objectif par "40000"
    Alors je vois "Ton objectif sera atteint avec ce montant."
    Quand je touche "Enregistrer"
    Alors le détail affiche "Objectif atteint"
    Et aucune célébration n'est affichée

  @B-P4-S7 @nominal
  Scénario: B-P4-S7 Effacer le nom et la date
    Étant donné que je suis sur "Modifier"
    Quand j'efface le nom
    Et que je touche "Retirer la date"
    Et que je touche "Enregistrer"
    Alors le détail affiche le nom "École"
    Et le détail n'affiche plus de date

  @B-P4-S8 @nominal
  Scénario: B-P4-S8 Quitter sans enregistrer
    Étant donné que je suis sur "Modifier"
    Et que j'ai effacé le nom
    Quand je touche le retour
    Alors je vois "Quitter sans enregistrer ?"
    Et je vois "Tes changements seront perdus."
    Quand je touche "Quitter"
    Alors je vois le détail de "École Awa" avec ses anciennes valeurs

  @B-P4-S9 @nominal
  Scénario: B-P4-S9 Rester pour finir la modification
    Étant donné que je vois "Quitter sans enregistrer ?"
    Quand je touche "Rester"
    Alors je suis sur "Modifier" avec mes changements

  @B-P4-S10 @nominal
  Scénario: B-P4-S10 Retour sans changement
    Étant donné que je suis sur "Modifier" sans rien avoir changé
    Quand je touche le retour
    Alors je vois le détail de "École Awa"
    Et aucun dialogue ne s'affiche

  @B-P4-S11 @nominal
  Scénario: B-P4-S11 Modifier pendant un retour en attente
    Étant donné qu'un retour de "École Awa" vers mon solde est en attente
    Quand je change la note et que j'enregistre
    Alors je vois "Modifications enregistrées."

  @B-P4-S12 @erreur
  Scénario: B-P4-S12 Échec d'enregistrement
    Étant donné que je suis sur "Modifier" avec un changement
    Et que le serveur refuse l'enregistrement
    Quand je touche "Enregistrer"
    Alors je reste sur "Modifier" avec mes changements
    Et je vois "Échoué : rien n'a changé."
    Et je vois "Tes saisies sont gardées. Réessaie."
    Et l'épargne garde ses anciennes valeurs

  @B-P4-S13 @erreur
  Scénario: B-P4-S13 Épargne fermée entre-temps
    Étant donné que je suis sur "Modifier" avec un changement
    Et que l'épargne a été fermée depuis un autre appareil
    Quand je touche "Enregistrer"
    Alors je vois "Cette épargne est fermée."
    Et je vois "Elle a été fermée entre-temps. Tes changements ne sont pas enregistrés."
    Et le bouton principal est "Voir mon épargne" à la place de "Enregistrer"
    Et aucune modification n'est enregistrée
    Quand je touche "Voir mon épargne"
    Alors je vois le détail de l'épargne en état fermée

  @B-P4-S14 @backend @interdit
  Scénario: B-P4-S14 Modifier ne crée aucun mouvement
    Quand la cliente modifie le nom, la cible, la date et la note d'une épargne
    Alors aucune écriture ledger n'est créée
    Et le type de l'épargne est inchangé
```

---

## P5 — Remettre de l'argent sur mon solde

```gherkin
# language: fr
@client @P5
Fonctionnalité: Remettre de l'argent d'une épargne sur mon solde
  Pour utiliser l'argent mis de côté
  En tant que Fatou, cliente
  Je veux remettre tout ou partie d'une épargne sur mon solde disponible, sans frais

  Contexte:
    Étant donné que je suis connectée
    Et que mon solde disponible est de 12 400 FCFA
    Et que l'épargne "École Awa" contient 45 000 F pour un objectif de 100 000 F
    Et que la configuration fixe la longueur du PIN à <longueur du PIN>

  @B-P5-S1 @nominal
  Scénario: B-P5-S1 Remettre une partie de l'épargne
    Étant donné que je suis sur le détail de "École Awa"
    Quand je touche "Remettre sur mon solde"
    Et que je saisis "20000"
    Et que je touche "Continuer"
    Et que je touche "Continuer" sur "Vérifie ton retour"
    Et que je saisis mon PIN
    Alors je vois le statut "Fait"
    Et je vois "20 000 F sont sur ton solde."
    Et je vois "Depuis : École Awa"
    Et je vois "Il reste 25 000 F dans École Awa."
    Quand je touche "Voir mon solde"
    Alors mon solde disponible est de 32 400 FCFA

  @B-P5-S2 @nominal
  Plan du scénario: B-P5-S2 L'indicateur d'étape suit le retour
    Étant donné que je suis en train de remettre de l'argent sur mon solde
    Quand j'arrive sur l'écran "<écran>"
    Alors l'en-tête affiche "<étape>"

    Exemples:
      | écran                             | étape         |
      | Combien remettre sur ton solde ?  | Étape 1 sur 3 |
      | Vérifie ton retour                | Étape 2 sur 3 |
      | Entre ton PIN                     | Étape 3 sur 3 |

  @B-P5-S3 @nominal
  Scénario: B-P5-S3 D'où part l'argent et où il va
    Quand j'ouvre "Combien remettre sur ton solde ?" depuis "École Awa"
    Alors je vois "Depuis : École Awa · 45 000 F dedans"
    Et je vois "Vers : Solde disponible"

  @B-P5-S4 @erreur
  Plan du scénario: B-P5-S4 Le montant est contrôlé avant le récapitulatif
    Étant donné que je suis sur "Combien remettre sur ton solde ?"
    Quand je saisis "<saisie>"
    Alors je vois "<raison>"
    Et le bouton "Continuer" est désactivé

    Exemples:
      | saisie | raison                                 |
      |        | Écris un montant.                      |
      | 0      | Le montant doit être plus grand que 0. |
      | 50000  | Tu peux remettre 45 000 F au plus.     |

  @B-P5-S5 @nominal
  Scénario: B-P5-S5 Tout remettre
    Étant donné que je suis sur "Combien remettre sur ton solde ?"
    Quand je touche "Tout remettre"
    Alors le champ affiche "45 000"
    Et "Tout remettre" est sélectionné
    Quand je remplace le montant par "40000"
    Alors "Tout remettre" n'est plus sélectionné

  @B-P5-S6 @nominal @interdit
  Scénario: B-P5-S6 Le récapitulatif est exact et sans frais
    Étant donné que j'ai saisi 20 000 F à remettre depuis "École Awa"
    Quand j'arrive sur "Vérifie ton retour"
    Alors je vois "Tu remets" et "20 000 FCFA"
    Et je vois "Depuis" "École Awa" puis "Vers" "Mon solde"
    Et TalkBack lit le flux "De École Awa vers Mon solde"
    Et je vois "Il restera" avec "25 000 F dans École Awa"
    Et je vois "Ton solde après" avec "32 400 F"
    Et l'écran ne contient ni "Frais", ni "frais", ni "avant frais", ni "à confirmer"
    Et je vois "L'argent reste sur KOTIZ. Pour le sortir, utilise Retirer."
    Et le bouton "Continuer" est actif

  @B-P5-S7 @nominal
  Scénario: B-P5-S7 Retour total : l'épargne reste ouverte
    Étant donné que j'ai choisi "Tout remettre" depuis "École Awa"
    Quand j'arrive sur "Vérifie ton retour"
    Alors je vois "École Awa sera à 0 F. Elle reste ouverte."
    Quand je confirme avec mon PIN
    Alors je vois "45 000 F sont sur ton solde."
    Et je vois "École Awa est à 0 F. Elle reste ouverte."
    Et l'épargne "École Awa" est toujours active

  @B-P5-S8 @nominal
  Scénario: B-P5-S8 Modifier le montant depuis le récapitulatif
    Étant donné que je suis sur "Vérifie ton retour" avec 20 000 F
    Quand je touche "Modifier le montant"
    Alors je suis sur "Combien remettre sur ton solde ?" avec "20 000"

  @B-P5-S9 @nominal
  Scénario: B-P5-S9 L'écran du PIN rappelle le mouvement
    Étant donné que je confirme un retour de 20 000 F depuis "École Awa"
    Quand j'arrive sur "Entre ton PIN"
    Alors je vois "20 000 F d'École Awa vers ton solde"
    Et je vois "Ne le montre à personne, même à une agente."
    Et je vois le lien "PIN oublié ?"

  @B-P5-S10 @erreur
  Scénario: B-P5-S10 PIN incorrect
    Étant donné que je suis sur "Entre ton PIN"
    Quand je saisis un PIN faux
    Alors je vois "PIN incorrect. Réessaie."
    Et les cases sont vidées
    Et aucun retour n'est envoyé

  @B-P5-S11 @erreur @a-confirmer @G02
  Scénario: B-P5-S11 PIN bloqué
    Étant donné que j'ai saisi un PIN faux <nombre d'essais> fois
    Quand j'arrive à la limite
    Alors le titre est "Ton PIN est bloqué"
    Et je vois "Trop d'essais."
    Et je vois "Ton retour n'est pas envoyé : ton argent n'a pas bougé. Réessaie plus tard, ou utilise PIN oublié."
    Et je ne vois ni les cases du PIN ni le pavé
    Et aucun nombre d'essais ni durée n'est affiché
    Et le bouton principal est "Voir mon épargne"
    Et je vois "PIN oublié ?"
    Et aucun retour n'est envoyé
    Et la durée du blocage suit <règle de blocage>

  @B-P5-S12 @interdit
  Scénario: B-P5-S12 Le PIN n'est jamais affiché ni conservé
    Quand je saisis mon PIN sur "Entre ton PIN"
    Alors aucun chiffre n'est affiché
    Quand je touche le retour
    Alors je suis sur "Vérifie ton retour"
    Et le PIN saisi est effacé

  @B-P5-S13 @nominal @interdit
  Scénario: B-P5-S13 Retour en attente : jamais "Fait"
    Étant donné que le partenaire n'a pas encore confirmé le retour
    Quand je confirme un retour de 8 000 F depuis "Boutique" avec mon PIN
    Alors je vois le statut "En attente" avec l'horloge
    Et je vois "Ton retour est en attente."
    Et le suivi affiche "Demande" avec "Envoyée" et "Arrivée sur ton solde" avec "En attente"
    Et je vois "Ne refais pas l'opération."
    Et je vois "Tu le retrouves dans Opérations."
    Et le mot "Fait" n'apparaît nulle part sur l'écran
    Et aucun reçu ni lien "Fermer cette épargne ?" n'est affiché
    Et mon solde disponible n'a pas changé

  @B-P5-S14 @erreur @interdit
  Scénario: B-P5-S14 Connexion perdue après l'envoi
    Étant donné que la connexion se coupe après l'envoi du retour
    Quand le résultat n'arrive pas avant <délai d'expiration>
    Alors je vois le statut "En attente"
    Et je vois "On vérifie ton retour."
    Et je vois le lien "Contacter l'aide"
    Et je ne vois pas de bouton "Réessayer"

  @B-P5-S15 @erreur
  Scénario: B-P5-S15 Retour échoué puis réessayé
    Étant donné que le retour de 20 000 F est refusé
    Quand je confirme avec mon PIN
    Alors je vois le statut "Échoué"
    Et je vois "Ton retour de 20 000 F n'a pas marché."
    Et je vois "Ton argent n'a pas bougé. Il est dans École Awa."
    Et le bouton principal est "Réessayer"
    Quand je touche "Réessayer"
    Alors je suis sur "Vérifie ton retour" avec les montants relus
    Et je dois saisir de nouveau mon PIN

  @B-P5-S16 @erreur
  Scénario: B-P5-S16 Le montant disponible a changé
    Étant donné que je suis sur "Vérifie ton retour" avec 45 000 F
    Et que le disponible de "École Awa" est passé à 40 000 F
    Quand je continue
    Alors je suis sur "Combien remettre sur ton solde ?"
    Et je vois "Le montant disponible a changé."
    Et je vois "Il y a maintenant 40 000 F dans École Awa."

  @B-P5-S17 @interdit
  Scénario: B-P5-S17 Pas de second retour pendant une attente
    Étant donné qu'un retour depuis "Boutique" est en attente
    Quand j'ouvre "Boutique"
    Alors le bouton "Remettre sur mon solde" est désactivé
    Et je ne peux pas ouvrir "Combien remettre sur ton solde ?"

  @B-P5-S18 @interdit
  Scénario: B-P5-S18 Le retour depuis le résultat ne rouvre jamais le PIN
    Étant donné que je vois le résultat d'un retour
    Quand j'appuie sur le retour Android
    Alors je vois le détail de l'épargne
    Et les écrans "Vérifie ton retour" et "Entre ton PIN" ne s'affichent pas

  @B-P5-S19 @interdit
  Scénario: B-P5-S19 Aucun retrait externe enchaîné
    Étant donné qu'un retour vers mon solde est fait
    Alors aucun retrait vers un Mobile Money n'est lancé
    Et le vocabulaire de l'écran ne parle jamais de "retrait" pour ce mouvement

  @B-P5-S20 @nominal
  Scénario: B-P5-S20 L'accueil après un retour fait
    Étant donné qu'un retour de 20 000 F depuis "École Awa" est fait
    Quand j'ouvre l'accueil
    Alors le solde disponible est de 32 400 FCFA
    Et la ligne "Dernier dépôt" de la carte solde ne montre pas ce retour
    Et la première des dernières opérations est "Depuis École Awa" avec "+20 000 F" et "Fait"

  @B-P5-S21 @interdit
  Scénario: B-P5-S21 L'accueil après un retour en attente
    Étant donné qu'un retour de 8 000 F depuis "Boutique" est en attente
    Quand j'ouvre l'accueil
    Alors le solde disponible est toujours de 12 400 FCFA
    Et la carte solde n'affiche pas "+ 8 000 F"
    Et les dernières opérations affichent "Depuis Boutique" avec "En attente"

  @B-P5-S22 @erreur @a-dessiner
  Scénario: B-P5-S22 Pas de connexion avant l'envoi du PIN
    Étant donné que le téléphone n'a pas de connexion
    Quand je saisis mon PIN sur "Entre ton PIN"
    Alors je vois que rien n'a été envoyé
    Et aucun résultat n'est affiché

  # ~~B-P5-S23 Refus par une règle du partenaire (sur « Vérifie ton retour »)~~
  # Retiré le 19 octobre 2026. Décision PO du même jour : le refus par règle est
  # affiché sur le récapitulatif avant le PIN (voir B-P5-S29) ; l'échec technique reste après le PIN (B-P5-S28).

  @B-P5-S28 @erreur
  Scénario: B-P5-S28 Échec technique au moment du mouvement, après le PIN
    Étant donné qu'aucune règle n'interdit ce retour
    Et que le mouvement échoue au moment de son exécution
    Quand je confirme un retour de 20 000 F depuis "École Awa" avec mon PIN
    Alors je vois le statut "Échoué"
    Et je vois "Ton retour de 20 000 F n'a pas marché."
    Et je vois "Ton argent n'a pas bougé. Il est dans École Awa."
    Et je ne vois pas "n'est pas accepté"
    Et le bouton principal est "Réessayer"
    Et l'épargne "École Awa" contient toujours 45 000 F

  @B-P5-S29 @erreur @interdit @a-confirmer @G01 @a-dessiner
  Scénario: B-P5-S29 Refus par une règle, connu avant le PIN
    Étant donné qu'une règle interdit ce retour pour <raison communicable>
    Quand j'arrive sur "Vérifie ton retour" avec 20 000 F depuis "École Awa"
    Alors je vois un message d'erreur avec la raison
    Et je vois "Ton argent n'a pas bougé."
    Et je vois le lien "Contacter l'aide"
    Et le bouton "Continuer" est désactivé
    Et aucun plafond, aucune limite ni aucun montant limite n'est affiché
    Et l'écran "Entre ton PIN" ne s'ouvre pas
    Et aucun retour n'est envoyé

  @B-P5-S30 @backend @erreur
  Scénario: B-P5-S30 Une règle devenue bloquante après le récapitulatif
    Étant donné qu'aucune règle n'interdisait le retour à l'ouverture du récapitulatif
    Et qu'une règle l'interdit au moment du mouvement
    Quand la cliente confirme le retour avec un PIN valide
    Alors le retour est refusé sans aucune écriture
    Et l'app affiche le résultat "Échoué" avec "Ton argent n'a pas bougé."

  @B-P5-S24 @nominal
  Scénario: B-P5-S24 Montants visibles malgré le masquage
    Étant donné que les montants sont masqués
    Quand je remets 5 000 F depuis "École Awa"
    Alors le montant saisi est visible
    Et "Tu remets" et "Il restera" sont visibles sur le récapitulatif
    Mais "Ton solde après" n'est pas affiché
    Et le résultat affiche les montants

  @B-P5-S25 @backend @interdit
  Scénario: B-P5-S25 Écritures du retour : montant exact, sans frais
    Quand la cliente remet 20 000 F de "École Awa" sur son solde avec un PIN valide
    Alors l'épargne est débitée de 20 000 F
    Et le solde disponible est crédité de 20 000 F
    Et les écritures sont équilibrées
    Et aucune écriture de frais n'est créée

  @B-P5-S26 @backend @interdit
  Scénario: B-P5-S26 Retour idempotent
    Quand la même demande de retour est envoyée deux fois avec la même clé
    Alors un seul mouvement est créé

  @B-P5-S27 @backend @erreur
  Plan du scénario: B-P5-S27 Retours refusés par le serveur
    Quand la cliente demande un retour <cas>
    Alors le serveur refuse avec le motif <motif>
    Et aucune écriture n'est créée

    Exemples:
      | cas                                         | motif                    |
      | supérieur au montant épargné confirmé       | disponible insuffisant   |
      | de 0 F                                      | montant invalide         |
      | avec un PIN faux                            | PIN incorrect            |
      | alors qu'un retour est en attente           | retour déjà en cours     |
      | depuis une épargne fermée                   | épargne fermée           |
```

---

## P6 — Fermer une épargne

```gherkin
# language: fr
@client @P6
Fonctionnalité: Fermer une épargne
  Pour ranger un projet terminé
  En tant que Fatou, cliente
  Je veux fermer une épargne vide, en confirmant moi-même

  @B-P6-S1 @nominal
  Scénario: B-P6-S1 Fermer une épargne vide
    Étant donné que l'épargne "École Awa" contient 0 F sans mouvement en attente
    Et que je suis sur son détail
    Quand je touche "Fermer cette épargne"
    Alors je vois "Fermer École Awa ?"
    Et je vois "Elle quittera tes épargnes actives."
    Et je vois "Ses mouvements restent dans Opérations."
    Et je vois "Tu ne pourras pas la rouvrir."
    Quand je touche "Fermer l'épargne"
    Alors je suis sur "Mes épargnes"
    Et je vois "École Awa est fermée."
    Et "École Awa" est dans la section "Fermées"

  @B-P6-S2 @nominal
  Scénario: B-P6-S2 Garder l'épargne
    Étant donné que je vois "Fermer École Awa ?"
    Quand je touche "Garder"
    Alors je suis sur le détail de "École Awa"
    Et l'épargne est toujours active

  @B-P6-S3 @interdit
  Scénario: B-P6-S3 Une épargne avec de l'argent ne se ferme pas
    Étant donné que l'épargne "École Awa" contient 25 000 F
    Quand je touche "Fermer cette épargne"
    Alors je vois "Il reste 25 000 F dans École Awa"
    Et je vois "Pour la fermer, elle doit être vide."
    Et je vois "Remets d'abord l'argent sur ton solde."
    Et aucun bouton ne ferme l'épargne

  @B-P6-S4 @nominal
  Scénario: B-P6-S4 Vider puis fermer, avec deux décisions distinctes
    Étant donné que l'épargne "École Awa" contient 25 000 F
    Et que je vois "Il reste 25 000 F dans École Awa"
    Quand je touche "Remettre sur mon solde"
    Alors je suis sur "Combien remettre sur ton solde ?" avec "25 000" et "Tout remettre" sélectionné
    Quand je termine le retour avec mon PIN
    Alors je vois "École Awa est à 0 F. Elle reste ouverte."
    Et l'épargne "École Awa" est toujours active
    Et je vois le lien "Fermer cette épargne ?"
    Quand je touche "Fermer cette épargne ?"
    Alors je vois "Fermer École Awa ?"
    Quand je touche "Fermer l'épargne"
    Alors je vois "École Awa est fermée."

  @B-P6-S5 @nominal
  Scénario: B-P6-S5 "Garder" depuis le lien du résultat
    Étant donné que je vois "Fermer École Awa ?" ouvert depuis le résultat du retour
    Quand je touche "Garder"
    Alors je vois de nouveau le résultat du retour

  @B-P6-S6 @interdit
  Scénario: B-P6-S6 Jamais de fermeture automatique
    Étant donné que je remets tout l'argent de "École Awa" sur mon solde
    Quand le retour est fait
    Alors l'épargne "École Awa" est toujours active
    Et elle compte toujours dans mes épargnes actives

  @B-P6-S7 @nominal
  Plan du scénario: B-P6-S7 Le lien de fermeture n'apparaît qu'après un retour total fait
    Étant donné qu'un retour <cas>
    Quand je vois le résultat
    Alors le lien "Fermer cette épargne ?" est <présence>

    Exemples:
      | cas                                                       | présence |
      | total est fait                                            | affiché  |
      | partiel est fait                                          | absent   |
      | total est en attente                                      | absent   |
      | total est fait mais une affectation est en attente        | absent   |
      | a échoué                                                  | absent   |

  @B-P6-S8 @erreur
  Scénario: B-P6-S8 De l'argent arrive au moment de fermer
    Étant donné que je vois "Fermer École Awa ?"
    Et que de l'argent arrive dans "École Awa" entre-temps
    Quand je touche "Fermer l'épargne"
    Alors je suis sur le détail de "École Awa"
    Et je vois "De l'argent est arrivé. École Awa reste ouverte."
    Et l'épargne est toujours active

  @B-P6-S9 @erreur
  Scénario: B-P6-S9 Échec de la fermeture
    Étant donné que je vois "Fermer École Awa ?"
    Et que le serveur ne ferme pas l'épargne
    Quand je touche "Fermer l'épargne"
    Alors je suis sur le détail de "École Awa"
    Et je vois "Échoué : École Awa n'est pas fermée."
    Et je vois "Ton argent et tes mouvements n'ont pas changé. Réessaie."
    Et l'épargne est toujours active
    Et le bouton "Fermer cette épargne" est disponible

  @B-P6-S10 @interdit
  Scénario: B-P6-S10 Fermer ne supprime rien
    Étant donné que "École Awa" est fermée
    Alors ses mouvements et ses reçus sont toujours dans Opérations
    Et aucun texte de la fermeture ne contient "supprimer"
    Et l'épargne fermée ne peut pas être rouverte

  @B-P6-S11 @nominal
  Scénario: B-P6-S11 Le bouton de fermeture n'est pas une couleur d'alerte
    Quand j'ouvre le détail d'une épargne active
    Alors "Fermer cette épargne" est un bouton texte non rouge, en bas de page
    Et le bouton "Fermer l'épargne" du dialogue n'est pas rouge

  @B-P6-S12 @backend @interdit
  Plan du scénario: B-P6-S12 La fermeture est refusée si l'épargne n'est pas vide ou a un mouvement en cours
    Quand la cliente demande la fermeture d'une épargne <état>
    Alors le serveur refuse la fermeture
    Et l'épargne reste active

    Exemples:
      | état                                   |
      | qui contient 1 F                       |
      | avec un retour en attente              |
      | avec une affectation en attente        |

  @B-P6-S13 @backend @interdit
  Scénario: B-P6-S13 Une épargne fermée ne reçoit plus rien
    Étant donné qu'une épargne est fermée
    Quand une affectation, un retour ou une modification vise cette épargne
    Alors le serveur refuse l'opération
```

---

## P7 — Limite de 3 épargnes actives

```gherkin
# language: fr
@client @P7
Fonctionnalité: Limite de 3 épargnes actives
  Pour garder des projets lisibles
  En tant que Fatou, cliente
  Je veux comprendre la limite de 3 épargnes actives sans que rien ne soit fermé à ma place

  Contexte:
    Étant donné que j'ai 3 épargnes actives "École Awa", "Boutique" et "Tabaski"
    Et que j'ai une épargne fermée "Moto"

  @B-P7-S1 @interdit
  Scénario: B-P7-S1 Pas de bouton Créer à 3 actives
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois "3 sur 3 épargnes actives"
    Et je vois "Tu as 3 épargnes actives. C'est le maximum."
    Et je vois "Pour en créer une autre, ferme une épargne vide."
    Et je ne vois pas de bouton "Créer une épargne"
    Et aucun bouton ne ferme ni ne vide une épargne

  @B-P7-S2 @nominal
  Scénario: B-P7-S2 Les épargnes fermées ne comptent pas
    Quand j'ouvre l'onglet "Épargnes"
    Alors "Moto" est dans la section "Fermées"
    Et le compteur affiche "3 sur 3 épargnes actives"

  @B-P7-S3 @nominal
  Scénario: B-P7-S3 Limite expliquée depuis une autre entrée
    Étant donné que je touche une entrée "Créer une épargne" hors de l'onglet Épargnes
    Alors je vois "Tu as déjà 3 épargnes actives"
    Et je vois "C'est le maximum."
    Et je vois "Les épargnes fermées ne comptent pas."
    Et le seul bouton principal est "Voir mes épargnes"
    Quand je touche "Voir mes épargnes"
    Alors je suis sur "Mes épargnes"

  @B-P7-S4 @erreur
  Scénario: B-P7-S4 La limite est atteinte pendant la création
    Étant donné que j'ai 2 épargnes actives et que je suis sur "Vérifie ton épargne"
    Et qu'une troisième épargne est créée depuis un autre appareil
    Quand je touche "Créer mon épargne"
    Alors je vois "Tu as déjà 3 épargnes actives"
    Et aucune quatrième épargne n'est créée

  @B-P7-S5 @nominal
  Scénario: B-P7-S5 Fermer une épargne libère une place
    Étant donné que "Tabaski" est vidée puis fermée
    Quand j'ouvre l'onglet "Épargnes"
    Alors je vois "2 sur 3 épargnes actives"
    Et je vois le bouton "Créer une épargne"

  @B-P7-S6 @backend @interdit
  Scénario: B-P7-S6 Jamais 4 épargnes actives, même en simultané
    Étant donné qu'une cliente a 2 épargnes actives
    Quand deux créations arrivent en même temps
    Alors une seule est acceptée
    Et l'autre est refusée avec le motif "limite atteinte"

  @B-P7-S7 @backend @interdit
  Scénario: B-P7-S7 Aucune fermeture automatique pour faire de la place
    Étant donné qu'une cliente a 3 épargnes actives dont une à 0 F
    Quand elle demande une quatrième épargne
    Alors la demande est refusée
    Et aucune épargne n'est fermée
```

---

## P8 — Montants masqués dans les épargnes

```gherkin
# language: fr
@client @P8
Fonctionnalité: Montants masqués dans les épargnes
  Pour que personne autour de moi ne voie combien j'ai
  En tant que Fatou, cliente
  Je veux que le masquage de l'accueil s'applique aussi à mes épargnes

  Contexte:
    Étant donné que l'épargne "École Awa" contient 45 000 F pour un objectif de 100 000 F

  @B-P8-S1 @interdit
  Scénario: B-P8-S1 Le masquage de l'accueil s'applique aux épargnes
    Étant donné que je masque les montants depuis l'accueil
    Quand j'ouvre l'onglet "Épargnes"
    Alors la ligne "École Awa" affiche "••• F sur ••• F"
    Et sa barre est visible
    Et l'œil est barré
    Quand j'ouvre "École Awa"
    Alors je vois "••• ••• FCFA" et "sur ••• F"
    Et aucun pourcentage ni "Encore" n'est affiché
    Et la barre est visible
    Et les montants des mouvements sont masqués
    Et les noms, statuts et dates restent visibles

  @B-P8-S2 @interdit
  Scénario: B-P8-S2 Le masquage persiste après réouverture
    Étant donné que j'ai masqué les montants depuis "Mes épargnes"
    Quand je ferme puis rouvre l'app
    Alors les montants de l'accueil, de "Mes épargnes" et du détail sont masqués

  @B-P8-S3 @nominal
  Scénario: B-P8-S3 Un seul réglage pour tous les yeux
    Étant donné que les montants sont masqués
    Quand je touche l'œil sur le détail de "École Awa"
    Alors les montants du détail sont visibles
    Et les montants de l'accueil et de "Mes épargnes" sont visibles

  @B-P8-S4 @interdit
  Scénario: B-P8-S4 TalkBack ne lit jamais un montant masqué
    Étant donné que les montants sont masqués
    Quand TalkBack lit "Mes épargnes" et le détail
    Alors chaque montant masqué est lu "Montant masqué"
    Et aucune barre n'annonce de valeur

  @B-P8-S5 @interdit
  Scénario: B-P8-S5 Une épargne vide masquée ne se trahit pas
    Étant donné que l'épargne "École" contient 0 F
    Et que les montants sont masqués
    Quand j'ouvre "École"
    Alors je ne vois pas "Mets ton premier montant quand tu veux."
    Et je vois "Rien à remettre pour l'instant." sous "Remettre sur mon solde"

  @B-P8-S6 @nominal
  Scénario: B-P8-S6 Saisie, récapitulatif et résultat restent visibles
    Étant donné que les montants sont masqués
    Quand je remets 5 000 F d'École Awa sur mon solde
    Alors le montant saisi, le récapitulatif, le rappel du PIN et le résultat affichent les montants
    Mais "Ton solde après" n'est pas affiché sur le récapitulatif

  @B-P8-S7 @nominal
  Scénario: B-P8-S7 La feuille "Il reste de l'argent" garde son montant
    Étant donné que les montants sont masqués
    Et que l'épargne "École Awa" contient 25 000 F
    Quand je touche "Fermer cette épargne"
    Alors je vois "Il reste 25 000 F dans École Awa"

  @B-P8-S8 @nominal
  Scénario: B-P8-S8 Nom accessible de l'œil
    Quand les montants sont visibles
    Alors l'œil de "Mes épargnes" s'appelle "Masquer les montants"
    Quand je le touche
    Alors il s'appelle "Afficher les montants" et il est annoncé sélectionné
```

---

## Index des scénarios

| Parcours | IDs | Nombre |
|---|---|---|
| P1 Créer une épargne | B-P1-S1 à B-P1-S29 | 29 |
| P2 Voir mes épargnes | B-P2-S1 à B-P2-S10 | 10 |
| P3 Suivre une épargne | B-P3-S1 à B-P3-S12 | 12 |
| P4 Modifier une épargne | B-P4-S1 à B-P4-S14 | 14 |
| P5 Remettre sur mon solde | B-P5-S1 à B-P5-S30 (S23 retiré) | 29 |
| P6 Fermer une épargne | B-P6-S1 à B-P6-S13 | 13 |
| P7 Limite de 3 épargnes | B-P7-S1 à B-P7-S7 | 7 |
| P8 Montants masqués | B-P8-S1 à B-P8-S8 | 8 |
| **Total** | | **122** |

**Interdits couverts**
- 3 épargnes actives au maximum : B-P7-S1, B-P7-S4, B-P7-S6.
- Aucune fermeture ni transfert automatique : B-P3-S3, B-P6-S6, B-P7-S1, B-P7-S7.
- Fermeture à zéro seulement : B-P6-S3, B-P6-S12, B-P6-S13.
- Aucun succès pendant l'attente : B-P1-S21, B-P1-S23, B-P3-S6, B-P5-S13, B-P5-S14, B-P5-S21.
- Aucun zéro trompeur au chargement : B-P2-S7, B-P3-S12.
- Masquage persistant et jamais lu : B-P8-S1, B-P8-S2, B-P8-S4, B-P8-S5.
- Santé sans évocation d'assurance : B-P1-S4.
- Aucun frais sur le retour au solde : B-P5-S6, B-P5-S25.
- Aucun PIN demandé pour un retour déjà interdit par une règle ; aucune limite chiffrée : B-P5-S29.
- Aucun doublon (idempotence) : B-P1-S23, B-P1-S25, B-P5-S26 ; pas de répétition d'un résultat inconnu : B-P5-S14, B-P5-S17.
- Aucun argent déplacé hors du retour : B-P1-S20, B-P4-S14 ; type fixe : B-P4-S3 ; PIN jamais affiché ni conservé : B-P5-S12 ; pas de retour arrière vers le PIN : B-P5-S18 ; aucun retrait enchaîné : B-P5-S19 ; fermer ≠ supprimer : B-P6-S10.

**Exemples vérifiés** (aide « par semaine », date du jour 19 octobre 2026, formule du handoff : `⌈objectif / max(1, ⌊jours / 7⌋)⌉`) :
- 100 000 F au 30 juin 2027 → 254 jours, 36 semaines → 2 778 F (B-P1-S9, B-P4-S2) ;
- 100 000 F au 19 avril 2027 (« Dans 6 mois ») → 182 jours, 26 semaines → 3 847 F (B-P1-S8) ;
- 50 000 F au 19 avril 2027 → 1 924 F (B-P1-S8, B-P1-S14) ; 50 000 F au 30 juin 2027 → 1 389 F (B-P1-S17) ;
- 10 000 F au 23 octobre 2026 → 4 jours, compté 1 semaine → 10 000 F (B-P1-S11).
Le calcul porte sur l'objectif entier, pas sur le reste à épargner (règle du prototype validé, B04 et B08).
