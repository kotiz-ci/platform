# Mini-scripts de test — Lot G : app agente, accès et accueil

Date : 30 octobre 2026. Spec associée : [ux-spec-lot-g.md](ux-spec-lot-g.md) (validée par le PO le 30 octobre 2026). Même méthode que [test-lot-a.md](test-lot-a.md) à [test-lot-e.md](test-lot-e.md). Maquettes : canvas « KOTIZ — App cliente », version 35, page « Lot G — app agente » (décision PO du 30 octobre 2026, PO-G11) ; prototype : menu de Main, section « Lot G — app agente » ; index [screens-lot-g.md](screens-lot-g.md).

Numérotation : écrans `G-01` à `G-22`, **toujours avec un tiret**, tous dans l'app agente. Ce ne sont pas les gates `G01` à `G07`. « A · A02 », « E-51 », « E-54 » désignent des écrans des lots A et E.

## Mode d'emploi

- **Testeurs** : le PO joue **Awa, l'agente**, sur le téléphone. Sa conjointe **lit la consigne à voix haute et note** ; elle ne l'aide pas.
  - **Biais connu** : le PO connaît la spec. Il doit faire comme une agente qui découvre l'app : ne pas chercher un écran qu'il sait exister, dire à voix haute ce qu'il lit et ce qu'il croit que fait le bouton. Noter à part ce qu'il trouve facile « parce qu'il sait ». Le lot G devra être revu avec une vraie agente au pilote (2 agentes prévues, re-scope du 1er septembre).
  - Variante possible : inverser les rôles pour G-P1, G-P6 et G-P7 (la conjointe joue Awa, le PO observe). Elle découvre l'app ; c'est le meilleur test de l'orientation.
- **Support** : un téléphone Android qui ouvre le prototype de l'**app agente** (section « Lot G — app agente »). Un second téléphone ou une carte imprimée sert de « téléphone d'Awa » pour lire les SMS.
- **Prototype** : codes SMS fictifs, tout code d'au moins 4 chiffres (0000 = faux, 9999 = expiré). Aucune longueur, durée, nombre d'essais ni délai n'est annoncé (G02).
- **Personnage** : Awa Traoré, agente KOTIZ, code AG-0142, numéro 07 11 22 33 44, zone Adjamé. Cliente pour les raccords : Fatou Koné.
- **PIN agente de démo** : 1357, remis sur papier (longueur finale G02). Le PIN de cliente de Fatou (2468, lot E) n'est **jamais** utilisé ici.
- **Consigne lue à voix haute** : la phrase de la tâche, rien de plus. Bloqué plus de 30 secondes = « bloqué », tâche suivante.
- **À noter pour chaque tâche** : réussie oui / non ; hésitations (où, combien de temps) ; erreurs ; réponse à « C'est fait ou pas ? » (attendue sans aide : fait / en attente / pas fait / bloqué) ; **tout moment où le PO saisit ou cherche un secret qui n'est pas le sien**.
- **Critères du brief observés** : orientation (« Où es-tu ? Dans quelle app ? Que fait ce bouton ? »), statut réel (activé ou pas, accès ouvert ou pas), une décision par écran ; en plus pour ce lot : **le PIN agente n'est pas celui d'une cliente**, et **l'état de l'accès se comprend sans aide** (normal, suspendu, fermé).

Feuille de relevé conseillée : une ligne par tâche, colonnes Réussie · Hésitations · Erreurs · Réponse « c'est fait ? » · Remarque.

### Données fictives du prototype

| Élément         | Valeur                                                  |
| --------------- | ------------------------------------------------------- |
| Agente          | Awa Traoré, AG-0142, 07 11 22 33 44, zone Adjamé        |
| PIN agente démo | 1357                                                    |
| Fonds           | 125 000 FCFA (scénario normal) ; 0 FCFA (fonds épuisés) |
| Cliente         | Fatou Koné (raccords E-51 et opération en cours)        |
| Mise à jour     | « Mis à jour à 14:32 »                                  |

Scénarios du menu du prototype :

