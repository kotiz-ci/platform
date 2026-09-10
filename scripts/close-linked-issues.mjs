import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const CLOSING_KEYWORD = /\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*:?\s*#(\d+)\b/gi;

export function extractClosingIssueNumbers(body = "") {
  const issueNumbers = new Set();

  for (const match of body.matchAll(CLOSING_KEYWORD)) {
    issueNumbers.add(Number(match[1]));
  }

  return [...issueNumbers];
}

function executeGh(args) {
  return execFileSync("gh", args, { encoding: "utf8" }).trim();
}

export function closeLinkedIssues({
  body,
  repository,
  pullRequestNumber,
  mergeSha,
  runGh = executeGh,
}) {
  const issueNumbers = extractClosingIssueNumbers(body);
  const openIssues = [];
  const alreadyClosed = [];

  for (const issueNumber of issueNumbers) {
    const state = runGh([
      "issue",
      "view",
      String(issueNumber),
      "--repo",
      repository,
      "--json",
      "state",
      "--jq",
      ".state",
    ]).trim();

    if (state === "OPEN") {
      openIssues.push(issueNumber);
    } else if (state === "CLOSED") {
      alreadyClosed.push(issueNumber);
    } else {
      throw new Error(`Issue #${issueNumber} returned unsupported state: ${state}`);
    }
  }

  for (const issueNumber of openIssues) {
    runGh([
      "issue",
      "close",
      String(issueNumber),
      "--repo",
      repository,
      "--reason",
      "completed",
      "--comment",
      `Fermée automatiquement après la fusion de la PR #${pullRequestNumber} dans develop (${mergeSha.slice(0, 7)}).`,
    ]);
  }

  return { closed: openIssues, alreadyClosed };
}

const isExecutedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isExecutedDirectly) {
  const requiredEnvironment = ["GH_REPO", "PR_NUMBER", "MERGE_SHA"];
  const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]);

  if (missingEnvironment.length > 0) {
    console.error(`Missing environment: ${missingEnvironment.join(", ")}`);
    process.exitCode = 1;
  } else {
    const result = closeLinkedIssues({
      body: process.env.PR_BODY ?? "",
      repository: process.env.GH_REPO,
      pullRequestNumber: process.env.PR_NUMBER,
      mergeSha: process.env.MERGE_SHA,
    });
    console.log(
      `Issue autoclose completed: ${result.closed.length} closed, ${result.alreadyClosed.length} already closed.`
    );
  }
}
