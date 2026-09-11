# Contribuer à KOTIZ

> Guide concis. Pour le contexte métier et l'onboarding actuel : voir
> [README.md](README.md). Le guide détaillé par persona sera livré en Story 1.6.

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

Procédure de génération et d'ajout sur GitHub :
[Generating a new GPG key](https://docs.github.com/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).

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
5. Effectuer l'auto-revue avec la checklist de PR, puis marquer la PR prête :
   `gh pr ready`. Dès qu'un second mainteneur est actif, obtenir également son
   approbation.
6. Squasher la branche de ticket dans `develop` : `gh pr merge --squash`.
7. Pour promouvoir un lot, ouvrir une PR dédiée de `develop` vers `main`, obtenir
   une approbation humaine et conserver un merge commit : `gh pr merge --merge`.

Pour fermer automatiquement le ticket après fusion dans `develop`, ajouter un mot
clé de fermeture dans le corps de la PR :

```markdown
Closes #30
```

Le workflow `close-linked-issues-on-develop.yml` accepte également `Fixes #30` et
`Resolves #30`, y compris plusieurs tickets dans une même PR. Utiliser `Refs #30`
quand la PR ne doit pas fermer le ticket.

Les branches permanentes `release/*` et `hotfix/*` ne font pas partie du flux MVP.
Un correctif urgent reste une branche courte issue de `develop`, puis suit la même
promotion contrôlée vers `main`.

## Branches `develop` et `main` protégées

- Force-push et suppression : interdits.
- Push direct : interdit, y compris pour les administrateurs (PR uniquement).
- Reviews : aucune approbation externe en mode solo, car GitHub interdit à l'auteur
  d'approuver sa propre PR. Le seuil repasse à ≥ 1 dès qu'un second mainteneur est
  actif.
- CI verte et branche à jour : obligatoires dès que les contrôles de la Story 1.2
  sont disponibles.
- Commits signés : obligatoires.

Vérifier la configuration réellement appliquée sur GitHub :

```bash
pnpm verify:github-flow
```

Le contrôle doit être vert avant de considérer le flux de livraison opérationnel.

### Mode solo temporaire

Henoch est actuellement l'unique mainteneur. Les rulesets conservent la PR
obligatoire et tous les autres contrôles, mais fixent temporairement le nombre
d'approbations à zéro. L'auteur doit relire le diff, compléter la checklist et
vérifier les tests avant de fusionner. Ajouter un second mainteneur impose de
remettre `required_approving_review_count` à `1` dans les deux rulesets et sur
GitHub.

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