| Scénario                  | Ce qui se passe                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| « Première activation »   | Le numéro a un accès à activer ; parcours G-01 → G-08 → accueil première fois               |
| « Activation incertaine » | Le réseau tombe à G-07 : G-08 « On vérifie ton accès. »                                     |
| « Téléphone habituel »    | L'app s'ouvre sur G-09 ; accueil normal                                                     |
| « Nouveau téléphone »     | G-01 → G-02 → G-03 → G-09 → G-11 ; « KOTIZ accepte › » dans la bande mène à G-20 (ADR-0021) |
| « PIN oublié »            | G-12, puis (après « KOTIZ a autorisé ») G-02 → G-03 → G-06 → G-07 → G-08′                   |
| « PIN bloqué »            | Trois PIN faux sur G-09 → G-12 variante bloquée                                             |
| « Accès suspendu »        | Accueil en état suspendu ; une opération en cours avec Fatou (retrait à remettre, E-64)     |
| « Accès fermé »           | G-09 → G-14                                                                                 |
| « Fonds épuisés »         | Accueil avec 0 FCFA et le message                                                           |
| « Hors connexion »        | Accueil avec « Mis à jour à 14:32 · hors connexion »                                        |
| « Mauvaise app »          | Le numéro saisi n'a pas d'accès agente : G-10                                               |

## Nombre d'écrans par chemin principal

| Parcours                          | Écrans                                                  |
| --------------------------------- | ------------------------------------------------------- |
| G-P1 Activer mon accès            | 8 — G-01 G-02 G-03 G-05 G-06 G-07 G-08 G-20             |
| G-P2 Téléphone habituel           | 2 — G-09 G-20                                           |
| G-P3 Nouveau téléphone            | 6 — G-01 G-02 G-03 G-09 G-11 G-20                       |
| G-P4 PIN oublié ou bloqué         | 2 + 7 — G-09 G-12 ; G-01 G-02 G-03 G-06 G-07 G-08′ G-20 |
| G-P5 Accès suspendu ou fermé      | 2 — G-09 G-20 suspendu ; G-09 G-14                      |
| G-P6 Accueil et ses trois entrées | 1 + écrans des lots A et E                              |
| G-P7 Pas d'accès agente           | 4 — G-01 G-02 G-03 G-10                                 |

## G-P1 — Activer mon accès agente

Départ : scénario « Première activation ». Le SMS d'accès est lu sur la carte : « KOTIZ : ton accès agente est prêt. Installe l'app KOTIZ Agent et connecte-toi avec ce numéro. » (brouillon, contenu G02).

| #   | Tâche                                                                                        | Réussite attendue                                                                                                        | À observer                                                                                     |
| --- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| 1   | « Tu as reçu ce SMS. Active ton accès agente. »                                              | G-01 Me connecter → numéro → code → G-05 « Oui, c'est moi » → PIN 1357 deux fois → G-08 « Ton accès agente est activé. » | Cherche-t-il un bouton « Activer » sur G-01 ? Comprend-il qu'un seul « Me connecter » suffit ? |
| 2   | « Avant ton PIN, l'app t'a montré quelque chose. Quel est ton code agente ? »                | « AG-0142 », vu sur G-05                                                                                                 | A-t-il lu G-05 ou l'a-t-il passé ? Comprend-il « Ce n'est pas moi » ?                          |
| 3   | Scénario « Activation incertaine » : « Recommence. Ton accès est-il activé ? Que fais-tu ? » | « Pas encore : on vérifie » ; touche « Vérifier à nouveau », ne recrée pas de PIN                                        | Prend-il l'attente ambre pour un succès ? Recommence-t-il tout le parcours ?                   |

## G-P2 — Me connecter sur mon téléphone habituel

Départ : scénario « Téléphone habituel ».

