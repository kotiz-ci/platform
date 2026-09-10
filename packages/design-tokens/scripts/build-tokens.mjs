#!/usr/bin/env node
// Build script — KOTIZ design tokens
// Génère :
//  - dist/tokens.json    (source brute déclarative)
//  - dist/tokens.ts      (types + objets pour mobile RN/NativeWind + admin-web Tailwind)
//  - dist/tokens.mjs     (ESM)
//  - dist/tokens.js      (CJS)
//  - dist/tokens.d.ts    (types)
//  - dist/tokens.css     (variables CSS pour admin-web)
//  - dist/tailwind-preset.js  (preset partagé Tailwind / NativeWind)
//
// Pas de dépendance externe (Style Dictionary sera ajouté Sprint 2 si besoin).

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "tokens.json");
const DIST = resolve(ROOT, "dist");

const validators = {
  color: (value) => typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value),
  "font-family": (value) =>
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.length > 0),
  radius: (value) => typeof value === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?px$/.test(value),
  spacing: (value) => typeof value === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?px$/.test(value),
};

function validateTokens(tokens) {
  for (const [groupName, validateValue] of Object.entries(validators)) {
    const group = tokens[groupName];
    if (!group || typeof group !== "object" || Array.isArray(group)) {
      throw new Error(`[tokens] Groupe requis manquant ou invalide : ${groupName}`);
    }

    for (const [tokenName, token] of Object.entries(group)) {
      if (tokenName.startsWith("$")) continue;
      if (!token || typeof token !== "object" || Array.isArray(token) || !("$value" in token)) {
        throw new Error(`[tokens] Valeur requise manquante : ${groupName}.${tokenName}.$value`);
      }
      if (!validateValue(token.$value)) {
        throw new Error(
          `[tokens] Valeur invalide pour ${groupName}.${tokenName} : ${JSON.stringify(token.$value)}`
        );
      }
    }
  }
}

const tokens = JSON.parse(readFileSync(SRC, "utf8"));
validateTokens(tokens);

if (existsSync(DIST)) {
  rmSync(DIST, { recursive: true, force: true });
}
mkdirSync(DIST, { recursive: true });

// ---------- 1. Flatten color tokens for runtime consumption ----------

const colors = {};
for (const [key, value] of Object.entries(tokens.color)) {
  if (key.startsWith("$")) continue;
  colors[key] = value.$value;
}

const fontFamily = {};
for (const [key, value] of Object.entries(tokens["font-family"])) {
  if (key.startsWith("$")) continue;
  fontFamily[key] = value.$value;
}

const radius = {};
for (const [key, value] of Object.entries(tokens.radius)) {
  if (key.startsWith("$")) continue;
  radius[key] = value.$value;
}

const spacing = {};
for (const [key, value] of Object.entries(tokens.spacing)) {
  if (key.startsWith("$")) continue;
  spacing[key] = value.$value;
}

// ---------- 2. Emit dist/tokens.json ----------

writeFileSync(
  resolve(DIST, "tokens.json"),
  JSON.stringify({ colors, fontFamily, radius, spacing }, null, 2) + "\n"
);

// ---------- 3. Emit dist/tokens.ts (consommé par mobile + admin-web) ----------

const tsContent = `// AUTO-GENERATED — do not edit. Source : packages/design-tokens/tokens.json
// Build : node scripts/build-tokens.mjs

export const colors = ${JSON.stringify(colors, null, 2)} as const;

export const fontFamily = ${JSON.stringify(fontFamily, null, 2)} as const;

export const radius = ${JSON.stringify(radius, null, 2)} as const;

export const spacing = ${JSON.stringify(spacing, null, 2)} as const;

export type ColorToken = keyof typeof colors;
export type FontFamilyToken = keyof typeof fontFamily;
export type RadiusToken = keyof typeof radius;
export type SpacingToken = keyof typeof spacing;

export const tokens = { colors, fontFamily, radius, spacing } as const;
export default tokens;
`;
writeFileSync(resolve(DIST, "tokens.ts"), tsContent);

// ---------- 4. Emit dist/tokens.mjs (ESM runtime) ----------

const mjsContent = `// AUTO-GENERATED — do not edit.
export const colors = ${JSON.stringify(colors, null, 2)};
export const fontFamily = ${JSON.stringify(fontFamily, null, 2)};
export const radius = ${JSON.stringify(radius, null, 2)};
export const spacing = ${JSON.stringify(spacing, null, 2)};
export const tokens = { colors, fontFamily, radius, spacing };
export default tokens;
`;
writeFileSync(resolve(DIST, "tokens.mjs"), mjsContent);

// ---------- 5. Emit dist/tokens.js (CJS runtime) ----------

