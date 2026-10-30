import assert from "node:assert/strict";
import { test } from "node:test";

import { checkAffectedFormat, selectFormattableFiles } from "./check-affected-format.mjs";

test("checks only changed files supported by Prettier", () => {
  assert.deepEqual(
    selectFormattableFiles(["apps/mobile/app.tsx", "apps/backend/Application.java", "README.md"]),
    ["apps/mobile/app.tsx", "README.md"]
  );
});

test("runs Prettier only for affected formattable files", () => {
  const calls = [];
  const run = (command, args) => {
    calls.push([command, args]);
    return command === "git" ? "README.md\nApplication.java\n" : "";
  };

  checkAffectedFormat({ base: "base", head: "head", run });

  assert.deepEqual(calls[1], [
    "pnpm",
    ["exec", "prettier", "--check", "--ignore-path", ".prettierignore", "README.md"],
  ]);
});

test("does not invoke Prettier when no affected file is formattable", () => {
  const calls = [];
  checkAffectedFormat({
    base: "base",
    head: "head",
    run(command, args) {
      calls.push([command, args]);
      return "Application.java\n";
    },
  });
  assert.equal(calls.length, 1);
});

test("checks all tracked formattable files when Prettier policy changes", () => {
  const calls = [];
  const run = (command, args) => {
    calls.push([command, args]);
    if (command !== "git") return "";
    return args[0] === "diff" ? ".prettierrc\n" : "README.md\nApplication.java\n";
  };

  checkAffectedFormat({ base: "base", head: "head", run });
  assert.deepEqual(calls.at(-1), [
    "pnpm",
    ["exec", "prettier", "--check", "--ignore-path", ".prettierignore", "README.md"],
  ]);
});

test("requires both git revisions for affected formatting", () => {
  assert.throws(() => checkAffectedFormat({ base: "", head: "" }), /TURBO_SCM_BASE/);
});

test("checks every tracked source when the Prettier policy changes", () => {
  assert.deepEqual(
    selectFormattableFiles(
      [".prettierrc"],
      [".prettierrc", "apps/mobile/app.tsx", "apps/backend/Application.java", "README.md"]
    ),
    ["apps/mobile/app.tsx", "README.md"]
  );
});
