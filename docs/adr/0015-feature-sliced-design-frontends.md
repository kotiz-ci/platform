# Organiser les frontends selon Feature-Sliced Design

Les frontends KOTIZ (`apps/mobile` et `apps/admin-web`) suivent Feature-Sliced
Design (FSD). Les dossiers techniques globaux (`components`, `lib`) laissaient
chaque parcours dépendre de tout le reste ; FSD range le code par responsabilité
et rend les dépendances vérifiables, pour que plusieurs parcours, personas et
variantes avancent sans couplage transversal. Décision issue du
[Sprint Change Proposal du 11 septembre 2026](../product/sprint-change-proposal-2026-09-11.md),
approuvé le 21 octobre 2026.

## Règles

- Les couches dépendent seulement vers le bas :
  `app → pages → widgets → features → entities → shared`.
- Chaque slice (`src/<couche>/<slice>`) expose un `index.ts` ; un autre élément
  n'importe que cet `index.ts`. Deux slices d'une même couche ne s'importent pas.
- `shared` n'a pas de slices mais des segments (`ui`, `api`, `lib`, `config`) ;
  chaque segment expose aussi un `index.ts`.
- Une slice n'utilise que les segments utiles parmi `ui`, `api`, `model`, `lib`
  et `config`. Aucun dossier vide n'est créé par principe.
- L'alias `@/*` pointe vers `src/*`.
- Les routes du framework restent minces : elles réexportent ou composent une
  page FSD.

## Mobile Expo

`app/` reste le dossier Expo Router et tient la couche App (routes et providers
globaux) ; les autres couches vivent sous `src/`. Les groupes `(client)` et
`(agent)` de l'ADR-0019 sont conservés. Les règles sont vérifiées par
`eslint-plugin-boundaries` dans `pnpm --filter mobile lint`, et le test
`test/fsd-boundaries.test.mjs` prouve qu'une violation est détectée.

## Admin Next.js

`app/` reste le dossier App Router. Comme Next.js réserve `pages`, les couches
App et Pages s'appellent `src/_app` et `src/_pages` ; les fichiers
`app/**/page.tsx` réexportent une page de `src/_pages`. Les routes serveur
Next.js ne remplacent pas le backend Spring métier. Cette structure et son lint
sont mis en place quand Next.js est réellement initialisé.

## Conséquences

- Un composant partagé par plusieurs parcours va dans `shared/ui` s'il ne connaît
  pas le métier, sinon dans l'`entity` ou la `feature` concernée.
- Les routes React Native sont couvertes par Jest (`jest-expo`) et React Native
  Testing Library, au même seuil de 80 % que le reste du dépôt.
