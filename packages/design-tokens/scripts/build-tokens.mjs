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

if (existsSync(DIST)) {
  rmSync(DIST, { recursive: true, force: true });
}
mkdirSync(DIST, { recursive: true });

const tokens = JSON.parse(readFileSync(SRC, "utf8"));

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
${Object.keys(colors).map((k) => `  readonly "${k}": string;`).join("\n")}
};
export declare const fontFamily: {
${Object.keys(fontFamily).map((k) => `  readonly "${k}": readonly string[];`).join("\n")}
};
export declare const radius: {
${Object.keys(radius).map((k) => `  readonly "${k}": string;`).join("\n")}
};
export declare const spacing: {
${Object.keys(spacing).map((k) => `  readonly "${k}": string;`).join("\n")}
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

console.log(
  `[@kotiz/design-tokens] ✅ Build OK — ${Object.keys(colors).length} couleurs, ${Object.keys(fontFamily).length} familles, ${Object.keys(radius).length} radii, ${Object.keys(spacing).length} spacings`
);
