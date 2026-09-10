# Promouvoir les lots de develop vers main

KOTIZ utilise un flux à deux branches protégées : les branches courtes de ticket
sont fusionnées dans `develop`, qui sert d'intégration et de support au sandbox,
puis un lot validé est promu par pull request de `develop` vers `main`. Ce contrôle
supplémentaire sépare l'intégration quotidienne de l'état releasable attendu sur
`main`, sans introduire les branches permanentes d'un GitFlow complet.

## Conséquences

- Aucun push direct n'est autorisé sur `develop` ou `main`, y compris pour les
  administrateurs.
- Les branches de ticket sont squashées lors de leur fusion dans `develop`.
- La promotion de `develop` vers `main` utilise un merge commit afin de conserver
  exactement le lot validé.
- Une approbation humaine est obligatoire avant toute fusion dans les deux branches.
- À compter de la Story 1.2, la CI contrôlera les pull requests vers les deux
  branches ; les opérations de release, de tag et de signature ne partiront
  qu'après fusion dans `main`.
- Les branches permanentes `release/*` et `hotfix/*` ne sont pas utilisées pendant
  le MVP.

## Vérification

Les configurations de référence sont versionnées dans `.github/rulesets/`. La
configuration distante est contrôlée avec `pnpm verify:github-flow`. Ce contrôle
interroge GitHub et échoue si une branche ou un ruleset manque, si une méthode de
fusion est incorrecte ou si une règle autorise un push direct, un force-push, une
suppression, un commit non signé ou une fusion sans approbation.
