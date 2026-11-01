# KOTIZ — Audit professionnel des composants Figma

11 octobre 2026. **Verdict : base visuelle sérieuse, bibliothèque insuffisamment consolidée pour être un design system professionnel prêt à produire le socle.** Les composants ne sont pas tous médiocres : boutons et champs possèdent une structure convaincante. Les blocages se concentrent sur la cohérence produit, la confidentialité, la synchronisation des données et les règles de réemploi.

## Méthode et preuves

Audit Figma lecture seule, orchestrateur + deux agents indépendants : `audit_craft` pour jugement visuel, `audit_structure` pour structure/propriétés. Impeccable fournit les critères de qualité ; audit adapté au fichier de design, sans audit de code applicatif. Aucun détecteur HTML/CSS, performance runtime ou lecteur d'écran n'est présenté comme testé.

Fichier <https://www.figma.com/design/Ejhn5axhlQERtHPKYQ39gp> ; page composants 34:1090, identité 75:1119 ; usages de référence accueil 13:945, solde masqué 13:1021, accès 165:1647/165:1945. Source produit : PRD v1.0 et inventaire lot A. Aucune réouverture FIN-01–05, aucune direction visuelle nouvelle.

Captures examinées : planches boutons 75:770, champs 75:777, messages 75:1105, dialogues/résultats 75:1112 ; en-tête 28:1693, solde 13:589, objectif 13:639, raccourcis 35:1102, code 158:916, récap 158:885, tableau 159:887, touche 211:994, bouton texte 135:883, catalogue identité 76:2. Les captures isolées à fond transparent ne servent pas à conclure un contraste sur fond noir.

Catalogue composants : 62 propriétaires natifs (composants hors sets + sets), dont 12 sets ; 44 descriptions non vides, complétées par des guides visibles. Sept styles typographiques Inter. Variables, styles et propriétés réellement inspectés ; leur présence n'est pas assimilée à une validation d'usage.

Mesures détaillées (`KOTIZ/_archive/2026-10-docs-avant-migration/06_Design/2026-10-11-audit-composants-mesures.json`) : contrastes calculés depuis couleurs solides et fond opaque ancêtre le plus proche. Valeurs arrondies pour lecture ; ni transparences, ni arrière-plans non résolus, ni conformité globale évalués par cette méthode.

## Ce qui est effectivement solide

- Boutons 37:1101 : cinq variantes liées à la source 37:1091, 350 × 52, auto-layout et tokens. Les instances internes sont exposées : libellé TEXT et chargement BOOLEAN réellement configurables. Ne pas affirmer à tort que seul Appearance est éditable.
- Champs 65:496 : cinq états, libellé permanent, saisie 350 × 56, erreur textuelle, texte wrapping HEIGHT, aide/suffixe configurables. Source commune 65:455, couleurs/dimensions/padding/bordures liés. La construction permet la variation du contenu.
- En-têtes : titre/salutation éditables, retour et notification 48 × 48 ; icônes 24 × 24 à l'intérieur. Les dimensions des icônes ne sont pas celles des cibles tactiles.
- Raccourcis illustrés 35:1102 : illustrations originales, actions distinctes, composition 96 × 93 par raccourci. Carte objectif 13:639 : hiérarchie titre/objectif/montant/progression lisible sur l'exemple.
- Contrastes textuels mesurés : bouton primaire 8,61:1 ; aides de champ 4,76:1 ; détails de messages à partir de 4,56:1 ; navigation inactive 5,24:1. Aucun échec textuel de contraste démontré sur ces échantillons opaques. Les aides à 12 px restent à apprécier en situation, sans déclarer cette taille non conforme par elle-même.

