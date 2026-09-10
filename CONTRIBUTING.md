# Contribuer à KOTIZ

> Guide concis. Pour le contexte métier et l'onboarding détaillé : voir [README.md](README.md) + [docs/onboarding.md](docs/onboarding.md) (Story 1.6).

## Conventions de commits — Conventional Commits FR

Tous les commits suivent ce format **en français** :

```
<type>(<scope>): <résumé court — impératif minuscule>

<corps optionnel — quoi/pourquoi, pas comment>

<footer optionnel — refs : KOTIZ-XX, Closes #N>
```

### Types acceptés

| Type       | Quand                                               |
| ---------- | --------------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité utilisateur ou métier       |
| `fix`      | Correction de bug                                   |
| `docs`     | Documentation (README, ADR, glossaire, runbooks)    |
| `chore`    | Tâche maintenance (deps, config) sans impact métier |
| `refactor` | Refonte sans changement comportemental              |
| `test`     | Ajout / modification de tests                       |
| `perf`     | Amélioration performance                            |
| `ci`       | Pipeline CI/CD                                      |
| `build`    | Build system, packaging                             |
| `revert`   | Revert d'un commit antérieur                        |

### Scopes courants

`mobile`, `backend`, `admin`, `tokens`, `api-types`, `utils`, `infra`, `ci`, `db`, `auth`, `kyc`, `wallet`, `savings`, `agents`, `health`, `scoring`, `notifications`, `wa`, `ussd`, `admin-console`, `adr`.

### Exemples

```
feat(mobile): écran accueil avec score 5⭐ et streak
fix(backend): plafond Tier 1 corrigé à 200 000 FCFA (cf. NFR-COMP-01)
docs(adr): ADR-009 — mobile RN/Expo
chore(infra): pin Postgres 15.8-alpine
ci(workflows): ajout job gitleaks bloquant
```

## Signature GPG obligatoire (Plan Sécurité §A08)

**Tous les commits doivent être signés GPG.** Branche `main` rejette les commits non signés.

Procédure : voir [docs/onboarding.md §GPG](docs/onboarding.md) (Story 1.6 AC5).

```bash
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

❌ **Interdit :** `git commit --no-gpg-sign`. Aucune exception.

## Pull Request flow

1. Partir de `develop` et créer une branche courte : `feat/<scope>-<résumé-kebab>`,
   `fix/...` ou `chore/...`.
2. Produire des commits signés GPG qui respectent Conventional Commits FR.
3. Pousser la branche et ouvrir une draft PR vers `develop` :
   `gh pr create --draft --base develop`.
4. Attendre la CI verte (≤ 5 min — cf. Story 1.2 DoD).
5. Obtenir au moins une approbation humaine, puis marquer la PR prête :
   `gh pr ready`.
6. Squasher la branche de ticket dans `develop` : `gh pr merge --squash`.
7. Pour promouvoir un lot, ouvrir une PR dédiée de `develop` vers `main`, obtenir
   une approbation humaine et conserver un merge commit : `gh pr merge --merge`.

Les branches permanentes `release/*` et `hotfix/*` ne font pas partie du flux MVP.
Un correctif urgent reste une branche courte issue de `develop`, puis suit la même
promotion contrôlée vers `main`.

## Branches `develop` et `main` protégées

- Force-push et suppression : interdits.
- Push direct : interdit, y compris pour les administrateurs (PR uniquement).
- Reviews : ≥ 1 approbation humaine.
- CI verte et branche à jour : obligatoires dès que les contrôles de la Story 1.2
  sont disponibles.
- Commits signés : obligatoires.

Vérifier la configuration réellement appliquée sur GitHub :

```bash
pnpm verify:github-flow
```

Le contrôle doit être vert avant de considérer le flux de livraison opérationnel.

## Style de code

- **TypeScript / TSX** (mobile + admin-web + packages) : ESLint strict + Prettier 2 spaces, 100 cols max, `tsconfig` strict mode
- **Java** (backend) : Google Java Style + Lombok + records, 100 cols max
- **Markdown** : `markdownlint-cli2` (cf. CI Story 1.2)

Format on save activé via `.editorconfig` + extensions IDE (cf. Story 1.6 AC12).

## Runners CI = USA (Phase 1)

⚠️ Les runners GitHub Actions hostés sont aux USA. **Pas de PII en CI.** Migration vers self-hosted UEMOA en Story 1.3b (cf. ADR-005).

## Référence

- Plan Sécurité v2 §A08 : signature releases / GPG
- Plan DevOps v2 §3 : pipeline CI/CD
- ADR-008 : monorepo Turborepo
- ADR-009 : mobile RN/Expo
