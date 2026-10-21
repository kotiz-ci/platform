import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { afterEach, test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryDirectories = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

function temporaryDirectory(prefix) {
  const directory = mkdtempSync(resolve(tmpdir(), prefix));
  temporaryDirectories.push(directory);
  return directory;
}

function readJson(path) {
  return JSON.parse(readFileSync(resolve(ROOT, path), "utf8"));
}

function writeExecutable(path, content) {
  writeFileSync(path, `#!/usr/bin/env bash\n${content}\n`, { mode: 0o755 });
}

function runOnboarding({ node = "v24.21.0", java = "openjdk 21.0.12 2026-07-21" } = {}) {
  const bin = temporaryDirectory("kotiz-onboarding-");
  writeExecutable(resolve(bin, "node"), `printf '%s\\n' '${node}'`);
  writeExecutable(resolve(bin, "pnpm"), "printf '%s\\n' '9.12.3'");
  writeExecutable(resolve(bin, "corepack"), "exit 0");
  writeExecutable(resolve(bin, "java"), `printf '%s\\n' '${java}'`);
  writeExecutable(
    resolve(bin, "docker"),
    'if [[ "${1:-}" == "info" ]]; then exit 0; fi; printf \'%s\\n\' "Docker version 27.5.1"'
  );

  return spawnSync("bash", [resolve(ROOT, "scripts/onboarding-check.sh")], {
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}` },
    encoding: "utf8",
  });
}

function copyTokenPackage() {
  const directory = temporaryDirectory("kotiz-tokens-");
  mkdirSync(resolve(directory, "scripts"));
  cpSync(resolve(ROOT, "packages/design-tokens/tokens.json"), resolve(directory, "tokens.json"));
  cpSync(
    resolve(ROOT, "packages/design-tokens/scripts/token-validation.mjs"),
    resolve(directory, "scripts/token-validation.mjs")
  );
  cpSync(
    resolve(ROOT, "packages/design-tokens/scripts/build-tokens.mjs"),
    resolve(directory, "scripts/build-tokens.mjs")
  );
  cpSync(
    resolve(ROOT, "packages/design-tokens/scripts/verify-tokens.mjs"),
    resolve(directory, "scripts/verify-tokens.mjs")
  );
  return directory;
}

function runTokenScript(directory, script) {
  return spawnSync(process.execPath, [resolve(directory, `scripts/${script}`)], {
    encoding: "utf8",
  });
}

test("runtime pins use the supported Node 24 and Java 21 versions consistently", () => {
  const rootPackage = readJson("package.json");
  const eas = readJson("apps/mobile/eas.json");
  const toolVersions = readFileSync(resolve(ROOT, ".tool-versions"), "utf8");

  assert.equal(readFileSync(resolve(ROOT, ".nvmrc"), "utf8").trim(), "24.21.0");
  assert.equal(rootPackage.engines.node, "24.21.0");
  assert.match(toolVersions, /^nodejs 24\.21\.0$/m);
  assert.match(toolVersions, /^java temurin-21\.0\.12\+8$/m);
  assert.equal(eas.build._base.node, "24.21.0");
  assert.doesNotMatch(
    readFileSync(resolve(ROOT, "scripts/onboarding-check.sh"), "utf8"),
    /Node 20/
  );
});

test("onboarding accepts the exact pinned toolchain", () => {
  const result = runOnboarding();
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("onboarding rejects nearby but incorrect Node and Java versions", () => {
  const wrongNode = runOnboarding({ node: "v24.210.0" });
  assert.notEqual(wrongNode.status, 0, wrongNode.stdout);

  const wrongJava = runOnboarding({ java: "openjdk 21.0.120 2026-07-21" });
  assert.notEqual(wrongJava.status, 0, wrongJava.stdout);
});

test("design token build and verification reject invalid or missing values", () => {
  const invalidHexPackage = copyTokenPackage();
  const invalidHexTokens = JSON.parse(
    readFileSync(resolve(invalidHexPackage, "tokens.json"), "utf8")
  );
  invalidHexTokens.color.navy.$value = "navy";
  writeFileSync(resolve(invalidHexPackage, "tokens.json"), JSON.stringify(invalidHexTokens));
  assert.notEqual(runTokenScript(invalidHexPackage, "build-tokens.mjs").status, 0);

  const missingValuePackage = copyTokenPackage();
  const missingValueTokens = JSON.parse(
    readFileSync(resolve(missingValuePackage, "tokens.json"), "utf8")
  );
  delete missingValueTokens.color.teal.$value;
  writeFileSync(resolve(missingValuePackage, "tokens.json"), JSON.stringify(missingValueTokens));
  assert.notEqual(runTokenScript(missingValuePackage, "build-tokens.mjs").status, 0);

  const invalidBuildPackage = copyTokenPackage();
  assert.equal(runTokenScript(invalidBuildPackage, "build-tokens.mjs").status, 0);
  const builtTokens = JSON.parse(
    readFileSync(resolve(invalidBuildPackage, "dist/tokens.json"), "utf8")
  );
  builtTokens.colors.info = "blue";
  writeFileSync(resolve(invalidBuildPackage, "dist/tokens.json"), JSON.stringify(builtTokens));
  assert.notEqual(runTokenScript(invalidBuildPackage, "verify-tokens.mjs").status, 0);

  const invalidDimensionPackage = copyTokenPackage();
  assert.equal(runTokenScript(invalidDimensionPackage, "build-tokens.mjs").status, 0);
  const invalidDimensions = JSON.parse(
    readFileSync(resolve(invalidDimensionPackage, "dist/tokens.json"), "utf8")
  );
  invalidDimensions.spacing.md = "sixteen";
  writeFileSync(
    resolve(invalidDimensionPackage, "dist/tokens.json"),
    JSON.stringify(invalidDimensions)
  );
  assert.notEqual(runTokenScript(invalidDimensionPackage, "verify-tokens.mjs").status, 0);

  const missingBuiltTokenPackage = copyTokenPackage();
  assert.equal(runTokenScript(missingBuiltTokenPackage, "build-tokens.mjs").status, 0);
  const incompleteBuild = JSON.parse(
    readFileSync(resolve(missingBuiltTokenPackage, "dist/tokens.json"), "utf8")
  );
  delete incompleteBuild.spacing.md;
  writeFileSync(
    resolve(missingBuiltTokenPackage, "dist/tokens.json"),
    JSON.stringify(incompleteBuild)
  );
  assert.notEqual(runTokenScript(missingBuiltTokenPackage, "verify-tokens.mjs").status, 0);
});

test("generated design tokens are consumable through every declared export", async () => {
  execFileSync(process.execPath, [
    resolve(ROOT, "packages/design-tokens/scripts/build-tokens.mjs"),
  ]);
  const manifest = readJson("packages/design-tokens/package.json");
  assert.equal(manifest.scripts.prepare, "node scripts/build-tokens.mjs");

  const esm = await import(resolve(ROOT, "packages/design-tokens/dist/tokens.mjs"));
  const cjs = await import(resolve(ROOT, "packages/design-tokens/dist/tokens.js"));
  const theme = await import(resolve(ROOT, "packages/design-tokens/dist/theme.mjs"));
  assert.equal(esm.colors.navy, "#0A2540");
  assert.equal(cjs.colors.navy, "#0A2540");
  assert.equal(theme.palette.primary, "#007A6E");
});

test("mobile exposes independent build and type-check commands for both variants", () => {
  const mobilePackage = readJson("apps/mobile/package.json");
  for (const variant of ["client", "agent"]) {
    assert.match(mobilePackage.scripts[`build:web:${variant}`], new RegExp(`${variant}`));
    assert.match(mobilePackage.scripts[`type-check:${variant}`], new RegExp(`${variant}`));
  }
});

test("mobile variants expose distinct identities without deferred WhatsApp audio", () => {
  const expo = resolve(ROOT, "apps/mobile/node_modules/.bin/expo");
  const mobileDirectory = resolve(ROOT, "apps/mobile");

  for (const variant of ["client", "agent"]) {
    const output = execFileSync(expo, ["config", "--type", "public", "--json"], {
      cwd: mobileDirectory,
      env: { ...process.env, EXPO_PUBLIC_APP_VARIANT: variant },
      encoding: "utf8",
    });
    const config = JSON.parse(output);
    assert.equal(config.extra.variant, variant);
    assert.equal(config.ios.bundleIdentifier, `ci.kotiz.${variant}`);
    assert.equal(config.android.package, `ci.kotiz.${variant}`);
    assert.ok(!config.android.permissions.includes("android.permission.RECORD_AUDIO"));
    assert.ok(!("NSMicrophoneUsageDescription" in config.ios.infoPlist));
  }
});

test("README links and CODEOWNERS roots only target files present in a GitHub clone", () => {
  for (const file of [
    "README.md",
    "CONTRIBUTING.md",
    "apps/backend/README.md",
    "apps/mobile/README.md",
  ]) {
    const source = readFileSync(resolve(ROOT, file), "utf8");
    for (const match of source.matchAll(/\[[^\]]+\]\((?!https?:|#)([^)]+)\)/g)) {
      const target = match[1].split("#", 1)[0];
      if (target) {
        assert.doesNotThrow(
          () => readFileSync(resolve(ROOT, dirname(file), target)),
          `${file} references missing ${target}`
        );
      }
    }
  }

  const codeowners = readFileSync(resolve(ROOT, ".github/CODEOWNERS"), "utf8");
  for (const match of codeowners.matchAll(/^\/(\S+?)\/\s+/gm)) {
    assert.doesNotThrow(
      () => statSync(resolve(ROOT, match[1])),
      `CODEOWNERS references missing /${match[1]}/`
    );
  }
});

test("the declared AES-256 example decodes to exactly 32 bytes", () => {
  const env = readFileSync(resolve(ROOT, ".env.example"), "utf8");
  const value = env.match(/^KOTIZ_AES_MASTER_KEY=(.+)$/m)?.[1];
  assert.ok(value, "KOTIZ_AES_MASTER_KEY is missing");
  assert.equal(Buffer.from(value, "base64").byteLength, 32);
});
