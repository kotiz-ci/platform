# Mini-scripts de test — Lot B : épargne et retour au solde

Date : 19 octobre 2026, mis à jour avec les décisions PO du même jour. Spec associée : [ux-spec-lot-b.md](ux-spec-lot-b.md). Même méthode que [test-lot-a.md](test-lot-a.md).

## Mode d'emploi

- **Testeurs** : le PO (observateur) et sa conjointe (cliente). Une seule personne observe ; elle ne parle pas pendant la tâche.
- **Support** : prototype cliquable Claude Design ouvert sur un téléphone Android, luminosité moyenne. Données fictives annoncées comme telles.
- **Personnage** : « Fatou Koné » (pas le vrai nom de la testeuse, pour éviter le décalage vu au lot A).
- **Consigne lue à voix haute** : la phrase de la tâche, rien de plus. Pas d'aide. Bloquée plus de 30 secondes = « bloquée », tâche suivante.
- **PIN de démo** : 2468, remis sur papier (4 chiffres au prototype, longueur finale à confirmer G02).
- **À noter pour chaque tâche** : réussie oui / non ; hésitations (où, combien de temps) ; erreurs ; réponse à « C'est fait ou pas ? » (attendue sans aide : fait / en attente / échoué).
- **Critères du brief observés** : orientation (« Où es-tu ? Que fait ce bouton ? »), montant dominant et destination lisible, statut réel, une décision par écran.

Feuille de relevé conseillée : une ligne par tâche, colonnes Réussie · Hésitations · Erreurs · Réponse « c'est fait ? » · Remarque.

### Données fictives du prototype

| Épargne | Type | Épargné | Cible | État |
|---|---|---|---|---|
| École Awa | École | 45 000 F | 100 000 F | partielle, date 30 juin 2027 |
| Boutique | Commerce | 8 000 F | 50 000 F | partielle ; dans le scénario « 3 actives », un retour de 2 000 F « En attente » |
| Tabaski | Fête | 52 000 F | 50 000 F | objectif atteint (scénario « 3 actives ») |
| Moto | Véhicule | 0 F | — | fermée le 12 oct. |

Solde disponible : 12 400 FCFA. Scénarios du menu : « 0 épargne » (accueil vide), « 2 actives » (École Awa, Boutique), « 3 actives » (+ Tabaski), « retour échoué », « retour en attente ». Retour au solde : sans frais (Décision PO du 19 octobre 2026).

## Nombre d'écrans par chemin principal

| Parcours | Écrans | Séquence |
|---|---|---|
| P1 Créer une épargne | 7 (5 étapes + résultat + détail) | B02 B03 B04 B05 B06 B17 B07 |
| P2 Voir mes épargnes | 1 | B01 |
| P3 Suivre une épargne | 2 | B01 B07 |
| P4 Modifier | 2 | B07 B08 |
| P5 Remettre sur mon solde | 5 | B07 B09 B10 B11 B12 |
| P6 Fermer à zéro | 3 | B07 B14 B01 |
| P6 Fermer avec des fonds | 7 | B07 B13 B09 B10 B11 B12 B14 (lien « Fermer cette épargne ? » de B12) |
| P7 Limite atteinte | 1 | B01 (état) ou B15 |
| P8 Masquage | 2 | B01 B07 |

## P1 — Créer une épargne (5 étapes, 7 écrans)

Départ : scénario « 0 épargne », accueil vide (H01). Version du 19 octobre 2026 (Décision PO : création en 5 étapes, date et nom toujours présentés, remplace Q2) : à rejouer avec la conjointe, les autres parcours du lot B sont validés.

