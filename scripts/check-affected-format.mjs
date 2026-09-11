import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const FORMATTABLE = /\.(?:ts|tsx|js|jsx|json|md|ya?ml)$/;
const GLOBAL_FORMAT_CONFIG = new Set([".editorconfig", ".prettierignore", ".prettierrc"]);

export function selectFormattableFiles(changedFiles, allTrackedFiles = changedFiles) {
  const mustCheckAll = changedFiles.some((file) => GLOBAL_FORMAT_CONFIG.has(file));
  return (mustCheckAll ? allTrackedFiles : changedFiles).filter((file) => FORMATTABLE.test(file));
}

function gitLines(args, run) {
  const output = run("git", args, { encoding: "utf8" }).trim();
  return output ? output.split("\n") : [];
}

export function checkAffectedFormat({
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
  const allTrackedFiles = changedFiles.some((file) => GLOBAL_FORMAT_CONFIG.has(file))
    ? gitLines(["ls-files"], run)
    : changedFiles;
  const files = selectFormattableFiles(changedFiles, allTrackedFiles);

  if (files.length === 0) {
    console.log("No affected files require Prettier.");
    return;
  }

  run("pnpm", ["exec", "prettier", "--check", "--ignore-path", ".prettierignore", ...files], {
    stdio: "inherit",
  });
}

const isExecutedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isExecutedDirectly) {
  try {
    checkAffectedFormat();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
