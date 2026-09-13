# Limiter la base du MVP aux contextes actifs

Le modèle KOTIZ conserve onze contextes, mais le MVP réduit n'active que IAM,
Savings, Agents, Payments, Notifications et Admin & Conformité. Les migrations et
tickets de Santé, Scoring et WhatsApp sont différés ; Growth et USSD restent hors
du périmètre actuel. Cette limite évite de construire une fondation horizontale
pour des fonctionnalités reportées, tout en préservant leurs frontières dans
`CONTEXT-MAP.md` afin de permettre une réactivation explicite et traçable.

## Conséquences

- La Story BMAD 1.4 doit être découpée en tranches vérifiables couvrant uniquement
  les six contextes actifs.
- Aucun schéma vide n'est créé par anticipation pour les cinq autres contextes.
- Toute réactivation exige une décision de périmètre, des critères d'acceptation
  à jour et de nouvelles migrations additives.
