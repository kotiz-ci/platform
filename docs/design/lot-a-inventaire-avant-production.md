# KOTIZ — Lot A : inventaire avant production

Date : 11 octobre 2026. Statut : inspection Figma et préparation, **aucune production du lot A**. Trois agents ont croisé règles métier, couverture et cohérence UI ; inspection Figma centralisée par l'orchestrateur.

Complément : l'[audit professionnel des composants](KOTIZ_Audit_Design_System_2026-10-11.md) précise désormais les conditions de réemploi. Le tableau ci-dessous est un inventaire de sources, pas une validation générale de leur qualité ni de tous leurs usages.

## Autorité et périmètre

Sources lues : PRD design v1.0, registre métier, matrice du socle et session de consolidation du 11 octobre. FIN-01 à FIN-05 sont validés. Les mentions historiques contraires ne rouvrent pas ces décisions.

Lot demandé : inscription autonome, création de fiche par l'agente, activation personnelle, connexion, accueil vide/rempli et accès Mon QR. L'accompagnement sur le téléphone cliente réutilise l'inscription autonome. Récupération complète, KYC documentaire et accompagnement/permissions détaillés restent des raccords vers leurs lots respectifs. Le tableau historique du PRD §5 inclut KYC ; le périmètre de cette préparation suit la demande actuelle et l'ordre final §15.3.

Santé, étoiles, biométrie, rappels/promotions reportés. Aucun code applicatif, modification GitHub, frais, plafond ou protocole partenaire ajouté.

## État Figma réellement inspecté

Fichier : <https://www.figma.com/design/Ejhn5axhlQERtHPKYQ39gp>

| Page                           | ID      | Observation                                                                                             |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------- |
| 00 — Fondations                | 34:1089 | Référentiel existant 97:2                                                                               |
| 01 — Identité et illustrations | 75:1119 | Logos, illustrations, icônes et QR sources présents                                                     |
| 02 — Composants                | 34:1090 | Bibliothèque avec boutons, champs, solde, raccourcis, navigation, messages, résultats, codes et clavier |
| 03 — Parcours mobile           | 34:1091 | Une section active 234:437 : pilote alimentation d'épargne, 11 frames ; aucun lot A actif               |
| 99 — Archives et explorations  | 0:1     | Anciennes versions et propositions, dont section 233:788 ; aucune archive n'est une validation          |

Captures effectivement inspectées : accueil 13:945, inscription téléphone 165:1647, ancienne inscription assistée 165:6739. Textes, états, composants et réactions contrôlés sur les autres candidats ci-dessous.

## Écrans existants et décisions de réemploi

| Famille                | Candidats Figma archivés                                                                                                                                                                          | Réemploi / correction                                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accès autonome         | 165:1611 entrée ; 165:1647 et 165:1684 téléphone ; 165:1722 compte existant ; 165:1755/1794 SMS ; 165:1829 erreur ; 165:1878 expiration ; 165:1911 nom ; 165:1945/1977 PIN ; 165:2008 discordance | Réemployer les composants et la composition utile. Réordonner consentements après SMS/nom. Numéro et Modifier visibles sur SMS, erreur locale, renvoi et aide. Ne pas valider les longueurs 4/6 simplement parce que les cases existent |
| Connexion              | 165:2039 ; erreur 165:2081                                                                                                                                                                        | Ancienne composition numéro + PIN systématiques : séparer téléphone habituel PIN seul et nouveau téléphone numéro → SMS → PIN                                                                                                           |
| Création agente        | 165:6739/6784/6825/6864/6890                                                                                                                                                                      | Ancien parcours mêle SMS, pièce d'identité et inscription transmise. Recomposer autour de la création de fiche, sans PIN cliente ni KYC documentaire sur cette séquence                                                                 |
| Activation personnelle | Aucun parcours dédié identifié dans l'inventaire ciblé                                                                                                                                            | Composer un relais vers la fiche existante ; partager les composants SMS, consentements et PIN avec ACC                                                                                                                                 |
| Fin d'inscription      | Aucun résultat Compte créé conforme identifié                                                                                                                                                     | Créer la composition avec trois sorties validées, sans imposer dépôt ni projet                                                                                                                                                          |
| Accueil rempli         | 13:945 ; référence Direction 04 également conservée dans 13:658                                                                                                                                   | Préserver hiérarchie montant/QR/actions illustrées, carte projet et opérations. Corriger vocabulaire disponible et navigation                                                                                                           |
| Accueil masqué         | 13:1021                                                                                                                                                                                           | Le montant principal est masqué, mais mensuel, objectif, progression et opérations restent visibles. Préparer un masquage cohérent et vérifier chaque zone                                                                              |
| Accueil vide           | Aucun candidat dédié identifié dans l'inventaire ciblé                                                                                                                                            | Même cadre, solde initial et états sans projet/sans opération ; créer une épargne facultativement                                                                                                                                       |
| Mon QR                 | 13:916                                                                                                                                                                                            | QR et nom présents, pas de solde. Compléter numéro partiellement masqué et retour vers l'accueil de provenance                                                                                                                          |

