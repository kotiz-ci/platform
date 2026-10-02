---
name: kotiz-story
description: Cycle ATDD complet d'une story KOTIZ (story, Gherkin + tests rouges, checkpoint humain, implémentation, review). Argument optionnel : identifiant de la story (ex : 1-2).
---

# /kotiz-story — Cycle ATDD complet d'une story KOTIZ

Exécute le cycle de développement complet d'une story backend/mobile KOTIZ, dans l'ordre strict ci-dessous. Argument optionnel : l'identifiant de la story (ex : `1-2`). Sans argument, prendre la prochaine story `ready-for-dev` dans `_bmad-output/implementation-artifacts/sprint-status.yaml`.

## Contexte technique (non négociable)

- Backend : **Java 21 / Spring Boot 4.1.1** (ADR-011 : hexagonal + DDD par bounded context, packages `api / internal`)
- Tests backend : **JUnit 5 + AssertJ** (`src/test/java/...`), `@DisplayName` portant le Gherkin en toutes lettres + S-ids
- Mobile : React Native / Expo, tests Vitest/Jest `*.spec.ts`
- Coverage ≥ 80% (décision 28 avril)

## Déroulé (6 étapes)

1. **Story** — Si la story n'a pas de fichier dans `_bmad-output/implementation-artifacts/`, invoquer le skill `bmad-create-story`. Sinon lire le fichier existant et vérifier que les ACs sont en Gherkin numéroté.

2. **Phase red (ATDD)** — Invoquer `bmad-testarch-atdd` pour produire :
   - `_bmad-output/test-artifacts/<story>/gherkin.md` : glossaire métier + table de couverture 4 catégories (Nominal / Erreur / Limite / Autorisation, N/A justifiés) + scénarios S1..Sn tagués `@niveau=unit|integration` et `@nominal|@erreur|@limite`
   - Les tests ROUGES correspondants (JUnit backend / spec.ts mobile), chaque test référençant son S-id
   - Aucune ligne d'implémentation à cette étape.

3. **CHECKPOINT HUMAIN (bloquant)** — Présenter à Henoch le gherkin.md + la liste des tests rouges. **STOP : attendre sa validation explicite avant toute implémentation.** S'il amende les scénarios, mettre à jour gherkin.md + tests puis re-présenter.

4. **Implémentation** — Invoquer `bmad-dev-story` : coder jusqu'au vert en respectant l'hexagonal (domaine pur sans framework, use cases via ports, fakes/mocks sur les ports de sortie ; adapters réels seulement si la story le demande). Dépendances externes non contractualisées (Mobile Money, USSD, KYC) → toujours un adapter fake d'abord.

5. **Review** — Invoquer `bmad-code-review` (contexte frais). La review DOIT couvrir explicitement, en plus des bugs :
   - **Respect de la structure des dossiers** : chaque bounded context en `api / internal`, pas de classe hors de sa couche
   - **Respect de l'hexagonal** : aucun import de framework (Spring, JPA) dans `domain/` ; les use cases ne dépendent que des ports ; adapters derrière les ports de sortie
   - **Traçabilité ATDD** : chaque AC de la story a ses scénarios dans gherkin.md et chaque S-id a son test vert
   - Vérifier que les suites ArchUnit / Spring Modulith passent (dès qu'elles existent — cf. story 1.2)
   Corriger les findings, puis passer la story en `done` dans `sprint-status.yaml`.

6. **Fin d'epic seulement** — Quand la dernière story d'un epic passe en done : invoquer `bmad-testarch-trace` (matrice AC → test + quality gate) puis proposer la retrospective.

## Règles transverses

- Jamais d'implémentation avant le checkpoint humain de l'étape 3.
- Comportement découvert non couvert par un AC → ne pas l'implémenter en douce : le remonter pour amender la story.
- Travail différé → tracer dans `_bmad-output/implementation-artifacts/deferred-work.md` avec identifiant.
- Fin de session importante → note dans `_sessions/[date]-[sujet].md`.
