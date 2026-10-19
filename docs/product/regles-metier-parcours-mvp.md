# KOTIZ - Registre des regles metier des parcours MVP

## Statut et usage

Registre des decisions explicitement validees par le PO pendant le cadrage design. Source detaillee : [PRD design](KOTIZ_PRD_Design_MVP_Figma.md), sections 3, 7, 12.1 et 12.2. Ce document distingue regles metier, representation UX et parametres non tranches. Il ne remplace pas les exigences du partenaire ni les criteres des tickets de developpement.

Les decisions anterieures restent dans le PRD : ce premier registre n'est pas une migration exhaustive du projet. Aucun statut implemente n'est revendique ; aucun ticket distant n'est modifie. Chaque changement approuve doit etre reporte dans les deux documents concernes avant production finale.

## Acces, epargne et securite

| ID        | Regle metier validee                                                                                    | Consequence observable                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| RM-ACC-01 | Aucun doublon au numero existant ; creation de fiche distinguee de l'activation personnelle.            | Verification numero, consentements et PIN cliente pour activation ; invitation seule insuffisante.                   |
| RM-ACC-02 | Recuperation en quatre branches ; SMS seul insuffisant pour reinitialiser PIN.                          | Controles adaptes au dossier et assistance, aucune recuperation automatique non autorisee.                           |
| RM-ACC-03 | Niveau financier limite distinct de l'identite verifiee et de l'existence du compte.                    | Operations permises selon regles partenaire ; aucune valeur de demonstration prise comme plafond approuve.           |
| RM-SAV-01 | Type et cible requis ; nom personnalise, description et date facultatifs.                               | Nom par defaut issu du type ; creation facultative et sans mouvement de fonds.                                       |
| RM-SAV-02 | Maximum trois epargnes actives, projets fermes non comptes.                                             | Meme limite autonome/assiste, pas de fermeture automatique ; etat limite explique.                                   |
| RM-SAV-03 | Epargne flexible : fonds recuperables partiellement ou totalement au solde, sans fermeture automatique. | Objectif/date ne bloquent pas fonds ; recapitulatif et PIN dans app ou autorisation SMS propre au mouvement assiste. |
| RM-SAV-04 | Cible atteinte sans transfert automatique ; fermeture seulement a zero avec confirmation.               | Historique conserve, projet ferme exclu de la liste active.                                                          |
| RM-SEC-01 | Changement PIN : PIN actuel puis nouveau PIN confirme ; oubli ouvre recuperation.                       | Aucun ancien PIN montre, aucun contournement des controles REC ; biometrie differee.                                 |
| RM-SEC-02 | Deconnexion ne ferme pas compte et n'annule pas les operations envoyees.                                | Retour acces sans modification fonds ou statut financier.                                                            |

## Permissions et accompagnement validees

| ID         | Regle metier validee                                                                                                          | Consequence observable                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| RM-PERM-01 | Creation de fiche ne vaut ni activation personnelle ni rattachement accepte.                                                  | Aucun droit d'accompagnement accorde au seul acte de creation.                                                           |
| RM-PERM-02 | Rattachement exige acceptation cliente dans l'app ou confirmation SMS propre au rattachement sans smartphone.                 | Demande identifie l'agente et le role ; code distinct des codes financiers et du PIN.                                    |
| RM-PERM-03 | Rattachement seul ne donne pas acces au solde global ni au carnet.                                                            | Aucune consultation financiere generale par l'agente.                                                                    |
| RM-PERM-04 | Consultation et partage du point necessitent une permission distincte par epargne.                                            | Nouvelle epargne non autorisee automatiquement ; SMS identifie agente, epargne et droit.                                 |
| RM-PERM-05 | Refus ou silence n'accorde aucun droit ; aucune repetition automatique des demandes.                                          | Statut Refuse ou En attente sans divulgation supplementaire.                                                             |
| RM-PERM-06 | Absence ou retrait du rattachement ne bloque pas en soi les depots/retraits chez une autre agente.                            | Operations possibles sous leurs controles et autorisations propres, selon statut reel du compte.                         |
| RM-PERM-07 | Retrait d'une permission carnet conserve le rattachement ; retrait du rattachement supprime ses permissions carnet associees. | Nouveaux acces et partages interdits ; fonds et historique inchanges, releves deja envoyes non rappeles automatiquement. |
| RM-PERM-08 | Revocation par cliente dans app avec confirmation, ou par assistance apres verification sans smartphone.                      | Profil > Mon accompagnement > agente > permissions ; aucune revocation deduite du silence.                               |
| RM-PERM-09 | Creation d'epargne assistee requiert rattachement accepte et confirmation cliente propre a la creation.                       | Creation sans mouvement de fonds ; si retrait du rattachement pendant attente de confirmation, demande annulee.          |
| RM-PERM-10 | Affichage contextuel des noms d'epargnes lors du depot requiert accord cliente et ne vaut pas permission carnet.              | Noms seuls, sans soldes ni acces permanent.                                                                              |

## Fonds et confirmations