Les constats « aucun candidat identifié » portent sur l'inventaire ciblé et ne prétendent pas que chaque couche d'archive est un écran autonome. Les 643 frames de taille mobile relevées dans les archives incluent des conteneurs imbriqués : ce nombre n'est pas un nombre de parcours.

## Inventaire du lot à composer

| Parcours                              | Séquence                                                                                                             | États / variantes nécessaires                                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inscription autonome                  | Entrée → numéro → SMS → nom → consentements → création PIN → confirmation PIN → Compte créé                          | Vide, saisi, invalide, vérification, erreur/reprise ; numéro existant sans doublon ; code incorrect/expiré, renvoi indisponible/disponible, SMS absent ; PIN différent             |
| Cliente accompagnée sur son téléphone | Même séquence autonome                                                                                               | Agente explique ; cliente effectue elle-même SMS, consentements et PIN. Pas de duplication de parcours                                                                             |
| Création par l'agente                 | Mes clientes → Ajouter → formulaire → récapitulatif → Fiche créée / invitation                                       | Nom complet et numéro requis ; activité/localisation facultatives. Invalide, attente, erreur/reprise, numéro existant selon droits ; Fiche créée et Accès app non activé distincts |
| Activation personnelle                | Invitation → KOTIZ sur téléphone cliente → vérification numéro → consentements → création/confirmation PIN → accueil | Reprise de fiche, SMS/erreurs partagés ; invitation seule n'active rien ; aucun nom redemandé comme nouvelle inscription                                                           |
| Connexion habituelle                  | PIN → accueil                                                                                                        | Saisie, invalide, vérification, erreur/reprise ; PIN oublié vers récupération distincte                                                                                            |
| Connexion nouveau téléphone           | Numéro → SMS → PIN → accueil                                                                                         | SMS seul insuffisant ; réutiliser états et retours SMS/PIN ; aucune reconnaissance appareil fictive                                                                                |
| Compte créé                           | Faire mon premier dépôt / Créer une épargne / Plus tard                                                              | Plus tard → accueil vide ; autres sorties = raccords à préparer, pas parcours revendiqués livrés                                                                                   |
| Accueil                               | Vide / rempli ; visible / masqué                                                                                     | Disponible séparé des projets ; Déposer, Retirer, Mes épargnes, Mon QR ; invitation identité discrète ; dernières opérations avec statuts explicites                               |
| Mon QR                                | Accueil → QR → même accueil                                                                                          | Nom, numéro partiellement masqué, aucun solde ; identification seule, pas autorisation financière                                                                                  |

Les compositions partagées réutilisent leurs composants. Pas de frame par ligne métier, ni de multiplication d'écrans uniquement pour changer un message.

## Composants sources à conserver et réutiliser

| Source                                                  | ID                                      | Usage / adaptation                                                                                                       |
| ------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Bouton : Primary, Secondary, Disabled, Pressed, Loading | 37:1101                                 | CTA et états existants                                                                                                   |
| Bouton texte                                            | 135:883                                 | Modifier, aide, report et retours secondaires                                                                            |
| Champ : Vide, Rempli, Actif, Erreur, Désactivé          | 65:496                                  | Téléphone, nom et facultatifs ; labels/contextes adaptés                                                                 |
| En-tête accueil / page                                  | 28:1453 / 28:1693                       | Cadre existant et retour ; conserver styles                                                                              |
| Messages / chargement                                   | 66:574 / 66:575                         | Retour local utile ; éviter les messages de cadrage technique dans l'UI                                                  |
| Résultat / dialogue                                     | 66:652 / 66:591                         | Succès, erreur et confirmation ; contenu propre à la tâche                                                               |
| Ligne récapitulative                                    | 158:885                                 | Fiche cliente avant création                                                                                             |
| Code de sécurité                                        | 158:916                                 | Sources 4/6 conservées ; longueur non approuvée, ne pas en déduire le protocole                                          |
| Touch area / clavier numérique                          | 169:887 / 211:994 à 211:1014            | Cibles et saisie, sans fixer PIN/OTP métier                                                                              |
| Carte solde Visible/Hidden                              | 13:589                                  | Composition conservée ; dérivé MVP avec libellé Solde disponible et masquage cohérent                                    |
| Raccourcis illustrés                                    | 35:1102                                 | Déposer / Retirer / Épargnes, sources KOTIZ originales                                                                   |
| Carte objectif / nouvelle épargne / solde simple        | 13:639 / 28:1812 / 28:1773              | Accueil rempli/vide, projets séparés du disponible                                                                       |
| Transactions                                            | 35:1103 / 159:887 / 158:917             | Lignes et statuts explicites ; compléter attente si nécessaire                                                           |
| Navigation principale / onglet actif                    | 28:1538 / 185:957                       | Sources actuelles Accueil/Santé/Score/Profil : dérivé MVP Accueil/Épargnes/Opérations/Profil requis, pas simple réemploi |
| Logo / QR                                               | 13:528, 17:907, 17:946 / 13:533, 17:951 | Instances des sources ; QR de démonstration clairement identifié                                                         |
| Illustrations résultats                                 | 115:192 / 128:192                       | Réemployer si la scène convient ; ne pas confondre création d'épargne et activation de compte                            |
| Logos opérateurs                                        | 225:959/961/963/965                     | Conserver pour lots financiers ; aucune sélection d'opérateur nécessaire dans l'inscription                              |

