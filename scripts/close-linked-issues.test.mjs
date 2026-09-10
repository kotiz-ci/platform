import test from "node:test";
import assert from "node:assert/strict";

import { closeLinkedIssues, extractClosingIssueNumbers } from "./close-linked-issues.mjs";

test("extracts unique issue numbers from GitHub closing keywords", () => {
  const body = `
    Closes #30
    fixes: #31
    RESOLVED #32
    Closes #30
    Refs #99
  `;

  assert.deepEqual(extractClosingIssueNumbers(body), [30, 31, 32]);
});

test("ignores references that do not use a closing keyword", () => {
  assert.deepEqual(extractClosingIssueNumbers("Refs #30 and relates to #31"), []);
});

test("closes only open linked issues with an auditable comment", () => {
  const calls = [];
  const states = new Map([
    ["30", "OPEN"],
    ["31", "CLOSED"],
  ]);
  const runGh = (args) => {
    calls.push(args);
    if (args[0] === "issue" && args[1] === "view") {
      return states.get(args[2]);
    }
    return "";
  };

  const result = closeLinkedIssues({
    body: "Closes #30\nFixes #31",
    repository: "kotiz-ci/platform",
    pullRequestNumber: "42",
    mergeSha: "1234567890abcdef",
    runGh,
  });

  assert.deepEqual(result, { closed: [30], alreadyClosed: [31] });
  assert.deepEqual(calls[2], [
    "issue",
    "close",
    "30",
    "--repo",
    "kotiz-ci/platform",
    "--reason",
    "completed",
    "--comment",
    "Fermée automatiquement après la fusion de la PR #42 dans develop (1234567).",
  ]);
});
