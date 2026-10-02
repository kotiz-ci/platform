#!/usr/bin/env node
// Smoke verify : vérifie que dist/tokens.json contient au moins 17 couleurs (Story 1.1 AC7).

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assertGeneratedTokens } from "./token-validation.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_JSON = resolve(__dirname, "..", "tokens.json");
const DIST_JSON = resolve(__dirname, "..", "dist", "tokens.json");

if (!existsSync(DIST_JSON)) {
  console.error("[verify] ❌ dist/tokens.json absent — exécuter `pnpm build` d'abord");
  process.exit(1);
}

const tokens = JSON.parse(readFileSync(DIST_JSON, "utf8"));
const sourceTokens = JSON.parse(readFileSync(SOURCE_JSON, "utf8"));
try {
  assertGeneratedTokens(tokens, sourceTokens);
} catch (error) {
  console.error(`[verify] ❌ ${error.message}`);
  process.exit(1);
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
