# Promouvoir les lots de develop vers main

KOTIZ utilise un flux à deux branches protégées : les branches courtes de ticket
sont fusionnées dans `develop`, qui sert d'intégration et de support au sandbox,
puis un lot validé est promu par pull request de `develop` vers `main`. Ce contrôle
supplémentaire sépare l'intégration quotidienne de l'état releasable attendu sur
`main`, sans introduire les branches permanentes d'un GitFlow complet.

## Conséquences

- Aucun push direct n'est autorisé sur `develop` ou `main`.
- Les branches de ticket sont squashées lors de leur fusion dans `develop`.
- La promotion de `develop` vers `main` utilise un merge commit afin de conserver
  exactement le lot validé.
- La CI contrôle les pull requests vers les deux branches ; les opérations de
  release, de tag et de signature ne partent qu'après fusion dans `main`.
- Les branches permanentes `release/*` et `hotfix/*` ne sont pas utilisées pendant
  le MVP.
