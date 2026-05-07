# @kotiz/design-tokens

Source de vérité unique des design tokens KOTIZ. Consommé par :
- **`apps/mobile`** (React Native + Expo + NativeWind)
- **`apps/admin-web`** (Next.js + Tailwind)

## Contenu (Palette v2 — 17 couleurs)

13 couleurs v2 + 4 ajouts WCAG AA (Story 1.1 AC7, ADR-009, UX Spec §3.5).

| Token | Hex | Usage |
|---|---|---|
| `navy` | #0A2540 | Brand primary |
| `teal` | #00A896 | Brand secondary |
| `teal-deep` | #007A6E | **Action primaire** (boutons, links) — WCAG AA |
| `teal-50` | #E6F4F2 | Background informatif |
| `teal-100` | #B3DDD8 | Hover / active |
| `gold` | #D4A017 | Score étoiles, badges |
| `gold-dark` | #B8860B | Texte argent — WCAG AA |
| `gold-50` | #FBF4E0 | Background premium |
| `cream` | #FAF7F2 | App background |
| `surface` | #FFFFFF | Cards / modals |
| `ink-900` | #0E1B1A | Texte principal |
| `ink-700` | #3D4F4D | Texte secondaire |
| `ink-500` | #6B7B79 | Helper / placeholder |
| `ink-300` | #B5C0BE | Disabled / borders |
| `success` | #10B981 | États positifs |
| `info` | #3B82F6 | Notifications neutres |
| `danger` | #DC2626 | Erreurs |

Plus : 5 polices Inter (400/500/600/700/800), 5 radius (sm/md/lg/xl/full), 7 spacings (xs → 3xl).

## Build

```bash
pnpm --filter @kotiz/design-tokens build
```

Génère :
- `dist/tokens.json` — source brute (consommable n'importe où)
- `dist/tokens.ts` + `dist/tokens.d.ts` — TypeScript typed
- `dist/tokens.mjs` / `dist/tokens.js` — ESM / CJS runtime
- `dist/tokens.css` — variables CSS (admin-web Next.js)
- `dist/tailwind-preset.js` — preset Tailwind partagé NativeWind + admin-web

## Verify (smoke test)

```bash
pnpm --filter @kotiz/design-tokens test
```

Vérifie ≥ 17 couleurs et présence des tokens critiques.

## Consommation mobile (RN/Expo + NativeWind)

```ts
// apps/mobile/tailwind.config.js
const preset = require("@kotiz/design-tokens/tailwind");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset"), preset],
};
```

```tsx
import { colors } from "@kotiz/design-tokens";
<View style={{ backgroundColor: colors["teal-deep"] }} />
```

## Consommation admin-web (Next.js + Tailwind)

```ts
// apps/admin-web/tailwind.config.ts
import preset from "@kotiz/design-tokens/tailwind";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [preset],
};
```

Ou import direct des variables CSS :

```css
/* apps/admin-web/app/globals.css */
@import "@kotiz/design-tokens/css";
```

## Règles d'usage (UX Spec)

- ❌ Ne JAMAIS utiliser `teal` pour du texte/bouton (contrast 2,9:1 — WCAG AA fail). Utiliser `teal-deep`.
- ❌ Ne JAMAIS embarquer Calibri (Microsoft, non native iOS/Android). Toujours Inter.
- ✅ Max **2 couleurs de marque par écran** (cf. UX Spec §1.4 — référence Djamo/Wave/Revolut).
- ✅ Toujours vérifier le contrast ratio WCAG AA (≥ 4,5:1) avant d'introduire une nouvelle couleur.

## Versions

| Version | Date | Changement |
|---|---|---|
| 0.1.0 | 2026-05-07 | Init Story 1.1 — 17 tokens couleurs + Inter + radius + spacing |

## Référence

- UX Spec §3.5 — palette v2
- ADR-009 — mobile RN/Expo (consommation native via NativeWind)
- Story 1.1 AC7 — DoD design-tokens