Bibliothèque inspectée : 18 variables primitives, 54 variables usages/dimensions, 22 variables contexte de démonstration ; 7 styles typographiques Inter. Couleur primaire existante #00564D, espacement 4–32, cibles tactiles 48, contrôles 52, champs 56. Ces valeurs sont observées, pas une nouvelle direction.

Préservation : aucun master supprimé, détaché ou renommé destructivement. Compléments MVP distincts et liés aux mêmes tokens ; les variantes Santé/Score historiques restent conservées. Les anciennes frames sont déjà archivées : ne pas les réactiver comme livrées. Tout écran actif remplacé ultérieurement sera archivé et daté.

## Cohérence visuelle et références

Conserver la Direction 04 : Inter, logo, illustrations, neutres et vert existants ; reprendre la hiérarchie de l'accueil pour les nouvelles compositions. Chaque tâche conserve sa forme : formulaire clair, récapitulatif en lignes, résultat avec prochain geste ; pas une pile uniforme de cartes/messages pour tous les écrans. Destinations en lignes ou actions, cases pour consentements, radios uniquement pour un vrai choix exclusif.

Le benchmark du 8 octobre documente les observations Djamo et Wave ; l'inspection visuelle Revolut y était non aboutie. Les pages officielles Djamo, Wave et Revolut et les liens d'assets Djamo/Revolut ont été reconsultés le 11 octobre. Leur téléchargement local a échoué (résolution réseau), donc aucune comparaison visuelle actualisée ou inspection des parcours complets concurrents n'est revendiquée. La référence Wave choisie antérieurement par le PO reste celle du benchmark, sans transfert de données personnelles.

Références : [benchmark consigné](2026-10-08-finalisation/benchmark-visuel-2026-10-08.md), [Djamo](https://www.djamo.com/fr-ci), [Wave](https://www.wave.com/fr/), [Revolut](https://www.revolut.com/en-DK/ways-to-bank/mobile-banking/). Aucun tarif, service, couleur de marque ou protocole de ces produits transféré à KOTIZ.

## Liens hérités : preuves et action nécessaire

Les réactions de 13:945 pointent notamment vers QR 13:916, masqué 13:1021, épargnes 25:997, opérations 165:3054, retrait 165:3641, Profil 165:2512, Santé 165:7494 et étoiles 165:2881 : destinations vérifiées dans la page archive 0:1. Déposer pointe vers 165:3512 du pilote actif, dont le contexte est alimentation d'une épargne : ne pas considérer ce raccord comme un dépôt général validé.

Aucun de ces liens ne sera copié aveuglément. Lot A devra avoir des départs distincts, des retours vers leur provenance et des frontières de lot explicites, sans bouton silencieux ni lien vers archive. Les raccords B–F restent identifiés comme non livrés tant que leurs parcours n'ont pas été produits/recettés.

## Règles et limites avant production définitive

- Fiche créée ≠ accès personnel activé ≠ rattachement accepté ≠ autorisation financière. Aucun droit au solde global/carnet par création ou invitation.
- Aucun PIN cliente sur téléphone agente ; activation exclusivement sur téléphone cliente. Pièces d'identité dans vérification séparée.
- Aucun doublon ; fiche existante retrouvée selon droits, sans divulgation personnelle avant vérification du numéro.
- G01 : limites, capacité initiale et exigences KYC non chiffrées sans partenaire. G02 : longueur PIN/OTP, expiration, renvoi, tentatives, invitation et reconnaissance appareil ouverts.
- Récupération : SMS seul ne permet pas un nouveau PIN ; entrée REC sans protocole inventé.
- Aucun contact d'assistance, consentement juridique définitif, lien d'installation ou paramètre SMS fabriqué. Scénarios provisoires clairement marqués hors UI métier.

## Recette prévue après production

1. Parcours cliqués depuis leurs départs : autonome, création agente, activation, deux connexions ; succès, attente, erreurs et reprise.
2. Retours, numéro modifiable, invalidation de l'ancien code si changement, saisies utiles conservées, secrets jamais exposés.
3. Trois sorties Compte créé ; accueil vide/rempli, masque cohérent des montants, QR sans solde et retour à la provenance.
4. Quatre racines correctes uniquement sur racines ; aucune barre basse pendant accès, saisie, récapitulatif et résultat.
5. Aucun droit implicite, aucun document KYC dans la création de fiche ; statuts fiche/activation distincts.
6. Composants liés, tokens existants, logos non recolorés ; illustrations appropriées, montants fictifs identifiés, attente distincte du succès.
7. Clavier, petit viewport, lisibilité/contraste, texte long, safe areas et cibles tactiles ; contrôle des chevauchements.
8. Aucun lien archive/hors lot trompeur. Rapport de recette et validation visuelle par lot avant handoff.

Ces contrôles sont **prévus**, pas exécutés sur un nouveau lot A. Aucun nouveau lot Figma ni prototype livré par cet inventaire.
