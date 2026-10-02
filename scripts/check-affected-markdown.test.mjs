import assert from "node:assert/strict";
import { test } from "node:test";

import { checkAffectedMarkdown, selectMarkdownFiles } from "./check-affected-markdown.mjs";

test("selects only affected Markdown files", () => {
  assert.deepEqual(selectMarkdownFiles(["README.md", "docs/CI.MD", "apps/mobile/index.tsx"]), [
    "README.md",
    "docs/CI.MD",
  ]);
});

test("runs markdownlint-cli2 only for affected Markdown", () => {
  const calls = [];
  const run = (command, args) => {
    calls.push([command, args]);
    return command === "git" ? "README.md\nindex.ts\n" : "";
  };

  checkAffectedMarkdown({ base: "base", head: "head", run });
  assert.deepEqual(calls[1], ["pnpm", ["exec", "markdownlint-cli2", "README.md"]]);
});

test("does not invoke markdownlint when no Markdown changed", () => {
  const calls = [];
  checkAffectedMarkdown({
    base: "base",
    head: "head",
    run(command, args) {
      calls.push([command, args]);
      return "index.ts\n";
    },
  });
  assert.equal(calls.length, 1);
});

test("requires both git revisions for affected Markdown", () => {
  assert.throws(() => checkAffectedMarkdown({ base: "", head: "" }), /TURBO_SCM_BASE/);
});

test("checks every tracked Markdown file when markdownlint policy changes", () => {
  const calls = [];
  const run = (command, args) => {
    calls.push([command, args]);
    if (command !== "git") return "";
    return args[0] === "diff" ? ".markdownlint-cli2.jsonc\n" : "README.md\ndocs/ci.md\n";
  };

  checkAffectedMarkdown({ base: "base", head: "head", run });
  assert.deepEqual(calls.at(-1), [
    "pnpm",
    ["exec", "markdownlint-cli2", "README.md", "docs/ci.md"],
  ]);
});
