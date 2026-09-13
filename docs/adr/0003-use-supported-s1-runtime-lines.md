# Utiliser des lignes de runtime supportées pour S1

Le socle S1 utilise Node.js 24 LTS, Eclipse Temurin Java 21 LTS, Spring Boot 4.1
et PostgreSQL 15 sur son dernier correctif disponible. Le plan BMAD initial
imposait Node.js 20, Spring Boot 3.3 et PostgreSQL 15.8 ; ces références sont
devenues hors support ou trop anciennes avant l'initialisation effective du
backend. Comme le backend est encore un placeholder, la mise à niveau intervient
avant que la CI et les migrations ne figent cette dette.

## Conséquences

- Les manifests, images de build, documentation d'onboarding et workflows CI
  doivent utiliser les mêmes lignes de runtime.
- Les versions correctives exactes sont verrouillées dans les manifests ou lockfiles
  et peuvent évoluer sans nouvel ADR tant que la ligne supportée ne change pas.
- Expo SDK 54 est conservé pendant S1 ; sa montée de version fera l'objet d'un
  changement séparé si une incompatibilité avec Node.js 24 est démontrée.
- Redis n'appartient plus au socle S1 et sera choisi lors de sa première utilisation.
