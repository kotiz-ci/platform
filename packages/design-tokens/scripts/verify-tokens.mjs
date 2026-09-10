#!/usr/bin/env node
// Smoke verify : vérifie que dist/tokens.json contient au moins 17 couleurs (Story 1.1 AC7).

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_JSON = resolve(__dirname, "..", "dist", "tokens.json");

if (!existsSync(DIST_JSON)) {
  console.error("[verify] ❌ dist/tokens.json absent — exécuter `pnpm build` d'abord");
  process.exit(1);
}

const tokens = JSON.parse(readFileSync(DIST_JSON, "utf8"));
const validators = {
  colors: (value) => typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value),
  fontFamily: (value) =>
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.length > 0),
  radius: (value) => typeof value === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?px$/.test(value),
  spacing: (value) => typeof value === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?px$/.test(value),
};

for (const [groupName, validateValue] of Object.entries(validators)) {
  const group = tokens[groupName];
  if (!group || typeof group !== "object" || Array.isArray(group)) {
    console.error(`[verify] ❌ Groupe requis manquant ou invalide : ${groupName}`);
    process.exit(1);
  }

  const invalid = Object.entries(group)
    .filter(([, value]) => !validateValue(value))
    .map(([name]) => name);
  if (invalid.length > 0) {
    console.error(`[verify] ❌ Valeurs invalides dans ${groupName} : ${invalid.join(", ")}`);
    process.exit(1);
  }
}

const colorCount = Object.keys(tokens.colors).length;

if (colorCount < 17) {
  console.error(`[verify] ❌ ${colorCount} couleurs détectées, attendu ≥ 17 (Story 1.1 AC7)`);
  process.exit(1);
}

const required = [
  "navy",
  "teal",
  "teal-deep",
  "gold-dark",
  "success",
  "info",
  "cream",
  "surface",
  "ink-900",
  "danger",
];

const missing = required.filter((k) => !(k in tokens.colors));
if (missing.length > 0) {
  console.error(`[verify] ❌ Couleurs requises manquantes : ${missing.join(", ")}`);
  process.exit(1);
}

console.log(
  `[verify] ✅ ${colorCount} couleurs OK, ${required.length} couleurs requises présentes`
);
