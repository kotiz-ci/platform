import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function read(path) {
  return readFileSync(resolve(ROOT, path), "utf8");
}

function readJson(path) {
  return JSON.parse(read(path));
}

test("PRs targeting develop and main share the reproducible required CI", () => {
  const workflow = read(".github/workflows/ci.yml");

  assert.match(workflow, /pull_request:\s*\n\s+branches:\s*\[develop, main\]/);
  assert.match(workflow, /group: ci-\$\{\{ github\.workflow \}\}-\$\{\{ github\.head_ref \}\}/);
  assert.match(workflow, /cancel-in-progress: true/);
  assert.match(workflow, /node-version-file: \.nvmrc/);
  assert.match(workflow, /java-version: ['"]21\.0\.12\+8\.0\.LTS['"]/);
  assert.match(workflow, /pnpm exec turbo run lint type-check test build --affected/);
  assert.match(workflow, /pnpm format:check:affected/);
  assert.match(workflow, /pnpm lint:markdown:affected/);
  assert.match(workflow, /pnpm coverage:scope:affected/);
  assert.match(workflow, /ghcr\.io\/gitleaks\/gitleaks:v8\.30\.1@sha256:[0-9a-f]{64}/);
  assert.match(workflow, /--config \/repo\/\.gitleaks\.toml/);
  assert.match(workflow, /aquasecurity\/trivy-action@[0-9a-f]{40}/);
  assert.match(workflow, /severity: ['"]CRITICAL['"]/);
  assert.match(workflow, /exit-code: ['"]1['"]/);
  assert.match(workflow, /ci-required:/);

  for (const action of workflow.matchAll(/^\s*- uses: ([^\s#]+)/gm)) {
    assert.match(action[1], /@[0-9a-f]{40}$/, `${action[1]} must use an immutable revision`);
  }
});

test("both protected branches require the CI gate created by the workflow", () => {
  for (const branch of ["develop", "main"]) {
    const ruleset = readJson(`.github/rulesets/protect-${branch}.json`);
    const statusRule = ruleset.rules.find((rule) => rule.type === "required_status_checks");

    assert.ok(statusRule, `${branch} must require status checks`);
    assert.equal(statusRule.parameters.strict_required_status_checks_policy, true);
    assert.deepEqual(statusRule.parameters.required_status_checks, [{ context: "CI required" }]);
  }
});

test("testable backend code is blocked below 80 percent coverage", () => {
  const pom = read("apps/backend/pom.xml");

  assert.match(pom, /<artifactId>jacoco-maven-plugin<\/artifactId>/);
  assert.match(pom, /<minimum>0\.80<\/minimum>/);
  assert.match(pom, /<goal>check<\/goal>/);
});

test("declarative coverage exceptions are explicit and narrowly scoped", () => {
  const policy = read("docs/ci/coverage-policy.md");

  assert.match(policy, /80 %/);
  assert.match(policy, /packages\/api-types/);
  assert.match(policy, /packages\/design-tokens\/tokens\.json/);
  assert.doesNotMatch(policy, /apps\/backend.*exception/i);
  assert.doesNotMatch(policy, /baseline|grandfather/i);
  assert.match(read("apps/mobile/package.json"), /--test-coverage-include='lib\/variant\*\.ts'/);
  assert.match(
    read("packages/design-tokens/package.json"),
    /--test-coverage-include='scripts\/\*\.mjs'/
  );
});

test("affected workspaces run real lint and Java formatting gates", () => {
  const backend = read("apps/backend/package.json");
  const pom = read("apps/backend/pom.xml");
  const apiTypes = read("packages/api-types/package.json");
  const sharedUtils = read("packages/shared-utils/package.json");
  const designTokens = read("packages/design-tokens/package.json");
  const turbo = read("turbo.json");

  assert.match(backend, /spotless:check/);
  assert.match(pom, /<artifactId>spotless-maven-plugin<\/artifactId>/);
  assert.doesNotMatch(apiTypes, /"lint":\s*"echo/);
  assert.doesNotMatch(sharedUtils, /"lint":\s*"echo/);
  assert.doesNotMatch(designTokens, /"lint":\s*"echo/);
  assert.match(turbo, /eslint\.config\.mjs/);
  assert.match(turbo, /\.markdownlint-cli2\.jsonc/);
});

test("the only secret allowlist entry matches only the documented fake AES values", () => {
  const config = read(".gitleaks.toml");

  assert.equal(config.match(/\[\[allowlists\]\]/g)?.length, 1);
  assert.match(config, /regexTarget = "match"/);
  assert.match(config, /KOTIZ_AES_MASTER_KEY=/);
  assert.equal(config.match(/KOTIZ_AES_MASTER_KEY=/g)?.length, 2);
  assert.doesNotMatch(config, /paths|commits|stopwords/);
});
