# Mini-scripts de test — Lot C : dépôt, affectation, opérations et reçus

Date : 19 octobre 2026, mis à jour avec les décisions PO du même jour (Q1 à Q9, Q11). Spec associée : [ux-spec-lot-c.md](ux-spec-lot-c.md). Même méthode que [test-lot-a.md](test-lot-a.md) et [test-lot-b.md](test-lot-b.md). À jouer quand les maquettes du lot C seront dans le canvas « KOTIZ — App cliente ».

Numérotation : écrans `C-01` à `C-16` (avec tiret ; l'ancien écran PIN C-09 est supprimé, les suivants renumérotés) ; « A · C01 » est le PIN de connexion du lot A.

## Mode d'emploi

- **Testeurs** : le PO (observateur) et sa conjointe (cliente). Une seule personne observe ; elle ne parle pas pendant la tâche.
- **Support** : prototype cliquable Claude Design ouvert sur un téléphone Android, luminosité moyenne. Données fictives annoncées comme telles.
- **Personnage** : « Fatou Koné ».
- **Consigne lue à voix haute** : la phrase de la tâche, rien de plus. Pas d'aide. Bloquée plus de 30 secondes = « bloquée », tâche suivante.
- **Pas de PIN dans le lot C** (Décision PO du 19 octobre 2026, Q3) : dépôt, mise de côté et reprise se confirment au récapitulatif. Si la testeuse cherche un PIN, le noter.
- **Validation chez l'opérateur** : simulée dans le prototype par un écran « Wave (simulation) » avec un bouton « Valider ». Le dire avant la séance : « Quand Wave te demande de valider, appuie sur Valider. » Le vrai protocole est à confirmer (G01).
- **Frais** : le dépôt Mobile Money utilise un scénario « frais fictifs » annoncé dans la bande du prototype, hors produit (Décision PO du 19 octobre 2026, Q1) ; une variante montre l'état « frais inconnus » (dépôt bloqué). Ne jamais présenter ces valeurs comme réelles. La mise de côté depuis le solde est sans frais (Q2).
- **À noter pour chaque tâche** : réussie oui / non ; hésitations (où, combien de temps) ; erreurs ; réponse à « C'est fait ou pas ? » (attendue sans aide : fait / en attente / échoué, ou « le dépôt est fait mais pas l'épargne »).
- **Critères du brief observés** : orientation (« Où es-tu ? Que fait ce bouton ? »), montant dominant et destination lisible, statut réel, une décision par écran.

Feuille de relevé conseillée : une ligne par tâche, colonnes Réussie · Hésitations · Erreurs · Réponse « c'est fait ? » · Remarque.

### Données fictives du prototype

| Élément | Valeur |
|---|---|
| Numéro | 07 08 12 34 56 (fictif) |
| Opérateurs du prototype | Wave, Orange Money (liste réelle à confirmer, G01) |
| Solde disponible | 12 400 FCFA |
| École Awa | École, 45 000 F sur 100 000 F |
| Boutique | Commerce, 8 000 F sur 50 000 F |
| Tabaski | Fête, 52 000 F sur 50 000 F, objectif atteint (scénario « 3 actives ») |
| Moto | Véhicule, fermée le 12 oct. |
| Références | KTZ-2610-0042… (fictives) ; dossier n° 2610-0007 (fictif) |

Scénarios du menu du prototype :

| Scénario | Ce qui se passe |
|---|---|
| « Dépôt fait » | Le dépôt et, s'il y a lieu, la mise de côté réussissent |
| « Dépôt en attente » | Le dépôt reste en attente après la validation |
| « Mise de côté échouée » | Dépôt fait, mise de côté vers l'épargne échouée (confirmée) |
| « Solde baissé » | Comme le précédent, et le solde est à 3 000 F au moment de reprendre |
| « Épargne fermée » | Comme « Mise de côté échouée », et École Awa est fermée au moment de reprendre |
| « Historique » | Opérations remplie : dépôts faits, en attente, échoué, un dépôt vers École Awa « Dépôt fait · épargne pas faite » (une seule ligne, Q4), une mise de côté depuis le solde, un retour au solde, un retrait (lot D), un dossier résolu, une correction confirmée |
| « Frais inconnus » | Variante : le récapitulatif du dépôt bloque « Déposer » (Q1) |

## Nombre d'écrans par chemin principal

