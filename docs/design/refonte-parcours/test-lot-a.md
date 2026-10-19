# Mini-scripts de test — Lot A : accès et accueil

Date : 19 octobre 2026. Spec associée : [ux-spec-lot-a.md](ux-spec-lot-a.md).

## Mode d'emploi

- **Testeurs** : le PO (observateur, ou agente pour P2 et P3) et sa conjointe (cliente). Une seule personne observe ; elle ne parle pas pendant la tâche.
- **Support** : prototype cliquable Claude Design ouvert sur un téléphone Android, luminosité moyenne. Données fictives annoncées comme telles.
- **Consigne lue à voix haute** : la phrase de la tâche, rien de plus. Pas d'aide, pas de « clique là ». Si la testeuse bloque plus de 30 secondes, noter « bloquée » et passer à la tâche suivante.
- **Code SMS de démo** : remis sur un papier au début de la tâche, car le prototype n'envoie pas de vrai SMS.
- **À noter pour chaque tâche** : réussie oui / non ; hésitations (où, combien de temps) ; erreurs ; réponse à la question finale « C'est fait ou pas ? » (attendue : fait / en attente / échoué, sans aide).
- **Critères de succès du brief** observés sur chaque tâche : orientation (« Où es-tu ? Que fait ce bouton ? »), résultat lisible, une décision par écran.

Feuille de relevé conseillée : une ligne par tâche avec les colonnes Réussie · Hésitations · Erreurs · Réponse « c'est fait ? » · Remarque.

## P1 — Inscription autonome (8 écrans)

| # | Tâche lue à la testeuse | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Crée ton compte KOTIZ avec ton numéro. Voici le code reçu par SMS. Arrête-toi quand tu penses que c'est fini. » | Arrive sur Compte créé ; dit « c'est fait » | Hésitation sur Étape n sur 5 ; compréhension des accords ; confusion PIN / code SMS |
| 2 | « Recommence, mais tu t'es trompée d'un chiffre dans ton numéro : corrige-le à l'écran du code. » | Trouve Modifier sur l'écran du code, corrige, reçoit un nouveau code | Voit-elle le numéro affiché ? Comprend-elle que l'ancien code ne vaut plus ? |
| 3 | « Ton SMS n'arrive pas. Que fais-tu ? » (prototype : SMS jamais reçu) | Ouvre « Je n'ai pas reçu le code », comprend qu'il faut attendre puis renvoyer | Lit-elle le décompte ? Pense-t-elle que le compte est déjà créé ? |

## P2 — Cliente accompagnée sur son téléphone (8 écrans)

Rôles : le PO joue l'agente et explique à voix haute ; la conjointe tient son téléphone.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | Agente : « Je vais t'aider à créer ton compte. » Cliente : « Crée ton compte avec l'aide de l'agente. » | La cliente saisit elle-même code, accords et PIN ; compte créé | L'agente demande-t-elle à voir le code ou le PIN ? La cliente tend-elle le téléphone ? |
| 2 | Agente, à l'étape PIN : « Dis-moi ton code, je le tape pour toi. » | La cliente refuse ou hésite en citant la mention « même à une agente » | La mention est-elle vue et comprise ? |
| 3 | Cliente, à la fin : « L'agente peut-elle voir ton argent maintenant ? » | Répond non | Aucun écran ne doit laisser croire à un accès de l'agente |

## P3 — Agente : Ajouter une cliente (3 écrans, app agente)

Rôle : le PO ou la conjointe joue l'agente.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Crée la fiche de Fatou Koné, 07 08 12 34 56, vendeuse de pagnes. Tu ne connais pas son quartier. » | Fiche créée, localisation laissée vide sans blocage | Tente-t-elle de remplir un champ facultatif par crainte ? Lit-elle « Ce qui va se passer » ? |
| 2 | « Fatou a-t-elle déjà accès à l'application ? Que doit-elle faire ? » (sur A04) | « Non, elle doit l'activer sur son téléphone » | Les trois statuts sont-ils distingués sans aide ? |
| 3 | « Crée une fiche pour le 07 08 12 34 56 » (numéro déjà connu) | Lit « Ce numéro a déjà un compte » ; propose de demander à la cliente ou de contacter l'aide ; ne crée pas de doublon | Cherche-t-elle à modifier le numéro pour forcer ? Cherche-t-elle à ouvrir la fiche existante (aucun accès prévu) ? |

## P4 — Activation personnelle (7 écrans)

Préparation : montrer à la testeuse un faux SMS d'invitation sur papier ou capture.

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Une agente t'a inscrite. Tu as reçu ce SMS. Active ton accès KOTIZ. » | Arrive sur « Ton accès est activé » et dit « c'est fait » | Choisit-elle Créer mon compte ou Me connecter ? Hésite-t-elle à l'entrée (H1) ? |
| 2 | « Sur l'écran des accords, le nom affiché n'est pas le tien. Que fais-tu ? » (variante de prototype) | Touche « Ce n'est pas moi » | Le lien est-il trouvé ? |
| 3 | Sur « Ton accès est activé » : « Tu n'as pas d'argent sur toi. Va voir ton compte. » | Touche Plus tard, arrive sur l'accueil vide, lit 0 FCFA | Comprend-elle que les trois sorties sont facultatives ? (fin sur E08 : Décision PO du 19 octobre 2026) |