| # | Tâche lue à la testeuse | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu veux mettre de côté 100 000 FCFA pour l'école de ta fille. Tu ne sais pas encore pour quand. Crée cette épargne. Arrête-toi quand c'est fini. » | Quel projet → École ; Combien → 100 000 ; Pour quand → « Pas de date pour l'instant » ; garde le nom « École » ; le récapitulatif montre « Date : Pas de date » ; arrive sur « Ton épargne est créée », dit « c'est fait » | Trouve-t-elle « Pas de date pour l'instant », ou se croit-elle obligée de choisir une date ? Les 5 étapes la fatiguent-elles (compter les hésitations) ? Pense-t-elle devoir mettre de l'argent tout de suite ? |
| 2 | « Maintenant, tu veux 50 000 FCFA pour ta boutique dans 6 mois. Appelle-la "Boutique Adjamé". Crée-la. » Puis, sur le récapitulatif, avant de créer : « Combien dois-tu mettre chaque semaine ? Et elle s'appelle comment ? » | Commerce → 50 000 → « Dans 6 mois » → remplace « Commerce » par « Boutique Adjamé » ; répond « environ 1 924 F par semaine » et « Boutique Adjamé » ; le récapitulatif montre Projet, Nom, Objectif, Date (19 avril 2027), sans ligne Note | Efface-t-elle le nom prérempli ou écrit-elle à la suite ? Lit-elle le montant par semaine sur B04 ou au récapitulatif ? Le prend-elle pour une obligation ou un prélèvement automatique ? |
| 3 | Toujours sur le récapitulatif : « Finalement, ce sera pour le 30 juin 2027. Change la date, puis crée. » | « Modifier » sur la ligne Date → « Choisir une date » → 30 juin 2027 → Continuer ramène au récapitulatif (environ 1 389 F par semaine) → Créer | Trouve-t-elle « Modifier » sur la bonne ligne ? Est-elle surprise de revenir directement au récapitulatif ? |
| 4 | Sur « Ton épargne est créée » : « Combien d'argent y a-t-il dans cette épargne ? » | « Rien, 0 F » ; l'objectif est 50 000 F | Confond-elle objectif et argent déposé ? Croit-elle que de l'argent a été pris sur son solde ? |

## P2 — Voir mes épargnes (1 écran)

Départ : scénario « 2 actives », accueil.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Va voir toutes tes épargnes. » | Ouvre l'onglet Épargnes (barre basse) ou le raccourci de l'accueil | Reconnaît-elle l'icône Épargnes (provisoire) ? |
| 2 | « Combien as-tu déjà mis pour la boutique, et combien veux-tu atteindre ? » | « 8 000 F sur 50 000 F » | Lit-elle les deux montants dans le bon sens ? |
| 3 | « Où est ton épargne Moto ? Peux-tu encore y mettre de l'argent ? » | La trouve dans « Fermées » ; répond non | Cherche-t-elle Moto parmi les actives ? Comprend-elle « Fermée le 12 oct. » ? |

## P3 — Suivre une épargne (2 écrans)

Départ : scénario « 3 actives », onglet Épargnes.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Ouvre École Awa. Combien te manque-t-il pour ton objectif ? » | « 55 000 F » (phrase de reste) | Lit-elle la phrase ou calcule-t-elle ? Le % l'aide-t-il ou la gêne-t-il ? |
| 2 | « Ouvre Tabaski. Que s'est-il passé ? Ton argent a-t-il bougé tout seul ? » | « Objectif atteint ; l'argent est toujours dedans, rien n'a bougé » | Confond-elle « Objectif atteint » avec un dépôt « Fait » ou un transfert ? Voit-elle 52 000 F (pas de % > 100) ? |
| 3 | « Ouvre Boutique. Le retour de 2 000 F vers ton solde est-il arrivé ? » | « Non, il est en attente » | Distingue « En attente » de « Fait » sans aide ? Remarque-t-elle que « Remettre sur mon solde » est désactivé, avec la raison ? |

## P4 — Modifier une épargne (2 écrans)

Départ : B07 École Awa.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Finalement, tu veux atteindre 120 000 FCFA. Change ton objectif. » | Modifier → objectif 120 000 → Enregistrer ; B07 affiche « sur 120 000 F » et « Encore 75 000 F » | Trouve « Modifier » en haut à droite ? Pense-t-elle que de l'argent a bougé ? |
| 2 | « Change aussi le type : ce n'est plus l'école, c'est la boutique. » | Voit « Projet : École — ne change pas » et dit que ce n'est pas possible | Frustration ? Cherche-t-elle un contournement ? (type fixe au MVP, Décision PO du 19 octobre 2026 ; noter la frustration éventuelle sans changer la règle) |
| 3 | « Efface le nom et la date, puis reviens sans enregistrer. » | Dialogue « Quitter sans enregistrer ? » → Quitter ; l'épargne garde ses valeurs | Comprend-elle que rien n'a changé ? |

## P5 — Remettre de l'argent sur mon solde (5 écrans)

