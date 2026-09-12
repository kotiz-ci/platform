# Session — Issue #35 Flyway et rôles PostgreSQL

## Résultat

L'issue #35 est implémentée sur `feature/35-flyway-postgres-roles` depuis le point
fixe `d5413868d2fc15e45f9965df775c12423f0969bc`.

- Spring Boot applique automatiquement la migration technique V1 avec Flyway.
- `kotiz_migrator` possède le schéma et peut créer, modifier et supprimer sa structure.
- `kotiz_app` utilise le schéma et les objets futurs sans droit de création ou d'altération.
- Les mots de passe administration, migration et application sont générés séparément hors Git.
- La base ne contient aucune table métier après V1 ; seule l'historique Flyway est créée.
- Les migrations fusionnées sont immuables et toute correction est additive.

## Preuves

- RED : le test PostgreSQL démarrait, mais Spring ne fournissait aucun bean Flyway ; quatre tests échouaient.
- GREEN ciblé : `PostgresMigrationIntegrationTest` — 4 tests réussis sur PostgreSQL 15.19.
- Suite complète : `pnpm test` — 52 tests dépôt dont 51 réussis et 1 recette live ignorée, puis 6 tests backend réussis ; couverture JaCoCo conforme.
- Recette live : `bash scripts/verify-local-dev.sh` — migration, refus CREATE/ALTER, redémarrage idempotent, persistance et reset réussis.
- Qualité : `pnpm type-check`, `pnpm lint` et Markdown ciblé réussis avec Node 24.21.0 et pnpm 9.12.3.

## Limites

- Aucun contexte métier, ledger ou table métier n'a été introduit.
- Aucun push, pull request, merge ou déploiement n'a été effectué pendant cette session.
