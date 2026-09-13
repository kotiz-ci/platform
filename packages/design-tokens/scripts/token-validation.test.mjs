import assert from "node:assert/strict";
import { test } from "node:test";

import { assertGeneratedTokens, assertSourceTokens } from "./token-validation.mjs";

await import("./build-tokens.mjs");
await import("./verify-tokens.mjs");

const source = {
  color: { primary: { $value: "#007A6E" } },
  "font-family": { sans: { $value: ["Inter", "sans-serif"] } },
  radius: { md: { $value: "12px" } },
  spacing: { md: { $value: "16px" } },
};

const generated = {
  colors: { primary: "#007A6E" },
  fontFamily: { sans: ["Inter", "sans-serif"] },
  radius: { md: "12px" },
  spacing: { md: "16px" },
};

test("accepts matching source and generated design tokens", () => {
  assert.doesNotThrow(() => assertSourceTokens(source));
  assert.doesNotThrow(() => assertGeneratedTokens(generated, source));
});

test("rejects missing groups, values and invalid token formats", () => {
  assert.throws(() => assertSourceTokens({}), /Groupe requis manquant/);
  assert.throws(
    () => assertSourceTokens({ ...source, color: { primary: {} } }),
    /Valeur requise manquante/
  );
  assert.throws(
    () => assertSourceTokens({ ...source, color: { primary: { $value: "teal" } } }),
    /Valeur invalide/
  );
  assert.throws(
    () => assertSourceTokens({ ...source, "font-family": { sans: { $value: [] } } }),
    /Valeur invalide/
  );
  assert.throws(
    () => assertSourceTokens({ ...source, radius: { md: { $value: "12rem" } } }),
    /Valeur invalide/
  );
});

test("rejects incomplete, unexpected or invalid generated values", () => {
  assert.throws(
    () => assertGeneratedTokens({ ...generated, colors: {} }, source),
    /Clés incohérentes/
  );
  assert.throws(
    () =>
      assertGeneratedTokens(
        { ...generated, colors: { primary: "#007A6E", unexpected: "#FFFFFF" } },
        source
      ),
    /Clés incohérentes/
  );
  assert.throws(
    () => assertGeneratedTokens({ ...generated, spacing: { md: "large" } }, source),
    /Valeurs invalides/
  );
});
