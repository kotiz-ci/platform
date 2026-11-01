# Mini-scripts de test — Lot E : espèces et accompagnement par une agente

Date : 21 octobre 2026. Spec associée : [ux-spec-lot-e.md](ux-spec-lot-e.md) (validée par le PO le 21 octobre 2026). Même méthode que [test-lot-a.md](test-lot-a.md) à [test-lot-d.md](test-lot-d.md). Maquettes dans le canvas (version 34, pages « Lot E — Espèces et agente » et « Lot E — app agente »), index [screens-lot-e.md](screens-lot-e.md).

Numérotation : écrans `E-01` à `E-19` (app cliente) et `E-51` à `E-72` (app agente), **toujours avec un tiret**. Ce ne sont pas les écrans « A · E01 » à « A · E10 » du lot A (inscription, sans tiret). « A · Q01 », « B · B07 », « C-12 », « D-04 » désignent des écrans des lots A à D.

## Mode d'emploi

- **Testeurs** : le PO et sa conjointe. La conjointe joue **Fatou, la cliente**. Le PO joue **Awa, l'agente**, en suivant la carte de rôle ci-dessous, et note les observations. Il ne parle que pour dire les répliques de sa carte.
  - Biais connu : l'observateur joue aussi l'agente. Noter à part ce qu'il a lui-même trouvé difficile côté agente (hésitations, mauvais bouton, consigne non lue) : c'est un résultat du test, pas une erreur de la testeuse.
- **Support** : deux téléphones Android. Le téléphone de la testeuse ouvre le prototype de l'**app cliente** ; celui du PO ouvre le prototype de l'**app agente** (section « Lot E — app agente »). Si un seul téléphone est disponible, jouer seulement le côté cliente et faire défiler les écrans agente sur un ordinateur posé à côté.
- **Prototype** (canvas version 34) : les deux téléphones ne sont pas reliés. Côté cliente, la demande d'Awa s'ouvre seule 3 s après Mon QR, et E-03 avance seul (ou par « Awa lance › » dans la bande sombre). Côté agente, le PO touche « Fatou répond › » ou « Fatou confirme › » dans la bande quand la testeuse a répondu sur son téléphone. Codes SMS : tout code d'au moins 4 chiffres (0000 = faux, 9999 = expiré).
- **Espèces** : de faux billets ou des papiers marqués « 1 000 F », comptés à la main. Ils servent à observer **quand** la testeuse donne ou prend les espèces.
- **Sans smartphone** : la testeuse reçoit le SMS sur une **carte imprimée** (texte du brouillon de la spec, code fictif écrit en clair) ou sur l'écran « Messages » du prototype ; elle n'utilise pas l'app cliente pendant ces tâches.
- **Personnage** : « Fatou Koné ». Agente : « Awa Traoré », code AG-0142.
- **Consigne lue à voix haute** : la phrase de la tâche, rien de plus. Pas d'aide. Bloquée plus de 30 secondes = « bloquée », tâche suivante.
- **PIN de démo** : 2468, remis sur papier (longueur finale à confirmer, G02). Le retrait demande le PIN parce que l'argent sort ; le dépôt n'en demande pas.
- **Frais** : la ligne « Frais · à confirmer » n'a pas de valeur (G01). La testeuse peut continuer ; la bande hors produit dit : « Frais pas encore connus : en vrai, tu ne pourrais pas confirmer. » Le scénario « Frais inconnus » montre la variante bloquée (décision PO du 21 octobre 2026, PO-1). Ne jamais annoncer de montant de frais.
- **Codes SMS** : fictifs et écrits sur la carte ; aucune longueur, durée ni nombre d'essais n'est annoncé (G02).
- **À noter pour chaque tâche** : réussie oui / non ; hésitations (où, combien de temps) ; erreurs ; **moment où les espèces changent de main** ; réponse à « C'est fait ou pas ? » (attendue sans aide : fait / en attente / échoué / annulé).
- **Critères du brief observés** : orientation (« Où es-tu ? Que fait ce bouton ? »), montant dominant et destination lisible, statut réel, une décision par écran ; en plus pour ce lot : **les secrets restent à la cliente** (aucun PIN montré, code lu par elle) et **l'agente ne voit pas son argent**.