const cjsContent = `// AUTO-GENERATED — do not edit.
const colors = ${JSON.stringify(colors, null, 2)};
const fontFamily = ${JSON.stringify(fontFamily, null, 2)};
const radius = ${JSON.stringify(radius, null, 2)};
const spacing = ${JSON.stringify(spacing, null, 2)};
const tokens = { colors, fontFamily, radius, spacing };
module.exports = { colors, fontFamily, radius, spacing, tokens, default: tokens };
`;
writeFileSync(resolve(DIST, "tokens.js"), cjsContent);

// ---------- 6. Emit dist/tokens.d.ts ----------

const dtsContent = `// AUTO-GENERATED — do not edit.
export declare const colors: {
${Object.keys(colors)
  .map((k) => `  readonly "${k}": string;`)
  .join("\n")}
};
export declare const fontFamily: {
${Object.keys(fontFamily)
  .map((k) => `  readonly "${k}": readonly string[];`)
  .join("\n")}
};
export declare const radius: {
${Object.keys(radius)
  .map((k) => `  readonly "${k}": string;`)
  .join("\n")}
};
export declare const spacing: {
${Object.keys(spacing)
  .map((k) => `  readonly "${k}": string;`)
  .join("\n")}
};
export declare type ColorToken = keyof typeof colors;
export declare type FontFamilyToken = keyof typeof fontFamily;
export declare type RadiusToken = keyof typeof radius;
export declare type SpacingToken = keyof typeof spacing;
export declare const tokens: {
  colors: typeof colors;
  fontFamily: typeof fontFamily;
  radius: typeof radius;
  spacing: typeof spacing;
};
export default tokens;
`;
writeFileSync(resolve(DIST, "tokens.d.ts"), dtsContent);

// ---------- 7. Emit dist/tokens.css ----------

const cssVars = Object.entries(colors)
  .map(([k, v]) => `  --color-${k}: ${v};`)
  .join("\n");
const radiusVars = Object.entries(radius)
  .map(([k, v]) => `  --radius-${k}: ${v};`)
  .join("\n");
const spacingVars = Object.entries(spacing)
  .map(([k, v]) => `  --spacing-${k}: ${v};`)
  .join("\n");

const cssContent = `/* AUTO-GENERATED — do not edit. Source: packages/design-tokens/tokens.json */
:root {
${cssVars}

${radiusVars}

${spacingVars}
}
`;
writeFileSync(resolve(DIST, "tokens.css"), cssContent);

// ---------- 8. Emit dist/tailwind-preset.js (partagé mobile + admin-web) ----------

const tailwindPreset = `// AUTO-GENERATED — KOTIZ Tailwind preset (partagé NativeWind + admin-web)
const { colors, fontFamily, radius, spacing } = require("./tokens.js");

module.exports = {
  theme: {
    extend: {
      colors,
      fontFamily,
      borderRadius: radius,
      spacing,
    },
  },
};
`;
writeFileSync(resolve(DIST, "tailwind-preset.js"), tailwindPreset);

// ---------- 9. Emit dist/theme.* (React Native — valeurs unitless, pas de "16px") ----------

const parsePx = (s) => parseInt(s, 10);

const radii = {
  sm: parsePx(tokens.radius.sm.$value),
  md: parsePx(tokens.radius.md.$value),
  lg: parsePx(tokens.radius.lg.$value),
  xl: parsePx(tokens.radius.xl.$value),
  full: 9999,
};

const space = {
  xs: parsePx(tokens.spacing.xs.$value),
  sm: parsePx(tokens.spacing.sm.$value),
  md: parsePx(tokens.spacing.md.$value),
  lg: parsePx(tokens.spacing.lg.$value),
  xl: parsePx(tokens.spacing.xl.$value),
  "2xl": parsePx(tokens.spacing["2xl"].$value),
  "3xl": parsePx(tokens.spacing["3xl"].$value),
};

const typography = {
  h1: { fontSize: 28, lineHeight: 34, fontFamily: fontFamily.extrabold[0] },
  h2: { fontSize: 22, lineHeight: 28, fontFamily: fontFamily.bold[0] },
  h3: { fontSize: 18, lineHeight: 24, fontFamily: fontFamily.semibold[0] },
  title: { fontSize: 16, lineHeight: 22, fontFamily: fontFamily.semibold[0] },
  body: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.sans[0] },
  label: { fontSize: 13, lineHeight: 18, fontFamily: fontFamily.medium[0] },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fontFamily.sans[0] },
  micro: { fontSize: 10, lineHeight: 14, fontFamily: fontFamily.medium[0] },
};

const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

const palette = {
  primary: colors["teal-deep"],
  primaryLight: colors["teal-50"],
  primaryMid: colors["teal-100"],
  secondary: colors.teal,
  accent: colors.gold,
  accentDark: colors["gold-dark"],
  accentLight: colors["gold-50"],
  bg: colors.cream,
  surface: colors.surface,
  navy: colors.navy,
  textPrimary: colors["ink-900"],
  textSecondary: colors["ink-700"],
  textTertiary: colors["ink-500"],
  border: colors["ink-300"],
  success: colors.success,
  danger: colors.danger,
  info: colors.info,
};