## P5 — Connexion sur le téléphone habituel (2 écrans)

PIN de démo : 4 chiffres (prototype, Décision PO du 19 octobre 2026).

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Ouvre ton compte. Ton PIN est sur ce papier. » | Accueil ouvert | Temps total ; reconnaît-elle son prénom et son numéro masqué ? |
| 2 | « Tape un mauvais PIN, puis le bon. » | Comprend l'erreur et réussit au second essai | Le message d'erreur est-il lu ? Peur d'être bloquée ? |
| 3 | « Tu as oublié ton PIN. Que fais-tu ? » | Touche « PIN oublié ? » | Le lien est-il trouvé sans chercher ? (le prototype s'arrête sur « Bientôt ici ») |

## P6 — Connexion sur un nouveau téléphone (5 écrans)

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Tu as un nouveau téléphone. Ouvre ton compte KOTIZ. Voici le code SMS et ton PIN. » | Accueil ouvert après numéro, code et PIN | Comprend-elle pourquoi on demande le PIN après le code ? |
| 2 | « Connecte-toi avec ce numéro » (numéro sans compte) | Comprend qu'il n'y a pas de compte ; choisit corriger ou créer | Pense-t-elle avoir perdu son argent ? |
| 3 | « Tu as changé de numéro depuis ton inscription. Que fais-tu ? » | Trouve « J'ai changé de numéro » | Lien trouvé ou blocage ? |

## P7 — Numéro déjà inscrit (4 écrans)

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Crée un compte avec ce numéro » (numéro déjà inscrit) | Arrive sur « Ce numéro a déjà un compte », choisit Me connecter | Comprend-elle qu'elle n'a pas besoin d'un second compte ? |
| 2 | « Tu ne te souviens plus de ton PIN. » (sur E09) | Touche Récupérer mon accès | Choix fait sans hésitation entre les deux sorties ? |
| 3 | « Ce n'était pas ton numéro, tu t'es trompée. » (sur E09) | Touche Utiliser un autre numéro | Le lien texte est-il vu ? |

## P8 — Compte créé et ses trois sorties (2 écrans)

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | Sur Compte créé : « Ton compte est-il créé ? » | « Oui, c'est fait » | Réponse immédiate ? |
| 2 | « Tu n'as pas d'argent sur toi aujourd'hui. Continue. » | Touche Plus tard, arrive sur l'accueil vide | Se sent-elle obligée de créer une épargne ? Trouve-t-elle Plus tard (en haut à droite) ? **Chronométrer** : plus de 5 s d'hésitation → Plus tard passe en bas (critique #9) |
| 3 | « Tu as 2 000 FCFA sur ton Mobile Money et tu veux les mettre sur KOTIZ maintenant. » | Touche Faire mon premier dépôt (bouton texte) | Le bouton texte est-il vu sous « Créer mon épargne » (principal, Décision PO du 19 octobre 2026) ? |

## P9 — Accueil vide, rempli, masqué (1 écran)

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | Accueil rempli : « Combien d'argent peux-tu utiliser tout de suite ? » | Lit le Solde disponible (12 400 FCFA), pas un montant d'épargne | Confusion solde / épargnes ? |
| 2 | « Ta voisine regarde ton écran. Cache tes montants. » Puis : « Ferme l'application et rouvre-la. » | Touche l'œil ; montants et pourcentages cachés ; toujours cachés après réouverture | Trouve l'œil ? Remarque-t-elle un montant resté visible ? Comprend-elle la barre de progression sans chiffre ? (masquage persistant : Décision PO du 19 octobre 2026) |
| 3 | « Ton dernier versement vers École est-il arrivé ? » | « Non, il est en attente » | Distingue « Fait » et « En attente » sans aide ? |

## P10 — Mon QR (2 écrans)

| # | Tâche | Réussite attendue | À observer |
|---|---|---|---|
| 1 | « Une agente veut te trouver pour un dépôt. Montre-lui ton code. » | Ouvre Mon QR depuis l'accueil | Trouve le bouton sans chercher ? |
| 2 | « Quelqu'un qui voit ce code peut-il prendre ton argent ? » | « Non » | La phrase de l'écran est-elle lue ? |
| 3 | « Reviens à ton accueil. » | Retour à l'accueil, luminosité revenue à la normale | Utilise ← ou le retour Android ? La luminosité maximale gêne-t-elle ? (si faisable sous Expo) |

## Synthèse attendue après la séance

Pour chaque parcours : tâches réussies sur 3, écrans où la testeuse a hésité, réponses « c'est fait ? » erronées. Toute tâche échouée deux fois (PO et conjointe) devient une correction prioritaire avant la critique (`critique-design`).