| Parcours | Écrans | Séquence |
|---|---|---|
| C-P1 Déposer sur mon solde | 6 | C-00 C-01 C-02 C-03 C-04 C-05 |
| C-P1′ Déposer auprès d'une agente (raccord lot E) | 2 | C-00 C-17, puis A · Q01 |
| C-P2 Mettre de l'argent par Mobile Money | 6 | C-06 C-01 C-02 C-03 C-04 C-05 |
| C-P3 Mettre de l'argent depuis mon solde | 4 | C-06 C-07 C-08 C-09 |
| C-P4 Reprise (fonds suffisants / diminués / épargne fermée) | 3 / 4 / 4 | C-05 C-08 C-09 / + C-07 / + C-10 |
| C-P5 Limite de 3 au choix de destination | 1 | C-10 (« 3 épargnes actives : c'est le maximum. ») |
| C-P6 Opérations, détail, reçu | 3 | C-11 C-12 C-13 |
| C-P7 Signaler et suivre | 3 | C-12 C-14 C-15 |
| C-P8 Contester | 2 | C-15 C-16 |

## C-P1 — Déposer sur mon solde (6 écrans)

Départ : scénario « Dépôt fait », accueil A · H01, solde 12 400 F.

| # | Tâche lue à la testeuse | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu veux mettre 5 000 FCFA de ton Wave sur KOTIZ. Fais-le. Arrête-toi quand c'est fini. » | Déposer → « Par Mobile Money » (sans hésiter) → Wave → 5 000 → récapitulatif → « Déposer 5 000 F » → valide sur l'écran Wave simulé → « 5 000 F sont sur ton solde. » ; dit « c'est fait » | Avant de valider, demander : « Combien va partir de ton Wave ? Où va l'argent ? » (attendu : le montant débité affiché, vers Mon solde). Hésite-t-elle sur « Comment tu veux déposer ? » (chronométrer) ? Demander aussi : « De quel numéro part l'argent ? » (attendu : son numéro, affiché, non modifiable). Cherche-t-elle à changer de numéro ? Cherche-t-elle à taper son code Wave dans KOTIZ ? Comprend-elle l'écran « Valide sur ton téléphone » ? |
| 2 | Scénario « Dépôt en attente » : « Refais un dépôt de 2 000 FCFA. » Puis, sur le résultat : « Ton argent est-il arrivé ? Que fais-tu maintenant ? » | « Non, il est en attente » ; ne refait pas le dépôt ; sait le retrouver dans Opérations | Lit-elle « Envoyée » / « Validée » comme « fait » ? Tente-t-elle Réessayer ou de refaire le dépôt ? |
| 3 | Retour à l'accueil : « Combien as-tu sur ton solde maintenant ? Et le dépôt de 2 000 F ? » | « 17 400 F » ; « le dépôt de 2 000 F est en attente » (ligne « Dernier dépôt … En attente ») | Croit-elle que le solde inclut les 2 000 F en attente ? Retrouve-t-elle le dépôt en touchant « Dernier dépôt » ? |

## C-P1′ — Déposer auprès d'une agente (2 écrans, raccord lot E)

Départ : accueil A · H01. Ajouté avec la Décision PO du 19 octobre 2026 (« Déposer » ouvre « Comment tu veux déposer ? »).

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu as 3 000 FCFA en espèces. Tu veux les mettre sur KOTIZ avec une agente. Comment fais-tu ? » | Déposer → « Auprès d'une agente » **sans hésiter** → lit « Montre Mon QR à une agente » | Temps de choix sur la feuille (moins de 5 secondes attendu) ; hésite-t-elle entre les deux options ? |
| 2 | Suite : « Montre ce que tu vas présenter à l'agente. » | Afficher Mon QR → Mon QR (A · Q01) | Trouve-t-elle le bouton ? Comprend-elle que le QR ne paie rien ? |
| 3 | « Ton argent est-il déjà sur KOTIZ ? » | « Non, pas avant que l'agente le fasse et que je confirme » | Croit-elle le dépôt fait en voyant l'explication ? |

## C-P2 — Mettre de l'argent dans une épargne par Mobile Money (6 écrans)

Départ : scénario « Dépôt fait », accueil.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu veux mettre 5 000 FCFA de ton Wave directement dans l'épargne École Awa. Fais-le. » | Épargnes (ou une épargne de l'accueil) → École Awa → Mettre de l'argent → Mobile Money → Wave → 5 000 → récapitulatif « 1. Arrive sur ton solde 2. Passe dans École Awa » → validation → « 5 000 F sont dans École Awa. » | Passe-t-elle par l'épargne, ou cherche-t-elle depuis « Déposer » de l'accueil (proposition PNV-1) ? Combien de temps pour trouver ? |
| 2 | Sur le récapitulatif, avant de valider : « Où va l'argent, exactement ? » | « D'abord sur mon solde, puis dans École Awa » ou « dans École Awa » | Les deux temps l'inquiètent-ils (« ça passe par où ? ») ou la rassurent-ils ? |
| 3 | Après le résultat, revenir à l'accueil : « Ton solde a-t-il bougé ? Pourquoi la carte dit "Dernier dépôt + 5 000 F" ? » | « Non, l'argent est dans École Awa » | Est-elle troublée par « + 5 000 F Fait » à côté d'un solde inchangé ? (sert à trancher PNV-2) |