Le seuil de référence pour le texte courant est 4,5:1 ; textes larges et contrôles inactifs ont des traitements distincts. [W3C — contraste minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). La cible KOTIZ de 48 px est un choix du système mobile, pas le seuil universel WCAG : [W3C — taille de cible](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## Défauts classés et corrections précises

### F01 — P1 : navigation incompatible avec le socle

Sources 28:1538 et 185:957 : Accueil / Santé / Score / Profil. Le socle exige Accueil / Épargnes / Opérations / Profil. L'accueil hérite aussi de liens vers les archives Santé/étoiles. Effet : le composant peut propager le mauvais modèle de produit sur chaque racine.

Correction : conserver les sources historiques ; définir une source MVP explicite, quatre destinations validées et états actifs cohérents, sans modifier silencieusement les anciens usages. Ne pas exposer les lots reportés dans le socle.

### F02 — P1 : confidentialité et vocabulaire de la carte solde

13:589, variantes 13:562/13:588 : Hidden masque le montant principal mais conserve « 12 500 F » mensuel. L'accueil masqué 13:1021 conserve aussi montants projet/opérations. Le libellé « Épargne disponible » brouille disponible et projets.

Correction : dérivé MVP avec « Solde disponible » ; définir le périmètre du masquage, couvrir au minimum tous les montants de la carte et contrôler les autres surfaces. Garder le couple montant/QR et l'identité de l'accueil ; l'audit ne commande pas de réduire ou supprimer le QR validé.

### F03 — P1 : progression éditable désynchronisable

Carte 13:639 : le texte « 65 % » est une propriété TEXT, mais la barre 13:637 mesure 207 px dans un conteneur de 318 px ; son seul binding observé porte sur la couleur. Aucun lien de largeur au pourcentage éditable. L'exemple actuel est cohérent (~65 %), mais modifier le texte ne garantit pas la barre correspondante.

Correction : contrat commun pour montant épargné/cible/pourcentage/barre, variante ou variable adaptée au prototype, vérification de synchronisation à chaque changement. Ne pas prétendre que le composant calcule les montants.

### F04 — P2 : adaptation aux largeurs et contenus longs fragile

Navigation 28:1538 et 185:889–940 : largeur 390, quatre cases FIXED de 91,5 et padding 12 + 12 = 390 requis. Carte objectif : conteneur titre 240 FIXED, clipsContent true, texte WIDTH_AND_HEIGHT ; titre long peut dépasser sans retour à la ligne. Ligne d'opérations 159:887 est explicitement desktop à 940 px, pas une source mobile prête à employer.

Correction : navigation répartie avec FILL ; titre de projet largeur contrainte + HEIGHT et hauteur HUG ; utiliser une vraie ligne mobile dans les parcours mobiles. Risques déduits de la structure : aucun redimensionnement de canvas ni test de nom long exécuté pendant cet audit.

### F05 — P2 : contrat d'états bouton incomplet

37:1101 mêle hiérarchie et état dans Appearance = Primary/Secondary/Disabled/Pressed/Loading. Secondary + Pressed/Loading n'est pas décrit par les variantes ; BOOLEAN chargement permet des assemblages à encadrer.

Correction : préciser les combinaisons réellement nécessaires ; séparer hiérarchie et état si elles sont utilisées. Conserver le craft existant, pas reconstruire les boutons pour leur apparence. Un état hover web n'est pas une exigence automatique pour un prototype mobile.

### F06 — P2 : code SMS/PIN sans contrat complet

158:916 : Chiffres=4|6, labels/aides/chiffres éditables, mais aucun état de saisie active/erreur représenté comme variante ; description vide. PIN et SMS sont différenciés par des textes d'exemple, pas par un contrat d'interaction complet.

Correction : documenter rôle, focus, saisie, effacement, erreur et masquage ; composer les usages distincts avec numéro/Modifier/renvoi pour SMS. Ne pas fixer une longueur PIN/OTP, durée ou tentative : ces paramètres restent G02. Les nombres des variantes ne sont pas une validation métier.

### F07 — P2 : sémantique de statut non protégée

158:917 : titre/détail et icône INSTANCE_SWAP indépendants, preferredValues vides. Un assemblage peut afficher une icône échec avec « Versement confirmé ». La description interdit correctement de confirmer un résultat sur timeout, mais cette règle n'est pas représentée par des presets cohérents.

Correction : presets explicites attente/succès/échec connu/incertitude selon les parcours, icônes recommandées, copie et sorties permises. Incertitude = suivi, pas répétition. Ne pas transformer cette amélioration structurelle en nouveau protocole financier.

### F08 — P2 : confirmation et résultats trop génériques pour certains usages

66:591 demande de vérifier nom/montant sans emplacement de résumé. 66:652 propose deux résultats simples ; les masters illustrés 120:866/129:871 existent déjà pour l'épargne. Aucun de ces résultats ne représente automatiquement « Compte créé » avec trois sorties ni « Fiche créée / Accès non activé ».

Correction : confirmation avec données utiles ou rôle strictement limité à une confirmation après récap visible ; compositions métier de lot A à partir des sources existantes. Conserver les messages sobres pour les retours locaux, illustrations adaptées pour les moments majeurs. Un résultat simple n'est pas intrinsèquement mauvais.

### F09 — P2 : finitions ajoutées hors contrat commun

Clavier 211:994–1014 : onze maîtres indépendants, touches 108 × 52, couleurs liées mais dimensions/rayon 8 bruts, pas de propriétés ni états. Récap 158:885, tableau 159:887, statut 158:917 et reçu compact 198:988 : couleurs liées, mais textes sans textStyleId ; leur description peut annoncer des styles sans lien typographique réel.

Correction : source de touche commune et contrat pressed/disabled si ce clavier est retenu ; documenter choix custom/natif, ne pas l'imposer par l'existence du dessin. Relier typographie des ajouts aux styles ou documenter des tokens équivalents. Aucune cible tactile trop petite démontrée sur le clavier.

### F10 — P2 : règles de réemploi et documentation à consolider

Index 13:460 présente onze familles, ajouts code/clavier/zone tactile/navigation active hors sections. Guide 75:1044 annonce 44 alors que headers sont 48. Navigation principale et source active historique coexistent. Propriétés de carte objectif nommées avec les valeurs de démonstration (« 65 % », « Rentrée des enfants ») plutôt qu'un sens durable. La description 120:866 parle d'illustration vectorielle alors que la source 115:192 inclut un rectangle image PNG.

Correction : index vivant, propriétaires recommandés et dépréciations explicites ; noms de propriétés sémantiques, documentation règles/états/usage et nature des assets. Des guides existent déjà pour boutons/champs : ne pas déclarer toute la bibliothèque non documentée.

## Verdict composant par composant

« Conserver » = base contrôlée et adaptée, pas certification de tous les contextes ; « adapter » = corriger le contrat sans nouvelle direction ; « recomposer » = modifier l'organisation du composant, en préservant les sources.

| Famille / ID                         | Verdict                                           | Condition avant lot A                                                                                                             |
| ------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Boutons 37:1101                      | Conserver et compléter contrat                    | Combinaisons hiérarchie/état, libellés longs                                                                                      |
| Bouton texte 135:883                 | Conserver                                         | 52 px existants ; destination et état selon contexte                                                                              |
| Champs 65:496                        | Conserver, adapter usages                         | Téléphone/nom/facultatifs/consentements distincts ; aucun nom d'épargne obligatoire déduit du gabarit                             |
| En-têtes 28:1453/28:1693             | Conserver                                         | Titre long et retour vers provenance                                                                                              |
| Messages 66:574                      | Conserver, adapter copies                         | Utilité locale ; aucune erreur de cadrage technique affichée comme message produit                                                |
| Chargement 66:575                    | Conserver, contextualiser                         | Attente compréhensible, pas succès prématuré ; animation runtime non vérifiée                                                     |
| Dialogue 66:591                      | Adapter composition                               | Données réellement à confirmer                                                                                                    |
| Résultats 66:652, 120:866, 129:871   | Composer selon tâche                              | Compte/Fiche/Activation distincts ; sorties appropriées                                                                           |
| Solde 13:589, simple 28:1773         | Recomposer localement / adapter                   | Disponible, confidentialité, wrapper tactile intégré                                                                              |
| Projet 13:639                        | Conserver craft, corriger structure               | Texte long et synchronisation progression                                                                                         |
| Nouvelle épargne 28:1812             | Adapter contenu                                   | Créer un projet utile plutôt que centrer l'état vide sur les illustrations                                                        |
| Raccourcis 35:1102                   | Conserver                                         | Actions compactes, libellés et destinations inspectés                                                                             |
| Navigation 28:1538/185:957           | Dérivé MVP requis                                 | Racines validées, source unique recommandée, redistribution largeur                                                               |
| Code 158:916                         | Compléter                                         | Rôle/états ; G02 non inventé                                                                                                      |
| Récapitulatif 158:885                | Conserver structure, consolider style             | Typographie réellement liée, libellé pertinent fiche ou mouvement                                                                 |
| Tableau 159:887                      | Réserver desktop                                  | 940 px ; ne pas désigner cette source comme ligne mobile prête                                                                    |
| Reçu compact 198:988                 | Adapter aux données                               | Fonds/noms longs, styles et largeur réelle ; pas de preuve tous formats                                                           |
| Statut 158:917                       | Compléter                                         | Presets état/texte/icône cohérents                                                                                                |
| Clavier 211:994–1014                 | Consolider si retenu                              | Source commune ; choix natif/custom explicite                                                                                     |
| Zone tactile 169:887                 | Conserver, intégrer                               | Toujours associée à un repère visible ; wrapper au bon niveau                                                                     |
| Logo, illustrations, QR              | Conserver identité                                | Nature d'asset correcte, illustration pertinente et QR démonstration explicite                                                    |
| Logos opérateurs 225:959/961/963/965 | Conserver sources, validation visuelle ultérieure | Descriptions/proportions inspectées ; authenticité comparée à sources officielles non recertifiée par cet audit, hors inscription |

## Faux positifs retirés et limites

- **Œil 18 px ≠ cible accueil 18 px.** Accueil 13:945 : overlay 180:8548, 48 × 48, bounds (16961,10372), œil bounds (16976,10387,18,18), lien vers 13:1021. L'œil est couvert. Le master carte reste dépendant de cette intégration externe : rendre ce réemploi sûr, sans accuser l'accueil d'une cible trop petite.
- Les sets de variantes peuvent avoir layout NONE tandis que leurs composants internes sont correctement en auto-layout. Ce n'est pas un défaut automatique.
- Propriétés visibles sur sources imbriquées exposées : ne pas déclarer boutons/champs non éditables sur la seule lecture du set.
- Pas de thème sombre demandé : son absence ne constitue pas ici un défaut bloquant.
- Contraste sur échantillons ≠ certification AA ; pixels Figma ≠ preuve de tailles natives finales. Lecteur d'écran, clavier réel, texte agrandi, appareil, gestes et performances restent non vérifiés.
- Publication bibliothèque, gouvernance de versions, variantes réellement livrées en code et fidélité d'implémentation non vérifiées. Aucun score UX global artificiel attribué à des parcours non produits.

## Ordre de correction recommandé

1. Corriger F01/F02 et sécuriser F03 ; conserver les sources et l'accueil comme autorité visuelle.
2. Consolider états/propriétés/réemploi F04–F07/F09, puis documentation F10.
3. Composer les résultats et formulaires de lot A avec ces sources F08 ; produire seulement les parcours autorisés.
4. Vérifier petits viewports, noms/montants longs, masquage, états, retours et liens ; validation visuelle sur un échantillon représentatif avant propagation.

Cet audit ne valide aucun nouveau composant, ne modifie aucun canvas et ne livre aucun lot A. Il remplace l'affirmation générale « composants réutilisables » par des décisions et conditions vérifiées.
