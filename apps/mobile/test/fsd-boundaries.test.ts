/**
 * @jest-environment node
 */
import { spawnSync } from "node:child_process";
import path from "node:path";

const mobileRoot = path.resolve(__dirname, "..");
const fixtureRoot = path.join(__dirname, "fixtures", "fsd");

type LintResult = { filePath: string; messages: { ruleId: string | null; message: string }[] };

// La CLI ESLint charge sa configuration par import dynamique, impossible dans la VM Jest.
function lintFixtures(): Map<string, string[]> {
  const eslint = path.join(mobileRoot, "node_modules", ".bin", "eslint");
  const run = spawnSync(eslint, ["--format", "json", fixtureRoot], {
    cwd: mobileRoot,
    encoding: "utf8",
  });
  const results = JSON.parse(run.stdout) as LintResult[];
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

function boundaryErrors(file: string): string[] {
  const errors = errorsByFile.get(file);
  if (!errors) {
    throw new Error(`Fixture not linted: ${file}`);
  }
  return errors;
}

describe("Feature-Sliced Design boundaries", () => {
  it.each([
    "app/index.ts",
    "src/pages/home/index.ts",
    "src/features/login/model/login.ts",
    "src/features/login/index.ts",
    "src/entities/user/model/user.ts",
    "src/entities/user/index.ts",
    "src/shared/lib/format.ts",
  ])("accepts downward imports through public APIs in %s", (file) => {
    expect(boundaryErrors(file)).toEqual([]);
  });

  it.each([
    ["a lower layer importing a higher one", "src/entities/session/index.ts"],
    ["shared importing a slice", "src/shared/config/upward.ts"],
    ["two slices of the same layer", "src/entities/wallet/index.ts"],
    ["a deep import into another slice", "src/features/deep/index.ts"],
    ["a route bypassing a slice public API", "app/deep.ts"],
    ["a file outside any FSD layer", "src/components/button.ts"],
    ["a JavaScript file making a deep import", "src/pages/home/legacy.js"],
  ])("rejects %s", (_case, file) => {
    expect(boundaryErrors(file)).not.toEqual([]);
  });
});
