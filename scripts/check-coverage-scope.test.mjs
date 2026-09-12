import assert from "node:assert/strict";
import { test } from "node:test";

import { checkCoverageScope, findExecutableFilesOutsideCoverage } from "./check-coverage-scope.mjs";

test("accepts executable files measured by an 80 percent gate", () => {
  assert.deepEqual(
    findExecutableFilesOutsideCoverage([
      "apps/backend/src/main/java/ci/kotiz/Application.java",
      "apps/mobile/lib/variant.ts",
      "packages/design-tokens/scripts/build-tokens.mjs",
      "packages/shared-utils/src/phone.ts",
      "scripts/check-affected-format.mjs",
    ]),
    []
  );
});

test("accepts an affected diff fully covered by configured gates", () => {
  assert.doesNotThrow(() =>
    checkCoverageScope({
      base: "base",
      head: "head",
      run: () => "apps/mobile/lib/variant.ts\nREADME.md\n",
    })
  );
});

test("fails an affected diff containing uncovered executable source", () => {
  assert.throws(
    () =>
      checkCoverageScope({
        base: "base",
        head: "head",
        run: () => "apps/mobile/lib/payment.ts\n",
      }),
    /apps\/mobile\/lib\/payment\.ts/
  );
});

test("promotion accepts only unchanged legacy executable files", () => {
  const legacyFile = "apps/mobile/app.config.ts";
  const legacyBlob = "c337970b5b246d1b48c6af35b43c97d7cae88ecb";
  const run = (_command, args) => {
    if (args[0] === "diff") return `${legacyFile}\n`;
    if (args[0] === "rev-parse") return `${legacyBlob}\n`;
    throw new Error(`unexpected git call: ${args.join(" ")}`);
  };

  assert.doesNotThrow(() =>
    checkCoverageScope({ base: "base", head: "head", promotion: true, run })
  );
});

test("promotion rejects a modified legacy executable file", () => {
  const legacyFile = "apps/mobile/app.config.ts";
  const run = (_command, args) => {
    if (args[0] === "diff") return `${legacyFile}\n`;
    if (args[0] === "rev-parse") return "0000000000000000000000000000000000000000\n";
    throw new Error(`unexpected git call: ${args.join(" ")}`);
  };

  assert.throws(
    () => checkCoverageScope({ base: "base", head: "head", promotion: true, run }),
    /apps\/mobile\/app\.config\.ts/
  );
});

test("requires both git revisions for the coverage scope check", () => {
  assert.throws(() => checkCoverageScope({ base: "", head: "" }), /TURBO_SCM_BASE/);
});

test("accepts exact declarative exceptions and test sources", () => {
  assert.deepEqual(
    findExecutableFilesOutsideCoverage([
      "apps/mobile/lib/theme.ts",
      "packages/api-types/src/index.ts",
      "packages/shared-utils/src/index.ts",
      "apps/mobile/test/variant.test.ts",
      "packages/design-tokens/scripts/token-validation.test.mjs",
    ]),
    []
  );
});

test("rejects new executable source outside a coverage gate", () => {
  assert.deepEqual(
    findExecutableFilesOutsideCoverage([
      "apps/mobile/app/health/index.tsx",
      "apps/mobile/app.config.ts",
      "apps/mobile/babel.config.js",
      "apps/mobile/metro.config.js",
      "apps/mobile/lib/payment.ts",
      "apps/admin-web/src/health.ts",
      "packages/api-types/src/runtime.ts",
    ]),
    [
      "apps/mobile/app/health/index.tsx",
      "apps/mobile/app.config.ts",
      "apps/mobile/babel.config.js",
      "apps/mobile/metro.config.js",
      "apps/mobile/lib/payment.ts",
      "apps/admin-web/src/health.ts",
      "packages/api-types/src/runtime.ts",
    ]
  );
});
