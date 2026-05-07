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

| Type | Quand |
|---|---|
| `feat` | Nouvelle fonctionnalité utilisateur ou métier |
| `fix` | Correction de bug |
| `docs` | Documentation (README, ADR, glossaire, runbooks) |
| `chore` | Tâche maintenance (deps, config) sans impact métier |
| `refactor` | Refonte sans changement comportemental |
| `test` | Ajout / modification de tests |
| `perf` | Amélioration performance |
| `ci` | Pipeline CI/CD |
| `build` | Build system, packaging |
| `revert` | Revert d'un commit antérieur |

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

1. Branche feature : `feat/<scope>-<résumé-kebab>` ou `fix/...` ou `chore/...`
2. Commits signés GPG, Conventional Commits FR
3. Push, ouvrir PR draft : `gh pr create --draft`
4. Attendre CI verte (≤ 5 min — cf. Story 1.2 DoD)
5. CODEOWNERS auto-assigné review (cf. `.github/CODEOWNERS`)
6. ≥ 1 approve obligatoire (Sprint 1) — ≥ 2 quand l'équipe sera complète (Sprint 2+)
7. Marquer ready : `gh pr ready`
8. Merge squash : `gh pr merge --squash`

## Branche `main` protégée

- Force-push : interdit
- Direct push : interdit (PR uniquement)
- Reviews : ≥ 1 approve
- CI verte : obligatoire
- Commits signés : obligatoire
- Branch up-to-date : obligatoire avant merge

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
