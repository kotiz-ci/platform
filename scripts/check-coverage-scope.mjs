import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const EXECUTABLE_SOURCE = /\.(?:java|mjs|js|jsx|ts|tsx)$/;
const SOURCE_TREE =
  /^(?:(?:apps|packages)\/[^/]+\/(?:app|lib|scripts|src)\/|(?:apps|packages)\/[^/]+\/[^/]+\.(?:c?js|mjs|ts|tsx)$|scripts\/)/;

const DECLARATIVE_EXCEPTIONS = new Set([
  "apps/mobile/lib/theme.ts",
  "packages/api-types/src/index.ts",
  "packages/shared-utils/src/index.ts",
]);

const COVERED_SOURCE = [
  /^apps\/backend\/src\/main\/java\/.*\.java$/,
  /^apps\/mobile\/lib\/variant(?:-policy)?\.ts$/,
  /^packages\/design-tokens\/scripts\/.*\.mjs$/,
  /^packages\/shared-utils\/src\/.*\.ts$/,
  /^scripts\/.*\.mjs$/,
];

const LEGACY_PROMOTION_BASELINE = new Map([
  ["apps/mobile/app.config.ts", "c337970b5b246d1b48c6af35b43c97d7cae88ecb"],
  ["apps/mobile/app/_layout.tsx", "a85dc85d2f4e84a5d7ed9a5e4b7ef72c9c2c5311"],
  ["apps/mobile/app/health/index.tsx", "3a3cfa9a736d822a709d6de1e347d6fe95db3d8f"],
  ["apps/mobile/app/index.tsx", "bd45634374cf12252e178079e42ec4c2cd6a68d1"],
  ["apps/mobile/eslint.config.js", "3fc4095d707c76a007739452bb6cc0dabf0f362f"],
]);

function isTestFile(file) {
  return /(?:^|\/)(?:test|tests)\//.test(file) || /\.(?:test|spec)\.[^.]+$/.test(file);
}

export function findExecutableFilesOutsideCoverage(changedFiles) {
  return changedFiles.filter(
    (file) =>
      EXECUTABLE_SOURCE.test(file) &&
      SOURCE_TREE.test(file) &&
      !isTestFile(file) &&
      !DECLARATIVE_EXCEPTIONS.has(file) &&
      !COVERED_SOURCE.some((pattern) => pattern.test(file))
  );
}

function gitLines(args, run) {
  const output = run("git", args, { encoding: "utf8" }).trim();
  return output ? output.split("\n") : [];
}

export function checkCoverageScope({
  base = process.env.TURBO_SCM_BASE,
  head = process.env.TURBO_SCM_HEAD,
  promotion = false,
  run = execFileSync,
} = {}) {
  if (!base || !head) {
    throw new Error("TURBO_SCM_BASE and TURBO_SCM_HEAD are required");
  }

  const changedFiles = gitLines(
    ["diff", "--name-only", "--diff-filter=ACMR", `${base}...${head}`],
    run
  );
  const uncovered = findExecutableFilesOutsideCoverage(changedFiles);
  const blocked = promotion
    ? uncovered.filter((file) => {
        const expectedBlob = LEGACY_PROMOTION_BASELINE.get(file);
        if (!expectedBlob) return true;

        const actualBlob = run("git", ["rev-parse", `${head}:${file}`], {
          encoding: "utf8",
        }).trim();
        return actualBlob !== expectedBlob;
      })
    : uncovered;

  if (blocked.length > 0) {
    throw new Error(
      "Executable source changed outside an 80% coverage gate:\n" +
        blocked.map((file) => `- ${file}`).join("\n")
    );
  }

  console.log("Every affected executable source file is covered or explicitly declarative.");
}

const isExecutedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isExecutedDirectly) {
  try {
    checkCoverageScope({ promotion: process.argv.includes("--promotion") });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
