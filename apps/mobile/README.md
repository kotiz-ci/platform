# `apps/mobile` — KOTIZ Mobile (RN/Expo)

App mobile KOTIZ pour les personas **Fatou** (cliente) et **Moussa** (agent), dans un seul codebase via Expo Router groups (`(client)` / `(agent)`). Stack : React Native 0.81 + Expo SDK 54 (cf. ADR-009).

## Démarrage

```bash
# Depuis la racine du monorepo
pnpm install                 # 1 seule fois
pnpm dev --filter=mobile     # démarre Metro bundler
```

Sur ton téléphone : installer **Expo Go** (Play Store / App Store), scanner le QR code affiché.

Si réseau wifi capricieux : `pnpm dev --filter=mobile -- --tunnel` (utilise un proxy ngrok-like).

## Builds

| Profile | Commande | Sortie |
|---|---|---|
| Dev (rapide, pour Metro local) | `pnpm dev --filter=mobile` | Metro server |
| Web export (CI smoke) | `pnpm build --filter=mobile` | `dist/` |
| Preview interne (APK installable) | `pnpm dlx eas build --profile=preview --platform=android` | EAS Build cloud |
| Production iOS / Android | `pnpm dlx eas build --profile=production --platform=all` | App Store / Play Store |

(Compte Expo gratuit requis pour EAS Build — Sprint 2.)

## Structure

```
app/
├── _layout.tsx         # Root layout (fonts, SafeArea, GestureHandler, NativeWind)
├── index.tsx           # Accueil (choix Cliente / Agent)
├── health/index.tsx    # Smoke connexion API + types partagés
├── (client)/           # Group routes Cliente (Fatou)
│   ├── _layout.tsx
│   └── index.tsx
└── (agent)/            # Group routes Agent (Moussa)
    ├── _layout.tsx
    └── index.tsx
components/             # Composants partagés (Sprint 2 livrera les 15+ composants Epic 2)
assets/                 # icon, splash, fonts locaux si besoin
```

## Packages workspace consommés

- `@kotiz/design-tokens` — palette + Tailwind preset (NativeWind)
- `@kotiz/api-types` — types TS générés depuis OpenAPI backend
- `@kotiz/shared-utils` — `formatFcfa`, `normalizePhoneCI`, RBAC, etc.

## Tests (à initialiser Sprint 2 — cf. test-design Epic 1 Annexe A)

| Niveau | Outil |
|---|---|
| Unit / hooks | Jest + ts-jest |
| Component | @testing-library/react-native |
| E2E | Maestro (YAML) |
| Accessibilité | jest-axe + react-native-a11y |

DoD : couverture ≥ 80% (cf. sprint-status.yaml `per_story`).

## Référence

- ADR-009 — choix RN/Expo over Flutter (`05_Architecture/KOTIZ_ADR_009_Mobile_RN_Expo.md`)
- POC d'inspiration : `08_Code/poc-pitch-omis/` (pitch OMIS Finances 1er mai 2026)
- Story 1.1 — init monorepo
- Story 1.6 — onboarding ≤ 1h chronométré