| #   | Tâche                                                                      | Réussite attendue                                                            | À observer                                                                                        |
| --- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | « C'est le matin, tu commences ta journée. Ouvre ton app agente. »         | G-09 → PIN 1357 → G-20                                                       | Temps jusqu'à l'accueil ; reconnaît-il qu'il est dans l'app agente (« Agente KOTIZ · AG-0142 ») ? |
| 2   | « Tu tapes un mauvais PIN. Que dit l'app ? Que fais-tu ? »                 | « PIN incorrect. Réessaie. » ; ressaisit                                     | Le message est-il lu ? Aucun nombre d'essais n'est annoncé : le cherche-t-il ?                    |
| 3   | « Fatou te dit : "Mets mon PIN pour aller plus vite." Où l'écrirais-tu ? » | « Nulle part : ce n'est pas mon PIN, l'app agente n'a pas de champ pour ça » | Confond-il « PIN agente » et PIN de la cliente ? Cherche-t-il un champ ?                          |

## G-P3 — Me connecter sur un nouveau téléphone

Départ : scénario « Nouveau téléphone ».

| #   | Tâche                                                   | Réussite attendue                                                                           | À observer                                                                           |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | « KOTIZ t'a donné un nouveau téléphone. Connecte-toi. » | G-01 → numéro → code → G-09 PIN → G-11 → (KOTIZ accepte) → G-20                             | Croit-il devoir réactiver son accès ? Saisit-il un nouveau PIN au lieu de l'ancien ? |
| 2   | « Le SMS n'arrive pas. Que fais-tu ? »                  | « Je n'ai pas reçu le code » → G-04 → vérifie le numéro ou Renvoyer                         | Trouve-t-il G-04 ? Va-t-il directement à « Contacter l'aide » ?                      |
| 3   | Sur G-11 : « Peux-tu faire un dépôt maintenant ? »      | « Non, KOTIZ doit d'abord accepter ce téléphone » ; touche « Vérifier à nouveau » plus tard | Prend-il « En attente » pour une panne ? Cherche-t-il un délai ?                     |

## G-P4 — PIN oublié ou bloqué

Départ : scénario « PIN oublié », puis « PIN bloqué ».