## C-P3 — Mettre de l'argent depuis mon solde (4 écrans)

Départ : scénario « Dépôt fait », B · B07 Boutique (8 000 F sur 50 000 F), solde 12 400 F.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Mets 4 000 FCFA de ton solde dans Boutique. Arrête-toi quand c'est fini. » | Mettre de l'argent → Mon solde disponible (en premier, solde > 0, Q9) → 4 000 → récapitulatif → « Mettre 4 000 F dans Boutique » → « 4 000 F sont dans Boutique. » ; dit « c'est fait » | Choisit-elle « Mon solde » ou « Mobile Money » ? Avant de confirmer : « Combien restera-t-il sur ton solde ? » (attendu 8 400 F). Cherche-t-elle un PIN, ou l'absence de PIN l'inquiète-t-elle (Q3) ? |
| 2 | « Maintenant, mets tout ce qui reste sur ton solde dans Boutique. » | Utilise « Tout mon solde » (8 400 F) ; récapitulatif « Il restera sur ton solde : 0 F » | Trouve-t-elle « Tout mon solde » ? Hésite-t-elle à vider son solde ? |
| 3 | « Ton argent est-il sorti de KOTIZ ? Peux-tu le récupérer ? » | « Non, il est dans Boutique ; je peux le remettre sur mon solde » | Confond-elle mettre de côté et payer ou retirer ? |

## C-P4 — Reprendre une mise de côté échouée (3 à 4 écrans)

Départ : scénario « Mise de côté échouée », B · B07 École Awa.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Mets 5 000 FCFA de ton Wave dans École Awa. » Sur le résultat : « Qu'est-ce qui s'est passé ? Où sont tes 5 000 F ? » | « Le dépôt est fait, mais École Awa n'a pas reçu l'argent ; les 5 000 F sont sur mon solde » | Lit-elle le titre « 5 000 F sont sur ton solde. » et les deux lignes (Dépôt · Fait, Dans École Awa · À reprendre) ? Croit-elle avoir perdu l'argent, ou que le dépôt a échoué ? |
| 2 | « Fais en sorte que l'argent aille dans École Awa. » | Réessayer de mettre dans École Awa → récapitulatif « Suite à ton dépôt Wave du … » → « Mettre 5 000 F dans École Awa » → « Fait » ; ne refait **pas** un dépôt Wave | Pense-t-elle devoir refaire le dépôt Wave ? Comprend-elle qu'il faut confirmer à nouveau ? |
| 3 | Scénario « Solde baissé » puis « Épargne fermée » (enchaîner) : « Reprends la mise de côté ratée. » | Solde baissé : accepte 3 000 F ou choisit « Plus tard » ; épargne fermée : choisit Boutique ou « Laisser sur mon solde » | Comprend-elle pourquoi le montant n'est plus 5 000 F ? Cherche-t-elle à rouvrir École Awa ? Sait-elle où est l'argent si elle laisse sur le solde ? |

## C-P5 — Limite de 3 épargnes au choix d'une destination (2 écrans)

Départ : scénario « Épargne fermée » avec 3 autres épargnes actives (Boutique, Tabaski, une troisième), détail de la mise de côté échouée.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Reprends la mise de côté ratée. » | Voit « École Awa est fermée » et la liste des épargnes actives | Comprend-elle que l'argent est en sécurité sur le solde ? |
| 2 | « Tu préfères mettre cet argent dans une nouvelle épargne Voyage. Est-ce possible ici ? » | Lit « 3 épargnes actives : c'est le maximum. » ; répond « non, j'ai déjà 3 épargnes » sans chercher de bouton Créer ; choisit une épargne de la liste ou laisse sur le solde | Cherche-t-elle un bouton « Créer » ? Pense-t-elle que KOTIZ va fermer une épargne à sa place ? |
| 3 | « Finalement, garde l'argent pour plus tard. Où est-il ? » | « Laisser sur mon solde » ; « sur mon solde » ; sait qu'elle pourra le remettre plus tard | Croit-elle avoir perdu la possibilité de reprendre ? |

