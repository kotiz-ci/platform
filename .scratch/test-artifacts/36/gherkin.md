# Issue #36 — Promotion et vérification finale du lot S1

## Registre des sources

- `AC-1` — une pull request dédiée promeut exclusivement `develop` vers `main`.
- `AC-2` — tous les contrôles obligatoires passent et l'approbation humaine est
  enregistrée avant fusion.
- `AC-3` — la fusion dans `main` publie dans GHCR l'image backend déjà vérifiée,
  sans lui substituer un autre build.
- `AC-4` — l'image est signée avec l'identité OIDC du workflow et sa signature
  est immédiatement vérifiée.
- `AC-5` — le compte rendu d'acceptation conserve le digest, la preuve de
  signature et les liens vers les runs.
- `AC-6` — depuis un clone frais, l'onboarding, le démarrage backend/PostgreSQL
  et les migrations réussissent conformément aux tickets du lot.
- `AC-7` — les statuts BMAD des Stories 1.1, 1.2, 1.3a et 1.4 reflètent les
  preuves réellement obtenues.
- `ADR-0002` — la promotion se fait par merge commit de `develop` vers `main` ;
  en gouvernance solo, une auto-revue humaine documentée remplace temporairement
  le seuil d'approbation GitHub, qui reste à zéro.

## Scénarios

```gherkin
# Source: AC-1, ADR-0002
Scénario: Soumettre exclusivement le lot intégré pour promotion
  Étant donné que les tickets du lot S1 sont fusionnés dans develop
  Quand la promotion S1 est soumise
  Alors la pull request a develop comme branche source
  Et elle a main comme branche cible
  Et son contenu correspond exactement à la différence entre ces deux branches

# Source: AC-2, ADR-0002
Scénario: Autoriser la fusion du lot validé en gouvernance solo
  Étant donné une pull request de promotion de develop vers main
  Quand tous les contrôles obligatoires ont réussi
  Et qu'une auto-revue humaine est enregistrée sur la pull request
  Alors la promotion peut être fusionnée par merge commit

# Source: AC-2, ADR-0002
Scénario: Bloquer la promotion lorsque son acceptation est incomplète
  Étant donné une pull request de promotion de develop vers main
  Quand au moins un contrôle obligatoire n'a pas réussi
  Ou que l'auto-revue humaine n'est pas enregistrée
  Alors la promotion n'est pas fusionnée

# Source: AC-3
Scénario: Publier après fusion l'image exacte vérifiée avant fusion
  Étant donné que le contrôle de la pull request a produit et vérifié une image backend identifiée par son digest
  Quand la pull request est fusionnée dans main
  Alors cette image exacte est publiée dans GHCR par son digest
  Et aucun nouveau build ne lui est substitué

# Source: AC-4
Scénario: Signer et vérifier l'image publiée avec l'identité du workflow
  Étant donné que l'image backend est publiée dans GHCR par son digest
  Quand le workflow de promotion utilise son identité OIDC
  Alors il signe la référence immuable de l'image
  Et il vérifie immédiatement cette signature avec l'identité attendue

# Source: AC-5
Scénario: Conserver les preuves reproductibles de l'acceptation
  Étant donné que la promotion, la publication et la vérification de signature ont réussi
  Quand le compte rendu d'acceptation est finalisé
  Alors il contient le digest immuable de l'image
  Et la preuve de vérification de signature
  Et les liens vers les runs de contrôle et de publication

# Source: AC-6
Scénario: Reproduire l'acceptation du socle depuis un clone frais
  Étant donné un clone frais du commit candidat à la promotion
  Quand la procédure d'onboarding du lot S1 est exécutée
  Alors les dépendances verrouillées s'installent
  Et le backend et PostgreSQL démarrent dans un état sain
  Et la migration technique est appliquée une seule fois avec les privilèges attendus

# Source: AC-7
Scénario: Synchroniser le suivi BMAD sur les seules preuves obtenues
  Étant donné les preuves finales des Stories 1.1, 1.2, 1.3a et 1.4
  Quand le suivi BMAD est synchronisé
  Alors chaque statut correspond au niveau réellement démontré
  Et aucune capacité exclue du lot S1 n'est déclarée livrée
```

## Seams de preuve proposés

| Scénario                            | Seam public le moins coûteux                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| PR `develop` vers `main` uniquement | Test de contrat Node du workflow et inspection live de la PR GitHub                                               |
| Fusion conditionnée                 | Ruleset live, checks GitHub et auto-revue humaine enregistrée                                                     |
| Même image avant/après fusion       | Artifact OCI produit par la CI de PR, digest attesté, puis publication de cet artifact sans rebuild               |
| Signature OIDC                      | Workflow GitHub avec Cosign keyless, puis `cosign verify` sur la référence par digest                             |
| Conservation des preuves            | Compte rendu d'acceptation versionné et résumé/artifacts des runs GitHub                                          |
| Clone frais et migrations           | Job d'acceptation de promotion sur checkout frais exécutant l'installation verrouillée et `pnpm verify:local-dev` |
| Statuts BMAD                        | Inspection des quatre fiches Story et de `sprint-status.yaml`, comparée au compte rendu final                     |
