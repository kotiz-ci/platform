# Brief design — KOTIZ, refonte UX des parcours clients MVP

Date : 19 octobre 2026. Statut : brief validé par le PO en interview (grill-design). Aucun écran produit par ce brief.
Sources : [PRD Design MVP v1.0](../prd-design-mvp.md), [registre métier](../../product/regles-metier-parcours-mvp.md), [matrice de couverture](../matrice-couverture-socle.md), [spec UX](../ux-design-specification.md), passation `_sessions/2026-10-18-handoff-claude-code-design.md`.

## Problème

L'accueil Direction 04 avait trouvé le bon esprit (mix Wave / Djamo / Revolut). Les écrans produits ensuite ont dérivé. Le PO confirme les quatre défauts, tous à corriger :

1. **Parcours fragmentés** : on perd le fil d'un écran à l'autre, on ne sait plus où on est.
2. **Saisie du montant peu perceptible** : le montant n'est pas l'élément dominant.
3. **Trop de vert, trop de cartes empilées** : l'effet épuré et premium de l'accueil se perd.
4. **Résultats pauvres** : attente et succès mal distingués.

Les parcours ont été écrits (PRD v1.0, règles métier) pour repartir sur une base saine. Il manque une proposition UX experte, parcours par parcours, cohérente de bout en bout et rattachée aux tickets de développement.

## Cibles

### Fatou — cliente autonome (cible principale)

- Commerçante / épargnante, Abidjan. Lecture partielle : phrases courtes, icônes non ambiguës, texte ≥ 14 px.
- Android d'entrée de gamme, data chère et instable (≤ 5 Mo par session), usage possible en extérieur.
- Habituée au Mobile Money (Wave, Orange Money) ; tutoiement, ton « Akwaba Fatou ».
- Objectif : déposer, mettre de côté dans une épargne, savoir ce qu'elle a, retirer — sans peur de se tromper.

### Cliente accompagnée sur son téléphone

- Même parcours que l'autonome ; l'agente explique, la cliente saisit elle-même code SMS, consentements et PIN.
- Objectif : être aidée sans jamais exposer ses secrets.

### Agente (périmètre limité)

- Uniquement les écrans qui ouvrent un parcours cliente : Ajouter une cliente (fiche), lancement d'un dépôt / retrait cash.
- Objectif : démarrer l'opération proprement, sans agir à la place de la cliente.

## Critères de succès

Chaque parcours est jugé sur cinq comportements observables :

