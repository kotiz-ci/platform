# Issue tracker: GitHub

Les issues et spécifications de ce dépôt vivent dans GitHub Issues.
Utiliser le CLI `gh` depuis le dépôt `kotiz-ci/platform`.

## Conventions

- Créer : `gh issue create --title "..." --body "..."`
- Lire : `gh issue view <number> --comments`
- Lister : `gh issue list --state open --json number,title,body,labels,comments`
- Commenter : `gh issue comment <number> --body "..."`
- Ajouter un label : `gh issue edit <number> --add-label "..."`
- Retirer un label : `gh issue edit <number> --remove-label "..."`
- Fermer : `gh issue close <number> --comment "..."`

Le dépôt est déduit automatiquement depuis le remote Git.

## Pull requests comme surface de triage

**PRs as a request surface: no.**

## Publication et lecture

Quand un skill demande de publier dans l’issue tracker, créer une GitHub Issue.

Quand un skill demande de récupérer un ticket, utiliser :

`gh issue view <number> --comments`

## Wayfinding

Utilisé par `/wayfinder`. La **map** est une issue unique, les **tickets** sont ses issues enfants.

- **Map** : une issue avec le label `wayfinder:map`, contenant les sections Notes /
  Decisions-so-far / Fog. `gh issue create --label wayfinder:map`.
- **Ticket enfant** : lié à la map comme sous-issue GitHub (`gh api` sur l’endpoint
  sub-issues). Sans sous-issues, ajouter l’enfant à une task list dans la map et
  mettre `Part of #<map>` en tête du corps de l’enfant. Labels :
  `wayfinder:<type>` (`research` / `prototype` / `grilling` / `task`). Une fois
  réclamé, le ticket est assigné au dev qui le pilote.
- **Blocage** : dépendances natives GitHub (représentation canonique, visible dans l’UI).
  `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`,
  où `<blocker-db-id>` est l’**id base de données** du bloqueur
  (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _pas_ le `#number` ni le `node_id`).
  `issue_dependencies_summary.blocked_by` compte les bloqueurs encore ouverts.
  À défaut, ligne `Blocked by: #<n>, #<n>` en tête du corps. Un ticket est
  débloqué quand tous ses bloqueurs sont fermés.
- **Frontière** : lister les enfants ouverts de la map, écarter ceux qui ont un
  bloqueur ouvert ou un assigné ; le premier dans l’ordre de la map gagne.
- **Réclamer** : `gh issue edit <n> --add-assignee @me`, première écriture de la session.
- **Résoudre** : `gh issue comment <n> --body "<réponse>"`, puis `gh issue close <n>`,
  puis ajouter un pointeur (résumé + lien) dans Decisions-so-far de la map.