| ID         | Regle metier validee                                                                                                          | Consequence observable                                                                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RM-FUND-01 | Depot cash : fonds agente controles avant confirmation cliente ; confirmation puis remise/comptage puis lancement par agente. | Aucun mouvement au seul scan ou a la seule confirmation cliente ; changement montant/destination exige nouvelle confirmation.                                                                                               |
| RM-FUND-02 | Depot cash vers une epargne comporte depot puis affectation lies, une seule destination au MVP.                               | Affectation echouee ne transforme pas un depot reussi en echec ; fonds disponibles, resultat partiel explicite.                                                                                                             |
| RM-FUND-03 | Reprise d'affectation uniquement apres echec confirme, avec recapitulatif actualise et nouvelle confirmation.                 | Aucun nouveau depot ; attente/incertitude ouvre uniquement suivi. Montant inferieur ou report si fonds diminues ; autre epargne active ou report si projet ferme.                                                           |
| RM-FUND-04 | Annulation agente ne prouve pas l'absence de remise d'especes.                                                                | Demande conservee et contestable ; aucune annulation simple apres lancement financier.                                                                                                                                      |
| RM-FUND-05 | Retrait cash sans smartphone distingue code d'autorisation et second code de reception apres remise.                          | Especes agente controlees avant poursuite, remise apres resultat financier confirme. Aucun nouveau debit au second code ; declaration agente et silence ne prouvent pas reception. Assistance si confirmation indisponible. |
| RM-FUND-06 | Retrait Mobile Money assiste uniquement sur numero verifie cliente, sous autorisation cliente.                                | Succes selon transfert operateur confirme ; aucune confirmation de remise cash dans cette branche.                                                                                                                          |
| RM-FUND-07 | Confirmation cash-in expiree avant lancement exige nouvelle confirmation.                                                     | Aucun mouvement a l'expiration ; demande et trace des especes deja remises conservees. Duree non arbitree.                                                                                                                  |
| RM-FUND-08 | Code SMS de depot ponctuel saisi par agente apres verification montant par cliente.                                           | Champ propre au depot, jamais PIN ; code seul ne lance aucun mouvement ni ne prouve remise.                                                                                                                                 |
| RM-FUND-09 | Resultat financier inconnu interdit repetition de la meme operation.                                                          | Suivi/reference/assistance ; ni echec ni succes deduit d'une perte de connexion.                                                                                                                                            |
| RM-FUND-10 | Restitution physique exige confirmation cliente dans app ou via assistance.                                                   | Declaration agente ou silence insuffisants ; assistance organise apres echec etabli sans credit tardif possible.                                                                                                            |
| RM-FUND-11 | Depot Mobile Money vers epargne : depot puis affectation lies.                                                                | Resultat partiel et reprise uniquement affectation echouee ; conditions fournisseur a confirmer.                                                                                                                            |

## Carnet et communication

| ID         | Regle metier validee                                                                         | Consequence observable                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RM-BOOK-01 | Point d'epargne partage uniquement a un contact confirme choisi par cliente.                 | Aucun destinataire libre cote agente ; email facultatif.                                                                                                               |
| RM-BOOK-02 | Signe-signe numerique represente les confirmations reelles, pas une certification juridique. | Versements assistes montrent confirmations cliente/agente ; aucun versement incertain presente comme confirme ni validation agente inventee pour mouvements autonomes. |
| RM-BOOK-03 | Envoi du point et resultat financier sont independants.                                      | Echec connu permet renvoi du meme point date avec controle des droits et du contact, sans nouveau mouvement ; partage externe ouvert ne prouve pas reception.          |
| RM-NOT-01  | Notifications essentielles avec contexte, aide depuis Profil et operation/dossier.           | Aucun controle de desactivation securite/confirmations essentielles dans premier lot ; rappels volontaires/promotions differes. Aucun contact fictif.                  |
| RM-HELP-01 | Signalement conserve operation et reference ; contestation reprend meme dossier.             | Resolu ne veut pas dire rembourse ; aucune nouvelle transaction au seul signalement.                                                                                   |

## Perimetre de la baseline du socle

FIN-01 a FIN-05 valides ensemble par PO : Sante, etoiles, biometrie, rappels volontaires et promotions dans lots ulterieurs ; carnet signe-signe inclus. Score financier distinct des etoiles. Source detaillee PRD section 15 ; [matrice de couverture](KOTIZ_Matrice_Couverture_Socle.md). Aucun ticket distant modifie ni implementation deduite de cette validation.

## Points non tranches et dependances

- Protocoles SMS : recueil, saisie pour permissions, expiration, tentatives, renvoi et preuves d'accord.
- Verification cliente par assistance et controle des contacts selon canal.
- Faisabilite du partage manuel sans destinataire libre dans une application externe ; aucune garantie technique inventee.
- Regles partenaire : controles KYC, frais, limites, debit, disponibilite des fonds et traitement des resultats incertains.
- Contenu final des releves/SMS et traitement d'une creation deja confirmee au resultat incertain lors d'une revocation.
- Correspondance tickets a completer : compte/KYC #64-65, retraits #68/#72, cash-in #71, epargne #73, notifications #75. Les nouvelles permissions doivent etre rattachees a des criteres metier explicites, pas supposees couvertes par ces titres.
