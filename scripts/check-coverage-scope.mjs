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

  if (uncovered.length > 0) {
    throw new Error(
      "Executable source changed outside an 80% coverage gate:\n" +
        uncovered.map((file) => `- ${file}`).join("\n")
    );
  }

  console.log("Every affected executable source file is covered or explicitly declarative.");
}

const isExecutedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isExecutedDirectly) {
  try {
    checkCoverageScope();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
