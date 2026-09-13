import test from "node:test";
import assert from "node:assert/strict";

import {
  validateBranchRuleset,
  validateRepositorySettings,
  verifyGithubFlow,
} from "./verify-github-flow.mjs";

test("accepts the repository merge settings required by the delivery flow", () => {
  assert.deepEqual(
    validateRepositorySettings({
      allow_squash_merge: true,
      allow_merge_commit: true,
      allow_rebase_merge: false,
      delete_branch_on_merge: true,
    }),
    []
  );
});

function compliantRuleset(branch, mergeMethod) {
  return {
    enforcement: "active",
    bypass_actors: [],
    conditions: { ref_name: { include: [`refs/heads/${branch}`], exclude: [] } },
    rules: [
      { type: "deletion" },
      { type: "non_fast_forward" },
      { type: "required_signatures" },
      {
        type: "pull_request",
        parameters: { required_approving_review_count: 0, allowed_merge_methods: [mergeMethod] },
      },
      {
        type: "required_status_checks",
        parameters: {
          strict_required_status_checks_policy: true,
          required_status_checks: [{ context: "CI required" }],
        },
      },
    ],
  };
}

test("verifies the complete live GitHub flow through an injected reader", () => {
  const responses = new Map([
    [
      "repos/kotiz-ci/platform",
      {
        allow_squash_merge: true,
        allow_merge_commit: true,
        allow_rebase_merge: false,
        delete_branch_on_merge: true,
      },
    ],
    [
      "repos/kotiz-ci/platform/rulesets",
      [
        { id: 1, name: "Protect develop" },
        { id: 2, name: "Protect main" },
      ],
    ],
    ["repos/kotiz-ci/platform/branches/develop", { name: "develop" }],
    ["repos/kotiz-ci/platform/branches/main", { name: "main" }],
    ["repos/kotiz-ci/platform/rulesets/1", compliantRuleset("develop", "squash")],
    ["repos/kotiz-ci/platform/rulesets/2", compliantRuleset("main", "merge")],
  ]);

  assert.match(
    verifyGithubFlow("kotiz-ci/platform", { read: (endpoint) => responses.get(endpoint) }),
    /develop and main are protected/
  );
});

test("reports a missing live ruleset", () => {
  const read = (endpoint) => {
    if (endpoint === "repos/kotiz-ci/platform") {
      return {
        allow_squash_merge: true,
        allow_merge_commit: true,
        allow_rebase_merge: false,
        delete_branch_on_merge: true,
      };
    }
    if (endpoint.endsWith("/rulesets")) return [];
    return { name: endpoint.split("/").at(-1) };
  };

  assert.throws(() => verifyGithubFlow("kotiz-ci/platform", { read }), /ruleset.*is missing/);
});

test("rejects repository settings that allow rebase or retain ticket branches", () => {
  const errors = validateRepositorySettings({
    allow_squash_merge: true,
    allow_merge_commit: true,
    allow_rebase_merge: true,
    delete_branch_on_merge: false,
  });

  assert.deepEqual(errors, [
    "rebase merge must be disabled",
    "merged ticket branches must be deleted automatically",
  ]);
});

test("rejects all unsupported repository merge settings", () => {
  assert.deepEqual(
    validateRepositorySettings({
      allow_squash_merge: false,
      allow_merge_commit: false,
      allow_rebase_merge: true,
      delete_branch_on_merge: false,
    }),
    [
      "squash merge must be enabled",
      "merge commits must be enabled for develop -> main promotions",
      "rebase merge must be disabled",
      "merged ticket branches must be deleted automatically",
    ]
  );
});

test("accepts an active branch ruleset with the required controls", () => {
  assert.deepEqual(
    validateBranchRuleset("develop", "squash", 0, {
      enforcement: "active",
      bypass_actors: [],
      conditions: { ref_name: { include: ["refs/heads/develop"], exclude: [] } },
      rules: [
        { type: "deletion" },
        { type: "non_fast_forward" },
        { type: "required_signatures" },
        {
          type: "pull_request",
          parameters: {
            required_approving_review_count: 0,
            allowed_merge_methods: ["squash"],
          },
        },
        {
          type: "required_status_checks",
          parameters: {
            strict_required_status_checks_policy: true,
            required_status_checks: [{ context: "CI required" }],
          },
        },
      ],
    }),
    []
  );
});

test("rejects a ruleset that permits the wrong merge path and misses controls", () => {
  const errors = validateBranchRuleset("main", "merge", 0, {
    enforcement: "disabled",
    bypass_actors: [{ actor_type: "OrganizationAdmin" }],
    conditions: { ref_name: { include: ["refs/heads/other"], exclude: [] } },
    rules: [
      {
        type: "pull_request",
        parameters: {
          required_approving_review_count: 1,
          allowed_merge_methods: ["squash"],
        },
      },
    ],
  });

  assert.deepEqual(errors, [
    "main: ruleset must be active",
    "main: ruleset must not define bypass actors",
    "main: ruleset must target refs/heads/main",
    "main: branch deletion must be blocked",
    "main: force pushes must be blocked",
    "main: signed commits must be required",
    "main: required status checks must be configured",
    "main: approval count must be 0, received 1",
    "main: only merge merge must be allowed",
  ]);
});

test("rejects a non-strict status gate with a missing required context", () => {
  const ruleset = compliantRuleset("develop", "squash");
  const statusRule = ruleset.rules.find((rule) => rule.type === "required_status_checks");
  statusRule.parameters.strict_required_status_checks_policy = false;
  statusRule.parameters.required_status_checks = [];

  assert.deepEqual(validateBranchRuleset("develop", "squash", 0, ruleset), [
    "develop: required status checks must require an up-to-date branch",
    "develop: required status check CI required is missing",
  ]);
});
