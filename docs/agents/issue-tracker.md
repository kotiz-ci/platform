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

- Une map est une issue portant le label `wayfinder:map`.
- Ses tickets enfants utilisent `wayfinder:research`, `wayfinder:prototype`,
  `wayfinder:grilling` ou `wayfinder:task`.
- Utiliser les sous-issues et dépendances natives GitHub lorsqu’elles sont disponibles.
- À défaut, inscrire `Part of #<map>` et `Blocked by: #<number>` dans le corps.
- Réclamer un ticket avec `gh issue edit <number> --add-assignee @me`.
- Résoudre en commentant la réponse, puis en fermant le ticket.
