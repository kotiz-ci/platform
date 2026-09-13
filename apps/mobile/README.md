# `apps/mobile` — KOTIZ Mobile (RN/Expo)

App mobile KOTIZ pour les personas **Fatou** (cliente) et **Moussa** (agent).
**1 codebase, 2 binaires distincts** via variants Expo. Stack : React Native 0.81,
Expo SDK 54 et NativeWind 4. Voir
[ADR-0004](../../docs/adr/0004-use-expo-mobile-variants.md).

## Variants

| Variant  | Bundle ID         | Branding                          | Distribution V1                         |
| -------- | ----------------- | --------------------------------- | --------------------------------------- |
| `client` | `ci.kotiz.client` | "KOTIZ" — palette cream/teal      | Public Play Store + App Store           |
| `agent`  | `ci.kotiz.agent`  | "KOTIZ Agent" — palette navy/gold | Restreinte (TestFlight + Play Internal) |

Le variant est sélectionné via `EXPO_PUBLIC_APP_VARIANT=client|agent` (lu par `app.config.ts` + runtime `lib/variant.ts`).

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

## Structure

```
app.config.ts           # Config Expo dynamique (lit EXPO_PUBLIC_APP_VARIANT)
eas.json                # 6 profils EAS (dev/preview/prod × client/agent)
lib/
└── variant.ts          # getAppVariant() / isAgentApp() — runtime gating
app/
├── _layout.tsx         # Root layout — gate variant ; rend (client) OU (agent)
├── index.tsx           # Accueil — variant-aware (Akwaba Fatou / Connexion agent)
├── health/index.tsx    # Smoke connexion API + types partagés
├── (client)/           # Routes Cliente (Fatou) — visible UNIQUEMENT si variant=client
│   ├── _layout.tsx
│   └── index.tsx
└── (agent)/            # Routes Agent (Moussa) — visible UNIQUEMENT si variant=agent
    ├── _layout.tsx
    └── index.tsx
components/             # Composants partagés (Sprint 2 livrera Epic 2)
assets/
├── client/             # emplacement réservé aux assets cliente — Story 2.6
├── agent/              # emplacement réservé aux assets agent — Story 2.6
└── locales/            # strings i18n iOS/Android (permissions etc.)
```

## Packages workspace consommés

- `@kotiz/design-tokens` — palette + Tailwind preset (NativeWind)
- `@kotiz/api-types` — types TS générés depuis OpenAPI backend
- `@kotiz/shared-utils` — `formatFcfa`, `normalizePhoneCI`, RBAC, etc.

## Tests (à initialiser Sprint 2 — cf. test-design Epic 1 Annexe A)

| Niveau        | Outil                         |
| ------------- | ----------------------------- |
| Unit / hooks  | Jest + ts-jest                |
| Component     | @testing-library/react-native |
| E2E           | Maestro (YAML)                |
| Accessibilité | jest-axe + react-native-a11y  |

DoD : couverture ≥ 80% (cf. sprint-status.yaml `per_story`).

## Référence

- [ADR-0004 — Expo et variantes Client/Agent](../../docs/adr/0004-use-expo-mobile-variants.md)
- Story 1.1 — init monorepo
- Story 1.2 — CI/CD (jobs EAS Build duals Sprint 2+)
- Story 1.6 — onboarding ≤ 1h chronométré
