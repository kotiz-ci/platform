## Agent skills

### Issue tracker

Les demandes et tickets sont suivis dans GitHub Issues pour `kotiz-ci/platform`. Voir `docs/agents/issue-tracker.md`.

### Triage labels

Le dépôt utilise les cinq labels canoniques de triage. Voir `docs/agents/triage-labels.md`.

### Domain docs

Le monorepo utilise une documentation multi-context avec un `CONTEXT-MAP.md` racine. Voir `docs/agents/domain.md`.

## Documentation du projet

La documentation produit, design et architecture (PRD, re-scope, règles métier, glossaire DDD, HLD, specs UX) est dans `docs/product/`, `docs/design/` et `docs/architecture/`. La carte et les règles de priorité sont dans `docs/README.md`.

## Architecture du code (obligatoire pour `/implement` et tout agent)

- Backend : un module Spring Modulith `ci.kotiz.<contexte>` par contexte actif de `CONTEXT-MAP.md`. Les autres modules n'utilisent que son package `api` (`@NamedInterface("api")`) ; l'implémentation reste sous `internal/{domain,application,persistence,web}`. Ne jamais importer `autreModule.internal`, ne jamais créer de module pour un contexte différé ou retiré, ne créer ni port, ni mapper, ni segment sans comportement qui l'exige. Voir `docs/adr/0011-hexagonal-ddd.md` §6.
- Frontends : Feature-Sliced Design, `app → pages → widgets → features → entities → shared`. Importer une slice uniquement par son `index.ts`, jamais une couche supérieure ni une slice voisine. Routes du framework minces. Voir `docs/adr/0015-feature-sliced-design-frontends.md`.
- Avant le premier test, convenir des seams publiques : API du module, endpoint HTTP, événement public, comportement visible d'une feature, persistance réelle quand PostgreSQL fait partie du comportement.
- Garder verts `ModularityTest` (backend) et `pnpm --filter mobile lint` (frontières FSD).