## C-P6 — Opérations, détail, reçu (3 écrans)

Départ : scénario « Historique », accueil.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Montre-moi le reçu de ton dépôt Wave de 5 000 F du 18 octobre. » | Onglet Opérations (ou « Tout voir ») → la ligne → Voir le reçu | Reconnaît-elle l'icône Opérations ? Distingue-t-elle dépôt, mise de côté et retour au solde dans la liste ? |
| 2 | « Le 18, tu as mis 5 000 F de ton Wave dans École Awa. Où est cet argent maintenant ? » | Trouve la ligne unique « Dépôt vers École Awa · Dépôt fait · épargne pas faite » ; répond « sur mon solde, pas encore dans École Awa » ; ouvre le détail et lit les étapes | Lit-elle les deux segments du statut combiné (Q4) ? Croit-elle l'argent perdu ? Trouve-t-elle « Réessayer » dans le détail ? |
| 3 | « Ton dépôt de 2 000 F du 17 est en attente. Montre-moi son reçu. » | Ouvre le détail ; lit « Le reçu sera prêt quand ce sera fait. » ; dit qu'il n'y a pas encore de reçu | Cherche-t-elle un reçu partout ? Prend-elle le détail pour un reçu ? Cherche-t-elle à partager le reçu (pas de partage au lot C, Q7) ? |

## C-P7 — Signaler un problème et suivre (3 écrans)

Départ : scénario « Historique », Opérations.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Ton dépôt de 2 000 F du 17 est en attente depuis longtemps. Ton Wave a été débité. Préviens KOTIZ. » | Détail → Signaler un problème → choisit un motif → Envoyer → « Ton signalement est envoyé. » | Cherche-t-elle à retaper le montant ou la référence ? Ajoute-t-elle un mot ? |
| 2 | « KOTIZ va-t-il te rembourser ? » | « Pas forcément : c'est envoyé, ils vont regarder » | Lit-elle « Ce n'est pas un remboursement. » ? Prend-elle « Envoyé » pour une réponse ? |
| 3 | « Retrouve ton signalement et dis où il en est. » | Depuis l'opération (« Signalement en cours › ») ou le dossier : « Envoyé » (ou « En cours ») | Trouve-t-elle le chemin ? Confond-elle le statut du dossier avec celui du dépôt ? |

## C-P8 — Contester une réponse (2 écrans)

Départ : scénario « Historique », dossier n° 2610-0007 « Résolu » avec réponse du conseiller, et une correction confirmée liée à une autre opération.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Ton signalement est résolu. Ton argent t'a-t-il été rendu ? » | Lit la réponse ; « Résolu ne veut pas dire remboursé » ; répond selon la réponse du conseiller | Associe-t-elle « Résolu » à « remboursé » ? |
| 2 | « Tu n'es pas d'accord avec la réponse. Dis-le à KOTIZ. » | Je conteste cette réponse → Envoyer ma contestation → dossier « En cours », même numéro | Pense-t-elle devoir faire un nouveau signalement ? Remarque-t-elle que la réponse précédente est gardée ? |
| 3 | Sur l'autre opération : « KOTIZ t'a remis de l'argent après un problème. Où le vois-tu ? » | Trouve la ligne « Correction » dans Opérations, ou le lien « Voir la correction › » | Comprend-elle la correction comme un mouvement lié, pas un nouveau dépôt ? |

## Synthèse attendue après la séance

Pour chaque parcours : tâches réussies sur 3, écrans d'hésitation, réponses « c'est fait ? » erronées. Une tâche échouée deux fois (PO et conjointe) devient une correction prioritaire avant la critique (`critique-design`).

Points que le test observe (décisions PO du 19 octobre 2026, sans les rouvrir d'office) : choix sans hésiter sur « Comment tu veux déposer ? » (C-P1-1, C-P1′-1) ; numéro vérifié non modifiable compris (C-P1-1) ; PNV-1 refusée, à observer (C-P2-1) ; PNV-2 conditionnelle, appliquée seulement si la confusion apparaît (C-P2-3) ; ligne unique à statut combiné (Q4, C-P6-2) ; ordre de « D'où vient l'argent ? » (Q9, C-P3-1) ; absence de PIN (Q3, C-P3-1, C-P4-2) ; lecture du résultat partiel (C-P4-1).

Hors test (pas de maquette ni de protocole) : vraie validation chez l'opérateur (G01), frais réels, motifs de signalement réels (G03), dépôt cash (lot E), retraits (lot D).