Feuille de relevé conseillée : une ligne par tâche, colonnes Réussie · Hésitations · Erreurs · Espèces (moment) · Réponse « c'est fait ? » · Remarque.

### Carte de rôle du PO (agente)

1. Ne jamais toucher le téléphone de la testeuse ; ne jamais lui demander son PIN.
2. Suivre les écrans de l'app agente dans l'ordre ; dire seulement : « Montre-moi ton QR. », « Tu t'appelles comment ? », « Combien tu veux déposer ? » / « retirer ? », « Regarde ton téléphone. » ; sans smartphone : « Lis le SMS, puis dis-moi le code. ».
3. Tendre la main pour les espèces **seulement** quand l'app agente le dit (E-58) ; donner les espèces **seulement** quand l'app agente le dit (E-64).
4. Pour les scénarios d'imprévu, faire exactement ce que la tâche indique (« Annule la demande », « Compte 4 500 F au lieu de 5 000 F »).

### Données fictives du prototype

| Élément          | Valeur                                                                              |
| ---------------- | ----------------------------------------------------------------------------------- |
| Cliente          | Fatou Koné, 07 08 12 34 56 (vu par l'agente : 07 •• •• •• 56)                       |
| Agente           | Awa Traoré, AG-0142                                                                 |
| Solde disponible | 12 400 FCFA                                                                         |
| École Awa        | École, 45 000 F sur 100 000 F                                                       |
| Boutique         | Commerce, 8 000 F sur 50 000 F                                                      |
| PIN de démo      | 2468                                                                                |
| Références       | Demandes n° 2110-0031… ; opérations KTZ-2110-0103… ; dossier n° 2110-0019 (fictifs) |

Scénarios du menu du prototype :

| Scénario                                     | Ce qui se passe                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| « Dépôt fait »                               | Le dépôt est lancé et confirmé                                                                                                                      |
| « Dépôt vers épargne, mise de côté échouée » | Dépôt fait ; la mise de côté dans École Awa échoue (résultat partiel)                                                                               |
| « Dépôt en vérification »                    | La connexion est perdue après le lancement                                                                                                          |
| « Fonds de l'agente insuffisants »           | E-54 bloque avant toute demande                                                                                                                     |
| « Confirmation expirée »                     | La confirmation de la cliente n'est plus valable au moment de lancer                                                                                |
| « Demande annulée »                          | L'agente annule après la remise des espèces                                                                                                         |
| « Retrait fait »                             | Le retrait est confirmé ; la remise reste à confirmer par la cliente                                                                                |
| « Retrait en vérification »                  | Le résultat du retrait est inconnu                                                                                                                  |
| « Retrait refusé avant le PIN »              | Le solde ne suffit pas                                                                                                                              |
| « Frais inconnus »                           | Continuer est bloqué sur E-06                                                                                                                       |
| « Sans smartphone »                          | La cliente n'a pas d'app : cartes SMS                                                                                                               |
| « Cliente sans internet »                    | L'app de la cliente ne reçoit pas la demande ; sur E-56, l'agente passe au code SMS pour la **même** demande (décision PO du 21 octobre 2026, PO-4) |
| « Accompagnement »                           | Une demande d'accompagnement, puis une demande de point, arrivent                                                                                   |
| « Historique »                               | Opérations remplie : dépôt en espèces fait, dépôt annulé, retrait en espèces « Espèces à confirmer », dépôts et retraits des lots C et D            |

Correspondance avec le menu du prototype (Main, sections « Lot E — Espèces et agente » et « Lot E — app agente ») : « Dépôt fait » = E-P1 ; « Dépôt vers épargne, mise de côté échouée » = E-P2′ ; « Dépôt en vérification » = E-P4‴ ; « Fonds de l'agente insuffisants » = agente E-P4 ; « Confirmation expirée » = E-P4″ (agente E-P4‴) ; « Demande annulée » = E-P4 (agente E-P4″) ; « Retrait fait » = E-P5 ; « Retrait en vérification » = E-P7 ; « Retrait refusé avant le PIN » = E-P5′ ; « Frais inconnus » = E-P1′ ; « Sans smartphone » = agente E-P3, E-P6, E-P8′, E-P9″, E-P12 ; « Cliente sans internet » = agente E-P4⁶ ; « Accompagnement » = E-P9, E-P10 ; « Historique » = E-P13.

## Nombre d'écrans par chemin principal

| Parcours                                    | App cliente                               | App agente                                             |
| ------------------------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| E-P1 Dépôt en espèces sur le solde          | 4 — A · Q01 E-01 E-03 E-04                | 7 — E-51 E-53 E-54 E-55 E-56 E-58 E-59                 |
| E-P2 Dépôt en espèces dans une épargne      | 5 — + E-02                                | 7                                                      |
| E-P3 Dépôt sans smartphone                  | 2 SMS                                     | 8 — E-51 E-52 E-53 E-54 E-55 E-57 E-58 E-59            |
| E-P4 Annulation, « J'ai remis les espèces » | 4 — E-04 E-05 C-14 C-15                   | 2 — E-58 E-60                                          |
| E-P5 Retrait en espèces                     | 5 — A · Q01 E-06 E-07 E-08 E-09           | 8 — E-51 E-53 E-61 E-62 E-63 E-56 E-64 E-59            |
| E-P6 Retrait sans smartphone                | 3 SMS                                     | 10 — E-51 E-52 E-53 E-61 E-62 E-63 E-57 E-64 E-57 E-59 |
| E-P7 Espèces non reçues                     | 4 — E-08 E-10 C-14 C-15                   | 1 — E-64                                               |
| E-P8 Retrait Mobile Money préparé           | 3 — E-11 D-04 D-05                        | 8 — E-51 E-53 E-61 E-65 E-66 E-67 E-56 E-59            |
| E-P9 Accepter / retirer l'accompagnement    | 2 — E-12 E-15 ; 4 — Profil E-14 E-15 E-16 | 3 — E-53 E-68 E-56                                     |
| E-P10 Autoriser le point d'une épargne      | 2 — E-13 E-15                             | 3 — E-53 E-69 E-56                                     |
| E-P11 Mon carnet et mon point               | 4 — B · B07 E-17 E-18 E-19                | —                                                      |
| E-P12 Point / création sans smartphone      | SMS                                       | 3 (point) ; 9 (création)                               |
| E-P13 Retrouver une opération en espèces    | 3 — C-11 C-12 C-13                        | —                                                      |

## E-P1 — Déposer des espèces sur mon solde (cliente 4 écrans, agente 7)

Départ : scénario « Dépôt fait », accueil A · H01 côté cliente, E-51 côté agente. La testeuse a 5 000 F en faux billets.

| #   | Tâche lue à la testeuse                                                                                | Réussite attendue                                                                                                                       | À observer                                                                                                    |
| --- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | « Tu veux mettre 5 000 FCFA en espèces sur ton KOTIZ avec Awa. Fais-le. Arrête-toi quand c'est fini. » | Montre Mon QR → lit E-01 → « Je confirme » → donne les billets **après** la confirmation (E-03) → lit « Ton argent est sur ton solde. » | Donne-t-elle les billets **avant** de confirmer ? Cherche-t-elle un PIN ? Vérifie-t-elle le nom de l'agente ? |
| 2   | Sur E-01, avant de confirmer : « Qui te propose ce dépôt ? Combien ? Où va l'argent ? »                | « Awa, 5 000 F, sur mon solde »                                                                                                         | Lit-elle « Frais · à confirmer » comme un problème ? Voit-elle « Changer » ?                                  |
| 3   | Sur E-03, pendant que l'agente compte : « C'est fait ou pas ? »                                        | « Pas encore, elle compte » ; après E-04 : « C'est fait »                                                                               | Prend-elle « Tu as confirmé » (coche) pour un dépôt fait ?                                                    |

## E-P2 — Déposer des espèces dans une épargne (cliente 5, agente 7)

Départ : scénario « Dépôt fait », puis « Dépôt vers épargne, mise de côté échouée ».

| #   | Tâche                                                                                                                | Réussite attendue                                                                                          | À observer                                                                               |
| --- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | « Tu donnes 5 000 FCFA à Awa pour ton épargne École Awa. Fais-le. »                                                  | Sur E-01 : « Changer » → E-02 → École Awa → « Je confirme » → billets → « Ton argent est dans École Awa. » | Trouve-t-elle « Changer » ? Cherche-t-elle à le dire à l'agente plutôt que dans l'app ?  |
| 2   | « Awa sait-elle combien tu as dans École Awa ? »                                                                     | « Non »                                                                                                    | Croit-elle que l'agente voit ses épargnes (E-02 montre les noms sur **son** téléphone) ? |
| 3   | Scénario « mise de côté échouée » : « Refais un dépôt de 5 000 F pour École Awa. Où est ton argent ? Que fais-tu ? » | « Sur mon solde, pas dans l'épargne » ; « Réessayer de mettre de côté » → C-08 ; ne redonne pas d'espèces  | Croit-elle avoir perdu l'argent ? Veut-elle redonner des billets à l'agente ?            |

## E-P3 — Déposer des espèces sans smartphone (agente 8, cliente 2 SMS)

Départ : scénario « Sans smartphone ». La testeuse n'a que la carte SMS.

| #   | Tâche                                                                                                  | Réussite attendue                                                                                     | À observer                                                                                     |
| --- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | « Tu n'as pas l'app. Tu veux déposer 5 000 FCFA avec Awa. » (carte SMS remise quand l'agente l'envoie) | Dit son numéro → lit le SMS → vérifie « 5 000 F » → dit le code → donne les billets **après** le code | Donne-t-elle le code sans lire le montant ? Donne-t-elle les billets avant ?                   |
| 2   | « Ce code, c'est ton PIN ? Le donnerais-tu pour un autre dépôt ? »                                     | « Non, c'est le code de ce dépôt seulement »                                                          | Confond-elle code et PIN ?                                                                     |
| 3   | Carte « Dépôt fait » remise : « Ton argent est-il sur KOTIZ ? Comment le sais-tu ? »                   | « Oui, le SMS le dit, avec la référence »                                                             | Pour le PO-agente : a-t-il cherché un bouton pour choisir une épargne sans l'accord des noms ? |

## E-P4 — Dépôt : annulation et « J'ai remis les espèces » (cliente 4, agente 2)

Départ : scénarios « Demande annulée », puis « Confirmation expirée », puis « Fonds de l'agente insuffisants ».

| #   | Tâche                                                                                                                                                        | Réussite attendue                                                                                                                   | À observer                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | Après remise des billets, le PO annule la demande et garde les billets : « Que s'est-il passé ? Que fais-tu ? »                                              | Lit « Awa a annulé le dépôt. » → « J'ai donné les espèces » → Signaler un problème → envoie ; dit « ce n'est pas encore remboursé » | Croit-elle que l'annulation dit vrai ? Trouve-t-elle « J'ai donné les espèces » ?                 |
| 2   | Scénario « Confirmation expirée » : le PO lit sur E-58 « Sa confirmation n'est plus valable. » et redemande : « Que fais-tu sur ton téléphone ? »            | Confirme à nouveau sur E-01 ; dit « l'argent n'est pas encore entré »                                                               | S'inquiète-t-elle d'avoir déjà donné les billets ? Lit-elle « Confirme à nouveau » ?              |
| 3   | Scénario « Fonds de l'agente insuffisants » (côté agente) : le PO lit E-54 ; à la testeuse : « Awa te dit qu'elle ne peut pas. As-tu donné quelque chose ? » | « Non, rien ne m'a été demandé » ; aucune demande sur son téléphone                                                                 | Le PO-agente : a-t-il pris les billets malgré la consigne ? Le montant de ses fonds manque-t-il ? |

## E-P5 — Retirer des espèces (cliente 5, agente 8)

Départ : scénario « Retrait fait », accueil A · H01 ; le PO a 3 000 F en faux billets.

| #   | Tâche                                                                                           | Réussite attendue                                                                                                                             | À observer                                                                                      |
| --- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1   | « Tu veux 3 000 FCFA en espèces de ton KOTIZ, avec Awa. Fais-le. Arrête-toi quand c'est fini. » | Montre Mon QR → E-06 → Continuer → PIN **caché** → « Ton retrait est fait. » → prend et compte les billets → « J'ai reçu mes espèces » → E-09 | Cache-t-elle son écran au PIN ? Appuie-t-elle sur « J'ai reçu » **avant** d'avoir les billets ? |
| 2   | Sur E-06 : « Combien vas-tu recevoir ? Combien sera pris sur ton solde ? »                      | « 3 000 F » ; « les frais ne sont pas encore connus »                                                                                         | Lit-elle « à confirmer » ? S'arrête-t-elle à cause de cette ligne ?                             |
| 3   | Après E-08 Fait, avant les billets : « C'est fini ou pas ? »                                    | « Le retrait est fait, mais je n'ai pas encore mes espèces »                                                                                  | Distingue-t-elle les deux lignes (Retrait · Fait / Espèces reçues · À confirmer) ?              |

## E-P6 — Retirer des espèces sans smartphone (agente 10, cliente 3 SMS)

Départ : scénario « Sans smartphone ».

| #   | Tâche                                                                                              | Réussite attendue                                                                                                                    | À observer                                                                              |
| --- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| 1   | « Tu n'as pas l'app. Retire 3 000 FCFA en espèces avec Awa. » (cartes SMS remises au fil de l'eau) | Lit le SMS 1, vérifie montant et frais, dit le code du retrait → attend → reçoit et compte → lit le SMS 2 → dit le code de réception | Donne-t-elle le code de réception **avant** d'avoir compté ?                            |
| 2   | « Pourquoi deux codes ? Le deuxième retire-t-il encore 3 000 F ? »                                 | « Le premier autorise, le deuxième dit que j'ai reçu ; il ne retire rien »                                                           | Peur d'un double débit ?                                                                |
| 3   | « Awa dit "je t'ai donné l'argent", mais tu n'as rien reçu. Donnes-tu le deuxième code ? »         | « Non »                                                                                                                              | Le PO-agente : l'app lui laisse-t-elle un moyen de clore sans le code ? (attendu : non) |

## E-P7 — Retrait : imprévus et espèces non reçues (cliente 4, agente 1)

Départ : scénarios « Retrait refusé avant le PIN », « Retrait en vérification », puis « Retrait fait » sans remise.

| #   | Tâche                                                                                                 | Réussite attendue                                                                                    | À observer                                                                                       |
| --- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | « Retrait refusé » : « Retire 20 000 FCFA avec Awa. Que se passe-t-il ? Awa sait-elle pourquoi ? »    | Lit « Ton solde ne suffit pas pour ce retrait. » ; ne tape pas de PIN ; « Awa ne sait pas pourquoi » | Est-elle gênée que l'agente le sache ? (le PO lit seulement « pas possible pour cette cliente ») |
| 2   | « Retrait en vérification » : « Retire 3 000 FCFA. Awa doit-elle te donner les espèces maintenant ? » | « Non, on vérifie » ; ne refait pas le retrait                                                       | Le PO-agente donne-t-il les billets malgré « Ne donne pas encore les espèces. » ?                |
| 3   | « Retrait fait », le PO ne donne rien et s'en va : « Que fais-tu ? »                                  | « Je n'ai pas reçu les espèces » → lit « Ne refais pas le retrait. » → Signaler un problème          | Appuie-t-elle par erreur sur « J'ai reçu mes espèces » ? Refait-elle le retrait ?                |

## E-P8 — Retrait sur mon Mobile Money préparé par une agente (cliente 3, agente 8)

Départ : scénario « Retrait fait » (branche Mobile Money), accueil.

| #   | Tâche                                                                       | Réussite attendue                                                                         | À observer                                                                   |
| --- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | « Awa t'aide à envoyer 5 000 FCFA de KOTIZ sur ton Wave. Fais ta part. »    | E-11 → vérifie son numéro → Continuer → PIN caché → D-05 « Ton argent est sur ton Wave. » | Cherche-t-elle à changer de numéro ? Donne-t-elle son téléphone à l'agente ? |
| 2   | « Vers quel numéro va l'argent ? Qui l'a choisi ? »                         | « Mon numéro, celui de KOTIZ ; on ne peut pas le changer »                                | Lit-elle « Préparé avec Awa » ?                                              |
| 3   | « Awa doit-elle te donner des espèces ? Dois-tu appuyer sur "J'ai reçu" ? » | « Non, c'est sur mon Wave »                                                               | Confusion avec le retrait en espèces ?                                       |

## E-P9 — Accepter, refuser, retirer l'accompagnement (cliente 2 + 4, agente 3)

Départ : scénario « Accompagnement ».

| #   | Tâche                                                                                                       | Réussite attendue                                                                                                      | À observer                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | « Awa te propose de t'accompagner. Lis et décide. » Puis : « Que pourra-t-elle faire ? Voir ? »             | Lit E-12 ; accepte ou refuse ; dit « m'aider à créer une épargne, pas voir mon solde »                                 | Lit-elle « Elle ne peut pas » ? Croit-elle donner accès à tout ?                                                                           |
| 2   | « Peux-tu encore déposer chez une autre agente ? »                                                          | « Oui »                                                                                                                | Croit-elle être liée à Awa seulement ?                                                                                                     |
| 3   | « Tu ne veux plus qu'Awa t'accompagne. Arrête. »                                                            | Profil → Mon accompagnement → Awa → « Retirer Awa de mon accompagnement » → confirme ; dit « mon argent ne bouge pas » | Trouve-t-elle l'entrée dans Profil (lot F, « Bientôt ici » sinon) ? Lit-elle le dialogue ?                                                 |
| 4   | Scénario « Accompagnement », demande fermée sans répondre : « Awa attend ta réponse. Retrouve sa demande. » | Accueil → « Awa attend ta réponse › » → E-12 ; ou Profil → Mon accompagnement                                          | Voit-elle la ligne de l'accueil ? La cherche-t-elle ailleurs ? Décide si la ligne est gardée (PNV-3, PO-9, décision PO du 21 octobre 2026) |

## E-P10 — Laisser une agente voir le point d'une épargne (cliente 2, agente 3)

Départ : scénario « Accompagnement » (accompagnement accepté), demande de point reçue.

| #   | Tâche                                                                                   | Réussite attendue                                                               | À observer                                                                       |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | « Awa veut voir le point de tes épargnes. Laisse-la voir seulement École Awa. »         | Coche École Awa seule → « Autoriser pour 1 épargne »                            | Coche-t-elle tout par réflexe ? Comprend-elle qu'aucune n'est cochée au départ ? |
| 2   | « Awa peut-elle voir ta Boutique ? Ton solde ? Et une épargne que tu créeras demain ? » | « Non, non, non »                                                               | Lit-elle « Une nouvelle épargne ne sera pas ajoutée seule. » ?                   |
| 3   | « Tu ne veux plus qu'Awa voie École Awa, mais elle t'accompagne toujours. Fais-le. »    | E-15 → « Retirer » sur École Awa → confirme ; Awa reste dans Mon accompagnement | Retire-t-elle l'agente entière par erreur ?                                      |

## E-P11 — Mon carnet : voir, garder et partager mon point (cliente 4)

Départ : scénario « Historique », détail École Awa (B · B07).

| #   | Tâche                                                                                                 | Réussite attendue                                                                                     | À observer                                                                                                                                                    |
| --- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | « Montre-moi ton carnet d'École Awa, comme le carnet du collecteur. Qui a confirmé le dépôt du 21 ? » | « Mon carnet » → E-17 ; lit « Confirmé par toi · Espèces reçues par Awa »                             | Lit-elle l'accroche « Ton signé-signé » ? Comprend-elle que c'est « signé » des deux côtés sans signature juridique ? (PNV-2, décision PO du 21 octobre 2026) |
| 2   | « Envoie-toi le point d'aujourd'hui par SMS. »                                                        | Mon point du jour → Partager → « Recevoir un résumé par SMS » ; lit « Résumé envoyé sur ton numéro. » | Confond-elle le relevé avec un reçu ou une preuve officielle ?                                                                                                |
| 3   | « Envoie ce point à ton mari sur WhatsApp. KOTIZ sait-il s'il l'a reçu ? »                            | « Partager le relevé » → WhatsApp ; « Non, KOTIZ ne sait pas »                                        | Cherche-t-elle un « Envoyé » ? Le total du carnet se comprend-il avec les retours au solde (PNV-1) ?                                                          |

## E-P12 — Avec une cliente sans smartphone : point et création d'épargne (agente 3 et 9)

Départ : scénario « Sans smartphone », accompagnement accepté, École Awa autorisée.

| #   | Tâche                                                                                                          | Réussite attendue                                                                      | À observer                                                                 |
| --- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | Le PO montre E-70 : « Awa te montre ton point d'École Awa sur son téléphone. Combien as-tu ? À quelle date ? » | « 45 000 F sur 100 000 F, au 21 octobre »                                              | Comprend-elle que c'est un point daté, pas son solde ?                     |
| 2   | « Demande à Awa de te l'envoyer. Où arrive-t-il ? »                                                            | « Par SMS, sur mon numéro »                                                            | Le PO-agente cherche-t-il à taper un autre numéro ? (attendu : impossible) |
| 3   | « Crée une épargne "Moto" de 300 000 F avec Awa. Ton argent bouge-t-il ? » (carte SMS de création remise)      | Répond aux questions d'Awa → lit le SMS → dit le code → « Non, aucun argent ne bouge » | Croit-elle avoir déposé ? Confond-elle ce code avec celui d'un dépôt ?     |

## E-P13 — Retrouver une opération en espèces (cliente 3)

Départ : scénario « Historique », accueil.

| #   | Tâche                                                                              | Réussite attendue                                                                                | À observer                                                  |
| --- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1   | « Montre-moi le reçu de ton dépôt en espèces d'aujourd'hui. Avec quelle agente ? » | Opérations → « Dépôt en espèces · Avec Awa » → Voir le reçu ; « Awa »                            | Distingue-t-elle un dépôt en espèces d'un dépôt Wave ?      |
| 2   | « Ton dépôt annulé d'hier : as-tu perdu de l'argent ? »                            | Ouvre la ligne « Annulé » ; « Non, rien n'est entré » ; voit qu'elle peut signaler une remise    | Prend-elle « Annulé » pour un échec qui a pris son argent ? |
| 3   | « Un retrait en espèces dit "Espèces à confirmer". Que dois-tu faire ? »           | Ouvre le détail → « J'ai reçu mes espèces » si elle les a reçues, sinon « Signaler un problème » | Comprend-elle « à confirmer » ?                             |

## Synthèse attendue après la séance

Pour chaque parcours : tâches réussies sur 3 (sur 4 pour E-P9), écrans d'hésitation, réponses « c'est fait ? » erronées, **espèces données ou prises au mauvais moment** (à compter à part, côté cliente et côté agente). Une tâche échouée deux fois devient une correction prioritaire avant la critique (`critique-design`). Une remise d'espèces au mauvais moment, même une seule fois, est prioritaire.

Points que le test observe (décisions PO du 21 octobre 2026, sans les rouvrir d'office) : moment de la remise au dépôt (E-P1-1, E-P3-1) et au retrait (E-P5-1, E-P6-1, E-P7-2) ; « J'ai reçu mes espèces » appuyé trop tôt (E-P5-1, E-P7-3) ; lecture de « Frais · à confirmer » (E-P1-2, E-P5-2, PO-1) ; destination choisie dans l'app (E-P2-1) ; confusion code / PIN (E-P3-2, E-P12-3) ; annulation et « J'ai donné les espèces » (E-P4-1) ; refus dit à la cliente seule (E-P7-1) ; portée de l'accompagnement (E-P9-1, E-P9-2) ; permission par épargne (E-P10-1, E-P10-2) ; lecture de l'accroche « signé-signé » (E-P11-1, PNV-2) ; total du carnet avec les retours au solde (E-P11-3, PNV-1) ; **ligne « Awa attend ta réponse › » de l'accueil : gardée seulement si E-P9-4 le justifie** (PNV-3, PO-9) ; passage au SMS pour la même demande (scénario « Cliente sans internet », PO-4) ; entrée « Mon accompagnement » dans Profil (E-P9-3) ; côté agente, le PO touche-t-il « Elle a changé d'avis ? Redemander » sans que la testeuse l'ait demandé ? (PO-5 : si oui, le lien est retiré).

Hors test (pas de protocole) : frais réels (G01), protocole des codes SMS (G02), contact et motifs d'assistance (G03), contenu final du résumé SMS et format du relevé (G04), retour au solde et reprise assistés sans smartphone (G05-2 tranchée, écrans à spécifier), suivi de restitution (lot F), avoirs de l'agente (#70).