1. **Orientation** : sur tout écran, Fatou dit où elle est et ce que fera le bouton principal.
2. **Montant** : le montant saisi est l'élément le plus visible ; au récapitulatif elle dit combien sera débité et vers quelle destination (solde ou épargne).
3. **Résultat** : elle distingue sans aide « c'est fait », « en attente », « échoué ».
4. **Rythme** : une décision par écran, un seul bouton principal, parcours principal court (nombre d'écrans cible fixé par parcours lors des flows).
5. **Sobriété visuelle** : au plus 2 couleurs d'accent par écran, pas de cartes dans les cartes. L'accueil Direction 04 est la référence de départ, **pas un gel** : le designer recommande ce qu'on garde et ce qu'on fait évoluer, le PO tranche.

**Validation** : pas de panel de clientes disponible. Validation par le PO et sa conjointe, avec un mini-script de test par lot (3 tâches sans aide ; observer hésitations, erreurs, réponse à « c'est fait ou pas ? »). Recette au clic en complément.

## Périmètre

- **Inclus** (app cliente, dans l'ordre) :
  - A — accès / accueil : inscription autonome, fiche agente + activation personnelle, connexion téléphone habituel / nouveau, Compte créé, accueil vide / rempli / masqué, Mon QR.
  - B — épargne et retour au solde.
  - C — dépôt, affectation, reprise, opérations et reçus.
  - D — retraits Mobile Money.
  - E — cash et accompagnement / carnet / permissions.
  - F — récupération, sécurité, aide, notifications essentielles.
  - Côté agente : seulement les écrans de départ des parcours ci-dessus.
  - Préalable : corrections design system F01 navigation, F02 masquage / « Solde disponible », F03 montant / cible / % / barre.
- **Exclus** : assurance Santé (19-22), étoiles, score financier, biométrie, rappels volontaires et promotions (restent au backlog, non supprimés) ; reste de l'app agente (liste clientes, tableau de bord, carnet côté agente) — chantier séparé ; code applicatif.

## Démarche et pilotage

- **Phases par parcours** : analyse → flows → wireframes → haute fidélité → recette → validé. Un parcours à la fois, plusieurs agents pour l'analyse, un seul responsable des mutations Figma.
- **Outil (décision PO du 19 octobre 2026, remplace la consigne « Figma uniquement, pas de HTML » de la passation Codex)** : tout dans Claude Design. Design System KOTIZ (type Design System) migré une fois depuis Figma en lecture seule — tokens, Inter, illustrations, logos, accueil Direction 04 — avec corrections F01-F03 appliquées à la migration. Écrans et prototypes cliquables dans le type Design, ouverts par lien sur téléphone. Figma `Ejhn5axhlQERtHPKYQ39gp` gelé en archive de référence, rien supprimé. Compensation de l'absence d'inspecteur Figma : spec de handoff par parcours jointe à l'issue.
- **Tickets** : un seul niveau, les issues GitHub `kotiz-ci/platform` (#59, #64-#73, #75…). Pas de tickets pour le travail Figma. Après validation d'un parcours, l'issue reçoit une section « Design validé » : lien Figma, captures des écrans clés, critères d'acceptation et Gherkin (paramètres non tranchés marqués « à confirmer »). Aucune modification d'issue sans feu vert explicite du PO.
- **Flow de dev** : `/implement-ticket` ou `/implement-spec`, Gherkin avant le code (`/kotiz-story` abandonné).
- **Tableau de pilotage** : une ligne par parcours client, regroupée par lot. Colonnes : phase design, issues liées, et quatre cases :
  1. Design validé (recette + feu vert PO et conjointe).
  2. Tickets prêts (issue enrichie : lien prototype, captures, spec de handoff, Gherkin).
  3. Gates levés (G01-G07 concernés levés ou contournés en données fictives explicites).
  4. Bout en bout (code livré, parcours déroulé sur vrai téléphone du départ au résultat).
     Un lot est coché quand tous ses parcours ont la case 4. Support recommandé : artifact partagé avec cases cochables.

## Contraintes

- Décisions PO validées à préserver : PRD v1.0, FIN-01 à FIN-05, règles métier (fiche ≠ activation ≠ rattachement ≠ autorisation, aucun PIN vu par l'agente, 3 épargnes actives max, racines Accueil / Épargnes / Opérations / Profil, barre basse sur racines seulement…). Une proposition UX qui les contredit est signalée « proposition non validée », jamais appliquée d'office.
- Marque : Direction 04, Inter, tokens, illustrations et masters existants ; vert réservé aux gestes principaux ; Wave en symbole sans inscription ; archiver, ne pas supprimer ni détacher.
- Rien d'inventé : frais, plafonds, opérateurs, longueurs / délais de codes, KYC, preuves de récupération, contacts d'assistance, garanties partenaire.
- Accessibilité : cibles 44 × 44 (48 pour fréquent), contraste AA, statut lisible sans couleur seule ; petit viewport, clavier ouvert, noms longs, safe areas.
- Gates G01-G07 ouverts (partenaire, sécurité / SMS, assistance, partage / contact, exceptions, critères tickets, recette Figma).
- Outils : Figma lu via le connecteur officiel pour la migration uniquement ; connecteur GitHub en erreur à réparer avant tout rattachement.

## Références visuelles

- **Wave** : une action évidente, montant énorme, quasi aucune décoration → saisie et confirmation.
- **Djamo** : chaleur, proximité, ton local → accueil, états vides, résultats.
- **Revolut** : finition, typographie, lisibilité des listes → opérations, détail d'épargne. Vigilance : que le « premium » n'alourdisse pas pour Fatou.
- **Ancrage interne** : accueil Direction 04 (Figma `Ejhn5axhlQERtHPKYQ39gp`, nodes 13:945 / 13:658, masqué 13:1021), à réinspecter avant avis.
- Rejeté : copier ces marques, palette dominée par le vert, piles de cartes, succès célébré pendant l'attente.

## Questions ouvertes

1. ~~Outil~~ : tranché le 19 octobre — tout dans Claude Design, Figma gelé.
2. Avis expert sur l'accueil Direction 04 (garder / faire évoluer) — après inspection Figma live.
3. Nombre d'écrans cible par parcours principal — fixé lors des flows de chaque lot.
4. Réparation du connecteur GitHub avant l'étape « Tickets prêts ».
5. Constats d'audit F01-F10 du 11 octobre à revérifier sur l'état Figma live.
