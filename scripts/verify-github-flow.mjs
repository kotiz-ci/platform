import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const PROTECTED_BRANCHES = [
  {
    name: "develop",
    ruleset: "Protect develop",
    mergeMethod: "squash",
    approvalCount: 0,
  },
  { name: "main", ruleset: "Protect main", mergeMethod: "merge", approvalCount: 0 },
];

export function validateRepositorySettings(settings) {
  const errors = [];

  if (settings.allow_squash_merge !== true) {
    errors.push("squash merge must be enabled");
  }
  if (settings.allow_merge_commit !== true) {
    errors.push("merge commits must be enabled for develop -> main promotions");
  }
  if (settings.allow_rebase_merge !== false) {
    errors.push("rebase merge must be disabled");
  }
  if (settings.delete_branch_on_merge !== true) {
    errors.push("merged ticket branches must be deleted automatically");
  }

  return errors;
}

export function validateBranchRuleset(branch, expectedMergeMethod, expectedApprovalCount, ruleset) {
  const errors = [];
  const ruleTypes = new Set(ruleset.rules?.map((rule) => rule.type) ?? []);
  const pullRequestRule = ruleset.rules?.find((rule) => rule.type === "pull_request");
  const approvals = pullRequestRule?.parameters?.required_approving_review_count ?? 0;
  const mergeMethods = pullRequestRule?.parameters?.allowed_merge_methods ?? [];

  if (ruleset.enforcement !== "active") {
    errors.push(`${branch}: ruleset must be active`);
  }
  if ((ruleset.bypass_actors?.length ?? 0) > 0) {
    errors.push(`${branch}: ruleset must not define bypass actors`);
  }
  if (!ruleset.conditions?.ref_name?.include?.includes(`refs/heads/${branch}`)) {
    errors.push(`${branch}: ruleset must target refs/heads/${branch}`);
  }
  if (!ruleTypes.has("deletion")) {
    errors.push(`${branch}: branch deletion must be blocked`);
  }
  if (!ruleTypes.has("non_fast_forward")) {
    errors.push(`${branch}: force pushes must be blocked`);
  }
  if (!ruleTypes.has("required_signatures")) {
    errors.push(`${branch}: signed commits must be required`);
  }

  if (approvals !== expectedApprovalCount) {
    errors.push(
      `${branch}: approval count must be ${expectedApprovalCount}, received ${approvals}`
    );
  }
  if (mergeMethods.length !== 1 || mergeMethods[0] !== expectedMergeMethod) {
    errors.push(`${branch}: only ${expectedMergeMethod} merge must be allowed`);
  }

  return errors;
}

function githubJson(endpoint) {
  try {
    const output = execFileSync("gh", ["api", endpoint], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return JSON.parse(output);
  } catch (error) {
    const details = error.stderr?.trim() || error.message;
    throw new Error(`GitHub API ${endpoint} failed: ${details}`);
  }
}

function resolveRepository() {
  return execFileSync("gh", ["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"], {
    encoding: "utf8",
  }).trim();
}

export function verifyGithubFlow(repository = resolveRepository()) {
  const errors = validateRepositorySettings(githubJson(`repos/${repository}`));
  const availableRulesets = githubJson(`repos/${repository}/rulesets`);

  for (const branch of PROTECTED_BRANCHES) {
    githubJson(`repos/${repository}/branches/${branch.name}`);
    const summary = availableRulesets.find((ruleset) => ruleset.name === branch.ruleset);

    if (!summary) {
      errors.push(`${branch.name}: ruleset ${branch.ruleset} is missing`);
      continue;
    }

    const ruleset = githubJson(`repos/${repository}/rulesets/${summary.id}`);
    errors.push(
      ...validateBranchRuleset(branch.name, branch.mergeMethod, branch.approvalCount, ruleset)
    );
  }

  if (errors.length > 0) {
    throw new Error(`GitHub flow is not compliant:\n- ${errors.join("\n- ")}`);
  }

  return `GitHub flow verified for ${repository}: develop and main are protected.`;
}

const isExecutedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isExecutedDirectly) {
  try {
    console.log(verifyGithubFlow(process.argv[2]));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
