# Mini-scripts de test — Lot D : retraits

Date : 20 octobre 2026. Spec associée : [ux-spec-lot-d.md](ux-spec-lot-d.md), mise à jour avec les décisions PO du 20 octobre 2026 (Q1 à Q6, Q8, PNV-2 validée, PNV-1 conditionnelle, PNV-3 refusée, modèle de frais du prototype). Même méthode que [test-lot-a.md](test-lot-a.md), [test-lot-b.md](test-lot-b.md) et [test-lot-c.md](test-lot-c.md). À jouer quand les maquettes du lot D seront dans le canvas « KOTIZ — App cliente ».

Numérotation : écrans `D-00` à `D-07` (avec tiret). **Ce ne sont pas les issues** D06 à D26 (#67 à #99), qui sont des tickets. « A · H01 », « B · B07 », « C-12 » désignent des écrans des lots A, B et C.

## Mode d'emploi

- **Testeurs** : le PO (observateur) et sa conjointe (cliente). Une seule personne observe ; elle ne parle pas pendant la tâche.
- **Support** : prototype cliquable Claude Design ouvert sur un téléphone Android, luminosité moyenne. Données fictives annoncées comme telles.
- **Personnage** : « Fatou Koné ».
- **Consigne lue à voix haute** : la phrase de la tâche, rien de plus. Pas d'aide. Bloquée plus de 30 secondes = « bloquée », tâche suivante.
- **PIN de démo** : 2468, remis sur papier (4 chiffres au prototype, longueur finale à confirmer G02). Le retrait demande le PIN parce que l'argent sort de KOTIZ. Si la testeuse cherche un code Wave, le noter.
- **Frais** : le retrait utilise un scénario « frais fictifs » annoncé dans la bande du prototype, hors produit ; une variante montre l'état « frais inconnus » (retrait bloqué). Ne jamais présenter ces valeurs comme réelles.
- **Montant saisi = montant reçu** (Décision PO du 20 octobre 2026) : Fatou tape ce qu'elle reçoit sur son Wave ; les frais fictifs s'ajoutent à ce qui est pris sur son solde. Le récapitulatif montre « Tu reçois », « Frais », « Pris sur ton solde ».
- **Résultat de l'opérateur** : simulé par le scénario choisi dans le menu (fait, en attente, échoué). Rien n'est à valider chez l'opérateur pour un retrait.
- **À noter pour chaque tâche** : réussie oui / non ; hésitations (où, combien de temps) ; erreurs ; réponse à « C'est fait ou pas ? » (attendue sans aide : fait / en attente / échoué).
- **Critères du brief observés** : orientation (« Où es-tu ? Que fait ce bouton ? »), montant dominant et destination lisible, statut réel, une décision par écran.

Feuille de relevé conseillée : une ligne par tâche, colonnes Réussie · Hésitations · Erreurs · Réponse « c'est fait ? » · Remarque.

### Données fictives du prototype

| Élément | Valeur |
|---|---|
| Numéro vérifié | 07 08 12 34 56 (fictif), non modifiable |
| Opérateurs du prototype | Wave, Orange Money (liste réelle à confirmer, G01) |
| Solde disponible | 12 400 FCFA |
| École Awa | École, 45 000 F sur 100 000 F |
| Boutique | Commerce, 8 000 F sur 50 000 F |
| PIN de démo | 2468 |
| Références | KTZ-2610-0081… (fictives) ; dossier n° 2610-0012 (fictif) |

Scénarios du menu du prototype :

| Scénario | Ce qui se passe |
|---|---|
| « Retrait fait » | Le transfert est confirmé par l'opérateur |
| « Retrait en attente » | Le retrait reste en attente après le PIN ; le solde disponible baisse dès l'envoi (Q4), ligne « Retrait · En attente » |
| « On vérifie » | La connexion est perdue après l'envoi |
| « Échec technique » | Le retrait échoue après le PIN (échec confirmé) |
| « Refusé avant le PIN » | Une règle refuse le retrait sur le récapitulatif |
| « Frais inconnus » | Le récapitulatif bloque « Continuer » |
| « Wave indisponible » | Wave est désactivé sur la liste ; Orange Money reste possible |
| « Solde à 0, argent en épargne » | Solde 0 F, École Awa 45 000 F ; « Retirer » désactivé avec « Ton argent est dans tes épargnes. » (PNV-2 validée) |
| « Pas reçu » | Retrait fait côté KOTIZ ; la testeuse dit ne rien voir sur son Wave |
| « Historique » | Opérations remplie : retrait fait, retrait en attente, retrait échoué, dépôts du lot C |

## Nombre d'écrans par chemin principal

| Parcours | Écrans | Séquence |
|---|---|---|
| D-P1 Retirer sur mon Mobile Money | 6 | D-00 D-01 D-02 D-03 D-04 D-05 |
| D-P2 Argent dans une épargne | 3 + 5 | D-00 D-01 D-02, puis B · B07 B09 B10 B11 B12, puis D-P1 |
| D-P3 Bloqué avant le PIN | 4 | D-00 D-01 D-02 D-03 |
| D-P4 Après le PIN : attente, on vérifie, échoué | 6 | comme D-P1, puis C-12 |
| D-P5 Pas reçu sur le Mobile Money | 4 | D-05 D-07 C-14 C-15 (ou C-11 C-12 C-14 C-15) |
| D-P6 PIN bloqué | 5 | D-00 à D-04 |
| D-P7 Hors connexion et interruption | — | états de D-01 à D-05 |
| D-P8 Retrouver un retrait | 3 | C-11 C-12 C-13 |
| D-P9 Auprès d'une agente (raccord lot E) | 2 | D-00 D-06, puis A · Q01 |

## D-P1 — Retirer sur mon Mobile Money (6 écrans)

Départ : scénario « Retrait fait », accueil A · H01, solde 12 400 F.

| # | Tâche lue à la testeuse | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu veux recevoir 5 000 FCFA de KOTIZ sur ton Wave. Fais-le. Arrête-toi quand c'est fini. » | Retirer → « Sur mon Mobile Money » → Wave → 5 000 → récapitulatif → Continuer → PIN → « Ton argent est sur ton Wave. » ; dit « c'est fait » | Hésite-t-elle sur « Comment tu veux retirer ? » (chronométrer) ? Cherche-t-elle à taper un code Wave ? |
| 2 | Sur le récapitulatif, avant Continuer : « Combien vas-tu recevoir sur ton Wave ? Vers quel numéro ? Combien restera-t-il sur KOTIZ ? » | « 5 000 F » (Tu reçois), son numéro 07 08 12 34 56, et le montant de « Ton solde après » | Comprend-elle que les frais s'ajoutent et que « Pris sur ton solde » est plus grand que 5 000 F ? Cherche-t-elle à changer de numéro ? |
| 3 | Après le résultat : « Combien as-tu sur KOTIZ maintenant ? Montre-moi la preuve de ce retrait. » | 12 400 F moins « Pris sur ton solde » (frais fictifs) ; « Voir le reçu » ou Opérations → reçu | Trouve-t-elle le reçu ? Prend-elle « Terminé » pour une perte de la preuve ? |

## D-P2 — Solde insuffisant et argent dans une épargne (3 + 5 écrans)

Départ : scénario « Solde à 0, argent en épargne » pour les tâches 1 et 2, puis « Retrait en attente » pour la tâche 3.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu as besoin de 10 000 FCFA de l'épargne École Awa sur ton Wave. Fais-le. » | Lit « Ton argent est dans tes épargnes. » sous « Retirer » désactivé → Épargnes (B · B01) → École Awa → Remettre sur mon solde → PIN → puis Retirer → 10 000 → PIN → Fait | Comprend-elle la raison de « Retirer » désactivé (PNV-2 validée) ? Retrouve-t-elle « Retirer » après le retour au solde (sert à trancher PNV-1, conditionnelle) ? |
| 2 | Au milieu : « Pourquoi as-tu tapé ton PIN deux fois ? » | « Une fois pour sortir l'argent de l'épargne, une fois pour le sortir de KOTIZ » | Le double PIN la gêne-t-il ? Croit-elle avoir retiré deux fois ? |
| 3 | Scénario « Retrait en attente » (retrait de 5 000 F en attente : solde réduit de 5 000 F plus les frais fictifs) : « Retire 10 000 FCFA. » | Lit sur D-02 « 5 000 F sont en attente de retrait. » et la raison « Tu peux recevoir au plus … » ; ne peut pas continuer ; explique pourquoi | Croit-elle avoir perdu les 5 000 F ? Comprend-elle « disponibles » ? |

## D-P3 — Retrait bloqué avant le PIN (4 écrans)

Départ : accueil, scénarios enchaînés « Wave indisponible », « Frais inconnus », « Refusé avant le PIN ».

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Wave » indisponible : « Retire 3 000 FCFA vers ton Wave. » | Voit Wave désactivé avec sa raison ; choisit Orange Money ou s'arrête ; dit « Wave ne marche pas pour l'instant » | Essaie-t-elle d'appuyer sur la ligne désactivée ? Comprend-elle qu'il n'y a pas d'autre numéro ? |
| 2 | Frais inconnus : « Retire 3 000 FCFA. » Sur le récapitulatif : « Pourquoi tu ne peux pas continuer ? » | « On ne connaît pas les frais, il faut réessayer plus tard » ; revient à l'accueil | Pense-t-elle à une panne de son téléphone ? |
| 3 | Refusé avant le PIN : « Retire 3 000 FCFA. Ton argent a-t-il bougé ? » | « Non, le retrait est refusé, rien n'est parti » ; trouve « Revenir à l'accueil » ou « Contacter l'aide » | Tape-t-elle quand même son PIN (il ne doit pas être proposé) ? |

## D-P4 — Après le PIN : en attente, on vérifie, échoué (6 écrans)

Départ : accueil, scénarios « Retrait en attente », « On vérifie », « Échec technique ».

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Retrait en attente » : « Retire 5 000 FCFA. » Sur le résultat : « Ton argent est-il sur ton Wave ? Que fais-tu maintenant ? » | « Non, il est en attente » ; ne refait pas le retrait ; sait le retrouver dans Opérations | Lit-elle « Envoyée » comme « fait » ? Tente-t-elle de refaire le retrait ? |
| 2 | Retour à l'accueil : « Combien as-tu sur ton solde ? Où sont les 5 000 F ? » | Le solde déjà réduit ; « les 5 000 F sont en attente » (carte solde « Retrait en attente · − … », ligne Retrait Wave) | Croit-elle les 5 000 F perdus ? Lit-elle la ligne ambre de la carte solde ? (décisions PO du 20 octobre 2026) |
| 3 | « Échec technique » : « Retire 5 000 FCFA. » Sur le résultat : « Que s'est-il passé ? Que fais-tu ? » | « Ça n'a pas marché » ; Réessayer → récapitulatif → nouveau PIN ; ou Terminé | Comprend-elle qu'elle doit retaper son PIN ? Sur « On vérifie », cherche-t-elle un bouton Réessayer ? |

## D-P5 — L'argent est parti mais pas reçu (4 écrans)

Départ : scénario « Pas reçu », résultat D-05 Fait, puis « Historique ».

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « KOTIZ dit que c'est fait, mais tu ne vois rien sur ton Wave. Que fais-tu ? » | « Tu ne vois pas l'argent sur ton Wave ? » → lit « Ne refais pas le retrait. » → Signaler un problème → motif → Envoyer | Refait-elle le retrait ? Lit-elle les conseils de la feuille ? |
| 2 | « KOTIZ va-t-il te rendre ton argent ? » | « Pas forcément : c'est envoyé, ils vont regarder » | Lit-elle « Ce n'est pas un remboursement. » ? |
| 3 | Plus tard, depuis l'accueil : « Retrouve ton signalement sur ce retrait. » | Opérations → Retrait Wave → « Mon signalement · Envoyé » | Confond-elle le statut du dossier avec celui du retrait (« Fait ») ? |

## D-P6 — PIN incorrect ou bloqué (5 écrans)

Départ : scénario « Retrait fait ». Remettre à la testeuse un **faux** PIN pour cette série (« 1111 »), puis le bon.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Retire 2 000 FCFA. Ton PIN est 1111. » | Lit « PIN incorrect. Réessaie. » ; comprend que rien n'est parti | Pense-t-elle que l'argent est parti ? |
| 2 | « Réessaie plusieurs fois avec 1111. » | Arrive sur « Ton PIN est bloqué » ; lit « ton argent n'a pas bougé » | Cherche-t-elle un nombre d'essais (aucun n'est affiché, G02) ? Panique-t-elle ? |
| 3 | « Que peux-tu faire maintenant ? » | « PIN oublié ? » ou « Terminé » ; dit qu'elle n'a pas perdu d'argent | Trouve-t-elle « PIN oublié ? » (lot F, « Bientôt ici ») ? |

## D-P7 — Hors connexion et interruption

Départ : scénario « Retrait fait » ; mode avion activé par l'observateur au moment indiqué.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | Mode avion avant de commencer : « Retire 2 000 FCFA. » | Voit la liste datée et les opérateurs désactivés, ou « Pas de connexion. Rien n'a été envoyé. » au récapitulatif ; dit « rien n'est parti » | Croit-elle le retrait en cours ? |
| 2 | L'observateur coupe le réseau juste après le PIN (scénario « On vérifie ») : « Ton retrait est-il fait ? » | « On vérifie, je ne refais pas » | Cherche-t-elle Réessayer ? Refait-elle le retrait au retour du réseau ? |
| 3 | Sur le récapitulatif, l'observateur fait quitter l'app (bouton accueil Android) puis la rouvre : « Termine ton retrait. » | Retrouve son montant ; retape son PIN ; un seul retrait dans Opérations | S'étonne-t-elle de retaper le PIN ? Y a-t-il deux retraits ? |

## D-P8 — Retrouver un retrait depuis Opérations (3 écrans)

Départ : scénario « Historique », accueil.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Montre-moi le reçu de ton retrait Wave d'hier. » | Opérations (ou « Tout voir ») → filtre Retraits ou la ligne → Voir le reçu | Distingue-t-elle un retrait d'un dépôt dans la liste (signe, pastille) ? Comprend-elle que la ligne montre ce qui est sorti du solde (« − 5 050 F », frais fictifs compris) et le détail « Tu as reçu 5 000 F » ? |
| 2 | « Ton retrait d'aujourd'hui est en attente. Montre-moi son reçu. » | Ouvre le détail ; lit « Le reçu sera prêt quand ce sera fait. » | Prend-elle le détail pour un reçu ? |
| 3 | « Ton retrait du 17 a échoué. Où est ton argent ? Refais-le. » | « Sur mon solde » (si le scénario le confirme) ; revient à l'accueil → Retirer | Cherche-t-elle un bouton Réessayer sur le détail (PNV-3 refusée : le noter seulement) ? |

## D-P9 — Retirer auprès d'une agente (2 écrans, raccord lot E)

Départ : accueil A · H01.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu veux 3 000 FCFA en espèces. Comment fais-tu avec KOTIZ ? » | Retirer → « Auprès d'une agente » **sans hésiter** → lit « Montre Mon QR à une agente » | Temps de choix sur la feuille (moins de 5 secondes attendu) |
| 2 | « Montre ce que tu vas présenter à l'agente. » | Afficher Mon QR → A · Q01 | Trouve-t-elle le bouton ? |
| 3 | « Vas-tu donner ton PIN à l'agente ? Ton argent est-il déjà sorti ? » | « Non, jamais mon PIN » ; « non, rien ne sort avant ma confirmation » | Lit-elle « Ne donne jamais ton PIN à l'agente. » ? |

## Synthèse attendue après la séance

Pour chaque parcours : tâches réussies sur 3, écrans d'hésitation, réponses « c'est fait ? » erronées. Une tâche échouée deux fois (PO et conjointe) devient une correction prioritaire avant la critique (`critique-design`).

Points que le test observe (décisions PO du 20 octobre 2026, sans les rouvrir d'office) : choix sans hésiter sur « Comment tu veux retirer ? » (D-P1-1, D-P9-1) ; frais qui s'ajoutent au montant reçu (D-P1-2) ; double PIN retour au solde + retrait (D-P2-2) ; raison « Ton argent est dans tes épargnes. » (PNV-2 validée) et PNV-1 conditionnelle (D-P2-1) ; solde disponible qui baisse dès l'envoi, Q4 (D-P2-3, D-P4-2) ; refus avant le PIN (D-P3-3) ; « parti mais pas reçu » sans refaire le retrait, Q5 (D-P5-1) ; carte solde « Retrait en attente » (D-P4-2) ; montant sorti du solde dans Opérations et montant reçu au détail (D-P8-1) ; recherche d'un Réessayer sur le détail, PNV-3 refusée (D-P8-3).

Hors test (pas de maquette ni de protocole) : frais réels et modèle de frais (G01), opérateurs réels par numéro (G01), règles du PIN (G02), motifs de signalement réels (G03), retrait en espèces et retrait Mobile Money assisté (lot E), récupération du PIN (lot F).
