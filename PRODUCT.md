# Product

## Platform
android

## Users
- **Fatou — cliente épargnante (principale).** Commerçante à Abidjan (Adjamé, Yopougon, Abobo, Treichville), environ 34 ans, épargne pour l'école de ses enfants. Lecture partielle : elle comprend les phrases courtes et les icônes non ambiguës, elle décroche face aux textes longs. Habituée au Mobile Money (Wave, Orange Money), méfiante envers les applications qu'elle ne connaît pas. Objectif : déposer, mettre de côté dans une épargne, savoir ce qu'elle possède et retirer, sans peur de se tromper.
- **Cliente accompagnée.** Même profil, aidée par une agente sur son propre téléphone. Elle saisit elle-même le code SMS, ses consentements et son PIN ; l'agente explique sans jamais voir ses secrets.
- **Moussa — agent terrain (secondaire).** 28-45 ans, souvent ancien collecteur « signé signé ». Veut un outil simple et rapide pour créer une fiche cliente et lancer un dépôt ou un retrait cash. Application agente distincte (ADR-010).

## Product Purpose
En Côte d'Ivoire, environ 2 millions de personnes, surtout des femmes commerçantes, confient leur épargne quotidienne à un collecteur physique : sans trace fiable, sans historique financier, avec un risque de perte. KOTIZ digitalise ce « signé signé » sans le dénaturer : l'agente remplace le collecteur, l'application remplace le carnet. La cliente dépose sur son solde ou dans une épargne (trois actives au maximum), suit ses opérations et retire vers son Mobile Money vérifié ou en espèces auprès d'une agente.

## Operating Context
- **Marché et langues** : Côte d'Ivoire, lancement à Abidjan. Interface en français, tutoiement. Mode vocal optionnel (français, dioula si disponible), jamais par défaut.
- **Appareils** : Android d'entrée de gamme (type Tecno, 2 Go de RAM), petits écrans. Application de 30 Mo maximum.
- **Réseau** : 3G instable et data chère ; au plus 5 Mo consommés par session ; fonctionnement hors ligne partiel. Les attentes réseau doivent être visibles, jamais confondues avec un succès.
- **Environnement** : au marché ou dans la rue, en plein soleil, dans le bruit, souvent interrompue par un client. Un parcours doit pouvoir être repris après une interruption.
- **Formats** : montants en FCFA (XOF), sans décimales, séparateur de milliers par espace (`12 400 FCFA`). Téléphones ivoiriens au format `+225` et 10 chiffres. Dates en français.
- **Habitudes et canaux** : Mobile Money (Wave, Orange Money, MTN, Moov ; liste et frais à confirmer avec le partenaire), SMS pour les codes et les résumés, WhatsApp comme canal familier (automatisation ultérieure). Remise d'espèces en face à face avec l'agente.

## Brand Commitments
- Ton « Akwaba Fatou » : chaleureux, tutoiement, phrases de moins de 10 mots, mots locaux en accroche seulement.
- KOTIZ promet que l'argent de la cliente reste à elle, visible et récupérable, et que chaque opération dit clairement si elle est terminée.
- KOTIZ refuse toute association avec la tontine, ne se présente pas comme une banque et n'accorde pas de crédit.
- KOTIZ n'annonce jamais un frais, un plafond, un délai ou une garantie non confirmés.
- Identité visuelle : Direction 04, typographie Inter, neutres majoritaires, vert de marque réservé aux gestes principaux, au plus deux couleurs de marque par écran.

## Product Principles
1. **Le statut réel avant tout** : une opération en attente ne ressemble jamais à un succès ; « fait », « en attente » et « échoué » se distinguent sans aide.
2. **Le montant et sa destination sont toujours lisibles** : la cliente sait combien sera débité et où va l'argent (solde ou une épargne) avant de confirmer.
3. **Une décision par écran** : un seul bouton principal, des parcours courts, une sortie claire à chaque étape.
4. **Les secrets restent à la cliente** : aucun PIN, code SMS ou consentement saisi par l'agente ; chaque accord (fiche, activation, rattachement, transaction) est distinct.
5. **Rien n'est imposé** : ni premier dépôt, ni projet d'épargne, ni fermeture automatique quand une cible est atteinte.

## Accessibility & Inclusion
- WCAG 2.2 AA sur le contraste ; statut jamais porté par la couleur seule.
- Texte de 14 pt minimum ; prise en charge des grands textes système sans chevauchement.
- Cibles tactiles de 44 × 44 au minimum, 48 pour les commandes fréquentes.
- Icônes non ambiguës associées au texte, pour une lecture partielle.
- Compatibilité TalkBack ; mode vocal optionnel.
- Lisibilité en plein soleil et sur écran bas de gamme ; pas d'animation lourde.

## Positioning
Face au collecteur physique : une trace fiable de chaque versement et un argent récupérable sans dépendre d'une personne. Face aux portefeuilles Mobile Money (Wave, Djamo) : KOTIZ est un outil d'épargne par projets, avec un accompagnement humain par agente pour les clientes qui ne sont pas autonomes sur smartphone. Références de qualité : Wave pour la simplicité de saisie, Djamo pour la chaleur, Revolut pour la finition, sans copier aucune de ces marques.

## Capabilities and Constraints
- KOTIZ est distributeur technologique, adossé à un partenaire agréé. Cadres concernés : BCEAO (monnaie électronique), CENTIF-CI (KYC et lutte anti-blanchiment), ARPD (données personnelles), CIMA (micro-assurance, lot ultérieur).
- KYC progressif : le niveau d'accès dépend de la vérification d'identité ; seuils et pièces à confirmer avec le partenaire.
- Frais, plafonds, opérateurs disponibles, longueur et durée des codes, contrôles de récupération : à confirmer avec le partenaire, jamais inventés dans l'interface.
- Périmètre MVP en vigueur : re-scope du 11 septembre 2026. Hors MVP : assurance Santé, étoiles, score financier, biométrie, rappels et promotions (au backlog), et tontine (jamais).
