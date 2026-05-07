// commitlint — KOTIZ Conventional Commits FR (cf. CONTRIBUTING.md)
// Activé via Husky `commit-msg` hook (Sprint 2).

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "chore",
        "refactor",
        "test",
        "perf",
        "ci",
        "build",
        "revert",
      ],
    ],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "scope-empty": [1, "never"],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
  },
};
