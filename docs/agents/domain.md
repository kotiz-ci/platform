# Domain Docs

KOTIZ utilise une documentation multi-context.

## Avant d’explorer

1. Lire `CONTEXT-MAP.md` à la racine s’il existe.
2. Lire le `CONTEXT.md` du contexte concerné.
3. Lire les ADR système dans `docs/adr/`.
4. Lire les ADR propres au contexte dans son dossier `docs/adr/`.

Si un fichier n’existe pas encore, poursuivre silencieusement. Les documents de
contexte sont créés progressivement lorsque les termes et décisions sont stabilisés.

## Contextes prévus

- `apps/backend/CONTEXT.md` — métier, API et persistance.
- `apps/mobile/CONTEXT.md` — applications cliente et agent.
- `apps/admin-web/CONTEXT.md` — console d’administration.
- `packages/api-types/CONTEXT.md` — contrats partagés.
- `packages/design-tokens/CONTEXT.md` — tokens et règles visuelles.
- `packages/shared-utils/CONTEXT.md` — utilitaires partagés.

Les décisions transversales appartiennent à `docs/adr/`. Les décisions propres à
un contexte appartiennent à `<contexte>/docs/adr/`.

## Vocabulaire

Utiliser les termes définis dans les fichiers `CONTEXT.md`. Ne pas introduire de
synonymes lorsqu’un terme canonique existe.

Si un concept manque, le signaler pour traitement par le skill `domain-modeling`.

## Conflits avec les ADR

Toute proposition contredisant un ADR existant doit identifier explicitement
l’ADR concerné et justifier sa réouverture.
