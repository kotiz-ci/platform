# Utiliser Expo avec deux variantes mobiles

KOTIZ utilise un seul code source React Native avec Expo SDK 54 pour produire
deux binaires distincts : `client` pour Fatou et `agent` pour Moussa. Le variant
est choisi par `EXPO_PUBLIC_APP_VARIANT` et configure le branding, les identifiants
de bundle, les permissions et les routes accessibles.

## Conséquences

- Aucun dossier `apps/agent` séparé n'est créé.
- Les scripts de démarrage, de build web et de vérification TypeScript existent
  séparément pour les variants `client` et `agent`.
- `app.config.ts` est la source de vérité de la configuration Expo dynamique.
- Les profils EAS gardent des identifiants et canaux distincts pour chaque binaire.
- Les assets finaux seront branchés lors de la livraison design ; le socle ne
  référence aucun fichier placeholder absent.
