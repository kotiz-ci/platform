# `apps/mobile` — KOTIZ Mobile (RN/Expo)

App mobile KOTIZ pour les personas **Fatou** (cliente) et **Moussa** (agent).
**1 codebase, 2 binaires distincts** via variants Expo. Stack : React Native 0.81,
Expo SDK 54 et NativeWind 4. Voir
[ADR-0019](../../docs/adr/0019-use-expo-mobile-variants.md).

## Variants

| Variant  | Bundle ID         | Branding                          | Distribution V1                         |
| -------- | ----------------- | --------------------------------- | --------------------------------------- |
| `client` | `ci.kotiz.client` | "KOTIZ" — palette cream/teal      | Public Play Store + App Store           |
| `agent`  | `ci.kotiz.agent`  | "KOTIZ Agent" — palette navy/gold | Restreinte (TestFlight + Play Internal) |

Le variant est sélectionné via `EXPO_PUBLIC_APP_VARIANT=client|agent` (lu par `app.config.ts` + runtime `src/shared/config/variant.ts`).

## Démarrage

```bash
# Depuis la racine du monorepo
pnpm install                              # 1 seule fois
pnpm --filter=mobile dev:client           # variant cliente (par défaut)
pnpm --filter=mobile dev:agent            # variant agent
```

Sur ton téléphone : installer **Expo Go** (Play Store / App Store), scanner le QR code affiché.

Si réseau wifi capricieux : ajouter `--tunnel` à la commande.

## Builds

| Cible                          | Commande                                       | Sortie                                   |
| ------------------------------ | ---------------------------------------------- | ---------------------------------------- |
| Dev local cliente              | `pnpm --filter=mobile dev:client`              | Metro server (Expo Go)                   |
| Dev local agent                | `pnpm --filter=mobile dev:agent`               | Metro server (Expo Go)                   |
| Web export CI cliente          | `pnpm --filter=mobile build:web:client`        | `dist/`                                  |
| Web export CI agent            | `pnpm --filter=mobile build:web:agent`         | `dist/`                                  |
| TypeScript cliente             | `pnpm --filter=mobile type-check:client`       | Vérification stricte, variant `client`   |
| TypeScript agent               | `pnpm --filter=mobile type-check:agent`        | Vérification stricte, variant `agent`    |
| Preview interne cliente        | `pnpm --filter=mobile build:preview:client`    | EAS Build APK + iOS internal             |
| Preview interne agent          | `pnpm --filter=mobile build:preview:agent`     | EAS Build APK + iOS internal             |
| Production cliente (Sprint 2+) | `pnpm --filter=mobile build:production:client` | Store-ready (Play + App Store public)    |
| Production agent (Sprint 2+)   | `pnpm --filter=mobile build:production:agent`  | Store-ready (Play Internal + TestFlight) |

(Compte Expo gratuit requis pour EAS Build — créé Sprint 2 par Desiré.)

## Structure — Feature-Sliced Design

Le code suit Feature-Sliced Design ([ADR-015](../../docs/adr/0015-feature-sliced-design-frontends.md)) :
les couches dépendent seulement vers le bas, `app → pages → widgets → features → entities → shared`,
et chaque slice n'est importée que par son `index.ts`. L'alias `@/*` pointe vers `src/*`.

```
app.config.ts           # Config Expo dynamique (lit EXPO_PUBLIC_APP_VARIANT)
eas.json                # 6 profils EAS (dev/preview/prod × client/agent)
app/                    # Couche App : Expo Router, routes minces et providers globaux
├── _layout.tsx         # Root layout — gate variant ; rend (client) OU (agent)
├── index.tsx           # → @/pages/home
├── health/index.tsx    # → @/pages/health
├── (client)/           # Routes Cliente (Fatou) — visibles UNIQUEMENT si variant=client
└── (agent)/            # Routes Agent (Moussa) — visibles UNIQUEMENT si variant=agent
src/
├── pages/              # home, client-space, agent-space, health — une slice par page
├── widgets/            # blocs composés (créés au premier besoin)
├── features/           # actions utilisateur (créées au premier besoin)
├── entities/           # objets métier (créés au premier besoin)
└── shared/
    ├── config/         # variant de l'app (getAppVariant, rôles attendus)
    └── ui/             # thème issu de @kotiz/design-tokens
assets/
├── client/             # emplacement réservé aux assets cliente — Story 2.6
├── agent/              # emplacement réservé aux assets agent — Story 2.6
└── locales/            # strings i18n iOS/Android (permissions etc.)
```

Une slice n'utilise que les segments utiles parmi `ui`, `api`, `model`, `lib` et
`config` ; aucun dossier vide n'est créé par principe. `pnpm --filter mobile lint`
refuse un import vers une couche supérieure, entre deux slices d'une même couche,
ou au-delà du `index.ts` d'une slice (`eslint-plugin-boundaries`).

## Packages workspace consommés

- `@kotiz/design-tokens` — palette + Tailwind preset (NativeWind)
- `@kotiz/api-types` — types TS générés depuis OpenAPI backend
- `@kotiz/shared-utils` — `formatFcfa`, `normalizePhoneCI`, RBAC, etc.

## Tests

| Niveau                  | Outil                                             | Fichiers                      |
| ----------------------- | ------------------------------------------------- | ----------------------------- |
| Unitaire et composant   | Jest (`jest-expo`) + React Native Testing Library | `test/*.test.ts(x)`           |
| Routes Expo par variant | `expo-router/testing-library`                     | `test/routes.test.tsx`        |
| Frontières FSD          | CLI ESLint sur `test/fixtures/fsd`                | `test/fsd-boundaries.test.ts` |
| E2E                     | Maestro (YAML), quand un parcours existe          | —                             |

`pnpm --filter mobile test` échoue sous 80 % de couverture (lignes, fonctions,
branches) sur `app/` et `src/`.

## Référence

- [ADR-0019 — Expo et variantes Client/Agent](../../docs/adr/0019-use-expo-mobile-variants.md)
- [ADR-015 — Feature-Sliced Design](../../docs/adr/0015-feature-sliced-design-frontends.md)
- Story 1.1 — init monorepo
- Story 1.2 — CI/CD (jobs EAS Build duals Sprint 2+)
- Story 1.6 — onboarding ≤ 1h chronométré
