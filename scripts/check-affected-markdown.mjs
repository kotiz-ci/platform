import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const GLOBAL_MARKDOWN_CONFIG = new Set([".markdownlint-cli2.jsonc"]);

export function selectMarkdownFiles(changedFiles) {
  return changedFiles.filter((file) => /\.md$/i.test(file));
}

function gitLines(args, run) {
  const output = run("git", args, { encoding: "utf8" }).trim();
  return output ? output.split("\n") : [];
}

export function checkAffectedMarkdown({
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
  const markdownFiles = selectMarkdownFiles(
    changedFiles.some((file) => GLOBAL_MARKDOWN_CONFIG.has(file))
      ? gitLines(["ls-files", "*.md", "**/*.md"], run)
      : changedFiles
  );

  if (markdownFiles.length === 0) {
    console.log("No affected Markdown files require linting.");
    return;
  }

  run("pnpm", ["exec", "markdownlint-cli2", ...markdownFiles], { stdio: "inherit" });
}

const isExecutedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isExecutedDirectly) {
  try {
    checkAffectedMarkdown();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
