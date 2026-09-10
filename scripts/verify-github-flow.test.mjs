import test from "node:test";
import assert from "node:assert/strict";

import { validateBranchRuleset, validateRepositorySettings } from "./verify-github-flow.mjs";

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

test("accepts an active branch ruleset with the required controls", () => {
  assert.deepEqual(
    validateBranchRuleset("develop", "squash", {
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
            required_approving_review_count: 1,
            allowed_merge_methods: ["squash"],
          },
        },
      ],
    }),
    []
  );
});

test("rejects a ruleset that permits the wrong merge path and misses controls", () => {
  const errors = validateBranchRuleset("main", "merge", {
    enforcement: "disabled",
    bypass_actors: [{ actor_type: "OrganizationAdmin" }],
    conditions: { ref_name: { include: ["refs/heads/other"], exclude: [] } },
    rules: [
      {
        type: "pull_request",
        parameters: {
          required_approving_review_count: 0,
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
    "main: at least one approving review is required",
    "main: only merge merge must be allowed",
  ]);
});
