// Lancé par node:test et non par Jest : la CLI ESLint charge sa configuration par
// import dynamique et n'a pas besoin de l'environnement Expo.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testRoot = path.dirname(fileURLToPath(import.meta.url));
const mobileRoot = path.resolve(testRoot, "..");
const fixtureRoot = path.join(testRoot, "fixtures", "fsd");

function lintFixtures() {
  const eslint = path.join(mobileRoot, "node_modules", ".bin", "eslint");
  const run = spawnSync(eslint, ["--format", "json", fixtureRoot], {
    cwd: mobileRoot,
    encoding: "utf8",
  });
  const results = JSON.parse(run.stdout);
  return new Map(
    results.map((result) => [
      path.relative(fixtureRoot, result.filePath),
      result.messages
        .filter((message) => message.ruleId?.startsWith("boundaries/"))
        .map((message) => message.message),
    ])
  );
}

const errorsByFile = lintFixtures();

function boundaryErrors(file) {
  const errors = errorsByFile.get(file);
  assert.ok(errors, `Fixture not linted: ${file}`);
  return errors;
}

describe("Feature-Sliced Design boundaries", () => {
  for (const file of [
    "app/index.ts",
    "src/pages/home/index.ts",
    "src/features/login/model/login.ts",
    "src/features/login/index.ts",
    "src/entities/user/model/user.ts",
    "src/entities/user/index.ts",
    "src/shared/lib/format.ts",
  ]) {
    it(`accepts downward imports through public APIs in ${file}`, () => {
      assert.deepEqual(boundaryErrors(file), []);
    });
  }

  for (const [label, file] of [
    ["a lower layer importing a higher one", "src/entities/session/index.ts"],
    ["shared importing a slice", "src/shared/config/upward.ts"],
    ["two slices of the same layer", "src/entities/wallet/index.ts"],
    ["a deep import into another slice", "src/features/deep/index.ts"],
    ["a route bypassing a slice public API", "app/deep.ts"],
    ["a file outside any FSD layer", "src/components/button.ts"],
    ["a JavaScript file making a deep import", "src/pages/home/legacy.js"],
  ]) {
    it(`rejects ${label}`, () => {
      assert.notDeepEqual(boundaryErrors(file), []);
    });
  }
});