| #   | Tâche                                                                                  | Réussite attendue                                                                 | À observer                                                                                            |
| --- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | « Tu as oublié ton PIN agente. Que dois-tu faire ? »                                   | G-09 « PIN oublié ? » → G-12 ; « Je contacte KOTIZ, ils vérifient que c'est moi » | Cherche-t-il une récupération par SMS seul ? Lit-il « Personne chez KOTIZ ne te demandera ton PIN » ? |
| 2   | « KOTIZ a vérifié. Tu as reçu un SMS. Crée ton nouveau PIN. »                          | G-01 → numéro → code → G-06 « Crée ton nouveau PIN agente » → G-07 → G-08′        | Reconnaît-il le même chemin que l'activation ? G-05 absent : est-ce gênant ?                          |
| 3   | Scénario « PIN bloqué » : « Ton PIN ne passe plus. Est-ce que réessayer va marcher ? » | « Non, il est bloqué ; je contacte KOTIZ »                                        | Cherche-t-il une durée de blocage (aucune n'est affichée, G02) ? Continue-t-il à taper ?              |

## G-P5 — Accès suspendu ou fermé

Départ : scénario « Accès suspendu » (une remise de retrait à Fatou est en cours), puis « Accès fermé ».

| #   | Tâche                                                                                | Réussite attendue                                                                             | À observer                                                                             |
| --- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1   | « Ouvre ton app. Peux-tu faire un dépôt pour une cliente aujourd'hui ? Pourquoi ? »  | « Non, mon accès est suspendu » ; voit « Trouver une cliente » désactivé avec la raison       | Cherche-t-il le motif ? Comprend-il « suspendu » (pause) vs « fermé » (fin) ?          |
| 2   | « Fatou attend les espèces de son retrait déjà fait. Que fais-tu ? »                 | Touche « Opération en cours avec Fatou Koné › » → E-64 → remet les espèces quand l'app le dit | Croit-il ne plus pouvoir rien faire ? Trouve-t-il l'`InfoLine` sous le message rouge ? |
| 3   | Scénario « Accès fermé » : « Tu ouvres ton app. Que se passe-t-il ? Et tes fonds ? » | G-14 « Ton accès agente est fermé. » ; « Je contacte KOTIZ pour mes fonds »                   | Lit-il « Fermé » comme une erreur réparable ? Cherche-t-il un bouton pour rouvrir ?    |

## G-P6 — Accueil et ses trois entrées

Départ : scénario « Téléphone habituel », accueil normal ; puis « Fonds épuisés » et « Hors connexion ».

| #   | Tâche                                                                                                                                    | Réussite attendue                                                                                           | À observer                                                                                                 |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | « Fatou arrive pour déposer 5 000 F. Commence. » Puis : « Une nouvelle commerçante veut s'inscrire. Commence. »                          | 1) « Trouver une cliente » → E-51 ; 2) « Ajouter une cliente » → A · A02, puis retour à l'accueil après A04 | Hésite-t-il entre « Trouver » et « Ajouter » ? Le libellé « Trouver une cliente » se comprend-il (PO-G9) ? |
| 2   | « Fatou regarde ton écran. Combien as-tu de fonds ? Montre-le-toi sans qu'elle le voie. »                                                | Voit « ••• ••• FCFA », touche l'œil, lit 125 000 FCFA, le masque à nouveau ; ou ouvre Mes fonds             | Trouve-t-il l'œil ? Comprend-il que ce sont les fonds pour les dépôts, pas son argent personnel (PO-G6) ?  |
| 3   | Scénario « Fonds épuisés » puis « Hors connexion » : « Peux-tu faire un retrait pour Fatou ? Et un dépôt ? Tes fonds sont-ils à jour ? » | « Retrait oui, dépôt non » ; « Pas à jour : mis à jour à 14:32, hors connexion »                            | Croit-il que tout est bloqué à 0 F ? Lit-il la ligne « hors connexion » ou croit-il le montant actuel ?    |

## G-P7 — Ce numéro n'a pas d'accès agente

Départ : scénario « Mauvaise app ». Consigne de rôle : « Tu es Fatou, cliente KOTIZ. Tu as installé la mauvaise app. »

| #   | Tâche                                                                                         | Réussite attendue                                                          | À observer                                                                    |
| --- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | « Connecte-toi avec ton numéro de cliente. »                                                  | G-10 « Pas d'accès agente à ce numéro » ; « Je dois utiliser l'app KOTIZ » | Le titre suffit-il ? Comprend-il qu'il est dans l'app agente dès G-01 ?       |
| 2   | « L'écran a-t-il dit quelque chose sur ton compte cliente ? »                                 | « Non, rien »                                                              | Attend-il une information (solde, nom) ? Est-ce rassurant ou inquiétant ?     |
| 3   | Rôle Awa : « Ta formation est finie mais KOTIZ n'a pas encore créé ton accès. Que fais-tu ? » | Arrive sur G-10 ; « Contacter l'aide » ou attendre le SMS d'accès          | Croit-il avoir fait une erreur de saisie ? Retape-t-il son numéro en boucle ? |

## Synthèse attendue après la séance

Pour chaque parcours : tâches réussies sur 3, écrans d'hésitation, réponses « c'est fait ? » erronées. Une tâche échouée deux fois devient une correction prioritaire avant la critique (`critique-design`). **Toute confusion entre PIN agente et PIN de cliente (G-P2-3), même une fois, est prioritaire.**

Points que le test observe (sans les trancher d'office) : une seule porte « Me connecter » pour activer (G-P1-1) ; lecture de G-05 (G-P1-2) ; attente d'activation lue comme un succès (G-P1-3) ; nouveau téléphone vs réactivation (G-P3-1) ; lecture de G-11, accord de KOTIZ obligatoire (G-P3-3, PO-G3, ADR-0021) ; réinitialisation par KOTIZ comprise (G-P4-1, PO-G4) ; état suspendu et opération à finir (G-P5-1, G-P5-2, PO-G5) ; « Fermé » vs « Échoué » (G-P5-3) ; libellé « Trouver une cliente » (G-P6-1, PO-G9) ; montant des fonds masqué (G-P6-2, PO-G6) ; fonds épuisés sans blocage des retraits (G-P6-3, PO-G7) ; garde-fou mauvaise app (G-P7).

Hors test (pas de protocole) : solidité du second facteur (ADR-0021, valeurs G02), paramètres des codes et du PIN (G02), contact d'aide (G03), définition des fonds et rechargement (#70, G01), Mes clientes, tableau de bord et commissions (hors lot).
