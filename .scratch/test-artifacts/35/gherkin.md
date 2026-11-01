# Issue #35 — Migrations Flyway et rôles PostgreSQL

Point fixe de revue : `d5413868d2fc15e45f9965df775c12423f0969bc`

## Registre des sources

- `AC-1` — Le rôle de migration peut faire évoluer le schéma.
- `AC-2` — Le rôle applicatif ne peut ni créer ni modifier la structure du schéma.
- `AC-3` — Le démarrage applique automatiquement une première migration technique sur une base vide.
- `AC-4` — Un redémarrage n'applique pas deux fois la même migration.
- `AC-5` — Un test d'intégration démarre un PostgreSQL propre et prouve la migration.
- `AC-6` — La convention interdit la modification d'une migration fusionnée et impose une migration corrective additive.
- `AC-7` — Aucune table métier ni aucun contexte différé n'est créé.
- `BLOCKER-1` — L'issue #34 est fermée.
- `ADR-0001` — Les contextes différés ou retirés ne reçoivent aucune migration sans réactivation explicite.
- `ADR-0003` — PostgreSQL reste sur la ligne 15 au dernier correctif disponible.

## Scénarios

```gherkin
Fonctionnalité: Appliquer les migrations avec des privilèges PostgreSQL séparés

  # Source: AC-1
  Scénario: Le rôle de migration peut faire évoluer la structure
    Étant donné un PostgreSQL 15 propre avec un rôle de migration et un rôle applicatif
    Quand le rôle de migration crée, modifie puis supprime une table technique temporaire
    Alors chaque opération de structure réussit

  # Source: AC-2
  Scénario: Le rôle applicatif ne peut ni créer ni modifier la structure
    Étant donné un PostgreSQL 15 initialisé avec les rôles séparés
    Quand le rôle applicatif tente de créer une table ou de modifier une table existante
    Alors PostgreSQL refuse chaque opération pour privilèges insuffisants

  # Source: AC-3, AC-5
  Scénario: Le premier démarrage applique la migration technique
    Étant donné un PostgreSQL 15 propre sans historique Flyway
    Quand le backend démarre avec le rôle applicatif et Flyway avec le rôle de migration
    Alors l'historique Flyway contient exactement une exécution réussie de la migration version 1

  # Source: AC-4
  Scénario: Un second démarrage ne rejoue pas la migration
    Étant donné que la migration version 1 a été appliquée avec succès
    Quand Flyway migre de nouveau la même base
    Alors l'historique Flyway contient toujours une seule exécution de la version 1

  # Source: AC-7, ADR-0001
  Scénario: La migration technique ne crée aucune table métier
    Étant donné que la migration version 1 a été appliquée
    Quand les tables du schéma applicatif sont inventoriées
    Alors seule la table technique d'historique Flyway est présente
```

## Seams de preuve proposés

| Sources                | Seam public                                                | Preuve                                                                                          |
| ---------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `AC-1`, `AC-2`         | PostgreSQL réel via Testcontainers                         | Exécuter le DDL avec chaque rôle et vérifier succès/refus SQL.                                  |
| `AC-3`, `AC-4`, `AC-5` | Démarrage Spring Boot + Flyway sur le conteneur PostgreSQL | Interroger `flyway_schema_history`, puis relancer `Flyway.migrate()` et recompter la version 1. |
| `AC-7`, `ADR-0001`     | Catalogue PostgreSQL du conteneur                          | Inventorier les tables du schéma après migration.                                               |
| `AC-6`                 | Documentation versionnée + test de contrat dépôt           | Vérifier la règle additive et l'interdiction de modifier une migration fusionnée.               |

Le test d'intégration utilise un PostgreSQL 15 éphémère et des identifiants générés pour le test. La configuration locale conserve les secrets hors Git et donne à Spring JDBC le rôle applicatif, tandis que Flyway reçoit le rôle de migration.