Départ : B07 École Awa (45 000 F).

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu as besoin de 20 000 FCFA de l'école pour le marché. Remets-les sur ton solde. Arrête-toi quand c'est fini. » | Montant 20 000 → récapitulatif → PIN → « Fait » ; dit « c'est fait » | Avant le PIN, demander : « D'où part l'argent, où va-t-il ? » (attendu : de École Awa vers le solde). Pense-t-elle que l'argent part sur son Mobile Money ? |
| 2 | Après la tâche 1 : « Combien reste-t-il dans École Awa ? L'épargne existe-t-elle encore ? » | « 25 000 F ; oui, elle est toujours là » | Craint-elle d'avoir cassé son épargne ? Après « Voir mon solde » : explique-t-elle seule pourquoi le solde est à 32 400 F (la carte garde « Dernier dépôt », le retour est dans les Dernières opérations) ? |
| 3 | Scénario « retour en attente » (Boutique sans retour en cours) : « Remets tout ce qu'il y a dans Boutique sur ton solde. » | Utilise « Tout remettre » (8 000 F) ; sur le résultat, répond « en attente » et ne recommence pas | Trouve « Tout remettre » ? Voit « Boutique sera à 0 F. Elle reste ouverte. » ? Tente-t-elle de refaire l'opération ? |

## P6 — Fermer une épargne (3 écrans à zéro)

Départ : B07 École Awa avec 25 000 F (après P5).

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu n'as plus besoin de l'épargne École Awa. Ferme-la. » | Lit « Il reste 25 000 F » ; choisit « Remettre sur mon solde » ; termine le retour | Comprend-elle pourquoi elle ne peut pas fermer tout de suite ? Pense-t-elle que l'épargne est fermée après le retour ? |
| 2 | Suite, sur l'écran de résultat : « Maintenant ferme-la vraiment. » | Touche le lien « Fermer cette épargne ? » de B12 (ou revient au détail et touche « Fermer cette épargne ») → dialogue → « Fermer l'épargne » → liste avec « École Awa est fermée. » | Voit-elle le lien sous « Voir mon solde » (Décision PO du 19 octobre 2026) ? Lit-elle « Ses mouvements restent dans Opérations » ? Hésite-t-elle par peur de perdre de l'argent ? |
| 3 | « Ton dépôt de la semaine dernière dans École Awa, est-il effacé ? » | « Non, il est dans Opérations » (ou dans l'épargne fermée) | Associe-t-elle fermer et supprimer ? |

## P7 — Limite de 3 épargnes actives (1 écran)

Départ : scénario « 3 actives », onglet Épargnes.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Crée une nouvelle épargne pour un voyage. » | Ne trouve pas de bouton Créer ; lit « Tu as 3 épargnes actives. C'est le maximum. » et l'explique | Cherche-t-elle longtemps un bouton ? Le compteur « 3 sur 3 » l'a-t-il prévenue ? |
| 2 | « Que dois-tu faire pour pouvoir la créer ? » | « Fermer une épargne vide » | Pense-t-elle que KOTIZ va fermer une épargne à sa place ? |
| 3 | « Moto est fermée. Compte-t-elle dans les 3 ? » | « Non » | Lit-elle la section « Fermées » comme hors du compte ? |

## P8 — Montants masqués dans les épargnes (2 écrans)

Départ : scénario « 2 actives », accueil, montants visibles.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Ta voisine regarde ton écran. Cache tes montants, puis va voir tes épargnes. » | Œil de l'accueil ; sur Épargnes et sur École Awa, montants cachés, barres visibles | Remarque-t-elle un montant resté visible ? Comprend-elle la barre sans chiffre ? |
| 2 | « Sans rien afficher, ton épargne École Awa avance-t-elle bien ? » | Répond avec la barre (« un peu moins de la moitié ») | La barre suffit-elle ? |
| 3 | « Remets 5 000 FCFA d'École Awa sur ton solde. » | Le montant saisi et le récapitulatif sont visibles ; elle termine | Le passage de masqué à visible la surprend-il ? Le résultat visible la gêne-t-il (Décision PO du 19 octobre 2026, Q3) ? |

## Synthèse attendue après la séance

Pour chaque parcours : tâches réussies sur 3, écrans d'hésitation, réponses « c'est fait ? » erronées. Une tâche échouée deux fois (PO et conjointe) devient une correction prioritaire avant la critique (`critique-design`). Décisions PO du 19 octobre 2026 à confirmer par le test (sans les rouvrir d'office) : Q2 remplacée par la création en 5 étapes (P1-1 à P1-3, à rejouer), Q3 résultat visible en masqué (P8-3), Q4 boutons sur épargne atteinte (P3-2), lien « Fermer cette épargne ? » après un retour total (P6-2), type fixe (P4-2).
