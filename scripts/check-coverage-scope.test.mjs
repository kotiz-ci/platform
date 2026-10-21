import assert from "node:assert/strict";
import { test } from "node:test";

import { checkCoverageScope, findExecutableFilesOutsideCoverage } from "./check-coverage-scope.mjs";

test("accepts executable files measured by an 80 percent gate", () => {
  assert.deepEqual(
    findExecutableFilesOutsideCoverage([
      "apps/backend/src/main/java/ci/kotiz/Application.java",
      "apps/mobile/src/shared/config/variant.ts",
      "apps/mobile/app/(client)/index.tsx",
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
      run: () => "apps/mobile/src/pages/home/ui/HomePage.tsx\nREADME.md\n",
    })
  );
});

test("fails an affected diff containing uncovered executable source", () => {
  assert.throws(
    () =>
      checkCoverageScope({
        base: "base",
        head: "head",
        run: () => "apps/mobile/scripts/payment.mjs\n",
      }),
    /apps\/mobile\/scripts\/payment\.mjs/
  );
});

test("requires both git revisions for the coverage scope check", () => {
  assert.throws(() => checkCoverageScope({ base: "", head: "" }), /TURBO_SCM_BASE/);
});

test("accepts exact declarative exceptions and test sources", () => {
  assert.deepEqual(
    findExecutableFilesOutsideCoverage([
      "apps/mobile/eslint.config.js",
      "apps/mobile/jest.config.js",
      "apps/mobile/src/shared/ui/theme.ts",
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
      "apps/mobile/app.config.ts",
      "apps/mobile/babel.config.js",
      "apps/mobile/metro.config.js",
      "apps/mobile/scripts/payment.mjs",
      "apps/admin-web/src/health.ts",
      "packages/api-types/src/runtime.ts",
    ]),
    [
      "apps/mobile/app.config.ts",
      "apps/mobile/babel.config.js",
      "apps/mobile/metro.config.js",
      "apps/mobile/scripts/payment.mjs",
      "apps/admin-web/src/health.ts",
      "packages/api-types/src/runtime.ts",
    ]
  );
});