const themeTs = `// AUTO-GENERATED — do not edit. Source : packages/design-tokens/tokens.json
// Build : node scripts/build-tokens.mjs
//
// Toutes les valeurs numériques sont unitless (number, pas "16px") — compatibles
// React Native StyleSheet, Reanimated, et props numériques (@gorhom/bottom-sheet…).
//
// Usage :
//   import theme from "@kotiz/design-tokens/theme";
//   import { palette, space, radii } from "@kotiz/design-tokens/theme";

export const radii = ${JSON.stringify(radii, null, 2)} as const;

export const space = ${JSON.stringify(space, null, 2)} as const;

export const typography = ${JSON.stringify(typography, null, 2)} as const;

export const shadows = ${JSON.stringify(shadows, null, 2)} as const;

export const palette = ${JSON.stringify(palette, null, 2)} as const;

export const theme = { radii, space, typography, shadows, palette } as const;
export default theme;

export type Theme = typeof theme;
export type PaletteKey = keyof typeof palette;
export type SpaceKey = keyof typeof space;
export type RadiiKey = keyof typeof radii;
export type TypographyKey = keyof typeof typography;
export type ShadowKey = keyof typeof shadows;
`;
writeFileSync(resolve(DIST, "theme.ts"), themeTs);

const themeMjs = `// AUTO-GENERATED — do not edit.
export const radii = ${JSON.stringify(radii, null, 2)};
export const space = ${JSON.stringify(space, null, 2)};
export const typography = ${JSON.stringify(typography, null, 2)};
export const shadows = ${JSON.stringify(shadows, null, 2)};
export const palette = ${JSON.stringify(palette, null, 2)};
export const theme = { radii, space, typography, shadows, palette };
export default theme;
`;
writeFileSync(resolve(DIST, "theme.mjs"), themeMjs);

const themeCjs = `// AUTO-GENERATED — do not edit.
const radii = ${JSON.stringify(radii, null, 2)};
const space = ${JSON.stringify(space, null, 2)};
const typography = ${JSON.stringify(typography, null, 2)};
const shadows = ${JSON.stringify(shadows, null, 2)};
const palette = ${JSON.stringify(palette, null, 2)};
const theme = { radii, space, typography, shadows, palette };
module.exports = { radii, space, typography, shadows, palette, theme, default: theme };
`;
writeFileSync(resolve(DIST, "theme.js"), themeCjs);

const paletteKeys = Object.keys(palette)
  .map((k) => `  readonly ${k}: string;`)
  .join("\n");
const spaceKeys = Object.keys(space)
  .map((k) => `  readonly "${k}": number;`)
  .join("\n");
const radiiKeys = Object.keys(radii)
  .map((k) => `  readonly ${k}: number;`)
  .join("\n");
const typoKeys = Object.keys(typography)
  .map(
    (k) =>
      `  readonly ${k}: { readonly fontSize: number; readonly lineHeight: number; readonly fontFamily: string; };`
  )
  .join("\n");
const shadowKeys = Object.keys(shadows)
  .map(
    (k) =>
      `  readonly ${k}: { readonly shadowColor: string; readonly shadowOffset: { readonly width: number; readonly height: number; }; readonly shadowOpacity: number; readonly shadowRadius: number; readonly elevation: number; };`
  )
  .join("\n");

const themeDts = `// AUTO-GENERATED — do not edit.
export declare const radii: {
${radiiKeys}
};
export declare const space: {
${spaceKeys}
};
export declare const typography: {
${typoKeys}
};
export declare const shadows: {
${shadowKeys}
};
export declare const palette: {
${paletteKeys}
};
export declare const theme: {
  readonly radii: typeof radii;
  readonly space: typeof space;
  readonly typography: typeof typography;
  readonly shadows: typeof shadows;
  readonly palette: typeof palette;
};
export default theme;
export type Theme = typeof theme;
export type PaletteKey = keyof typeof palette;
export type SpaceKey = keyof typeof space;
export type RadiiKey = keyof typeof radii;
export type TypographyKey = keyof typeof typography;
export type ShadowKey = keyof typeof shadows;
`;
writeFileSync(resolve(DIST, "theme.d.ts"), themeDts);

console.log(
  `[@kotiz/design-tokens] ✅ Build OK — ${Object.keys(colors).length} couleurs, ${Object.keys(fontFamily).length} familles, ${Object.keys(radius).length} radii, ${Object.keys(spacing).length} spacings`
);
console.log(
  `[@kotiz/design-tokens] ✅ theme.ts — ${Object.keys(radii).length} radii, ${Object.keys(space).length} spacings, ${Object.keys(typography).length} typescales, ${Object.keys(shadows).length} shadows, ${Object.keys(palette).length} palette`
);
