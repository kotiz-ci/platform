# Issue #33 — Construire et scanner l’image OCI du backend

## Registre des sources

- `AC-1` — L’image utilise un runtime Java 21 minimal et non privilégié.
- `AC-2` — La construction est multi-stage et l’image finale ne contient ni outils de build ni secrets.
- `AC-3` — La CI produit et expose le digest immuable de l’image.
- `AC-4` — Le scan de l’image bloque les vulnérabilités critiques non dérogées.
- `AC-5` — Le health check de l’image est vérifié avant qu’elle soit candidate à la promotion.
- `AC-6` — Une pull request ordinaire ne publie aucun tag de release ou `latest`.
- `SCOPE-1` — À entrées identiques, la construction produit une image OCI reproductible.
- `ADR-0002` — Les opérations de release, tag et signature ne démarrent qu’après fusion dans `main`.
- `ADR-0003` — S1 utilise Eclipse Temurin Java 21 LTS et verrouille les versions correctives dans les manifests.

## Scénarios

```gherkin
Fonctionnalité: Produire une image OCI backend candidate à la promotion

  # Source: AC-1, AC-2, ADR-0003
  Scénario: Construire une image runtime Java minimale et non privilégiée
    Étant donné le code du backend KOTIZ
    Quand l’image OCI du backend est construite
    Alors l’étape finale utilise le runtime Java 21 verrouillé
    Et le processus applicatif s’exécute avec un utilisateur non privilégié
    Et l’image finale ne contient ni JDK, ni Maven Wrapper, ni cache Maven, ni secret de construction

  # Source: AC-3, AC-5, SCOPE-1
  Scénario: Prouver puis exposer l’identité immuable de l’image construite par la CI
    Étant donné une pull request vers develop ou main
    Quand la CI construit deux fois le même commit avec les mêmes entrées verrouillées
    Alors les deux manifests OCI ont le même digest sha256
    Et la CI expose ce digest dans le résumé du run seulement après le scan et le health check

  # Source: AC-4
  Scénario: Refuser une image qui contient une vulnérabilité critique non dérogée
    Étant donné l’image OCI construite par la CI
    Quand le scan de vulnérabilités de l’image détecte une vulnérabilité critique sans dérogation documentée
    Alors le contrôle OCI échoue

  # Source: AC-5
  Scénario: Vérifier la santé avant de déclarer l’image candidate
    Étant donné l’image OCI construite et scannée
    Quand la CI démarre un conteneur à partir de cette image
    Alors le endpoint /actuator/health répond avec le statut UP
    Et la CI ne déclare l’image candidate qu’après cette vérification

  # Source: AC-6, ADR-0002
  Scénario: Ne pas publier de release depuis une pull request ordinaire
    Étant donné une pull request vers develop ou main
    Quand la CI construit et vérifie l’image OCI du backend
    Alors elle ne pousse aucune image vers un registre
    Et elle ne crée aucun tag latest ou de release
```

## Mapping vers les seams de test proposés

| Scénario                          | Seam public                                | Preuve attendue                                                                                                                                                |
| --------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime minimal et non privilégié | Test de contrat dépôt + intégration Docker | Vérifier le Dockerfile multi-stage et verrouillé, puis inspecter/exécuter l’image réelle pour prouver l’utilisateur, Java 21 et l’absence des outils de build. |
| Digest reproductible exposé       | Test de contrat + intégration Docker       | Vérifier deux builds normalisés au même digest OCI, puis son exposition seulement après le scan et le health check.                                            |
| Vulnérabilité critique refusée    | Test de contrat du workflow CI             | Vérifier un scan Trivy de type `image`, bloquant sur `CRITICAL` avec `.trivyignore.yaml`.                                                                      |
| Health avant candidature          | Test de contrat + intégration Docker       | Vérifier l’ordre du workflow, puis démarrer l’image réelle et attendre `/actuator/health` avant le succès du job OCI.                                          |
| Aucun tag de release en PR        | Test de contrat du workflow CI             | Vérifier l’absence de login/push et de tags `latest` ou release dans le workflow `pull_request`.                                                               |

Le test d’intégration Docker est activable localement et exécuté par le job OCI de la CI. Les tests de contrat restent exécutables sans daemon Docker afin de fournir un RED déterministe sur la structure attendue.
