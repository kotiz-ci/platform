# Promotion du lot S1

Cette procédure applique l'ADR-0002 en gouvernance solo. Elle ne concerne que
la promotion du lot intégré de `develop` vers `main`.

## Avant la fusion

1. Ouvrir une pull request avec `develop` comme source et `main` comme cible.
2. Vérifier que son diff correspond exactement à `main..develop`.
3. Attendre les contrôles de qualité, de sécurité et de l'image backend.
4. Relire le diff et les résultats, puis publier exactement ce commentaire sur
   la pull request :

   ```text
   S1 PROMOTION APPROVED
   ```

   GitHub ne permet pas à l'auteur d'approuver sa propre pull request. Ce
   commentaire d'un propriétaire, membre ou collaborateur constitue donc
   l'auto-revue humaine documentée prévue par l'ADR-0002.

5. Relancer le run CI après le commentaire. Le contrôle
   `S1 promotion acceptance` repart d'un checkout frais et exécute
   `pnpm verify:local-dev`.
6. Fusionner uniquement lorsque `CI required` est vert, avec un **merge commit**.

La CI de la pull request conserve l'image backend vérifiée et son digest dans un
artifact immuable. Elle ne publie aucune image.

## Après la fusion

Le workflow `Release verified backend image` télécharge cet artifact, publie
l'image exacte dans GHCR sans rebuild et vérifie que le digest publié est celui
de la CI. Il signe ensuite la référence par digest avec l'identité OIDC du
workflow et vérifie immédiatement la signature Cosign.

Le compte rendu contient la pull request, les deux runs, le digest, la référence
GHCR et l'identité de signature. Il est conservé comme artifact du workflow et
comme commentaire durable sur l'issue #36.

En cas de panne transitoire après fusion, relancer uniquement le job échoué du
workflow de publication pendant la période de conservation de l'artifact. Ne
pas reconstruire ou pousser manuellement une image de remplacement.
